package com.project.foodpin.store.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Store;


@Mapper
public interface SearchStoreMapper {


	/** 카테고리에 해당하는 가게 리스트 조회
	 * @param map
	 * @return
	 */
	List<Store> searchStoreList(Map<String, Object> map);

	/** 동기 / 카테고리로 조회한 가게들 상세 정보
	 * @param map
	 * @return
	 */
	List<Store> searchStoreDetail(Map<String, Object> map);

	List<Store> searchStoreDetail(String storeNo);

}
