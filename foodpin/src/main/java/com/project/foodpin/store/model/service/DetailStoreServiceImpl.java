package com.project.foodpin.store.model.service;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.mapper.DetailStoreMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class) // 모든 예외 발생 시 롤백
@RequiredArgsConstructor
public class DetailStoreServiceImpl implements DetailStoreService{

	private final DetailStoreMapper mapper;

	// 가게 상세 조회
	@Override
	public Store storeDetail(String storeNo) {
	
		return mapper.storeDetail(storeNo);
	}
	
	

	// 가게 메뉴 상세 조회
	@Override
	public List<Menu> menuDetail(String storeNo) {
		
	  List<Menu> menuList = mapper.menuDetail(storeNo);
	
		return menuList;
	}
	
	
	// 가게 리뷰 상세 조회
	@Override
	public List<Review> reviewDetail(String storeNo) {
		
		List<Review> reviewList = mapper.reviewDetail(storeNo);
		
		return reviewList;
	}
	
	


	// 가게 찜 
	@Override
	public int storeLike(Map<String, Integer> map) {
		
      int result = 0;
		
		//1. 좋아요가 체크된 상태인 경우 (bookmark ==1)
		// -> Bookmark 테이블에 DELETE
		if(map.get("bookMark") == 1) {
			
			result = mapper.deleteStoreLike(map);
			
			
			
		}
			
		//2. 좋아요가 해제된 상태인 경우 (bookmark ==0)
		// -> Bookmark 테이블에 INSERT
		
		else {
			
			result = mapper.insertStoreLike(map);
		}
		
		// 3. 다시 해당 게시글의 좋아요 개수를 조회해서 반환
		if(result > 0) {
			return mapper.selectLikeCount(map.get("storeNo"));
		}
		
		
		
		return -1;
	}

	
}
