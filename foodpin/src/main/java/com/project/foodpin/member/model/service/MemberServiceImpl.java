package com.project.foodpin.member.model.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.member.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
	
	// BCrypt 암호화 객체 의존성 주입(SecurityConfig 참고)
	private BCryptPasswordEncoder bcrypt;
	
	// 로그인 서비스
	@Override
	public Member login(Member inputMember) {


		// 1. 이메일이 일치하면서 탈퇴하지 않은 회원 조회
		Member loginMember = mapper.login(inputMember.getMemberId());
		
		// 2. 만약에 일치하는 이메일이 없어서 조회 결과가 null인 경우
		if(loginMember == null) return null;
		
		// 3. 입력 받은 비밀번호(inputMember.getMemberPw() (평문))와
		//    암호화된 비밀번호(loginMember.getMemberPw())
		//    두 비밀번호가 일치하는지 확인
		if(!bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())){
			return null;
		}
		
		// 로그인 결과에서 비밀번호 제거
		loginMember.setMemberPw(null);
		
		return loginMember;
		
	}
	
	// 빠른 로그인
	@Override
	public Member quickLogin(String memberId) {
		Member loginMember = mapper.login(memberId);
		
		// 탈퇴 또는 없는 회원
		if(loginMember == null) return null;
		
		
		// 조회된 비밀번호 null 변경
		loginMember.setMemberPw(null);
		
		
		return loginMember;
	}
	
	
	
	
	
}
