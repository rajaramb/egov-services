package org.egov.works.estimate.persistence.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.persistence.repository.JdbcRepository;
import org.egov.works.estimate.persistence.helper.DetailedEstimateHelper;
import org.egov.works.estimate.web.contract.DetailedEstimate;
import org.egov.works.estimate.web.contract.DetailedEstimateSearchContract;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;

@Service
public class DetailedEstimateJdbcRepository extends JdbcRepository {

	public static final String TABLE_NAME = "egw_detailedestimate";

	public List<DetailedEstimateHelper> search(DetailedEstimateSearchContract detailedEstimateSearchContract) {
		String searchQuery = "select :selectfields from :tablename :condition  :orderby   ";

		Map<String, Object> paramValues = new HashMap<>();
		StringBuffer params = new StringBuffer();

		if (detailedEstimateSearchContract.getSortBy() != null
				&& !detailedEstimateSearchContract.getSortBy().isEmpty()) {
			validateSortByOrder(detailedEstimateSearchContract.getSortBy());
			validateEntityFieldName(detailedEstimateSearchContract.getSortBy(), DetailedEstimate.class);
		}

		String orderBy = "order by id";
		if (detailedEstimateSearchContract.getSortBy() != null
				&& !detailedEstimateSearchContract.getSortBy().isEmpty()) {
			orderBy = "order by " + detailedEstimateSearchContract.getSortBy();
		}

		searchQuery = searchQuery.replace(":tablename", TABLE_NAME);

		searchQuery = searchQuery.replace(":selectfields", " * ");

		if (detailedEstimateSearchContract.getTenantId() != null) {
			addAnd(params);
			params.append("tenantId =:tenantId");
			paramValues.put("tenantId", detailedEstimateSearchContract.getTenantId());
		}
		if (detailedEstimateSearchContract.getIds() != null) {
			addAnd(params);
			params.append("id in(:ids) ");
			paramValues.put("ids", detailedEstimateSearchContract.getIds());
		}
		if (detailedEstimateSearchContract.getDetailedEstimateNumbers() != null && !detailedEstimateSearchContract.getDetailedEstimateNumbers().isEmpty() && detailedEstimateSearchContract.getDetailedEstimateNumbers().size() == 1) {
			addAnd(params);
			params.append("lower(estimateNumber) like :estimateNumbers ");
			paramValues.put("estimateNumbers", '%' + detailedEstimateSearchContract.getDetailedEstimateNumbers().get(0).toLowerCase() + '%' );
		} else if (detailedEstimateSearchContract.getDetailedEstimateNumbers() != null) {
			addAnd(params);
			params.append("estimateNumber in(:estimateNumbers)");
			paramValues.put("estimateNumbers", detailedEstimateSearchContract.getDetailedEstimateNumbers());
		}
		if (detailedEstimateSearchContract.getDepartments() != null) {
			addAnd(params);
			params.append("department  in (:departmentCodes)");
			paramValues.put("departmentCodes", detailedEstimateSearchContract.getDepartments());
		}
		if (detailedEstimateSearchContract.getTypeOfWork() != null) {
			addAnd(params);
			params.append("typeofwork in(:typeofwork)");
			paramValues.put("typeofwork", detailedEstimateSearchContract.getTypeOfWork());
		}
		if (detailedEstimateSearchContract.getSubTypeOfWork() != null) {
			addAnd(params);
			params.append("subtypeofwork in(:subtypeofwork)");
			paramValues.put("subtypeofwork", detailedEstimateSearchContract.getSubTypeOfWork());
		}
		if (detailedEstimateSearchContract.getStatuses() != null) {
			addAnd(params);
			params.append("status in(:status)");
			paramValues.put("status", detailedEstimateSearchContract.getStatuses());
		}
		if (detailedEstimateSearchContract.getFromDate() != null) {
			addAnd(params);
			params.append("estimatedate >=:estimatedate");
			paramValues.put("estimatedate", detailedEstimateSearchContract.getFromDate());
		}
		if (detailedEstimateSearchContract.getToDate() != null) {
			addAnd(params);
			params.append("estimatedate <=:estimatedate");
			paramValues.put("estimatedate", detailedEstimateSearchContract.getToDate());
		}
		if (detailedEstimateSearchContract.getFromAmount() != null) {
			addAnd(params);
			params.append("estimateValue >=:estimateValue");
			paramValues.put("estimateValue", detailedEstimateSearchContract.getFromAmount());
		}
		if (detailedEstimateSearchContract.getToAmount() != null) {
			addAnd(params);
			params.append("estimateValue <=:estimateValue");
			paramValues.put("estimateValue", detailedEstimateSearchContract.getToAmount());
		}
		if (detailedEstimateSearchContract.getSpillOverFlag() != null) {
			addAnd(params);
			params.append("spillOverFlag =:spillOverFlag");
			paramValues.put("spillOverFlag", detailedEstimateSearchContract.getSpillOverFlag());
		}
		if (detailedEstimateSearchContract.getCreatedBy() != null) {
			addAnd(params);
			params.append("lower(createdBy) =:createdBy");
			paramValues.put("createdBy", detailedEstimateSearchContract.getCreatedBy().toLowerCase());
		}
		if (detailedEstimateSearchContract.getWorkIdentificationNumbers() != null && detailedEstimateSearchContract.getWorkIdentificationNumbers().size() == 1) {
			addAnd(params);
			params.append(" lower(projectCode) like :workIdentificationNumbers");
			paramValues.put("workIdentificationNumbers", "%" + detailedEstimateSearchContract.getWorkIdentificationNumbers().get(0).toLowerCase() + "%");
		} else if (detailedEstimateSearchContract.getWorkIdentificationNumbers() != null && detailedEstimateSearchContract.getWorkIdentificationNumbers().size() > 1) {
            addAnd(params);
            params.append(" projectCode in :workIdentificationNumbers");
            paramValues.put("workIdentificationNumbers", detailedEstimateSearchContract.getWorkIdentificationNumbers());
        }

		if (detailedEstimateSearchContract.getNameOfWork() != null) {
			addAnd(params);
			params.append("upper(nameOfWork) like :nameOfWork");
			paramValues.put("nameOfWork", '%' + detailedEstimateSearchContract.getNameOfWork().toUpperCase() + '%');
			
		}

		if (detailedEstimateSearchContract.getWards() != null) {
			addAnd(params);
			params.append("ward =:ward");
			paramValues.put("ward", detailedEstimateSearchContract.getWards());
		}

        params.append(" and deleted = false");
		if (params.length() > 0) {

			searchQuery = searchQuery.replace(":condition", " where " + params.toString());

		} else

			searchQuery = searchQuery.replace(":condition", "");

		searchQuery = searchQuery.replace(":orderby", orderBy);

		BeanPropertyRowMapper row = new BeanPropertyRowMapper(DetailedEstimateHelper.class);

		return namedParameterJdbcTemplate.query(searchQuery.toString(), paramValues, row);
	}

}
