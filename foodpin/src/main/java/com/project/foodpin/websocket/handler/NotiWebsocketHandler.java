package com.project.foodpin.websocket.handler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Report;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.dto.NotificationTypes;
import com.project.foodpin.websocket.model.service.NotificationService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotiWebsocketHandler extends TextWebSocketHandler {
	
	private final NotificationService service;
	
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	
	// notificationType 만 따로 모아 둔 클래스 의존성 주입
	private final NotificationTypes notificationTypes;
	
	// 일반 회원에게 보낼 메시지
	String contentForMember = null;
	
	// 가게 사장님에게 보낼 메시지
	String contentForStore = null;
	
	// 관리자에게 보낼 메시지
	String contentForManager = null;
	
	// url 저장
	String urlForMember = null;
	String urlForStore = null;
	String urlForManager = null;
	
	int notiCode;
	
	Notification memberNotification;
	Notification storeNotification;
	Notification managerNotification;
	
	// 클라이언트와 연결이 완료되고 통신할 준비가 끝나면 실헹
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
	
		log.info("session id : {}", session.getId());
		sessions.add(session);
	}

	// 연결 끊김
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Notification notification = objectMapper.readValue(message.getPayload(), Notification.class);
		
		HttpSession httpSession = (HttpSession)session.getAttributes().get("session");
		
		Member sendMember = (Member) httpSession.getAttribute("loginMember");

		/* ****** 경우에 따라 조회 데이터와 알림 객체에 필요한 값 세팅이 다름 ****** */
		
		Store store = null;
		Review review = null;
		Reservation reservation = null;
		Report report = null;
		handleNotification(notification, sendMember, store, review, reservation, report);

		// /notification.send로 연결된 객체를 만든 클라리언트들(sessions)중
		// 회원번호가 받는 회원 번호와 같은 사람에게 베시지 전달
		for (WebSocketSession ws : sessions) {

			// 세션에 접속한 회원의 정보를 알 수 있음
			HttpSession temp = (HttpSession) ws.getAttributes().get("session");
			int currentMemberNo = ((Member) temp.getAttribute("loginMember")).getMemberNo();
			
			if(memberNotification != null && currentMemberNo == memberNotification.getReceiveMemberNo()) {
				ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(memberNotification)));
				memberNotification = null;
			}
			
			if(storeNotification != null && currentMemberNo == storeNotification.getReceiveMemberNo()) {
				ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(notification)));
				storeNotification = null;
			}
			
			if(managerNotification != null && currentMemberNo == managerNotification.getReceiveMemberNo()) {
				ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(notification)));
				managerNotification = null;
			}
		}
	}

	// 알림 받는 사람이 조건
	private void handleNotification(Notification notification, Member sendMember, Store store, Review review, Reservation reservation, Report report)
			throws JsonProcessingException, IOException {
		String notificationType = notification.getNotificationType();

		// 일반 회원 + 가게 사장(예약 대기, 승인, 취소, 거절의 경우)
		if (notificationType.equals(notificationTypes.getReadyReservation())
				|| notificationType.equals(notificationTypes.getConfirmReservation())
				|| notificationType.equals(notificationTypes.getCancelReservation())
				|| notificationType.equals(notificationTypes.getNoConfirmReservation())) {
			setStoreAndMember(notification, sendMember, store);

		} 
		
		// 일반회원이 알림을 받는 경우
		if (notificationType.equals(notificationTypes.getInsertStoreReview())
				|| notificationType.equals(notificationTypes.getReservFirstNoshow())
				|| notificationType.equals(notificationTypes.getReservSecondNoshow())
				|| notificationType.equals(notificationTypes.getReviewReportDeleteReview())) {
			setMember(notification, sendMember, review, store, reservation, report);

		} 
		
		// 가게의 경우 일반 회원의 리뷰 작성, 리뷰 신고 처리 알림, 가게 신고 처리 알림을 받음
		if (notificationType.equals(notificationTypes.getInsertMemberReview())
				|| notificationType.equals(notificationTypes.getReviewReportComplete())
				|| notificationType.equals(notificationTypes.getStoreReportComplete())
				|| notificationType.equals(notificationTypes.getReviewReportDeleteReview())) {
			setStore(notification, sendMember, store, reservation, report);

		} 
		
		// 관리자인 경우 
		if (notificationType.equals(notificationTypes.getReviewReport())
				|| notificationType.equals(notificationTypes.getStoreReport())) {
			setManager(notification, sendMember, store, reservation, review);
		}
	}

	/* ***** 받은 사람에 따라 매서드 다르게 작성 ***** */

	// 1. 보낸 사람 받는 사람 모두 알림을 받는 경우 (예약 대기, 승인, 취소, 거절 (일반회원, 가게 사장))
	private void setStoreAndMember(Notification notification, Member sendMember, Store store)
			throws JsonProcessingException, IOException {

		String notificationType = notification.getNotificationType();

		int reservMemerNo = 0;
		
		// 1) 예약 대기, 취소의 경우 일반 회원이 가게 사장에게 알림 전달 (== 보내는 사람이 일반 회원)
		if (notificationType.equals(notificationTypes.getReadyReservation())
				|| notificationType.equals(notificationTypes.getCancelReservation())) {

			store = service.selectStoreData(notification.getPkNo());
			
			// 보내는 사람 : 회원
			// 받는 사람 : 사장
			reservMemerNo = sendMember.getMemberNo();
			

			switch (notificationType) {

			case "readyReservation":
				contentForMember = String.format("<b>%s<b> <b>%s<b> 사장님이 예약 확인 중입니다.", notification.getReservDate(), store.getStoreName());
				contentForStore = String.format("<b>%s<b> 예약 신청 내역이 있습니다. 확인해주세요", notification.getReservDate());

				urlForMember = "/myPage/member/reservation/wait";
				urlForStore = "/myPage/store/reservation";

				notiCode=3;
				break;

			case "cancelReservation":
				contentForMember = String.format("<b>%s<b> <b>%s<b> 예약이 취소되었습니다. 이용에 참고 부탁드립니다.",
						notification.getReservDate(), store.getStoreName());
				contentForStore = String.format("<b>%s<b> 예약이 취소되었습니다.", notification.getReservDate());

				urlForMember = "/myPage/member/reservation/cancelNoshow";
				urlForStore = "/myPage/store/reservation";

				notiCode = 4;
				break;
			}

			// 2) 예약 승인, 거절의 경우 가게 사장이 일반 회원에게 알림 전달 (== 보내는 사람이 가게 사장)
		} else if (notificationType.equals(notificationTypes.getConfirmReservation())
				|| notificationType.equals(notificationTypes.getNoConfirmReservation())) {
			
			
			
			store = service.selectStoreData(notification.getPkNo());
			reservMemerNo = service.selectReservMemerNo(notification.getPkNo());
			sendMember.setMemberNo(store.getMemberNo());

			switch (notificationType) {

			case "confirmReservation":
				contentForMember = String.format("<b>%s<b> <b>%s<b> 예약이 승인 되었습니다. 이용에 참고 부탁드립니다.",
						notification.getReservDate(), store.getStoreName());
				contentForStore = String.format("<b>%s<b> 예약 승인 내역이 있습니다. 확인해주세요", notification.getReservDate());

				urlForMember = "/myPage/member/reservation/fix";
				urlForStore = "/myPage/store/reservation";

				notiCode = 1;
				break;

			case "noConfrimReservation":

				contentForMember = String.format("<b>%s<b> 예약하신 <b>%s<b> 님이 예약을 거절했습니다. 확인해주세요", notification.getReservDate() , store.getStoreName());
				contentForStore = String.format("<b>%s<b> 예약 거절 내역이 있습니다. 확인해주세요", notification.getReservDate());
				
				urlForMember = "/myPage/member/reservation/cancelNoshow";
				urlForStore = "/myPage/store/reservation";
				
				notiCode = 2;
				break;
			}
		}
		
		if (contentForMember != null && urlForMember != null) {

			memberNotification = new Notification();
			memberNotification.setReceiveMemberNo(reservMemerNo);
			memberNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			memberNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			memberNotification.setNotificationContent(contentForMember);
			memberNotification.setSendMemberNo(store.getMemberNo());
			memberNotification.setNotificationUrl(urlForMember);
			memberNotification.setNotiCode(notiCode);
			service.sendNotificationMember(memberNotification);
		}
		
		if (contentForStore != null && urlForStore != null) {

			storeNotification = new Notification();
			storeNotification.setReceiveMemberNo(store.getMemberNo());
			storeNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			storeNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			storeNotification.setNotificationContent(contentForStore);
			storeNotification.setSendMemberNo(sendMember.getMemberNo()); 
			storeNotification.setNotificationUrl(urlForStore);
			storeNotification.setNotiCode(notiCode);
			service.sendNotificationStore(storeNotification);
		}
	}

	// 2. 알림 받는 사람이 일반 회원인 경우
	private void setMember(Notification notification, Member sendMember, Review review, Store store, Reservation reservation, Report report) throws JsonProcessingException, IOException {

		String notificationType = notification.getNotificationType();

		int reviewMemerNo = 0;
		// 받는 사람 (일반 회원) - 리뷰 작성한 사람

		switch (notificationType) {

		case "insertStoreReview":

			// reviewNo
			review = service.selectReviewData(notification.getPkNo());
			reviewMemerNo = service.memberNo(review.getReviewNo());
			contentForMember = String.format("<b>%s<b> 님이 남겨주신 후기에 사장님이 답글을 작성 하셨습니다.<br>" + "<u>내가 쓴 리뷰 확인하러 가기<u> >", review.getMemberNickname());

			urlForMember = "/myPage/member/memberReview";

			break;

		/*
		 * 예약 노쇼 1, 2회는 알림 발송 3회는 문자 , 이메일 발송
		 */

		// 예약 노쇼 알림(1회)
		case "reservFirstNoshow":

			// memberNo
			Member member = service.noshowMemberNo(notification.getPkNo());
			reviewMemerNo = service.selectNoshowMemberNo(member.getMemberNo());

			contentForMember = String.format(
					"<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다.<br>" + "경고 > 노쇼 누적 1회 (노쇼 3회 처리 시 계정이 정지 됩니다.)",
					member.getMemberNickname(), notification.getReservDate());
			urlForMember = "/myPage/member/reservation/cancelNoshow";

			break;

		// 예약 노쇼 알림(2회)
		case "reservSecondNoshow":

			member = service.noshowMemberNo(notification.getPkNo());
			reviewMemerNo = service.selectNoshowMemberNo(member.getMemberNo());

			contentForMember = String.format(
					"<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다.<br>" + "경고 > 노쇼 누적 2회 (노쇼 3회 처리 시 계정이 정지 됩니다.)",
					member.getMemberNickname(), notification.getReservDate());
			urlForMember = "/myPage/member/reservation/cancelNoshow";
			break;

		// 리뷰 신고 ( 삭제 조치 )
		case "reviewReportDeleteReview":

			// reportNo
			report = service.selectReportData(notification.getPkNo());
			reviewMemerNo = service.selectReviewNo(notification.getPkNo());

			contentForMember = String.format(
					"안녕하세요. 푸드핀 운영 관리자 입니다.<br>" + "<b>%s<b> <b>%s<b> 가게의 리뷰 신고 접수되어 <br>"
							+ "확인 결과 해당 댓글은 부적절한 댓글로 삭제 조치 되었습니다.<br>" + "자세한 사항은 관리자에게 문의해 주세요.",
					report.getStoreName(), notification.getReportDate());
			urlForMember = "/myPage/member/memberReview";

			notiCode = 6;

//				memberNotification = Notification.builder()
//						.receiveMemberNo(reviewMemerNo)
//						.sendMemberProfileImg(sendMember.getProfileImg())
//						.notificationType("reviewReportDeleteReview")
//						.notificationContent(contentForMember)
//						.sendMemberNo(sendMember.getMemberNo())
//						.notiCode(3)
//						.build();
//				
//				service.sendNotificationMember(memberNotification);
			break;
		}

		if (contentForMember != null || urlForMember != null) {

			memberNotification = new Notification();
			memberNotification.setReceiveMemberNo(reviewMemerNo);
			memberNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			memberNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			memberNotification.setNotificationContent(contentForMember);
			memberNotification.setSendMemberNo(sendMember.getMemberNo());
			memberNotification.setNotificationUrl(urlForMember);
			memberNotification.setNotiCode(notiCode);
			service.sendNotificationMember(memberNotification);
		}
	}

	// 3. 알림 받는 사람이 가게 사장님인 경우
	private void setStore(Notification notification, Member sendMember, Store store, Reservation reservation,
			Report report) throws JsonProcessingException, IOException {

		String notificationType = notification.getNotificationType();

		int memberNo = 0;

		switch (notificationType) {

		// 손님 방문 리뷰
		case "insertMemberReview":

			// pkNo = reservNo

			reservation = service.selectReservationData(notification.getPkNo());

			memberNo = service.selectStoreMemberNo(reservation.getStoreNo());

			contentForStore = String.format("<b>%s<b>이 <b>%s<b> 방문 후 후기를 남겨 주셨습니다.<br>" + "<u>답변 작성하러 가기<u> >", reservation.getMemberNickname(),
					reservation.getReservDate() + " " + reservation.getReservTime());

			urlForStore = "/myPage/store/reviewUnanswered";

			notiCode = 5;
			break;

		// 리뷰 신고 (해결여부)
		case "reviewReportDeleteReview":

			// reportNo
			report = service.selectReportData(notification.getPkNo());
			memberNo = service.selectStoreNo(report.getStoreNo());

//				store = service.selectStoreData(notification.getPkNo());
			contentForStore = String.format("안녕하세요. 푸드핀 운영 관리자 입니다.<br>" + "<b>%s<b> 해당 가게에서 발생한 리뷰 신고에 발생으로 확인한 결과<br>"
					+ "해당 댓글은 부적절한 댓글로 삭제 조치 되었습니다.<br>" + "가게 운영에 참고 해주세요.<br>"
					+ "자세한 사항은 관리자에게 문의해 주세요.<br>" + " <u>리뷰 조회하기<u> >", report.getStoreName());
			
			urlForStore = "/myPage/store/review";
			notiCode = 6;
			break;

		case "storeReportComplete":
//				store = service.selectStoreData(notification.getPkNo());

			// 가게 신고 (해결 완료)
			store = service.storeReportComplete(notification.getPkNo());
			memberNo = service.selectStoreMemberNo(store.getStoreNo());

			contentForStore = String.format(
					"안녕하세요. 푸드핀 운영 관리자 입니다.<br>" + "<b>%s</b> 해당 가게에서 발생한 폐업 및 가게 정보 정정 신고 처리가 완료 되었습니다.<br>"
							+ "가게 운영에 참고 해주세요.<br>" + "자세한 사항은 관리자에게 문의 부탁드립니다.<br>" + "<u>가게 정보 수정 페이지로 이동<u> >",
					store.getStoreName());

			urlForStore = "/myPage/store/storeInfo";
			notiCode = 7;
			break;
		}

		if (contentForStore != null && urlForStore != null) {

			storeNotification = new Notification();
			storeNotification.setReceiveMemberNo(memberNo);
			storeNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			storeNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			storeNotification.setNotificationContent(contentForStore);
			storeNotification.setSendMemberNo(sendMember.getMemberNo());
			storeNotification.setNotificationUrl(urlForStore);
			storeNotification.setNotiCode(notiCode);
			service.sendNotificationStore(storeNotification);
		}
	}

	// 4. 알림 받는 사람이 관리자인 경우
	private void setManager(Notification notification, Member sendMember, Store store, Reservation reservation, Review review) throws JsonProcessingException, IOException {
		String notificationType = notification.getNotificationType();
		
		// 받는 사람 (관리자 회원 번호 )
		int managerNo = service.selectManagerNo(sendMember.getMemberNo());

		switch (notificationType) {

		case "reviewReport":

			review = service.selectReivewReportData(notification.getPkNo());

			contentForManager = String.format("<b>%s<b> 가게의 리뷰 신고가 들어왔습니다. 확인 해주세요.", review.getStoreName());
			urlForManager = "/myPage/manager/reportReview";
			
			notiCode = 6;
			break;

		case "storeReport":

			store = service.selectManagerData(notification.getPkNo());

			contentForManager = String.format("<b>%s<b> 가게 폐업 및 가게 정보 정정 신고가 들어왔습니다.<br>" + "해당 가게를 확인 해주세요.",
					store.getStoreName());

			urlForManager = "/myPage/manager/managerStoreInfo";
			notiCode = 7;
			break;

		}

		// 관리자 메시지 전송
		if (contentForManager != null && urlForManager != null) {

			managerNotification = new Notification();
			managerNotification.setReceiveMemberNo(managerNo);
			managerNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			managerNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			managerNotification.setNotificationContent(contentForManager);
			managerNotification.setSendMemberNo(sendMember.getMemberNo()); // 예약하는 회원 번호로 알림 전송
			managerNotification.setNotificationUrl(urlForManager);
			managerNotification.setNotiCode(notiCode);
			service.sendNotificationManager(managerNotification);

		}
	}
	
}
