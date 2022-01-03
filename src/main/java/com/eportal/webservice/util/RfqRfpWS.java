/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.webservice.util;

import com.eportal.entities.BuyerContractRfqLineItemBean;
import com.eportal.entities.BuyerDashboardPrStatusChartBean;
import com.eportal.entities.BuyerDashboardRfqStatusBean;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPurchaseGroupMapping;
import com.eportal.entities.BuyerRfqLineItemBean;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.EditAmendPoRfqLineBean;
import com.eportal.entities.FinalizedRfq;
import com.eportal.entities.MasterCountry;
import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterMaterialGroup;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.RfqHeaderVendorMapping;
import com.eportal.entities.RfqPoDetails;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierHeaderRatedParameterMapping;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.TlContractLinesBean;
import com.eportal.entities.TlPrLineItemsBean;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.VendorGroup;
import com.eportal.entities.VendorGroupMapping;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.newgenControl.RfqQuotationRfqEvaluationInputBean;
import com.eportal.newgenControl.RfqQuotationRfqEvaluationOutputBean;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@Component
public class RfqRfpWS {
    
    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    
    public List<WorkOrderRfqLineItem> findWorkOrderByRfqIdAnsStatusNot(int rfqid, String status) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("rfqid in getPridByRfqid :" + rfqid);
        String url = webservice_ip + "/BuyerPortalWebServices/findWorkOrderByRfqIdAnsStatusNot.do?rfqid=" + rfqid + "&status=" + status;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {});
        List<WorkOrderRfqLineItem> lineItemList = response.getBody();
        return lineItemList;
    }
    public List<FinalizedRfq> findFinalizedRfqByPoNumber(String poNumber) {
        System.out.println("findFinalizedRfqByPoNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findFinalizedRfqByPoNumber.do?poNumber=" + poNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<FinalizedRfq>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<FinalizedRfq>>() {});
        List<FinalizedRfq> list = response.getBody();
        return list;
    }
    public List<FinalizedRfq> findFinalizedRfqByPoNumberAndPrNumberAndPrItemNumber(String poNumber, String prNumber, String prItemNumber) {
        System.out.println("findFinalizedRfqByPoNumberAndPrNumberAndPrItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findFinalizedRfqByPoNumberAndPrNumberAndPrItemNumber.do?poNumber=" + poNumber + "&prNumber=" + prNumber + "&prItemNumber=" + prItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<FinalizedRfq>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<FinalizedRfq>>() {});
        List<FinalizedRfq> list = response.getBody();
        return list;
    }
    public List<MasterCountry> getAllMasterCountry() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmastercountry.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCountry>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCountry>>() {
        });
        List<MasterCountry> list = response.getBody();
        System.out.println("MasterReferenceItem size: " + list.size());
        return list;
    }
    public List<MasterCountry> findMasterCountryByCountryName(String countryName) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterCountryByCountryName.do?countryName=" + countryName;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCountry>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCountry>>() {
        });
        List<MasterCountry> list = response.getBody();
        System.out.println("MasterReferenceItem size: " + list.size());
        return list;
    }
    public List<FinalizedRfq> findByPrNumberAndPrItemNumberAndIsPoCreated(String prNumber, String prItemNumber, String isPoCreated) {
        System.out.println("findByPrNumberAndPrItemNumberAndIsPoCreated");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByPrNumberAndPrItemNumberAndIsPoCreated.do?prNumber=" + prNumber + "&prItemNumber=" + prItemNumber + "&isPoCreated=" + isPoCreated;
        System.out.println("url: " + url);
        ResponseEntity<List<FinalizedRfq>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<FinalizedRfq>>() {});
        List<FinalizedRfq> list = response.getBody();
        return list;
    }
    public List<MasterVendor> findMasterVendorByBpIsMappedNot(String bpIsMapped) {
        System.out.println("bpIsMapped: " + bpIsMapped);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterVendorByBpIsMappedNot.do?bpIsMapped=" + bpIsMapped;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {});
        List<MasterVendor> vendor = response.getBody();
        return vendor;
    }
    public List<MasterVendor> findMasterVendorByVendorSubstringAndIsMappedNot(String vendorNameCodeSubstring, String bpIsMapped) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterVendorByVendorSubstringAndIsMappedNot.do?vendorNameCodeSubstring=" + vendorNameCodeSubstring + "&bpIsMapped=" + bpIsMapped;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {});
        List<MasterVendor> vendor = response.getBody();
        return vendor;
    }
    public FinalizedRfq getFinalizedRfqById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getFinalizedRfqById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<FinalizedRfq> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<FinalizedRfq>() {});
        FinalizedRfq obj = response.getBody();
        return obj;
    }
    public String updateFinalizedRfq(FinalizedRfq rfq) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateFinalizedRfq.do"), rfq, String.class);
        System.out.println("updateFinalizedRfq : " + msg);
        return msg;
    }
    public String saveSupplierHeaderRatedParameterMapping(SupplierHeaderRatedParameterMapping obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveSupplierHeaderRatedParameterMapping.do"), obj, String.class);
        System.out.println("saveSupplierHeaderRatedParameterMapping id: " + id);
        return id;
    }
    public VendorDetails findVendorById(int vendorid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyid.do?vendorid=" + vendorid;
        System.out.println("url: " + url);
        ResponseEntity<VendorDetails> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<VendorDetails>() {});
        VendorDetails vendor = response.getBody();
        return vendor;
    }
    public WorkOrderRfqHeader findRfqHeaderById(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<WorkOrderRfqHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqHeader>() {});
        WorkOrderRfqHeader rfqHeaderObj = prResponse.getBody();
        return rfqHeaderObj;
    }
    public List<SupplierHeader> findSupplierHeaderByVendoridAndRfqIdAndStatus(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSupplierHeaderByVendoridAndRfqIdAndStatus.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {});
        List<SupplierHeader> list = (List<SupplierHeader>) response.getBody();
        return list;
    }
    public List<SupplierLineitem> findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus(int supplierHeaderId, int insertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus.do?id=" + supplierHeaderId + "&insertionOrderId=" + insertionOrderId;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierLineitem>> supplierHeaderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {});
        List<SupplierLineitem> list = (List<SupplierLineitem>) supplierHeaderResponse.getBody();
        return list;
    }
    public SupplierHeaderRatedParameterMapping getSupplierHeaderRatedParameterMappingById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSupplierHeaderRatedParameterMappingById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<SupplierHeaderRatedParameterMapping> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<SupplierHeaderRatedParameterMapping>() {});
        SupplierHeaderRatedParameterMapping obj = response.getBody();
        return obj;
    }
    public String updateSupplierHeaderRatedParameterMapping(SupplierHeaderRatedParameterMapping obj) {
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateSupplierHeaderRatedParameterMapping.do"), obj, String.class);
        System.out.println("saveSupplierHeaderRatedParameterMapping result: " + result);
        return result;
    }
    public List<SupplierHeaderRatedParameterMapping> findSupplierHeaderRatedParameterMappingByRfqId(int rfqId) {
        System.out.println("rfqId: " + rfqId);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierHeaderRatedParameterMappingByRfqId.do?rfqId=" + rfqId;
        System.out.println("url: " + url);
        ResponseEntity<List<SupplierHeaderRatedParameterMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeaderRatedParameterMapping>>() {});
        List<SupplierHeaderRatedParameterMapping> mappingList = response.getBody();
        return mappingList;
    }
    public List<BuyerRfqLineItemBean> callBuyerRfqPrLineItemStoredProcedure(int rfqid) {
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerRfqPrLineItemStoredProcedure.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<BuyerRfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerRfqLineItemBean>>() {});
        List<BuyerRfqLineItemBean> list = response.getBody();
        return list;
    }
    
     public List<BuyerContractRfqLineItemBean> callBuyerRfqContractLineItemStoredProcedure(int rfqid) {
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerRfqContractLineItemStoredProcedure.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<BuyerContractRfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerContractRfqLineItemBean>>() {});
        List<BuyerContractRfqLineItemBean> list = response.getBody();
        return list;
    }
    
    
    public List<VendorDetails> findByStatusAndType(String status, String type) {
        String url = webservice_ip + "/BuyerPortalWebServices/findbystatusandtype.do?status=" + status + "&type=" + type;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {});
        List<VendorDetails> vendorList = restGroupResponse.getBody();
        return vendorList;
    }
    public List<BuyerDashboardRfqStatusBean> callBuyerDashRfqStatusStoredProcedure(int days, String initiatorId, String currentWorkstep) {
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerDashRfqStatusStoredProcedure.do?days=" + days + "&initiatorId=" + initiatorId + "&currentWorkstep=" + currentWorkstep;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<BuyerDashboardRfqStatusBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDashboardRfqStatusBean>>() {});
        List<BuyerDashboardRfqStatusBean> list = response.getBody();
        return list;
    }
    public List<BuyerDetails> findAllBuyerExceptTeamLead() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findallexceptteamlead.do";
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {});
        List<BuyerDetails> list = response.getBody();
        return list;
    }
    public String saveProspect(VendorDetails prospect) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/vendordetailsservice.do";
        String id = restTemplate.postForObject(URI.create(url), prospect, String.class);
        return id;
    }
    public List<VendorGroupMapping> findVendorGroupMappingByVendorIdAndGroupId(int vendorId, int groupId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findVendorGroupMappingByVendorIdAndGroupId.do?vendorId=" + vendorId + "&groupId=" + groupId;
        System.out.println("url: " + url);
        ResponseEntity<List<VendorGroupMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorGroupMapping>>() {});
        List<VendorGroupMapping> list = response.getBody();
        return list;
    }
    public String deleteVendorGroupMapping(VendorGroupMapping mapping) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteVendorGroupMapping.do";
        String id = restTemplate.postForObject(URI.create(url), mapping, String.class);
        return id;
    }
    public String saveBuyerAuditLogReport(ReportBuyerAuditLog log) {
        String url = webservice_ip + "/BuyerPortalWebServices/saveBuyerAuditLogReport.do";
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), log, String.class);
        return msg;
    }
    public String saveVendorGroupMapping(VendorGroupMapping vendorgroupmapping) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/savevendorgroupmapping.do";
        System.out.println("url: " + url);
        String mappingid = restTemplate.postForObject(URI.create(url), vendorgroupmapping, String.class);
        return mappingid;
    }
    public VendorGroup findVendorGroupById(int groupid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findvendorgroupbyid.do?groupid=" + groupid;
        System.out.println("url: " + url);
        ResponseEntity<VendorGroup> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<VendorGroup>() {});
        VendorGroup vendorgroup = response.getBody();
        return vendorgroup;
    }
    public List<VendorDetails> findByMultipleVendorId(String vendorids) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findbymultiplevendorid.do?ids=" + vendorids;
        System.out.println("url: " + url);
        ResponseEntity<List<VendorDetails>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {});
        List<VendorDetails> vendorList = prResponse.getBody();
        return vendorList;
    }
    public String saveVendorGroup(VendorGroup vendorgroup) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/savevendorgroup.do";
        System.out.println("url: " + url);
        String groupid = restTemplate.postForObject(URI.create(url), vendorgroup, String.class);
        return groupid;
    }
    public List<VendorGroup> getAllVendorGroup() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallvendorgroup.do";
        System.out.println("url: " + url);
        ResponseEntity<List<VendorGroup>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorGroup>>() {});
        List<VendorGroup> vendorGroupList = restGroupResponse.getBody();
        return vendorGroupList;
    }
    public List<WorkOrderRfqHeader> findRfqHeaderByRfqIdIn(String rfqIds) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRfqHeaderByRfqIdIn.do?rfqIds=" + rfqIds;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {});
        List<WorkOrderRfqHeader> rfqHeaderList = response.getBody();
        return rfqHeaderList;
    }
    public List<SupplierHeader> findSupplierHeaderByRfqIdInAndStatusIn(String rfqIds) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierHeaderByRfqIdInAndStatusIn.do?rfqIds=" + rfqIds;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {});
        List<SupplierHeader> list = (List<SupplierHeader>) response.getBody();
        return list;
    }
    public List<SupplierLineitem> findSupplierLineItemBySupplierHeaderId(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierlineitembysupplierheaderid.do?id=" + id;
        System.out.println("url:" + url);        
        ResponseEntity<List<SupplierLineitem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {});
        List<SupplierLineitem> supplierLineItemList = response.getBody();
        return supplierLineItemList;
    }
    
    public List<BuyerDashboardPrStatusChartBean> callBuyerDashboardPrStatusChartStoredProcedure(int buyerId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerDashboardPrStatusChartStoredProcedure.do?buyerId=" + buyerId;
        System.out.println("url:" + url);        
        ResponseEntity<List<BuyerDashboardPrStatusChartBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDashboardPrStatusChartBean>>() {});
        List<BuyerDashboardPrStatusChartBean> buyerDashboardRfqStatusBeanList = response.getBody();
        return buyerDashboardRfqStatusBeanList;
    }
 
    public List<WorkOrderRfqLineItem> findWorkOrderRfqLineItemByRfqIdIn(String rfqIds) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findWorkOrderRfqLineItemByRfqIdIn.do?rfqIds=" + rfqIds;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {});
        List<WorkOrderRfqLineItem> rfqLineItemList = prResponse.getBody();
        return rfqLineItemList;
    }
    
    public List<WorkOrderRfqLineItem> findWorkOrderLineItemByRfqId(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findworkorderlineitembyrfqid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {});
        List<WorkOrderRfqLineItem> list = response.getBody();
        return list;
    }
    
    public List<SupplierHeader> getSupplierHeaderByVendoridAndRfqIdAndStatus(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSupplierHeaderByVendoridAndRfqIdAndStatus.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {});
        List<SupplierHeader> list = (List<SupplierHeader>) response.getBody();
        return list;
    }
    
    public SupplierHeader getSupplierHeaderById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSupplierHeaderById.do?id=" + id;
        System.out.println("url:" + url);
        ResponseEntity<SupplierHeader> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<SupplierHeader>() {});
        SupplierHeader obj = response.getBody();
        return obj;
    }
    
    public SupplierLineitem findSupplierLineItemBySupplierLineId(int supplierlineid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierlineitembyrfqlineid.do?supplierlineid=" + supplierlineid;
        System.out.println("url: " + url);
        ResponseEntity<SupplierLineitem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<SupplierLineitem>() {});
        SupplierLineitem supplierLineItemObj = response.getBody();
        return supplierLineItemObj;
    }
    
    public String updateSupplierLineitem(SupplierLineitem lineItem) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateSupplierLineitem.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), lineItem, String.class);
        System.out.println("result: " + result);
        return result;
    }
    
    public WorkOrderRfqLineItem findWorkOrderLineItemByRfqLineId(int rfqlineid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findworkorderlineitembyrfqlineid.do?rfqlineid=" + rfqlineid;
        System.out.println("url: " + url);
        ResponseEntity<WorkOrderRfqLineItem> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqLineItem>() {});
        WorkOrderRfqLineItem rfqLineItem = buyerResponse.getBody();
        return rfqLineItem;
    }
    
    public String updateWorkOrderRfqLineItem(WorkOrderRfqLineItem obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheaderlineitem.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);
        return result;
    }
    
    public List<RfqHeaderVendorMapping> findRfqVendorMappingByRfqIdInAndStatusIn(String rfqIds) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRfqVendorMappingByRfqIdInAndStatusIn.do?rfqIds=" + rfqIds;
        System.out.println("url:" + url);
        ResponseEntity<List<RfqHeaderVendorMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RfqHeaderVendorMapping>>() {});
        List<RfqHeaderVendorMapping> list = (List<RfqHeaderVendorMapping>) response.getBody();
        return list;
    }
    
    public String saveRfqPoDetails(RfqPoDetails obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveRfqPoDetails.do"), obj, String.class);
        System.out.println("saveRfqPoDetails id: " + id);
        return id;
    }
    
    public String updateRfqHeader(WorkOrderRfqHeader obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheader.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);
        return result;
    }
    
    public List<MasterPurchasingGroup> findAllMasterPurchaseGroup() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findpurchasegroupfrommaster.do";
        ResponseEntity<List<MasterPurchasingGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchasingGroup>>() {});
        List<MasterPurchasingGroup> masterPurchasingGroupList = response.getBody();
        return masterPurchasingGroupList;
    }
    
    public String saveBuyerPurchaseGrougMapping(BuyerPurchaseGroupMapping mapping) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveBuyerPurchaseGrougMapping.do"), mapping, String.class);
        System.out.println("saveBuyerPurchaseGrougMapping id: " + id);
        return id;
    }
    
    public List<MasterPurchasingGroup> findMasterPurchasingGroupBySnoIn(String snoString) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterPurchasingGroupBySnoIn.do?snoString=" + snoString;
        System.out.println("url:" + url);
        ResponseEntity<List<MasterPurchasingGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchasingGroup>>() {});
        List<MasterPurchasingGroup> list = (List<MasterPurchasingGroup>) response.getBody();
        return list;
    }
    
    public List<MasterPurchasingGroup> findMasterPurchasingGroupByPurchasingGroupCodeIn(String purchasingGroupCodeString) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterPurchasingGroupByPurchasingGroupCodeIn.do?purchasingGroupCodeString=" + purchasingGroupCodeString;
        System.out.println("url:" + url);
        ResponseEntity<List<MasterPurchasingGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchasingGroup>>() {});
        List<MasterPurchasingGroup> list = (List<MasterPurchasingGroup>) response.getBody();
        return list;
    }
    
    public List<BuyerPurchaseGroupMapping> findBuyerPurchaseGroupMappingByBuyerId(int buyerId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findBuyerPurchaseGroupMappingByBuyerId.do?buyerId=" + buyerId;
        System.out.println("url:" + url);
        ResponseEntity<List<BuyerPurchaseGroupMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerPurchaseGroupMapping>>() {});
        List<BuyerPurchaseGroupMapping> list = (List<BuyerPurchaseGroupMapping>) response.getBody();
        return list;
    }
    
    public String deleteAllBuyerPurchaseGroupMapping(List<BuyerPurchaseGroupMapping> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllBuyerPurchaseGroupMapping.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }
    
    public List<WorkOrderRfqHeader> findRfqHeaderByPrType(String prType) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRfqHeaderByPrType.do?prType=" + prType;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {});
        List<WorkOrderRfqHeader> rfqHeaderList = response.getBody();
        return rfqHeaderList;
    }
    
    public List<WorkOrderRfqLineItem> findWorkOrderRfqLineItemByRfqStatus(String rfqStatus) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findWorkOrderRfqLineItemByRfqStatus.do?rfqStatus=" + rfqStatus;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {});
        List<WorkOrderRfqLineItem> list = response.getBody();
        return list;
    }
    
    public List<EditAmendPoRfqLineBean> callEditAmendPoRfqLineStoredProcedure(String vendorCode, int vendorId, String prType, int buyerId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callEditAmendPoRfqLineStoredProcedure.do?vendorCode=" + vendorCode + "&vendorId=" + vendorId + "&prType=" + prType + "&buyerId=" + buyerId;
        System.out.println("url: " + url);
        ResponseEntity<List<EditAmendPoRfqLineBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<EditAmendPoRfqLineBean>>() {});
        List<EditAmendPoRfqLineBean> list = response.getBody();
        return list;
    }
    
    public List<MasterVendor> findMasterVendorByVendorCode(String vendorcode) {
        System.out.println("vendorcode: " + vendorcode);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findmastervendorbyvendorcode.do?vendorcode=" + vendorcode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {});
        List<MasterVendor> vendor = response.getBody();
        return vendor;
    }
    
    public List<VendorDetails> findVendorByCode(String vendorcode) {
        System.out.println("vendorcode: " + vendorcode);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getvendorbycode.do?code=" + vendorcode;
        System.out.println("url: " + url);
        ResponseEntity<List<VendorDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {});
        List<VendorDetails> vendor = response.getBody();
        return vendor;
    }
    
    public NewgenPRLineItem findNewgenPRLineItemById(int insertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNewgenPRLineItemById.do?insertionOrderId=" + insertionOrderId;
        System.out.println("url: " + url);
        ResponseEntity<NewgenPRLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenPRLineItem>() {});
        NewgenPRLineItem prLine = response.getBody();
        return prLine;
    }
    
    public String updateNewgenPRLineItem(NewgenPRLineItem obj) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateNewgenPRLineItem.do"), obj, String.class);
        System.out.println("updateNewgenPRLineItem : " + msg);
        return msg;
    }
    
    public Double findLastFYAveragePriceByMatCodeOrMatGroup(String by, String data) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findLastFYAveragePriceByMatCodeOrMatGroup.do?by=" + by + "&data=" + data;
        System.out.println("url: " + url);
        ResponseEntity<Double> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Double>() {});
        Double prLine = response.getBody();
        return prLine;
    }
    
    public RfqQuotationRfqEvaluationOutputBean uploadRfqQuotationAndRfqEvaluationIntoDMS(RfqQuotationRfqEvaluationInputBean input) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PO/PO_RFQDoc";
        System.out.println("url: " + url);
        RfqQuotationRfqEvaluationOutputBean output = restTemplate.postForObject(URI.create(url), input, RfqQuotationRfqEvaluationOutputBean.class);
        System.out.println("Message 1: " + output.getMessage());
        return output;
    }
    
    public List<SupplierHeader> getSupplierHeaderByVendorId(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getsupplierheaderbyvendorid.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierHeader>> supplierHeaderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {});
        List<SupplierHeader> supplierHeaderObj = (List<SupplierHeader>) supplierHeaderResponse.getBody();
        return supplierHeaderObj;
    }
    
    public List<WorkOrderRfqHeader> findRfqHeaderByRfqNumber(String rfqNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRfqHeaderByRfqNumber.do?rfqNumber=" + rfqNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {});
        List<WorkOrderRfqHeader> rfqHeaderList = response.getBody();
        return rfqHeaderList;
    }
    
    public List<WorkOrderRfqLineItem> findWorkOrderRfqLineItemByRfqIdAndItemNumber(int rfqid, String itemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findWorkOrderRfqLineItemByRfqIdAndItemNumber.do?rfqid=" + rfqid + "&itemNumber=" + itemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {});
        List<WorkOrderRfqLineItem> list = response.getBody();
        return list;
    }
    
    public List<WorkOrderRfqHeader> findRfqHeaderByBuyerIdIn(String buyerIds) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRfqHeaderByBuyerIdIn.do?buyerIds=" + buyerIds;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {});
        List<WorkOrderRfqHeader> rfqHeaderList = response.getBody();
        return rfqHeaderList;
    }
    
    public List<TlPrLineItemsBean> callTlPrLineItemsStoredProcedureByPRType(String status, String currentWorkstep, String companyCode, String buyerId, String prType, String tlUsername) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlPrLineItemsStoredProcedureByPRType.do?status=" + status + "&currentWorkstep=" + currentWorkstep + "&companyCode=" + companyCode + "&buyerId=" + buyerId + "&prType=" + prType + "&tlUsername=" + tlUsername;
        System.out.println("url: " + url);
        ResponseEntity<List<TlPrLineItemsBean>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlPrLineItemsBean>>() {});
        List<TlPrLineItemsBean> list = prResponse.getBody();
        return list;
    }
    
    public List<TlContractLinesBean> callTlContractLineStoredProcedure(String status, String buyerId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlContractLineStoredProcedure.do?buyerId=" + buyerId + "&status=" + status;
        System.out.println("callTlContractLineStoredProcedure url" + url);
        ResponseEntity<List<TlContractLinesBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlContractLinesBean>>() {});
        List<TlContractLinesBean> list = response.getBody();
        return list;
    }
    
    public List<ContractRfqHeader> getContractRfqHeaders() {
        System.out.println("inside getContractRfqHeaders");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getContractRfqHeaders.do";
        System.out.println("url getContractRfqHeaders" + url);
        ResponseEntity<List<ContractRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {});
        List<ContractRfqHeader> list = response.getBody();
        return list;
    }
    
    public List<String> findDistinctPRNumber() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findDistinctPRNumber.do";
        System.out.println("url: " + url);
        ResponseEntity<List<String>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {});
        List<String> list = prResponse.getBody();
        return list;
    }
    
    public List<MasterDepartment> findMaterDepartment() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaterDepartment.do";
        ResponseEntity<List<MasterDepartment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDepartment>>() {});
        List<MasterDepartment> list = response.getBody();
        return list;
    }

    public List<MasterMaterialGroup> findMasterMaterialGroup() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterMaterialGroup.do";
        ResponseEntity<List<MasterMaterialGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGroup>>() {});
        List<MasterMaterialGroup> list = response.getBody();
        return list;
    }
    
    public List<TlPrLineItemsBean> callTlPrLineItemsStoredProcedure(String status, String currentWorkstep, String companyCode, String buyerId, String prType, String tlUsername) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlPrLineItemsStoredProcedure.do?status=" + status + "&currentWorkstep=" + currentWorkstep + "&companyCode=" + companyCode + "&buyerId=" + buyerId + "&prType=" + prType + "&tlUsername=" + tlUsername;
        System.out.println("url: " + url);
        ResponseEntity<List<TlPrLineItemsBean>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlPrLineItemsBean>>() {});
        List<TlPrLineItemsBean> list = prResponse.getBody();
        return list;
    }
}
