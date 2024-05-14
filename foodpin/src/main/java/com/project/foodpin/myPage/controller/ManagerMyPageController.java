package com.project.foodpin.myPage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.myPage.model.service.ManagerMyPageService;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/manager")
public class ManagerMyPageController {

	private final ManagerMyPageService serivce;
	
	
	
	
}
