package com.project.foodpin.review.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Report {

	private int reportNo;
	private String reportContent;
	private int reviewNo;
	private int memberNo;
	private String reportDate;
	
	private String reviewContent;
	private int storeNo;
	private String storeTel;
	private String storeName;
	private String memberName;
	
}
