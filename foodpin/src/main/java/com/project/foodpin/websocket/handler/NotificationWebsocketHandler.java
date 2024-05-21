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
		 
		 Member sendMember = ((Member)currentSession.getAttribute("loginMember"));
		 
		 setNotification(notification, sendMember);
		 
		 if(notification.getNotificationContent() == null) return;
		 
		 int result = service.insertNotification(notification);
		 
		 if(result == 0) return;
		 
		 for(WebSocketSession ws : sessions) {
			 
			 HttpSession temp = (HttpSession)ws.getAttributes().get("session");
			 
			 int loginMemebrNo = ((Member)temp.getAttribute("loginMember")).getMemberNo();
			 
			 if(loginMemebrNo == notification.getReceiveMemberNo()) {
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
	private void setNotification(Notification notification, Member sendMember) {
		notification.setReceiveMemberNo(sendMember.getMemberNo());
		
		notification.setSendMemberProfileImg(sendMember.getProfileImg());
		
		Store store = service.selectStoreData(notification.getPkNo());
		
		
	}

}
