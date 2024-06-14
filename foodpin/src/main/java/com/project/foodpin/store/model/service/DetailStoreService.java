package com.project.foodpin.store.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.review.model.dto.Hash;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;


public interface DetailStoreService {

	/** 가게 상세 조회
	 * @param storeNo
	 * @return
	 */
	Store storeDetail(Map<String, Object> map);
	

	/** 가게 찜
	 * @param map
	 * @return count
	 */
	int storeLike(Map<String, Object> map);

	/** 가게 리뷰 상세 조회
	 * @param storeNo
	 * @return
	 */
	List<Review> reviewDetail(String storeNo);


	/** 리뷰 신고
	 * @param map
	 * @param reporterNo 
	 * @return
	 */
	int reviewReport(Map<String, Object> map);


	/** 가게 신고
	 * @param map
	 * @return
	 */
	int storeReport(Map<String, Object> map);


	/** 가게 해시태그 검색
	 * @param hashNo
	 * @return
	 */
	List<Store> hashSearchStore(String hashNo);


	/** 가게 해시태그 검색(해시태그 내용)
	 * @param hashNo
	 * @return
	 */
	Hash hashTitle(String hashNo);

	/** 가게 해시태그 추가
	 * @param map
	 * @return
	 */
	List<Store> addHash(List<Hash> hashList);


	/** 가게 해시태그 추가 (해시태그 타이틀)
	 * @param hashList
	 * @return
	 */
	List<Hash> hashTitle(List<Hash> hashList);


	/** 가게 영업시간, 휴무일, 브레이크타임 조회
	 * @param storeNo
	 * @return
	 * @throws Exception 
	 */
	Map<String, Object> storeOpen(String storeNo);





	


	








}
