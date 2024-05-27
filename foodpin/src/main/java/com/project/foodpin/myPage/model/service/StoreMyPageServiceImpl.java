package com.project.foodpin.myPage.model.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.common.util.Utility;
import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.mapper.StoreMyPageMapper;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.exception.ReviewInsertException;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class StoreMyPageServiceImpl implements StoreMyPageService{
	
	// 이미지 패스
	@Value("${my.store.web-path}")
	private String storeWebPath;
	
	@Value("${my.store.folder-path}")
	private String storeFolderPath;

	// 매퍼
	private final StoreMyPageMapper mapper;

	// 가게 정보 수정 화면 이동
	@Override
	public Store selectstoreInfo(int memberNo) {
		return mapper.selectstoreInfo(memberNo);
	}
	
	// 가게 정보 수정
	@Override
	public int storeInfoUpdate(Store inputStore, MultipartFile image) {
		
		String updatePath = "";
		String rename = "";
		
		if(!image.isEmpty()) { // input에서 이미지를 업로드 힌 경우
			
			rename = Utility.fileRename(image.getOriginalFilename());
			
			updatePath = storeWebPath + rename;
			
			inputStore.setStoreImg(updatePath);
		}
		
		int result = mapper.storeInfoUpdate(inputStore);
		
		if(result > 0) { // db등록 성공시 파일 업로드 폴더에 이미지 저장
			
			try {
				image.transferTo(new File(storeFolderPath + rename));
			} catch (Exception e) {
				
				e.printStackTrace();
			} 
		}
		return result;
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
