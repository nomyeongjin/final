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
	private int reviewNo;
	private String reportContent;
	private int memberNo;
	private String reportDate;
	private String reporterName;
	
	private String reviewContent;
	private int storeNo;
	private String storeTel;
	private String storeName;
	private String memberName;
	
}
