package com.project.foodpin.websocket.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Report;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.websocket.model.dto.Notification;
import com.project.foodpin.websocket.model.mapper.NotificationMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
	
	private final NotificationMapper mapper;
	
	// 알림 삽입
	@Override
	public int insertNotification(Notification notification) {
		return mapper.insertNotification(notification);
	}
	
	// 알림 보낼 때 필요한 데이터 목록 조회
	@Override
	public Store selectStoreData(String pkNo) {
		return mapper.selectStoreData(pkNo);
	}
	
	
	// 일반 회원
	@Override
	public void sendNotificationMember(Notification memberNotification) {
		mapper.sendNotificationMember(memberNotification);
	}
	
	// 가게
	@Override
	public void sendNotificationStore(Notification storeNotification) {
		mapper.sendNotificationStore(storeNotification);
	}
	
	// 관리자
	@Override
	public void sendNotificationManager(Notification managerNotification) {
		mapper.sendNotificationManager(managerNotification);
	}
	
	// 읽지 않은 알람 조회
	@Override
	public int notReadCheck(int memberNo) {
		return mapper.notReadCheck(memberNo);
	}
	
	// 알림 목록 조회
	@Override
	public List<Notification> selectNotification(int receiveMemberNo) {
		return mapper.selectNotification(receiveMemberNo);
	}
	
	// 알림 읽음으로 변경
	@Override
	public void updateNotification(int notificationNo) {
		mapper.updateNotification(notificationNo);
	}
	
	// 알림 삭제
	@Override
	public int deleteNotification(int notificationNo, int memberNo) {
		
		int result = mapper.deleteNotification(notificationNo);
		if(result > 0) return mapper.notReadCheck(memberNo);
			return 0;
		}
	
//	@Override
//	public Store selectStoreName(int memberNo) {
//		return mapper.selectStoreName(memberNo);
//	}
	
	// 가게 이름 조회
	@Override
	public Store selectStoreName(String storeNo) {
		return mapper.selectStoreName(storeNo);
	}
	
	// 예약한 회원 번호 조회
	@Override
	public int selectReservMemerNo(String pkNo) {
		return mapper.selectReservMemerNo(pkNo);
	}
	
	// 가게 사장님이 답글 작성하기 위한 데이터 조회
	@Override
	public Review selectReviewData(String pkNo) {
		return mapper.selectReviewData(pkNo);
	}
	
	// 리뷰 답글 받는 사람 회원 번호
	@Override
	public int memberNo(int reviewNo) {
		return mapper.memberNo(reviewNo);
	}
	
	// 가게 신고 데이터 조회
	@Override
	public Store selectManagerData(String pkNo) {
		return mapper.selectManagerData(pkNo);
	}
	
	@Override
	public int selectManagerNo(int memberNo) {
		return mapper.selectManagerNo(memberNo);
	}
	
	// 예약 노쇼 알림 보낼 때 사용하는 데이터 조회
	@Override
	public Reservation selectNoshowData(int reservNo) {
		return mapper.selectNoshowData(reservNo);
	}
	
	// 회원이 방문 리뷰 작성할 때 필요안 데이터 조회
	@Override
	public Reservation selectReservationData(String pkNo) {
		return mapper.selectReservationData(pkNo);
	}
	
	// 가게 회원 번호
	@Override
	public int selectStoreMemberNo(String storeNo) {
		return mapper.selectStoreMemberNo(storeNo);
	}
	
	// 리뷰 신고를 위한 데이터 조회
	@Override
	public Review selectReivewReportData(String pkNo) {
		return mapper.selectReivewReportData(pkNo);
	}
	
	// 리뷰 신고 후 삭제 처리 시 필요한 데이터 조회
	@Override
	public Report selectReportData(String pkNo) {
		return mapper.selectReportData(pkNo);
	}
	
	// 가게 신고 (해결 완료)
	@Override
	public Store storeReportComplete(String pkNo) {
		return mapper.storeReportComplete(pkNo);
	}
	
	// 가게 정보 요청 처리에 필요한 회원 번호
	/*
	 * @Override public int selectMemberNo(String storeNo) { return
	 * mapper.selectMemberNo(storeNo); }
	 */
	@Override
	public int selectReviewNo(String pkNo) {
		return mapper.selectReivewNo(pkNo);
	}
}