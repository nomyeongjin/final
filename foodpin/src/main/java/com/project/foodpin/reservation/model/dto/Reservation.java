package com.project.foodpin.reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
	
	private int reservNo;
	private String reservDate; // 예약 일자
	private String reservTime; // 예약 시간
	private int reservCount; // 예약 인원
	private String reservStatusFl;
	private String reservRequest;
	
	private int memberNo;
	private String storeNo; // 음식점 번호
	
	private String memberName; // 예약 회원명
	private String memberTel; // 예약 회원 연락처
	
	private String storeName;
	private String storeLocation;
	
	private int fixCount;
	private int waitCount;
	private int lastCount;
	private int cancelNoshowCount;

	
	private String visitName;
	private String visitTel;

	private int noshowCount;
	
	private int counts;
	
	private String memberNickname;

}
