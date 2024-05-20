package com.project.foodpin.websocket.model.service;

import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;

public interface NotificationService {

	int insertNotification(Notification notification);

	Store selectStoreData(int pkNo);

}
