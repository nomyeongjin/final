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
	
	// notiCode 지정
	// 0 : 전체
	// 1 : 예약 승인
	// 2 : 예약 취소
	// 3 : 리뷰 신고
	// 4 : 예약 거절
	// 5 : 리뷰
	// 6 : 가게 신고
	
	
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
		handleNotification(notification, sendMember, store, review, reservation);

//		log.info("전달 받은 내용 : {}", notification);
//		if (notification.getNotificationContent() == null)
//			return;

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
	private void handleNotification(Notification notification, Member sendMember, Store store, Review review, Reservation reservation)
			throws JsonProcessingException, IOException {
		String notificationType = notification.getNotificationType();

		// 일반 회원 + 가게 사장(예약 대기, 승인, 취소, 거절의 경우)
		if (notificationType.equals(notificationTypes.getReadyReservation())
				|| notificationType.equals(notificationTypes.getConfirmReservation())
				|| notificationType.equals(notificationTypes.getCancelReservation())
				|| notificationType.equals(notificationTypes.getNoConfirmReservation())) {
			setStoreAndMember(notification, sendMember, store);

			// 일반회원이 알림을 받는 경우
		} else if (notificationType.equals(notificationTypes.getInsertStoreReview())
				|| notificationType.equals(notificationTypes.getReservFirstNoshow())
				|| notificationType.equals(notificationTypes.getReservSecondNoshow())
				|| notificationType.equals(notificationTypes.getReservThirdNoshow())) {
			setMember(notification, sendMember, review, store);

			// 가게의 경우 일반 회원의 리뷰 작성, 리뷰 신고 처리 알림, 가게 신고 처리 알림을 받음
		} else if (notificationType.equals(notificationTypes.getInsertMemberReview())
				|| notificationType.equals(notificationTypes.getReviewReportComplete())
				|| notificationType.equals(notificationTypes.getStoreReportComplete())) {
			setStore(notification, sendMember, store, reservation);

			// 관리자인 경우 
		} else if (notificationType.equals(notificationTypes.getReviewReport())
				|| notificationType.equals(notificationTypes.getStoreReport())
				|| notificationType.equals(notificationTypes.getReservFirstNoshow())
				|| notificationType.equals(notificationTypes.getReservSecondNoshow())
				|| notificationType.equals(notificationTypes.getReservThirdNoshow())) {
			setManager(notification, sendMember, store, reservation);
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
//			sendMember.setMemberNo(reservMemerNo);
			
			// 받는 사람 : 사장
//			reservMemerNo = store.getMemberNo();
			reservMemerNo = sendMember.getMemberNo();
			

			switch (notificationType) {

			case "readyReservation":
				contentForMember = String.format("<b>%s<b> <b>%s<b> 사장님이 예약 확인 중입니다.", notification.getReservDate(), store.getStoreName());
				contentForStore = String.format("<b>%s<b> 예약 신청 내역이 있습니다. 확인해주세요", notification.getReservDate());

				urlForMember = "/myPage/member/reservation/wait";
				urlForStore = "/myPage/store/reservation";

				notiCode=0;
				break;

			case "cancelReservation":
				contentForMember = String.format("<b>%s<b> <b>%s<b> 예약이 취소되었습니다. 이용에 참고 부탁드립니다.",
						notification.getReservDate(), store.getStoreName());
				contentForStore = String.format("<b>%s<b> 예약이 취소되었습니다.", notification.getReservDate());

				urlForMember = "/myPage/member/reservation/cancelNoshow";
				urlForStore = "/myPage/store/reservation";

				notiCode = 2;
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
				
				notiCode = 4;
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
	private void setMember(Notification notification, Member sendMember, Review review, Store store) throws JsonProcessingException, IOException {

		String notificationType = notification.getNotificationType();
		
//		store = service.selectStoreData(notification.getPkNo());
		review = service.selectReviewData(notification.getPkNo());
		
		int reviewMemerNo = 0;

		
		// 보내는 사람과 리뷰 작성한 사람의 회원 번호가 같은 경우 return;

		// 1) 보내는 사람이 가게 사장
		if (notificationType.equals(notificationTypes.getInsertStoreReview())
				|| notificationType.equals(notificationTypes.getReservFirstNoshow())
				|| notificationType.equals(notificationTypes.getReservSecondNoshow())
				|| notificationType.equals(notificationTypes.getReservThirdNoshow())) {

			// 받는 사람이 가게 사장인 경우 return;
//			if(sendMember.getMemberNo() == store.getMemberNo()) return;
			
			// 받는 사람 (일반 회원)
			reviewMemerNo = service.memberNo(notification.getPkNo());
			
			// 보내는 사람 (가게 사장)
//			sendMember.setMemberNo(store.getMemberNo());
			
			
			switch(notificationType) {
			
			case "insertStoreReview" :
				contentForMember  = String.format("<b>%s<b> 님이 남겨주신 후기에 사장님이 답글을 작성 하셨습니다.", review.getMemberNickname());	
				
				urlForMember = "/store/storeDetail/";
				
				notiCode = 0;
				break;
				

			// 2) 보내는 사람이 관리자

			// 예약 노쇼 알림(1회)
			case "reservFirstNoshow":
				contentForMember = String.format(
						"<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." + "/n" + "경고 > 노쇼 누적 1회 (노쇼 3회 처리 시 계정이 정지 됩니다.)",
						sendMember.getMemberNickname(), notification.getReservDate());
				urlForMember = "/myPage/member/reservation/noshow";

				break;

			// 예약 노쇼 알림(2회)
			case "reservSecondNoshow":
				contentForMember = String.format(
						"<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." + "/n" + "경고 > 노쇼 누적 2회 (노쇼 3회 처리 시 계정이 정지 됩니다.)");
				urlForMember = "/myPage/member/reservation/noshow";
				break;
				
				// 예약 노쇼 알림(3회)
			case "reservThirdNoshow" : 
				contentForMember = String.format("<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." +  "/n" +"노쇼 누적 3건이 발생하여 계정이 정지 되었습니다. 관련 사항은 관리자에게 문의 해주세요.");
				urlForMember = "/myPage/member/reservation/noshow";
				break;
			}
		}

		if (contentForMember != null && urlForMember != null ) {

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
	private void setStore(Notification notification, Member sendMember, Store store, Reservation reservation) throws JsonProcessingException, IOException {

		String notificationType = notification.getNotificationType();
		
		int memberNo = 0;

		if (notificationType.equals(notificationTypes.getInsertMemberReview())
				|| notificationType.equals(notificationTypes.getReviewReportComplete())
				|| notificationType.equals(notificationTypes.getStoreReportComplete())) {

			switch (notificationType) {

			// 손님 방문 리뷰
			case "insertMemberReview":
				
				// pkNo = reservNo
				
				reservation = service.selectReservationData(notification.getPkNo());
				
				memberNo = service.selectStoreMemberNo(reservation.getStoreNo());
				
				contentForStore = String.format("<b>%s<b>이 <b>%s<b> 방문 후 후기를 남겨 주셨습니다.", reservation.getMemberNickname(),
						notification.getReservDate());

				urlForStore = "/myPage/store/review";

				notiCode = 5;
				break;
				
				// 리뷰 신고 (해결여부)
			case "reviewReportComplete" : 
//				store = service.selectStoreData(notification.getPkNo());
				contentForStore = String.format("안녕하세요. 푸드핀 운영 관리자 입니다.<br>" +
												"<b>%s<b> 해당 가게에서 발생한 리뷰 신고에 대한 처리가 완료 되었습니다.<br>"+  
												"가게 운영에 참고 해주세요.<br>" + 
												"자세한 사항은 관리자에게 문의해 주세요.", store.getStoreName());
				
				notiCode = 3;
				break;
				
			case "storeReportComplete" : 
//				store = service.selectStoreData(notification.getPkNo());
				contentForStore = String.format("안녕하세요. 푸드핀 운영 관리자 입니다.<br>" +
							                    "<b>%s</b> 해당 가게에서 발생한 폐업 및 가게 정보 정정 신고 처리가 완료 되었습니다.<br>" +  
							                    "가게 운영에 참고 해주세요.<br>" + 
							                    "자세한 사항은 관리자에게 문의 부탁드립니다.", store.getStoreName());
				notiCode = 6;
				break;

			}

		}

		if (contentForStore != null || urlForStore != null) {

			Notification storeNotification = new Notification();
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
	private void setManager(Notification notification, Member sendMember, Store store, Reservation reservation) throws JsonProcessingException, IOException {
		String notificationType = notification.getNotificationType();
		
		
		int managerNo = service.selectManagerNo(store.getMemberNo());

		if (notificationType.equals(notificationTypes.getReservFirstNoshow())
				|| notificationType.equals(notificationTypes.getReservSecondNoshow())
				|| notificationType.equals(notificationTypes.getReservThirdNoshow())
				|| notificationType.equals(notificationTypes.getReviewReport())
				|| notificationType.equals(notificationTypes.getStoreReport())) {
			
			// 알림 받는 사람 (관리자)
			
			switch(notificationType) {
			
			case "reviewReport" :
				
				store = service.selectManagerData(notification.getPkNo());
				
				contentForManager = String.format("<b>%s<b> 가게의 리뷰 신고가 들어왔습니다. 확인 해주세요.", store.getStoreName());
				
				urlForManager = "/myPage/manager/reportReview";
				notiCode = 3;
				break;
				
			case "storeReport" : 
				
				store = service.selectManagerData(notification.getPkNo());
				
				contentForManager = String.format("<b>%s<b> 가게 폐업 및 가게 정보 정정 신고가 들어왔습니다.<br>" + "가게를 확인 해주세요.", store.getStoreName());
				
				urlForManager = "/myPage/manager/managerStoreInfo";
				notiCode = 6;
//				store = service.selectStoreName(store.getStoreNo());
				break;
				
				
//			// 예약 노쇼 알림(1회)
//			case "reservFirstNoshow" :
//				
//				reservation = service.selectNoshowData(reservation.getReservNo());
//				
//				contentForMember = String.format(
//						"<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." + "/n" + "경고 > 노쇼 누적 1회 (노쇼 3회 처리 시 계정이 정지 됩니다.)",
//						sendMember.getMemberNickname(), notification.getReservDate());
//				urlForMember = "/myPage/member/reservation/noshow";
//
//				contentForManager = String.format("<b>%s<b>님의 노쇼 누적 1회 건이 있습니다. 해당 회원을 확인 해주세요",
//						sendMember.getMemberNickname());
//				
//				notiCode = 0;
//
//				break;
//
//			// 예약 노쇼 알림(2회)
//			case "reservSecondNoshow":
//				
//				reservation = service.selectNoshowData(reservation.getReservNo());
//				
//				contentForMember = String.format(
//						"<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." + "/n" + "경고 > 노쇼 누적 2회 (노쇼 3회 처리 시 계정이 정지 됩니다.)");
//				contentForManager = String.format("<b>%s<b>님의 노쇼 누적 2회 건이 있습니다. 해당 회원을 확인 해주세요",
//						sendMember.getMemberNickname());
//				
//				notiCode = 0;
//				break;

			// 예약 노쇼 알림(3회)
			case "reservThirdNoshow":
				
				reservation = service.selectNoshowData(reservation.getReservNo());
				
//				contentForMember = String.format("<b>%s<b>님의 노죠" + "/n"
//						+ "노쇼 누적 3건이 발생하여 계정이 정지 되었습니다. 관련 사항은 관리자에게 문의 해주세요.");
				contentForManager = String.format("<b>%s<b>님의 노쇼 누적 3회 발생으로 계정 정지 처리 되었습니다. " + "/n" + "해당 회원의 계정 정치 처리 확인 해주세요.",
						sendMember.getMemberNickname());
				
				notiCode = 0;
				break;
			}

		}

		// 관리자 메시지 전송
		if (contentForManager != null) {

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
