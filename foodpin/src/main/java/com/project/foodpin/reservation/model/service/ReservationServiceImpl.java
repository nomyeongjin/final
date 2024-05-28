package com.project.foodpin.reservation.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public Map<String, Object> selectUseTime(Store storeNo) {
		return mapper.selectUseTime(storeNo);
	}
	
	
	// 예약 저장
	@Override
	public int insertReservation(Map<String, Object> map){
		return mapper.insertReservation(map);
		
	}
}

