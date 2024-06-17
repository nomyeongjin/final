package com.project.foodpin.store.model.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.myPage.model.dto.Off;
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
	
	public String storeNo;
	public String storeName;
	public String storeInfo;
	public String storeLocation;
	public String storeStatus;
	public int storeMaxNumber;
	public String storeTel;
	public String openHour;
	public String closeHour;
	public String breaktimeStart;
	public String breaktimeEnd;
	public String storeClosed; // 폐업여부
	public String storeImg;
	public double totalRating;

	public int storeMaxTable;
	
	public int memberNo;
	
	private MultipartFile storeImgInput;
	private int imgStatus;
	
	//가게 휴무일 목록
	public List<Off> offList;
	
	//가게 이미지 목록
	public List<UploadImage> imageList;

	// 가게 메뉴 목록
	public List<Menu> menuList;
	
	//가게 해시태그 목록
	public List<ReviewHash>storeHashList;
	
	//가게 카테고리 목록
	public List<StoreCategory> storeCategoryList;
	
	// 가게 검색 페이지의 가게 상세 카테고리
	public List<StoreCategory>searchStoreCategoryList;
	
	// 가게 검색 페이지의 가게 해시태그 목록
	public List<ReviewHash>searchStoreHashList;
	
	// 가게 검색 가게 상세 내용
	public List<Store>searchStoreList;

	// 찜
	private int likeCount;
	private int bookmark;
	
	// 리뷰 개수
	private int reviewCount;
	
	// 해시태그 개수
	private int hashCount;
	
	private int hashNo;
	
	// 메뉴
	private int menuNo;
	private String menuTitle;
	private int menuAmount;
	private String menuContent;
	private String menuImgUrl;
	
	// 가게 카테고리
	private int categoryCode;
	private String categorys;
	

	// 가게 주소
    private String postcode;
    private String address;
    private String detailAddress;

}
