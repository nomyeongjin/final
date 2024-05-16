package com.project.foodpin.review.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("review")
public class ReveiwController {

	
	@GetMapping("insertReview")
	public String insertReview() {
		return "storeReview/storeReview";
	}
	
	
	
}
	