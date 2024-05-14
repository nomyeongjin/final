package com.project.foodpin.myPage.model.service;

import org.springframework.stereotype.Service;

import com.project.foodpin.myPage.model.mapper.StoreMyPageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreMyPageServiceImpl implements StoreMyPageService{
	
	private final StoreMyPageMapper mapper;

}
