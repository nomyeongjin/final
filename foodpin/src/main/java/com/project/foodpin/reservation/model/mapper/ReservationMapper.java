package com.project.foodpin.reservation.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface ReservationMapper {

	Store storeDetail(String storeNo);

	// 이용시간 조회
	Store selectUseTime(Reservation reservation);

	// 예약 저장
	int insertReservation(Map<String, Object> map);

	// 예약하려는 날짜의 예약 건수 조회
	List<Reservation> confirmReservDate(Reservation reservation);

	// 예약 가능 상태 변경
//	int updateStoreStatus(Store store);

	// 가게 이름 조회
	String selectStoreName(Store store);

	// 지정 휴무일 조회
	List<Off> selecetOffDay(String storeNo);

	// 고정 휴무일 조회
	List<Off> selectOffWeek(String storeNo);

	// 가게 리뷰 조회
	List<Review> reviewDetail(String storeNo);

	// 가게 리뷰 개수 조회
	int reviewCount(String storeNo);

}
