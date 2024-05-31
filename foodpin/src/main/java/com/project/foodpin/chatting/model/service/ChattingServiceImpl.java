package com.project.foodpin.chatting.model.service;

import org.springframework.stereotype.Service;

import com.project.foodpin.chatting.model.mapper.ChattingMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService {

	private final ChattingMapper mapper;
	
}
