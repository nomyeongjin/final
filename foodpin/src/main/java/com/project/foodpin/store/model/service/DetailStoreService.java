package com.project.foodpin.store.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;


public interface DetailStoreService {

	/** 가게 상세 조회
	 * @param storeNo
	 * @return
	 */
	Store storeDetail(Map<String, Object> map);
	

	/** 가게 찜
	 * @param map
	 * @return count
	 */
	int storeLike(Map<String, Object> map);

	/** 가게 리뷰 상세 조회
	 * @param storeNo
	 * @return
	 */
	List<Review> reviewDetail(String storeNo);


	/** 리뷰 신고
	 * @param map
	 * @param reporterNo 
	 * @return
	 */
	int reviewReport(Map<String, Object> map);


	/** 가게 신고
	 * @param map
	 * @return
	 */
	int storeReport(Map<String, Object> map);


	/*
	 * List<Off> storeOffList(String storeNo);
	 * 
	 */
	


	








}
