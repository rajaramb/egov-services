var dat = {
	"employee.create": {
		"numCols": 12/3,
		"url": "/hr-masters/positions/_create",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "Position",
		"groups": [
			{
				"label": "employee.createPosition.groups.title",
				"name": "createPositionType",
				"fields": [
					{
						"name": "Department",
						"jsonPath": "Position[0].deptdesig.department",
						"label": "employee.createPosition.groups.fields.departmenttype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/egov-common-masters/departments/_search?|$..id|$..name",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Designation",
						"jsonPath": "Position[0].deptdesig.designation.id",
						"label": "employee.createPosition.groups.fields.designationtype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/hr-masters/designations/_search?|$..id|$..name",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Position",
						"jsonPath": "Position[0].noOfPositions",
						"label": "employee.createPosition.groups.fields.noOfPositions",
						"pattern": "^[1-9]\d*$",
						"type": "number",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Outsourced Post",
						"jsonPath": "Position[0].isPostOutsourced",
						"label": "employee.createPosition.groups.fields.outsourcepost",
						"pattern": "",
						"type": "radio",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": "",
						"values": [{"label":"employee.createPosition.groups.fields.outsourcepost.value1", "value":true},{"label":"employee.createPosition.groups.fields.outsourcepost.value2", "value":false}],
						"defaultValue": false
					}
				]
			}
		]
	},
	"employee.search": {
		"numCols": 12/3,
		"url": "/hr-masters/positions/_search",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "Position",
		"groups": [
			{
				"label": "employee.searchPosition.groups.title",
				"name": "createPositionType",
				"fields": [
					{
						"name": "Department",
						"jsonPath": "departmentId",
						"label": "employee.createPosition.groups.fields.departmenttype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/egov-common-masters/departments/_search?|$..id|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Designation",
						"jsonPath": "designationId",
						"label": "employee.createPosition.groups.fields.designationtype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/hr-masters/designations/_search?|$..id|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					}
				]
			}
		],
		"result": {
			"header": [{
				"label": "employee.createPosition.groups.fields.positionName"}, {
					"label": "employee.createPosition.groups.fields.departmenttype",
					"url": "/egov-common-masters/departments/_search?|$..id|$..name"
				}, {
					"label": "employee.createPosition.groups.fields.designationtype",
					"url": "/hr-masters/designations/_search?|$..id|$..name"
				}, {label: "employee.createPosition.groups.fields.outsourcepost"}],
			"values": ["name", "deptdesig.department", "deptdesig.designation.id","isPostOutsourced"],
			"resultPath": "Position",
			"rowClickUrlUpdate": "/update/employee/createPosition/{id}",
			"rowClickUrlView": "/view/employee/createPosition/{id}"
			}
	},
	"employee.view": {
		"numCols": 12/3,
		"url": "/hr-masters/positions/_search?id={id}",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "Position",
		"groups": [
			{
				"label": "employee.viewPosition.groups.title",
				"name": "createPositionType",
				"fields": [
					{
						"name": "Department",
						"jsonPath": "Position[0].deptdesig.department",
						"label": "employee.createPosition.groups.fields.departmenttype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/egov-common-masters/departments/_search?|$..id|$..name",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Designation",
						"jsonPath": "Position[0].deptdesig.designation.id",
						"label": "employee.createPosition.groups.fields.designationtype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/hr-masters/designations/_search?|$..id|$..name",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Position",
						"jsonPath": "Position[0].name",
						"label": "employee.createPosition.groups.fields.positionName",
						"pattern": "^[\s.]*([^\s.][\s.]*){0,100}$",
						"type": "text",
						"isRequired": true,
						"isDisabled": true,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Outsourced Post",
						"jsonPath": "Position[0].isPostOutsourced",
						"label": "employee.createPosition.groups.fields.outsourcepost",
						"pattern": "",
						"type": "radio",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": "",
						"values": [{"label":"employee.createPosition.groups.fields.outsourcepost.value1", "value":true},{"label":"employee.createPosition.groups.fields.outsourcepost.value2", "value":false}]

					},
					{
						"name": "Active",
						"jsonPath": "Position[0].active",
						"label": "wc.create.active",
						"pattern": "",
						"type": "checkbox",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					}
				]
			}
		]
	},
	"employee.update": {
		"numCols": 12/3,
		"searchUrl": "/hr-masters/positions/_search?id={id}",
		"url":"/hr-masters/positions/_update",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "Position",
		"groups": [
			{
				"label": "employee.updatePosition.groups.title",
				"name": "createPositionType",
				"fields": [
					{
						"name": "Department",
						"jsonPath": "Position[0].deptdesig.department",
						"label": "employee.createPosition.groups.fields.departmenttype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/egov-common-masters/departments/_search?|$..id|$..name",
						"isRequired": true,
						"isDisabled": true,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Designation",
						"jsonPath": "Position[0].deptdesig.designation.id",
						"label": "employee.createPosition.groups.fields.designationtype",
						"pattern": "",
						"type": "singleValueList",
						"url": "/hr-masters/designations/_search?|$..id|$..name",
						"isRequired": true,
						"isDisabled": true,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Position",
						"jsonPath": "Position[0].name",
						"label": "employee.createPosition.groups.fields.positionName",
						"pattern": "^[\s.]*([^\s.][\s.]*){0,100}$",
						"type": "text",
						"isRequired": true,
						"isDisabled": true,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "Outsourced Post",
						"jsonPath": "Position[0].isPostOutsourced",
						"label": "employee.createPosition.groups.fields.outsourcepost",
						"pattern": "",
						"type": "radio",
						"isRequired": true,
						"isDisabled": true,
						"requiredErrMsg": "",
						"patternErrMsg": "",
						"values": [{"label":"employee.createPosition.groups.fields.outsourcepost.value1", "value":true},{"label":"employee.createPosition.groups.fields.outsourcepost.value2", "value":false}]

					},
					{
						"name": "Active",
						"jsonPath": "Position[0].active",
						"label": "wc.create.active",
						"pattern": "",
						"type": "checkbox",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					}
				]
			}
		]
	}
}

export default dat;