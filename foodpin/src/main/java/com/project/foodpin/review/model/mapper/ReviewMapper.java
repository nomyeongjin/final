package com.project.foodpin.review.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.UploadImage;

@Mapper
public interface ReviewMapper {

	// 리뷰 작성
	int reviewInsert(Review inputReview);
	
	// 리뷰 이미지 업로드
	int insertUploadList(List<UploadImage> uploadList);

}
