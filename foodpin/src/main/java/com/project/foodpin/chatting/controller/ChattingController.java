package com.project.foodpin.chatting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("chatting")
@Controller
public class ChattingController {

	
	/** 채팅 화면 이동
	 * @return
	 */
	@GetMapping("chat")
	public String chat() {
		return "chatting/chat";
	}
	
	
	
	
}
