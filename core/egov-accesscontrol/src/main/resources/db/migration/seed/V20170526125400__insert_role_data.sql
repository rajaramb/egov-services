insert into eg_ms_role (id,name,code,description,createddate,createdby,lastmodifiedby,lastmodifieddate,version)values
(nextval('SEQ_EG_MS_ROLE'),'Citizen','CITIZEN','Citizen who can raise complaint',now(),1,1,now(),0);
insert into eg_ms_role (id,name,code,description,createddate,createdby,lastmodifiedby,lastmodifieddate,version)values
(nextval('SEQ_EG_MS_ROLE'),'Employee','EMPLOYEE','Default role for all employees',now(),1,1,now(),0);
insert into eg_ms_role (id,name,code,description,createddate,createdby,lastmodifiedby,lastmodifieddate,version)values
(nextval('SEQ_EG_MS_ROLE'),'Super User','SUPERUSER','System Administrator. Can change all master data and has access to all the system screens.',now(),1,1,now(),0);
insert into eg_ms_role (id,name,code,description,createddate,createdby,lastmodifiedby,lastmodifieddate,version)values
(nextval('SEQ_EG_MS_ROLE'),'Grievance Officer','GO','Heads the grivance cell. Also all complaints that cannot be routed based on the rules are routed to Grievance Officer.',now(),1,1,now(),0);
insert into eg_ms_role (id,name,code,description,createddate,createdby,lastmodifiedby,lastmodifieddate,version)values
(nextval('SEQ_EG_MS_ROLE'),'Redressal Officer','RO','Employees that address citizens grievances.',now(),1,1,now(),0);
insert into eg_ms_role (id,name,code,description,createddate,createdby,lastmodifiedby,lastmodifieddate,version)values
(nextval('SEQ_EG_MS_ROLE'),'Grivance Administrator','GA','System Administator for PGR. Can change PGR Master data only.',now(),1,1,now(),0);
insert into eg_ms_role (id,name,code,description,createddate,createdby,lastmodifiedby,lastmodifieddate,version)values
(nextval('SEQ_EG_MS_ROLE'),'Grievance Routing Officer','GRO','Grievance Routing Officer',now(),1,1,now(),0);
