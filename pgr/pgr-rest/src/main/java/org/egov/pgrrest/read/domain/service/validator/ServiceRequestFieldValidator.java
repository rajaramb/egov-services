package org.egov.pgrrest.read.domain.service.validator;

import org.egov.common.contract.response.ErrorField;
import org.egov.pgrrest.common.domain.model.AttributeEntry;
import org.egov.pgrrest.read.domain.exception.InvalidServiceRequestFieldException;
import org.egov.pgrrest.read.domain.model.ServiceRequest;
import org.egov.pgrrest.read.domain.service.ServiceRequestValidator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class ServiceRequestFieldValidator implements ServiceRequestValidator {


    private static final String LOCATION_MANDATORY_MESSAGE = "latitude/longitude or cross hierarcy id is required";

    private static final String MANDATORY_LATITUDE_ERROR_CODE = "pgr.0001";
    private static final String LATITUDE_FIELD_NAME = "ServiceRequest.lat";

    private static final String MANDATORY_LONGITUDE_ERROR_CODE = "pgr.0002";
    private static final String LONGITUDE_FIELD_NAME = "ServiceRequest.lng";

    private static final String MANDATORY_CROSS_HIERARCHY_ERROR_CODE = "pgr.0003";
    private static final String CROSS_HIERARCHY_FIELD_NAME = "ServiceRequest.addressId";

    private static final String MANDATORY_LOCATION_ID_ERROR_CODE = "pgr.0004";
    private static final String LOCATION_ID_FIELD_NAME = "ServiceRequest.values.locationId";
    private static final String LOCATION_ID_MANDATORY_MESSAGE = "Location id is required";

    private static final String MANDATORY_FIRST_NAME_CODE = "pgr.0005";
    private static final String FIRST_NAME_FIELD_NAME = "ServiceRequest.firstName";
    private static final String FIRST_NAME_MANDATORY_MESSAGE = "First name is required";

    private static final String PHONE_NUMBER_INVALID = "pgr.0006";
    private static final String PHONE_NUMBER_PATTERN_INVALID_FIELD_NAME = "ServiceRequest.phone";
    private static final String PHONE_NUMBER_INVALID_PATTERN_MESSAGE = "Phone Number is not valid";

    private static final String MANDATORY_TENANT_ID_CODE = "pgr.0011";
    private static final String TENANT_ID_FIELD_NAME = "ServiceRequest.tenantId";
    private static final String TENANT_ID_MANDATORY_MESSAGE = "Tenant id is required";

    private static final String MANDATORY_COMPLAINT_TYPE_CODE = "pgr.0012";
    private static final String COMPLAINT_TYPE_CODE_FIELD_NAME = "ServiceRequest.serviceCode";
    private static final String COMPLAINT_TYPE_CODE_MANDATORY_MESSAGE = "Service code is required";

    private static final String MANDATORY_DESCRIPTION_CODE = "pgr.0013";
    private static final String MANDATORY_DESCRIPTION_FIELD_NAME = "ServiceRequest.description";
    private static final String DESCRIPTION_MANDATORY_MESSAGE = "Description is required";

    private static final String MANDATORY_CRN_CODE = "pgr.0014";
    private static final String CRN_FIELD_NAME = "ServiceRequest.serviceRequestId";
    private static final String CRN_MANDATORY_MESSAGE = "Service request id is required";

    private static final String DESCRIPTION_LENGTH_CODE = "pgr.0015";
    private static final String DESCRIPTION_LENGTH_FIELD = "ServiceRequest.description";
    private static final String DESCRIPTION_LENGTH_MESSAGE = "Description must have minimum 10 and max 1000 characters";

    private static final String EMAIL_PATTERN_CODE = "pgr.0016";
    private static final String EMAIL_PATTERN_FIELD_NAME = "ServiceRequest.email";
    private static final String EMAIL_PATTERN_MESSAGE = "Email pattern is not valid";

    private static final String STATUS_MANDATORY_CODE = "pgr.0017";
    private static final String STATUS_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemStatus";
    private static final String STATUS_MANDATORY_MANDATORY_MESSAGE = "Status is required";

    private static final String PHONE_NUMBER_MANDATORY_CODE = "pgr.0018";
    private static final String PHONE_NUMBER_MANDATORY_FIELD_NAME = "ServiceRequest.phone";
    private static final String PHONE_NUMBER_MANDATORY_MESSAGE = "Phone is required";

    private static final String EXTERNAL_CRN_MANDATORY_CODE = "pgr.0019";
    private static final String EXTERNAL_CRN_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemExternalCRN";
    private static final String EXTERNAL_CRN_MANDATORY_MESSAGE = "External CRN is required when Receiving Mode is Manual";

    private static final String ATTRIBUTE_LOCATION_ID_MANDATORY_CODE = "pgr.0020";
    private static final String ATTRIBUTE_LOCATION_ID_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemLocationId";
    private static final String ATTRIBUTE_LOCATION_ID_MANDATORY_MESSAGE = "Location ID is required";

    private static final String CHILD_LOCATION_ID_MANDATORY_CODE = "pgr.0021";
    private static final String CHILD_LOCATION_ID_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemChildLocationId";
    private static final String CHILD_LOCATION_ID_MANDATORY_MESSAGE = "Child Location ID is required";

    private static final String POSITION_ID_MANDATORY_CODE = "pgr.0022";
    private static final String POSITION_ID_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemPositionId";
    private static final String POSITION_ID_MANDATORY_MESSAGE = "Position ID is required";

    private static final String APPROVAL_COMMENTS_MANDATORY_CODE = "pgr.0023";
    private static final String APPROVAL_COMMENTS_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemApprovalComments";
    private static final String APPROVAL_COMMENTS_MANDATORY_MESSAGE = "Approval Comments is required";

    private static final String RATING_MANDATORY_CODE = "pgr.0024";
    private static final String RATING_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.rating";
    private static final String RATING_MANDATORY_MESSAGE = "Rating is required";

    private static final String RECEIVING_MODE_MANDATORY_CODE = "pgr.0025";
    private static final String RECEIVING_MODE_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemReceivingMode";
    private static final String RECEIVING_MODE_MANDATORY_MESSAGE = "Receiving Mode is required";

    private static final String KEYWWORD_MANDATORY_CODE = "pgr.0026";
    private static final String KEYWORD_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.keyword";
    private static final String KEYWORD_MANDATORY_MESSAGE = "Keyword is required";

    private static final String FIRST_NAME_LENGTH_CODE = "pgr.0027";
    private static final String FIRST_NAME_LENGTH_FIELD = "ServiceRequest.firstName";
    private static final String FIRST_NAME_LENGTH_MESSAGE = "First name must be below 20 characters";

    private static final String EMAIL_LENGTH_CODE = "pgr.0028";
    private static final String EMAIL_LENGTH_FIELD = "ServiceRequest.email";
    private static final String EMAIL_LENGTH_MESSAGE = "Email must be below 100 characters";

    private static final String TENANTID_LENGTH_CODE = "pgr.0029";
    private static final String TENANTID_LENGTH_FIELD = "ServiceRequest.tenantId";
    private static final String TENANTID_LENGTH_MESSAGE = "Tenant Id must be below 256 characters";

    private static final String STATE_ID_MANDATORY_CODE = "pgr.0027";
    private static final String STATE_ID_MANDATORY_FIELD_NAME = "ServiceRequest.attribValues.systemStateId";
    private static final String STATE_ID_MANDATORY_MESSAGE = "State ID is required";


    public static final String SYSTEM_STATUS = "systemStatus";
    public static final String MANUAL = "MANUAL";
    public static final String EXTERNAL_CRN = "systemExternalCRN";
    public static final String SYSTEM_RECEIVING_MODE = "systemReceivingMode";
    public static final String SYSTEM_LOCATION_ID = "systemLocationId";
    public static final String SYSTEM_CHILD_LOCATION_ID = "systemChildLocationId";
    public static final String SYSTEM_POSITION_ID = "systemPositionId";
    public static final String SYSTEM_APPROVAL_COMMENTS = "systemApprovalComments";
    public static final String SYSTEM_RATING = "systemRating";
    public static final String KEYWORD = "keyword";
    public static final String EMPLOYEE = "EMPLOYEE";
    public static final String REOPENED = "REOPENED";
    public static final String WITHDRAWN = "WITHDRAWN";
    public static final String SYSTEM_STATE_ID = "systemStateId";


    @Override
    public boolean canValidate(ServiceRequest serviceRequest) {
        return true;
    }

    @Override
    public void validate(ServiceRequest model) {
        if (!getError(model).isEmpty()) {
            throw new InvalidServiceRequestFieldException(getError(model));
        }
    }

    private List<ErrorField> getError(ServiceRequest model) {
        List<ErrorField> errorFields = new ArrayList<>();
        commomValidation(model, errorFields);
        createValidation(model, errorFields);
        updateValidation(model, errorFields);

        return errorFields;
    }

    private void commomValidation(ServiceRequest model, List<ErrorField> errorFields) {
        addComplainantFirstNameValidationErrors(model, errorFields);
        addComplainantMobileValidationErrors(model, errorFields);
        addTenantIdValidationErrors(model, errorFields);
        addComplaintTypeCodeValidationErrors(model, errorFields);
        addDescriptionValidationErrors(model, errorFields);
        addEmailPattern(model, errorFields);
        addStatusNotPresentValidationErrors(model, errorFields);
        addKeywordsValidationErrors(model, errorFields);
    }

    private void createValidation(ServiceRequest model, List<ErrorField> errorFields) {
        if (model.isNewServiceRequest()) {
            addRawLocationValidationErrors(model, errorFields);
            addLocationIdValidationErrors(model, errorFields);
            addExternalCrnNotPresentValidationErrors(model, errorFields);
            addReceivingModeEmployeePresentValidationErrors(model, errorFields);
        }
    }

    private void updateValidation(ServiceRequest model, List<ErrorField> errorFields) {
        if (model.isModifyServiceRequest()) {
            addCRNValidationErrors(model, errorFields);
            addLocationIdPresentValidationErrors(model, errorFields);
            addChildLocationIdPresentValidationErrors(model, errorFields);
            addAssigneeIdPresentValidationErrors(model, errorFields);
            addCommentsPresentValidationErrors(model, errorFields);
            addSystemRatingCitizenPresentValidationErrors(model, errorFields);
            addStateIdIdPresentValidationErrors(model, errorFields);
        }
    }

    private void addCRNValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!model.isCrnAbsent()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(MANDATORY_CRN_CODE)
            .message(CRN_MANDATORY_MESSAGE)
            .field(CRN_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addTenantIdValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!model.isTenantIdAbsent()) {
            {
                addTenantLengthValidationErrors(model, errorFields);
            }
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(MANDATORY_TENANT_ID_CODE)
            .message(TENANT_ID_MANDATORY_MESSAGE)
            .field(TENANT_ID_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addComplaintTypeCodeValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!model.isServiceRequestTypeAbsent()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(MANDATORY_COMPLAINT_TYPE_CODE)
            .message(COMPLAINT_TYPE_CODE_MANDATORY_MESSAGE)
            .field(COMPLAINT_TYPE_CODE_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addDescriptionValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!model.isDescriptionAbsent() && model.isAttributePresent("Complaint")) {
            addDescriptionLengthValidationErrors(model, errorFields);
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(MANDATORY_DESCRIPTION_CODE)
            .message(DESCRIPTION_MANDATORY_MESSAGE)
            .field(MANDATORY_DESCRIPTION_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addComplainantFirstNameValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!(model.isRequesterAbsent() && model.isComplainantFirstNameAbsent())) {
            {
                addFirstNameLengthValidationErrors(model, errorFields);
                return;
            }
        }
        final ErrorField errorField = ErrorField.builder()
            .code(MANDATORY_FIRST_NAME_CODE)
            .message(FIRST_NAME_MANDATORY_MESSAGE)
            .field(FIRST_NAME_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addComplainantMobileValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!(model.isRequesterAbsent() && model.isComplainantPhoneAbsent())) {
            addMobileNumberPatternValidationErrors(model, errorFields);
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(PHONE_NUMBER_MANDATORY_CODE)
            .message(PHONE_NUMBER_MANDATORY_MESSAGE)
            .field(PHONE_NUMBER_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addMobileNumberPatternValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (model.isValidMobileNumber()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(PHONE_NUMBER_INVALID)
            .message(PHONE_NUMBER_INVALID_PATTERN_MESSAGE)
            .field(PHONE_NUMBER_PATTERN_INVALID_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addRawLocationValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!(model.isLocationAbsent() && model.isRawLocationAbsent())) {
            return;
        }
        final ErrorField latitudeErrorField = ErrorField.builder()
            .code(MANDATORY_LATITUDE_ERROR_CODE)
            .message(LOCATION_MANDATORY_MESSAGE)
            .field(LATITUDE_FIELD_NAME)
            .build();
        errorFields.add(latitudeErrorField);
        final ErrorField longitudeErrorField = ErrorField.builder()
            .code(MANDATORY_LONGITUDE_ERROR_CODE)
            .message(LOCATION_MANDATORY_MESSAGE)
            .field(LONGITUDE_FIELD_NAME)
            .build();
        errorFields.add(longitudeErrorField);
        final ErrorField crossHierarchyErrorField = ErrorField.builder()
            .code(MANDATORY_CROSS_HIERARCHY_ERROR_CODE)
            .message(LOCATION_MANDATORY_MESSAGE)
            .field(CROSS_HIERARCHY_FIELD_NAME)
            .build();
        errorFields.add(crossHierarchyErrorField);
    }

    private void addLocationIdValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!(model.isLocationAbsent() && model.isLocationIdAbsent())) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(MANDATORY_LOCATION_ID_ERROR_CODE)
            .message(LOCATION_ID_MANDATORY_MESSAGE)
            .field(LOCATION_ID_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addDescriptionLengthValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (model.descriptionLength()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(DESCRIPTION_LENGTH_CODE)
            .message(DESCRIPTION_LENGTH_MESSAGE)
            .field(DESCRIPTION_LENGTH_FIELD)
            .build();
        errorFields.add(errorField);
    }

    private void addEmailPattern(ServiceRequest model, List<ErrorField> errorFields) {
        if (model.isEmailValid()) {
            {
                addEmailLengthValidationErrors(model, errorFields);
                return;
            }
        }
        final ErrorField errorField = ErrorField.builder()
            .code(EMAIL_PATTERN_CODE)
            .message(EMAIL_PATTERN_MESSAGE)
            .field(EMAIL_PATTERN_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addStatusNotPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!model.isAttributePresent(SYSTEM_STATUS)) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(STATUS_MANDATORY_CODE)
            .message(STATUS_MANDATORY_MANDATORY_MESSAGE)
            .field(STATUS_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addExternalCrnNotPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> systemReceivingMode = model.getAttributeValueByKey(SYSTEM_RECEIVING_MODE);
        if (!systemReceivingMode.isEmpty()
            && systemReceivingMode.get(0).getCode().equalsIgnoreCase(MANUAL)
            && model.isAttributePresent(EXTERNAL_CRN)) {
            final ErrorField errorField = ErrorField.builder()
                .code(EXTERNAL_CRN_MANDATORY_CODE)
                .message(EXTERNAL_CRN_MANDATORY_MESSAGE)
                .field(EXTERNAL_CRN_MANDATORY_FIELD_NAME)
                .build();
            errorFields.add(errorField);
        }
    }

    private void addLocationIdPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> systemLocationId = model.getAttributeValueByKey(SYSTEM_LOCATION_ID);
        if (!systemLocationId.isEmpty() && model.isModifyServiceRequest()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(ATTRIBUTE_LOCATION_ID_MANDATORY_CODE)
            .message(ATTRIBUTE_LOCATION_ID_MANDATORY_MESSAGE)
            .field(ATTRIBUTE_LOCATION_ID_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addChildLocationIdPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> childLocationId = model.getAttributeValueByKey(SYSTEM_CHILD_LOCATION_ID);
        if (!childLocationId.isEmpty()) {
            return;
        }

        final ErrorField errorField = ErrorField.builder()
            .code(CHILD_LOCATION_ID_MANDATORY_CODE)
            .message(CHILD_LOCATION_ID_MANDATORY_MESSAGE)
            .field(CHILD_LOCATION_ID_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addAssigneeIdPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> assigneeId = model.getAttributeValueByKey(SYSTEM_POSITION_ID);
        if (!assigneeId.isEmpty()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(POSITION_ID_MANDATORY_CODE)
            .message(POSITION_ID_MANDATORY_MESSAGE)
            .field(POSITION_ID_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addStateIdIdPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> stateId = model.getAttributeValueByKey(SYSTEM_STATE_ID);
        if (!stateId.isEmpty()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(STATE_ID_MANDATORY_CODE)
            .message(STATE_ID_MANDATORY_MESSAGE)
            .field(STATE_ID_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addCommentsPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> approvalcomments = model.getAttributeValueByKey(SYSTEM_APPROVAL_COMMENTS);
        if (!approvalcomments.isEmpty()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(APPROVAL_COMMENTS_MANDATORY_CODE)
            .message(APPROVAL_COMMENTS_MANDATORY_MESSAGE)
            .field(APPROVAL_COMMENTS_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addSystemRatingCitizenPresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> systemRating = model.getAttributeValueByKey(SYSTEM_RATING);
        List<String> citizenRatingStatus = Arrays.asList(WITHDRAWN, REOPENED);

        boolean statusPresent = model.getAttributeEntries().stream().anyMatch(citizenRatingStatus::contains);
        if (!(statusPresent && systemRating.isEmpty())) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(RATING_MANDATORY_CODE)
            .message(RATING_MANDATORY_MESSAGE)
            .field(RATING_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addReceivingModeEmployeePresentValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> systemRating = model.getAttributeValueByKey(SYSTEM_RECEIVING_MODE);
        List<String> employeeRole = Collections.singletonList(EMPLOYEE);

        boolean isRolePresent = model.getAuthenticatedUser().getRoleCodes().stream().anyMatch(employeeRole::contains);
        if (!isRolePresent && !systemRating.isEmpty()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(RECEIVING_MODE_MANDATORY_CODE)
            .message(RECEIVING_MODE_MANDATORY_MESSAGE)
            .field(RECEIVING_MODE_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addKeywordsValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        List<AttributeEntry> keyword = model.getAttributeValueByKey(KEYWORD);
        if (!keyword.isEmpty()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(KEYWWORD_MANDATORY_CODE)
            .message(KEYWORD_MANDATORY_MESSAGE)
            .field(KEYWORD_MANDATORY_FIELD_NAME)
            .build();
        errorFields.add(errorField);
    }

    private void addFirstNameLengthValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (model.firstNameLength()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(FIRST_NAME_LENGTH_CODE)
            .message(FIRST_NAME_LENGTH_MESSAGE)
            .field(FIRST_NAME_LENGTH_FIELD)
            .build();
        errorFields.add(errorField);
    }

    private void addEmailLengthValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (!model.emailLength()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(EMAIL_LENGTH_CODE)
            .message(EMAIL_LENGTH_MESSAGE)
            .field(EMAIL_LENGTH_FIELD)
            .build();
        errorFields.add(errorField);
    }

    private void addTenantLengthValidationErrors(ServiceRequest model, List<ErrorField> errorFields) {
        if (model.tenantIdLength()) {
            return;
        }
        final ErrorField errorField = ErrorField.builder()
            .code(TENANTID_LENGTH_CODE)
            .message(TENANTID_LENGTH_MESSAGE)
            .field(TENANTID_LENGTH_FIELD)
            .build();
        errorFields.add(errorField);
    }

}

