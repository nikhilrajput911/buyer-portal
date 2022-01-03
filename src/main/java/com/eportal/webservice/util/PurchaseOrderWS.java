/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.webservice.util;

import com.eportal.entities.AccountAssignment;
import com.eportal.entities.AccountAssignmentCategoryMaster;
import com.eportal.entities.BuyerPendingPRLineItemsBean;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.CmplxPOCreationApproverDetailsDraft;
import com.eportal.entities.CmplxPRToPOLineItemComponents;
import com.eportal.entities.CmplxPRToPOLineItemPRAccountAssignment;
import com.eportal.entities.CmplxPoCreationCommunicationDraft;
import com.eportal.entities.CmplxPoCreationConditionsDraft;
import com.eportal.entities.CmplxPoCreationCustomerDataDraft;
import com.eportal.entities.CmplxPoCreationDeliveryInvoiceDraft;
import com.eportal.entities.CmplxPoCreationHeaderTextDraft;
import com.eportal.entities.CmplxPoCreationLineItemPoDraft;
import com.eportal.entities.CmplxPoCreationVendorAddressDraft;
import com.eportal.entities.ConditionControl;
import com.eportal.entities.ConditionsLineLevel;
import com.eportal.entities.Confirmations;
import com.eportal.entities.CustomerData;
import com.eportal.entities.Delivery;
import com.eportal.entities.DeliveryAddress;
import com.eportal.entities.DeliverySchedule;
import com.eportal.entities.ExtPoCreationDraft;
import com.eportal.entities.Invoice;
import com.eportal.entities.LastPoDetailsBean;
import com.eportal.entities.LimitAccountAssignment;
import com.eportal.entities.Limits;
import com.eportal.entities.MasterAsset;
import com.eportal.entities.MasterBillType;
import com.eportal.entities.MasterBusinessArea;
import com.eportal.entities.MasterCommitmentItem;
import com.eportal.entities.MasterCostCentre;
import com.eportal.entities.MasterCurrency;
import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterDistributionChannel;
import com.eportal.entities.MasterFunctionalArea;
import com.eportal.entities.MasterGLCode;
import com.eportal.entities.MasterIncoterms;
import com.eportal.entities.MasterInternalOrder;
import com.eportal.entities.MasterMaterialGeneral;
import com.eportal.entities.MasterMaterialGroup;
import com.eportal.entities.MasterMaterialMARA;
import com.eportal.entities.MasterMaterialMRP;
import com.eportal.entities.MasterNetwork;
import com.eportal.entities.MasterPlant;
import com.eportal.entities.MasterProcCaMatrix;
import com.eportal.entities.MasterPurchaseOrg;
import com.eportal.entities.MasterSalesOffice;
import com.eportal.entities.MasterSalesOrganisation;
import com.eportal.entities.MasterServiceMaster;
import com.eportal.entities.MasterTNCCMapping;
import com.eportal.entities.MasterUserIdDepartment;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.MaterialTab;
import com.eportal.entities.NGBPCmplxPOCreationConditions;
import com.eportal.entities.NGBPCmplxPOCreationLimits;
import com.eportal.entities.NGBPCmplxPOCreationLimitsAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemConditions;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPO;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
import com.eportal.entities.NGBPCmplxPOCreationLineItemProfitabilitySegment;
import com.eportal.entities.NGExtPOCreation;
import com.eportal.entities.NGExtPRToPO;
import com.eportal.entities.NG_BP_Default_RatedParameters;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.PORfqLineItemBean;
import com.eportal.entities.PersonalSettings;
import com.eportal.entities.PoCommentsHistory;
import com.eportal.entities.PoRunningSequenceBean;
import com.eportal.entities.PoSavingReportMaterialBean;
import com.eportal.entities.PoSavingReportServiceBean;
import com.eportal.entities.PrToPoUserProfileMaster;
import com.eportal.entities.ProfitabilitySegment;
import com.eportal.entities.QuantityDates;
import com.eportal.entities.ServiceAccountAssignment;
import com.eportal.entities.Services;
import com.eportal.entities.ServicesLongTexts;
import com.eportal.entities.Text;
import java.math.BigDecimal;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
public class PurchaseOrderWS {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Autowired
    AccountAssignment accountAssignment;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignment nGBPCmplxPOCreationLineItemPOAccountAssignment;

    public List<MasterMaterialMRP> getMasterMaterialMPRByMaterialCode(String materialcode) {
        System.out.println("findKalsmBySchemaGroupAndPurchaseOrg");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getmastermaterialmrpBymaterialcode.do?materialcode=" + materialcode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialMRP>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialMRP>>() {
        });
        List<MasterMaterialMRP> list = response.getBody();
        return list;
    }

    public String saveInvoice(Invoice invoice) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveinvoice.do"), invoice, String.class);
        System.out.println("saveInvoice :" + msg);
        return msg;
    }

    public String saveServiceTableData(Services services) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveservicetabledata.do"), services, String.class);
        System.out.println("saveServiceTableData : " + msg);
        return msg;
    }

    public String saveServiceAccountAssignment(ServiceAccountAssignment serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveserviceaccountassignment.do"), serviceAccountAssignment, String.class);
        System.out.println("serviceAccountAssignment : " + msg);
        return msg;
    }

    public String saveConditionsTabData(ConditionsLineLevel conditions) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveconditionstabdata.do"), conditions, String.class);
        System.out.println("saveConditionsTabData : " + msg);
        return msg;
    }

    public String saveAccountAssignment(AccountAssignment accountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveaccountassignment.do"), accountAssignment, String.class);
        System.out.println("saveaccountassignment :" + msg);
        return msg;
    }

    public String saveQuantityDates(QuantityDates quantity) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savequantitydates.do"), quantity, String.class);
        System.out.println("saveQuantityDates :" + msg);
        return msg;
    }

    public String saveDeliverySchedule(DeliverySchedule deliverySchedule) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savedeliveryschedule.do"), deliverySchedule, String.class);
        System.out.println("savedeliveryschedule :" + msg);
        return msg;
    }

    public String saveConfirmation(Confirmations confirmations) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveconfirmation.do"), confirmations, String.class);
        System.out.println("saveconfirmation :" + msg);
        return msg;
    }

    public String saveConditionControl(ConditionControl conditionControl) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveconditioncontrol.do"), conditionControl, String.class);
        System.out.println("saveconditioncontrol :" + msg);
        return msg;
    }

    public String saveDeliveryAddress(DeliveryAddress deliveryAddress) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savedeliveryaddress.do"), deliveryAddress, String.class);
        System.out.println("savedeliveryaddress :" + msg);
        return msg;
    }

    public String saveDelivery(Delivery delivery) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savedelivery.do"), delivery, String.class);
        System.out.println("savedelivery :" + msg);
        return msg;
    }

    public String saveLimits(Limits limits) {
        System.out.println(" save in Limits");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savelimits.do"), limits, String.class);
        System.out.println("limits :" + msg);
        return msg;
    }

    public String saveText(Text text) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savetext.do"), text, String.class);
        System.out.println("savetext :" + msg);
        return msg;
    }

    public String saveCustomerData(CustomerData customer) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savecustomerdata.do"), customer, String.class);
        System.out.println("saveCustomerData :" + msg);
        return msg;
    }

    public List<MasterVendor> findMasterVendorByVendorCode(String vendorcode) {
        System.out.println("vendorcode: " + vendorcode);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findmastervendorbyvendorcode.do?vendorcode=" + vendorcode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        List<MasterVendor> vendor = response.getBody();
        return vendor;
    }

    public String updateVendorMaster(MasterVendor master) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateVendorMaster.do"), master, String.class);
        return msg;
    }

    public BigDecimal findSumOfConditionAmtByLinkId(String linkId) {
        System.out.println("linkId: " + linkId);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSumOfConditionAmtByLinkId.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<BigDecimal> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BigDecimal>() {
        });
        BigDecimal amtSum = response.getBody();
        return amtSum;
    }

    public BigDecimal findSumOfConditionAmtByLinkIdAndVendorCode(String linkId, String vendorCode) {
        System.out.println("linkId: " + linkId);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSumOfConditionAmtByLinkIdAndVendorCode.do?linkId=" + linkId + "&vendorCode=" + vendorCode;
        System.out.println("url: " + url);
        ResponseEntity<BigDecimal> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BigDecimal>() {
        });
        BigDecimal amtSum = response.getBody();
        return amtSum;
    }

    public BigDecimal findSumOfConditionAmtByLinkIdInStandAlone(String linkId) {
        System.out.println("linkId: " + linkId);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSumOfConditionAmtByLinkIdInStandAlone.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<BigDecimal> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BigDecimal>() {
        });
        BigDecimal amtSum = response.getBody();
        return amtSum;
    }

    public BigDecimal findSumOfConditionAmtByLinkIdAndVendorCodeInStandAlone(String linkId, String vendorCode) {
        System.out.println("linkId: " + linkId);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSumOfConditionAmtByLinkIdAndVendorCodeInStandAlone.do?linkId=" + linkId + "&vendorCode=" + vendorCode;
        System.out.println("url: " + url);
        ResponseEntity<BigDecimal> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BigDecimal>() {
        });
        BigDecimal amtSum = response.getBody();
        return amtSum;
    }

    public List<MasterMaterialGeneral> findMaterialByCompanyCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaterialByCompanyCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGeneral>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGeneral>>() {
        });
        List<MasterMaterialGeneral> list = response.getBody();
        return list;
    }

    public List<MasterDistributionChannel> findDistributionChannelByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findDistributionChannelByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterDistributionChannel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDistributionChannel>>() {
        });
        List<MasterDistributionChannel> list = response.getBody();
        return list;
    }

    public List<MasterSalesOrganisation> findSalesOrgByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSalesOrgByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterSalesOrganisation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterSalesOrganisation>>() {
        });
        List<MasterSalesOrganisation> list = response.getBody();
        System.out.println("salesList size: " + list.size());
        return list;
    }

    public List<MasterBusinessArea> findBusinessAreaByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findBusinessAreaByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterBusinessArea>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterBusinessArea>>() {
        });
        List<MasterBusinessArea> businessList = response.getBody();
        System.out.println("businessList size: " + businessList.size());
        return businessList;
    }

    public List<MasterBillType> findBillingTypeByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findBillingTypeByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterBillType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterBillType>>() {
        });
        List<MasterBillType> list = response.getBody();
        return list;
    }

    public List<MasterSalesOffice> findSalesOfficeByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSalesOfficeByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterSalesOffice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterSalesOffice>>() {
        });
        List<MasterSalesOffice> list = response.getBody();
        System.out.println("Sales Office size: " + list.size());
        return list;
    }

    public List<MasterAsset> findMasterAssetByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterAssetByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterAsset>> asset = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterAsset>>() {
        });
        List<MasterAsset> assetObj = asset.getBody();
        return assetObj;
    }

    public List<MasterNetwork> findMasterNetworkByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterNetworkByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterNetwork>> network = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterNetwork>>() {
        });
        List<MasterNetwork> networkObj = network.getBody();
        return networkObj;
    }

    public List<MasterCommitmentItem> findCommitmentItemByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCommitmentItemByCoCode.do?companyCode=" + companyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCommitmentItem>> item = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCommitmentItem>>() {
        });
        List<MasterCommitmentItem> itemObj = item.getBody();
        return itemObj;
    }

