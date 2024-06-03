package com.project.foodpin.myPage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.service.ManagerMyPageService;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/manager")
public class ManagerMyPageController {

	private final ManagerMyPageService service;
	
	// 가게 입점 내역 조회
	@GetMapping("storeEnroll")
	public String managerEnroll(
		Model model) {
		
		int memberCode = 2;
		String memberStatus = "W";
		List<Member> storeMember = service.storeRequestList(memberCode, memberStatus);
		model.addAttribute("storeMember", storeMember);
		
		return "myPage/manager/storeEnroll";
	}
	
	// 가게 승인
	@PostMapping("approveMember/{memberNo}")
	public ResponseEntity<Map<String, Object>> approveMember(
		@PathVariable("memberNo") int memberNo) {
		
		boolean approve = service.approveMember(memberNo);
		Map<String, Object> response = new HashMap<>();
		response.put("success", approve);
		return ResponseEntity.ok(response);
	}
	
	// 가게 거절
	@PostMapping("refuseMember/{memberNo}")
	public ResponseEntity<Map<String, Object>> refuseMember(
			@PathVariable("memberNo") int memberNo) {
		
		boolean refuse = service.refuseMember(memberNo);
		Map<String, Object> response = new HashMap<>();
		response.put("success", refuse);
		return ResponseEntity.ok(response);
	}
	
	
	// 가게 입점 가게 리스트
	@GetMapping("ableStore")
	public String ableStore(
		Model model) {
			
		int memberCode = 2;
		String memberStatus = "N";
		List<Member> storeMember = service.storeRequestList(memberCode, memberStatus);
		model.addAttribute("storeMember", storeMember);
		return "myPage/manager/ableStore";
	}
	
	// 가게 거절 가게 리스트
	@GetMapping("unableStore")
	public String unableStore(
			Model model) {
		
		int memberCode = 2;
		String memberStatus = "Y";
		List<Member> storeMember = service.storeRequestList(memberCode, memberStatus);
		model.addAttribute("storeMember", storeMember);
		return "myPage/manager/unableStore";
	}
	
	// 가게 승인
	@PostMapping("unableStore/{memberNo}")
	public ResponseEntity<Map<String, Object>> ableStore(
		@PathVariable("memberNo") int memberNo) {
		
		boolean approve = service.approveMember(memberNo);
		Map<String, Object> response = new HashMap<>();
		response.put("success", approve);
		return ResponseEntity.ok(response);
	}
	
	// 가게 폐점
	@PostMapping("closeStore/{memberNo}")
	public ResponseEntity<Map<String, Object>> closeStore(
			@PathVariable("memberNo") int memberNo) {
		
		boolean closeStore = service.closeStore(memberNo);
		Map<String, Object> response = new HashMap<>();
		response.put("success", closeStore);
		return ResponseEntity.ok(response);
	}
	
	// 리뷰 신고
	@GetMapping("reportReview")
	public String storeInfo() {
		return "myPage/manager/reportReview";
	}
	
	// 정보 정정 신청
	@GetMapping("managerStoreInfo")
	public String memberReportReview() {
		return "myPage/manager/managerStoreInfo";
	}
	
	
	
	
}
