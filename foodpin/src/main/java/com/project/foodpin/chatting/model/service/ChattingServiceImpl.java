package com.project.foodpin.chatting.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.foodpin.chatting.model.dto.ChattingRoom;
import com.project.foodpin.chatting.model.dto.Message;
import com.project.foodpin.chatting.model.mapper.ChattingMapper;
import com.project.foodpin.common.util.Utility;
import com.project.foodpin.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService {

	private final ChattingMapper mapper;
	
	@Override
    public List<ChattingRoom> selectRoomList(int memberNo) {
        return mapper.selectRoomList(memberNo);
    }
    
    @Override
    public int checkChattingNo(Map<String, Object> map) {
        return mapper.checkChattingNo(map);
    }

    @Override
    public int createChattingRoom(Map<String, Object> map) {
    	int result = mapper.createChattingRoom(map);
    	
        return result <= 0 ? 0 : (int)map.get("chattingNo"); 
    }


    @Override
    public int insertMessage(Message msg) {
    	msg.setMessageContent(Utility.XSSHandling(msg.getMessageContent()));
    	return mapper.insertMessage(msg);
    }

    @Override
    public int updateReadFlag(Map<String, Object> paramMap) {
        return mapper.updateReadFlag(paramMap);
    }

    @Override
    public List<Message> selectMessageList( Map<String, Object> paramMap) {
        System.out.println(paramMap);
        List<Message> messageList = mapper.selectMessageList(  Integer.parseInt( String.valueOf(paramMap.get("chattingNo") )));
        
        if(!messageList.isEmpty()) {
            int result = mapper.updateReadFlag(paramMap);
        }
        return messageList;
    }

	@Override
	public List<Member> selectTarget(Map<String, Object> map) {
		return mapper.selectTarget(map);
	}

	@Override
	public List<Message> selectMsgList(int chattingNo) {
		
		
		
		
		return mapper.selectMessageList(chattingNo);
	}     
	

	@Override
	public int checkAskChattingNo(Map<String, Object> map) {
		return mapper.checkChattingNo(map);
	}
	
	
	@Override
	public int createAskChattingRoom(Map<String, Object> map) {
		return mapper.createChattingRoom(map);
	}
	
	@Override
	public String selectProfileImg() {
		return mapper.selectProfileImg();
	}

	@Override
	public String selectMemberNickname() {
		return mapper.selectMemberNickname();
	}
	
}
