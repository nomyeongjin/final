package com.project.foodpin.reservation;

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
	
	@GetMapping("reservationDetail")
	public String reservationDetail() {
		return "reservation/reservationDetail";
	}

}
