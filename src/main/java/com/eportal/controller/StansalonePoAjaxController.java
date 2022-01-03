/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.AccountAssignment;
import com.eportal.entities.AccountAssignmentCategoryMaster;
import com.eportal.entities.BuyerDashboardPrStatusChartBean;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPendingPRLineItemsBean;
import com.eportal.entities.BuyerPurchaseGroupMapping;
import com.eportal.entities.CmplxPOCreationApproverDetailsDraft;
import com.eportal.entities.CmplxPRToPOLineItemComponents;
import com.eportal.entities.CmplxPoCreationCommunicationDraft;
import com.eportal.entities.CmplxPoCreationConditionsDraft;
import com.eportal.entities.CmplxPoCreationCustomerDataDraft;
import com.eportal.entities.CmplxPoCreationDeliveryInvoiceDraft;
import com.eportal.entities.CmplxPoCreationHeaderTextDraft;
import com.eportal.entities.CmplxPoCreationLineItemPoDraft;
import com.eportal.entities.CmplxPoCreationVendorAddressDraft;
import com.eportal.entities.Component;
import com.eportal.entities.ConditionControl;
import com.eportal.entities.ConditionsLineLevel;
import com.eportal.entities.Confirmations;
import com.eportal.entities.CustomerData;
import com.eportal.entities.Delivery;
import com.eportal.entities.DeliveryAddress;
import com.eportal.entities.DeliverySchedule;
import com.eportal.entities.ExtPoCreationDraft;
import com.eportal.entities.FinalizedRfq;
import com.eportal.entities.Invoice;
import com.eportal.entities.LastPoDetailsBean;
import com.eportal.entities.LimitAccountAssignment;
import com.eportal.entities.Limits;
import com.eportal.entities.MasterCountry;
import com.eportal.entities.MasterCurrency;
import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterExchangeRate;
import com.eportal.entities.MasterFunctionalArea;
import com.eportal.entities.MasterIncoterms;
import com.eportal.entities.MasterInternalOrder;
import com.eportal.entities.MasterMaterialGroup;
import com.eportal.entities.MasterMaterialMRP;
import com.eportal.entities.MasterPlant;
import com.eportal.entities.MasterPricingDescription;
import com.eportal.entities.MasterPricingProcedures;
import com.eportal.entities.MasterPurchaseOrg;
import com.eportal.entities.MasterTaxCode;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.MaterialTab;
import com.eportal.entities.NGBPCmplxPOCreationConditions;
import com.eportal.entities.NGBPCmplxPOCreationLimits;
import com.eportal.entities.NGBPCmplxPOCreationLineItemConditions;
import com.eportal.entities.NGBPCmplxPOCreationLineItemMaterialTab;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPO;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
import com.eportal.entities.NGBPCmplxPOCreationLineItemProfitabilitySegment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemService;
import com.eportal.entities.NGBPCmplxPOCreationQuantitiesWeights;
import com.eportal.entities.NGBPExtPOCreation;
import com.eportal.entities.NGExtPOCreation;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.PORfqLineItemBean;
import com.eportal.entities.PoRunningSequenceBean;
import com.eportal.entities.PrToPOCycleTimeReportBean;
import com.eportal.entities.ProfitabilitySegment;
import com.eportal.entities.QuantityDates;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.SchemaGroupPurOrgMapping;
import com.eportal.entities.ServiceAccountAssignment;
import com.eportal.entities.Services;
import com.eportal.entities.ServicesLongTexts;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierHeaderRatedParameterMapping;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.Text;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.VendorGroup;
import com.eportal.entities.VendorGroupMapping;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.newgenControl.StandalonePoDocumentInputBean;
import com.eportal.newgenControl.StandalonePoDocumentOutputBean;
import com.eportal.util.SavePoLineLevelTab;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.PurchaseRequestWS;
import com.eportal.webservice.util.ReportWS;
import com.eportal.webservice.util.RfqRfpWS;
import com.eportal.webservice.util.StandalonePoWS;
import com.eportal.webservice.util.VendorWS;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.URI;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@Controller
public class StansalonePoAjaxController {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${no_of_days}")
    private int no_of_days;
    @Autowired
    SavePoLineLevelTab savePoLineLevelTab;
    @Autowired
    PurchaseOrderWS purchaseOrderWS;
    @Autowired
    RfqRfpWS rfqRfpUtilWS;
    @Autowired
    PurchaseRequestWS purchaseRequestUtilWS;
    @Autowired
    SupplierHeaderRatedParameterMapping supplierHeaderRatedParameterMapping;
    @Autowired
    StandalonePoWS standalonePoWSUtil;
    @Autowired
    StandalonePoDocumentInputBean standalonePoDocumentInputBean;
    @Autowired
    ReportWS reportWSUtil;
    @Autowired
    PurchaseOrderWS purchaseOrderWSUtil;
    @Autowired
    NGBPCmplxPOCreationLineItemConditions nGBPCmplxPOCreationLineItemConditions;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;
    @Autowired
    VendorGroupMapping vendorGroupMapping;
    @Autowired
    VendorDetails vendorDetailsEntity;
    @Autowired
    VendorGroup vendorGroup;
    @Autowired
    ServicesLongTexts servicesLongTextsEntity;
    @Autowired
    NGBPCmplxPOCreationConditions ngBPCmplxPOCreationConditions;
    @Autowired
    Component component;
    @Autowired
    AccountAssignment accountAssignmentEntity;
    @Autowired
    ServiceAccountAssignment serviceAccountAssignmentEntity;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignment ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity;
    @Autowired
    VendorWS vendorWSUtil;

