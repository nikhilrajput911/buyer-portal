/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.BuyerDetails;
import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.NGExtPRToPO;
import com.eportal.entities.OpenRfqReportBean;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.webservice.util.RfqRfpWS;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@Controller
public class ReportManagement {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Autowired
    RfqRfpWS rfqRfpUtilWS;

    @RequestMapping(value = "/reports")
    public String report(ModelMap model) {
        System.out.println("reports");

        List<BuyerDetails> buyerList = findActiveBuyer();
        List<WorkOrderRfqHeader> rfqList = findRfqByStatus("Pending");
        List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
        List<MasterDepartment> masterDepartmentlist = findMaterDepartment();
        List<NGExtPRToPO> prList =  findNGExtPRToPOList();
        List<BuyerDetails> teamLeadIdList = findAllTeamLead();
        List<BuyerDetails> buyerIdList = rfqRfpUtilWS.findAllBuyerExceptTeamLead();

        model.put("buyerList", buyerList);
        model.put("rfqList", rfqList);
        model.put("masterPurchasingGroupList", masterPurchasingGroupList);
        model.put("masterDepartmentlist", masterDepartmentlist);
        model.put("prList", prList);
        model.put("teamLeadIdList", teamLeadIdList);
        model.put("buyerIdList", buyerIdList);

        return "reports";
    }
    
    @RequestMapping(value = "/contractreports")
    public String creport(ModelMap model)
    {
        List<BuyerDetails> buyerList = findActiveBuyer();
         model.put("buyerList", buyerList);
         
        List<BuyerDetails> teamLeadIdList = findAllTeamLead(); 
        model.put("teamLeadIdList", teamLeadIdList);
        
        List<BuyerDetails> buyerIdList = rfqRfpUtilWS.findAllBuyerExceptTeamLead();
        model.put("buyerIdList", buyerIdList);
        
        List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
        model.put("masterPurchasingGroupList", masterPurchasingGroupList);
        
        System.out.println("Contractreports");
        return "contractreports";
    }
    

    public List<BuyerDetails> findActiveBuyer() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<BuyerDetails>> restGroupResponse = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/getallbuyers.do",
                HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
                });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<BuyerDetails> buyerList = restGroupResponse.getBody();
        return buyerList;
    }

    public List<WorkOrderRfqHeader> findRfqByStatus(String status) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<WorkOrderRfqHeader>> response = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/findRfqByStatus.do?status=" + status,
                HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
                });

        System.out.println("response: " + response);
        List<WorkOrderRfqHeader> list = response.getBody();
        return list;
    }

    public List<OpenRfqReportBean> callOpenRfqReportStoredProcedure() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<OpenRfqReportBean>> response = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/callOpenRfqReportStoredProcedure.do?status=",
                HttpMethod.GET, null, new ParameterizedTypeReference<List<OpenRfqReportBean>>() {
                });

        System.out.println("response: " + response);
        List<OpenRfqReportBean> list = response.getBody();
        return list;
    }

    public List<MasterPurchasingGroup> findAllMasterPurchaseGroup() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findpurchasegroupfrommaster.do";
        ResponseEntity<List<MasterPurchasingGroup>> vendor = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchasingGroup>>() {
        });
        System.out.println("vendor: " + vendor);
        List<MasterPurchasingGroup> masterPurchasingGroupList = vendor.getBody();
        return masterPurchasingGroupList;
    }

    public List<MasterDepartment> findMaterDepartment() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaterDepartment.do";
        ResponseEntity<List<MasterDepartment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDepartment>>() {
        });
        List<MasterDepartment> list = response.getBody();
        return list;
    }
    public List<NGExtPRToPO> findNGExtPRToPOList() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGExtPRToPOList.do";
        ResponseEntity<List<NGExtPRToPO>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPRToPO>>() {});
        List<NGExtPRToPO> list = response.getBody();
        return list;
    }
    List<BuyerDetails> findAllTeamLead() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findallteamlead.do";
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {});
        List<BuyerDetails> buyerList = restGroupResponse.getBody();
        return buyerList;
    }
}
