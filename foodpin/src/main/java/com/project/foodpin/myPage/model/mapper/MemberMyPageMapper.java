package com.project.foodpin.myPage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface MemberMyPageMapper {

	// 회원 정보 수정
	int updateInfo(Member inputMember);

	// 입력받은 현재 비번과 DB에서 조회한 비번 비교
	String selectPw(int memberNo);

	// 회원 비밀번호 변경
	int memberChangePw(Map<String, Object> paramMap);

	// 예약 목록 조회
	List<Reservation> selectReservation(int memberNo);

	// 찜 목록 조회
	List<Store> memberLikeList(int memberNo);

	// 리뷰 목록 조회
	List<Review> selectReviewList(int memberNo);


}
