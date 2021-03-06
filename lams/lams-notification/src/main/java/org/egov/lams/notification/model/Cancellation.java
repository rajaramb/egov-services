package org.egov.lams.notification.model;

import java.util.Date;

import org.egov.lams.notification.model.enums.ReasonForCancellation;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cancellation {

	@JsonProperty("reasonForCancellation")
	private ReasonForCancellation reasonForCancellation;

	@JsonFormat(pattern="dd/MM/yyyy")
	@JsonProperty("terminationDate")
	private Date terminationDate;

	@JsonProperty("orderNo")
	private String orderNumber;

	@JsonFormat(pattern="dd/MM/yyyy")
	@JsonProperty("orderDate")
	private Date orderDate;
}
