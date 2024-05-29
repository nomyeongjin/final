package com.project.foodpin.review.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.review.model.service.ReviewService;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("review")
@RequiredArgsConstructor
public class ReveiwController {

	private final ReviewService service;
	
	
	
	@GetMapping("reviewPage/{storeNo}")
	public String reviewPage(
		@PathVariable("storeNo") String storeNo
		,Model model) {
		
		Store store = service.selectStore(storeNo);
		
		List<Menu> menuList = service.selectMenu(storeNo);

		model.addAttribute("store", store);
		model.addAttribute("menuList", menuList);
		
		return "storeReview/storeReview";
	}
	
	
	@PostMapping("insertReview/{storeNo}")
	public String insertReview(
		@PathVariable("storeNo") String storeNo,
		@SessionAttribute("loginMember") Member loginMember,
		@RequestParam("images") List<MultipartFile> images,
		@RequestParam("hashNo") List<Integer> hashNo,
		@RequestParam("menuNo") List<Integer> menuNo,
		@RequestParam("reviewRating") int reviewRating,
		Model model,
		Review inputReview) throws IllegalStateException, IOException {
		
		inputReview.setMemberNo(loginMember.getMemberNo());
		inputReview.setStoreNo(storeNo);
		
		int result = service.insertReview(inputReview, menuNo, hashNo, images);
		
		String path = null;
		int memberNo = loginMember.getMemberNo();
		int reviewCount = service.reviewCount(memberNo);
		
		if(result > 0) {
			path = "storeReview/storeReviewComplete";
			model.addAttribute("reviewCount", reviewCount);
		}else {
			path = "storeReview/storeReview";
		}
		
		return path;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
	