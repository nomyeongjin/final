package com.project.foodpin.myPage.model.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.common.util.Utility;
import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.myPage.model.mapper.StoreMyPageMapper;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewReply;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class StoreMyPageServiceImpl implements StoreMyPageService{
	
	/* 이미지 패스 */
	@Value("${my.store.web-path}") // 가게 썸네일
	private String storeWebPath;
	
	@Value("${my.store.folder-path}")
	private String storeFolderPath;
	
	@Value("${my.menu.web-path}") // 메뉴
	private String menuWebPath;
	
	@Value("${my.menu.folder-path}")
	private String menuFolderPath;

	/* 매퍼 */
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
		
		if( !image.isEmpty()) { // input에서 이미지를 업로드 한 경우
			
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
	
	// ------ 메뉴 ------

	// 메뉴 조회
	@Override
	public List<Menu> menuSelect(int storeNo) {
		
		return mapper.menuSelect(storeNo);
	}

	// 메뉴 수정 (삭제, 추가)
	@Override
	public int menuUpdate(List<Menu> inputMenuList, List<MultipartFile> imgUrlList) {
		
		int result = 0;
		String updatePath = "";
		String rename = "";
		
		result = mapper.deleteAllMenu(inputMenuList.get(0).getStoreNo()); // 기존 메뉴 데이터 삭제 (플래그 변경)
		
		// 메뉴명이 비어있지 않은 경우 (입력된 데이터가 있는 경우)
		if( !inputMenuList.get(0).getMenuTitle().isEmpty()) { 
			
			for (Menu menu : inputMenuList) {

				// 업로드 한 메뉴 이미지가 있는 경우
				if( !imgUrlList.isEmpty()) { 
					
					for(MultipartFile imgUrl : imgUrlList) {
						
						rename = Utility.fileRename(imgUrl.getOriginalFilename());
						updatePath = menuWebPath + rename;
						menu.setMenuImgUrl(updatePath);
					}
				}
				
				result = mapper.insertMenu(menu); // 메뉴 등록
				
				if(result > 0) { // db등록 성공시 파일 업로드 폴더에 이미지 저장
					
					try {
						menu.getMenuImg().transferTo(new File(menuFolderPath + rename)); // db등록 성공시 파일 업로드()
					}catch (Exception e) {
						e.printStackTrace();
					}
				} // if
			}
			
		}
		return result;
	}


	// ------ 휴무일 ------
	
	// 고정 휴무일 변경
	@Override
	public int updateOffWeek(List<Off> offList) {
		
		int result = 0;
		String StoreNo = offList.get(0).getStoreNo(); // StoreNo 꺼내오기
		
		int count = mapper.countOffWeek(StoreNo); // 기존 저장된 데이터 있는지 조회
		
		// 존재하는 경우 기존 데이터 삭제
		if(count > 0)  result = mapper.deleteOffWeek(StoreNo);
		
		// 고정 휴무일이 변경되는 경우 (완전 삭제되는 경우에는 수행X)
		if( !offList.get(0).getOffWeek().isEmpty()) {
			
			for(Off off : offList) {
				result = mapper.insertOffWeek(off);
			}
		}
		
		return result;
	}

	
	// 고정 휴무일 조회
	@Override
	public List<Off> selectWeekOff(int storeNo) {

		return mapper.selectWeekOff(storeNo);
	}
	
	// 지정 휴무일 조회
	@Override
	public List<Off> calendarOffSelect(int storeNo) {
		
		return mapper.calendarOffSelect(storeNo);
	}

	
	// 지정 휴무일 등록
	@Override
	public int calendarOffInsert(Off inputOff) {
		
		return mapper.calendarOffInsert(inputOff);
	}
	
	
	
	// 전체 예약 조회
	@Override
	public List<Reservation> reservAll(int memberNo) {
		return mapper.reservAll(memberNo);
	}
	
	// 예약 승인
	@Override
	public int updateReservStatus(int reservNo) {
		
		return mapper.updateReservStatus(reservNo);
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


	// 사장님 리뷰 조회
	@Override
	public List<Review> reviewAll(int memberNo) {
		return mapper.reviewAll(memberNo);
	}

	// 사장님 댓글 삽입
	@Override
	public int insertReply(ReviewReply inputReply) {
		return mapper.insertReply(inputReply);
	}













}
