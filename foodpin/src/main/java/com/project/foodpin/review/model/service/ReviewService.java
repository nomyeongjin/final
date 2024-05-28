package com.project.foodpin.review.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

public interface ReviewService {

	// 리뷰 작성
	int insertReview(Review inputReview, List<String> menuNo, List<Integer> hashNo, List<MultipartFile> images) throws IllegalStateException, IOException ;

	// 리뷰 작성 화면 넘어가기
	Store selectStore(String storeNo);

	// 리뷰 개수 조회
	int reviewCount(int memberNo);

	// 메뉴 조회
	List<Menu> selectMenu(String storeNo);




}
