package com.project.foodpin.store.model.dto;

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
public class Store {
	
	private String storeNo;
	private String storeName;
	private String storeInfo;
	private String storeLocation;
	private String storeStatus;
	private int storeMaxNumber;
	private String storeTel;
	private String openHour;
	private String closeHour;
	private String breaktimeStart;
	private String breaktimeEnd;
	private String storeClosed; // 폐업여부
	private String storeImg;
	private int totalRating;
	private int storeMaxTable;
	
	private int memberNo;
	
	
	// menu  
	private int menuNo;
	private String menuTitle;
	private String menuAmount;
	private String menuImgUrl;
	
	// 찜
	private String bookmarkCheck;
	private int bookmark;

	
}
