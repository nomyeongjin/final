package com.project.foodpin.email.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.foodpin.email.model.service.EmailService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {
	
	private final EmailService service;
	
	@ResponseBody
	@PostMapping("memberFlag")
	public int memberFlag(@RequestBody String email) {
		service.sendEmail("memberFlag", email);
		return 1;
	}

}
