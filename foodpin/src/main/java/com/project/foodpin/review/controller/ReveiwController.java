package com.project.foodpin.review.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.review.model.service.ReviewService;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.service.DetailStoreService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("review")
@RequiredArgsConstructor
public class ReveiwController {

	private final ReviewService service;
	
	// 리뷰 페이지 
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
	
	
	// 리뷰 작성
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
			model.addAttribute("storeNo", storeNo);
			model.addAttribute("reviewCount", reviewCount);
		}else {
			path = "storeReview/storeReview";
		}
		
		return path;
	}
	
	
	@ResponseBody
	@PostMapping("deleteReview")
	public int deleteReview(@RequestBody int reviewNo) {
		return service.deleteReview(reviewNo);
	}
	
	
	// 리뷰 수정 화면 전환
	@GetMapping("reviewUpdate/{storeNo}/{reviewNo}")
	public String reviewUpdatePage(
		@PathVariable("storeNo") String storeNo,
		@PathVariable("reviewNo") int reviewNo,
		Model model
			) {
		
		Store store = service.selectStore(storeNo);
		List<Menu> menuList = service.selectMenu(storeNo);
		Review review = service.selectReview(reviewNo);
		
		model.addAttribute("menuList", menuList);
		model.addAttribute("store" , store);
		model.addAttribute("review" , review);
		
		return "storeReview/storeReviewUpdate";
	}
	
	
	// 리뷰 수정
	@PostMapping("updateReview/{storeNo}/{reviewNo}")
	public String updateReview(
		@PathVariable("storeNo") String storeNo,
		@PathVariable("reviewNo") int reviewNo,
		Review inputReview,
		@RequestParam("images") List<MultipartFile> images,
		@RequestParam("hashNo") List<Integer> hashNo,
		@RequestParam("menuNo") List<Integer> menuNo,
		@RequestParam(value="deleteOrder", required=false) String deleteOrder,
		@SessionAttribute("loginMember") Member loginMember,
		RedirectAttributes ra
		) throws IllegalStateException, IOException {
		
		inputReview.setStoreNo(storeNo);
		inputReview.setReviewNo(reviewNo);
		inputReview.setMemberNo(loginMember.getMemberNo());
		
		int result = service.updateReview(inputReview, menuNo, hashNo, deleteOrder, images);
		
		
		String path = null;
		String message = null;
		
		if(result > 0) {
			path = "redirect:/myPage/member/memberReview";
			message = "리뷰가 수정되었습니다.";
		} else {
			path = "redirect:/storeReview/storeReviewUpdate";
			message = "수정 실패";
		}
		
		ra.addFlashAttribute("message", message);
		
		return path;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
	