//    public List<MasterCostCentre> findCostCenterByCoCode(String companyCode, String trackingNumber) {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/findCostCenterByCoCode.do?companyCode=" + companyCode + "&trackingNumber=" + trackingNumber;
//        ResponseEntity<List<MasterCostCentre>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCostCentre>>() {});
//        List<MasterCostCentre> costCenterList = costCenter.getBody();
//        return costCenterList;
//    }
    public List<MasterCostCentre> findCostCenterByCoCode(String companyCode, String trackingNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCostCenterByCoCodeAndTrackingNumber.do?companyCode=" + companyCode + "&trackingNumber=" + trackingNumber;
        System.out.println("URL: " + url);
        ResponseEntity<List<MasterCostCentre>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCostCentre>>() {});
        List<MasterCostCentre> costCenterList = costCenter.getBody();
        return costCenterList;
    }

    public List<MasterGLCode> findGLCodeByCoCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findGLCodeByCoCode.do?companyCode=" + companyCode;
        ResponseEntity<List<MasterGLCode>> code = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterGLCode>>() {
        });
        List<MasterGLCode> codeObj = code.getBody();
        return codeObj;
    }

    public List<NGBPCmplxPOCreationLineItemProfitabilitySegment> getProfitabilitySegmentByLinkIdAndServiceLineItemNumber(String linkid, String serviceLineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getProfitabilitySegmentByLinkIdAndServiceLineItemNumber.do?linkid=" + linkid + "&serviceLineItemNumber=" + serviceLineItemNumber;
        ResponseEntity<List<NGBPCmplxPOCreationLineItemProfitabilitySegment>> segment = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemProfitabilitySegment>>() {
        });
        List<NGBPCmplxPOCreationLineItemProfitabilitySegment> segmentObj = segment.getBody();
        return segmentObj;
    }

    public List<ProfitabilitySegment> getProfitabilitySegmentByLinkIdAndServiceLineItemNumberInPrRfq(String linkid, String serviceLineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getProfitabilitySegmentByLinkIdAndServiceLineItemNumberInPrRfq.do?linkid=" + linkid + "&serviceLineItemNumber=" + serviceLineItemNumber;
        ResponseEntity<List<ProfitabilitySegment>> segment = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ProfitabilitySegment>>() {
        });
        List<ProfitabilitySegment> segmentObj = segment.getBody();
        return segmentObj;
    }

    public List<PoRunningSequenceBean> callPoRunningSequenceStoredProcedure(String prType) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPoRunningSequenceStoredProcedure.do?prType=" + prType;
        System.out.println("url: " + url);
        ResponseEntity<List<PoRunningSequenceBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PoRunningSequenceBean>>() {
        });
        List<PoRunningSequenceBean> list = response.getBody();
        return list;
    }

    public List<PrToPoUserProfileMaster> getTrackingNumberByCompanyCodeAndUserId(String companyCode, String userId) {
        System.out.println("findKalsmBySchemaGroupAndPurchaseOrg");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getTrackingNumberByCompanyCodeAndUserId.do?companyCode=" + companyCode + "&userId=" + userId;
        System.out.println("url: " + url);
        ResponseEntity<List<PrToPoUserProfileMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PrToPoUserProfileMaster>>() {
        });
        List<PrToPoUserProfileMaster> list = response.getBody();
        return list;
    }

    public List<NGExtPOCreation> findPoAcknowledgementReport(String fromDate, String toDate, String vendorCode) {
        System.out.println("findPoAcknowledgementReport");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPoAcknowledgementReport.do?fromDate=" + fromDate + "&toDate=" + toDate + "&vendorCode=" + vendorCode;
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
        return list;
    }

    public String updateNGBPCmplxPOCreationLineItemConditions(NGBPCmplxPOCreationLineItemConditions serviceObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemConditions.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), serviceObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemConditions: " + msg);
        return msg;
    }

    public String SavePersonalSettings(PersonalSettings personalSettings) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/SavePersonalSettings.do"), personalSettings, String.class);
        System.out.println("SavePersonalSettings :" + msg);
        return msg;
    }

    public List<MasterPurchaseOrg> getAllPurchaseOrgByProcessType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getAllPurchaseOrgByProcessType.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPurchaseOrg>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchaseOrg>>() {
        });
        List<MasterPurchaseOrg> list = response.getBody();
        System.out.println("getAllPurchaseOrgByProcessType size: " + list.size());
        return list;
    }

    public List<MasterCurrency> getMasterCurrencyByProcessType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterCurrencyByProcessType.do";
        ResponseEntity<List<MasterCurrency>> country = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCurrency>>() {
        });
        List<MasterCurrency> currencyList = country.getBody();
        return currencyList;
    }

    public List<MasterPlant> getMasterPlantByProcessType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterPlantByProcessType.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPlant>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPlant>>() {
        });
        List<MasterPlant> list = response.getBody();
        System.out.println("MasterPlant size: " + list.size());
        return list;
    }

    public List<MasterMaterialGroup> getMaterialGroupByProcessType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMaterialGroupByProcessType.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGroup>>() {
        });
        List<MasterMaterialGroup> list = response.getBody();
        System.out.println("MasterPlant size: " + list.size());
        return list;
    }

    public List<MasterIncoterms> getAllMasterIncoTerms() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getAllMasterIncoTerms.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterIncoterms>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterIncoterms>>() {
        });
        List<MasterIncoterms> list = response.getBody();
        System.out.println("MasterIncoterms size: " + list.size());
        return list;
    }

    public List<Integer> findFolderIndexByName(String name) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findFolderIndexByName.do?name=" + name;
        System.out.println("url: " + url);
        ResponseEntity<List<Integer>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Integer>>() {
        });
        List<Integer> list = response.getBody();
        return list;
    }

    public List<Integer> findFolderIndexForViewPrLineItemDoc(String linkId, String pid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findFolderIndexForViewPrLineItemDoc.do?linkId=" + linkId + "&pid=" + pid;
        System.out.println("url: " + url);
        ResponseEntity<List<Integer>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Integer>>() {
        });
        List<Integer> list = response.getBody();
        return list;
    }

    public List<Integer> findFolderIndexForViewRfqDoc(String linkId, String rfqNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findFolderIndexForViewRfqDoc.do?linkId=" + linkId + "&rfqNumber=" + rfqNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<Integer>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Integer>>() {
        });
        List<Integer> list = response.getBody();
        return list;
    }

    public List<PersonalSettings> getPersonalSettngsByBuyer(int buyerId) {
        System.out.println("findKalsmBySchemaGroupAndPurchaseOrg");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getPersonalSettngsByBuyer.do?buyerId=" + buyerId;
        System.out.println("url: " + url);
        ResponseEntity<List<PersonalSettings>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PersonalSettings>>() {
        });
        List<PersonalSettings> list = response.getBody();
        return list;
    }

    public String updatePersonalSettings(PersonalSettings personalSettingsObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updatePersonalSettings.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), personalSettingsObj, String.class);
        System.out.println("msg in updatePersonalSettings: " + msg);
        return msg;
    }

    public List<NGBPCmplxPOCreationLimits> findNGBPCmplxPoCreationLimitsByLinkID(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findNGBPCmplxPoCreationLimitsByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLimits>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLimits>>() {
        });
        List<NGBPCmplxPOCreationLimits> list = response.getBody();
        return list;
    }

    public List<AccountAssignmentCategoryMaster> getAllAccountAssignmentCategory() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallaccountassignmentcategory.do";
        System.out.println("url: " + url);
        ResponseEntity<List<AccountAssignmentCategoryMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignmentCategoryMaster>>() {
        });
        List<AccountAssignmentCategoryMaster> accountList = response.getBody();
        return accountList;
    }

    public List<AccountAssignmentCategoryMaster> findAccAssCatByAccountAssignmentCode(String code) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findAccAssCatByAccountAssignmentCode.do?code=" + code;
        System.out.println("url: " + url);
        ResponseEntity<List<AccountAssignmentCategoryMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignmentCategoryMaster>>() {
        });
        List<AccountAssignmentCategoryMaster> list = response.getBody();
        return list;
    }

    public String saveExtPoCreationDraft(ExtPoCreationDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveExtPoCreationDraft.do"), obj, String.class);
        System.out.println("saveExtPoCreationDraft id: " + id);
        return id;
    }

    public String saveCmplxPoCreationDeliveryInvoiceDraft(CmplxPoCreationDeliveryInvoiceDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPoCreationDeliveryInvoiceDraft.do"), obj, String.class);
        System.out.println("saveCmplxPoCreationDeliveryInvoiceDraft id: " + id);
        return id;
    }

    public String saveCmplxPoCreationConditionsDraft(CmplxPoCreationConditionsDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPoCreationConditionsDraft.do"), obj, String.class);
        System.out.println("saveCmplxPoCreationConditionsDraft id: " + id);
        return id;
    }

    public String saveCmplxPoCreationVendorAddressDraft(CmplxPoCreationVendorAddressDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPoCreationVendorAddressDraft.do"), obj, String.class);
        System.out.println("saveCmplxPoCreationVendorAddressDraft id: " + id);
        return id;
    }

    public String saveCmplxPoCreationCommunicationDraft(CmplxPoCreationCommunicationDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPoCreationCommunicationDraft.do"), obj, String.class);
        System.out.println("saveCmplxPoCreationCommunicationDraft id: " + id);
        return id;
    }

    public String saveCmplxPoCreationHeaderTextDraft(CmplxPoCreationHeaderTextDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPoCreationHeaderTextDraft.do"), obj, String.class);
        System.out.println("saveCmplxPoCreationHeaderTextDraft id: " + id);
        return id;
    }

    public String saveCmplxPoCreationLineItemPoDraft(CmplxPoCreationLineItemPoDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPoCreationLineItemPoDraft.do"), obj, String.class);
        System.out.println("saveCmplxPoCreationLineItemPoDraft id: " + id);
        return id;
    }

    public ExtPoCreationDraft getExtPoCreationDraftById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getExtPoCreationDraftById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<ExtPoCreationDraft> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ExtPoCreationDraft>() {
        });
        ExtPoCreationDraft obj = response.getBody();
        return obj;
    }

    public String updateExtPoCreationDraft(ExtPoCreationDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateExtPoCreationDraft.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), obj, String.class);
        return msg;
    }

    public List<CmplxPoCreationDeliveryInvoiceDraft> findCmplxPoCreationDeliveryInvoiceDraftByExtId(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationDeliveryInvoiceDraftByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationDeliveryInvoiceDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationDeliveryInvoiceDraft>>() {
        });
        List<CmplxPoCreationDeliveryInvoiceDraft> list = response.getBody();
        return list;
    }

    public List<CmplxPoCreationConditionsDraft> findCmplxPoCreationConditionsDraftByExt(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationConditionsDraftByExt.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationConditionsDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationConditionsDraft>>() {
        });
        List<CmplxPoCreationConditionsDraft> list = response.getBody();
        return list;
    }

    public List<CmplxPoCreationVendorAddressDraft> findCmplxPoCreationVendorAddressDraftByExtId(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationVendorAddressDraftByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationVendorAddressDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationVendorAddressDraft>>() {
        });
        List<CmplxPoCreationVendorAddressDraft> list = response.getBody();
        return list;
    }

    public List<CmplxPoCreationCommunicationDraft> findCmplxPoCreationCommunicationDraftByExtId(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationCommunicationDraftByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationCommunicationDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationCommunicationDraft>>() {
        });
        List<CmplxPoCreationCommunicationDraft> list = response.getBody();
        return list;
    }

    public List<CmplxPoCreationHeaderTextDraft> findCmplxPoCreationHeaderTextDraftByExtId(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationHeaderTextDraftByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationHeaderTextDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationHeaderTextDraft>>() {
        });
        List<CmplxPoCreationHeaderTextDraft> list = response.getBody();
        return list;
    }

    public List<CmplxPoCreationLineItemPoDraft> findCmplxPoCreationLineItemPoDraftByExtId(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationLineItemPoDraftByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationLineItemPoDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationLineItemPoDraft>>() {
        });
        List<CmplxPoCreationLineItemPoDraft> list = response.getBody();
        return list;
    }

    public String deleteAllCmplxPoCreationDeliveryInvoiceDraft(List<CmplxPoCreationDeliveryInvoiceDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPoCreationDeliveryInvoiceDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public String deleteAllCmplxPoCreationConditionsDraft(List<CmplxPoCreationConditionsDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPoCreationConditionsDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public String deleteAllCmplxPoCreationVendorAddressDraft(List<CmplxPoCreationVendorAddressDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPoCreationVendorAddressDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public String deleteAllCmplxPoCreationCommunicationDraft(List<CmplxPoCreationCommunicationDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPoCreationCommunicationDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public String deleteAllCmplxPoCreationHeaderTextDraft(List<CmplxPoCreationHeaderTextDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPoCreationHeaderTextDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public String deleteAllCmplxPoCreationLineItemPoDraft(List<CmplxPoCreationLineItemPoDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPoCreationLineItemPoDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<ExtPoCreationDraft> findAllDraftPo() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findAllDraftPo.do";
        System.out.println("url: " + url);
        ResponseEntity<List<ExtPoCreationDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ExtPoCreationDraft>>() {
        });
        List<ExtPoCreationDraft> list = response.getBody();
        return list;
    }

    public List<MasterFunctionalArea> getFunctionalAreaByCompanyCode(String companycode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getFunctionalAreaByCompanyCode.do?CompanyCode=" + companycode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterFunctionalArea>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterFunctionalArea>>() {
        });
        List<MasterFunctionalArea> list = response.getBody();
        System.out.println("getFunctionalAreaByCompanyCode size: " + list.size());
        return list;
    }

    public NewgenPRLineItem getPrDetailsByInsertionOrderId(int prid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getnewgenprlineitem.do?id=" + prid;
        System.out.println("url: " + url);
        ResponseEntity<NewgenPRLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenPRLineItem>() {
        });
        NewgenPRLineItem prList = response.getBody();
        return prList;
    }

    public List<LastPoDetailsBean> callLastPoDetailsStoredProcedure(int insertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callLastPoDetailsStoredProcedure.do?insertionOrderId=" + insertionOrderId;
        System.out.println("url: " + url);
        ResponseEntity<List<LastPoDetailsBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<LastPoDetailsBean>>() {
        });
        List<LastPoDetailsBean> list = response.getBody();
        return list;
    }

//    public List<Services> getSumOfNetPriceOfServiceByLinkId(String LinkId) {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/getSumOfNetPriceOfServiceByLinkId.do?LinkId=" + LinkId;
//        System.out.println("url: " + url);
//        ResponseEntity<List<Services>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Services>>() {
//        });
//        List<Services> list = response.getBody();
//        return list;
//    }
    public BigDecimal getSumOfNetPriceOfServiceByLinkId(String linkId) {
        System.out.println("linkId: " + linkId);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSumOfNetPriceOfServiceByLinkId.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<BigDecimal> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BigDecimal>() {
        });
        BigDecimal amtSum = response.getBody();
        return amtSum;
    }

    public List<MasterVendor> findVendorMasterByMultipleVendorCode(String codes) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findVendorMasterByMultipleVendorCode.do?codes=" + codes;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        List<MasterVendor> list = response.getBody();
        return list;
    }

    public List<CmplxPoCreationLineItemPoDraft> findCmplxPoCreationLineItemPoDraftByPrInsertionOrderId(int prInsertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationLineItemPoDraftByPrInsertionOrderId.do?prInsertionOrderId=" + prInsertionOrderId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationLineItemPoDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationLineItemPoDraft>>() {
        });
        List<CmplxPoCreationLineItemPoDraft> list = response.getBody();
        return list;
    }

    public List<CmplxPoCreationCustomerDataDraft> findCmplxPoCreationCustomerDataDraftByExtId(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPoCreationCustomerDataDraftByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPoCreationCustomerDataDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPoCreationCustomerDataDraft>>() {
        });
        List<CmplxPoCreationCustomerDataDraft> list = response.getBody();
        return list;
    }

    public String deleteAllCmplxPoCreationCustomerDataDraft(List<CmplxPoCreationCustomerDataDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPoCreationCustomerDataDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public String saveCmplxPoCreationCustomerDataDraft(CmplxPoCreationCustomerDataDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPoCreationCustomerDataDraft.do"), obj, String.class);
        System.out.println("saveCmplxPoCreationCustomerDataDraft id: " + id);
        return id;
    }

    public List<Invoice> getInvoiceByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getinvoicebyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Invoice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Invoice>>() {
        });
        List<Invoice> invoice = response.getBody();
        return invoice;
    }

    public String deleteAllInvoices(List<Invoice> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllInvoices.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<Services> getServicesByLineItemNumber(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getservicesbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<Services>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Services>>() {
        });
        List<Services> list = response.getBody();
        return list;
    }

    public String deleteAllServices(List<Services> serviceList) {
        System.out.println("deleteAllServices");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deletefromservices.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, serviceList, String.class);
        return result;
    }

    public List<ServiceAccountAssignment> getServiceAccountAssignmentByLineItemNumber(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getserviceaccountassignmentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ServiceAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ServiceAccountAssignment>>() {
        });
        List<ServiceAccountAssignment> list = response.getBody();
        return list;
    }

    public String deleteAllFromServiceAccountAssignment(List<ServiceAccountAssignment> accAsgnList) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallfromserviceaccountassignment.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accAsgnList, String.class);
        return result;
    }

    public List<Limits> findLimitsByLineItemNumber(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findLimitsByLineItemNumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<Limits>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Limits>>() {
        });
        List<Limits> limits = response.getBody();
        return limits;
    }

    public String deleteAllFromLimits(List<Limits> limitsList) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallfromlimits.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, limitsList, String.class);
        return result;
    }

    public List<ConditionsLineLevel> getMasterConditionLineLevelByLineItemNumber(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getmasterconditionlinelevelbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> condition = response.getBody();
        return condition;
    }

    public String deleteAllConditions(List<ConditionsLineLevel> conditionList) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallconditions.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, conditionList, String.class);
        return result;
    }

    public List<AccountAssignment> getAccountAssignmentByLineItemNumber(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getaccountassignmentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<AccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignment>>() {
        });
        List<AccountAssignment> accAsgnList = response.getBody();
        return accAsgnList;
    }

    public String deleteAllFromAccountAssignment(List<AccountAssignment> accountAsgnList) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallfromaccountassignment.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accountAsgnList, String.class);
        return result;
    }

    public List<QuantityDates> getQuantityDatesByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getquantitydatesbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<QuantityDates>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<QuantityDates>>() {
        });
        List<QuantityDates> quantity = response.getBody();
        return quantity;
    }

    public String deleteAllQuantityWeightByInsertionOrderId(List<QuantityDates> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllQuantityWeightByInsertionOrderId.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<DeliverySchedule> getDeliveryScheduleByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getdeliveryschedulebyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<DeliverySchedule>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<DeliverySchedule>>() {
        });
        List<DeliverySchedule> delSchList = response.getBody();
        return delSchList;
    }

    public String deleteDeliverySchedule(List<DeliverySchedule> deliverySchList) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deletedeliveryschedule.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, deliverySchList, String.class);
        return result;
    }

    public List<Confirmations> getConfirmationsByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getconfirmationsbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Confirmations>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Confirmations>>() {
        });
        List<Confirmations> conf = response.getBody();
        return conf;
    }

    public String deleteAllConfirmations(List<Confirmations> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllConfirmations.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<ConditionControl> getConditionCondrolByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getconditioncondrolbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionControl>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionControl>>() {
        });
        List<ConditionControl> condition = response.getBody();
        return condition;
    }

    public String deleteAllConditionControl(List<ConditionControl> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllConditionControl.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<Delivery> getDeliveryByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getdeliverybyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Delivery>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Delivery>>() {
        });
        List<Delivery> delivery = response.getBody();
        return delivery;
    }

    public String deleteAllDelivery(List<Delivery> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllDelivery.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<DeliveryAddress> getDeliveryAddressByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getdeliveryaddressbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<DeliveryAddress>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<DeliveryAddress>>() {
        });
        List<DeliveryAddress> address = response.getBody();
        return address;
    }

    public String deleteAllDeliveryAddress(List<DeliveryAddress> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllDeliveryAddress.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<Text> getTextsByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/gettextsbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Text>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Text>>() {
        });
        List<Text> text = response.getBody();
        return text;
    }

    public String deleteAllText(List<Text> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllText.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<CustomerData> getCustomerDataByInsertionId(String insertionid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcustomerdatabyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<CustomerData>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CustomerData>>() {
        });
        List<CustomerData> customer = response.getBody();
        return customer;
    }

    public String deleteAllCustomerData(List<CustomerData> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCustomerData.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public List<NGExtPOCreation> findByInitiatorIdAndCurrentWorkstepIn(String initiatorID) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByInitiatorIdAndCurrentWorkstepIn.do?initiatorID=" + initiatorID;
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
        return list;
    }

    public String getNGBPExtPOCreationByPONumber(String poNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPExtPOCreationByPONumber.do?poNumber=" + poNumber;
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<String> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<String>() {
        });
        String Poid = list.getBody();
        return Poid;
    }

    // Here fully Qualified name of entity used because a type with the same simple name is already defined by the single-type-import of Component.
    public List<com.eportal.entities.Component> getComponentByLineItemNumber(String lineItemNumber) {
        System.out.println("getComponentByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcomponentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<com.eportal.entities.Component>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<com.eportal.entities.Component>>() {
        });
        List<com.eportal.entities.Component> component = response.getBody();
        return component;
    }

    // Here fully Qualified name of entity used because a type with the same simple name is already defined by the single-type-import of Component.
    public String deleteAllComponent(List<com.eportal.entities.Component> componentList) {
        System.out.println("deleteAllComponent");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallcomponent.do?componentList=" + componentList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, componentList, String.class);
        return result;
    }

    public String saveComponent(com.eportal.entities.Component component) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savecomponent.do"), component, String.class);
        System.out.println("savecomponent :" + msg);
        return msg;
    }

    public List<LimitAccountAssignment> getLimitAccountAssignmentByLineItemNumber(String lineItemNumber) {
        System.out.println("getLimitAccountAssignmentByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getlimitaccountassignmentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<LimitAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<LimitAccountAssignment>>() {
        });
        List<LimitAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    public String deleteAllLimitAccountAssignment(List<LimitAccountAssignment> limitAssAsgnList) {
        System.out.println("limitAssAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deletealllimitaccountassignment.do?limitAssAsgnList=" + limitAssAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, limitAssAsgnList, String.class);
        return result;
    }

    public List<ProfitabilitySegment> getProfitabilitySegmentByLineItemNumber(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getProfitabilitySegmentByLineItemNumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ProfitabilitySegment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ProfitabilitySegment>>() {
        });
        List<ProfitabilitySegment> list = response.getBody();
        return list;
    }

    public String deleteAllProfitabilitySegment(List<ProfitabilitySegment> segmentList) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllProfitabilitySegment.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, segmentList, String.class);
        return result;
    }

    public List<BuyerPendingPRLineItemsBean> callBuyerPendingPrLineItemsStoredProcedure(int buyerId, String prType, int noOfDays, String initiatorId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerPendingPrLineItemsStoredProcedure.do?buyerid=" + buyerId + "&prtype=" + prType + "&noOfDays=" + noOfDays + "&initiatorId=" + initiatorId;
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerPendingPRLineItemsBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerPendingPRLineItemsBean>>() {
        });
        List<BuyerPendingPRLineItemsBean> buyerPendingPRList = response.getBody();
        return buyerPendingPRList;
    }

    public List<PORfqLineItemBean> callPORfqPrLineItemStoredProcedure(String insertionOrderIds, String rfqId, String requestType) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPORfqPrLineItemStoredProcedure.do?insertionOrderIds=" + insertionOrderIds + "&rfqId=" + rfqId + "&requestType=" + requestType;
        System.out.println("url: " + url);
        ResponseEntity<List<PORfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PORfqLineItemBean>>() {
        });
        List<PORfqLineItemBean> list = response.getBody();
        return list;
    }

    // Code by bittu 23 july 2020
    public String ServiceAccountAssignmentFunction(String lineItemNumber, String linkid, String serviceLineItemNumber, String PoFrom) {
        List<ServiceAccountAssignment> accAssignmentList = getServiceAccountAssignmentByLineItemNumber(lineItemNumber);
        List<LimitAccountAssignment> limitsAccAsgnList = getLimitAccountAssignmentByLineItemNumber(lineItemNumber);

        List<Object> serviceAndLimitAccountAssList = new ArrayList<>();

        serviceAndLimitAccountAssList.addAll(accAssignmentList);
        serviceAndLimitAccountAssList.addAll(limitsAccAsgnList);
        String isDeleteFlag = null;
        float netValue = 0;
        float totalNetValue = 0;
        System.out.println("accAssignmentList Size : " + accAssignmentList.size());
        for (int i = 0; i <= serviceAndLimitAccountAssList.size(); i++) {
            if (i <= serviceAndLimitAccountAssList.size() - 1) {
                if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                    ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + serviceAccAssObj.getNetValaue().floatValue();
                    System.out.println("Total Net Value :" + totalNetValue);

                } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                    LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + limitsAccAssObj.getExpectedvalue().floatValue();
                    System.out.println("Total Net Value :" + totalNetValue);
                }
            }
        }
        System.out.println("TotalNetValue :" + totalNetValue);

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            String accountAsgn = "";
            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = serviceAccAssObj.getNetValaue().floatValue();
                accountAsgn = serviceAccAssObj.getAccountAssignment();
            } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = limitsAccAssObj.getExpectedvalue().floatValue();
                accountAsgn = limitsAccAssObj.getAccountAssignment();
            }
            System.out.println("netValue in AccountAssignment F :" + netValue);
            if (null != accountAsgn) {
                switch (accountAsgn) {
                    case "F":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "A":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "B":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qServiceAccAssObj.isIsDelete() != true) {
                                            if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                                netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                                qServiceAccAssObj.setIsDelete(true);
                                                qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qServiceAccAssObj.isIsDelete() != true) {
                                            serviceAccAssObj.setSerialNumber((i + 1) + "");
                                            if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                                netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                                qServiceAccAssObj.setIsDelete(true);
                                                qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qLimitsAccAssObj.isIsDelete() != true) {
                                            if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                                netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                                accAssignmentList.get(q).setIsDelete(true);
                                                qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qLimitsAccAssObj.isIsDelete() != true) {
                                            limitsAccAssObj.setSerialNumber((i + 1) + "");
                                            if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                                netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                                qLimitsAccAssObj.setIsDelete(true);
                                                qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "C":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "D":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "E":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i + 1);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "G":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "K":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            System.out.println("netValue in ServiceAccountAssignment K :" + netValue + " ,i:" + i + ",Q :" + q);
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");

//                                            System.out.println("PoFrom in K :::" + PoFrom);
//                                            if ("editpo".equals(PoFrom) || "editApprovedPo".equals(PoFrom)) {
//                                                if ("true".equals(iServiceAccAssObj.getIsDeleteFlag())) {
//                                                    System.out.println("Inside the true check:::");
////                                                isDeleteFlag = "true";
//                                                    qServiceAccAssObj.setIsDeleteFlag("true");
//                                                } else {
//                                                    System.out.println("Inside the false check:::");
////                                                isDeleteFlag = "false";
//                                                    qServiceAccAssObj.setIsDeleteFlag("false");
//                                                }
//                                            }
                                        }
                                    }
                                }
                                System.out.println("netValue after loop exe:" + netValue);
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "M":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "N":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "P":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Q":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "R":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "T":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "X":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Z":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                }
            }
