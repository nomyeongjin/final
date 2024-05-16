package com.project.foodpin.websocket.controller;

import org.springframework.stereotype.Controller;

import com.project.foodpin.websocket.model.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class NotificationController {
	
	private final NotificationService service;

}
