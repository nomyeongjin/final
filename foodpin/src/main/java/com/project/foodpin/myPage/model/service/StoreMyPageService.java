package com.project.foodpin.myPage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewReply;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;

/**
 * 
 */
public interface StoreMyPageService {

	/** 가게 기본 정보 조회
	 * @param memberNo
	 * @return store
	 */
	Store selectstoreInfo(int memberNo);
	
	/** 모든 카테고리 조회
	 * @return
	 */
	List<StoreCategory> selectCategoryAll();

	/** 가게 카테고리 조회
	 * @param storeNo
	 * @return
	 */
	List<StoreCategory>  selectCategory(String storeNo);
	
	/** 가게 정보 수정
	 * @param inputStore
	 * @param storeImg 
	 * @return
	 */
	int storeInfoUpdate(Store inputStore, MultipartFile image);
	
	// ------ 메뉴 ------
	
	/** 메뉴 조회
	 * @param memberNo
	 * @return menuList
	 */
	List<Menu> menuSelect(int storeNo);

	/** 메뉴 수정
	 * @param imgUrlList 
	 * @param menuList
	 * @return result
	 */
	int menuUpdate(List<Menu> inputMenuList, List<MultipartFile> imgUrlList);
	
	// ------ 휴무일 ------
	
	/** 고정 휴무일 변경
	 * @param offList
	 * @return
	 */
	int updateOffWeek(List<Off> offList);

	/** 고정 휴무일 조회
	 * @param storeNo
	 * @return offList
	 */
	List<Off> selectWeekOff(int storeNo);

	/** 지정 휴무일 조회
	 * @param storeNo
	 * @return offList
	 */
	List<Off> calendarOffSelect(int storeNo);
	
	/** 지정 휴무일 등록
	 * @param inputOff
	 * @return result
	 */
	int calendarOffInsert(Off inputOff);
	
	// ------ 예약 관리 ------
	
	/** 전체 예약 조회
	 * @param storeNo
	 * @return
	 */
	List<Reservation> reservAll(int memberNo);

	/** 예약 조회
	 * @param storeNo
	 * @param reservStatusFl
	 * @return reservList
	 */
	List<Reservation> selectReserv(String storeNo, String reservStatusFl);

	/** 예약 승인
	 * @param reservNo
	 * @return result
	 */
	int updateReservStatus(int reservNo);
	
	/** 예약 거절 
	 * @param reservNo
	 * @return result
	 */
	int rejectReservStatus(int reservNo);
	
	/** 확정된 예약 조회
	 * @param memberNo
	 * @return
	 */
	List<Reservation> reservConfirm(String storeNo);
	
	// ------ 사장님 정보 ------
	
	/** 사장님 정보 변경 화면으로 전환
	 * @param memberNo
	 * @return
	 */
	Member selectCeoInfo(int memberNo);

	/** 사장님 정보 변경
	 * @param inputMember
	 * @return result
	 */
	int ceoInfoUpdate(Member inputMember);
	
	/** 사장님 비밀번호 변경
	 * @param map
	 * @return
	 */
	int ceoPwUpdate(int memberNo, Map<String, Object> map);

	// ------ 리뷰 ------
	
	/** 사장님 리뷰 조회
	 * @param memberNo
	 * @return
	 */
	List<Review> reviewAll(int memberNo);

	/** 사장님 미답변 조회
	 * @param memberNo
	 * @return
	 */
	List<Review> reviewAllNoReply(int memberNo);

	/** 사장님 댓글 삽입
	 * @param inputReply
	 * @return
	 */
	int insertReply(ReviewReply inputReply);

	/** 모든 카테고리 조회
	 * @return
	 */
	List<StoreCategory> selectCategoryAll();
  
	/** 사장님 댓글 수정
	 * @param map
	 * @return
	 */
	int updateReply(Map<String, Object> map);

	/** 사장님 댓글 삭제
	 * @param replyNo
	 * @return
	 */
	int deleteReply(int replyNo);






	



	













}
