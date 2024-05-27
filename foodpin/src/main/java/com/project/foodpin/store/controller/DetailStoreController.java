package com.project.foodpin.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.service.DetailStoreService;

import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("store")
public class DetailStoreController {
	
	private final DetailStoreService service;

	
	
	
	/*
	 * @GetMapping("storeDetail") public String detailPage() {
	 * 
	 * return"store/storeDetail"; }
	 */
	
	
	@GetMapping("storeDetail/{storeNo}")
	public String storeDetail(
			@PathVariable("storeNo") String storeNo,
			Model model,
			RedirectAttributes ra
			) {
		
		Store store = service.storeDetail(storeNo);
		
		String path = null;
		

		if(store !=null) { 
			path ="store/storeDetail"; 
			
			// request scope 값 세팅
			model.addAttribute("store",store) ;
			
		}else {
			path = "redirect:/";  
			
			ra.addFlashAttribute("message", "해당 가게가 존재하지 않습니다");
		}
		
		return path;
	}
}
