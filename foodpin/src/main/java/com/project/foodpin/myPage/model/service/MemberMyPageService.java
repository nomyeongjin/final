package com.project.foodpin.myPage.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;

public interface MemberMyPageService {

	// 회원 정보 수정
	int updateInfo(MultipartFile profileImg, Member inputMember) throws IllegalStateException, IOException;

	// 회원 비밀번호 변경
	int memberChangePw(Map<String, Object> paramMap, int memberNo);

	// 노쇼 횟수 조회
	int noshowCount(int memberNo);
	
	// 예약 확정 조회
	List<Reservation> reservationFix(int memberNo);
	
	// 예약 대기 조회
	List<Reservation> reservationWait(int memberNo);

	// 지난 예약 조회
	List<Reservation> reservationLast(int memberNo);
	
	// 예약 취소/노쇼 조회
	List<Reservation> reservationCancelNoshow(int memberNo);
	
	// 예약 취소
	int cancelReservation(int memberNo, int reservNo);
	
	// 찜 목록 조회
	List<Store> memberLikeList(int memberNo);
	
	// 찜 개수
	int likeCount(int memberNo);
	
	// 찜 취소
	int cancelLike(int memberNo, int storeNo);

	// 리뷰 목록 조회
	List<Review> selectReviewList(int memberNo);

	// 리뷰 개수
	int reviewCount(int memberNo);
	
	// 회원 탈퇴
	int secession(String memberPw, Member loginMember);

	// 탈퇴 전 예약 확정/대기 조회
	int selectReserv(int memberNo);







	





	

}
