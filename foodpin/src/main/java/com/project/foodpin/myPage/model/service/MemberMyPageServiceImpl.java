package com.project.foodpin.myPage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.mapper.MemberMyPageMapper;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;

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
	
	// 예약 확정 조회
	@Override
	public List<Reservation> reservationFix(int memberNo) {
		return mapper.reservationFix(memberNo);
	}	
	
	// 예약 대기 조회
	@Override
	public List<Reservation> reservationWait(int memberNo) {
		return mapper.reservationWait(memberNo);
	}
	
	// 지난 예약 조회
	@Override
	public List<Reservation> reservationLast(int memberNo) {
		return mapper.reservationLast(memberNo);
	}
	
	// 예약 취소/노쇼 조회
	@Override
	public List<Reservation> reservationCancelNoshow(int memberNo) {
		return mapper.reservationCancelNoshow(memberNo);
	}
	
//	****************************************
	@Override
	public boolean cancelReservation(int memberNo) {
		return false;
	}

	// 찜 목록 조회
	@Override
	public List<Store> memberLikeList(int memberNo) {
		return mapper.memberLikeList(memberNo);
	}

	// 리뷰 목록 조회
	@Override
	public List<Review> selectReviewList(int memberNo) {
		return mapper.selectReviewList(memberNo);
	}
	
	// 회원 탈퇴
	@Override
	public int secession(String memberPw, Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		String pw = mapper.selectPw(memberNo);
		
		if(!bcrypt.matches(memberPw, pw)) return 0;
		
		return mapper.secession(memberNo);
	}

	
	

}
