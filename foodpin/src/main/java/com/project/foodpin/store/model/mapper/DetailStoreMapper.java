package com.project.foodpin.store.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface DetailStoreMapper {

	/** 가게 상세 조회
	 * @param storeNo
	 * @return store
	 */
	Store storeDetail(Map<String, Object> map);

	


	
	/** 가게 찜 해제 
	 * @param map
	 * @return
	 */
	int deleteStoreLike(Map<String, Object> map);


	/** 가게 찜 체크
	 * @param map
	 * @return
	 */
	int insertStoreLike(Map<String, Object> map);


	/** 가게 찜 개수 조회
	 * @param object
	 * @return
	 */
	int selectLikeCount(Object object);


	/** 가게 리뷰 상세 조회
	 * @param storeNo
	 * @return
	 */
	List<Review> reviewDetail(String storeNo);

	/** 리뷰 신고
	 * @param map
	 * @return
	 */
	int reviewReport(Map<String, Object> map);


	/** 리뷰 신고 회원번호 조회
	 * @param string
	 * @return
	 */
	int selectMemberNo(int reviewNo);



	/** 가게 정보 정정 신고 회원번호 조회
	 * @param storeNo
	 * @return
	 */
	int selectReportMemberNo(String storeNo);



	/** 가게 정보 정정 신고 
	 * @param map
	 * @return
	 */
	int storeReport(Map<String, Object> map);


















}
