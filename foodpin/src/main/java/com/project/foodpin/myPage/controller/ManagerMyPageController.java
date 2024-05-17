package com.project.foodpin.myPage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.myPage.model.service.ManagerMyPageService;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/manager")
public class ManagerMyPageController {

	private final ManagerMyPageService serivce;
	
	
	@GetMapping("storeEnroll")
	public String managerEnroll() {
		return "myPage/manager/storeEnroll";
	}
	
	@GetMapping("reportReview")
	public String storeInfo() {
		return "myPage/manager/reportReview";
	}
	
	@GetMapping("managerStoreInfo")
	public String memberReportReview() {
		return "myPage/manager/managerStoreInfo";
	}
	
	
	
}
