package com.project.foodpin.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.main.model.service.MainService;
import com.project.foodpin.store.model.dto.Store;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller

public class MainController {

	private final MainService service;

	@RequestMapping("/")
	public String main() {
		return "common/main";
	}

	@GetMapping("loginError")
	public String loginError(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "로그인 후 이용해 주세요");
		return "redirect:/";
	}

	@GetMapping("/")
	public String mainDisplay(Model model, HttpServletRequest req, HttpServletResponse resp) {

		// 가게 게시글 조회
		List<Store> storeList = service.selectMainStore();

		if (!storeList.isEmpty()) {
			model.addAttribute(storeList);
		}

		return "common/main";
	}

}
