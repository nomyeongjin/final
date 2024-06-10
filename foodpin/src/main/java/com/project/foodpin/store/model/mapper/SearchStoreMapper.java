package com.project.foodpin.store.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;


@Mapper
public interface SearchStoreMapper {


	/** 카테고리에 해당하는 가게 리스트 조회
	 * @param map
	 * @return
	 */
	List<Store> searchStoreList(Map<String, Object> map);


	List<StoreCategory> searchStoreCategoryList(String storeNo);


	List<ReviewHash> searchStoreHashList(String storeNo);

}
