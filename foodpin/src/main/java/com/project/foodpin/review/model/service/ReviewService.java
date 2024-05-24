package com.project.foodpin.review.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;

public interface ReviewService {

	// 리뷰 작성
	int insertReview(Review inputReview, List<Integer> hashNo, List<MultipartFile> images) throws IllegalStateException, IOException ;

}
