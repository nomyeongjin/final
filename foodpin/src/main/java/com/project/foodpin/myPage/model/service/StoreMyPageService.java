package com.project.foodpin.myPage.model.service;

import java.util.List;

import com.project.foodpin.reservation.model.dto.Reservation;

public interface StoreMyPageService {

	/** 전체 예약 조회
	 * @param memberNo
	 * @return
	 */
	List<Reservation> reservAll(int memberNo); 


}
