// package com.project.actionsandevents.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig {
//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRegistry registry) {
//                 registry.addMapping("/**")
//                         .allowedOrigins("http://localhost:3000") // Add your allowed origins here
//                         .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS",
//                                 "HEAD")
//                         .allowedHeaders("*")
//                         .exposedHeaders("*")
//                         .allowCredentials(true);
//             }
//         };
//     }
// }
