package com.project.foodpin.store.controller;

import java.util.ArrayList;
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
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;
import com.project.foodpin.store.model.service.SearchStoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("store")
public class SearchStoreController {

	private final SearchStoreService service;

	
	// 메인의 카테고리 코드를 pathvariable로 가져와 해당하는 가게 리스트 select해서 보내주기
	@GetMapping("storeSearch/{categoryCode}")
	public String storeDetail(@PathVariable("categoryCode") int categoryCode, 
			@SessionAttribute(value="loginMember", required = false) Member loginMember,
			Model model, RedirectAttributes ra) {
		

		Map<String, Object> map = new HashMap<>();
		
		if(loginMember != null) {
			int memberNo = loginMember.getMemberNo();
			map.put("memberNo", memberNo);
		}
	
		map.put("categoryCode", categoryCode);
		map.put("closedYn", "N");

		// 카테고리에 해당하는 가게 리스트 조회하기
		List<Store> searchStoreList = service.searchStoreList(map);
		
		
		 for (Store store : searchStoreList) {
		        String storeLocation = store.getStoreLocation();
		      
		            String[] arr = storeLocation.split("\\^\\^\\^");
		          
		                store.setPostcode(arr[0]);
		                store.setAddress(arr[1]);
		                store.setDetailAddress(arr[2]);
		       
		                String storeNo = store.getStoreNo();
		                List<StoreCategory> searchStoreCategoryList = service.searchStoreCategoryList(storeNo);
		                store.setSearchStoreCategoryList(searchStoreCategoryList);

		                List<ReviewHash> searchStoreHashList = service.searchStoreHashList(storeNo);
		                store.setSearchStoreHashList(searchStoreHashList);
		  				
		        		 
		            }
		
		   

		String path = null;
		
	
		// 카테고리가 등록된 가게들만 나옴 
			model.addAttribute("searchStoreList", searchStoreList);

			path = "store/storeSearch";

		
		return path;
	}
	
	
	


	}
