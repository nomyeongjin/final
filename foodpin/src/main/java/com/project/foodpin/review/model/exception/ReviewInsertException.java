package com.project.foodpin.review.model.exception;

public class ReviewInsertException  extends RuntimeException{
	
	public ReviewInsertException() {
		super("게시글 삽입 중 예외 발생");
	}
	
	public ReviewInsertException(String message) {
		super(message);
	}
	
}
