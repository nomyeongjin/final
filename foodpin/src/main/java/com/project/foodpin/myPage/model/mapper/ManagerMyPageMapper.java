package com.project.foodpin.myPage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.review.model.dto.Report;
import com.project.foodpin.store.model.dto.Request;

@Mapper
public interface ManagerMyPageMapper {


	// 가게 입점 내역 조회
	List<Member> storeRequestList(@Param("memberCode") int memberCode, @Param("memberStatus") String memberStatus);

	// 가게 승인
	boolean approveMember(@Param("memberNo") int memberNo);

	// 가게 거부
	boolean refuseMember(@Param("memberNo") int memberNo);

	// 가게 폐점
	boolean closeStore(@Param("memberNo") int memberNo);

	// 리뷰 신고 내역 조회
	List<Report> reportList();
	
	// 리뷰 신고 개수
	int reportCount();
	
	// 처리한 리뷰 신고 조회
	List<Report> completeReportList();
	
	// 처리한 리뷰 신고 개수
	int completeReportCount();
	
	// UPDATE REPORT_DEL_FL = 'Y'
	boolean updateReport(int reportNo);
	
	// UPDATE REVIEW_DEL_FL = 'Y'
	boolean updateReview(int reportNo);
	
	// 가게 정보 정정 신청 조회
	List<Request> infoRequestList();

	// 가게 정보 정정 신청 개수
	int reportInfoCount();
	
	// 가게 정보 정정 처리 완료
	boolean completeRequest(int requestNo);








}
