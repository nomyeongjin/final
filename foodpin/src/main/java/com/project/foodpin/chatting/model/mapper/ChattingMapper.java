package com.project.foodpin.chatting.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.chatting.model.dto.ChattingRoom;
import com.project.foodpin.chatting.model.dto.Message;
import com.project.foodpin.member.model.dto.Member;

@Mapper
public interface ChattingMapper {
	public List<ChattingRoom> selectRoomList(int memberNo);

    public int checkChattingNo(Map<String, Object> map);

    public int createChattingRoom(Map<String, Object> map);


    public int insertMessage(Message msg);

    public int updateReadFlag(Map<String, Object> paramMap);

    public List<Message> selectMessageList(int chattingNo);

	public List<Member> selectTarget(Map<String, Object> map);

	public int checkAskChattingNo(Map<String, Object> map);

	public int createAskChattingRoom(Map<String, Object> map);

}
