package com.project.foodpin.store.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;


public interface SearchStoreService {


    
	/** 카테고리에 해당하는 가게 리스트 조회
	 * @param map
	 * @return
	 */
	List<Store> searchStoreList(Map<String, Object> map);



	List<StoreCategory> searchStoreCategoryList(String storeNo);



	List<ReviewHash> searchStoreHashList(String storeNo);

}
