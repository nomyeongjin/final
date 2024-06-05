package com.project.foodpin.websocket.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("notification")
@RequiredArgsConstructor
public class NotificationController {
	
	private final NotificationService service;
	
	/** 읽지 않은 알림 개수 조회
	 * @param loginMember
	 * @return
	 */
	@GetMapping("notReadCheck")
	public int notReadCheck(@SessionAttribute("loginMember") Member loginMember, Model model) {
		return service.notReadCheck(loginMember.getMemberNo());
	}
	
	/** 알림 목록 조회
	 * @param loginMember
	 * @return
	 */
	@GetMapping("")
	public List<Notification> selectNotification(@SessionAttribute("loginMember") Member loginMember) {
		int receiveMemberNo = loginMember.getMemberNo();
		return service.selectNotification(receiveMemberNo);
	}
	
	/** 알림 읽음으로 변경
	 * @param notificationNo
	 */
	@PutMapping("")
	public void updateNotification(@RequestBody int notificationNo) {
		service.updateNotification(notificationNo);
	}
	
	/** 알림 삭제
	 * @param notificationNo
	 * @return 읽지 않은 알림 개수
	 */
	@DeleteMapping("")
	public int deleteNotification(@RequestBody int notificationNo,
			@SessionAttribute("loginMember") Member loginMember) {
		return service.deleteNotification(notificationNo, loginMember.getMemberNo());
		
	}

}
