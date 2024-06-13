package com.project.foodpin.store.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Category;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;
import com.project.foodpin.store.model.mapper.SearchStoreMapper;

import lombok.RequiredArgsConstructor;


@Service
@Transactional(rollbackFor = Exception.class) // 모든 예외 발생 시 롤백
@RequiredArgsConstructor
public class SearchStoreServiceImpl implements SearchStoreService{

	private final SearchStoreMapper mapper;
	
    // 카테고리에 해당하는 가게 리스트 조회
	@Override
	public List<Store> searchStoreList(Map<String, Object> map) {
	
		return mapper.searchStoreList(map);
	}

    


	@Override
	public List<StoreCategory> searchStoreCategoryList(String storeNo) {
		
		return mapper.searchStoreCategoryList(storeNo);
	}




	@Override
	public List<ReviewHash> searchStoreHashList(String storeNo) {
		
		return mapper.searchStoreHashList(storeNo);
	}




	
	 // 메인에서 가게 조회
	  
	  @Override public List<Store> mainStoreList(Map<String, Object> map) {
	  

	 List<Store> mainSearchStore = mapper.mainSearchStore(map);
	  
	
	  
	  return mainSearchStore; 
	  }
	 


    // 가게 상세에서 쓸 카테고리 리스트 조회
	@Override
	public List<Category> selectSearchCategory() {
		
		
		List<Category> searchCategory = mapper.selectSearchCategory();
		
		return searchCategory;
	}
	
	

	// 가게 찜 
	/*
	 * @Override public int storeLike(Map<String, Object> map) {
	 * 
	 * int result = 0;
	 * 
	 * //1. 좋아요가 체크된 상태인 경우 (bookmark ==1) // -> Bookmark 테이블에 DELETE
	 * if(Integer.parseInt(String.valueOf(map.get("bookmark")) )== 1) {
	 * 
	 * result = mapper.deleteSearchStoreLike(map);
	 * 
	 * 
	 * 
	 * }
	 * 
	 * //2. 좋아요가 해제된 상태인 경우 (bookmark ==0) // -> Bookmark 테이블에 INSERT
	 * 
	 * else {
	 * 
	 * result = mapper.insertSearchStoreLike(map); }
	 * 
	 * // 3. 다시 해당 게시글의 좋아요 개수를 조회해서 반환 if(result > 0) { return
	 * mapper.selectSearchLikeCount(map.get("storeNo")); }
	 * 
	 * 
	 * 
	 * return -1; }
	 */

	//비동기로 화면 바꿀 카테고리 리스트 조회
	
	// 비동기로 좋아요 
	
	// 비동기로 거리순, 리뷰순 좋아요순 평점순
	

	
}
