package com.project.foodpin.member.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.member.model.dto.Member;

public interface MemberService {

	/** 로그인
	 * @param inputMember
	 * @return
	 */
	Member login(Member inputMember);

	/** 빠른 로그인
	 * @param memberId
	 * @return
	 */
	Member quickLogin(String memberId);

	/** 일반 회원가입
	 * @param inputMember
	 * @return
	 */
	int signupCommon(Member inputMember);

	/** ID 중복 검사
	 * @param memberId
	 * @return
	 */
	int checkId(String memberId);

	/** 인증번호 저장
	 * @param map
	 * @return
	 */
	int saveAuthKey(Map<String, Object> map);

	/** 같은 번호 인증번호 수정
	 * @param map
	 * @return
	 */
	int updateAuthKey(Map<String, Object> map);

	/** 입력받은 인증번호 유무 확인 
	 * @param map
	 * @return
	 */
	int checkAuthKey(Map<String, Object> map);

	/** 
	 * @param inputMember
	 * @param storeLocation 
	 * @return
	 */
	int signupStore(Member inputMember, String[] storeLocation);

	/** 사업자 등록번호 중복 체크
	 * @param storeNo
	 * @return
	 */
	int checkStoreNo(String storeNo);

	/** 아이디 목록
	 * @param inputMember
	 * @return
	 */
	List<Member> findIdList(Member inputMember);

	/** 비밀번호 변경
	 * @param inputPw
	 * @return
	 */
	int resetPw(Member inputPw);

	/** 아이디 있는지 확인
	 * @param map
	 * @return
	 */
	int idConfirm(Map<String, Object> map);

}
