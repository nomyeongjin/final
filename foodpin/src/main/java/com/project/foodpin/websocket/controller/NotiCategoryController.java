package com.project.foodpin.websocket.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/")
public class NotiCategoryController {

	private final NotificationService service;

	@ResponseBody
	@GetMapping("{memberType}/notification/{notiCode}")
	public List<Notification> notiCategory(
			@PathVariable("memberType") String memberType, 
			@PathVariable ("notiCode") int notiCode,
			@SessionAttribute("loginMember") Member loginMember) {

		int memberNo = loginMember.getMemberNo();
		int memberCode = memberCode(memberType);

		Map<String, Object> map = new HashMap<>();
		map.put("memberNo", memberNo);
		map.put("memberCode", memberCode);
		map.put("notiCode", notiCode);

		return service.selectList(map);
	}

	// memberType을 이용한 memberCode 얻어오기
	private int memberCode(String memberType) {
		switch (memberType.toLowerCase()) {
		
		case "membernoticode":
			return 1;
		case "storenoticode":
			return 2;
		case "adminnoticode":
			return 3;
		default:
			return 0;
		}
	}

}
