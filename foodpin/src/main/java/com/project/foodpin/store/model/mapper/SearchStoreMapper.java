package com.project.foodpin.store.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Category;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;

@Mapper
public interface SearchStoreMapper {

	
	List<Store> searchStore(Map<String, Object> map);
	/**
	 * 카테고리에 해당하는 가게 리스트 조회
	 * 
	 * @param map
	 * @return
	 */
	List<Store> searchStoreList(Map<String, Object> map);

	List<StoreCategory> searchStoreCategoryList(String storeNo);

	List<ReviewHash> searchStoreHashList(String storeNo);

	/**
	 * 메인에서 조회하는 가게 리스트 수
	 * 
	 * @param map
	 * @return
	 */
	int getSearchStoreListCount(Map<String, Object> map);

	/**
	 * 메인에서 조회하는 가게
	 * 
	 * @param map
	 * @return
	 */
	List<Store> mainSearchStore(Map<String, Object> map);

	/**
	 * 가게 상세에서 사용할 카테고리 리스트
	 * 
	 * @return
	 */
	List<Category> selectSearchCategory();

	


}
