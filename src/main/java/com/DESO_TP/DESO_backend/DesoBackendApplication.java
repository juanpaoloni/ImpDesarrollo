package com.DESO_TP.DESO_backend;

import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.DESO_TP.EntidadesDominio")
@EnableJpaRepositories(basePackages = "com.DESO_TP")
@ComponentScan(basePackages = "com.DESO_TP")
public class DesoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DesoBackendApplication.class, args);
	}

}
