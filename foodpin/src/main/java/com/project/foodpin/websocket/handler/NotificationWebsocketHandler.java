package com.project.foodpin.websocket.handler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Websocket;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.service.NotificationService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationWebsocketHandler extends TextWebSocketHandler{ // 서버와 통신 되자마자 접속한 회원의 정보를 session에 저장함
	
	private final NotificationService service;
	
	// 쿨SMS 서비스 
//	private final DefaultMessageService messageService;
	

	// 서버간 전이중 통신을 담당하는 객체
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());

	// 클라이언트와 연결이 완료되고 통신할 준비가 끝나면 실헹
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
		// 연결된 Client의 WebSocketSession의 정보를 Set에 추가
		// -> 웹소켓이 연결된 클라이언트 정보를 모아둠 (=> 누가 접속했는지 정보를 모아둠)
		sessions.add(session);
	}
	
	
	// JS에서 보낸 함수를 처리하는 메서드
	/* 클라이언트로부터 메시지가 도착하면 실행 */
	@Override												   // js에서 작성한 Message관련 함수가 TextMaessage호 전달됨
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		 ObjectMapper objectMapper = new ObjectMapper();
		 
		 Notification notification = objectMapper.readValue(message.getPayload(), Notification.class);
		 
		 // 웹소켓 연결을 통해 요청 보낸 회원 정보 얻기
		 HttpSession currentSession = (HttpSession)session.getAttributes().get("session");
		 
		 // 로그인한 회원 중 알림을 보내는 회원
		 Member sendMember = ((Member)currentSession.getAttribute("loginMember"));
		 
		 // 예약한 가게 번호 이용해서 가게 정보 조회(notification.getPkNo())
		 Store store = service.selectStoreData(notification.getPkNo());
		 
		 // 알림 객체에(notificaiont에 필요한 값 세팅)
		 setNotification(notification, sendMember, store);
		 
		 // log로 전달받은 메시지 확인
		 log.info("전달 받은 내용 : {}", notification);
		 
		 // 알림 내용이 없음 == 내 게시물
		 if(notification.getNotificationContent() == null) return;
		 
		 // DB에 알림 삽입
//		 int result = service.insertNotification(notification);
		 
