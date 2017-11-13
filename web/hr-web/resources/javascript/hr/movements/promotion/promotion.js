var flag = 0;
class EmployeePromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      movement:
      	{
            employee: "",
            typeOfMovement: "PROMOTION",
            currentAssignment: "",
            transferType: "TRANSFER_WITHIN_DEPARTMENT_OR_CORPORATION_OR_ULB",
            promotionBasis: {
              id: ""
            },
            remarks: "",
            reason: {
            	id: ""
            },
            effectiveFrom: "",
            enquiryPassedDate: "",
            transferedLocation: "",
            departmentAssigned: "",
            designationAssigned: "",
            positionAssigned: "",
            fundAssigned: "",
            functionAssigned: "",
            employeeAcceptance: "",
            workflowDetails: {
            	assignee: ""
            },
            tenantId: tenantId
          },
          employee: {
            id:"",
            name:"",
            code:"",
            departmentId:"",
            designationId:"",
            positionId:""
          },
          accepted:"",
    positionList:[],departmentList:[],designationList:[],employees:[],promotionList:[],
    fundList:[],functionaryList:[],districtList:[],transferList:[],reasonList:[],pNameList:[],userList:[]
  }
    this.handleChange=this.handleChange.bind(this);
    this.addOrUpdate=this.addOrUpdate.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.vacantPositionFun = this.vacantPositionFun.bind(this);
    this.getUsersFun = this.getUsersFun.bind(this);
  }

addOrUpdate(e){

    e.preventDefault();

    var _this = this;
    var movement =Object.assign({}, _this.state.movement);

        var body = {
            "RequestInfo":requestInfo,
            "Movement":[movement]
        };

            $.ajax({
                url:baseUrl+"/hr-employee-movement/movements/_create?tenantId=" + tenantId,
                type: 'POST',
                dataType: 'json',
                data:JSON.stringify(body),
                contentType: 'application/json',
                headers:{
                  'auth-token': authToken
                },
                success: function(res) {

                                  _this.setState({movement:
                                        	{
                                              employeeId: "",
                                              typeOfMovement: "TRANSFER",
                                              currentAssignment: "",
                                              transferType: "",
                                              promotionBasis: {
                                                id: ""
                                              },
                                              remarks: "",
                                              reason: {
                                              	id: ""
                                              },
                                              effectiveFrom: "",
                                              enquiryPassedDate: "",
                                              transferedLocation: "",
                                              departmentAssigned: "",
                                              designationAssigned: "",
                                              positionAssigned: "",
                                              fundAssigned: "",
                                              functionAssigned: "",
                                              employeeAcceptance: "",
                                              workflowDetails: {
                                              	assignee: "",
                                                department:"",
                                                designation:""
                                              },
                                              tenantId: tenantId
                                            },
                                            employee: {
                                              id:"",
                                              name:"",
                                              code:"",
                                              departmentId:"",
                                              designationId:"",
                                              positionId:""
                                            },
                                            transferWithPromotion:false,
                                      positionList:[],departmentList:[],designationList:[],employees:[],promotionList:[],wfDesignationList:[],
                                      fundList:[],functionaryList:[],districtList:[],transferList:[],reasonList:[],pNameList:[],userList:[]
                                    });

                                  showSuccess("Promotion application is forwarded");

                },
                error: function(err) {
                  if(err["responseJSON"].message)
                    showError(err["responseJSON"].message);
                  else if (err["responseJSON"].Movement[0]) {
                    showError(err["responseJSON"].Movement[0].errorMsg)
                  }else{
                    showError("Something went wrong. Please contact Administrator");
                  }
                }
            })

}

setInitialState(initState) {
  this.setState(initState);
}

