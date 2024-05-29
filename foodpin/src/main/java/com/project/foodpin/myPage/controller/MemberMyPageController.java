package com.project.foodpin.myPage.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
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
		@RequestParam("uploadImg") MultipartFile profileImg,
		@SessionAttribute("loginMember") Member loginMember,
		RedirectAttributes ra) throws IllegalStateException, IOException {
		
		int memberNo = loginMember.getMemberNo();
		inputMember.setMemberNo(memberNo);
		
		int result = service.updateInfo(profileImg, inputMember);
		
		String message = null;
		
		if(result > 0) {
			message = "회원 정보가 수정되었습니다.";
			
			loginMember.setMemberNickname(inputMember.getMemberNickname());
			loginMember.setMemberEmail(inputMember.getMemberEmail());
			loginMember.setMemberTel(inputMember.getMemberTel());
			loginMember.setProfileImg(inputMember.getProfileImg());
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
	
	
	// 예약 확정 조회
	@GetMapping("reservation/fix")
	public String reservationFix(
		@SessionAttribute("loginMember") Member loginMember,
		Model model) {
		
		int memberNo = loginMember.getMemberNo();
		List<Reservation> reservation = service.reservationFix(memberNo);
		int noshowCount = service.noshowCount(memberNo);
		model.addAttribute("reservation", reservation);
		model.addAttribute("noshowCount", noshowCount);
		
		return "myPage/member/reservation/fix";
	}
	
	// 예약 대기 조회
	@GetMapping("reservation/wait")
	public String reservationWait(
		@SessionAttribute("loginMember") Member loginMember,
		Model model) {
		
		int memberNo = loginMember.getMemberNo();
		List<Reservation> reservation = service.reservationWait(memberNo);
		int noshowCount = service.noshowCount(memberNo);
		model.addAttribute("reservation", reservation);
		model.addAttribute("noshowCount", noshowCount);
		
		return "myPage/member/reservation/wait";
	}
	
	// 지난 예약 조회
	@GetMapping("reservation/last")
	public String reservationLast(
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		
		int memberNo = loginMember.getMemberNo();
		List<Reservation> reservation = service.reservationLast(memberNo);
		int noshowCount = service.noshowCount(memberNo);

		model.addAttribute("reservation", reservation);
		model.addAttribute("noshowCount", noshowCount);

		return "myPage/member/reservation/last";
	}
	
	// 취소/노쇼 예약 조회
	@GetMapping("reservation/cancelNoshow")
	public String reservationCancelNoshow(
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		
		int memberNo = loginMember.getMemberNo();
		List<Reservation> reservation = service.reservationCancelNoshow(memberNo);
		int noshowCount = service.noshowCount(memberNo);

		model.addAttribute("reservation", reservation);
		model.addAttribute("noshowCount", noshowCount);

		return "myPage/member/reservation/cancelNoshow";
	}
	
	// 예약 취소하기
	@ResponseBody
	@PostMapping("cancelReservation")
	public boolean cancelReservation(
		@RequestBody int reservNo,
		@SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		int result = service.cancelReservation(memberNo, reservNo);
		
		
		if(result > 0) {
			return true;
		} else {
			return false;
			
		}
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
	
	// 회원 탈퇴 페이지로
	@GetMapping("memberSecession")
	public String memberSecession() {
		return "myPage/member/memberSecession";
	}
	
	// 회원 탈퇴
	@PostMapping("secession")
	public String secession(
		@SessionAttribute("loginMember") Member loginMember,
		@RequestParam("memberPw") String memberPw,
		SessionStatus status,
		RedirectAttributes ra) {
		
		int memberNo = loginMember.getMemberNo();
		
		int result = service.secession(memberPw, loginMember);
		
		int reserv = service.selectReserv(memberNo);
		
		String path = null;
		String message = null;
		
		if(reserv == 0) {
			message = "예약 확정/대기 상태가 있을 경우 취소해 주세요";
			path = "reservation/fix";
		}
		
		else if(result == 0) {
			message = "비밀번호가 일치하지 않습니다";
			path = "memberSecession";
			
		} else {
			message = "탈퇴 처리가 되었습니다";
			status.setComplete();
			path = "/";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
	
}
