package com.culetter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CuletterApplication {

	public static void main(String[] args) {
		SpringApplication.run(CuletterApplication.class, args);
	}

}
