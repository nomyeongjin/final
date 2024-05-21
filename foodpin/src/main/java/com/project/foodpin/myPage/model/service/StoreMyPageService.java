package com.project.foodpin.myPage.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.reservation.model.dto.Reservation;

public interface StoreMyPageService {

	/** 전체 예약 조회
	 * @param memberNo
	 * @return reservList
	 */
	List<Reservation> reservAll(int memberNo);

	/** 확정된 예약 조회
	 * @param memberNo
	 * @return reservList
	 */
	List<Reservation> reservConfirm(Map<String, Object> map); 


}
