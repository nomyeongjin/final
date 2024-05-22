package com.project.foodpin.myPage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.reservation.model.dto.Reservation;

@Mapper
public interface StoreMyPageMapper {

	
	/** 회원번호로 사업자번호 조회
	 * @param memberNo
	 * @return storeNo
	 */
	int selectStoreNo(int memberNo);
	
	// ----- 예약 
	
	
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
