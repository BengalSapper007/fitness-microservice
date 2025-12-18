package com.fitness.aiservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fitness.aiservice.repository.RecommendationRepository;
import com.fitness.modelservice.Recommendation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationService {
	
	private final RecommendationRepository recommendationRepository ;

	public List<Recommendation> getUserRecommendation(String userId) {
		return recommendationRepository.findByUserId(userId);
	}

	public Recommendation getActivityRecommendation(String activityId) {
		return recommendationRepository.findByActivityId(activityId)
				.orElseThrow(() -> new RuntimeException("No Recomendation Found for this activity " + activityId)) ;
	}
	
	 

}
