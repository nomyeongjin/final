package com.project.foodpin.review.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.review.model.dto.ReviewMenu;
import com.project.foodpin.review.model.dto.UploadImage;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface ReviewMapper {

	// 리뷰 작성
	int reviewInsert(Review inputReview);

	// 해시태그 
	int insertHashList(List<ReviewHash> hashList);
	
	
	// 리뷰 이미지 업로드
	int insertUploadList(List<UploadImage> uploadList);

	// 리뷰 화면 넘어가기
	Store selectStore(String storeNo);

	// 리뷰 개수 조회
	int reviewCount(int memberNo);

	// 메뉴 리스트 조회
	List<Menu> selectMenu(String storeNo);

	// 메뉴 삽입
	int insertMenu(List<ReviewMenu> menuList);





}
