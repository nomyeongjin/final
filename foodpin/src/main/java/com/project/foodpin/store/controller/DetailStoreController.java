package com.project.foodpin.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.store.model.service.DetailStoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("store")
public class DetailStoreController {
	
	private DetailStoreService service;

	
	@GetMapping("storeDetail")
	public String detailPage() {
		
		return "store/storeDetail";
	}
}
