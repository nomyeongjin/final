package com.project.foodpin.myPage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.service.MemberMyPageService;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@SessionAttributes({"loginMember"})
@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/member")
public class MemberMyPageController {

	private final MemberMyPageService service;
	
	// 회원 정보 페이지로
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
	
	// 회원 비밀번호 변경
	@PostMapping("memberChangePw")
	public String memberChangePw(
		@RequestParam Map<String, Object> paramMap,
		@SessionAttribute("loginMember") Member loginMember,
		RedirectAttributes ra) {
		
		int memberNo = loginMember.getMemberNo();
		int result = service.memberChangePw(paramMap, memberNo);
		
		String path = null;
		String message = null;
		
		if(result > 0) {
			message = "비밀번호가 변경 되었습니다.";
			path = "/myPage/member/memberInfo";
		} else {
			message = "비밀번호 변경에 실패하였습니다.";
			path = "/myPage/member/memberInfo";
		}
		
		ra.addFlashAttribute("message", message);
		return "redirect:" + path;
	}
	
	// 회원 예약창 목록조회
	@GetMapping("memberReservation")
	public String selectReservation(
		Model model,
		@SessionAttribute("loginMember") Member loginMember) {
		int memberNo = loginMember.getMemberNo();
		List<Reservation> reservation = service.selectReservation(memberNo);
		model.addAttribute("reservation", reservation);
		return "myPage/member/memberReservation";
	}
	
	// 북마크 목록 조회
	@GetMapping("memberLike")
	public String memberLikeList(
		Model model,
		@SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		List<Store> store = service.memberLikeList(memberNo);
		model.addAttribute("store", store);
		
		return "myPage/member/memberLike";
	}
	
	// 리뷰 목록 조회
	@GetMapping("memberReview")
	public String memberReview(
		Model model,
		@SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		List<Review> review = service.selectReviewList(memberNo);
		model.addAttribute("review", review);
		return "myPage/member/memberReview";
	}
	
	@GetMapping("memberSecession")
	public String memberSecession() {
		return "myPage/member/memberSecession";
	}
	
	
}
