package com.project.foodpin.myPage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.foodpin.member.model.dto.Member;
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

	List<Request> infoRequestList();

}
