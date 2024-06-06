package com.project.foodpin.reservation.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.store.model.dto.Store;

public interface ReservationService {

	Store storeDetail(String storeNo);

	// 이용시간 조회
	Map<String, Object> selectUseTime(Reservation reservation);

	// 예약 저장
	int insertReservation(Map<String, Object> map);

	// 예약 가능 상태 변경
//	int updateStoreStatus(Store store);

	// 가게 이름 조회
	String selectStoreName(Store store);

	// 지정 휴무일 조회
	List<Off> selectOffDay(String storeNo);

	// 고정 휴무일 조회
	List<Off> selectOffWeek(String storeNo);


	
}
