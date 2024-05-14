package com.project.foodpin.myPage.model.service;

import org.springframework.stereotype.Service;

import com.project.foodpin.myPage.model.mapper.ManagerMyPageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerMyPageServiceImpl implements ManagerMyPageService{
	
	private final ManagerMyPageMapper mapper;

}
