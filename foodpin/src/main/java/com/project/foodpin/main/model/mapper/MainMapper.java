package com.project.foodpin.main.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Category;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;

@Mapper
public interface MainMapper {

	List<Store> selectStoreList();

	List<Category> selectMainCategoryList();

}
