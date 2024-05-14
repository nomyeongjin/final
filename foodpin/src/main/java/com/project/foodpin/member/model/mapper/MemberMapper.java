package com.project.foodpin.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	Member login(String memberEmail);

}
