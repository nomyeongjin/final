package com.project.foodpin.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.main.model.service.MainService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MainController {

	private final MainService service;
	
	@RequestMapping("/")
	public String main() {
		return "common/main";
	}
	
	
}
