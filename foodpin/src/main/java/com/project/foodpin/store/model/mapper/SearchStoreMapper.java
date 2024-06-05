package com.project.foodpin.store.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface SearchStoreMapper {


	/** 가게 상세 검색
	 * @param map
	 * @return
	 */
	Store storeSearch(Map<String, Object> map);

	int deleteStoreLike(Map<String, Object> map);

	int insertStoreLike(Map<String, Object> map);

	int selectLikeCount(Object object);

}
