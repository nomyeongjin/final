package com.project.foodpin.myPage.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.common.util.Utility;
import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.mapper.MemberMyPageMapper;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class MemberMyPageServiceImpl implements MemberMyPageService{
	
	private final MemberMyPageMapper mapper;
	
	private final BCryptPasswordEncoder bcrypt;
	
	@Value("${my.profile.web-path}")
	private String profileWebPath;
	
	@Value("${my.profile.folder-path}")
	private String profileFolderPath;
	


	// 회원 정보 변경
	@Override
	public int updateInfo(MultipartFile profileImg, Member inputMember) throws IllegalStateException, IOException {
		
		String updatePath = null;
		String rename = null;
		
		if(!profileImg.isEmpty()) {
			rename = Utility.fileRename(profileImg.getOriginalFilename());
			updatePath = profileWebPath + rename;
		} else {
			updatePath = inputMember.getProfileImg();
		}
		
		Member mem = Member.builder()
					.memberNo(inputMember.getMemberNo())
					.memberNickname(inputMember.getMemberNickname())
					.memberEmail(inputMember.getMemberEmail())
					.memberTel(inputMember.getMemberTel())
					.profileImg(updatePath)
					.build();
		
		int result = mapper.updateInfo(mem);

		if(result > 0 && !profileImg.isEmpty()) {
			profileImg.transferTo(new File(profileFolderPath + rename));
		}
			inputMember.setProfileImg(updatePath);
		return result;
	}


	// 회원 비밀번호 변경
	@Override
	public int memberChangePw(Map<String, Object> paramMap, int memberNo) {
		
		String originPw = mapper.selectPw(memberNo);
		
		if(!bcrypt.matches((String)paramMap.get("currentPw"), originPw)) {
			return 0;
		} 
		
		String encPw = bcrypt.encode((String)paramMap.get("newPw"));
		
		paramMap.put("encPw", encPw);
		paramMap.put("memberNo", memberNo);
		
		return mapper.memberChangePw(paramMap);
	}
	
	// 노쇼 횟수 조회
	@Override
	public int noshowCount(int memberNo) {
		return mapper.noshowCount(memberNo);
	}

	// 예약 확정 조회
	@Override
	public List<Reservation> reservationFix(int memberNo) {
		return mapper.reservationFix(memberNo);
	}	
	
	// 예약 대기 조회
	@Override
	public List<Reservation> reservationWait(int memberNo) {
		return mapper.reservationWait(memberNo);
	}
	
	// 지난 예약 조회
	@Override
	public List<Reservation> reservationLast(int memberNo) {
		return mapper.reservationLast(memberNo);
	}
	
	// 예약 취소/노쇼 조회
	@Override
	public List<Reservation> reservationCancelNoshow(int memberNo) {
		return mapper.reservationCancelNoshow(memberNo);
	}
	
	// 예약 취소
	@Override
	public int cancelReservation(int memberNo, int reservNo) {
		Map<String, Integer> map = Map.of("memberNo", memberNo, "reservNo", reservNo);
		return mapper.cancelReservation(map);
	}

	// 찜 목록 조회
	@Override
	public List<Store> memberLikeList(int memberNo) {
		return mapper.memberLikeList(memberNo);
	}
	
	// 찜 개수
	@Override
	public int likeCount(int memberNo) {
		return mapper.likeCount(memberNo);
	}

	// 찜 취소
	@Override
	public int cancelLike(int memberNo, int storeNo) {
		Map<String, Integer> cancelLike = Map.of("memberNo", memberNo, "storeNo", storeNo);
		return mapper.cancelLike(cancelLike);
	}
	
	// 리뷰 목록 조회
	@Override
	public List<Review> selectReviewList(int memberNo) {
		return mapper.selectReviewList(memberNo);
	}

	// 리뷰 개수
	@Override
	public int reviewCount(int memberNo) {
		return mapper.reviewCount(memberNo);
	}

	// 회원 탈퇴
	@Override
	public int secession(String memberPw, Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		String pw = mapper.selectPw(memberNo);
		
		if(!bcrypt.matches(memberPw, pw)) return 0;
		
		return mapper.secession(memberNo);
	}
	
	// 회원 탈퇴 전 예약 확정/대기 조회
	@Override
	public int selectReserv(int memberNo) {
		int checkReserv = mapper.checkReserv(memberNo);
		if(checkReserv != 0) return 0;
		return mapper.secession(memberNo);
		
	}

	// 지난 예약 리뷰 확인용 개수 조회
	@Override
	public int reservReviewCount(Map<String, Object> map) {
		return mapper.reservReviewCount(map);
	}



	
	

}
