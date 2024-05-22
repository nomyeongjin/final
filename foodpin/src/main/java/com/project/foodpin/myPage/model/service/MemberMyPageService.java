package com.project.foodpin.myPage.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;

public interface MemberMyPageService {

	// 회원 정보 수정
	int updateInfo(Member inputMember);

	// 회원 비밀번호 변경
	int memberChangePw(Map<String, Object> paramMap, int memberNo);

	// 예약 목록 조회
//	List<Reservation> selectReservation(int memberNo);

	// 예약 확정 조회
	List<Reservation> reservationFix(int memberNo);
	
	// 예약 대기 조회
	List<Reservation> reservationWait(int memberNo);

	// 지난 예약 조회
	List<Reservation> reservationLast(int memberNo);
	
	// 예약 취소/노쇼 조회
	List<Reservation> reservationCancelNoshow(int memberNo);
	
	// 찜 목록 조회
	List<Store> memberLikeList(int memberNo);

	// 리뷰 목록 조회
	List<Review> selectReviewList(int memberNo);




	

}
