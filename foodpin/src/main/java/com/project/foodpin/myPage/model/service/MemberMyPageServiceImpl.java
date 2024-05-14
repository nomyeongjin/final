package com.project.foodpin.myPage.model.service;

import org.springframework.stereotype.Service;

import com.project.foodpin.myPage.model.mapper.MemberMyPageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberMyPageServiceImpl implements MemberMyPageService{
	
	private final MemberMyPageMapper mapper;

}
