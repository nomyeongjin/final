package com.project.foodpin.reservation.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface ReservationMapper {

	Store storeDetail(String storeNo);

	
	// 이용시간 조회
	Map<String, Object> selectUseTime(Store storeNo);

	// 예약 저장
	int insertReservation(Map<String, Object> map);

}
