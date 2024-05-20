package com.project.foodpin.myPage.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.service.MemberMyPageService;

import lombok.RequiredArgsConstructor;

@SessionAttributes({"loginMember"})
@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/member")
public class MemberMyPageController {

	private final MemberMyPageService service;
	
	
	@GetMapping("memberInfo")
	public String memberInfo() {
		return "myPage/member/memberInfo";
	}
	
	// 회원 정보 수정
	@PostMapping("memberInfo")
	public String updateInfo(
		Member inputMember,
		@SessionAttribute("loginMember") Member loginMember,
		RedirectAttributes ra) {
		
		int memberNo = loginMember.getMemberNo();
		inputMember.setMemberNo(memberNo);
		
		int result = service.updateInfo(inputMember);
		
		String message = null;
		
		if(result > 0) {
			message = "회원 정보가 수정되었습니다.";
			
			loginMember.setMemberNickname(inputMember.getMemberNickname());
			loginMember.setMemberTel(inputMember.getMemberTel());
		} else {
			message = "회원 정보 수정에 실패하였습니다.";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:memberInfo";
		
	}
	
	@PostMapping("memberChangePw")
	public String memberChangePw(
		@RequestParam Map<String, Object> paramMap,
		@SessionAttribute("loginMember") Member loginMember,
		RedirectAttributes ra) {
		
		int memberNo = loginMember.getMemberNo();
		int result = service.memberChangePw(paramMap, memberNo);
		
		String path = null;
		String message = null;
		
		return null;
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
