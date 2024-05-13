package com.project.foodpin.member.model.service;

import org.springframework.stereotype.Service;

import com.project.foodpin.member.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
}
