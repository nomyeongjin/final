package com.project.foodpin.myPage.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.mapper.ManagerMyPageMapper;
import com.project.foodpin.review.model.dto.Report;
import com.project.foodpin.store.model.dto.Request;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor=Exception.class)
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
	
	// 리뷰 신고 내역 조회
	@Override
	public List<Report> reportList() {
		return mapper.reportList();
	}
	
	// 리뷰 신고 개수
	@Override
	public int reportCount() {
		return mapper.reportCount();
	}
	
	// 처리한 리뷰 신고 조회
	@Override
	public List<Report> completeReportList() {
		return mapper.completeReportList();
	}
	
	// 처리한 리뷰 신고 개수
	@Override
	public int completeReportCount() {
		return mapper.completeReportCount();
	}
	
	// 신고리뷰 삭제
	@Override
	public boolean deleteReport(int reportNo) {
		boolean updateReport = mapper.updateReport(reportNo);
		boolean updateReview = mapper.updateReview(reportNo);
		return updateReport && updateReview;
	}
	
	// 신고리뷰 불충분
	@Override
	public boolean notReportReview(int reportNo) {
		return mapper.updateReport(reportNo);
	}

	// 가게 정보 정정 신청 조회
	@Override
	public List<Request> infoRequestList() {
		return mapper.infoRequestList();
	}
	
	// 가게 정보 정정 신청 개수
	@Override
	public int reportInfoCount() {
		return mapper.reportInfoCount();
	}
	
	// 가게 정보 정정 처리 완료
	@Override
	public boolean completeRequest(int requestNo) {
		return mapper.completeRequest(requestNo);
	}
	

}
