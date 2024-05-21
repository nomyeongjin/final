package com.project.foodpin.reservation.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Reservation {
	
	private int reservNo;
	private String reservDate; // 예약 일자
	private String reservTime; // 예약 시간
	private int reservCount; // 예약 인원
	private String reservStatusFl;
	private String reservRequest;
	
	private int memberNo;
	private int storeNo; // 음식점 번호
	

}
