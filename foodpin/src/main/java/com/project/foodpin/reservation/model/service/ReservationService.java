package com.project.foodpin.reservation.model.service;

import com.project.foodpin.store.model.dto.Store;

public interface ReservationService {


	Store storeDetail(String storeNo);

	String selectStoreNo(String storeNo);



}
