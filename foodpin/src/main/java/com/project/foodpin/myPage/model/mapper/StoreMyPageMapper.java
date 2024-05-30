package com.project.foodpin.myPage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface StoreMyPageMapper {

	
	
	/** 가게 정보 수정 화면 이동
	 * @param memberNo
	 * @return store
	 */
	Store selectstoreInfo(int memberNo);
	
	
	/** 가게 정보 수정
	 * @param inputStore
	 * @return result
	 */
	int storeInfoUpdate(Store inputStore);
	
	// ------ 메뉴 ------

	/** 메뉴 조회
	 * @param memberNo
	 * @return menuList
	 */
	List<Menu> menuSelect(int storeNo);
	
	
	
	
	
	
	
	// ------ 휴무일 ------
	
	/** 고정 휴무일 개수 조회 (있는지)
	 * @param storeNo
	 * @return count
	 */
	int countOffWeek(String storeNo);
	
	
	/** 기존 고정 휴무일 삭제
	 * @param off
	 * @return offWeekNo
	 */
	int deleteOffWeek(String storeNo);

	/** 고정 휴무일 등록 
	 * @param off
	 * @return result 
	 */
	int insertOffWeek(Off off);
	
	/** 고정 휴무일 조회
	 * @param storeNo
	 * @return offList
	 */
	List<Off> selectWeekOff(int storeNo);

	/** 지정 휴무일 변경
	 * @param storeNo
	 * @return offList
	 */
	List<Off> calendarOffSelect(int storeNo);
	
	/** 지정 휴무일 등록
	 * @param inputOff
	 * @return result
	 */
	int calendarOffInsert(Off inputOff);
	
	
	// ----- 예약 
	
	
	/** 전체 예약 조회
	 * @param storeNo
	 * @return
	 */
	List<Reservation> reservAll(int memberNo);

	/** 확정된 예약 조회
	 * @param memberNo
	 * @return
	 */
	List<Reservation> reservConfirm(int memberNo);

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






















}
