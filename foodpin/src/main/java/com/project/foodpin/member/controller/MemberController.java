package com.project.foodpin.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.project.foodpin.member.model.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

	private final MemberService service;
	
	/** 로그인 페이지로 이동
	 * @return
	 */
	@GetMapping("login")
	public String loginPage() {
		return "/member/login";
	}
	
	
	
	
	
}
