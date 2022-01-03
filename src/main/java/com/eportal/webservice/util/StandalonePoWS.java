/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.webservice.util;

import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterExchangeRate;
import com.eportal.entities.MasterPricingDescription;
import com.eportal.entities.MasterPricingProcedures;
import com.eportal.entities.MasterTaxCode;
import com.eportal.entities.NGBPCmplxPOCreationConditionControl;
import com.eportal.entities.NGBPCmplxPOCreationConfirmations;
import com.eportal.entities.NGBPCmplxPOCreationDelivery;
import com.eportal.entities.NGBPCmplxPOCreationDeliveryAddress;
import com.eportal.entities.NGBPCmplxPOCreationDelverySchedule;
import com.eportal.entities.NGBPCmplxPOCreationInvoice;
import com.eportal.entities.NGBPCmplxPOCreationLimits;
import com.eportal.entities.NGBPCmplxPOCreationLineItemComponent;
import com.eportal.entities.NGBPCmplxPOCreationLineItemConditions;
import com.eportal.entities.NGBPCmplxPOCreationLineItemCustomerData;
import com.eportal.entities.NGBPCmplxPOCreationLineItemMaterialTab;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPO;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
import com.eportal.entities.NGBPCmplxPOCreationLineItemProfitabilitySegment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemService;
import com.eportal.entities.NGBPCmplxPOCreationQuantitiesWeights;
import com.eportal.entities.NGBPCmplxPOCreationTexts;
import com.eportal.entities.NGBPExtPOCreation;
import com.eportal.entities.SchemaGroupPurOrgMapping;
import com.eportal.newgenControl.StandalonePoDocumentInputBean;
import com.eportal.newgenControl.StandalonePoDocumentOutputBean;
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
 * @author Sunny Kumar
 */
@Component
public class StandalonePoWS {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;