//                    }
        }
        System.out.println("serviceAndLimitAccountAssList size after all Acc Asgn :" + serviceAndLimitAccountAssList.size());

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                System.out.println("Quantity in after calculation :" + serviceAccAssObj.getQuantity());
                System.out.println("isIsDelete in after calculation :" + serviceAccAssObj.isIsDelete());
            }
        }

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                System.out.println("isIsDelete in after calculation in loop:" + serviceAccAssObj.isIsDelete());
                if (serviceAccAssObj.isIsDelete() == true) {
//                    serviceAndLimitAccountAssList.remove(serviceAccAssObj);
                    System.out.println("size in after after remove true object" + i + ":" + serviceAndLimitAccountAssList.size());
                    int serviceId = serviceAccAssObj.getId();
                    ServiceAccountAssignment obj = getServiceAccountAssignmenttById(serviceId);
                    System.out.println("getLineNoSerAcc on fetch ::::" + obj.getLineNoSerAcc());
                    obj.setSerialNumber(serviceAccAssObj.getSerialNumber());
                    updateServiceAccountAssignment(obj);
                }
            } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                if (limitsAccAssObj.isIsDelete() == true) {
//                    serviceAndLimitAccountAssList.remove(limitsAccAssObj);
                    int limitId = limitsAccAssObj.getId();
                    LimitAccountAssignment obj = getLimitAccountAssignmentById(limitId);
                    obj.setSerialNumber(limitsAccAssObj.getSerialNumber());
                    updateLimitAccountAssignment(obj);
                }
            }
            System.out.println("i in loop after delete :" + i);
        }
        System.out.println("Total Net Value ====:" + totalNetValue);
        System.out.println("Net Value ======:" + netValue);
        System.out.println("LinkId in  ======:" + linkid);

        System.out.println("accAssignmentList before saving :" + serviceAndLimitAccountAssList.size());
        List<AccountAssignment> AcccountAsgnList = getAccountAssignmentByLineItemNumber(lineItemNumber);
        System.out.println("AcccountAsgnList Size :" + AcccountAsgnList.size());
        if (!AcccountAsgnList.isEmpty()) {
            deleteAllFromAccountAssignment(AcccountAsgnList);
            System.out.println("Delete List in accAssignmentList :");
        }
        System.out.println("serviceAndLimitAccountAssList size :" + serviceAndLimitAccountAssList.size());
        if (!serviceAndLimitAccountAssList.isEmpty()) {
            for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
                if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                    ServiceAccountAssignment serviceAccAsgnObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    if (serviceAccAsgnObj.isIsDelete() == false) {

                        String distribution = null;
                        switch (serviceAccAsgnObj.getDistribution()) {
                            case "Distrib. On Quantity Basis":
                                distribution = "1";
                                break;
                            case "Distrib. By Percentage":
                                distribution = "2";
                                break;
                            case "Single Account Assignment":
                                distribution = "";
                                break;
                        }
                        System.out.println("Commitment Item in Service :" + serviceAccAsgnObj.getCommitmentItem());
                        accountAssignment.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
                        accountAssignment.setQuantity(serviceAccAsgnObj.getQuantity());
                        accountAssignment.setPercentage(serviceAccAsgnObj.getPercentage());
                        accountAssignment.setAccAsgnTblOrder(serviceAccAsgnObj.getAccAsngOrder());
                        accountAssignment.setAsset(serviceAccAsgnObj.getAsset());
                        accountAssignment.setCOArea(serviceAccAsgnObj.getCOArea());
                        if (!serviceAccAsgnObj.getCommitmentItem().isEmpty()) {
                            int comItem = Integer.parseInt(serviceAccAsgnObj.getCommitmentItem());
                            System.out.println("comItem :" + comItem);
                            accountAssignment.setCommitmentItem(Integer.toString(comItem));
//                    accountAssignment.setCommitmentItem(serviceAccAsgnObj.getCommitmentItem());
                        } else {
                            accountAssignment.setCommitmentItem("");
                        }
                        accountAssignment.setCostCenter(serviceAccAsgnObj.getCostCenter());
                        accountAssignment.setDeliverySchedule(serviceAccAsgnObj.getDeliverySchedule());
                        accountAssignment.setDistribution(distribution);
                        accountAssignment.setFunctionalArea(serviceAccAsgnObj.getFunctionalArea());
                        accountAssignment.setFund(serviceAccAsgnObj.getFund());
                        accountAssignment.setFundCenter(serviceAccAsgnObj.getFundCenter());
                        accountAssignment.setGLAccount(serviceAccAsgnObj.getGLAccount());
                        accountAssignment.setItemNumber(serviceAccAsgnObj.getItemNumber());
                        accountAssignment.setLineItemNumber(lineItemNumber);
                        accountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                        accountAssignment.setNetActNumber(serviceAccAsgnObj.getNetActNumber());
                        accountAssignment.setRecipient(serviceAccAsgnObj.getRecipient());
                        accountAssignment.setSalesOrder(serviceAccAsgnObj.getSalesOrder());
                        accountAssignment.setUnloadingPoint(serviceAccAsgnObj.getUnloadingPoint());
                        accountAssignment.setLinkNumber(serviceAccAsgnObj.getLinkNumber());
                        accountAssignment.setCoCode("");
                        accountAssignment.setAccountAssignmentCategory(serviceAccAsgnObj.getAccountAssignment());
                        accountAssignment.setDistribution(serviceAccAsgnObj.getDistribution());
                        accountAssignment.setWBSElement(serviceAccAsgnObj.getWBSElement());
                        accountAssignment.setPrItemNumber(serviceAccAsgnObj.getPrItemNumber());
                        accountAssignment.setLinkId(linkid);
                        System.out.println("isDeleteFlag when Set :" + isDeleteFlag);
                        accountAssignment.setIsDeleteFlag(serviceAccAsgnObj.getIsDeleteFlag());

                        String msg = saveAccountAssignment(accountAssignment);
                        System.out.println("Msg :" + msg);

                        int serviceId = serviceAccAsgnObj.getId();
                        ServiceAccountAssignment obj = getServiceAccountAssignmenttById(serviceId);
                        System.out.println("getLineNoSerAcc on fetch on service update::::" + obj.getLineNoSerAcc());
                        obj.setSerialNumber(serviceAccAsgnObj.getSerialNumber());

                        updateServiceAccountAssignment(obj);
                    }

                } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                    LimitAccountAssignment limitAccAsgnObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);

                    if (limitAccAsgnObj.isIsDelete() == false) {

                        String distribution = limitAccAsgnObj.getDistribution();

                        accountAssignment.setSerialNumber(limitAccAsgnObj.getSerialNumber());
                        accountAssignment.setQuantity(limitAccAsgnObj.getQuantity());
                        accountAssignment.setPercentage(limitAccAsgnObj.getPercentage());
                        accountAssignment.setAccAsgnTblOrder(limitAccAsgnObj.getLimitAccAsgnTblOrder());
                        accountAssignment.setAsset(limitAccAsgnObj.getAsset());
                        accountAssignment.setCOArea(limitAccAsgnObj.getCOArea());
                        if (!limitAccAsgnObj.getCommitmentItem().isEmpty()) {
                            int comItem = Integer.parseInt(limitAccAsgnObj.getCommitmentItem());
                            System.out.println("comItem :" + comItem);
                            accountAssignment.setCommitmentItem(Integer.toString(comItem));
//                    accountAssignment.setCommitmentItem(limitAccAsgnObj.getCommitmentItem());
                        } else {
                            accountAssignment.setCommitmentItem("");
                        }
//                    accountAssignment.setCommitmentItem(limitAccAsgnObj.getCommitmentItem());
                        accountAssignment.setCostCenter(limitAccAsgnObj.getCostCenter());
                        accountAssignment.setDeliverySchedule(limitAccAsgnObj.getDeliverySchedule());
                        accountAssignment.setDistribution(distribution);
                        accountAssignment.setFunctionalArea(limitAccAsgnObj.getFunctionalArea());
                        accountAssignment.setFund(limitAccAsgnObj.getFund());
                        accountAssignment.setFundCenter(limitAccAsgnObj.getFundCenter());
                        accountAssignment.setGLAccount(limitAccAsgnObj.getGLAccount());
                        accountAssignment.setItemNumber(limitAccAsgnObj.getItemNumber());
                        accountAssignment.setLineItemNumber(lineItemNumber);
                        accountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                        accountAssignment.setNetActNumber(limitAccAsgnObj.getNetActNumber());
//                            accountAssignment.setRecipient(limitAccAsgnObj.getRecipient());
                        accountAssignment.setSalesOrder(limitAccAsgnObj.getSalesOrder());
                        accountAssignment.setCoCode("");
                        accountAssignment.setAccountAssignmentCategory(limitAccAsgnObj.getAccountAssignment());
                        accountAssignment.setDistribution(limitAccAsgnObj.getDistribution());
                        accountAssignment.setWBSElement(limitAccAsgnObj.getWBSElement());
                        accountAssignment.setPrItemNumber(limitAccAsgnObj.getPrItemNumber());
                        accountAssignment.setLinkId(linkid);
//                            accountAssignment.setUnloadingPoint(limitAccAsgnObj.getUnloadingPoint());
//                            accountAssignment.setLinkNumber(limitAccAsgnObj.getLinkNumber());
                        String msg = saveAccountAssignment(accountAssignment);
                        System.out.println("Msg :" + msg);

                        int limitId = limitAccAsgnObj.getId();
                        LimitAccountAssignment obj = getLimitAccountAssignmentById(limitId);
                        obj.setSerialNumber(limitAccAsgnObj.getSerialNumber());

                        updateLimitAccountAssignment(obj);
                    }
                }
            }
        }
        return "Executed";
    }

    String AccountAssignmentType(List<Object> serviceAndLimitAccountAssList, int i, float netValue, float totalNetValue) {
        System.out.println("serviceAndLimitAccountAssList size in AccountAssignmentType :" + serviceAndLimitAccountAssList.size());
        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
            serviceAccAssObj.setNetValaue(new BigDecimal(netValue));
            float quant = netValue / totalNetValue;
            System.out.println("Quant: " + quant);
            System.out.println("netValue: " + netValue);
            System.out.println("totalNetValue: " + totalNetValue);
            serviceAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            serviceAccAssObj.setPercentage(new BigDecimal(percentage));
        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
            limitsAccAssObj.setExpectedvalue(new BigDecimal(netValue));
            float quant = netValue / totalNetValue;
            limitsAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            limitsAccAssObj.setPercentage(new BigDecimal(percentage));
        }

        return "Executed";
    }

    public ServiceAccountAssignment getServiceAccountAssignmenttById(int id) {
        System.out.println("Service Id: " + id);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceAccountAssignmenttById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<ServiceAccountAssignment> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ServiceAccountAssignment>() {
        });
        ServiceAccountAssignment obj = response.getBody();
        return obj;
    }

    String updateServiceAccountAssignment(ServiceAccountAssignment serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateserviceaccountassignment.do"), serviceAccountAssignment, String.class);
        System.out.println("updateServiceAccountAssignment : " + msg);
        return msg;
    }

    public LimitAccountAssignment getLimitAccountAssignmentById(int id) {
        System.out.println("Limit Id: " + id);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getLimitAccountAssignmentById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<LimitAccountAssignment> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<LimitAccountAssignment>() {
        });
        LimitAccountAssignment obj = response.getBody();
        return obj;
    }

    public String updateLimitAccountAssignment(LimitAccountAssignment limitAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatelimitaccountassignment.do"), limitAccountAssignment, String.class);
        System.out.println("updatelimitaccountassignment :" + msg);
        return msg;
    }

    public String LimitAccountAssignmentFunction(String lineItemNumber) {
        System.out.println("lineItemNumber in LimitAccountAssignmentFunction:" + lineItemNumber);
        List<ServiceAccountAssignment> serviceAccAssignmentList = getServiceAccountAssignmentByLineItemNumber(lineItemNumber);
        List<LimitAccountAssignment> limitsAccAsgnList = getLimitAccountAssignmentByLineItemNumber(lineItemNumber);
//
        List<Object> serviceAndLimitAccountAssList = new ArrayList<>();
//
        serviceAndLimitAccountAssList.addAll(serviceAccAssignmentList);
        serviceAndLimitAccountAssList.addAll(limitsAccAsgnList);

        float netValue = 0;
        float totalNetValue = 0;
        for (int i = 0; i <= serviceAndLimitAccountAssList.size(); i++) {
            if (i <= serviceAndLimitAccountAssList.size() - 1) {
                if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                    ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + serviceAccAssObj.getNetValaue().floatValue();
                    System.out.println("Total Net Value in service account assignment  :" + totalNetValue);

                } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                    LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + limitsAccAssObj.getExpectedvalue().floatValue();
                    System.out.println("Total Net Value in limit account assignment :" + totalNetValue);
                }
            }
        }

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            String accountAsgn = "";

            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = serviceAccAssObj.getNetValaue().floatValue();
                accountAsgn = serviceAccAssObj.getAccountAssignment();

            } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = limitsAccAssObj.getExpectedvalue().floatValue();
                accountAsgn = limitsAccAssObj.getAccountAssignment();
            }

            if (null != accountAsgn) {
                switch (accountAsgn) {
                    case "F":
                        System.out.println("serviceAndLimitAccountAssList :" + serviceAndLimitAccountAssList.get(i));
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            limitsAccAssObj.setSerialNumber((i + 1) + "");
                            if (limitsAccAssObj.isIsDelete() != true) {
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "A":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "B":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                         
                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "C":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "D":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "E":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "G":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);

                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "K":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "M":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "N":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "P":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Q":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "R":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "T":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "X":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Z":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = LimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                }
            }
        }

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                if (serviceAccAssObj.isIsDelete() == true) {
                    serviceAndLimitAccountAssList.remove(serviceAccAssObj);

                    int serviceId = serviceAccAssObj.getId();
                    ServiceAccountAssignment obj = getServiceAccountAssignmenttById(serviceId);
                    obj.setSerialNumber(serviceAccAssObj.getSerialNumber());

                    updateServiceAccountAssignment(obj);
                }
            } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                if (limitsAccAssObj.isIsDelete() == true) {
                    serviceAndLimitAccountAssList.remove(limitsAccAssObj);

                    int limitId = limitsAccAssObj.getId();
                    LimitAccountAssignment obj = getLimitAccountAssignmentById(limitId);
                    obj.setSerialNumber(limitsAccAssObj.getSerialNumber());

                    updateLimitAccountAssignment(obj);
                }
            }
        }
        System.out.println("Total Net Value :" + totalNetValue);
        System.out.println("Net Value :" + netValue);
        System.out.println("accAssignmentList before saving :" + serviceAndLimitAccountAssList.size());

        List<AccountAssignment> AcccountAsgnList = getAccountAssignmentByLineItemNumber(lineItemNumber);
        System.out.println("AcccountAsgnList Size :" + AcccountAsgnList.size());

        if (!AcccountAsgnList.isEmpty()) {
            deleteAllFromAccountAssignment(AcccountAsgnList);
            System.out.println("Delete List in accAssignmentList :");
        }

        if (!serviceAndLimitAccountAssList.isEmpty()) {
            for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
                if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                    ServiceAccountAssignment serviceAccAsgnObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    System.out.println("Commitment Item in Limit :" + serviceAccAsgnObj.getCommitmentItem());

                    accountAssignment.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
                    accountAssignment.setQuantity(serviceAccAsgnObj.getQuantity());
                    accountAssignment.setPercentage(serviceAccAsgnObj.getPercentage());
                    accountAssignment.setAccAsgnTblOrder(serviceAccAsgnObj.getAccAsngOrder());
                    accountAssignment.setAsset(serviceAccAsgnObj.getAsset());
                    accountAssignment.setCOArea(serviceAccAsgnObj.getCOArea());
                    if (!serviceAccAsgnObj.getCommitmentItem().isEmpty()) {
                        int comItem = Integer.parseInt(serviceAccAsgnObj.getCommitmentItem());
                        System.out.println("comItem :" + comItem);
                        accountAssignment.setCommitmentItem(Integer.toString(comItem));
                    }
                    accountAssignment.setCostCenter(serviceAccAsgnObj.getCostCenter());
                    accountAssignment.setDeliverySchedule(serviceAccAsgnObj.getDeliverySchedule());
                    accountAssignment.setDistribution("2");
                    accountAssignment.setFunctionalArea(serviceAccAsgnObj.getFunctionalArea());
                    accountAssignment.setFund(serviceAccAsgnObj.getFund());
                    accountAssignment.setFundCenter(serviceAccAsgnObj.getFundCenter());
                    accountAssignment.setGLAccount(serviceAccAsgnObj.getGLAccount());
                    accountAssignment.setItemNumber(serviceAccAsgnObj.getItemNumber());
                    accountAssignment.setLineItemNumber(lineItemNumber);
                    accountAssignment.setNetActNumber(serviceAccAsgnObj.getNetActNumber());
                    accountAssignment.setRecipient(serviceAccAsgnObj.getRecipient());
                    accountAssignment.setSalesOrder(serviceAccAsgnObj.getSalesOrder());
                    accountAssignment.setUnloadingPoint(serviceAccAsgnObj.getUnloadingPoint());
                    accountAssignment.setLinkNumber(serviceAccAsgnObj.getLinkNumber());
                    accountAssignment.setCoCode("");
                    accountAssignment.setAccountAssignmentCategory(serviceAccAsgnObj.getAccountAssignment());
                    accountAssignment.setDistribution(serviceAccAsgnObj.getDistribution());
                    accountAssignment.setWBSElement(serviceAccAsgnObj.getWBSElement());
                    accountAssignment.setPrItemNumber(serviceAccAsgnObj.getPrItemNumber());

                    String msg = saveAccountAssignment(accountAssignment);
                    System.out.println("Msg :" + msg);

                    int serviceId = serviceAccAsgnObj.getId();
                    ServiceAccountAssignment obj = getServiceAccountAssignmenttById(serviceId);
                    obj.setSerialNumber(serviceAccAsgnObj.getSerialNumber());

                    updateServiceAccountAssignment(obj);

                } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                    LimitAccountAssignment limitAccAsgnObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);

                    String distribution = limitAccAsgnObj.getDistribution();

                    accountAssignment.setSerialNumber(limitAccAsgnObj.getSerialNumber());
                    accountAssignment.setQuantity(limitAccAsgnObj.getQuantity());
                    accountAssignment.setPercentage(limitAccAsgnObj.getPercentage());
                    accountAssignment.setAccAsgnTblOrder(limitAccAsgnObj.getLimitAccAsgnTblOrder());
                    accountAssignment.setAsset(limitAccAsgnObj.getAsset());
                    accountAssignment.setCOArea(limitAccAsgnObj.getCOArea());
                    if (!limitAccAsgnObj.getCommitmentItem().isEmpty()) {
                        int comItem = Integer.parseInt(limitAccAsgnObj.getCommitmentItem());
                        System.out.println("comItem :" + comItem);
                        accountAssignment.setCommitmentItem(Integer.toString(comItem));
                    }
                    accountAssignment.setCostCenter(limitAccAsgnObj.getCostCenter());
                    accountAssignment.setDeliverySchedule(limitAccAsgnObj.getDeliverySchedule());
                    accountAssignment.setDistribution(distribution);
                    accountAssignment.setFunctionalArea(limitAccAsgnObj.getFunctionalArea());
                    accountAssignment.setFund(limitAccAsgnObj.getFund());
                    accountAssignment.setFundCenter(limitAccAsgnObj.getFundCenter());
                    accountAssignment.setGLAccount(limitAccAsgnObj.getGLAccount());
                    accountAssignment.setItemNumber(limitAccAsgnObj.getItemNumber());
                    accountAssignment.setLineItemNumber(lineItemNumber);
