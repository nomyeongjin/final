package com.project.foodpin.store.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.store.model.dto.Store;


public interface SearchStoreService {


    
	/** 카테고리에 해당하는 가게 리스트 조회
	 * @param map
	 * @return
	 */
	List<Store> searchStoreList(Map<String, Object> map);

	/** 검색 페이지에서 보이는 가게 정보
	 * @param map
	 * @return
	 */
	List<Store> searchStoreDetail(Map<String, Object> map);

}
