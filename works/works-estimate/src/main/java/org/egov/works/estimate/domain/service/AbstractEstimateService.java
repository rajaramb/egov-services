package org.egov.works.estimate.domain.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.egov.tracer.kafka.LogAwareKafkaTemplate;
import org.egov.works.commons.domain.model.AuditDetails;
import org.egov.works.estimate.config.PropertiesManager;
import org.egov.works.estimate.domain.exception.ErrorCode;
import org.egov.works.estimate.domain.exception.InvalidDataException;
import org.egov.works.estimate.domain.repository.AbstractEstimateRepository;
import org.egov.works.estimate.web.contract.AbstractEstimateRequest;
import org.egov.works.estimate.web.contract.AbstractEstimateResponse;
import org.egov.works.estimate.web.contract.AbstractEstimateSearchContract;
import org.egov.works.estimate.web.model.AbstractEstimate;
import org.egov.works.estimate.web.model.AbstractEstimateDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

@Service
@Transactional(readOnly = true)
public class AbstractEstimateService {

	@Autowired
	private AbstractEstimateRepository abstractEstimateRepository;

	@Autowired
	private LogAwareKafkaTemplate<String, Object> kafkaTemplate;

	@Autowired
	private PropertiesManager propertiesManager;

	@Transactional
	public List<AbstractEstimate> create(AbstractEstimateRequest abstractEstimateRequest) {
		for (final AbstractEstimate estimate : abstractEstimateRequest.getAbstractEstimates()) {
			estimate.setId(abstractEstimateRepository.getNextSequence(AbstractEstimate.SEQUENCE_NAME));
			estimate.setAuditDetails(setAuditDetails(abstractEstimateRequest.getRequestInfo().getUserInfo().getUsername(), false));
			for (final AbstractEstimateDetails details : estimate.getAbstractEstimateDetails()) {
				details.setId(abstractEstimateRepository.getNextSequence(AbstractEstimateDetails.SEQUENCE_NAME));
				details.setAuditDetails(setAuditDetails(abstractEstimateRequest.getRequestInfo().getUserInfo().getUsername(), false));
			}
		}
		kafkaTemplate.send(propertiesManager.getWorksAbstractEstimateCreateTopic(), abstractEstimateRequest);
		return abstractEstimateRequest.getAbstractEstimates();
	}

	public List<AbstractEstimate> update(AbstractEstimateRequest abstractEstimateRequest) {
		kafkaTemplate.send(propertiesManager.getWorksAbstractEstimateUpdateTopic(), abstractEstimateRequest);
		return abstractEstimateRequest.getAbstractEstimates();
	}

	public List<AbstractEstimate> search(AbstractEstimateSearchContract abstractEstimateSearchContract) {
		return abstractEstimateRepository.search(abstractEstimateSearchContract);
	}

	public void validateEstimates(AbstractEstimateRequest abstractEstimateRequest, BindingResult errors) {
		for (final AbstractEstimate estimate : abstractEstimateRequest.getAbstractEstimates()) {
			if (estimate.getDateOfProposal() == null)
				throw new InvalidDataException("dateOfProposal", ErrorCode.NOT_NULL.getCode(), null);
			if (!estimate.getSpillOverFlag() && estimate.getDateOfProposal() != null
					&& new Date(estimate.getDateOfProposal()).after(new Date()))
				throw new InvalidDataException("dateOfProposal", "dateofproposal.future.date",
						estimate.getDateOfProposal().toString());
			if (estimate.getTenantId() == null)
				throw new InvalidDataException("tenantId", ErrorCode.MANDATORY_VALUE_MISSING.getCode(),
						estimate.getTenantId());
		}
	}
	
	public AuditDetails setAuditDetails(final String userName, final Boolean isUpdate) {
		AuditDetails auditDetails = new AuditDetails();
		if (isUpdate) {
			auditDetails.setLastModifiedBy(userName);
			auditDetails.setLastModifiedTime(BigDecimal.valueOf(new Date().getTime()));
		} else {
			auditDetails.setCreatedBy(userName);
			auditDetails.setCreatedTime(BigDecimal.valueOf(new Date().getTime()));
			auditDetails.setLastModifiedBy("");
			auditDetails.setLastModifiedTime(BigDecimal.valueOf(new Date().getTime()));
		}
		
		return auditDetails;
	}
}