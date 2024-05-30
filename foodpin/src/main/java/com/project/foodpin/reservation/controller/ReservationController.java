package com.project.foodpin.reservation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.reservation.model.service.ReservationService;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("store")
@SessionAttributes({"loginMember"})
public class ReservationController {
	
	private final ReservationService service;
	
	// ----------------- 화면 전환 -------------------
	
	// 에약하기 페이지
	@GetMapping("storeDetail/{storeNo}/reservation")
	public String reservation(
			@PathVariable("storeNo") String storeNo,
			Model model) {
		
		Store store = service.storeDetail(storeNo);
		
		model.addAttribute("store", store);
		
		return "reservation/reservationDetail";
	}
	
	// 이용 시간 비동기 조회
	@ResponseBody
	@PostMapping("useTime")
	public Map<String, Object> useTime(
			@RequestBody Reservation reservation) {
		
		return service.selectUseTime(reservation);
	}
	
	// 예약 확정 하기 전 동의 페이지
	@GetMapping("storeDetail/{storeNo}/reservation/reservationCheck")
	public String reservationCheck(
			@PathVariable("storeNo") String storeNo) {
		
//		return service.selectChekcList();
		return "reservation/reservationCheck";
	}

	// 예약 확정 후 예약 확인 페이지
	@GetMapping("storeDetail/{storeNo}/reservation/reservationConfirm")
	public String reservationConfirm(
			@PathVariable("storeNo") String storeNo) {
		return "reservation/reservationConfirm";
	}
	
	// 예약하기 상세정보 페이지
	@GetMapping("storeDetail/{storeNo}/reservation/detail")
	public String detail(
			@PathVariable("storeNo") String storeNo,
			Model model) {
		
		Store store = service.storeDetail(storeNo);
		
		model.addAttribute("store", store);
		return "reservation/detail";
	}

	
	/****** form 태그 제출를 위한 ******/
	@PostMapping("storeDetail/{storeNo}/reservation/nextPage")
	public String nextPage(
			@PathVariable("storeNo") String storeNo) {
		
		return "reservation/reservationCheck";
	}
	
	// 예약하기 눌렀을 때 form 제출 DB 저장 필요
	@PostMapping("storeDetail/{storeNo}/reservation/insertPage")
	public String insertPage(
			@PathVariable("storeNo") String storeNo,
			@SessionAttribute("loginMember") Member loginMember,
			Reservation reservation,
			Store store,
			Member member) {
	
		Map<String, Object> map = new HashMap<>();
		map.put("storeNo", storeNo);
		map.put("memberNo", loginMember.getMemberNo());
		map.put("reservDate", reservation.getReservDate());
		map.put("reservTime", reservation.getReservTime());
		map.put("reservCount", reservation.getReservCount());
		map.put("reservRequest", reservation.getReservRequest());
		
		map.put("visitName", reservation.getVisitName());
		map.put("visitTel", reservation.getVisitTel());
		
		int insert = service.insertReservation(map);
		
		String path = null;
		
		if(insert > 0)  {
			
			return "reservation/reservationConfirm";
		} 
		return "reservation/reservationCheck";
		
	}
	
	
	// 예약 가능 상태 변경
	@ResponseBody
	@PostMapping("updateStoreStatus")
	public int updateStoreStatus(
			@RequestBody Store store) {
		return service.updateStoreStatus(store);
	}
	
}
