package com.project.foodpin.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
			//@RequestParam int storeNo
			) {
		
		
		
		
		return "reservation/reservationDetail";
//		return service.selectStoreList(store.getStoreNo());
	}
	
	
	
	
	@GetMapping("reservationCheck")
	public String reservationCheck(
			Reservation reservation, 
			Store store,
			Member member,
			Model model) {
		
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

}
