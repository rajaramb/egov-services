var dat = {
  "legal.search": {
    numCols: 4,
    useTimestamp: true,
    objectName: "",
    url: "/legalcase/_search",
    groups: [
      {
        name: "search",
        label: "legacylegal.search.title",
        fields: [
          {
            label: "legacylegal.createundefined",
            type: "",
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.undefined"
          },
          {
            name: "sortProperty",
            jsonPath: "sortProperty",
            label: "legacylegal.createsortProperty",
            type: "text",
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.sortProperty"
          },
          {
            name: "ids",
            jsonPath: "ids",
            label: "legacylegal.createids",
            type: "",
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.ids"
          },
          {
            name: "referenceNo",
            jsonPath: "referenceNo",
            label: "legacylegal.createreferenceNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.referenceNo"
          },
          {
            name: "isSummon",
            jsonPath: "isSummon",
            label: "legacylegal.createisSummon",
            type: "radio",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.isSummon",
            values: [
              {
                label: "legacylegal.create.Summon",
                value: true
              },
              {
                label: "legacylegal.create.Warrant",
                value: false
              }
            ]
          },
          {
            name: "referenceCaseNo",
            jsonPath: "referenceCaseNo",
            label: "legacylegal.createreferenceCaseNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.referenceCaseNo"
          },
          {
            name: "caseStatus",
            jsonPath: "caseStatus",
            label: "legacylegal.createcaseStatus",
            type: "radio",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.caseStatus"
          },
          {
            name: "caseType",
            jsonPath: "caseType",
            label: "legacylegal.createcaseType",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.caseType"
          },
          {
            name: "departmentName",
            jsonPath: "departmentName",
            label: "legacylegal.createdepartmentName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.departmentName"
          },
          {
            name: "advocateName",
            jsonPath: "advocateName",
            label: "legacylegal.createadvocateName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.advocateName"
          },
          {
            name: "caseCategory",
            jsonPath: "caseCategory",
            label: "legacylegal.createcaseCategory",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.caseCategory"
          },
          {
            name: "fromDate",
            jsonPath: "fromDate",
            label: "legacylegal.createfromDate",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.fromDate"
          },
          {
            name: "toDate",
            jsonPath: "toDate",
            label: "legacylegal.createtoDate",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legacylegal.create.field.message.toDate"
          }
        ]
      }
    ],
    result: {
      header: [
        {
          label: "legacylegal.search.result.referenceNo"
        },
        {
          label: "legacylegal.search.result.advocateName"
        },
        {
          label: "legacylegal.search.result.advocateName"
        },
        {
          label: "legacylegal.search.result.Status"
        },
        {
          label: "legacylegal.search.result.caseNo"
        },
        {
          label: "legacylegal.search.result.caseDetails"
        }
      ],
      values: [
        "id",
        "referenceNo",
        "summonDate",
        "year",
        "caseType",
        "caseNo",
        "caseDetails"
      ],
      resultPath: "summons",
      rowClickUrlUpdate: "/update/legalcase/{id}",
      rowClickUrlView: "/view/legalcase/{id}"
    }
  },
  "legal.create": {
    numCols: 4,
    useTimestamp: true,
    objectName: "cases",
    groups: [
      {
        name: "CaseTypeDetails",
        label: "legacylegal.create.group.title.CaseTypeDetails",
        fields: [
          {
            "name": "ULB",
            "jsonPath": "cases[0].summon.isULBInitiated",
            "label": "legacylegal.create.ULB",
            "pattern": "",
            "type": "checkbox",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },{
            name: "side",
            jsonPath: "cases[0].summon.side.name",
            label: "legacylegal.create.side",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=side|$..code|$..name"
          },
          {
            name: "caseType",
            jsonPath: "cases[0].summon.caseType.name",
            label: "legacylegal.create.caseType",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType|$..code|$..name"
          },
          {
            name: "caseCategory",
            jsonPath: "cases[0].summon.caseCategory.name",
            label: "legacylegal.create.caseCategory",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseCategory|$..code|$..name"
          },
          {
            name: "caseNo",
            jsonPath: "cases[0].summon.caseNo",
            label: "legacylegal.create.caseNo",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "courtName",
            jsonPath: "cases[0].summon.courtName.name",
            label: "legacylegal.create.courtName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=court|$..code|$..name"
          },
          {
            name: "ward",
            jsonPath: "cases[0].summon.ward",
            label: "legacylegal.create.ward",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "bench",
            jsonPath: "cases[0].summon.bench.name",
            label: "legacylegal.create.bench",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=bench|$..code|$..name"
          },
          {
            name: "stamp",
            jsonPath: "cases[0].summon.stamp.name",
            label: "legacylegal.create.stamp",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=stamp|$..code|$..name"
          },
          {
            name: "plantiffName",
            jsonPath: "cases[0].summon.plantiffName",
            label: "legacylegal.create.plantiffName",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "plantiffAddress",
            jsonPath: "cases[0].summon.plantiffAddress.addressLine1",
            label: "legacylegal.create.plantiffAddress",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "defendant",
            jsonPath: "cases[0].summon.defendant",
            label: "legacylegal.create.defendant",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "departmentName",
            jsonPath: "cases[0].summon.departmentName.code",
            label: "legacylegal.create.departmentName",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url: "/egov-common-masters/departments/_search?|$..code|$..name"
          },
          {
            name: "pleadersEngagementDetails",
            jsonPath: "cases[0].pleaderEngagementDetails",
            label: "legacylegal.create.pleadersEngagementDetails",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "recieptDate",
            jsonPath: "cases[0].receiptDate",
            label: "legacylegal.create.recieptDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "summonDate",
            jsonPath: "cases[0].summon.summonDate",
            label: "legacylegal.create.summonDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "ULBResolution",
            jsonPath: "cases[0].resolution",
            label: "legacylegal.create.ULBResolution",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "ULBResolutionDate",
            jsonPath: "cases[0].resolutionDate",
            label: "legacylegal.create.ULBResolutionDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "AdvocateInfoGivenDate",
            jsonPath: "cases[0].advocateInfoDate",
            label: "legacylegal.create.AdvocateInfoGivenDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "VakalatnamaDate",
            jsonPath: "cases[0].vakalatnamaGenerationDate",
            label: "legacylegal.create.VakalatnamaDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "responsibleOfficer",
            jsonPath: "summons[0].responsibleOfficer",
            label: "legacylegal.create.responsibleOfficer",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "remarks",
            jsonPath: "cases[0].remarks",
            label: "legacylegal.create.remarks",
            type: "textarea",
            fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseDetails",
            jsonPath: "cases[0].summon.caseDetails",
            label: "legacylegal.create.caseDetails",
            type: "textarea",
            fullWidth:true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "year",
            jsonPath: "cases[0].summon.year",
            label: "legacylegal.create.year",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=year|$..code|$..name",
            patternErrorMsg: ""
          },
          {
            name: "hearingDate",
            jsonPath: "cases[0].summon.hearingDate",
            label: "legacylegal.create.hearingDate",
            type: "datePicker",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "hearingTime",
            jsonPath: "cases[0].summon.hearingTime",
            label: "legacylegal.create.hearingTime",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "sectionApplied",
            jsonPath: "cases[0].summon.sectionApplied",
            label: "legacylegal.create.sectionApplied",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "judgementDate",
            jsonPath: "cases[0].hearingDetails[0].judgeMentDate",
            label: "legacylegal.create.judgementDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "judgementDetails",
            jsonPath: "cases[0].summon.judgementDetails",
            label: "legacylegal.create.judgementDetails",
            type: "textarea",
            fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "advocateOpinion",
            jsonPath: "cases[0].hearingDetails[0].advocateOpinion",
            label: "legacylegal.create.advocateOpinion",
            type: "textarea",
            fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "furtherProcessDetails",
            jsonPath: "cases[0].hearingDetails[0].furtherProcesssDetails",
            label: "legacylegal.create.furtherProcessDetails",
            type: "textarea",
            fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "darkhastDueDate",
            jsonPath: "cases[0].hearingDetails[0].darkhasthDueDate",
            label: "legacylegal.create.darkhastDueDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "voucherType",
            jsonPath: "cases[0].caseVoucher.voucherType",
            label: "legacylegal.create.voucherType",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            "defaultValue": [{
              "active": true,
              "key": "Payment",
              "code": "Payment",
              "value": "Payment",
              "tenantId": "default"
            },  {
              "active": true,
              "key": "Receipt",
              "code": "Receipt",
              "value": "Receipt",
              "tenantId": "default"
            }],
            "showHideFields": [{
             "ifValue":"Payment",
             "hide": [{
               "name": "creditDate",
               "isGroup": false,
               "isField": true
                }],
             "show": [{
               "name": "debitDate",
               "isGroup": false,
               "isField": true
                }]
            },{
             "ifValue":"Receipt",
             "show": [{
               "name": "creditDate",
               "isGroup": false,
               "isField": true
                }],
             "hide": [{
               "name": "debitDate",
               "isGroup": false,
               "isField": true
                }]
            }],
          }, {
            name: "amountReceived",
            jsonPath: "cases[0].summon.amountReceived",
            label: "legacylegal.create.amountReceived",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "creditDate",
            hide: true,
            jsonPath: "cases[0].caseVoucher.voucherDate",
            label: "legacylegal.create.receiptDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "debitDate",
            hide: true,
            jsonPath: "cases[0].caseVoucher.voucherDate",
            label: "legacylegal.create.paymentDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "paymentDetails",
            jsonPath: "cases[0].caseVoucher.details",
            label: "legacylegal.create.paymentDetails",
            type: "textarea",
            fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "verificationRemarks",
            jsonPath: "cases[0].caseVoucher.verificationRemarks",
            label: "legacylegal.create.verificationRemarks",
            type: "textarea",
            fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          }
        ]
      },
      {
        name: "UploadDocument",
        label: "legacylegal.create.group.title.UploadDocument",
        "fields": [
          {
              "type": "tableList",
              "jsonPath": "summons",
              "tableList": {
                "header": [{
                  "label": "legacylegal.create.advocateName"
                }, {
                  "label": "legacylegal.create.applicantType"
                },{
                  "label": "legacylegal.create.fee"
                }],
                "values": [{
                  "name": "advocateName",
                  "pattern": "",
                  "type": "singleValueList",
                  "jsonPath": "cases[0].advocateDetails[0].advocate.name",
                  "isRequired": true,
                  "isDisabled": false,
                  "url": "/lcms-services/legalcase/advocate/_search?|$..code|$..name"
                }, {
                  "name": "advocateAssignDate",
                  "pattern": "",
                  "type": "datePicker",
                  "jsonPath": "cases[0].advocateDetails[0].assignedDate",
                  "isRequired": true,
                  "isDisabled": false
                },{
                  "name": "fee",
                  "pattern": "",
                  "type": "text",
                  "jsonPath": "cases[0].advocateDetails[0].fee",
                  "isRequired": true,
                  "isDisabled": false
                }]
              } 
            }
      ]
      }
    ],
    url: "/lcms-services/legalcase/case/_dataentry",
    tenantIdRequired: true
  },
  "legal.view": {
    numCols: 4,
    useTimestamp: true,
    objectName: "summons",
    groups: [
      {
        name: "CaseType",
        label: "legacylegal.create.group.title.CaseType",
        fields: [
          {
            name: "isSummon",
            jsonPath: "summons[0].isSummon",
            label: "legacylegal.create.isSummon",
            type: "radio",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            values: [
              {
                label: "legacylegal.create.Summon",
                value: true
              },
              {
                label: "legacylegal.create.Warrant",
                value: false
              }
            ]
          }
        ]
      },
      {
        name: "CaseTypeDetails",
        label: "legacylegal.create.group.title.CaseTypeDetails",
        fields: [
          {
            name: "referenceNo",
            jsonPath: "summons[0].referenceNo",
            label: "legacylegal.create.referenceNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "summonDate",
            jsonPath: "summons[0].summonDate",
            label: "legacylegal.create.summonDate",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "year",
            jsonPath: "summons[0].year",
            label: "legacylegal.create.year",
            type: "text",
            isRequired: false,
            isDisabled: false,
            maxLength: 4,
            patternErrorMsg: ""
          },
          {
            name: "caseType",
            jsonPath: "summons[0].caseType.name",
            label: "legacylegal.create.caseType",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType|$..code|$..name"
          },
          {
            name: "plantiffName",
            jsonPath: "summons[0].plantiffName",
            label: "legacylegal.create.plantiffName",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseNo",
            jsonPath: "summons[0].caseNo",
            label: "legacylegal.create.caseNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "plantiffAddress",
            jsonPath: "summons[0].plantiffAddress",
            label: "legacylegal.create.plantiffAddress",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseDetails",
            jsonPath: "summons[0].caseDetails",
            label: "legacylegal.create.caseDetails",
            type: "textarea",
            fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "defendant",
            jsonPath: "summons[0].defendant",
            label: "legacylegal.create.defendant",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "departmentName",
            jsonPath: "summons[0].departmentName",
            label: "legacylegal.create.departmentName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url: "/egov-common-masters/departments/_search?|$..code|$..name"
          },
          {
            name: "courtName",
            jsonPath: "summons[0].courtName",
            label: "legacylegal.create.courtName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=court|$..code|$..name"
          },
          {
            name: "hearingDate",
            jsonPath: "summons[0].hearingDate",
            label: "legacylegal.create.hearingDate",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "ward",
            jsonPath: "summons[0].ward",
            label: "legacylegal.create.ward",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "hearingTime",
            jsonPath: "summons[0].hearingTime",
            label: "legacylegal.create.hearingTime",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "bench",
            jsonPath: "summons[0].bench",
            label: "legacylegal.create.bench",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=bench|$..code|$..name"
          },
          {
            name: "side",
            jsonPath: "summons[0].side",
            label: "legacylegal.create.side",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=side|$..code|$..name"
          },
          {
            name: "stamp",
            jsonPath: "summons[0].stamp",
            label: "legacylegal.create.stamp",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=stamp|$..code|$..name"
          },
          {
            name: "sectionApplied",
            jsonPath: "summons[0].sectionApplied",
            label: "legacylegal.create.sectionApplied",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          }
        ]
      }
    ],
    tenantIdRequired: true
  },
  "legal.update": {
    numCols: 4,
    useTimestamp: true,
    objectName: "summons",
    searchUrl: "legalcase/_search?id={id}",
    groups: [
      {
        name: "CaseType",
        label: "legacylegal.create.group.title.CaseType",
        fields: [
          {
            name: "isSummon",
            jsonPath: "summons[0].isSummon",
            label: "legacylegal.create.isSummon",
            type: "radio",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            values: [
              {
                label: "legacylegal.create.Summon",
                value: true
              },
              {
                label: "legacylegal.create.Warrant",
                value: false
              }
            ]
          }
        ]
      },
      {
        name: "CaseTypeDetails",
        label: "legacylegal.create.group.title.CaseTypeDetails",
        fields: [
          {
            name: "referenceNo",
            jsonPath: "summons[0].referenceNo",
            label: "legacylegal.create.referenceNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "summonDate",
            jsonPath: "summons[0].summonDate",
            label: "legacylegal.create.summonDate",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "year",
            jsonPath: "summons[0].year",
            label: "legacylegal.create.year",
            type: "text",
            isRequired: false,
            isDisabled: false,
            maxLength: 4,
            patternErrorMsg: ""
          },
          {
            name: "caseType",
            jsonPath: "summons[0].caseType",
            label: "legacylegal.create.caseType",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType|$..code|$..name"
          },
          {
            name: "plantiffName",
            jsonPath: "summons[0].plantiffName",
            label: "legacylegal.create.plantiffName",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseNo",
            jsonPath: "summons[0].caseNo",
            label: "legacylegal.create.caseNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "plantiffAddress",
            jsonPath: "summons[0].plantiffAddress",
            label: "legacylegal.create.plantiffAddress",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseDetails",
            jsonPath: "summons[0].caseDetails",
            label: "legacylegal.create.caseDetails",
            type: "textarea",
             fullWidth:true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "defendant",
            jsonPath: "summons[0].defendant",
            label: "legacylegal.create.defendant",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "departmentName",
            jsonPath: "summons[0].departmentName",
            label: "legacylegal.create.departmentName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url: "/egov-common-masters/departments/_search?|$..code|$..name"
          },
          {
            name: "courtName",
            jsonPath: "summons[0].courtName",
            label: "legacylegal.create.courtName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=court|$..code|$..name"
          },
          {
            name: "hearingDate",
            jsonPath: "summons[0].hearingDate",
            label: "legacylegal.create.hearingDate",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "ward",
            jsonPath: "summons[0].ward",
            label: "legacylegal.create.ward",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "hearingTime",
            jsonPath: "summons[0].hearingTime",
            label: "legacylegal.create.hearingTime",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "bench",
            jsonPath: "summons[0].bench",
            label: "legacylegal.create.bench",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=bench|$..code|$..name"
          },
          {
            name: "side",
            jsonPath: "summons[0].side",
            label: "legacylegal.create.side",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=side|$..code|$..name"
          },
          {
            name: "stamp",
            jsonPath: "summons[0].stamp",
            label: "legacylegal.create.stamp",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=stamp|$..code|$..name"
          },
          {
            name: "sectionApplied",
            jsonPath: "summons[0].sectionApplied",
            label: "legacylegal.create.sectionApplied",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          }
        ]
      }
    ],
    url: "//legalcase/_update",
    tenantIdRequired: true
  }
};
export default dat;