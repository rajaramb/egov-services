var dat = {
  'swm.search': {
    numCols: 4,
    useTimestamp: true,
    objectName: 'sanitationStaffSchedules',
    url: '/swm-services/sanitationstaffschedules/_search',
    groups: [
      {
        name: 'search',
        label: 'swm.sanitationstaffschedules.search.title',
        fields: [
          {
            name: 'employeeName',
            jsonPath: 'targetNo',
            label: 'swm.create.sanitationstaffschedules.targetNo',
            type: 'singleValueList',
            isDisabled: false,
            patternErrorMsg: 'swm.create.field.message.transactionNo',
            url: '/swm-services/sanitationstafftargets/_search?|$..targetNo|$..targetNo',
          },
          {
            name: 'name',
            jsonPath: 'shiftCode',
            label: 'swm.create.sanitationstaffschedules.shift',
            type: 'singleValueList',
            isDisabled: false,
            patternErrorMsg: 'swm.create.field.message.name',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=Shift|$..code|$..code',
          },
        ],
      },
    ],
    result: {
      header: [
        {
          label: 'swm.create.sanitationstaffschedules.targetNo',
        },
        {
          label: 'swm.create.sanitationstaffschedules.shift',
        },
      ],
      values: ['sanitationStaffTarget.targetNo', 'shift.code'],
      resultPath: 'sanitationStaffSchedules',
      rowClickUrlUpdate: '/update/swm/sanitationstaffschedules/{transactionNo}',
      rowClickUrlView: '/view/swm/sanitationstaffschedules/{transactionNo}',
    },
  },
  'swm.create': {
    numCols: 4,
    useTimestamp: true,
    objectName: 'sanitationStaffSchedules',
    idJsonPath: 'sanitationStaffSchedules[0].transactionNo',
    groups: [
      {
        name: 'SourceSegregationDetails',
        label: 'swm.create.group.title.SourceSegregationDetails',
        fields: [
          {
            name: 'targetNo',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetNo',
            label: 'swm.create.sanitationstaffschedules.targetNo',
            pattern: '',
            type: 'autoCompelete',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
            url: '/swm-services/sanitationstafftargets/_search?|$..targetNo|$..targetNo',
            autoCompleteDependancy: {
              autoCompleteUrl: '/swm-services/sanitationstafftargets/_search?targetNo={sanitationStaffSchedules[0].sanitationStaffTarget.targetNo}',
              autoFillFields: {
                'sanitationStaffSchedules[0].sanitationStaffTarget.targetFrom': 'sanitationStaffTargets[0].targetFrom',
                'sanitationStaffSchedules[0].sanitationStaffTarget.targetTo': 'sanitationStaffTargets[0].targetTo',
                'sanitationStaffSchedules[0].sanitationStaffTarget.route.name': 'sanitationStaffTargets[0].route.name',
                'sanitationStaffSchedules[0].sanitationStaffTarget.dumpingGround.name': 'sanitationStaffTargets[0].dumpingGround.name',
              },
            },
          },
          {
            name: 'targetFrom',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetFrom',
            label: 'swm.create.sanitationstaffschedules.targetfrom',
            pattern: '',
            type: 'datePicker',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            patternErrorMsg: '',
          },
          {
            name: 'targetTo',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetTo',
            label: 'swm.create.sanitationstaffschedules.targetto',
            pattern: '',
            type: 'datePicker',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            patternErrorMsg: '',
          },
          {
            name: 'name',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.route.name',
            label: 'swm.create.sanitationstaffschedules.route',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'name',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.dumpingGround.name',
            label: 'swm.create.sanitationstaffschedules.dumpingground',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'code',
            jsonPath: 'sanitationStaffSchedules[0].shift.code',
            label: 'swm.create.sanitationstaffschedules.shift',
            pattern: '',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=Shift|$..code|$..code',
          },
        ],
      },
    ],
    url: '/swm-services/sanitationstaffschedules/_create',
    tenantIdRequired: true,
  },
  'swm.view': {
    numCols: 4,
    useTimestamp: true,
    objectName: 'sanitationStaffSchedules',
    idJsonPath: 'sanitationStaffSchedules[0].transactionNo',
    groups: [
      {
        name: 'SourceSegregationDetails',
        label: 'swm.create.group.title.SourceSegregationDetails',
        fields: [
          {
            name: 'targetNo',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetNo',
            label: 'swm.create.sanitationstaffschedules.targetNo',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'targetFrom',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetFrom',
            label: 'swm.create.sanitationstaffschedules.targetfrom',
            pattern: '',
            type: 'datePicker',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            patternErrorMsg: '',
          },
          {
            name: 'targetTo',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetTo',
            label: 'swm.create.sanitationstaffschedules.targetto',
            pattern: '',
            type: 'datePicker',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            patternErrorMsg: '',
          },
          {
            name: 'name',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.route.name',
            label: 'swm.create.sanitationstaffschedules.route',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'name',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.dumpingGround.name',
            label: 'swm.create.sanitationstaffschedules.dumpingground',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'code',
            jsonPath: 'sanitationStaffSchedules[0].shift.code',
            label: 'swm.create.sanitationstaffschedules.shift',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    tenantIdRequired: true,
    url: '/swm-services/sanitationstaffschedules/_search?transactionNo={transactionNo}',
  },
  'swm.update': {
    numCols: 4,
    useTimestamp: true,
    objectName: 'sanitationStaffSchedules',
    idJsonPath: 'sanitationStaffSchedules[0].transactionNo',
    groups: [
      {
        name: 'SourceSegregationDetails',
        label: 'swm.create.group.title.SourceSegregationDetails',
        fields: [
          {
            name: 'targetNo',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetNo',
            label: 'swm.create.sanitationstaffschedules.targetNo',
            pattern: '',
            type: 'autoCompelete',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
            url: '/swm-services/sanitationstafftargets/_search?|$..targetNo|$..targetNo',
            autoCompleteDependancy: {
              autoCompleteUrl: '/swm-services/sanitationstafftargets/_search?targetNo={sanitationStaffSchedules[0].sanitationStaffTarget.targetNo}',
              autoFillFields: {
                'sanitationStaffSchedules[0].sanitationStaffTarget.targetFrom': 'sanitationStaffTargets[0].targetFrom',
                'sanitationStaffSchedules[0].sanitationStaffTarget.targetTo': 'sanitationStaffTargets[0].targetTo',
                'sanitationStaffSchedules[0].sanitationStaffTarget.route.name': 'sanitationStaffTargets[0].route.name',
                'sanitationStaffSchedules[0].sanitationStaffTarget.dumpingGround.name': 'sanitationStaffTargets[0].dumpingGround.name',
              },
            },
          },
          {
            name: 'targetFrom',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetFrom',
            label: 'swm.create.sanitationstaffschedules.targetfrom',
            pattern: '',
            type: 'datePicker',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            patternErrorMsg: '',
          },
          {
            name: 'targetTo',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.targetTo',
            label: 'swm.create.sanitationstaffschedules.targetto',
            pattern: '',
            type: 'datePicker',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            patternErrorMsg: '',
          },
          {
            name: 'name',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.route.name',
            label: 'swm.create.sanitationstaffschedules.route',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'name',
            jsonPath: 'sanitationStaffSchedules[0].sanitationStaffTarget.dumpingGround.name',
            label: 'swm.create.sanitationstaffschedules.dumpingground',
            pattern: '',
            type: 'text',
            isRequired: false,
            isDisabled: true,
            defaultValue: '',
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'code',
            jsonPath: 'sanitationStaffSchedules[0].shift.code',
            label: 'swm.create.sanitationstaffschedules.shift',
            pattern: '',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=Shift|$..code|$..code',
          },
        ],
      },
    ],
    url: '/swm-services/sanitationstaffschedules/_update',
    tenantIdRequired: true,
    searchUrl: '/swm-services/sanitationstaffschedules/_search?transactionNo={transactionNo}',
  },
};
export default dat;
