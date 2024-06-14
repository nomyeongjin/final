package com.project.foodpin.chatting.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Message {
    private int messageNo;
    private String messageContent;
    private String readFl;
    private int memberNo;
    private int targetNo;
    private int chattingNo;
    private String sendTime;
    private int senderNo;
    private int storeMemberNo;
    private int type;
    private String storeName;
    private String storeImg;
    private String memberNickname;
	private String profileImg;
}
