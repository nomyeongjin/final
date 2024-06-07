package com.project.foodpin.main.model.service;

import java.util.List;

import com.project.foodpin.store.model.dto.Category;
import com.project.foodpin.store.model.dto.Store;


public interface MainService {

	// 메인에 가게 4개 일단 최신 순으로 가져오기
	List<Store> selectMainStore();

	List<Category> selectMainCategory();

}
