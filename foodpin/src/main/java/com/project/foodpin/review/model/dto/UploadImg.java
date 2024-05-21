package com.project.foodpin.review.model.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UploadImg {

	private int imageNo;
	private String imagePath;
	private String imgRename;
	private String imgUploadDate;
	private int imageOrder;
	private int storeNo;
	private int reviewNo;
	private String imgOriginalName;
	
	private MultipartFile uploadFile;
	
	
}
