package com.project.foodpin.chatting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.chatting.model.service.ChattingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("chatting")
@Controller
@RequiredArgsConstructor
public class ChattingController {

	
	private final ChattingService service;
	
	
	
	/** 채팅 화면 이동
	 * @return
	 */
	@GetMapping("chat")
	public String chat() {
		return "chatting/chat";
	}
	
	
	
	
}
