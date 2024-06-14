package com.project.foodpin.store.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.review.model.dto.Hash;
import com.project.foodpin.review.model.dto.Review;
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
	public String storeDetail(@PathVariable("storeNo") String storeNo, 
			@SessionAttribute(value="loginMember", required = false) Member loginMember,
			Model model, RedirectAttributes ra) {
		

		Map<String, Object> map = new HashMap<>();
		
		if(loginMember != null) {
			int memberNo = loginMember.getMemberNo();
			map.put("memberNo", memberNo);
		}
	
		map.put("storeNo", storeNo);

		Store store = service.storeDetail(map);

		List<Review> reviewList = service.reviewDetail(storeNo);
		



		model.addAttribute("reviewList",reviewList); 
		model.addAttribute("start" , 0);

		// 불러온 store 정보에서 주소 쪼개기
		String storeLocation = store.getStoreLocation();
		String[] arr = storeLocation.split("\\^\\^\\^");



		model.addAttribute("postcode", arr[0]);
		model.addAttribute("address", arr[1]);
		model.addAttribute("detailAddress", arr[2]);

		

		String path = null;

	

			model.addAttribute("store", store);
	
			model.addAttribute("storeCategoryList", store.getStoreCategoryList());
			model.addAttribute("storeHashList", store.getStoreHashList());
			model.addAttribute("menuList", store.getMenuList());
			model.addAttribute("imageList", store.getImageList());
			/*
			 * model.addAttribute("offList", store.getOffList());
			 */
			path = "/store/storeDetail";

		
		return path;
	}
	
	
	/** 가게 신고
	 * @param map
	 * @return
	 */
	@ResponseBody
	@PostMapping("storeReport")
	public int storeReport(@RequestBody Map<String, Object> map) {
		
		return service.storeReport(map);
	}
	

	/**
	 * 가게 찜
	 * 
	 * @param map
	 * @return count
	 */
	@ResponseBody
	@PostMapping("like")
	public int storeLike(@RequestBody Map<String, Object> map) {

		return service.storeLike(map);

	}
	
	
	/** 리뷰 신고
	 * @param map
	 * @return
	 */
	@ResponseBody
	@PostMapping("reviewReport")
	public int reviewReport(
		@RequestBody Map<String, Object> map,
		@SessionAttribute("loginMember") Member loginMember) {
		
		return service.reviewReport(map);
	}
	
	
	/** 가게 해시태그 검색
	 * @param hashNo
	 * @param model
	 * @return
	 */
	@GetMapping("searchStore/{hashNo}")
	public String hashSearchStore(
		@PathVariable("hashNo") String hashNo, Model model) {
		
		List<Store> storeList = service.hashSearchStore(hashNo);
		
		Hash hashTitle = service.hashTitle(hashNo);
		
		for (Store store : storeList) {
	        String storeLocation = store.getStoreLocation();
	        String[] arr = storeLocation.split("\\^\\^\\^");
	        
	        if (arr.length == 3) {
	            store.setPostcode(arr[0]);
	            store.setAddress(arr[1]);
	            store.setDetailAddress(arr[2]);
	        } else {
	            // 주소 정보가 정확히 3부분으로 나뉘지 않을 경우 빈 값으로 설정
	            store.setPostcode("");
	            store.setAddress("");
	            store.setDetailAddress("");
	        }
	    }
		
		model.addAttribute("storeList", storeList);
		model.addAttribute("hashTitle", hashTitle);
			
		return "store/hashSearch"; 
	}
	
	/** 가게 영업시간, 휴무일, 브레이크타임 조회
	 * @param storeNo
	 * @return
	 */
	@GetMapping("storeOpen")
	@ResponseBody
	public Map<String, Object> storeOpen(@RequestParam("storeNo") String storeNo) {
		
		return service.storeOpen(storeNo);
	}
	
	

	
	
	
	
	
	
	
	
	

}
