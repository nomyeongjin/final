package com.project.foodpin.chatting.model.service;

import java.util.List;
import java.util.Map;

import com.project.foodpin.chatting.model.dto.ChattingRoom;
import com.project.foodpin.chatting.model.dto.Message;
import com.project.foodpin.member.model.dto.Member;

public interface ChattingService {
	List<ChattingRoom> selectRoomList(int memberNo);

    int checkChattingNo(Map<String, Object> map);

    int createChattingRoom(Map<String, Object> map);


    int insertMessage(Message msg);

    int updateReadFlag(Map<String, Object> paramMap);

    List<Message> selectMessageList( Map<String, Object> paramMap);

	List<Member> selectTarget(Map<String, Object> map);

	List<Message> selectMsgList(int chattingNo);

	int checkAskChattingNo(Map<String, Object> map);

	int createAskChattingRoom(Map<String, Object> map);

	String selectProfileImg();

	String selectMemberNickname();

}
