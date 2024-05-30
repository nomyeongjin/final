package com.project.foodpin.store.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;


public interface DetailStoreService {

	/** 가게 상세 조회
	 * @param storeNo
	 * @return
	 */
	Store storeDetail(String storeNo);
	

	/** 가게 찜
	 * @param map
	 * @return count
	 */
	int storeLike(Map<String, Integer> map);

	/** 가게 리뷰 상세 조회
	 * @param storeNo
	 * @return
	 */
	List<Review> reviewDetail(String storeNo);




	/** 가게 메뉴 조회
	 * @param storeNo
	 * @return
	 */
	List<Menu> menuDetail(String storeNo);




}