//                            accountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                    accountAssignment.setNetActNumber(limitAccAsgnObj.getNetActNumber());
//                            accountAssignment.setRecipient(limitAccAsgnObj.getRecipient());
                    accountAssignment.setSalesOrder(limitAccAsgnObj.getSalesOrder());
                    accountAssignment.setCoCode("");
                    accountAssignment.setAccountAssignmentCategory(limitAccAsgnObj.getAccountAssignment());
                    accountAssignment.setDistribution(limitAccAsgnObj.getDistribution());
                    accountAssignment.setWBSElement(limitAccAsgnObj.getWBSElement());
                    accountAssignment.setPrItemNumber(limitAccAsgnObj.getPrItemNumber());
//                            accountAssignment.setUnloadingPoint(limitAccAsgnObj.getUnloadingPoint());
//                            accountAssignment.setLinkNumber(limitAccAsgnObj.getLinkNumber());
                    String msg = saveAccountAssignment(accountAssignment);
                    System.out.println("Msg :" + msg);

                    int limitId = limitAccAsgnObj.getId();
                    LimitAccountAssignment obj = getLimitAccountAssignmentById(limitId);
                    obj.setSerialNumber(limitAccAsgnObj.getSerialNumber());

                    updateLimitAccountAssignment(obj);
                }
            }
        }
        return "Executed";
    }

    String LimitAccountAssignmentType(List<Object> serviceAndLimitAccountAssList, int i, float netValue, float totalNetValue) {
        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
            serviceAccAssObj.setNetValaue(new BigDecimal(netValue));
            float quant = netValue / totalNetValue;
            serviceAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            serviceAccAssObj.setPercentage(new BigDecimal(percentage));
        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
            limitsAccAssObj.setExpectedvalue(new BigDecimal(netValue));
            float quant = netValue / totalNetValue;
            limitsAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            limitsAccAssObj.setPercentage(new BigDecimal(percentage));
        }

        return "Executed";
    }

    public String StandAloneLimitAccountAssignmentFunction(String linkid) {
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> serviceAccAssignmentList = getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkId(linkid);
        List<NGBPCmplxPOCreationLimitsAccountAssignment> limitsAccAsgnList = getLimitAccountAssignemntByLinkId(linkid);
//
        List<Object> serviceAndLimitAccountAssList = new ArrayList<>();
//
        serviceAndLimitAccountAssList.addAll(serviceAccAssignmentList);
        serviceAndLimitAccountAssList.addAll(limitsAccAsgnList);

        System.out.println("serviceAndLimitAccountAssList Size :" + serviceAndLimitAccountAssList.size());
        float netValue = 0;
        float totalNetValue = 0;
        for (int i = 0; i <= serviceAndLimitAccountAssList.size(); i++) {
            if (i <= serviceAndLimitAccountAssList.size() - 1) {
                if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + serviceAccAssObj.getNetPrice().floatValue();
                    System.out.println("Total Net Value in service standalone:" + totalNetValue);

                } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                    NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + limitsAccAssObj.getExpectedvalue().floatValue();
                    System.out.println("Total Net Value in limit standalone :" + totalNetValue);
                }
            }
        }

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            String accountAsgn = "";

            if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                netValue = serviceAccAssObj.getNetPrice().floatValue();
                accountAsgn = serviceAccAssObj.getAccountAssignment();

            } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = limitsAccAssObj.getExpectedvalue().floatValue();
                accountAsgn = limitsAccAssObj.getAccountAssignment();
            }

            if (null != accountAsgn) {
                switch (accountAsgn) {
                    case "F":
                        System.out.println("serviceAndLimitAccountAssList in stand alone :" + serviceAndLimitAccountAssList.get(i));
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg in stand alone ::" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg in else stand alone:" + msg);
                            }
                        }
                        break;
                    case "A":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())
                                                && (iServiceAccAssObj.getAccAsset()).equals(qServiceAccAssObj.getAccAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAccAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAccAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "B":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                         
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "C":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "D":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "E":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "G":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);

                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);

                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "K":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "M":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "N":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetwork())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetwork())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "P":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetwork())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetPrice()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetwork())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Q":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "R":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "T":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetwork())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetwork())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "X":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Z":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);

                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                            NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                }
                                String msg = StandAloneLimitAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                }
            }
        }

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                if (serviceAccAssObj.isIsDelete() == true) {
                    serviceAndLimitAccountAssList.remove(serviceAccAssObj);
                    long id = serviceAccAssObj.getInsertionOrderId();
                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccObj = getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesById(id);
                    serviceAccObj.setSerialNumber(serviceAccAssObj.getSerialNumber());
                    updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(serviceAccObj);
                }
            } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                if (limitsAccAssObj.isIsDelete() == true) {
                    serviceAndLimitAccountAssList.remove(limitsAccAssObj);
                    int id = limitsAccAssObj.getId();
                    NGBPCmplxPOCreationLimitsAccountAssignment limitObj = getNGBPCmplxPOCreationLimitsAccountAssignmentById(id);
                    limitObj.setSerialNumber(limitsAccAssObj.getSerialNumber());
                    updateNGBPCmplxPOCreationLimitsAccountAssignment(limitObj);
                }
            }
        }
        System.out.println("Total Net Value  on save:" + totalNetValue);
        System.out.println("Net Value on save:" + netValue);
        System.out.println("accAssignmentList before saving :" + serviceAndLimitAccountAssList.size());
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> AcccountAsgnList = getAccountAssignmentByLinkId(linkid);
        System.out.println("AcccountAsgnList Size :" + AcccountAsgnList.size());
        if (!AcccountAsgnList.isEmpty()) {
            deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignment(AcccountAsgnList);
            System.out.println("Delete List in accAssignmentList :");
        }
        if (!serviceAndLimitAccountAssList.isEmpty()) {
            for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
                if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAsgnObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                    System.out.println("Commitment Item in Limit :" + serviceAccAsgnObj.getCommitmentItem());

                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setQuantity(serviceAccAsgnObj.getQuantity());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setPercentage(serviceAccAsgnObj.getPercentage());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccOrder(serviceAccAsgnObj.getAccOrder());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setAsset(serviceAccAsgnObj.getAccAsset());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoArea(serviceAccAsgnObj.getCoArea());
                    if (!serviceAccAsgnObj.getCommitmentItem().isEmpty()) {
                        int comItem = Integer.parseInt(serviceAccAsgnObj.getCommitmentItem());
                        System.out.println("comItem :" + comItem);
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                    }
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setCostCenter(serviceAccAsgnObj.getCostCenter());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setDeliverySchedule(serviceAccAsgnObj.getDeliverySchedule());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution("2");
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setFunctionalArea(serviceAccAsgnObj.getFunctionalArea());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setFund(serviceAccAsgnObj.getFund());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setFundsCentre(serviceAccAsgnObj.getFundsCentre());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setGlAccount(serviceAccAsgnObj.getGlAccount());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setItemNumber(serviceAccAsgnObj.getItemNumber());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setLineItemNumber(lineItemNumber);
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setNetwork(serviceAccAsgnObj.getNetwork());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setRecipient(serviceAccAsgnObj.getRecipient());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setSalesOrder(serviceAccAsgnObj.getSalesOrder());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setUnloadingPoint(serviceAccAsgnObj.getUnloadingPoint());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setLinkNumber(serviceAccAsgnObj.getLinkNumber());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoCode("");
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccountAssignmentCategory(serviceAccAsgnObj.getAccountAssignment());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(serviceAccAsgnObj.getDistribution());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setWbsElement(serviceAccAsgnObj.getAccWBSElement());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setLinkID(serviceAccAsgnObj.getLinkID());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setPrItemNumber(serviceAccAsgnObj.getPrItemNumber());
//asdfg
                    String msg = saveNGBPCmplxPOCreationLineItemPOAccountAssignment(nGBPCmplxPOCreationLineItemPOAccountAssignment);
                    System.out.println("Msg :" + msg);
                    long id = serviceAccAsgnObj.getInsertionOrderId();
                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccObj = getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesById(id);
                    serviceAccObj.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
                    updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(serviceAccObj);

                } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                    NGBPCmplxPOCreationLimitsAccountAssignment limitAccAsgnObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);

                    String distribution = limitAccAsgnObj.getDistribution();

                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setSerialNumber(limitAccAsgnObj.getSerialNumber());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setQuantity(limitAccAsgnObj.getQuantity());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setPercentage(limitAccAsgnObj.getPercentage());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccOrder(limitAccAsgnObj.getLimitAccAsgnTblOrder());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setAsset(limitAccAsgnObj.getAsset());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoArea(limitAccAsgnObj.getCoArea());
                    if (!limitAccAsgnObj.getCommitmentItem().isEmpty()) {
                        int comItem = Integer.parseInt(limitAccAsgnObj.getCommitmentItem());
                        System.out.println("comItem :" + comItem);
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                    }
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setCostCenter(limitAccAsgnObj.getCostCenter());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setDeliverySchedule(limitAccAsgnObj.getDeliverySchedule());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(distribution);
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setFunctionalArea(limitAccAsgnObj.getFunctionalArea());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setFund(limitAccAsgnObj.getFund());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setFundsCentre(limitAccAsgnObj.getFundCenter());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setGlAccount(limitAccAsgnObj.getGlAccount());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setItemNumber(limitAccAsgnObj.getItemNumber());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setLineItemNumber(lineItemNumber);
//                            accountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setNetwork(limitAccAsgnObj.getNetActNumber());
//                            accountAssignment.setRecipient(limitAccAsgnObj.getRecipient());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setSalesOrder(limitAccAsgnObj.getSalesOrder());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoCode("");
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccountAssignmentCategory(limitAccAsgnObj.getAccountAssignment());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(limitAccAsgnObj.getDistribution());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setWbsElement(limitAccAsgnObj.getWbsElement());
                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setLinkID(limitAccAsgnObj.getLinkId());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setSerialNumber(limitAccAsgnObj.getSerialNumber());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setPrItemNumber(limitAccAsgnObj.getPrItemNumber());
