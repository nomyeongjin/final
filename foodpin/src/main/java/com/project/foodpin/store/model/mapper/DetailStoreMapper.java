package com.project.foodpin.store.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface DetailStoreMapper {

	/** 가게 상세 조회
	 * @param storeNo
	 * @return store
	 */
	Store storeDetail(String storeNo);

}