    public List<NGBPCmplxPOCreationInvoice> getInvoiceByLinkId(String linkid) {
        System.out.println("getInvoiceByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getInvoiceByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationInvoice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationInvoice>>() {
        });
        List<NGBPCmplxPOCreationInvoice> invoice = response.getBody();
        return invoice;
    }

    public String updateNGBPCmplxPOCreationInvoice(NGBPCmplxPOCreationInvoice invoiceObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationInvoice.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), invoiceObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationInvoice: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationLineItemPOAccountAssignment> getAccountAssignmentByLinkId(String linkid) {
        System.out.println("getAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getaccountassignmentbylinkid.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    public String updateNGBPCmplxPOCreationLineItemPOAccountAssignment(NGBPCmplxPOCreationLineItemPOAccountAssignment accountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemPOAccountAssignment.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), accountAssignment, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemPOAccountAssignment: " + msg);
        return msg;
    }

    public String saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues.do"), serviceAccountAssignment, String.class);
        System.out.println("NGBPCmplxPOCreationLineItemPOAccountAssignmentValues msg : " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationLineItemService> getServicesByLinkId(String linkid) {
        System.out.println("getServicesByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServicesByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemService>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemService>>() {
        });
        List<NGBPCmplxPOCreationLineItemService> accAsgn = response.getBody();
        return accAsgn;
    }

    public String updateNGBPCmplxPOCreationLineItemService(NGBPCmplxPOCreationLineItemService serviceObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemService.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), serviceObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemService: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationDelverySchedule> getDeliveryScheduleByLinkId(String linkid) {
        System.out.println("getDeliveryScheduleByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getDeliveryScheduleByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationDelverySchedule>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationDelverySchedule>>() {
        });
        List<NGBPCmplxPOCreationDelverySchedule> service = response.getBody();
        return service;
    }

    public String updateNGBPCmplxPOCreationDelverySchedule(NGBPCmplxPOCreationDelverySchedule deliveryObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationDelverySchedule.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), deliveryObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationDelverySchedule: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationLineItemConditions> getNGBPCmplxPOCreationConditionsByLinkId(String linkid) {
        System.out.println("getNGBPCmplxPOCreationConditionsByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationConditionsByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemConditions>>() {
        });
        List<NGBPCmplxPOCreationLineItemConditions> condition = response.getBody();
        return condition;
    }

    public String updateNGBPCmplxPOCreationLineItemConditions(NGBPCmplxPOCreationLineItemConditions conditionObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemConditions.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), conditionObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemConditions: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(String serviceLineItemNumber, String lineItemNumber, String PoId) {
        System.out.println("getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber + "&PoId=" + PoId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgn = response.getBody();
        return accAsgn;
    }

    public String deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgnList) {
        System.out.println("accAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues.do?accAsgnList=" + accAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accAsgnList, String.class);
        return result;
    }

    public NGBPExtPOCreation getNGBPExtPOCreationById(String id) {
        System.out.println("getNGBPExtPOCreationById");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPExtPOCreationById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<NGBPExtPOCreation> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NGBPExtPOCreation>() {
        });
        NGBPExtPOCreation ext = response.getBody();
        return ext;
    }

    public StandalonePoDocumentOutputBean uploadStandalonePoDocumentToDMS(StandalonePoDocumentInputBean input) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PO/SupportingDocPO";
        System.out.println("url: " + url);
        StandalonePoDocumentOutputBean output = restTemplate.postForObject(URI.create(url), input, StandalonePoDocumentOutputBean.class);
        return output;
    }

    public List<NGBPCmplxPOCreationLineItemConditions> getNGBPCmplxPOCreationLineItemConditionsByLinkIds(String linkIdArray) {
        System.out.println("getConditionsLineLevelByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemConditionsByLinkIds.do?linkIdArray=" + linkIdArray;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemConditions>>() {
        });
        List<NGBPCmplxPOCreationLineItemConditions> condition = response.getBody();
        return condition;
    }

    public List<NGBPCmplxPOCreationLineItemConditions> getSALineItemConditionByLinkIdAndConitionType(String LinkId, String conditionType) {
        System.out.println("getConditionByLinkIdAndConitionType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSALineItemConditionByLinkIdAndConitionType.do?LinkId=" + LinkId + "&conditionType=" + conditionType;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemConditions>>() {
        });
        List<NGBPCmplxPOCreationLineItemConditions> conditionObj = response.getBody();
        return conditionObj;
    }

    public List<MasterExchangeRate> findExchangeRateByFromCurrencyAndToCurrency(String fromCurrency, String toCurrency) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findExchangeRateByFromCurrencyAndToCurrency.do?fromCurrency=" + fromCurrency + "&toCurrency=" + toCurrency;
        System.out.println("url:" + url);
        ResponseEntity<List<MasterExchangeRate>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterExchangeRate>>() {
        });
        List<MasterExchangeRate> list = (List<MasterExchangeRate>) response.getBody();
        return list;
    }

    public String saveNGBPCmplxPOCreationLineItemConditions(NGBPCmplxPOCreationLineItemConditions conditions) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemConditions.do"), conditions, String.class);
        System.out.println("saveNGBPCmplxPOCreationLineItemConditions msg : " + msg);
        return msg;
    }

    public NGBPExtPOCreation getPoExtById(int extId) {
        System.out.println("getPoExtById");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getPoExtById.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<NGBPExtPOCreation> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NGBPExtPOCreation>() {
        });
        NGBPExtPOCreation conditionObj = response.getBody();
        return conditionObj;
    }

    public String updateNGBPCmplxPOCreationLimits(NGBPCmplxPOCreationLimits limitsObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLimits.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), limitsObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLimits: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationQuantitiesWeights> findNGBPCmplxPOCreationQuantitiesWeightsByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPOCreationQuantitiesWeightsByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationQuantitiesWeights>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationQuantitiesWeights>>() {
        });
        List<NGBPCmplxPOCreationQuantitiesWeights> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationQuantitiesWeights(NGBPCmplxPOCreationQuantitiesWeights weightsObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationQuantitiesWeights.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), weightsObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationQuantitiesWeights: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationTexts> findNGBPCmplxPOCreationTextsByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPOCreationTextsByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationTexts>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationTexts>>() {
        });
        List<NGBPCmplxPOCreationTexts> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationTexts(NGBPCmplxPOCreationTexts textsObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationTexts.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), textsObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationTexts: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationDeliveryAddress> findNGBPCmplxPOCreationDeliveryAddressByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPOCreationDeliveryAddressByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationDeliveryAddress>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationDeliveryAddress>>() {
        });
        List<NGBPCmplxPOCreationDeliveryAddress> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationDeliveryAddress(NGBPCmplxPOCreationDeliveryAddress addressObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationDeliveryAddress.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), addressObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationDeliveryAddress: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationConfirmations> findNGBPCmplxPOCreationConfirmationsByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPOCreationConfirmationsByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationConfirmations>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationConfirmations>>() {
        });
        List<NGBPCmplxPOCreationConfirmations> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationConfirmations(NGBPCmplxPOCreationConfirmations confObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationConfirmations.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), confObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationConfirmations: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationConditionControl> findNGBPCmplxPOCreationConditionControlByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPOCreationConditionControlByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationConditionControl>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationConditionControl>>() {
        });
        List<NGBPCmplxPOCreationConditionControl> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationConditionControl(NGBPCmplxPOCreationConditionControl confObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationConditionControl.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), confObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationConditionControl: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationDelivery> findNGBPCmplxPOCreationDeliveryByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPOCreationDeliveryByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationDelivery>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationDelivery>>() {
        });
        List<NGBPCmplxPOCreationDelivery> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationDelivery(NGBPCmplxPOCreationDelivery deliveryObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationDelivery.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), deliveryObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationDelivery: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationLineItemCustomerData> findNGBPCmplxPOCreationLineItemCustomerDataByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPOCreationLineItemCustomerDataByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemCustomerData>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemCustomerData>>() {
        });
        List<NGBPCmplxPOCreationLineItemCustomerData> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationLineItemCustomerData(NGBPCmplxPOCreationLineItemCustomerData customerObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemCustomerData.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), customerObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemCustomerData: " + msg);
        return msg;
    }

    public String deleteAllTabsDataFromDBInStandAlone(String linkid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllTabsDataFromDBInStandAlone.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), linkid, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationDelivery: " + msg);
        return msg;
    }

    public List<SchemaGroupPurOrgMapping> findKalsmBySchemaGroupAndPurchaseOrg(String schemaGroup, String purOrg) {
        System.out.println("findKalsmBySchemaGroupAndPurchaseOrg");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findKalsmBySchemaGroupAndPurchaseOrg.do?schemaGroup=" + schemaGroup + "&purOrg=" + purOrg;
        System.out.println("url: " + url);
        ResponseEntity<List<SchemaGroupPurOrgMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SchemaGroupPurOrgMapping>>() {
        });
        List<SchemaGroupPurOrgMapping> list = response.getBody();
        return list;
    }

    public List<NGBPCmplxPOCreationLineItemMaterialTab> getNGBPCmplxPOCreationLineItemMaterialTabByLinkId(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemMaterialTabByLinkId.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemMaterialTab>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemMaterialTab>>() {
        });
        List<NGBPCmplxPOCreationLineItemMaterialTab> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationLineItemMaterialTab(NGBPCmplxPOCreationLineItemMaterialTab customerObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemMaterialTab.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), customerObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemMaterialTab: " + msg);
        return msg;
    }

    public String saveNGBPCmplxPOCreationLineItemMaterialTab(NGBPCmplxPOCreationLineItemMaterialTab material) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemMaterialTab.do"), material, String.class);
        System.out.println("saveNGBPCmplxPOCreationLineItemMaterialTab msg : " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationLineItemComponent> getNGBPCmplxPOCreationLineItemComponentByLinkId(String linkid) {
        System.out.println("getNGBPCmplxPOCreationLineItemComponentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemComponentByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemComponent>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemComponent>>() {
        });
        List<NGBPCmplxPOCreationLineItemComponent> component = response.getBody();
        return component;
    }

    public String updateNGBPCmplxPOCreationLineItemComponent(NGBPCmplxPOCreationLineItemComponent componentObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemComponent.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), componentObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemComponent: " + msg);
        return msg;
    }

    public List<MasterPricingProcedures> getByPricingProcedure(String pricingprocedure) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getbypricingprocedure.do?pricingprocedure=" + pricingprocedure;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPricingProcedures>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPricingProcedures>>() {
        });
        List<MasterPricingProcedures> list = response.getBody();
        System.out.println("pricingprocedurelist size:" + list.size());
        return list;
    }

    public List<MasterPricingDescription> getPricingDescriptionByKSCHL(String KSCHL) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getpricingdescriptionbykschl.do?KSCHL=" + KSCHL;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPricingDescription>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPricingDescription>>() {
        });
        List<MasterPricingDescription> kSCHLList = response.getBody();
        System.out.println("kSCHLList size: " + kSCHLList.size());
        return kSCHLList;
    }

    public List<MasterDepartment> getMasterDepartmentByUsername(String username) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterDepartmentByUsername.do?username=" + username;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterDepartment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDepartment>>() {
        });
        List<MasterDepartment> list = response.getBody();
        return list;
    }

    public List<MasterTaxCode> getAllTaxCode() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getalltaxcode.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterTaxCode>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterTaxCode>>() {
        });
        List<MasterTaxCode> taxList = response.getBody();
        System.out.println("taxList size: " + taxList.size());
        return taxList;
    }

    public List<NGBPCmplxPOCreationLineItemConditions> getNGBPCmplxPOCreationLineItemConditionsByLinkIdAndConitionTypeAndChangeId(String LinkId, String conditionType, String changeid) {
        System.out.println("getConditionByLinkIdAndConitionType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemConditionsByLinkIdAndConitionTypeAndChangeId.do?LinkId=" + LinkId + "&conditionType=" + conditionType + "&changeid=" + changeid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemConditions>>() {
        });
        List<NGBPCmplxPOCreationLineItemConditions> conditionObj = response.getBody();
        return conditionObj;
    }

    public String saveStandAloneProfitabilitySegment(NGBPCmplxPOCreationLineItemProfitabilitySegment profitabilitySegment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveStandAloneProfitabilitySegment.do"), profitabilitySegment, String.class);
        System.out.println("saveprofitabilitysegment : " + msg);
        return msg;
    }

    public String saveNGBPCmplxPOCreationLineItemComponent(NGBPCmplxPOCreationLineItemComponent material) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemComponent.do"), material, String.class);
        System.out.println("saveNGBPCmplxPOCreationLineItemComponent msg : " + msg);
        return msg;
    }
    
    public List<NGBPCmplxPOCreationLineItemPO> findSAPoLineByExtIdAndItemNo(String extId, String itemNo)
    {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getPRLineData.do?searchData=" + extId + "~" + itemNo;
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPO>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPO>>() {
        });
        List<NGBPCmplxPOCreationLineItemPO> lineItemPOlist = list.getBody();
        System.out.println("lineItemPOlist size :" + lineItemPOlist.size());
        return lineItemPOlist;
    }
    
    public String saveNGBPCmplxPOCreationLineItemPOAccountAssignment(NGBPCmplxPOCreationLineItemPOAccountAssignment saPoLineAccAss) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemPOAccountAssignment.do"), saPoLineAccAss, String.class);
        System.out.println("saveNGBPCmplxPOCreationLineItemPOAccountAssignment msg : " + msg);
        return msg;
    }
}
