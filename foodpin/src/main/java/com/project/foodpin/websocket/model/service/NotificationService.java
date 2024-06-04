package com.project.foodpin.websocket.model.service;

import java.util.List;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;

public interface NotificationService {

	// 알림 삽입
	int insertNotification(Notification notification);

	// 알림 보낼 때 필요한 데이터 목록 조회
	Store selectStoreData(int pkNo);

	// 회원에게 알림 전송
	void sendNotificationMember(Notification memberNotification);

	// 사장님에게 알림 전송
	void sendNotificationStore(Notification storeNotification);

	// 관리자에게 알림 전송
	void sendNotificationManager(Notification managerNotification);

	
	// 읽지 않은 알람 조회
	int notReadCheck(int memberNo);

	// 알림 목록 조회
	List<Notification> selectNotification(int receiveMemberNo);

	// 알림 읽음으로 변경
	void updateNotification(int notificationNo);

	// 알림 삭제 
	int deleteNotification(int notificationNo, int memberNo);




	
}
