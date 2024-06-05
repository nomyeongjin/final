package com.project.foodpin.store.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;
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

	/*
	 * @GetMapping("storeSearch") public String searchPage( String storeNo,
	 * 
	 * @SessionAttribute(value="loginMember", required = false) Member loginMember,
	 * Model model, RedirectAttributes ra) {
	 * 
	 * 
	 * Map<String, Object> map = new HashMap<>();
	 * 
	 * if(loginMember != null) { int memberNo = loginMember.getMemberNo();
	 * map.put("memberNo", memberNo); }
	 * 
	 * map.put("storeNo", storeNo);
	 * 
	 * Store store = service.storeDetail(map);
	 * 
	 * List<Review> reviewList = service.reviewDetail(storeNo);
	 * 
	 * Store offday = service.storeOff(storeNo); // request scope 값 세팅
	 * 
	 * 
	 * 
	 * 
	 * model.addAttribute("reviewList",reviewList); model.addAttribute("start" , 0);
	 * 
	 * // 불러온 store 정보에서 주소 쪼개기 String storeLocation = store.getStoreLocation();
	 * String[] arr = storeLocation.split("\\^\\^\\^");
	 * 
	 * 
	 * 
	 * model.addAttribute("postcode", arr[0]); model.addAttribute("address",
	 * arr[1]); model.addAttribute("detailAddress", arr[2]);
	 * 
	 * 
	 * 
	 * String path = null;
	 * 
	 * 
	 * 
	 * model.addAttribute("store", store);
	 * 
	 * model.addAttribute("storeHashList", store.getStoreHashList());
	 * model.addAttribute("menuList", store.getMenuList());
	 * model.addAttribute("imageList", store.getImageList());
	 * 
	 * path = "/store/storeSearch";
	 * 
	 * 
	 * return path; }
	 */

}
