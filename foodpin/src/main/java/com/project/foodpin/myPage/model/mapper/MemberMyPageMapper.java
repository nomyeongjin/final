package com.project.foodpin.myPage.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;

@Mapper
public interface MemberMyPageMapper {

	// 회원 정보 수정
	int updateInfo(Member inputMember);

	// 입력받은 현재 비번과 DB에서 조회한 비번 비교
	String selectPw(int memberNo);

	// 회원 비밀번호 변경
	int memberChangePw(Map<String, Object> paramMap);

	// 예약 목록 조회
	Reservation selectReservation(int memberNo);

}
