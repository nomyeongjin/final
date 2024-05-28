package com.project.foodpin.myPage.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadFile {
	
	private int memberNo;
	private String filePath;
	private String fileOriginalName;
	private String fileRename;
	private String fileUploadDate;

}