//		 if(result == 0) return;
		 
		 // /notification.send로 연결된 객체를 만든 클라리언트들(sessions)중
		 // 회원번호가 받는 회원 번호와 같은 사람에게 베시지 전달
		 for(WebSocketSession ws : sessions) {
			 
			 // 세션에 접속한 회원의 정보를 알 수 있음
			 HttpSession temp = (HttpSession)ws.getAttributes().get("session");
			 
			 int loginMemebrNo = ((Member)temp.getAttribute("loginMember")).getMemberNo();
			 
			 // 로그인 한 회원 == 알림을 받는 사람(도착 알림을 보냄)
			 if(loginMemebrNo == notification.getReceiveMemberNo() ) {
				 ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(notification)));
			 }
			 else if(loginMemebrNo == notification.getSendMemberNo() ) {
				 ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(notification)));
			 }
		 }
	}
	

	 // 연결 끊김
	 @Override
	 public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		 
		 // 웹소켓 연결이 끊긴 클라이언트 정보를 Set에서 제거
		sessions.remove(session);
	}
	 
	 
	 
	//알림 종류에 따라 알림 객체 추가
	private void setNotification(Notification notification, Member sendMember, Store store) throws JsonProcessingException, IOException {
		log.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		
//		Message message = new Message();
//		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		
		// 보낸 사람 회원 번호
		notification.setReceiveMemberNo(sendMember.getMemberNo());
		
		// 보낸 사람 프로필
		notification.setSendMemberProfileImg(sendMember.getProfileImg());
		
		// 가게인 경우 :  알림을 보낼 때 필요한 가게 관련 값 조회
		store = service.selectStoreData(notification.getPkNo());
		
//		if(sendMember.getMemberNo() == store.getMemberNo()) return;
		
		// 일반 회원에게 보낼 메시지
		String contentForMember = null;
		
		// 가게 사장님에게 보낼 메시지
		String contentForStore = null;
		
		// 관리자에게 보낼 메시지
		String contentForManager = null;
		log.info("-----------------------------------------------------------------------------------");
		log.info(notification.toString());
		log.info("-----------------------------------------------------------------------------------");
		
		switch(notification.getNotificationType()) {
		
		/* 예약 대기 상태 */
		case "readyReservation" : 
			contentForMember = String.format("<b>%s<b> <b>%s<b> 사장님이 예약 확인 중입니다.", notification.getReservDate() , store.getStoreName());
			contentForStore = String.format("<b>%s<b> 예약 신청 내역이 있습니다. 확인해주세요", notification.getReservDate());
			break;
		
		/* 예약 승인 했을 때 */
		case "confirmReservation":
			contentForMember = String.format("<b>%s<b> <b>%s<b> 예약이 승인 되었습니다. 이용에 참고 부탁드립니다.",
					notification.getReservDate() , store.getStoreName() );
			
//			contentForStore = String.format("<b>%s<b> 예약 승인 내역이 있습니다. 확인해주세요", notification.getReservDate() );
			break;
			
		/* 예약 취소 시(회원/가게) */	
		case "cancelReservation":
			contentForMember = String.format("<b>%s<b> <b>%s<b> 예약이 취소되었습니다. 이용에 참고 부탁드립니다.", notification.getReservDate() , store.getStoreName());
			contentForStore = String.format("<b>%s<b> 예약이 취소되었습니다.", notification.getReservDate() );
			break;
		
		/* 가게 측에서 예약을 거절 했을 경우 */
		case "noConfrimReservation":
			
			contentForMember = String.format("<b>%s<b> 예약하신 <b>%s<b> 님이 예약을 거절했습니다. 확인해주세요", notification.getReservDate() , store.getStoreName());
			contentForStore = String.format("<b>%s<b> 예약 거절 내역이 있습니다.", notification.getReservDate() );
			break;
			
			
		/* 리뷰 */	
		// 손님 방문 리뷰
		case "insertMemberReview" :
			contentForStore  = String.format("<b>%s<b>이 <b>%s<b> 방문 후 후기를 남겨 주셨습니다.", sendMember.getMemberNickname(), notification.getReservDate());
			break;
			
		// 가게 사장님 답글 
		case "insertStroeReview" :
			contentForMember  = String.format("<b>%s<b> 님이 남겨주신 후기에 사장님이 답글을 작성 하셨습니다.", sendMember.getMemberNickname());	
			break;
			
		/* 노쇼 처리 */
		// 예약 노쇼 알림(1회)
		case "reservFirstNoshow" :
			contentForMember = String.format("<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." +  "/n" +"경고 > 노쇼 누적 1회 (노쇼 3회 처리 시 계정이 정지 됩니다.)", sendMember.getMemberNickname(), notification.getReservDate());
			
			contentForManager = String.format("<b>%s<b>님이 노쇼 누적 1회 건이 있습니다 확인 해주세요", sendMember.getMemberNickname());
			
//			contentForStore = String.format("<b>%s<b>님이 예약 날짜에 방문하지 않았습니다. ", sendMember.getMemberNickname());
			break;
		
		// 예약 노쇼 알림(2회)
		case "reservSecondNoshow" :
			contentForMember = String.format("<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." +  "/n" +"경고 > 노쇼 누적 2회 (노쇼 3회 처리 시 계정이 정지 됩니다.)");
			contentForManager = String.format("<b>%s<b>님이 노쇼 누적 2회 건이 있습니다 확인 해주세요", sendMember.getMemberNickname());
			break;
		
		// 예약 노쇼 알림(3회)
		case "reservThirdNoshow" : 
			contentForMember = String.format("<b>%s<b>님 <b>%s<b> 예약 날짜에 방문하지 않았습니다." +  "/n" +"노쇼 누적 3건이 발생하여 계정이 정지 됩니다. 관련 사항은 관리자에게 문의 해주세요.");
			contentForManager = String.format("<b>%s<b>님이 노쇼 누적 3회 건 발생 되었습니다. 계정 정치 처리 확인 해주세요.", sendMember.getMemberNickname());
			break;
			
			// 문자 보내기
		}
		
		// 신고 처리(일반 회원, 가게 사장님, 관리자 모두 알림 대상)
		
		

		// 알림 전송 및 문자 발송 로직
		
		 ObjectMapper objectMapper = new ObjectMapper();

		// 회원에게 알림 전송
		if (contentForMember != null) {

			Notification memberNotification = new Notification();
			memberNotification.setReceiveMemberNo(sendMember.getMemberNo());
			memberNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			memberNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			memberNotification.setNotificationContent(contentForMember);
			memberNotification.setSendMemberNo(store.getMemberNo()); // 예약한 회원 번호로 알림 전송
			memberNotification.setNotificationUrl(notification.getNotificationUrl());
			service.sendNotificationMember(memberNotification);
			
			for(WebSocketSession ws : sessions) {
				 
				 // 세션에 접속한 회원의 정보를 알 수 있음
				 HttpSession temp = (HttpSession)ws.getAttributes().get("session");
				 int loginMemebrNo = ((Member)temp.getAttribute("loginMember")).getMemberNo();
				 
				 // 로그인 한 회원 == 알림을 받는 사람(도착 알림을 보냄)
				 if(loginMemebrNo == memberNotification.getReceiveMemberNo() ) {
					 ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(memberNotification)));
				 }
			 }
			// 문자 보내는 로직 필요
