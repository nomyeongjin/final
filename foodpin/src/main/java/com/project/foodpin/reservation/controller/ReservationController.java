package com.project.foodpin.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
public class ReservationController {
	
	private final ReservationService service;
	
	// ----------------- 화면 전환 -------------------
	
	
	@GetMapping("storeDetail/{storeNo}/reservation")
	public String reservation(
			@PathVariable("storeNo") String storeNo,
			Model model) {
		
		Store store = service.storeDetail(storeNo);
		
		model.addAttribute("store", store);
		
		return "reservation/reservationDetail";
	}
	
	
	
	@GetMapping("storeDetail/{storeNo}/reservation/reservationCheck")
	public String reservationCheck(
			@PathVariable("storeNo") String storeNo) {
		
//		return service.selectChekcList();
		return "reservation/reservationCheck";
	}

	@GetMapping("storeDetail/{storeNo}/reservation/reservationConfirm")
	public String reservationConfirm(
			@PathVariable("storeNo") String storeNo) {
		return "reservation/reservationConfirm";
	}
	
	@GetMapping("storeDetail/{storeNo}/reservation/detail")
	public String detail(
			@PathVariable("storeNo") String storeNo) {
		return "reservation/detail";
	}

	
	/****** form 태그 제출를 위한 ******/
	@PostMapping("storeDetail/{storeNo}/reservation/nextPage")
	public String nextPage(
			@PathVariable("storeNo") String storeNo) {
		
//		return "reservation/reservationCheck";
		return "reservation/reservationCheck";
	}
	
	// 예약하기 눌렀을 때 form 제출 DB 저장 필요
	@PostMapping("storeDetail/{storeNo}/reservation/insertPage")
	public String insertPage(
			@PathVariable("storeNo") String storeNo) {
		return  "reservation/reservationConfirm";
	}
	
}
