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
	
	// 가게 승인
	@PostMapping("refuseMember/{memberNo}")
	public ResponseEntity<Map<String, Object>> refuseMember(
			@PathVariable("memberNo") int memberNo) {
		
		boolean refuse = service.refuseMember(memberNo);
		Map<String, Object> response = new HashMap<>();
		response.put("success", refuse);
		return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("reportReview")
	public String storeInfo() {
		return "myPage/manager/reportReview";
	}
	
	@GetMapping("managerStoreInfo")
	public String memberReportReview() {
		return "myPage/manager/managerStoreInfo";
	}
	
	
	
	
}
