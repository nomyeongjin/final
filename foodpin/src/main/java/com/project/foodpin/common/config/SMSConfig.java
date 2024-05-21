package com.project.foodpin.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Configuration
@PropertySource("classpath:/config.properties")
public class SMSConfig {

   @Value("${coolsms.apikey}")
   private String apikey;
   
   @Value("${coolsms.secret}")
   private String secret;
   
   @Bean
   public DefaultMessageService defaultMessageService() {
      return NurigoApp.INSTANCE.initialize(apikey, secret, "https://api.coolsms.co.kr");
   }
}