package com.project.foodpin.store.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Menu;
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

	@GetMapping("storeDetail/{storeNo}")
	public String storeDetail(@PathVariable("storeNo") String storeNo, Model model, RedirectAttributes ra) {

		Store store = service.storeDetail(storeNo);

		List<Review> reviewList = service.reviewDetail(storeNo);

		/* Store offday = service.storeOff(storeNo); */

		// 불러온 store 정보에서 주소 쪼개기
		String storeLocation = store.getStoreLocation();
		String[] arr = storeLocation.split("\\^\\^\\^");

		model.addAttribute("store", store);


		model.addAttribute("reviewList",reviewList); 
		model.addAttribute("start" , 0);


		model.addAttribute("postcode", arr[0]);
		model.addAttribute("address", arr[1]);
		model.addAttribute("detailAddress", arr[2]);

		String path = null;

		if (store != null) {

			// request scope 값 세팅
			model.addAttribute("store", store);

	
           
			model.addAttribute("menuList", store.getMenuList());
			model.addAttribute("imageList", store.getImageList());

			path = "/store/storeDetail";

		}
		return path;
	}

	/**
	 * 가게 찜
	 * 
	 * @param map
	 * @return count
	 */
	@ResponseBody
	@PostMapping("like")
	public int storeLike(@RequestBody Map<String, Integer> map) {

		return service.storeLike(map);

	}
	
	
	/** 리뷰 신고
	 * @param map
	 * @return
	 */
	@ResponseBody
	@PostMapping("reviewReport")
	public int reviewReport(@RequestBody Map<String, Object> map) {
		
		return service.reviewReport(map);
	}
	
	
	
	
	
	

}
