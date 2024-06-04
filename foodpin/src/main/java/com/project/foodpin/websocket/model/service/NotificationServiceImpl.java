package com.project.foodpin.websocket.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.mapper.NotificationMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
	
	private final NotificationMapper mapper;
	
	// 알림 삽입
	@Override
	public int insertNotification(Notification notification) {
		return mapper.insertNotification(notification);
	}
	
	// 알림 보낼 때 필요한 데이터 목록 조회
	@Override
	public Store selectStoreData(String pkNo) {
		return mapper.selectStoreData(pkNo);
	}
	
	
	// 일반 회원
	@Override
	public void sendNotificationMember(Notification memberNotification) {
		mapper.sendNotificationMember(memberNotification);
	}
	
	// 가게
	@Override
	public void sendNotificationStore(Notification storeNotification) {
		mapper.sendNotificationStore(storeNotification);
	}
	
	// 관리자
	@Override
	public void sendNotificationManager(Notification managerNotification) {
		mapper.sendNotificationManager(managerNotification);
	}
	
	// 읽지 않은 알람 조회
	@Override
	public int notReadCheck(int memberNo) {
		return mapper.notReadCheck(memberNo);
	}
	
	// 알림 목록 조회
	@Override
	public List<Notification> selectNotification(int receiveMemberNo) {
		return mapper.selectNotification(receiveMemberNo);
	}
	
	// 알림 읽음으로 변경
	@Override
	public void updateNotification(int notificationNo) {
		mapper.updateNotification(notificationNo);
	}
	
	// 알림 삭제
	@Override
	public int deleteNotification(int notificationNo, int memberNo) {
		
		int result = mapper.deleteNotification(notificationNo);
		if(result > 0) return mapper.notReadCheck(memberNo);
			return 0;
		}
		
}
