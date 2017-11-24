var name;
name = JSON.parse(localStorage.getItem("userRequest")).name;


var dat =
{
   "inventory.search": {
      "numCols": 4,
      "useTimestamp": true,
      "objectName": "",
      "title":"inventory.common.searchcriteria",
      "url": "/inventory-services/indents/_search",
      "groups": [
         {
            "name": "search",
            "label": "inventory.search.materialIssue.title",
            "fields": [
               {
                  "name": "issuingStore",
                  "jsonPath": "indents[0].issueStore",
                  "label": "inventory.search.issueStore",
                  "type": "singleValueList",
                  "url": "inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$..name|$..name",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.issueStore"
               },
               {
                  "name": "indentPurpose",
                  "jsonPath": "indents[0].indentPurpose",
                  "label": "inventory.indent.purpose",
                  "type": "singleValueList",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.indentPurpose",
						"defaultValue":[
              {
               "key": null,
               "value": "-- Please Select --"},
              {
                 "key":"Consumption",
                 "value":"Consumption"
              },
              {
                 "key":"Repairs and Maintenance",
                 "value":"Repairs and Maintenance"
              },
              {
                 "key":"Capital",
                 "value":"Capital"
              },
              {
                 "key":"Material Transfer Note",
                 "value":"Material Transfer Note"
              }
            ]
               },
               {
                  "name": "indentDateFrom",
                  "jsonPath": "indents[0].indentDate",
                  "label": "inventory.create.indentDateFrom",
                  "type": "datePicker",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.indentDate"
               },
               {
                  "name": "indentDateTo",
                  "jsonPath": "indents[0].indentDate",
                  "label": "inventory.create.indentDateTo",
                  "type": "datePicker",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.indentDate"
               },
               {
                  "name": "indentRaisedBy",
                  "jsonPath": "indents[0].indentCreatedBy",
                  "label": "inventory.create.indentRaisedBy",
                  "type": "singleValueList",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.indentCreatedBy",
                  "url":"/hr-employee/employees/_search?active=true|$.Employee[*].name|$.Employee[*].name|$.Employee[*].assignments.designation"
               }
            ]
         }
      ],
      "result": {
         "header": [
            {
               "label": "inventory.indent.number"
            },
            {
               "label": "inventory.indent.date"
            },
            {
               "label": "inventory.store.name"
            },
            {
               "label": "inventory.indent.purpose"
            },
            {
               "label": "inventory.search.result.raisedBy"
            },
            {
               "label": "inventory.search.result.indentStatus"
            }
         ],
         "values": [
            "indentNumber",
            "indentDate",
            "indentStore.name",
            "indentPurpose",
            "indentCreatedBy",
            "indentStatus"
         ],
         "resultPath": "indents",
         "rowClickUrlUpdate": "/update/materialissues/{indentNumber}",
         "rowClickUrlView": "/view/materialissues/{indentNumber}",
         "rowClickUrlCreate": "/create/materialissues/{indentNumber}"
      }
   },
   "inventory.create": {
      "numCols": 4,
      "useTimestamp": true,
      "objectName": "materialIssues",
      "title":"inventory.materialissue.note",
      "groups": [
         {
            "name": "MaterialIssues1",
            "label": "inventory.create.group.title.MaterialIssues1",
            "fields": [
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].fromStore.name",
                  "label": "inventory.create.fromStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$..name|$..name"
               },
               {
                  "name": "issueDate",
                  "jsonPath": "materialIssues[0].issueDate",
                  "label": "inventory.create.issueDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "indentstorename",
                  "jsonPath": "materialIssues[0].indent.indentStore.name",
                  "label": "inventory.indenting.store",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "",
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentStore.name"
               },
               {
                  "name": "departmentname",
                  "jsonPath": "materialIssues[0].indent.department.name",
                  "label": "inventory.create.department.name",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "minLength": 8,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].department.name"
               },
               {
                  "name": "indentNumber",
                  "jsonPath": "materialIssues[0].indent.indentNumber",
                  "label": "inventory.indent.number",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentNumber"
               },
               {
                  "name": "issuedToEmployee",
                  "jsonPath": "materialIssues[0].issuedToEmployee",
                  "label": "inventory.create.issuedToEmployee",
                  "pattern": "",
                  "type": "singleValueList",
                  "isRequired": false,
                  "defaultValue": "",
                  "patternErrorMsg": "",
                  "url": "/hr-employee/employees/_search?active=true|$.Employee[*].name|$.Employee[*].name|$.Employee[*].assignments.designation",
		  "depedants":[
			     {
                               "jsonPath":"materialIssues[0].issuedToDesignation",
                               "type":"textField",
                               "valExp":"getValFromDropdownData('designations', getVal('materialIssues[0].issuedToEmployee'), 'others[0]')"
                             }
		  ]
                 /* "autoCompleteDependancy": {
                     "autoCompleteUrl": "/hr-masters/designations/_search?&id=",
                     "autoFillFields": {
                        "materialIssues[0].issuedToDesignation": "materialIssues[0].issuedToDesignation"
                     }
                  }*/
               },

	       {
                  "name": "designation",
                  "jsonPath": "designations",
                  "label": "inventory.create.fromStore.name",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
		  "hide":true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "/hr-masters/designations/_search?|$..code|$..name"
               },	       

               {
                  "name": "issuedToDesignation",
                  "jsonPath": "materialIssues[0].issuedToDesignation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].description",
                  "label": "inventory.create.description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               },
               {
                  "name": "issuedBy",
                  "jsonPath": "",
                  "label": "inventory.create.issuedBy",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": name,
                  "patternErrorMsg": ""
                  
               },
               {
                  "name": "designation",
                  "jsonPath": "materialIssues[0].designation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "materialIssueStatus",
                  "jsonPath": "materialIssues[0].materialIssueStatus",
                  "label": "inventory.common.status",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": true,
                  "defaultValue": "Created",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": ""
               }
            ]
         },
         {
            "name": "MaterialIssues2",
            "label": "inventory.create.group.title.MaterialIssues2",
            "fields": [
          {
            "type": "tableList",
            "jsonPath": "materialIssues[0].materialIssueDetails[0]",
            "tableList": {
              "header": [
                {
                  "label": "inventory.materialName"
                },
                {
                  "label": "inventory.totalIndentQtyRequired"
                },
                {
                  "label": "inventory.balanceQuantity"
                },
                {
                  "label": "inventory.quantityIssued"
                },
                {
                  "label": "inventory.uom"
                },
                {
                  "label": "inventory.unitrate"
                },
                {
                  "label": "inventory.balanceQuantityAfterIssue"
                },
                {
                  "label": "inventory.totalValue"
                },
                {
                  "label": "inventory.assetCode"
                },
                {
                  "label": "inventory.projectCode"
                },
                {
                  "label": "inventory.create.description"
                }
              ],
              "values": [
                {
                  "name": "materialName",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.material.name",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].material.name"
                },
                {
                  "name": "totalIndentQtyRequired",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].indentQuantity"
                },
                {
                  "name": "balanceQuantity",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityToBeIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "quantityIssued",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": false
                },
                {
                  "name": "uom",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].uom.name"
                },
                {
                  "name": "unitRate",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "balanceQuantityAfterIssue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "totalValue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].value",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                },
                {
                  "name": "assetCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.asset.code",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].asset.code"
                },
                {
                  "name": "projectCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.projectCode.code",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].projectCode.code"
                },
                {
                  "name": "description",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].description",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                }
              ]
              }
             }
            ]
   },
   {
            "name": "MaterialIssues3",
            "label": "inventory.create.group.title.MaterialIssues3",
            "fields": [
            {
                  "name": "approvalDate",
                  "label": "inventory.create.approvalDate",
                  "jsonPath": "materialIssues[0].workFlowDetails.approvalDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approverName",
                  "label": "inventory.create.approverName",
                  "jsonPath": "materialIssues[0].workFlowDetails.senderName",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
              {
                  "name": "approverDesignation",
                  "label": "inventory.create.designation",
                  "jsonPath": "materialIssues[0].workFlowDetails.approverdesignation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approvalStatus",
                  "label": "inventory.create.approvalStatus",
                  "jsonPath": "materialIssues[0].workFlowDetails.status",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
               },
               {
                  "name": "approvalRemarks",
                  "label": "inventory.create.approvalRemarks",
                  "jsonPath": "materialIssues[0].workFlowDetails.details",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               }
                 ]
    }
],
  "url": "/inventory-services/materialissues/_create",
      "tenantIdRequired": true
},
   "inventory.view": {
      "numCols": 4,
      "useTimestamp": true,
      "objectName": "materialIssues",
      "title":"inventory.materialissue.note",
      "groups": [
         {
            "name": "MaterialIssues1",
            "label": "inventory.view.group.title.MaterialIssues1",
            "fields": [
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].fromStore.name",
                  "label": "inventory.create.fromStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$..name|$..name"
               },
               {
                  "name": "issueDate",
                  "jsonPath": "materialIssues[0].issueDate",
                  "label": "inventory.create.issueDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "indentstorename",
                  "jsonPath": "materialIssues[0].indent.indentStore.name",
                  "label": "inventory.indenting.store",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "",
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentStore.name"
               },
               {
                  "name": "departmentname",
                  "jsonPath": "materialIssues[0].indent.department.name",
                  "label": "inventory.create.department.name",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "minLength": 8,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].department.name"
               },
               {
                  "name": "indentNumber",
                  "jsonPath": "materialIssues[0].indent.indentNumber",
                  "label": "inventory.indent.number",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentNumber"
               },
               {
                  "name": "issuedToEmployee",
                  "jsonPath": "materialIssues[0].issuedToEmployee",
                  "label": "inventory.create.issuedToEmployee",
                  "pattern": "",
                  "type": "singleValueList",
                  "isRequired": false,
                  "defaultValue": "",
                  "patternErrorMsg": "",
                  "url": "/hr-employee/employees/_search?active=true|$.Employee[*].name|$.Employee[*].name|$.Employee[*].assignments.designation",
		  "depedants":[
			     {
                               "jsonPath":"materialIssues[0].issuedToDesignation",
                               "type":"textField",
                               "valExp":"getValFromDropdownData('designations', getVal('materialIssues[0].issuedToEmployee'), 'others[0]')"
                             }
		  ]
                 /* "autoCompleteDependancy": {
                     "autoCompleteUrl": "/hr-masters/designations/_search?&id=",
                     "autoFillFields": {
                        "materialIssues[0].issuedToDesignation": "materialIssues[0].issuedToDesignation"
                     }
                  }*/
               },

	       {
                  "name": "designation",
                  "jsonPath": "designations",
                  "label": "inventory.create.fromStore.name",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
		  "hide":true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "/hr-masters/designations/_search?|$..code|$..name"
               },	       

               {
                  "name": "issuedToDesignation",
                  "jsonPath": "materialIssues[0].issuedToDesignation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].description",
                  "label": "inventory.create.description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               },
               {
                  "name": "issuedBy",
                  "jsonPath": "",
                  "label": "inventory.create.issuedBy",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": name,
                  "patternErrorMsg": ""
                  
               },
               {
                  "name": "designation",
                  "jsonPath": "materialIssues[0].designation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "materialIssueStatus",
                  "jsonPath": "materialIssues[0].materialIssueStatus",
                  "label": "inventory.common.status",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": true,
                  "defaultValue": "Created",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": ""
               }
            ]
         },
         {
            "name": "MaterialIssues2",
            "label": "inventory.create.group.title.MaterialIssues2",
            "fields": [
          {
            "type": "tableList",
            "jsonPath": "materialIssues[0].materialIssueDetails[0]",
            "tableList": {
              "header": [
                {
                  "label": "inventory.materialName"
                },
                {
                  "label": "inventory.totalIndentQtyRequired"
                },
                {
                  "label": "inventory.balanceQuantity"
                },
                {
                  "label": "inventory.quantityIssued"
                },
                {
                  "label": "inventory.uom"
                },
                {
                  "label": "inventory.unitrate"
                },
                {
                  "label": "inventory.balanceQuantityAfterIssue"
                },
                {
                  "label": "inventory.totalValue"
                },
                {
                  "label": "inventory.assetCode"
                },
                {
                  "label": "inventory.projectCode"
                },
                {
                  "label": "inventory.create.description"
                }
              ],
              "values": [
                {
                  "name": "materialName",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.material.name",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].material.name"
                },
                {
                  "name": "totalIndentQtyRequired",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].indentQuantity"
                },
                {
                  "name": "balanceQuantity",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityToBeIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "quantityIssued",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": false
                },
                {
                  "name": "uom",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].uom.name"
                },
                {
                  "name": "unitRate",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "balanceQuantityAfterIssue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "totalValue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].value",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                },
                {
                  "name": "assetCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.asset.code",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].asset.code"
                },
                {
                  "name": "projectCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.projectCode.code",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].projectCode.code"
                },
                {
                  "name": "description",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].description",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                }
              ]
              }
             }
            ]
   },
   {
            "name": "MaterialIssues3",
            "label": "inventory.create.group.title.MaterialIssues3",
            "fields": [
            {
                  "name": "approvalDate",
                  "label": "inventory.create.approvalDate",
                  "jsonPath": "materialIssues[0].workFlowDetails.approvalDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approverName",
                  "label": "inventory.create.approverName",
                  "jsonPath": "materialIssues[0].workFlowDetails.senderName",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
              {
                  "name": "approverDesignation",
                  "label": "inventory.create.designation",
                  "jsonPath": "materialIssues[0].workFlowDetails.approverdesignation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approvalStatus",
                  "label": "inventory.create.approvalStatus",
                  "jsonPath": "materialIssues[0].workFlowDetails.status",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
               },
               {
                  "name": "approvalRemarks",
                  "label": "inventory.create.approvalRemarks",
                  "jsonPath": "materialIssues[0].workFlowDetails.details",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               }
                 ]
    }
],
      "tenantIdRequired": true,
      "url": "/inventory-services/materialissues/_search?issueNumber={issueNumber}"
   },
   "inventory.update": {
          "numCols": 4,
      "useTimestamp": true,
      "objectName": "materialIssues",
      "title":"inventory.materialissue.note",
      "groups": [
         {
            "name": "MaterialIssues1",
            "label": "inventory.update.group.title.MaterialIssues1",
            "fields": [
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].fromStore.name",
                  "label": "inventory.create.fromStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$..name|$..name"
               },
               {
                  "name": "issueDate",
                  "jsonPath": "materialIssues[0].issueDate",
                  "label": "inventory.create.issueDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "indentstorename",
                  "jsonPath": "materialIssues[0].indent.indentStore.name",
                  "label": "inventory.indenting.store",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "",
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentStore.name"
               },
               {
                  "name": "departmentname",
                  "jsonPath": "materialIssues[0].indent.department.name",
                  "label": "inventory.create.department.name",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "minLength": 8,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].department.name"
               },
               {
                  "name": "indentNumber",
                  "jsonPath": "materialIssues[0].indent.indentNumber",
                  "label": "inventory.indent.number",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentNumber"
               },
               {
                  "name": "issuedToEmployee",
                  "jsonPath": "materialIssues[0].issuedToEmployee",
                  "label": "inventory.create.issuedToEmployee",
                  "pattern": "",
                  "type": "singleValueList",
                  "isRequired": false,
                  "defaultValue": "",
                  "patternErrorMsg": "",
                  "url": "/hr-employee/employees/_search?active=true|$.Employee[*].name|$.Employee[*].name|$.Employee[*].assignments.designation",
		  "depedants":[
			     {
                               "jsonPath":"materialIssues[0].issuedToDesignation",
                               "type":"textField",
                               "valExp":"getValFromDropdownData('designations', getVal('materialIssues[0].issuedToEmployee'), 'others[0]')"
                             }
		  ]
                 /* "autoCompleteDependancy": {
                     "autoCompleteUrl": "/hr-masters/designations/_search?&id=",
                     "autoFillFields": {
                        "materialIssues[0].issuedToDesignation": "materialIssues[0].issuedToDesignation"
                     }
                  }*/
               },

	       {
                  "name": "designation",
                  "jsonPath": "designations",
                  "label": "inventory.create.fromStore.name",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
		  "hide":true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "/hr-masters/designations/_search?|$..code|$..name"
               },	       

               {
                  "name": "issuedToDesignation",
                  "jsonPath": "materialIssues[0].issuedToDesignation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].description",
                  "label": "inventory.create.description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               },
               {
                  "name": "issuedBy",
                  "jsonPath": "",
                  "label": "inventory.create.issuedBy",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": name,
                  "patternErrorMsg": ""
                  
               },
               {
                  "name": "designation",
                  "jsonPath": "materialIssues[0].designation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "materialIssueStatus",
                  "jsonPath": "materialIssues[0].materialIssueStatus",
                  "label": "inventory.common.status",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": true,
                  "defaultValue": "Created",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": ""
               }
            ]
         },
         {
            "name": "MaterialIssues2",
            "label": "inventory.create.group.title.MaterialIssues2",
            "fields": [
          {
            "type": "tableList",
            "jsonPath": "materialIssues[0].materialIssueDetails[0]",
            "tableList": {
              "header": [
                {
                  "label": "inventory.materialName"
                },
                {
                  "label": "inventory.totalIndentQtyRequired"
                },
                {
                  "label": "inventory.balanceQuantity"
                },
                {
                  "label": "inventory.quantityIssued"
                },
                {
                  "label": "inventory.uom"
                },
                {
                  "label": "inventory.unitrate"
                },
                {
                  "label": "inventory.balanceQuantityAfterIssue"
                },
                {
                  "label": "inventory.totalValue"
                },
                {
                  "label": "inventory.assetCode"
                },
                {
                  "label": "inventory.projectCode"
                },
                {
                  "label": "inventory.create.description"
                }
              ],
              "values": [
                {
                  "name": "materialName",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.material.name",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].material.name"
                },
                {
                  "name": "totalIndentQtyRequired",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].indentQuantity"
                },
                {
                  "name": "balanceQuantity",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityToBeIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "quantityIssued",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": false
                },
                {
                  "name": "uom",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].uom.name"
                },
                {
                  "name": "unitRate",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "balanceQuantityAfterIssue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "totalValue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].value",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                },
                {
                  "name": "assetCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.asset.code",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].asset.code"
                },
                {
                  "name": "projectCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.projectCode.code",
                  "pattern": "",
                  "type": "autoComplete",
                  "isRequired": false,
                  "isDisabled": true,
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentDetails[*].projectCode.code"
                },
                {
                  "name": "description",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].description",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                }
              ]
              }
             }
            ]
   },
   {
            "name": "MaterialIssues3",
            "label": "inventory.create.group.title.MaterialIssues3",
            "fields": [
            {
                  "name": "approvalDate",
                  "label": "inventory.create.approvalDate",
                  "jsonPath": "materialIssues[0].workFlowDetails.approvalDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approverName",
                  "label": "inventory.create.approverName",
                  "jsonPath": "materialIssues[0].workFlowDetails.senderName",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
              {
                  "name": "approverDesignation",
                  "label": "inventory.create.designation",
                  "jsonPath": "materialIssues[0].workFlowDetails.approverdesignation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approvalStatus",
                  "label": "inventory.create.approvalStatus",
                  "jsonPath": "materialIssues[0].workFlowDetails.status",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
               },
               {
                  "name": "approvalRemarks",
                  "label": "inventory.create.approvalRemarks",
                  "jsonPath": "materialIssues[0].workFlowDetails.details",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               }
                 ]
    }
],
      "url": "/inventory-services/materialissues/_update",
      "tenantIdRequired": true,
      "searchUrl": "/inventory-services/materialissues/_search?issueNumber={issueNumber}"
   }
}
export default dat;
