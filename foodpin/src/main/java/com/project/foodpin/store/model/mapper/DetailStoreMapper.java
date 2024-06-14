package com.project.foodpin.store.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.review.model.dto.Hash;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface DetailStoreMapper {

	/**
	 * 가게 상세 조회
	 * 
	 * @param storeNo
	 * @return store
	 */
	Store storeDetail(Map<String, Object> map);

	/**
	 * 가게 찜 해제
	 * 
	 * @param map
	 * @return
	 */
	int deleteStoreLike(Map<String, Object> map);

	/**
	 * 가게 찜 체크
	 * 
	 * @param map
	 * @return
	 */
	int insertStoreLike(Map<String, Object> map);

	/**
	 * 가게 찜 개수 조회
	 * 
	 * @param object
	 * @return
	 */
	int selectLikeCount(Object object);

	/**
	 * 가게 리뷰 상세 조회
	 * 
	 * @param storeNo
	 * @return
	 */
	List<Review> reviewDetail(String storeNo);

	/**
	 * 리뷰 신고
	 * 
	 * @param map
	 * @return
	 */
	int reviewReport(Map<String, Object> map);

	/**
	 * 리뷰 신고 회원번호 조회
	 * 
	 * @param string
	 * @return
	 */
	int selectMemberNo(int reviewNo);

	/**
	 * 가게 정보 정정 신고 회원번호 조회
	 * 
	 * @param storeNo
	 * @return
	 */
	int selectReportMemberNo(String storeNo);

	/**
	 * 가게 정보 정정 신고
	 * 
	 * @param map
	 * @return
	 */
	int storeReport(Map<String, Object> map);

	/**
	 * 리뷰 신고자 이름 찾기
	 * 
	 * @param reporterNo
	 * @return
	 */
	String selectReporterName(int reporterNo);


	/** 해시태그 가게 검색
	 * @param hashNo
	 * @return
	 */
	List<Store> hashSearchStore(String hashNo);

	/** 해시태그 가게 검색(해시태그 내용)
	 * @param hashNo
	 * @return
	 */
	Hash hashTitle(String hashNo);

	/** 가게 영업시간, 휴무일, 브레이크타임 조회
	 * @param storeNo
	 * @return
	 */
	Store storeOpen(String storeNo);

	/** 고정 휴무일 조회
	 * @param storeNo
	 * @return 
	 */
	List<String> selectWeekOff(String storeNo);





	
	
	
	
	
	/*
		*//**
			 * 가게 휴무일 
			 * 
			 * @param storeNo
			 * @return
			 *//*
				 * List<Off> storeOffList(String storeNo);
				 * 
				 */
	
	
	
	
	
	
	

}
