package com.project.foodpin.email.model.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.project.foodpin.email.model.mapper.EmailMapper;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
	
	private final JavaMailSender mailSender;
	private final SpringTemplateEngine templateEngine;
	private final EmailMapper mapper;
	
	// 노쇼 3회 메일 보내기
	@Override
	public void sendEmail(String htmlName, String email) {
		
		try {
			String subject = null;
			
			switch(htmlName) {
				case "memberFlag" : subject = "[FOODPIN] 노쇼 3회 이상에 따른 서비스 제제"; break;
			}
			
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
			
			helper.setTo(email);
			helper.setSubject(subject);
			helper.setText(loadHtml(htmlName), true);
			
			mailSender.send(mimeMessage);
			
			System.out.println("이메일 성공" + email);
			
		} catch (Exception e) {
			System.out.println("이메일 실패" + email);
			e.printStackTrace();
		}
	}
	
	public String loadHtml(String htmlName) {
		Context context = new Context(); 
		return templateEngine.process("email/" + htmlName, context);
	}

}
