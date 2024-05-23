package com.project.foodpin.myPage.model.service;

import java.util.List;

import com.project.foodpin.member.model.dto.Member;

public interface ManagerMyPageService {

	// 가게 입점 내역 조회
	List<Member> storeRequestList(int memberNo, String memberStatus);

	// 가게 승인
	boolean approveMember(int memberNo);

}
