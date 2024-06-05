package com.project.foodpin.store.model.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.mapper.SearchStoreMapper;


@Service
@Transactional
public class SearchStoreServiceImpl implements SearchStoreService{

	private SearchStoreMapper mapper;
	
	@Override
	public Store storeSearch(Map<String, Object> map) {
	
		return mapper.storeSearch(map);
	}

	@Override
	public int storeLike(Map<String, Object> map) {
		
      int result = 0;
		
		//1. 좋아요가 체크된 상태인 경우 (bookmark ==1)
		// -> Bookmark 테이블에 DELETE
		if(Integer.parseInt(String.valueOf(map.get("bookmark")) )== 1) {
			
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
