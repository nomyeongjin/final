package com.project.foodpin.store.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Menu {

	private int menuNo;
	private String menuTitle;
	private String menuAmount;
	private String menuContent;
	private String menuImgUrl; 
	private String storeNo;
	
}