//			messageService.sendMessage(memberNotification.getSendMemberNo(), memberNotification.getNotificationContent());
		}
		
		// 가게 사장님에게 알림 전송
		if(contentForStore != null) {
			
			Notification storeNotification = new Notification();
			storeNotification.setReceiveMemberNo(store.getMemberNo());
			storeNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			storeNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			storeNotification.setNotificationContent(contentForStore);
			storeNotification.setSendMemberNo(sendMember.getMemberNo()); // 예약하는 회원 번호로 알림 전송
			storeNotification.setNotificationUrl(notification.getNotificationUrl());
			service.sendNotificationStore(storeNotification);
			
			for(WebSocketSession ws : sessions) {
				 
				 // 세션에 접속한 회원의 정보를 알 수 있음
				 HttpSession temp = (HttpSession)ws.getAttributes().get("session");
				 int loginMemebrNo = ((Member)temp.getAttribute("loginMember")).getMemberNo();
				 
				 // 로그인 한 회원 == 알림을 받는 사람(도착 알림을 보냄)
				 if(loginMemebrNo == storeNotification.getReceiveMemberNo() ) {
					 ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(storeNotification)));
				 }
			 }
		}
		
		
		// 관리자 메시지 전송
		if(contentForManager != null) {
			
			Notification managerNotification = new Notification();
			managerNotification.setReceiveMemberNo(sendMember.getMemberNo());
			managerNotification.setSendMemberProfileImg(sendMember.getProfileImg());
			managerNotification.setNotificationType(notification.getNotificationType()); // 알림 유형
			managerNotification.setNotificationContent(contentForManager);
			managerNotification.setSendMemberNo(sendMember.getMemberNo()); // 예약하는 회원 번호로 알림 전송
			managerNotification.setNotificationUrl(notification.getNotificationUrl());
			service.sendNotificationManager(managerNotification);
			
			for(WebSocketSession ws : sessions) {
				 
				 // 세션에 접속한 회원의 정보를 알 수 있음
				 HttpSession temp = (HttpSession)ws.getAttributes().get("session");
				 int loginMemebrNo = ((Member)temp.getAttribute("loginMember")).getMemberNo();
				 
				 // 로그인 한 회원 == 알림을 받는 사람(도착 알림을 보냄)
				 if(loginMemebrNo == managerNotification.getReceiveMemberNo() ) {
					 ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(managerNotification)));
				 }
			 }
		}
		
	}
}

