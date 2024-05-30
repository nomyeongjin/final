package com.project.foodpin.review.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Review {

	private int reviewNo;
	private int reviewRating;
	private String reviewContent;
	private String reviewRegDate;
	private String reviewDelFl;
	
	private int memberNo;
	private String storeNo;
	private int hashNo;
	private String hashTitle;
	
	private String storeName;
	private String storeImg;
	
	private String memberName;
	private String memberNickname;
	private String profileImg;
	
	private List<UploadImage> uploadList;
	private List<ReviewHash> hashList;
	private List<ReviewReply> replyList;
	
}
