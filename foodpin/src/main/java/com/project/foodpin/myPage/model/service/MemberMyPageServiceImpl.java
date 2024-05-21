package com.project.foodpin.myPage.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.mapper.MemberMyPageMapper;
import com.project.foodpin.reservation.model.dto.Reservation;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberMyPageServiceImpl implements MemberMyPageService{
	
	private final MemberMyPageMapper mapper;
	
	private final BCryptPasswordEncoder bcrypt;
	

	// 회원 정보 수정
	@Override
	public int updateInfo(Member inputMember) {
		return mapper.updateInfo(inputMember);
	}

	// 회원 비밀번호 변경
	@Override
	public int memberChangePw(Map<String, Object> paramMap, int memberNo) {
		
		String originPw = mapper.selectPw(memberNo);
		
		if(!bcrypt.matches((String)paramMap.get("currentPw"), originPw)) {
			return 0;
		} 
		
		String encPw = bcrypt.encode((String)paramMap.get("newPw"));
		
		paramMap.put("encPw", encPw);
		paramMap.put("memberNo", memberNo);
		
		return mapper.memberChangePw(paramMap);
	}

	// 예약 목록 조회
	@Override
	public List<Reservation> selectReservation(int memberNo) {
		return mapper.selectReservation(memberNo);
	}


	@Override
	public Object memberLikeList(int memberNo) {
		return mapper.memberLikeList(memberNo);
	}

	
	

}