//                            accountAssignment.setUnloadingPoint(limitAccAsgnObj.getUnloadingPoint());
//                            accountAssignment.setLinkNumber(limitAccAsgnObj.getLinkNumber());
                    String msg = saveNGBPCmplxPOCreationLineItemPOAccountAssignment(nGBPCmplxPOCreationLineItemPOAccountAssignment);
                    System.out.println("Msg :" + msg);

                    int id = limitAccAsgnObj.getId();
                    NGBPCmplxPOCreationLimitsAccountAssignment limitObj = getNGBPCmplxPOCreationLimitsAccountAssignmentById(id);
                    limitObj.setSerialNumber(limitAccAsgnObj.getSerialNumber());
                    updateNGBPCmplxPOCreationLimitsAccountAssignment(limitObj);

                }
            }
        }
        return "Executed";
    }

    String StandAloneLimitAccountAssignmentType(List<Object> serviceAndLimitAccountAssList, int i, float netValue, float totalNetValue) {
        System.out.println("Inside StandAloneLimitAccountAssignmentType");
        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
            serviceAccAssObj.setNetPrice(new BigDecimal(netValue));

            float quant = netValue / totalNetValue;
            serviceAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            serviceAccAssObj.setPercentage(new BigDecimal(percentage));
            System.out.println("Quant in StandAloneLimitAccountAssignmentType service: " + quant);
            System.out.println("netValue in StandAloneLimitAccountAssignmentType service: " + netValue);
            System.out.println("totalNetValue in StandAloneLimitAccountAssignmentType service: " + totalNetValue);

        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
            limitsAccAssObj.setExpectedvalue(new BigDecimal(netValue));
            float quant = netValue / totalNetValue;
            limitsAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            limitsAccAssObj.setPercentage(new BigDecimal(percentage));

            System.out.println("Quant in StandAloneLimitAccountAssignmentType limit: " + quant);
            System.out.println("netValue in StandAloneLimitAccountAssignmentType limit: " + netValue);
            System.out.println("totalNetValue in StandAloneLimitAccountAssignmentType limit: " + totalNetValue);
        }
        return "Executed";
    }

    List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkId(String linkid) {
        System.out.println("getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgn = response.getBody();
        return accAsgn;
    }

    public List<NGBPCmplxPOCreationLimitsAccountAssignment> getLimitAccountAssignemntByLinkId(String linkid) {
        System.out.println("getLimitAccountAssignemntByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLimitsAccountAssignmentByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLimitsAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLimitsAccountAssignment>>() {
        });
        List<NGBPCmplxPOCreationLimitsAccountAssignment> condition = response.getBody();
        return condition;
    }

    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesById(long id) {
        System.out.println("getAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>() {
        });
        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues accAsgn = response.getBody();
        return accAsgn;
    }

    String updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues.do"), serviceAccountAssignment, String.class);
        System.out.println("updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues : " + msg);
        return msg;
    }

    NGBPCmplxPOCreationLimitsAccountAssignment getNGBPCmplxPOCreationLimitsAccountAssignmentById(int id) {
        System.out.println("getAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLimitsAccountAssignmentById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<NGBPCmplxPOCreationLimitsAccountAssignment> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NGBPCmplxPOCreationLimitsAccountAssignment>() {
        });
        NGBPCmplxPOCreationLimitsAccountAssignment accAsgn = response.getBody();
        return accAsgn;
    }

    String updateNGBPCmplxPOCreationLimitsAccountAssignment(NGBPCmplxPOCreationLimitsAccountAssignment limitAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLimitsAccountAssignment.do"), limitAccountAssignment, String.class);
        System.out.println("updatelimitaccountassignment :" + msg);
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

    public String deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignment(List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accAsgnList) {
        System.out.println("accAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignment.do?accAsgnList=" + accAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accAsgnList, String.class);
        return result;
    }

    String saveNGBPCmplxPOCreationLineItemPOAccountAssignment(NGBPCmplxPOCreationLineItemPOAccountAssignment serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemPOAccountAssignment.do"), serviceAccountAssignment, String.class);
        System.out.println("saveNGBPCmplxPOCreationLineItemPOAccountAssignment msg : " + msg);
        return msg;
    }

    public String ServiceStandAloneAccountAssignmentFunction(String linkid) {
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAssignmentList = getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkId(linkid);
        List<NGBPCmplxPOCreationLimitsAccountAssignment> limitsAccAsgnList = getLimitAccountAssignemntByLinkId(linkid);

        List<Object> serviceAndLimitAccountAssList = new ArrayList<>();

        serviceAndLimitAccountAssList.addAll(accAssignmentList);
        serviceAndLimitAccountAssList.addAll(limitsAccAsgnList);
        float netValue = 0;
        float totalNetValue = 0;
        System.out.println("accAssignmentList Size : " + accAssignmentList.size());
        for (int i = 0; i <= serviceAndLimitAccountAssList.size(); i++) {
            if (i <= serviceAndLimitAccountAssList.size() - 1) {
                if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + serviceAccAssObj.getNetPrice().floatValue();
                    System.out.println("Total Net Value in stand alone:" + totalNetValue);

                } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                    NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + limitsAccAssObj.getExpectedvalue().floatValue();
                    System.out.println("Total Net Value on limit in stand alone :" + totalNetValue);
                }
            }
        }
        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            String accountAsgn = "";
            if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                netValue = serviceAccAssObj.getNetPrice().floatValue();
                accountAsgn = serviceAccAssObj.getAccountAssignment();

            } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = limitsAccAssObj.getExpectedvalue().floatValue();
                accountAsgn = limitsAccAssObj.getAccountAssignment();
            }
            System.out.println("netValue in AccountAssignment F :" + netValue);
            if (null != accountAsgn) {
                switch (accountAsgn) {
                    case "F":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "A":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())
                                                && (iServiceAccAssObj.getAccAsset()).equals(qServiceAccAssObj.getAccAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAccAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAccAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }

                        break;
                    case "B":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "C":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
//                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "D":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "E":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i + 1);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "G":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "K":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "M":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "N":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetwork())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetwork())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "P":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getNetPrice()).equals(qServiceAccAssObj.getNetPrice())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetwork())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Q":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "R":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "T":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetwork()).equals(qServiceAccAssObj.getNetwork())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetwork())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "X":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getWbsElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())
                                                && (iServiceAccAssObj.getAccWBSElement()).equals(qServiceAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getWbsElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())
                                                && (iLimitsAccAssObj.getWbsElement()).equals(qLimitsAccAssObj.getAccWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Z":
                        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues iServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qServiceAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qServiceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGlAccount()).equals(qServiceAccAssObj.getGlAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccOrder()).equals(qServiceAccAssObj.getAccOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetPrice().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    NGBPCmplxPOCreationLimitsAccountAssignment iLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                                        NGBPCmplxPOCreationLimitsAccountAssignment qLimitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues qLimitsAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGlAccount()).equals(qLimitsAccAssObj.getGlAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetPrice().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
//                                          
                                }
                                String msg = StandAloneAccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                }
            }
        }
        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                if (serviceAccAssObj.isIsDelete() == true) {
//                    serviceAndLimitAccountAssList.remove(serviceAccAssObj);
//                    updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(serviceAccAssObj);
                    long id = serviceAccAssObj.getInsertionOrderId();
                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccObj = getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesById(id);
                    serviceAccObj.setSerialNumber(serviceAccAssObj.getSerialNumber());
                    updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(serviceAccObj);
                }
            } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
                if (limitsAccAssObj.isIsDelete() == true) {
//                    serviceAndLimitAccountAssList.remove(limitsAccAssObj);
//                    updateNGBPCmplxPOCreationLimitsAccountAssignment(limitsAccAssObj);
                    int id = limitsAccAssObj.getId();
                    NGBPCmplxPOCreationLimitsAccountAssignment limitObj = getNGBPCmplxPOCreationLimitsAccountAssignmentById(id);
                    limitObj.setSerialNumber(limitsAccAssObj.getSerialNumber());
                    updateNGBPCmplxPOCreationLimitsAccountAssignment(limitObj);
                }
            }
        }
        System.out.println("Total Net Value :" + totalNetValue);
        System.out.println("Net Value :" + netValue);
        System.out.println("LinkId in  :" + linkid);

        System.out.println("accAssignmentList before saving :" + accAssignmentList.size());
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> AcccountAsgnList = getAccountAssignmentByLinkId(linkid);
        System.out.println("AcccountAsgnList Size in stand alone :" + AcccountAsgnList.size());
        
        String oldAccAssPrItemNo = null;
        NGBPCmplxPOCreationLineItemPO oldAccAssLineItemPoRef = null;
        if (!AcccountAsgnList.isEmpty()) {
//            deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignment(AcccountAsgnList);
            for (NGBPCmplxPOCreationLineItemPOAccountAssignment assignment : AcccountAsgnList) {
                oldAccAssPrItemNo = assignment.getPrItemNumber(); // Added by nikhil on 05032021
                oldAccAssLineItemPoRef = assignment.getPoCreationLineItemPO(); // Added by nikhil on 05032021
                
                assignment.setLinkID("");
                updateNGBPCmplxPOCreationLineItemPOAccountAssignment(assignment);
            }
            System.out.println("Delete List in stand alone accAssignmentList :");
            System.out.println("oldAccAssPrItemNo: " + oldAccAssPrItemNo);
        }
        if (!serviceAndLimitAccountAssList.isEmpty()) {
            for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
                if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
                    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAsgnObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);
                    String distribution = null;
                    if (serviceAccAsgnObj.isIsDelete() == false) {

                        switch (serviceAccAsgnObj.getDistribution()) {
                            case "Distrib. On Quantity Basis":
                                distribution = "1";
                                break;
                            case "Distrib. By Percentage":
                                distribution = "2";
                                break;
                            case "Single Account Assignment":
                                distribution = "";
                                break;
                        }
                        System.out.println("Quantity in service :" + serviceAccAsgnObj.getQuantity());
                        System.out.println("Commitment Item in Service :" + serviceAccAsgnObj.getCommitmentItem());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setQuantity(serviceAccAsgnObj.getQuantity());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setPercentage(serviceAccAsgnObj.getPercentage());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccOrder(serviceAccAsgnObj.getAccOrder());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setAsset(serviceAccAsgnObj.getAccAsset());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoArea(serviceAccAsgnObj.getCoArea());
                        if (!serviceAccAsgnObj.getCommitmentItem().isEmpty()) {
                            int comItem = Integer.parseInt(serviceAccAsgnObj.getCommitmentItem());
                            System.out.println("comItem :" + comItem);
                            nGBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem(Integer.toString(comItem));
//                    accountAssignment.setCommitmentItem(serviceAccAsgnObj.getCommitmentItem());
                        } else {
                            nGBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem("");
                        }
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCostCenter(serviceAccAsgnObj.getCostCenter());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setDeliverySchedule(serviceAccAsgnObj.getDeliverySchedule());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(distribution);
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setFunctionalArea(serviceAccAsgnObj.getFunctionalArea());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setFund(serviceAccAsgnObj.getFund());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setFundsCentre(serviceAccAsgnObj.getFundsCentre());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setGlAccount(serviceAccAsgnObj.getGlAccount());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setItemNumber(serviceAccAsgnObj.getItemNumber());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setLineItemNumber(lineItemNumber);
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setNetwork(serviceAccAsgnObj.getNetwork());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setRecipient(serviceAccAsgnObj.getRecipient());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setSalesOrder(serviceAccAsgnObj.getSalesOrder());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setUnloadingPoint(serviceAccAsgnObj.getUnloadingPoint());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setLinkNumber(serviceAccAsgnObj.getLinkNumber());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoCode("");
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccountAssignmentCategory(serviceAccAsgnObj.getAccountAssignment());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(serviceAccAsgnObj.getDistribution());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setWbsElement(serviceAccAsgnObj.getAccWBSElement());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setLinkID(serviceAccAsgnObj.getLinkID());
//                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
//                    accountAssignment.setPrItemNumber(serviceAccAsgnObj.getPrItemNumber());
                        
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setPrItemNumber(oldAccAssPrItemNo); // Added by nikhil on 05032021
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setPoCreationLineItemPO(oldAccAssLineItemPoRef); // Added by nikhil on 05032021
                        
                        String msg = saveNGBPCmplxPOCreationLineItemPOAccountAssignment(nGBPCmplxPOCreationLineItemPOAccountAssignment);
                        System.out.println("Msg :" + msg);
                        long id = serviceAccAsgnObj.getInsertionOrderId();
                        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccObj = getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesById(id);
                        serviceAccObj.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
                        updateNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(serviceAccObj);
                    }

                } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
                    NGBPCmplxPOCreationLimitsAccountAssignment limitAccAsgnObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);

                    String distribution = limitAccAsgnObj.getDistribution();
                    if (limitAccAsgnObj.isIsDelete() == true) {

                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setSerialNumber(limitAccAsgnObj.getSerialNumber());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setQuantity(limitAccAsgnObj.getQuantity());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setPercentage(limitAccAsgnObj.getPercentage());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccOrder(limitAccAsgnObj.getLimitAccAsgnTblOrder());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setAsset(limitAccAsgnObj.getAsset());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoArea(limitAccAsgnObj.getCoArea());
                        if (!limitAccAsgnObj.getCommitmentItem().isEmpty()) {
                            int comItem = Integer.parseInt(limitAccAsgnObj.getCommitmentItem());
                            System.out.println("comItem :" + comItem);
                            nGBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem(Integer.toString(comItem));
//                    accountAssignment.setCommitmentItem(limitAccAsgnObj.getCommitmentItem());
                        } else {
                            nGBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem("");
                        }
//                    accountAssignment.setCommitmentItem(limitAccAsgnObj.getCommitmentItem());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCostCenter(limitAccAsgnObj.getCostCenter());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setDeliverySchedule(limitAccAsgnObj.getDeliverySchedule());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(distribution);
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setFunctionalArea(limitAccAsgnObj.getFunctionalArea());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setFund(limitAccAsgnObj.getFund());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setFundsCentre(limitAccAsgnObj.getFundCenter());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setGlAccount(limitAccAsgnObj.getGlAccount());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setItemNumber(limitAccAsgnObj.getItemNumber());
//                    accountAssignment.setLineItemNumber(lineItemNumber);
//                    accountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setNetwork(limitAccAsgnObj.getNetActNumber());
//                            accountAssignment.setRecipient(limitAccAsgnObj.getRecipient());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setSalesOrder(limitAccAsgnObj.getSalesOrder());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setCoCode("");
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setAccountAssignmentCategory(limitAccAsgnObj.getAccountAssignment());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(limitAccAsgnObj.getDistribution());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setWbsElement(limitAccAsgnObj.getWbsElement());
                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setLinkID(limitAccAsgnObj.getLinkId());
//                        nGBPCmplxPOCreationLineItemPOAccountAssignment.setSerialNumber(limitAccAsgnObj.getSerialNumber());
//                    nGBPCmplxPOCreationLineItemPOAccountAssignment.setPrItemNumber(limitAccAsgnObj.getPrItemNumber());
//                            accountAssignment.setUnloadingPoint(limitAccAsgnObj.getUnloadingPoint());
//                            accountAssignment.setLinkNumber(limitAccAsgnObj.getLinkNumber());
                        String msg = saveNGBPCmplxPOCreationLineItemPOAccountAssignment(nGBPCmplxPOCreationLineItemPOAccountAssignment);
                        System.out.println("Msg :" + msg);

//                    updateNGBPCmplxPOCreationLimitsAccountAssignment(limitAccAsgnObj);
                        int id = limitAccAsgnObj.getId();
                        NGBPCmplxPOCreationLimitsAccountAssignment limitObj = getNGBPCmplxPOCreationLimitsAccountAssignmentById(id);
                        limitObj.setSerialNumber(limitAccAsgnObj.getSerialNumber());
                        updateNGBPCmplxPOCreationLimitsAccountAssignment(limitObj);
                    }
                }
            }
        }
        return "Executed";
    }

    String StandAloneAccountAssignmentType(List<Object> serviceAndLimitAccountAssList, int i, float netValue, float totalNetValue) {
        if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) {
            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccAssObj = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) serviceAndLimitAccountAssList.get(i);

            serviceAccAssObj.setNetPrice(new BigDecimal(netValue));
            float quant = netValue / totalNetValue;
            System.out.println("Quant: " + quant);
            System.out.println("netValue: " + netValue);
            System.out.println("totalNetValue: " + totalNetValue);
            serviceAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            serviceAccAssObj.setPercentage(new BigDecimal(percentage));

        } else if (serviceAndLimitAccountAssList.get(i) instanceof NGBPCmplxPOCreationLimitsAccountAssignment) {
            NGBPCmplxPOCreationLimitsAccountAssignment limitsAccAssObj = (NGBPCmplxPOCreationLimitsAccountAssignment) serviceAndLimitAccountAssList.get(i);
            limitsAccAssObj.setExpectedvalue(new BigDecimal(netValue));
            float quant = netValue / totalNetValue;
            limitsAccAssObj.setQuantity(new BigDecimal(quant));
            float percentage = quant * 100;
            limitsAccAssObj.setPercentage(new BigDecimal(percentage));
        }
        return "Executed";
    }

    String updateNGBPCmplxPOCreationLineItemPOAccountAssignment(NGBPCmplxPOCreationLineItemPOAccountAssignment accountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemPOAccountAssignment.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), accountAssignment, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemPOAccountAssignment: " + msg);
        return msg;
    }

    public List<Services> getServicesByLinkId(String linkId) {
        System.out.println("getServicesByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getPrServicesByLinkId.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<Services>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Services>>() {
        });
        List<Services> list = response.getBody();
        return list;
    }

    public List<AccountAssignment> getPrAccountAssignmentByLinkId(String linkID) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getPrAccountAssignmentByLinkId.do?linkID=" + linkID;
        System.out.println("url: " + url);
        ResponseEntity<List<AccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignment>>() {
        });
        List<AccountAssignment> accAsgnList = response.getBody();
        return accAsgnList;
    }

    public String ServiceAccountAssignmentFunctionForEditPO(String lineItemNumber, String linkid, String serviceLineItemNumber, String PoFrom) {
        List<ServiceAccountAssignment> accAssignmentList = getServiceAccountAssignmentByLineItemNumberNonDeleted(lineItemNumber);
        System.out.println("accAssignmentList Non Deleted :::" + accAssignmentList.size());
        List<LimitAccountAssignment> limitsAccAsgnList = getLimitAccountAssignmentByLineItemNumber(lineItemNumber);

        List<Object> serviceAndLimitAccountAssList = new ArrayList<>();

        serviceAndLimitAccountAssList.addAll(accAssignmentList);
        serviceAndLimitAccountAssList.addAll(limitsAccAsgnList);
        String isDeleteFlag = null;
        float netValue = 0;
        float totalNetValue = 0;
        System.out.println("accAssignmentList Size : " + accAssignmentList.size());
        for (int i = 0; i <= serviceAndLimitAccountAssList.size(); i++) {
            if (i <= serviceAndLimitAccountAssList.size() - 1) {
                if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                    ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + serviceAccAssObj.getNetValaue().floatValue();
                    System.out.println("Total Net Value :" + totalNetValue);

                } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                    LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    totalNetValue = totalNetValue + limitsAccAssObj.getExpectedvalue().floatValue();
                    System.out.println("Total Net Value :" + totalNetValue);
                }
            }
        }
        System.out.println("TotalNetValue :" + totalNetValue);

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            String accountAsgn = "";
            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = serviceAccAssObj.getNetValaue().floatValue();
                accountAsgn = serviceAccAssObj.getAccountAssignment();
            } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                netValue = limitsAccAssObj.getExpectedvalue().floatValue();
                accountAsgn = limitsAccAssObj.getAccountAssignment();
            }
            System.out.println("netValue in AccountAssignment F :" + netValue);
            if (null != accountAsgn) {
                switch (accountAsgn) {
                    case "F":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "A":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "B":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qServiceAccAssObj.isIsDelete() != true) {
                                            if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                                netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                                qServiceAccAssObj.setIsDelete(true);
                                                qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qServiceAccAssObj.isIsDelete() != true) {
                                            serviceAccAssObj.setSerialNumber((i + 1) + "");
                                            if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                                netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                                qServiceAccAssObj.setIsDelete(true);
                                                qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qLimitsAccAssObj.isIsDelete() != true) {
                                            if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                                netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                                accAssignmentList.get(q).setIsDelete(true);
                                                qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qLimitsAccAssObj.isIsDelete() != true) {
                                            limitsAccAssObj.setSerialNumber((i + 1) + "");
                                            if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                                netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                                qLimitsAccAssObj.setIsDelete(true);
                                                qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "C":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "D":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "E":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i + 1);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "G":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "K":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            System.out.println("netValue in ServiceAccountAssignment K :" + netValue + " ,i:" + i + ",Q :" + q);
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                System.out.println("netValue after loop exe:" + netValue);
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "M":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "N":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "P":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Q":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "R":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "T":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                && (iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                && (iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                && (iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                && (iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "X":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                && (iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                && (iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "Z":
                        if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qServiceAccAssObj.getNetValaue().floatValue();
                                            qServiceAccAssObj.setIsDelete(true);
                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
                                            qLimitsAccAssObj.setIsDelete(true);
                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                }
            }
