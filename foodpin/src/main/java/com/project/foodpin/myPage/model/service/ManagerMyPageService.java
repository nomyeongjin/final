package com.project.foodpin.myPage.model.service;

import java.util.List;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.store.model.dto.Request;

public interface ManagerMyPageService {

	// 가게 입점 내역 조회
	List<Member> storeRequestList(int memberNo, String memberStatus);

	// 가게 승인
	boolean approveMember(int memberNo);

	// 가게 거부
	boolean refuseMember(int memberNo);

	// 가게 폐점
	boolean closeStore(int memberNo);

	List<Request> infoRequestList();

}
