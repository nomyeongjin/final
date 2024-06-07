package com.project.foodpin.store.model.dto;

import java.util.List;

import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.review.model.dto.UploadImage;

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
	private double totalRating;

	private int storeMaxTable;
	
	private int memberNo;
	
	
	//가게 이미지 목록
	private List<UploadImage> imageList;

	// 가게 메뉴 목록
	private List<Menu> menuList;
	
	//가게 해시태그 목록
	private List<ReviewHash>storeHashList;
	
	//가게 카테고리 목록
	private List<StoreCategory>storeCategoryList;

	// 찜
	private int likeCount;
	private int bookmark;
	
	// 리뷰 개수
	private int reviewCount;
	
	// 메뉴
	private int menuNo;
	private String menuTitle;
	private int menuAmount;
	private String menuContent;
	private String menuImgUrl;
	
	// 가게 카테고리
	private int categoryCode;

	
}
