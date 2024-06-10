package com.project.foodpin.websocket.model.dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class NotificationTypes {
	
	/* 예약 대기 */
	private final String readyReservation = "readyReservation";	
	
	/* 예약 승인 */
	private final String confirmReservation = "confirmReservation";
	
	/* 예약 취소 */	
	private final String cancelReservation = "cancelReservation";
	
	/* 가게 측에서 예약을 거절 했을 경우 */
	private final String noConfirmReservation = "noConfrimReservation";
	
	/* 손님 방문 리뷰 */
	private final String insertMemberReview = "insertMemberReview";
	
	/* 가게 사장님 답글 */
	private final String insertStoreReview = "insertStoreReview";
	
	/* 예약 노쇼 알림(1회) */
	private final String reservFirstNoshow = "reservFirstNoshow";
	
	/* 예약 노쇼 알림(2회) */
	private final String reservSecondNoshow = "reservSecondNoshow";
	
	/* 예약 노쇼 알림 (3회) */
	private final String reservThirdNoshow = "reservThirdNoshow";
	
	/* 리뷰 신고 (접수) */
	private final String reviewReport = "reviewReport";
	
	/* 리뷰 신고 (처리 완료) */
	private final String reviewReportComplete = "reviewReportComplete";
	
	/* 가게 신고 (접수) */
	private final String storeReport = "storeReport";
	
	/* 가게 신고 (해결 완료) */
	private final String storeReportComplete = "storeReportComplete";
	

}
