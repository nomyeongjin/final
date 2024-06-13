package com.project.foodpin.chatting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.project.foodpin.chatting.model.dto.ChattingRoom;
import com.project.foodpin.chatting.model.dto.Message;
import com.project.foodpin.chatting.model.service.ChattingService;
import com.project.foodpin.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("chatting")
@Controller
@RequiredArgsConstructor
public class ChattingController {

	
	private final ChattingService service;
	
	
	
	/** 팝업 채팅 화면 이동
	 * @return
	 */
	@GetMapping("chatPopup/{storeMemberNo}")
	public String chatPopup(
			@PathVariable("storeMemberNo") String targetNo,
			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
		
        Map<String, Object> map = new HashMap<String, Object>();
        
        map.put("targetNo", targetNo);
        map.put("loginMemberNo", loginMember.getMemberNo());
        
        int chattingNo = service.checkChattingNo(map);
        
        if(chattingNo == 0) {
            chattingNo = service.createChattingRoom(map);
        }else {
        	List<Message> messageList = service.selectMsgList(chattingNo);
        	model.addAttribute("messageList", messageList);
        	
        }
        
        model.addAttribute("chattingNo", chattingNo);
        
		return "chatting/chatPopup";
	}
	
	/** 관리자 팝업 채팅 화면 이동
	 * @return
	 */
	@GetMapping("askChat")
	public String askChat(
			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		String profileImg = service.selectProfileImg();
		String memberNickname = service.selectMemberNickname();
		
		map.put("loginMemberNo", loginMember.getMemberNo());
		map.put("targetNo", 3);
		
		
		
		int chattingNo = service.checkAskChattingNo(map);
		
		if(chattingNo == 0) {
			chattingNo = service.createAskChattingRoom(map);
		}else {
			List<Message> messageList = service.selectMsgList(chattingNo);
			model.addAttribute("messageList", messageList);
			model.addAttribute("profileImg", profileImg);
			model.addAttribute("memberNickname", memberNickname);
			
		}
		
		model.addAttribute("chattingNo", chattingNo);
		
		return "chatting/askChat";
	}
	
	
	
	/** 채팅 화면 이동
	 * @return
	 */
	@GetMapping("chat")
	public String chat(
//			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
//		List<ChattingRoom> roomList = service.selectRoomList(loginMember.getMemberNo());
//        model.addAttribute("roomList", roomList);                        
		
		return "chatting/chat";
	}
	
	
	// 채팅방 입장(없으면 생성)
    @GetMapping("enter")
    @ResponseBody
    public int chattingEnter(
    	@RequestParam("targetNo") int targetNo, 
    	@SessionAttribute("loginMember") Member loginMember) {
     
    	Map<String, Object> map = new HashMap<String, Object>();
        
        map.put("targetNo", targetNo);
        map.put("loginMemberNo", loginMember.getMemberNo());
        
        int chattingNo = service.checkChattingNo(map);
        
        if(chattingNo == 0) {
            chattingNo = service.createChattingRoom(map);
        }
        
        return chattingNo;
    }
    
    // 채팅방 목록 조회
    @GetMapping(value="roomList", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<ChattingRoom> selectRoomList(@SessionAttribute("loginMember") Member loginMember) {
    	return service.selectRoomList(loginMember.getMemberNo());
    }
    
    
    // 채팅 읽음 표시
    @PutMapping("updateReadFlag")
    @ResponseBody
    public int updateReadFlag(@RequestBody Map<String, Object> paramMap, @SessionAttribute("loginMember") Member loginMember) {
    	paramMap.put("memberNo", loginMember.getMemberNo());
        return service.updateReadFlag(paramMap);
    }
    
    // 채팅 메시지 목록 조회
    @GetMapping(value="selectMessage", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<Message> selectMessageList(@RequestParam Map<String, Object> paramMap, @SessionAttribute("loginMember") Member loginMember) {
    	paramMap.put("memberNo", loginMember.getMemberNo());
        return service.selectMessageList(paramMap);
    }
	
    @GetMapping("notReadChattingCount")
	@ResponseBody
	public int notReadChattingCount(
			@SessionAttribute("loginMember") Member loginMember
			) {
    	int memberNo = loginMember.getMemberNo();
    	
		return service.notReadChattingCount(memberNo);
	}
    
	
	
}
