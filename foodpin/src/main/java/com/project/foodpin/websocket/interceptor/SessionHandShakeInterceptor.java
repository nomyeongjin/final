package com.project.foodpin.websocket.interceptor;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import jakarta.servlet.http.HttpSession;


@Component
public class SessionHandShakeInterceptor implements HandshakeInterceptor{

	// Handler 동작 전에 수행
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		
		// request가 참조하는 객채가
		// ServletServerHttpRequest로 다운 캐스팅이 가능한가?
		if(request instanceof ServletServerHttpRequest) {
			
			ServletServerHttpRequest serverHttpRequest = (ServletServerHttpRequest)request;
			
			// 웹소켓 동작을 요청한 클라이언트의 세션을 얻어옴
			HttpSession session = serverHttpRequest.getServletRequest().getSession();
			
			// 가로챈 세션을 Handler에 전달할 수 있게 세션을 얻어옴
			attributes.put("session", session);
		}
		
		return true; // 가로채기 진행 여부 true (가로챌거야)
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception exception) {
		
	}

}
