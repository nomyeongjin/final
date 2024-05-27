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
		/* Store offday = service.storeOff(storeNo); */
		
		// 불러온 store 정보에서 주소 쪼개기
		String storeLocation = store.getStoreLocation();
		String[] arr = storeLocation.split("\\^\\^\\^");
		
		model.addAttribute("store", store);
		
		model.addAttribute("postcode", arr[0]);
		model.addAttribute("address", arr[1]);
		model.addAttribute("detailAddress", arr[2]);
		
		String path = null;
		

		if(store !=null) { 
			path ="store/storeDetail"; 
			
			// request scope 값 세팅
			model.addAttribute("store",store) ;
			
		}
		
		return path;
	}
	

	
}
