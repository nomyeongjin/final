package com.project.foodpin.review.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReply {

	private int replyNo;
	private int storeNo;
	private String replyContent;
	private String replyRegDate;
	private int reviewNo;
	
	private String storeImg;
	
}
