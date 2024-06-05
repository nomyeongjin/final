package com.project.foodpin.myPage.model.service;

import java.util.List;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.review.model.dto.Report;
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

	// 리뷰 신고 내역 조회
	List<Report> reportList();
	
	// 리뷰 신고 개수
	int reportCount();
	
	// 처리한 리뷰 신고 조회
	List<Report> completeReportList();
	
	// 처리한 리뷰 신고 개수
	int completeReportCount();
	
	// 신고리뷰 삭제
	boolean deleteReport(int reportNo);
	
	// 가게 정보 정정 신청 조회
	List<Request> infoRequestList();

	// 가게 정보 정정 처리 완료
	boolean completeRequest(int requestNo);






}
