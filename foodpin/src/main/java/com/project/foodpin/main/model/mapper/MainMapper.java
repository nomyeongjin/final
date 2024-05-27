package com.project.foodpin.main.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface MainMapper {

	List<Store> selectStoreList();

}
