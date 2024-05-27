package com.project.foodpin.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("reservation")
public class ReservationController {
	
	private final ReservationService service;
	
	// ----------------- 화면 전환 -------------------
	
	@GetMapping("reservationDetail")
	public String reservationDetail(
			Model model,
			Store store
//			@RequestParam("storeNo") int storeNo
			) {
		
		return "reservation/reservationDetail";
//		return service.selectStoreList(storeNo);
	}
	
	@GetMapping("reservationCheck")
	public String reservationCheck() {
		
//		return service.selectChekcList();
		return "reservation/reservationCheck";
	}

	@GetMapping("reservationConfirm")
	public String reservationConfirm() {
		return "reservation/reservationConfirm";
	}
	
	@GetMapping("detail")
	public String detail() {
		return "reservation/detail";
	}

	
	/****** form 태그 제출를 위한 ******/
	@PostMapping("nextPage")
	public String nextPage(
			@RequestParam("reservDate") String reservDate) {
		
		return "reservation/reservationCheck";
	}
	
	// 예약하기 눌렀을 때 form 제출 DB 저장 필요
	@PostMapping("insertPage")
	public String insertPage() {
		return  "reservation/reservationConfirm";
	}
	
}
