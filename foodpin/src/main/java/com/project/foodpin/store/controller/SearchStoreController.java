package com.project.foodpin.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.foodpin.store.model.service.SearchStoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("store")
public class SearchStoreController {

	private SearchStoreService service;

	// 가게 검색 페이지 이동(+ 카테고리 선택된 상태로 검색되어야 함)
	   @GetMapping("storeSearch")
	   public String searchPage() {
	      
	      return "store/storeSearch";
	   }
	   
}
