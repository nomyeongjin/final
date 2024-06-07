package com.project.foodpin.main.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.foodpin.main.model.mapper.MainMapper;
import com.project.foodpin.store.model.dto.Category;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService{

	private final MainMapper mapper;

	// 가게 리스트 조회
	@Override
	public List<Store> selectMainStore() {
		
		
		List<Store> storeList = mapper.selectStoreList();
		
		 return storeList;
	}

	@Override
	public List<Category> selectMainCategory() {
		
		List<Category> mainCategoryList = mapper.selectMainCategoryList();
		
		return mainCategoryList;
	}
	
}
