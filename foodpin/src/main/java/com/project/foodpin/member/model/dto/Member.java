
package com.project.foodpin.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Member {

	private int memberNo;
	private int memberCode;
	private String memberId;
	private String memberEmail;
	private String memberName;
	private String memberNickname;
	private String memberPw;
	private String memberTel;
	private String profileImg;
	private String enrollDate;
	private String memberStatus;
	private int memberFlag;
	

	private int bookmarkCheck;
	
	// 회원가입시 필요한 가게 정보
	private String storeNo;
	private String storeName;
	private String storeLocation;
	private String storeTel;
	private String openHour;
	private String closeHour;
	private String storeInfo;
	
}
