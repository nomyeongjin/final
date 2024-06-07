package com.project.foodpin.store.model.service;


import java.util.List;
import java.util.Map;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.review.model.dto.Review;
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
	public Store storeDetail(Map<String, Object> map) {
	
		return mapper.storeDetail(map);
	}
	
	


	
	// 가게 리뷰 상세 조회
	@Override
	public List<Review> reviewDetail(String storeNo) {
		
		List<Review> reviewList = mapper.reviewDetail(storeNo);
		
		return reviewList;
	}
	
	


	// 가게 찜 
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


	// 리뷰 신고
	@Override
	public int reviewReport(Map<String, Object> map, int reporterNo) {
		
		int reviewNo = Integer.parseInt(String.valueOf(map.get("reviewNo")));
		
		int memberNo = mapper.selectMemberNo(reviewNo);
		
		String reporterName = mapper.selectReporterName(reporterNo);
		
		map.put("memberNo", memberNo);
		map.put("reporterNo", reporterNo);
		map.put("reporterName", reporterName);
		
		return mapper.reviewReport(map);
	}




	// 가게 정보 정정 신고
	@Override
	public int storeReport(Map<String, Object> map) {
	    // Map에서 데이터를 추출
	    String storeNo = (String) map.get("storeNo");
	    String requestContent = (String) map.get("requestContent");
	    String requestCategoryTitle = (String) map.get("requestCategoryTitle");


	    // Map에 requestCategoryCode를 추가
	    switch (requestCategoryTitle) {
	        case "changeBasicinfo":
	            map.put("requestCategoryCode", "1");
	            break;
	        case "changeMenu":
	            map.put("requestCategoryCode", "2");
	            break;
	        case "chageStoreTime":
	            map.put("requestCategoryCode", "6");
	            break;
	        case "storeClosed":
	            map.put("requestCategoryCode", "7");
	            break;
	        default:
	            map.put("requestCategoryCode", "0"); // 기본값
	            break;
	    }

	   
	    return mapper.storeReport(map);
	}


	
}
