package com.project.foodpin.store.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Store {
	
	private int storeNo;
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
	
}