componentWillUpdate() {
  if(flag == 1) {
    flag = 0;
    $('#employeeTable').dataTable().fnDestroy();
  }
}

  componentDidUpdate(prevProps, prevState) {
      if (prevState.employees.length!=this.state.employees.length) {
          $('#employeeTable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                     'copy', 'csv', 'excel', 'pdf', 'print'
             ],
             ordering: false,
             bDestroy: true,
             language: {
               "emptyTable": "No Records"
            }
          });
      }
  }
  componentDidMount() {
    var type = getUrlVars()["type"], _this = this, id = getUrlVars()["id"];

    if(window.opener && window.opener.document) {
       var logo_ele = window.opener.document.getElementsByClassName("homepage_logo");
       if(logo_ele && logo_ele[0]) {
         document.getElementsByClassName("homepage_logo")[0].src = window.location.origin + logo_ele[0].getAttribute("src");
       }
    }
    $('#hp-citizen-title').text(titleCase(getUrlVars()["type"]) + " Employee Promotion");

    var _state = {}, _this = this, count = 9;
    const checkCountAndCall = function(key, res) {
      _state[key] = res;
      count--;
      if(count == 0)
        _this.setInitialState(_state);
    }


    getDropdown("assignments_designation", function(res) {
      checkCountAndCall("designationList", res);
    });
    getDropdown("assignments_department", function(res) {
      checkCountAndCall("departmentList", res);
    });
    getDropdown("assignments_position", function(res) {
      checkCountAndCall("positionList", res);
    });
    getDropdown("assignments_fund", function(res) {
      checkCountAndCall("fundList", res);
    });
    getDropdown("assignments_functionary", function(res) {
      checkCountAndCall("functionaryList", res);
    });
    getDropdown("transferReason", function(res) {
      checkCountAndCall("reasonList", res);
    });
    getDropdown("promotionBasis", function(res) {
      checkCountAndCall("promotionList", res);
    });
    getDropdown("transferType", function(res) {
      checkCountAndCall("transferList", res);
    });
    getDropdown("districtList", function(res) {
      checkCountAndCall("districtList", res);
    });

    $('#enquiryPassedDate, #effectiveFrom').datepicker({
        format: 'dd/mm/yyyy',
        autoclose:true,
        defaultDate: ""
    });
    $('#enquiryPassedDate').val("");
    $('#effectiveFrom').val("");
    $('#enquiryPassedDate,#effectiveFrom ').on('changeDate', function(e) {


          _this.setState({
                movement: {
                    ..._this.state.movement,
                    "enquiryPassedDate":$("#enquiryPassedDate").val(),
                    "effectiveFrom":$("#effectiveFrom").val()
                }
          });
          if(_this.state.movement.designationAssigned&&_this.state.movement.departmentAssigned){
            var _designation = _this.state.movement.designationAssigned;
            var _department = _this.state.movement.departmentAssigned;
            var _effectiveFrom = _this.state.movement.effectiveFrom;
              _this.vacantPositionFun(_department,_designation,_effectiveFrom);
          }

    });



    getCommonMasterById("hr-employee","employees", id, function(err, res) {
      if(res && res.Employee) {
        var obj = res.Employee[0];
        var ind = 0;
        if(obj.length > 0) {
          obj.map((item,index)=>{
                for(var i=0; i<item.assignments.length; i++) {
                  if([true, "true"].indexOf(item.assignments[i].isPrimary) > -1) {
                    ind = i;
                    break;
                  }
                }
          });
        }
        _this.setState({
          ..._this.state,
            employee: {
              name: obj.name,
              code: obj.code,
              departmentId:obj.assignments[ind].department,
              designationId:obj.assignments[ind].designation,
              positionId:obj.assignments[ind].position
            },
            movement:{
              ..._this.state.movement,
              employeeId : obj.id,
              currentAssignment:obj.assignments[ind].position
            }

        })
      }
    });
  }

  getUsersFun(departmentId,designationId){
    var _this = this;
    commonApiPost("hr-employee","employees","_search", {tenantId,departmentId, designationId}, function(err, res) {
        if(res) {
          _this.setState({
              ..._this.state,
              userList:res.Employee
          })
        }
  })
}

  vacantPositionFun(departmentId,designationId,effectiveFrom){
    var _this = this;
    commonApiPost("hr-masters", "vacantpositions", "_search", {
        tenantId,
        departmentId: departmentId,
        designationId: designationId,
        asOnDate: effectiveFrom
    }, function(err, res) {
        if (res) {
          _this.setState({
              movement:{
                  ..._this.state.movement,
              },pNameList:res.Position
          })
        }
    });

  }

  handleChange(e,name) {
    var _this = this;
    switch (name) {
      case "designationAssigned":
        if(this.state.movement.departmentAssigned&&this.state.movement.effectiveFrom){
          var _department = this.state.movement.departmentAssigned;
          var _date = this.state.movement.effectiveFrom;
          _this.vacantPositionFun(_department,e.target.value,_date);
        }
        break;
        case "departmentAssigned":
        if(this.state.movement.designationAssigned&&this.state.movement.effectiveFrom){
          var _designation = this.state.movement.designationAssigned;
          var _date = this.state.movement.effectiveFrom;
            _this.vacantPositionFun(e.target.value,_designation,_date);
        }
        break;
        case "department":
        _this.state.movement.workflowDetails.assignee = "";
        if(this.state.movement.workflowDetails.designation){
          var _designation = this.state.movement.workflowDetails.designation;
          _this.getUsersFun(e.target.value,_designation);
        }
        break;
        case "designation":
        _this.state.movement.workflowDetails.assignee = "";
        if(this.state.movement.workflowDetails.department){
          var _department = this.state.movement.workflowDetails.department;
          _this.getUsersFun(_department,e.target.value);
        }
        break;

    }

    if(name === "promotionBasis"){
      this.setState({
          movement:{
              ...this.state.movement,
              promotionBasis:{id:e.target.value}
          }
      })
    }else if (name === "department") {

      this.setState({
          movement:{
              ...this.state.movement,
              workflowDetails:{
                ...this.state.movement.workflowDetails,
                department : e.target.value
              }
          }
      })

      // getCommonMasterById("hr-employee","employees", e.target.value, function(err, res) {
      //           if(res && res.Employee && res.Employee[0] && res.Employee[0].userName) {
      //             _this.setState({
      //               revaluationSet: {
      //                 ..._this.state.revaluationSet,
      //                 reevaluatedBy: res.Employee[0].userName
      //               }
      //             })
      //           }
      //         })

    }else if (name === "designation") {
      this.setState({
          movement:{
              ...this.state.movement,
              workflowDetails:{
                ...this.state.movement.workflowDetails,
                designation : e.target.value
              }
          }
      })

    }else if (name === "assignee") {
      this.setState({
          movement:{
              ...this.state.movement,
              workflowDetails:{
                ...this.state.movement.workflowDetails,
                assignee : e.target.value
              }
          }
      })

    }else {
      this.setState({
          movement:{
              ...this.state.movement,
              [name]:e.target.value
          }
      })
    }

  }

  close() {
      open(location, '_self').close();
  }

  render() {
    let {handleChange,addOrUpdate}=this;
    let _this = this;

    let {employeeId, typeOfMovement, currentAssignment, transferType, promotionBasis, remarks, reason, effectiveFrom, enquiryPassedDate, transferedLocation,
          departmentAssigned, designationAssigned, positionAssigned, fundAssigned, functionAssigned, employeeAcceptance, workflowDetails, tenantId} = this.state.movement
    let {isSearchClicked,employee,assignments_designation,assignments_department,assignments_position,accepted}=this.state;

    const renderOption=function(list) {
        if(list)
        {
            return list.map((item, ind)=>
            {
                return (<option key={ind} value={typeof item == "object" ? item.id : item}>
                        {typeof item == "object" ? item.name : item}
                  </option>)
            })
        }
    }

    const renderOptionForDesc=function(list) {
        if(list)
        {
            return list.map((item, ind)=>
            {
                return (<option key={ind} value={typeof item == "object" ? item.id : item}>
                        {typeof item == "object" ? item.description : item}
                  </option>)
            })
        }
    }
    const renderOptionForUser=function(list) {
        if(list)
        {
            return list.map((item, ind)=>
            {
              var positionId;
              item.assignments.forEach(function(item) {
                                  if(item.isPrimary)
                                  {
                                    positionId = item.position;
                                  }
                              });

                return (<option key={ind} value={positionId}>
                        {item.name}
                  </option>)
            })
        }
    }










    return (
      <div>
        <form onSubmit={(e)=> {addOrUpdate(e)}}>
        <div className="form-section">
            <div className="row">
              <div className="col-md-8 col-sm-8">
                <h3 className="categoryType">Employee Details </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                  <div className="row">
                      <div className="col-sm-6 label-text">
                        <label htmlFor="code">Employee Code  </label>
                      </div>
                      <div className="col-sm-6">
                          <input type="text" name="code" id="code" value={employee.code}
                          onChange={(e)=>{handleChange(e,"employee","code")}} disabled/>
                      </div>
                  </div>
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-6 label-text">
                          <label htmlFor=""> Employee Name  </label>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" name="name" id="name" value= {employee.name}
                                onChange={(e)=>{handleChange(e,"employee","name")}} disabled/>
                        </div>
                    </div>
                  </div>
            </div>
          <div className="row">
            <div className="col-sm-6">
                <div className="row">
                    <div className="col-sm-6 label-text">
                      <label htmlFor="">Department  </label>
                    </div>
                    <div className="col-sm-6">
                      <div className="styled-select">
                        <select name="departmentId" value={employee.departmentId}
                          onChange={(e)=>{  handleChange(e,"employee","departmentId")}} disabled>
                          <option value="">Select department</option>
                          {renderOption(this.state.departmentList)}
                       </select>
                       </div>
                    </div>
                </div>
              </div>
              <div className="col-sm-6">
                  <div className="row">
                      <div className="col-sm-6 label-text">
                        <label htmlFor="">Designation  </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="styled-select">
                            <select name="designationId" value={employee.designationId}
                              onChange={(e)=>{ handleChange(e,"employee","designationId")}} disabled>
                            <option value="">Select Designation</option>
                            {renderOption(this.state.designationList)}
                           </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-sm-6">
                  <div className="row">
                      <div className="col-sm-6 label-text">
                        <label htmlFor="">Position  </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="styled-select">
                            <select name="positionId" value={employee.positionId}
                              onChange={(e)=>{ handleChange(e,"employeeid","positionId")}} disabled>
                            <option value="">Select Position</option>
                            {renderOption(this.state.positionList)}
                           </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div className="form-section">
                <div className="row">
                  <div className="col-md-8 col-sm-8">
                    <h3 className="categoryType">Promotion Details </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                      <div className="row">
                          <div className="col-sm-6 label-text">
                            <label htmlFor="">Department <span>*</span></label>
                          </div>
                          <div className="col-sm-6">
                            <div className="styled-select">
                              <select id="department" name="departmentAssigned" value={departmentAssigned}
                                onChange={(e)=>{  handleChange(e,"departmentAssigned")}}required>
                                <option value="">Select department</option>
                                {renderOption(this.state.departmentList)}
                             </select>
                             </div>
                          </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-6 label-text">
                              <label htmlFor="">Designation <span>*</span></label>
                            </div>
                            <div className="col-sm-6">
                              <div className="styled-select">
                                  <select id="designation" name="designationAssigned" value={designationAssigned}
                                      onChange={(e)=>{handleChange(e,"designationAssigned")}} required>
                                  <option value="">Select Designation</option>
                                  {renderOption(this.state.designationList)}
                                 </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-6 label-text">
                              <label htmlFor="">Promotion effective from<span>*</span></label>
                            </div>
                            <div className="col-sm-6">
                            <div className="text-no-ui">
                            <span><i className="glyphicon glyphicon-calendar"></i></span>
                            <input type="text" id="effectiveFrom" name="effectiveFrom" value="effectiveFrom" value={effectiveFrom}
                            onChange={(e)=>{handleChange(e,"effectiveFrom")}} required/>

                            </div>
                        </div>
                      </div>
                  </div>
                  <div className="col-sm-6">
                      <div className="row">
                          <div className="col-sm-6 label-text">
                            <label htmlFor="">Position name<span>*</span></label>
                          </div>
                          <div className="col-sm-6">
                          <div className="styled-select">
                            <select id="positionAssigned" name="positionAssigned" value={positionAssigned}
                            onChange={(e)=>{handleChange(e,"positionAssigned")}} required>
                              <option value="">Select Promotion Position</option>
                              {renderOption(this.state.pNameList)}
                           </select>
                           </div>
                        </div>
                      </div>
                    </div>
                </div>
            <div className="row">
              <div className="col-sm-6">
                  <div className="row">
                      <div className="col-sm-6 label-text">
                        <label htmlFor="">Enquiry passed Date</label>
                      </div>
                      <div className="col-sm-6">
                      <div className="text-no-ui">
                      <span><i className="glyphicon glyphicon-calendar"></i></span>
                      <input type="text" id="enquiryPassedDate" name="enquiryPassedDate" value="enquiryPassedDate" value={enquiryPassedDate}
                      onChange={(e)=>{handleChange(e,"enquiryPassedDate")}} />

                      </div>
                  </div>
                </div>
            </div>
              <div className="col-sm-6">
                  <div className="row">
                      <div className="col-sm-6 label-text">
                        <label htmlFor="">Promotion Basis<span>*</span></label>
                      </div>
                      <div className="col-sm-6">
                        <div className="styled-select">
                          <select id="promotionBasis" name="promotionBasis" value={promotionBasis.id}
                          onChange={(e)=>{handleChange(e,"promotionBasis")}} required>
                            <option value="">Select Promotion Basis</option>
                            {renderOptionForDesc(this.state.promotionList)}
                         </select>
                         </div>
                      </div>
                  </div>
                </div>
                </div>
                  <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-6 label-text">
                              <label htmlFor="">Fund</label>
                            </div>
                            <div className="col-sm-6">
                              <div className="styled-select">
                                <select id="fundAssigned" name="fundAssigned" value={fundAssigned}
                                    onChange={(e)=>{handleChange(e,"fundAssigned")}}>
                                  <option value="">Select Fund</option>
                                  {renderOption(this.state.fundList)}
                               </select>
                               </div>
                            </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                          <div className="row">
                              <div className="col-sm-6 label-text">
                                <label htmlFor="">Function</label>
                              </div>
                              <div className="col-sm-6">
                                <div className="styled-select">
                                    <select id="functionAssigned" name="functionAssigned" value={functionAssigned}
                                      onChange={(e)=>{  handleChange(e,"functionAssigned") }}>
                                    <option value="">Select functionary</option>
                                    {renderOption(this.state.functionaryList)}
                                   </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


              <div className="row">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-6 label-text">
                            <label htmlFor="remark">Remark <span>*</span></label>
                        </div>
                        <div className="col-sm-6">
                        <textarea rows="4" cols="50" id="remarks" name="remarks" value={remarks}
                        onChange={(e)=>{handleChange(e,"remarks")}}required></textarea>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-6 label-text">
                            <label htmlFor="documents">Attachments docs<span>*</span></label>
                        </div>
                        <div className="col-sm-6">
                            <div className="styled-file">
                            <input id="documents" name="documents" type="file" required multiple/>
                           </div>
                        </div>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-6 label-text">
                          <label htmlFor="">Promotion Accepted by Employee Y/N</label>
                        </div>
                        <div className="col-sm-6">
                          <div className="styled-select">
                              <select id="employeeAcceptance" name="employeeAcceptance" value={employeeAcceptance}
                                onChange={(e)=>{  handleChange(e,"employeeAcceptance") }}>
                              <option value="">Select Promotion</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                             </select>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>

          <br/>
          <div className="form-section">
              <div className="row">
                <div className="col-md-8 col-sm-8">
                  <h3 className="categoryType">Workflow Details </h3>
                </div>
              </div>
          <div className="row">
            <div className="col-sm-6">
                <div className="row">
                    <div className="col-sm-6 label-text">
                      <label htmlFor="">Department <span>*</span></label>
                    </div>
                    <div className="col-sm-6">
                      <div className="styled-select">
                          <select id="department" name="department" value={workflowDetails.department}
                               onChange={(e)=>{  handleChange(e,"department") }}>
                               <option value="">Select Department</option>
                               {renderOption(this.state.departmentList)}
                          </select>
                       </div>
                    </div>
                </div>
              </div>
              <div className="col-sm-6">
                  <div className="row">
                      <div className="col-sm-6 label-text">
                        <label htmlFor="">Designation <span>*</span></label>
                      </div>
                      <div className="col-sm-6">
                        <div className="styled-select">
                            <select id="designation" name="designation" value={workflowDetails.designation}
                                onChange={(e)=>{  handleChange(e,"designation") }}>
                                <option value="">Select Designation</option>
                                {renderOption(this.state.designationList)}//TODO: get designation based on departments
                           </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-6 label-text">
                          <label htmlFor="">User Name <span>*</span></label>
                        </div>
                        <div className="col-sm-6">
                          <div className="styled-select">
                            <select id="assignee" name="assignee" value={workflowDetails.assignee}
                              onChange={(e)=>{  handleChange(e,"assignee") }}required>
                              <option value="">Select User</option>
                              {renderOptionForUser(this.state.userList)}
                           </select>
                           </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>






          <br/>
            <div className="text-center">
              <button id="sub" type="submit"  className="btn btn-submit">Create</button>&nbsp;&nbsp;
              <button type="button" className="btn btn-close" onClick={(e)=>{this.close()}}>Close</button>
            </div>
          </form>
      </div>
    );
  }
}






ReactDOM.render(
  <EmployeePromotion />,
  document.getElementById('root')
);