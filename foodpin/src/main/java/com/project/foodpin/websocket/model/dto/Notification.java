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
	private String notificationUrl;
	private String sendMemberProfileImg;
	private int sendMemberNo;
	private int receiveMemberNo;
	private String notificationType;
	
	private String notifiactionType;
	private String title;
	private int pkNo;
	
	private String reservDate;
}
