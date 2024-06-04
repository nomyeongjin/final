package com.project.foodpin.websocket.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Notification {
	
	private int notifiactionNo;
	private String notificationContent;
	private String notificationCheck;
	private String notificationDate;
	
	private String notificationUrl; // 예약 관련인 경우 마이페이지
									// 리뷰 관련인 경우 가게 리뷰 페이지
									// 신고 관련인 경우(사장님, 관리자) 가게 상세 페이지(가게 페이지 확인 후 처리 예정)
	
	private String sendMemberProfileImg;
	private int sendMemberNo;
	private int receiveMemberNo;
	
	private String notifiactionType;
	private String title;
	private int pkNo; // 신고하기 눌렀을 때 어느 가기에서 신고하기가 접수 되었는지 확인 하는 용도
	
	private String reservDate;
}
