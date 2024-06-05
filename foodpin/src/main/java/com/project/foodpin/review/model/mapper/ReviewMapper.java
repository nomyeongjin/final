package com.project.foodpin.review.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.review.model.dto.ReviewMenu;
import com.project.foodpin.review.model.dto.ReviewReply;
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
	
	// 리뷰 삭제
	int deleteReview(int reviewNo);

	// 리뷰 수정시 기존 리뷰 조회
	Review selectReview(int reviewNo);

	// 리뷰 수정(리뷰 내용, 리뷰 별점)
	int updateReview(Review inputReview);

	// 리뷰 이미지 삭제
	int deleteImage(Map<String, Object> map);

	// 리뷰 이미지 수정
	int updateImage(UploadImage img);

	// 리뷰 이미지 삽입
	int insertImage(UploadImage img);

	// 기존에 메뉴 선택했던 거 삭제
	int deleteMenu(int reviewNo);

	// 기존에 해시태그 선택했던 거 삭제
	int deleteHashList(int reviewNo);









}
