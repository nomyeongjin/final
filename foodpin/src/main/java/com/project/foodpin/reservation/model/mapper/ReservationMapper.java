package com.project.foodpin.reservation.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface ReservationMapper {

	String selectStoreList(int storeNo);


}
