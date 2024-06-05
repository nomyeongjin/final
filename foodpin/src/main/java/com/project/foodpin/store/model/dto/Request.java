package com.project.foodpin.store.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Request {
	
	private int requestNo;
	private int requestCategoryCode;
	private String requestContent;
	private String requestCategoryTitle;
	private String requestDelFl;

	private int storeNo;
	private int memberNo;
	private String requestDate;
	private String storeTel;
	
	private String memberName;
	private String storeName;
}
