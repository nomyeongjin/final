package com.project.foodpin.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.project.foodpin.chatting.handler.ChattingWebsocketHandler;
import com.project.foodpin.websocket.handler.NotificationWebsocketHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebsocketConfig implements WebSocketConfigurer{
	
	private final HandshakeInterceptor handshakeInterceptor;
	private final NotificationWebsocketHandler notificationWebsocketHandler;
	
	// 채팅 웹소켓 처리 객체 의존성 주입(DI)
	private final ChattingWebsocketHandler chattingWebsocketHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
		// 알림 처리하는 핸들러와 주소 연결
		registry
			.addHandler(notificationWebsocketHandler, "/notification")
			.addInterceptors(handshakeInterceptor)
			.setAllowedOriginPatterns("http://localhost/", "http://127.0.0.1/", "http://192.168.10.31/")
			.withSockJS();
		
		
		// 채팅 처리 핸들러와 주소 연결
				registry
				.addHandler(chattingWebsocketHandler, "/chattingSock")
				.addInterceptors(handshakeInterceptor)
				.setAllowedOriginPatterns("http://localhost/", 
						"http://127.0.0.1/", 
						"http://192.168.10.22/")
				.withSockJS();
		
	}
	

}
