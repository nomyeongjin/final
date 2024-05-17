package com.project.foodpin.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.reservation.model.service.ReservationService;
import com.project.foodpin.store.model.dto.Store;

import ch.qos.logback.core.model.Model;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("reservation")
public class ReservationController {
	
	private final ReservationService service;
	
	// ----------------- 화면 전환 -------------------
	@GetMapping("reservationDetail")
	public String reservationDetail() {
		return "reservation/reservationDetail";
	}
	
	@GetMapping("reservationCheck")
	public String reservationCheck(
			Reservation reservation, 
			Store store,
			Model model) {
		
		int storeNo;
		
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
