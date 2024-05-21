package com.project.foodpin.myPage.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;

public interface MemberMyPageService {

	// 회원 정보 수정
	int updateInfo(Member inputMember);

	// 회원 비밀번호 변경
	int memberChangePw(Map<String, Object> paramMap, int memberNo);

	// 예약 목록 조회
	List<Reservation> selectReservation(int memberNo);

	// 북마크 목록 조회
	Object memberLikeList(int memberNo);

}
