package com.project.foodpin.store.model.service;

import com.project.foodpin.store.model.dto.Store;

public interface DetailStoreService {

	/** 가게 상세 조회
	 * @param storeNo
	 * @return
	 */
	Store storeDetail(String storeNo);

}
