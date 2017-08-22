package org.egov.mr.consumer;

import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.egov.mr.config.PropertiesManager;
import org.egov.mr.model.Fee;
import org.egov.mr.model.MarriageRegn;
import org.egov.mr.service.FeeService;
import org.egov.mr.service.MarriageCertService;
import org.egov.mr.service.MarriageDocumentTypeService;
import org.egov.mr.service.MarriageRegnService;
import org.egov.mr.service.RegistrationUnitService;
import org.egov.mr.web.contract.MarriageRegnRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(MockitoJUnitRunner.class)
public class MarriageRegnConsumerTest {

	@Mock
	private PropertiesManager propertiesManager;

	@Mock
	private MarriageRegnService marriageRegnService;

	@Mock
	private FeeService feeService;

	@InjectMocks
	private MarriageRegnConsumer marriageRegnConsumer;

	@Test
	public void testCreateMarriageRegn() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.create.marriageregn";
		 */
		String topic_createMarriageRegn = "kafka.topics.create.marriagereg";

		when(propertiesManager.getCreateMarriageRegnTopicName()).thenReturn("kafka.topics.create.marriageregn");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testUpdateMarriageRegn() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.update.marriageregn";
		 */
		String topic_createMarriageRegn = "kafka.topics.update.marriagereg";

		when(propertiesManager.getUpdateMarriageRegnTopicName()).thenReturn("kafka.topics.update.marriageregn");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testCreateRegistrationUnit() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.create.registrationunit";
		 */
		String topic_createMarriageRegn = "kafka.topics.create.registrationuni";

		when(propertiesManager.getCreateRegistrationUnitTopicName()).thenReturn("kafka.topics.create.registrationunit");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testUpdateRegistrationUnit() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.update.registrationunit";
		 */
		String topic_createMarriageRegn = "kafka.topics.update.registrationuni";

		when(propertiesManager.getUpdateRegistrationUnitTopicName()).thenReturn("kafka.topics.update.registrationunit");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testCreateMarriageDocumentType() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.create.marriagedocumenttype";
		 */
		String topic_createMarriageRegn = "kafka.topics.create.marriagedocumenttyp";

		when(propertiesManager.getCreateMarriageDocumentTypeTopicName())
				.thenReturn("kafka.topics.create.marriagedocumenttype");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testUpdateMarriageDocumentType() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.update.marriagedocumenttype";
		 */
		String topic_createMarriageRegn = "kafka.topics.update.marriagedocumenttyp";

		when(propertiesManager.getUpdateMarriageDocumentTypeTopicName())
				.thenReturn("kafka.topics.update.marriagedocumenttype");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testCreateReissueMarriageRegn() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.create.reissueappl";
		 */
		String topic_createMarriageRegn = "kafka.topics.create.reissueapp";

		when(propertiesManager.getCreateReissueMarriageRegnTopicName()).thenReturn("kafka.topics.create.reissueappl");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testUpdateReissueMarriageRegn() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.update.reissueappl";
		 */
		String topic_createMarriageRegn = "kafka.topics.update.reissueapp";

		when(propertiesManager.getUpdateReissueMarriageRegnTopicName()).thenReturn("kafka.topics.update.reissueappl");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testCreateReissueCertificate() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.create.reissueCertificate";
		 */
		String topic_createMarriageRegn = "kafka.topics.create.reissueCertificat";

		when(propertiesManager.getCreateReissueCertificateTopicName())
				.thenReturn("kafka.topics.create.reissueCertificate");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testCreateFee() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.create.fee";
		 */
		String topic_createMarriageRegn = "kafka.topics.create.fe";

		when(propertiesManager.getCreateFeeTopicName()).thenReturn("kafka.topics.create.fee");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

	@Test
	public void testUpdateFee() {

		MarriageRegn mr = new MarriageRegn();
		mr.setCity("Bangalore");

		Map<String, Object> consumerRecord = new HashMap<>();

		/**
		 * Getting NULL pointer Exception
		 * 
		 * if i use: String topic = "kafka.topics.update.fee";
		 */
		String topic_createMarriageRegn = "kafka.topics.update.fe";

		when(propertiesManager.getUpdateFeeTopicName()).thenReturn("kafka.topics.update.fee");

		MarriageRegnRequest mrr = new MarriageRegnRequest();
		mrr.setMarriageRegn(mr);
		Mockito.doNothing().when(marriageRegnService).create(mrr);

		marriageRegnConsumer.processMessage(consumerRecord, topic_createMarriageRegn);

	}

}
