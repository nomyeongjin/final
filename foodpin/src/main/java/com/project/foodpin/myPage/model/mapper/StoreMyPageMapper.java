package com.project.foodpin.myPage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface StoreMyPageMapper {

	
	
	/** 가게 정보 수정 화면 이동
	 * @param memberNo
	 * @return store
	 */
	Store selectstoreInfo(int memberNo);
	

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
