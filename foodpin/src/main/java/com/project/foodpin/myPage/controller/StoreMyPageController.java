package com.project.foodpin.myPage.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.service.StoreMyPageService;
import com.project.foodpin.reservation.model.dto.Reservation;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/store")
@SessionAttributes({"storeNo"})
public class StoreMyPageController {

	private final StoreMyPageService service;
	
	
//	@GetMapping("selectStoreNo")
//	public String selectStoreNo(@SessionAttribute("loginMember") Member loginMember, Model model) {
//		
//		int memberNo = loginMember.getMemberNo();
//		int storeNo  = service.selectStoreNo(memberNo); // 세션에서 얻어온 회원번호로 사업자 번호 조회
//		
//		model.addAttribute("storeNo", storeNo); // 사업자 번호
//		
//		return "redirect:/";
//	}
	
	@GetMapping("storeInfo")
	public String storeInfo() {
		return "myPage/store/storeInfo";
	}
	
	// -----------------------------
	
	/** 예약 관리 화면 이동 (+ 예약 전체 조회)
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("reservation")
	public String reservation(@SessionAttribute("loginMember") Member loginMember, Model model, Model m) {
		
		int memberNo = loginMember.getMemberNo();
//		int storeNo  = service.selectStoreNo(memberNo); // 세션에서 얻어온 회원번호로 사업자 번호 조회
//		
		List<Reservation> reservList = service.reservAll(memberNo);
		model.addAttribute("reservList", reservList);
		
		return "myPage/store/reservation";
	}

	/** 예약 전체 조회 (비동기)
	 * @return reservList
	 */
	@ResponseBody
	@GetMapping("reservAll")
	public List<Reservation> reservAll(@SessionAttribute("loginMember") Member loginMember) {
		int memberNo = loginMember.getMemberNo();
		return service.reservAll(memberNo);
	}
	
	/** 확정된 예약 전체 조회 (비동기)
	 * @return reservList
	 */
	@ResponseBody
	@GetMapping("reservConfirm")
	public List<Reservation> reservConfirm(@SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		return service.reservConfirm(memberNo);
	}
	
	
	//----
	@GetMapping("review")
	public String review() {
		return "myPage/store/review";
	}
	
	@GetMapping("ceoInfo")
	public String ceoInfo() {
		return "myPage/store/ceoInfo";
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
