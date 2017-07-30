package org.egov.egf.master.web.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.egov.common.domain.model.Pagination;
import org.egov.common.utils.RequestJsonReader;
import org.egov.egf.master.TestConfiguration;
import org.egov.egf.master.domain.model.Bank;
import org.egov.egf.master.domain.model.BankBranch;
import org.egov.egf.master.domain.model.BankBranchSearch;
import org.egov.egf.master.domain.service.BankBranchService;
import org.egov.egf.master.web.requests.BankBranchRequest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.validation.BindingResult;

@RunWith(SpringRunner.class)
@WebMvcTest(BankBranchController.class)
@Import(TestConfiguration.class)
public class BankBranchControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BankBranchService bankBranchService;

    private RequestJsonReader resources = new RequestJsonReader();

    @Captor
    private ArgumentCaptor<BankBranchRequest> captor;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void testCreate() throws IOException, Exception {
        when(bankBranchService.add(any(List.class), any(BindingResult.class))).thenReturn((getBankBranches()));

        mockMvc.perform(
                post("/bankbranches/_create").content(resources.readRequest("bankbranch/bankBranchContractCreateRequest.json"))
                        .contentType(MediaType.APPLICATION_JSON_UTF8)).andExpect(status().is(201))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().json(resources.readResponse("bankbranch/bankBranchContractCreateResponse.json")));

        verify(bankBranchService).addToQue(captor.capture());

        final BankBranchRequest actualRequest = captor.getValue();
        assertEquals("1", actualRequest.getBankBranches().get(0).getBank().getId());
        assertEquals("name", actualRequest.getBankBranches().get(0).getName());
        assertEquals("code", actualRequest.getBankBranches().get(0).getCode());
        assertEquals("Bangalore", actualRequest.getBankBranches().get(0).getDescription());
        assertEquals("default", actualRequest.getBankBranches().get(0).getTenantId());
        assertEquals(true, actualRequest.getBankBranches().get(0).getActive());
    }

    @Test
    public void testUpdate() throws IOException, Exception {
        when(bankBranchService.update(any(List.class), any(BindingResult.class))).thenReturn((getUpdatedBankBranches()));

        mockMvc.perform(
                post("/bankbranches/_update").content(resources.readRequest("bankbranch/bankBranchContractUpdateRequest.json"))
                        .contentType(MediaType.APPLICATION_JSON_UTF8)).andExpect(status().is(201))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().json(resources.readResponse("bankbranch/bankBranchContractUpdateResponse.json")));

        verify(bankBranchService).addToQue(captor.capture());

        final BankBranchRequest actualRequest = captor.getValue();
        assertEquals("1", actualRequest.getBankBranches().get(0).getBank().getId());
        assertEquals("nameupdate", actualRequest.getBankBranches().get(0).getName());
        assertEquals("codeupdate", actualRequest.getBankBranches().get(0).getCode());
        assertEquals("Bangalore", actualRequest.getBankBranches().get(0).getDescription());
        assertEquals("default", actualRequest.getBankBranches().get(0).getTenantId());
        assertEquals(true, actualRequest.getBankBranches().get(0).getActive());
    }

    @Test
    public void testSearch() throws IOException, Exception {
        Pagination<BankBranch> page = new Pagination<>();
        page.setTotalPages(1);
        page.setTotalResults(1);
        page.setCurrentPage(0);
        page.setOffset(0);
        page.setPageSize(0);
        page.setPagedData(getBankBranches());
        page.getPagedData().get(0).setId("1");

        when(bankBranchService.search(any(BankBranchSearch.class))).thenReturn(page);

        mockMvc.perform(
                post("/bankbranches/_search").content(resources.getRequestInfo()).contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().is(200)).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().json(resources.readResponse("bankbranch/bankBranchContractSearchResponse.json")));
    }

    @Test
    public void testCreate_Error() throws IOException, Exception {

            when(bankBranchService.add(any(List.class), any(BindingResult.class))).thenReturn((getBankBranches()));

            mockMvc.perform(post("/bankbranches/_create").content(resources.readRequest("bankbranch/bankbranch_create_invalid_field_value.json"))
                                            .contentType(MediaType.APPLICATION_JSON_UTF8))
                            .andExpect(status().is5xxServerError());

    }
    
    private List<BankBranch> getBankBranches() {
        List<BankBranch> bankBranches = new ArrayList<BankBranch>();
        Bank bank = Bank.builder().id("1").build();
        BankBranch bankBranch = BankBranch.builder().bank(bank).code("code").name("name").address("Bangalore")
                .address2("Bangalore").city("Bangalore").state("Bangalore").pincode("Bangalore").phone("Bangalore")
                .fax("Bangalore").contactPerson("Bangalore").active(true).description("Bangalore").micr("Bangalore").build();
        bankBranch.setTenantId("default");
        bankBranches.add(bankBranch);
        return bankBranches;
    }

    private List<BankBranch> getUpdatedBankBranches() {
        List<BankBranch> bankBranches = new ArrayList<BankBranch>();
        Bank bank = Bank.builder().id("1").build();
        BankBranch bankBranch = BankBranch.builder().bank(bank).code("codeupdate").name("nameupdate").address("Bangalore")
                .address2("Bangalore").city("Bangalore").state("Bangalore").pincode("Bangalore").phone("Bangalore")
                .fax("Bangalore").contactPerson("Bangalore").active(true).description("Bangalore").micr("Bangalore").build();
        bankBranch.setTenantId("default");
        bankBranches.add(bankBranch);
        return bankBranches;
    }
}