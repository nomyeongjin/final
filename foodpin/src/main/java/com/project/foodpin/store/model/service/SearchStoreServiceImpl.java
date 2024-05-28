package com.project.foodpin.store.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.store.model.mapper.SearchStoreMapper;


@Service
@Transactional
public class SearchStoreServiceImpl {

	private SearchStoreMapper mapper;
}
