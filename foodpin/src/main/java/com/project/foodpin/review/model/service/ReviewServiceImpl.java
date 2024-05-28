package com.project.foodpin.review.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.common.util.Utility;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewHash;
import com.project.foodpin.review.model.dto.UploadImage;
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

	@Value("${my.board.web-path}")
	private String webPath; 
	
	@Value("${my.board.folder-path}")
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
	public int insertReview(Review inputReview, List<String> menuNo, List<Integer> hashNo, List<MultipartFile> images) throws IllegalStateException, IOException {
		
		int result = mapper.reviewInsert(inputReview);
		
		
		if(result == 0) return 0;
		
		int reviewNo = inputReview.getReviewNo();
		
		List<Menu> menuList = new ArrayList<>();
		for(int i=0 ; i<menuNo.size(); i++) {
			if(!menuNo.isEmpty()) {
				
				
				
			}
		}
		
		
		
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
	
	
	@Override
	public int reviewCount(int memberNo) {
		return mapper.reviewCount(memberNo);
	}
	
	
	
	
	
	
	
	
	
}
