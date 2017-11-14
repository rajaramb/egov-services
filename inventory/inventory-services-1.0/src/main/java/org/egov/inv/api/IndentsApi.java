/**
 * NOTE: This class is auto generated by the swagger code generator program (2.2.3).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package org.egov.inv.api;

import java.math.BigDecimal;
import org.egov.inv.model.ErrorRes;
import org.egov.inv.model.IndentRequest;
import org.egov.inv.model.IndentResponse;
import org.egov.inv.model.RequestInfo;

import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import javax.validation.constraints.*;
import javax.validation.Valid;
@javax.annotation.Generated(value = "org.egov.inv.codegen.languages.SpringCodegen", date = "2017-11-08T13:51:07.770Z")

@Api(value = "indents", description = "the indents API")
public interface IndentsApi {

    @ApiOperation(value = "Create new indent", notes = "Whenever an Indent Note OR Transfer Indent is created, this API will hold the common set of information. This API will be invoked intenrally during Indent Note OR Transfer Indent creation.", response = IndentResponse.class, tags={ "Indent Note","Transfer Indent", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Indent created Successfully", response = IndentResponse.class),
        @ApiResponse(code = 400, message = "Invalid Input", response = ErrorRes.class) })
    
    @RequestMapping(value = "/indents/_create",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    ResponseEntity<IndentResponse> indentsCreatePost( @NotNull@ApiParam(value = "Unique id for a tenant.", required = true) @RequestParam(value = "tenantId", required = true) String tenantId,@ApiParam(value = "Create  new Indent"  )  @Valid @RequestBody IndentRequest indentRequest);


    @ApiOperation(value = "Get the list of common indent information", notes = "Indent is parent object that holds the common information for both Indent Note and Transfer Indent", response = IndentResponse.class, tags={ "Indent Note","Transfer Indent", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Indent retrieved Successfully", response = IndentResponse.class),
        @ApiResponse(code = 400, message = "Invalid Input", response = ErrorRes.class) })
    
    @RequestMapping(value = "/indents/_search",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    ResponseEntity<IndentResponse> indentsSearchPost( @NotNull@ApiParam(value = "Unique id for a tenant.", required = true) @RequestParam(value = "tenantId", required = true) String tenantId,@ApiParam(value = "Parameter to carry Request metadata in the request body"  )  @Valid @RequestBody org.egov.common.contract.request.RequestInfo RequestInfo, @Size(max=50)@ApiParam(value = "comma seperated list of Ids") @RequestParam(value = "ids", required = false) List<String> ids,@ApiParam(value = "issue store of the Indent ") @RequestParam(value = "issueStore", required = false) Long issueStore,@ApiParam(value = "indent date of the Indent ") @RequestParam(value = "indentDate", required = false) Long indentDate,@ApiParam(value = "indentNumber  Auto generated number, read only <ULB short code><Store Code><fin. Year><serial No.> ") @RequestParam(value = "indentNumber", required = false) String indentNumber,@ApiParam(value = "indent purpose of the Indent ", allowableValues = "Consumption, RepairsAndMaintenance, Capital, MaterialTransferNote") @RequestParam(value = "indentPurpose", required = false) String indentPurpose,@ApiParam(value = "description of the Indent ") @RequestParam(value = "description", required = false) String description,@ApiParam(value = "indent status of the Indent ", allowableValues = "CREATED, APPROVED, REJECTED, CANCELED") @RequestParam(value = "indentStatus", required = false) String indentStatus,@ApiParam(value = "totalIndentValue  denormalized value from Indent Material ") @RequestParam(value = "totalIndentValue", required = false) BigDecimal totalIndentValue, @Min(0) @Max(100)@ApiParam(value = "Number of records returned.", defaultValue = "20") @RequestParam(value = "pageSize", required = false, defaultValue="20") Integer pageSize,@ApiParam(value = "Page number", defaultValue = "1") @RequestParam(value = "pageNumber", required = false, defaultValue="1") Integer pageNumber,@ApiParam(value = "This takes any field from the Object seperated by comma and asc,desc keywords. example name asc,code desc or name,code or name,code desc", defaultValue = "id") @RequestParam(value = "sortBy", required = false, defaultValue="id") String sortBy);


    @ApiOperation(value = "Update any of the indents", notes = "The common set of information shared by Indent Note/Transfer Indent will be updated upon invoking this API.", response = IndentResponse.class, tags={ "Indent Note","Transfer Indent", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Indent updated Successfully", response = IndentResponse.class),
        @ApiResponse(code = 400, message = "Invalid Input", response = ErrorRes.class) })
    
    @RequestMapping(value = "/indents/_update",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    ResponseEntity<IndentResponse> indentsUpdatePost( @NotNull@ApiParam(value = "Unique id for a tenant.", required = true) @RequestParam(value = "tenantId", required = true) String tenantId,@ApiParam(value = "common Request info"  )  @Valid @RequestBody IndentRequest indentRequest);

}