    @RequestMapping(value = "/standalonepoajaxrequest", method = RequestMethod.GET)
    public void doService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========Standalone PO Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);

        if (reqFrom.equalsIgnoreCase("FindPlanDelvTimeByMaterialCode")) {
            try {
                System.out.println("FindPlanDelvTimeByMaterialCode");
                out = response.getWriter();
                String materialCode = request.getParameter("materialCode");
                System.out.println("materialCode: " + materialCode);
                List<MasterMaterialMRP> list = purchaseOrderWS.getMasterMaterialMPRByMaterialCode(materialCode);
                if (list != null && !list.isEmpty()) {
                    MasterMaterialMRP obj = list.get(0);
                    String plannedDelvTime = obj.getPlannedDelvTime();
                    System.out.println("plannedDelvTime: " + plannedDelvTime);
                    if (plannedDelvTime != null) {
                        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                        Calendar cal = Calendar.getInstance();
                        Date today = new Date();

                        cal.setTime(today);
                        cal.add(Calendar.DAY_OF_MONTH, Integer.parseInt(obj.getPlannedDelvTime()));

                        Date currentDateAfterAddingPlanDelvTime = cal.getTime();
                        System.out.println("currentDateAfterAddingPlanDelvTime: " + currentDateAfterAddingPlanDelvTime);

                        String currentDateAfterAddingPlanDelvTimeAsString = df.format(currentDateAfterAddingPlanDelvTime);
                        System.out.println("currentDateAfterAddingPlanDelvTimeAsString: " + currentDateAfterAddingPlanDelvTimeAsString);

                        jObj.put("PlannedDelvTime", obj.getPlannedDelvTime());
                        jObj.put("currentDateAfterAddingPlanDelvTime", currentDateAfterAddingPlanDelvTimeAsString);
                    } else {
                        jObj.put("PlannedDelvTime", "PlannedDelvTimeIsNullOrEmpty");
                    }
                } else {
                    jObj.put("PlannedDelvTime", "NoTimeFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findCountryCodeByCountryName")) {
            try {
                System.out.println("findCountryCodeByCountryName");
                out = response.getWriter();
                String country = request.getParameter("country");
                System.out.println("country: " + country);
                List<MasterCountry> countryList = rfqRfpUtilWS.findMasterCountryByCountryName(country);
                JSONObject innerJsonObj = new JSONObject();
                if (!countryList.isEmpty()) {
                    MasterCountry countryObj = countryList.get(0);
                    innerJsonObj.put("COUNTRYCODE", countryObj.getCountry());
                }
                jObj.put("Data", innerJsonObj);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindMasterVendorByIsMappedNot")) {
            try {
                System.out.println("FindMasterVendorByIsMappedNot");
                out = response.getWriter();
                List<MasterVendor> vendorList = rfqRfpUtilWS.findMasterVendorByBpIsMappedNot("Yes");
                System.out.println("In Ajax Cont Vendor List Size: " + vendorList.size());
                JSONArray jsonVendorArr = new JSONArray(vendorList);
                out.println(jsonVendorArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("SaveExtraaRatedParameter")) {
            try {
                System.out.println("SaveExtraaRatedParameter");
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");

                WorkOrderRfqHeader rfqHeaderObj = rfqRfpUtilWS.findRfqHeaderById(Integer.parseInt(rfqId));

                String extraaRatedParameterDetailsAsJsonArrString = request.getParameter("extraaRatedParameterDetailsAsJsonArrString");

                JSONArray jsonArray = new JSONArray(extraaRatedParameterDetailsAsJsonArrString);
                System.out.println("jsonArray: " + jsonArray);
                System.out.println("jsonArray length: " + jsonArray.length());

                System.out.println("rfqId: " + rfqId);
                System.out.println("extraaRatedParameterDetailsAsJsonArrString: " + extraaRatedParameterDetailsAsJsonArrString);

                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject ratedParameterDetails = jsonArray.getJSONObject(i);

                    String tempMappingId = ratedParameterDetails.getString("MappingId");
                    String vendorId = ratedParameterDetails.getString("VendorId");
                    String ratedParameter = ratedParameterDetails.getString("RatedParameter");
                    String score = ratedParameterDetails.getString("Score");
                    String ratedParameterDesc = ratedParameterDetails.getString("RatedParameterDesc");

                    System.out.println("tempMappingId: " + tempMappingId);
                    System.out.println("vendorId: " + vendorId);
                    System.out.println("ratedParameter: " + ratedParameter);
                    System.out.println("score: " + score);
                    System.out.println("ratedParameterDesc: " + ratedParameterDesc);

                    List<SupplierHeader> list = rfqRfpUtilWS.findSupplierHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                    System.out.println("SupplierHeader List Size: " + list.size());
                    if (!list.isEmpty()) {
                        SupplierHeader supplierHeaderobj = list.get(0);

                        if (tempMappingId != null && !tempMappingId.equals("")) {
                            SupplierHeaderRatedParameterMapping mappingObj = rfqRfpUtilWS.getSupplierHeaderRatedParameterMappingById(Integer.parseInt(tempMappingId));

                            mappingObj.setDescription(ratedParameterDesc);
                            mappingObj.setRatedParameterScore(score);
                            mappingObj.setRatedParameter(ratedParameter);

                            rfqRfpUtilWS.updateSupplierHeaderRatedParameterMapping(mappingObj);
                            jArra.put(tempMappingId);
                        } else {
                            supplierHeaderRatedParameterMapping.setSerialNumber(i + 1);
                            supplierHeaderRatedParameterMapping.setWorkOrderSupplierHeaderTableid(supplierHeaderobj);
                            supplierHeaderRatedParameterMapping.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                            supplierHeaderRatedParameterMapping.setDescription(ratedParameterDesc);
                            supplierHeaderRatedParameterMapping.setRatedParameter(ratedParameter);
                            supplierHeaderRatedParameterMapping.setRatedParameterScore(score);

                            String mappingId = rfqRfpUtilWS.saveSupplierHeaderRatedParameterMapping(supplierHeaderRatedParameterMapping);
                            jArra.put(mappingId);
                        }
                    }
                }

                jObj.put("Result", "Success");
                jObj.put("MappingIds", jArra);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("DeleteExtraaRatedParameter")) {
            try {
                System.out.println("DeleteExtraaRatedParameter");
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");
                String mappingIdAsJsonArrString = request.getParameter("mappingIdAsJsonArrString");

                JSONArray jsonArray = new JSONArray(mappingIdAsJsonArrString);
                System.out.println("jsonArray: " + jsonArray);
                System.out.println("jsonArray length: " + jsonArray.length());

                System.out.println("rfqId: " + rfqId);
                System.out.println("jsonArray: " + jsonArray);

                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject mappingIdAsJsonObj = jsonArray.getJSONObject(i);
                    String mappingId = mappingIdAsJsonObj.getString("MappingId");

                    if (mappingId != null && !mappingId.equals("")) {
                        SupplierHeaderRatedParameterMapping mappingObj = rfqRfpUtilWS.getSupplierHeaderRatedParameterMappingById(Integer.parseInt(mappingId));
                        mappingObj.setStatus("Delete");
                        rfqRfpUtilWS.updateSupplierHeaderRatedParameterMapping(mappingObj);
                    }
                }

                jObj.put("Result", "Success");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindMasterVendorByVendorSubstringAndIsMappedNot")) {
            try {
                System.out.println("FindMasterVendorByVendorSubstringAndIsMappedNot");
                out = response.getWriter();

                String vendorNameCodeSubstring = request.getParameter("vendorNameCodeSubstring");
                System.out.println("vendorNameCodeSubstring: " + vendorNameCodeSubstring);

                List<MasterVendor> vendorMasterList = rfqRfpUtilWS.findMasterVendorByVendorSubstringAndIsMappedNot(vendorNameCodeSubstring, "Yes");
                JSONArray vendorMasterJsonArr = new JSONArray(vendorMasterList);

                out.println(vendorMasterJsonArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindVendorPerUnitPrice")) {
            try {
                System.out.println("FindVendorPerUnitPrice");
                out = response.getWriter();

                String vendorId = request.getParameter("vendorId");
                String insertionOrderId = request.getParameter("insertionOrderId");
                String rfqId = request.getParameter("rfqId");

                System.out.println("rfqId: " + rfqId);
                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("vendorId: " + vendorId);

                List<SupplierHeader> supplierHeaderList = rfqRfpUtilWS.findSupplierHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                System.out.println("supplierHeaderList size: " + supplierHeaderList.size());
                if (!supplierHeaderList.isEmpty()) {
                    SupplierHeader supplierHeaderObj = supplierHeaderList.get(0);
                    List<SupplierLineitem> supplierLineItemList = rfqRfpUtilWS.findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus(supplierHeaderObj.getId(), Integer.parseInt(insertionOrderId));
                    System.out.println("supplierLineItemList size: " + supplierLineItemList.size());
                    if (!supplierLineItemList.isEmpty()) {
                        SupplierLineitem supplierLineItemObj = supplierLineItemList.get(0);
                        String vendorPerUnitPrice = supplierLineItemObj.getVendorpriceofferedperunit();
                        System.out.println("vendorPerUnitPrice: " + vendorPerUnitPrice);
                        jObj.put("vendorPerUnitPrice", vendorPerUnitPrice);
                    }
                }
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindSumOfConditionAmtByLinkId")) {
            try {
                System.out.println("FindSumOfConditionAmtByLinkId");
                out = response.getWriter();

                String linkId = request.getParameter("linkId");
                String vendorCode = request.getParameter("vendorCode");
                String includeOrExcludeVendor = request.getParameter("includeOrExcludeVendor");

                System.out.println("linkId: " + linkId);
                System.out.println("vendorCode: " + vendorCode);
                System.out.println("includeOrExcludeVendor: " + includeOrExcludeVendor);

                if (includeOrExcludeVendor != null && includeOrExcludeVendor.equals("IncludingVendor")) {
                    BigDecimal amtSum = purchaseOrderWS.findSumOfConditionAmtByLinkId(linkId);
                    System.out.println("amtSum in IncludingVendor: " + amtSum);
                    if (amtSum == null) {
                        jObj.put("ConditionAmountSum", "0");
                    } else {
                        jObj.put("ConditionAmountSum", amtSum.toString());
                    }
                } else {
                    BigDecimal amtSum = purchaseOrderWS.findSumOfConditionAmtByLinkIdAndVendorCode(linkId, vendorCode);
                    System.out.println("amtSum in ExcludingVendor: " + amtSum);
                    if (amtSum == null) {
                        jObj.put("ConditionAmountSum", "0");
                    } else {
                        jObj.put("ConditionAmountSum", amtSum.toString());
                    }
                }
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindSumOfConditionAmtByLinkIdInStandAlone")) {
            try {
                System.out.println("FindSumOfConditionAmtByLinkIdInStandAlone");
                out = response.getWriter();

                String linkId = request.getParameter("linkId");
                String vendorCode = request.getParameter("vendorCode");
                String includeOrExcludeVendor = request.getParameter("includeOrExcludeVendor");

                System.out.println("linkId: " + linkId);
                System.out.println("vendorCode: " + vendorCode);
                System.out.println("includeOrExcludeVendor: " + includeOrExcludeVendor);

                if (includeOrExcludeVendor != null && includeOrExcludeVendor.equals("IncludingVendor")) {
                    BigDecimal amtSum = purchaseOrderWS.findSumOfConditionAmtByLinkIdInStandAlone(linkId);
                    System.out.println("amtSum in IncludingVendor: " + amtSum);
                    if (amtSum == null) {
                        jObj.put("ConditionAmountSum", "0");
                    } else {
                        jObj.put("ConditionAmountSum", amtSum.toString());
                    }
                } else {
                    BigDecimal amtSum = purchaseOrderWS.findSumOfConditionAmtByLinkIdAndVendorCodeInStandAlone(linkId, vendorCode);
                    System.out.println("amtSum in ExcludingVendor: " + amtSum);
                    if (amtSum == null) {
                        jObj.put("ConditionAmountSum", "0");
                    } else {
                        jObj.put("ConditionAmountSum", amtSum.toString());
                    }
                }
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindActiveVendorAndProspect")) {
            try {
                System.out.println("FindActiveVendorAndProspect");
                out = response.getWriter();

                List<VendorDetails> vendorList = rfqRfpUtilWS.findByStatusAndType("Active", "Vendor");
                List<VendorDetails> vendorSapList = rfqRfpUtilWS.findByStatusAndType("Active", "SAP");
                List<VendorDetails> prospectList = rfqRfpUtilWS.findByStatusAndType("Active", "Prospect");
                List<MasterVendor> sapVendorList = rfqRfpUtilWS.findMasterVendorByBpIsMappedNot("Yes");
                
                System.out.println("vendorList size: " + vendorList.size());
                System.out.println("vendorSapList size: " + vendorSapList.size());
                System.out.println("prospectList size: " + prospectList.size());
                System.out.println("sapVendorList size: " + sapVendorList.size());
                
                JSONArray vendorJsonArr = new JSONArray(vendorList);
                JSONArray vendorSapJsonArr = new JSONArray(vendorSapList);
                JSONArray prospectJsonArr = new JSONArray(prospectList);
                JSONArray sapVendorJsonArr = new JSONArray(sapVendorList);

                jObj.put("VendorArr", vendorJsonArr);
                jObj.put("VendorSapArr", vendorSapJsonArr);
                jObj.put("ProspectArr", prospectJsonArr);
                jObj.put("SapVendorJsonArr", sapVendorJsonArr);

                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UploadStandalonePoDocumentsToDMS")) {
            try {
                System.out.println("UploadStandalonePoDocumentsToDMS");
                out = response.getWriter();

                String poNumber = request.getParameter("PoNumber");
                String pid = request.getParameter("PID");
                String poHeaderId = request.getParameter("poHeaderId");

                System.out.println("poNumber: " + poNumber);
                System.out.println("pid: " + pid);
                System.out.println("poHeaderId: " + poHeaderId);

                NGBPExtPOCreation ext = standalonePoWSUtil.getNGBPExtPOCreationById(poHeaderId);
                System.out.println("ext: " + ext);

                standalonePoDocumentInputBean.setPid(pid);
                standalonePoDocumentInputBean.setPoNumber(poNumber);
                standalonePoDocumentInputBean.setAttachment1name(ext.getAttachment1name());
                standalonePoDocumentInputBean.setAttachment2name(ext.getAttachment2name());
                standalonePoDocumentInputBean.setAttachment3name(ext.getAttachment3name());
                standalonePoDocumentInputBean.setAttachment4name(ext.getAttachment4name());
                standalonePoDocumentInputBean.setAttachment5name(ext.getAttachment5name());
                standalonePoDocumentInputBean.setAttachment1(ext.getAttachment1());
                standalonePoDocumentInputBean.setAttachment2(ext.getAttachment2());
                standalonePoDocumentInputBean.setAttachment3(ext.getAttachment3());
                standalonePoDocumentInputBean.setAttachment4(ext.getAttachment4());
                standalonePoDocumentInputBean.setAttachment5(ext.getAttachment5());

                StandalonePoDocumentOutputBean output = standalonePoWSUtil.uploadStandalonePoDocumentToDMS(standalonePoDocumentInputBean);

                System.out.println("MainCode: " + output.getMainCode());
                System.out.println("Pid: " + output.getProcessInstanceId());
                System.out.println("Message: " + output.getMessage());

                jObj.put("MainCode", output.getMainCode());
                jObj.put("Pid", output.getProcessInstanceId());
                jObj.put("Message", output.getMessage());

                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getProfitabilitySegmentByLinkIdAndServiceLineItemNumber")) {
            try {
                System.out.println("getProfitabilitySegmentByLinkIdAndServiceLineItemNumber");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                String serviceLineItemNumber = request.getParameter("serviceLineItemNumber");
                System.out.println("linkid :" + linkid);
                System.out.println("serviceLineItemNumber :" + serviceLineItemNumber);

                List<NGBPCmplxPOCreationLineItemProfitabilitySegment> segmentList = purchaseOrderWS.getProfitabilitySegmentByLinkIdAndServiceLineItemNumber(linkid, serviceLineItemNumber);
                System.out.println("In Ajax Cont Profitability Segment Size: " + segmentList.size());
                JSONArray jsonArray = new JSONArray(segmentList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getProfitabilitySegmentByLinkIdAndServiceLineItemNumberInPrRfq")) {
            try {
                System.out.println("getProfitabilitySegmentByLinkIdAndServiceLineItemNumberInPrRfq");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                String serviceLineItemNumber = request.getParameter("serviceLineItemNumber");
                String insertionOrderId = request.getParameter("insertionOrderId");

                System.out.println("linkid :" + linkid);
                System.out.println("serviceLineItemNumber :" + serviceLineItemNumber);
                System.out.println("insertionOrderId :" + insertionOrderId);

//                List<ProfitabilitySegment> segmentList = purchaseOrderWS.getProfitabilitySegmentByLinkIdAndServiceLineItemNumberInPrRfq(linkid, serviceLineItemNumber);
                List<ProfitabilitySegment> segmentList = purchaseOrderWS.findProfitabilitySegmentByInsertionOrderIdAndServiceLineItemNumber(insertionOrderId, serviceLineItemNumber);
                System.out.println("In Ajax Cont Profitability Segment Size: " + segmentList.size());
                JSONArray jsonArray = new JSONArray(segmentList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("generatePoRunningSequence")) {
            try {
                System.out.println("generatePoRunningSequence");
                out = response.getWriter();
                String prType = request.getParameter("prType");
                System.out.println("prType :" + prType);

                List<PoRunningSequenceBean> seqList = purchaseOrderWS.callPoRunningSequenceStoredProcedure(prType);
                System.out.println("seqList Size: " + seqList.size());

                Date today = new Date();
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(today);

                int month = calendar.get(Calendar.MONTH) + 1;
                int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
                int year = calendar.get(Calendar.YEAR);

                String generatedPoNumber = "";
                if (!seqList.isEmpty()) {
                    PoRunningSequenceBean bean = seqList.get(0);
                    int runningSeq = bean.getPoRunningSeqNo();
                    System.out.println("runningSeq: " + runningSeq);

                    if (prType != null) {
                        switch (prType) {
                            case "Material": {
                                generatedPoNumber = "GPO-" + String.format("%02d", dayOfMonth) + "-" + String.format("%02d", month) + "-" + year + "-" + String.format("%03d", runningSeq);
                                break;
                            }
                            case "Service": {
                                generatedPoNumber = "SPO-" + String.format("%02d", dayOfMonth) + "-" + String.format("%02d", month) + "-" + year + "-" + String.format("%03d", runningSeq);
                                break;
                            }
                        }
                    }
                }
                System.out.println("generatedPoNumber: " + generatedPoNumber);

                jObj.put("GeneratedPoNumber", generatedPoNumber);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getTrackingNumberByCompanyCode")) {
            try {
                System.out.println("getTrackingNumberByCompanyCode:::::::::");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode :" + companyCode);
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
                String userId = buyer.getUsername();
                List<MasterDepartment> userIdList = purchaseOrderWS.findMasterUserIdDepartmentByUserId(userId);
                System.out.println("In Ajax Cont userIdList: " + userIdList.size());
                JSONArray jsonArray = new JSONArray(userIdList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("PoAcknowledgementReport")) {
            try {
                System.out.println("PoAcknowledgementReport:::::::::");
                out = response.getWriter();

                String PoAckFromDate = request.getParameter("PoAckFromDate");
                String PoAckToDate = request.getParameter("PoAckToDate");
                String PoAckVendorCode = request.getParameter("PoAckVendorCode");

                System.out.println("PoAckFromDate :" + PoAckFromDate);
                System.out.println("PoAckToDate :" + PoAckToDate);
                System.out.println("PoAckVendorCode :" + PoAckVendorCode);

                List<NGExtPOCreation> ngExtPoCreationList = purchaseOrderWS.findPoAcknowledgementReport(PoAckFromDate, PoAckToDate, PoAckVendorCode);
                System.out.println("ngExtPoCreationList size: " + ngExtPoCreationList.size());

                JSONArray jsonArray = new JSONArray(ngExtPoCreationList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findDetailsForPersonalSettingsByCompanyCode")) {
            try {
                System.out.println("findDetailsForPersonalSettingsByCompanyCode");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode :" + companyCode);

                List<MasterPurchaseOrg> purchaseList = purchaseOrderWS.getAllPurchaseOrgByProcessType();
                List<MasterCurrency> currencyList = purchaseOrderWS.getMasterCurrencyByProcessType();
                List<MasterPlant> plantList = purchaseOrderWS.getMasterPlantByProcessType();

                System.out.println("purchaseList Size: " + purchaseList.size());
                JSONArray purOrgJsonArray = new JSONArray(purchaseList);
                JSONArray currencyJsonArray = new JSONArray(currencyList);
                JSONArray plantJsonArray = new JSONArray(plantList);

                jObj.put("purOrgJsonArray", purOrgJsonArray);
                jObj.put("currencyJsonArray", currencyJsonArray);
                jObj.put("plantJsonArray", plantJsonArray);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getMaterialGroup")) {
            try {
                System.out.println("getMaterialGroup:::::::::");
                out = response.getWriter();
                List<MasterMaterialGroup> materialGroupList = purchaseOrderWS.getMaterialGroupByProcessType();
                System.out.println("In Ajax Cont materialGroupList: " + materialGroupList.size());
                JSONArray jsonArray = new JSONArray(materialGroupList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getAllMasterIncoTerms")) {
            try {
                System.out.println("getAllMasterIncoTerms:::::::::");
                out = response.getWriter();
                List<MasterIncoterms> incoTermsList = purchaseOrderWS.getAllMasterIncoTerms();
                System.out.println("In Ajax Cont incoTermsList: " + incoTermsList.size());
                JSONArray jsonArray = new JSONArray(incoTermsList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("PrToPoCycleTimeReport")) {
            try {
                System.out.println("PrToPoCycleTimeReport:::::::::");
                out = response.getWriter();
                DateFormat formatFrom = new SimpleDateFormat("dd.MM.yyyy");
                DateFormat formatTo = new SimpleDateFormat("MM-dd-yyyy");

                String FromDate = request.getParameter("FromDate");
                String ToDate = request.getParameter("ToDate");
                String BuyerId = request.getParameter("BuyerId");
                String TeamLeadId = request.getParameter("TeamLeadId");

                System.out.println("FromDate :" + FromDate);
                System.out.println("ToDate :" + ToDate);
                System.out.println("BuyerId :" + BuyerId);
                System.out.println("TeamLeadId :" + TeamLeadId);

                if (FromDate != null && !FromDate.trim().equalsIgnoreCase("")) {
                    try {
                        Date FromDate_date = formatFrom.parse(FromDate);
                        FromDate = formatTo.format(FromDate_date);
                        System.out.println("FromDate_date: " + FromDate);
                    } catch (ParseException e) {
                        System.out.println(e);
                    }
                }
                if (ToDate != null && !ToDate.trim().equalsIgnoreCase("")) {
                    try {
                        Date ToDate_date = formatFrom.parse(ToDate);
                        ToDate = formatTo.format(ToDate_date);
                        System.out.println("ToDate_date: " + ToDate);
                    } catch (ParseException e) {
                        System.out.println(e);
                    }
                }

                List<PrToPOCycleTimeReportBean> list = reportWSUtil.callPrToPoCycleTimeStoredProcedure(FromDate, ToDate, BuyerId, TeamLeadId);
                System.out.println("PrToPoCycleTimeReport List Size: " + list.size());

                JSONArray jsonArray = new JSONArray(list);

                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("viewPrDoc")) {
            try {
                System.out.println("viewPrDoc:::::::::");
                out = response.getWriter();
                String name = request.getParameter("name");
                System.out.println("name :" + name);
                List<Integer> list = purchaseOrderWS.findFolderIndexByName(name);
                System.out.println("list size: " + list.size());
                JSONArray jsonArray = new JSONArray(list);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("viewPrLineItemDoc")) {
            try {
                System.out.println("viewPrLineItemDoc:::::::::");
                out = response.getWriter();
                String linkId = request.getParameter("linkId");
                String procInstId = request.getParameter("procInstId");

                System.out.println("linkId :" + linkId);
                System.out.println("procInstId :" + procInstId);

                List<Integer> list = purchaseOrderWS.findFolderIndexForViewPrLineItemDoc(linkId, procInstId);
                System.out.println("list size: " + list.size());
                JSONArray jsonArray = new JSONArray(list);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("viewRfqDoc")) {
            try {
                System.out.println("viewRfqDoc:::::::::");
                out = response.getWriter();
                String linkId = request.getParameter("linkId");
                String rfqNumber = request.getParameter("rfqNumber");

                System.out.println("linkId :" + linkId);
                System.out.println("rfqNumber :" + rfqNumber);

                List<Integer> list = purchaseOrderWS.findFolderIndexForViewRfqDoc(linkId, rfqNumber);
                System.out.println("list size: " + list.size());
                JSONArray jsonArray = new JSONArray(list);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getAllPurchaseOrgByProcessType")) {
            try {
                System.out.println("getAllPurchaseOrgByProcessType");
                out = response.getWriter();
                List<MasterPurchaseOrg> purchaseList = purchaseOrderWS.getAllPurchaseOrgByProcessType();
                JSONArray jsonPurchOrgArr = new JSONArray(purchaseList);
                out.println(jsonPurchOrgArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findNGBPCmplxPoCreationLimitsByLinkID")) {
            try {
                System.out.println("findNGBPCmplxPoCreationLimitsByLinkID");
                out = response.getWriter();
                String linkId = request.getParameter("linkId");
                System.out.println("linkId :" + linkId);
                List<NGBPCmplxPOCreationLimits> list = purchaseOrderWS.findNGBPCmplxPoCreationLimitsByLinkID(linkId);
                JSONArray jsonPoLimitsArr = new JSONArray(list);
                out.println(jsonPoLimitsArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getFunctionalAreaByCompanyCode")) {
            try {
                System.out.println("getFunctionalAreaByCompanyCode:::::::::");
                out = response.getWriter();
                String companycode = request.getParameter("companycode");
                List<MasterFunctionalArea> areaList = purchaseOrderWS.getFunctionalAreaByCompanyCode(companycode);
                System.out.println("In Ajax Cont areaList: " + areaList.size());
                JSONArray jsonArray = new JSONArray(areaList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveStandAloneConditionsDataOnAddingInHeader")) {
            try {
                System.out.println("saveStandAloneConditionsDataOnAddingInHeader in standalone");
                out = response.getWriter();
                String condition = request.getParameter("conditionLineLevelArr");
                String linkidArrayAsString = request.getParameter("linkidArrayAsString");
                String PrCurrencyArrayAsString = request.getParameter("PrCurrencyArrayAsString");
                String extId = request.getParameter("extId");
                String indexnumber = request.getParameter("indexnumber");
                System.out.println("indexnumber :" + indexnumber);
                String conditiontype = request.getParameter("conditiontype");
                String[] linkIdArray = linkidArrayAsString.split(",");
                System.out.println("PrCurrencyArrayAsString  :::" + PrCurrencyArrayAsString);
                String[] PrCurrencyArray = PrCurrencyArrayAsString.split(",");
                String newColumnDetails = request.getParameter("newColumnDetails");
                System.out.println("newColumnDetails: " + newColumnDetails);
                JSONObject newColumnDetailsObj = new JSONObject(newColumnDetails);

                JSONArray conditionAsJsonArray = new JSONArray(condition);
                System.out.println("conditionAsJsonArray saveConditionsDataOnAddingInHeader :" + conditionAsJsonArray.toString());
                for (int k = 0; k < linkIdArray.length; k++) {
                    for (int i = 0; i < conditionAsJsonArray.length(); i++) {
                        JSONObject jsonobj = conditionAsJsonArray.getJSONObject(i);
                        String linkid = jsonobj.getString("linkid");
                        System.out.println("linkIdArray in array :" + linkIdArray[k] + " ,linkid :" + linkid);
                        if (linkIdArray[k].equals(linkid)) {
                            float totalamount = 0;
                            float totalper = 0;
                            float totalCondVal = 0;
                            System.out.println("LinkId in saveConditionsDataOnAddingInHeader :" + jsonobj.getString("linkid"));
                            String condtype = jsonobj.getString("Ctype");
                            String changeid = jsonobj.getString("CHANGEID");
                            System.out.println("changeid :" + changeid);
                            System.out.println("LinkId in Array :" + linkIdArray[k] + " ,condtype :" + condtype);
                            if (condtype.equals(conditiontype)) {

                                for (int j = 0; j < conditionAsJsonArray.length(); j++) {
                                    JSONObject obj = conditionAsJsonArray.getJSONObject(j);
                                    String LinkId = jsonobj.getString("linkid");
                                    String contype = obj.getString("Ctype");
                                    System.out.println("LinkId :" + LinkId + " ,linkIdArray[k] :" + linkIdArray[k]);
                                    System.out.println("contype :" + contype + " ,conditiontype :" + conditiontype);
                                    if (linkIdArray[k].equals(LinkId) && contype.equals(conditiontype)) {
                                        System.out.println("SUNNY KUMAR PRAJAPATI+++");
                                        String amount = obj.getString("amount");
                                        String per = obj.getString("per");
                                        String condVal = obj.getString("conditionValue");
                                        totalamount = totalamount + Float.parseFloat(amount);
                                        totalper = totalper + Float.parseFloat(per);
                                        totalCondVal = totalCondVal + Float.parseFloat(condVal);
                                    }
                                }
                                System.out.println("totalamount :" + totalamount);
                                System.out.println("LinkId in Array :" + linkIdArray[k] + " ,condtype :" + condtype);
                            }
//                            List<NGBPCmplxPOCreationLineItemConditions> conditionList = standalonePoWSUtil.getSALineItemConditionByLinkIdAndConitionType(linkIdArray[k], condtype);
                            List<NGBPCmplxPOCreationLineItemConditions> conditionList = standalonePoWSUtil.getNGBPCmplxPOCreationLineItemConditionsByLinkIdAndConitionTypeAndChangeId(linkIdArray[k], condtype, changeid);
                            System.out.println("NGBPCmplxPOCreationLineItemConditions Size :" + conditionList.size());
                            if (!conditionList.isEmpty()) {
                                for (int j = 0; j < conditionList.size(); j++) {
                                    NGBPCmplxPOCreationLineItemConditions conditionObj = conditionList.get(j);
                                    conditionObj.setAmount(BigDecimal.valueOf(totalamount));
                                    conditionObj.setPerQuantity(BigDecimal.valueOf(totalper));
                                    conditionObj.setCondVal(BigDecimal.valueOf(totalCondVal));
                                    conditionObj.setStatus("Merge");
                                    purchaseOrderWSUtil.updateNGBPCmplxPOCreationLineItemConditions(conditionObj);
                                }
                            } else {
////                        for (int k = 0; k < linkIdArray.length; k++) {
                                nGBPCmplxPOCreationLineItemConditions.setCondName(jsonobj.getString("Cname"));
                                nGBPCmplxPOCreationLineItemConditions.setCondType(jsonobj.getString("Ctype"));
                                if (!"".equals(jsonobj.getString("amount"))) {
                                    nGBPCmplxPOCreationLineItemConditions.setAmount(new BigDecimal(jsonobj.getString("amount")));
                                } else {
                                    nGBPCmplxPOCreationLineItemConditions.setAmount(new BigDecimal(0.0));
                                }
//                            conditionsLineLevel.setAmount(new BigDecimal(jsonobj.getString("amount")));
                                nGBPCmplxPOCreationLineItemConditions.setCurrency(jsonobj.getString("prCurrency"));
                                if (!"".equals(jsonobj.getString("per"))) {
                                    nGBPCmplxPOCreationLineItemConditions.setPerQuantity(new BigDecimal(jsonobj.getString("per")));
                                } else {
                                    nGBPCmplxPOCreationLineItemConditions.setPerQuantity(new BigDecimal(0.0));
                                }
////                            conditionsLineLevel.setPer(new BigDecimal(jsonobj.getString("per")));
                                nGBPCmplxPOCreationLineItemConditions.setCondPricUnit(jsonobj.getString("ConditionPricingUnit"));
                                nGBPCmplxPOCreationLineItemConditions.setUoM(jsonobj.getString("UoM"));
                                if (!"".equals(jsonobj.getString("conditionValue"))) {
                                    nGBPCmplxPOCreationLineItemConditions.setCondVal(new BigDecimal(jsonobj.getString("conditionValue")));
                                } else {
                                    nGBPCmplxPOCreationLineItemConditions.setCondVal(new BigDecimal(0.0));
                                }
//
                                nGBPCmplxPOCreationLineItemConditions.setCurrency1(jsonobj.getString("Currency2"));
                                if (!"".equals(jsonobj.getString("ConditionValue2"))) {
                                    nGBPCmplxPOCreationLineItemConditions.setCondVal1(new BigDecimal(jsonobj.getString("ConditionValue2")));
                                } else {
                                    nGBPCmplxPOCreationLineItemConditions.setCondVal1(new BigDecimal(0.0));
                                }
//                                conditionsLineLevel.setLineitemId(itemCodeArray[k]);
                                nGBPCmplxPOCreationLineItemConditions.setLinkID(linkIdArray[k]);
//                                nGBPCmplxPOCreationLineItemConditions.setPrItemNumber(itemCodeArray[k]);
                                nGBPCmplxPOCreationLineItemConditions.setStNumber(String.valueOf(jsonobj.getString("conditionSTUNR")));
                                nGBPCmplxPOCreationLineItemConditions.setConditionCount(jsonobj.getString("conditionZAEHK"));
                                nGBPCmplxPOCreationLineItemConditions.setKappl(jsonobj.getString("conditionKAPPL"));
                                nGBPCmplxPOCreationLineItemConditions.setKvsl1(jsonobj.getString("conditionKVSL1"));
                                nGBPCmplxPOCreationLineItemConditions.setKvsl2(jsonobj.getString("conditionKVSL2"));
                                nGBPCmplxPOCreationLineItemConditions.setChangeId(jsonobj.getString("CHANGEID"));
                                nGBPCmplxPOCreationLineItemConditions.setVendorName(jsonobj.getString("vendorname"));
                                nGBPCmplxPOCreationLineItemConditions.setVendorCode(jsonobj.getString("vendorcode"));
                                nGBPCmplxPOCreationLineItemConditions.setStatus("Insert");
                                nGBPCmplxPOCreationLineItemConditions.setAddedFrom(jsonobj.getString("addedFrom"));
                                nGBPCmplxPOCreationLineItemConditions.setBaseUOM(newColumnDetailsObj.getString("baseUom"));
                                nGBPCmplxPOCreationLineItemConditions.setUomextra(newColumnDetailsObj.getString("uomExtra"));
                                nGBPCmplxPOCreationLineItemConditions.setNgStatus(newColumnDetailsObj.getString("status"));

                                if (newColumnDetailsObj.getString("convFrom") != null && !newColumnDetailsObj.getString("convFrom").equals("")) {
                                    nGBPCmplxPOCreationLineItemConditions.setDenominatorforconv(Integer.parseInt(newColumnDetailsObj.getString("convFrom")));
                                }
                                if (newColumnDetailsObj.getString("convTo") != null && !newColumnDetailsObj.getString("convTo").equals("")) {
                                    nGBPCmplxPOCreationLineItemConditions.setNumerator(Integer.parseInt(newColumnDetailsObj.getString("convTo")));
                                }
//
                                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                                Date today = new Date();
                                String condPriceDate = df.format(today);
                                nGBPCmplxPOCreationLineItemConditions.setCondPriceDate(condPriceDate);
//
                                String conditionCurrency = PrCurrencyArray[k];
                                String poCurrency = jsonobj.getString("poCurrency");
                                if (conditionCurrency.length() > 1) {
                                    if (conditionCurrency.equals(poCurrency)) {
                                        nGBPCmplxPOCreationLineItemConditions.setCondCurncyExchangeRate("1.0000");
                                    } else {
                                        List<MasterExchangeRate> condCurncyExchangeRateList = standalonePoWSUtil.findExchangeRateByFromCurrencyAndToCurrency(poCurrency, conditionCurrency);
                                        if (!condCurncyExchangeRateList.isEmpty()) {
                                            MasterExchangeRate exchangeRateObj = condCurncyExchangeRateList.get(0);
                                            nGBPCmplxPOCreationLineItemConditions.setCondCurncyExchangeRate(exchangeRateObj.getExchangeRate().toString());
                                        } else {
                                            nGBPCmplxPOCreationLineItemConditions.setCondCurncyExchangeRate("");
                                        }
                                    }
                                } else {
                                    nGBPCmplxPOCreationLineItemConditions.setCondCurncyExchangeRate("");
                                }
                                String message = standalonePoWSUtil.saveNGBPCmplxPOCreationLineItemConditions(nGBPCmplxPOCreationLineItemConditions);
                                System.out.println("message :" + message);
////                        }
                            }
                        }
                    }

                }
//                List<MasterItemCategory> itemCategList = getAllItemCategory();
//                JSONArray jsonArr = new JSONArray(itemCategList);
//                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("deleteHeaderConditionHeaderInStandAlone")) {
            try {
                System.out.println("deleteHeaderConditionHeaderInStandAlone");
                out = response.getWriter();
                String linkidArrayAsString = request.getParameter("linkidArrayAsString");
                String conditionType = request.getParameter("conditionType");
                String amount = request.getParameter("amount");
                String per = request.getParameter("per");
                String condValueArrayAsString = request.getParameter("conditionValue");
                JSONArray conditionValAsJsonArray = new JSONArray(condValueArrayAsString);
                System.out.println("conditionType in standalone: " + conditionType);
                String[] linkIdArray = linkidArrayAsString.split(",");
                String count = request.getParameter("count");
                System.out.println("count: " + count);
//                String[] condValue = condValueArrayAsString.split(",");
                for (int i = 0; i < linkIdArray.length; i++) {
//                    List<NGBPCmplxPOCreationLineItemConditions> conditionList = standalonePoWSUtil.getSALineItemConditionByLinkIdAndConitionType(linkIdArray[i], conditionType);
                    List<NGBPCmplxPOCreationLineItemConditions> conditionList = standalonePoWSUtil.getNGBPCmplxPOCreationLineItemConditionsByLinkIdAndConitionTypeAndChangeId(linkIdArray[i], conditionType, "I");
                    System.out.println("conditionList Size :" + conditionList.size());
                    if (!conditionList.isEmpty()) {
                        for (int j = 0; j < conditionList.size(); j++) {
                            NGBPCmplxPOCreationLineItemConditions condObj = conditionList.get(j);
                            String status = condObj.getStatus();
                            System.out.println("status: " + status);
                            if ("Insert".equals(status)) {
                                System.out.println("Inside Insert");
                                condObj.setLinkID("");
                                purchaseOrderWSUtil.updateNGBPCmplxPOCreationLineItemConditions(condObj);
                            } else if ("Merge".equals(status)) {
                                System.out.println("Inside Merge");
                                BigDecimal Amount = condObj.getAmount();
                                BigDecimal Per = condObj.getPerQuantity();
                                BigDecimal conditionValue = condObj.getCondVal();
//
                                condObj.setAmount(Amount.subtract(new BigDecimal(amount)));
                                if (!"".equals(per)) {
                                    condObj.setPerQuantity(Per.subtract(new BigDecimal(per)));
                                }
                                System.out.println("conditionValAsJsonArray size :" + conditionValAsJsonArray.length());
                                for (int k = 0; k < conditionValAsJsonArray.length(); k++) {
                                    JSONObject jsonobj = conditionValAsJsonArray.getJSONObject(k);
                                    if (jsonobj.getString("LinkID").equals(linkIdArray[i])) {
                                        condObj.setCondVal((conditionValue.subtract(new BigDecimal(jsonobj.getString("condValue")))));
                                    }
                                }
                                if (Integer.parseInt(count) > 2) {
                                    condObj.setStatus("Merge");
                                } else {
                                    condObj.setStatus("Insert");
                                }

//                                condObj.setStatus("Insert");
                                purchaseOrderWSUtil.updateNGBPCmplxPOCreationLineItemConditions(condObj);
                            }
                        }
                    }
                }
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("findAccAssCatByAccountAssignmentCode")) {
            try {
                System.out.println("findAccAssCatByAccountAssignmentCode");
                out = response.getWriter();
                String code = request.getParameter("code");
                System.out.println("code :" + code);
                List<AccountAssignmentCategoryMaster> list = purchaseOrderWS.findAccAssCatByAccountAssignmentCode(code);
                if (!list.isEmpty()) {
                    AccountAssignmentCategoryMaster obj = list.get(0);
                    jObj.put("AccAssCat", obj.getAccountAssignmentCategory());
                } else {
                    jObj.put("AccAssCat", "NotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindDraftPoDetails")) {
            try {
                System.out.println("FindDraftPoDetails");
                out = response.getWriter();
                String draftPoExtId = request.getParameter("draftPoExtId");
                System.out.println("draftPoExtId :" + draftPoExtId);

                ExtPoCreationDraft extPoCreationDraftObj = purchaseOrderWS.getExtPoCreationDraftById(Integer.parseInt(draftPoExtId));
                JSONObject extPoCreationDraftJsonObj = new JSONObject(extPoCreationDraftObj);
                jObj.put("extPoCreationDraftObj", extPoCreationDraftJsonObj);

                List<CmplxPoCreationDeliveryInvoiceDraft> cmplxPoCreationDeliveryInvoiceDraftList = purchaseOrderWS.findCmplxPoCreationDeliveryInvoiceDraftByExtId(Integer.parseInt(draftPoExtId));
                if (cmplxPoCreationDeliveryInvoiceDraftList != null && !cmplxPoCreationDeliveryInvoiceDraftList.isEmpty()) {
                    CmplxPoCreationDeliveryInvoiceDraft cmplxPoCreationDeliveryInvoiceDraftObj = cmplxPoCreationDeliveryInvoiceDraftList.get(0);
                    JSONObject cmplxPoCreationDeliveryInvoiceDraftJsonObj = new JSONObject(cmplxPoCreationDeliveryInvoiceDraftObj);
                    jObj.put("cmplxPoCreationDeliveryInvoiceDraftObj", cmplxPoCreationDeliveryInvoiceDraftJsonObj);
                }

                List<CmplxPoCreationVendorAddressDraft> cmplxPoCreationVendorAddressDraftList = purchaseOrderWS.findCmplxPoCreationVendorAddressDraftByExtId(Integer.parseInt(draftPoExtId));
                if (cmplxPoCreationVendorAddressDraftList != null && !cmplxPoCreationVendorAddressDraftList.isEmpty()) {
                    CmplxPoCreationVendorAddressDraft cmplxPoCreationVendorAddressDraftObj = cmplxPoCreationVendorAddressDraftList.get(0);
                    JSONObject cmplxPoCreationVendorAddressDraftJsonObj = new JSONObject(cmplxPoCreationVendorAddressDraftObj);
                    jObj.put("cmplxPoCreationVendorAddressDraftObj", cmplxPoCreationVendorAddressDraftJsonObj);
                }

                List<CmplxPoCreationCommunicationDraft> cmplxPoCreationCommunicationDraftList = purchaseOrderWS.findCmplxPoCreationCommunicationDraftByExtId(Integer.parseInt(draftPoExtId));
                if (cmplxPoCreationCommunicationDraftList != null && !cmplxPoCreationCommunicationDraftList.isEmpty()) {
                    CmplxPoCreationCommunicationDraft cmplxPoCreationCommunicationDraftObj = cmplxPoCreationCommunicationDraftList.get(0);
                    JSONObject cmplxPoCreationCommunicationDraftJsonObj = new JSONObject(cmplxPoCreationCommunicationDraftObj);
                    jObj.put("cmplxPoCreationCommunicationDraftObj", cmplxPoCreationCommunicationDraftJsonObj);
                }

                List<CmplxPoCreationHeaderTextDraft> cmplxPoCreationHeaderTextDraftList = purchaseOrderWS.findCmplxPoCreationHeaderTextDraftByExtId(Integer.parseInt(draftPoExtId));
                if (cmplxPoCreationHeaderTextDraftList != null && !cmplxPoCreationHeaderTextDraftList.isEmpty()) {
                    CmplxPoCreationHeaderTextDraft cmplxPoCreationHeaderTextDraftObj = cmplxPoCreationHeaderTextDraftList.get(0);
                    JSONObject cmplxPoCreationHeaderTextDraftJsonObj = new JSONObject(cmplxPoCreationHeaderTextDraftObj);
                    jObj.put("cmplxPoCreationHeaderTextDraftObj", cmplxPoCreationHeaderTextDraftJsonObj);
                }

                List<CmplxPoCreationCustomerDataDraft> cmplxPoCreationCustomerDataDraftList = purchaseOrderWS.findCmplxPoCreationCustomerDataDraftByExtId(Integer.parseInt(draftPoExtId));
                if (cmplxPoCreationCustomerDataDraftList != null && !cmplxPoCreationCustomerDataDraftList.isEmpty()) {
                    CmplxPoCreationCustomerDataDraft cmplxPoCreationCustomerDataDraftObj = cmplxPoCreationCustomerDataDraftList.get(0);
                    JSONObject cmplxPoCreationCustomerDataDraftJsonObj = new JSONObject(cmplxPoCreationCustomerDataDraftObj);
                    jObj.put("cmplxPoCreationCustomerDataDraftObj", cmplxPoCreationCustomerDataDraftJsonObj);
                }

                List<CmplxPoCreationConditionsDraft> cmplxPoCreationConditionsDraftList = purchaseOrderWSUtil.findCmplxPoCreationConditionsDraftByExt(Integer.parseInt(draftPoExtId));
                if (cmplxPoCreationConditionsDraftList != null && !cmplxPoCreationConditionsDraftList.isEmpty()) {
                    JSONArray cmplxPoCreationConditionsDraftJsonArr = new JSONArray(cmplxPoCreationConditionsDraftList);
                    jObj.put("cmplxPoCreationConditionsDraftArr", cmplxPoCreationConditionsDraftJsonArr);
                }

                List<CmplxPoCreationLineItemPoDraft> cmplxPoCreationLineItemPoDraftList = purchaseOrderWSUtil.findCmplxPoCreationLineItemPoDraftByExtId(Integer.parseInt(draftPoExtId));
                if (cmplxPoCreationLineItemPoDraftList != null && !cmplxPoCreationLineItemPoDraftList.isEmpty()) {
                    JSONArray cmplxPoCreationLineItemPoDraftJsonArr = new JSONArray(cmplxPoCreationLineItemPoDraftList);
                    jObj.put("cmplxPoCreationLineItemPoDraftArr", cmplxPoCreationLineItemPoDraftJsonArr);
                }

                List<CmplxPOCreationApproverDetailsDraft> cmplxPOCreationApproverDetailsDraftList = purchaseOrderWSUtil.findCmplxPOCreationApproverDetailsDraftByExtId(Integer.parseInt(draftPoExtId));
                if (cmplxPOCreationApproverDetailsDraftList != null && !cmplxPOCreationApproverDetailsDraftList.isEmpty()) {
                    JSONArray cmplxPOCreationApproverDetailsDraftJsonArr = new JSONArray(cmplxPOCreationApproverDetailsDraftList);
                    jObj.put("cmplxPOCreationApproverDetailsDraftArr", cmplxPOCreationApproverDetailsDraftJsonArr);
                }

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findPrLineByInertionOrderId")) {
            try {
                System.out.println("findPrLineByInertionOrderId");
                out = response.getWriter();
                String prLineInsertionOrderId = request.getParameter("prLineInsertionOrderId");
                System.out.println("prLineInsertionOrderId :" + prLineInsertionOrderId);
                NewgenPRLineItem prLineObj = purchaseOrderWS.getPrDetailsByInsertionOrderId(Integer.parseInt(prLineInsertionOrderId));
                JSONObject prLineJsonObj = new JSONObject(prLineObj);
                jObj.put("prLineObj", prLineJsonObj);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findLastPoDetailsByInertionOrderId")) {
            try {
                System.out.println("findLastPoDetailsByInertionOrderId");
                out = response.getWriter();
                String prLineInsertionOrderId = request.getParameter("prLineInsertionOrderId");
                System.out.println("prLineInsertionOrderId :" + prLineInsertionOrderId);
                List<LastPoDetailsBean> lastPoDetailsBeanList = purchaseOrderWS.callLastPoDetailsStoredProcedure(Integer.parseInt(prLineInsertionOrderId));
                System.out.println("lastPoDetailsBeanList size: " + lastPoDetailsBeanList.size());
                JSONArray lastPoDetailsJsonArr = new JSONArray(lastPoDetailsBeanList);
                out.println(lastPoDetailsJsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("deleteVendorGroupMapping")) {
            try {
                System.out.println("deleteVendorGroupMapping");
                out = response.getWriter();

                String groupId = request.getParameter("groupId");
                String vendorId = request.getParameter("vendorId");

                System.out.println("groupId :" + groupId);
                System.out.println("vendorId :" + vendorId);

                List<VendorGroupMapping> vendorGroupMappingList = rfqRfpUtilWS.findVendorGroupMappingByVendorIdAndGroupId(Integer.parseInt(vendorId), Integer.parseInt(groupId));
                System.out.println("vendorGroupMappingList size: " + vendorGroupMappingList.size());
                if (!vendorGroupMappingList.isEmpty()) {
                    VendorGroupMapping mapping = vendorGroupMappingList.get(0);
                    rfqRfpUtilWS.deleteVendorGroupMapping(mapping);
                    jObj.put("Result", "Success");
                } else {
                    jObj.put("Result", "Failed");
                }

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("MapVendorsToGroup")) {
            try {
                System.out.println("MapVendorsToGroup");
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

                out = response.getWriter();

                String groupId = request.getParameter("groupId");
                String vendorIdsForEditGroup = request.getParameter("vendorIdsForEditGroup");
                String sapVendorCodeForEditGroup = request.getParameter("sapVendorCodeForEditGroup");

                System.out.println("groupId : " + groupId);
                System.out.println("vendorIdsForEditGroup: " + vendorIdsForEditGroup);
                System.out.println("sapVendorCodeForEditGroup: " + sapVendorCodeForEditGroup);

                // SAP Vendor
                String newVendorIds = "";
                if (sapVendorCodeForEditGroup != null && !sapVendorCodeForEditGroup.trim().equals("")) {
                    List<MasterVendor> sapVendorMasterList = purchaseOrderWSUtil.findVendorMasterByMultipleVendorCode(sapVendorCodeForEditGroup);
                    System.out.println("sapVendorMasterList size: " + sapVendorMasterList.size());
                    for (int i = 0; i < sapVendorMasterList.size(); i++) {
                        MasterVendor vendorMasterObj = sapVendorMasterList.get(i);

                        vendorDetailsEntity.setType("SAP");
                        vendorDetailsEntity.setStatus("Active");
                        vendorDetailsEntity.setCode(vendorMasterObj.getVendorCode());
                        vendorDetailsEntity.setFirstname(vendorMasterObj.getVendorName());
                        vendorDetailsEntity.setEmailid(vendorMasterObj.getMailId());
                        vendorDetailsEntity.setAddress(vendorMasterObj.getAddress1());

                        String savedVendorId = rfqRfpUtilWS.saveProspect(vendorDetailsEntity);

                        if (i == sapVendorMasterList.size() - 1) {
                            newVendorIds += savedVendorId;
                        } else {
                            newVendorIds += savedVendorId + ",";
                        }

                        vendorMasterObj.setBpIsMapped("Yes");
                        purchaseOrderWSUtil.updateVendorMaster(vendorMasterObj);
                    }
                    System.out.println("newVendorIds 1: " + newVendorIds);
                    if (vendorIdsForEditGroup != null && !vendorIdsForEditGroup.trim().equals("")) {
                        vendorIdsForEditGroup += "," + newVendorIds;
                    } else {
                        vendorIdsForEditGroup = newVendorIds;
                    }
                    System.out.println("newVendorIds 2: " + vendorIdsForEditGroup);
                }

                List<VendorDetails> vendorList = rfqRfpUtilWS.findByMultipleVendorId(vendorIdsForEditGroup);
                System.out.println("vendorList size: " + vendorList.size());
                VendorGroup group = rfqRfpUtilWS.findVendorGroupById(Integer.parseInt(groupId));

                for (VendorDetails vendor : vendorList) {
                    vendorGroupMapping.setNgBpVendorGroupId(group);
                    vendorGroupMapping.setNgBpVendordetailsId(vendor);
                    rfqRfpUtilWS.saveVendorGroupMapping(vendorGroupMapping);
                }

                reportBuyerAuditLog.setActivityPerformed("Vendor Group Mapping Changed.");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                rfqRfpUtilWS.saveBuyerAuditLogReport(reportBuyerAuditLog);

                jObj.put("Result", "Success");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("AssociateGroup")) {
            try {
                System.out.println("AssociateGroup");
                out = response.getWriter();

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

                String vendorIdsForEditGroup = request.getParameter("vendorIdsForEditGroup");
                String sapVendorCodeForEditGroup = request.getParameter("sapVendorCodeForEditGroup");
                String GroupName = request.getParameter("GroupName");

                System.out.println("vendorIdsForEditGroup: " + vendorIdsForEditGroup);
                System.out.println("sapVendorCodeForEditGroup: " + sapVendorCodeForEditGroup);
                System.out.println("GroupName: " + GroupName);

                vendorGroup.setGroupname(GroupName);
                String groupid = rfqRfpUtilWS.saveVendorGroup(vendorGroup);

                // SAP Vendor
                String newVendorIds = "";
                if (sapVendorCodeForEditGroup != null && !sapVendorCodeForEditGroup.trim().equals("")) {
                    List<MasterVendor> sapVendorMasterList = purchaseOrderWSUtil.findVendorMasterByMultipleVendorCode(sapVendorCodeForEditGroup);
                    System.out.println("sapVendorMasterList size: " + sapVendorMasterList.size());
                    for (int i = 0; i < sapVendorMasterList.size(); i++) {
                        MasterVendor vendorMasterObj = sapVendorMasterList.get(i);

                        vendorDetailsEntity.setType("SAP");
                        vendorDetailsEntity.setStatus("Active");
                        vendorDetailsEntity.setCode(vendorMasterObj.getVendorCode());
                        vendorDetailsEntity.setFirstname(vendorMasterObj.getVendorName());
                        vendorDetailsEntity.setEmailid(vendorMasterObj.getMailId());
                        vendorDetailsEntity.setAddress(vendorMasterObj.getAddress1());

                        String savedVendorId = rfqRfpUtilWS.saveProspect(vendorDetailsEntity);

                        if (i == sapVendorMasterList.size() - 1) {
                            newVendorIds += savedVendorId;
                        } else {
                            newVendorIds += savedVendorId + ",";
                        }

                        vendorMasterObj.setBpIsMapped("Yes");
                        purchaseOrderWSUtil.updateVendorMaster(vendorMasterObj);
                    }
                    System.out.println("newVendorIds 1: " + newVendorIds);
                    if (vendorIdsForEditGroup != null && !vendorIdsForEditGroup.trim().equals("")) {
                        vendorIdsForEditGroup += "," + newVendorIds;
                    } else {
                        vendorIdsForEditGroup = newVendorIds;
                    }
                    System.out.println("newVendorIds 2: " + vendorIdsForEditGroup);
                }

                List<VendorDetails> vendorList = rfqRfpUtilWS.findByMultipleVendorId(vendorIdsForEditGroup);
                System.out.println("vendorList size: " + vendorList.size());
                VendorGroup group = rfqRfpUtilWS.findVendorGroupById(Integer.parseInt(groupid));

                for (VendorDetails vendor : vendorList) {
                    vendorGroupMapping.setNgBpVendorGroupId(group);
                    vendorGroupMapping.setNgBpVendordetailsId(vendor);

                    rfqRfpUtilWS.saveVendorGroupMapping(vendorGroupMapping);
                }

                reportBuyerAuditLog.setActivityPerformed(GroupName + " Vendor Group Created.");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                rfqRfpUtilWS.saveBuyerAuditLogReport(reportBuyerAuditLog);

                List<VendorGroup> groupList = rfqRfpUtilWS.getAllVendorGroup();

                for (VendorGroup obj : groupList) {
                    JSONObject innerObj = new JSONObject();
                    innerObj.put("GROUP_ID", obj.getId());
                    innerObj.put("GROUP_NAME", obj.getGroupname());

                    jArra.put(innerObj);
                }

                jObj.put("Result", "Success");
                jObj.put("GroupList", jArra);

                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getExtPOCreationIdByPONumber")) {
            try {
                System.out.println("getExtPOCreationIdByPONumber");
                out = response.getWriter();
                String poNumber = request.getParameter("poNumber");
                System.out.println("poNumber in getExtPOCreationIdByPONumber :" + poNumber);
                String poid = purchaseOrderWS.getNGBPExtPOCreationByPONumber(poNumber);
                System.out.println("poid in getExtPOCreationIdByPONumber : " + poid);
                out.println(poid);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("deleteDataFromDBForDeletedPR")) {
            try {
                System.out.println("deleteDataFromDBForDeletedPR:::::::::");
                out = response.getWriter();
                String lineItemNumber = request.getParameter("lineItemNumber");
                System.out.println("lineItemNumber deleteDataFromDBForDeletedPR :" + lineItemNumber);
                List<Services> servicesList = purchaseOrderWS.getServicesByLineItemNumber(lineItemNumber);
                if (!servicesList.isEmpty()) {
                    purchaseOrderWS.deleteAllServices(servicesList);
                }
                List<ProfitabilitySegment> segmentList = purchaseOrderWS.getProfitabilitySegmentByLineItemNumber(lineItemNumber);
                if (!segmentList.isEmpty()) {
                    purchaseOrderWS.deleteAllProfitabilitySegment(segmentList);
                }

                List<Limits> limitsList = purchaseOrderWS.findLimitsByLineItemNumber(lineItemNumber);
                if (!limitsList.isEmpty()) {
                    purchaseOrderWS.deleteAllFromLimits(limitsList);
                }
                List<QuantityDates> quantityList = purchaseOrderWS.getQuantityDatesByInsertionId(lineItemNumber);
                if (!quantityList.isEmpty()) {
                    purchaseOrderWS.deleteAllQuantityWeightByInsertionOrderId(quantityList);
                }
                List<DeliverySchedule> deliverySchList = purchaseOrderWS.getDeliveryScheduleByInsertionId(lineItemNumber);
                if (!deliverySchList.isEmpty()) {
                    purchaseOrderWS.deleteDeliverySchedule(deliverySchList);
                }
                List<Delivery> deliveryList = purchaseOrderWS.getDeliveryByInsertionId(lineItemNumber);
                if (!deliveryList.isEmpty()) {
                    purchaseOrderWS.deleteAllDelivery(deliveryList);
                }
                List<Invoice> invoiceList = purchaseOrderWS.getInvoiceByInsertionId(lineItemNumber);
                if (!invoiceList.isEmpty()) {
                    purchaseOrderWS.deleteAllInvoices(invoiceList);
                }
                List<ConditionsLineLevel> conditionList = purchaseOrderWS.getMasterConditionLineLevelByLineItemNumber(lineItemNumber);
                if (!conditionList.isEmpty()) {
                    purchaseOrderWS.deleteAllConditions(conditionList);
                }
                List<AccountAssignment> accAsgnList = purchaseOrderWS.getAccountAssignmentByLineItemNumber(lineItemNumber);
                if (!accAsgnList.isEmpty()) {
                    purchaseOrderWS.deleteAllFromAccountAssignment(accAsgnList);
                }
                List<Text> textList = purchaseOrderWS.getTextsByInsertionId(lineItemNumber);
                if (!textList.isEmpty()) {
                    purchaseOrderWS.deleteAllText(textList);
                }
                List<DeliveryAddress> addressList = purchaseOrderWS.getDeliveryAddressByInsertionId(lineItemNumber);
                if (!addressList.isEmpty()) {
                    purchaseOrderWS.deleteAllDeliveryAddress(addressList);
                }
                List<Confirmations> confList = purchaseOrderWS.getConfirmationsByInsertionId(lineItemNumber);
                if (!confList.isEmpty()) {
                    purchaseOrderWS.deleteAllConfirmations(confList);
                }
                List<ConditionControl> condControlList = purchaseOrderWS.getConditionCondrolByInsertionId(lineItemNumber);
                if (!condControlList.isEmpty()) {
                    purchaseOrderWS.deleteAllConditionControl(condControlList);
                }
                List<CustomerData> customerList = purchaseOrderWS.getCustomerDataByInsertionId(lineItemNumber);
                if (!customerList.isEmpty()) {
                    purchaseOrderWS.deleteAllCustomerData(customerList);
                }
                List<Component> componentList = purchaseOrderWS.getComponentByLineItemNumber(lineItemNumber);
                if (!componentList.isEmpty()) {
                    purchaseOrderWS.deleteAllComponent(componentList);
                }
                List<ServiceAccountAssignment> serAccAsgnList = purchaseOrderWS.getServiceAccountAssignmentByLineItemNumber(lineItemNumber);
                if (!serAccAsgnList.isEmpty()) {
                    purchaseOrderWS.deleteAllFromServiceAccountAssignment(serAccAsgnList);
                }
                List<LimitAccountAssignment> limitAssAsgnList = purchaseOrderWS.getLimitAccountAssignmentByLineItemNumber(lineItemNumber);
                if (!limitAssAsgnList.isEmpty()) {
                    purchaseOrderWS.deleteAllLimitAccountAssignment(limitAssAsgnList);
                }
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("deleteDataFromDBForDeletedPRInStandAlonePO")) {
            try {
                System.out.println("deleteDataFromDBForDeletedPRInStandAlonePO:::::::::");
                out = response.getWriter();
                String linkId = request.getParameter("linkId");
                System.out.println("linkId deleteDataFromDBForDeletedPRInStandAlonePO :" + linkId);

                String msg = standalonePoWSUtil.deleteAllTabsDataFromDBInStandAlone(linkId);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findBuyerPendingPrLineByPrType")) {
            try {
                System.out.println("findBuyerPendingPrLineByPrType");
                out = response.getWriter();

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
                System.out.println("buyer : " + buyer);
                int buyerId = buyer.getId();

                String prType = request.getParameter("prType");
                System.out.println("prType :" + prType);

                List<BuyerPendingPRLineItemsBean> buyerPendingPrList = purchaseOrderWS.callBuyerPendingPrLineItemsStoredProcedure(buyerId, prType, no_of_days, "");
                System.out.println("buyerPendingPrList size : " + buyerPendingPrList.size());

                JSONArray buyerPendingPrJsonArr = new JSONArray(buyerPendingPrList);

                out.println(buyerPendingPrJsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findPrLineByInsertionOrderIds")) {
            try {
                System.out.println("findPrLineByInsertionOrderIds");
                out = response.getWriter();

                String insertionOrderIds = request.getParameter("insertionOrderIds");
                System.out.println("insertionOrderIds :" + insertionOrderIds);

                List<PORfqLineItemBean> prLineList = purchaseOrderWS.callPORfqPrLineItemStoredProcedure(insertionOrderIds, "", "PR");
                System.out.println("prLineList size : " + prLineList.size());

                JSONArray prLineJsonArr = new JSONArray(prLineList);

                out.println(prLineJsonArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findKalsmBySchemaGroupAndPurchaseOrg")) {
            try {
                System.out.println("findKalsmBySchemaGroupAndPurchaseOrg:::::::::");
                out = response.getWriter();
                String SchemaGroup = request.getParameter("SchemaGroup");
                String PruchaseOrg = request.getParameter("PruchaseOrg");
                System.out.println("SchemaGroup findKalsmBySchemaGroupAndPurchaseOrg :" + SchemaGroup);
                System.out.println("PruchaseOrg findKalsmBySchemaGroupAndPurchaseOrg :" + PruchaseOrg);
                List<SchemaGroupPurOrgMapping> schemaGroupPurOrgMappingList = standalonePoWSUtil.findKalsmBySchemaGroupAndPurchaseOrg(SchemaGroup, PruchaseOrg);
                System.out.println("schemaGroupPurOrgMappingList len: " + schemaGroupPurOrgMappingList);
                String kalsm = "";
                if (schemaGroupPurOrgMappingList != null && !schemaGroupPurOrgMappingList.isEmpty()) {
                    kalsm = schemaGroupPurOrgMappingList.get(0).getKalsm();
                } else {
                    kalsm = "NoMappingEntry";
                }
                System.out.println("kalsm: " + kalsm);
                jObj.put("kalsm", kalsm);
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("BuyerPrStatusChart")) {
            try {
                System.out.println("BuyerPrStatusChart");
                out = response.getWriter();

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails loggedInUser = (BuyerDetails) auth.getPrincipal();
                int buyerId = loggedInUser.getId();
                System.out.println("buyerId: " + buyerId);

                List<BuyerDashboardPrStatusChartBean> buyerDashboardRfqStatusBeanList = rfqRfpUtilWS.callBuyerDashboardPrStatusChartStoredProcedure(buyerId);
                System.out.println("buyerDashboardRfqStatusBeanList size: " + buyerDashboardRfqStatusBeanList.size());
                BuyerDashboardPrStatusChartBean beanObj = buyerDashboardRfqStatusBeanList.get(0);

                int outstandingPr = Integer.parseInt(beanObj.getPrPendingPo()) + Integer.parseInt(beanObj.getRfqPrPendingPo());
                System.out.println("outstandingPr: " + outstandingPr);

                int prPendingForPoApproval = Integer.parseInt(beanObj.getPendingPoForApproval());
                System.out.println("prPendingForPoApproval: " + prPendingForPoApproval);

                JSONArray outstandingPrJsonArr = new JSONArray();
                outstandingPrJsonArr.put("Outstanding PR for PO Creation");
                outstandingPrJsonArr.put(outstandingPr);
                jArra.put(outstandingPrJsonArr);

                JSONArray approvalPoPrJsonArr = new JSONArray();
                approvalPoPrJsonArr.put("Pending PR for PO Approval");
                approvalPoPrJsonArr.put(prPendingForPoApproval);
                jArra.put(approvalPoPrJsonArr);

                System.out.println("jArr len: " + jArra.length());
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findBuyerPurchasingGroupMappingList")) {
            try {
                System.out.println("findBuyerPurchasingGroupMappingList");
                out = response.getWriter();

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails loggedInUser = (BuyerDetails) auth.getPrincipal();

                List<BuyerPurchaseGroupMapping> buyerPurchaseGroupMappingList = rfqRfpUtilWS.findBuyerPurchaseGroupMappingByBuyerId(loggedInUser.getId());
                System.out.println("buyerPurchaseGroupMappingList size : " + buyerPurchaseGroupMappingList.size());

                JSONArray buyerPurchaseGroupMappingJsonArr = new JSONArray(buyerPurchaseGroupMappingList);
                out.println(buyerPurchaseGroupMappingJsonArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("changeServiceAndConitionTabDataSavedInDBInStandAlonePO")) {
            try {
                System.out.println("changeServiceAndConitionTabDataSavedInDBInStandAlonePO");
                out = response.getWriter();

                String linkidArrayAsString = request.getParameter("linkidArrayAsString");
                String currency = request.getParameter("currency");
                String exchangeRate = request.getParameter("exchangeRate");
                System.out.println("linkidArrayAsString: " + linkidArrayAsString);
                System.out.println("currency: " + currency);
                System.out.println("exchangeRate: " + exchangeRate);

                String[] linkIdArray = linkidArrayAsString.split(",");

                for (int i = 0; i < linkIdArray.length; i++) {
//                    List<Services> servicesList = purchaseOrderWS.getServicesByLinkId(linkIdArray[i]);
                    List<NGBPCmplxPOCreationLineItemService> servicesList = standalonePoWSUtil.getServicesByLinkId(linkIdArray[i]);
                    for (int j = 0; j < servicesList.size(); j++) {
                        NGBPCmplxPOCreationLineItemService serviceObj = servicesList.get(j);
                        BigDecimal quantity = serviceObj.getQuantity();
                        BigDecimal grossprice = serviceObj.getGrossPrice();
                        BigDecimal netprice = serviceObj.getNetPrice();

                        BigDecimal newgrossprice = grossprice.multiply(new BigDecimal(exchangeRate));
                        BigDecimal newNetPrice = newgrossprice.multiply(quantity);

                        System.out.println("newgrossprice: " + newgrossprice);
                        System.out.println("newNetPrice: " + newNetPrice);

                        serviceObj.setGrossPrice(newgrossprice);
                        serviceObj.setNetPrice(newNetPrice);
                        serviceObj.setCurrency(currency);

                        standalonePoWSUtil.updateNGBPCmplxPOCreationLineItemService(serviceObj);
                    }
                }
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateOrderPriceUnitInQtyAndWtTabOfPoLine")) {
            try {
                System.out.println("updateOrderPriceUnitInQtyAndWtTabOfPoLine");
                out = response.getWriter();
                String linkId = request.getParameter("linkId");
                String newOpu = request.getParameter("newOpu");
                System.out.println("linkId: " + linkId);
                System.out.println("newOpu: " + newOpu);
                List<NGBPCmplxPOCreationQuantitiesWeights> quantityWeightList = standalonePoWSUtil.findNGBPCmplxPOCreationQuantitiesWeightsByLinkID(linkId);
                if (!quantityWeightList.isEmpty()) {
                    NGBPCmplxPOCreationQuantitiesWeights qwObj = quantityWeightList.get(0);
                    qwObj.setOrderPriceUnit(newOpu);
                    standalonePoWSUtil.updateNGBPCmplxPOCreationQuantitiesWeights(qwObj);
                    jObj.put("Result", "Updated");
                } else {
                    jObj.put("Result", "RecordNotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getNGBPCmplxPOCreationLineItemMaterialByLinkId")) {
            try {
                System.out.println("getNGBPCmplxPOCreationLineItemMaterialByLinkId:::::::::");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                List<NGBPCmplxPOCreationLineItemMaterialTab> materialList = standalonePoWSUtil.getNGBPCmplxPOCreationLineItemMaterialTabByLinkId(linkid);
                System.out.println("In Ajax Cont materialList: " + materialList.size());
                JSONArray jsonArray = new JSONArray(materialList);
                out.println(jsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getByPricingProcedure")) {
            try {
                out = response.getWriter();
                String pricingprocedure = request.getParameter("pricingprocedure");
                System.out.println("pricingprocedure in getByPricingProcedure : " + pricingprocedure);

                List<MasterPricingProcedures> pricingProcedureList = standalonePoWSUtil.getByPricingProcedure(pricingprocedure);

                for (MasterPricingProcedures pricingProcedure : pricingProcedureList) {
                    JSONObject Obj = new JSONObject();
                    String KSCHL = pricingProcedure.getKschl();

                    if (!"".equals(pricingProcedure.getKschl())) {
//                        System.out.println("KSCHL in getByPricingProcedure:" + KSCHL);
                        List<MasterPricingDescription> descriptionList = standalonePoWSUtil.getPricingDescriptionByKSCHL(KSCHL);
                        if (!descriptionList.isEmpty()) {
                            MasterPricingDescription description = descriptionList.get(0);
//                            System.out.println("CType in getByPricingProcedure :" + description.getCTYpe());
//                            System.out.println("Name in getByPricingProcedure :" + description.getName());
                            Obj.put("NAME", description.getName());
                            Obj.put("CTYPE", description.getCTYpe());
//
                            String currency = "SGD";
                            Obj.put("CURRENCY2", currency);
//                            System.out.println("CURRENCY in getByPricingProcedure :" + description.getCrCy());
//                            System.out.println("CURRENCY2 in getByPricingProcedure :" + currency);
                            if ("".equals(description.getCrCy())) {
                                Obj.put("CRCY", currency);
                            } else {
                                Obj.put("CRCY", description.getCrCy());
                            }
                            jArra.put(Obj);
                        }
                    }
                }
                System.out.println("length :" + jArra.length());
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("delCondiionIfFOCCheckedInST")) {
            try {
                System.out.println("delCondiionIfFOCCheckedInST");
                out = response.getWriter();
                String linkIdArray = request.getParameter("linkidArrayAsString");
                String LinkID = request.getParameter("LinkID");
                List<NGBPCmplxPOCreationLineItemConditions> condList = standalonePoWSUtil.getNGBPCmplxPOCreationConditionsByLinkId(LinkID);
                System.out.println("condList size :" + condList.size());
                if (!condList.isEmpty()) {
                    for (int i = 0; i < condList.size(); i++) {
                        NGBPCmplxPOCreationLineItemConditions condObj = condList.get(i);
                        condObj.setLinkID("");
                        purchaseOrderWSUtil.updateNGBPCmplxPOCreationLineItemConditions(condObj);
                    }
                }
                List<NGBPCmplxPOCreationLineItemConditions> conList = standalonePoWSUtil.getNGBPCmplxPOCreationLineItemConditionsByLinkIds(linkIdArray);
                System.out.println("conList Size :" + conList.size());
                JSONArray jsonCondArr = new JSONArray(conList);
                jObj.put("jsonCondArr", jsonCondArr);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("delCondiionIfFOCChecked")) {
            try {
                System.out.println("delCondiionIfFOCChecked");
                out = response.getWriter();
                String linkIdArray = request.getParameter("linkidArrayAsString");
                String insertionid = request.getParameter("insertionid");
                System.out.println("linkIdArray :" + linkIdArray);
                System.out.println("insertionid :" + insertionid);
                List<ConditionsLineLevel> conditionList = purchaseOrderWS.getMasterConditionLineLevelByLineItemNumber(insertionid);
                System.out.println("conditionList size :" + conditionList.size());
                if (!conditionList.isEmpty()) {
                    String msg = purchaseOrderWS.deleteAllConditions(conditionList);
                }
                List<ConditionsLineLevel> conList = purchaseOrderWS.getConditionsLineLevelByLinkIds(linkIdArray);
                System.out.println("conditionList new size :" + conList.size());
                JSONArray jsonCondArr = new JSONArray(conList);
                jObj.put("jsonCondArr", jsonCondArr);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("deleteAllConditionsOnLoad")) {
            try {
                System.out.println("deleteAllConditionsOnLoad:::");
                out = response.getWriter();
                String InsOrderIdIdArrayAsString = request.getParameter("InsOrderIdIdArrayAsString");
                System.out.println("InsOrderIdIdArrayAsString :::" + InsOrderIdIdArrayAsString);

                String[] InsOrderIdIdArray = InsOrderIdIdArrayAsString.split(",");
                for (String InsOrderIdIdArray1 : InsOrderIdIdArray) {
                    List<ConditionsLineLevel> conditionList = purchaseOrderWS.getMasterConditionLineLevelByLineItemNumber(InsOrderIdIdArray1);
                    if (!conditionList.isEmpty()) {
                        purchaseOrderWS.deleteAllConditions(conditionList);
                    }
                }
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("getAllTaxCode")) {
            try {
                out = response.getWriter();
                List<MasterTaxCode> taxList = standalonePoWSUtil.getAllTaxCode();
                for (MasterTaxCode code : taxList) {
                    JSONObject Obj = new JSONObject();
                    if (!taxList.isEmpty()) {
                        Obj.put("CODE", code.getTaxCode());
                        if (code.getTaxDesc() == null || "".equals(code.getTaxDesc())) {
                            Obj.put("CODEDESC", "");
                        } else {
                            Obj.put("CODEDESC", code.getTaxDesc());
                        }
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findServicesLongTextsById")) {
            try {
                System.out.println("findServicesLongTextsById");
                out = response.getWriter();

                String serviceId = request.getParameter("serviceId");
                System.out.println("serviceId: " + serviceId);

                ServicesLongTexts serviceObj = purchaseOrderWS.getServicesLongTextsById(Integer.parseInt(serviceId));
                jObj.put("Service", new JSONObject(serviceObj));
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateExtDraftPoDetailsOnErrorTransaction")) {
            try {
                System.out.println("updateExtDraftPoDetailsOnErrorTransaction");
                out = response.getWriter();

                String extId = request.getParameter("extId");
                String errorTransactionStatus = request.getParameter("errorTransactionStatus");
                String tempPoNumber = request.getParameter("tempPoNumber");
                String poSequenceNumber = request.getParameter("poSequenceNumber");

                System.out.println("extId: " + extId);
                System.out.println("errorTransactionStatus: " + errorTransactionStatus);
                System.out.println("tempPoNumber: " + tempPoNumber);
                System.out.println("poSequenceNumber: " + poSequenceNumber);

                String result = purchaseOrderWS.updateExtDraftPoDetailsOnErrorTransaction(Integer.parseInt(extId), errorTransactionStatus, tempPoNumber, poSequenceNumber);
                System.out.println("result: " + result);

                jObj.put("Result", "Updated");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateQuantityWeightsOnUomChange")) {
            try {
                System.out.println("updateQuantityWeightsOnUomChange");
                out = response.getWriter();

                String quantityWeightAsJsonString = request.getParameter("quantityWeightAsJsonString");
                System.out.println("quantityWeightAsJsonString: " + quantityWeightAsJsonString);
                JSONObject quantityWeightAsJsonObj = new JSONObject(quantityWeightAsJsonString);

                List<NGBPCmplxPOCreationQuantitiesWeights> quantityWeightList = standalonePoWSUtil.findNGBPCmplxPOCreationQuantitiesWeightsByLinkID(quantityWeightAsJsonObj.getString("LinkId"));
                System.out.println("quantityWeightList size: " + quantityWeightList.size());
                if (!quantityWeightList.isEmpty()) {
                    NGBPCmplxPOCreationQuantitiesWeights qwObj = quantityWeightList.get(0);

                    if (quantityWeightAsJsonObj.getString("POQuantityUnit") != null && !quantityWeightAsJsonObj.getString("POQuantityUnit").equals("")) {
                        qwObj.setPoQuantityUnit(quantityWeightAsJsonObj.getString("POQuantityUnit"));
                    }
                    if (quantityWeightAsJsonObj.getString("OrderUnit1_Unit") != null && !quantityWeightAsJsonObj.getString("OrderUnit1_Unit").equals("")) {
                        qwObj.setOrderUnit1(quantityWeightAsJsonObj.getString("OrderUnit1_Unit"));
                    }
                    if (quantityWeightAsJsonObj.getString("OrderPriceUnit_Unit") != null && !quantityWeightAsJsonObj.getString("OrderPriceUnit_Unit").equals("")) {
                        qwObj.setOrderPriceUnit(quantityWeightAsJsonObj.getString("OrderPriceUnit_Unit"));
                    }
                    if (quantityWeightAsJsonObj.getString("OrderUnit2") != null && !quantityWeightAsJsonObj.getString("OrderUnit2").equals("")) {
                        qwObj.setOrder2(quantityWeightAsJsonObj.getString("OrderUnit2"));
                    }
                    if (quantityWeightAsJsonObj.getString("OrderUnit2_Unit") != null && !quantityWeightAsJsonObj.getString("OrderUnit2_Unit").equals("")) {
                        qwObj.setOrderUnit2(quantityWeightAsJsonObj.getString("OrderUnit2_Unit"));
                    }

                    standalonePoWSUtil.updateNGBPCmplxPOCreationQuantitiesWeights(qwObj);
                    jObj.put("Result", "Updated");
                } else {
                    jObj.put("Result", "RecordNotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateExtDraftPoDetailsOnPoCreation")) {
            try {
                System.out.println("updateExtDraftPoDetailsOnPoCreation");
                out = response.getWriter();

                String extId = request.getParameter("extId");
                System.out.println("extId: " + extId);

                String result = purchaseOrderWS.updateExtDraftPoDetailsOnPoCreation(Integer.parseInt(extId));
                System.out.println("result: " + result);

                jObj.put("Result", "Updated");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findSAHeaderConditionsByExtId")) {
            try {
                System.out.println("findSAHeaderConditionsByExtId");
                out = response.getWriter();
                String extPoId = request.getParameter("extPoId");
                System.out.println("extPoId: " + extPoId);

                List<NGBPCmplxPOCreationConditions> conditionsList = purchaseOrderWSUtil.getNGBPCmplxPOCreationConditionsByExtId(Long.parseLong(extPoId));
                System.out.println("conditionsList size: " + conditionsList.size());

                JSONArray jsonCondArr = new JSONArray(conditionsList);
                jObj.put("HeaderConditionsArr", jsonCondArr);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getCmplxPRToPOLineItemComponentsByLinkId")) {
            try {
                System.out.println("getCmplxPRToPOLineItemComponentsByLinkId");
                out = response.getWriter();

                String linkId = request.getParameter("linkId");
                System.out.println("linkId: " + linkId);

                List<CmplxPRToPOLineItemComponents> componentsList = purchaseOrderWSUtil.getCmplxPRToPOLineItemComponentsByLinkId(linkId);
                System.out.println("componentsList size: " + componentsList.size());

                JSONArray jsonCompArr = new JSONArray(componentsList);
                jObj.put("componentsArr", jsonCompArr);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getComponentByInsertionOrderId")) {
            try {
                System.out.println("getComponentByInsertionOrderId");
                out = response.getWriter();

                String insertionOrderId = request.getParameter("insertionOrderId");
                System.out.println("insertionOrderId: " + insertionOrderId);

                List<Component> componentsList = purchaseOrderWSUtil.getComponentByLineItemNumber(insertionOrderId);
                System.out.println("componentsList size: " + componentsList.size());

                JSONArray jsonCompArr = new JSONArray(componentsList);
                jObj.put("componentsArr", jsonCompArr);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveComponentsFromCmplxTableToLocalTable")) {
            try {
                System.out.println("saveComponentsFromCmplxTableToLocalTable");
                out = response.getWriter();

                String linkId = request.getParameter("linkId");
                String insertionOrderId = request.getParameter("insertionOrderId");
                String prItemNumber = request.getParameter("prItemNumber");
                String prQuantity = request.getParameter("prQuantity");

                System.out.println("linkId: " + linkId);
                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("prItemNumber: " + prItemNumber);
                System.out.println("prQuantity: " + prQuantity);

                List<NewgenPRLineItem> prLineList = purchaseRequestUtilWS.findPrLineByLinkId(linkId);
                System.out.println("prLineList size: " + prLineList.size());

                List<CmplxPRToPOLineItemComponents> cmplxComponentsList = purchaseOrderWSUtil.getCmplxPRToPOLineItemComponentsByLinkId(linkId);
                System.out.println("cmplxComponentsList size: " + cmplxComponentsList.size());

                String result;
                if (!cmplxComponentsList.isEmpty()) {
                    List<Component> componentList = purchaseOrderWSUtil.getComponentByLineItemNumber(insertionOrderId);
                    if (!componentList.isEmpty()) {
                        purchaseOrderWSUtil.deleteAllComponent(componentList);
                    }

                    String prLineQty = "";
                    if (!prLineList.isEmpty()) {
                        NewgenPRLineItem prLineObj = prLineList.get(0);
                        prLineQty = prLineObj.getQuantity();
                    }
                    System.out.println("prLineQty: " + prLineQty);

                    double percentageQty = 0.0;
                    if (prLineQty != null && !prLineQty.equals("") && prQuantity != null && !prQuantity.equals("")) {
                        double prLineQtyDecimal = Double.parseDouble(prLineQty);
                        double prQuantityDecimal = Double.parseDouble(prQuantity);

                        percentageQty = (prQuantityDecimal / prLineQtyDecimal) * 100;
                    }
                    System.out.println("percentageQty: " + percentageQty);

                    SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                    SimpleDateFormat ngFormatter = new SimpleDateFormat("yyyy-MM-dd");

                    for (CmplxPRToPOLineItemComponents cmplxComponent : cmplxComponentsList) {
                        if (cmplxComponent.getRequirementDate() != null && !cmplxComponent.getRequirementDate().equals("")) {
                            try {
                                Date dateCat = formatter.parse(cmplxComponent.getRequirementDate());
                                System.out.println("dateCat :" + dateCat);
                                System.out.println(formatter.format(dateCat));
                                component.setRequirementDate(dateCat);
                                component.setReqDateAsString(ngFormatter.format(dateCat));
                            } catch (ParseException e) {
                                e.printStackTrace();
                            }
                        } else {
                            component.setRequirementDate(null);
                            component.setReqDateAsString(null);
                        }
                        component.setMaterialCode(cmplxComponent.getMaterialCode());
                        component.setDescription(cmplxComponent.getDescription());
                        component.setPlant(cmplxComponent.getPlant());
                        component.setUnit(cmplxComponent.getUnit());

                        double finalCompQty;
                        if (percentageQty != 0.0) {
                            String componentQty = cmplxComponent.getRequirementQuantity().replaceAll(",", "");
                            System.out.println("componentQty: " + componentQty);
                            double componentQtyDecimal = Double.parseDouble(componentQty);

                            finalCompQty = (componentQtyDecimal * percentageQty) / 100;
                            System.out.println("finalCompQty 1: " + finalCompQty);

                        } else {
                            String componentQty = cmplxComponent.getRequirementQuantity().replaceAll(",", "");
                            System.out.println("componentQty: " + componentQty);
                            finalCompQty = Double.parseDouble(componentQty);
                        }
                        System.out.println("finalCompQty 2: " + finalCompQty);

                        if (!"".equals(cmplxComponent.getRequirementQuantity())) {
                            component.setQuantity(new BigDecimal(finalCompQty));
                        } else {
                            component.setQuantity(new BigDecimal(0.0));
                        }
                        component.setProductStorageLocation(cmplxComponent.getStorageLocation());
                        component.setSupplyArea(cmplxComponent.getSupplyArea());
                        component.setLineItemnumber(insertionOrderId);
                        component.setPrItemNumber(prItemNumber);
                        component.setLinkId(linkId);
                        component.setQtyIsFixed(cmplxComponent.getQuantityIsFixed());

                        if (cmplxComponent.getLatestRequirementDate() != null && !cmplxComponent.getLatestRequirementDate().equals("")) {
                            try {
                                Date dateCat = formatter.parse(cmplxComponent.getLatestRequirementDate());
                                System.out.println("dateCat :" + dateCat);
                                System.out.println(formatter.format(dateCat));
                                component.setLatestRequirementDate(dateCat);
                                component.setLatestReqDateAsString(ngFormatter.format(dateCat));
                            } catch (ParseException e) {
                                e.printStackTrace();
                            }
                        } else {
                            component.setLatestRequirementDate(null);
                            component.setLatestReqDateAsString(null);
                        }
                        component.setBatch(cmplxComponent.getBatch());

                        String msg = purchaseOrderWSUtil.saveComponent(component);
                        System.out.println("msg :" + msg);
                    }
                    result = "Components_Saved_From_Cmplx_To_Local";
                } else {
                    result = "Components_Not_Found_In_Cmplx_Table";
                }
                jObj.put("Result", result);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateComponentByInsertionOrderId")) {
            try {
                System.out.println("updateComponentByInsertionOrderId");
                out = response.getWriter();

                String insertionOrderId = request.getParameter("insertionOrderId");
                String percentageQty = request.getParameter("percentageQty");
                String linkId = request.getParameter("linkId");

                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("percentageQty: " + percentageQty);
                System.out.println("linkId: " + linkId);

                List<CmplxPRToPOLineItemComponents> cmplxComponentsList = purchaseOrderWSUtil.getCmplxPRToPOLineItemComponentsByLinkId(linkId);
                System.out.println("cmplxComponentsList size: " + cmplxComponentsList.size());

                List<Component> componentsList = purchaseOrderWSUtil.getComponentByLineItemNumber(insertionOrderId);
                System.out.println("componentsList size: " + componentsList.size());
                if (!componentsList.isEmpty()) {
                    BigDecimal decimalPercentageQty = new BigDecimal(percentageQty);
                    System.out.println("decimalPercentageQty: " + decimalPercentageQty);

                    for (int i = 0; i < componentsList.size(); i++) {
                        Component comp = componentsList.get(i);
                        CmplxPRToPOLineItemComponents cmplxComp = cmplxComponentsList.get(i);

                        String cmplxCompQty = cmplxComp.getRequirementQuantity().replaceAll(",", "");
                        System.out.println("cmplxCompQty: " + cmplxCompQty);

                        BigDecimal componentQty = new BigDecimal(cmplxCompQty);
                        System.out.println("componentQty 1: " + componentQty);

                        BigDecimal qtyToReduced = componentQty.multiply(decimalPercentageQty).divide(new BigDecimal(100));
                        System.out.println("qtyToReduced: " + qtyToReduced);

                        comp.setQuantity(qtyToReduced);
                        purchaseOrderWSUtil.updateComponent(comp);
                    }
                    jObj.put("Result", "Components_Updated");
                } else {
                    jObj.put("Result", "Components_Not_Found");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("replicateMainAccAssToPOLineHavingSameCategory")) {
            try {
                System.out.println("replicateMainAccAssToPOLineHavingSameCategory");
                out = response.getWriter();

                String currentPoLineInsertionOrderId = request.getParameter("currentPoLineInsertionOrderId");
                String currentPoLineLinkId = request.getParameter("currentPoLineLinkId");
                String currentPoLineDistribution = request.getParameter("currentPoLineDistribution");
                String poLineDetailsArr = request.getParameter("poLineDetailsJsonArr");
                String prType = request.getParameter("prType");

                System.out.println("currentPoLineInsertionOrderId: " + currentPoLineInsertionOrderId);
                System.out.println("currentPoLineLinkId: " + currentPoLineLinkId);
                System.out.println("currentPoLineDistribution: " + currentPoLineDistribution);
                System.out.println("poLineDetailsArr: " + poLineDetailsArr);
                System.out.println("prType: " + prType);

                List<AccountAssignment> currentPoLineAccAsgnList = purchaseOrderWSUtil.getAccountAssignmentByLineItemNumber(currentPoLineInsertionOrderId);
                System.out.println("currentPoLineAccAsgnList size: " + currentPoLineAccAsgnList.size());

                JSONArray poLineDetailsJsonArr = new JSONArray(poLineDetailsArr);
                System.out.println("poLineDetailsJsonArr len: " + poLineDetailsJsonArr.length());

                for (int i = 0; i < poLineDetailsJsonArr.length(); i++) {
                    JSONObject poLineDetailsJsonObj = poLineDetailsJsonArr.getJSONObject(i);
                    System.out.println("poLineDetailsJsonObj: " + poLineDetailsJsonObj.toString());

                    String linkId = poLineDetailsJsonObj.getString("linkId");
                    String insertionOrderId = poLineDetailsJsonObj.getString("insertionOrderId");
                    String quantity = poLineDetailsJsonObj.getString("quantity");
                    String isPoLineOrPrLineOrRfqLineOrEmptyLine = poLineDetailsJsonObj.getString("isPoLineOrPrLineOrRfqLineOrEmptyLine");
                    String prItemNumber = poLineDetailsJsonObj.getString("prItemNumber");

                    System.out.println("linkId: " + linkId);
                    System.out.println("insertionOrderId: " + insertionOrderId);
                    System.out.println("quantity: " + quantity);
                    System.out.println("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);
                    System.out.println("prItemNumber: " + prItemNumber);

                    List<AccountAssignment> poLineAccAsgnList = purchaseOrderWSUtil.getAccountAssignmentByLineItemNumber(insertionOrderId);
                    System.out.println("poLineAccAsgnList size: " + poLineAccAsgnList.size());
                    if (!poLineAccAsgnList.isEmpty()) {
                        purchaseOrderWSUtil.deleteAllFromAccountAssignment(poLineAccAsgnList);
                    }

                    if (currentPoLineDistribution != null && currentPoLineDistribution.equals("Single Account Assignment")) {
                        System.out.println("Single Account Assignment=====================>");
                        for (int j = 0; j < currentPoLineAccAsgnList.size(); j++) {
                            AccountAssignment currentAccAssObj = currentPoLineAccAsgnList.get(j);

                            accountAssignmentEntity.setLineItemNumber(insertionOrderId);
                            accountAssignmentEntity.setLinkId(linkId);
                            accountAssignmentEntity.setPrItemNumber(prItemNumber);
                            accountAssignmentEntity.setQuantity(new BigDecimal(quantity));
                            accountAssignmentEntity.setPercentage(new BigDecimal(100.0));

                            accountAssignmentEntity.setGLAccount(currentAccAssObj.getGLAccount());
                            accountAssignmentEntity.setCommitmentItem(currentAccAssObj.getCommitmentItem());
                            accountAssignmentEntity.setCOArea(currentAccAssObj.getCOArea());
                            accountAssignmentEntity.setCostCenter(currentAccAssObj.getCostCenter());
                            accountAssignmentEntity.setFund(currentAccAssObj.getFund());
                            accountAssignmentEntity.setFunctionalArea(currentAccAssObj.getFunctionalArea());
                            accountAssignmentEntity.setFundCenter(currentAccAssObj.getFundCenter());
                            accountAssignmentEntity.setUnloadingPoint(currentAccAssObj.getUnloadingPoint());
                            accountAssignmentEntity.setRecipient(currentAccAssObj.getRecipient());
                            accountAssignmentEntity.setAccAsgnTblOrder(currentAccAssObj.getAccAsgnTblOrder());
                            accountAssignmentEntity.setAsset(currentAccAssObj.getAsset());
                            accountAssignmentEntity.setWBSElement(currentAccAssObj.getWBSElement());
                            accountAssignmentEntity.setSalesOrder(currentAccAssObj.getSalesOrder());
                            accountAssignmentEntity.setNetActNumber(currentAccAssObj.getNetActNumber());
                            accountAssignmentEntity.setItemNumber(currentAccAssObj.getItemNumber());
                            accountAssignmentEntity.setDeliverySchedule(currentAccAssObj.getDeliverySchedule());
                            accountAssignmentEntity.setAccountAssignmentCategory(currentAccAssObj.getAccountAssignmentCategory());
                            accountAssignmentEntity.setDistribution(currentAccAssObj.getDistribution());
                            accountAssignmentEntity.setCoCode(currentAccAssObj.getCoCode());
                            accountAssignmentEntity.setPartialInvoiceIndicator(currentAccAssObj.getPartialInvoiceIndicator());
                            accountAssignmentEntity.setLinkNumber(currentAccAssObj.getLinkNumber());

                            accountAssignmentEntity.setServiceLineItemNumber(null);
                            accountAssignmentEntity.setSerialNumber(null);
                            accountAssignmentEntity.setIsDeleteFlag(null);

                            String msg = purchaseOrderWSUtil.saveAccountAssignment(accountAssignmentEntity);
                            System.out.println("msg :" + msg);
                        }
                    } else {
                        System.out.println("Multiple Account Assignment=====================>");
                        for (int j = 0; j < currentPoLineAccAsgnList.size(); j++) {
                            AccountAssignment currentAccAssObj = currentPoLineAccAsgnList.get(j);

                            accountAssignmentEntity.setLineItemNumber(insertionOrderId);
                            accountAssignmentEntity.setLinkId(linkId);
                            accountAssignmentEntity.setPrItemNumber(prItemNumber);

                            BigDecimal percentage = currentAccAssObj.getPercentage();
                            System.out.println("Acc Ass, percentage: " + percentage);
                            System.out.println("PO Line, quantity: " + quantity);
                            
                            BigDecimal qtyByPerc = (percentage.multiply(new BigDecimal(quantity))).divide(new BigDecimal(100));
//                            double qtyByPerc = (percentage.doubleValue() * Double.parseDouble(quantity)) / 100;
                            System.out.println("qtyByPerc: " + qtyByPerc);

                            accountAssignmentEntity.setQuantity(qtyByPerc);
                            accountAssignmentEntity.setPercentage(percentage);

                            accountAssignmentEntity.setGLAccount(currentAccAssObj.getGLAccount());
                            accountAssignmentEntity.setCommitmentItem(currentAccAssObj.getCommitmentItem());
                            accountAssignmentEntity.setCOArea(currentAccAssObj.getCOArea());
                            accountAssignmentEntity.setCostCenter(currentAccAssObj.getCostCenter());
                            accountAssignmentEntity.setFund(currentAccAssObj.getFund());
                            accountAssignmentEntity.setFunctionalArea(currentAccAssObj.getFunctionalArea());
                            accountAssignmentEntity.setFundCenter(currentAccAssObj.getFundCenter());
                            accountAssignmentEntity.setUnloadingPoint(currentAccAssObj.getUnloadingPoint());
                            accountAssignmentEntity.setRecipient(currentAccAssObj.getRecipient());
                            accountAssignmentEntity.setAccAsgnTblOrder(currentAccAssObj.getAccAsgnTblOrder());
                            accountAssignmentEntity.setAsset(currentAccAssObj.getAsset());
                            accountAssignmentEntity.setWBSElement(currentAccAssObj.getWBSElement());
                            accountAssignmentEntity.setSalesOrder(currentAccAssObj.getSalesOrder());
                            accountAssignmentEntity.setNetActNumber(currentAccAssObj.getNetActNumber());
                            accountAssignmentEntity.setItemNumber(currentAccAssObj.getItemNumber());
                            accountAssignmentEntity.setDeliverySchedule(currentAccAssObj.getDeliverySchedule());
                            accountAssignmentEntity.setAccountAssignmentCategory(currentAccAssObj.getAccountAssignmentCategory());
                            accountAssignmentEntity.setDistribution(currentAccAssObj.getDistribution());
                            accountAssignmentEntity.setCoCode(currentAccAssObj.getCoCode());
                            accountAssignmentEntity.setPartialInvoiceIndicator(currentAccAssObj.getPartialInvoiceIndicator());
                            accountAssignmentEntity.setLinkNumber(currentAccAssObj.getLinkNumber());

                            accountAssignmentEntity.setServiceLineItemNumber(null);
                            accountAssignmentEntity.setSerialNumber(null);
                            accountAssignmentEntity.setIsDeleteFlag(null);

                            String msg = purchaseOrderWSUtil.saveAccountAssignment(accountAssignmentEntity);
                            System.out.println("msg :" + msg);
                        }
                    }
                }

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("replicateServiceAccAss")) {
            try {
                System.out.println("replicateServiceAccAss");
                out = response.getWriter();

                String currentPoLineInsertionOrderId = request.getParameter("currentPoLineInsertionOrderId");
                String currentPoLineLinkId = request.getParameter("currentPoLineLinkId");
                String selectedServiceLinkId = request.getParameter("selectedServiceLinkId");
                String selectedServiceLineItemNumber = request.getParameter("selectedServiceLineItemNumber");
                String selectedServiceAccAssDist = request.getParameter("selectedServiceAccAssDist");
                String servicesDetailsArr = request.getParameter("servicesDetailsJsonArr");
                String poFrom = request.getParameter("poFrom");

                System.out.println("currentPoLineInsertionOrderId: " + currentPoLineInsertionOrderId);
                System.out.println("currentPoLineLinkId: " + currentPoLineLinkId);
                System.out.println("selectedServiceLinkId: " + selectedServiceLinkId);
                System.out.println("selectedServiceLineItemNumber: " + selectedServiceLineItemNumber);
                System.out.println("selectedServiceAccAssDist: " + selectedServiceAccAssDist);
                System.out.println("servicesDetailsArr: " + servicesDetailsArr);
                System.out.println("poFrom: " + poFrom);

                List<ServiceAccountAssignment> selectedServiceAccAsgnList = purchaseOrderWSUtil
                        .getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(selectedServiceLineItemNumber, currentPoLineInsertionOrderId);
                System.out.println("SelectedServiceAccAsgnList Size :" + selectedServiceAccAsgnList.size());

                JSONArray servicesDetailsJsonArr = new JSONArray(servicesDetailsArr);
                System.out.println("servicesDetailsJsonArr len: " + servicesDetailsJsonArr.length());

                for (int i = 0; i < servicesDetailsJsonArr.length(); i++) {
                    JSONObject serviceDetailsJsonObj = servicesDetailsJsonArr.getJSONObject(i);
                    System.out.println("serviceDetailsJsonObj: " + serviceDetailsJsonObj.toString());

                    String serviceLinkId = serviceDetailsJsonObj.getString("serviceLinkId");
                    String serviceLineItemNumber = serviceDetailsJsonObj.getString("serviceLineItemNumber");
                    String serviceLineQuantity = serviceDetailsJsonObj.getString("serviceLineQuantity");
                    String serviceLineGrossPrice = serviceDetailsJsonObj.getString("serviceLineGrossPrice");

                    System.out.println("serviceLinkId: " + serviceLinkId);
                    System.out.println("serviceLineItemNumber: " + serviceLineItemNumber);
                    System.out.println("serviceLineQuantity: " + serviceLineQuantity);
                    System.out.println("serviceLineGrossPrice: " + serviceLineGrossPrice);

                    List<ServiceAccountAssignment> otherServiceAccAsgnList = purchaseOrderWSUtil
                            .getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumber, currentPoLineInsertionOrderId);
                    System.out.println("otherServiceAccAsgnList Size :" + otherServiceAccAsgnList.size());
                    if (!otherServiceAccAsgnList.isEmpty()) {
                        purchaseOrderWSUtil.deleteAllFromServiceAccountAssignment(otherServiceAccAsgnList);
                    }

                    if (selectedServiceAccAssDist != null && selectedServiceAccAssDist.trim().equals("")) {
                        System.out.println("Single Account Assignment=====================>");
                        for (int j = 0; j < selectedServiceAccAsgnList.size(); j++) {
                            ServiceAccountAssignment selectedServAccAssObj = selectedServiceAccAsgnList.get(j);

                            BigDecimal accAssNetVal = new BigDecimal(serviceLineGrossPrice).multiply(new BigDecimal(serviceLineQuantity));
                            System.out.println("accAssNetVal: " + accAssNetVal);

                            serviceAccountAssignmentEntity.setGLAccount(selectedServAccAssObj.getGLAccount());
                            serviceAccountAssignmentEntity.setCOArea(selectedServAccAssObj.getCOArea());
                            serviceAccountAssignmentEntity.setCostCenter(selectedServAccAssObj.getCostCenter());
                            serviceAccountAssignmentEntity.setAccAsngOrder(selectedServAccAssObj.getAccAsngOrder());
                            serviceAccountAssignmentEntity.setAsset(selectedServAccAssObj.getAsset());
                            serviceAccountAssignmentEntity.setWBSElement(selectedServAccAssObj.getWBSElement());
                            serviceAccountAssignmentEntity.setSalesOrder(selectedServAccAssObj.getSalesOrder());
                            serviceAccountAssignmentEntity.setItemNumber(selectedServAccAssObj.getItemNumber());
                            serviceAccountAssignmentEntity.setDeliverySchedule(selectedServAccAssObj.getDeliverySchedule());
                            serviceAccountAssignmentEntity.setFund(selectedServAccAssObj.getFund());
                            serviceAccountAssignmentEntity.setFunctionalArea(selectedServAccAssObj.getFunctionalArea());
                            serviceAccountAssignmentEntity.setFundCenter(selectedServAccAssObj.getFundCenter());
                            serviceAccountAssignmentEntity.setCommitmentItem(selectedServAccAssObj.getCommitmentItem());
                            serviceAccountAssignmentEntity.setNetActNumber(selectedServAccAssObj.getNetActNumber());
                            serviceAccountAssignmentEntity.setLineItemNumber(selectedServAccAssObj.getLineItemNumber());
                            serviceAccountAssignmentEntity.setServiceLineItemNumber(serviceLineItemNumber);
                            serviceAccountAssignmentEntity.setQuantity(new BigDecimal(serviceLineQuantity));
                            serviceAccountAssignmentEntity.setLinkNumber(selectedServAccAssObj.getLinkNumber());
                            serviceAccountAssignmentEntity.setNetValaue(accAssNetVal);
                            serviceAccountAssignmentEntity.setPrItemNumber(selectedServAccAssObj.getPrItemNumber());
                            serviceAccountAssignmentEntity.setAccountAssignment(selectedServAccAssObj.getAccountAssignment());
                            serviceAccountAssignmentEntity.setLinkId(serviceLinkId);
                            serviceAccountAssignmentEntity.setDistribution(selectedServAccAssObj.getDistribution());
                            serviceAccountAssignmentEntity.setPercentage(new BigDecimal(100.0));
                            serviceAccountAssignmentEntity.setRecipient(selectedServAccAssObj.getRecipient());
                            serviceAccountAssignmentEntity.setUnloadingPoint(selectedServAccAssObj.getUnloadingPoint());
                            serviceAccountAssignmentEntity.setLineNoSerAcc(null);
                            serviceAccountAssignmentEntity.setSerialNumber(null);
                            serviceAccountAssignmentEntity.setIsDeleteFlag(null);

                            String msg = purchaseOrderWSUtil.saveServiceAccountAssignment(serviceAccountAssignmentEntity);
                            System.out.println("Service AccAss Saved Response: " + msg);

                            purchaseOrderWS.ServiceAccountAssignmentFunction(currentPoLineInsertionOrderId, currentPoLineLinkId, serviceLineItemNumber, "");
                        }
                    } else {
                        System.out.println("Multiple Account Assignment=====================>");
                        for (int j = 0; j < selectedServiceAccAsgnList.size(); j++) {
                            ServiceAccountAssignment selectedServAccAssObj = selectedServiceAccAsgnList.get(j);

                            BigDecimal percentage = selectedServAccAssObj.getPercentage();
                            System.out.println("Service Acc Ass, percentage: " + percentage);
                            System.out.println("Service Line, quantity: " + serviceLineQuantity);
                            
                            BigDecimal qtyByPerc = (percentage.multiply(new BigDecimal(serviceLineQuantity))).divide(new BigDecimal(100));
//                            double qtyByPerc = (percentage.doubleValue() * Double.parseDouble(serviceLineQuantity)) / 100;
                            System.out.println("qtyByPerc: " + qtyByPerc);

                            BigDecimal accAssNetVal = new BigDecimal(serviceLineGrossPrice).multiply(qtyByPerc);
                            System.out.println("accAssNetVal: " + accAssNetVal);

                            serviceAccountAssignmentEntity.setGLAccount(selectedServAccAssObj.getGLAccount());
                            serviceAccountAssignmentEntity.setCOArea(selectedServAccAssObj.getCOArea());
                            serviceAccountAssignmentEntity.setCostCenter(selectedServAccAssObj.getCostCenter());
                            serviceAccountAssignmentEntity.setAccAsngOrder(selectedServAccAssObj.getAccAsngOrder());
                            serviceAccountAssignmentEntity.setAsset(selectedServAccAssObj.getAsset());
                            serviceAccountAssignmentEntity.setWBSElement(selectedServAccAssObj.getWBSElement());
                            serviceAccountAssignmentEntity.setSalesOrder(selectedServAccAssObj.getSalesOrder());
                            serviceAccountAssignmentEntity.setItemNumber(selectedServAccAssObj.getItemNumber());
                            serviceAccountAssignmentEntity.setDeliverySchedule(selectedServAccAssObj.getDeliverySchedule());
                            serviceAccountAssignmentEntity.setFund(selectedServAccAssObj.getFund());
                            serviceAccountAssignmentEntity.setFunctionalArea(selectedServAccAssObj.getFunctionalArea());
                            serviceAccountAssignmentEntity.setFundCenter(selectedServAccAssObj.getFundCenter());
                            serviceAccountAssignmentEntity.setCommitmentItem(selectedServAccAssObj.getCommitmentItem());
                            serviceAccountAssignmentEntity.setNetActNumber(selectedServAccAssObj.getNetActNumber());
                            serviceAccountAssignmentEntity.setLineItemNumber(selectedServAccAssObj.getLineItemNumber());
                            serviceAccountAssignmentEntity.setServiceLineItemNumber(serviceLineItemNumber);
                            serviceAccountAssignmentEntity.setQuantity(qtyByPerc);
                            serviceAccountAssignmentEntity.setLinkNumber(selectedServAccAssObj.getLinkNumber());
                            serviceAccountAssignmentEntity.setNetValaue(accAssNetVal);
                            serviceAccountAssignmentEntity.setPrItemNumber(selectedServAccAssObj.getPrItemNumber());
                            serviceAccountAssignmentEntity.setAccountAssignment(selectedServAccAssObj.getAccountAssignment());
                            serviceAccountAssignmentEntity.setLinkId(serviceLinkId);
                            serviceAccountAssignmentEntity.setDistribution(selectedServAccAssObj.getDistribution());
                            serviceAccountAssignmentEntity.setPercentage(percentage);
                            serviceAccountAssignmentEntity.setRecipient(selectedServAccAssObj.getRecipient());
                            serviceAccountAssignmentEntity.setUnloadingPoint(selectedServAccAssObj.getUnloadingPoint());
                            serviceAccountAssignmentEntity.setLineNoSerAcc(null);
                            serviceAccountAssignmentEntity.setSerialNumber(null);
                            serviceAccountAssignmentEntity.setIsDeleteFlag(null);

                            String msg = purchaseOrderWSUtil.saveServiceAccountAssignment(serviceAccountAssignmentEntity);
                            System.out.println("Multiple Service AccAss Saved Response: " + msg);
                        }
                        if ("editpo".equals(poFrom) || "editApprovedPo".equals(poFrom)) {
                            purchaseOrderWS.ServiceAccountAssignmentFunctionForEditPO(currentPoLineInsertionOrderId, currentPoLineLinkId, serviceLineItemNumber, poFrom);
                        } else {
                            purchaseOrderWS.ServiceAccountAssignmentFunction(currentPoLineInsertionOrderId, currentPoLineLinkId, serviceLineItemNumber, "");
                        }
                    }
                }

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("replicateSAMainAccAssToPOLineHavingSameCategory")) {
            try {
                System.out.println("replicateSAMainAccAssToPOLineHavingSameCategory");
                out = response.getWriter();

                String currentPoLineItemNo = request.getParameter("currentPoLineItemNo");
                String currentPoLineLinkId = request.getParameter("currentPoLineLinkId");
                String currentPoLineDistribution = request.getParameter("currentPoLineDistribution");
                String poLineDetailsArr = request.getParameter("poLineDetailsJsonArr");
                String prType = request.getParameter("prType");
                String poId = request.getParameter("poId");

                System.out.println("currentPoLineItemNo: " + currentPoLineItemNo);
                System.out.println("currentPoLineLinkId: " + currentPoLineLinkId);
                System.out.println("currentPoLineDistribution: " + currentPoLineDistribution);
                System.out.println("poLineDetailsArr: " + poLineDetailsArr);
                System.out.println("prType: " + prType);
                System.out.println("poId: " + poId);

                JSONArray poLineDetailsJsonArr = new JSONArray(poLineDetailsArr);
                System.out.println("poLineDetailsJsonArr len: " + poLineDetailsJsonArr.length());

                List<NGBPCmplxPOCreationLineItemPOAccountAssignment> currentPoLineAccAsgnList = standalonePoWSUtil.getAccountAssignmentByLinkId(currentPoLineLinkId);
                System.out.println("currentPoLineAccAsgnList size: " + currentPoLineAccAsgnList.size());

                for (int i = 0; i < poLineDetailsJsonArr.length(); i++) {
                    JSONObject poLineDetailsJsonObj = poLineDetailsJsonArr.getJSONObject(i);
                    System.out.println("poLineDetailsJsonObj: " + poLineDetailsJsonObj.toString());

                    String linkId = poLineDetailsJsonObj.getString("linkId");
                    String quantity = poLineDetailsJsonObj.getString("quantity");
                    String prItemNumber = poLineDetailsJsonObj.getString("itemNo");

                    System.out.println("linkId: " + linkId);
                    System.out.println("quantity: " + quantity);
                    System.out.println("prItemNumber: " + prItemNumber);

                    List<NGBPCmplxPOCreationLineItemPOAccountAssignment> poLineAccAsgnList = standalonePoWSUtil.getAccountAssignmentByLinkId(linkId);
                    System.out.println("poLineAccAsgnList size: " + poLineAccAsgnList.size());
                    if (!poLineAccAsgnList.isEmpty()) {
                        for (NGBPCmplxPOCreationLineItemPOAccountAssignment assignment : poLineAccAsgnList) {
                            assignment.setLinkID("");
                            standalonePoWSUtil.updateNGBPCmplxPOCreationLineItemPOAccountAssignment(assignment);
                        }
                    }

                    if (currentPoLineDistribution != null && currentPoLineDistribution.equals("Single Account Assignment")) {
                        System.out.println("Single Account Assignment=====================>");

                        List<NGBPCmplxPOCreationLineItemPO> saPoLinelist = standalonePoWSUtil.findSAPoLineByExtIdAndItemNo(poId, prItemNumber);
                        System.out.println("saPoLinelist size :" + saPoLinelist.size());

                        for (int j = 0; j < currentPoLineAccAsgnList.size(); j++) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignment currentAccAssObj = currentPoLineAccAsgnList.get(j);

                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setQuantity(new BigDecimal(quantity));
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setPercentage(new BigDecimal(100.0));
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setGlAccount(currentAccAssObj.getGlAccount());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCoArea(currentAccAssObj.getCoArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCostCenter(currentAccAssObj.getCostCenter());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setFund(currentAccAssObj.getFund());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setFunctionalArea(currentAccAssObj.getFunctionalArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setFundsCentre(currentAccAssObj.getFundsCentre());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCommitmentItem(currentAccAssObj.getCommitmentItem());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setUnloadingPoint(currentAccAssObj.getUnloadingPoint());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setRecipient(currentAccAssObj.getRecipient());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setAccOrder(currentAccAssObj.getAccOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setAsset(currentAccAssObj.getAsset());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setWbsElement(currentAccAssObj.getWbsElement());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setSalesOrder(currentAccAssObj.getSalesOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setNetwork(currentAccAssObj.getNetwork());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setItemNumber(currentAccAssObj.getItemNumber());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setDeliverySchedule(currentAccAssObj.getDeliverySchedule());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setDistribution(currentAccAssObj.getDistribution());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setAccountAssignmentCategory(currentAccAssObj.getAccountAssignmentCategory());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCoCode(currentAccAssObj.getCoCode());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setSerialNumber("");
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setLinkID(linkId);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setPrItemNumber(prItemNumber);

                            if (!saPoLinelist.isEmpty()) {
                                NGBPCmplxPOCreationLineItemPO saPoLineObj = saPoLinelist.get(0);
                                ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setPoCreationLineItemPO(saPoLineObj);
                            } else {
                                System.err.println("SA PO Line not found!");
                            }

                            String msg = standalonePoWSUtil.saveNGBPCmplxPOCreationLineItemPOAccountAssignment(ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity);
                            System.out.println("msg :" + msg);
                        }
                    } 
                    else 
                    {
                        System.out.println("Multiple Account Assignment=====================>");

                        List<NGBPCmplxPOCreationLineItemPO> saPoLinelist = standalonePoWSUtil.findSAPoLineByExtIdAndItemNo(poId, prItemNumber);
                        System.out.println("saPoLinelist size :" + saPoLinelist.size());

                        for (int j = 0; j < currentPoLineAccAsgnList.size(); j++) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignment currentAccAssObj = currentPoLineAccAsgnList.get(j);
                            
                            BigDecimal percentage = currentAccAssObj.getPercentage();
                            System.out.println("Acc Ass, percentage: " + percentage);
                            System.out.println("PO Line, quantity: " + quantity);
                            
                            BigDecimal qtyByPerc = (percentage.multiply(new BigDecimal(quantity))).divide(new BigDecimal(100));
//                            double qtyByPerc = (percentage.doubleValue() * Double.parseDouble(quantity)) / 100;
                            System.out.println("qtyByPerc: " + qtyByPerc);
                            
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setQuantity(qtyByPerc);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setPercentage(percentage);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setGlAccount(currentAccAssObj.getGlAccount());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCoArea(currentAccAssObj.getCoArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCostCenter(currentAccAssObj.getCostCenter());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setFund(currentAccAssObj.getFund());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setFunctionalArea(currentAccAssObj.getFunctionalArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setFundsCentre(currentAccAssObj.getFundsCentre());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCommitmentItem(currentAccAssObj.getCommitmentItem());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setUnloadingPoint(currentAccAssObj.getUnloadingPoint());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setRecipient(currentAccAssObj.getRecipient());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setAccOrder(currentAccAssObj.getAccOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setAsset(currentAccAssObj.getAsset());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setWbsElement(currentAccAssObj.getWbsElement());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setSalesOrder(currentAccAssObj.getSalesOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setNetwork(currentAccAssObj.getNetwork());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setItemNumber(currentAccAssObj.getItemNumber());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setDeliverySchedule(currentAccAssObj.getDeliverySchedule());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setDistribution(currentAccAssObj.getDistribution());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setAccountAssignmentCategory(currentAccAssObj.getAccountAssignmentCategory());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setCoCode(currentAccAssObj.getCoCode());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setSerialNumber("");
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setLinkID(linkId);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setPrItemNumber(prItemNumber);

                            if (!saPoLinelist.isEmpty()) {
                                NGBPCmplxPOCreationLineItemPO saPoLineObj = saPoLinelist.get(0);
                                ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity.setPoCreationLineItemPO(saPoLineObj);
                            } else {
                                System.err.println("SA PO Line not found!");
                            }

                            String msg = standalonePoWSUtil.saveNGBPCmplxPOCreationLineItemPOAccountAssignment(ngBPCmplxPOCreationLineItemPOAccountAssignmentEntity);
                            System.out.println("msg :" + msg);
                        }
                    }
                }

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("replicateSAServiceAccAss")) {
            try {
                System.out.println("replicateSAServiceAccAss");
		out = response.getWriter();
                
                String currentPoLineItemNo = request.getParameter("currentPoLineItemNo");
                String currentPoLineLinkId = request.getParameter("currentPoLineLinkId");
		String selectedServiceLineItemNumber = request.getParameter("selectedServiceLineItemNumber");
		String selectedServiceAccAssDist = request.getParameter("selectedServiceAccAssDist");
		String servicesDetailsArr = request.getParameter("servicesDetailsJsonArr");
                String poId = request.getParameter("poId");
                
                System.out.println("currentPoLineItemNo: " + currentPoLineItemNo);
                System.out.println("currentPoLineLinkId: " + currentPoLineLinkId);
		System.out.println("selectedServiceLineItemNumber: " + selectedServiceLineItemNumber);
		System.out.println("selectedServiceAccAssDist: " + selectedServiceAccAssDist);
		System.out.println("servicesDetailsArr: " + servicesDetailsArr);
                System.out.println("poId: " + poId);
                
                List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> selectedServiceAccAsgnList = standalonePoWSUtil
                        .getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(selectedServiceLineItemNumber, currentPoLineItemNo, poId);
                System.out.println("SelectedServiceAccAsgnList Size :" + selectedServiceAccAsgnList.size());
                
                JSONArray servicesDetailsJsonArr = new JSONArray(servicesDetailsArr);
		System.out.println("servicesDetailsJsonArr len: " + servicesDetailsJsonArr.length());
                
                for (int i = 0; i < servicesDetailsJsonArr.length(); i++) {
                    JSONObject serviceDetailsJsonObj = servicesDetailsJsonArr.getJSONObject(i);
                    System.out.println("serviceDetailsJsonObj: " + serviceDetailsJsonObj.toString());
                    
                    String serviceLineItemNumber = serviceDetailsJsonObj.getString("serviceLineItemNumber");
                    String serviceLineQuantity = serviceDetailsJsonObj.getString("serviceLineQuantity");
                    String serviceLineGrossPrice = serviceDetailsJsonObj.getString("serviceLineGrossPrice");
                    
                    System.out.println("serviceLineItemNumber: " + serviceLineItemNumber);
                    System.out.println("serviceLineQuantity: " + serviceLineQuantity);
                    System.out.println("serviceLineGrossPrice: " + serviceLineGrossPrice);
                    
                    List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> otherServiceAccAsgnList = standalonePoWSUtil
                        .getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(serviceLineItemNumber, currentPoLineItemNo, poId);
                    System.out.println("otherServiceAccAsgnList Size :" + otherServiceAccAsgnList.size());
                    if (!otherServiceAccAsgnList.isEmpty()) {
                        standalonePoWSUtil.deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(otherServiceAccAsgnList);
                    }
                    
                    if (selectedServiceAccAssDist != null && selectedServiceAccAssDist.trim().equals("")) {
                        System.out.println("Single Account Assignment=====================>");
                        for (int j = 0; j < selectedServiceAccAsgnList.size(); j++) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues selectedServAccAssObj = selectedServiceAccAsgnList.get(j);
                            
                            BigDecimal accAssNetVal = new BigDecimal(serviceLineGrossPrice).multiply(new BigDecimal(serviceLineQuantity));
                            System.out.println("accAssNetVal: " + accAssNetVal);
                            
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setGlAccount(selectedServAccAssObj.getGlAccount());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setCoArea(selectedServAccAssObj.getCoArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setCostCenter(selectedServAccAssObj.getCostCenter());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccOrder(selectedServAccAssObj.getAccOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccAsset(selectedServAccAssObj.getAccAsset());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccWBSElement(selectedServAccAssObj.getAccWBSElement());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setSalesOrder(selectedServAccAssObj.getSalesOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setItemNumber(selectedServAccAssObj.getItemNumber());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setDeliverySchedule(selectedServAccAssObj.getDeliverySchedule());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setFund(selectedServAccAssObj.getFund());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setFunctionalArea(selectedServAccAssObj.getFunctionalArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setFundsCentre(selectedServAccAssObj.getFundsCentre());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setCommitmentItem(selectedServAccAssObj.getCommitmentItem());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setNetwork(selectedServAccAssObj.getNetwork());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setLineItemNumber(currentPoLineItemNo);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setServiceLineItemNumber(serviceLineItemNumber);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setQuantity(new BigDecimal(serviceLineQuantity));
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccountAssignment(selectedServAccAssObj.getAccountAssignment());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setLinkID(currentPoLineLinkId);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setPoId(poId);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setNetPrice(accAssNetVal);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setDistribution(selectedServAccAssObj.getDistribution());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setPercentage(new BigDecimal(100));
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setRecipient(selectedServAccAssObj.getRecipient());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setUnloadingPoint(selectedServAccAssObj.getUnloadingPoint());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setSerialNumber(null);
                            
                            String msg = standalonePoWSUtil.saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity);
                            System.out.println("msg :" + msg);
                            
                            purchaseOrderWS.ServiceStandAloneAccountAssignmentFunction(currentPoLineLinkId);
                        }
                    } else {
                        System.out.println("Multiple Account Assignment=====================>");
                        for (int j = 0; j < selectedServiceAccAsgnList.size(); j++) {
                            NGBPCmplxPOCreationLineItemPOAccountAssignmentValues selectedServAccAssObj = selectedServiceAccAsgnList.get(j);
                            
                            BigDecimal percentage = selectedServAccAssObj.getPercentage();
                            System.out.println("Service Acc Ass, percentage: " + percentage);
                            System.out.println("Service Line, quantity: " + serviceLineQuantity);
                            
                            BigDecimal qtyByPerc = (percentage.multiply(new BigDecimal(serviceLineQuantity))).divide(new BigDecimal(100));                            
//                            double qtyByPerc = (percentage.doubleValue() * Double.parseDouble(serviceLineQuantity)) / 100;
                            System.out.println("qtyByPerc: " + qtyByPerc);
                            
                            BigDecimal accAssNetVal = new BigDecimal(serviceLineGrossPrice).multiply(qtyByPerc);
                            System.out.println("accAssNetVal: " + accAssNetVal);
                            
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setGlAccount(selectedServAccAssObj.getGlAccount());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setCoArea(selectedServAccAssObj.getCoArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setCostCenter(selectedServAccAssObj.getCostCenter());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccOrder(selectedServAccAssObj.getAccOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccAsset(selectedServAccAssObj.getAccAsset());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccWBSElement(selectedServAccAssObj.getAccWBSElement());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setSalesOrder(selectedServAccAssObj.getSalesOrder());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setItemNumber(selectedServAccAssObj.getItemNumber());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setDeliverySchedule(selectedServAccAssObj.getDeliverySchedule());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setFund(selectedServAccAssObj.getFund());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setFunctionalArea(selectedServAccAssObj.getFunctionalArea());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setFundsCentre(selectedServAccAssObj.getFundsCentre());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setCommitmentItem(selectedServAccAssObj.getCommitmentItem());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setNetwork(selectedServAccAssObj.getNetwork());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setLineItemNumber(currentPoLineItemNo);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setServiceLineItemNumber(serviceLineItemNumber);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setQuantity(qtyByPerc);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setAccountAssignment(selectedServAccAssObj.getAccountAssignment());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setLinkID(currentPoLineLinkId);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setPoId(poId);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setNetPrice(accAssNetVal);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setDistribution(selectedServAccAssObj.getDistribution());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setPercentage(percentage);
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setRecipient(selectedServAccAssObj.getRecipient());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setUnloadingPoint(selectedServAccAssObj.getUnloadingPoint());
                            ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity.setSerialNumber(null);
                            
                            String msg = standalonePoWSUtil.saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(ngBPCmplxPOCreationLineItemPOAccountAssignmentValuesEntity);
                            System.out.println("msg :" + msg);
                        }
                        purchaseOrderWS.ServiceStandAloneAccountAssignmentFunction(currentPoLineLinkId);
                    }
                }
                
                jObj.put("Result", "Success");
		out.println(jObj);
            } catch (IOException ex) {
		Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findVendorsFromVendorMaster")) {
            try {
                System.out.println("findVendorsFromVendorMaster");
                out = response.getWriter();

                String recordCount = request.getParameter("recordCount");
                String vendorCodeOrNameSearchText = request.getParameter("vendorCodeOrNameSearchText");
                String lastVMSno = request.getParameter("lastVMSno");

                System.out.println("recordCount: " + recordCount);
                System.out.println("vendorCodeOrNameSearchText: " + vendorCodeOrNameSearchText);
                System.out.println("lastVMSno: " + lastVMSno);

                List<MasterVendor> vendorMasterList = vendorWSUtil
                                                        .getVendorsFromVendorMasterByPagination(
                                                                recordCount, 
                                                                vendorCodeOrNameSearchText, 
                                                                lastVMSno);
                System.out.println("vendorMasterList size: " + vendorMasterList.size());

                JSONArray vmJsonArr = new JSONArray(vendorMasterList);
                System.out.println("vmJsonArr size: " + vmJsonArr.length());

                out.println(vmJsonArr);
            } catch (IOException ex) {
		Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findActiveVendorsAndProspectFromVendorDetails")) {
            try {
                System.out.println("findActiveVendorsAndProspectFromVendorDetails");
                out = response.getWriter();

                String recordCount = request.getParameter("recordCount");
                String vendorCodeOrNameSearchText = request.getParameter("vendorCodeOrNameSearchText");
                String lastVMSno = request.getParameter("lastVMSno");

                System.out.println("recordCount: " + recordCount);
                System.out.println("vendorCodeOrNameSearchText: " + vendorCodeOrNameSearchText);
                System.out.println("lastVMSno: " + lastVMSno);

                List<VendorDetails> vendorDetailsList = vendorWSUtil
                                                        .getVendorsAndProspectsFromVendorDetailsByPagination(
                                                                recordCount, 
                                                                vendorCodeOrNameSearchText, 
                                                                lastVMSno);
                System.out.println("vendorDetailsList size: " + vendorDetailsList.size());

                JSONArray vdJsonArr = new JSONArray(vendorDetailsList);
                System.out.println("vdJsonArr size: " + vdJsonArr.length());

                out.println(vdJsonArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findVendorsFromVendorMasterByCompanyCodeAndPagination")) {
            try {
                System.out.println("findVendorsFromVendorMasterByCompanyCodeAndPagination");
                out = response.getWriter();

                String recordCount = request.getParameter("recordCount");
                String vendorCodeOrNameSearchText = request.getParameter("vendorCodeOrNameSearchText");
                String lastVMSno = request.getParameter("lastVMSno");
                String companyCode = request.getParameter("companyCode");

                System.out.println("recordCount: " + recordCount);
                System.out.println("vendorCodeOrNameSearchText: " + vendorCodeOrNameSearchText);
                System.out.println("lastVMSno: " + lastVMSno);
                System.out.println("companyCode: " + companyCode);

                List<MasterVendor> vendorMasterList = vendorWSUtil
                                                        .findVendorsFromVendorMasterByCompanyCodeAndPagination(
                                                                recordCount, 
                                                                vendorCodeOrNameSearchText, 
                                                                lastVMSno,
                                                                companyCode);
                System.out.println("vendorMasterList size: " + vendorMasterList.size());

                JSONArray vmJsonArr = new JSONArray(vendorMasterList);
                System.out.println("vmJsonArr size: " + vmJsonArr.length());

                out.println(vmJsonArr);
            } catch (IOException ex) {
		Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @RequestMapping(value = "/standalonePoPostAjaxRequest", method = RequestMethod.POST)
    public void standalonePoPostAjaxRequest(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========Standalone PO Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in standalonePoPostAjaxRequest : " + reqFrom);

        if (reqFrom.equalsIgnoreCase("DeletePrLineInEditPo")) {
            try {
                out = response.getWriter();

                String poNumber = request.getParameter("poNumber");
                String prNumber = request.getParameter("prNumber");
                String prItemNumber = request.getParameter("prItemNumber");

                System.out.println("poNumber: " + poNumber);
                System.out.println("prNumber: " + prNumber);
                System.out.println("prItemNumber: " + prItemNumber);

                List<FinalizedRfq> finalizedRfqListByPoNumber = rfqRfpUtilWS.findFinalizedRfqByPoNumber(poNumber);
                System.out.println("finalizedRfqListByPoNumber size: " + finalizedRfqListByPoNumber.size());

                if (!finalizedRfqListByPoNumber.isEmpty()) {
                    System.out.println("PO Created From RFQ==================");
                    jObj.put("CreatedFrom", "RFQ");

                    List<FinalizedRfq> finalizedRfqListByPoNumberPrItemNumberIsPoCreated = rfqRfpUtilWS.findByPrNumberAndPrItemNumberAndIsPoCreated(prNumber, prItemNumber, "Yes");
                    System.out.println("finalizedRfqListByPoNumberPrItemNumberIsPoCreated size: " + finalizedRfqListByPoNumberPrItemNumberIsPoCreated.size());
                    for (FinalizedRfq finalizedRfqObj : finalizedRfqListByPoNumberPrItemNumberIsPoCreated) {
                        JSONObject innerJsonObj = new JSONObject();

                        innerJsonObj.put("FinalizedRfqId", finalizedRfqObj.getId());
                        innerJsonObj.put("PoNumber", finalizedRfqObj.getPoNumber());
                        innerJsonObj.put("PrNumber", finalizedRfqObj.getPrNumber());
                        innerJsonObj.put("PrItemNumber", finalizedRfqObj.getPrItemNumber());
                        innerJsonObj.put("QuantityUsed", finalizedRfqObj.getQuantity());
                        innerJsonObj.put("RfqId", finalizedRfqObj.getNgBpWorkorderrfqheaderRfqid().getRfqid());
                        innerJsonObj.put("PrId", finalizedRfqObj.getNgBpNewgenPRLineItemId().getInsertionOrderId());

                        jArra.put(innerJsonObj);
                    }

//                    List<FinalizedRfq> finalizedRfqListByPoNoPrNoPrItemNo = rfqRfpUtilWS.findFinalizedRfqByPoNumberAndPrNumberAndPrItemNumber(poNumber, prNumber, prItemNumber);
//                    System.out.println("finalizedRfqListByPoNoPrNoPrItemNo size: " + finalizedRfqListByPoNoPrNoPrItemNo.size());
                } else {
                    System.out.println("PO Created From PR==================");
                    jObj.put("CreatedFrom", "PR");
                }
                jObj.put("PoDetails", jArra);
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("AddQuantityToPrFromPo")) {
            System.out.println("AddQuantityToPrFromPo");
            try {
                out = response.getWriter();

                String finalizedRfqId = request.getParameter("finalizedRfqId");
                String rfqId = request.getParameter("rfqId");
                String prId = request.getParameter("prId");
                String quantity = request.getParameter("quantity");

                System.out.println("finalizedRfqId: " + finalizedRfqId);
                System.out.println("rfqId: " + rfqId);
                System.out.println("prId: " + prId);
                System.out.println("quantity: " + quantity);

                NewgenPRLineItem newgenPR = purchaseRequestUtilWS.getPrDetailsById(Integer.parseInt(prId));
                System.out.println("newgenPR: " + newgenPR);
                newgenPR.setBpQuantityRemaining((Integer.parseInt(newgenPR.getBpQuantityRemaining()) + Integer.parseInt(quantity)) + "");
                purchaseRequestUtilWS.updatePrLineItemNG(newgenPR);

                FinalizedRfq finalizedRfqObj = rfqRfpUtilWS.getFinalizedRfqById(Integer.parseInt(finalizedRfqId));
                finalizedRfqObj.setStatus("Delete");
                rfqRfpUtilWS.updateFinalizedRfq(finalizedRfqObj);

                jObj.put("Result", "Success");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("SaveDraftPo")) {
            System.out.println("SaveDraftPo");
            try {
                out = response.getWriter();
                String formdata = request.getParameter("formdata");
                String draftPoExtId = request.getParameter("draftPoExtId");
                String prType = request.getParameter("prType");
                String errorTransactionStatus = request.getParameter("errorTransactionStatus");
                System.out.println("draftPoExtId: " + draftPoExtId);
                System.out.println("prType: " + prType);
                System.out.println("errorTransactionStatus: " + errorTransactionStatus);
                System.out.println("formdata: " + formdata);

                JSONObject jsonObj = savePoLineLevelTab.draftPo(draftPoExtId, prType, formdata, errorTransactionStatus);
                out.println(jsonObj);

            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("saveSAHeaderConditionsInDB")) {
            System.out.println("saveSAHeaderConditionsInDB");
            try {
                out = response.getWriter();
                String POHeaderConditionAsJsonString = request.getParameter("POHeaderConditionAsJsonString");
                String extPoId = request.getParameter("extPoId");
                System.out.println("POHeaderConditionAsJsonString: " + POHeaderConditionAsJsonString);
                System.out.println("extPoId: " + extPoId);

                JSONArray poHeaderConditionsJsonArr = new JSONArray(POHeaderConditionAsJsonString);
                System.out.println("poHeaderConditionsJsonArr len: " + poHeaderConditionsJsonArr.length());

                List<NGBPCmplxPOCreationConditions> conditionsList = purchaseOrderWSUtil.getNGBPCmplxPOCreationConditionsByExtId(Long.parseLong(extPoId));
                System.out.println("conditionsList size: " + conditionsList.size());
                if (!conditionsList.isEmpty()) {
                    purchaseOrderWSUtil.deleteAllNGBPCmplxPOCreationConditions(conditionsList);
                }

                for (int i = 0; i < poHeaderConditionsJsonArr.length(); i++) {
                    JSONObject poHeaderConditionsJsonObj = poHeaderConditionsJsonArr.getJSONObject(i);

                    ngBPCmplxPOCreationConditions.setExtPoCreationId(Long.parseLong(extPoId));
                    ngBPCmplxPOCreationConditions.setConditionVendorHeader(poHeaderConditionsJsonObj.getString("conditionVendorHeader"));
                    ngBPCmplxPOCreationConditions.setLineAddedFromHeader(poHeaderConditionsJsonObj.getString("lineAddedFromHeader"));
                    ngBPCmplxPOCreationConditions.setConditionIndex(poHeaderConditionsJsonObj.getString("conditionIndex"));
                    ngBPCmplxPOCreationConditions.setCondType(poHeaderConditionsJsonObj.getString("conType"));
                    ngBPCmplxPOCreationConditions.setCondName(poHeaderConditionsJsonObj.getString("name"));

                    if (poHeaderConditionsJsonObj.getString("amount") != null && !poHeaderConditionsJsonObj.getString("amount").equals("")) {
                        ngBPCmplxPOCreationConditions.setAmount(new BigDecimal(poHeaderConditionsJsonObj.getString("amount")));
                    } else {
                        ngBPCmplxPOCreationConditions.setAmount(new BigDecimal(0.0));
                    }
                    if (poHeaderConditionsJsonObj.getString("perQuant") != null && !poHeaderConditionsJsonObj.getString("perQuant").equals("")) {
                        ngBPCmplxPOCreationConditions.setPerQuantity(new BigDecimal(poHeaderConditionsJsonObj.getString("perQuant")));
                    } else {
                        ngBPCmplxPOCreationConditions.setPerQuantity(new BigDecimal(0.0));
                    }

                    ngBPCmplxPOCreationConditions.setCondPricUnit(poHeaderConditionsJsonObj.getString("conPrUnit"));
                    ngBPCmplxPOCreationConditions.setCurrency1(poHeaderConditionsJsonObj.getString("curr1"));
                    ngBPCmplxPOCreationConditions.setUoM(poHeaderConditionsJsonObj.getString("uOM"));

                    if (poHeaderConditionsJsonObj.getString("conVal1") != null && !poHeaderConditionsJsonObj.getString("conVal1").equals("")) {
                        ngBPCmplxPOCreationConditions.setCondVal1(new BigDecimal(poHeaderConditionsJsonObj.getString("conVal1")));
                    } else {
                        ngBPCmplxPOCreationConditions.setCondVal1(new BigDecimal(0.0));
                    }

                    ngBPCmplxPOCreationConditions.setCurrency(poHeaderConditionsJsonObj.getString("curr2"));

                    if (poHeaderConditionsJsonObj.getString("conVal2") != null && !poHeaderConditionsJsonObj.getString("conVal2").equals("")) {
                        ngBPCmplxPOCreationConditions.setCondVal(new BigDecimal(poHeaderConditionsJsonObj.getString("conVal2")));
                    } else {
                        ngBPCmplxPOCreationConditions.setCondVal(new BigDecimal(0.0));
                    }

                    ngBPCmplxPOCreationConditions.setCondCrncy(poHeaderConditionsJsonObj.getString("conCurr"));
                    ngBPCmplxPOCreationConditions.setStNumber(poHeaderConditionsJsonObj.getString("stNumber"));
                    ngBPCmplxPOCreationConditions.setConditionCount(poHeaderConditionsJsonObj.getString("condCount"));
                    ngBPCmplxPOCreationConditions.setKappl(poHeaderConditionsJsonObj.getString("KAPPL"));
                    ngBPCmplxPOCreationConditions.setKvsl1(poHeaderConditionsJsonObj.getString("KVSL1"));
                    ngBPCmplxPOCreationConditions.setKvsl2(poHeaderConditionsJsonObj.getString("KVSL2"));
                    ngBPCmplxPOCreationConditions.setChangeId(poHeaderConditionsJsonObj.getString("condChangeId"));
                    ngBPCmplxPOCreationConditions.setVendorName(poHeaderConditionsJsonObj.getString("vendorName"));
                    ngBPCmplxPOCreationConditions.setVendorCode(poHeaderConditionsJsonObj.getString("vendorCode"));
                    ngBPCmplxPOCreationConditions.setCondPriceDate(poHeaderConditionsJsonObj.getString("condPriceDate"));
                    ngBPCmplxPOCreationConditions.setCondCurncyExchangeRate(poHeaderConditionsJsonObj.getString("condCurrExchangeRate"));
                    ngBPCmplxPOCreationConditions.setPoCurrencyExchangeRate(poHeaderConditionsJsonObj.getString("poCurrExchangeRate"));

                    purchaseOrderWSUtil.saveNGBPCmplxPOCreationConditions(ngBPCmplxPOCreationConditions);
                }
                System.out.println("Conditions Saved Successfully!");
                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        }
    }

    @RequestMapping(value = "/saveAmendPoLineLevelData", method = RequestMethod.POST)
    public void saveAmendPoLineLevelData(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========Standalone PO Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in saveAmendPoLineLevelData : " + reqFrom);
        try {
            if (reqFrom.equalsIgnoreCase("saveAmendPoLineLevelData")) {
                out = response.getWriter();
                String idext = "";
                System.out.println("ID IN Service ::: " + idext);
                idext = savePRLineSubTab(request, response);
                out.println(idext);
            }
        } catch (IOException ex) {
            Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    @RequestMapping(value = "/saveAmendSAPoLineLevelData", method = RequestMethod.POST)                         // Sunny Kumar Prajapati
    public void saveAmendSAPoLineLevelData(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========Standalone PO Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in saveAmendSAPoLineLevelData : " + reqFrom);
        String prType = request.getParameter("prType");
        System.out.println("prType in saveAmendSAPoLineLevelData :" + prType);
        try {
            if (reqFrom.equalsIgnoreCase("saveSAPRLineSub")) {
                System.out.println("In saveSAPRLineSub=====");

                System.out.println("reqFrom in saveAmendPoLineLevelData : " + reqFrom);
                RestTemplate restTemplate = new RestTemplate();

                JSONObject POLineLevelDataAsJsonObj = new JSONObject(request.getParameter("formdata"));

                String PoId = POLineLevelDataAsJsonObj.getString("PoId");

                System.out.println("PoId in saveSAPRLineSub:" + PoId);

                JSONArray PRLineItemArray = POLineLevelDataAsJsonObj.getJSONArray("PRLineItemArray");
                System.out.println("PRLineItemArray size: " + PRLineItemArray.length());
                System.out.println("PRLineItemArray: " + PRLineItemArray.toString());

                JSONArray POServiceAccAssDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POServiceAccAssData");
                System.out.println("POServiceAccAssDataAsJsonArray size: " + POServiceAccAssDataAsJsonArray.length());
                System.out.println("POServiceAccAssDataAsJsonArray: " + POServiceAccAssDataAsJsonArray);

                for (int i = 0; i < PRLineItemArray.length(); i++) {
                    JSONObject jsonobj = PRLineItemArray.getJSONObject(i);
                    String itemId = jsonobj.getString("ItemNumber");
                    System.out.println("itemId in saveSAPRLineSub:" + itemId);

                    String url = webservice_ip + "/BuyerPortalWebServices/getPRLineData.do?searchData=" + PoId + "~" + itemId;
                    System.out.println("URL STRING :::: " + url);
                    ResponseEntity<List<NGBPCmplxPOCreationLineItemPO>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPO>>() {
                    });
                    List<NGBPCmplxPOCreationLineItemPO> LineItemPOlist = list.getBody();
                    System.out.println("LineItemPOlist size :" + LineItemPOlist.size());

                    NGBPCmplxPOCreationLineItemPO lineItemPO = savePoLineLevelTab.saveSAInvoiceTabData(POLineLevelDataAsJsonObj, LineItemPOlist.get(0), PoId, prType);

                }
                String msg = savePoLineLevelTab.saveSAServiceAccountAssignmentData(POServiceAccAssDataAsJsonArray, PoId);
                System.out.println("msg :" + msg);
                out = response.getWriter();
                String idext = "";
                System.out.println("ID IN Service ::: " + idext);
                out.println(idext);
            }
        } catch (IOException ex) {
            Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    String savePRLineSubTab(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("In savePRLineSubTab++++++++++++++++++++++++++++++++");
        System.out.println("Paramenter [savePRLineSub]  :::: " + request.getParameter("formdata"));

        JSONObject POLineLevelDataAsJsonObj = new JSONObject(request.getParameter("formdata"));
        String poNumber = POLineLevelDataAsJsonObj.getString("PoId");
        System.out.println("poNumber: " + poNumber);

        String prType = POLineLevelDataAsJsonObj.getString("PurchaseRequestType");
        System.out.println("prType: " + prType);

        JSONArray PRLineItemArray = POLineLevelDataAsJsonObj.getJSONArray("PRLineItemArray");
        System.out.println("PRLineItemArray size: " + PRLineItemArray.length());
        System.out.println("PRLineItemArray: " + PRLineItemArray.toString());

        JSONArray POInvoiceDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POInvoiceData");
        System.out.println("POInvoiceDataAsJsonArray size: " + POInvoiceDataAsJsonArray.length());
        System.out.println("POInvoiceDataAsJsonArray: " + POInvoiceDataAsJsonArray);

        JSONArray POServiceDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POServiceData");
        System.out.println("POServiceDataAsJsonArray size: " + POServiceDataAsJsonArray.length());
        System.out.println("POServiceDataAsJsonArray: " + POServiceDataAsJsonArray);

        JSONArray POServiceAccAssDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POServiceAccAssData");
        System.out.println("POServiceAccAssDataAsJsonArray size: " + POServiceAccAssDataAsJsonArray.length());
        System.out.println("POServiceAccAssDataAsJsonArray: " + POServiceAccAssDataAsJsonArray);

        JSONArray POLineItemConditionDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POLineItemConditionData");
        System.out.println("POLineItemConditionDataAsJsonArray size: " + POLineItemConditionDataAsJsonArray.length());
        System.out.println("POLineItemConditionDataAsJsonArray: " + POLineItemConditionDataAsJsonArray);

        JSONArray POAccAssDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POAccAssData");
        System.out.println("POAccAssDataAsJsonArray size: " + POAccAssDataAsJsonArray.length());
        System.out.println("POAccAssDataAsJsonArray: " + POAccAssDataAsJsonArray);

        JSONArray POQuantityWeightsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POQuantityWeightsData");
        System.out.println("POQuantityWeightsDataAsJsonArray size: " + POQuantityWeightsDataAsJsonArray.length());
        System.out.println("POQuantityWeightsDataAsJsonArray: " + POQuantityWeightsDataAsJsonArray);

        JSONArray PODeliveryScheduleDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryScheduleData");
        System.out.println("PODeliveryScheduleDataAsJsonArray size: " + PODeliveryScheduleDataAsJsonArray.length());
        System.out.println("PODeliveryScheduleDataAsJsonArray: " + PODeliveryScheduleDataAsJsonArray);

        JSONArray POConfirmationDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POConfirmationData");
        System.out.println("POConfirmationDataAsJsonArray size: " + POConfirmationDataAsJsonArray.length());
        System.out.println("POConfirmationDataAsJsonArray: " + POConfirmationDataAsJsonArray);

        JSONArray POCondCtrlDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POCondCtrlData");
        System.out.println("POCondCtrlDataAsJsonArray size: " + POCondCtrlDataAsJsonArray.length());
        System.out.println("POCondCtrlDataAsJsonArray: " + POCondCtrlDataAsJsonArray);

        JSONArray PODeliveryDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryData");
        System.out.println("PODeliveryDataAsJsonArray size: " + PODeliveryDataAsJsonArray.length());
        System.out.println("PODeliveryDataAsJsonArray: " + PODeliveryDataAsJsonArray);

        JSONArray PODeliveryAddressDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryAddressData");
        System.out.println("PODeliveryAddressDataAsJsonArray size: " + PODeliveryAddressDataAsJsonArray.length());
        System.out.println("PODeliveryAddressDataAsJsonArray: " + PODeliveryAddressDataAsJsonArray);

        JSONArray POLimitsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POLimitsData");
        System.out.println("POLimitsDataAsJsonArray size: " + POLimitsDataAsJsonArray.length());
        System.out.println("POLimitsDataAsJsonArray: " + POLimitsDataAsJsonArray);

        JSONArray POTextsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POTextsData");
        System.out.println("POTextsDataAsJsonArray size: " + POTextsDataAsJsonArray.length());
        System.out.println("POTextsDataAsJsonArray: " + POTextsDataAsJsonArray);

        JSONArray POLineItemCustomerDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POLineItemCustomerData");
        System.out.println("POLineItemCustomerDataAsJsonArray size: " + POLineItemCustomerDataAsJsonArray.length());
        System.out.println("POLineItemCustomerDataAsJsonArray: " + POLineItemCustomerDataAsJsonArray);

        JSONArray POMaterialDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POMaterialData");
        System.out.println("POMaterialDataAsJsonArray size: " + POMaterialDataAsJsonArray.length());
        System.out.println("POMaterialDataAsJsonArray: " + POMaterialDataAsJsonArray);

        JSONArray POComponentsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POComponentsData");
        System.out.println("POComponentsDataAsJsonArray size: " + POComponentsDataAsJsonArray.length());
        System.out.println("POComponentsDataAsJsonArray: " + POComponentsDataAsJsonArray);

        JSONArray POProfitabilitySegmentDetailsDataJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POProfitabilitySegmentDetailsData");
        System.out.println("POProfitabilitySegmentDetailsDataJsonArray size: " + POProfitabilitySegmentDetailsDataJsonArray.length());
        System.out.println("POProfitabilitySegmentDetailsDataJsonArray: " + POProfitabilitySegmentDetailsDataJsonArray);

        for (int i = 0; i < PRLineItemArray.length(); i++) {
            JSONObject prLineJsonObj = PRLineItemArray.getJSONObject(i);
            System.out.println("prLineJsonObj: " + prLineJsonObj.toString());
            String InsertionOrderId = prLineJsonObj.getString("InsertionOrderId");
            System.out.println("PR InsertionOrderId: " + InsertionOrderId);

            if (prType != null && prType.equals("Service")) {
                List<Services> servicesList = purchaseOrderWS.getServicesByLineItemNumber(InsertionOrderId);
                if (!servicesList.isEmpty()) {
                    purchaseOrderWS.deleteAllServices(servicesList);
                }
                List<ServiceAccountAssignment> serviceAccAsslist = purchaseOrderWS.getServiceAccountAssignmentByLineItemNumber(InsertionOrderId);
                if (!serviceAccAsslist.isEmpty()) {
                    purchaseOrderWS.deleteAllFromServiceAccountAssignment(serviceAccAsslist);
                }
                List<Limits> limitsList = purchaseOrderWS.findLimitsByLineItemNumber(InsertionOrderId);
                if (!limitsList.isEmpty()) {
                    purchaseOrderWS.deleteAllFromLimits(limitsList);
                }
                List<ProfitabilitySegment> profitabilitySegmentList = purchaseOrderWS.getProfitabilitySegmentByLineItemNumber(InsertionOrderId);
                if (!profitabilitySegmentList.isEmpty()) {
                    purchaseOrderWS.deleteAllProfitabilitySegment(profitabilitySegmentList);
                }
            }

            List<Invoice> invoiceList = purchaseOrderWS.getInvoiceByInsertionId(InsertionOrderId);
            if (!invoiceList.isEmpty()) {
                purchaseOrderWS.deleteAllInvoices(invoiceList);
            }
            List<ConditionsLineLevel> conditionsLineLevelList = purchaseOrderWS.getMasterConditionLineLevelByLineItemNumber(InsertionOrderId);
            if (!conditionsLineLevelList.isEmpty()) {
                purchaseOrderWS.deleteAllConditions(conditionsLineLevelList);
            }
            List<AccountAssignment> accAsgnList = purchaseOrderWS.getAccountAssignmentByLineItemNumber(InsertionOrderId);
            if (!accAsgnList.isEmpty()) {
                purchaseOrderWS.deleteAllFromAccountAssignment(accAsgnList);
            }
            List<QuantityDates> quantityWtList = purchaseOrderWS.getQuantityDatesByInsertionId(InsertionOrderId);
            if (!quantityWtList.isEmpty()) {
                purchaseOrderWS.deleteAllQuantityWeightByInsertionOrderId(quantityWtList);
            }
            List<DeliverySchedule> delSchList = purchaseOrderWS.getDeliveryScheduleByInsertionId(InsertionOrderId);
            if (!delSchList.isEmpty()) {
                purchaseOrderWS.deleteDeliverySchedule(delSchList);
            }
            List<Confirmations> confList = purchaseOrderWS.getConfirmationsByInsertionId(InsertionOrderId);
            if (!confList.isEmpty()) {
                purchaseOrderWS.deleteAllConfirmations(confList);
            }
            List<ConditionControl> conditionCtrlList = purchaseOrderWS.getConditionCondrolByInsertionId(InsertionOrderId);
            if (!conditionCtrlList.isEmpty()) {
                purchaseOrderWS.deleteAllConditionControl(conditionCtrlList);
            }
            List<Delivery> deliveryList = purchaseOrderWS.getDeliveryByInsertionId(InsertionOrderId);
            if (!deliveryList.isEmpty()) {
                purchaseOrderWS.deleteAllDelivery(deliveryList);
            }
            List<DeliveryAddress> delAddList = purchaseOrderWS.getDeliveryAddressByInsertionId(InsertionOrderId);
            if (!delAddList.isEmpty()) {
                purchaseOrderWS.deleteAllDeliveryAddress(delAddList);
            }
            List<Text> textList = purchaseOrderWS.getTextsByInsertionId(InsertionOrderId);
            if (!textList.isEmpty()) {
                purchaseOrderWS.deleteAllText(textList);
            }
            List<CustomerData> customerDataList = purchaseOrderWS.getCustomerDataByInsertionId(InsertionOrderId);
            if (!customerDataList.isEmpty()) {
                purchaseOrderWS.deleteAllCustomerData(customerDataList);
            }
            List<MaterialTab> materialTabList = purchaseOrderWS.findMaterialTabByInsertionOrderId(InsertionOrderId);
            if (!materialTabList.isEmpty()) {
                purchaseOrderWS.deleteAllMaterialTab(materialTabList);
            }
            List<Component> componentTabList = purchaseOrderWS.getComponentByLineItemNumber(InsertionOrderId);
            if (!componentTabList.isEmpty()) {
                purchaseOrderWS.deleteAllComponent(componentTabList);
            }
        }

        if (prType != null && prType.equals("Service")) {
            System.out.println("PR Type is service");
            savePoLineLevelTab.saveServiceTabData(POServiceDataAsJsonArray);
            savePoLineLevelTab.saveServiceAccountAssignmentData(POServiceAccAssDataAsJsonArray);
            savePoLineLevelTab.saveLimitsTabData(POLimitsDataAsJsonArray);
            savePoLineLevelTab.saveProfitabilitySegmentDetails(POProfitabilitySegmentDetailsDataJsonArray);
        }

        savePoLineLevelTab.saveInvoiceTabData(POInvoiceDataAsJsonArray);
        savePoLineLevelTab.saveConditionLineLevelTabData(POLineItemConditionDataAsJsonArray);
        savePoLineLevelTab.saveAccountAssignmentTabData(POAccAssDataAsJsonArray);
        savePoLineLevelTab.saveQuantityWeightsTabData(POQuantityWeightsDataAsJsonArray);
        savePoLineLevelTab.saveDeliveryScheduleTabData(PODeliveryScheduleDataAsJsonArray);
        savePoLineLevelTab.saveConfirmationsTabData(POConfirmationDataAsJsonArray);
        savePoLineLevelTab.saveConditionControlTabData(POCondCtrlDataAsJsonArray);
        savePoLineLevelTab.saveDeliveryTabData(PODeliveryDataAsJsonArray);
        savePoLineLevelTab.saveDeliveryAddressTabData(PODeliveryAddressDataAsJsonArray);
        savePoLineLevelTab.saveTextsTabData(POTextsDataAsJsonArray);
        savePoLineLevelTab.saveCustomerTabData(POLineItemCustomerDataAsJsonArray);
        savePoLineLevelTab.saveMaterialTabData(POMaterialDataAsJsonArray);
        savePoLineLevelTab.saveComponentTabData(POComponentsDataAsJsonArray);

        return "success";
    }

    @RequestMapping(value = "/updateServicesLongTexts", method = RequestMethod.POST)
    public void updateServicesLongTexts(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in updateServicesLongTexts : " + reqFrom);

        if (reqFrom.equalsIgnoreCase("updateServiceShortTextByServiceId")) {
            try {
                System.out.println("updateServiceShortTextByServiceId");
                out = response.getWriter();

                String serviceIdAndServiceShortTextJsonObjAsString = request.getParameter("serviceIdAndServiceShortTextJsonObjAsString");
                System.out.println("serviceIdAndServiceShortTextJsonObjAsString: " + serviceIdAndServiceShortTextJsonObjAsString);

                JSONObject serviceIdAndServiceShortTextJsonObj = new JSONObject(serviceIdAndServiceShortTextJsonObjAsString);

                String ServiceId = serviceIdAndServiceShortTextJsonObj.getString("ServiceId");
                String ServiceShortText = serviceIdAndServiceShortTextJsonObj.getString("ServiceShortText");

                System.out.println("ServiceId: " + ServiceId);
                System.out.println("ServiceShortText: " + ServiceShortText);

                if (ServiceId != null && ServiceId.equals("")) {
                    servicesLongTextsEntity.setShortText(ServiceShortText);
                    ServiceId = purchaseOrderWS.saveServicesLongTexts(servicesLongTextsEntity);
                } else if (ServiceId != null && !ServiceId.equals("")) {
                    ServicesLongTexts sltObj = purchaseOrderWS.getServicesLongTextsById(Integer.parseInt(ServiceId));
                    sltObj.setShortText(ServiceShortText);
                    purchaseOrderWS.updateServicesLongTexts(sltObj);
                }
                System.out.println("ServiceId 2: " + ServiceId);

                jObj.put("Result", "Success");
                jObj.put("ServiceId", ServiceId);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("updateServiceLineItemLongTextByServiceId")) {
            try {
                System.out.println("updateServiceLineItemLongTextByServiceId");
                out = response.getWriter();

                String serviceIdAndServiceLineItemLongTextJsonObjAsString = request.getParameter("serviceIdAndServiceLineItemLongTextJsonObjAsString");
                System.out.println("serviceIdAndServiceLineItemLongTextJsonObjAsString: " + serviceIdAndServiceLineItemLongTextJsonObjAsString);

                JSONObject serviceIdAndServiceLineItemLongTextJsonObj = new JSONObject(serviceIdAndServiceLineItemLongTextJsonObjAsString);

                String ServiceId = serviceIdAndServiceLineItemLongTextJsonObj.getString("ServiceId");
                String ServiceLineItemLongText = serviceIdAndServiceLineItemLongTextJsonObj.getString("ServiceLineItemLongText");

                System.out.println("ServiceId: " + ServiceId);
                System.out.println("ServiceLineItemLongText: " + ServiceLineItemLongText);

                if (ServiceId != null && ServiceId.equals("")) {
                    servicesLongTextsEntity.setLineItemLongText(ServiceLineItemLongText);
                    ServiceId = purchaseOrderWS.saveServicesLongTexts(servicesLongTextsEntity);
                } else if (ServiceId != null && !ServiceId.equals("")) {
                    ServicesLongTexts sltObj = purchaseOrderWS.getServicesLongTextsById(Integer.parseInt(ServiceId));
                    sltObj.setLineItemLongText(ServiceLineItemLongText);
                    purchaseOrderWS.updateServicesLongTexts(sltObj);
                }
                System.out.println("ServiceId 2: " + ServiceId);

                jObj.put("Result", "Success");
                jObj.put("ServiceId", ServiceId);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("updateServiceTextByServiceId")) {
            try {
                System.out.println("updateServiceTextByServiceId");
                out = response.getWriter();

                String serviceIdAndServiceTextJsonObjAsString = request.getParameter("serviceIdAndServiceTextJsonObjAsString");
                System.out.println("serviceIdAndServiceTextJsonObjAsString: " + serviceIdAndServiceTextJsonObjAsString);

                JSONObject serviceIdAndServiceTextJsonObj = new JSONObject(serviceIdAndServiceTextJsonObjAsString);

                String ServiceId = serviceIdAndServiceTextJsonObj.getString("ServiceId");
                String ServiceText = serviceIdAndServiceTextJsonObj.getString("ServiceText");

                System.out.println("ServiceId: " + ServiceId);
                System.out.println("ServiceText: " + ServiceText);

                if (ServiceId != null && ServiceId.equals("")) {
                    servicesLongTextsEntity.setServiceText(ServiceText);
                    ServiceId = purchaseOrderWS.saveServicesLongTexts(servicesLongTextsEntity);
                } else if (ServiceId != null && !ServiceId.equals("")) {
                    ServicesLongTexts sltObj = purchaseOrderWS.getServicesLongTextsById(Integer.parseInt(ServiceId));
                    sltObj.setServiceText(ServiceText);
                    purchaseOrderWS.updateServicesLongTexts(sltObj);
                }
                System.out.println("ServiceId 2: " + ServiceId);

                jObj.put("Result", "Success");
                jObj.put("ServiceId", ServiceId);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("updateShortTextAndServiceTextByServiceId")) {
            try {
                System.out.println("updateShortTextAndServiceTextByServiceId");
                out = response.getWriter();

                String serviceIdAndServiceTextAndShortTextJsonObjAsString = request.getParameter("serviceIdAndServiceTextAndShortTextJsonObjAsString");
                System.out.println("serviceIdAndServiceTextAndShortTextJsonObjAsString: " + serviceIdAndServiceTextAndShortTextJsonObjAsString);

                JSONObject serviceIdAndServiceTextAndShortTextJsonObj = new JSONObject(serviceIdAndServiceTextAndShortTextJsonObjAsString);

                String ServiceId = serviceIdAndServiceTextAndShortTextJsonObj.getString("ServiceId");
                String ServiceText = serviceIdAndServiceTextAndShortTextJsonObj.getString("ServiceText");
                String ShortText = serviceIdAndServiceTextAndShortTextJsonObj.getString("ShortText");

                System.out.println("ServiceId: " + ServiceId);
                System.out.println("ServiceText: " + ServiceText);
                System.out.println("ShortText: " + ShortText);

                if (ServiceId != null && ServiceId.equals("")) {
                    servicesLongTextsEntity.setServiceText(ServiceText);
                    servicesLongTextsEntity.setShortText(ShortText);
                    ServiceId = purchaseOrderWS.saveServicesLongTexts(servicesLongTextsEntity);
                } else if (ServiceId != null && !ServiceId.equals("")) {
                    ServicesLongTexts sltObj = purchaseOrderWS.getServicesLongTextsById(Integer.parseInt(ServiceId));
                    sltObj.setServiceText(ServiceText);
                    sltObj.setShortText(ShortText);
                    purchaseOrderWS.updateServicesLongTexts(sltObj);
                }
                System.out.println("ServiceId 2: " + ServiceId);

                jObj.put("Result", "Success");
                jObj.put("ServiceId", ServiceId);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        }
    }
}
