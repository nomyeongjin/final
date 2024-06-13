package com.project.foodpin.email.model.service;

public interface EmailService {

	// 노쇼 3회 메일
	void sendEmail(String string, String email);

}
