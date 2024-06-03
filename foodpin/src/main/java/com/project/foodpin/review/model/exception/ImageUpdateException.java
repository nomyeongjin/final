package com.project.foodpin.review.model.exception;

public class ImageUpdateException extends RuntimeException {

	public ImageUpdateException() {
		super("이미지 수정/삽입 중 예외 발생");
	}
	
	public ImageUpdateException(String message) {
		super(message);
	}
	
	
}
