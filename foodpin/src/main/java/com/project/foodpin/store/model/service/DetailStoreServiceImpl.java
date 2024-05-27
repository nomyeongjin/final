package com.project.foodpin.store.model.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.mapper.DetailStoreMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class) // 모든 예외 발생 시 롤백
@RequiredArgsConstructor
public class DetailStoreServiceImpl implements DetailStoreService{

	private final DetailStoreMapper mapper;

	// 가게 상세 조회
	@Override
	public Store storeDetail(String storeNo) {
	
		return mapper.storeDetail(storeNo);
	}
}
