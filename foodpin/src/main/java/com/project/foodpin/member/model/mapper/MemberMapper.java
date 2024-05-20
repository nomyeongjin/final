package com.project.foodpin.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	/** 로그인
	 * @param memberId
	 * @return
	 */
	Member login(String memberId);

	/** 일반회원 가입
	 * @param inputMember
	 * @return
	 */
	int signupCommon(Member inputMember);

}
