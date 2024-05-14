package com.project.foodpin.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.reservation.model.service.ReservationService;

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
	public String reservationCheck() {
		return "reservation/reservationCheck";
	}
	
	@GetMapping("reservationConfirm")
	public String reservationConfirm() {
		return "reservation/reservationConfirm";
	}
	// ----------------------------------------------

}
