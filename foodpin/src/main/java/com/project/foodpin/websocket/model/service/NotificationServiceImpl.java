package com.project.foodpin.websocket.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.mapper.NotificationMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
	
	private final NotificationMapper mapper;
	@Override
	public int insertNotification(Notification notification) {
		return 0;
	}
	
	@Override
	public Store selectStoreData(int pkNo) {
		return null;
	}

}
