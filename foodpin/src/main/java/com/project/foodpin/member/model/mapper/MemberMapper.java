package com.project.foodpin.member.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	/** 로그인
	 * @param memberId
	 * @return
	 */
	Member login(String memberId);

	/** 일반회원 가입
	 * @param inputMember
	 * @return
	 */
	int signupCommon(Member inputMember);

	/** ID 중복 검사
	 * @param memberId
	 * @return
	 */
	int checkId(String memberId);

	/** 인증번호 DB에 저장
	 * @param map
	 * @return
	 */
	int saveAuthKey(Map<String, Object> map);

	/** 인증번호 수정
	 * @param map
	 * @return
	 */
	int updateAuthKey(Map<String, Object> map);

	/** 인증번호 유무 확인
	 * @param map
	 * @return
	 */
	int checkAuthKey(Map<String, Object> map);

	/** 사장님 회원 가입
	 * @param inputMember
	 * @return
	 */
	int signupStore(Member inputMember);

	/** 사장님 회원 멤버 넘버
	 * @param inputMember
	 * @return
	 */
	int findMemberNo(Member inputMember);

	/** 사장님 회원 가게 정보 입력
	 * @param inputMember
	 * @return
	 */
	int signupStoreInfo(Member inputMember);

	/** 사업자 등록 번호 중복 검사
	 * @param storeNo
	 * @return
	 */
	int checkStoreNo(String storeNo);

	/** 아이디 목록
	 * @param inputMember
	 * @return
	 */
	List<Member> findIdList(Member inputMember);

}
