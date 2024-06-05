package com.project.foodpin.reservation.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.reservation.model.mapper.ReservationMapper;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{
	
	private final ReservationMapper mapper;
	
	@Override
	public Store storeDetail(String storeNo) {
		return mapper.storeDetail(storeNo);
	}
	
	
	// 이용시간 조회
	@Override
	public Map<String, Object> selectUseTime(Reservation reservation) {
		
		// 오픈, 마감, 브레이크 시간 조회
		Store reservTimes = mapper.selectUseTime(reservation);
		
		// 예약한 날짜의 예약 건수 조회 

		List<Reservation> confirmReservDate = mapper.confirmReservDate(reservation);
		
		
		// mapper 두개 호출한 걸 map에 담아서 전달
		Map<String, Object> selectDateMap = new HashMap<>();
		
		selectDateMap.put("reservTimes", reservTimes);
		selectDateMap.put("confirmReservDate", confirmReservDate);
		
		return selectDateMap;
	}
	
	
	// 예약 저장
	@Override
	public int insertReservation(Map<String, Object> map){
		int result = mapper.insertReservation(map);
		if(result > 0) {
			int reservationNo = (int)map.get("reservNo");
			return reservationNo;
		}
		
		return 0; 
	}
	
	// 예약 가능 상태 변경
//	@Override
//	public int updateStoreStatus(Store store) {
//		return mapper.updateStoreStatus(store);
//	}
	
	// 가게 이름 조회
	@Override
	public String selectStoreName(Store store) {
		return mapper.selectStoreName(store);
	}
	
	// 지정 휴무일 조회
	@Override
	public List<Off> selectOffDay(String storeNo) {
		return mapper.selecetOffDay(storeNo);
	}
	
	// 고정 휴무일 조회
	@Override
	public List<Off> selectOffWeek(String storeNo) {
		return mapper.selectOffWeek(storeNo);
	}
}

