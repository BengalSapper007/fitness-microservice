package com.fitness.aiservice.service;

import java.time.Duration;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.util.retry.Retry;

@Service
public class GeminiService {
	
	private final WebClient webClient ;
	
	@Value("${gemini.api.url}")
	private String geminiApiUrl ;
	
	@Value("${gemini.api.key}")
	private String geminiApiKey ;
	
	public GeminiService (WebClient.Builder webClientBuilder) {
		this.webClient = webClientBuilder.build();
	}
	
	public String getAnswer(String question) {
		Map<String, Object> requestBody = Map.of(
				"contents" , new Object[] {
						Map.of("parts" , new Object[] {
								Map.of("text" , question)
						})
				}
			);
		
		String response = webClient.post()
				.uri(geminiApiUrl + geminiApiKey)
				.header("Content-type", "application/json")
				.bodyValue(requestBody)
				.retrieve()
				.bodyToMono(String.class)
				.retryWhen(
						Retry.fixedDelay(1, Duration.ofSeconds(10))
						)
				.block();
		return response ;	
	}
	
}
