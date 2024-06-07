package com.project.foodpin.websocket.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;

@Mapper
public interface NotificationMapper {
	
	// 알림 보낼 때 필요한 데이터 목록 조회
	Store selectStoreData(String pkNo);

	// 알림 삽입
	int insertNotification(Notification notification);

	// 읽지 않은 알림 조회
	int notReadCheck(int memberNo);

	// 알림 목록 조회
	List<Notification> selectNotification(int receiveMemberNo);

	// 알림 읽음으로 변경
	void updateNotification(int notificationNo);

	// 알림 삭제
	int deleteNotification(int notificationNo);

	// 일반 회원에게 보낼 알림
	void sendNotificationMember(Notification memberNotification);

	// 가게 사장님에게 보낼 알림
	void sendNotificationStore(Notification storeNotification);

	// 관리자에게 보낼 알림
	void sendNotificationManager(Notification managerNotification);


	Store selectStoreName(String storeNo);

}
