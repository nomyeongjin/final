package com.project.foodpin.myPage.model.service;

import java.util.Map;

import com.project.foodpin.member.model.dto.Member;

public interface MemberMyPageService {

	// 회원 정보 수정
	int updateInfo(Member inputMember);

	// 회원 비밀번호 변경
	int memberChangePw(Map<String, Object> paramMap, int memberNo);

	// 예약 목록 조회
	Map<String, Object> selectReservation(Map<String, Object> paramMap);

}
