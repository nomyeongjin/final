package com.project.foodpin.myPage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.myPage.model.service.StoreMyPageService;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/store")
public class StoreMyPageController {

	private final StoreMyPageService serivce;
	
	
	@GetMapping("storeInfo")
	public String storeInfo() {
		return "myPage/store/storeInfo";
	}
	
	@GetMapping("reservation")
	public String reservation() {
		return "myPage/store/reservation";
	}
	
	@GetMapping("review")
	public String review() {
		return "myPage/store/review";
	}
	
	@GetMapping("ceoInfo")
	public String ceoInfo() {
		return "myPage/store/ceoInfo";
	}
	
	
}
