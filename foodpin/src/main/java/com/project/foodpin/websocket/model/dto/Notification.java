package com.project.foodpin.websocket.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
	
	private int notificationNo;
	private String notificationContent;
	private String notificationCheck;
	private String notificationDate;
	
	private String notificationUrl; // 예약 관련인 경우 마이페이지
									// 리뷰 관련인 경우 가게 리뷰 페이지
									// 신고 관련인 경우(사장님, 관리자) 가게 상세 페이지(가게 페이지 확인 후 처리 예정)
	
	private String sendMemberProfileImg;
	private int sendMemberNo;
	private int receiveMemberNo;
	private int notiCode;
	
	private String notificationType;
	private String title;
	private String pkNo;
	
	private String reservDate;
	private String storeName;
	private String memberNickname;
	
	private String reportDate;
}
