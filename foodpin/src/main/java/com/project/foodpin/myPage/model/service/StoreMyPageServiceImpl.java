package com.project.foodpin.myPage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.foodpin.myPage.model.mapper.StoreMyPageMapper;
import com.project.foodpin.reservation.model.dto.Reservation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreMyPageServiceImpl implements StoreMyPageService{
	
	private final StoreMyPageMapper mapper;

	
	// 전체 예약 조회
	@Override
	public List<Reservation> reservAll(int memberNo) {
		return mapper.reservAll(memberNo);
	}


	// 확정된 예약 조회
	@Override
	public List<Reservation> reservConfirm(Map<String, Object> map) {
		return mapper.reservConfirm(map);
	}


}
