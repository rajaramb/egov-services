package org.egov.works.measurementbook.domain.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.egov.tracer.kafka.LogAwareKafkaTemplate;
import org.egov.works.measurementbook.config.PropertiesManager;
import org.egov.works.measurementbook.domain.repository.EstimateRepository;
import org.egov.works.measurementbook.domain.repository.MeasurementBookRepository;
import org.egov.works.measurementbook.domain.repository.WorkOrderRepository;
import org.egov.works.measurementbook.utils.MeasurementBookUtils;
import org.egov.works.measurementbook.web.contract.AuditDetails;
import org.egov.works.measurementbook.web.contract.DetailedEstimate;
import org.egov.works.measurementbook.web.contract.DetailedEstimateRequest;
import org.egov.works.measurementbook.web.contract.DetailedEstimateResponse;
import org.egov.works.measurementbook.web.contract.DocumentDetail;
import org.egov.works.measurementbook.web.contract.EstimateActivity;
import org.egov.works.measurementbook.web.contract.EstimateMeasurementSheet;
import org.egov.works.measurementbook.web.contract.LOAActivity;
import org.egov.works.measurementbook.web.contract.LOAMeasurementSheet;
import org.egov.works.measurementbook.web.contract.LOAStatus;
import org.egov.works.measurementbook.web.contract.LetterOfAcceptance;
import org.egov.works.measurementbook.web.contract.LetterOfAcceptanceEstimate;
import org.egov.works.measurementbook.web.contract.LetterOfAcceptanceRequest;
import org.egov.works.measurementbook.web.contract.LetterOfAcceptanceResponse;
import org.egov.works.measurementbook.web.contract.MBMeasurementSheet;
import org.egov.works.measurementbook.web.contract.MeasurementBook;
import org.egov.works.measurementbook.web.contract.MeasurementBookDetail;
import org.egov.works.measurementbook.web.contract.MeasurementBookRequest;
import org.egov.works.measurementbook.web.contract.MeasurementBookResponse;
import org.egov.works.measurementbook.web.contract.MeasurementBookSearchContract;
import org.egov.works.measurementbook.web.contract.RequestInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MeasurementBookService {

	@Autowired
	private LogAwareKafkaTemplate<String, Object> kafkaTemplate;

	@Autowired
	private PropertiesManager propertiesManager;

//	 @Autowired
//	 private CommonUtils commonUtils;

	@Autowired
	private MeasurementBookUtils measurementBookUtils;

	@Autowired
	private MeasurementBookRepository measurementBookRepository;

	@Autowired
	private EstimateRepository estimateRepository;

	@Autowired
	private WorkOrderRepository workOrderRepository;

	public MeasurementBookResponse create(MeasurementBookRequest measurementBookRequest) {
		for (MeasurementBook measurementBook : measurementBookRequest.getMeasurementBooks()) {
			measurementBook.setId(UUID.randomUUID().toString().replace("-", ""));
			for (MeasurementBookDetail measurementBookDetail : measurementBook.getMeasurementBookDetails()) {
				measurementBookDetail.setId(UUID.randomUUID().toString().replace("-", ""));
				for (MBMeasurementSheet sheet : measurementBookDetail.getMeasurementSheets()) {
					sheet.setId(UUID.randomUUID().toString().replace("-", ""));
					sheet.setAuditDetails(
							measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), false));
				}
				measurementBookDetail.setAuditDetails(
						measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), false));
			}

			for (DocumentDetail detail : measurementBook.getDocumentDetails()) {
				detail.setId(UUID.randomUUID().toString().replace("-", ""));
				detail.setObjectType("MeasurementBook");
				detail.setAuditDetails(
						measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), false));
			}
			measurementBook.setAuditDetails(
					measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), false));

			if (measurementBook.getEstimateActivities() != null && !measurementBook.getEstimateActivities().isEmpty())
				createUpdateRevisionEstimate(measurementBook, measurementBookRequest.getRequestInfo(), false);
		}
		kafkaTemplate.send(propertiesManager.getWorksMBCreateUpdateTopic(), measurementBookRequest);
		MeasurementBookResponse measurementBookResponse = new MeasurementBookResponse();
		measurementBookResponse.setMeasurementBooks(measurementBookRequest.getMeasurementBooks());
		return measurementBookResponse;
	}

	private void createUpdateRevisionEstimate(MeasurementBook measurementBook, RequestInfo requestInfo, Boolean isUpdate) {
		DetailedEstimateRequest detailedEstimateRequest = new DetailedEstimateRequest();
		LetterOfAcceptanceRequest letterOfAcceptanceRequest = new LetterOfAcceptanceRequest();
		Boolean deleted = true;
		AuditDetails auditDetails = measurementBookUtils.setAuditDetails(requestInfo, false);
		List<DetailedEstimate> detailedEstimates = new ArrayList<>();
		List<LetterOfAcceptance> letterOfAcceptances = new ArrayList<>();
		DetailedEstimate detailedEstimate = new DetailedEstimate();
		LetterOfAcceptance letterOfAcceptance = new LetterOfAcceptance();
		if (isUpdate)
			detailedEstimate.setId(measurementBook.getEstimateActivities().get(0).getParent());
		detailedEstimate.setTenantId(measurementBook.getTenantId());
		detailedEstimate.setParent(measurementBook.getLetterOfAcceptanceEstimate().getDetailedEstimate().getId());
		detailedEstimate.setEstimateActivities(measurementBook.getEstimateActivities());
		detailedEstimate.setEstimateDate(new Date().getTime());
		detailedEstimate.setDepartment(measurementBook.getLetterOfAcceptanceEstimate().getDetailedEstimate().getDepartment());
		detailedEstimate.setEstimateValue(measurementBook.getLetterOfAcceptanceEstimate().getDetailedEstimate().getEstimateValue());
		for (final EstimateActivity estimateActivity : detailedEstimate.getEstimateActivities()) {
			estimateActivity.setTenantId(measurementBook.getTenantId());
			estimateActivity.setAuditDetails(auditDetails);
			if (isUpdate && deleted && !estimateActivity.getDeleted())
				deleted = false;
			if (estimateActivity.getEstimateMeasurementSheets() != null) {
				for (final EstimateMeasurementSheet estimateMeasurementSheet : estimateActivity
						.getEstimateMeasurementSheets()) {
					estimateMeasurementSheet.setTenantId(measurementBook.getTenantId());
					estimateMeasurementSheet.setAuditDetails(auditDetails);
				}
			}
		}
		if (isUpdate)
			detailedEstimate.setDeleted(deleted);
		detailedEstimates.add(detailedEstimate);
		detailedEstimateRequest.setDetailedEstimates(detailedEstimates);
		detailedEstimateRequest.setRequestInfo(requestInfo);

		DetailedEstimateResponse detailedEstimateResponse = estimateRepository
				.createUpdateDetailedEstimate(detailedEstimateRequest, isUpdate);

		letterOfAcceptance.setTenantId(measurementBook.getTenantId());
		letterOfAcceptance.setParent(measurementBook.getLetterOfAcceptanceEstimate().getLetterOfAcceptance());
		letterOfAcceptance.setLoaDate(new Date().getTime());
		letterOfAcceptance.setLoaAmount(detailedEstimateResponse.getDetailedEstimates().get(0).getEstimateValue());
		letterOfAcceptance.setStatus(LOAStatus.APPROVED);
		List<LetterOfAcceptanceEstimate> letterOfAcceptanceEstimates = new ArrayList<>();
		LetterOfAcceptanceEstimate letterOfAcceptanceEstimate = new LetterOfAcceptanceEstimate();
		LetterOfAcceptanceResponse letterOfAcceptanceResponse = null;
		if (isUpdate && StringUtils.isNotBlank(measurementBook.getRevisionLOA())) {
			letterOfAcceptance.setId(measurementBook.getRevisionLOA());
			letterOfAcceptanceResponse = workOrderRepository.searchLOAById(
					Arrays.asList(measurementBook.getRevisionLOA()), measurementBook.getTenantId(), requestInfo);
			letterOfAcceptanceEstimate.setId(letterOfAcceptanceResponse.getLetterOfAcceptances().get(0)
					.getLetterOfAcceptanceEstimates().get(0).getId());
		}
		letterOfAcceptanceEstimate.setTenantId(measurementBook.getTenantId());
		letterOfAcceptanceEstimate.setAuditDetails(auditDetails);
		letterOfAcceptanceEstimate.setDetailedEstimate(detailedEstimateResponse.getDetailedEstimates().get(0));
		letterOfAcceptanceEstimate.setLetterOfAcceptance(letterOfAcceptance.getId());
		populateLOAActivities(letterOfAcceptanceEstimate, detailedEstimateResponse.getDetailedEstimates().get(0),
				auditDetails);
		if (isUpdate) {
			letterOfAcceptance.setDeleted(deleted);
			letterOfAcceptanceEstimate.setDeleted(deleted);
		}
		letterOfAcceptanceEstimates.add(letterOfAcceptanceEstimate);
		letterOfAcceptance.setLetterOfAcceptanceEstimates(letterOfAcceptanceEstimates);
		letterOfAcceptances.add(letterOfAcceptance);
		letterOfAcceptanceRequest.setLetterOfAcceptances(letterOfAcceptances);
		letterOfAcceptanceRequest.setRequestInfo(requestInfo);

		letterOfAcceptanceResponse = workOrderRepository
				.createUpdateLOA(letterOfAcceptanceRequest, isUpdate);
		measurementBook.setRevisionLOA(letterOfAcceptanceResponse.getLetterOfAcceptances().get(0).getId());
	}

	private void populateLOAActivities(LetterOfAcceptanceEstimate letterOfAcceptanceEstimate,
			DetailedEstimate detailedEstimate, AuditDetails auditDetails) {
		List<LOAActivity> loaActivities = new ArrayList<>();
		for (EstimateActivity activity : detailedEstimate.getEstimateActivities()) {
			LOAActivity loaActivity = new LOAActivity();
			loaActivity.setTenantId(activity.getTenantId());
			loaActivity.setAuditDetails(auditDetails);
			loaActivity.setEstimateActivity(activity);
			loaActivity.setLetterOfAcceptanceEstimate(letterOfAcceptanceEstimate.getId());
			List<LOAMeasurementSheet> loaMeasurementSheets = new ArrayList<>();
			for (EstimateMeasurementSheet sheet : activity.getEstimateMeasurementSheets()) {
				LOAMeasurementSheet loaMeasurementSheet = new LOAMeasurementSheet();
				loaMeasurementSheet.setTenantId(sheet.getTenantId());
				loaMeasurementSheet.setAuditDetails(auditDetails);
				loaMeasurementSheet.setDepthOrHeight(sheet.getDepthOrHeight());
				loaMeasurementSheet.setEstimateMeasurementSheet(sheet.getId());
				loaMeasurementSheet.setLength(sheet.getLength());
				loaMeasurementSheet.setLoaActivity(loaActivity.getId());
				loaMeasurementSheet.setNumber(sheet.getNumber());
				loaMeasurementSheet.setQuantity(sheet.getQuantity());
				loaMeasurementSheet.setWidth(sheet.getWidth());

				loaMeasurementSheets.add(loaMeasurementSheet);
			}
			loaActivity.setLoaMeasurements(loaMeasurementSheets);
			loaActivities.add(loaActivity);
		}
		letterOfAcceptanceEstimate.setLoaActivities(loaActivities);
	}

	public MeasurementBookResponse update(MeasurementBookRequest measurementBookRequest) {
		for (MeasurementBook measurementBook : measurementBookRequest.getMeasurementBooks()) {
			for (MeasurementBookDetail measurementBookDetail : measurementBook.getMeasurementBookDetails()) {
				if (measurementBookDetail.getId() == null)
					measurementBookDetail.setId(UUID.randomUUID().toString().replace("-", ""));
				for (MBMeasurementSheet sheet : measurementBookDetail.getMeasurementSheets()) {
					if (sheet.getId() == null)
						sheet.setId(UUID.randomUUID().toString().replace("-", ""));
					sheet.setAuditDetails(
							measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), true));
				}
				measurementBookDetail.setAuditDetails(
						measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), true));
			}

			for (DocumentDetail detail : measurementBook.getDocumentDetails()) {
				if (detail.getId() == null)
					detail.setId(UUID.randomUUID().toString().replace("-", ""));
				detail.setObjectType("MeasurementBook");
				detail.setAuditDetails(
						measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), true));
			}
			measurementBook.setAuditDetails(
					measurementBookUtils.setAuditDetails(measurementBookRequest.getRequestInfo(), true));

			if (measurementBook.getEstimateActivities() != null && !measurementBook.getEstimateActivities().isEmpty())
				createUpdateRevisionEstimate(measurementBook, measurementBookRequest.getRequestInfo(), true);
		}
		kafkaTemplate.send(propertiesManager.getWorksMBCreateUpdateTopic(), measurementBookRequest);
		MeasurementBookResponse measurementBookResponse = new MeasurementBookResponse();
		measurementBookResponse.setMeasurementBooks(measurementBookRequest.getMeasurementBooks());
		return measurementBookResponse;
	}

	public MeasurementBookResponse search(MeasurementBookSearchContract measurementBookSearchContract,
			RequestInfo requestInfo) {
		MeasurementBookResponse measurementBookResponse = new MeasurementBookResponse();
		measurementBookResponse.setMeasurementBooks(
				measurementBookRepository.searchMeasurementBooks(measurementBookSearchContract, requestInfo));
		return measurementBookResponse;
	}
}