//                    }
        }
        System.out.println("serviceAndLimitAccountAssList size after all Acc Asgn :" + serviceAndLimitAccountAssList.size());

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                System.out.println("Quantity in after calculation :" + serviceAccAssObj.getQuantity());
                System.out.println("isIsDelete in after calculation :" + serviceAccAssObj.isIsDelete());
            }
        }

        for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
            if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                System.out.println("isIsDelete in after calculation in loop:" + serviceAccAssObj.isIsDelete());
                if (serviceAccAssObj.isIsDelete() == true) {
//                    serviceAndLimitAccountAssList.remove(serviceAccAssObj);
                    System.out.println("size in after after remove true object" + i + ":" + serviceAndLimitAccountAssList.size());
                    int serviceId = serviceAccAssObj.getId();
                    ServiceAccountAssignment obj = getServiceAccountAssignmenttById(serviceId);
                    obj.setSerialNumber(serviceAccAssObj.getSerialNumber());
                    updateServiceAccountAssignment(obj);
                }
            } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);
                if (limitsAccAssObj.isIsDelete() == true) {
//                    serviceAndLimitAccountAssList.remove(limitsAccAssObj);
                    int limitId = limitsAccAssObj.getId();
                    LimitAccountAssignment obj = getLimitAccountAssignmentById(limitId);
                    obj.setSerialNumber(limitsAccAssObj.getSerialNumber());
                    updateLimitAccountAssignment(obj);
                }
            }
            System.out.println("i in loop after delete :" + i);
        }
        System.out.println("Total Net Value ====:" + totalNetValue);
        System.out.println("Net Value ======:" + netValue);
        System.out.println("LinkId in  ======:" + linkid);

        System.out.println("accAssignmentList before saving :" + serviceAndLimitAccountAssList.size());
        List<AccountAssignment> AcccountAsgnList = getAccountAssignmentByLineItemNumber(lineItemNumber);
        System.out.println("AcccountAsgnList Size :" + AcccountAsgnList.size());
        if (!AcccountAsgnList.isEmpty()) {
            deleteAllFromAccountAssignment(AcccountAsgnList);
            System.out.println("Delete List in accAssignmentList :");
        }
        addNonDuplicateObject(serviceAndLimitAccountAssList, lineItemNumber);
        System.out.println("serviceAndLimitAccountAssList size =====" + serviceAndLimitAccountAssList.size());
        if (!serviceAndLimitAccountAssList.isEmpty()) {
            for (int i = 0; i < serviceAndLimitAccountAssList.size(); i++) {
                if (serviceAndLimitAccountAssList.get(i) instanceof ServiceAccountAssignment) {
                    ServiceAccountAssignment serviceAccAsgnObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(i);
                    if (serviceAccAsgnObj.isIsDelete() == false) {
                        String distribution = null;
                        switch (serviceAccAsgnObj.getDistribution()) {
                            case "Distrib. On Quantity Basis":
                                distribution = "1";
                                break;
                            case "Distrib. By Percentage":
                                distribution = "2";
                                break;
                            case "Single Account Assignment":
                                distribution = "";
                                break;
                        }
                        System.out.println("Commitment Item in Service :" + serviceAccAsgnObj.getCommitmentItem());
                        accountAssignment.setSerialNumber(serviceAccAsgnObj.getSerialNumber());
                        accountAssignment.setQuantity(serviceAccAsgnObj.getQuantity());
                        accountAssignment.setPercentage(serviceAccAsgnObj.getPercentage());
                        accountAssignment.setAccAsgnTblOrder(serviceAccAsgnObj.getAccAsngOrder());
                        accountAssignment.setAsset(serviceAccAsgnObj.getAsset());
                        accountAssignment.setCOArea(serviceAccAsgnObj.getCOArea());
                        if (!serviceAccAsgnObj.getCommitmentItem().isEmpty()) {
                            int comItem = Integer.parseInt(serviceAccAsgnObj.getCommitmentItem());
                            System.out.println("comItem :" + comItem);
                            accountAssignment.setCommitmentItem(Integer.toString(comItem));
//                    accountAssignment.setCommitmentItem(serviceAccAsgnObj.getCommitmentItem());
                        } else {
                            accountAssignment.setCommitmentItem("");
                        }
                        accountAssignment.setCostCenter(serviceAccAsgnObj.getCostCenter());
                        accountAssignment.setDeliverySchedule(serviceAccAsgnObj.getDeliverySchedule());
                        accountAssignment.setDistribution(distribution);
                        accountAssignment.setFunctionalArea(serviceAccAsgnObj.getFunctionalArea());
                        accountAssignment.setFund(serviceAccAsgnObj.getFund());
                        accountAssignment.setFundCenter(serviceAccAsgnObj.getFundCenter());
                        accountAssignment.setGLAccount(serviceAccAsgnObj.getGLAccount());
                        accountAssignment.setItemNumber(serviceAccAsgnObj.getItemNumber());
                        accountAssignment.setLineItemNumber(lineItemNumber);
                        accountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                        accountAssignment.setNetActNumber(serviceAccAsgnObj.getNetActNumber());
                        accountAssignment.setRecipient(serviceAccAsgnObj.getRecipient());
                        accountAssignment.setSalesOrder(serviceAccAsgnObj.getSalesOrder());
                        accountAssignment.setUnloadingPoint(serviceAccAsgnObj.getUnloadingPoint());
                        accountAssignment.setLinkNumber(serviceAccAsgnObj.getLinkNumber());
                        accountAssignment.setCoCode("");
                        accountAssignment.setAccountAssignmentCategory(serviceAccAsgnObj.getAccountAssignment());
                        accountAssignment.setDistribution(serviceAccAsgnObj.getDistribution());
                        accountAssignment.setWBSElement(serviceAccAsgnObj.getWBSElement());
                        accountAssignment.setPrItemNumber(serviceAccAsgnObj.getPrItemNumber());
                        accountAssignment.setLinkId(linkid);
                        System.out.println("isDeleteFlag when Set :" + isDeleteFlag);
                        accountAssignment.setIsDeleteFlag(serviceAccAsgnObj.getIsDeleteFlag());

                        String msg = saveAccountAssignment(accountAssignment);
                        System.out.println("Msg :" + msg);

                        int serviceId = serviceAccAsgnObj.getId();
                        ServiceAccountAssignment obj = getServiceAccountAssignmenttById(serviceId);
                        obj.setSerialNumber(serviceAccAsgnObj.getSerialNumber());

                        updateServiceAccountAssignment(obj);
                    }

                } else if (serviceAndLimitAccountAssList.get(i) instanceof LimitAccountAssignment) {
                    LimitAccountAssignment limitAccAsgnObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(i);

                    if (limitAccAsgnObj.isIsDelete() == false) {

                        String distribution = limitAccAsgnObj.getDistribution();

                        accountAssignment.setSerialNumber(limitAccAsgnObj.getSerialNumber());
                        accountAssignment.setQuantity(limitAccAsgnObj.getQuantity());
                        accountAssignment.setPercentage(limitAccAsgnObj.getPercentage());
                        accountAssignment.setAccAsgnTblOrder(limitAccAsgnObj.getLimitAccAsgnTblOrder());
                        accountAssignment.setAsset(limitAccAsgnObj.getAsset());
                        accountAssignment.setCOArea(limitAccAsgnObj.getCOArea());
                        if (!limitAccAsgnObj.getCommitmentItem().isEmpty()) {
                            int comItem = Integer.parseInt(limitAccAsgnObj.getCommitmentItem());
                            System.out.println("comItem :" + comItem);
                            accountAssignment.setCommitmentItem(Integer.toString(comItem));
//                    accountAssignment.setCommitmentItem(limitAccAsgnObj.getCommitmentItem());
                        } else {
                            accountAssignment.setCommitmentItem("");
                        }
//                    accountAssignment.setCommitmentItem(limitAccAsgnObj.getCommitmentItem());
                        accountAssignment.setCostCenter(limitAccAsgnObj.getCostCenter());
                        accountAssignment.setDeliverySchedule(limitAccAsgnObj.getDeliverySchedule());
                        accountAssignment.setDistribution(distribution);
                        accountAssignment.setFunctionalArea(limitAccAsgnObj.getFunctionalArea());
                        accountAssignment.setFund(limitAccAsgnObj.getFund());
                        accountAssignment.setFundCenter(limitAccAsgnObj.getFundCenter());
                        accountAssignment.setGLAccount(limitAccAsgnObj.getGLAccount());
                        accountAssignment.setItemNumber(limitAccAsgnObj.getItemNumber());
                        accountAssignment.setLineItemNumber(lineItemNumber);
                        accountAssignment.setServiceLineItemNumber(serviceLineItemNumber);
                        accountAssignment.setNetActNumber(limitAccAsgnObj.getNetActNumber());
//                            accountAssignment.setRecipient(limitAccAsgnObj.getRecipient());
                        accountAssignment.setSalesOrder(limitAccAsgnObj.getSalesOrder());
                        accountAssignment.setCoCode("");
                        accountAssignment.setAccountAssignmentCategory(limitAccAsgnObj.getAccountAssignment());
                        accountAssignment.setDistribution(limitAccAsgnObj.getDistribution());
                        accountAssignment.setWBSElement(limitAccAsgnObj.getWBSElement());
                        accountAssignment.setPrItemNumber(limitAccAsgnObj.getPrItemNumber());
                        accountAssignment.setLinkId(linkid);
//                            accountAssignment.setUnloadingPoint(limitAccAsgnObj.getUnloadingPoint());
//                            accountAssignment.setLinkNumber(limitAccAsgnObj.getLinkNumber());
                        String msg = saveAccountAssignment(accountAssignment);
                        System.out.println("Msg :" + msg);

                        int limitId = limitAccAsgnObj.getId();
                        LimitAccountAssignment obj = getLimitAccountAssignmentById(limitId);
                        obj.setSerialNumber(limitAccAsgnObj.getSerialNumber());

                        updateLimitAccountAssignment(obj);
                    }
                }
            }
        }
