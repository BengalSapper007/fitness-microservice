package com.fitness.activityservice.dto;

import java.time.LocalDateTime;
import java.util.Map;

import com.fitness.modelservice.ActivityType;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ActivityRequest {
	
	private String userId;
	private ActivityType type;
	private int duration;
	private int caloriesBurned;
	private LocalDateTime startTime;
	private Map<String , Object> additionalMetrics;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
