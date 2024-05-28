package com.project.foodpin.myPage.model.dto;

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
public class Off {
	
	private int offWeekNo; // 고정 휴무일 번호
	private int offWeek; // 고정 휴무일 번호


	private int offDayNo; // 지정 휴무일 번호
	private String offDayTitle; // title (데이터 객체명)
	private String offWeekStart; // start
	private String offWeekEnd; // end
	
	private String storeNo; // 음식점 번호
	
}
