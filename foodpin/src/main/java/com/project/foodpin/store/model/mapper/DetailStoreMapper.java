package com.project.foodpin.store.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

@Mapper
public interface DetailStoreMapper {

	/** 가게 상세 조회
	 * @param storeNo
	 * @return store
	 */
	Store storeDetail(String storeNo);

	

	/** 가게 메뉴 상세 조회
	 * @param storeNo
	 * @return
	 */
	List<Menu> menuDetail(String storeNo);

	
	/** 가게 찜 해제 
	 * @param map
	 * @return
	 */
	int deleteStoreLike(Map<String, Integer> map);


	/** 가게 찜 체크
	 * @param map
	 * @return
	 */
	int insertStoreLike(Map<String, Integer> map);


	/** 가게 찜 개수 조회
	 * @param integer
	 * @return
	 */
	int selectLikeCount(Integer integer);


}
