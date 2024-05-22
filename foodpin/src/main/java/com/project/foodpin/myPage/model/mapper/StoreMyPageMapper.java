package com.project.foodpin.myPage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.reservation.model.dto.Reservation;

@Mapper
public interface StoreMyPageMapper {

	// ----- 예약 
	
	
	/** 전체 예약 조회
	 * @param storeNo
	 * @return
	 */
	List<Reservation> reservAll(int memberNo);

}
