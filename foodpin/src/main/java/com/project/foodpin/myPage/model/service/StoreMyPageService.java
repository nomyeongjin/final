package com.project.foodpin.myPage.model.service;

import java.util.List;

import com.project.foodpin.reservation.model.dto.Reservation;

public interface StoreMyPageService {

	/** 회원번호로 사업자번호 조회
	 * @param memberNo
	 * @return storeNo
	 */
	int selectStoreNo(int memberNo); 
	
	/** 전체 예약 조회
	 * @param storeNo
	 * @return
	 */
	List<Reservation> reservAll(int memberNo);

	/** 확정된 예약 조회
	 * @param memberNo
	 * @return
	 */
	List<Reservation> reservConfirm(int memberNo);




}
