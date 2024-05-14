package com.project.foodpin.myPage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.service.MemberMyPageService;

import lombok.RequiredArgsConstructor;

//@SessionAttributes({"loginMember"})
@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/member")
public class MemberMyPageController {

	private final MemberMyPageService serivce;
	
	
	@GetMapping("memberInfo")
	public String memberInfo() {
		return "myPage/member/memberInfo";
	}
	
	@GetMapping("memberReservation")
	public String memberReservation() {
		return "myPage/member/memberReservation";
	}
	
	@GetMapping("memberLike")
	public String memberLike() {
		return "myPage/member/memberLike";
	}
	
	@GetMapping("memberReview")
	public String memberReview() {
		return "myPage/member/memberReview";
	}
	
	@GetMapping("memberSecession")
	public String memberSecession() {
		return "myPage/member/memberSecession";
	}
	
	
}
