package com.project.foodpin.review.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("review")
@RequiredArgsConstructor
public class ReveiwController {

	private final ReviewService service;
	
	
	
	@GetMapping("reviewPage")
	public String reviewPage() {
		return "storeReview/storeReview";
	}
	
	
	@GetMapping("reviewComplete")
	public String reviewComplete() {
		return "storeReview/storeReviewComplete";	
	}
	
	
	
	@PostMapping("insertReview")
	public String insertReview(
		@SessionAttribute("loginMember") Member loginMember,
		@RequestParam("images") List<MultipartFile> images,
		@RequestParam("reviewRating") int reviewRating,
		Review inputReview) throws IllegalStateException, IOException {
		
		inputReview.setMemberNo(loginMember.getMemberNo());
		
		// 추후 수정 예정
		inputReview.setStoreNo(1);
		
		int result = service.insertReview(inputReview, images);
		
		String path = null;
		
		if(result > 0) {
			path = "storeReview/storeReviewComplete";
		}else {
			path = "storeReview/storeReview";
		}
		
		return path;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
	