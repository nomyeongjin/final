package com.project.foodpin.review.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewHash {
	
	private int reviewNo;
	private int hashNo;
	
	private String hashTitle;

}
