package com.project.foodpin.store.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.store.model.mapper.DetailStoreMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional

public class DetailStoreServiceImpl implements DetailStoreService{

	private DetailStoreMapper mapper;
}
