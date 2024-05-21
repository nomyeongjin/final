package com.project.foodpin.myPage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.service.StoreMyPageService;
import com.project.foodpin.reservation.model.dto.Reservation;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/store")
public class StoreMyPageController {

	private final StoreMyPageService service;
	
	
	@GetMapping("storeInfo")
	public String storeInfo() {
		return "myPage/store/storeInfo";
	}
	
	// -----------------------------
	
	/** 예약 관리 화면 이동
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("reservation")
	public String reservation(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		int memberNo = loginMember.getMemberNo();
		
		List<Reservation> reservList = service.reservAll(memberNo);
		
		model.addAttribute("reservList", reservList);
		
		return "myPage/store/reservation";
	}

	/** 예약 전체 조회
	 * @return reservList
	 */
	@GetMapping("reservAll")
	public List<Reservation> reservAll(@SessionAttribute Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		
		List<Reservation> reservList = service.reservAll(memberNo);
		
		return reservList;
	}
	
	/** 확정된 예약 조회
	 * @return reservList
	 */
	@GetMapping("reservConfirm")
	public List<Reservation> reservConfirm(@SessionAttribute Member loginMember, 
			@RequestParam("reservStatusFl") String reservStatusFl) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("memberNo", loginMember.getMemberNo());
		map.put("reservStatusFl", reservStatusFl);
		
		return service.reservConfirm(map);
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
