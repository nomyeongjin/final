package com.project.foodpin.member.model.service;

import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.member.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
	
	// BCrypt 암호화 객체 의존성 주입(SecurityConfig 참고)
	private final BCryptPasswordEncoder bcrypt;
	
	// 로그인 서비스
	@Override
	public Member login(Member inputMember) {


		log.debug( inputMember.getMemberPw() + " / " + bcrypt.encode( inputMember.getMemberPw()));
		
		// 1. 아이디가 일치하면서 탈퇴하지 않은 회원 조회
		Member loginMember = mapper.login(inputMember.getMemberId());
		
		// 2. 만약에 일치하는 아이디가 없어서 조회 결과가 null인 경우
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
	
	/** 일반 회원가입
	 *
	 */
	@Override
	public int signupCommon(Member inputMember) {

		// 비밀번호를 암호화 하여 inputMember에 세팅
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		

		
		return mapper.signupCommon(inputMember);
	}
	
	/** ID 중복 검사
	 *
	 */
	@Override
	public int checkId(String memberId) {
		return mapper.checkId(memberId);
	}
	
	/** 사업자 등록번호 중복 검사
	 *
	 */
	@Override
	public int checkStoreNo(String storeNo) {
		return mapper.checkStoreNo(storeNo);
	}
	
	/** 인증번호 DB 저장
	 *
	 */
	@Override
	public int saveAuthKey(Map<String, Object> map) {
		return mapper.saveAuthKey(map);
	}
	
	/** 같은 전화번호 인증번호 DB에서 수정
	 *
	 */
	@Override
	public int updateAuthKey(Map<String, Object> map) {
		return mapper.updateAuthKey(map);
	}
	
	/** DB에 신청 전화번호와 입력한 인증번호가 있는지
	 *
	 */
	@Override
	public int checkAuthKey(Map<String, Object> map) {
		return mapper.checkAuthKey(map);
	}
	
	
	/** 가게 사장님 회원가입
	 *
	 */
	@Override
	public int signupStore(Member inputMember, String[] storeLocation) {
		
		String address = String.join("^^^", storeLocation);
		
		inputMember.setStoreLocation(address);
		
		// 비밀번호를 암호화 하여 inputMember에 세팅
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		// 회원 정보 먼저 DB에 저장
		int result = mapper.signupStore(inputMember);
		
		if(result!=0) { // 회원 정보 DB에 저장되면
			
			// 회원 번호 가져오기
			int memberNo = mapper.findMemberNo(inputMember);
			inputMember.setMemberNo(memberNo);
			
			result = mapper.signupStoreInfo(inputMember);
			
			
		}
		
		
		return result;
	}
	
}