//        String msg = addNonDuplicateObject(serviceAndLimitAccountAssList, lineItemNumber);
        return "Executed";
    }

    public List<ServiceAccountAssignment> getServiceAccountAssignmentByLineItemNumberNonDeleted(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceAccountAssignmentByLineItemNumberNonDeleted.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ServiceAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ServiceAccountAssignment>>() {
        });
        List<ServiceAccountAssignment> list = response.getBody();
        return list;
    }

    String addNonDuplicateObject(List<Object> serviceAndLimitAccountAssList, String lineItemNumber) {
        int count = 0;
        boolean flag = false;
        System.out.println("total serviceAndLimitAccountAssList size :::" + serviceAndLimitAccountAssList.size());
        List<ServiceAccountAssignment> accAssignmentList = getServiceAccountAssignmentByLineItemNumberDeleted(lineItemNumber);
        System.out.println("accAssignmentList Non Deleted :::" + accAssignmentList.size());
        List<LimitAccountAssignment> limitsAccAsgnList = getLimitAccountAssignmentByLineItemNumber(lineItemNumber);
//        float netValue = 0;
//        float totalNetValue = 0;
        List<Object> serviceAndLimitAccountAssListDeleted = new ArrayList<>();

        serviceAndLimitAccountAssListDeleted.addAll(accAssignmentList);
        serviceAndLimitAccountAssListDeleted.addAll(limitsAccAsgnList);
        System.out.println("serviceAndLimitAccountAssList size in addNonDuplicateObject :" + serviceAndLimitAccountAssListDeleted.size());
        for (int i = 0; i < serviceAndLimitAccountAssListDeleted.size(); i++) {
            String accountAsgn = "";
            if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                accountAsgn = serviceAccAssObj.getAccountAssignment();
            } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                accountAsgn = limitsAccAssObj.getAccountAssignment();
            }
            System.out.println("accountAsgn in addNonDuplicateObject :" + accountAsgn);
            if (null != accountAsgn) {
                switch (accountAsgn) {
                    case "F":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                && (iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                && (iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
//                                            netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
//                                            qServiceAccAssObj.setIsDelete(true);
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
//                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
//                                            qLimitsAccAssObj.setIsDelete(true);
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
//                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
//                                            qLimitsAccAssObj.setIsDelete(true);
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
//                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
//                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "A":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                || !(iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                || !(iServiceAccAssObj.getAsset()).equals(qServiceAccAssObj.getAsset())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
//                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
//                                System.out.println("msg :" + msg);
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssListDeleted.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                || !(iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
//                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
//                                            qLimitsAccAssObj.setIsDelete(true);
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                || !(iLimitsAccAssObj.getAsset()).equals(qLimitsAccAssObj.getAsset())) {
//                                            netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
//                                            qLimitsAccAssObj.setIsDelete(true);
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
//                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
//                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "B":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qServiceAccAssObj.isIsDelete() != true) {
                                            if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
//                                                qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                                count++;
                                            } else {
                                                flag = true;
                                                break;
                                            }
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qServiceAccAssObj.isIsDelete() != true) {
                                            serviceAccAssObj.setSerialNumber((i + 1) + "");
                                            if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
//                                                netValue = netValue + qServiceAccAssObj.getExpectedvalue().floatValue();
//                                                qServiceAccAssObj.setIsDelete(true);
//                                                qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qLimitsAccAssObj.isIsDelete() != true) {
                                            if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
//                                                netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
//                                                accAssignmentList.get(q).setIsDelete(true);
//                                                qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (qLimitsAccAssObj.isIsDelete() != true) {
                                            limitsAccAssObj.setSerialNumber((i + 1) + "");
                                            if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
//                                                netValue = netValue + qLimitsAccAssObj.getNetValaue().floatValue();
//                                                qLimitsAccAssObj.setIsDelete(true);
//                                                qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                            }
                                        }
                                    }
                                }
//                                String msg = AccountAssignmentType(serviceAndLimitAccountAssList, i, netValue, totalNetValue);
//                                System.out.println("msg :" + msg);
                            }
                        }
                        break;
                    case "C":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
//                                            netValue = netValue + qLimitsAccAssObj.getExpectedvalue().floatValue();
//                                            qLimitsAccAssObj.setIsDelete(true);
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "D":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }

                                }
                            }
                        }
                        break;
                    case "E":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");

                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "G":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "K":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                System.out.println("flag after exe completion :" + flag + " ,count :" + count);
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");

