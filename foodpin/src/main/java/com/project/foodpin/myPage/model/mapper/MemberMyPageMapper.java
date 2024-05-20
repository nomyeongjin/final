package com.project.foodpin.myPage.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;

@Mapper
public interface MemberMyPageMapper {

	int updateInfo(Member inputMember);

	// 입력받은 현재 비번과 DB에서 조회한 비번 비교
	String selectPw(int memberNo);

	// 회원 비밀번호 변경
	int changePw(Map<String, Object> paramMap);

}
