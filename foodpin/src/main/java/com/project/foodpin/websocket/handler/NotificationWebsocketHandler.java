package com.project.foodpin.websocket.handler;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Websocket;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.service.NotificationService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationWebsocketHandler extends TextWebSocketHandler{
	
	private final NotificationService service;
	
	 private Set<WebSocketSession> sessions  = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	 
	 @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}
	 
	 @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		 ObjectMapper objectMapper = new ObjectMapper();
		 
		 Notification notification = objectMapper.readValue(message.getPayload(), Notification.class);
		 
		 HttpSession currentSession = (HttpSession)session.getAttributes().get("session");
		 
		 // 로그인한 회원 중 알림을 보내는 회원
		 Member sendMember = ((Member)currentSession.getAttribute("loginMember"));
		 
		 // 예약한 가게 번호 이용해서 가게 정보 조회(notification.getPkNo())
		 Store store = null;
		 
		 
		 setNotification(notification, sendMember, store);
		 
		 if(notification.getNotificationContent() == null) return;
		 
		 int result = service.insertNotification(notification);
		 
		 if(result == 0) return;
		 
		 for(WebSocketSession ws : sessions) {
			 
			 HttpSession temp = (HttpSession)ws.getAttributes().get("session");
			 
			 int loginMemebrNo = ((Member)temp.getAttribute("loginMember")).getMemberNo();
			 
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
		sessions.add(session);
	}
	 
	 
	 //알림 종류에 따라 알림 객체 추가
	private void setNotification(Notification notification, Member sendMember, Store store) {
		notification.setReceiveMemberNo(sendMember.getMemberNo());
		
		notification.setSendMemberProfileImg(sendMember.getProfileImg());
		
		store = service.selectStoreData(notification.getPkNo());
		
//		if(sendMember.getMemberNo() == store.getMemberNo) return;
		
		String content;
		
		switch(notification.getNotifiactionType()) {
		
		/* 예약 했을 때 (회원/가게) */
		case "insertNotifiaction" :
			content = String.format("<b>%s<b> <b>%s<b> 예약 내역이 있습니다. 이용에 참고 부탁드립니다.",
					notification.getReservDate()/* , store.getStoreName() */);
			notification.setNotificationContent(content);
			
			notification.setSendMemberNo(sendMember.getMemberNo()); // 예약한 회원 번호로 알림 보냄
//			notification.setReceiveMemberNo(store.getMemberNo()); // 예약 하려는 식당 주인 회원 번호
			
			
			break;
			
		/* 예약 취소 시(회원/가게) */	
		case "updateNotification" :	
			content = String.format("<b>%s<b> <b>%s<b> 예약이 취소되었습니다. 이용에 참고 부탁드립니다.");
			
			notification.setNotificationContent(content);
			
//			notification.setReceiveMemberNo(reservation.getMemberNo()); // 예약했던 회원 번호로 알림 보냄
			
		/* 리뷰 */	
		case "insertReview" :
			content = String.format("");
			
		}
	}

}
