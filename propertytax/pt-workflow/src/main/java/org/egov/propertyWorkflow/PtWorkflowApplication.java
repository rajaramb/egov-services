package org.egov.propertyWorkflow;

import org.egov.tracer.config.TracerConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
@Import({TracerConfiguration.class})
public class PtWorkflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(PtWorkflowApplication.class, args);
	}

	@Bean
	public MappingJackson2HttpMessageConverter jacksonConverter() {
	   MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
	   ObjectMapper mapper = new ObjectMapper();
	   mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
	   mapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
	   converter.setObjectMapper(mapper);
	   return converter;
	}
}
