package com.project.foodpin.reservation.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.reservation.model.mapper.ReservationMapper;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{
	
	private final ReservationMapper mapper;
	
	@Override
	public String selectStoreList(Store store) {
		return mapper.selectStoreList(store);
	}

}

