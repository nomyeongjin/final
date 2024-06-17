package com.project.foodpin.store.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Category;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;

public interface SearchStoreService {

	/**
	 * 카테고리에 해당하는 가게 리스트 조회
	 * 
	 * @param map
	 * @return
	 */
	List<Store> searchStore(Map<String, Object> map);
	
	// 카테고리에 해당하는 가게 상세 조
	List<Store> searchStoreList(Map<String, Object> map);

	List<StoreCategory> searchStoreCategoryList(String storeNo);

	List<ReviewHash> searchStoreHashList(String storeNo);

	/**
	 * 메인에서 가게 조회
	 * 
	 * @param map
	 * @return
	 */
	List<Store> mainStoreList(Map<String, Object> map);

	/**
	 * 카테고리 리스트 조회
	 * 
	 * @return
	 */
	List<Category> selectSearchCategory();
	/*	
		*//**
			 * 가게 찜
			 * 
			 * @param map
			 * @return count
			 *//*
				 * int storeLike(Map<String, Object> map);
				 * 
				 */

	
}
