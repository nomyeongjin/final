package com.project.foodpin.store.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.store.model.mapper.StoreMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional

public class StoreServiceImpl implements StoreService{

	private StoreMapper mapper;
}
