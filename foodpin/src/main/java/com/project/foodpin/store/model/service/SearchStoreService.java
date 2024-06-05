package com.project.foodpin.store.model.service;

import java.util.Map;

import com.project.foodpin.store.model.dto.Store;

public interface SearchStoreService {

	// 가게 상세 검색
	Store storeSearch(Map<String, Object> map);

	// 가게 찜
	int storeLike(Map<String, Object> map);

}
