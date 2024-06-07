package com.project.foodpin.store.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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

		// 카테고리에 해당하는 가게 리스트 조회하기
		List<Store> searchStoreList = service.searchStoreList(map);
		
	



		String path = null;
		
		if(searchStoreList.isEmpty()) {
			
			ra.addFlashAttribute("message","해당 카테고리의 가게가 없습니다.");
			path = "/store/storeSearch";

			
			
		}else{

			model.addAttribute("searchStoreList", searchStoreList);
			for (Store store : searchStoreList) {
			    String storeNo = store.getStoreNo();
			    
			    map.put("storeNo", storeNo);
			}
			// 가게들 상세 내용 조회
			List<Store> searchStoreDetail = service.searchStoreDetail(map);
	        model.addAttribute("searchStoreDetail",searchStoreDetail);


		}
			path = "/store/storeSearch";

		
		return path;
	}
	


}
