package com.project.foodpin.review.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.common.util.Utility;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.review.model.dto.ReviewMenu;
import com.project.foodpin.review.model.dto.ReviewReply;
import com.project.foodpin.review.model.dto.UploadImage;
import com.project.foodpin.review.model.exception.ImageDeleteException;
import com.project.foodpin.review.model.exception.ImageUpdateException;
import com.project.foodpin.review.model.exception.ReviewInsertException;
import com.project.foodpin.review.model.mapper.ReviewMapper;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class ReviewServiceImpl implements ReviewService {

	private final ReviewMapper mapper;

	@Value("${my.review.web-path}")
	private String webPath; 
	
	@Value("${my.review.folder-path}")
	private String folderPath; 
	
	
	@Override
	public Store selectStore(String storeNo) {
		return mapper.selectStore(storeNo);
	}
	
	@Override
	public List<Menu> selectMenu(String storeNo) {
		return mapper.selectMenu(storeNo);
	}
	
	
	
	// 리뷰 작성
	@Override
	public int insertReview(Review inputReview,  List<Integer> menuNo, List<Integer> hashNo, List<MultipartFile> images) throws IllegalStateException, IOException {
		
		int result = mapper.reviewInsert(inputReview);
		
		if(result == 0) return 0;
		
		
		int reviewNo = inputReview.getReviewNo();
		
		List<ReviewMenu> menuList = new ArrayList<>();
		for(int i = 0 ; i < menuNo.size(); i++) {
			if(!menuNo.isEmpty()) {
				
				ReviewMenu menu = ReviewMenu.builder()
								.reviewNo(reviewNo)
								.menuNo(menuNo.get(i))
								.build();
				
				menuList.add(menu);
			}
		}
		
		if(menuList.isEmpty()) return reviewNo;
		
		result = mapper.insertMenu(menuList);
		
		
		List<ReviewHash> hashList = new ArrayList<>();
		for(int i =0 ; i<hashNo.size(); i ++) {
			if(!hashNo.isEmpty()) {
				
				ReviewHash tag = ReviewHash.builder()
								.reviewNo(reviewNo)
								.hashNo(hashNo.get(i))
								.build();
				hashList.add(tag);
			}
		}
		
		if(hashList.isEmpty()) return reviewNo;
		
		result = mapper.insertHashList(hashList);
		
		

		List<UploadImage> uploadList = new ArrayList<>();
		
		for(int i=0 ; i<images.size() ; i++) {
			
			if(!images.get(i).isEmpty()) {
				
				String originalName = images.get(i).getOriginalFilename();
				
				String rename = Utility.fileRename(originalName);
				
				UploadImage img = UploadImage.builder()
								.imagePath(webPath)
								.imgRename(rename)
								.imageOrder(i)
								.storeNo(inputReview.getStoreNo())
								.reviewNo(reviewNo)
								.imgOriginalName(originalName)
								.uploadFile(images.get(i))
								.build();
				uploadList.add(img);
			}
			
		}
		
		if(uploadList.isEmpty()) {
			return reviewNo;
		}
		
		result = mapper.insertUploadList(uploadList);
		
		if(result == uploadList.size()) {
			
			// 서버에 파일 저장
			for(UploadImage img : uploadList) {
				img.getUploadFile().transferTo(new File(folderPath + img.getImgRename()));
			}
		}else {
			throw new ReviewInsertException("이미지가 정상 삽입되지 않음");
			
		}
		
		return reviewNo;
	}
	
	// 리뷰 개수 
	@Override
	public int reviewCount(int memberNo) {
		return mapper.reviewCount(memberNo);
	}
	
	
	// 리뷰 삭제
	@Override
	public int deleteReview(int reviewNo) {
		return mapper.deleteReview(reviewNo);
	}
	
	// 리뷰 수정 시 기존 리뷰 조회
	@Override
	public Review selectReview(int reviewNo) {
		return mapper.selectReview(reviewNo);
	}
	
	
	
	// 리뷰 수정
	@Override
	public int updateReview(Review inputReview, List<Integer> menuNo, List<Integer> hashNo, String deleteOrder,
			List<MultipartFile> images) throws IllegalStateException, IOException {
		
		int result = mapper.updateReview(inputReview);
		
		if(result == 0) return 0;
		
		int reviewNo = inputReview.getReviewNo();
		
		result = mapper.deleteMenu(reviewNo);
		
		if(result> 0) {
			List<ReviewMenu> menuList = new ArrayList<>();
			for(int i = 0 ; i < menuNo.size(); i++) {
				if(!menuNo.isEmpty()) {
					
					ReviewMenu menu = ReviewMenu.builder()
									.reviewNo(reviewNo)
									.menuNo(menuNo.get(i))
									.build();
					
					menuList.add(menu);
				}
			}
			
			if(menuList.isEmpty()) return reviewNo;
			
			result = mapper.insertMenu(menuList);
		}
		
		
		result = mapper.deleteHashList(reviewNo);
		
		if(result > 0) {
			List<ReviewHash> hashList = new ArrayList<>();
			for(int i =0 ; i<hashNo.size(); i ++) {
				if(!hashNo.isEmpty()) {
					
					ReviewHash tag = ReviewHash.builder()
									.reviewNo(reviewNo)
									.hashNo(hashNo.get(i))
									.build();
					hashList.add(tag);
				}
			}
			
			if(hashList.isEmpty()) return reviewNo;
			
			result = mapper.insertHashList(hashList);
		}
		
		
		if(deleteOrder != null && !deleteOrder.equals("")) {
			
			Map<String, Object> map = new HashMap<>();
			
			map.put("reviewNo", inputReview.getReviewNo());
			map.put("deleteOrder", deleteOrder);
			
			result = mapper.deleteImage(map);
			
			if(result == 0) {
				throw new ImageDeleteException();
			}
		}
			
		List<UploadImage> uploadList = new ArrayList<>();
		
		for(int i=0; i<images.size(); i++) {
			
			if(!images.get(i).isEmpty()) {
				
				String originalName = images.get(i).getOriginalFilename();
				String rename = Utility.fileRename(originalName);
				
				UploadImage img = UploadImage.builder().
						imagePath(webPath)
						.imgRename(rename)
						.imageOrder(i)
						.storeNo(inputReview.getStoreNo())
						.reviewNo(inputReview.getReviewNo())
						.imgOriginalName(originalName)
						.uploadFile(images.get(i))
						.build();
				
				uploadList.add(img);
				
				result = mapper.updateImage(img);
				
				if(result == 0) {
					result = mapper.insertImage(img);
				}
			}
			if(result == 0) {
				throw new ImageUpdateException();
			}
			
		}
		
		if(uploadList.isEmpty()) {
			return result;
		}
		
			
		for(UploadImage img : uploadList) {
			img.getUploadFile().transferTo(new File(folderPath + img.getImgRename()));
		}
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
