package com.project.foodpin.myPage.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.mapper.ManagerMyPageMapper;
import com.project.foodpin.store.model.dto.Request;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerMyPageServiceImpl implements ManagerMyPageService{
	
	private final ManagerMyPageMapper mapper;

	// 가게 입점 내역 조회
	@Override
	public List<Member> storeRequestList(int memberCode, String memberStatus) {
		return mapper.storeRequestList(memberCode, memberStatus);
	}

	// 가게 승인
	@Override
	public boolean approveMember(int memberNo) {
		return mapper.approveMember(memberNo);
	}
	
	// 가게 거부
	@Override
	public boolean refuseMember(int memberNo) {
		return mapper.refuseMember(memberNo);
	}
	
	// 가게 폐점
	@Override
	public boolean closeStore(int memberNo) {
		return mapper.closeStore(memberNo);
	}

	@Override
	public List<Request> infoRequestList() {
		return mapper.infoRequestList();
	}

}