//                                            qLimitsAccAssObj.setQuantity(new BigDecimal(0.0));
//                                            qLimitsAccAssObj.setNetValaue(new BigDecimal(0.0));
//                                            serviceAndLimitAccountAssList.add(qLimitsAccAssObj);
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "M":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + 
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "N":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");

                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "P":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "Q":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "R":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if (!(iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "T":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = i + 1; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                || !(iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                || !(iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())
                                                || !(iServiceAccAssObj.getCommitmentItem()).equals(qServiceAccAssObj.getCommitmentItem())
                                                || !(iServiceAccAssObj.getNetActNumber()).equals(qServiceAccAssObj.getNetActNumber())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                || !(iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                || !(iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())
                                                || !(iLimitsAccAssObj.getCommitmentItem()).equals(qLimitsAccAssObj.getCommitmentItem())
                                                || !(iLimitsAccAssObj.getNetActNumber()).equals(qLimitsAccAssObj.getNetActNumber())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "X":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getSalesOrder()).equals(qServiceAccAssObj.getSalesOrder())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())
                                                || !(iServiceAccAssObj.getWBSElement()).equals(qServiceAccAssObj.getWBSElement())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getSalesOrder()).equals(qLimitsAccAssObj.getSalesOrder())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())
                                                || !(iLimitsAccAssObj.getWBSElement()).equals(qLimitsAccAssObj.getWBSElement())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "Z":
                        if (serviceAndLimitAccountAssListDeleted.get(i) instanceof ServiceAccountAssignment) {
                            ServiceAccountAssignment serviceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (serviceAccAssObj.isIsDelete() != true) {
                                serviceAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    ServiceAccountAssignment iServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qServiceAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getLimitAccAsgnTblOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qServiceAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iServiceAccAssObj.getGLAccount()).equals(qServiceAccAssObj.getGLAccount())
                                                || !(iServiceAccAssObj.getCostCenter()).equals(qServiceAccAssObj.getCostCenter())
                                                || !(iServiceAccAssObj.getAccAsngOrder()).equals(qServiceAccAssObj.getAccAsngOrder())) {
//                                            qServiceAccAssObj.setSerialNumber((i + 1) + "");
                                            count++;
                                        } else {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (flag == false) {
                                    serviceAccAssObj.setQuantity(new BigDecimal(0.0));
                                    serviceAccAssObj.setPercentage(new BigDecimal(0.0));
                                    serviceAndLimitAccountAssList.add(serviceAccAssObj);
                                }
                            }
                        } else if (serviceAndLimitAccountAssListDeleted.get(i) instanceof LimitAccountAssignment) {
                            LimitAccountAssignment limitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                            if (limitsAccAssObj.isIsDelete() != true) {
                                limitsAccAssObj.setSerialNumber((i + 1) + "");
                                for (int q = 0; q < serviceAndLimitAccountAssList.size(); q++) {
                                    LimitAccountAssignment iLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssListDeleted.get(i);
                                    if (serviceAndLimitAccountAssList.get(q) instanceof LimitAccountAssignment) {
                                        LimitAccountAssignment qLimitsAccAssObj = (LimitAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                && (iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                && (iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getLimitAccAsgnTblOrder())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    } else if (serviceAndLimitAccountAssList.get(q) instanceof ServiceAccountAssignment) {
                                        ServiceAccountAssignment qLimitsAccAssObj = (ServiceAccountAssignment) serviceAndLimitAccountAssList.get(q);
                                        if ((iLimitsAccAssObj.getGLAccount()).equals(qLimitsAccAssObj.getGLAccount())
                                                || !(iLimitsAccAssObj.getCostCenter()).equals(qLimitsAccAssObj.getCostCenter())
                                                || !(iLimitsAccAssObj.getLimitAccAsgnTblOrder()).equals(qLimitsAccAssObj.getAccAsngOrder())) {
//                                            qLimitsAccAssObj.setSerialNumber((i + 1) + "");
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            }
        }
        System.out.println("serviceAndLimitAccountAssList Size in function :" + serviceAndLimitAccountAssList.size());
        return "Executed";
    }

    public List<ServiceAccountAssignment> getServiceAccountAssignmentByLineItemNumberDeleted(String lineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceAccountAssignmentByLineItemNumberDeleted.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ServiceAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ServiceAccountAssignment>>() {
        });
        List<ServiceAccountAssignment> list = response.getBody();
        return list;
    }

    public List<BuyerTeamleadMapping> findBuyerMappingByTeamlead(int teamleadid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findbuyermappingbyteamlead.do?id=" + teamleadid;
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerTeamleadMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerTeamleadMapping>>() {
        });
        List<BuyerTeamleadMapping> mappingList = response.getBody();
        return mappingList;
    }

    public List<NGExtPOCreation> findByInitiatorIdInAndCurrentWorkstepIn(String initiatorIds) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByInitiatorIdInAndCurrentWorkstepIn.do?initiatorIds=" + initiatorIds;
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
        return list;
    }

    public List<NGExtPOCreation> findByCurrentWorkstepAndInitiatorId(String currentWorkstep, String initiatorID) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByCurrentWorkstepAndInitiatorId.do?currentWorkstep=" + currentWorkstep + "&initiatorID=" + initiatorID;
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
        return list;
    }

    public String updateServiceTableData(Services services) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateservicetabledata.do"), services, String.class);
        System.out.println("updateServiceTableData : " + msg);
        return msg;
    }

    public String findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType(String fromCurrency, String toCurrency) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType.do?fromCurrency=" + fromCurrency + "&toCurrency=" + toCurrency;
        System.out.println("url:" + url);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<String>() {
        });
        String list = (String) response.getBody();
        return list;
    }

    public List<String> findMaxServiceLineNoByInsertionOrderId(String insertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaxServiceLineNoByInsertionOrderId.do?insertionOrderId=" + insertionOrderId;
        System.out.println("url: " + url);
        ResponseEntity<List<String>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
        });
        List<String> list = response.getBody();
        return list;
    }

    public List<PoSavingReportMaterialBean> callPoSavingReportMaterialStoredProcedure(String coCodeFrom, String coCodeTo, String plantFrom, String plantTo, String purchasingGroupFrom, String purchasingGroupTo, String purchasingOrgFrom, String purchasingOrgTo, String docTypeFrom, String docTypeTo, String docCatFrom, String vendorCodeFrom, String vendorCodeTo, String poNoFrom, String poNoTo, String grPostingDateFrom, String grPostingDateTo) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPoSavingReportMaterialStoredProcedure.do?coCodeFrom=" + coCodeFrom + "&coCodeTo=" + coCodeTo + "&plantFrom=" + plantFrom + "&plantTo=" + plantTo + "&purchasingGroupFrom=" + purchasingGroupFrom + "&purchasingGroupTo=" + purchasingGroupTo + "&purchasingOrgFrom=" + purchasingOrgFrom + "&purchasingOrgTo=" + purchasingOrgTo + "&docTypeFrom=" + docTypeFrom + "&docTypeTo=" + docTypeTo + "&docCatFrom=" + docCatFrom + "&vendorCodeFrom=" + vendorCodeFrom + "&vendorCodeTo=" + vendorCodeTo + "&poNoFrom=" + poNoFrom + "&poNoTo=" + poNoTo + "&grPostingDateFrom=" + grPostingDateFrom + "&grPostingDateTo=" + grPostingDateTo;
        System.out.println("url: " + url);
        ResponseEntity<List<PoSavingReportMaterialBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PoSavingReportMaterialBean>>() {
        });
        List<PoSavingReportMaterialBean> list = response.getBody();
        return list;
    }

    public List<PoSavingReportServiceBean> callPoSavingReportServiceStoredProcedure(String coCodeFrom, String coCodeTo, String plantFrom, String plantTo, String purchasingGroupFrom, String purchasingGroupTo, String purchasingOrgFrom, String purchasingOrgTo, String docTypeFrom, String docTypeTo, String docCatFrom, String vendorCodeFrom, String vendorCodeTo, String poNoFrom, String poNoTo, String grPostingDateFrom, String grPostingDateTo) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPoSavingReportServiceStoredProcedure.do?coCodeFrom=" + coCodeFrom + "&coCodeTo=" + coCodeTo + "&plantFrom=" + plantFrom + "&plantTo=" + plantTo + "&purchasingGroupFrom=" + purchasingGroupFrom + "&purchasingGroupTo=" + purchasingGroupTo + "&purchasingOrgFrom=" + purchasingOrgFrom + "&purchasingOrgTo=" + purchasingOrgTo + "&docTypeFrom=" + docTypeFrom + "&docTypeTo=" + docTypeTo + "&docCatFrom=" + docCatFrom + "&vendorCodeFrom=" + vendorCodeFrom + "&vendorCodeTo=" + vendorCodeTo + "&poNoFrom=" + poNoFrom + "&poNoTo=" + poNoTo + "&grPostingDateFrom=" + grPostingDateFrom + "&grPostingDateTo=" + grPostingDateTo;
        System.out.println("url: " + url);
        ResponseEntity<List<PoSavingReportServiceBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PoSavingReportServiceBean>>() {
        });
        List<PoSavingReportServiceBean> list = response.getBody();
        return list;
    }

    public List<NGExtPOCreation> getExtPOCreationByCompanyCode() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getExtPOCreationByCompanyCode.do";
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
        return list;
    }

    public List<String> findMaxServiceLineNoByInsertionOrderIdIn(String insertionOrderIdString) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaxServiceLineNoByInsertionOrderIdIn.do?insertionOrderIdString=" + insertionOrderIdString;
        System.out.println("url: " + url);
        ResponseEntity<List<String>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
        });
        List<String> list = response.getBody();
        return list;
    }

    public List<Services> findByServiceLineItemNumberAndLineItemNumber(String serviceLineItemNumber, String lineItemNumber) {
        System.out.println("findByServiceLineItemNumberAndLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByServiceLineItemNumberAndLineItemNumber.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<Services>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Services>>() {
        });
        List<Services> list = response.getBody();
        return list;
    }

    public List<PoCommentsHistory> findPoCommentsHistoryByPid(String pid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPoCommentsHistoryByPid.do?pid=" + pid;
        System.out.println("url: " + url);
        ResponseEntity<List<PoCommentsHistory>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PoCommentsHistory>>() {
        });
        List<PoCommentsHistory> list = response.getBody();
        return list;
    }

    public List<MaterialTab> findMaterialTabByInsertionOrderId(String insertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaterialTabByInsertionOrderId.do?insertionOrderId=" + insertionOrderId;
        System.out.println("url: " + url);
        ResponseEntity<List<MaterialTab>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MaterialTab>>() {
        });
        List<MaterialTab> list = response.getBody();
        return list;
    }

    public String deleteAllMaterialTab(List<MaterialTab> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllMaterialTab.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }

    public String saveMaterialTab(MaterialTab obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveMaterialTab.do";
        String msg = restTemplate.postForObject(URI.create(url), obj, String.class);
        return msg;
    }

    public List<MasterServiceMaster> getServiceMasterByServiceNumber(String ServiceNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getservicemasterbyservicenumber.do?ServiceNumber=" + ServiceNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterServiceMaster>> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterServiceMaster>>() {
        });
        List<MasterServiceMaster> serviceObj = buyerResponse.getBody();
        return serviceObj;
    }

    public List<MasterMaterialMARA> findMasterMaterialMARAByMatCode(String materialCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterMaterialMARAByMatCode.do?materialCode=" + materialCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialMARA>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialMARA>>() {
        });
        List<MasterMaterialMARA> list = response.getBody();
        return list;
    }

    public String updateQuantityDates(QuantityDates quantity) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatequantitydates.do"), quantity, String.class);
        System.out.println("updatequantitydates :" + msg);
        return msg;
    }

    public String saveProfitabilitySegment(ProfitabilitySegment profitabilitySegment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveprofitabilitysegment.do"), profitabilitySegment, String.class);
        System.out.println("saveprofitabilitysegment : " + msg);
        return msg;
    }

    public List<String> findPurchaseOrderDocumentIndexByName(String pid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPurchaseOrderDocumentIndexByName.do?pid=" + pid;
        System.out.println("url: " + url);
        ResponseEntity<List<String>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
        });
        List<String> list = response.getBody();
        return list;
    }

    public List<String> findTermsAndConditionsDocumentIndexByName(String pid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findTermsAndConditionsDocumentIndexByName.do?pid=" + pid;
        System.out.println("url: " + url);
        ResponseEntity<List<String>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
        });
        List<String> list = response.getBody();
        return list;
    }

    public List<NGExtPOCreation> findByPidIn(String pids) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByPidIn.do?pids=" + pids;
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
        return list;
    }

    public List<NewgenPRLineItem> findByMultipleNewgenPRLineItemId(String prlineids) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findbymultiplenewgenprlineitemid.do?ids=" + prlineids;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();
        System.out.println("prList size: " + prList.size());
        return prList;
    }

    public String updatePrLineItemNG(NewgenPRLineItem obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateprlineitemng.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);
        return result;
    }

    public List<NewgenPRLineItem> findPrLineByPid(String pid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPrLineByPid.do?pid=" + pid;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();
        return prList;
    }

    public List<NewgenPRLineItem> findPrLineByPidAndItemNumber(String pid, String itemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByPidAndItemNumber.do?pid=" + pid + "&itemNumber=" + itemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();
        return prList;
    }
    
    public List<NewgenPRLineItem> findPrLineByPidAndItemNumberAndLeadingZeroIN(String pid, String itemNumber, String itemNumberWithLeadingZeros) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPrLineByPidAndItemNumberAndLeadingZeroIN.do?pid=" + pid + "&itemNumber=" + itemNumber + "&itemNumberWithLeadingZeros=" + itemNumberWithLeadingZeros;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();
        return prList;
    }
    
    public List<Object[]> findApproverDetails(String companyCode, String documentTypeField, String limitFrom, String limitTo, String departmentCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findApproverDetails.do?companyCode=" + companyCode + "&documentTypeField=" + documentTypeField + "&limitFrom=" + limitFrom + "&limitTo=" + limitTo + "&departmentCode=" + departmentCode;
        System.out.println("url: " + url);
        ResponseEntity<List<Object[]>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Object[]>>() {
        });
        List<Object[]> prList = prResponse.getBody();
        return prList;
    }

    public List<ConditionsLineLevel> getConditionsLineLevelByLinkIds(String linkIdArray) {
        System.out.println("getConditionsLineLevelByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionsLineLevelByLinkIds.do?linkIdArray=" + linkIdArray;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> condition = response.getBody();
        return condition;
    }

    public List<ConditionsLineLevel> getConditionsLineLevelByLinkid(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionsLineLevelByLinkid.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> condition = response.getBody();
        return condition;
    }

    public String updateDeliverySchedule(DeliverySchedule deliverySchedule) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatedeliveryschedule.do"), deliverySchedule, String.class);
        System.out.println("updatedeliveryschedule :" + msg);
        return msg;
    }

    public List<MasterMaterialGeneral> getMasterMaterialGeneralByCoCodeAndMaterialCode(String companyCode, String matCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterMaterialGeneralByCoCodeAndMaterialCode.do?companyCode=" + companyCode + "&matCode=" + matCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGeneral>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGeneral>>() {
        });
        List<MasterMaterialGeneral> list = response.getBody();
        return list;
    }

    public List<ConditionsLineLevel> getConditionsLineLevelByInsertionOrderIds(String insertionOrderIdArrAsString) {
        System.out.println("getConditionsLineLevelByInsertionOrderIds");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionsLineLevelByInsertionOrderIds.do?insertionOrderIdArr=" + insertionOrderIdArrAsString;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> condition = response.getBody();
        return condition;
    }

    public List<Object[]> getCurrencyByToCurrencyAndExchangeRateTypeWithNoLock() {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getCurrencyByToCurrencyAndExchangeRateTypeWithNoLock.do";
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<List<Object[]>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<Object[]>>() {
        });
        List<Object[]> extPOCrList = list.getBody();
        System.out.println("Returning Size getCurrencyByToCurrencyAndExchangeRateTypeWithNoLock::: " + extPOCrList.size());
        return extPOCrList;
    }

    public List<NG_BP_Default_RatedParameters> findAllRatedParam() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallRatedPrams.do";
        ResponseEntity<List<NG_BP_Default_RatedParameters>> paramList = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NG_BP_Default_RatedParameters>>() {
        });
        System.out.println("vendor: " + paramList);
        List<NG_BP_Default_RatedParameters> ratedParam = paramList.getBody();
        return ratedParam;
    }

    public List<ConditionsLineLevel> getConditionByLineitemIdAndConitionTypeAndChangeId(String LineitemId, String conditionType, String changeid) {
        System.out.println("getConditionByLinkIdAndConitionType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionByLineitemIdAndConitionTypeAndChangeId.do?LineitemId=" + LineitemId + "&conditionType=" + conditionType + "&changeid=" + changeid;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> conditionObj = response.getBody();
        return conditionObj;
    }

    public List<ConditionsLineLevel> findByLineitemIdAndConditionType(String LineitemId, String conditionType) {
        System.out.println("findByLineitemIdAndConditionType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByLineitemIdAndConditionType.do?LineitemId=" + LineitemId + "&conditionType=" + conditionType;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> conditionObj = response.getBody();
        return conditionObj;
    }

    public Services getServiceById(int serviceId) {
        System.out.println("getServiceById");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceById.do?serviceId=" + serviceId;
        System.out.println("url: " + url);
        ResponseEntity<Services> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Services>() {
        });
        Services serviceObj = response.getBody();
        return serviceObj;
    }
    
    public ServicesLongTexts getServicesLongTextsById(int serviceId) {
        System.out.println("getServicesLongTextsById");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServicesLongTextsById.do?serviceId=" + serviceId;
        System.out.println("url: " + url);
        ResponseEntity<ServicesLongTexts> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ServicesLongTexts>() {});
        ServicesLongTexts obj = response.getBody();
        return obj;
    }
    
    public String updateServicesLongTexts(ServicesLongTexts obj) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateServicesLongTexts.do"), obj, String.class);
        System.out.println("updateServicesLongTexts : " + msg);
        return msg;
    }
    
    public String saveServicesLongTexts(ServicesLongTexts obj) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveServicesLongTexts.do"), obj, String.class);
        System.out.println("saveServicesLongTexts :" + msg);
        return msg;
    }
    public List<ConditionsLineLevel> getConditionByLineitemIdAndConitionTypeAndChangeIdAndIndexNumber(String LineitemId, String conditionType, String changeid, String indexnumber) {
        System.out.println("getConditionByLinkIdAndConitionType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionByLineitemIdAndConitionTypeAndChangeIdAndIndexNumber.do?LineitemId=" + LineitemId + "&conditionType=" + conditionType + "&changeid=" + changeid + "&indexnumber=" + indexnumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> conditionObj = response.getBody();
        return conditionObj;
    }
    
    public List<MasterDepartment> findMasterUserIdDepartmentByUserId(String userId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterUserIdDepartmentByUserId.do?userId=" + userId;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterDepartment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDepartment>>() {});
        List<MasterDepartment> list = response.getBody();
        return list;
    }
    
    public List<NGExtPRToPO> getNGExtPRToPO() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGExtPRToPO.do";
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPRToPO>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPRToPO>>() {});
        List<NGExtPRToPO> list = prResponse.getBody();
        return list;
    }
    
    public List<ExtPoCreationDraft> findExtPoCreationDraftByErrorTransaction(String errorTransactionStatus) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findExtPoCreationDraftByErrorTransaction.do?errorTransactionStatus=" + errorTransactionStatus;
        System.out.println("url: " + url);
        ResponseEntity<List<ExtPoCreationDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ExtPoCreationDraft>>() {});
        List<ExtPoCreationDraft> list = response.getBody();
        return list;
    }
    
    public List<CmplxPOCreationApproverDetailsDraft> findCmplxPOCreationApproverDetailsDraftByExtId(int extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCmplxPOCreationApproverDetailsDraftByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPOCreationApproverDetailsDraft>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPOCreationApproverDetailsDraft>>() {
        });
        List<CmplxPOCreationApproverDetailsDraft> list = response.getBody();
        return list;
    }
    
    public String deleteAllCmplxPOCreationApproverDetailsDraft(List<CmplxPOCreationApproverDetailsDraft> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllCmplxPOCreationApproverDetailsDraft.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }
    
    public String saveCmplxPOCreationApproverDetailsDraft(CmplxPOCreationApproverDetailsDraft obj) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveCmplxPOCreationApproverDetailsDraft.do"), obj, String.class);
        System.out.println("saveCmplxPOCreationApproverDetailsDraft id: " + id);
        return id;
    }
    
    public Long findDraftPoRowCount() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findDraftPoRowCount.do";
        System.out.println("url: " + url);
        ResponseEntity<Long> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Long>() {});
        Long obj = response.getBody();
        return obj;
    }
    
    public String updateExtDraftPoDetailsOnErrorTransaction(int extId, String errorTransactionStatus, String tempPoNumber, String poSequenceNumber) {
        System.out.println("updateExtDraftPoDetailsOnErrorTransaction");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateExtDraftPoDetailsOnErrorTransaction.do?extId=" + extId + "&errorTransactionStatus=" + errorTransactionStatus + "&tempPoNumber=" + tempPoNumber + "&poSequenceNumber=" + poSequenceNumber;
        System.out.println("url: " + url);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<String>() {});
        String obj = response.getBody();
        return obj;
    }
    
    public List<Object> findAllErrorTransactionDraftPo() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findAllErrorTransactionDraftPo.do";
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<List<Object>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<Object>>() {});
        List<Object> extPOCrList = list.getBody();
        return extPOCrList;
    }
    
    public List<MasterProcCaMatrix> findReleaseStrategy(String companyCode, String documentTypeField, String limitFrom, String limitTo) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findReleaseStrategy.do?companyCode=" + companyCode + "&documentTypeField=" + documentTypeField + "&limitFrom=" + limitFrom + "&limitTo=" + limitTo;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterProcCaMatrix>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterProcCaMatrix>>() {});
        List<MasterProcCaMatrix> matrixList = response.getBody();
        return matrixList;
    }
    
    public List<ProfitabilitySegment> findProfitabilitySegmentByInsertionOrderIdAndServiceLineItemNumber(String insertionOrderId, String serviceLineItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findProfitabilitySegmentByInsertionOrderIdAndServiceLineItemNumber.do?insertionOrderId=" + insertionOrderId + "&serviceLineItemNumber=" + serviceLineItemNumber;
        ResponseEntity<List<ProfitabilitySegment>> segment = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ProfitabilitySegment>>() {
        });
        List<ProfitabilitySegment> segmentObj = segment.getBody();
        return segmentObj;
    }
    
    public String deleteAllNGBPCmplxPOCreationLineItemProfitabilitySegment(List<NGBPCmplxPOCreationLineItemProfitabilitySegment> segmentList) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllNGBPCmplxPOCreationLineItemProfitabilitySegment.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, segmentList, String.class);
        return result;
    }
    
    public String updateExtDraftPoDetailsOnPoCreation(int extId) {
        System.out.println("updateExtDraftPoDetailsOnPoCreation");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateExtDraftPoDetailsOnPoCreation.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<String>() {});
        String obj = response.getBody();
        return obj;
    }
    
    public List<NGBPCmplxPOCreationConditions> getNGBPCmplxPOCreationConditionsByExtId(long extId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationConditionsByExtId.do?extId=" + extId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationConditions>>() {});
        List<NGBPCmplxPOCreationConditions> list = response.getBody();
        return list;
    }
    
    public String deleteAllNGBPCmplxPOCreationConditions(List<NGBPCmplxPOCreationConditions> list) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllNGBPCmplxPOCreationConditions.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
    }
    
    public String saveNGBPCmplxPOCreationConditions(NGBPCmplxPOCreationConditions obj) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationConditions.do"), obj, String.class);
        System.out.println("saveNGBPCmplxPOCreationConditions: " + msg);
        return msg;
    }
    
    public List<CmplxPRToPOLineItemComponents> getCmplxPRToPOLineItemComponentsByLinkId(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getCmplxPRToPOLineItemComponentsByLinkId.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemComponents>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemComponents>>() {});
        List<CmplxPRToPOLineItemComponents> list = response.getBody();
        return list;
    }
    
    public String updateComponent(com.eportal.entities.Component component) {
        System.out.println("Sunny Kumar Prajapati in updateComponent");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatecomponent.do"), component, String.class);
        System.out.println("updatecomponent :" + msg);
        return msg;
    }
    
    public List<MasterInternalOrder> getInternalOrderByPagination(
            String accAsgn, 
            String recordCount, 
            String internalOrderOrDescSearchText, 
            String lastIOSno) 
    {
        RestTemplate restTemplate = new RestTemplate();
        
        String url = webservice_ip + "/BuyerPortalWebServices/getInternalOrderByPagination.do?"
                        + "accAsgn=" + accAsgn 
                        + "&recordCount=" + recordCount 
                        + "&internalOrderOrDescSearchText=" + internalOrderOrDescSearchText 
                        + "&lastIOSno=" + lastIOSno;        
        System.out.println("url: " + url);
        
        ResponseEntity<List<MasterInternalOrder>> response = restTemplate
                                                            .exchange(
                                                                url, 
                                                                HttpMethod.GET, 
                                                                null, 
                                                                new ParameterizedTypeReference<List<MasterInternalOrder>>() {});
        List<MasterInternalOrder> list = response.getBody();
        return list;
    }
    
    public List<CmplxPRToPOLineItemPRAccountAssignment> getCmplxPRToPOLineItemPRAccountAssignmentByLinkId(String linkid) {
        System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcmplxprtopolineitempraccountassignmentbylinkid.do?PRLinkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemPRAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemPRAccountAssignment>>() {
        });
        List<CmplxPRToPOLineItemPRAccountAssignment> list = response.getBody();
        return list;
    }
    
    public List<Services> getServiceByInsertionId(String insertionid) {
        System.out.println("getServiceByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getservicebyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Services>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Services>>() {
        });
        List<Services> service = response.getBody();
        return service;
    }
    
    public List<ServiceAccountAssignment> getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(String serviceLineItemNumber, String lineItemNumber) {
        System.out.println("getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getserviceaccountassignmentbyservicelineitemnumberandlineitemnumber.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ServiceAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ServiceAccountAssignment>>() {
        });
        List<ServiceAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }
}
