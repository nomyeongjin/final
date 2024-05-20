package com.project.foodpin.member.model.service;

import com.project.foodpin.member.model.dto.Member;

public interface MemberService {

	/** 로그인
	 * @param inputMember
	 * @return
	 */
	Member login(Member inputMember);

	/** 빠른 로그인
	 * @param memberId
	 * @return
	 */
	Member quickLogin(String memberId);

	/** 일반 회원가입
	 * @param inputMember
	 * @return
	 */
	int signupCommon(Member inputMember);

}
