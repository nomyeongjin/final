package com.project.foodpin.myPage.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.mapper.StoreMyPageMapper;
import com.project.foodpin.reservation.model.dto.Reservation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreMyPageServiceImpl implements StoreMyPageService{
	
	private final StoreMyPageMapper mapper;

	
	// 회원번호로 사업자번호 조회
	@Override
	public int selectStoreNo(int memberNo) {
		return mapper.selectStoreNo(memberNo);
	}
	
	
	// 전체 예약 조회
	@Override
	public List<Reservation> reservAll(int memberNo) {
		return mapper.reservAll(memberNo);
	}


	// 확정된 예약 조회
	@Override
	public List<Reservation> reservConfirm(int memberNo) {
		return mapper.reservConfirm(memberNo);
	}


	// 사장님 정보 변경 화면으로 전환
	@Override
	public Member selectCeoInfo(int memberNo) {
		return mapper.selectCeoInfo(memberNo);
	}


	// 사장님 정보 변경
	@Override
	public int ceoInfoUpdate(Member inputMember) {
		return mapper.ceoInfoUpdate(inputMember);
	}





}
