/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import static com.eportal.controller.ContractManagement.strCurDate1;
import com.eportal.entities.AccountAssignment;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerSecurityQueAns;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.BuyerVendorNotification;
import com.eportal.entities.CMHeaderAccountAssignInfo;
import com.eportal.entities.CmplxPRToPOLineItemPRAccountAssignment;
import com.eportal.entities.CmplxPRToPOLineItemPRAccountAssignmentValues;
import com.eportal.entities.CmplxPRToPOLineItemService;
import com.eportal.entities.Component;
import com.eportal.entities.ConditionControl;
import com.eportal.entities.ConditionsLineLevel;
import com.eportal.entities.Confirmations;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.ContractRfqLineItem;
import com.eportal.entities.ContractVendorRfqHeader;
import com.eportal.entities.ContractVendorRfqLineItem;
import com.eportal.entities.CountryMaster;
import com.eportal.entities.CustomerData;
import com.eportal.entities.Delivery;
import com.eportal.entities.DeliveryAddress;
import com.eportal.entities.DeliverySchedule;
import com.eportal.entities.FinalizedContractRfq;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.FinalizedRfq;
import com.eportal.entities.HeaderText;
import com.eportal.entities.Invoice;
import com.eportal.entities.LimitAccountAssignment;
import com.eportal.entities.Limits;
import com.eportal.entities.MasterAsset;
import com.eportal.entities.MasterBillType;
import com.eportal.entities.MasterBusinessArea;
import com.eportal.entities.MasterCommitmentItem;
import com.eportal.entities.MasterCompanyCode;
import com.eportal.entities.MasterConditionValuesFormulas;
import com.eportal.entities.MasterContractType;
import com.eportal.entities.MasterCostCentre;
import com.eportal.entities.MasterCountry;
import com.eportal.entities.MasterCurrency;
import com.eportal.entities.MasterCustomerClassification;
import com.eportal.entities.MasterCustomerGroup;
import com.eportal.entities.MasterCustomerSegment;
import com.eportal.entities.MasterDistributionChannel;
import com.eportal.entities.MasterExchangeRate;
import com.eportal.entities.MasterFundFMArea;
import com.eportal.entities.MasterGLCode;
import com.eportal.entities.MasterHighLevelItem;
import com.eportal.entities.MasterIndustryCode;
import com.eportal.entities.MasterIndustryCode1;
import com.eportal.entities.MasterIndustryCode2;
import com.eportal.entities.MasterIndustryCode3;
import com.eportal.entities.MasterInternalOrder;
import com.eportal.entities.MasterItemCategory;
import com.eportal.entities.MasterMaterialGeneral;
import com.eportal.entities.MasterMaterialGroup;
import com.eportal.entities.MasterMaterialMRP;
import com.eportal.entities.MasterMaterialSrcIndicator;
import com.eportal.entities.MasterMaterialType;
import com.eportal.entities.MasterNetwork;
import com.eportal.entities.MasterPlant;
import com.eportal.entities.MasterPricingDescription;
import com.eportal.entities.MasterPricingProcedures;
import com.eportal.entities.MasterProductHierarchy1;
import com.eportal.entities.MasterProductHierarchy2;
import com.eportal.entities.MasterProductHierarchy3;
import com.eportal.entities.MasterProfitCenter;
import com.eportal.entities.MasterProjectIndicator;
import com.eportal.entities.MasterPurchaseOrg;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.MasterQAControl;
import com.eportal.entities.MasterReferenceItem;
import com.eportal.entities.MasterSONumber;
import com.eportal.entities.MasterSalesDocType;
import com.eportal.entities.MasterSalesOffice;
import com.eportal.entities.MasterSalesOrganisation;
import com.eportal.entities.MasterServiceMaster;
import com.eportal.entities.MasterShippingInstruction;
import com.eportal.entities.MasterShippingInstructions;
import com.eportal.entities.MasterStockType;
import com.eportal.entities.MasterTNCCMapping;
import com.eportal.entities.MasterTaxCode;
import com.eportal.entities.MasterValuationType;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.MasterWBSElement;
import com.eportal.entities.MaterialTab;
import com.eportal.entities.NGBPCmplxPOCreationCommunication;
import com.eportal.entities.NGBPCmplxPOCreationConditionControl;
import com.eportal.entities.NGBPCmplxPOCreationConfirmations;
import com.eportal.entities.NGBPCmplxPOCreationCustormerData;
import com.eportal.entities.NGBPCmplxPOCreationDelivery;
import com.eportal.entities.NGBPCmplxPOCreationDeliveryAddress;
import com.eportal.entities.NGBPCmplxPOCreationDeliveryInvoice;
import com.eportal.entities.NGBPCmplxPOCreationDelverySchedule;
import com.eportal.entities.NGBPCmplxPOCreationHeaderText;
import com.eportal.entities.NGBPCmplxPOCreationInvoice;
import com.eportal.entities.NGBPCmplxPOCreationLimits;
import com.eportal.entities.NGBPCmplxPOCreationLimitsAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemComponent;
import com.eportal.entities.NGBPCmplxPOCreationLineItemConditions;
import com.eportal.entities.NGBPCmplxPOCreationLineItemCustomerData;
import com.eportal.entities.NGBPCmplxPOCreationLineItemMaterialTab;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPO;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
import com.eportal.entities.NGBPCmplxPOCreationLineItemProfitabilitySegment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemService;
import com.eportal.entities.CMHeaderServicesInfo;
import com.eportal.entities.ContractAttachmentTemp;
import com.eportal.entities.ContractReportBean;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.ContractVendorRfqHeader;
import com.eportal.entities.ContractVendorRfqLineItem;
import com.eportal.entities.FinalizedContractRfq;
import com.eportal.entities.NGBPCmplxPOCreationQuantitiesWeights;
import com.eportal.entities.NGBPCmplxPOCreationStatus;
import com.eportal.entities.NGBPCmplxPOCreationTexts;
import com.eportal.entities.NGBPCmplxPOCreationVendorAddress;
import com.eportal.entities.NGBPExtPOCreation;
import com.eportal.entities.NGCPCustomerSeeded;
import com.eportal.entities.NG_BP_Default_RatedParameters;
import com.eportal.entities.NewgenContractLineItem;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.OpenRfqReportBean;
import com.eportal.entities.PaymentTermsMaster;
import com.eportal.entities.ProfitabilitySegment;
import com.eportal.entities.PurchaseRequestStatusReportBean;
import com.eportal.entities.QuantityDates;
import com.eportal.entities.QueryUser;
import com.eportal.entities.QueryWIInput;
import com.eportal.entities.RatedParameters;
import com.eportal.entities.RejectWIInput;
import com.eportal.entities.RejectWIOutPut;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.RfqHeaderVendorMapping;
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
import com.eportal.entities.WorkOrderAttachmentTemp;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.util.MailTrigger;
import com.eportal.util.SavePoLineLevelTab;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import com.eportal.webservice.util.StandalonePoWS;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.URI;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Random;
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
public class AjaxController {

    @Autowired
    NGBPExtPOCreation bPExtPOCreation;
    @Autowired
    VendorGroup vendorGroup;
    @Autowired
    VendorGroupMapping vendorGroupMapping;
    @Autowired
    BuyerSecurityQueAns buyerSecurityQueAns;
    @Autowired
    WorkOrderRfqLineItem workOrderRfqLineItem;
    @Autowired
    WorkOrderRfqHeader workOrderRfqHeader;
    @Autowired
    CountryMaster countryMaster;
    @Autowired
    NewgenContractLineItem newgenContractLineItem;
    @Autowired
    LimitAccountAssignment limitAccountAssignment;
    @Autowired
    DeliverySchedule deliverySchedule;
    @Autowired
    Text text;
    @Autowired
    Confirmations confirmations;
    @Autowired
    HeaderText headerText;
    @Autowired
    Component component;
    @Autowired
    Limits limits;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignment nGBPCmplxPOCreationLineItemPOAccountAssignment;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues nGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
    @Autowired
    NGBPCmplxPOCreationLimitsAccountAssignment nGBPCmplxPOCreationLimitsAccountAssignment;
    @Autowired
    SavePoLineLevelTab savePoLineLevelTab;

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    @Value("${rfq_pending}")
    private String rfq_pending;

    @Autowired
    RejectWIInput rejectWiInput;
    @Autowired
    RatedParameters ratedParam;
    @Autowired
    QueryWIInput queryWiInput;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;
    @Autowired
    FinalizedRfq finalizedRfq;
    @Autowired
    FinalizedContractRfq finalizedcontractRfq;
    @Autowired
    ConditionsLineLevel conditionsLineLevel;
    @Autowired
    ProfitabilitySegment profitabilitySegment;
    @Autowired
    ServiceAccountAssignment serviceAccountAssignment;
    @Autowired
    Services services;
    @Autowired
    Delivery delivery;
    @Autowired
    Invoice invoice;
    @Autowired
    AccountAssignment accountAssignment;
    @Autowired
    DeliveryAddress deliveryAddress;
    @Autowired
    ConditionControl conditionControl;
    @Autowired
    CustomerData customerData;
    @Autowired
    QuantityDates quantityDates;
    @Autowired
    NGBPCmplxPOCreationLineItemProfitabilitySegment nGBPCmplxPOCreationLineItemProfitabilitySegment;
    @Autowired
    RfqRfpWS rfqRfpWsUtil;
    @Autowired
    PurchaseOrderWS purchaseOrderWSUtil;
    @Autowired
    EmailTriggerDetails emailTriggerDetails;
    @Autowired
    MailTrigger mailTriggerUtil;
    @Autowired
    StandalonePoWS standalonePoWS;
    @Autowired
    SavePoLineLevelTab savePoLineLevelTabUtil; 

    @RequestMapping(value = "/savestandalonelineitemdata", method = RequestMethod.POST)
    public void saveStandAloneLineItem(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        System.out.println("========Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in saveStandAloneLineItem : " + reqFrom);
        try {
            if (reqFrom.equalsIgnoreCase("savePRLineSub")) {
//Shashank
                out = response.getWriter();
                String idext = "";
//                String poId = request.getParameter("poId");
                System.out.println("ID IN Service ::: " + idext);
                idext = savePRLineSub(request, response);
                String linkIdArray = request.getParameter("linkIdArray");
                System.out.println("linkIdArray :" + linkIdArray);

                List<NGBPCmplxPOCreationLineItemConditions> conList = standalonePoWS.getNGBPCmplxPOCreationLineItemConditionsByLinkIds(linkIdArray);
                System.out.println("conList Size :" + conList.size());
                JSONArray jsonCondArr = new JSONArray(conList);
//                out.println(jsonCondArr);
                jObj.put("idext", idext);
                jObj.put("jsonCondArr", jsonCondArr);
                out.println(jObj);

            } else if (reqFrom.equalsIgnoreCase("saveHeaderData")) {
//Shashank
                out = response.getWriter();
//                String idext = "";
                String idext = savePO(request, response);

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

    @RequestMapping(value = "/doajaxrequest", method = RequestMethod.GET)
    public void doService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        System.out.println("========Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);
        try {
            if (reqFrom.equalsIgnoreCase("AdminRfpStatusChart")) {
                System.out.println("AdminRfpStatusChart");
                out = response.getWriter();
                List list = findAdminRfpStatusCountByRfpStatus();
                System.out.println("List: " + list);
                System.out.println("List len: " + list.size());
                for (Object obj : list) {
                    JSONArray jsonArr = new JSONArray();
                    List subList = (List) obj;
                    jsonArr.put(subList.get(1));
                    jsonArr.put(subList.get(0));
                    jArra.put(jsonArr);
                }
                System.out.println("jArr len: " + jArra.length());
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("FindPOInvoiceDataByInsertionOrderIdOfPR")) {
                System.out.println("FindPOInvoiceDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Invoice> invoiceList = getInvoiceByInsertionId(InsertionOrderId);

                JSONArray jsonInvoiceArr = new JSONArray(invoiceList);
                out.println(jsonInvoiceArr);
            } else if (reqFrom.equalsIgnoreCase("getConditionValuesFormulas")) {
                out = response.getWriter();

                System.out.println("getConditionValuesFormulas");
                List<MasterConditionValuesFormulas> formulaList = getConditionValuesFormulas();
                System.out.println("formulaList size :" + formulaList.size());
//                System.out.println("Bittu  in getConditionValuesFormulas :");
                if (!formulaList.isEmpty()) {
                    for (int i = 0; i < formulaList.size(); i++) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Alias :" + formulaList.get(i).getAlias());
                        MasterConditionValuesFormulas formulaObj = formulaList.get(i);
                        Obj.put("ALIAS", formulaObj.getAlias());
                        Obj.put("RULES", formulaObj.getRulesToDeriveConditionVale());
                        Obj.put("NAME", formulaObj.getName());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getMasterMaterialGeneral")) {
                out = response.getWriter();
                System.out.println("Bittu getMasterMaterialGeneral");
                String materialcode = request.getParameter("matCode");
                System.out.println("materialcode :" + materialcode);
                List<MasterMaterialGeneral> materialList = getMasterMaterialGeneral(materialcode);
                System.out.println("materialList :" + materialList.size());
                JSONObject Obj = new JSONObject();
                if (!materialList.isEmpty()) {
                    MasterMaterialGeneral materialObj = materialList.get(0);
                    System.out.println("Storage Location :" + materialList.get(0).getStorageLocation());
                    Obj.put("STORAGE_LOCATION", materialObj.getStorageLocation());
                    Obj.put("DESCRIPTION", materialObj.getShortText());
                    Obj.put("UNIT", materialObj.getOrderUnit());
                }
                out.println(Obj);
            } else if (reqFrom.equalsIgnoreCase("getLastExtId")) {
                out = response.getWriter();
                System.out.println("Bittu getLastExtId");
                List<Integer> extId = getLastExtId();
                System.out.println("Last Ext ID :" + extId);
                JSONObject Obj = new JSONObject();
                if (!extId.isEmpty()) {
                    System.out.println("isEmpty in If :" + extId.isEmpty());
                    System.out.println("extId in if :" + extId.get(0));
                    if (extId.get(0) == null) {
                        Obj.put("LASTEXTID", "0");
                    } else {
                        Obj.put("LASTEXTID", extId);
                    }
                }
                out.println(Obj);
            } else if (reqFrom.equalsIgnoreCase("getAllMasterPlant")) {
                out = response.getWriter();
                System.out.println("Bittu getAllMasterPlant");
                List<MasterPlant> plantList = getAllMasterPlant();
                System.out.println("plantList1 :" + plantList.size());
                if (!plantList.isEmpty()) {
                    for (MasterPlant plantObj : plantList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("PLANT", plantObj.getPlantCode());
                        Obj.put("DESCRIPTION", plantObj.getName());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveComponentTblData")) {
                out = response.getWriter();
                System.out.println("saveComponentTblData");
                String componentRowString = request.getParameter("componentRowString");
                System.out.println("componentRowString :" + componentRowString);
                String[] componentRowArr = componentRowString.split("#");
                System.out.println("componentRowArr length :" + componentRowArr.length);

                String[] componentVal = null;
                for (String componentTblRow : componentRowArr) {
                    System.out.println("componentTblRow values :" + componentTblRow);
                    componentVal = componentTblRow.split("<>");
                }
                List<Component> componentList = getComponentByLineItemNumber(componentVal[8]);
                if (!componentList.isEmpty()) {
                    deleteAllComponent(componentList);
                }
                SimpleDateFormat ngFormatter = new SimpleDateFormat("yyyy-MM-dd");
                for (String componentRow : componentRowArr) {
                    System.out.println("componentRow values :" + componentRow);
                    String[] componentTblVal = componentRow.split("<>");
                    if (!"".equals(componentTblVal[7])) {
                        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                        try {
                            Date dateCat = formatter.parse(componentTblVal[7]);
                            System.out.println("dateCat :" + dateCat);
                            System.out.println(formatter.format(dateCat));
                            component.setRequirementDate(dateCat);
                            component.setReqDateAsString(ngFormatter.format(dateCat));
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                    } else {
                        component.setRequirementDate(null);
                    }
                    System.out.println("LineItemNumber :" + componentTblVal[8]);
                    if (!"".equals(componentTblVal[0])) {
                        component.setMaterialCode(componentTblVal[0]);
                    } else {
                        component.setMaterialCode("");
                    }
                    if (!"".equals(componentTblVal[1])) {
                        component.setDescription(componentTblVal[1]);
                    } else {
                        component.setDescription("");
                    }
                    if (!"".equals(componentTblVal[2])) {
                        component.setPlant(componentTblVal[2]);
                    } else {
                        component.setPlant("");
                    }
                    if (!"".equals(componentTblVal[3])) {
                        component.setUnit(componentTblVal[3]);
                    } else {
                        component.setUnit("");
                    }
                    if (!"".equals(componentTblVal[4])) {
                        component.setQuantity(new BigDecimal(componentTblVal[4]));
                    } else {
                        component.setQuantity(new BigDecimal(0.0));
                    }
                    if (!"".equals(componentTblVal[5])) {
                        component.setProductStorageLocation(componentTblVal[5]);
                    } else {
                        component.setProductStorageLocation("");
                    }
                    if (!"".equals(componentTblVal[6])) {
                        component.setSupplyArea(componentTblVal[6]);
                    } else {
                        component.setSupplyArea("");
                    }
                    if (!"".equals(componentTblVal[8])) {
                        component.setLineItemnumber(componentTblVal[8]);
                    } else {
                        component.setLineItemnumber("");
                    }
                    if (!"".equals(componentTblVal[9])) {
                        component.setPrItemNumber(componentTblVal[9]);
                    } else {
                        component.setPrItemNumber("");
                    }
                    if (!"".equals(componentTblVal[10])) {
                        component.setLinkId(componentTblVal[10]);
                    } else {
                        component.setLinkId("");
                    }
                    if (!"".equals(componentTblVal[11]) && !"NA".equals(componentTblVal[11])) {
                        component.setQtyIsFixed(componentTblVal[11]);
                    } else {
                        component.setQtyIsFixed("");
                    }
                    if (!"".equals(componentTblVal[12]) && !"NA".equals(componentTblVal[12])) {
                        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                        try {
                            Date tempDate = formatter.parse(componentTblVal[12]);
                            System.out.println("tempDate :" + tempDate);
                            System.out.println(formatter.format(tempDate));
                            component.setLatestRequirementDate(tempDate);
                            component.setLatestReqDateAsString(ngFormatter.format(tempDate));
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                    } else {
                        component.setLatestRequirementDate(null);
                    }
                    if (!"".equals(componentTblVal[13]) && !"NA".equals(componentTblVal[13])) {
                        component.setDistributionKey(componentTblVal[13]);
                    } else {
                        component.setDistributionKey("");
                    }
                    if (!"".equals(componentTblVal[14]) && !"NA".equals(componentTblVal[14])) {
                        component.setBatch(componentTblVal[14]);
                    } else {
                        component.setBatch("");
                    }
                    if (!"".equals(componentTblVal[15]) && !"NA".equals(componentTblVal[15])) {
                        component.setChangeId(componentTblVal[15]);
                    } else {
                        component.setChangeId("");
                    }
                    String msg = saveComponent(component);
                    System.out.println("msg :" + msg);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getMasterConditionLineLevelByLineItemNumber")) {
                out = response.getWriter();
                System.out.println("Bittu getMasterConditionLineLevelByLineItemNumber");

                String lineItemNumber = request.getParameter("itemCode");
                System.out.println("lineItemNumber :" + lineItemNumber);
                List<ConditionsLineLevel> conditionList = getMasterConditionLineLevelByLineItemNumber(lineItemNumber);
                System.out.println("conditionList :" + conditionList.size());
                if (!conditionList.isEmpty()) {
                    for (ConditionsLineLevel conditionObj : conditionList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("CONDITION_TYPE", conditionObj.getConditionType() == null ? "" : conditionObj.getConditionType());
                        Obj.put("NAME", conditionObj.getName() == null ? "" : conditionObj.getName());
                        Obj.put("AMOUNT", conditionObj.getAmount() == null ? "" : conditionObj.getAmount());
                        Obj.put("PER", conditionObj.getPer() == null ? "" : conditionObj.getPer());
                        Obj.put("CONDITION_PRICING_UNIT", conditionObj.getConditionPricingUnit() == null ? "" : conditionObj.getConditionPricingUnit());
                        Obj.put("CURRENCY1", conditionObj.getCurrency1() == null ? "" : conditionObj.getCurrency1());
                        Obj.put("CURRENCY2", conditionObj.getCurrency2() == null ? "" : conditionObj.getCurrency2());
                        Obj.put("UOM", conditionObj.getUom() == null ? "" : conditionObj.getUom());
                        Obj.put("CONDITION_VALUE1", conditionObj.getConditionValue1() == null ? "" : conditionObj.getConditionValue1());
                        Obj.put("CONDITION_VALUE2", conditionObj.getConditionValue2() == null ? "" : conditionObj.getConditionValue2());
                        Obj.put("CONDITION_CURRENCY", conditionObj.getConditionCurrency() == null ? "" : conditionObj.getConditionCurrency());
                        Obj.put("CONDITION_DETAILS", conditionObj.getConditionDetails() == null ? "" : conditionObj.getConditionDetails());

                        Obj.put("KAPPL", conditionObj.getKappl() == null ? "" : conditionObj.getKappl());
                        Obj.put("KVSL1", conditionObj.getKvsl1() == null ? "" : conditionObj.getKvsl1());
                        Obj.put("KVSL2", conditionObj.getKvsl2() == null ? "" : conditionObj.getKvsl2());
                        Obj.put("ZAEHK", conditionObj.getConditionCount() == null ? "" : conditionObj.getConditionCount());
                        Obj.put("STUNR", conditionObj.getStNumber() == null ? "" : conditionObj.getStNumber());
                        Obj.put("CHANGEID", conditionObj.getChangeId() == null ? "" : conditionObj.getChangeId());
//                        Obj.put("CONDITION_DETAILS", conditionObj.getConditionDetails() == null ? "" : conditionObj.getConditionDetails());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllCustomerSeeded")) {
                out = response.getWriter();
                System.out.println("Bittu getAllCustomerSeeded");
                List<NGCPCustomerSeeded> seededList = getAllCustomerSeeded();
                System.out.println("seededList :" + seededList.size());
                if (!seededList.isEmpty()) {
                    for (NGCPCustomerSeeded seededObj : seededList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Customer Code:" + seededObj.getCustomercode());
                        Obj.put("CUSTOMER_CODE", seededObj.getCustomercode() == null ? "" : seededObj.getCustomercode());
                        Obj.put("FIRST_NAME", seededObj.getFirstname() == null ? "" : seededObj.getFirstname());
                        Obj.put("LAST_NAME", seededObj.getLastname() == null ? "" : seededObj.getLastname());
                        Obj.put("EMAILID", seededObj.getEmailid() == null ? "" : seededObj.getEmailid());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("FindInvoiceByInsertionOrderIdOfPR")) {
                System.out.println("FindInvoiceByInsertionOrderIdOfPR");
                out = response.getWriter();

                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Invoice> invoiceList = getInvoiceByInsertionId(InsertionOrderId);
                JSONObject jsonInvoiceObj = null;
                if (!invoiceList.isEmpty()) {
                    Invoice invoice = invoiceList.get(0);
                    System.out.println("invoice: " + invoice);
                    jsonInvoiceObj = new JSONObject(invoice);
                }
                out.println(jsonInvoiceObj);
            } else if (reqFrom.equalsIgnoreCase("FindInvoiceByLinkid")) {
                System.out.println("FindInvoiceByLinkid");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid in FindInvoiceByLinkid: " + linkid);
                List<NGBPCmplxPOCreationInvoice> invoiceList = getInvoiceByLinkId(linkid);
                JSONObject jsonInvoiceObj = null;
                if (!invoiceList.isEmpty()) {
                    NGBPCmplxPOCreationInvoice invoice = invoiceList.get(0);
                    System.out.println("invoice in FindInvoiceByLinkid : " + invoice);
                    jsonInvoiceObj = new JSONObject(invoice);
                }
                out.println(jsonInvoiceObj);
            } else if (reqFrom.equalsIgnoreCase("FindLineItemConditionByInsertionOrderIdOfPR")) {
                System.out.println("FindLineItemConditionByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<ConditionsLineLevel> conditionList = getMasterConditionLineLevelByLineItemNumber(InsertionOrderId);
                JSONArray jsonConditionArr = new JSONArray(conditionList);
                out.println(jsonConditionArr);
            } else if (reqFrom.equalsIgnoreCase("getAllMasterMaterialGeneral")) {
                out = response.getWriter();
                System.out.println("Bittu getAllMasterMaterialGeneral");
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterMaterialGeneral> materialList = purchaseOrderWSUtil.findMaterialByCompanyCode(companyCode);
                System.out.println("materialList :" + materialList.size());
                if (!materialList.isEmpty()) {
                    for (MasterMaterialGeneral materialObj : materialList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("MATERIALCODE", materialObj.getMaterialCode());
                        Obj.put("STORAGE_LOCATION", materialObj.getStorageLocation());
                        Obj.put("DESCRIPTION", materialObj.getShortText());
                        Obj.put("UNIT", materialObj.getOrderUnit());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getLimitAccountAssignmentByServiceLineItemNumberAndLineItemNumber")) {
                out = response.getWriter();
                System.out.println("getLimitAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
//                String serviceLineItemNumber = request.getParameter("serviceLineItemNumber");
                String lineItemNumber = request.getParameter("lineItemNumber");
//                System.out.println("serviceLineItemNumber: " + serviceLineItemNumber);
                System.out.println("lineItemNumber: " + lineItemNumber);

//                List<LimitAccountAssignment> accAsgnList = getLimitAccountAssignmentByLineItemNumberAndServiceLineItemNumber(lineItemNumber, serviceLineItemNumber);
                List<LimitAccountAssignment> accAsgnList = getLimitAccountAssignmentByLineItemNumber(lineItemNumber);

                if (!accAsgnList.isEmpty()) {
                    System.out.println("Cost Center in getLimitAccountAssignmentByServiceLineItemNumberAndLineItemNumber :" + accAsgnList.get(0).getCostCenter());
                }
                System.out.println("accAsgnList Size :" + accAsgnList.size());
                if (!accAsgnList.isEmpty()) {
                    for (LimitAccountAssignment accAsgnObj : accAsgnList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("PERCENTAGE", accAsgnObj.getPercentage());
                        Obj.put("GLACCOUNT", accAsgnObj.getGLAccount());
                        Obj.put("COAREA", accAsgnObj.getCOArea());
                        Obj.put("COSTCENTER", accAsgnObj.getCostCenter());
                        Obj.put("FUND", accAsgnObj.getFund());
                        Obj.put("FUNCTIONALAREA", accAsgnObj.getFunctionalArea());
                        Obj.put("FUNDCENTER", accAsgnObj.getFundCenter());
                        Obj.put("COMMITMENTITEM", accAsgnObj.getCommitmentItem());
                        Obj.put("ORDER", accAsgnObj.getLimitAccAsgnTblOrder());
                        Obj.put("ASSET", accAsgnObj.getAsset());
                        Obj.put("WBSELEMENT", accAsgnObj.getWBSElement());
                        Obj.put("SALESORDER", accAsgnObj.getSalesOrder());
                        Obj.put("NETWORK", accAsgnObj.getNetActNumber());
                        Obj.put("ITEMNUMBER", accAsgnObj.getItemNumber());
                        Obj.put("DELIVERYSCHEDULE", accAsgnObj.getDeliverySchedule());
                        Obj.put("DISTRIBUTION", accAsgnObj.getDistribution());
//                        Obj.put("DISTRIBUTION", accAsgnObj.getDeliverySchedule();
//                        Obj.put("NETVALUE", accAsgnObj.getNetValaue());
//                        Obj.put("LINKNUMBER", accAsgnObj.getLinkNumber());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId")) {
                System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid: " + linkid);
                List<CmplxPRToPOLineItemPRAccountAssignmentValues> valuesList = getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId(linkid);
                JSONArray jsonValuesArr = new JSONArray(valuesList);
                out.println(jsonValuesArr);
            } else if (reqFrom.equalsIgnoreCase("getAllCurrency")) {
                System.out.println("getAllCurrency");
                out = response.getWriter();
//                List<MasterCurrency> currencyList = getAllCurrency();

//                if (!currencyList.isEmpty()) {
//                    for (MasterCurrency currencyObj : currencyList) {
//                        JSONObject Obj = new JSONObject();
//                        Obj.put("CURRENCY_CODE", currencyObj.getCurrencyCode());
//                        Obj.put("DESCRIPTION", currencyObj.getCurrencyDesc());
//                        jArra.put(Obj);
//                    }
//                }
                List<Object[]> currencyList = (List<Object[]>) purchaseOrderWSUtil.getCurrencyByToCurrencyAndExchangeRateTypeWithNoLock();
                System.out.println("currencyList size in managestandalonepo:" + currencyList.size());
                for (int i = 0; i < currencyList.size(); i++) {
                    Object[] o = (Object[]) currencyList.get(i);
                    JSONObject jsonObj = new JSONObject();
                    jsonObj.put("CURRENCY_CODE", o[0]);
                    jsonObj.put("DESCRIPTION", o[1]);
                    jArra.put(jsonObj);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllCostCenter")) {
                System.out.println("getAllCostCenter");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                String trackingNumber = request.getParameter("trackingNumber");
                System.out.println("companyCode: " + companyCode);
                System.out.println("trackingNumber: " + trackingNumber);
                List<MasterCostCentre> costCenterList = purchaseOrderWSUtil.findCostCenterByCoCode(companyCode, trackingNumber);
                System.out.println("costCenterList size :::" + costCenterList.size());
                if (!costCenterList.isEmpty()) {
                    for (MasterCostCentre costCenterObj : costCenterList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("COST_CENTER", costCenterObj.getCostCentre());
                        Obj.put("DESCRIPTION", costCenterObj.getDescription());
                        Obj.put("COAREA", costCenterObj.getControllingArea());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllContCostCenter")) {
                System.out.println("getAllContCostCenter");
                out = response.getWriter();
                // String companyCode = request.getParameter("companyCode");
                // String trackingNumber = request.getParameter("trackingNumber");
                // System.out.println("companyCode: " + companyCode);
                // System.out.println("trackingNumber: " + trackingNumber);
//                List<MasterCostCentre> costCenterList = purchaseOrderWSUtil.findCostCenterByCoCode(companyCode, trackingNumber);
                List<MasterTNCCMapping> costCenterList = findCostCenter();
                if (!costCenterList.isEmpty()) {
                    for (MasterTNCCMapping costCenterObj : costCenterList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("COST_CENTER", costCenterObj.getCostCenter());
                        Obj.put("DESCRIPTION", costCenterObj.getCostCenterDesc());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllItemCategory")) {
                System.out.println("getAllItemCategory");
                out = response.getWriter();
                List<MasterItemCategory> itemCategList = getAllItemCategory();
                if (!itemCategList.isEmpty()) {
                    for (MasterItemCategory itemObj : itemCategList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Item Category :" + itemObj.getItemCategoryCode());
                        Obj.put("ITEMM_CATEGORY", itemObj.getItemCategoryCode());
                        Obj.put("DESCRIPTION", itemObj.getItemCategoryDesc());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllInterOrder")) {
                System.out.println("getAllInterOrder");
                out = response.getWriter();
                
                String accAsgn = request.getParameter("accAsgn");
                String recordCount = request.getParameter("recordCount");
                String internalOrderOrDescSearchText = request.getParameter("internalOrderOrDescSearchText");
                String lastIOSno = request.getParameter("lastIOSno");
                
                System.out.println("accAsgn: " + accAsgn);
                System.out.println("recordCount: " + recordCount);
                System.out.println("materialCodeOrShortText: " + internalOrderOrDescSearchText);
                System.out.println("lastMatSno: " + lastIOSno);
                
                List<MasterInternalOrder> orderList = purchaseOrderWSUtil
                                                        .getInternalOrderByPagination(
                                                                accAsgn, 
                                                                recordCount, 
                                                                internalOrderOrDescSearchText, 
                                                                lastIOSno);
                System.out.println("orderList size: " + orderList.size());
                
                JSONArray ioJsonArr = new JSONArray(orderList);
                System.out.println("ioJsonArr size: " + ioJsonArr.length());
                
                out.println(ioJsonArr);
            } else if (reqFrom.equalsIgnoreCase("getAllGLCode")) {
                System.out.println("getAllGLCode");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterGLCode> glCodeList = purchaseOrderWSUtil.findGLCodeByCoCode(companyCode);
                System.out.println("glCodeList size: " + glCodeList.size());
                if (!glCodeList.isEmpty()) {
                    for (MasterGLCode codeObj : glCodeList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("CODE", codeObj.getGlCode());
                        Obj.put("DESCRIPTION", codeObj.getGLDescription());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllCommitmentItem")) {
                System.out.println("getAllCommitmentItem");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterCommitmentItem> commItemList = purchaseOrderWSUtil.findCommitmentItemByCoCode(companyCode);
                System.out.println("commItemList size: " + commItemList.size());
                if (!commItemList.isEmpty()) {
                    for (MasterCommitmentItem itemObj : commItemList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Commitment Item :" + itemObj.getCommitItem());
                        Obj.put("ITEM", itemObj.getCommitItem());
                        Obj.put("NAME", itemObj.getName());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllMasterWBSElement")) {
                System.out.println("getAllMasterWBSElement");
                out = response.getWriter();
                List<MasterWBSElement> WBSList = getAllMasterWBSElement();
                if (!WBSList.isEmpty()) {
                    for (MasterWBSElement elementObj : WBSList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("WBS Element :" + elementObj.getWBSCode());
                        Obj.put("CODE", elementObj.getWBSCode());
                        Obj.put("DESCRIPTION", elementObj.getWBSDesc());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllMasterNetwork")) {
                System.out.println("getAllMasterNetwork");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterNetwork> NetworkList = purchaseOrderWSUtil.findMasterNetworkByCoCode(companyCode);
                System.out.println("NetworkList size: " + NetworkList.size());
                if (!NetworkList.isEmpty()) {
                    for (MasterNetwork networkObj : NetworkList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Network :" + networkObj.getNetworkNumber());
                        Obj.put("NETWORK", networkObj.getNetworkNumber());
                        Obj.put("DESCRIPTION", networkObj.getDescription());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllMasterAsset")) {
                System.out.println("getAllMasterAsset");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterAsset> AssetList = purchaseOrderWSUtil.findMasterAssetByCoCode(companyCode);
                System.out.println("AssetList size: " + AssetList.size());
                if (!AssetList.isEmpty()) {
                    for (MasterAsset assetObj : AssetList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Asset :" + assetObj.getAsset());
                        Obj.put("ASSET", assetObj.getAsset());
                        Obj.put("DESCRIPTION", assetObj.getAssetDesc());
                        Obj.put("GlCode", assetObj.getGlCode());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllServiceMaster")) {
                System.out.println("getAllServiceMaster");
                out = response.getWriter();
                List<MasterServiceMaster> ServiceList = getAllServiceMaster();
                if (!ServiceList.isEmpty()) {
                    for (MasterServiceMaster serviceObj : ServiceList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Asset :" + serviceObj.getActivityNumber());
                        Obj.put("ACTIVITY_NUMBER", serviceObj.getActivityNumber());
                        Obj.put("CATEGORY", serviceObj.getServiceCategory());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getServiceMasterByMaterialGroup")) {
                System.out.println("getServiceMasterByMaterialGroup");
                out = response.getWriter();
                String materialGroup = request.getParameter("materialGroup");
                System.out.println("materialGroup in getServiceMasterByMaterialGroup :" + materialGroup);
                List<MasterServiceMaster> ServiceList = getServiceMasterByMaterialGroup(materialGroup);
                if (!ServiceList.isEmpty()) {
                    for (MasterServiceMaster serviceObj : ServiceList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("ACTIVITY_NUMBER", serviceObj.getActivityNumber());
                        Obj.put("CATEGORY", serviceObj.getServiceCategory());
                        Obj.put("UOM", serviceObj.getUnitOfMeasure());
                        Obj.put("ShortText", serviceObj.getShortText());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getStockType")) {
                System.out.println("getStockType");
                out = response.getWriter();
                List<MasterStockType> stockList = getAllStockType();
                System.out.println("stockList Size :" + stockList.size());
                JSONArray jsonStockTypeArr = new JSONArray(stockList);
                out.println(jsonStockTypeArr);
            } else if (reqFrom.equalsIgnoreCase("getAllShippingInstruction")) {
                System.out.println("getAllShippingInstruction");
                out = response.getWriter();
                List<MasterShippingInstructions> instructionList = getAllShippingInstructions();
                System.out.println("instructionList Size :" + instructionList.size());
                JSONArray jsonShipInstArr = new JSONArray(instructionList);
                out.println(jsonShipInstArr);
            } else if (reqFrom.equalsIgnoreCase("findAllMasterPurchaseGroup")) {
                System.out.println("findAllMasterPurchaseGroup");
                out = response.getWriter();
                List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
                System.out.println("masterPurchasingGroupList Size :" + masterPurchasingGroupList.size());
                if (!masterPurchasingGroupList.isEmpty()) {
                    for (MasterPurchasingGroup groupObj : masterPurchasingGroupList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Purchasing Group :" + groupObj.getPurchasingGroupCode());
                        Obj.put("PURCHASING_GROUP", groupObj.getPurchasingGroupCode());
                        Obj.put("PURCHASING_GROUP_DESC", groupObj.getPurchasingGroupDesc());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllPaymentTerms")) {
                System.out.println("getAllPaymentTerms");
                out = response.getWriter();
                List<PaymentTermsMaster> paymentList = getAllPaymentTerms();
                System.out.println("paymentList Size :" + paymentList.size());
                if (!paymentList.isEmpty()) {
                    for (PaymentTermsMaster paymentObj : paymentList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Payment Terms :" + paymentObj.getPaymentTerms());
                        Obj.put("PAYMENT_TERMS", paymentObj.getPaymentTerms());
                        Obj.put("DESCRIPTION", paymentObj.getDescription());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("findAllMasterCompanyCode")) {
                System.out.println("findAllMasterCompanyCode");
                out = response.getWriter();
                List<MasterCompanyCode> companyCodeList = findAllMasterCompanyCode();
                System.out.println("companyCodeList Size :" + companyCodeList.size());
                if (!companyCodeList.isEmpty()) {
                    for (MasterCompanyCode companyCodeObj : companyCodeList) {
                        JSONObject Obj = new JSONObject();
                        System.out.println("Company Code :" + companyCodeObj.getCompanyCode());
                        Obj.put("COMPANY_CODE", companyCodeObj.getCompanyCode());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllVendorMaster")) {
                System.out.println("getAllVendorMaster");
                out = response.getWriter();
                List<MasterVendor> vendorList = getAllVendorMaster();
                System.out.println("vendorList Size :" + vendorList.size());
                if (!vendorList.isEmpty()) {
                    for (MasterVendor vendorObj : vendorList) {
                        JSONObject Obj = new JSONObject();
                        System.out.println("Vendor :" + vendorObj.getVendorName() + "-" + vendorObj.getVendorCode());
                        Obj.put("VENDOR", vendorObj.getVendorName() + "-" + vendorObj.getVendorCode());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getExchangeRate")) {
                System.out.println("getExchangeRate");
                out = response.getWriter();
                String toCurrency = request.getParameter("toCurrency");
                String fromCurrency = request.getParameter("fromCurrency");
                System.out.println("toCurrency :" + toCurrency);
                System.out.println("fromCurrency :" + fromCurrency);

                if (fromCurrency != null && toCurrency != null && fromCurrency.equals(toCurrency)) {
                    JSONObject jsonObj = new JSONObject();
                    jsonObj.put("EXCHANGE_RATE", "1.0000");
                    out.println(jsonObj);
                } else if (fromCurrency != null && toCurrency != null) {
//                    List<MasterExchangeRate> rateList = findExchangeRateByFromCurrencyAndToCurrency(fromCurrency, toCurrency);
                    String ExchangeRate = purchaseOrderWSUtil.findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType(fromCurrency, toCurrency);
                    System.out.println("MasterExchangeRate List Size: " + ExchangeRate);
                    if (ExchangeRate.isEmpty()) {
                        jObj.put("Result", "NotFound");
                    } else {
//                    MasterExchangeRate obj = list.get(0);
                        jObj.put("Result", "Found");
                        jObj.put("ExchangeRate", ExchangeRate);
                    }
                    out.println(jObj);
                }
            } else if (reqFrom.equalsIgnoreCase("getPricingProcedureByConditionType")) {
                System.out.println("getPricingProcedureByConditionType");
                out = response.getWriter();
                String Ctype = request.getParameter("Ctype");
                String kalsm = request.getParameter("kalsm");
                System.out.println("Ctype :" + Ctype);
                System.out.println("kalsm :" + kalsm);
                List<MasterPricingProcedures> procedureList = getPricingProcedureByConditionType(Ctype, kalsm);
                System.out.println("procedureList Size :" + procedureList.size());
                if (!procedureList.isEmpty()) {
                    for (MasterPricingProcedures procedureObj : procedureList) {
                        JSONObject Obj = new JSONObject();
                        System.out.println("getKappl :" + procedureObj.getKappl());
                        Obj.put("KAPPL", procedureObj.getKappl());
                        Obj.put("KVSL1", procedureObj.getKvsl1());
                        Obj.put("KVSL2", procedureObj.getKvsl2());
                        Obj.put("ZAEHK", procedureObj.getZaehk());
                        Obj.put("STUNR", procedureObj.getStunr());
//                        jArra.put(Obj);
                        out.println(Obj);
                    }
                }
//                out.println(Obj);
            } else if (reqFrom.equalsIgnoreCase("saveLimitsTabData")) {
                System.out.println("saveLimitsTabData");
                out = response.getWriter();
                JSONObject Obj = new JSONObject();
                String limitsString = request.getParameter("limitsString");
                System.out.println("invoiceString :" + limitsString);
                String[] limitsArr = limitsString.split(",");
                System.out.println("limitsArr length :" + limitsArr.length);
                List<Limits> limitsList = findLimitsByLineItemNumber(limitsArr[3]);
                System.out.println("limitsList Size :" + limitsList.size());
                if (!limitsList.isEmpty()) {
                    deleteAllFromLimits(limitsList);
                }
                if (!"".equals(limitsArr[0])) {
                    limits.setOverAllLimits(new BigDecimal(limitsArr[0]));
                } else {
                    limits.setOverAllLimits(null);
                }
                if (!"".equals(limitsArr[1])) {
                    limits.setExpectedValue(new BigDecimal(limitsArr[1]));
                } else {
                    limits.setExpectedValue(null);
                }
                if (!"".equals(limitsArr[2])) {
                    limits.setNoLimis(limitsArr[2]);
                } else {
                    limits.setNoLimis("");
                }
                if (!"".equals(limitsArr[3])) {
                    limits.setLineItemNumber(limitsArr[3]);
                } else {
                    limits.setLineItemNumber("");
                }
                if (!"".equals(limitsArr[4])) {
                    limits.setPrItemNumber(limitsArr[4]);
                } else {
                    limits.setPrItemNumber("");
                }
                if (!"".equals(limitsArr[5])) {
                    limits.setLinkId(limitsArr[5]);
                } else {
                    limits.setLinkId("");
                }
                if (!"".equals(limitsArr[6]) && !"NA".equals(limitsArr[6])) {
                    limits.setActualValue(limitsArr[6]);
                } else {
                    limits.setActualValue("");
                }
                String msg = saveLimits(limits);
                System.out.println("msg :" + msg);
                out.println(Obj);
            } else if (reqFrom.equalsIgnoreCase("getExtPOCreationByPOidAndItemNumber")) {
                System.out.println("getExtPOCreationByPOidAndItemNumber");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid :" + linkid);
                List<NGBPCmplxPOCreationLineItemPO> procedureList = getPRLineDataByLinkId(linkid);
                System.out.println("procedureList Size :" + procedureList.size());
                if (!procedureList.isEmpty()) {
                    for (NGBPCmplxPOCreationLineItemPO procedureList1 : procedureList) {
                        JSONObject Obj = new JSONObject(procedureList1);
                        if (null != procedureList1.getpOCreationText()) {
                            System.out.println("Checking getDeliveryText ::: " + procedureList1.getpOCreationText().getDeliveryText());
                            Obj.append("pOCreationText", new JSONObject(procedureList1.getpOCreationText()));
                        }
                        if (null != procedureList1.getpOCreationDel()) {
                            System.out.println("Checking getLinkID ::: " + procedureList1.getpOCreationDel().getLinkID());
                            Obj.append("pOCreationDel", new JSONObject(procedureList1.getpOCreationDel()));
                        }
                        if (null != procedureList1.getpOCreationcon()) {
                            System.out.println("Checking getOrderAck ::: " + procedureList1.getpOCreationcon().getOrderAck());
                            Obj.append("pOCreationcon", new JSONObject(procedureList1.getpOCreationcon()));
                        }
                        if (null != procedureList1.getpOCreationcond()) {
                            Obj.append("pOCreationcond", new JSONObject(procedureList1.getpOCreationcond()));
                        }
                        if (null != procedureList1.getpOCreationCustomerData()) {
                            Obj.append("pOCreationCustomerData", new JSONObject(procedureList1.getpOCreationCustomerData()));
                        }
//                        if (null != procedureList1.getpOCreationHeaderText()) {
//                            Obj.append("pOCreationHeaderText", new JSONObject(procedureList1.getpOCreationHeaderText()));
//                        }
                        if (null != procedureList1.getpOCreationLimits()) {
                            Obj.append("pOCreationLimits", new JSONObject(procedureList1.getpOCreationLimits()));
                        }

                        if (null != procedureList1.getpOCreationMaterial()) {
                            Obj.append("pOCreationMaterial", new JSONObject(procedureList1.getpOCreationMaterial()));
                        }
                        Obj.put("Result", "RecordFound");
                        System.out.println("Obj in getExtPOCreationByPOidAndItemNumber :" + Obj.toString());
                        out.print(Obj.toString());
                    }
//                    System.out.println("Obj in getExtPOCreationByPOidAndItemNumber :" + Obj.toString());
//                    out.print(Obj.toString());
                } else {
                    JSONObject Obj = new JSONObject();
                    Obj.put("Result", "NoRecordFound");
                    out.print(Obj);
                }
            } else if (reqFrom.equalsIgnoreCase("getAccountAssignmentByLinkId")) {
                out = response.getWriter();
                System.out.println("getAccountAssignmentByLinkId");
                String linkid = request.getParameter("linkid");
                System.out.println("linkid: " + linkid);

                List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accAsgnList = getAccountAssignmentByLinkId(linkid);

                if (!accAsgnList.isEmpty()) {
                    for (NGBPCmplxPOCreationLineItemPOAccountAssignment accAsgn : accAsgnList) {

                        JSONObject Obj = new JSONObject();
                        Obj.put("DISTRIBUTION", accAsgn.getDistribution() == null ? "" : accAsgn.getDistribution());
                        Obj.put("QUANTITY", accAsgn.getQuantity() == null ? "" : accAsgn.getQuantity());
                        Obj.put("PERCENTAGE", accAsgn.getPercentage() == null ? "" : accAsgn.getPercentage());
                        Obj.put("ACTIVITYNUMBER", accAsgn.getNetwork() == null ? "" : accAsgn.getNetwork());
                        Obj.put("COSTCENTER", accAsgn.getCostCenter() == null ? "" : accAsgn.getCostCenter());
                        Obj.put("ORDER", accAsgn.getAccOrder() == null ? "" : accAsgn.getAccOrder());
                        Obj.put("ASSET", accAsgn.getAsset() == null ? "" : accAsgn.getAsset());
                        Obj.put("WBSELEMENT", accAsgn.getWbsElement() == null ? "" : accAsgn.getWbsElement());
                        Obj.put("SALESORDER", accAsgn.getSalesOrder() == null ? "" : accAsgn.getSalesOrder());
                        Obj.put("COAREA", accAsgn.getCoArea() == null ? "" : accAsgn.getCoArea());
                        Obj.put("GLACCOUNT", accAsgn.getGlAccount() == null ? "" : accAsgn.getGlAccount());
                        Obj.put("UNLOADINGPOINT", accAsgn.getUnloadingPoint() == null ? "" : accAsgn.getUnloadingPoint());
                        Obj.put("RECEPIENT", accAsgn.getRecipient() == null ? "" : accAsgn.getRecipient());
                        Obj.put("COMMITMENTITEM", accAsgn.getCommitmentItem() == null ? "" : accAsgn.getCommitmentItem());
                        Obj.put("FUND", accAsgn.getFund() == null ? "" : accAsgn.getFund());
                        Obj.put("FUNDSCENTER", accAsgn.getFundsCentre() == null ? "" : accAsgn.getFundsCentre());
                        Obj.put("FUNCTIONALAREA", accAsgn.getFunctionalArea() == null ? "" : accAsgn.getFunctionalArea());
//                        Obj.put("ITMNO", accAsgn.getPrItemNumber() == null ? "" : accAsgn.getPrItemNumber());
                        Obj.put("ITEMNUMBER", accAsgn.getItemNumber() == null ? "" : accAsgn.getItemNumber());
                        Obj.put("DELIVERYSCHEDULE", accAsgn.getDeliverySchedule() == null ? "" : accAsgn.getDeliverySchedule());
//                        Obj.put("LINKNUMBER", accAsgn.getLinkNumber() == null ? "" : accAsgn.getLinkNumber());
                        Obj.put("ACC_ASS_CAT", accAsgn.getAccountAssignmentCategory() == null ? "" : accAsgn.getAccountAssignmentCategory());
                        Obj.put("COCODE", accAsgn.getCoCode() == null ? "" : accAsgn.getCoCode());
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveStansAloneProfitabilitySegmentData")) {

                out = response.getWriter();
                System.out.println("saveStansAloneProfitabilitySegmentData");
                String profitabilitySegmentString = request.getParameter("profitabilitySegmentString");
                System.out.println("profitabilitySegmentString :" + profitabilitySegmentString);

                String[] prSegmentArr = profitabilitySegmentString.split(",");
                System.out.println("prSegmentArr length :" + prSegmentArr.length);
                
                System.out.println("ServiceLineItemNumber: " + prSegmentArr[45]);
                System.out.println("LinkId: " + prSegmentArr[47]);
                
                List<NGBPCmplxPOCreationLineItemProfitabilitySegment> segmentList = purchaseOrderWSUtil
                        .getProfitabilitySegmentByLinkIdAndServiceLineItemNumber(prSegmentArr[47], prSegmentArr[45]);
                System.out.println("In Ajax Cont Profitability Segment Size: " + segmentList.size());
                if(!segmentList.isEmpty()) {
                    purchaseOrderWSUtil.deleteAllNGBPCmplxPOCreationLineItemProfitabilitySegment(segmentList);
                }                
                nGBPCmplxPOCreationLineItemProfitabilitySegment = savePoLineLevelTabUtil
                        .setProfitabilitySegmentFieldsSA(nGBPCmplxPOCreationLineItemProfitabilitySegment, prSegmentArr);                
                String msg = saveStandAloneProfitabilitySegment(nGBPCmplxPOCreationLineItemProfitabilitySegment);
                System.out.println("msg saveStandAloneProfitabilitySegment :" + msg);
                out.println(jArra);
            }
        } catch (IOException ex) {
            Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    @RequestMapping(value = "/ajaxcontroller", method = RequestMethod.GET)
    public void service(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        System.out.println("========Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);

        try {
            if (reqFrom.equalsIgnoreCase("RejectPrLine")) {
                System.out.println("RejectPrLine");
                out = response.getWriter();
                String PrLineId = request.getParameter("PrLineId");
                System.out.println("PrLineId: " + PrLineId);
                String result = updatePrLineStatus(Integer.parseInt(PrLineId), "Rejected");
                jObj.put("Result", result);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("saveHeaderSPO")) {
                out = response.getWriter();
                String idext = savePO(request, response);
                out.println(idext);
            } else if (reqFrom.equalsIgnoreCase("VendorByGroup")) {
                System.out.println("VendorByGroup");
                out = response.getWriter();
                String GroupId = request.getParameter("GroupId");
                System.out.println("GroupId: " + GroupId);
                List<VendorGroupMapping> vendorGroupMappingList = findVendorByGroup(Integer.parseInt(GroupId));
                System.out.println("vendorGroupMappingList size: " + vendorGroupMappingList.size());
                JSONArray vendorGroupMappingJsonArr = new JSONArray(vendorGroupMappingList);
                out.println(vendorGroupMappingJsonArr);
            } else if (reqFrom.equalsIgnoreCase("UpdateContractRatedParameterScore")) {
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");
                String parameterType = request.getParameter("parameterType");
                String score = request.getParameter("score");
                String parameterValue = request.getParameter("parameterValue");
                List<RatedParameters> venratedParametersList = findByVendorRFQTag(Integer.parseInt(vendorId), Integer.parseInt(rfqId), parameterType);
                String ratedParamList = findMaxTagID(Integer.parseInt(rfqId));
                VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorId));
                ContractRfqHeader rfqHeaderObj = findCMRfqHeaderById(Integer.parseInt(rfqId));
                if (venratedParametersList.size() > 0) {
                    RatedParameters ratedParam = venratedParametersList.get(0);
                    ratedParam.setInsertionOrderID(ratedParam.getInsertionOrderID());
                    ratedParam.setScore(score);
                    ratedParam.setValue(parameterValue);
                    String str = updateRatedParam(ratedParam);
                } else {
                    ratedParam.setScore(score);
                    ratedParam.setTagName(parameterType);
                    ratedParam.setValue(parameterValue);
                    ratedParam.setVendorDetails(vendorObj);
                    ratedParam.setContractRfqHeader(rfqHeaderObj);
                    String tagId = ratedParamList;
                    if (tagId.equalsIgnoreCase("")) {
                        String last = tagId.charAt(tagId.length() - 1) + "";
                        int n = Integer.parseInt(last) + 1;
                        ratedParam.setTagID("ratedParam" + n);

                    } else {
                        ratedParam.setTagID("ratedParam1");
                    }
                    String str = saveRatedParam(ratedParam);
                    System.out.println("str--->" + str);
                }
                out.println("Updated");
            } else if (reqFrom.equalsIgnoreCase("CMVendorComparisonReport")) {
                System.out.println("CMVendorComparisonReport");
                out = response.getWriter();
                String rfqNumber = request.getParameter("rfqNumber");
                System.out.println("rfqNumber: " + rfqNumber);
                ContractRfqHeader rfqHeaderObj = findCMRfqHeaderById(Integer.parseInt(rfqNumber));

                List<RatedParameters> ratedParametersList = findRatedParamByRFQId(Integer.parseInt(rfqNumber));

                //NG_BP_Default_RatedParameters defaultRatedParam=findAllRatedParam();df
                List<NG_BP_Default_RatedParameters> ratedParamList = purchaseOrderWSUtil.findAllRatedParam();
                String ratedParam = "";

                for (NG_BP_Default_RatedParameters defaultRatedParam : ratedParamList) {
                    if (ratedParam.equals("")) {
                        ratedParam = defaultRatedParam.getParameter();
                    } else {
                        ratedParam = ratedParam + "," + defaultRatedParam.getParameter();
                    }
                }

                List<ContractVendorRfqHeader> contractVendorRfqHeaderList = findByContractRfqHeaderIdAndStatus(Integer.parseInt(rfqNumber), "Bid Submitted");
                System.out.println("contractVendorRfqHeaderList size: " + contractVendorRfqHeaderList.size());

                for (ContractVendorRfqHeader header : contractVendorRfqHeaderList) {
                    JSONObject headerObj = new JSONObject();

                    headerObj.put("SupplierStatus", header.getStatus());
                    headerObj.put("VendorId", header.getNgBpVendordetailsId().getId());

                    headerObj.put("VendorName", header.getNgBpVendordetailsId().getFirstname() + " " + header.getNgBpVendordetailsId().getLastname());
                    int vendorID = header.getNgBpVendordetailsId().getId();
                    List<RatedParameters> venratedParametersList = findByVendorANDRFQID(header.getNgBpVendordetailsId().getId(), Integer.parseInt(rfqNumber));
                    headerObj.put("RatedParameters", venratedParametersList);
                    headerObj.put("Safety", header.getsafetyRatedParameter() == null ? "" : header.getsafetyRatedParameter());
                    headerObj.put("Capability", header.getcapabilityRatedParameter() == null ? "" : header.getcapabilityRatedParameter());
                    headerObj.put("Reliability", header.getreliabilityRatedParameter() == null ? "" : header.getreliabilityRatedParameter());
                    headerObj.put("Price", header.getpriceRatedParameter() == null ? "" : header.getpriceRatedParameter());
                    headerObj.put("ServiceQuality", header.getserviceQualityRatedParameter() == null ? "" : header.getserviceQualityRatedParameter());

                    headerObj.put("SafetyScore", header.getsafetyRatedParameterScore() == null ? "" : header.getsafetyRatedParameterScore());
                    headerObj.put("CapabilityScore", header.getcapabilityRatedParameterScore() == null ? "" : header.getcapabilityRatedParameterScore());
                    headerObj.put("ReliabilityScore", header.getreliabilityRatedParameterScore() == null ? "" : header.getreliabilityRatedParameterScore());
                    headerObj.put("PriceScore", header.getpriceRatedParameterScore() == null ? "" : header.getpriceRatedParameterScore());
                    headerObj.put("ServiceQualityScore", header.getserviceQualityRatedParameterScore() == null ? "" : header.getserviceQualityRatedParameterScore());

                    List<ContractVendorRfqLineItem> ContractVendorRfqLineItemList = findContractLineItemByContractHeaderId(header.getId());
                    System.out.println("Line Item: " + ContractVendorRfqLineItemList.size());

                    JSONArray lineItemArr = new JSONArray();

                    double total = 0;
                    int i = 0;

                    for (ContractVendorRfqLineItem lineitem : ContractVendorRfqLineItemList) {
                        JSONObject lineItemObj = new JSONObject();
                        System.out.println("lineitem.getUsedQty()-->" + lineitem.getUsedQty());
                        lineItemObj.put("AvailQuantity", lineitem.getQuantityAvailable());
                        lineItemObj.put("Quantity", lineitem.getUsedQty());
                        System.out.println("lineitem.getId()-->" + lineitem.getId());
                        lineItemObj.put("vendorRfqlineID", lineitem.getId());
                        lineItemObj.put("InsertionOrderId", lineitem.getId());
                        lineItemObj.put("ItemNumber", (lineitem.getNewgenContractLineItemInsertionOrderID().getMaterialCode() == null ? "" : lineitem.getNewgenContractLineItemInsertionOrderID().getMaterialCode()) + " / " + (lineitem.getNewgenContractLineItemInsertionOrderID().getShortText() == null ? "" : lineitem.getNewgenContractLineItemInsertionOrderID().getShortText()));            //Newgen
                        lineItemObj.put("Price", lineitem.getVendorpriceofferedtotal() == null ? "0" : lineitem.getVendorpriceofferedtotal());
                        lineItemObj.put("BuyerBaselinePrice", lineitem.getBuyerBaselinePrice() == null ? "0" : lineitem.getBuyerBaselinePrice());
                        if (i == 0) {
//                            lineItemObj.put("Currency", lineitem.getCurrency() == null ? "" : lineitem.getCurrency());
                            headerObj.put("Currency", lineitem.getCurrency() == null ? "" : lineitem.getCurrency());
                        }

                        // Currency Conversion Starts
                        double convertedAmt = 0;
                        if (lineitem.getCurrency() != null && !lineitem.getCurrency().equals("SGD")) {
                            List<MasterExchangeRate> exchangeRateList = findExchangeRateByFromCurrencyAndToCurrency(lineitem.getCurrency(), "SGD");
                            System.out.println("exchangeRateList size: " + exchangeRateList.size());
                            if (!exchangeRateList.isEmpty()) {
                                convertedAmt = Double.parseDouble(lineitem.getVendorpriceofferedtotal() == null ? "0" : lineitem.getVendorpriceofferedtotal()) * exchangeRateList.get(0).getExchangeRate().doubleValue();
                                System.out.println("convertedAmt: " + convertedAmt);
                                lineItemObj.put("ConvertedPrice", convertedAmt);
                                total += convertedAmt;
                            } else {
                                lineItemObj.put("ConvertedPrice", lineitem.getVendorpriceofferedtotal() == null ? "0" : lineitem.getVendorpriceofferedtotal());
                                total += Double.parseDouble(lineitem.getVendorpriceofferedtotal() == null ? "0" : lineitem.getVendorpriceofferedtotal());
                            }
                        } else {
                            lineItemObj.put("ConvertedPrice", lineitem.getVendorpriceofferedtotal() == null ? "0" : lineitem.getVendorpriceofferedtotal());
                            total += Double.parseDouble(lineitem.getVendorpriceofferedtotal() == null ? "0" : lineitem.getVendorpriceofferedtotal());
                        }
                        // Currency Conversion Ends

                        lineItemArr.put(lineItemObj);
                        i++;
                    }
                    System.out.println("total: " + total);
                    headerObj.put("TotalConvertedPrice", total);
                    headerObj.put("TotalPrice", header.getVendorPriceOfferedTotal() == null ? "0" : header.getVendorPriceOfferedTotal());
                    headerObj.put("BuyerTotalBaselinePrice", header.getBuyerPriceOfferedTotal() == null ? "0" : header.getBuyerPriceOfferedTotal());
                    headerObj.put("PRDetails", lineItemArr);

                    jArra.put(headerObj);
                }
                if (rfqHeaderObj.getRfqstatus() != null && rfqHeaderObj.getRfqstatus().equals("Closed")) {
                    List<FinalizedContractRfq> finalizedContractRfqList = findFinalizedContractRfqByRfqId(Integer.parseInt(rfqNumber));
                    System.out.println("finalizedContractRfqList size: " + finalizedContractRfqList.size());
                    JSONArray finalizedRfqJsonArr = new JSONArray();
                    for (FinalizedContractRfq rfq : finalizedContractRfqList) {
                        JSONObject finalizedRfqJsonObj = new JSONObject();

                        // finalizedRfqJsonObj.put("ItemNumber", rfq.getNgBpNewgenCMLineItemId().getMaterialCode() + " / " + rfq.getNgBpNewgenCMLineItemId().getShortText());
                        finalizedRfqJsonObj.put("ItemNumber", "0535A0061 / BERGER PAVING PAINT SILVER 0664 (5-LIT)");
                        finalizedRfqJsonObj.put("VendorName", rfq.getNgBpVendordetailsId().getFirstname() + " " + rfq.getNgBpVendordetailsId().getLastname());
                        finalizedRfqJsonObj.put("VendorId", rfq.getNgBpVendordetailsId().getCode());
                        finalizedRfqJsonObj.put("Comments", rfq.getComments());
                        finalizedRfqJsonObj.put("WhyThisVendor", rfq.getWhyThisVendor());

                        finalizedRfqJsonArr.put(finalizedRfqJsonObj);
                    }
                    jObj.put("FinalizedVendorData", finalizedRfqJsonArr);
                }

                jObj.put("ratedParametersList", ratedParametersList);
                // jObj.put("ratedParameters", ratedParametersList.get(0));
                jObj.put("VendorData", jArra);
                jObj.put("RfqStatus", rfqHeaderObj.getRfqstatus());
                //System.out.println("ratedParam-->" + ratedParam);
                // jObj.put("ratedParam", ratedParam);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("FinalizeVendorForContractRfq")) {
                System.out.println("FinalizeVendorForContractRfq");
                out = response.getWriter();

                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");
                String insertionOrderId = request.getParameter("insertionOrderId");
                String comment = request.getParameter("comments");
                String whyThisVendor = request.getParameter("whyThisVendor");
                vendorId = vendorId.substring(0, vendorId.length() - 1);
                insertionOrderId = insertionOrderId.substring(0, insertionOrderId.length() - 1);
                comment = comment.substring(0, comment.length() - 1);
                whyThisVendor = whyThisVendor.substring(0, whyThisVendor.length() - 1);
                String[] vendorIds = vendorId.split("#");
                String[] insertionOrderIds = insertionOrderId.split("#");
                String[] comments = comment.split("#");
                String[] whyThisVendors = whyThisVendor.split("#");
                Date today = new Date();

                ContractRfqHeader rfqHeaderObj = findCMRfqHeaderById(Integer.parseInt(rfqId));
                String rfqNo = rfqHeaderObj.getRfqNumber();

                for (int i = 0; i < vendorIds.length; i++) {
                    VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorIds[i]));
                    NewgenContractLineItem CMObj = getCMDetailsById(Integer.parseInt(insertionOrderIds[i]));

                    finalizedcontractRfq.setNgBpcontractrfqheaderRfqid(rfqHeaderObj);
                    finalizedcontractRfq.setNgBpVendordetailsId(vendorObj);
                    finalizedcontractRfq.setNgBpNewgenCMLineItemId(CMObj);
                    finalizedcontractRfq.setFinalizedDate(today);
                    finalizedcontractRfq.setComments(comments[i]);
                    finalizedcontractRfq.setWhyThisVendor(whyThisVendors[i]);

                    saveFinalizedContractRfq(finalizedcontractRfq);
                }

                rfqHeaderObj.setRfqstatus("Closed");
                rfqHeaderObj.setUpdatedate(today);
                updateRfqContractHeader(rfqHeaderObj);

                jObj.put("Result", "Success");
                jObj.put("RfqNo", rfqNo);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("UsernameAvailibility")) {
                System.out.println("UsernameAvailibility");
                out = response.getWriter();
                String username = request.getParameter("username");
                List<BuyerDetails> buyerList = getByUsername(username);

                int size = buyerList.size();
                jObj.put("size", size);

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("CheckProspectAvailibility")) {
                System.out.println("CheckProspectAvailibility");
                out = response.getWriter();

                String name = request.getParameter("name");

                List<VendorDetails> prospectList = findByProspectVendorName(name);

                int size = prospectList.size();

                System.out.println("buyerList size :" + size);

                jObj.put("size", size);

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("CheckVendorGroupAvailibility")) {
                System.out.println("CheckVendorGroupAvailibility");
                out = response.getWriter();

                String name = request.getParameter("GroupName");

                List<VendorGroup> groupList = findVendorGroupByName(name);

                int size = groupList.size();

                System.out.println("buyerList size :" + size);

                jObj.put("size", size);

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("VendorByRfqId")) {
                System.out.println("VendorByRfqId");
                out = response.getWriter();

                String rfqNumber = request.getParameter("rfqNumber");
                List<RfqHeaderVendorMapping> vendorList = findVendorByRfqId(Integer.parseInt(rfqNumber));
                for (RfqHeaderVendorMapping obj : vendorList) {
                    JSONObject innerJsonObj = new JSONObject();
                    innerJsonObj.put("MAPPING_ID", obj.getId());
                    innerJsonObj.put("RFQ_ID", obj.getNgBpWorkorderrfqheaderRfqid().getRfqid());
                    innerJsonObj.put("RFQ_NUMBER", obj.getNgBpWorkorderrfqheaderRfqid().getRfqNumber());
                    innerJsonObj.put("RFQ_TITLE", obj.getNgBpWorkorderrfqheaderRfqid().getRFQTitle());
                    innerJsonObj.put("RFQ_STATUS", obj.getNgBpWorkorderrfqheaderRfqid().getRfqstatus());
                    innerJsonObj.put("RFQ_REQ_DATE", obj.getNgBpWorkorderrfqheaderRfqid().getRfqRequestDate());
                    innerJsonObj.put("RFQ_CLOSES_ON", obj.getNgBpWorkorderrfqheaderRfqid().getRfqvaliduntil());
                    innerJsonObj.put("VENDOR_ID", obj.getNgBpVendordetailsId().getId());
                    innerJsonObj.put("VENDOR_NAME", obj.getNgBpVendordetailsId().getFirstname() + " " + obj.getNgBpVendordetailsId().getLastname());

                    jArra.put(innerJsonObj);
                }

                String result;

                if (!vendorList.isEmpty()) {
                    result = "Found";
                } else {
                    result = "NotFound";
                }

                jObj.put("Result", result);
                jObj.put("Data", jArra);

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("VendorUsernameAvailibility")) {

                out = response.getWriter();

                String username = request.getParameter("username");
                List<VendorDetails> vendorList = getVendorByUsername(username);
                int size = vendorList.size();
                jObj.put("size", size);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("MakeUnreadNotificationToRead")) {
                System.out.println("MakeUnreadNotificationToRead");
                out = response.getWriter();

                String notificationId = request.getParameter("notificationId");

                System.out.println("notificationId : " + notificationId);

                BuyerVendorNotification notification = findBuyerVendorNotificationById(Integer.parseInt(notificationId));

                notification.setReadstatus("true");

                String result = updateBuyerVendorNotification(notification);

                System.out.println("result: " + result);

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getsecqueans")) {
                System.out.println("getsecqueans");
                out = response.getWriter();

                String username = request.getParameter("username");

                System.out.println("username in getsecqueans :" + username);

                List<BuyerDetails> buyerList = getByUsername(username);

                BuyerDetails buyerobj = buyerList.get(0);

                int buyerid = buyerobj.getId();

                List<BuyerSecurityQueAns> secAns = getSecQueById(buyerid);

                System.out.println("secAns :" + secAns);

                for (BuyerSecurityQueAns obj : secAns) {

                    JSONObject innerJsonObj = new JSONObject();

                    innerJsonObj.put("question", obj.getQuestion());
                    innerJsonObj.put("answer", obj.getAnswer());
                    innerJsonObj.put("buyerid", buyerid);

                    jArra.put(innerJsonObj);
                }
                System.out.println("length :" + jArra.length());

                jObj.put("Data", jArra);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("TeamleadBuyerMapping")) {
                System.out.println("TeamleadBuyerMapping");
                out = response.getWriter();
                JSONArray jArra1 = new JSONArray();
                String teamleadId = request.getParameter("teamleadId");

                System.out.println("teamleadId: " + teamleadId);

                List<BuyerTeamleadMapping> mappingList = findBuyerMappingByTeamlead(Integer.parseInt(teamleadId));
                List<BuyerDetails> mappedBuyers = new ArrayList<>();

                for (BuyerTeamleadMapping mapping : mappingList) {

                    JSONObject innerJsonObj = new JSONObject();

                    innerJsonObj.put("BuyerId", mapping.getNgBpBuyerdetailsId().getId());
                    innerJsonObj.put("Username", mapping.getNgBpBuyerdetailsId().getUsername());
                    innerJsonObj.put("FirstName", mapping.getNgBpBuyerdetailsId().getFirstname());
                    innerJsonObj.put("LastName", mapping.getNgBpBuyerdetailsId().getLastname());
                    innerJsonObj.put("EmailId", mapping.getNgBpBuyerdetailsId().getEmailid());

                    mappedBuyers.add(mapping.getNgBpBuyerdetailsId());

                    jArra.put(innerJsonObj);
                }

                List<BuyerDetails> buyerList = findAllBuyerExceptTeamLead();
                buyerList.removeAll(mappedBuyers);
                System.out.println("List after remove:" + buyerList);

                for (BuyerDetails buyer : buyerList) {
                    JSONObject innerJsonObj = new JSONObject();
                    innerJsonObj.put("USERID", buyer.getId());
                    innerJsonObj.put("USERNAME", buyer.getUsername());
                    System.out.println("Userid :" + buyer.getId());
                    jArra1.put(innerJsonObj);
                }

                System.out.println("buyerList size :" + buyerList.size());

//                for (BuyerDetails buyerObj : buyerList) {
//                    System.out.println(buyerObj.getUsername());
//                }
                jObj.put("AssociateBuyer", jArra1);
                System.out.println("length :" + jArra.length());

                jObj.put("Data", jArra);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("DeassociateBuyer")) {
                System.out.println("DeassociateBuyer");
                out = response.getWriter();

                String teamleadId = request.getParameter("teamleadId");
                String buyerId = request.getParameter("buyerId");

                String result = deleteBuyerTeamleadMapping(Integer.parseInt(buyerId), Integer.parseInt(teamleadId));

                jObj.put("Data", jArra);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getprbyrfqid")) {
                System.out.println("getprbyrfqid");
                out = response.getWriter();

                String rfqid = request.getParameter("rfqid");
                System.out.println("rfqid :" + rfqid);

                List<WorkOrderRfqLineItem> lineItemObj = getPridByRfqid(Integer.parseInt(rfqid));

                for (int i = 0; i < lineItemObj.size(); i++) {
                    WorkOrderRfqLineItem lineitem = lineItemObj.get(i);
                    System.out.println("lineitem list :" + lineitem.getNgBpNewgenPRLineItemId().getInsertionOrderId());
                    NewgenPRLineItem newgen = getNewgenPRLineItemById(lineitem.getNgBpNewgenPRLineItemId().getInsertionOrderId());

                    System.out.println("Currency :" + newgen.getCurrency());

//                    System.out.println("Lastsuppiername :" + newgen.getLastsuppiername());
                    System.out.println("Materialcode :" + newgen.getMaterialCode());

                    System.out.println("Plant :" + newgen.getPlant());

//                    for (NewgenPRLineItem obj : newgen) {
                    JSONObject innerJsonObj = new JSONObject();

                    innerJsonObj.put("materialcode", newgen.getMaterialCode());

//                        innerJsonObj.put("baselinepriceperunit", obj.getBaselinepricePerunit());
                    innerJsonObj.put("currency", newgen.getCurrency());

                    innerJsonObj.put("plant", newgen.getPlant());

                    jArra.put(innerJsonObj);
//                    }
                    /*Newgen*/
                }
//                }
                System.out.println("length :" + jArra.length());
                jObj.put("Data", jArra);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("ReassignedPR")) {
                System.out.println("ReassignedPR");
                out = response.getWriter();

                String prid = request.getParameter("prid");
                System.out.println("prid :" + prid);

//                List<PRDetails> prList = getPrDetailsById(Integer.parseInt(prid));
                NewgenPRLineItem prObj = getPrDetailsById(Integer.parseInt(prid));
                prObj.setBpStatus("Unassigned");
                prObj.setBpBuyerdetailsId(null);
                prObj.setBpAssigndate(null);

//                if (prObj.getRfqStatus() != null && prObj.getRfqStatus().equalsIgnoreCase("Initiated")) {
                if (prObj.getBpRfqStatus() != null && prObj.getBpRfqStatus().equalsIgnoreCase("Initiated")) {
//                    prObj.setNgBpBuyerdetailsId(null);
                    System.out.println("In Loop :");
                    List<WorkOrderRfqLineItem> lineItemList = getWorkOrderRfqLineItemByPrId(Integer.parseInt(prid));

                    System.out.println("LineItemList :" + lineItemList.size());

                    for (WorkOrderRfqLineItem lineItemObj : lineItemList) {
                        int id = lineItemObj.getBPaasWorkOrderRFQHeaderRFQID().getRfqid();
                        System.out.println("id in loop Ajax :" + id);
                        WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(id);
                        System.out.println("rfqHeaderObj in loop :" + rfqHeaderObj);
                        rfqHeaderObj.setNgBpBuyerdetailsId(null);
                        String msg = updateRfqHeader(rfqHeaderObj);
                        System.out.println("msg :" + msg);
                    }

                }

                String msg = updatePRStatus(prObj);

            } else if (reqFrom.equalsIgnoreCase("getVendorById")) {
                System.out.println("getVendorById");
                out = response.getWriter();

                String vendorid = request.getParameter("vendorid");

                System.out.println("vendorid: " + vendorid);

                VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorid));

                JSONObject innerJsonObj = new JSONObject();
//                
                innerJsonObj.put("ADDRESS", vendorObj.getAddress());
                innerJsonObj.put("EMAILID", vendorObj.getEmailid());
                innerJsonObj.put("COMPANYCODE", vendorObj.getCode());
//                
//                jArra.put(innerJsonObj);

                System.out.println("length :" + jArra.length());

                jObj.put("Data", innerJsonObj);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getCompanyCodeByCompany")) {
                System.out.println("getCompanyCodeByCompany");
                out = response.getWriter();
                String country = request.getParameter("country");
                System.out.println("country: " + country);
                List<CountryMaster> masterObj = getCountryMasterByCountry(country);

                JSONObject innerJsonObj = new JSONObject();

                innerJsonObj.put("COUNTRYCODE", masterObj.get(0).getCountrycode());
                innerJsonObj.put("CURRENCY", masterObj.get(0).getCurrency());

                jObj.put("Data", innerJsonObj);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("deleteBuyerById")) {
                System.out.println("deleteBuyerById");
                out = response.getWriter();
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails loggedInUser = (BuyerDetails) auth.getPrincipal();

                String buyerid = request.getParameter("buyerid");
                System.out.println("buyerid: " + buyerid);
                BuyerDetails buyer = getBuyerById(Integer.parseInt(buyerid));
                buyer.setStatus("Delete");
                String msg = updateBuyer(buyer);
                System.out.println("msg in deleteByuerById :" + msg);

                reportBuyerAuditLog.setActivityPerformed(buyer.getUsername() + " buyer deleted.");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(loggedInUser);
                saveBuyerAuditLogReport(reportBuyerAuditLog);

            } else if (reqFrom.equalsIgnoreCase("ReassignedContract")) {
                System.out.println("ReassignedContract");
                out = response.getWriter();
                String contractid = request.getParameter("contractid");
                System.out.println("contractid :" + contractid);

                NewgenContractLineItem contractObj = getContractDetailsById(Integer.parseInt(contractid));
                System.out.println("Status in ajax :" + contractObj.getBpStatus());
                System.out.println("rfqstatus in ajax :" + contractObj.getBpRfqStatus());
                contractObj.setBpStatus("Unassigned");
                contractObj.setBpBuyerdetailsId(null);
                contractObj.setBpAssigndate(null);

                String msg = updateContractStatus(contractObj);
                System.out.println("NewgenContractLineItem updated");

            } else if (reqFrom.equalsIgnoreCase("RfqStatusChart")) {
                System.out.println("RfqStatusChart");
                out = response.getWriter();

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = null;
                if (auth.getPrincipal() instanceof BuyerDetails) {
                    buyer = (BuyerDetails) auth.getPrincipal();
                }
                System.out.println("buyer : " + buyer);

                List list = findRfqStatusCountByRfqStatus(buyer.getId());
                System.out.println("List: " + list);
                System.out.println("List len: " + list.size());
                for (Object obj : list) {
                    JSONArray jsonArr = new JSONArray();
                    List subList = (List) obj;
                    jsonArr.put(subList.get(1));
                    jsonArr.put(subList.get(0));
                    jArra.put(jsonArr);
                }
                System.out.println("jArr len: " + jArra.length());
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("AdminRfqStatusChart")) {
                System.out.println("AdminRfqStatusChart");
                out = response.getWriter();

                List list = findAdminRfqStatusCountByRfqStatus();
                System.out.println("List: " + list);
                System.out.println("List len: " + list.size());
                for (Object obj : list) {
                    JSONArray jsonArr = new JSONArray();
                    List subList = (List) obj;
                    jsonArr.put(subList.get(1));
                    jsonArr.put(subList.get(0));
                    jArra.put(jsonArr);
                }
                System.out.println("jArr len: " + jArra.length());
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("ChangeVendorStatus")) {
                System.out.println("ChangeVednorStatus");
                out = response.getWriter();
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

                String vendorid = request.getParameter("vendorid");
                String operation = request.getParameter("operation");
                VendorDetails vendor = findVendorById(Integer.parseInt(vendorid));
                vendor.setStatus(operation);

                RestTemplate restTemplate = new RestTemplate();
                String result = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatevendor.do"), vendor, String.class);
                System.out.println("vendor : " + result);

                if (operation.equalsIgnoreCase("Delete")) {
                    reportBuyerAuditLog.setActivityPerformed(vendor.getUsername() + " Vendor Deleted");
                } else if (operation.equalsIgnoreCase("Block")) {
                    reportBuyerAuditLog.setActivityPerformed(vendor.getUsername() + " Vendor Blocked");
                } else if (operation.equalsIgnoreCase("Active")) {
                    reportBuyerAuditLog.setActivityPerformed(vendor.getUsername() + " Vendor Unblocked");
                }

                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                saveBuyerAuditLogReport(reportBuyerAuditLog);

            } else if (reqFrom.equalsIgnoreCase("findVendorById")) {
                System.out.println("findVendorById");
                out = response.getWriter();

                String vendorid = request.getParameter("vendorid");
                System.out.println("vendorid: " + vendorid);
                VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorid));

                jObj.put("Code", vendorObj.getCode());
                jObj.put("ORG", vendorObj.getOrganization());
                jObj.put("FIRST_NAME", vendorObj.getFirstname());
                jObj.put("LAST_NAME", vendorObj.getLastname());
                jObj.put("CITY", vendorObj.getCity());
                jObj.put("COUNTRY", vendorObj.getCountry());
                jObj.put("ADDRESS", vendorObj.getAddress());
                jObj.put("POSTAL_CODE", vendorObj.getPostalcode());
                jObj.put("EMAIL_ID", vendorObj.getEmailid());
                jObj.put("SPOC_NAME", vendorObj.getSpocname());
                jObj.put("SPOC_EMAIL", vendorObj.getSpocemail());
                jObj.put("ALT_EMAIL", vendorObj.getVendoremailAuto());
                jObj.put("CONTACT_NO_OFF", vendorObj.getContactnumberoff());
                jObj.put("CONTACT_NO_MOB", vendorObj.getContactnumbermob());
                jObj.put("CONTACT_NO_FAX", vendorObj.getContactnumberfax());
                jObj.put("PAYMENT_TERMS", vendorObj.getPaymentTerms());
                jObj.put("ORDER_CURRENCY", vendorObj.getOrdercurrency());
                jObj.put("NATURE_OF_PURCHASE", vendorObj.getNatureOfPurchase());
                jObj.put("COMPANY_REG_NO", vendorObj.getCompanyRegNumber());
                jObj.put("GST_NO", vendorObj.getGstRegNumber());
                jObj.put("TYPE", vendorObj.getType());
                jObj.put("PROSPECT_NAME", vendorObj.getProspectvendorname());

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getBuyerById")) {
                System.out.println("getBuyerById");
                out = response.getWriter();

                String buyerid = request.getParameter("buyerid");
                System.out.println("buyerid: " + buyerid);
//                VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorid));
                BuyerDetails buyerObj = getBuyerById(Integer.parseInt(buyerid));

                jObj.put("CompanyCode", buyerObj.getCompanyCode());
                jObj.put("Role", buyerObj.getRole());

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getPRById")) {
                System.out.println("getPRById");
                out = response.getWriter();
                String prid = request.getParameter("prid");
                System.out.println("prid :" + prid);
                NewgenPRLineItem prObj = getPrDetailsById(Integer.parseInt(prid));
                jObj.put("CompanyCode", "COMP");

//                jObj.put("Data", jArra);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getGroupNameByGroupId")) {

                out = response.getWriter();

                String groupid = request.getParameter("groupid");

                VendorGroup group = findVendorGroupById(Integer.parseInt(groupid));

                System.out.println("group in getGroupNameByGroupId :" + group.getGroupname());

                JSONObject innerJsonObj = new JSONObject();

                innerJsonObj.put("GROUPNAME", group.getGroupname());
//                
                jArra.put(innerJsonObj);

                System.out.println("length :" + jArra.length());

                jObj.put("Data", innerJsonObj);

//                jObj.put("GROUPNAME", group.getGroupname());
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("findMasterVendorByVendorCode")) {
                out = response.getWriter();
                String vendorcode = request.getParameter("vendorCode");
                System.out.println("vendorcode in  findMasterVendorByVendorCode:" + vendorcode);
                List<MasterVendor> master = findMasterVendorByVendorCode(vendorcode);
                System.out.println("master in findMasterVendorByVendorCode :" + master.get(0).getVendorName());

                JSONObject innerJsonObj = new JSONObject();

                innerJsonObj.put("VENDORNAME", master.get(0).getVendorName());
                innerJsonObj.put("VENDORCODE", master.get(0).getVendorCode());
                innerJsonObj.put("ORGANIZATION", master.get(0).getVendorName());
                innerJsonObj.put("ADDRESS", master.get(0).getVendorAddress());
                innerJsonObj.put("PAYMENTTERM", master.get(0).getPaymentTerm());
                innerJsonObj.put("COMPANY_CODE", master.get(0).getCompanyCode());
                innerJsonObj.put("CITY", master.get(0).getCity());
                innerJsonObj.put("CONTACT_NO", master.get(0).getContactNo());
                innerJsonObj.put("COUNTRY", master.get(0).getCountry());
                innerJsonObj.put("POSTAL_CODE", master.get(0).getPostalCode());
                innerJsonObj.put("PURCHASE_ORG", master.get(0).getPurOrg());
                innerJsonObj.put("SNO", master.get(0).getSno());
                innerJsonObj.put("ADDRESS1", master.get(0).getAddress1() == null ? "" : master.get(0).getAddress1());
                innerJsonObj.put("ADDRESS2", master.get(0).getAddress2() == null ? "" : master.get(0).getAddress2());
                innerJsonObj.put("ADDRESS3", master.get(0).getAddress3() == null ? "" : master.get(0).getAddress3());
                innerJsonObj.put("STREET", master.get(0).getStreet() == null ? "" : master.get(0).getStreet());
                innerJsonObj.put("COUNTRY_CODE", master.get(0).getCountryCode() == null ? "" : master.get(0).getCountryCode());
                innerJsonObj.put("INCO_TERM1", master.get(0).getIncoTerm1() == null ? "" : master.get(0).getIncoTerm1());
                innerJsonObj.put("INCO_TERM2", master.get(0).getIncoTerm2() == null ? "" : master.get(0).getIncoTerm2());
                innerJsonObj.put("FAX_EXT", master.get(0).getFaxExt() == null ? "" : master.get(0).getFaxExt());
                innerJsonObj.put("FAX_NO", master.get(0).getFaxNo() == null ? "" : master.get(0).getFaxNo());
                // Added by nikhil on 10-01-2020 at 07:14PM
                innerJsonObj.put("SCHEMA_GROUP", master.get(0).getSchemaGroup());

                String schemaGroup = master.get(0).getSchemaGroup();
                String purOrg = master.get(0).getPurOrg();

                List<SchemaGroupPurOrgMapping> schemaGroupPurOrgMappingList = findKalsmBySchemaGroupAndPurchaseOrg(schemaGroup, purOrg);
                System.out.println("schemaGroupPurOrgMappingList len: " + schemaGroupPurOrgMappingList);
                String kalsm = "";
                if (schemaGroupPurOrgMappingList != null && !schemaGroupPurOrgMappingList.isEmpty()) {
                    kalsm = schemaGroupPurOrgMappingList.get(0).getKalsm();
                } else {
                    kalsm = "NoMappingEntry";
                }
                System.out.println("kalsm: " + kalsm);
                innerJsonObj.put("kalsm", kalsm);
                out.println(innerJsonObj);
            } else if (reqFrom.equalsIgnoreCase("findAllVendorAndProspect")) {

                out = response.getWriter();

                List<VendorDetails> vendorList = findByStatusAndType("Active", "Vendor");
                List<VendorDetails> prospectList = findByStatusAndType("Active", "Prospect");

                JSONArray vendor = new JSONArray();
                JSONArray prospect = new JSONArray();

                for (VendorDetails v : vendorList) {
                    JSONObject obj = new JSONObject();
                    obj.put("Id", v.getId());
                    obj.put("Name", v.getFirstname() + " " + v.getLastname());
                    vendor.put(obj);
                }
                for (VendorDetails p : prospectList) {
                    JSONObject obj = new JSONObject();
                    obj.put("Id", p.getId());
                    obj.put("Name", p.getProspectvendorname());
                    prospect.put(obj);
                }
                jObj.put("Vendor", vendor);
                jObj.put("Prospect", prospect);
//                jObj.put("GROUPNAME", group.getGroupname());
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("findBuyerLogs")) {

                out = response.getWriter();
                String buyerid = request.getParameter("buyerId");
                String fromDate = request.getParameter("fromDate");
                String toDate = request.getParameter("toDate");

                System.out.println("buyerId: " + buyerid);
                System.out.println("fromDate: " + fromDate);
                System.out.println("toDate: " + toDate);

                DateFormat df = new SimpleDateFormat("dd.MM.yyyy");
                List<ReportBuyerAuditLog> logs = findBuyerLogByBuyerId(buyerid, fromDate, toDate);

                for (ReportBuyerAuditLog log : logs) {
                    JSONObject obj = new JSONObject();

                    obj.put("Activity", log.getActivityPerformed());
                    obj.put("Date", df.format(log.getCreatedate()));
                    obj.put("Username", log.getNgBpBuyerdetailsId().getUsername());
                    obj.put("BuyerName", log.getNgBpBuyerdetailsId().getFirstname() + " " + log.getNgBpBuyerdetailsId().getLastname());

                    jArra.put(obj);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("findOpenRfqReport")) {

                out = response.getWriter();
                String plantCode = request.getParameter("plantCode");
                String rfqId = request.getParameter("rfqId");
                String purchaseGroup = request.getParameter("purchaseGroup");
                String buyerId = request.getParameter("buyerId");

                System.out.println("plantCode: " + plantCode);
                System.out.println("rfqId: " + rfqId);
                System.out.println("purchaseGroup: " + purchaseGroup);
                System.out.println("buyerId: " + buyerId);

//                DateFormat df = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
                List<OpenRfqReportBean> logs = callOpenRfqReportStoredProcedure(plantCode, rfqId, purchaseGroup, buyerId);

                for (OpenRfqReportBean log : logs) {
                    JSONObject obj = new JSONObject();

                    obj.put("RfqNumber", log.getRFQNumber());
                    obj.put("PendingWith", log.getBuyerName());
                    obj.put("TotalPrLines", log.getTotalPRLine());
                    obj.put("PrNumber", log.getPRNumber());
                    obj.put("VendorCount", log.getVendorCount());
                    obj.put("VendorSelected", log.getVendorSelected());
                    obj.put("VendorResponseCount", log.getVendorRespCount());
                    obj.put("AgeingInDays", log.getAgeingInDays());

                    jArra.put(obj);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getUserEmailById")) {
                System.out.println("getUserEmailById");
                out = response.getWriter();

                String userName = request.getParameter("UserId");

                System.out.println("userName: " + userName);

                List<QueryUser> queryUserObj = findEmailByUaserName(userName);

                JSONObject innerJsonObj = new JSONObject();
//                
                for (QueryUser lineItemObj : queryUserObj) {

                    innerJsonObj.put("EMAILID", lineItemObj.getMailId());
                }
//                
//                jArra.put(innerJsonObj);

                System.out.println("length :" + jArra.length());

                jObj.put("Data", innerJsonObj);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("rejectPRFromAfterRfqCreation")) {
                System.out.println("rejectPRFromAfterRfqCreation");
                out = response.getWriter();

                String rejectReason = request.getParameter("rejectreason");
                String rejectcomments = request.getParameter("rejectcomments");
                String rejectprDoc = request.getParameter("rejectprdoc");
                String wiNumber = request.getParameter("wiNumber");
                String linkId = request.getParameter("linkId");
                String rfqid = request.getParameter("rfqid");

                System.out.println("rejectReason: " + rejectReason);
                System.out.println("rejectcomments: " + rejectcomments);
                System.out.println("rejectprDoc: " + rejectprDoc);
                System.out.println("wiNumber: " + wiNumber);
                System.out.println("linkId: " + linkId);
                System.out.println("rfqid: " + rfqid);

                String status = rejectPR(wiNumber, linkId, rejectReason, rejectcomments, rejectprDoc);
//                String status = "0";

                if (status != null && status.equals("0")) {
                    WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(rfqid));
                    rfqHeaderObj.setRfqstatus("Reject");
                    updateRfqHeader(rfqHeaderObj);
                }

                jObj.put("Result", status);

//                jObj.put("Result", "Ok");
                out.println(jObj);

            } else if (reqFrom.equalsIgnoreCase("getVendorBySno")) {
                System.out.println("getVendorBySno");
                out = response.getWriter();
                String sno = request.getParameter("sno");
                System.out.println("sno in getVendorBySno: " + sno);
                MasterVendor vendor = getVendorBySno(Integer.parseInt(sno));
                JSONObject obj = new JSONObject();
                jObj.put("NAME", vendor.getVendorName() == null ? "" : vendor.getVendorName());
                jObj.put("SCHEMA_GROUP", vendor.getSchemaGroup() == null ? "" : vendor.getSchemaGroup());
                jObj.put("VENDORCODE", vendor.getVendorCode() == null ? "" : vendor.getVendorCode());
                jObj.put("VENDORADDRESS", vendor.getVendorAddress() == null ? "" : vendor.getVendorAddress());
                jObj.put("PAYMENTTERM", vendor.getPaymentTerm() == null ? "" : vendor.getPaymentTerm());
                jObj.put("CITY", vendor.getCity() == null ? "" : vendor.getCity());
                jObj.put("COUNTRY", vendor.getCountry() == null ? "" : vendor.getCountry());
                jObj.put("POSTAL_CODE", vendor.getPostalCode() == null ? "" : vendor.getPostalCode());
                jObj.put("CONTACT", vendor.getContactNo() == null ? "" : vendor.getContactNo());
                jObj.put("PURCHASE_ORG", vendor.getPurOrg() == null ? "" : vendor.getPurOrg());
                jObj.put("PAYMENT_TERM", vendor.getPaymentTerm() == null ? "" : vendor.getPaymentTerm());
                jObj.put("ADDRESS1", vendor.getAddress1() == null ? "" : vendor.getAddress1());
                jObj.put("ADDRESS2", vendor.getAddress2() == null ? "" : vendor.getAddress2());
                jObj.put("ADDRESS3", vendor.getAddress3() == null ? "" : vendor.getAddress3());
                jObj.put("STREET", vendor.getStreet() == null ? "" : vendor.getStreet());
                jObj.put("COUNTRY_CODE", vendor.getCountryCode() == null ? "" : vendor.getCountryCode());
                jObj.put("INCO_TERM1", vendor.getIncoTerm1() == null ? "" : vendor.getIncoTerm1());
                jObj.put("INCO_TERM2", vendor.getIncoTerm2() == null ? "" : vendor.getIncoTerm2());
                jObj.put("FAX_EXT", vendor.getFaxExt() == null ? "" : vendor.getFaxExt());
                jObj.put("FAX_NO", vendor.getFaxNo() == null ? "" : vendor.getFaxNo());
                jObj.put("EMAILID", vendor.getMailId() == null ? "" : vendor.getMailId());
                jObj.put("REGNO", vendor.getRegistrationNo() == null ? "" : vendor.getRegistrationNo());

                String schemaGroup = vendor.getSchemaGroup();
                String purOrg = vendor.getPurOrg();
                System.out.println("schemaGroup :" + schemaGroup);
                System.out.println("purOrg :" + purOrg);
                List<SchemaGroupPurOrgMapping> schemaGroupPurOrgMappingList = findKalsmBySchemaGroupAndPurchaseOrg(schemaGroup, purOrg);
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
            } else if (reqFrom.equalsIgnoreCase("getServiceMasterByServiceNumber")) {
                System.out.println("getServiceMasterByServiceNumber");
                out = response.getWriter();

                String ServiceNumber = request.getParameter("ServiceNumber");

                System.out.println("ServiceNumber in getServiceMasterByServiceNumber: " + ServiceNumber);

                List<MasterServiceMaster> serviceList = getServiceMasterByServiceNumber(ServiceNumber);
                System.out.println("Size in getServiceMasterByServiceNumber: " + serviceList.size());
                if (!serviceList.isEmpty()) {
                    MasterServiceMaster serviceObj = serviceList.get(0);
                    System.out.println("Short Text :" + serviceObj.getShortText());
                    JSONObject obj = new JSONObject();
                    jObj.put("SHORTTEXT", serviceObj.getShortText());
                    jObj.put("UNIT", serviceObj.getUnitOfMeasure());
                    jObj.put("GLCODE", serviceObj.getGLCode());
                    jObj.put("ZGLCODE", serviceObj.getzGLCode());
                    jObj.put("SLTextInfo", serviceObj.getSLTextInfo());
                    jObj.put("SIZE", serviceList.size());

                } else {
                    jObj.put("SIZE", serviceList.size());
                }

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getFromCostCenter")) {
                System.out.println("getFromCostCenter");
                out = response.getWriter();
                String costCenter = request.getParameter("costCenter");
                System.out.println("costCenter in getFromCostCenter: " + costCenter);
                List<MasterCostCentre> costCenterList = getMasterCostCenterByCostCenter(costCenter);
                MasterCostCentre costCenterObj = costCenterList.get(0);
                System.out.println("Fund :" + costCenterObj.getFund());
                System.out.println("Fund Center :" + costCenterObj.getFundCenter());
                System.out.println("Functional Area :" + costCenterObj.getFunctionalArea());
                //System.out.println("Commitment Item :" + costCenterObj.getCommitmentItem());
                System.out.println("CO Area :" + costCenterObj.getControllingArea());
                JSONObject obj = new JSONObject();
                jObj.put("FUND", costCenterObj.getFund());
                jObj.put("FUNDCENTER", costCenterObj.getFundCenter());
                jObj.put("FUNCTIONALAREA", costCenterObj.getFunctionalArea());
                //jObj.put("COMMITMENTITEM", costCenterObj.getCommitmentItem());
                jObj.put("COAREA", costCenterObj.getControllingArea());
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getFundFMAreaByComCode")) {
                System.out.println("getFundFMAreaByComCode");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode in getFundFMAreaByComCode: " + companyCode);

                List<MasterFundFMArea> fundList = getFundFMAreaByComCode(companyCode);
                System.out.println("fundList :" + fundList.size());

                if (!fundList.isEmpty()) {
                    MasterFundFMArea fundObj = fundList.get(0);
                    System.out.println("Fund :" + fundObj.getFund());

                    jObj.put("FUND", fundObj.getFund());
                    jObj.put("DESCRIPTION", fundObj.getDescription());
                } else {
                    jObj.put("FUND", "");
                    jObj.put("DESCRIPTION", "");
                }

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("DeassociatePrLineFromRfq")) {
                System.out.println("DeassociatePrLineFromRfq");
                out = response.getWriter();
                String rfqLineId = request.getParameter("rfqLineId");

                System.out.println("rfqLineId: " + rfqLineId);
                WorkOrderRfqLineItem rfqLineObj = findWorkOrderLineItemByRfqLineId(Integer.parseInt(rfqLineId));
                int rfqId = rfqLineObj.getBPaasWorkOrderRFQHeaderRFQID().getRfqid();
                System.out.println("rfqId: " + rfqId);
                NewgenPRLineItem newgenPR = rfqLineObj.getNgBpNewgenPRLineItemId();
                newgenPR.setBpQuantityRemaining((Integer.parseInt(newgenPR.getBpQuantityRemaining()) + rfqLineObj.getQuantity()) + "");
                updatePrLineItemNG(newgenPR);

                rfqLineObj.setStatus("Deassociate");
                updateRfqHeaderLineItem(rfqLineObj);

                List<WorkOrderRfqLineItem> workOrderRfqLineItemList = rfqRfpWsUtil.findWorkOrderByRfqIdAnsStatusNot(rfqId, "Deassociate");
                System.out.println("workOrderRfqLineItemList size: " + workOrderRfqLineItemList.size());
                if (workOrderRfqLineItemList.isEmpty()) {
                    WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(rfqId);
                    rfqHeaderObj.setRfqstatus("Reject");
                    updateRfqHeader(rfqHeaderObj);
                }

                jObj.put("Result", "Success");
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("GetDocumentsFromWorkOrderAttTemp")) {
                System.out.println("GetDocumentsFromWorkOrderAttTemp");
                out = response.getWriter();

                String prAttTempId = request.getParameter("prAttTempId");
                System.out.println("prAttTempId: " + prAttTempId);

                WorkOrderAttachmentTemp Attachment = findPrLineItemTempAttachmentById(Integer.parseInt(prAttTempId));
                System.out.println("Attachment: " + Attachment);

                jObj.put("Att1", Attachment.getAttachment1name());
                jObj.put("Att2", Attachment.getAttachment2name());
                jObj.put("Att3", Attachment.getAttachment3name());
                jObj.put("Att4", Attachment.getAttachment4name());
                jObj.put("Att5", Attachment.getAttachment5name());

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("GetDocumentsFromContractAttTemp")) {
                System.out.println("GetDocumentsFromContractAttTemp");
                out = response.getWriter();

                String contractAttTempId = request.getParameter("contractAttTempId");
                System.out.println("contractAttTempId: " + contractAttTempId);

                ContractAttachmentTemp Attachment = findContractLineItemTempAttachmentById(Integer.parseInt(contractAttTempId));
                System.out.println("Attachment: " + Attachment);

                jObj.put("Att1", Attachment.getAttachment1name());
                jObj.put("Att2", Attachment.getAttachment2name());
                jObj.put("Att3", Attachment.getAttachment3name());
                jObj.put("Att4", Attachment.getAttachment4name());
                jObj.put("Att5", Attachment.getAttachment5name());

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("DeleteDocumentsFromWorkOrderAttTemp")) {
                System.out.println("DeleteDocumentsFromWorkOrderAttTemp");
                out = response.getWriter();

                String attId = request.getParameter("attId");
                String attNo = request.getParameter("attNo");
                System.out.println("attId: " + attId);
                System.out.println("attNo: " + attNo);

                WorkOrderAttachmentTemp Attachment = findPrLineItemTempAttachmentById(Integer.parseInt(attId));
                System.out.println("Attachment: " + Attachment);

                if (attNo != null) {
                    if (attNo.equalsIgnoreCase("DeleteAtt1")) {
                        Attachment.setAttachment1(null);
                        Attachment.setAttachment1name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt2")) {
                        Attachment.setAttachment2(null);
                        Attachment.setAttachment2name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt3")) {
                        Attachment.setAttachment3(null);
                        Attachment.setAttachment3name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt4")) {
                        Attachment.setAttachment4(null);
                        Attachment.setAttachment4name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt5")) {
                        Attachment.setAttachment5(null);
                        Attachment.setAttachment5name(null);
                    }

                    updateWorkOrderAttachmentTemp(Attachment);
                }

                jObj.put("Result", "Deleted");

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("DeleteDocumentsFromContractAttTemp")) {
                System.out.println("DeleteDocumentsFromContractAttTemp");
                out = response.getWriter();

                String attId = request.getParameter("attId");
                String attNo = request.getParameter("attNo");
                System.out.println("attId: " + attId);
                System.out.println("attNo: " + attNo);

                ContractAttachmentTemp Attachment = findContractLineItemTempAttachmentById(Integer.parseInt(attId));
                System.out.println("Attachment: " + Attachment);

                if (attNo != null) {
                    if (attNo.equalsIgnoreCase("DeleteAtt1")) {
                        Attachment.setAttachment1(null);
                        Attachment.setAttachment1name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt2")) {
                        Attachment.setAttachment2(null);
                        Attachment.setAttachment2name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt3")) {
                        Attachment.setAttachment3(null);
                        Attachment.setAttachment3name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt4")) {
                        Attachment.setAttachment4(null);
                        Attachment.setAttachment4name(null);

                    } else if (attNo.equalsIgnoreCase("DeleteAtt5")) {
                        Attachment.setAttachment5(null);
                        Attachment.setAttachment5name(null);
                    }

                    updateContractAttachmentTemp(Attachment);
                }

                jObj.put("Result", "Deleted");

                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("PurchaseRequestStatusReport")) {
                System.out.println("PurchaseRequestStatusReport");
                out = response.getWriter();
                DateFormat formatFrom = new SimpleDateFormat("dd.MM.yyyy");
                DateFormat formatTo = new SimpleDateFormat("MM-dd-yyyy");

                String PlantCode = request.getParameter("PlantCode");
                String PrNo = request.getParameter("PrNo");
                String PurchaseGroup = request.getParameter("PurchaseGroup");
                String PRRaisedBy = request.getParameter("PRRaisedBy");
                String fromPRApprovedDate = request.getParameter("FromPRApprovedDate");
                String toPRApprovedDate = request.getParameter("ToPRApprovedDate");
                String fromRequiredDate = request.getParameter("FromRequiredDate");
                String toRequiredDate = request.getParameter("ToRequiredDate");
                String TrackingNumber = request.getParameter("TrackingNumber");
                String ProcessingStatus = request.getParameter("ProcessingStatus");
                String ToPlantCode = request.getParameter("ToPlantCode");
                String ToPrNo = request.getParameter("ToPrNo");
                String ToPurchaseGroup = request.getParameter("ToPurchaseGroup");
                String MaterialCode = request.getParameter("MaterialCode");

                System.out.println("PlantCode: " + PlantCode);
                System.out.println("PrNo: " + PrNo);
                System.out.println("PurchaseGroup: " + PurchaseGroup);
                System.out.println("PRRaisedBy: " + PRRaisedBy);
                System.out.println("FromPRApprovedDate: " + fromPRApprovedDate);
                System.out.println("ToPRApprovedDate: " + toPRApprovedDate);
                System.out.println("FromRequiredDate: " + fromRequiredDate);
                System.out.println("ToRequiredDate: " + toRequiredDate);
                System.out.println("TrackingNumber: " + TrackingNumber);
                System.out.println("ProcessingStatus: " + ProcessingStatus);
                System.out.println("ToPlantCode: " + ToPlantCode);
                System.out.println("ToPrNo: " + ToPrNo);
                System.out.println("ToPurchaseGroup: " + ToPurchaseGroup);
                System.out.println("MaterialCode: " + MaterialCode);

                if (fromPRApprovedDate != null && !fromPRApprovedDate.trim().equalsIgnoreCase("")) {
                    try {
                        Date fromPRApproved_date = formatFrom.parse(fromPRApprovedDate);
                        fromPRApprovedDate = formatTo.format(fromPRApproved_date);
                        System.out.println("fromPRApproved_date: " + fromPRApprovedDate);
                    } catch (ParseException e) {
                        System.out.println(e);
                    }
                }
                if (toPRApprovedDate != null && !toPRApprovedDate.trim().equalsIgnoreCase("")) {
                    try {
                        Date toPRApproved_date = formatFrom.parse(toPRApprovedDate);
                        toPRApprovedDate = formatTo.format(toPRApproved_date);
                        System.out.println("toPRApproved_date: " + toPRApprovedDate);
                    } catch (ParseException e) {
                        System.out.println(e);
                    }
                }
                if (fromRequiredDate != null && !fromRequiredDate.trim().equalsIgnoreCase("")) {
                    try {
                        Date fromPRApproved_date = formatFrom.parse(fromRequiredDate);
                        fromRequiredDate = formatTo.format(fromPRApproved_date);
                        System.out.println("fromRequiredDate: " + fromRequiredDate);
                    } catch (ParseException e) {
                        System.out.println(e);
                    }
                }
                if (toRequiredDate != null && !toRequiredDate.trim().equalsIgnoreCase("")) {
                    try {
                        Date toPRApproved_date = formatFrom.parse(toRequiredDate);
                        toRequiredDate = formatTo.format(toPRApproved_date);
                        System.out.println("toRequiredDate: " + toRequiredDate);
                    } catch (ParseException e) {
                        System.out.println(e);
                    }
                }

                List<PurchaseRequestStatusReportBean> prStatusBeanlist = callPurchaseRequestStatusReportStoredProcedure(PlantCode, PrNo, PurchaseGroup, PRRaisedBy, fromPRApprovedDate, toPRApprovedDate, fromRequiredDate, toRequiredDate, TrackingNumber, ProcessingStatus, ToPlantCode, ToPrNo, ToPurchaseGroup, MaterialCode);

                System.out.println("prStatusBeanlist size: " + prStatusBeanlist.size());
                for (PurchaseRequestStatusReportBean bean : prStatusBeanlist) {
                    JSONObject jsonObj = new JSONObject();

                    jsonObj.put("DeptDesc", bean.getDepartmentDescription());

                    if (bean.getCompanyCode() != null) {
                        jsonObj.put("CompCode", bean.getCompanyCode());
                    } else {
                        jsonObj.put("CompCode", "");
                    }
                    if (bean.getPurchaseRequestNumber() != null) {
                        jsonObj.put("PRNo", bean.getPurchaseRequestNumber());
                    } else {
                        jsonObj.put("PRNo", "");
                    }
                    if (bean.getApproverName() != null) {
                        jsonObj.put("ApprovedBy", bean.getApproverName());
                    } else {
                        jsonObj.put("ApprovedBy", "");
                    }
                    if (bean.getApprovedDate() != null) {
                        jsonObj.put("ApprovedDate", bean.getApprovedDate());
                    } else {
                        jsonObj.put("ApprovedDate", "");
                    }
                    if (bean.getDeliveryDate() != null) {
                        jsonObj.put("DeliveryDate", bean.getDeliveryDate());
                    } else {
                        jsonObj.put("DeliveryDate", "");
                    }
                    if (bean.getItemNumber() != null) {
                        jsonObj.put("ItemNumber", bean.getItemNumber());
                    } else {
                        jsonObj.put("ItemNumber", "");
                    }
                    if (bean.getPlant() != null) {
                        jsonObj.put("Plant", bean.getPlant());
                    } else {
                        jsonObj.put("Plant", "");
                    }
                    if (bean.getMaterialCode() != null) {
                        jsonObj.put("MaterialCode", bean.getMaterialCode());
                    } else {
                        jsonObj.put("MaterialCode", "");
                    }
                    if (bean.getShortText() != null) {
                        jsonObj.put("ShortText", bean.getShortText());
                    } else {
                        jsonObj.put("ShortText", "");
                    }
                    if (bean.getUnit() != null) {
                        jsonObj.put("Unit", bean.getUnit());
                    } else {
                        jsonObj.put("Unit", "");
                    }
                    if (bean.getQuantity() != null) {
                        jsonObj.put("Quantity", bean.getQuantity());
                    } else {
                        jsonObj.put("Quantity", "");
                    }
                    if (bean.getCurrency() != null) {
                        jsonObj.put("Currency", bean.getCurrency());
                    } else {
                        jsonObj.put("Currency", "");
                    }
                    if (bean.getPriceUnit() != null) {
                        jsonObj.put("PriceUnit", bean.getPriceUnit());
                    } else {
                        jsonObj.put("PriceUnit", "");
                    }
                    if (bean.getItemText() != null) {
                        jsonObj.put("ItemText", bean.getItemText());
                    } else {
                        jsonObj.put("ItemText", "");
                    }
                    if (bean.getMaterialPOText() != null) {
                        jsonObj.put("MaterialPOText", bean.getMaterialPOText());
                    } else {
                        jsonObj.put("MaterialPOText", "");
                    }
                    if (bean.getRequisitionDate() != null) {
                        jsonObj.put("RequisitionDate", bean.getRequisitionDate());
                    } else {
                        jsonObj.put("RequisitionDate", "");
                    }
                    if (bean.getStorageLocation() != null) {
                        jsonObj.put("StorageLocation", bean.getStorageLocation());
                    } else {
                        jsonObj.put("StorageLocation", "");
                    }
                    if (bean.getItemNote() != null) {
                        jsonObj.put("ItemNote", bean.getItemNote());
                    } else {
                        jsonObj.put("ItemNote", "");
                    }
                    if (bean.getOverDue() != null) {
                        jsonObj.put("Overdue", bean.getOverDue());
                    } else {
                        jsonObj.put("Overdue", "");
                    }
                    if (bean.getLocalPurchase() != null) {
                        jsonObj.put("LocalPurchase", bean.getLocalPurchase());
                    } else {
                        jsonObj.put("LocalPurchase", "");
                    }
                    if (bean.getLeadTime() != null) {
                        jsonObj.put("LeadTime", bean.getLeadTime());
                    } else {
                        jsonObj.put("LeadTime", "");
                    }
                    if (bean.getHeaderNote() != null) {
                        jsonObj.put("HeaderNote", bean.getHeaderNote());
                    } else {
                        jsonObj.put("HeaderNote", "");
                    }
                    if (bean.getOldMaterialCode() != null) {
                        jsonObj.put("OldMaterialCode", bean.getOldMaterialCode());
                    } else {
                        jsonObj.put("OldMaterialCode", "");
                    }
                    if (bean.getUomStore() != null) {
                        jsonObj.put("UOMStore", bean.getUomStore());
                    } else {
                        jsonObj.put("UOMStore", "");
                    }

                    jArra.put(jsonObj);
                }
                out.println(jArra);
            } //Ram
            else if (reqFrom.equalsIgnoreCase("SowRequestStatusReport")) {
                System.out.println("SowRequestStatusReport");
                String fromPlantCode = request.getParameter("fromPlantCode");
                String toPlantCode = request.getParameter("toPlantCode");
                String fromSowNo = request.getParameter("fromSowNo");
                String toSowNo = request.getParameter("toSowNo");
                String fromPurchaseGroup = request.getParameter("fromPurchaseGroup");
                String toPurchaseGroup = request.getParameter("toPurchaseGroup");
                String sowRaisedBy = request.getParameter("sowRaisedBy");
                String fromSowApprovedDate = request.getParameter("fromSowApprovedDate");
                String toSowApprovedDate = request.getParameter("toSowApprovedDate");
                String processingStatusSow = request.getParameter("processingStatusSow");
                String olaNumber = request.getParameter("olaNumber");
                String fromMSGroup = request.getParameter("fromMSGroup");
                String toMSGroup = request.getParameter("toMSGroup");
                String mSNumber = request.getParameter("mSNumber");
                String contractRaisedBy = request.getParameter("contractRaisedBy");
                String fromContractApprovedDate = request.getParameter("fromContractApprovedDate");
                String toContractApprovedDate = request.getParameter("toContractApprovedDate");
                String processingStatusContract = request.getParameter("processingStatusContract");

                List<ContractReportBean> sowResuestStatusBeanList = callSowRequestStatusReportStoredProcedure(fromPlantCode, toPlantCode, fromSowNo, toSowNo, fromPurchaseGroup, toPurchaseGroup, sowRaisedBy, fromSowApprovedDate, toSowApprovedDate, processingStatusSow, olaNumber, fromMSGroup, toMSGroup, mSNumber, contractRaisedBy, fromContractApprovedDate, toContractApprovedDate, processingStatusContract);
                System.out.println("SowStatusBeanlist size: " + sowResuestStatusBeanList.size());
                for (ContractReportBean bean : sowResuestStatusBeanList) {
                    JSONObject jsonObj = new JSONObject();

                    //jsonObj.put("CoCode", bean.getCoCode());
                    if (bean.getCoCode() != null) {
                        jsonObj.put("CoCode", bean.getCoCode());
                    } else {
                        jsonObj.put("CoCode", "");
                    }

                    if (bean.getContractNumber() != null) {
                        jsonObj.put("ContractNo", bean.getContractNumber());
                    } else {
                        jsonObj.put("ContractNo", "");
                    }

                    if (bean.getContractTitle() != null) {
                        jsonObj.put("ContactTitle", bean.getContractTitle());
                    } else {
                        jsonObj.put("ContactTitle", "");
                    }

                    if (bean.getCurrentStatus() != null) {
                        jsonObj.put("CurrentStatus", bean.getCurrentStatus());
                    } else {
                        jsonObj.put("CurrentStatus", "");
                    }

                    if (bean.getServiceNumber() != null) {
                        jsonObj.put("ServiceNo", bean.getServiceNumber());
                    } else {
                        jsonObj.put("ServiceNo", "");
                    }

                    if (bean.getServiceGroup() != null) {
                        jsonObj.put("ServiceGroup", bean.getServiceGroup());
                    } else {
                        jsonObj.put("ServiceGroup", "");
                    }

                    if (bean.getOlaNumber() != null) {
                        jsonObj.put("OlaNo", bean.getOlaNumber());
                    } else {
                        jsonObj.put("OlaNo", "");
                    }

                    if (bean.getContractApprovedDate() != null) {
                        jsonObj.put("ContractAppDate", bean.getContractApprovedDate());
                    } else {
                        jsonObj.put("ContractAppDate", "");
                    }

                    if (bean.getAgeing() != null) {
                        jsonObj.put("Ageing", bean.getAgeing());
                    } else {
                        jsonObj.put("Ageing", "");
                    }

                    if (bean.getVendorName() != null) {
                        jsonObj.put("VendorName", bean.getVendorName());
                    } else {
                        jsonObj.put("VendorName", "");
                    }

                    if (bean.getValidityStartDate() != null) {
                        jsonObj.put("ValidityStartDate", bean.getValidityStartDate());
                    } else {
                        jsonObj.put("ValidityStartDate", "");
                    }

                    if (bean.getValidityEndDate() != null) {
                        jsonObj.put("ValidityEndDate", bean.getValidityEndDate());
                    } else {
                        jsonObj.put("ValidityEndDate", "");
                    }

                    if (bean.getVendorName() != null) {
                        jsonObj.put("VendorName", bean.getVendorName());
                    } else {
                        jsonObj.put("VendorName", "");
                    }

                    if (bean.getDifferential() != null) {
                        jsonObj.put("Differential", bean.getDifferential());
                    } else {
                        jsonObj.put("Differential", "");
                    }
                    jArra.put(jsonObj);
                }
                out.println(jArra);
            } //Ram
            //Ram
            else if (reqFrom.equalsIgnoreCase("ContractStatusReport")) {
                System.out.println("ContractStatusReport");
                String fromPlantCode = request.getParameter("fromPlantCode");
                String toPlantCode = request.getParameter("toPlantCode");
                String fromContractNo = request.getParameter("fromSowNo");
                String toContractNo = request.getParameter("toSowNo");
                String fromPurchaseGroup = request.getParameter("fromPurchaseGroup");
                String toPurchaseGroup = request.getParameter("toPurchaseGroup");
                String contractRaisedBy = request.getParameter("contractRaisedBy");
                String fromContractApprovedDate = request.getParameter("fromContractApprovedDate");
                String toContractApprovedDate = request.getParameter("toContractApprovedDate");
                String processingStatusContract = request.getParameter("processingStatusContract");

                List<ContractReportBean> contractStatusBeanList = callContractStatusReportStoredProcedure(fromPlantCode, toPlantCode, fromContractNo, toContractNo, fromPurchaseGroup, toPurchaseGroup, contractRaisedBy, fromContractApprovedDate, toContractApprovedDate, processingStatusContract);
                System.out.println("ContractStatusBeanlist size: " + contractStatusBeanList.size());

                for (ContractReportBean bean : contractStatusBeanList) {
                    JSONObject jsonObj = new JSONObject();

                    if (bean.getCoCode() != null) {
                        jsonObj.put("CoCode", bean.getCoCode());
                    } else {
                        jsonObj.put("CoCode", "");
                    }

                    if (bean.getContractNumber() != null) {
                        jsonObj.put("ContractNo", bean.getContractNumber());
                    } else {
                        jsonObj.put("ContractNo", "");
                    }

                    if (bean.getItemCode() != null) {
                        jsonObj.put("ItemCode", bean.getItemCode());
                    } else {
                        jsonObj.put("ItemCode", "");
                    }

                    if (bean.getActivationdate() != null) {
                        jsonObj.put("Activationdate", bean.getActivationdate());
                    } else {
                        jsonObj.put("Activationdate", "");
                    }

                    if (bean.getCostCentre() != null) {
                        jsonObj.put("CostCentre", bean.getCostCentre());
                    } else {
                        jsonObj.put("CostCentre", "");
                    }

                    if (bean.getContractCode() != null) {
                        jsonObj.put("ContractCode", bean.getContractCode());
                    } else {
                        jsonObj.put("ContractCode", "");
                    }

                    if (bean.getWorkmenCompensation() != null) {
                        jsonObj.put("WorkmenCompensation", bean.getWorkmenCompensation());
                    } else {
                        jsonObj.put("WorkmenCompensation", "");
                    }

                    if (bean.getPublicLiablity() != null) {
                        jsonObj.put("PublicLiablity", bean.getPublicLiablity());
                    } else {
                        jsonObj.put("PublicLiablity", "");
                    }

                    if (bean.getAgeing() != null) {
                        jsonObj.put("Ageing", bean.getAgeing());
                    } else {
                        jsonObj.put("Ageing", "");
                    }

                    if (bean.getBankerGuarantee() != null) {
                        jsonObj.put("BankerGuarantee", bean.getBankerGuarantee());
                    } else {
                        jsonObj.put("BankerGuarantee", "");
                    }

                    if (bean.getSafeCertificate() != null) {
                        jsonObj.put("SafeCertificate", bean.getSafeCertificate());
                    } else {
                        jsonObj.put("SafeCertificate", "");
                    }

                    if (bean.getRiskAssessment() != null) {
                        jsonObj.put("RiskAssessment", bean.getRiskAssessment());
                    } else {
                        jsonObj.put("RiskAssessment", "");
                    }

                    if (bean.getDifferential() != null) {
                        jsonObj.put("Differential", bean.getDifferential());
                    } else {
                        jsonObj.put("Differential", "");
                    }

                    if (bean.getValidityStartDate() != null) {
                        jsonObj.put("ValidityStartDate", bean.getValidityStartDate());
                    } else {
                        jsonObj.put("ValidityStartDate", "");
                    }

                    if (bean.getValidityEndDate() != null) {
                        jsonObj.put("ValidityEndDate", bean.getValidityEndDate());
                    } else {
                        jsonObj.put("ValidityEndDate", "");
                    }
                    jArra.put(jsonObj);
                }
                out.println(jArra);
            } //Ram
            //Ram
            else if (reqFrom.equalsIgnoreCase("AuditLogReport")) {
                System.out.println("AuditLogReport");
                String buyerId = request.getParameter("buyerId");
                String fromDate = request.getParameter("fromDate");
                String toDate = request.getParameter("toDate");

                List<ContractReportBean> auditLogBeanList = callAuditLogReportStoredProcedure(buyerId, fromDate, toDate);
                System.out.println("ContractStatusBeanlist size: " + auditLogBeanList.size());

                for (ContractReportBean bean : auditLogBeanList) {
                    JSONObject jsonObj = new JSONObject();

                    if (bean.getActivityPerformed() != null) {
                        jsonObj.put("ActivityPerformed", bean.getActivityPerformed());
                    } else {
                        jsonObj.put("ActivityPerformed", "");
                    }

                    if (bean.getDateTime() != null) {
                        jsonObj.put("DateTime", bean.getDateTime());
                    } else {
                        jsonObj.put("DateTime", "");
                    }

                    if (bean.getUserName() != null) {
                        jsonObj.put("UserName", bean.getUserName());
                    } else {
                        jsonObj.put("UserName", "");
                    }

                    if (bean.getBuyerName() != null) {
                        jsonObj.put("BuyerName", bean.getBuyerName());
                    } else {
                        jsonObj.put("BuyerName", "");
                    }
                    jArra.put(jsonObj);
                }
                out.println(jArra);
                //Ram
            } //Ram
            else if (reqFrom.equalsIgnoreCase("ContractAckReport")) {
                System.out.println("ContractAckReport");
                String contractAckVendorCode = request.getParameter("contractAckVendorCode");
                String contractAckFromDate = request.getParameter("contractAckFromDate");
                String contractAckToDate = request.getParameter("contractAckToDate");

                List<ContractReportBean> contractAckBeanList = callContractAckReportStoredProcedure(contractAckVendorCode, contractAckFromDate, contractAckToDate);
                System.out.println("ContractStatusBeanlist size: " + contractAckBeanList.size());

                for (ContractReportBean bean : contractAckBeanList) {
                    JSONObject jsonObj = new JSONObject();

                    if (bean.getContractNumber() != null) {
                        jsonObj.put("ContractNumber", bean.getContractNumber());
                    } else {
                        jsonObj.put("ContractNumber", "");
                    }

                    if (bean.getContractAckVendor() != null) {
                        jsonObj.put("ContractAckVendor", bean.getContractAckVendor());
                    } else {
                        jsonObj.put("ContractAckVendor", "");
                    }

                    if (bean.getContractAckBuyer() != null) {
                        jsonObj.put("ContractAckBuyer", bean.getContractAckBuyer());
                    } else {
                        jsonObj.put("ContractAckBuyer", "");
                    }

                    if (bean.getContractNotAck() != null) {
                        jsonObj.put("ContractNotAck", bean.getContractNotAck());
                    } else {
                        jsonObj.put("ContractNotAck", "");
                    }
                    jArra.put(jsonObj);
                }
                out.println(jArra);
                //Ram
            } //Ram
            else if (reqFrom.equalsIgnoreCase("ContractLineCycleReport")) {
                System.out.println("ContractLineCycleReport");
                String contractLRFromDate = request.getParameter("contractLRFromDate");
                String contractLRToDate = request.getParameter("contractLRToDate");
                String contractLRBuyerId = request.getParameter("contractLRBuyerId");
                String contractLRVendorID = request.getParameter("contractLRVendorID");

                List<ContractReportBean> contractLineBeanList = callContractLineCycleReportStoredProcedure(contractLRFromDate, contractLRToDate, contractLRBuyerId, contractLRVendorID);
                System.out.println("ContractStatusBeanlist size: " + contractLineBeanList.size());

                for (ContractReportBean bean : contractLineBeanList) {
                    JSONObject jsonObj = new JSONObject();

                    if (bean.getContractNumber() != null) {
                        jsonObj.put("ContractNumber", bean.getContractNumber());
                    } else {
                        jsonObj.put("ContractNumber", "");
                    }

                    if (bean.getContractTitle() != null) {
                        jsonObj.put("ContractTitle", bean.getContractTitle());
                    } else {
                        jsonObj.put("ContractTitle", "");
                    }

                    if (bean.getMatieralServiceNo() != null) {
                        jsonObj.put("MatieralServiceNo", bean.getMatieralServiceNo());
                    } else {
                        jsonObj.put("MatieralServiceNo", "");
                    }

                    if (bean.getVendorName() != null) {
                        jsonObj.put("VendorName", bean.getVendorName());
                    } else {
                        jsonObj.put("VendorName", "");
                    }

                    if (bean.getOlaNumber() != null) {
                        jsonObj.put("OlaNumber", bean.getOlaNumber());
                    } else {
                        jsonObj.put("OlaNumber", "");
                    }

                    if (bean.getContractInitiatedDate() != null) {
                        jsonObj.put("ContractInitiatedDate", bean.getContractInitiatedDate());
                    } else {
                        jsonObj.put("ContractInitiatedDate", "");
                    }

                    if (bean.getContractApprovedDate() != null) {
                        jsonObj.put("ContractApprovedDate", bean.getContractApprovedDate());
                    } else {
                        jsonObj.put("ContractApprovedDate", "");
                    }

                    if (bean.getCycleTime() != null) {
                        jsonObj.put("CycleTime", bean.getCycleTime());
                    } else {
                        jsonObj.put("CycleTime", "");
                    }
                    jArra.put(jsonObj);
                }
                out.println(jArra);
                //Ram
            } //Ram
            else if (reqFrom.equalsIgnoreCase("ContractVersioningReport")) {
                System.out.println("ContractVersioningReport");
                String contractVRNo = request.getParameter("contractVRNo");
                String contractVROlaNo = request.getParameter("contractVROlaNo");

                List<ContractReportBean> contractVersioningBeanList = callContractVersioningReportStoredProcedure(contractVRNo, contractVROlaNo);
                // List<ContractReportBean> contractVersioningBeanList = null;
                System.out.println("ContractStatusBeanlist size: " + contractVersioningBeanList.size());

                for (ContractReportBean bean : contractVersioningBeanList) {
                    JSONObject jsonObj = new JSONObject();

                    if (bean.getContractNumber() != null) {
                        jsonObj.put("ContractNumber", bean.getContractNumber());
                    } else {
                        jsonObj.put("ContractNumber", "");
                    }

                    if (bean.getOlaNumber() != null) {
                        jsonObj.put("OlaNumber", bean.getOlaNumber());
                    } else {
                        jsonObj.put("OlaNumber", "");
                    }

                    if (bean.getSupplierContractor() != null) {
                        jsonObj.put("SupplierContractor", bean.getSupplierContractor());
                    } else {
                        jsonObj.put("SupplierContractor", "");
                    }

                    if (bean.getContractTitle() != null) {
                        jsonObj.put("ContractTitle", bean.getContractTitle());
                    } else {
                        jsonObj.put("ContractTitle", "");
                    }

                    if (bean.getVersion() != null) {
                        jsonObj.put("Version", bean.getVersion());
                    } else {
                        jsonObj.put("Version", "");
                    }

                    if (bean.getModifiedBy() != null) {
                        jsonObj.put("ModifiedBy", bean.getModifiedBy());
                    } else {
                        jsonObj.put("ModifiedBy", "");
                    }

                    if (bean.getModifiedOn() != null) {
                        jsonObj.put("ModifiedOn", bean.getModifiedOn());
                    } else {
                        jsonObj.put("ModifiedOn", "");
                    }

                    jArra.put(jsonObj);
                }
                out.println(jArra);
                //Ram
            } else if (reqFrom.equalsIgnoreCase("UpdateBuyerBaselinePrice")) {
                System.out.println("UpdateBuyerBaselinePrice");
                out = response.getWriter();

                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");
                String insertionOrderId = request.getParameter("insertionOrderId");
                String buyerBaselinePrice = request.getParameter("buyerBaselinePrice");
                String buyerTotalBaselinePrice = request.getParameter("buyerTotalBaselinePrice");

                System.out.println("rfqId: " + rfqId);
                System.out.println("vendorId: " + vendorId);
                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("buyerBaselinePrice: " + buyerBaselinePrice);
                System.out.println("buyerTotalBaselinePrice: " + buyerTotalBaselinePrice);

                int supplierHeaderId = 0;
                List<SupplierHeader> supplierHeaders = (List<SupplierHeader>) getSupplierHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                if (!supplierHeaders.isEmpty()) {
                    SupplierHeader supplierHeaderObj = supplierHeaders.get(0);
                    supplierHeaderId = supplierHeaderObj.getId();
                    supplierHeaderObj.setBuyerPriceOfferedTotal(buyerTotalBaselinePrice);
                    updateSupplierHeader(supplierHeaderObj);
                }
                System.out.println("supplierHeaderId: " + supplierHeaderId);

                List<SupplierLineitem> supplierLineItemList = findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus(supplierHeaderId, Integer.parseInt(insertionOrderId));
                if (!supplierLineItemList.isEmpty()) {
                    SupplierLineitem lineItemObj = supplierLineItemList.get(0);
                    lineItemObj.setBuyerBaselinePrice(buyerBaselinePrice);
                    updateSupplierLineitem(lineItemObj);
                }
                jObj.put("Result", "Success");
                out.println(jObj);

            } else if (reqFrom.equalsIgnoreCase("UpdateContractBuyerBaselinePrice")) {
                System.out.println("UpdateBuyerBaselinePrice");
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");
                String insertionOrderId = request.getParameter("insertionOrderId");
                String buyerBaselinePrice = request.getParameter("buyerBaselinePrice");
                String buyerTotalBaselinePrice = request.getParameter("buyerTotalBaselinePrice");
                int supplierHeaderId = 0;
                List<ContractVendorRfqHeader> vendorContractHeaders = (List<ContractVendorRfqHeader>) getContractHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                if (!vendorContractHeaders.isEmpty()) {
                    ContractVendorRfqHeader supplierHeaderObj = vendorContractHeaders.get(0);
                    supplierHeaderId = supplierHeaderObj.getId();
                    supplierHeaderObj.setBuyerPriceOfferedTotal(buyerTotalBaselinePrice);
                    updateContractVendorRfqHeader(supplierHeaderObj);
                }
                List<ContractVendorRfqLineItem> vendorContractItemList = getContractVendorRfqLineItemById(Integer.parseInt(insertionOrderId));
                if (!vendorContractItemList.isEmpty()) {
                    ContractVendorRfqLineItem lineItemObj = vendorContractItemList.get(0);
                    lineItemObj.setBuyerBaselinePrice(buyerBaselinePrice);
                    updateContractVendorRfqLineitem(lineItemObj);
                }
                jObj.put("Result", "Success");
                out.println(jObj);

            } else if (reqFrom.equalsIgnoreCase("UpdateBuyerRatedParameter")) {
                System.out.println("UpdateBuyerRatedParameter");
                out = response.getWriter();

                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");
                String parameterType = request.getParameter("parameterType");
                String parameterValue = request.getParameter("parameterValue");

                System.out.println("rfqId: " + rfqId);
                System.out.println("vendorId: " + vendorId);
                System.out.println("parameterType: " + parameterType);
                System.out.println("parameterValue: " + parameterValue);

//                List<SupplierHeader> supplierHeaders = (List<SupplierHeader>) getSupplierHeaderByVendorId(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                List<SupplierHeader> supplierHeaders = (List<SupplierHeader>) getSupplierHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));

                if (!supplierHeaders.isEmpty()) {
                    SupplierHeader supplierHeaderObj = supplierHeaders.get(0);

                    if (parameterType != null && parameterType.equals("MoqMov")) {
                        supplierHeaderObj.setBuyerMoqmovDetailsRatedParameter(parameterValue);
                        System.out.println("MoqMov Updated");

                    } else if (parameterType != null && parameterType.equals("DLT")) {
                        supplierHeaderObj.setBuyerDeliveryLeadtimeRatedParameter(parameterValue);
                        System.out.println("DLT Updated");

                    } else if (parameterType != null && parameterType.equals("PT")) {
                        supplierHeaderObj.setBuyerPaymentTermsRatedParameter(parameterValue);
                        System.out.println("PT Updated");

                    } else if (parameterType != null && parameterType.equals("BrandModel")) {
                        supplierHeaderObj.setBuyerBrandModelRatedParameter(parameterValue);
                        System.out.println("BrandModel Updated");

                    } else if (parameterType != null && parameterType.equals("Incoterm")) {
                        supplierHeaderObj.setBuyerIncotermsRatedParameter(parameterValue);
                        System.out.println("Incoterm Updated");

                    } else if (parameterType != null && parameterType.equals("VOO")) {
                        supplierHeaderObj.setBuyerValidityofferRatedParameter(parameterValue);
                        System.out.println("VOO Updated");
                    }
                    updateSupplierHeader(supplierHeaderObj);
                }

                jObj.put("Result", "Success");
                out.println(jObj);

            } else if (reqFrom.equalsIgnoreCase("UpdateBuyerRatedParameterScore")) {
                System.out.println("UpdateBuyerRatedParameterScore");
                out = response.getWriter();

                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");
                String parameterType = request.getParameter("parameterType");
                String score = request.getParameter("score");

                System.out.println("rfqId: " + rfqId);
                System.out.println("vendorId: " + vendorId);
                System.out.println("parameterType: " + parameterType);
                System.out.println("score: " + score);

                List<SupplierHeader> supplierHeaders = (List<SupplierHeader>) getSupplierHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                if (!supplierHeaders.isEmpty()) {
                    SupplierHeader supplierHeaderObj = supplierHeaders.get(0);

                    if (parameterType != null && parameterType.equals("MoqMov")) {
                        supplierHeaderObj.setBuyerMoqmovDetailsRatedParameterScore(score);
                        System.out.println("MoqMov Updated");

                    } else if (parameterType != null && parameterType.equals("DLT")) {
                        supplierHeaderObj.setBuyerDeliveryLeadtimeRatedParameterScore(score);
                        System.out.println("DLT Updated");

                    } else if (parameterType != null && parameterType.equals("PT")) {
                        supplierHeaderObj.setBuyerPaymentTermsRatedParameterScore(score);
                        System.out.println("PT Updated");

                    } else if (parameterType != null && parameterType.equals("BrandModel")) {
                        supplierHeaderObj.setBuyerBrandModelRatedParameterScore(score);
                        System.out.println("BrandModel Updated");

                    } else if (parameterType != null && parameterType.equals("Incoterm")) {
                        supplierHeaderObj.setBuyerIncotermsRatedParameterScore(score);
                        System.out.println("Incoterm Updated");

                    } else if (parameterType != null && parameterType.equals("VOO")) {
                        supplierHeaderObj.setBuyerValidityofferRatedParameterScore(score);
                        System.out.println("VOO Updated");
                    }
                    updateSupplierHeader(supplierHeaderObj);
                }

                jObj.put("Result", "Success");
                out.println(jObj);

            } else if (reqFrom.equalsIgnoreCase("FinalizeVendorForRfq")) {
                System.out.println("FinalizeVendorForRfq");
                out = response.getWriter();

                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");
                String insertionOrderId = request.getParameter("insertionOrderId");
                String comment = request.getParameter("comments");
                String whyThisVendor = request.getParameter("whyThisVendor");
                String quantity = request.getParameter("quantity");

                System.out.println("rfqId: " + rfqId);
                System.out.println("vendorId: " + vendorId);
                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("comment: " + comment);
                System.out.println("whyThisVendor: " + whyThisVendor);
                System.out.println("quantity: " + quantity);

                vendorId = vendorId.substring(0, vendorId.length() - 1);
                insertionOrderId = insertionOrderId.substring(0, insertionOrderId.length() - 1);
                comment = comment.substring(0, comment.length() - 1);
                whyThisVendor = whyThisVendor.substring(0, whyThisVendor.length() - 1);
                quantity = quantity.substring(0, quantity.length() - 1);

                System.out.println("vendorId: " + vendorId);
                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("comment: " + comment);
                System.out.println("whyThisVendor: " + whyThisVendor);
                System.out.println("quantity: " + quantity);

                String[] vendorIds = vendorId.split("#");
                String[] insertionOrderIds = insertionOrderId.split("#");
                String[] comments = comment.split("#");
                String[] whyThisVendors = whyThisVendor.split("#");
                String[] quantities = quantity.split("#");
                Date today = new Date();

                WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(rfqId));
                String rfqNo = rfqHeaderObj.getRfqNumber();

                for (int i = 0; i < vendorIds.length; i++) {
                    VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorIds[i]));
                    NewgenPRLineItem prObj = getPrDetailsById(Integer.parseInt(insertionOrderIds[i]));

                    finalizedRfq.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    finalizedRfq.setNgBpVendordetailsId(vendorObj);
                    finalizedRfq.setNgBpNewgenPRLineItemId(prObj);
                    finalizedRfq.setFinalizedDate(today);
                    finalizedRfq.setComments(comments[i]);
                    finalizedRfq.setWhyThisVendor(whyThisVendors[i]);
                    finalizedRfq.setIsPoCreated("Finalized");

                    saveFinalizedRfq(finalizedRfq);

                    emailTriggerDetails.setMailCC(rfqHeaderObj.getNgBpBuyerdetailsId().getEmailid());
                    emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                    emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
                    emailTriggerDetails.setMailMessage("Buyer has finalized you for quotation " + rfqHeaderObj.getRfqNumber());
                    emailTriggerDetails.setMailSubject("RFQ Finalized");
                    emailTriggerDetails.setMailStatus("N");
                    emailTriggerDetails.setMailTo(vendorObj.getEmailid());

                    mailTriggerUtil.TriggerMail(emailTriggerDetails);
                }

                rfqHeaderObj.setRfqstatus("Closed");
                rfqHeaderObj.setUpdatedate(today);
                updateRfqHeader(rfqHeaderObj);

                // Updating RFQ Vendor Mapping as Closed
                List<RfqHeaderVendorMapping> rfqvendorMapping = findVendorByRfqId(Integer.parseInt(rfqId));
                for (RfqHeaderVendorMapping mapping : rfqvendorMapping) {
                    mapping.setStatus("Closed");
                    updateRfqHeaderVendorMapping(mapping);
                }

                jObj.put("Result", "Success");
                jObj.put("RfqNo", rfqNo);
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("SaveRfqDataInCreateRfq")) {
                System.out.println("SaveRfqDataInCreateRfq");
                out = response.getWriter();

                DateFormat format = new SimpleDateFormat("dd-MM-yyyy");
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
                Date today = new Date();

                String rfqTitle = request.getParameter("rfqTitle");
                String rfqValidUntil = request.getParameter("rfqValidUntil");
                String deliveryTerms = request.getParameter("deliveryTerms");
                String paymentTerms = request.getParameter("paymentTerms");
                String expectedDeliveryDate = request.getParameter("expectedDeliveryDate");
                String contactPersoneName = request.getParameter("contactPersoneName");
                String contactPersoneTelNo = request.getParameter("contactPersoneTelNo");
                String contactPersoneEmail = request.getParameter("contactPersoneEmail");
                String ratedParameterHidden = request.getParameter("ratedParameterHidden");
                String ratedParameterWeigthHidden = request.getParameter("ratedParameterWeigthHidden");
                String prType = request.getParameter("prType");
                String tempRfqId = request.getParameter("tempRfqId");
                String prIds = request.getParameter("prIds");

                System.out.println("rfqTitle: " + rfqTitle);
                System.out.println("rfqValidUntil: " + rfqValidUntil);
                System.out.println("deliveryTerms: " + deliveryTerms);
                System.out.println("paymentTerms: " + paymentTerms);
                System.out.println("expectedDeliveryDate: " + expectedDeliveryDate);
                System.out.println("contactPersoneName: " + contactPersoneName);
                System.out.println("contactPersoneTelNo: " + contactPersoneTelNo);
                System.out.println("contactPersoneEmail: " + contactPersoneEmail);
                System.out.println("ratedParameterHidden: " + ratedParameterHidden);
                System.out.println("ratedParameterWeigthHidden: " + ratedParameterWeigthHidden);
                System.out.println("prType: " + prType);
                System.out.println("tempRfqId: " + tempRfqId);
                System.out.println("prIds: " + prIds);

                Date rfqvaliduntilDate = null;
                if (rfqValidUntil != null) {
                    rfqvaliduntilDate = format.parse(rfqValidUntil);
                    System.out.println("rfqvaliduntilDate: " + rfqvaliduntilDate);
                }
                Date expecteddeliverydateDate = null;
                if (expectedDeliveryDate != null) {
                    expecteddeliverydateDate = format.parse(expectedDeliveryDate);
                    System.out.println("expecteddeliverydateDate: " + expecteddeliverydateDate);
                }

                if (tempRfqId != null && !tempRfqId.equalsIgnoreCase("")) {
                    WorkOrderRfqHeader rfqHeaderobj = findRfqHeaderById(Integer.parseInt(tempRfqId));

                    rfqHeaderobj.setRFQTitle(rfqTitle);
                    rfqHeaderobj.setContactpersonename(contactPersoneName);
                    rfqHeaderobj.setContactpersonetelno(contactPersoneTelNo);
                    rfqHeaderobj.setContactpersoneemail(contactPersoneEmail);
                    rfqHeaderobj.setUpdatedate(today);
                    rfqHeaderobj.setDeliveryterms(deliveryTerms);
                    rfqHeaderobj.setPaymentterms(paymentTerms);
                    rfqHeaderobj.setNgBpBuyerdetailsId(buyer);
                    rfqHeaderobj.setRfqvaliduntil(rfqvaliduntilDate);
                    rfqHeaderobj.setExpectedDeliveryDate(expecteddeliverydateDate);

                    String[] ratedParameterHiddenArray = ratedParameterHidden.split(",");
                    String[] ratedParameterWeigthHiddenArray = ratedParameterWeigthHidden.split(",");

                    for (int i = 0; i < ratedParameterHiddenArray.length; i++) {
                        if (null != ratedParameterHiddenArray[i]) {
                            switch (ratedParameterHiddenArray[i]) {

                                case "MoqMovDetailsRatedParameter":
                                    rfqHeaderobj.setmOQMOVDetailsRatedParameter("true");
                                    rfqHeaderobj.setmOQMOVDetailsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "DeliveryLeadTimeRatedParameter":
                                    rfqHeaderobj.setDeliveryLeadTImeRatedParameter("true");
                                    rfqHeaderobj.setDeliveryLeadTImeRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "PaymentTermsRatedParameter":
                                    rfqHeaderobj.setPaymentTermsRatedParameter("true");
                                    rfqHeaderobj.setPaymentTermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "BrandModelRatedParameter":
                                    rfqHeaderobj.setBrandModelRatedParameter("true");
                                    rfqHeaderobj.setBrandModelRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "IncotermsRatedParameter":
                                    rfqHeaderobj.setIncotermsRatedParameter("true");
                                    rfqHeaderobj.setIncotermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "ValidityOfOfferRatedParameter":
                                    rfqHeaderobj.setValidityOfferRatedParameter("true");
                                    rfqHeaderobj.setValidityOfferRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                            }
                        }
                    }

                    updateRfqHeader(rfqHeaderobj);

                    jObj.put("RFQ_NUMBER", rfqHeaderobj.getRfqNumber());

                } else {

                    workOrderRfqHeader.setRFQTitle(rfqTitle);
                    workOrderRfqHeader.setRfqstatus("Saved");
                    workOrderRfqHeader.setContactpersonename(contactPersoneName);
                    workOrderRfqHeader.setContactpersonetelno(contactPersoneTelNo);
                    workOrderRfqHeader.setContactpersoneemail(contactPersoneEmail);
                    workOrderRfqHeader.setCreationdate(today);
                    workOrderRfqHeader.setUpdatedate(today);
                    workOrderRfqHeader.setDeliveryterms(deliveryTerms);
                    workOrderRfqHeader.setPaymentterms(paymentTerms);
                    workOrderRfqHeader.setNgBpBuyerdetailsId(buyer);
                    workOrderRfqHeader.setRfqvaliduntil(rfqvaliduntilDate);
                    workOrderRfqHeader.setExpectedDeliveryDate(expecteddeliverydateDate);

                    String[] ratedParameterHiddenArray = ratedParameterHidden.split(",");
                    String[] ratedParameterWeigthHiddenArray = ratedParameterWeigthHidden.split(",");

                    for (int i = 0; i < ratedParameterHiddenArray.length; i++) {
                        if (null != ratedParameterHiddenArray[i]) {
                            switch (ratedParameterHiddenArray[i]) {

                                case "MoqMovDetailsRatedParameter":
                                    workOrderRfqHeader.setmOQMOVDetailsRatedParameter("true");
                                    workOrderRfqHeader.setmOQMOVDetailsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "DeliveryLeadTimeRatedParameter":
                                    workOrderRfqHeader.setDeliveryLeadTImeRatedParameter("true");
                                    workOrderRfqHeader.setDeliveryLeadTImeRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "PaymentTermsRatedParameter":
                                    workOrderRfqHeader.setPaymentTermsRatedParameter("true");
                                    workOrderRfqHeader.setPaymentTermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "BrandModelRatedParameter":
                                    workOrderRfqHeader.setBrandModelRatedParameter("true");
                                    workOrderRfqHeader.setBrandModelRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "IncotermsRatedParameter":
                                    workOrderRfqHeader.setIncotermsRatedParameter("true");
                                    workOrderRfqHeader.setIncotermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                                case "ValidityOfOfferRatedParameter":
                                    workOrderRfqHeader.setValidityOfferRatedParameter("true");
                                    workOrderRfqHeader.setValidityOfferRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                                    break;
                            }
                        }
                    }

                    String rfqid = saveRfqDataInCreateRfq(workOrderRfqHeader, prType);
                    System.out.println("rfqid: " + rfqid);
                    WorkOrderRfqHeader rfqHeaderobj = findRfqHeaderById(Integer.parseInt(rfqid));

                    List<NewgenPRLineItem> newgenPrList = findByMultipleNewgenPRLineItemId(prIds);

                    String[] pr_ids_array = prIds.split(",");
                    for (int i = 0; i < pr_ids_array.length; i++) {
                        NewgenPRLineItem newgenPr = newgenPrList.get(i);

                        workOrderRfqLineItem.setQuantity(newgenPr.getBpQuantityRemaining());
                        workOrderRfqLineItem.setBPaasWorkOrderRFQHeaderRFQID(rfqHeaderobj);
                        workOrderRfqLineItem.setNgBpNewgenPRLineItemId(newgenPr);

                        String id = saveRfqHeaderLineItem(workOrderRfqLineItem);
                        System.out.println("line item id: " + id);

                        newgenPr.setBpQuantityRemaining("0");
                        newgenPr.setBpRfqStatus("Initiated");
                        String result = updatePrLineItemNG(newgenPr);
                        System.out.println("result: " + result);
                    }

                    jObj.put("RFQ_NUMBER", rfqHeaderobj.getRfqNumber());

                }
                out.println(jObj);
            } else if (reqFrom.equalsIgnoreCase("getAllByPricingProcedure")) {
                out = response.getWriter();
                String pricingprocedure = request.getParameter("pricingprocedure");
                System.out.println("pricingprocedure: " + pricingprocedure);

                List<MasterPricingProcedures> pricingProcedureList = getAllByPricingProcedure(pricingprocedure);

                for (MasterPricingProcedures pricingProcedure : pricingProcedureList) {
                    JSONObject Obj = new JSONObject();
                    Obj.put("KAPPL", pricingProcedure.getKappl());
                    Obj.put("KVSL1", pricingProcedure.getKvsl1());
                    Obj.put("KVSL2", pricingProcedure.getKvsl2());
                    Obj.put("ZAEHK", pricingProcedure.getZaehk());
                    Obj.put("STUNR", pricingProcedure.getStunr());
                    String KSCHL = pricingProcedure.getKschl();
                    if (!"".equals(pricingProcedure.getKschl())) {
                        List<MasterPricingDescription> descriptionList = standalonePoWS.getPricingDescriptionByKSCHL(KSCHL);
                        if (!descriptionList.isEmpty()) {
                            MasterPricingDescription description = descriptionList.get(0);
                            Obj.put("NAME", description.getName());
                            Obj.put("CTYPE", description.getCTYpe());
                            String currency = "SGD";
                            Obj.put("CURRENCY2", currency);
                            if ("".equals(description.getCrCy())) {
                                Obj.put("CRCY", currency);
                            } else {
                                Obj.put("CRCY", description.getCrCy());
                            }
                            jArra.put(Obj);
                        }
                    } else {
                        System.out.println("KSCHL in empty");
                        String VTEXT = pricingProcedure.getVtext();
                        System.out.println("VTEXT :" + VTEXT);
                        String currency = "SGD";
                        Obj.put("NAME", VTEXT);
                        Obj.put("CRCY", currency);
                        Obj.put("CURRENCY2", currency);
                        jArra.put(Obj);
                    }
                }
                System.out.println("length :" + jArra.length());
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveConditionsTabData")) {
                out = response.getWriter();
                System.out.println("saveConditionsTabData");
                String codtnTblValueRowString = request.getParameter("codtnTblValueRowString");
                System.out.println("codtnTblValueRowString :" + codtnTblValueRowString);
                String poCurrency = request.getParameter("poCurrency");
                System.out.println("poCurrency :" + poCurrency);
                String localCurrency = request.getParameter("localCurrency");
                System.out.println("localCurrency :" + localCurrency);
//                String linkIdArray = request.getParameter("linkIdArray");
//                System.out.println("linkIdArray size: " + linkIdArray.length());
//                String[] arrlinkid = linkIdArray.split(",");
//                System.out.println(" arrlinkid size :" + arrlinkid.length);
                
                String insertionOrderIdArrAsString = request.getParameter("insertionOrderIdArrAsString");
                System.out.println("insertionOrderIdArrAsString size: " + insertionOrderIdArrAsString.length());
//                String[] arrinsertionOrderId = insertionOrderIdArrAsString.split(",");
//                System.out.println(" arrlinkid size :" + arrlinkid.length);

                String[] condtnTblRowArr = codtnTblValueRowString.split("#");

                System.out.println("condtnTblRowArr length :" + condtnTblRowArr.length);

                String[] conValues = null;
                for (String condtnTblRow : condtnTblRowArr) {
                    conValues = condtnTblRow.split(",");
                }
                List<ConditionsLineLevel> conditionList = getMasterConditionLineLevelByLineItemNumber(conValues[12]);
                if (!conditionList.isEmpty()) {
                    String msg = deleteAllConditions(conditionList);
                }

                for (String condtnTblRow : condtnTblRowArr) {
//                    System.out.println("codtnTblValues values :" + condtnTblRow);
                    String[] conditionVal = condtnTblRow.split(",");
                    if (!"".equals(conditionVal[0])) {
                        conditionsLineLevel.setConditionType(conditionVal[0]);
                    } else {
                        conditionsLineLevel.setConditionType("");
                    }
                    if (!"".equals(conditionVal[1])) {
                        conditionsLineLevel.setName(conditionVal[1]);
                    } else {
                        conditionsLineLevel.setName("");
                    }
                    if (!"".equals(conditionVal[2])) {
                        conditionsLineLevel.setAmount(new BigDecimal(conditionVal[2]));
                    } else {
                        conditionsLineLevel.setAmount(new BigDecimal(0.0));
                    }
                    if (!"".equals(conditionVal[3])) {
                        conditionsLineLevel.setPer(new BigDecimal(conditionVal[3]));
                    } else {
                        conditionsLineLevel.setPer(new BigDecimal(0.0));
                    }
                    if (!"".equals(conditionVal[4])) {
                        conditionsLineLevel.setConditionPricingUnit(conditionVal[4]);
                    } else {
                        conditionsLineLevel.setConditionPricingUnit("");
                    }
                    if (!"".equals(conditionVal[5])) {
                        conditionsLineLevel.setCurrency1(conditionVal[5]);
                    } else {
                        conditionsLineLevel.setCurrency1("");
                    }
                    if (!"".equals(conditionVal[6])) {
                        conditionsLineLevel.setUom(conditionVal[6]);
                    } else {
                        conditionsLineLevel.setUom("");
                    }
                    if (!"".equals(conditionVal[7])) {
                        conditionsLineLevel.setConditionValue1(Float.parseFloat(conditionVal[7]));
                    } else {
                        conditionsLineLevel.setConditionValue1(new Float(0.0));
                    }
                    if (!"".equals(conditionVal[8])) {
                        conditionsLineLevel.setCurrency2(conditionVal[8]);
                    } else {
                        conditionsLineLevel.setCurrency2("");
                    }
                    if (!"".equals(conditionVal[9])) {
                        conditionsLineLevel.setConditionValue2(Float.parseFloat(conditionVal[9]));
                    } else {
                        conditionsLineLevel.setConditionValue2(new Float(0.0));
                    }
                    if (!"".equals(conditionVal[10])) {
                        conditionsLineLevel.setConditionCurrency(conditionVal[10]);
                    } else {
                        conditionsLineLevel.setConditionCurrency("");
                    }
                    if (!"".equals(conditionVal[11])) {
                        conditionsLineLevel.setConditionDetails(conditionVal[11]);
                    } else {
                        conditionsLineLevel.setConditionDetails("");
                    }
                    if (!"".equals(conditionVal[12])) {
                        conditionsLineLevel.setLineitemId(conditionVal[12]);
                    } else {
                        conditionsLineLevel.setLineitemId("");
                    }
                    if (!"".equals(conditionVal[13])) {
                        conditionsLineLevel.setPrItemNumber(conditionVal[13]);
                    } else {
                        conditionsLineLevel.setPrItemNumber("");
                    }
                    if (!"".equals(conditionVal[14])) {
                        conditionsLineLevel.setLinkId(conditionVal[14]);
                    } else {
                        conditionsLineLevel.setLinkId("");
                    }
                    if (!"".equals(conditionVal[15])) {
                        conditionsLineLevel.setStNumber(conditionVal[15]);
                    } else {
                        conditionsLineLevel.setStNumber("");
                    }
                    if (!"".equals(conditionVal[16])) {
                        conditionsLineLevel.setConditionCount(conditionVal[16]);
                    } else {
                        conditionsLineLevel.setConditionCount("");
                    }
                    if (!"".equals(conditionVal[17])) {
                        conditionsLineLevel.setKappl(conditionVal[17]);
                    } else {
                        conditionsLineLevel.setKappl("");
                    }
                    if (!"".equals(conditionVal[18])) {
                        conditionsLineLevel.setKvsl1(conditionVal[18]);
                    } else {
                        conditionsLineLevel.setKvsl1("");
                    }
                    if (!"".equals(conditionVal[19])) {
                        conditionsLineLevel.setKvsl2(conditionVal[19]);
                    } else {
                        conditionsLineLevel.setKvsl2("");
                    }
                    if (!"".equals(conditionVal[20])) {
                        conditionsLineLevel.setChangeId(conditionVal[20]);
                    } else {
                        conditionsLineLevel.setChangeId("");
                    }
                    if (!"".equals(conditionVal[21])) {
                        conditionsLineLevel.setVendorCode(conditionVal[21]);

                        List<MasterVendor> vendorMasterList = purchaseOrderWSUtil.findMasterVendorByVendorCode(conditionVal[21]);
                        if (!vendorMasterList.isEmpty()) {
                            MasterVendor vendorObj = vendorMasterList.get(0);
                            conditionsLineLevel.setVendorName(vendorObj.getVendorName());
                        }
                    } else {
                        conditionsLineLevel.setVendorCode("");
                    }

                    if (!"".equals(conditionVal[22]) && !"NA".equals(conditionVal[22])) {
                        conditionsLineLevel.setNgStatus(conditionVal[22]);
                    } else {
                        conditionsLineLevel.setNgStatus("");
                    }
                    if (!"".equals(conditionVal[23]) && !"NA".equals(conditionVal[23])) {
                        conditionsLineLevel.setNumerator(Integer.parseInt(conditionVal[23]));
                    } else {
//                        conditionsLineLevel.setNumerator(Integer.parseInt("0.0"));
                        conditionsLineLevel.setNumerator(0);
                    }
                    if (!"".equals(conditionVal[24]) && !"NA".equals(conditionVal[24])) {
                        conditionsLineLevel.setBaseUOM(conditionVal[24]);
                    } else {
                        conditionsLineLevel.setBaseUOM("");
                    }
                    if (!"".equals(conditionVal[25]) && !"NA".equals(conditionVal[25])) {
                        conditionsLineLevel.setDenominatorforconv(Integer.parseInt(conditionVal[25]));
                    } else {
//                        conditionsLineLevel.setDenominatorforconv(Integer.parseInt("0.0"));
                        conditionsLineLevel.setDenominatorforconv(0);
                    }
                    if (!"".equals(conditionVal[26]) && !"NA".equals(conditionVal[26])) {
                        conditionsLineLevel.setUomextra(conditionVal[26]);
                    } else {
                        conditionsLineLevel.setUomextra("");
                    }
                    
                    if (!"".equals(conditionVal[27]) && !"NA".equals(conditionVal[27])) {
                        conditionsLineLevel.setAddedFrom(conditionVal[27]);
                    } else {
                        conditionsLineLevel.setAddedFrom("");
                    }

                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    Date today = new Date();
                    String condPriceDate = df.format(today);
                    conditionsLineLevel.setCondPriceDate(condPriceDate);

                    // Calculate CondCurncyExchangeRate Starts
                    String conditionCurrency = conditionVal[5];
//                    System.out.println("conditionCurrency::: " + conditionCurrency);
//                    System.out.println("conditionCurrency len::: " + conditionCurrency.length());
                    if (conditionCurrency.length() > 1) {
                        if (conditionCurrency.equals(poCurrency)) {
                            conditionsLineLevel.setCondCurncyExchangeRate("1.0000");
                        } else {
                            List<MasterExchangeRate> condCurncyExchangeRateList = findExchangeRateByFromCurrencyAndToCurrency(poCurrency, conditionCurrency);
                            if (!condCurncyExchangeRateList.isEmpty()) {
                                MasterExchangeRate exchangeRateObj = condCurncyExchangeRateList.get(0);
                                conditionsLineLevel.setCondCurncyExchangeRate(exchangeRateObj.getExchangeRate().toString());
                            } else {
                                conditionsLineLevel.setCondCurncyExchangeRate("");
                            }
                        }
                    } else {
                        conditionsLineLevel.setCondCurncyExchangeRate("");
                    }
                    // Calculate CondCurncyExchangeRate Ends

                    // Calculate POCurrencyExchangeRate Starts
                    if (poCurrency.equals(localCurrency)) {
                        conditionsLineLevel.setPoCurrencyExchangeRate("1.0000");
                    } else {
                        List<MasterExchangeRate> poCurrencyExchangeRateList = findExchangeRateByFromCurrencyAndToCurrency(localCurrency, poCurrency);
                        if (!poCurrencyExchangeRateList.isEmpty()) {
                            MasterExchangeRate exchangeRateObj = poCurrencyExchangeRateList.get(0);
                            conditionsLineLevel.setPoCurrencyExchangeRate(exchangeRateObj.getExchangeRate().toString());
                        } else {
                            conditionsLineLevel.setPoCurrencyExchangeRate("");
                        }
                    }
                    conditionsLineLevel.setStatus("Insert");
                    // Calculate POCurrencyExchangeRate Ends

                    String message = saveConditionsTabData(conditionsLineLevel);
                    System.out.println("message :" + message);

                }

//                List<ConditionsLineLevel> conList = getConditionsLineLevelByLinkIds(linkIdArray);
                List<ConditionsLineLevel> conList = purchaseOrderWSUtil.getConditionsLineLevelByInsertionOrderIds(insertionOrderIdArrAsString);
                System.out.println("conditionList new size :" + conList.size());

                JSONArray jsonCondArr = new JSONArray(conList);
                out.println(jsonCondArr);
//                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllBusinessArea")) {

                out = response.getWriter();

                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);

//                List<MasterBusinessArea> businessList = getAllBusinessArea();
                List<MasterBusinessArea> businessList = purchaseOrderWSUtil.findBusinessAreaByCoCode(companyCode);

                for (MasterBusinessArea business : businessList) {
                    JSONObject Obj = new JSONObject();
                    if (!businessList.isEmpty()) {
//                        System.out.println("Tax Code:" + business.getBusinessarea());
                        Obj.put("BUSINESSAREA", business.getBusinessarea());
                        Obj.put("DESCRIPTION", business.getBusinessAreaDec());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllSalesOrg")) {
                out = response.getWriter();

                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);

//                List<MasterSalesOrganisation> salesOrgList = getAllSalesOrg();
                List<MasterSalesOrganisation> salesOrgList = purchaseOrderWSUtil.findSalesOrgByCoCode(companyCode);

                for (MasterSalesOrganisation sales : salesOrgList) {
                    JSONObject Obj = new JSONObject();
                    if (!salesOrgList.isEmpty()) {
//                        System.out.println("Tax Code:" + sales.getSalesOrgCode());
                        Obj.put("CODE", sales.getSalesOrgCode());
                        Obj.put("NAME", sales.getSalesOrgName());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllDistChannel")) {

                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);

//                List<MasterDistributionChannel> channelList = getAllDistChannel();
                List<MasterDistributionChannel> channelList = purchaseOrderWSUtil.findDistributionChannelByCoCode(companyCode);
                System.out.println("channelList size: " + channelList.size());

                for (MasterDistributionChannel channel : channelList) {
                    JSONObject Obj = new JSONObject();
                    if (!channelList.isEmpty()) {
//                        System.out.println("Name:" + channel.getName());
                        Obj.put("CHANNEL", channel.getDistChannel());
                        Obj.put("NAME", channel.getName());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllProfitCenter")) {

                out = response.getWriter();

                List<MasterProfitCenter> profitList = getAllProfitCenter();

                for (MasterProfitCenter profit : profitList) {
                    JSONObject Obj = new JSONObject();
                    if (!profitList.isEmpty()) {
//                        System.out.println("Profit Center:" + profit.getProfitCenter());
                        Obj.put("PROFIT", profit.getProfitCenter());
                        Obj.put("DESC", profit.getProfitCenterdesc());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllSalesOffice")) {
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterSalesOffice> officeList = purchaseOrderWSUtil.findSalesOfficeByCoCode(companyCode);
                System.out.println("officeList size: " + officeList.size());
                for (MasterSalesOffice office : officeList) {
                    JSONObject Obj = new JSONObject();
                    if (!officeList.isEmpty()) {
                        Obj.put("SALESOFFICE", office.getSalesOffice());
                        Obj.put("DESC", office.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllMaterialGroup")) {
                out = response.getWriter();
                List<MasterMaterialGroup> groupList = getAllMaterialGroup();
                for (MasterMaterialGroup group : groupList) {
                    JSONObject Obj = new JSONObject();
                    if (!groupList.isEmpty()) {
//                        System.out.println("Material Group Code:" + group.getMaterialGroupCode());
                        Obj.put("CODE", group.getMaterialGroupCode());
                        Obj.put("DESC", group.getMaterialGroupDesc());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllCustomerGroup")) {
                out = response.getWriter();
                List<MasterCustomerGroup> groupList = getAllCustomerGroup();
                for (MasterCustomerGroup group : groupList) {
                    JSONObject Obj = new JSONObject();
                    if (!groupList.isEmpty()) {
//                        System.out.println("Customer Group:" + group.getCustomerGroup());
                        Obj.put("GROUP", group.getCustomerGroup());
                        Obj.put("NAME", group.getName());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllProdHierLev1")) {
                out = response.getWriter();
                List<MasterProductHierarchy1> productList = getAllProdHierLev1();
                for (MasterProductHierarchy1 product : productList) {
                    JSONObject Obj = new JSONObject();
                    if (!productList.isEmpty()) {
//                        System.out.println("Customer Group:" + product.getPhl1());
                        Obj.put("PROD_HIER", product.getPhl1());
                        Obj.put("NAME", product.getName());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllProdHierLev2")) {
                out = response.getWriter();
                List<MasterProductHierarchy2> productList = getAllProdHierLev2();
                for (MasterProductHierarchy2 product : productList) {
                    JSONObject Obj = new JSONObject();
                    if (!productList.isEmpty()) {
//                        System.out.println("Customer Group:" + product.getPhl2());
                        Obj.put("PROD_HIER", product.getPhl2());
                        Obj.put("NAME", product.getName());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllProdHierLev3")) {
                out = response.getWriter();
                List<MasterProductHierarchy3> productList = getAllProdHierLev3();
                for (MasterProductHierarchy3 product : productList) {
                    JSONObject Obj = new JSONObject();
                    if (!productList.isEmpty()) {
//                        System.out.println("Customer Group:" + product.getPhl3());
                        Obj.put("PROD_HIER", product.getPhl3());
                        Obj.put("NAME", product.getName());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllRferenceItem")) {
                out = response.getWriter();
                List<MasterReferenceItem> referenceList = getAllRferenceItem();
                for (MasterReferenceItem reference : referenceList) {
                    JSONObject Obj = new JSONObject();
                    if (!referenceList.isEmpty()) {
//                        System.out.println("Customer Group:" + reference.getItem());
                        Obj.put("ITEM", reference.getItem());
                        Obj.put("DOCUMENT", reference.getDocument());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllMaterialType")) {
                out = response.getWriter();
                List<MasterMaterialType> materialList = getAllMaterialType();
                for (MasterMaterialType material : materialList) {
                    JSONObject Obj = new JSONObject();
                    if (!materialList.isEmpty()) {
//                        System.out.println("MaterialType:" + material.getMaterialType());
                        Obj.put("TYPE", material.getMaterialType());
                        Obj.put("DESC", material.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllProjectInd")) {
                out = response.getWriter();
                List<MasterProjectIndicator> projectList = getAllProjectIndicator();
                for (MasterProjectIndicator project : projectList) {
                    JSONObject Obj = new JSONObject();
                    if (!projectList.isEmpty()) {
//                        System.out.println("Name:" + project.getName());
                        Obj.put("NAME", project.getName());
                        Obj.put("PROJECT_IND", project.getProjectIndicator());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllValuationType")) {
                out = response.getWriter();
                List<MasterValuationType> valuationList = getAllValuationType();
                for (MasterValuationType valuation : valuationList) {
                    JSONObject Obj = new JSONObject();
                    if (!valuationList.isEmpty()) {
//                        System.out.println("VAL TYPE:" + valuation.getValType());
                        Obj.put("VAL_TYPE", valuation.getValType());
//                        Obj.put("PROJECT_IND", project.getProjectIndicator());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllCustomerClass")) {
                out = response.getWriter();
                List<MasterCustomerClassification> customerClassList = getAllCustomerClass();
                for (MasterCustomerClassification customer : customerClassList) {
                    JSONObject Obj = new JSONObject();
                    if (!customerClassList.isEmpty()) {
//                        System.out.println("VAL TYPE:" + customer.getCustomerClass());
                        Obj.put("CLASS", customer.getCustomerClass());
                        Obj.put("DESC", customer.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllMaterialSourceInd")) {
                out = response.getWriter();
                List<MasterMaterialSrcIndicator> materialList = getAllMaterialSourceInd();
                for (MasterMaterialSrcIndicator material : materialList) {
                    JSONObject Obj = new JSONObject();
                    if (!materialList.isEmpty()) {
//                        System.out.println("Material Src Ind:" + material.getMatlSrcInd());
                        Obj.put("MAT_SRC_IND", material.getMatlSrcInd());
                        Obj.put("DESC", material.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllContractType")) {
                out = response.getWriter();
                List<MasterContractType> contractList = getAllContractType();
                for (MasterContractType contract : contractList) {
                    JSONObject Obj = new JSONObject();
                    if (!contractList.isEmpty()) {
//                        System.out.println("Contract Type:" + contract.getContractType());
                        Obj.put("CON_TYPE", contract.getContractType());
                        Obj.put("PROCESS_TYPE", contract.getProcessType());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllIndustryCode1")) {
                out = response.getWriter();
                List<MasterIndustryCode1> industryList = getAllIndustryCode1();
                for (MasterIndustryCode1 industry : industryList) {
                    JSONObject Obj = new JSONObject();
                    if (!industryList.isEmpty()) {
//                        System.out.println("Industry Code:" + industry.getIndustryCode());
                        Obj.put("INDUSTRYCODE", industry.getIndustryCode());
                        Obj.put("DESC", industry.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllIndustryCode2")) {
                out = response.getWriter();
                List<MasterIndustryCode2> industryList = getAllIndustryCode2();
                for (MasterIndustryCode2 industry : industryList) {
                    JSONObject Obj = new JSONObject();
                    if (!industryList.isEmpty()) {
//                        System.out.println("Industry Code:" + industry.getIndustryCode());
                        Obj.put("INDUSTRYCODE", industry.getIndustryCode());
                        Obj.put("DESC", industry.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllIndustryCode3")) {
                out = response.getWriter();
                List<MasterIndustryCode3> indistryList = getAllIndustryCode3();
                for (MasterIndustryCode3 industry : indistryList) {
                    JSONObject Obj = new JSONObject();
                    if (!indistryList.isEmpty()) {
//                        System.out.println("Industry Code:" + industry.getIndustryCode());
                        Obj.put("INDUSTRYCODE", industry.getIndustryCode());
                        Obj.put("DESC", industry.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllSalesDocType")) {
                out = response.getWriter();
                List<MasterSalesDocType> salesList = getAllSalesDocType();
                for (MasterSalesDocType sales : salesList) {
                    JSONObject Obj = new JSONObject();
                    if (!salesList.isEmpty()) {
//                        System.out.println("Sales Doc Type:" + sales.getSalesDocType());
                        Obj.put("SALESDOCTYPE", sales.getSalesDocType());
                        Obj.put("DESC", sales.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllReferenceItem")) {
                out = response.getWriter();
                List<MasterReferenceItem> referenceList = getAllReferenceItem();
                for (MasterReferenceItem reference : referenceList) {
                    JSONObject Obj = new JSONObject();
                    if (!referenceList.isEmpty()) {
//                        System.out.println("Reference Item:" + reference.getItem());
                        Obj.put("ITEM", reference.getItem());
                        Obj.put("DOC", reference.getDocument());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllMasterCountry")) {
                out = response.getWriter();
                List<MasterCountry> countryList = getAllMasterCountry();
                for (MasterCountry country : countryList) {
                    JSONObject Obj = new JSONObject();
                    if (!countryList.isEmpty()) {
//                        System.out.println("Country Name:" + country.getName());
                        Obj.put("CODE", country.getCountry());
                        Obj.put("NAME", country.getName());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllBillType")) {
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterBillType> billList = purchaseOrderWSUtil.findBillingTypeByCoCode(companyCode);
                System.out.println("billList size: " + billList.size());
                for (MasterBillType bill : billList) {
                    JSONObject Obj = new JSONObject();
                    if (!billList.isEmpty()) {
                        Obj.put("BILLTYPE", bill.getBillType());
                        Obj.put("DESC", bill.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllHigherLevItem")) {
                out = response.getWriter();
                List<MasterHighLevelItem> itemList = getAllHigherLevItem();
                for (MasterHighLevelItem item : itemList) {
                    JSONObject Obj = new JSONObject();
                    if (!itemList.isEmpty()) {
//                        System.out.println("Higher Lev Item:" + item.getHighLevelItem());
                        Obj.put("HIGHLEVITEM", item.getHighLevelItem());
                        Obj.put("DESC", item.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllIndustryCode")) {
                out = response.getWriter();
                List<MasterIndustryCode> industryList = getAllIndustryCode();
                for (MasterIndustryCode industry : industryList) {
                    JSONObject Obj = new JSONObject();
                    if (!industryList.isEmpty()) {
//                        System.out.println("Industry Code:" + industry.getIndustryCode());
                        Obj.put("INDCODE", industry.getIndustryCode());
                        Obj.put("DESC", industry.getDescription());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveProfitabilitySegmentData")) {
                out = response.getWriter();
                System.out.println("saveProfitabilitySegmentData");
                String profitabilitySegmentString = request.getParameter("profitabilitySegmentString");
                System.out.println("profitabilitySegmentString :" + profitabilitySegmentString);

                String[] prSegmentArr = profitabilitySegmentString.split(",");
                System.out.println("prSegmentArr length :" + prSegmentArr.length);
                
                System.out.println("InsertionOrderId: " + prSegmentArr[44]);
                System.out.println("ServiceLineItemNumber: " + prSegmentArr[45]);
                
                List<ProfitabilitySegment> segmentList = purchaseOrderWSUtil.findProfitabilitySegmentByInsertionOrderIdAndServiceLineItemNumber(prSegmentArr[44], prSegmentArr[45]);
                System.out.println("In Ajax Cont Profitability Segment Size: " + segmentList.size());
                if(!segmentList.isEmpty()) {
                    purchaseOrderWSUtil.deleteAllProfitabilitySegment(segmentList);
                }
                
                profitabilitySegment = savePoLineLevelTabUtil.setProfitabilitySegmentFields(profitabilitySegment, prSegmentArr);
                
                String msg = saveProfitabilitySegment(profitabilitySegment);
                System.out.println("msg saveProfitabilitySegment :" + msg);
//                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveServiceTableData")) {
                out = response.getWriter();
                System.out.println("saveServiceTableData");
                String serviceTblRowString = request.getParameter("serviceTblRowString");
                System.out.println("serviceTblRowString :" + serviceTblRowString);
                String[] serviceTblRowArr = serviceTblRowString.split("#");
                System.out.println("serviceTblRowArr length :" + serviceTblRowArr.length);
                String[] serviceVal = null;
                for (String serviceTblRow : serviceTblRowArr) {
                    serviceVal = serviceTblRow.split(",");
                }
                List<Services> servicesList = getServicesByLineItemNumber(serviceVal[11]);
                System.out.println("servicesList :" + servicesList);
                if (!servicesList.isEmpty()) {
                    deleteFromServices(servicesList);
                }
                for (String serviceTblRow : serviceTblRowArr) {
                    System.out.println("Bittu :");
                    System.out.println("serviceTblRow values :" + serviceTblRow);
                    String[] serviceTblVal = serviceTblRow.split(",");
                    if (!"".equals(serviceTblVal[0])) {
                        services.setServiceLineItemNumber(serviceTblVal[0]);
                    } else {
                        services.setServiceLineItemNumber("");
                    }
                    if (!"".equals(serviceTblVal[1])) {
                        services.setServiceNumber(serviceTblVal[1]);
                    } else {
                        services.setServiceNumber("");
                    }
//                    if (!"".equals(serviceTblVal[2])) {
//                        services.setShortText(serviceTblVal[2]);
//                    } else {
//                        services.setShortText("");
//                    }
                    if (!"".equals(serviceTblVal[3])) {
                        services.setQuantity(new BigDecimal(serviceTblVal[3]));
                    } else {
                        services.setQuantity(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceTblVal[4])) {
                        services.setUnit(serviceTblVal[4]);
                    } else {
                        services.setUnit("");
                    }
                    if (!"".equals(serviceTblVal[5])) {
                        services.setGrossPrice(new BigDecimal(serviceTblVal[5]));
                    } else {
                        services.setGrossPrice(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceTblVal[6])) {
                        services.setCurrency(serviceTblVal[6]);
                    } else {
                        services.setCurrency("");
                    }
                    if (!"".equals(serviceTblVal[7])) {
                        services.setNetPrice(new BigDecimal(serviceTblVal[7]));
                    } else {
                        services.setNetPrice(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceTblVal[8])) {
                        services.setEdition(serviceTblVal[8]);
                    } else {
                        services.setEdition("");
                    }
//                    if (!"".equals(serviceTblVal[9])) {
//                        services.setLineItemLongText(serviceTblVal[9]);
//                    } else {
//                        services.setLineItemLongText("");
//                    }
                    if (!"".equals(serviceTblVal[10])) {
                        services.setOverfTolerance(serviceTblVal[10]);
                    } else {
                        services.setOverfTolerance("");
                    }
                    if (!"".equals(serviceTblVal[11])) {
                        services.setLineItemNumber(serviceTblVal[11]);
                    } else {
                        services.setLineItemNumber("");
                    }
                    if (!"".equals(serviceTblVal[12])) {
                        services.setLinkId(serviceTblVal[12]);
                    } else {
                        services.setLinkId("");
                    }
                    if (!"".equals(serviceTblVal[13])) {
                        services.setServiceLinkId(serviceTblVal[13]);
                    } else {
                        services.setServiceLinkId("");
                    }
                    if (!"".equals(serviceTblVal[14])) {
                        services.setPrItemNumber(serviceTblVal[14]);
                    } else {
                        services.setPrItemNumber("");
                    }
                    if (!"".equals(serviceTblVal[15])) {
                        services.setDistribution(serviceTblVal[15]);
                    } else {
                        services.setDistribution("");
                    }
                    if (!"".equals(serviceTblVal[16])) {
                        services.setDeleteFlag(serviceTblVal[16]);
                    } else {
                        services.setDeleteFlag("");
                    }
                    if (!"".equals(serviceTblVal[17]) && !"NON".equals(serviceTblVal[17])) {
                        services.setLineNoServ(serviceTblVal[17]);
                    } else {
                        services.setLineNoServ(null);
                    }
                    if (!"".equals(serviceTblVal[18]) && !"NON".equals(serviceTblVal[18])) {
                        services.setIsServOldOrNew(serviceTblVal[18]);
                    } else {
                        services.setIsServOldOrNew(null);
                    }
                    if (!"".equals(serviceTblVal[19]) && !"NA".equals(serviceTblVal[19])) {
                        services.setNetValue(new BigDecimal(serviceTblVal[19]));
                    } else {
                        services.setNetValue(null);
                    }
                    if (!"".equals(serviceTblVal[20]) && !"NA".equals(serviceTblVal[20])) {
                        services.setActualQuantity(new BigDecimal(serviceTblVal[20]));
                    } else {
                        services.setActualQuantity(null);
                    }
//                    if (!"".equals(serviceTblVal[21]) && !"NA".equals(serviceTblVal[21])) {
//                        services.setServiceText(serviceTblVal[21]);
//                    } else {
//                        services.setServiceText(null);
//                    }
                    if (!"".equals(serviceTblVal[22]) && !"NA".equals(serviceTblVal[22])) {
                        services.setServicesLongTextId(serviceTblVal[22]);
                    } else {
                        services.setServicesLongTextId("");
                    }
                    String msg = saveServiceTableData(services);
                    System.out.println("services msg :" + msg);
                    jArra.put(msg);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveDeliveryScheduleTblData")) {
                out = response.getWriter();
                System.out.println("saveDeliveryScheduleTblData");
                String deliverySchTblRowString = request.getParameter("deliverySchTblRowString");
                String insertionOrderId = request.getParameter("insertionOrderId");

                System.out.println("deliverySchTblRowString :" + deliverySchTblRowString);
                System.out.println("insertionOrderId :" + insertionOrderId);

                String[] deliverySchTblRowArr = deliverySchTblRowString.split("#");
                System.out.println("deliverySchTblRowArr length :" + deliverySchTblRowArr.length);

                List<DeliverySchedule> deliveryList = getDeliveryScheduleByInsertionId(insertionOrderId);
                if (!deliveryList.isEmpty()) {
                    deleteDeliverySchedule(deliveryList);
                }

                for (String deliverySchTblRow : deliverySchTblRowArr) {
                    String[] deliverySchTblVal = deliverySchTblRow.split(",");
                    System.out.println("deliverySchTblRowArr values :" + deliverySchTblRow);

                    if (!"".equals(deliverySchTblVal[0])) {
                        if ("D".equals(deliverySchTblVal[0])) {
                            if (!deliverySchTblVal[1].equalsIgnoreCase("")) {
                                SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                                try {
                                    Date dateCat = formatter.parse(deliverySchTblVal[1]);
                                    System.out.println("dateCat :" + dateCat);
                                    System.out.println(formatter.format(dateCat));
                                    if (!"".equals(deliverySchTblVal[1])) {
                                        deliverySchedule.setDeliveryDate(dateCat);
                                        deliverySchedule.setDeliveryDateByCategory(null);
                                    }
                                } catch (ParseException e) {
                                    e.printStackTrace();
                                }
                            }
                        } else {
                            deliverySchedule.setDeliveryDateByCategory(deliverySchTblVal[1]);
                            deliverySchedule.setDeliveryDate(null);
                        }
                    }
                    if (!"".equals(deliverySchTblVal[0])) {
                        deliverySchedule.setDeliveryDateCategory(deliverySchTblVal[0]);
                    } else {
                        deliverySchedule.setDeliveryDateCategory("");
                    }
                    if (!"".equals(deliverySchTblVal[2])) {
                        deliverySchedule.setScheduledQuantity(new BigDecimal(deliverySchTblVal[2]));
                    } else {
                        deliverySchedule.setScheduledQuantity(new BigDecimal(0.0));
                    }
                    if (!"".equals(deliverySchTblVal[3])) {
                        deliverySchedule.setTime(deliverySchTblVal[3]);
                    } else {
                        deliverySchedule.setTime("");
                    }
                    if (!"".equals(deliverySchTblVal[4])) {
                        deliverySchedule.setPurchaseRequestNumber(deliverySchTblVal[4]);
                    } else {
                        deliverySchedule.setPurchaseRequestNumber("");
                    }
                    if (!"".equals(deliverySchTblVal[5])) {
                        deliverySchedule.setRequestItemNumber(deliverySchTblVal[5]);
                    } else {
                        deliverySchedule.setRequestItemNumber("");
                    }
                    if (!"".equals(deliverySchTblVal[6])) {
                        deliverySchedule.setPrItemNumber(deliverySchTblVal[6]);
                    } else {
                        deliverySchedule.setPrItemNumber("");
                    }
                    if (!"".equals(deliverySchTblVal[7])) {
                        deliverySchedule.setLinkId(deliverySchTblVal[7]);
                    } else {
                        deliverySchedule.setLinkId("");
                    }
                    if (!"".equals(insertionOrderId)) {
                        deliverySchedule.setLineItemNumber(insertionOrderId);
                    } else {
                        deliverySchedule.setLineItemNumber("");
                    }
                    if (!"".equals(deliverySchTblVal[8])) {
                        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                        try {
                            Date statisticalDeliveryDate = formatter.parse(deliverySchTblVal[8]);
                            System.out.println("statisticalDeliveryDate :" + statisticalDeliveryDate);
                            System.out.println(formatter.format(statisticalDeliveryDate));
                            deliverySchedule.setStatisticalDeliveryDate(statisticalDeliveryDate);
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                    } else {
                        deliverySchedule.setStatisticalDeliveryDate(null);
                    }
                    if (!"".equals(deliverySchTblVal[9]) && !"NA".equals(deliverySchTblVal[9])) {
                        deliverySchedule.setGrQty(new BigDecimal(deliverySchTblVal[9]));
                    } else {
                        deliverySchedule.setGrQty(new BigDecimal(0.0));
                    }
                    if (!"".equals(deliverySchTblVal[10]) && !"NA".equals(deliverySchTblVal[10])) {
                        deliverySchedule.setOpenQuantity(new BigDecimal(deliverySchTblVal[10]));
                    } else {
                        deliverySchedule.setOpenQuantity(new BigDecimal(0.0));
                    }
                    if (!"".equals(deliverySchTblVal[11]) && !"NA".equals(deliverySchTblVal[11])) {
                        deliverySchedule.setSchLine(deliverySchTblVal[11]);
                    } else {
                        deliverySchedule.setSchLine("");
                    }
                    String msg = saveDeliverySchedule(deliverySchedule);
                    System.out.println("msg :" + msg);
                }
//                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveDeliveryTabData")) {
                out = response.getWriter();
                System.out.println("deliveryString");
                String deliveryString = request.getParameter("deliveryString");
                System.out.println("deliveryString :" + deliveryString);
                String[] deliveryArr = deliveryString.split(",");
                System.out.println("deliveryArr length :" + deliveryArr.length);

                List<Delivery> deliveryList = getDeliveryByInsertionId(deliveryArr[17]);
                if (!deliveryList.isEmpty()) {
                    Delivery deliveryObj = deliveryList.get(0);
                    if (!"".equals(deliveryArr[0])) {
                        deliveryObj.setOverdeliveryTolerance(new BigDecimal(deliveryArr[0]));
                    } else {
                        deliveryObj.setOverdeliveryTolerance(new BigDecimal(0.0));
                    }
                    if (!"".equals(deliveryArr[1])) {
                        deliveryObj.setUnderdeliveryTolerance(new BigDecimal(deliveryArr[1]));
                    } else {
                        deliveryObj.setUnderdeliveryTolerance(new BigDecimal(0.0));
                    }
                    if (!"".equals(deliveryArr[2])) {
                        deliveryObj.setShippingInstruction(deliveryArr[2]);
                    } else {
                        deliveryObj.setShippingInstruction("");
                    }
                    if (!"".equals(deliveryArr[3])) {
                        deliveryObj.setStockType(deliveryArr[3]);
                    } else {
                        deliveryObj.setStockType("");
                    }
                    if (!"".equals(deliveryArr[4])) {
                        deliveryObj.setValuationType(deliveryArr[4]);
                    } else {
                        deliveryObj.setValuationType("");
                    }
                    if (!"".equals(deliveryArr[5])) {
                        deliveryObj.setRemShelfLife(deliveryArr[5]);
                    } else {
                        deliveryObj.setRemShelfLife("");
                    }
                    if (!"".equals(deliveryArr[6])) {
                        deliveryObj.setQaControlLife(deliveryArr[6]);
                    } else {
                        deliveryObj.setQaControlLife("");
                    }
                    if (!"".equals(deliveryArr[7])) {
                        deliveryObj.setGrPROCTime(deliveryArr[7]);
                    } else {
                        deliveryObj.setGrPROCTime("");
                    }
                    if (!"".equals(deliveryArr[8])) {
                        deliveryObj.setFirstRemender(deliveryArr[8]);
                    } else {
                        deliveryObj.setFirstRemender("");
                    }
                    if (!"".equals(deliveryArr[9])) {
                        deliveryObj.setSecondRemender(deliveryArr[9]);
                    } else {
                        deliveryObj.setSecondRemender("");
                    }
                    if (!"".equals(deliveryArr[10])) {
                        deliveryObj.setThirdRemender(deliveryArr[10]);
                    } else {
                        deliveryObj.setThirdRemender("");
                    }
                    if (!"".equals(deliveryArr[11])) {
                        deliveryObj.setGoodsReceipt(deliveryArr[11]);
                    } else {
                        deliveryObj.setGoodsReceipt("");
                    }
                    if (!"".equals(deliveryArr[12])) {
                        deliveryObj.setGrNonValuated(deliveryArr[12]);
                    } else {
                        deliveryObj.setGrNonValuated("");
                    }
                    if (!"".equals(deliveryArr[13])) {
                        deliveryObj.setDelivCompleted(deliveryArr[13]);
                    } else {
                        deliveryObj.setDelivCompleted("");
                    }
                    if (!"".equals(deliveryArr[14])) {
                        deliveryObj.setNoExpend(deliveryArr[14]);
                    } else {
                        deliveryObj.setNoExpend("");
                    }
                    if (!"".equals(deliveryArr[15])) {
                        deliveryObj.setPlDeliveryTime(deliveryArr[15]);
                    } else {
                        deliveryObj.setPlDeliveryTime("");
                    }
                    if (!"".equals(deliveryArr[16])) {
                        deliveryObj.setIncoTerms(deliveryArr[16]);
                    } else {
                        deliveryObj.setIncoTerms("");
                    }
                    if (!"".equals(deliveryArr[17])) {
                        deliveryObj.setLineItemNumber(deliveryArr[17]);
                    } else {
                        deliveryObj.setLineItemNumber("");
                    }
                    if (!"".equals(deliveryArr[18])) {
                        deliveryObj.setPrItemNumber(deliveryArr[18]);
                    } else {
                        deliveryObj.setPrItemNumber("");
                    }
                    if (!"".equals(deliveryArr[19])) {
                        deliveryObj.setLinkId(deliveryArr[19]);
                    } else {
                        deliveryObj.setLinkId("");
                    }
                    if (!"".equals(deliveryArr[20])) {
                        deliveryObj.setUnlimited(deliveryArr[20]);
                    } else {
                        deliveryObj.setUnlimited("");
                    }
//                    if (!"".equals(deliveryArr[21]) && !"NA".equals(deliveryArr[21])) {
//                        deliveryObj.setIncoTerms1(deliveryArr[21]);
//                    } else {
//                        deliveryObj.setIncoTerms1("");
//                    }
                    deliveryObj.setLatestGRDate(new Date());
//                    conditionsLineLevel.setConditionDetails(conValues[11]);
                    String msg = updateDelivery(deliveryObj);
                    System.out.println("msg :" + msg);
                } else {
                    if (!"".equals(deliveryArr[0])) {
                        delivery.setOverdeliveryTolerance(new BigDecimal(deliveryArr[0]));
                    } else {
                        delivery.setOverdeliveryTolerance(new BigDecimal(0.0));
                    }
                    if (!"".equals(deliveryArr[1])) {
                        delivery.setUnderdeliveryTolerance(new BigDecimal(deliveryArr[1]));
                    } else {
                        delivery.setUnderdeliveryTolerance(new BigDecimal(0.0));
                    }
                    if (!"".equals(deliveryArr[2])) {
                        delivery.setShippingInstruction(deliveryArr[2]);
                    } else {
                        delivery.setShippingInstruction("");
                    }
                    if (!"".equals(deliveryArr[3])) {
                        delivery.setStockType(deliveryArr[3]);
                    } else {
                        delivery.setStockType("");
                    }
                    if (!"".equals(deliveryArr[4])) {
                        delivery.setValuationType(deliveryArr[4]);
                    } else {
                        delivery.setValuationType("");
                    }
                    if (!"".equals(deliveryArr[5])) {
                        delivery.setRemShelfLife(deliveryArr[5]);
                    } else {
                        delivery.setRemShelfLife("");
                    }
                    if (!"".equals(deliveryArr[6])) {
                        delivery.setQaControlLife(deliveryArr[6]);
                    } else {
                        delivery.setQaControlLife("");
                    }
                    if (!"".equals(deliveryArr[7])) {
                        delivery.setGrPROCTime(deliveryArr[7]);
                    } else {
                        delivery.setGrPROCTime("");
                    }
                    if (!"".equals(deliveryArr[8])) {
                        delivery.setFirstRemender(deliveryArr[8]);
                    } else {
                        delivery.setFirstRemender("");
                    }
                    if (!"".equals(deliveryArr[9])) {
                        delivery.setSecondRemender(deliveryArr[9]);
                    } else {
                        delivery.setSecondRemender("");
                    }
                    if (!"".equals(deliveryArr[10])) {
                        delivery.setThirdRemender(deliveryArr[10]);
                    } else {
                        delivery.setThirdRemender("");
                    }
                    if (!"".equals(deliveryArr[11])) {
                        delivery.setGoodsReceipt(deliveryArr[11]);
                    } else {
                        delivery.setGoodsReceipt("");
                    }
                    if (!"".equals(deliveryArr[12])) {
                        delivery.setGrNonValuated(deliveryArr[12]);
                    } else {
                        delivery.setGrNonValuated("");
                    }
                    if (!"".equals(deliveryArr[13])) {
                        delivery.setDelivCompleted(deliveryArr[13]);
                    } else {
                        delivery.setDelivCompleted("");
                    }
                    if (!"".equals(deliveryArr[14])) {
                        delivery.setNoExpend(deliveryArr[14]);
                    } else {
                        delivery.setNoExpend("");
                    }
                    if (!"".equals(deliveryArr[15])) {
                        delivery.setPlDeliveryTime(deliveryArr[15]);
                    } else {
                        delivery.setPlDeliveryTime("");
                    }
                    if (!"".equals(deliveryArr[16])) {
                        delivery.setIncoTerms(deliveryArr[16]);
                    } else {
                        delivery.setIncoTerms("");
                    }
                    if (!"".equals(deliveryArr[17])) {
                        delivery.setLineItemNumber(deliveryArr[17]);
                    } else {
                        delivery.setLineItemNumber("");
                    }
                    if (!"".equals(deliveryArr[18])) {
                        delivery.setPrItemNumber(deliveryArr[18]);
                    } else {
                        delivery.setPrItemNumber("");
                    }
                    if (!"".equals(deliveryArr[19])) {
                        delivery.setLinkId(deliveryArr[19]);
                    } else {
                        delivery.setLinkId("");
                    }
                    if (!"".equals(deliveryArr[20])) {
                        delivery.setUnlimited(deliveryArr[20]);
                    } else {
                        delivery.setUnlimited("");
                    }
                    if (!"".equals(deliveryArr[21]) && !"NA".equals(deliveryArr[21])) {
                        delivery.setIncoTerms1(deliveryArr[21]);
                    } else {
                        delivery.setIncoTerms1("");
                    }
                    delivery.setLatestGRDate(new Date());
//                    conditionsLineLevel.setConditionDetails(conValues[11]);
                    String msg = saveDelivery(delivery);
                    System.out.println("msg :" + msg);
                }

//                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveInvoiceTabData")) {
                out = response.getWriter();
                System.out.println("saveInvoiceTabData");
                String invoiceString = request.getParameter("invoiceString");

                System.out.println("invoiceString :" + invoiceString);
                String[] invoiceArr = invoiceString.split(",");
                System.out.println("invoiceArr length :" + invoiceArr.length);

                System.out.println("PR Item number :" + invoiceArr[7]);
                List<Invoice> invoiceList = getInvoiceByInsertionId(invoiceArr[5]);
                if (!invoiceList.isEmpty()) {
                    Invoice invoiceObj = invoiceList.get(0);
                    if (!"".equals(invoiceArr[0])) {
                        invoiceObj.setInvoiceReceipt(invoiceArr[0]);
                    } else {
                        invoiceObj.setInvoiceReceipt("");
                    }
                    if (!"".equals(invoiceArr[1])) {
                        invoiceObj.setFinalInvoice(invoiceArr[1]);
                    } else {
                        invoiceObj.setFinalInvoice("");
                    }
                    if (!"".equals(invoiceArr[2])) {
                        invoiceObj.setGrBasedIV(invoiceArr[2]);
                    } else {
                        invoiceObj.setGrBasedIV("");
                    }
                    if (!"".equals(invoiceArr[3])) {
                        invoiceObj.setDpCategory(invoiceArr[3]);
                    } else {
                        invoiceObj.setDpCategory("");
                    }
                    if (!"".equals(invoiceArr[4])) {
                        invoiceObj.setTaxCode(invoiceArr[4]);
                    } else {
                        invoiceObj.setTaxCode("");
                    }
                    if (!"".equals(invoiceArr[5])) {
                        invoiceObj.setLineItemNumber(invoiceArr[5]);
                    } else {
                        invoiceObj.setLineItemNumber("");
                    }
                    if (!"".equals(invoiceArr[6])) {
                        invoiceObj.setDescription(invoiceArr[6]);
                    } else {
                        invoiceObj.setDescription("");
                    }
                    if (!"".equals(invoiceArr[7])) {
                        invoiceObj.setPrItemNumber(invoiceArr[7]);
                    } else {
                        invoiceObj.setPrItemNumber("");
                    }
                    if (!"".equals(invoiceArr[8])) {
                        invoiceObj.setLinkId(invoiceArr[8]);
                    } else {
                        invoiceObj.setLinkId("");
                    }
                    if (!"".equals(invoiceArr[9])) {
                        invoiceObj.setServiceBasedIV(invoiceArr[9]);
                    } else {
                        invoiceObj.setServiceBasedIV("");
                    }
                    String msg = updateInvoice(invoiceObj);
                    System.out.println("msg :" + msg);
                } else {
                    System.out.println("Description :" + invoiceArr[6]);
                    if (!"".equals(invoiceArr[0])) {
                        invoice.setInvoiceReceipt(invoiceArr[0]);
                    } else {
                        invoice.setInvoiceReceipt("");
                    }
                    if (!"".equals(invoiceArr[1])) {
                        invoice.setFinalInvoice(invoiceArr[1]);
                    } else {
                        invoice.setFinalInvoice("");
                    }
                    if (!"".equals(invoiceArr[2])) {
                        invoice.setGrBasedIV(invoiceArr[2]);
                    } else {
                        invoice.setGrBasedIV("");
                    }
                    if (!"".equals(invoiceArr[3])) {
                        invoice.setDpCategory(invoiceArr[3]);
                    } else {
                        invoice.setDpCategory("");
                    }
                    if (!"".equals(invoiceArr[4])) {
                        invoice.setTaxCode(invoiceArr[4]);
                    } else {
                        invoice.setTaxCode("");
                    }
                    if (!"".equals(invoiceArr[5])) {
                        invoice.setLineItemNumber(invoiceArr[5]);
                    } else {
                        invoice.setLineItemNumber("");
                    }
                    if (!"".equals(invoiceArr[6])) {
                        invoice.setDescription(invoiceArr[6]);
                    } else {
                        invoice.setDescription("");
                    }
                    if (!"".equals(invoiceArr[7])) {
                        invoice.setPrItemNumber(invoiceArr[7]);
                    } else {
                        invoice.setPrItemNumber("");
                    }
                    if (!"".equals(invoiceArr[8])) {
                        invoice.setLinkId(invoiceArr[8]);
                    } else {
                        invoice.setLinkId("");
                    }
                    if (!"".equals(invoiceArr[9])) {
                        invoice.setServiceBasedIV(invoiceArr[9]);
                    } else {
                        invoice.setServiceBasedIV("");
                    }
                    String msg = saveInvoice(invoice);
                    System.out.println("msg :" + msg);
                }

//                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveQuantityDates")) {
                out = response.getWriter();
                System.out.println("saveQuantityDates");
                String quantityString = request.getParameter("quantityString");
                System.out.println("quantityString :" + quantityString);
                String[] quantityArr = quantityString.split(",");
                System.out.println("quantityArr length :" + quantityArr.length);

                List<QuantityDates> quantityList = getQuantityDatesByInsertionId(quantityArr[12]);
                if (!quantityList.isEmpty()) {
                    QuantityDates quantityObj = quantityList.get(0);
                    if (!"".equals(quantityArr[0])) {
                        quantityObj.setPoQuantity(quantityArr[0]);
                    } else {
                        quantityObj.setPoQuantity("");
                    }
                    if (!"".equals(quantityArr[1])) {
                        quantityObj.setUnitPOQuantity(quantityArr[1]);
                    } else {
                        quantityObj.setUnitPOQuantity("");
                    }
                    if (!"".equals(quantityArr[2])) {
                        quantityObj.setPoQuantityInSKU(quantityArr[2]);
                    } else {
                        quantityObj.setPoQuantityInSKU("");
                    }
                    if (!"".equals(quantityArr[3])) {
                        quantityObj.setUnitPOQuantityInSKU(quantityArr[3]);
                    } else {
                        quantityObj.setUnitPOQuantityInSKU("");
                    }
                    if (!"".equals(quantityArr[4])) {
                        quantityObj.setOrderUnit(quantityArr[4]);
                    } else {
                        quantityObj.setOrderUnit("");
                    }
                    if (!"".equals(quantityArr[5])) {
                        quantityObj.setUnitOrderUnit(quantityArr[5]);
                    } else {
                        quantityObj.setUnitOrderUnit("");
                    }
                    if (!"".equals(quantityArr[6])) {
                        quantityObj.setOrderPriceUnit(quantityArr[6]);
                    } else {
                        quantityObj.setOrderPriceUnit("");
                    }
                    if (!"".equals(quantityArr[7])) {
                        quantityObj.setUnitOrderPriceUnit(quantityArr[7]);
                    } else {
                        quantityObj.setUnitOrderPriceUnit("");
                    }
                    if (!"".equals(quantityArr[8])) {
                        quantityObj.setOrderUnitSKU(quantityArr[8]);
                    } else {
                        quantityObj.setOrderUnitSKU("");
                    }
                    if (!"".equals(quantityArr[9])) {
                        quantityObj.setUnitOrderUnitSKU(quantityArr[9]);
                    } else {
                        quantityObj.setUnitOrderUnitSKU("");
                    }
                    if (!"".equals(quantityArr[10])) {
                        quantityObj.setSku(quantityArr[10]);
                    } else {
                        quantityObj.setSku("");
                    }
                    if (!"".equals(quantityArr[11])) {
                        quantityObj.setUnitSKU(quantityArr[11]);
                    } else {
                        quantityObj.setUnitSKU("");
                    }
                    if (!"".equals(quantityArr[12])) {
                        quantityObj.setLineItemNumber(quantityArr[12]);
                    } else {
                        quantityObj.setLineItemNumber("");
                    }
                    if (!"".equals(quantityArr[13])) {
                        quantityObj.setPrItemNumber(quantityArr[13]);
                    } else {
                        quantityObj.setPrItemNumber("");
                    }
                    if (!"".equals(quantityArr[14])) {
                        quantityObj.setLinkId(quantityArr[14]);
                    } else {
                        quantityObj.setLinkId("");
                    }
                    if (!"".equals(quantityArr[15])) {
                        quantityObj.setNetWeight(quantityArr[15]);
                    } else {
                        quantityObj.setNetWeight("");
                    }
                    if (!"".equals(quantityArr[16])) {
                        quantityObj.setGrossWeight(quantityArr[16]);
                    } else {
                        quantityObj.setGrossWeight("");
                    }
                    if (!"".equals(quantityArr[17]) && !"NA".equals(quantityArr[17])) {
                        quantityObj.setVolume(quantityArr[17]);
                    } else {
                        quantityObj.setVolume("");
                    }
                    if (!"".equals(quantityArr[18]) && !"NA".equals(quantityArr[18])) {
                        quantityObj.setPoints(quantityArr[18]);
                    } else {
                        quantityObj.setPoints("");
                    }
                    String msg = updateQuantityDates(quantityObj);
                    System.out.println("msg :" + msg);
                } else {
                    if (!"".equals(quantityArr[0])) {
                        quantityDates.setPoQuantity(quantityArr[0]);
                    } else {
                        quantityDates.setPoQuantity("");
                    }
                    if (!"".equals(quantityArr[1])) {
                        quantityDates.setUnitPOQuantity(quantityArr[1]);
                    } else {
                        quantityDates.setUnitPOQuantity("");
                    }
                    if (!"".equals(quantityArr[2])) {
                        quantityDates.setPoQuantityInSKU(quantityArr[2]);
                    } else {
                        quantityDates.setPoQuantityInSKU("");
                    }
                    if (!"".equals(quantityArr[3])) {
                        quantityDates.setUnitPOQuantityInSKU(quantityArr[3]);
                    } else {
                        quantityDates.setUnitPOQuantityInSKU("");
                    }
                    if (!"".equals(quantityArr[4])) {
                        quantityDates.setOrderUnit(quantityArr[4]);
                    } else {
                        quantityDates.setOrderUnit("");
                    }
                    if (!"".equals(quantityArr[5])) {
                        quantityDates.setUnitOrderUnit(quantityArr[5]);
                    } else {
                        quantityDates.setUnitOrderUnit("");
                    }
                    if (!"".equals(quantityArr[6])) {
                        quantityDates.setOrderPriceUnit(quantityArr[6]);
                    } else {
                        quantityDates.setOrderPriceUnit("");
                    }
                    if (!"".equals(quantityArr[7])) {
                        quantityDates.setUnitOrderPriceUnit(quantityArr[7]);
                    } else {
                        quantityDates.setUnitOrderPriceUnit("");
                    }
                    if (!"".equals(quantityArr[8])) {
                        quantityDates.setOrderUnitSKU(quantityArr[8]);
                    } else {
                        quantityDates.setOrderUnitSKU("");
                    }
                    if (!"".equals(quantityArr[9])) {
                        quantityDates.setUnitOrderUnitSKU(quantityArr[9]);
                    } else {
                        quantityDates.setUnitOrderUnitSKU("");
                    }
                    if (!"".equals(quantityArr[10])) {
                        quantityDates.setSku(quantityArr[10]);
                    } else {
                        quantityDates.setSku("");
                    }
                    if (!"".equals(quantityArr[11])) {
                        quantityDates.setUnitSKU(quantityArr[11]);
                    } else {
                        quantityDates.setUnitSKU("");
                    }
                    if (!"".equals(quantityArr[12])) {
                        quantityDates.setLineItemNumber(quantityArr[12]);
                    } else {
                        quantityDates.setLineItemNumber("");
                    }
                    if (!"".equals(quantityArr[13])) {
                        quantityDates.setPrItemNumber(quantityArr[13]);
                    } else {
                        quantityDates.setPrItemNumber("");
                    }
                    if (!"".equals(quantityArr[14])) {
                        quantityDates.setLinkId(quantityArr[14]);
                    } else {
                        quantityDates.setLinkId("");
                    }
                    if (!"".equals(quantityArr[15])) {
                        quantityDates.setNetWeight(quantityArr[15]);
                    } else {
                        quantityDates.setNetWeight("");
                    }
                    if (!"".equals(quantityArr[16])) {
                        quantityDates.setGrossWeight(quantityArr[16]);
                    } else {
                        quantityDates.setGrossWeight("");
                    }
                    if (!"".equals(quantityArr[17]) && !"NA".equals(quantityArr[17])) {
                        quantityDates.setVolume(quantityArr[17]);
                    } else {
                        quantityDates.setVolume("");
                    }
                    if (!"".equals(quantityArr[17]) && !"NA".equals(quantityArr[17])) {
                        quantityDates.setPoints(quantityArr[18]);
                    } else {
                        quantityDates.setPoints("");
                    }
                    String msg = saveQuantityDates(quantityDates);
                    System.out.println("msg :" + msg);
                }

//                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveAccAsgnTabTblData")) {
                out = response.getWriter();
                System.out.println("saveAccAsgnTabTblData");

                String accAsgnTblRowString = request.getParameter("accAsgnTblRowString");
                System.out.println("accAsgnTblRowString :" + accAsgnTblRowString);
                String[] accAsgnTblRowArr = accAsgnTblRowString.split("#");

                System.out.println("accAsgnTblRowArr length :" + accAsgnTblRowArr.length);

                String[] accAsgnVal = null;
                for (String accAsgnTblRow : accAsgnTblRowArr) {
                    System.out.println("accAsgnTblRow values :" + accAsgnTblRow);
                    accAsgnVal = accAsgnTblRow.split(",");
                }
                List<AccountAssignment> accAsgnList = getAccountAssignmentByLineItemNumber(accAsgnVal[18]);
                if (!accAsgnList.isEmpty()) {
                    deleteAllFromAccountAssignment(accAsgnList);
                }
                for (String accAsgnTblRow : accAsgnTblRowArr) {
                    System.out.println("accAsgnTblRow values :" + accAsgnTblRow);
                    String[] accAsgnTblVal = accAsgnTblRow.split(",");

                    if (!"".equals(accAsgnTblVal[0])) {
                        accountAssignment.setQuantity(new BigDecimal(accAsgnTblVal[0]));
                    } else {
                        accountAssignment.setQuantity(new BigDecimal(0.0));
                    }
                    if (!"".equals(accAsgnTblVal[1])) {
                        accountAssignment.setPercentage(new BigDecimal(accAsgnTblVal[1]));
                    } else {
                        accountAssignment.setPercentage(new BigDecimal(0.0));
                    }
                    if (!"".equals(accAsgnTblVal[2])) {
                        accountAssignment.setGLAccount(accAsgnTblVal[2]);
                        int comItem = Integer.parseInt(accAsgnTblVal[2]);
                        System.out.println("comItem :" + comItem);
                        accountAssignment.setCommitmentItem(Integer.toString(comItem));
                    } else {
                        accountAssignment.setGLAccount("");
                        accountAssignment.setCommitmentItem("");
                    }
                    if (!"".equals(accAsgnTblVal[3])) {
                        accountAssignment.setCOArea(accAsgnTblVal[3]);
                    } else {
                        accountAssignment.setCOArea("");
                    }
                    if (!"".equals(accAsgnTblVal[4])) {
                        accountAssignment.setCostCenter(accAsgnTblVal[4]);
                    } else {
                        accountAssignment.setCostCenter("");
                    }
                    if (!"".equals(accAsgnTblVal[5])) {
                        accountAssignment.setFund(accAsgnTblVal[5]);
                    } else {
                        accountAssignment.setFund("");
                    }
                    if (!"".equals(accAsgnTblVal[6])) {
                        accountAssignment.setFunctionalArea(accAsgnTblVal[6]);
                    } else {
                        accountAssignment.setFunctionalArea("");
                    }
                    if (!"".equals(accAsgnTblVal[4])) {
                        accountAssignment.setFundCenter(accAsgnTblVal[4]);
                    } else {
                        accountAssignment.setFundCenter("");
                    }
//                    if (!"".equals(accAsgnTblVal[8])) {
//                        int comItem = Integer.parseInt(accAsgnTblVal[8]);
//                        System.out.println("comItem :" + comItem);
//                        serviceAccountAssignment.setCommitmentItem(Integer.toString(comItem));
////                        accountAssignment.setCommitmentItem(accAsgnTblVal[8]);
//                    } else {
//                        accountAssignment.setCommitmentItem("");
//                    }
                    if (!"".equals(accAsgnTblVal[9])) {
                        accountAssignment.setUnloadingPoint(accAsgnTblVal[9]);
                    } else {
                        accountAssignment.setUnloadingPoint("");
                    }
                    if (!"".equals(accAsgnTblVal[10])) {
                        accountAssignment.setRecipient(accAsgnTblVal[10]);
                    } else {
                        accountAssignment.setRecipient("");
                    }
                    if (!"".equals(accAsgnTblVal[11])) {
                        accountAssignment.setAccAsgnTblOrder(accAsgnTblVal[11]);
                    } else {
                        accountAssignment.setAccAsgnTblOrder("");
                    }
                    if (!"".equals(accAsgnTblVal[12])) {
                        accountAssignment.setAsset(accAsgnTblVal[12]);
                    } else {
                        accountAssignment.setAsset("");
                    }
                    if (!"".equals(accAsgnTblVal[13])) {
                        accountAssignment.setWBSElement(accAsgnTblVal[13]);
                    } else {
                        accountAssignment.setWBSElement("");
                    }
                    if (!"".equals(accAsgnTblVal[14])) {
                        accountAssignment.setSalesOrder(accAsgnTblVal[14]);
                    } else {
                        accountAssignment.setSalesOrder("");
                    }
                    if (!"".equals(accAsgnTblVal[15])) {
                        accountAssignment.setNetActNumber(accAsgnTblVal[15]);
                    } else {
                        accountAssignment.setNetActNumber("");
                    }
                    if (!"".equals(accAsgnTblVal[16])) {
                        accountAssignment.setItemNumber(accAsgnTblVal[16]);
                    } else {
                        accountAssignment.setItemNumber("");
                    }
                    if (!"".equals(accAsgnTblVal[17])) {
                        System.out.println("Delivery Schedule in Save:" + accAsgnTblVal[17]);
                        accountAssignment.setDeliverySchedule(accAsgnTblVal[17]);
                    } else {
                        accountAssignment.setDeliverySchedule("");
                    }
                    if (!"".equals(accAsgnTblVal[18])) {
                        accountAssignment.setLineItemNumber(accAsgnTblVal[18]);
                    } else {
                        accountAssignment.setLineItemNumber("");
                    }
                    if (!"".equals(accAsgnTblVal[19])) {
                        accountAssignment.setAccountAssignmentCategory(accAsgnTblVal[19]);
                    } else {
                        accountAssignment.setAccountAssignmentCategory("");
                    }
                    if (!"".equals(accAsgnTblVal[20])) {
                        accountAssignment.setDistribution(accAsgnTblVal[20]);
                    } else {
                        accountAssignment.setDistribution("");
                    }
                    if (!"".equals(accAsgnTblVal[21])) {
                        accountAssignment.setCoCode("");
                    }
                    if (!"".equals(accAsgnTblVal[22])) {
                        accountAssignment.setLinkNumber(accAsgnTblVal[22]);
                    } else {
                        accountAssignment.setLinkNumber("");
                    }
                    if (!"".equals(accAsgnTblVal[23])) {
                        accountAssignment.setPrItemNumber(accAsgnTblVal[23]);
                    } else {
                        accountAssignment.setPrItemNumber("");
                    }
                    if (!"".equals(accAsgnTblVal[24])) {
                        accountAssignment.setLinkId(accAsgnTblVal[24]);
                    } else {
                        accountAssignment.setLinkId("");
                    }
                    if (!"".equals(accAsgnTblVal[25])) {
                        accountAssignment.setPartialInvoiceIndicator(accAsgnTblVal[25]);
                    } else {
                        accountAssignment.setPartialInvoiceIndicator("");
                    }
                    accountAssignment.setServiceLineItemNumber("");
                    if (!"".equals(accAsgnTblVal[26]) && !"NON".equals(accAsgnTblVal[26])) {
                        accountAssignment.setIsDeleteFlag(accAsgnTblVal[26]);
                    } else {
                        accountAssignment.setIsDeleteFlag("");
                    }
                    String msg = saveAccountAssignment(accountAssignment);
                    System.out.println("msg :" + msg);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveAccAsgnTabFieldData")) {
                out = response.getWriter();
                System.out.println("saveAccAsgnTabFieldData");
                String accAsgnValString = request.getParameter("accAsgnValString");

                System.out.println("accAsgnValString :" + accAsgnValString);
                String[] accAsgnRowArr = accAsgnValString.split(",");

                System.out.println("accAsgnRowArr length :" + accAsgnRowArr.length);

                List<AccountAssignment> accAsgnList = getAccountAssignmentByLineItemNumber(accAsgnRowArr[18]);
                if (!accAsgnList.isEmpty()) {
                    deleteAllFromAccountAssignment(accAsgnList);
                }
                if (!"".equals(accAsgnRowArr[0])) {
                    accountAssignment.setQuantity(new BigDecimal(accAsgnRowArr[0]));
                } else {
                    accountAssignment.setQuantity(new BigDecimal(0.0));
                }
                if (!"".equals(accAsgnRowArr[1])) {
                    accountAssignment.setPercentage(new BigDecimal(accAsgnRowArr[1]));
                } else {
                    accountAssignment.setPercentage(new BigDecimal(0.0));
                }
                if (!"".equals(accAsgnRowArr[2])) {
                    accountAssignment.setGLAccount(accAsgnRowArr[2]);
                    int comItem = Integer.parseInt(accAsgnRowArr[2]);
                    System.out.println("comItem :" + comItem);
                    accountAssignment.setCommitmentItem(Integer.toString(comItem));
                } else {
                    accountAssignment.setGLAccount("");
                    accountAssignment.setCommitmentItem("");
                }
                if (!"".equals(accAsgnRowArr[3])) {
                    accountAssignment.setCOArea(accAsgnRowArr[3]);
                }
                if (!"".equals(accAsgnRowArr[4])) {
                    accountAssignment.setCostCenter(accAsgnRowArr[4]);
                } else {
                    accountAssignment.setCostCenter("");
                }
                if (!"".equals(accAsgnRowArr[5])) {
                    accountAssignment.setFund(accAsgnRowArr[5]);
                } else {
                    accountAssignment.setFund("");
                }
                if (!"".equals(accAsgnRowArr[6])) {
                    accountAssignment.setFunctionalArea(accAsgnRowArr[6]);
                } else {
                    accountAssignment.setFunctionalArea("");
                }
                if (!"".equals(accAsgnRowArr[4])) {
                    accountAssignment.setFundCenter(accAsgnRowArr[4]);
                } else {
                    accountAssignment.setFundCenter("");
                }
//                if (!"".equals(accAsgnRowArr[8])) {
//                    int comItem = Integer.parseInt(accAsgnRowArr[8]);
//                    System.out.println("comItem :" + comItem);
//                    accountAssignment.setCommitmentItem(Integer.toString(comItem));
////                    accountAssignment.setCommitmentItem(accAsgnRowArr[8]);
//                } else {
//                    accountAssignment.setCommitmentItem("");
//                }
                if (!"".equals(accAsgnRowArr[9])) {
                    accountAssignment.setUnloadingPoint(accAsgnRowArr[9]);
                } else {
                    accountAssignment.setUnloadingPoint("");
                }
                if (!"".equals(accAsgnRowArr[10])) {
                    accountAssignment.setRecipient(accAsgnRowArr[10]);
                } else {
                    accountAssignment.setRecipient("");
                }
                if (!"".equals(accAsgnRowArr[11])) {
                    accountAssignment.setAccAsgnTblOrder(accAsgnRowArr[11]);
                } else {
                    accountAssignment.setAccAsgnTblOrder("");
                }
                if (!"".equals(accAsgnRowArr[12])) {
                    accountAssignment.setAsset(accAsgnRowArr[12]);
                } else {
                    accountAssignment.setAsset("");
                }
                if (!"".equals(accAsgnRowArr[13])) {
                    accountAssignment.setWBSElement(accAsgnRowArr[13]);
                } else {
                    accountAssignment.setWBSElement("");
                }
                if (!"".equals(accAsgnRowArr[14])) {
                    accountAssignment.setSalesOrder(accAsgnRowArr[14]);
                } else {
                    accountAssignment.setSalesOrder("");
                }
                if (!"".equals(accAsgnRowArr[15])) {
                    accountAssignment.setNetActNumber(accAsgnRowArr[15]);
                } else {
                    accountAssignment.setNetActNumber("");
                }
                if (!"".equals(accAsgnRowArr[16])) {
                    accountAssignment.setItemNumber(accAsgnRowArr[16]);
                } else {
                    accountAssignment.setItemNumber("");
                }
                if (!"".equals(accAsgnRowArr[17])) {
                    accountAssignment.setDeliverySchedule(accAsgnRowArr[17]);
                } else {
                    accountAssignment.setDeliverySchedule("");
                }
                if (!"".equals(accAsgnRowArr[18])) {
                    accountAssignment.setLineItemNumber(accAsgnRowArr[18]);
                } else {
                    accountAssignment.setLineItemNumber("");
                }
                if (!"".equals(accAsgnRowArr[19])) {
                    accountAssignment.setAccountAssignmentCategory(accAsgnRowArr[19]);
                } else {
                    accountAssignment.setAccountAssignmentCategory("");
                }
                if (!"".equals(accAsgnRowArr[20])) {
                    accountAssignment.setDistribution(accAsgnRowArr[20]);
                } else {
                    accountAssignment.setDistribution("");
                }
                if (!"".equals(accAsgnRowArr[21])) {
                    accountAssignment.setCoCode(accAsgnRowArr[21]);
                } else {
                    accountAssignment.setCoCode("");
                }
                if (!"".equals(accAsgnRowArr[22])) {
                    accountAssignment.setPrItemNumber(accAsgnRowArr[22]);
                } else {
                    accountAssignment.setPrItemNumber("");
                }
                if (!"".equals(accAsgnRowArr[23])) {
                    accountAssignment.setLinkId(accAsgnRowArr[23]);
                } else {
                    accountAssignment.setLinkId("");
                }
                if (!"".equals(accAsgnRowArr[24])) {
                    accountAssignment.setPartialInvoiceIndicator(accAsgnRowArr[24]);
                } else {
                    accountAssignment.setPartialInvoiceIndicator("");
                }

                accountAssignment.setServiceLineItemNumber("");
                String msg = saveAccountAssignment(accountAssignment);
                System.out.println("msg :" + msg);
//                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveTextTabData")) {
                out = response.getWriter();
                System.out.println("saveTextTabData");
                String textString = request.getParameter("textString");

                System.out.println("textString :" + textString);
                String[] textArr = textString.split(",");
                System.out.println("textArr length :" + textArr.length);

                List<Text> textList = getTextsByInsertionId(textArr[5]);
                if (!textList.isEmpty()) {
                    Text textObj = textList.get(0);
                    if (!"".equals(textArr[0])) {
                        textObj.setItemTax(textArr[0]);
                    } else {
                        textObj.setItemTax("");
                    }
                    if (!"".equals(textArr[1])) {
                        textObj.setInfoRecordPOText(textArr[1]);
                    } else {
                        textObj.setInfoRecordPOText("");
                    }
                    if (!"".equals(textArr[2])) {
                        textObj.setMaterialPOText(textArr[2]);
                    } else {
                        textObj.setMaterialPOText("");
                    }
                    if (!"".equals(textArr[3])) {
                        textObj.setPoNoteToApprover(textArr[3]);
                    } else {
                        textObj.setPoNoteToApprover("");
                    }
                    if (!"".equals(textArr[4])) {
                        textObj.setDeliveryText(textArr[4]);
                    } else {
                        textObj.setDeliveryText("");
                    }
                    if (!"".equals(textArr[5])) {
                        textObj.setLineItemNumber(textArr[5]);
                    } else {
                        textObj.setLineItemNumber("");
                    }
                    if (!"".equals(textArr[6])) {
                        textObj.setPrItemNumber(textArr[6]);
                    } else {
                        textObj.setPrItemNumber("");
                    }
                    if (!"".equals(textArr[7])) {
                        textObj.setLinkId(textArr[7]);
                    } else {
                        textObj.setLinkId("");
                    }
                    if (!"".equals(textArr[8]) && !"NA".equals(textArr[8])) {
                        textObj.setPrNoteToApprover(textArr[8]);
                    } else {
                        textObj.setPrNoteToApprover("");
                    }
                    String msg = updateText(textObj);
                    System.out.println("msg :" + msg);
                } else {
                    if (!"".equals(textArr[0])) {
                        text.setItemTax(textArr[0]);
                    } else {
                        text.setItemTax("");
                    }
                    if (!"".equals(textArr[1])) {
                        text.setInfoRecordPOText(textArr[1]);
                    } else {
                        text.setInfoRecordPOText("");
                    }
                    if (!"".equals(textArr[2])) {
                        text.setMaterialPOText(textArr[2]);
                    } else {
                        text.setMaterialPOText("");
                    }
                    if (!"".equals(textArr[3])) {
                        text.setPoNoteToApprover(textArr[3]);
                    } else {
                        text.setPoNoteToApprover("");
                    }
                    if (!"".equals(textArr[4])) {
                        text.setDeliveryText(textArr[4]);
                    } else {
                        text.setDeliveryText("");
                    }
                    if (!"".equals(textArr[5])) {
                        text.setLineItemNumber(textArr[5]);
                    } else {
                        text.setLineItemNumber("");
                    }
                    if (!"".equals(textArr[6])) {
                        text.setPrItemNumber(textArr[6]);
                    } else {
                        text.setPrItemNumber("");
                    }
                    if (!"".equals(textArr[7])) {
                        text.setLinkId(textArr[7]);
                    } else {
                        text.setLinkId("");
                    }
                    if (!"".equals(textArr[8]) && !"NA".equals(textArr[8])) {
                        text.setPrNoteToApprover(textArr[8]);
                    } else {
                        text.setPrNoteToApprover("");
                    }
                    String msg = saveText(text);
                    System.out.println("msg :" + msg);
                }
//                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveDeliveryAddressTabData")) {

                out = response.getWriter();

                System.out.println("saveDeliveryAddressTabData");

                String deliveryAddressString = request.getParameter("deliveryAddressString");

                System.out.println("deliveryAddressString :" + deliveryAddressString);
                String[] deliveryAddressArr = deliveryAddressString.split(",");
                System.out.println("deliveryAddressArr length :" + deliveryAddressArr.length);

                List<DeliveryAddress> addressList = getDeliveryAddressByInsertionId(deliveryAddressArr[8]);
                if (!addressList.isEmpty()) {
                    DeliveryAddress addressObj = addressList.get(0);
                    if (!"".equals(deliveryAddressArr[0])) {
                        addressObj.setTitle(deliveryAddressArr[0]);
                    } else {
                        addressObj.setTitle("");
                    }
                    if (!"".equals(deliveryAddressArr[1])) {
                        addressObj.setName1(deliveryAddressArr[1]);
                    } else {
                        addressObj.setName1("");
                    }
                    if (!"".equals(deliveryAddressArr[2])) {
                        addressObj.setName2(deliveryAddressArr[2]);
                    } else {
                        addressObj.setName2("");
                    }
                    if (!"".equals(deliveryAddressArr[3])) {
                        addressObj.setStreet(deliveryAddressArr[3]);
                    } else {
                        addressObj.setStreet("");
                    }
                    if (!"".equals(deliveryAddressArr[4])) {
                        addressObj.setHouseNumber(deliveryAddressArr[4]);
                    } else {
                        addressObj.setHouseNumber("");
                    }
                    if (!"".equals(deliveryAddressArr[5])) {
                        addressObj.setPostalCode(deliveryAddressArr[5]);
                    } else {
                        addressObj.setPostalCode("");
                    }
                    if (!"".equals(deliveryAddressArr[6])) {
                        addressObj.setCity(deliveryAddressArr[6]);
                    } else {
                        addressObj.setCity("");
                    }
                    if (!"".equals(deliveryAddressArr[7])) {
                        addressObj.setCountry(deliveryAddressArr[7]);
                    } else {
                        addressObj.setCountry("");
                    }
                    if (!"".equals(deliveryAddressArr[8])) {
                        addressObj.setLineItemNumber(deliveryAddressArr[8]);
                    } else {
                        addressObj.setLineItemNumber("");
                    }
                    if (!"".equals(deliveryAddressArr[9])) {
                        addressObj.setDescription(deliveryAddressArr[9]);
                    } else {
                        addressObj.setDescription("");
                    }
                    if (!"".equals(deliveryAddressArr[10])) {
                        addressObj.setPrItemNumber(deliveryAddressArr[10]);
                    } else {
                        addressObj.setPrItemNumber("");
                    }
                    if (!"".equals(deliveryAddressArr[11])) {
                        addressObj.setLinkId(deliveryAddressArr[11]);
                    } else {
                        addressObj.setLinkId("");
                    }
                    String msg = updateDeliveryAddress(addressObj);
                    System.out.println("msg :" + msg);
                } else {
                    if (!"".equals(deliveryAddressArr[0])) {
                        deliveryAddress.setTitle(deliveryAddressArr[0]);
                    } else {
                        deliveryAddress.setTitle("");
                    }
                    if (!"".equals(deliveryAddressArr[1])) {
                        deliveryAddress.setName1(deliveryAddressArr[1]);
                    } else {
                        deliveryAddress.setName1("");
                    }
                    if (!"".equals(deliveryAddressArr[2])) {
                        deliveryAddress.setName2(deliveryAddressArr[2]);
                    } else {
                        deliveryAddress.setName2("");
                    }
                    if (!"".equals(deliveryAddressArr[3])) {
                        deliveryAddress.setStreet(deliveryAddressArr[3]);
                    } else {
                        deliveryAddress.setStreet("");
                    }
                    if (!"".equals(deliveryAddressArr[4])) {
                        deliveryAddress.setHouseNumber(deliveryAddressArr[4]);
                    } else {
                        deliveryAddress.setHouseNumber("");
                    }
                    if (!"".equals(deliveryAddressArr[5])) {
                        deliveryAddress.setPostalCode(deliveryAddressArr[5]);
                    } else {
                        deliveryAddress.setPostalCode("");
                    }
                    if (!"".equals(deliveryAddressArr[6])) {
                        deliveryAddress.setCity(deliveryAddressArr[6]);
                    } else {
                        deliveryAddress.setCity("");
                    }
                    if (!"".equals(deliveryAddressArr[7])) {
                        deliveryAddress.setCountry(deliveryAddressArr[7]);
                    } else {
                        deliveryAddress.setCountry("");
                    }
                    if (!"".equals(deliveryAddressArr[8])) {
                        deliveryAddress.setLineItemNumber(deliveryAddressArr[8]);
                    } else {
                        deliveryAddress.setLineItemNumber("");
                    }
                    if (!"".equals(deliveryAddressArr[9])) {
                        deliveryAddress.setDescription(deliveryAddressArr[9]);
                    } else {
                        deliveryAddress.setDescription("");
                    }
                    if (!"".equals(deliveryAddressArr[10])) {
                        deliveryAddress.setPrItemNumber(deliveryAddressArr[10]);
                    } else {
                        deliveryAddress.setPrItemNumber("");
                    }
                    if (!"".equals(deliveryAddressArr[11])) {
                        deliveryAddress.setLinkId(deliveryAddressArr[11]);
                    } else {
                        deliveryAddress.setLinkId("");
                    }
                    String msg = saveDeliveryAddress(deliveryAddress);
                    System.out.println("msg :" + msg);
                }

//                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveConfirmationsData")) {

                out = response.getWriter();

                System.out.println("saveConfirmationsData");

                String confirmationString = request.getParameter("confirmationString");

                System.out.println("confirmationString :" + confirmationString);
                String[] confirmationArr = confirmationString.split(",");
                System.out.println("confirmationArr length :" + confirmationArr.length);

                List<Confirmations> confList = getConfirmationsByInsertionId(confirmationArr[4]);
                if (!confList.isEmpty()) {
                    Confirmations confObj = confList.get(0);
                    if (!"".equals(confirmationArr[0])) {
                        confObj.setConfControl(confirmationArr[0]);
                    } else {
                        confObj.setConfControl("");
                    }
                    if (!"".equals(confirmationArr[1])) {
                        confObj.setOrderAck(confirmationArr[1]);
                    } else {
                        confObj.setOrderAck("");
                    }
                    if (!"".equals(confirmationArr[2])) {
                        confObj.setConfirmationRequired(confirmationArr[2]);
                    } else {
                        confObj.setConfirmationRequired("");
                    }
                    if (!"".equals(confirmationArr[3])) {
                        confObj.setRejectionInd(confirmationArr[3]);
                    } else {
                        confObj.setRejectionInd("");
                    }
                    if (!"".equals(confirmationArr[4])) {
                        confObj.setLineItemNumber(confirmationArr[4]);
                    } else {
                        confObj.setLineItemNumber("");
                    }
                    if (!"".equals(confirmationArr[5])) {
                        confObj.setPrItemNumber(confirmationArr[5]);
                    } else {
                        confObj.setPrItemNumber("");
                    }
                    if (!"".equals(confirmationArr[6])) {
                        confObj.setLinkId(confirmationArr[6]);
                    } else {
                        confObj.setLinkId("");
                    }
                    String msg = updateConfirmation(confObj);
                    System.out.println("msg :" + msg);
                } else {

                    if (!"".equals(confirmationArr[0])) {
                        confirmations.setConfControl(confirmationArr[0]);
                    } else {
                        confirmations.setConfControl("");
                    }
                    if (!"".equals(confirmationArr[1])) {
                        confirmations.setOrderAck(confirmationArr[1]);
                    } else {
                        confirmations.setOrderAck("");
                    }
                    if (!"".equals(confirmationArr[2])) {
                        confirmations.setConfirmationRequired(confirmationArr[2]);
                    } else {
                        confirmations.setConfirmationRequired("");
                    }
                    if (!"".equals(confirmationArr[3])) {
                        confirmations.setRejectionInd(confirmationArr[3]);
                    } else {
                        confirmations.setRejectionInd("");
                    }
                    if (!"".equals(confirmationArr[4])) {
                        confirmations.setLineItemNumber(confirmationArr[4]);
                    } else {
                        confirmations.setLineItemNumber("");
                    }
                    if (!"".equals(confirmationArr[5])) {
                        confirmations.setPrItemNumber(confirmationArr[5]);
                    } else {
                        confirmations.setPrItemNumber("");
                    }
                    if (!"".equals(confirmationArr[6])) {
                        confirmations.setLinkId(confirmationArr[6]);
                    } else {
                        confirmations.setLinkId("");
                    }
                    String msg = saveConfirmation(confirmations);
                    System.out.println("msg :" + msg);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveConditionControlData")) {

                out = response.getWriter();

                System.out.println("saveConditionControlData");

                String conditionControlString = request.getParameter("conditionControlString");

                System.out.println("conditionControlString :" + conditionControlString);
                String[] conditionControlArr = conditionControlString.split(",");
                System.out.println("confirmationArr length :" + conditionControlArr.length);

                List<ConditionControl> conditionList = getConditionCondrolByInsertionId(conditionControlArr[2]);
                if (!conditionList.isEmpty()) {
                    ConditionControl conditionObj = conditionList.get(0);
                    if (!"".equals(conditionControlArr[0])) {
                        conditionObj.setPrintPrice(conditionControlArr[0]);
                    } else {
                        conditionObj.setPrintPrice("");
                    }
                    if (!"".equals(conditionControlArr[1])) {
                        conditionObj.setEstimatePrice(conditionControlArr[1]);
                    } else {
                        conditionObj.setEstimatePrice("");
                    }
                    if (!"".equals(conditionControlArr[2])) {
                        conditionObj.setLineItemNumber(conditionControlArr[2]);
                    } else {
                        conditionObj.setLineItemNumber("");
                    }
                    if (!"".equals(conditionControlArr[3])) {
                        conditionObj.setPrItemNumber(conditionControlArr[3]);
                    } else {
                        conditionObj.setPrItemNumber("");
                    }
                    if (!"".equals(conditionControlArr[4])) {
                        conditionObj.setLinkId(conditionControlArr[4]);
                    } else {
                        conditionObj.setLinkId("");
                    }
                    String msg = updateConditionControl(conditionObj);
                    System.out.println("msg :" + msg);
                } else {
                    if (!"".equals(conditionControlArr[0])) {
                        conditionControl.setPrintPrice(conditionControlArr[0]);
                    } else {
                        conditionControl.setPrintPrice("");
                    }
                    if (!"".equals(conditionControlArr[1])) {
                        conditionControl.setEstimatePrice(conditionControlArr[1]);
                    } else {
                        conditionControl.setEstimatePrice("");
                    }
                    if (!"".equals(conditionControlArr[2])) {
                        conditionControl.setLineItemNumber(conditionControlArr[2]);
                    } else {
                        conditionControl.setLineItemNumber("");
                    }
                    if (!"".equals(conditionControlArr[3])) {
                        conditionControl.setPrItemNumber(conditionControlArr[3]);
                    } else {
                        conditionControl.setPrItemNumber("");
                    }
                    if (!"".equals(conditionControlArr[4])) {
                        conditionControl.setLinkId(conditionControlArr[4]);
                    } else {
                        conditionControl.setLinkId("");
                    }
                    String msg = saveConditionControl(conditionControl);
                    System.out.println("msg :" + msg);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveCustomerData")) {

                out = response.getWriter();

                System.out.println("saveCustomerData");

                String customerDataString = request.getParameter("customerDataString");

                System.out.println("customerDataString :" + customerDataString);
                String[] customerDataArr = customerDataString.split(",");
                System.out.println("customerDataArr length :" + customerDataArr.length);

                String lineItemNumber = customerDataArr[2];
                List<CustomerData> customerList = getCustomerDataByInsertionId(lineItemNumber);
                if (!customerList.isEmpty()) {
                    System.out.println("UPDATE :");
                    CustomerData customerObj = customerList.get(0);
                    if (!"".equals(customerDataArr[0])) {
                        customerObj.setProductOrigin(customerDataArr[0]);
                    } else {
                        customerObj.setProductOrigin("");
                    }
                    if (!"".equals(customerDataArr[1])) {
                        customerObj.setSegment(customerDataArr[1]);
                    } else {
                        customerObj.setSegment("");
                    }
                    if (!"".equals(customerDataArr[2])) {
                        customerObj.setLineItemNumber(customerDataArr[2]);
                    } else {
                        customerObj.setLineItemNumber("");
                    }
                    if (!"".equals(customerDataArr[3])) {
                        customerObj.setPrItemNumber(customerDataArr[3]);
                    } else {
                        customerObj.setPrItemNumber("");
                    }
                    if (!"".equals(customerDataArr[4])) {
                        customerObj.setLinkId(customerDataArr[4]);
                    } else {
                        customerObj.setLinkId("");
                    }
                    customerObj.setDescription("");
                    String msg = updateCustomerData(customerObj);
                    System.out.println("msg :" + msg);
                } else {
                    System.out.println("SAVE :");
                    if (!"".equals(customerDataArr[0])) {
                        customerData.setProductOrigin(customerDataArr[0]);
                    } else {
                        customerData.setProductOrigin("");
                    }
                    if (!"".equals(customerDataArr[1])) {
                        customerData.setSegment(customerDataArr[1]);
                    } else {
                        customerData.setSegment("");
                    }
                    if (!"".equals(customerDataArr[2])) {
                        customerData.setLineItemNumber(customerDataArr[2]);
                    } else {
                        customerData.setLineItemNumber("");
                    }
                    if (!"".equals(customerDataArr[3])) {
                        customerData.setPrItemNumber(customerDataArr[3]);
                    } else {
                        customerData.setPrItemNumber("");
                    }
                    if (!"".equals(customerDataArr[4])) {
                        customerData.setLinkId(customerDataArr[4]);
                    } else {
                        customerData.setLinkId("");
                    }
                    customerData.setDescription("");
                    String msg = saveCustomerData(customerData);
                    System.out.println("msg :" + msg);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("saveHeaderTextData")) {

                out = response.getWriter();

                System.out.println("saveHeaderTextData");

                String headerTextString = request.getParameter("headerTextString");

                System.out.println("headerTextString :" + headerTextString);
                String[] headerTextArr = headerTextString.split(",");
                System.out.println("headerTextArr length :" + headerTextArr.length);
                for (int i = 0; i < headerTextArr.length; i++) {
                    System.out.println("conditionControlArr values :" + headerTextArr[i]);
                }
                String lineItemNumber = headerTextArr[8];
                System.out.println("lineItemNumber :" + lineItemNumber);
                List<HeaderText> headerTextList = getHeaderTextByInsertionId(lineItemNumber);

                if (!headerTextList.isEmpty()) {
                    System.out.println("UPDATE:");
                    HeaderText headerTextObj = headerTextList.get(0);
                    if (!"".equals(headerTextArr[0])) {
                        headerTextObj.setPoNoteToApprover(headerTextArr[0]);
                    } else {
                        headerTextObj.setPoNoteToApprover("");
                    }
                    if (!"".equals(headerTextArr[1])) {
                        headerTextObj.setHeaderNote(headerTextArr[1]);
                    } else {
                        headerTextObj.setHeaderNote("");
                    }
                    if (!"".equals(headerTextArr[2])) {
                        headerTextObj.setPricingTypes(headerTextArr[2]);
                    } else {
                        headerTextObj.setPricingTypes("");
                    }
                    if (!"".equals(headerTextArr[3])) {
                        headerTextObj.setDeadlines(headerTextArr[3]);
                    } else {
                        headerTextObj.setDeadlines("");
                    }
                    if (!"".equals(headerTextArr[4])) {
                        headerTextObj.setTermsOfDelivery(headerTextArr[4]);
                    } else {
                        headerTextObj.setTermsOfDelivery("");
                    }
                    if (!"".equals(headerTextArr[5])) {
                        headerTextObj.setTermsOfPayment(headerTextArr[5]);
                    } else {
                        headerTextObj.setTermsOfPayment("");
                    }
                    if (!"".equals(headerTextArr[6])) {
                        headerTextObj.setVendorMemoGeneral(headerTextArr[6]);
                    } else {
                        headerTextObj.setVendorMemoGeneral("");
                    }
                    if (!"".equals(headerTextArr[7])) {
                        headerTextObj.setVendorMemoSpecial(headerTextArr[7]);
                    } else {
                        headerTextObj.setVendorMemoSpecial("");
                    }
                    if (!"".equals(headerTextArr[8])) {
                        headerTextObj.setLineItemNumber(headerTextArr[8]);
                    } else {
                        headerTextObj.setLineItemNumber("");
                    }
                    if (!"".equals(headerTextArr[9])) {
                        headerTextObj.setShippingInstructions(headerTextArr[9]);
                    } else {
                        headerTextObj.setShippingInstructions("");
                    }
                    if (!"".equals(headerTextArr[10])) {
                        headerTextObj.setPrItemNumber(headerTextArr[10]);
                    } else {
                        headerTextObj.setPrItemNumber("");
                    }
                    if (!"".equals(headerTextArr[11])) {
                        headerTextObj.setLinkId(headerTextArr[11]);
                    } else {
                        headerTextObj.setLinkId("");
                    }
                    String msg = updateHeaderText(headerTextObj);
                    System.out.println("msg :" + msg);
                } else {
                    System.out.println("SAVE :");
                    if (!"".equals(headerTextArr[0])) {
                        headerText.setPoNoteToApprover(headerTextArr[0]);
                    } else {
                        headerText.setPoNoteToApprover("");
                    }
                    if (!"".equals(headerTextArr[1])) {
                        headerText.setHeaderNote(headerTextArr[1]);
                    } else {
                        headerText.setHeaderNote("");
                    }
                    if (!"".equals(headerTextArr[2])) {
                        headerText.setPricingTypes(headerTextArr[2]);
                    } else {
                        headerText.setPricingTypes("");
                    }
                    if (!"".equals(headerTextArr[3])) {
                        headerText.setDeadlines(headerTextArr[3]);
                    } else {
                        headerText.setDeadlines("");
                    }
                    if (!"".equals(headerTextArr[4])) {
                        headerText.setTermsOfDelivery(headerTextArr[4]);
                    } else {
                        headerText.setTermsOfDelivery("");
                    }
                    if (!"".equals(headerTextArr[5])) {
                        headerText.setTermsOfPayment(headerTextArr[5]);
                    } else {
                        headerText.setTermsOfPayment("");
                    }
                    if (!"".equals(headerTextArr[6])) {
                        headerText.setVendorMemoGeneral(headerTextArr[6]);
                    } else {
                        headerText.setVendorMemoGeneral("");
                    }
                    if (!"".equals(headerTextArr[7])) {
                        headerText.setVendorMemoSpecial(headerTextArr[7]);
                    } else {
                        headerText.setVendorMemoSpecial("");
                    }
                    if (!"".equals(headerTextArr[8])) {
                        headerText.setLineItemNumber(headerTextArr[8]);
                    } else {
                        headerText.setLineItemNumber("");
                    }
                    if (!"".equals(headerTextArr[9])) {
                        headerText.setShippingInstructions(headerTextArr[9]);
                    } else {
                        headerText.setShippingInstructions("");
                    }
                    if (!"".equals(headerTextArr[10])) {
                        headerText.setPrItemNumber(headerTextArr[10]);
                    } else {
                        headerText.setPrItemNumber("");
                    }
                    if (!"".equals(headerTextArr[11])) {
                        headerText.setLinkId(headerTextArr[11]);
                    } else {
                        headerText.setLinkId("");
                    }
                    String msg = saveHeaderText(headerText);
                    System.out.println("msg :" + msg);
                }

//                System.out.println("msg :" + msg);
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllFromItemNumber")) {

                out = response.getWriter();

                System.out.println("getAllFromItemNumber");

                String lineItemNumber = request.getParameter("lineItemNumber");

                System.out.println("lineItemNumber :" + lineItemNumber);

//                List<ServiceAccountAssignment> accAsgnList = getServiceAccountAssignmentByLineItemNumber(lineItemNumber);
                List<Services> servicesList = getServicesByLineItemNumber(lineItemNumber);

                for (int i = 0; i < servicesList.size(); i++) {
                    JSONObject Obj = new JSONObject();
                    System.out.println("Currency :" + servicesList.get(i).getCurrency());
                    System.out.println("Short Text :" + servicesList.get(i).getShortText());
                    if (!servicesList.isEmpty()) {
                        Obj.put("LineItemNumber", servicesList.get(i).getLineItemNumber());
                        Obj.put("ServiceNumber", servicesList.get(i).getServiceNumber());
                        Obj.put("ShortText", servicesList.get(i).getShortText());
                        Obj.put("Quantity", servicesList.get(i).getQuantity());
                        Obj.put("Unit", servicesList.get(i).getUnit());
                        Obj.put("GrossPrice", servicesList.get(i).getGrossPrice());
                        Obj.put("Currency", servicesList.get(i).getCurrency());
                        Obj.put("NetPrice", servicesList.get(i).getNetPrice());
                        Obj.put("Edition", servicesList.get(i).getEdition());
                        Obj.put("LongItemLongText", servicesList.get(i).getLineItemLongText());
                        Obj.put("OverfTolarence", servicesList.get(i).getOverfTolerance());
                    }
                    jArra.put(Obj);
                }

                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getCmplxPRToPOLineItemPRAccountAssignmentValuesByLinkId")) {
                out = response.getWriter();
                System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentValuesByLinkId");
                String linkid = request.getParameter("linkid");
                System.out.println("LinkId: " + linkid);

                List<CmplxPRToPOLineItemPRAccountAssignmentValues> cmplxList = getCmplxPRToPOLineItemPRAccountAssignmentValuesByLinkId(linkid);

                for (CmplxPRToPOLineItemPRAccountAssignmentValues cmplx : cmplxList) {
                    System.out.println("Net Value in CmplxPRToPOLineItemPRAccountAssignmentValues:" + cmplx.getNetvalue());
                    JSONObject Obj = new JSONObject();
                    if (!cmplxList.isEmpty()) {
                        System.out.println("LinkId:" + cmplx.getLinkID());
                        Obj.put("DISTRIBUTION", cmplx.getDistribution());
                        Obj.put("QUANTITY", cmplx.getQuantity());
                        Obj.put("PERCENTAGE", cmplx.getPercentage());
                        Obj.put("ACTIVITYNUMBER", cmplx.getActivityNumber());
                        Obj.put("COSTCENTER", cmplx.getCostCenter());
                        Obj.put("ORDER", cmplx.getAccOrder());
                        Obj.put("ASSET", cmplx.getAccAsset());
                        Obj.put("WBSELEMENT", cmplx.getAccWBSElement());
                        Obj.put("SALESORDER", cmplx.getSalesOrder());
                        Obj.put("NETWORK", cmplx.getNetwork());
                        Obj.put("ACTICITY", cmplx.getActivity());
                        Obj.put("COAREA", cmplx.getCoArea());
                        Obj.put("GLACCOUNT", cmplx.getGLAccount());
                        Obj.put("UNLOADINGPOINT", cmplx.getUnloadingPoint());
                        Obj.put("RECEPIENT", cmplx.getRecipient());
                        Obj.put("COMMITMENTITEM", cmplx.getCommitmentItem());
                        Obj.put("FUND", cmplx.getFund());
                        Obj.put("FUNDSCENTER", cmplx.getFundsCentre());
                        Obj.put("FUNCTIONALAREA", cmplx.getFunctionalArea());
                        Obj.put("ITEMNUMBER", cmplx.getItemNumber());
                        Obj.put("DELIVERYSCHEDULE", cmplx.getDeliverySchedule());
//                        Obj.put("NETVALUE", cmplx.getNetvalue());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getCmplxPRToPOLineItemServiceByLinkId")) {
                out = response.getWriter();
                System.out.println("getCmplxPRToPOLineItemServiceByLinkId");
                String linkid = request.getParameter("linkid");
                System.out.println("LinkId in getCmplxPRToPOLineItemServiceByLinkId: " + linkid);
//                List<CmplxPRToPOLineItemService> cmplxList = getCmplxPRToPOLineItemServiceByLinkId(linkid);
                List<Services> cmplxList = purchaseOrderWSUtil.getServicesByLinkId(linkid);
                for (Services cmplx : cmplxList) {
                    JSONObject Obj = new JSONObject();
                    if (!cmplxList.isEmpty()) {
                        Obj.put("ID", cmplx.getId());
                        Obj.put("LINE_ITEM_NUMBER", cmplx.getLineItemNumber());
                        Obj.put("SERVICE_LINE_ITEM_NUMBER", cmplx.getServiceLineItemNumber());
                        Obj.put("SERVICE_NUMBER", cmplx.getServiceNumber());
                        Obj.put("SHORT_TEXT", cmplx.getShortText());
                        Obj.put("QUANTITY", cmplx.getQuantity());
                        Obj.put("UNIT", cmplx.getUnit());
                        Obj.put("GROSS_PRICE", cmplx.getGrossPrice());
                        Obj.put("CURRENCY", cmplx.getCurrency());
                        Obj.put("NET_PRICE", cmplx.getNetPrice());
                        Obj.put("EDITION", cmplx.getEdition());
                        Obj.put("LINE_ITEM_LONG_TEXT", cmplx.getLineItemLongText());
                        Obj.put("OVERF_TOLERANCE", cmplx.getOverfTolerance());
                        Obj.put("LINKID", cmplx.getLinkId());
                        Obj.put("SERVICELINKID", cmplx.getServiceLinkId());
                        Obj.put("DISTRIBUTION", cmplx.getDistribution());
                        Obj.put("NET_VALUE", cmplx.getNetValue());
                        Obj.put("SERVICE_TEXT", cmplx.getServiceText());
                        Obj.put("SERVICE_ID", cmplx.getServicesLongTextId());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getCmplxPRToPOLineItemPRAccountAssignmentByLinkId")) {
                out = response.getWriter();
                System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentByLinkId");
                String linkid = request.getParameter("linkid");
                String type = request.getParameter("type");

                System.out.println("LinkId: " + linkid);
                System.out.println("type: " + type);

                List<CmplxPRToPOLineItemPRAccountAssignment> cmplxList = null;
                switch (type) {
                    case "Service":
                        cmplxList = getCmplxPRToPOLineItemPRAccountAssignmentByPRLinkId(linkid);
                        break;
                    case "Material":
                        cmplxList = getCmplxPRToPOLineItemPRAccountAssignmentByLinkId(linkid);
                        break;
                }
                System.out.println("cmplxList size :::::" + cmplxList.size());
                for (CmplxPRToPOLineItemPRAccountAssignment cmplx : cmplxList) {
                    System.out.println("LinkNumber in getCmplxPRToPOLineItemPRAccountAssignmentByLinkId: " + cmplx.getLinkNumber());
                    JSONObject Obj = new JSONObject();
                    if (!cmplxList.isEmpty()) {
                        System.out.println("Cost Center In:" + cmplx.getCostCenter());
                        Obj.put("DISTRIBUTION", cmplx.getDistribution() == null ? "" : cmplx.getDistribution());
                        Obj.put("QUANTITY", cmplx.getQuantity() == null ? "" : cmplx.getQuantity());
                        Obj.put("PERCENTAGE", cmplx.getPercentage() == null ? "" : cmplx.getPercentage());
                        Obj.put("ACTIVITYNUMBER", cmplx.getActivityNumber() == null ? "" : cmplx.getActivityNumber());
                        Obj.put("COSTCENTER", cmplx.getCostCenter() == null ? "" : cmplx.getCostCenter());
                        Obj.put("ORDER", cmplx.getAccOrder() == null ? "" : cmplx.getAccOrder());
                        Obj.put("ASSET", cmplx.getAsset() == null ? "" : cmplx.getAsset());
                        Obj.put("WBSELEMENT", cmplx.getWBSElement() == null ? "" : cmplx.getWBSElement());
                        Obj.put("SALESORDER", cmplx.getSalesOrder() == null ? "" : cmplx.getSalesOrder());
                        Obj.put("NETWORK", cmplx.getNetwork() == null ? "" : cmplx.getNetwork());
                        Obj.put("ACTICITY", cmplx.getActivityNumber() == null ? "" : cmplx.getActivityNumber());
                        Obj.put("COAREA", cmplx.getCOArea() == null ? "" : cmplx.getCOArea());
                        Obj.put("GLACCOUNT", cmplx.getGLAccount() == null || cmplx.getGLAccount().trim().equals("") ? "" : cmplx.getGLAccount());
                        Obj.put("UNLOADINGPOINT", cmplx.getUnloadingPoint() == null ? "" : cmplx.getUnloadingPoint());
                        Obj.put("RECEPIENT", cmplx.getRecipient() == null ? "" : cmplx.getRecipient());
                        Obj.put("COMMITMENTITEM", cmplx.getCommitmentItem() == null ? "" : cmplx.getCommitmentItem());
                        Obj.put("FUND", cmplx.getFund() == null ? "" : cmplx.getFund());
                        Obj.put("FUNDSCENTER", cmplx.getFundsCentre() == null ? "" : cmplx.getFundsCentre());
                        Obj.put("FUNCTIONALAREA", cmplx.getFunctionalArea() == null ? "" : cmplx.getFunctionalArea());
                        Obj.put("ITEMNUMBER", cmplx.getItemNumber() == null ? "" : cmplx.getItemNumber());
                        Obj.put("DELIVERYSCHEDULE", cmplx.getDeliverySchedule() == null ? "" : cmplx.getDeliverySchedule());
                        Obj.put("LINKNUMBER", cmplx.getLinkNumber() == null ? "" : cmplx.getLinkNumber());
                        Obj.put("PARTIAL_INVOICE_INDICATOR", cmplx.getPartialInvoiceIndicator() == null ? "" : cmplx.getPartialInvoiceIndicator());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getFurmulaByConType")) {
                out = response.getWriter();
                System.out.println("getFurmulaByConType");
                String Cnty = request.getParameter("Cnty");
                System.out.println("Cnty: " + Cnty);
                JSONObject Obj = new JSONObject();
                List<MasterConditionValuesFormulas> formula = getFurmulaByConType(Cnty);
                System.out.println("Formula :" + formula.get(0).getRulesToDeriveConditionVale());
                MasterConditionValuesFormulas formulaObj = formula.get(0);
                Obj.put("FORMULA", formulaObj.getRulesToDeriveConditionVale());
//                jArra.put(Obj);
                out.println(Obj);
            } else if (reqFrom.equalsIgnoreCase("getServicesByInsertionId")) {
                out = response.getWriter();
                System.out.println("getServicesByInsertionId");
                String insertionid = request.getParameter("insertionid");
                String linkid = request.getParameter("linkid");
                System.out.println("insertionid: " + insertionid);
                System.out.println("linkid: " + linkid);
                JSONObject Obj = new JSONObject();
//                JSONObject ObjService = new JSONObject();
                JSONArray jArraService = new JSONArray();
                JSONObject ObjDelivery = new JSONObject();
                JSONArray jArraDelivery = new JSONArray();
                JSONObject ObjInvoice = new JSONObject();
                JSONArray jArraInvoice = new JSONArray();
                JSONObject ObjText = new JSONObject();
                JSONArray jArraText = new JSONArray();
                JSONObject ObjAddress = new JSONObject();
                JSONArray jArraAddress = new JSONArray();
                JSONObject ObjConf = new JSONObject();
                JSONArray jArraConf = new JSONArray();
                JSONObject ObjCond = new JSONObject();
                JSONArray jArraCond = new JSONArray();
                JSONObject ObjHeaderText = new JSONObject();
                JSONArray jArraHeaderText = new JSONArray();
                JSONObject ObjCustomerData = new JSONObject();
                JSONArray jArraCustomerData = new JSONArray();
                JSONObject ObjQuantity = new JSONObject();
                JSONArray jArraQuantity = new JSONArray();
                JSONObject ObjComponent = new JSONObject();
                JSONArray jArraComponent = new JSONArray();
                JSONObject ObjDeliverySchedule = new JSONObject();
                JSONArray jArraDeliverySchedule = new JSONArray();
                JSONObject ObjLimits = new JSONObject();
                JSONArray jArraLimits = new JSONArray();
                JSONArray jArraMaterialTab = new JSONArray();

                JSONArray jArraCondition = new JSONArray();
                List<Services> serviceList = getServiceByInsertionId(insertionid);
                if (!serviceList.isEmpty()) {
                    for (Services servicesObj : serviceList) {
                        JSONObject ObjService = new JSONObject();
                        ObjService.put("SERVICELINEITEMNUMBER", servicesObj.getServiceLineItemNumber());
                        ObjService.put("SERVICENUMBER", servicesObj.getServiceNumber());
                        ObjService.put("SHORTTEXT", servicesObj.getShortText());
                        ObjService.put("QUANTITY", servicesObj.getQuantity());
                        ObjService.put("UNIT", servicesObj.getUnit());
                        ObjService.put("GROSSPRICE", servicesObj.getGrossPrice());
                        ObjService.put("CURRENCY", servicesObj.getCurrency());
                        ObjService.put("NETPRICE", servicesObj.getNetPrice());
                        ObjService.put("EDITION", servicesObj.getEdition());
                        ObjService.put("LINEITEMLONGTEXT", servicesObj.getLineItemLongText());
                        ObjService.put("OVERFTOLERANCE", servicesObj.getOverfTolerance());
                        ObjService.put("LINKID", servicesObj.getLinkId());
                        ObjService.put("SERVICELINKID", servicesObj.getServiceLinkId());
                        ObjService.put("LINENUMBERSERVICE", servicesObj.getLineNoServ());
                        ObjService.put("IsServOldOrNew", servicesObj.getIsServOldOrNew());
                        ObjService.put("ServiceAccAssDist", servicesObj.getDistribution());
                        ObjService.put("NET_VALUE", servicesObj.getNetValue());
                        ObjService.put("SERVICE_TEXT", servicesObj.getServiceText());
                        ObjService.put("ID", servicesObj.getId());
                        ObjService.put("SERVICE_ID", servicesObj.getServicesLongTextId());
                        jArraService.put(ObjService);
                    }
                } else {
                    List<CmplxPRToPOLineItemService> cmplxList = getCmplxPRToPOLineItemServiceByLinkId(linkid);
                    if (!cmplxList.isEmpty()) {
                        for (CmplxPRToPOLineItemService cmplx : cmplxList) {
                            JSONObject ObjService = new JSONObject();
                            ObjService.put("SERVICELINEITEMNUMBER", cmplx.getLineItemNumber());
                            ObjService.put("SERVICENUMBER", cmplx.getServiceNumber());
                            ObjService.put("SHORTTEXT", cmplx.getShortText());
                            ObjService.put("QUANTITY", cmplx.getQuantity());
                            ObjService.put("UNIT", cmplx.getUnit());
                            ObjService.put("GROSSPRICE", cmplx.getGrossPrice());
                            ObjService.put("CURRENCY", cmplx.getCurrency());
                            ObjService.put("NETPRICE", cmplx.getNetPrice());
                            ObjService.put("EDITION", cmplx.getEdition());
                            ObjService.put("LINEITEMLONGTEXT", cmplx.getLineItemLongText());
                            ObjService.put("OVERFTOLERANCE", cmplx.getOverfTolerance());
                            ObjService.put("LINKID", cmplx.getLinkId());
                            ObjService.put("SERVICELINKID", cmplx.getServiceLinkID());
                            ObjService.put("LINENUMBERSERVICE", "");
                            ObjService.put("IsServOldOrNew", "");
                            ObjService.put("ServiceAccAssDist", "");
                            ObjService.put("NET_VALUE", "");
                            ObjService.put("SERVICE_TEXT", "");
                            ObjService.put("ID", "");
                            ObjService.put("SERVICE_ID", "");
                            jArraService.put(ObjService);
                        }
                    }
                }
//                jArraService.put(ObjService);
//                }
                List<Delivery> deliveryList = getDeliveryByInsertionId(insertionid);
                if (!deliveryList.isEmpty()) {
                    for (Delivery deliveryObj : deliveryList) {

                        ObjDelivery.put("OVERDELTOL", deliveryObj.getOverdeliveryTolerance());
                        ObjDelivery.put("UNDERDELTOL", deliveryObj.getUnderdeliveryTolerance());
                        ObjDelivery.put("SHIPPING_INSTRUCTION", deliveryObj.getShippingInstruction());
                        ObjDelivery.put("STOCKTYPE", deliveryObj.getStockType());
                        ObjDelivery.put("VALUATIONTYPE", deliveryObj.getValuationType());
                        ObjDelivery.put("REM_SHEL_FLIFE", deliveryObj.getRemShelfLife());
                        ObjDelivery.put("QA_CONTROL_LIFE", deliveryObj.getQaControlLife());
                        ObjDelivery.put("GR_PROC_TIME", deliveryObj.getGrPROCTime());
                        ObjDelivery.put("FIRST_REM", deliveryObj.getFirstRemender());
                        ObjDelivery.put("SECOND_REM", deliveryObj.getSecondRemender());
                        ObjDelivery.put("THIRD_REM", deliveryObj.getThirdRemender());
                        ObjDelivery.put("NOEXPEND", deliveryObj.getNoExpend());
                        ObjDelivery.put("PLDELTIME", deliveryObj.getPlDeliveryTime());
                        ObjDelivery.put("INCOTERMS", deliveryObj.getIncoTerms());
                        ObjDelivery.put("INCOTERMS1", deliveryObj.getIncoTerms1());
                        ObjDelivery.put("GOODRECEIPT", deliveryObj.getGoodsReceipt());
                        ObjDelivery.put("GRNONVALUATED", deliveryObj.getGrNonValuated());
                        ObjDelivery.put("DELCOMPLETED", deliveryObj.getDelivCompleted());
                        ObjDelivery.put("UNLIMITED", deliveryObj.getUnlimited());
                        jArraDelivery.put(ObjDelivery);
                    }
                }
                List<Invoice> invoiceList = getInvoiceByInsertionId(insertionid);
                if (!invoiceList.isEmpty()) {
                    System.out.println("Tax Code :" + invoiceList.get(0).getTaxCode());
                }
                for (Invoice inoiveObj : invoiceList) {
                    if (!invoiceList.isEmpty()) {
                        ObjInvoice.put("INVOICE_RECEIPT", inoiveObj.getInvoiceReceipt());
                        ObjInvoice.put("FINAL_INVOICE", inoiveObj.getFinalInvoice());
                        ObjInvoice.put("GR_BASED_IV", inoiveObj.getGrBasedIV());
                        ObjInvoice.put("DP_CATEGORY", inoiveObj.getDpCategory());
                        ObjInvoice.put("TAXCODE", inoiveObj.getTaxCode());
                        ObjInvoice.put("DESCRIPTION", inoiveObj.getDescription());
                        ObjInvoice.put("SERVICE_BASED_IV", inoiveObj.getServiceBasedIV());
                    }
                    jArraInvoice.put(ObjInvoice);
                }
                List<Text> textsList = getTextsByInsertionId(insertionid);
                for (Text textObj : textsList) {
                    if (!textsList.isEmpty()) {
                        ObjText.put("ITEMTEXT", textObj.getItemTax());
                        ObjText.put("INFO_RECORD_POTEXT", textObj.getInfoRecordPOText());
                        ObjText.put("MATERIAL_POTEXT", textObj.getMaterialPOText());
                        ObjText.put("PO_NOTES_TO_APPROVER", textObj.getPoNoteToApprover());
                        ObjText.put("DELIVERY_TEXT", textObj.getDeliveryText());
                        ObjText.put("PR_NOTES_TO_APPROVER", textObj.getPrNoteToApprover());
                    }
                    jArraText.put(ObjText);
                }
                List<DeliveryAddress> addressList = getDeliveryAddressByInsertionId(insertionid);
                for (DeliveryAddress addressObj : addressList) {
                    if (!addressList.isEmpty()) {
                        ObjAddress.put("TITLE", addressObj.getTitle());
                        ObjAddress.put("NAME1", addressObj.getName1());
                        ObjAddress.put("NAME2", addressObj.getName2());
                        ObjAddress.put("STREET", addressObj.getStreet());
                        ObjAddress.put("HOUSE_NUMBER", addressObj.getHouseNumber());
                        ObjAddress.put("POSTAL_CODE", addressObj.getPostalCode());
                        ObjAddress.put("CITY", addressObj.getCity());
                        ObjAddress.put("COUNTRY_CODE", addressObj.getCountry());
                        ObjAddress.put("COUNTRY_DESC", addressObj.getDescription());
                    }
                    jArraAddress.put(ObjAddress);
                }
                List<Confirmations> confirmationList = getConfirmationsByInsertionId(insertionid);
                for (Confirmations confObj : confirmationList) {
                    if (!addressList.isEmpty()) {
                        ObjConf.put("CONF_CONTROL", confObj.getConfControl());
                        ObjConf.put("ORDER_ACK", confObj.getOrderAck());
                        ObjConf.put("CONF_REQ", confObj.getConfirmationRequired());
                    }
                    jArraConf.put(ObjConf);
                }
                List<ConditionControl> conditionList = getConditionCondrolByInsertionId(insertionid);
                for (ConditionControl conditionfObj : conditionList) {
                    if (!addressList.isEmpty()) {
                        ObjCond.put("ESTIMATE_PRICE", conditionfObj.getEstimatePrice());
                        ObjCond.put("PRINT_PRICE", conditionfObj.getPrintPrice());
                    }
                    jArraCond.put(ObjCond);
                }
                List<HeaderText> headerTextList = getHeaderTextByInsertionId(insertionid);
                for (HeaderText headerTextObj : headerTextList) {
                    if (!headerTextList.isEmpty()) {
                        ObjHeaderText.put("PO_NOTES_TO_APPROVER", headerTextObj.getPoNoteToApprover());
                        ObjHeaderText.put("HEADER_NOTES", headerTextObj.getHeaderNote());
                        ObjHeaderText.put("PRICING_TYPE", headerTextObj.getPricingTypes());
                        ObjHeaderText.put("DEADLINE", headerTextObj.getDeadlines());
                        ObjHeaderText.put("TERMS_OF_DELIVERY", headerTextObj.getTermsOfDelivery());
                        ObjHeaderText.put("TERMS_OF_PAYMENT", headerTextObj.getTermsOfPayment());
                        ObjHeaderText.put("SHIPPING_INSTRUCTION", headerTextObj.getShippingInstructions());
                        ObjHeaderText.put("VENDOR_MEMO_GENERAL", headerTextObj.getVendorMemoGeneral());
                        ObjHeaderText.put("VENDOR_MEMO_SPECIAL", headerTextObj.getVendorMemoSpecial());
                    }
                    jArraHeaderText.put(ObjHeaderText);
                }
                List<CustomerData> customerList = getCustomerDataByInsertionId(insertionid);
                for (CustomerData customerObj : customerList) {
                    if (!customerList.isEmpty()) {
                        ObjCustomerData.put("PRODUCT_ORIGIN", customerObj.getProductOrigin());
                        ObjCustomerData.put("SEGMENT", customerObj.getSegment());
                    }
                    jArraCustomerData.put(ObjCustomerData);
                }
                List<QuantityDates> quantityList = getQuantityDatesByInsertionId(insertionid);
                for (QuantityDates quantityObj : quantityList) {
                    if (!quantityList.isEmpty()) {
                        ObjQuantity.put("POQuantity", quantityObj.getPoQuantity());
                        ObjQuantity.put("Unit_POQuantity", quantityObj.getUnitPOQuantity());
                        ObjQuantity.put("POQuantityInSKU", quantityObj.getPoQuantityInSKU());
                        ObjQuantity.put("Unit_POQuantityInSKU", quantityObj.getUnitPOQuantityInSKU());
                        ObjQuantity.put("OrderUnit", quantityObj.getOrderUnit());
                        ObjQuantity.put("Unit_OrderUnit", quantityObj.getUnitOrderUnit());
                        ObjQuantity.put("OrderPriceUnit", quantityObj.getOrderPriceUnit());
                        ObjQuantity.put("Unit_OrderPriceUnit", quantityObj.getUnitOrderPriceUnit());
                        ObjQuantity.put("OrderUnitSKU", quantityObj.getOrderUnitSKU());
                        ObjQuantity.put("Unit_OrderUnitSKU", quantityObj.getUnitOrderUnitSKU());
                        ObjQuantity.put("SKU", quantityObj.getSku());
                        ObjQuantity.put("Unit_SKU", quantityObj.getUnitSKU());
                        ObjQuantity.put("NetWeight", quantityObj.getNetWeight());
                        ObjQuantity.put("GrossWeight", quantityObj.getGrossWeight());
                        ObjQuantity.put("Volume", quantityObj.getVolume());
                        ObjQuantity.put("Points", quantityObj.getPoints());
                        ObjQuantity.put("NetWeightUnit", quantityObj.getNetWeightUnit());
                        ObjQuantity.put("GrossWeightUnit", quantityObj.getGrossWeightUnit());
                        ObjQuantity.put("VolumeUnit", quantityObj.getVolumeUnit());
                        ObjQuantity.put("PointsUnit", quantityObj.getPointsUnit());
                        ObjQuantity.put("NetWeightPerPrice", quantityObj.getNetWeightPerPrice());
                        ObjQuantity.put("GrossWeightPerPrice", quantityObj.getGrossWeightPerPrice());
                        ObjQuantity.put("VolumePerPrice", quantityObj.getVolumePerPrice());
                        ObjQuantity.put("PointsPerPrice", quantityObj.getPointsPerPrice());
                        ObjQuantity.put("NetWeightOrderUnit", quantityObj.getNetWeightOrderUnit());
                        ObjQuantity.put("GrossWeightOrderUnit", quantityObj.getGrossWeightOrderUnit());
                        ObjQuantity.put("VolumeOrderUnit", quantityObj.getVolumeOrderUnit());
                        ObjQuantity.put("PointsOrderUnit", quantityObj.getPointsOrderUnit());
                        ObjQuantity.put("NetWeight2", quantityObj.getNetWeight2());
                        ObjQuantity.put("GrossWeight2", quantityObj.getGrossWeight2());
                        ObjQuantity.put("Volume2", quantityObj.getVolume2());
                        ObjQuantity.put("Points2", quantityObj.getPoints2());
                        ObjQuantity.put("NetWeightUnit2", quantityObj.getNetWeightUnit2());
                        ObjQuantity.put("GrossWeightUnit2", quantityObj.getGrossWeightUnit2());
                        ObjQuantity.put("VolumeUnit2", quantityObj.getVolumeUnit2());
                        ObjQuantity.put("PointsUnit2", quantityObj.getPointsUnit2());

                    }
                    jArraQuantity.put(ObjQuantity);
                }                
                List<DeliverySchedule> deliveryScheduleList = getDeliveryScheduleByInsertionId(insertionid);
                if (!deliveryScheduleList.isEmpty()) {
                    for (DeliverySchedule deliveryObj : deliveryScheduleList) {
                        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                        Date reqDate = deliveryObj.getDeliveryDate();
                        if (reqDate != null) {
                            System.out.println("Delivery Date:" + reqDate);
                            String strDate = formatter.format(reqDate);
                            System.out.println("Delivery Date after Formate Change :" + strDate);
                            ObjDeliverySchedule.put("DELIVERY_DATE", strDate);
                        } else {
                            ObjDeliverySchedule.put("DELIVERY_DATE", "");
                        }

                        ObjDeliverySchedule.put("DELIVERY_DATE_CAT", deliveryObj.getDeliveryDateCategory());
                        ObjDeliverySchedule.put("PURCHASE_REQUEST_NUMBER", deliveryObj.getPurchaseRequestNumber());
                        ObjDeliverySchedule.put("REQUEST_ITEM_NUMBER", deliveryObj.getRequestItemNumber());
                        ObjDeliverySchedule.put("SCHEDULED_QUANTITY", deliveryObj.getScheduledQuantity());
                        ObjDeliverySchedule.put("TIME", deliveryObj.getTime());
                        ObjDeliverySchedule.put("DELIVERY_DATE_BY_CAT", deliveryObj.getDeliveryDateByCategory());
                        ObjDeliverySchedule.put("GR_QUANTITY", deliveryObj.getGrQty());
                        ObjDeliverySchedule.put("OPEN_QUANTITY", deliveryObj.getOpenQuantity());
                        ObjDeliverySchedule.put("SCH_LINE", deliveryObj.getSchLine());

                        Date statisticalDeliveryDate = deliveryObj.getStatisticalDeliveryDate();
                        if (statisticalDeliveryDate != null) {
                            String strDate = formatter.format(statisticalDeliveryDate);
                            ObjDeliverySchedule.put("STATISTICAL_DELIVERY_DATE", strDate);
                        } else {
                            ObjDeliverySchedule.put("STATISTICAL_DELIVERY_DATE", "");
                        }
                        jArraDeliverySchedule.put(ObjDeliverySchedule);
                    }
                }
                List<ConditionsLineLevel> condList = getMasterConditionLineLevelByLineItemNumber(insertionid + "");
                System.out.println("condList in ConditionsLineLevel :" + condList);
                if (!condList.isEmpty()) {
                    for (ConditionsLineLevel conditionObj : condList) {
                        JSONObject ObjCondition = new JSONObject();
                        ObjCondition.put("AMOUNT", conditionObj.getAmount());
                        ObjCondition.put("PERCETAGE", conditionObj.getPer());
                        ObjCondition.put("CONDITION_CURRENCY", conditionObj.getConditionCurrency());
                        ObjCondition.put("CONDITION_DETAIL", conditionObj.getConditionDetails());
                        ObjCondition.put("CONDITION_PRICING_UNIT", conditionObj.getConditionPricingUnit());
                        ObjCondition.put("CONDITION_TYPE", conditionObj.getConditionType());
                        ObjCondition.put("CONDITION_VALUE1", conditionObj.getConditionValue1());
                        ObjCondition.put("CONDITION_VALUE2", conditionObj.getConditionValue2());
                        ObjCondition.put("CURRENCY1", conditionObj.getCurrency1());
                        ObjCondition.put("CURRENCY2", conditionObj.getCurrency2());
                        ObjCondition.put("NAME", conditionObj.getName());
                        ObjCondition.put("UOM", conditionObj.getUom());
                        ObjCondition.put("KAPPL", conditionObj.getKappl());
                        ObjCondition.put("KVSL1", conditionObj.getKvsl1());
                        ObjCondition.put("KVSL2", conditionObj.getKvsl2());
                        ObjCondition.put("ZAEHK", conditionObj.getConditionCount());
                        ObjCondition.put("STUNR", conditionObj.getStNumber());
                        ObjCondition.put("CHANGEID", conditionObj.getChangeId());

                        ObjCondition.put("STATUS", conditionObj.getNgStatus());
                        ObjCondition.put("NUMERATOR", conditionObj.getNumerator());
                        ObjCondition.put("BASEUOM", conditionObj.getBaseUOM());
                        ObjCondition.put("DENO_FOR_CONV", conditionObj.getDenominatorforconv());
                        ObjCondition.put("UOMEXTRA", conditionObj.getUomextra());
                        ObjCondition.put("VENDORCODE", conditionObj.getVendorCode());
                        ObjCondition.put("ADDEDFROM", conditionObj.getAddedFrom());
                        jArraCondition.put(ObjCondition);
                    }
                }
                List<Limits> limitsList = findLimitsByLineItemNumber(insertionid + "");
                System.out.println("Limits Size :" + limitsList.size());
                if (!limitsList.isEmpty()) {
                    for (Limits limitsObj : limitsList) {
                        ObjLimits.put("NoLimits", limitsObj.getNoLimis());
                        ObjLimits.put("ExpectedValue", limitsObj.getExpectedValue());
                        ObjLimits.put("OverAllLimits", limitsObj.getOverAllLimits());
                        ObjLimits.put("ActualValue", limitsObj.getActualValue());
                        jArraLimits.put(ObjLimits);
                    }
                }
                List<MaterialTab> materialTabList = purchaseOrderWSUtil.findMaterialTabByInsertionOrderId(insertionid);
                System.out.println("materialTabList Size :" + materialTabList.size());
                if (!materialTabList.isEmpty()) {
                    for (MaterialTab obj : materialTabList) {
                        JSONObject jsonMatObj = new JSONObject();
                        jsonMatObj.put("RevisionLevel", obj.getRevisionLevel());
                        jsonMatObj.put("VendMatNo", obj.getVendMatNo());
                        jsonMatObj.put("EanUpc", obj.getEanUpc());
                        jsonMatObj.put("VendorSubrange", obj.getVendorSubrange());
                        jsonMatObj.put("Batch", obj.getBatch());
                        jsonMatObj.put("VendorBatch", obj.getVendorBatch());
                        jsonMatObj.put("InfoUpdate", obj.getInfoUpdate());
                        jsonMatObj.put("StockType", obj.getStockType());
                        jsonMatObj.put("MfrPartNumber", obj.getMfrPartNumber());
                        jsonMatObj.put("Manufacturer", obj.getManufacturer());
                        jArraMaterialTab.put(jsonMatObj);
                    }
                }

                Obj.put("jArraService", jArraService);
                Obj.put("jArraDelivery", jArraDelivery);
                Obj.put("jArraInvoice", jArraInvoice);
                Obj.put("jArraText", jArraText);
                Obj.put("jArraAddress", jArraAddress);
                Obj.put("jArraConf", jArraConf);
                Obj.put("jArraCond", jArraCond);
                Obj.put("jArraHeaderText", jArraHeaderText);
                Obj.put("jArraCustomerData", jArraCustomerData);
                Obj.put("jArraQuantity", jArraQuantity);
                Obj.put("jArraComponent", jArraComponent);
                Obj.put("jArraDeliverySchedule", jArraDeliverySchedule);
                Obj.put("jArraCondition", jArraCondition);
                Obj.put("jArraLimits", jArraLimits);
                Obj.put("jArraMaterialTab", jArraMaterialTab);
                out.println(Obj);
            } else if (reqFrom.equalsIgnoreCase("getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber")) {
                out = response.getWriter();
                System.out.println("getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
                String serviceLineItemNumber = request.getParameter("serviceLineItemNumber");
                String lineItemNumber = request.getParameter("lineItemNumber");
                String serviceLinkid = request.getParameter("serviceLinkid");
                System.out.println("serviceLineItemNumber: " + serviceLineItemNumber);
                System.out.println("lineItemNumber: " + lineItemNumber);
                System.out.println("serviceLinkid: " + serviceLinkid);

                List<ServiceAccountAssignment> accAsgnList = getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumber, lineItemNumber);
                System.out.println("accAsgnList Size :" + accAsgnList.size());
                if (!accAsgnList.isEmpty()) {
                    for (ServiceAccountAssignment accAsgnObj : accAsgnList) {
//                    for (int i = 0; i < accAsgnList.size(); i++) {
                        JSONObject Obj = new JSONObject();
//                        ServiceAccountAssignment accAsgnObj = accAsgnList.get(i);
                        Obj.put("QUANTITY", accAsgnObj.getQuantity());
                        Obj.put("PERCENTAGE", accAsgnObj.getPercentage());
                        Obj.put("GLACCOUNT", accAsgnObj.getGLAccount());
                        Obj.put("COAREA", accAsgnObj.getCOArea());
                        Obj.put("COSTCENTER", accAsgnObj.getCostCenter());
                        Obj.put("FUND", accAsgnObj.getFund());
                        Obj.put("FUNCTIONALAREA", accAsgnObj.getFunctionalArea());
                        Obj.put("FUNDCENTER", accAsgnObj.getFundCenter());
                        Obj.put("COMMITMENTITEM", accAsgnObj.getCommitmentItem());
                        Obj.put("ORDER", accAsgnObj.getAccAsngOrder());
                        Obj.put("ASSET", accAsgnObj.getAsset());
                        Obj.put("WBSELEMENT", accAsgnObj.getWBSElement());
                        Obj.put("SALESORDER", accAsgnObj.getSalesOrder());
                        Obj.put("NETWORK", accAsgnObj.getNetActNumber());
                        Obj.put("ITEMNUMBER", accAsgnObj.getItemNumber());
                        Obj.put("DELIVERYSCHEDULE", accAsgnObj.getDeliverySchedule());
                        Obj.put("DISTRIBUTION", accAsgnObj.getDistribution());
                        Obj.put("NETVALUE", accAsgnObj.getNetValaue());
                        Obj.put("LINKNUMBER", accAsgnObj.getLinkNumber());
                        Obj.put("LineNoSerAcc", accAsgnObj.getLineNoSerAcc());
                        Obj.put("ReqFrom", "LocalTable");
                        jArra.put(Obj);
                    }
                } else {
                    if (!"".equals(serviceLinkid)) {
                        List<CmplxPRToPOLineItemPRAccountAssignmentValues> cmplxList = getCmplxPRToPOLineItemPRAccountAssignmentValuesByServiceLinkId(serviceLinkid);
                        System.out.println("cmplxAccAssList Size :" + cmplxList.size());
//                    JSONArray jArra = new JSONArray();
                        for (CmplxPRToPOLineItemPRAccountAssignmentValues cmplx : cmplxList) {
                            JSONObject Obj = new JSONObject();
                            if (!cmplxList.isEmpty()) {
                                System.out.println("LinkId:" + cmplx.getLinkID());

                                Obj.put("QUANTITY", cmplx.getQuantity());
                                Obj.put("PERCENTAGE", cmplx.getPercentage());
                                Obj.put("ACTIVITYNUMBER", cmplx.getActivityNumber());
                                Obj.put("COSTCENTER", cmplx.getCostCenter());
                                Obj.put("ORDER", cmplx.getAccOrder());
                                Obj.put("ASSET", cmplx.getAccAsset());
                                Obj.put("WBSELEMENT", cmplx.getAccWBSElement());
                                Obj.put("SALESORDER", cmplx.getSalesOrder());
                                Obj.put("NETWORK", cmplx.getNetwork());
                                Obj.put("ACTICITY", cmplx.getActivity());
                                Obj.put("COAREA", cmplx.getCoArea());
                                Obj.put("GLACCOUNT", cmplx.getGLAccount());
                                Obj.put("UNLOADINGPOINT", cmplx.getUnloadingPoint());
                                Obj.put("RECEPIENT", cmplx.getRecipient());
                                Obj.put("COMMITMENTITEM", cmplx.getCommitmentItem());
                                Obj.put("FUND", cmplx.getFund());
                                Obj.put("FUNDSCENTER", cmplx.getFundsCentre());
                                Obj.put("FUNCTIONALAREA", cmplx.getFunctionalArea());
                                Obj.put("ITEMNUMBER", cmplx.getItemNumber());
                                Obj.put("DELIVERYSCHEDULE", cmplx.getDeliverySchedule());
                                String distribution = cmplx.getDistribution();
                                System.out.println("distribution when=== :" + distribution);
                                String dist = "";
                                if (distribution != null) {
                                    if ("Single Account Assignment".equals(distribution)) {
                                        dist = "";
                                    } else if ("Distrib. On Quantity Basis".equals(distribution)) {
                                        dist = "1";
                                    } else if ("Distrib. By Percentage".equals(distribution)) {
                                        dist = "2";
                                    }
                                } else {
                                    dist = "0";
                                }
                                Obj.put("DISTRIBUTION", dist);
                                Obj.put("NETVALUE", cmplx.getNetvalue());
                                Obj.put("LINKNUMBER", cmplx.getLinkNumber());
                                Obj.put("ReqFrom", "NewgenTable");
                                jArra.put(Obj);
                            }

                        }
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAccountAssignmentByLineItemNumber")) {
                out = response.getWriter();
                System.out.println("getAccountAssignmentByLineItemNumber");
                String lineItemNumber = request.getParameter("lineItemNumber");
                String linkid = request.getParameter("linkid");
                String prType = request.getParameter("prType");
                System.out.println("lineItemNumber: " + lineItemNumber);

                List<AccountAssignment> accAsgnList = getAccountAssignmentByLineItemNumber(lineItemNumber);

                if (!accAsgnList.isEmpty()) {
                    for (AccountAssignment accAsgn : accAsgnList) {
                        JSONObject Obj = new JSONObject();
                        Obj.put("DISTRIBUTION", accAsgn.getDistribution() == null ? "" : accAsgn.getDistribution());
                        Obj.put("QUANTITY", accAsgn.getQuantity() == null ? "" : accAsgn.getQuantity());
                        Obj.put("PERCENTAGE", accAsgn.getPercentage() == null ? "" : accAsgn.getPercentage());
                        Obj.put("ACTIVITYNUMBER", accAsgn.getNetActNumber() == null ? "" : accAsgn.getNetActNumber());
                        Obj.put("COSTCENTER", accAsgn.getCostCenter() == null ? "" : accAsgn.getCostCenter());
                        Obj.put("ORDER", accAsgn.getAccAsgnTblOrder() == null ? "" : accAsgn.getAccAsgnTblOrder());
                        Obj.put("ASSET", accAsgn.getAsset() == null ? "" : accAsgn.getAsset());
                        Obj.put("WBSELEMENT", accAsgn.getWBSElement() == null ? "" : accAsgn.getWBSElement());
                        Obj.put("SALESORDER", accAsgn.getSalesOrder() == null ? "" : accAsgn.getSalesOrder());
                        Obj.put("COAREA", accAsgn.getCOArea() == null ? "" : accAsgn.getCOArea());
                        Obj.put("GLACCOUNT", accAsgn.getGLAccount() == null ? "" : accAsgn.getGLAccount());
                        Obj.put("UNLOADINGPOINT", accAsgn.getUnloadingPoint() == null ? "" : accAsgn.getUnloadingPoint());
                        Obj.put("RECEPIENT", accAsgn.getRecipient() == null ? "" : accAsgn.getRecipient());
                        Obj.put("COMMITMENTITEM", accAsgn.getCommitmentItem() == null ? "" : accAsgn.getCommitmentItem());
                        Obj.put("FUND", accAsgn.getFund() == null ? "" : accAsgn.getFund());
                        Obj.put("FUNDSCENTER", accAsgn.getFundCenter() == null ? "" : accAsgn.getFundCenter());
                        Obj.put("FUNCTIONALAREA", accAsgn.getFunctionalArea() == null ? "" : accAsgn.getFunctionalArea());
                        Obj.put("ITMNO", accAsgn.getPrItemNumber() == null ? "" : accAsgn.getPrItemNumber());
                        Obj.put("ITEMNUMBER", accAsgn.getItemNumber() == null ? "" : accAsgn.getItemNumber());
                        Obj.put("DELIVERYSCHEDULE", accAsgn.getDeliverySchedule() == null ? "" : accAsgn.getDeliverySchedule());
                        Obj.put("LINKNUMBER", accAsgn.getLinkNumber() == null ? "" : accAsgn.getLinkNumber());
                        Obj.put("ACC_ASS_CAT", accAsgn.getAccountAssignmentCategory() == null ? "" : accAsgn.getAccountAssignmentCategory());
                        Obj.put("COCODE", accAsgn.getCoCode() == null ? "" : accAsgn.getCoCode());
                        Obj.put("PARTIAL_INVOICE_INDICATOR", accAsgn.getPartialInvoiceIndicator() == null ? "" : accAsgn.getPartialInvoiceIndicator());
                        Obj.put("LINKID", accAsgn.getLinkId() == null ? "" : accAsgn.getLinkId());
                        Obj.put("SERIAL_NUMBER", accAsgn.getSerialNumber() == null ? "" : accAsgn.getSerialNumber());
                        Obj.put("DELETEFLAG", accAsgn.getIsDeleteFlag() == null ? "" : accAsgn.getIsDeleteFlag());

                        jArra.put(Obj);
                    }
                } else {
                    List<CmplxPRToPOLineItemPRAccountAssignment> cmplxList = null;
                    System.out.println("prType in :" + prType);
                    switch (prType) {
                        case "Service":
                            cmplxList = getCmplxPRToPOLineItemPRAccountAssignmentByPRLinkId(linkid);
                            break;
                        case "Material":
                            cmplxList = getCmplxPRToPOLineItemPRAccountAssignmentByLinkId(linkid);
                            break;
                    }
                    for (CmplxPRToPOLineItemPRAccountAssignment cmplx : cmplxList) {
                        JSONObject Obj = new JSONObject();
                        if (!cmplxList.isEmpty()) {
                            System.out.println("LinkId:" + cmplx.getLinkID());
                            String distribution = cmplx.getDistribution();
                            System.out.println("distribution in Else :" + distribution);
                            if (distribution != null) {
                                switch (distribution) {
                                    case "Single Account Assignment":
                                        distribution = "";
                                        break;
                                    case "Distrib. On Quantity Basis":
                                        distribution = "1";
                                        break;
                                    case "Distrib. By Percentage":
                                        distribution = "2";
                                        break;
                                }
                            }

                            Obj.put("DISTRIBUTION", distribution);
                            Obj.put("QUANTITY", cmplx.getQuantity() == null ? "" : cmplx.getQuantity());
                            Obj.put("PERCENTAGE", cmplx.getPercentage() == null ? "" : cmplx.getPercentage());
                            Obj.put("ACTIVITYNUMBER", cmplx.getActivityNumber() == null ? "" : cmplx.getActivityNumber());
                            Obj.put("COSTCENTER", cmplx.getCostCenter() == null ? "" : cmplx.getCostCenter());
                            Obj.put("ORDER", cmplx.getAccOrder() == null ? "" : cmplx.getAccOrder());
                            Obj.put("ASSET", cmplx.getAsset() == null ? "" : cmplx.getAsset());
                            Obj.put("WBSELEMENT", cmplx.getWBSElement() == null ? "" : cmplx.getWBSElement());
                            Obj.put("SALESORDER", cmplx.getSalesOrder() == null ? "" : cmplx.getSalesOrder());
                            Obj.put("NETWORK", cmplx.getNetwork() == null ? "" : cmplx.getNetwork());
                            Obj.put("ACTICITY", cmplx.getActivityNumber() == null ? "" : cmplx.getActivityNumber());
                            Obj.put("COAREA", cmplx.getCOArea() == null ? "" : cmplx.getCOArea());
                            Obj.put("GLACCOUNT", cmplx.getGLAccount() == null ? "" : cmplx.getGLAccount());
                            Obj.put("UNLOADINGPOINT", cmplx.getUnloadingPoint() == null ? "" : cmplx.getUnloadingPoint());
                            Obj.put("RECEPIENT", cmplx.getRecipient() == null ? "" : cmplx.getRecipient());
                            Obj.put("COMMITMENTITEM", cmplx.getCommitmentItem() == null ? "" : cmplx.getCommitmentItem());
                            Obj.put("FUND", cmplx.getFund() == null ? "" : cmplx.getFund());
                            Obj.put("FUNDSCENTER", cmplx.getFundsCentre() == null ? "" : cmplx.getFundsCentre());
                            Obj.put("FUNCTIONALAREA", cmplx.getFunctionalArea() == null ? "" : cmplx.getFunctionalArea());
                            Obj.put("ITEMNUMBER", cmplx.getItemNumber() == null ? "" : cmplx.getItemNumber());
                            Obj.put("DELIVERYSCHEDULE", cmplx.getDeliverySchedule() == null ? "" : cmplx.getDeliverySchedule());
                            Obj.put("LINKNUMBER", cmplx.getLinkNumber() == null ? "" : cmplx.getLinkNumber());
                            Obj.put("ACC_ASS_CAT", cmplx.getAccountAssignmentCategory() == null ? "" : cmplx.getAccountAssignmentCategory());
                            Obj.put("COCODE", cmplx.getCoCode() == null ? "" : cmplx.getCoCode());
                            Obj.put("PARTIAL_INVOICE_INDICATOR", cmplx.getPartialInvoiceIndicator() == null ? "" : cmplx.getPartialInvoiceIndicator());
                        }
                        jArra.put(Obj);
                    }
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("findServicesByInsertionOrderIdOfPOLineItem")) {
                out = response.getWriter();
                System.out.println("findServicesByInsertionOrderIdOfPOLineItem");
                String lineItemNumber = request.getParameter("lineItemNumber");
                System.out.println("lineItemNumber :" + lineItemNumber);
                List<Services> servicesList = getServicesByLineItemNumber(lineItemNumber);
                for (int i = 0; i < servicesList.size(); i++) {
                    JSONObject Obj = new JSONObject();
                    if (!servicesList.isEmpty()) {
                        Obj.put("ServiceAccAssDist", servicesList.get(i).getDistribution());
                        Obj.put("LineItemNumber", servicesList.get(i).getLineItemNumber());
                        Obj.put("ServiceLineItemNumber", servicesList.get(i).getServiceLineItemNumber());
                        Obj.put("ServiceNumber", servicesList.get(i).getServiceNumber());
                        Obj.put("Quantity", servicesList.get(i).getQuantity());
                        Obj.put("Unit", servicesList.get(i).getUnit());
                        Obj.put("GrossPrice", servicesList.get(i).getGrossPrice());
                        Obj.put("Currency", servicesList.get(i).getCurrency());
                        Obj.put("NetPrice", servicesList.get(i).getNetPrice());
                        Obj.put("Edition", servicesList.get(i).getEdition());
                        Obj.put("OverfTolarence", servicesList.get(i).getOverfTolerance());
                        Obj.put("LinkId", servicesList.get(i).getLinkId());
                        Obj.put("ServiceLinkId", servicesList.get(i).getServiceLinkId());
                        Obj.put("LineNoServ", servicesList.get(i).getLineNoServ());
                        Obj.put("DeleteFlag", servicesList.get(i).getDeleteFlag());
                        Obj.put("IsServOldOrNew", servicesList.get(i).getIsServOldOrNew());
                        Obj.put("NetValue", servicesList.get(i).getNetValue());
                        Obj.put("ActualQuantity", servicesList.get(i).getActualQuantity());
                        Obj.put("LineText", servicesList.get(i).getLineText());
                        
                        if(servicesList.get(i).getServicesLongTextId() != null && !servicesList.get(i).getServicesLongTextId().equals("")) {
                            String servicesLongTextId = servicesList.get(i).getServicesLongTextId();
                            ServicesLongTexts sltObj = purchaseOrderWSUtil.getServicesLongTextsById(Integer.parseInt(servicesLongTextId));
                            Obj.put("ShortText", sltObj.getShortText());
                            Obj.put("LongItemLongText", sltObj.getLineItemLongText());
                            Obj.put("ServiceText", sltObj.getServiceText());
                        } else {
                            Obj.put("ShortText", servicesList.get(i).getShortText());
                            Obj.put("LongItemLongText", servicesList.get(i).getLineItemLongText());
                            Obj.put("ServiceText", servicesList.get(i).getServiceText());
                        }
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("findServicesByLinkId")) {
                out = response.getWriter();
                System.out.println("findServicesByLinkId");
                String linkid = request.getParameter("linkid");
                System.out.println("linkid :" + linkid);

                List<NGBPCmplxPOCreationLineItemService> servicesList = getServicesByLinkId(linkid);

                for (int i = 0; i < servicesList.size(); i++) {
                    JSONObject Obj = new JSONObject();
                    if (!servicesList.isEmpty()) {
                        Obj.put("LineItemNumber", servicesList.get(i).getLineItemNumber());
//                        Obj.put("LineItemNumber", servicesList.get(i).getLineItemNumber());
                        Obj.put("ServiceNumber", servicesList.get(i).getServiceNumber());
                        Obj.put("ShortText", servicesList.get(i).getShortText());
                        Obj.put("Quantity", servicesList.get(i).getQuantity());
                        Obj.put("Unit", servicesList.get(i).getUnit());
                        Obj.put("GrossPrice", servicesList.get(i).getGrossPrice());
                        Obj.put("Currency", servicesList.get(i).getCurrency());
                        Obj.put("NetPrice", servicesList.get(i).getNetPrice());
                        Obj.put("Edition", servicesList.get(i).getEdition());
                        Obj.put("LongItemLongText", servicesList.get(i).getLineItemLongText());
                        Obj.put("OverfTolarence", servicesList.get(i).getOverfTolerance());
                        Obj.put("LinkId", servicesList.get(i).getLinkId());
                        Obj.put("ServiceAccAssDist", servicesList.get(i).getDistribution());
                        Obj.put("ServiceLinkId", servicesList.get(i).getInsertionOrderID());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("findServicesAccAssByInsertionOrderIdAndServiceLineItemNoOfPOLineItem")) {
                out = response.getWriter();
                System.out.println("findServicesAccAssByInsertionOrderIdAndServiceLineItemNoOfPOLineItem");

                String lineItemNumber = request.getParameter("lineItemNumber");
                String serviceLineItemNumber = request.getParameter("serviceLineItemNumber");

                System.out.println("lineItemNumber: " + lineItemNumber);
                System.out.println("serviceLineItemNumber: " + serviceLineItemNumber);

                List<ServiceAccountAssignment> accAsgnList = getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumber, lineItemNumber);

                for (int i = 0; i < accAsgnList.size(); i++) {
                    JSONObject Obj = new JSONObject();

                    Obj.put("Distribution", accAsgnList.get(i).getDistribution() == null ? "" : accAsgnList.get(i).getDistribution());
                    Obj.put("Quantity", accAsgnList.get(i).getQuantity() == null ? "" : accAsgnList.get(i).getQuantity());
                    Obj.put("Percentage", accAsgnList.get(i).getPercentage() == null ? "" : accAsgnList.get(i).getPercentage());
                    Obj.put("CostCenter", accAsgnList.get(i).getCostCenter() == null ? "" : accAsgnList.get(i).getCostCenter());
                    Obj.put("Acc_Order", accAsgnList.get(i).getAccAsngOrder() == null ? "" : accAsgnList.get(i).getAccAsngOrder());
                    Obj.put("Acc_Asset", accAsgnList.get(i).getAsset() == null ? "" : accAsgnList.get(i).getAsset());
                    Obj.put("Acc_WBSElement", accAsgnList.get(i).getWBSElement() == null ? "" : accAsgnList.get(i).getWBSElement());
                    Obj.put("SalesOrder", accAsgnList.get(i).getSalesOrder() == null ? "" : accAsgnList.get(i).getSalesOrder());
                    Obj.put("CoArea", accAsgnList.get(i).getCOArea() == null ? "" : accAsgnList.get(i).getCOArea());
                    Obj.put("GLAccount", accAsgnList.get(i).getGLAccount() == null ? "" : accAsgnList.get(i).getGLAccount());
                    Obj.put("UnloadingPoint", accAsgnList.get(i).getUnloadingPoint() == null ? "" : accAsgnList.get(i).getUnloadingPoint());
                    Obj.put("Recipient", accAsgnList.get(i).getRecipient() == null ? "" : accAsgnList.get(i).getRecipient());
                    Obj.put("CommitmentItem", accAsgnList.get(i).getCommitmentItem() == null ? "" : accAsgnList.get(i).getCommitmentItem());
                    Obj.put("Fund", accAsgnList.get(i).getFund() == null ? "" : accAsgnList.get(i).getFund());
                    Obj.put("FundsCentre", accAsgnList.get(i).getFundCenter() == null ? "" : accAsgnList.get(i).getFundCenter());
                    Obj.put("FunctionalArea", accAsgnList.get(i).getFunctionalArea() == null ? "" : accAsgnList.get(i).getFunctionalArea());
                    Obj.put("ItemNumber", accAsgnList.get(i).getItemNumber() == null ? "" : accAsgnList.get(i).getItemNumber());
                    Obj.put("DeliverySchedule", accAsgnList.get(i).getDeliverySchedule() == null ? "" : accAsgnList.get(i).getDeliverySchedule());
                    Obj.put("LinkNumber", accAsgnList.get(i).getLinkNumber() == null ? "" : accAsgnList.get(i).getLinkNumber());
                    Obj.put("NetValue", accAsgnList.get(i).getNetValaue() == null ? "" : accAsgnList.get(i).getNetValaue());
                    Obj.put("SerialNumber", accAsgnList.get(i).getSerialNumber() == null ? "" : accAsgnList.get(i).getSerialNumber());
                    Obj.put("LineNoSerAcc", accAsgnList.get(i).getLineNoSerAcc() == null ? "" : accAsgnList.get(i).getLineNoSerAcc());
                    Obj.put("IsDeleteFlag", accAsgnList.get(i).getIsDeleteFlag() == null ? "" : accAsgnList.get(i).getIsDeleteFlag());

                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("findServicesAccAssByLinkIdAndLineItemNumber")) {
                out = response.getWriter();
                System.out.println("findServicesAccAssByLinkIdAndLineItemNumber");

                String linkid = request.getParameter("linkid");
                String lineItemNumber = request.getParameter("lineItemNumber");
                List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgnList = getServiceAccountAssignmentByLinkIdAndLineItemNumber(linkid, lineItemNumber);

                for (int i = 0; i < accAsgnList.size(); i++) {
                    JSONObject Obj = new JSONObject();
                    Obj.put("Distribution", accAsgnList.get(i).getDistribution() == null ? "" : accAsgnList.get(i).getDistribution());
                    Obj.put("Quantity", accAsgnList.get(i).getQuantity() == null ? "" : accAsgnList.get(i).getQuantity());
                    Obj.put("Percentage", accAsgnList.get(i).getPercentage() == null ? "" : accAsgnList.get(i).getPercentage());
                    Obj.put("CostCenter", accAsgnList.get(i).getCostCenter() == null ? "" : accAsgnList.get(i).getCostCenter());
                    Obj.put("Acc_Order", accAsgnList.get(i).getAccOrder() == null ? "" : accAsgnList.get(i).getAccOrder());
                    Obj.put("Acc_Asset", accAsgnList.get(i).getAccAsset() == null ? "" : accAsgnList.get(i).getAccAsset());
                    Obj.put("Acc_WBSElement", accAsgnList.get(i).getAccWBSElement() == null ? "" : accAsgnList.get(i).getAccWBSElement());
                    Obj.put("SalesOrder", accAsgnList.get(i).getSalesOrder() == null ? "" : accAsgnList.get(i).getSalesOrder());
                    Obj.put("CoArea", accAsgnList.get(i).getCoArea() == null ? "" : accAsgnList.get(i).getCoArea());
                    Obj.put("GLAccount", accAsgnList.get(i).getGlAccount() == null ? "" : accAsgnList.get(i).getGlAccount());
                    Obj.put("UnloadingPoint", accAsgnList.get(i).getUnloadingPoint() == null ? "" : accAsgnList.get(i).getUnloadingPoint());
                    Obj.put("Recipient", accAsgnList.get(i).getRecipient() == null ? "" : accAsgnList.get(i).getRecipient());
                    Obj.put("CommitmentItem", accAsgnList.get(i).getCommitmentItem() == null ? "" : accAsgnList.get(i).getCommitmentItem());
                    Obj.put("Fund", accAsgnList.get(i).getFund() == null ? "" : accAsgnList.get(i).getFund());
                    Obj.put("FundsCentre", accAsgnList.get(i).getFundsCentre() == null ? "" : accAsgnList.get(i).getFundsCentre());
                    Obj.put("FunctionalArea", accAsgnList.get(i).getFunctionalArea() == null ? "" : accAsgnList.get(i).getFunctionalArea());
                    Obj.put("ItemNumber", accAsgnList.get(i).getItemNumber() == null ? "" : accAsgnList.get(i).getItemNumber());
                    Obj.put("DeliverySchedule", accAsgnList.get(i).getDeliverySchedule() == null ? "" : accAsgnList.get(i).getDeliverySchedule());
                    Obj.put("LinkNumber", accAsgnList.get(i).getLinkNumber() == null ? "" : accAsgnList.get(i).getLinkNumber());
                    Obj.put("SerialNumber", accAsgnList.get(i).getSerialNumber() == null ? "" : accAsgnList.get(i).getSerialNumber());
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getAllPurchaseOrg")) {
                out = response.getWriter();
                List<MasterPurchaseOrg> purchaseList = getAllPurchaseOrg();
                for (MasterPurchaseOrg purchase : purchaseList) {
                    JSONObject Obj = new JSONObject();
                    if (!purchaseList.isEmpty()) {
//                        System.out.println("Industry Code:" + purchase.getPurchaseOrgCode());
                        Obj.put("PURCHASE_ORG_CODE", purchase.getPurchaseOrgCode());
                        Obj.put("DESC", purchase.getPurchaseOrgDesc());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getSalesOrder")) {
                out = response.getWriter();
                List<MasterSONumber> sONumberList = getMasterSONumber();
                for (MasterSONumber number : sONumberList) {
                    JSONObject Obj = new JSONObject();
                    if (!sONumberList.isEmpty()) {
//                        System.out.println("Industry Code:" + number.getItem());
//                        System.out.println("Industry Code:" + number.getSalesOrderNo());
                        Obj.put("SONUMBER", number.getSalesOrderNo());
                        Obj.put("ITEM", number.getItem());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getItemNumber")) {
                out = response.getWriter();
                List<MasterSONumber> sONumberList = getMasterSONumber();
                for (MasterSONumber number : sONumberList) {
                    JSONObject Obj = new JSONObject();
                    if (!sONumberList.isEmpty()) {
//                        System.out.println("Industry Code:" + number.getItem());
//                        System.out.println("Industry Code:" + number.getSalesOrderNo());
                        Obj.put("SONUMBER", number.getSalesOrderNo());
                        Obj.put("ITEM", number.getItem());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            } //Girivasu 
            else if (reqFrom.equalsIgnoreCase("getContServiceByLinkID")) {
                out = response.getWriter();
                String linkID = request.getParameter("linkID");
                System.out.println("Contract Link ID : " + linkID);

                List<CMHeaderServicesInfo> serviceList = getContServiceByLinkID(linkID);

                for (CMHeaderServicesInfo service : serviceList) {
                    JSONObject Obj = new JSONObject();

                    Obj.put("LinkId", service.getLinkId());
                    Obj.put("ServLinkId", service.getServLinkId());
                    Obj.put("Line_Item_No", service.getLineItemNo());
                    Obj.put("ServiceNo", service.getServiceNo());
                    Obj.put("ShortText", service.getShortText());
                    Obj.put("Unit", service.getUnit());
                    Obj.put("Quantity", service.getQuantity());
                    Obj.put("GrossPrice", service.getGrossPrice());
                    Obj.put("Currency", service.getCurrency());
                    Obj.put("Edition", service.getEdition());

                    jArra.put(Obj);
                }
                System.out.println("Service Length :" + jArra.length());
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getContAccByLinkID")) {
                out = response.getWriter();
                String linkID = request.getParameter("linkID");
                System.out.println("Contract Link ID : " + linkID);

                List<CMHeaderAccountAssignInfo> accList = getContAccByLinkID(linkID);

                for (CMHeaderAccountAssignInfo acc : accList) {
                    JSONObject Obj = new JSONObject();

                    Obj.put("UnLoadPnt", acc.getUnLoadPoint());
                    Obj.put("Receipient", acc.getReceipient());
                    Obj.put("LinkId", acc.getLinkID());
                    Obj.put("GLCode", acc.getGLAccount());
                    Obj.put("CoArea", acc.getCOArea());
                    Obj.put("CostCenter", acc.getCostCenter());
                    Obj.put("Order", acc.getOrdr());
                    Obj.put("Asset", acc.getAsset());
                    Obj.put("WBS", acc.getWBSElement());
                    Obj.put("SalesOrder", acc.getSalesOrder());
                    Obj.put("ItemNo", acc.getItemNo());
                    Obj.put("DelSch", acc.getDeliverySchedule());
                    Obj.put("Quantity", acc.getQuantity());
                    Obj.put("Percentage", acc.getPercentage());
                    Obj.put("Fund", acc.getFund());
                    Obj.put("FunArea", acc.getFunctionalArea());
                    Obj.put("FunCenter", acc.getFundsCentre());
                    Obj.put("ComItem", acc.getCommitmentItem());
                    Obj.put("NetWork", acc.getNetwork());
                    Obj.put("ActivityNo", acc.getActivityNo());
                    Obj.put("Distribution", acc.getDistribution());

                    jArra.put(Obj);
                }
                System.out.println("Service Length :" + jArra.length());
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getServiceLinkID")) {
                out = response.getWriter();

                int LinkID = getContSerLinkID();
                JSONObject Obj = new JSONObject();
                Obj.put("ServLinkId", LinkID);
                jArra.put(Obj);

                System.out.println("Service LinkID-->" + LinkID);
                out.println(jArra);
            } else if (reqFrom.equalsIgnoreCase("getContractLinkID")) {
                System.out.println("Inside getContractLinkID");
                out = response.getWriter();
                int LinkID = getContLinkID();
                JSONObject Obj = new JSONObject();
                Obj.put("LinkId", LinkID);
                jArra.put(Obj);
                System.out.println("Contract LinkID-->" + LinkID);
                out.println(jArra);
            } //Girivasu
            else if (reqFrom.equalsIgnoreCase("findServicesByLinkId")) {
                out = response.getWriter();
                System.out.println("findServicesByLinkId");
                String linkid = request.getParameter("linkid");
                System.out.println("linkid :" + linkid);
                List<NGBPCmplxPOCreationLineItemService> servicesList = getServicesByLinkId(linkid);
                for (int i = 0; i < servicesList.size(); i++) {
                    JSONObject Obj = new JSONObject();
                    if (!servicesList.isEmpty()) {
                        Obj.put("LineItemNumber", servicesList.get(i).getLineItemNumber());
//                        Obj.put("LineItemNumber", servicesList.get(i).getLineItemNumber());
                        Obj.put("ServiceNumber", servicesList.get(i).getServiceNumber());
                        Obj.put("ShortText", servicesList.get(i).getShortText());
                        Obj.put("Quantity", servicesList.get(i).getQuantity());
                        Obj.put("Unit", servicesList.get(i).getUnit());
                        Obj.put("GrossPrice", servicesList.get(i).getGrossPrice());
                        Obj.put("Currency", servicesList.get(i).getCurrency());
                        Obj.put("NetPrice", servicesList.get(i).getNetPrice());
                        Obj.put("Edition", servicesList.get(i).getEdition());
                        Obj.put("LongItemLongText", servicesList.get(i).getLineItemLongText());
                        Obj.put("OverfTolarence", servicesList.get(i).getOverfTolerance());
                        Obj.put("LinkId", servicesList.get(i).getLinkId());
                        Obj.put("ServiceAccAssDist", servicesList.get(i).getDistribution());
                        Obj.put("ServiceLinkId", servicesList.get(i).getInsertionOrderID());
                    }
                    jArra.put(Obj);
                }
                out.println(jArra);
            }

        } catch (IOException | ParseException ex) {

            Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);

        } finally {
            if (out != null) {
                out.close();
            }
        }

    }

    List<VendorDetails> getVendorByUsername(String username) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallvendorbyusername.do?username=" + username;
        System.out.println("url: " + url);
        ResponseEntity<List<VendorDetails>> vendorResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });
        System.out.println("vendorResponse: " + vendorResponse);
        List<VendorDetails> vendorList = vendorResponse.getBody();
        return vendorList;
    }

    List<BuyerDetails> getByUsername(String username) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallbyusername.do?username=" + username;

        System.out.println("url: " + url);

        ResponseEntity<List<BuyerDetails>> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });
        System.out.println("buyerResponse: " + buyerResponse);

        List<BuyerDetails> buyerList = buyerResponse.getBody();

//        buyerObj.getUsername();
        return buyerList;
    }

    String updatePrLineStatus(int prid, String status
    ) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateprlinestatus.do?id=" + prid + "&status=" + status;
        System.out.println("url: " + url);

        ResponseEntity<String> prResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });

        String result = prResponse.getBody();

        System.out.println("result: " + result);

        return result;
    }

    String saveVendorGroup(VendorGroup vendorgroup
    ) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/savevendorgroup.do";
        System.out.println("url: " + url);

        String groupid = restTemplate.postForObject(URI.create(url), vendorgroup, String.class);
        System.out.println("groupid: " + groupid);

        return groupid;
    }

    String saveVendorGroupMapping(VendorGroupMapping vendorgroupmapping
    ) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/savevendorgroupmapping.do";
        System.out.println("url: " + url);

        String mappingid = restTemplate.postForObject(URI.create(url), vendorgroupmapping, String.class);
        System.out.println("mappingid: " + mappingid);

        return mappingid;
    }

    public VendorDetails findVendorById(int vendorid) {
        System.out.println("vendorid: " + vendorid);

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyid.do?vendorid=" + vendorid;
        System.out.println("url: " + url);

        ResponseEntity<VendorDetails> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<VendorDetails>() {
        });
        VendorDetails vendor = response.getBody();

        return vendor;
    }

    public VendorGroup findVendorGroupById(int groupid) {
        System.out.println("groupid: " + groupid);

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findvendorgroupbyid.do?groupid=" + groupid;
        System.out.println("url: " + url);

        ResponseEntity<VendorGroup> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<VendorGroup>() {
        });
        VendorGroup vendorgroup = response.getBody();

        return vendorgroup;

    }

    List<VendorGroup> getAllVendorGroup() {

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorGroup>> restGroupResponse = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/getallvendorgroup.do", HttpMethod.GET, null,
                new ParameterizedTypeReference<List<VendorGroup>>() {
                });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<VendorGroup> vendorGroupList = restGroupResponse.getBody();

        System.out.println("vendorGroupList size: " + vendorGroupList.size());

        return vendorGroupList;
    }

    List<VendorGroupMapping> findVendorByGroup(int groupid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbygroup.do?groupid=" + groupid;

        ResponseEntity<List<VendorGroupMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorGroupMapping>>() {
        });

        System.out.println("response: " + response);
        List<VendorGroupMapping> vendorGroupList = response.getBody();

        System.out.println("vendorGroupList size: " + vendorGroupList.size());

        return vendorGroupList;
    }

    List<SupplierHeader> findSupplierHeaderByRfqid(int rfqId) {

        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierheaderbyrfqid.do?rfqid=" + rfqId;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<SupplierHeader>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {
        });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<SupplierHeader> supplierHeaderList = restGroupResponse.getBody();

        System.out.println("vendorGroupList size: " + supplierHeaderList.size());

        return supplierHeaderList;
    }

    List<SupplierHeader> findByWorkOrderRfqHeaderIdAndStatus(int rfqId, String status) {

        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierheaderbyrfqidandstatus.do?rfqid=" + rfqId + "&status=" + status;

        System.out.println("url in findByWorkOrderRfqHeaderIdAndStatus :" + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<SupplierHeader>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {
        });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<SupplierHeader> supplierHeaderList = restGroupResponse.getBody();

        System.out.println("vendorGroupList size: " + supplierHeaderList.size());

        return supplierHeaderList;
    }

    List<ContractVendorRfqHeader> findByContractRfqHeaderIdAndStatus(int rfqId, String status) {

        String url = webservice_ip + "/BuyerPortalWebServices/findByContractRfqHeaderIdAndStatus.do?rfqid=" + rfqId + "&status=" + status;

        System.out.println("url in findByContractRfqHeaderIdAndStatus :" + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractVendorRfqHeader>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqHeader>>() {
        });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<ContractVendorRfqHeader> supplierHeaderList = restGroupResponse.getBody();

        System.out.println("vendorGroupList size: " + supplierHeaderList.size());

        return supplierHeaderList;
    }

    List<SupplierLineitem> findSupplierLineItemBySupplierHeaderId(int id) {

        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierlineitembysupplierheaderid.do?id=" + id;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<SupplierLineitem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {
        });

        System.out.println("response: " + response);
        List<SupplierLineitem> supplierLineItemList = response.getBody();

        System.out.println("supplierLineItemList size: " + supplierLineItemList.size());

        return supplierLineItemList;
    }

    List<ContractVendorRfqLineItem> findContractLineItemByContractHeaderId(int id) {

        String url = webservice_ip + "/BuyerPortalWebServices/findContractVendorRfqLineItemByContractVenodrRfqHeaderId.do?id=" + id;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractVendorRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqLineItem>>() {
        });

        System.out.println("response: " + response);
        List<ContractVendorRfqLineItem> ContractVendorRfqLineItemList = response.getBody();

        System.out.println("ContractVendorRfqLineItemlist size: " + ContractVendorRfqLineItemList.size());

        return ContractVendorRfqLineItemList;
    }

    List<ContractVendorRfqLineItem> getContractVendorRfqLineItemById(int id) {

        String url = webservice_ip + "/BuyerPortalWebServices/getContractVendorRfqLineItemById.do?id=" + id;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractVendorRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqLineItem>>() {
        });

        System.out.println("response: " + response);
        List<ContractVendorRfqLineItem> ContractVendorRfqLineItemList = response.getBody();

        System.out.println("ContractVendorRfqLineItemlist size: " + ContractVendorRfqLineItemList.size());

        return ContractVendorRfqLineItemList;
    }

    List<SupplierLineitem> findSupplierLineItemByPRId(int id) {

        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierlineitembyprid.do?id=" + id;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<SupplierLineitem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {
        });

        System.out.println("response: " + response);
        List<SupplierLineitem> supplierLineItemList = response.getBody();

        System.out.println("supplierLineItemList size: " + supplierLineItemList.size());

        return supplierLineItemList;
    }

    List<VendorDetails> findByProspectVendorName(String name) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbyprospectvendorname.do?name=" + name;

        ResponseEntity<List<VendorDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });

        System.out.println("response: " + response);
        List<VendorDetails> prospectList = response.getBody();

        System.out.println("prospectList size: " + prospectList.size());

        return prospectList;
    }

    List<VendorGroup> findVendorGroupByName(String groupname) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findvendorgroupbyname.do?groupname=" + groupname;

        ResponseEntity<List<VendorGroup>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorGroup>>() {
        });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<VendorGroup> groupList = restGroupResponse.getBody();

        System.out.println("vendorGroupList size: " + groupList.size());

        return groupList;
    }

    List<VendorDetails> getallvendor() {

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorDetails>> restGroupResponse = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/getallvendor.do", HttpMethod.GET, null,
                new ParameterizedTypeReference<List<VendorDetails>>() {
                });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<VendorDetails> vendorList = restGroupResponse.getBody();

        System.out.println("prList size: " + vendorList.size());

        return vendorList;
    }

    public List<VendorDetails> getAllProspect() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallprospect.do";

        ResponseEntity<List<VendorDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });

        System.out.println("response: " + response);
        List<VendorDetails> prospectList = response.getBody();

        return prospectList;
    }

    String deleteVendorGroupMapping(int groupid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/deletevendorgroupmapping.do?groupid=" + groupid;
        System.out.println("url: " + url);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, null, new ParameterizedTypeReference<String>() {
        });

        System.out.println("response: " + response);
        String result = response.getBody();

        return result;
    }

    List<RfqHeaderVendorMapping> findVendorByRfqId(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyrfqid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<RfqHeaderVendorMapping>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RfqHeaderVendorMapping>>() {
        });
        List<RfqHeaderVendorMapping> vendorList = prResponse.getBody();
        System.out.println("vendorList size: " + vendorList.size());
        return vendorList;
    }

    BuyerVendorNotification findBuyerVendorNotificationById(int attid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyervendornotificationbyid.do?attid=" + attid;
        System.out.println("url: " + url);

        ResponseEntity<BuyerVendorNotification> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BuyerVendorNotification>() {
        });

        BuyerVendorNotification notification = response.getBody();

        return notification;
    }

    String updateBuyerVendorNotification(BuyerVendorNotification notification) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updatebuyervendornotification.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), notification, String.class);
        System.out.println("result: " + result);

        return result;
    }

    List<BuyerSecurityQueAns> getSecQueById(int id) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getqueansbyid.do?id=" + id;

        System.out.println("url: " + url);

        ResponseEntity<List<BuyerSecurityQueAns>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerSecurityQueAns>>() {
        });
        List<BuyerSecurityQueAns> list = prResponse.getBody();

        System.out.println("list size: " + list.size());

        return list;
    }

    List<BuyerTeamleadMapping> findBuyerMappingByTeamlead(int teamleadid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyermappingbyteamlead.do?id=" + teamleadid;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerTeamleadMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerTeamleadMapping>>() {
        });
        List<BuyerTeamleadMapping> mappingList = response.getBody();

        return mappingList;
    }

    String deleteBuyerTeamleadMapping(int buyerid, int teamleadid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/deletebuyerteamleadmapping.do?buyerid=" + buyerid + "&teamleadid=" + teamleadid;
        System.out.println("url:" + url);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = response.getBody();

        return result;
    }

    List<WorkOrderRfqLineItem> getPridByRfqid(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("rfqid in getPridByRfqid :" + rfqid);
        String url = webservice_ip + "/BuyerPortalWebServices/findrfqlineitembyrfqid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {
        });
        List<WorkOrderRfqLineItem> lineItemList = response.getBody();
        return lineItemList;
    }

    /*Newgen*/
    NewgenPRLineItem getPrDetailsById(int prid) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("prid in getPrDetailsById :" + prid);

        String url = webservice_ip + "/BuyerPortalWebServices/getnewgenprlineitem.do?id=" + prid;

        System.out.println("url: " + url);

        ResponseEntity<NewgenPRLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenPRLineItem>() {
        });

        NewgenPRLineItem prList = response.getBody();

        return prList;
    }

    NewgenContractLineItem getCMDetailsById(int contractid) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("id in getPrDetailsById :" + contractid);

        String url = webservice_ip + "/BuyerPortalWebServices/getnewgencontractlineitem.do?contractid=" + contractid;

        System.out.println("url: " + url);

        ResponseEntity<NewgenContractLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenContractLineItem>() {
        });

        NewgenContractLineItem prList = response.getBody();

        return prList;
    }

    /*Newgen*/
//    List<NewgenPRLineItem> getNewgenPRLineItemById(int id) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        System.out.println("prid in getNewgenPRLineItemById :" + id);
//
//        String url = webservice_ip + "/BuyerPortalWebServices/getnewgenprlineitem.do?id=" + id;
//
//        System.out.println("url: " + url);
//
//        ResponseEntity<List<NewgenPRLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
//        });
//
//        List<NewgenPRLineItem> prList = response.getBody();
//
//        return prList;
//    }
    NewgenPRLineItem getNewgenPRLineItemById(int id) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("prid in getNewgenPRLineItemById :" + id);

        String url = webservice_ip + "/BuyerPortalWebServices/getnewgenprlineitem.do?id=" + id;

        System.out.println("url: " + url);

        ResponseEntity<NewgenPRLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenPRLineItem>() {
        });

        NewgenPRLineItem prList = response.getBody();

        return prList;
    }

//    String updatePRStatus(PRDetails prObj) {
//
//        System.out.println("updatePRStatus");
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateprstatus.do"), prObj, String.class);
//
//        return msg;
//    }
    /*Newgen*/
    String updatePRStatus(NewgenPRLineItem prObj) {

        System.out.println("updatePRStatus");

        RestTemplate restTemplate = new RestTemplate();

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateprstatus.do"), prObj, String.class);

        return msg;
    }

    /*Newgen*/
//    List<PRDetails> getPRDetailsByPrId(PRDetails prid){
//        
//    }
    List<WorkOrderRfqLineItem> getWorkOrderRfqLineItemByPrId(int prid) {

        System.out.println("getWorkOrderRfqLineItemByPrId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getworkorderrfqlineitembyprid.do?prid=" + prid;

        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {
        });

        List<WorkOrderRfqLineItem> prList = response.getBody();

        return prList;
    }

    WorkOrderRfqHeader findRfqHeaderById(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("rfqid in findRfqHeaderById :" + rfqid);

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        ResponseEntity<WorkOrderRfqHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqHeader>() {
        });
        WorkOrderRfqHeader rfqHeaderObj = prResponse.getBody();

        return rfqHeaderObj;
    }

    List<RatedParameters> findRatedParamByRFQId(int prid) {

        System.out.println("getWorkOrderRfqLineItemByPrId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRatedParamByRFQ.do?rfq=" + prid;

        System.out.println("url: " + url);

        ResponseEntity<List<RatedParameters>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RatedParameters>>() {
        });

        List<RatedParameters> prList = response.getBody();

        return prList;
    }

    List<RatedParameters> findByVendorANDRFQID(int vendorId, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByVendorRFQ.do?vendorId=" + vendorId + "&rfq=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<RatedParameters>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RatedParameters>>() {
        });
        List<RatedParameters> list = response.getBody();
        return list;
    }

    ContractRfqHeader findCMRfqHeaderById(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("rfqid in findRfqHeaderById :" + rfqid);

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        ResponseEntity<ContractRfqHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ContractRfqHeader>() {
        });
        ContractRfqHeader rfqHeaderObj = prResponse.getBody();

        return rfqHeaderObj;
    }

    String updateRfqHeader(WorkOrderRfqHeader obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheader.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    String updateRfqContractHeader(ContractRfqHeader obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateContractRfqHeader.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    List<BuyerDetails> findAllBuyerExceptTeamLead() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findallexceptteamlead.do";
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });

        System.out.println("Bittu");
        System.out.println("restGroupResponse: " + restGroupResponse);
        List<BuyerDetails> buyerList = restGroupResponse.getBody();

        System.out.println("buyerList size: " + buyerList.size());

        return buyerList;
    }

    List<CountryMaster> getCountryMasterByCountry(String country) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getcountrymasterbycountry.do?country=" + country;
        System.out.println("url: " + url);

        ResponseEntity<List<CountryMaster>> countryResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CountryMaster>>() {
        });
        List<CountryMaster> companyObj = countryResponse.getBody();

        return companyObj;
    }

    BuyerDetails getBuyerById(int id) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getbuyerbyid.do?id=" + id;
        System.out.println("url: " + url);

        ResponseEntity<BuyerDetails> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BuyerDetails>() {
        });

        BuyerDetails buyerObj = buyerResponse.getBody();
        return buyerObj;
    }

    String deleteBuyer(BuyerDetails buyer) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deletebuyer.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), buyer, String.class);
        return msg;
    }

    NewgenContractLineItem getContractDetailsById(int contractid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("contractid in getContractDetailsById :" + contractid);
        String url = webservice_ip + "/BuyerPortalWebServices/getnewgencontractlineitem.do?contractid=" + contractid;
        System.out.println("url: " + url);
        ResponseEntity<NewgenContractLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenContractLineItem>() {
        });
        NewgenContractLineItem contractList = response.getBody();
        return contractList;
    }

    String updateContractStatus(NewgenContractLineItem contractObj) {
        System.out.println("updateContractStatus");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatecontractstatus.do"), contractObj, String.class);
        return msg;
    }

    String updateBuyer(BuyerDetails buyerObj) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("buyerObj : " + buyerObj);

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatebuyer.do"), buyerObj, String.class);

        System.out.println("updated in updatebuyer");

        return msg;
    }

    List findRfqStatusCountByRfqStatus(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqstatuscountbyrfqstatus.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List>() {
        });
        List list = prResponse.getBody();

        System.out.println("list: " + list);
        return list;

    }

    List findAdminRfqStatusCountByRfqStatus() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findAdminRfqStatusCountByRfqStatus.do";
        System.out.println("url: " + url);
        ResponseEntity<List> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List>() {
        });
        List list = prResponse.getBody();
        System.out.println("list: " + list);
        return list;
    }

    List findAdminRfpStatusCountByRfpStatus() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findAdminRfpStatusCountByRfpStatus.do";
        System.out.println("url: " + url);
        ResponseEntity<List> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List>() {
        });
        List list = prResponse.getBody();
        System.out.println("list: " + list);
        return list;
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

    List<VendorDetails> findByStatusAndType(String status, String type) {

        String url = webservice_ip + "/BuyerPortalWebServices/findbystatusandtype.do?status=" + status + "&type=" + type;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<VendorDetails>>() {
                });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<VendorDetails> vendorList = restGroupResponse.getBody();

        System.out.println("prList size: " + vendorList.size());

        return vendorList;
    }

    public List<ReportBuyerAuditLog> findBuyerLogByBuyerId(String buyerid, String fromdate, String todate) {
        System.out.println("buyerid: " + buyerid);

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findBuyerLogByBuyerId.do?buyerid=" + buyerid + "&fromdate=" + fromdate + "&todate=" + todate;
        System.out.println("url: " + url);

        ResponseEntity<List<ReportBuyerAuditLog>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ReportBuyerAuditLog>>() {
        });
        List<ReportBuyerAuditLog> logs = response.getBody();

        return logs;
    }

    public List<OpenRfqReportBean> callOpenRfqReportStoredProcedure(String plantCode, String rfqId, String purchaseGroup, String buyerId) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<OpenRfqReportBean>> response = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/callOpenRfqReportStoredProcedure.do?plantCode=" + plantCode + "&rfqId=" + rfqId + "&purchaseGroup=" + purchaseGroup + "&buyerId=" + buyerId,
                HttpMethod.GET, null, new ParameterizedTypeReference<List<OpenRfqReportBean>>() {
                });

        System.out.println("response: " + response);
        List<OpenRfqReportBean> list = response.getBody();
        return list;
    }

    public List<QueryUser> findEmailByUaserName(String qUser) {
        System.out.println("Query User: " + qUser);

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findemailbyusername.do?userName=" + qUser;
        System.out.println("url: " + url);

        ResponseEntity<List<QueryUser>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<QueryUser>>() {
        });
        List<QueryUser> queryUser = response.getBody();
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        return queryUser;
    }

    String rejectPR(String wiName, String linkId, String rejectReason, String comments, String rejectPRDoc) {

//        ClientConfig config = new ClientConfig();
//        Client client = ClientBuilder.newClient(config);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        RestTemplate restTemplate = new RestTemplate();

        String url = NGwebservice_ip + "/PR2POWebservice/ng/service/RejectWI";
        System.out.println("url: " + url);

//        RejectWIInput in = new RejectWIInput();
        rejectWiInput.setWorkitemId(wiName);
        rejectWiInput.setLinkId(linkId);
        rejectWiInput.setRejectReason(rejectReason);
        if (rejectPRDoc == null) {
            rejectPRDoc = "";
        }
        rejectWiInput.setRejectPRDoc(rejectPRDoc);
        rejectWiInput.setComments(comments);

        RejectWIOutPut str = restTemplate.postForObject(URI.create(url), rejectWiInput, RejectWIOutPut.class);
        System.out.println("MainCode-->" + str.getMainCode());
        System.out.println("Message-->" + str.getMessage());

        return str.getMainCode();
    }

    MasterVendor getVendorBySno(int sno) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getvendorbysno.do?sno=" + sno;
        System.out.println("url: " + url);
        ResponseEntity<MasterVendor> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<MasterVendor>() {
        });
        MasterVendor vendorObj = buyerResponse.getBody();
        return vendorObj;
    }

    List<MasterServiceMaster> getServiceMasterByServiceNumber(String ServiceNumber) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getservicemasterbyservicenumber.do?ServiceNumber=" + ServiceNumber;
        System.out.println("url: " + url);

        ResponseEntity<List<MasterServiceMaster>> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterServiceMaster>>() {
        });

        List<MasterServiceMaster> serviceObj = buyerResponse.getBody();
        return serviceObj;
    }

    List<MasterCostCentre> getMasterCostCenterByCostCenter(String CostCenter) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getmastercostcenterbycostcenter.do?CostCenter=" + CostCenter;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCostCentre>> costCenterResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCostCentre>>() {
        });
        List<MasterCostCentre> costCenterObj = costCenterResponse.getBody();
        return costCenterObj;
    }

    List<MasterFundFMArea> getFundFMAreaByComCode(String CompanyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getfundfmareabycomcode.do?CompanyCode=" + CompanyCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterFundFMArea>> costCenterResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterFundFMArea>>() {
        });
        List<MasterFundFMArea> fundObj = costCenterResponse.getBody();
        return fundObj;
    }

    WorkOrderRfqLineItem findWorkOrderLineItemByRfqLineId(int rfqlineid) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findworkorderlineitembyrfqlineid.do?rfqlineid=" + rfqlineid;
        System.out.println("url: " + url);
        ResponseEntity<WorkOrderRfqLineItem> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqLineItem>() {
        });
        WorkOrderRfqLineItem rfqLineItem = buyerResponse.getBody();
        return rfqLineItem;
    }

    String updatePrLineItemNG(NewgenPRLineItem obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateprlineitemng.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    String updateRfqHeaderLineItem(WorkOrderRfqLineItem obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheaderlineitem.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    WorkOrderAttachmentTemp findPrLineItemTempAttachmentById(int attid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findprlineitemtempattachmentbyid.do?attid=" + attid;
        System.out.println("url: " + url);
        ResponseEntity<WorkOrderAttachmentTemp> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderAttachmentTemp>() {
        });
        WorkOrderAttachmentTemp rfqHeaderObj = prResponse.getBody();
        return rfqHeaderObj;
    }

    ContractAttachmentTemp findContractLineItemTempAttachmentById(int attid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractLineItemTempAttachmentById.do?attid=" + attid;
        System.out.println("url: " + url);
        ResponseEntity<ContractAttachmentTemp> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ContractAttachmentTemp>() {
        });
        ContractAttachmentTemp rfqHeaderObj = contractResponse.getBody();
        return rfqHeaderObj;
    }

    String updateWorkOrderAttachmentTemp(WorkOrderAttachmentTemp obj) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateWorkOrderAttachmentTemp.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);
        return result;
    }

    String updateContractAttachmentTemp(ContractAttachmentTemp obj) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateContractAttachmentTemp.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);
        return result;
    }

    String saveBuyerAuditLogReport(ReportBuyerAuditLog log) {

        String url = webservice_ip + "/BuyerPortalWebServices/saveBuyerAuditLogReport.do";
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), log, String.class);
        System.out.println("msg: " + msg);

        return msg;
    }

    //Ram
    public List<ContractReportBean> callSowRequestStatusReportStoredProcedure(String fromPlantCode, String toPlantCode, String fromSowNo, String toSowNo, String fromPurchaseGroup, String toPurchaseGroup, String sowRaisedBy, String fromSowApprovedDate, String toSowApprovedDate, String processingStatusSow, String olaNumber, String fromMSGroup, String toMSGroup, String mSNumber, String contractRaisedBy, String fromContractApprovedDate, String toContractApprovedDate, String processingStatusContract) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callSowRequestStatusReportStoredProcedure.do?fromPlantCode=" + fromPlantCode + "&toPlantCode=" + toPlantCode + "&fromSowNo=" + fromSowNo + "&toSowNo=" + toSowNo + "&fromPurchaseGroup=" + fromPurchaseGroup + "&toPurchaseGroup=" + toPurchaseGroup + "&sowRaisedBy=" + sowRaisedBy + "&fromSowApprovedDate=" + fromSowApprovedDate + "&toSowApprovedDate=" + toSowApprovedDate + "&processingStatusSow=" + processingStatusSow + "&olaNumber=" + olaNumber + "&fromMSGroup=" + fromMSGroup + "&toMSGroup=" + toMSGroup + "&mSNumber=" + mSNumber + "&contractRaisedBy=" + contractRaisedBy + "&fromContractApprovedDate=" + fromContractApprovedDate + "&toContractApprovedDate=" + toContractApprovedDate + "&processingStatusContract=" + processingStatusContract;
        System.out.println("SowURL: " + url);

        ResponseEntity<List<ContractReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractReportBean>>() {
        });
        System.out.println("SowRsponse: " + url);
        List<ContractReportBean> list = response.getBody();
        return list;
    }
    //Ram

    //Ram
    public List<ContractReportBean> callContractStatusReportStoredProcedure(String fromPlantCode, String toPlantCode, String fromContractNo, String toContractNo, String fromPurchaseGroup, String toPurchaseGroup, String contractRaisedBy, String fromContractApprovedDate, String toContractApprovedDate, String processingStatusContract) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callContractStatusReportStoredProcedure.do?fromPlantCode=" + fromPlantCode + "&toPlantCode=" + toPlantCode + "&fromSowNo=" + fromContractNo + "&toSowNo=" + toContractNo + "&fromPurchaseGroup=" + fromPurchaseGroup + "&toPurchaseGroup=" + toPurchaseGroup + "&contractRaisedBy=" + contractRaisedBy + "&fromContractApprovedDate=" + fromContractApprovedDate + "&toContractApprovedDate=" + toContractApprovedDate + "&processingStatusContract=" + processingStatusContract;
        System.out.println("CSReportURL: " + url);

        ResponseEntity<List<ContractReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractReportBean>>() {
        });
        System.out.println("CSReportResponse: " + url);
        List<ContractReportBean> list = response.getBody();
        return list;
    }
    //Ram

    //Ram
    public List<ContractReportBean> callAuditLogReportStoredProcedure(String buyerid, String fromDate, String toDate) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callAuditLogReportStoredProcedure.do?buyerid=" + buyerid + "&fromDate=" + fromDate + "&toDate=" + toDate;
        System.out.println("AuditLogReportURL: " + url);

        ResponseEntity<List<ContractReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractReportBean>>() {
        });
        System.out.println("AuditLogReportRsponse: " + url);
        List<ContractReportBean> list = response.getBody();
        return list;
    }
    //Ram

    //Ram
    public List<ContractReportBean> callContractAckReportStoredProcedure(String contractAckVendorCode, String contractAckFromDate, String contractAckToDate) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callContractAckReportStoredProcedure.do?contractAckVendorCode=" + contractAckVendorCode + "&contractAckFromDate=" + contractAckFromDate + "&contractAckToDate=" + contractAckToDate;
        System.out.println("ContractAckReportURL: " + url);

        ResponseEntity<List<ContractReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractReportBean>>() {
        });
        System.out.println("ContractAckReportRsponse: " + url);
        List<ContractReportBean> list = response.getBody();
        return list;
    }
    //Ram

    //Ram
    public List<ContractReportBean> callContractLineCycleReportStoredProcedure(String contractLRFromDate, String contractLRToDate, String contractLRBuyerId, String contractLRVendorID) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callContractLineCycleReportStoredProcedure.do?contractLRFromDate=" + contractLRFromDate + "&contractLRToDate=" + contractLRToDate + "&contractLRBuyerId=" + contractLRBuyerId + "&contractLRVendorID=" + contractLRVendorID;
        System.out.println("ContractLineCycleReportURL: " + url);

        ResponseEntity<List<ContractReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractReportBean>>() {
        });
        System.out.println("ContractLineCycleReportRsponse: " + url);
        List<ContractReportBean> list = response.getBody();
        return list;
    }
    //Ram

    //Ram
    public List<ContractReportBean> callContractVersioningReportStoredProcedure(String contractVRNo, String contractVROlaNo) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callContractVersioningStoredProcedure.do?contractVRNo=" + contractVRNo + "&contractVROlaNo=" + contractVROlaNo;
        System.out.println("ContractLineCycleReportURL: " + url);

        ResponseEntity<List<ContractReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractReportBean>>() {
        });
        System.out.println("ContractLineCycleReportRsponse: " + url);
        List<ContractReportBean> list = response.getBody();
        return list;
    }
    //Ram

    public List<PurchaseRequestStatusReportBean> callPurchaseRequestStatusReportStoredProcedure(String PlantCode, String PrNo, String PurchaseGroup, String PRRaisedBy, String fromPRApprovedDate, String toPRApprovedDate, String fromRequiredDate, String toRequiredDate, String TrackingNumber, String ProcessingStatus, String ToPlantCode, String ToPrNo, String ToPurchaseGroup, String MaterialCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPurchaseRequestStatusReportStoredProcedure.do?PlantCode=" + PlantCode + "&PrNo=" + PrNo + "&PurchaseGroup=" + PurchaseGroup + "&PRRaisedBy=" + PRRaisedBy + "&fromPRApprovedDate=" + fromPRApprovedDate + "&toPRApprovedDate=" + toPRApprovedDate + "&fromRequiredDate=" + fromRequiredDate + "&toRequiredDate=" + toRequiredDate + "&TrackingNumber=" + TrackingNumber + "&ProcessingStatus=" + ProcessingStatus + "&ToPlantCode=" + ToPlantCode + "&ToPrNo=" + ToPrNo + "&ToPurchaseGroup=" + ToPurchaseGroup + "&MaterialCode=" + MaterialCode;
        System.out.println("url: " + url);

        ResponseEntity<List<PurchaseRequestStatusReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PurchaseRequestStatusReportBean>>() {
        });
        System.out.println("response: " + response);
        List<PurchaseRequestStatusReportBean> list = response.getBody();
        return list;
    }

    List<SupplierHeader> getSupplierHeaderByVendorId(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getsupplierheaderbyvendorid.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {
        });
        List<SupplierHeader> list = (List<SupplierHeader>) response.getBody();
        System.out.println("list :" + list);
        return list;
    }

    List<SupplierHeader> getSupplierHeaderByVendoridAndRfqIdAndStatus(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSupplierHeaderByVendoridAndRfqIdAndStatus.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {
        });
        List<SupplierHeader> list = (List<SupplierHeader>) response.getBody();
        System.out.println("list :" + list);
        return list;
    }

    List<ContractVendorRfqHeader> getContractHeaderByVendoridAndRfqIdAndStatus(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getContractHeaderByVendoridAndRfqIdAndStatus.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url:" + url);
        ResponseEntity<List<ContractVendorRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqHeader>>() {
        });
        List<ContractVendorRfqHeader> list = (List<ContractVendorRfqHeader>) response.getBody();
        System.out.println("list :" + list);
        return list;
    }

    String updateSupplierHeader(SupplierHeader supplier) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateSupplierHeader.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), supplier, String.class);
        System.out.println("result: " + result);
        return result;
    }

    String updateContractVendorRfqHeader(ContractVendorRfqHeader contract) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateContractVendorRfqHeader.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), contract, String.class);
        System.out.println("result: " + result);
        return result;
    }

    List<SupplierLineitem> findSupplierLineItemBySupplierHeaderIdAndInsertionOrderId(int supplierHeaderId, int insertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierLineItemBySupplierHeaderIdAndInsertionOrderId.do?id=" + supplierHeaderId + "&insertionOrderId=" + insertionOrderId;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierLineitem>> supplierHeaderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {
        });
        List<SupplierLineitem> list = (List<SupplierLineitem>) supplierHeaderResponse.getBody();
        return list;
    }

    List<SupplierLineitem> findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus(int supplierHeaderId, int insertionOrderId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus.do?id=" + supplierHeaderId + "&insertionOrderId=" + insertionOrderId;
        System.out.println("url:" + url);
        ResponseEntity<List<SupplierLineitem>> supplierHeaderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {
        });
        List<SupplierLineitem> list = (List<SupplierLineitem>) supplierHeaderResponse.getBody();
        return list;
    }

    String updateSupplierLineitem(SupplierLineitem lineItem) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateSupplierLineitem.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), lineItem, String.class);
        System.out.println("result: " + result);
        return result;
    }

    String updateContractVendorRfqLineitem(ContractVendorRfqLineItem lineItem) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateContractVendorRfqLineitem.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), lineItem, String.class);
        System.out.println("result: " + result);
        return result;
    }

    String saveFinalizedRfq(FinalizedRfq rfq) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveFinalizedRfq.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), rfq, String.class);
        System.out.println("result: " + result);
        return result;
    }

    String saveFinalizedContractRfq(FinalizedContractRfq rfq) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveFinalizedContractRfq.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), rfq, String.class);
        System.out.println("result: " + result);
        return result;
    }

    List<FinalizedRfq> findFinalizedRfqByRfqId(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("rfqid in :" + rfqid);
        String url = webservice_ip + "/BuyerPortalWebServices/findFinalizedRfqByRfqId.do?rfqId=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<FinalizedRfq>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<FinalizedRfq>>() {
        });
        List<FinalizedRfq> list = response.getBody();
        return list;
    }

    List<FinalizedContractRfq> findFinalizedContractRfqByRfqId(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("rfqid in :" + rfqid);
        String url = webservice_ip + "/BuyerPortalWebServices/findFinalizedContractRfqByRfqId.do?rfqId=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<FinalizedContractRfq>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<FinalizedContractRfq>>() {
        });
        List<FinalizedContractRfq> list = response.getBody();
        return list;
    }

    String saveRfqDataInCreateRfq(WorkOrderRfqHeader headerObj, String prtype) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveRfqDataInCreateRfq.do?prtype=" + prtype;
        System.out.println("url: " + url);
        String rfqid = restTemplate.postForObject(URI.create(url), headerObj, String.class);
        return rfqid;
    }

    List<NewgenPRLineItem> findByMultipleNewgenPRLineItemId(String prlineids) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findbymultiplenewgenprlineitemid.do?ids=" + prlineids;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();
        System.out.println("prList size: " + prList.size());
        return prList;
    }

    String saveRfqHeaderLineItem(WorkOrderRfqLineItem headerLineItemObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saverfqheaderlineitem.do";
        System.out.println("url: " + url);
        String id = restTemplate.postForObject(URI.create(url), headerLineItemObj, String.class);
        return id;
    }

    List<MasterPricingProcedures> getAllByPricingProcedure(String pricingprocedure) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallbypricingprocedure.do?pricingprocedure=" + pricingprocedure;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPricingProcedures>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPricingProcedures>>() {
        });
        List<MasterPricingProcedures> list = response.getBody();
        System.out.println("pricingprocedurelist size: " + list.size());
        return list;
    }

//    List<MasterPricingDescription> getPricingDescriptionByKSCHL(String KSCHL) {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/getpricingdescriptionbykschl.do?KSCHL=" + KSCHL;
//        System.out.println("url: " + url);
//        ResponseEntity<List<MasterPricingDescription>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPricingDescription>>() {
//        });
//        List<MasterPricingDescription> kSCHLList = response.getBody();
//        System.out.println("kSCHLList size: " + kSCHLList.size());
//        return kSCHLList;
//    }
    

    String saveConditionsTabData(ConditionsLineLevel conditions) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveconditionstabdata.do"), conditions, String.class);
        System.out.println("saveConditionsTabData : " + msg);
        return msg;
    }

    List<MasterBusinessArea> getAllBusinessArea() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallbusinessarea.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterBusinessArea>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterBusinessArea>>() {
        });
        List<MasterBusinessArea> businessList = response.getBody();
        System.out.println("businessList size: " + businessList.size());
        return businessList;
    }

    List<MasterSalesOrganisation> getAllSalesOrg() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallsalesorg.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterSalesOrganisation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterSalesOrganisation>>() {
        });
        List<MasterSalesOrganisation> list = response.getBody();
        System.out.println("salesList size: " + list.size());
        return list;
    }

    List<MasterDistributionChannel> getAllDistChannel() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getalldistchannel.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterDistributionChannel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDistributionChannel>>() {
        });
        List<MasterDistributionChannel> list = response.getBody();
        System.out.println("channelList size: " + list.size());
        return list;
    }

    List<MasterProfitCenter> getAllProfitCenter() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallprofitcenter.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterProfitCenter>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterProfitCenter>>() {
        });
        List<MasterProfitCenter> list = response.getBody();
        System.out.println("channelList size: " + list.size());
        return list;
    }

    List<MasterSalesOffice> getAllSalesOffice() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallsalesoffice.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterSalesOffice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterSalesOffice>>() {
        });
        List<MasterSalesOffice> list = response.getBody();
        System.out.println("Sales Office size: " + list.size());
        return list;
    }

    List<MasterMaterialGroup> getAllMaterialGroup() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmaterialgroup.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGroup>>() {
        });
        List<MasterMaterialGroup> list = response.getBody();
        System.out.println("Materia Group size: " + list.size());
        return list;
    }

    List<MasterCustomerGroup> getAllCustomerGroup() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcustomergroup.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCustomerGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCustomerGroup>>() {
        });
        List<MasterCustomerGroup> list = response.getBody();
        System.out.println("Materia Group size: " + list.size());
        return list;
    }

    List<MasterProductHierarchy1> getAllProdHierLev1() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallprodhierlev1.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterProductHierarchy1>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterProductHierarchy1>>() {
        });
        List<MasterProductHierarchy1> list = response.getBody();
        System.out.println("Materia Group size: " + list.size());
        return list;
    }

    List<MasterProductHierarchy2> getAllProdHierLev2() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallprodhierlev2.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterProductHierarchy2>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterProductHierarchy2>>() {
        });
        List<MasterProductHierarchy2> list = response.getBody();
        System.out.println("Materia Group size: " + list.size());
        return list;
    }

    List<MasterProductHierarchy3> getAllProdHierLev3() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallprodhierlev3.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterProductHierarchy3>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterProductHierarchy3>>() {
        });
        List<MasterProductHierarchy3> list = response.getBody();
        System.out.println("Materia Group size: " + list.size());
        return list;
    }

    List<MasterReferenceItem> getAllRferenceItem() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallrferenceitem.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterReferenceItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterReferenceItem>>() {
        });
        List<MasterReferenceItem> list = response.getBody();
        System.out.println("Reference Item size: " + list.size());
        return list;
    }

    List<MasterMaterialType> getAllMaterialType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmaterialtype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialType>>() {
        });
        List<MasterMaterialType> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
    }

    List<MasterProjectIndicator> getAllProjectIndicator() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallprojectindicator.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterProjectIndicator>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterProjectIndicator>>() {
        });
        List<MasterProjectIndicator> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
    }

    List<MasterValuationType> getAllValuationType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallvaluationtype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterValuationType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterValuationType>>() {
        });
        List<MasterValuationType> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
    }

    List<MasterCustomerClassification> getAllCustomerClass() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcustomerclass.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCustomerClassification>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCustomerClassification>>() {
        });
        List<MasterCustomerClassification> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
    }

    List<MasterMaterialSrcIndicator> getAllMaterialSourceInd() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmaterialsourceind.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialSrcIndicator>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialSrcIndicator>>() {
        });
        List<MasterMaterialSrcIndicator> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
    }

    List<MasterContractType> getAllContractType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcontracttype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterContractType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterContractType>>() {
        });
        List<MasterContractType> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
    }

    List<MasterIndustryCode1> getAllIndustryCode1() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallindustrycode1.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterIndustryCode1>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterIndustryCode1>>() {
        });
        List<MasterIndustryCode1> list = response.getBody();
        System.out.println("MasterIndustryCode1 size: " + list.size());
        return list;
    }

    List<MasterIndustryCode2> getAllIndustryCode2() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallindustrycode2.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterIndustryCode2>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterIndustryCode2>>() {
        });
        List<MasterIndustryCode2> list = response.getBody();
        System.out.println("MasterIndustryCode2 size: " + list.size());
        return list;
    }

    List<MasterIndustryCode3> getAllIndustryCode3() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallindustrycode3.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterIndustryCode3>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterIndustryCode3>>() {
        });
        List<MasterIndustryCode3> list = response.getBody();
        System.out.println("MasterIndustryCode3 size: " + list.size());
        return list;
    }

    List<MasterSalesDocType> getAllSalesDocType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallsalesdoctype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterSalesDocType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterSalesDocType>>() {
        });
        List<MasterSalesDocType> list = response.getBody();
        System.out.println("MasterSalesDocType size: " + list.size());
        return list;
    }

    List<MasterReferenceItem> getAllReferenceItem() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallreferenceitem.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterReferenceItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterReferenceItem>>() {
        });
        List<MasterReferenceItem> list = response.getBody();
        System.out.println("MasterReferenceItem size: " + list.size());
        return list;
    }

    List<MasterCountry> getAllMasterCountry() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmastercountry.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCountry>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCountry>>() {
        });
        List<MasterCountry> list = response.getBody();
        System.out.println("MasterReferenceItem size: " + list.size());
        return list;
    }

    List<MasterBillType> getAllBillType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallbilltype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterBillType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterBillType>>() {
        });
        List<MasterBillType> list = response.getBody();
        System.out.println("MasterBillType size: " + list.size());
        return list;
    }

    List<MasterHighLevelItem> getAllHigherLevItem() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallhigherlevitem.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterHighLevelItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterHighLevelItem>>() {
        });
        List<MasterHighLevelItem> list = response.getBody();
        System.out.println("MasterHighLevelItem size: " + list.size());
        return list;
    }

    List<MasterIndustryCode> getAllIndustryCode() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallindustrycode.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterIndustryCode>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterIndustryCode>>() {
        });
        List<MasterIndustryCode> list = response.getBody();
        System.out.println("MasterIndustryCode size: " + list.size());
        return list;
    }

    String saveProfitabilitySegment(ProfitabilitySegment profitabilitySegment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveprofitabilitysegment.do"), profitabilitySegment, String.class);
        System.out.println("saveprofitabilitysegment : " + msg);
        return msg;
    }

    String saveServiceAccountAssignment(ServiceAccountAssignment serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveserviceaccountassignment.do"), serviceAccountAssignment, String.class);
        System.out.println("serviceAccountAssignment : " + msg);
        return msg;
    }

    String saveServiceTableData(Services services) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveservicetabledata.do"), services, String.class);
        System.out.println("saveServiceTableData : " + msg);
        return msg;
    }

    String saveLimitAccountAssignment(LimitAccountAssignment limitAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savelimitaccountassignment.do"), limitAccountAssignment, String.class);
        System.out.println("savelimitaccountassignment :" + msg);
        return msg;
    }

    String saveDeliverySchedule(DeliverySchedule deliverySchedule) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savedeliveryschedule.do"), deliverySchedule, String.class);
        System.out.println("savedeliveryschedule :" + msg);
        return msg;
    }

    String saveDelivery(Delivery delivery) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savedelivery.do"), delivery, String.class);
        System.out.println("savedelivery :" + msg);
        return msg;
    }

    String saveInvoice(Invoice invoice) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveinvoice.do"), invoice, String.class);
        System.out.println("saveInvoice :" + msg);
        return msg;
    }

    String saveAccountAssignment(AccountAssignment accountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveaccountassignment.do"), accountAssignment, String.class);
        System.out.println("saveaccountassignment :" + msg);
        return msg;
    }

    String saveText(Text text) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savetext.do"), text, String.class);
        System.out.println("savetext :" + msg);
        return msg;
    }

    String saveDeliveryAddress(DeliveryAddress deliveryAddress) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savedeliveryaddress.do"), deliveryAddress, String.class);
        System.out.println("savedeliveryaddress :" + msg);
        return msg;
    }

    String saveConfirmation(Confirmations confirmations) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveconfirmation.do"), confirmations, String.class);
        System.out.println("saveconfirmation :" + msg);
        return msg;
    }

    String saveConditionControl(ConditionControl conditionControl) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveconditioncontrol.do"), conditionControl, String.class);
        System.out.println("saveconditioncontrol :" + msg);
        return msg;
    }

    String saveHeaderText(HeaderText headerText) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveheadertext.do"), headerText, String.class);
        System.out.println("saveheadertext :" + msg);
        return msg;
    }

    List<ServiceAccountAssignment> getServiceAccountAssignmentByLineItemNumber(String lineItemNumber) {

        System.out.println("getServiceAccountAssignmentByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getserviceaccountassignmentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;

        System.out.println("url: " + url);

        ResponseEntity<List<ServiceAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ServiceAccountAssignment>>() {
        });

        List<ServiceAccountAssignment> list = response.getBody();

        return list;
    }

    List<Services> getServicesByLineItemNumber(String lineItemNumber) {

        System.out.println("getServicesByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getservicesbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<Services>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Services>>() {
        });
        List<Services> list = response.getBody();
        return list;
    }

    List<CmplxPRToPOLineItemPRAccountAssignmentValues> getCmplxPRToPOLineItemPRAccountAssignmentValuesByLinkId(String linkid) {

        System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentValuesByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcmplxprtopolineitempraccountassignmentvaluesbylinkid.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemPRAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemPRAccountAssignmentValues>>() {
        });
        List<CmplxPRToPOLineItemPRAccountAssignmentValues> list = response.getBody();
        return list;
    }

    List<CmplxPRToPOLineItemService> getCmplxPRToPOLineItemServiceByLinkId(String linkid) {
        System.out.println("getCmplxPRToPOLineItemServiceByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getCmplxPRToPOLineItemServiceByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemService>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemService>>() {
        });
        List<CmplxPRToPOLineItemService> list = response.getBody();
        return list;
    }

    List<CmplxPRToPOLineItemPRAccountAssignment> getCmplxPRToPOLineItemPRAccountAssignmentByLinkId(String linkid) {

        System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcmplxprtopolineitempraccountassignmentbylinkid.do?PRLinkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemPRAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemPRAccountAssignment>>() {
        });
        List<CmplxPRToPOLineItemPRAccountAssignment> list = response.getBody();
        return list;
    }

    List<MasterExchangeRate> findExchangeRateByFromCurrencyAndToCurrency(String fromCurrency, String toCurrency) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findExchangeRateByFromCurrencyAndToCurrency.do?fromCurrency=" + fromCurrency + "&toCurrency=" + toCurrency;
        System.out.println("url:" + url);
        ResponseEntity<List<MasterExchangeRate>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterExchangeRate>>() {
        });
        List<MasterExchangeRate> list = (List<MasterExchangeRate>) response.getBody();
        return list;
    }

    List<MasterConditionValuesFormulas> getFurmulaByConType(String CnTy) {

        System.out.println("getFurmulaByConType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getfurmulabycontype.do?CnTy=" + CnTy;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterConditionValuesFormulas>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterConditionValuesFormulas>>() {
        });
        List<MasterConditionValuesFormulas> list = response.getBody();
        return list;
    }

    List<Services> getServiceByInsertionId(String insertionid) {
        System.out.println("getServiceByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getservicebyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Services>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Services>>() {
        });
        List<Services> service = response.getBody();
        return service;
    }

    List<DeliverySchedule> getDeliveryScheduleByInsertionId(String insertionid) {
        System.out.println("getDeliveryScheduleByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getdeliveryschedulebyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<DeliverySchedule>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<DeliverySchedule>>() {
        });
        List<DeliverySchedule> service = response.getBody();
        return service;
    }

    List<Delivery> getDeliveryByInsertionId(String insertionid) {
        System.out.println("getDeliveryByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getdeliverybyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Delivery>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Delivery>>() {
        });
        List<Delivery> delivery = response.getBody();
        return delivery;
    }

    List<Invoice> getInvoiceByInsertionId(String insertionid) {
        System.out.println("getInvoiceByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getinvoicebyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Invoice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Invoice>>() {
        });
        List<Invoice> invoice = response.getBody();
        return invoice;
    }

    List<NGBPCmplxPOCreationInvoice> getInvoiceByLinkId(String linkid) {
        System.out.println("getInvoiceByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getInvoiceByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationInvoice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationInvoice>>() {
        });
        List<NGBPCmplxPOCreationInvoice> invoice = response.getBody();
        return invoice;
    }

    List<Text> getTextsByInsertionId(String insertionid) {
        System.out.println("getTextsByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/gettextsbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Text>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Text>>() {
        });
        List<Text> text = response.getBody();
        return text;
    }

    List<DeliveryAddress> getDeliveryAddressByInsertionId(String insertionid) {
        System.out.println("getTextsByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getdeliveryaddressbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<DeliveryAddress>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<DeliveryAddress>>() {
        });
        List<DeliveryAddress> address = response.getBody();
        return address;
    }

    List<Confirmations> getConfirmationsByInsertionId(String insertionid) {
        System.out.println("getConfirmationsByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getconfirmationsbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Confirmations>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Confirmations>>() {
        });
        List<Confirmations> conf = response.getBody();
        return conf;
    }

    List<ConditionControl> getConditionCondrolByInsertionId(String insertionid) {
        System.out.println("getConditionCondrolByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getconditioncondrolbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionControl>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionControl>>() {
        });
        List<ConditionControl> condition = response.getBody();
        return condition;
    }

    List<HeaderText> getHeaderTextByInsertionId(String insertionid) {
        System.out.println("getHeaderTextByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getheadertextbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<HeaderText>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<HeaderText>>() {
        });
        List<HeaderText> text = response.getBody();
        return text;
    }

    List<ServiceAccountAssignment> getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(String serviceLineItemNumber, String lineItemNumber) {
        System.out.println("getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getserviceaccountassignmentbyservicelineitemnumberandlineitemnumber.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ServiceAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ServiceAccountAssignment>>() {
        });
        List<ServiceAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    List<AccountAssignment> getAccountAssignmentByLineItemNumber(String lineItemNumber) {
        System.out.println("getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getaccountassignmentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<AccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignment>>() {
        });
        List<AccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    String saveCustomerData(CustomerData customer) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savecustomerdata.do"), customer, String.class);
        System.out.println("saveCustomerData :" + msg);
        return msg;
    }

    List<CustomerData> getCustomerDataByInsertionId(String insertionid) {
        System.out.println("getCustomerDataByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcustomerdatabyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<CustomerData>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CustomerData>>() {
        });
        List<CustomerData> customer = response.getBody();
        return customer;
    }

    String saveQuantityDates(QuantityDates quantity) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savequantitydates.do"), quantity, String.class);
        System.out.println("saveQuantityDates :" + msg);
        return msg;
    }

    List<QuantityDates> getQuantityDatesByInsertionId(String insertionid) {
        System.out.println("getQuantityDatesByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getquantitydatesbyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<QuantityDates>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<QuantityDates>>() {
        });
        List<QuantityDates> quantity = response.getBody();
        return quantity;
    }

    String updateHeaderText(HeaderText headerText) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateheadertext.do"), headerText, String.class);
        System.out.println("updateheadertext :" + msg);
        return msg;
    }

    String updateCustomerData(CustomerData customer) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatecustomerdata.do"), customer, String.class);
        System.out.println("updatecustomerdata :" + msg);
        return msg;
    }

    String updateConditionControl(ConditionControl conditionControl) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateconditioncontrol.do"), conditionControl, String.class);
        System.out.println("updateconditioncontrol :" + msg);
        return msg;
    }

    String updateConfirmation(Confirmations confirmations) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateconfirmation.do"), confirmations, String.class);
        System.out.println("updateconfirmation :" + msg);
        return msg;
    }

    String updateDeliveryAddress(DeliveryAddress deliveryAddress) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatedeliveryaddress.do"), deliveryAddress, String.class);
        System.out.println("updatedeliveryaddress :" + msg);
        return msg;
    }

    String updateText(Text text) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatetext.do"), text, String.class);
        System.out.println("updatetext :" + msg);
        return msg;
    }

    String updateInvoice(Invoice invoice) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateinvoice.do"), invoice, String.class);
        System.out.println("updateinvoice :" + msg);
        return msg;
    }

    String updateDelivery(Delivery delivery) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatedelivery.do"), delivery, String.class);
        System.out.println("savedeliveryschedule :" + msg);
        return msg;
    }

    String updateDeliverySchedule(DeliverySchedule deliverySchedule) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatedeliveryschedule.do"), deliverySchedule, String.class);
        System.out.println("updatedeliveryschedule :" + msg);
        return msg;
    }

    String updateQuantityDates(QuantityDates quantity) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatequantitydates.do"), quantity, String.class);
        System.out.println("updatequantitydates :" + msg);
        return msg;
    }

    String updateServiceTableData(Services services) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateservicetabledata.do"), services, String.class);
        System.out.println("updateServiceTableData : " + msg);
        return msg;
    }

    String updateServiceAccountAssignment(ServiceAccountAssignment serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateserviceaccountassignment.do"), serviceAccountAssignment, String.class);
        System.out.println("updateServiceAccountAssignment : " + msg);
        return msg;
    }

    String updateAccountAssignment(AccountAssignment accountAssignment) {
        System.out.println("Sunny Kumar Prajapati");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateaccountassignment.do"), accountAssignment, String.class);
        System.out.println("updateaccountassignment :" + msg);
        return msg;
    }

    List<LimitAccountAssignment> getLimitAccountAssignmentByLineItemNumberAndServiceLineItemNumber(String lineItemNumber, String serviceLineItemNumber) {
        System.out.println("getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getlimitaccountassignmentbyservicelineitemnumberandlineitemnumber.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<LimitAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<LimitAccountAssignment>>() {
        });
        List<LimitAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    List<LimitAccountAssignment> getLimitAccountAssignmentByLineItemNumber(String lineItemNumber) {
        System.out.println("getLimitAccountAssignmentByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getlimitaccountassignmentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<LimitAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<LimitAccountAssignment>>() {
        });
        List<LimitAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    String updateLimitAccountAssignment(LimitAccountAssignment limitAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatelimitaccountassignment.do"), limitAccountAssignment, String.class);
        System.out.println("updatelimitaccountassignment :" + msg);
        return msg;
    }

    List<MasterPurchaseOrg> getAllPurchaseOrg() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallpurchaseorg.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPurchaseOrg>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchaseOrg>>() {
        });
        List<MasterPurchaseOrg> list = response.getBody();
        System.out.println("MasterPurchaseOrg size: " + list.size());
        return list;
    }

    List<MasterSONumber> getMasterSONumber() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getmastersonumber.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterSONumber>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterSONumber>>() {
        });
        List<MasterSONumber> list = response.getBody();
        System.out.println("MasterPurchaseOrg size: " + list.size());
        return list;
    }

    List<CmplxPRToPOLineItemPRAccountAssignmentValues> getCmplxPRToPOLineItemPRAccountAssignmentValuesByServiceLinkId(String servicelinkid) {

        System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentValuesByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcmplxprtopolineitempraccountassignmentvaluesbyservicelinkid.do?servicelinkid=" + servicelinkid;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemPRAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemPRAccountAssignmentValues>>() {
        });
        List<CmplxPRToPOLineItemPRAccountAssignmentValues> list = response.getBody();
        return list;
    }

    List<AccountAssignment> getAccountAssignmentByLinkNumber(String linkNumber) {
        System.out.println("v");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getaccountassignmentbylinknumber.do?linkNumber=" + linkNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<AccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignment>>() {
        });
        List<AccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    List<MasterPricingProcedures> getPricingProcedureByConditionType(String CType, String kalsm) {
        System.out.println("getAccountAssignmentByLinkNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getpricingprocedurebyconditiontype.do?CType=" + CType + "&kalsm=" + kalsm;
        System.out.println("url in getPricingProcedureByConditionType: " + url);
        ResponseEntity<List<MasterPricingProcedures>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPricingProcedures>>() {
        });
        List<MasterPricingProcedures> pricing = response.getBody();
        return pricing;
    }

    String deleteAllFromServiceAccountAssignment(List<ServiceAccountAssignment> accAsgnList) {
        System.out.println("accAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallfromserviceaccountassignment.do?accAsgnList=" + accAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accAsgnList, String.class);
        return result;
    }

    String deleteAllFromAccountAssignment(List<AccountAssignment> accountAsgnList) {
        System.out.println("accountAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallfromaccountassignment.do?accountAsgnList=" + accountAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accountAsgnList, String.class);
        return result;
    }

    List<CmplxPRToPOLineItemPRAccountAssignment> getCmplxPRToPOLineItemPRAccountAssignmentByPRLinkId(String PRLinkid) {

        System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentByPRLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcmplxprtopolineitempraccountassignmentbyprlinkid.do?PRLinkid=" + PRLinkid;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemPRAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemPRAccountAssignment>>() {
        });
        List<CmplxPRToPOLineItemPRAccountAssignment> list = response.getBody();
        return list;
    }

    List<MasterConditionValuesFormulas> getConditionValuesFormulas() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getconditionvaluesformulas.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterConditionValuesFormulas>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterConditionValuesFormulas>>() {
        });
        List<MasterConditionValuesFormulas> list = response.getBody();
        System.out.println("MasterConditionValuesFormulas size: " + list.size());
        return list;
    }

    List<MasterMaterialGeneral> getMasterMaterialGeneral(String materialcode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getmastermaterialgeneral.do?materialcode=" + materialcode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGeneral>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGeneral>>() {
        });
        List<MasterMaterialGeneral> list = response.getBody();
        System.out.println("MasterMaterialGeneral size: " + list.size());
        return list;
    }

    List<MasterMaterialGeneral> getAllMasterMaterialGeneral() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmastermaterialgeneral.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGeneral>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGeneral>>() {
        });
        List<MasterMaterialGeneral> list = response.getBody();
        System.out.println("MasterMaterialGeneral size: " + list.size());
        return list;
    }

    List<MasterPlant> getAllMasterPlant() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasterplant.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPlant>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPlant>>() {
        });
        List<MasterPlant> list = response.getBody();
        System.out.println("MasterPlant size: " + list.size());
        return list;
    }

    List<Component> getComponentByLineItemNumber(String lineItemNumber) {
        System.out.println("getComponentByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcomponentbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<Component>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Component>>() {
        });
        List<Component> component = response.getBody();
        return component;
    }

    String updateComponent(Component component) {
        System.out.println("Sunny Kumar Prajapati in updateComponent");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatecomponent.do"), component, String.class);
        System.out.println("updatecomponent :" + msg);
        return msg;
    }

    String saveComponent(Component component) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savecomponent.do"), component, String.class);
        System.out.println("savecomponent :" + msg);
        return msg;
    }

    List<ConditionsLineLevel> getMasterConditionLineLevelByLineItemNumber(String lineItemNumber) {
        System.out.println("getMasterConditionLineLevelByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getmasterconditionlinelevelbylineitemnumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> condition = response.getBody();
        return condition;
    }

    String updateConditionsTabData(ConditionsLineLevel conditions) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateconditionstabdata.do"), conditions, String.class);
        System.out.println("saveConditionsTabData : " + msg);
        return msg;
    }

    List<NGCPCustomerSeeded> getAllCustomerSeeded() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcustomerseeded.do";
        System.out.println("url: " + url);
        ResponseEntity<List<NGCPCustomerSeeded>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGCPCustomerSeeded>>() {
        });
        List<NGCPCustomerSeeded> list = response.getBody();
        System.out.println("channelList size: " + list.size());
        return list;
    }

    String deleteAllConditions(List<ConditionsLineLevel> conditionList) {
        System.out.println("conditionList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallconditions.do?conditionList=" + conditionList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, conditionList, String.class);
        return result;
    }

    String deleteAllLimitAccountAssignment(List<LimitAccountAssignment> limitAssAsgnList) {
        System.out.println("limitAssAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deletealllimitaccountassignment.do?limitAssAsgnList=" + limitAssAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, limitAssAsgnList, String.class);
        return result;
    }

    List<ServiceAccountAssignment> getAllServiceAccountAssignment() {
        System.out.println("getServiceAccountAssignment");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallserviceaccountassignment.do";
        System.out.println("url: " + url);
        ResponseEntity<List<ServiceAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ServiceAccountAssignment>>() {
        });
        List<ServiceAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    List<LimitAccountAssignment> getAllLimitAccountAssignment() {
        System.out.println("getAllLimitAccountAssignment");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getalllimitaccountassignment.do";
        System.out.println("url: " + url);
        ResponseEntity<List<LimitAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<LimitAccountAssignment>>() {
        });
        List<LimitAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

//    String LimitAccountAssignmentType(List<Object> accAssignmentList, int i) {
//        System.out.println("accAssignmentList size after delete :" + accAssignmentList.size());
////        float quant = netValue / totalNetValue;
////        System.out.println("Quant :" + quant);
////        accAssignmentList.get(i).setQuantity(new BigDecimal(quant));
////        float percentage = quant * 100;
////        System.out.println("Percentage :" + percentage);
////        accAssignmentList.get(i).setPercentage(new BigDecimal(percentage));
//        return "Executed";
//    }
//    
    String deleteDeliverySchedule(List<DeliverySchedule> deliverySchList) {
        System.out.println("deleteDeliverySchedule");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deletedeliveryschedule.do?deliverySchList=" + deliverySchList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, deliverySchList, String.class);
        return result;
    }

    String deleteAllComponent(List<Component> componentList) {
        System.out.println("deleteAllComponent");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallcomponent.do?componentList=" + componentList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, componentList, String.class);
        return result;
    }

    List<AccountAssignment> getAccountAssignmentByServiceLineItemNumberAndLineItemNumber(String serviceLineItemNumber, String lineItemNumber) {
        System.out.println("getAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getaccountassignmentbyservicelineitemnumberandlineitemnumber.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<AccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignment>>() {
        });
        List<AccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    String deleteFromServices(List<Services> serviceList) {
        System.out.println("deleteFromServices");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deletefromservices.do?serviceList=" + serviceList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, serviceList, String.class);
        return result;
    }

    List<CmplxPRToPOLineItemPRAccountAssignmentValues> getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId(String pRLinkid) {
        System.out.println("getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getcmplxprtopolineitempraccountassignmentvaluesbyprlinkid.do?pRLinkid=" + pRLinkid;
        System.out.println("url: " + url);
        ResponseEntity<List<CmplxPRToPOLineItemPRAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CmplxPRToPOLineItemPRAccountAssignmentValues>>() {
        });
        List<CmplxPRToPOLineItemPRAccountAssignmentValues> values = response.getBody();
        return values;
    }

    public List<MasterCurrency> getAllCurrency() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcurrency.do";
        ResponseEntity<List<MasterCurrency>> country = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCurrency>>() {
        });
        List<MasterCurrency> currencyList = country.getBody();
        return currencyList;
    }

    public List<MasterCostCentre> getAllCostCenter() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcostcenter.do";
        ResponseEntity<List<MasterCostCentre>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCostCentre>>() {
        });
        List<MasterCostCentre> costCenterList = costCenter.getBody();
        return costCenterList;
    }

    public List<MasterItemCategory> getAllItemCategory() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallitemcategory.do";
        ResponseEntity<List<MasterItemCategory>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterItemCategory>>() {
        });
        System.out.println("costCenter: " + costCenter);
        List<MasterItemCategory> itemCategoryList = costCenter.getBody();
        return itemCategoryList;
    }

    public List<MasterTNCCMapping> findCostCenter() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCostCenter.do";
        System.out.println("URL MasterTNCCMapping :::" + url);
        ResponseEntity<List<MasterTNCCMapping>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterTNCCMapping>>() {
        });
        List<MasterTNCCMapping> costCenterList = costCenter.getBody();
        return costCenterList;
    }

    public List<MasterInternalOrder> getAllInterOrder(String accAsgn) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallinterorder.do?accAsgn=" + accAsgn;
        ResponseEntity<List<MasterInternalOrder>> order = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterInternalOrder>>() {
        });
        System.out.println("order: " + order);
        List<MasterInternalOrder> orderObj = order.getBody();
        return orderObj;
    }

    public List<MasterGLCode> getAllGLCode() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallglcode.do";
        ResponseEntity<List<MasterGLCode>> code = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterGLCode>>() {
        });
        List<MasterGLCode> codeObj = code.getBody();
        return codeObj;
    }

    public List<MasterCommitmentItem> getAllCommitmentItem() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcommitmentitem.do";
        ResponseEntity<List<MasterCommitmentItem>> item = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCommitmentItem>>() {
        });
        System.out.println("item: " + item);
        List<MasterCommitmentItem> itemObj = item.getBody();
        return itemObj;
    }

    public List<MasterWBSElement> getAllMasterWBSElement() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasterwbselement.do";
        ResponseEntity<List<MasterWBSElement>> element = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterWBSElement>>() {
        });
        System.out.println("element: " + element);
        List<MasterWBSElement> elementObj = element.getBody();
        return elementObj;
    }

    public List<MasterNetwork> getAllMasterNetwork() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasternetwork.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterNetwork>> network = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterNetwork>>() {
        });
        List<MasterNetwork> networkObj = network.getBody();
        return networkObj;
    }

    public List<MasterAsset> getAllMasterAsset() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasterasset.do";
        ResponseEntity<List<MasterAsset>> asset = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterAsset>>() {
        });
        List<MasterAsset> assetObj = asset.getBody();
        return assetObj;
    }

    public List<MasterServiceMaster> getAllServiceMaster() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallservicemaster.do";
        ResponseEntity<List<MasterServiceMaster>> service = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterServiceMaster>>() {
        });
        System.out.println("service: " + service);
        List<MasterServiceMaster> serviceObj = service.getBody();
        return serviceObj;
    }

    List<MasterStockType> getAllStockType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallstocktype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterStockType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterStockType>>() {
        });
        List<MasterStockType> list = response.getBody();
        System.out.println("stock size: " + list.size());
        return list;
    }

    List<MasterShippingInstructions> getAllShippingInstructions() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallshippinginstruction.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterShippingInstructions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterShippingInstructions>>() {
        });
        List<MasterShippingInstructions> list = response.getBody();
        System.out.println("Instruction size: " + list.size());
        return list;
    }

    List<MasterQAControl> getAllMasterQAControl() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getAllMasterQAControl.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterQAControl>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterQAControl>>() {
        });
        List<MasterQAControl> list = response.getBody();
        return list;
    }

    List<MasterCustomerSegment> getAllMasterCustomerSegment() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getAllMasterCustomerSegment.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterCustomerSegment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCustomerSegment>>() {
        });
        List<MasterCustomerSegment> list = response.getBody();
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

    public List<PaymentTermsMaster> getAllPaymentTerms() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallpaymentterms.do";
        ResponseEntity<List<PaymentTermsMaster>> paymentterms = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PaymentTermsMaster>>() {
        });
        System.out.println("paymentterms: " + paymentterms);
        List<PaymentTermsMaster> paymenttermsList = paymentterms.getBody();
        return paymenttermsList;
    }

    public List<MasterCompanyCode> findAllMasterCompanyCode() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findcompanycodefrommaster.do";
        ResponseEntity<List<MasterCompanyCode>> vendor = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCompanyCode>>() {
        });
        System.out.println("vendor: " + vendor);
        List<MasterCompanyCode> masterCompanyCodeList = vendor.getBody();
        return masterCompanyCodeList;
    }

    public List<MasterVendor> getAllVendorMaster() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findallvendorfrommaster.do";
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        System.out.println("response: " + response);
        List<MasterVendor> vendorList = response.getBody();
        return vendorList;
    }

    List<Limits> findLimitsByLineItemNumber(String lineItemNumber) {
        System.out.println("findLimitsByLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findLimitsByLineItemNumber.do?lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<Limits>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Limits>>() {
        });
        List<Limits> limits = response.getBody();
        return limits;
    }

    String deleteAllFromLimits(List<Limits> limitsList) {
        System.out.println("deleteAllFromLimits");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallfromlimits.do?limitsList=" + limitsList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, limitsList, String.class);
        return result;
    }

    String saveLimits(Limits limits) {
        System.out.println(" save in Limits");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savelimits.do"), limits, String.class);
        System.out.println("limits :" + msg);
        return msg;
    }

    String savePO(HttpServletRequest request, HttpServletResponse response) {

        NGBPExtPOCreation bPExtPOCreation;
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Coming Here in saveHeaderSPO");
        System.out.println("Paramenter :::: " + request.getParameter("formdata"));
        
        String headerConditionsNew = request.getParameter("headerConditionsNew");
        System.out.println("headerConditionsNew: " + headerConditionsNew);
        
        bPExtPOCreation = parseData(request.getParameter("formdata"), headerConditionsNew);

//        System.out.println("bPExtPOCreationbPExtPOCreationbPExtPOCreation "+bPExtPOCreation.POCreationLineItem.size());
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveSAPO.do"), bPExtPOCreation, String.class);

        System.out.println("Before IDs");
        System.out.println("ID ::: " + id);
        return id;

    }

    NGBPExtPOCreation parseData(String jsonString, String headerConditionsNew) {

        NGBPExtPOCreation bPExtPOCreation = new NGBPExtPOCreation();
        JSONArray jsonarray = new JSONArray(jsonString);
        JSONObject json = jsonarray.getJSONObject(0);
        JSONObject jsonAdd = jsonarray.getJSONObject(6);
        JSONObject jsonOrg = jsonarray.getJSONObject(7);
        System.out.println("json.optString(\"poid\") :" + json.optString("poid"));

        if (!"".equalsIgnoreCase(json.optString("poid"))) {
            bPExtPOCreation.setId(Integer.parseInt(json.optString("poid")));
        }
        Date docDateHeader = null;
        if (json.optString("docDateHeader") != null && !json.optString("docDateHeader").trim().equalsIgnoreCase("")) {
            try {
                docDateHeader = new SimpleDateFormat("DD-MM-yyyy").parse(json.optString("docDateHeader"));
            } catch (Exception ex) {
                System.out.println("Exception In Date");
            }
        }
//        Header Parsig Start
        System.out.println("Vendor Name in Save Header::: " + json.optString("vendorName"));
        System.out.println("Vendor Code in Save Header::: " + json.optString("vendorCode"));
        String TempAttachmentId = json.optString("TempAttachmentId");
        System.out.println("TempAttachmentId in Save Header::: " + TempAttachmentId);
        if (!"".equals(TempAttachmentId)) {
            System.out.println("TempAttachmentId in blank");
            WorkOrderAttachmentTemp obj = findPrLineItemTempAttachmentById(Integer.parseInt(TempAttachmentId));
            bPExtPOCreation.setAttachment1(obj.getAttachment1());
            bPExtPOCreation.setAttachment1name(obj.getAttachment1name());

            bPExtPOCreation.setAttachment2(obj.getAttachment2());
            bPExtPOCreation.setAttachment2name(obj.getAttachment2name());

            bPExtPOCreation.setAttachment3(obj.getAttachment3());
            bPExtPOCreation.setAttachment3name(obj.getAttachment3name());

            bPExtPOCreation.setAttachment4(obj.getAttachment4());
            bPExtPOCreation.setAttachment4name(obj.getAttachment4name());

            bPExtPOCreation.setAttachment5(obj.getAttachment5());
            bPExtPOCreation.setAttachment5name(obj.getAttachment5name());
        }

        bPExtPOCreation.setCompanyCode(json.optString("companycodeHeader"));
        bPExtPOCreation.setPurchaseOrderType(json.optString("typeOfPOHeader"));
        bPExtPOCreation.setDownpaymentReqd(json.optString("downPaymentReqd"));
        bPExtPOCreation.setVendorName(json.optString("vendorName"));
        bPExtPOCreation.setVendorCode(json.optString("vendorCode"));
        bPExtPOCreation.setPurchaseRequestType(json.optString("prType"));
        bPExtPOCreation.setRequestType(json.optString("requestType"));
        bPExtPOCreation.setReferenceDocumentType(json.optString("referenceDocType"));
        bPExtPOCreation.setReferenceDocumentNumber(json.optString("referenceDocNumber"));
        bPExtPOCreation.setIsAckReq(json.optString("isAckReq"));
//        bPExtPOCreation.setReferenceDocumentLine(json.optString("referenceDocLine"));
        System.out.println("setDocumentDate(docDateHeader) :" + docDateHeader);
        bPExtPOCreation.setDocumentDate(docDateHeader);
        if (!"".equals(json.optString("downPaymentReqdValue"))) {
            bPExtPOCreation.setValu(new BigDecimal(json.optString("downPaymentReqdValue")));
        } else {
            bPExtPOCreation.setValu(new BigDecimal(0.0));
        }

        bPExtPOCreation.setCollectiveNumber(jsonAdd.optString("CollectiveNumber"));
        bPExtPOCreation.setPurchasingOrg(jsonOrg.optString("purchasingOrg"));
        bPExtPOCreation.setPurchasingGrp(jsonOrg.optString("purchasingGroup"));
        System.out.println("Po Number on header save :" + jsonOrg.optString("poNumber"));
        if (!"".equals(json.optString("poNumber"))) {
            bPExtPOCreation.setPoNumber(json.optString("poNumber"));
        } else {
            bPExtPOCreation.setPoNumber("");
        }

        bPExtPOCreation.setHeaderConditionsNew(headerConditionsNew);
        bPExtPOCreation.setIsPoCreated("No");
        
//        Header Parsing End
//        Delivery/Invoice Parsing Here
        json = jsonarray.getJSONObject(1);
        NGBPCmplxPOCreationDeliveryInvoice nGBPCmplxPOCreationDeliveryInvoice = new NGBPCmplxPOCreationDeliveryInvoice();
        nGBPCmplxPOCreationDeliveryInvoice.setPaymentTerms(json.optString("paymentTermsDelivery"));
        nGBPCmplxPOCreationDeliveryInvoice.setPaymentindays1(json.optString("paymentDays1"));
        nGBPCmplxPOCreationDeliveryInvoice.setPaymentindays1(json.optString("paymentDays1"));
        nGBPCmplxPOCreationDeliveryInvoice.setPaymentindays2(json.optString("paymentDays2"));
        nGBPCmplxPOCreationDeliveryInvoice.setPaymentindays2(json.optString("paymentDays2"));
        nGBPCmplxPOCreationDeliveryInvoice.setPaymentindaysnet(json.optString("paymentDaysNet"));
        nGBPCmplxPOCreationDeliveryInvoice.setIncoterms1(json.optString("IncoTermsPart1"));
        nGBPCmplxPOCreationDeliveryInvoice.setIncoterms2(json.optString("IncoTermsPart2"));
        nGBPCmplxPOCreationDeliveryInvoice.setCurrency(json.optString("CurrencyDeliveryInvoice"));
        if (!"".equals(json.optString("ExchangeRate"))) {
            nGBPCmplxPOCreationDeliveryInvoice.setExchangeRate(new BigDecimal(json.optString("ExchangeRate")));
        } else {
            nGBPCmplxPOCreationDeliveryInvoice.setExchangeRate(new BigDecimal(0.0));
        }

        nGBPCmplxPOCreationDeliveryInvoice.setExchangeRateFixed(json.optString("ExchangeReateFixed"));
        bPExtPOCreation.setDeliveryInvoice(nGBPCmplxPOCreationDeliveryInvoice);
//        Delivery/Invoice Parsing Ends

//        Vendor Address Starts
        json = jsonarray.getJSONObject(3);
        NGBPCmplxPOCreationVendorAddress vendorAddress = new NGBPCmplxPOCreationVendorAddress();

        System.out.println("Country in Header :" + json.optString("countryCodeVendorAddress") + "-" + json.optString("countryVendorAddress"));

        vendorAddress.setStreet(json.optString("streetVendorAddress"));
        vendorAddress.setHouseNumber(json.optString("houseNumberVendorAddress"));
        vendorAddress.setPostalCode(json.optString("postalCodeVendorAddress"));
        vendorAddress.setCity(json.optString("cityVendorAddress"));
        vendorAddress.setTelExt(json.optString("extTel"));
        vendorAddress.setTelNo(json.optString("telephoneVendorAddress"));
        vendorAddress.setFaxExt(json.optString("extFax"));
        vendorAddress.setFaxNo(json.optString("faxVendorAddress"));
        vendorAddress.setCountry(json.optString("countryVendorAddress"));
        vendorAddress.setMailId(json.optString("vendorEmail"));
//        bPExtPOCreation.setnVendorAddress(vendorAddress);
        bPExtPOCreation.setVendorAddress(vendorAddress);
//        Vendor Address Ends        

//        Communication Starts
        json = jsonarray.getJSONObject(4);
        System.out.println("JSON ::: " + json.toString());
        NGBPCmplxPOCreationCommunication vendorcomm = new NGBPCmplxPOCreationCommunication();
        vendorcomm.setSalesPerson(json.optString("Salesperson"));
        vendorcomm.setYourReference(json.optString("YourReference"));
        vendorcomm.setTelephone(json.optString("Telephone"));
        vendorcomm.setOurReference(json.optString("OurReference"));
        vendorcomm.setLang(json.optString("Language"));
        bPExtPOCreation.setDeliveryComm(vendorcomm);
//        Communication Ends

//        CustomerData Starts
        JSONObject jsonCust = jsonarray.getJSONObject(8);
        System.out.println("JSON jsonCust ::: " + jsonCust.toString());
        NGBPCmplxPOCreationCustormerData vendorcust = new NGBPCmplxPOCreationCustormerData();
//        vendorcust.set(json.optString("ConfControl"));
        vendorcust.setSegment(jsonCust.optString("SegmentDescription"));
        vendorcust.setProductOrigin(jsonCust.optString("ProductOrigin"));
        vendorcust.setZoneCollectionScrap(jsonCust.optString("ZoneCollectionScrap"));
        vendorcust.setInstructionsToWeighter(jsonCust.optString("InstructionToWeigher"));
        vendorcust.setPriceDisplay(jsonCust.optString("PriceDisplay"));
        vendorcust.setExternalWeight(jsonCust.optString("ExternalWeight"));
        vendorcust.setPaymentImmediate(jsonCust.optString("PaymentImmediate"));
        bPExtPOCreation.setCustData(vendorcust);
//        CustomerData Ends

        //Header Text Data Start
        JSONObject jsonHeaderText = jsonarray.getJSONObject(9);
        System.out.println("JSON jsonHeaderText ::: " + jsonHeaderText.toString());
        NGBPCmplxPOCreationHeaderText header = new NGBPCmplxPOCreationHeaderText();
        header.setPONoteToApprover(jsonHeaderText.optString("pONotetoApproverHeaderTextsLimits"));
        header.setHeaderNote(jsonHeaderText.optString("HeaderNote"));
        header.setPricingTypes(jsonHeaderText.optString("PricingTypes"));
        header.setDeadlines(jsonHeaderText.optString("Deadlines"));
        header.setTermsOfDelivery(jsonHeaderText.optString("TermsofDelivery"));
        header.setTermsOfPayment(jsonHeaderText.optString("TermsofPayment"));
        header.setShippingInstructions(jsonHeaderText.optString("ShippingInstructions"));
        header.setVendorMemoGeneral(jsonHeaderText.optString("VendorMemoGeneral"));
        header.setVendorMemoSpecial(jsonHeaderText.optString("VendorMemoSpecial"));
        header.setHeaderText(jsonHeaderText.optString("headerTextHeader"));
        bPExtPOCreation.setHeaderText(header);
        //Header Text Data End
        //Status Tab Start
        JSONObject jsonStatus = jsonarray.getJSONObject(10);
        System.out.println("JSON jsonStatus ::: " + jsonStatus.toString());

        NGBPCmplxPOCreationStatus status = new NGBPCmplxPOCreationStatus();
        status.setOrdered(jsonStatus.optString("Ordered"));
        status.setDelivered(jsonStatus.optString("Delivered"));
        status.setStilltodeliv(jsonStatus.optString("stillToDeliv"));
        status.setInvoiced(jsonStatus.optString("Invoiced"));
        status.setDownpaymts(jsonStatus.optString("DownPayments"));

        bPExtPOCreation.setStatus(status);

        //Status Tab Ends
        //Line Item Data Starts
        json = jsonarray.getJSONObject(11);
        JSONArray prTableData = json.getJSONArray("prTableData");

        List<NGBPCmplxPOCreationLineItemPO> pOCreationLineItemList = new ArrayList<>();
        NGBPCmplxPOCreationLineItemPO pOCreationLineItem;

        for (int i = 0; i < prTableData.length(); i++) {
            System.out.println("Delivery Date  before change:" + prTableData.getJSONObject(i).optString("deliveryDate"));
            System.out.println("reqDate  after before:" + prTableData.getJSONObject(i).optString("reqDate"));
            DateFormat formatter;
//            formatter = new SimpleDateFormat("yyyy-MM-dd");
            formatter = new SimpleDateFormat("dd.MM.yyyy");
            Date delDate = null;
            Date reqDate = null;
            if (prTableData.getJSONObject(i).optString("deliveryDateCategory") != null && prTableData.getJSONObject(i).optString("deliveryDateCategory").equals("D")) {
                if (prTableData.getJSONObject(i).optString("deliveryDate") != null && !prTableData.getJSONObject(i).optString("deliveryDate").trim().equalsIgnoreCase("")) {
                    try {
                        delDate = formatter.parse(prTableData.getJSONObject(i).optString("deliveryDate"));
                    } catch (ParseException ex) {
                        Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
            if (prTableData.getJSONObject(i).optString("reqDate") != null && !prTableData.getJSONObject(i).optString("reqDate").trim().equalsIgnoreCase("")) {
                try {
                    reqDate = formatter.parse(prTableData.getJSONObject(i).optString("reqDate"));
                } catch (ParseException ex) {
                    Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            System.out.println("Delivery Date  after change:" + delDate);
            System.out.println("reqDate  after change:" + reqDate);

            pOCreationLineItem = new NGBPCmplxPOCreationLineItemPO();
//            pOCreationLineItem.setExtPOCreation_id(23);
            pOCreationLineItem.setItemNumber(prTableData.getJSONObject(i).optString("itemNumber"));
            pOCreationLineItem.setAccountAssignment(prTableData.getJSONObject(i).optString("acAsgn"));
            pOCreationLineItem.setItemCategory(prTableData.getJSONObject(i).optString("itemCat"));
            pOCreationLineItem.setMaterialCode(prTableData.getJSONObject(i).optString("matCode"));
            pOCreationLineItem.setCriticality(prTableData.getJSONObject(i).optString("criticality"));
            pOCreationLineItem.setShortText(prTableData.getJSONObject(i).optString("shortText"));
            pOCreationLineItem.setMaterialLongText(prTableData.getJSONObject(i).optString("longText"));
            if (!"".equals(prTableData.getJSONObject(i).optString("quantity"))) {
                pOCreationLineItem.setQuantity(new BigDecimal(prTableData.getJSONObject(i).optString("quantity")));
            } else {
                pOCreationLineItem.setQuantity(new BigDecimal(0.0));
            }

            if (!"".equals(prTableData.getJSONObject(i).optString("netPrice"))) {
                pOCreationLineItem.setNetPrice(new BigDecimal(prTableData.getJSONObject(i).optString("netPrice")));
            } else {
                pOCreationLineItem.setNetPrice(new BigDecimal(0.0));
            }
            if (!"".equals(prTableData.getJSONObject(i).optString("perUnit"))) {
                pOCreationLineItem.setQuantityUnit(new BigDecimal(prTableData.getJSONObject(i).optString("perUnit")));
            } else {
                pOCreationLineItem.setQuantityUnit(new BigDecimal(0.0));
            }

            pOCreationLineItem.setUnit(prTableData.getJSONObject(i).optString("unit"));
            pOCreationLineItem.setCurrency(prTableData.getJSONObject(i).optString("currency"));
            pOCreationLineItem.setPrOrderPriceUnit(prTableData.getJSONObject(i).optString("opu"));
            pOCreationLineItem.setDeliveryDateCategory(prTableData.getJSONObject(i).optString("deliveryDateCategory"));
            if (prTableData.getJSONObject(i).optString("deliveryDateCategory") != null && prTableData.getJSONObject(i).optString("deliveryDateCategory").equals("D")) {
                pOCreationLineItem.setDeliveryDate(delDate);
                pOCreationLineItem.setDeliveryDateByCategory(null);
            } else {
                pOCreationLineItem.setDeliveryDate(null);
                pOCreationLineItem.setDeliveryDateByCategory(prTableData.getJSONObject(i).optString("deliveryDate"));
            }
            pOCreationLineItem.setRequisitionDate(reqDate);
            pOCreationLineItem.setPlant(prTableData.getJSONObject(i).optString("plant"));
            pOCreationLineItem.setMaterialGroup(prTableData.getJSONObject(i).optString("matlGrp"));
            pOCreationLineItem.setPurchasingOrganization(prTableData.getJSONObject(i).optString("purOrg"));
            pOCreationLineItem.setPurchasingGroup(prTableData.getJSONObject(i).optString("purgrp"));
            pOCreationLineItem.setStorageLocation(prTableData.getJSONObject(i).optString("storeLoc"));
            pOCreationLineItem.setBatch(prTableData.getJSONObject(i).optString("batch"));
            pOCreationLineItem.setInfoRecord(prTableData.getJSONObject(i).optString("infoRecord"));
            pOCreationLineItem.setRequisitionerID(prTableData.getJSONObject(i).optString("pRRequisitioner"));
//            pOCreationLineItem.set(prTableData.getJSONObject(i).optString("pRCreator"));
//            pOCreationLineItem.setPaymentImmediatedep(prTableData.getJSONObject(i).optString("pRDepartmentName"));
            pOCreationLineItem.setHigherLevelItem(prTableData.getJSONObject(i).optString("higherLevelItem"));
            pOCreationLineItem.setSubitemCategory(prTableData.getJSONObject(i).optString("subItemCategory"));
            pOCreationLineItem.setTrackingNumber(prTableData.getJSONObject(i).optString("trackingNumber"));
            pOCreationLineItem.setLinkId(prTableData.getJSONObject(i).optString("linkid"));
            pOCreationLineItem.setTaxCode(prTableData.getJSONObject(i).optString("taxCode"));
//            NGBPCmplxPOCreationQuantitiesWeights pOCreationQuanWeight = new NGBPCmplxPOCreationQuantitiesWeights();
//            pOCreationQuanWeight.setOrderPrice("17");
//            pOCreationLineItem.setQuanWeight(pOCreationQuanWeight);
            if (!"".equals(prTableData.getJSONObject(i).optString("gLCode"))) {
                pOCreationLineItem.setgLCode(prTableData.getJSONObject(i).optString("gLCode"));
            } else {
                pOCreationLineItem.setgLCode("");
            }

            if (!"".equals(prTableData.getJSONObject(i).optString("zGLCOde"))) {
                pOCreationLineItem.setzGLCode(prTableData.getJSONObject(i).optString("zGLCOde"));
            } else {
                pOCreationLineItem.setzGLCode("");
            }
            pOCreationLineItem.setImmaterial(prTableData.getJSONObject(i).optString("prImMaterial"));
            pOCreationLineItem.setReturnsItem(prTableData.getJSONObject(i).optString("prReturnsItem"));
            pOCreationLineItem.setFreeOfCharge(prTableData.getJSONObject(i).optString("prFreeOfCharge"));
            System.out.println("prRfqNo :" + prTableData.getJSONObject(i).optString("prRfqNo"));
            System.out.println("prRfqItemNo :" + prTableData.getJSONObject(i).optString("prRfqItemNo"));
            pOCreationLineItem.setrFQNo(prTableData.getJSONObject(i).optString("prRfqNo"));
            pOCreationLineItem.setrFQItemNo(prTableData.getJSONObject(i).optString("prRfqItemNo"));
            pOCreationLineItem.setIsLineLevelDataSaved("No");
            if (!"".equals(prTableData.getJSONObject(i).optString("netPrice"))) {
                pOCreationLineItem.setPrNetPrice(new BigDecimal(prTableData.getJSONObject(i).optString("prNetPriceHidden")));
            } else {
                pOCreationLineItem.setPrNetPrice(new BigDecimal(0.0));
            }

            pOCreationLineItemList.add(pOCreationLineItem);

        }

        bPExtPOCreation.setPOCreationLineItem(pOCreationLineItemList);

        System.out.println("prTableData ::: " + prTableData.toString());

        System.out.println("ur: " + webservice_ip + "/BuyerPortalWebServices/saveSAPO.do");
        System.out.println("companycodeHeader " + bPExtPOCreation.getDeliveryComm().getSalesPerson());
        return bPExtPOCreation;
    }

    String savePRLineSub(HttpServletRequest request, HttpServletResponse response) {

        String poCurrency = request.getParameter("poCurrency");
        System.out.println("poCurrency :" + poCurrency);
        String localCurrency = request.getParameter("localCurrency");
        System.out.println("localCurrency :" + localCurrency);

        NGBPExtPOCreation bPExtPOCreation = new NGBPExtPOCreation();
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Coming Here in savePRLineSub bittu");
        System.out.println("Paramenter [savePRLineSub]  :::: " + request.getParameter("formdata"));
        JSONArray jsonarray = new JSONArray(request.getParameter("formdata"));
        String url = webservice_ip + "/BuyerPortalWebServices/getPRLineData.do?searchData=" + jsonarray.getJSONObject(0).optString("poid") + "~" + jsonarray.getJSONObject(0).optString("itemId");
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPO>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPO>>() {
        });
        List<NGBPCmplxPOCreationLineItemPO> LineItemPOlist = list.getBody();
        System.out.println("LineItemPOlist size :" + LineItemPOlist.size());
        System.out.println("LineItemPOlist delivery text " + LineItemPOlist.get(0).getDeliveryText());
        String prItemNumber = jsonarray.getJSONObject(0).optString("prItemNumber");
        String prType = jsonarray.getJSONObject(0).optString("prType");
        String isFOCEnabled = jsonarray.getJSONObject(0).optString("isFOCEnabled");
        NGBPCmplxPOCreationLineItemPO lineItemPO = parseDataPRLineSub(request.getParameter("formdata"), LineItemPOlist.get(0), prItemNumber, poCurrency, localCurrency, prType, isFOCEnabled);
        System.out.println("Inside Ajax ::: " + lineItemPO.toString());
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savePrSub.do?poid=" + jsonarray.getJSONObject(0).optString("poid")), lineItemPO, String.class);

        return "";
    }

    NGBPCmplxPOCreationLineItemPO parseDataPRLineSub(String jsonString, NGBPCmplxPOCreationLineItemPO lineItemObj, String prItemNumber, String poCurrency, String localCurrency, String prType, String isFOCEnabled) {

        JSONArray jsonarray = new JSONArray(jsonString);
        System.out.println("jsonarray len: " + jsonarray.length());
        JSONObject json = jsonarray.getJSONObject(0);
        System.out.println("prItemNumber in parseDataPRLineSub :" + prItemNumber);

        System.out.println("prType in parseDataPRLineSub :" + prType);
        System.out.println("isFOCEnabled in parseDataPRLineSub :" + isFOCEnabled);
        //QuantitiesWeights=============================================================================
        NGBPCmplxPOCreationQuantitiesWeights pOCreationQuanWeight = new NGBPCmplxPOCreationQuantitiesWeights();
        json = jsonarray.getJSONObject(1);
        if (!"".equals(json.optString("pOQuantity"))) {
            pOCreationQuanWeight.setPoQuantity(new BigDecimal(json.optString("pOQuantity")));
        } else {
            pOCreationQuanWeight.setPoQuantity(new BigDecimal(0.00));
        }
        if (!"".equals(json.optString("pOUnit"))) {
            pOCreationQuanWeight.setPoQuantityUnit(json.optString("pOUnit"));
        } else {
            pOCreationQuanWeight.setPoQuantityUnit("");
        }
        if (!"".equals(json.optString("pOQuantitySKU"))) {
            pOCreationQuanWeight.setPoQuantitySKU(new BigDecimal(json.optString("pOQuantitySKU")));
        } else {
            pOCreationQuanWeight.setPoQuantitySKU(new BigDecimal(0.0));
        }
        if (!"".equals(json.optString("pOUnitSKU"))) {
            pOCreationQuanWeight.setPoQuantitySKUUnit(json.optString("pOUnitSKU"));
        } else {
            pOCreationQuanWeight.setPoQuantitySKUUnit("");
        }
        if (!"".equals(json.optString("orderUnit"))) {
            pOCreationQuanWeight.setOrder1(json.optString("orderUnit"));
        } else {
            pOCreationQuanWeight.setOrder1("");
        }
        if (!"".equals(json.optString("unitOrderUnit"))) {
            pOCreationQuanWeight.setOrderUnit1(json.optString("unitOrderUnit"));
        } else {
            pOCreationQuanWeight.setOrderUnit1("");
        }
        if (!"".equals(json.optString("orderPriceUnit"))) {
            pOCreationQuanWeight.setOrderPrice(json.optString("orderPriceUnit"));
        } else {
            pOCreationQuanWeight.setOrderPrice("");
        }
        if (!"".equals(json.optString("unitOrderPriceUnit"))) {
            pOCreationQuanWeight.setOrderPriceUnit(json.optString("unitOrderPriceUnit"));
        } else {
            pOCreationQuanWeight.setOrderPriceUnit("");
        }
        if (!"".equals(json.optString("orderUnit2"))) {
            pOCreationQuanWeight.setOrder2(json.optString("orderUnit2"));
        } else {
            pOCreationQuanWeight.setOrder2("");
        }
        System.out.println("unitOrderUnit2 :" + json.optString("unitOrderUnit2"));
        if (!"".equals(json.optString("unitOrderUnit2"))) {
            pOCreationQuanWeight.setOrderUnit2(json.optString("unitOrderUnit2"));
        } else {
            pOCreationQuanWeight.setOrderUnit2("");
        }
        if (!"".equals(json.optString("sku"))) {
            pOCreationQuanWeight.setSku(json.optString("sku"));
        } else {
            pOCreationQuanWeight.setSku("");
        }
        if (!"".equals(json.optString("sKUUnit"))) {
            pOCreationQuanWeight.setSkuUnit(json.optString("sKUUnit"));
        } else {
            pOCreationQuanWeight.setSkuUnit("");
        }

        pOCreationQuanWeight.setLinkID(json.optString("linkid"));
        pOCreationQuanWeight.setPrItemNumber(prItemNumber);

        if (!"".equals(json.optString("netWeight"))) {
            pOCreationQuanWeight.setNetweight(new BigDecimal(json.optString("netWeight")));
        } else {
            pOCreationQuanWeight.setNetweight(new BigDecimal(0.00));
        }
        if (!"".equals(json.optString("grossWeight"))) {
            pOCreationQuanWeight.setGrossweight(new BigDecimal(json.optString("grossWeight")));
        } else {
            pOCreationQuanWeight.setGrossweight(new BigDecimal(0.00));
        }
        if (!"".equals(json.optString("volume"))) {
            pOCreationQuanWeight.setVolume(new BigDecimal(json.optString("volume")));
        } else {
            pOCreationQuanWeight.setVolume(new BigDecimal(0.00));
        }
        if (!"".equals(json.optString("points"))) {
            pOCreationQuanWeight.setPoints(new BigDecimal(json.optString("points")));
        } else {
            pOCreationQuanWeight.setPoints(new BigDecimal(0.00));
        }

        if (!"".equals(json.optString("netWeight2"))) {
            pOCreationQuanWeight.setNetweight2(new BigDecimal(json.optString("netWeight2")));
        } else {
            pOCreationQuanWeight.setNetweight2(new BigDecimal(0.00));
        }
        if (!"".equals(json.optString("grossWeight2"))) {
            pOCreationQuanWeight.setGrossweight2(new BigDecimal(json.optString("grossWeight2")));
        } else {
            pOCreationQuanWeight.setGrossweight2(new BigDecimal(0.00));
        }
        if (!"".equals(json.optString("volume2"))) {
            pOCreationQuanWeight.setVolume2(new BigDecimal(json.optString("volume2")));
        } else {
            pOCreationQuanWeight.setVolume2(new BigDecimal(0.00));
        }

        System.out.println("volume2 :::" + json.optString("volume2"));

        if (!"".equals(json.optString("points2")) && !"0.00".equals(json.optString("points2")) && !"0".equals(json.optString("points2"))) {
            pOCreationQuanWeight.setPoints2(new BigDecimal(json.optString("point2")));
        } else {
            pOCreationQuanWeight.setPoints2(new BigDecimal(0.00));
        }

        if (!"".equals(json.optString("netWeightUnit"))) {
            pOCreationQuanWeight.setNetWeightUnit(json.optString("netWeightUnit"));
        } else {
            pOCreationQuanWeight.setNetWeightUnit("");
        }
        if (!"".equals(json.optString("grossWeightUnit"))) {
            pOCreationQuanWeight.setGrossWeightUnit(json.optString("grossWeightUnit"));
        } else {
            pOCreationQuanWeight.setGrossWeightUnit("");
        }
        if (!"".equals(json.optString("volumeUnit"))) {
            pOCreationQuanWeight.setVolumeUnit(json.optString("volumeUnit"));
        } else {
            pOCreationQuanWeight.setVolumeUnit("");
        }
        if (!"".equals(json.optString("poinstUnit"))) {
            pOCreationQuanWeight.setPointsUnit(json.optString("poinstUnit"));
        } else {
            pOCreationQuanWeight.setPointsUnit("");
        }

        if (!"".equals(json.optString("netWeightOrderUnit"))) {
            pOCreationQuanWeight.setNetWeightOrderUnit(json.optString("netWeightOrderUnit"));
        } else {
            pOCreationQuanWeight.setNetWeightOrderUnit("");
        }
        if (!"".equals(json.optString("grossWeightOrderUnit"))) {
            pOCreationQuanWeight.setGrossWeightOrderUnit(json.optString("grossWeightOrderUnit"));
        } else {
            pOCreationQuanWeight.setGrossWeightOrderUnit("");
        }
        if (!"".equals(json.optString("volumeOrderUnit"))) {
            pOCreationQuanWeight.setVolumeOrderUnit(json.optString("volumeOrderUnit"));
        } else {
            pOCreationQuanWeight.setVolumeOrderUnit("");
        }
        if (!"".equals(json.optString("pointsOrderUnit"))) {
            pOCreationQuanWeight.setPointsOrderUnit(json.optString("pointsOrderUnit"));
        } else {
            pOCreationQuanWeight.setPointsOrderUnit("");
        }

        if (!"".equals(json.optString("netWeightUnit2"))) {
            pOCreationQuanWeight.setNetWeightUnit2(json.optString("netWeightUnit2"));
        } else {
            pOCreationQuanWeight.setNetWeightUnit2("");
        }
        if (!"".equals(json.optString("grossWeightUnit2"))) {
            pOCreationQuanWeight.setGrossWeightUnit2(json.optString("grossWeightUnit2"));
        } else {
            pOCreationQuanWeight.setGrossWeightUnit2("");
        }
        if (!"".equals(json.optString("volumeUnit2"))) {
            pOCreationQuanWeight.setVolumeUnit2(json.optString("volumeUnit2"));
        } else {
            pOCreationQuanWeight.setVolumeUnit2("");
        }
        if (!"".equals(json.optString("pointsUnit2"))) {
            pOCreationQuanWeight.setPointsUnit2(json.optString("pointsUnit2"));
        } else {
            pOCreationQuanWeight.setPointsUnit2("");
        }
        if (!"".equals(json.optString("netWeightPerUnit"))) {
            pOCreationQuanWeight.setNetWeightPerPrice(json.optString("netWeightPerUnit"));
        } else {
            pOCreationQuanWeight.setNetWeightPerPrice("");
        }
        if (!"".equals(json.optString("grossWeightPerUnit"))) {
            pOCreationQuanWeight.setGrossWeightPerPrice(json.optString("grossWeightPerUnit"));
        } else {
            pOCreationQuanWeight.setGrossWeightPerPrice("");
        }
        if (!"".equals(json.optString("volumePerUnit"))) {
            pOCreationQuanWeight.setVolumePerPrice(json.optString("volumePerUnit"));
        } else {
            pOCreationQuanWeight.setVolumePerPrice("");
        }
        if (!"".equals(json.optString("pointsPerUnit"))) {
            pOCreationQuanWeight.setPointsPerPrice(json.optString("pointsPerUnit"));
        } else {
            pOCreationQuanWeight.setPointsPerPrice("");
        }

        lineItemObj.setQuanWeight(pOCreationQuanWeight);

        //Delivery===========================================================================
        json = jsonarray.getJSONObject(3);
        NGBPCmplxPOCreationDelivery pOCreationDel = new NGBPCmplxPOCreationDelivery();

        if (!"".equals(json.optString("OverdeliveryTolerance"))) {
            pOCreationDel.setOverDelTol(new BigDecimal(json.optString("OverdeliveryTolerance")));
        } else {
            pOCreationDel.setOverDelTol(new BigDecimal(0.0));
        }
        if (!"".equals(json.optString("UnderdeliveryTolerance"))) {
            pOCreationDel.setUnderDelTol(new BigDecimal(json.optString("UnderdeliveryTolerance")));
        } else {
            pOCreationDel.setOverDelTol(new BigDecimal(0.0));
        }
        if (!"".equals(json.optString("ShippingInstruction"))) {
            pOCreationDel.setShippingInstructions(json.optString("ShippingInstruction"));
        } else {
            pOCreationDel.setShippingInstructions("");
        }
        if (!"".equals(json.optString("StockType"))) {
            pOCreationDel.setStockType(json.optString("StockType"));
        } else {
            pOCreationDel.setStockType("");
        }
        if (!"".equals(json.optString("ValuationType"))) {
            pOCreationDel.setValuationType(json.optString("ValuationType"));
        } else {
            pOCreationDel.setValuationType("");
        }

        if (!"".equals(json.optString("RemShelfLife"))) {
            pOCreationDel.setRemShelfLife(json.optString("RemShelfLife"));
        } else {
            pOCreationDel.setRemShelfLife("");
        }
        if (!"".equals(json.optString("QAControlLife"))) {
            pOCreationDel.setQaControlLife(json.optString("QAControlLife"));
        } else {
            pOCreationDel.setQaControlLife("");
        }
        if (!"".equals(json.optString("GRProcTime"))) {
            pOCreationDel.setGrProcTime(json.optString("GRProcTime"));
        } else {
            pOCreationDel.setGrProcTime("");
        }
        if (!"".equals(json.optString("FirstReminderExpediter"))) {
            pOCreationDel.setFstRemExped(json.optString("FirstReminderExpediter"));
        } else {
            pOCreationDel.setFstRemExped("");
        }
        if (!"".equals(json.optString("SecondReminderExpediter"))) {
            pOCreationDel.setSecRemExped(json.optString("SecondReminderExpediter"));
        } else {
            pOCreationDel.setSecRemExped("");
        }
        if (!"".equals(json.optString("ThirdReminderExpediter"))) {
            pOCreationDel.setThrdRemExped(json.optString("ThirdReminderExpediter"));
        } else {
            pOCreationDel.setThrdRemExped("");
        }
        if (!"".equals(json.optString("NoExpend"))) {
            pOCreationDel.setNoExpend(json.optString("NoExpend"));
        } else {
            pOCreationDel.setNoExpend("");
        }
        if (!"".equals(json.optString("PlDeliveryTime"))) {
            pOCreationDel.setPlDelTime(json.optString("PlDeliveryTime"));
        } else {
            pOCreationDel.setPlDelTime("");
        }
        if (!"".equals(json.optString("incoTermsPart2Delivery"))) {
            pOCreationDel.setIncoTerms2(json.optString("incoTermsPart2Delivery"));
        } else {
            pOCreationDel.setIncoTerms2("");
        }
        if (!"".equals(json.optString("incoTermsPart1Delivery"))) {
            pOCreationDel.setIncoTerms1(json.optString("incoTermsPart1Delivery"));
        } else {
            pOCreationDel.setIncoTerms1("");
        }
        pOCreationDel.setPrItemNumber(prItemNumber);
        pOCreationDel.setLinkID(json.optString("linkid"));
        lineItemObj.setInvDel(pOCreationDel);

        //Texts=======================================================================
        json = jsonarray.getJSONObject(4);
        NGBPCmplxPOCreationTexts pOCreationText = new NGBPCmplxPOCreationTexts();

        if (!"".equals(json.optString("ItemText"))) {
            pOCreationText.setItemText(json.optString("ItemText"));
        } else {
            pOCreationText.setItemText("");
        }
        if (!"".equals(json.optString("InfoRecordPOText"))) {
            pOCreationText.setInfoRecordPOText(json.optString("InfoRecordPOText"));
        } else {
            pOCreationText.setInfoRecordPOText("");
        }
        if (!"".equals(json.optString("MaterialPOText"))) {
            pOCreationText.setMaterialPOText(json.optString("MaterialPOText"));
        } else {
            pOCreationText.setMaterialPOText("");
        }
        if (!"".equals(json.optString("PONoteToApprover"))) {
            pOCreationText.setPONoteToApprover(json.optString("PONoteToApprover"));
        } else {
            pOCreationText.setPONoteToApprover("");
        }
        if (!"".equals(json.optString("DeliveryText"))) {
            pOCreationText.setDeliveryText(json.optString("DeliveryText"));
        } else {
            pOCreationText.setDeliveryText("");
        }
        if (!"".equals(json.optString("pRNoteToApproval"))) {
            pOCreationText.setpRNoteToApproval(json.optString("pRNoteToApproval"));
        } else {
            pOCreationText.setpRNoteToApproval("");
        }

        pOCreationText.setPrItemNumber(prItemNumber);
        pOCreationText.setLinkID(json.optString("linkid"));
        lineItemObj.setpOCreationText(pOCreationText);

        //Del Address================================================================================
        json = jsonarray.getJSONObject(5);
        NGBPCmplxPOCreationDeliveryAddress invDel = new NGBPCmplxPOCreationDeliveryAddress();

        if (!"".equals(json.optString("Title"))) {
            invDel.setTitle(json.optString("Title"));
        } else {
            invDel.setTitle("");
        }
        if (!"".equals(json.optString("Name1"))) {
            invDel.setName1(json.optString("Name1"));
        } else {
            invDel.setName1("");
        }
        if (!"".equals(json.optString("Name2"))) {
            invDel.setName2(json.optString("Name2"));
        } else {
            invDel.setName2("");
        }
        if (!"".equals(json.optString("Street"))) {
            invDel.setStreet(json.optString("Street"));
        } else {
            invDel.setStreet("");
        }
        if (!"".equals(json.optString("HouseNumber"))) {
            invDel.setHouseNo(json.optString("HouseNumber"));
        } else {
            invDel.setHouseNo("");
        }
        if (!"".equals(json.optString("PostalCode"))) {
            invDel.setPostalCode(json.optString("PostalCode"));
        } else {
            invDel.setPostalCode("");
        }
        if (!"".equals(json.optString("City"))) {
            invDel.setCity(json.optString("City"));
        } else {
            invDel.setCity("");
        }
        if (!"".equals(json.optString("countryLimits"))) {
            invDel.setCountry(json.optString("countryLimits"));
        } else {
            invDel.setCountry("");
        }
        invDel.setPrItemNumber(prItemNumber);
        invDel.setLinkID(json.optString("linkid"));
        lineItemObj.setpOCreationDel(invDel);

        //Confirmation==================================================================
        json = jsonarray.getJSONObject(6);
        NGBPCmplxPOCreationConfirmations invCon = new NGBPCmplxPOCreationConfirmations();
        if (!"".equals(json.optString("confControlLimits"))) {
            invCon.setConfControl(json.optString("confControlLimits"));
        } else {
            invCon.setConfControl("");
        }
        if (!"".equals(json.optString("OrderAck"))) {
            invCon.setOrderAck(json.optString("OrderAck"));
        } else {
            invCon.setOrderAck("");
        }
        if (!"".equals(json.optString("ConfirmationRequired"))) {
            invCon.setConfirmnReq(json.optString("ConfirmationRequired"));
        } else {
            invCon.setConfirmnReq("");
        }
        if (!"".equals(json.optString("RejectionInd"))) {
            invCon.setRejectInd(json.optString("RejectionInd"));
        } else {
            invCon.setRejectInd("");
        }
        invCon.setPrItemNumber(prItemNumber);
        invCon.setLinkID(json.optString("linkid"));
        lineItemObj.setpOCreationcon(invCon);

        //ConditionControl=============================================================
        json = jsonarray.getJSONObject(7);
        NGBPCmplxPOCreationConditionControl invCond = new NGBPCmplxPOCreationConditionControl();

        if (!"".equals(json.optString("PrintPrice"))) {
            invCond.setPrintPrice(json.optString("PrintPrice"));
        } else {
            invCond.setPrintPrice("");
        }
        if (!"".equals(json.optString("EstimatedPrice"))) {
            invCond.setEstimatedPrice(json.optString("EstimatedPrice"));
        } else {
            invCond.setEstimatedPrice("");
        }

        invCond.setPrItemNumber(prItemNumber);
        invCond.setLinkID(json.optString("linkid"));
        lineItemObj.setpOCreationcond(invCond);

        //CustomerData=====================================
//        json = jsonarray.getJSONObject(8);
//        NGBPCmplxPOCreationLineItemCustomerData invCusData = new NGBPCmplxPOCreationLineItemCustomerData();
//        invCusData.setProductOrigin(json.optString("ProductOriginLine"));
//        invCusData.setSegment(json.optString("SegmentDescriptionLine"));
//        lineItemObj.setpOCreationCustomerData(invCusData);
        //Header Text===================================================================================
//        json = jsonarray.getJSONObject(9);
//        NGBPCmplxPOCreationHeaderText invHeadertext = new NGBPCmplxPOCreationHeaderText();
//        if (!"".equals(json.optString("pONotetoApproverHeaderTextsLimits"))) {
//            invHeadertext.setPONoteToApprover(json.optString("pONotetoApproverHeaderTextsLimits"));
//        } else {
//            invHeadertext.setPONoteToApprover("");
//        }
//        if (!"".equals(json.optString("HeaderNote"))) {
//            invHeadertext.setHeaderNote(json.optString("HeaderNote"));
//        } else {
//            invHeadertext.setHeaderNote("");
//        }
//        if (!"".equals(json.optString("PricingTypes"))) {
//            invHeadertext.setPricingTypes(json.optString("PricingTypes"));
//        } else {
//            invHeadertext.setPricingTypes("");
//        }
//        if (!"".equals(json.optString("Deadlines"))) {
//            invHeadertext.setDeadlines(json.optString("Deadlines"));
//        } else {
//            invHeadertext.setDeadlines("");
//        }
//        if (!"".equals(json.optString("TermsofDelivery"))) {
//            invHeadertext.setTermsOfDelivery(json.optString("TermsofDelivery"));
//        } else {
//            invHeadertext.setTermsOfDelivery("");
//        }
//        if (!"".equals(json.optString("TermsofPayment"))) {
//            invHeadertext.setTermsOfPayment(json.optString("TermsofPayment"));
//        } else {
//            invHeadertext.setTermsOfPayment("");
//        }
//        if (!"".equals(json.optString("ShippingInstructions"))) {
//            invHeadertext.setShippingInstructions(json.optString("ShippingInstructions"));
//        } else {
//            invHeadertext.setShippingInstructions("");
//        }
//        if (!"".equals(json.optString("VendorMemoGeneral"))) {
//            invHeadertext.setVendorMemoGeneral(json.optString("VendorMemoGeneral"));
//        } else {
//            invHeadertext.setVendorMemoGeneral("");
//        }
//        if (!"".equals(json.optString("VendorMemoSpecial"))) {
//            invHeadertext.setVendorMemoSpecial(json.optString("VendorMemoSpecial"));
//        } else {
//            invHeadertext.setVendorMemoSpecial("");
//        }
//
//        invHeadertext.setLinkID(json.optString("linkid"));
//        lineItemObj.setpOCreationHeaderText(invHeadertext);
        //Invoice========================================================================
        json = jsonarray.getJSONObject(9);
        NGBPCmplxPOCreationInvoice invInvoice = new NGBPCmplxPOCreationInvoice();
        List<NGBPCmplxPOCreationInvoice> invoiceList = getInvoiceByLinkId(json.optString("linkid"));
        if (!invoiceList.isEmpty()) {
            NGBPCmplxPOCreationInvoice invoiceObj = invoiceList.get(0);
            invoiceObj.setLinkID("");
            updateNGBPCmplxPOCreationInvoice(invoiceObj);
        }
        if (!"".equals(json.optString("InvoiceReceipt"))) {
            invInvoice.setInvoiceReceipt(json.optString("InvoiceReceipt"));
        } else {
            invInvoice.setInvoiceReceipt("");
        }
        if (!"".equals(json.optString("FinalInvoice"))) {
            invInvoice.setFinalInvoice(json.optString("FinalInvoice"));
        } else {
            invInvoice.setFinalInvoice("");
        }
        if (!"".equals(json.optString("GRBasedIV"))) {
            invInvoice.setGrBasedIV(json.optString("GRBasedIV"));
        } else {
            invInvoice.setGrBasedIV("");
        }
        if (!"".equals(json.optString("DPCategory"))) {
            invInvoice.setDPCategory(json.optString("DPCategory"));
        } else {
            invInvoice.setDPCategory("");
        }
        if (!"".equals(json.optString("TaxCode"))) {
            invInvoice.setTaxCode(json.optString("TaxCode"));
        } else {
            invInvoice.setTaxCode("");
        }
        if (!"".equals(json.optString("taxCodeDesc"))) {
            invInvoice.setDescription(json.optString("taxCodeDesc"));
        } else {
            invInvoice.setDescription("");
        }
        if (!"".equals(json.optString("serviceBasedIV"))) {
            invInvoice.setServiceBasedIV(json.optString("serviceBasedIV"));
        } else {
            invInvoice.setServiceBasedIV("");
        }

        invInvoice.setPrItemNumber(prItemNumber);
        invInvoice.setLinkID(json.optString("linkid"));
        lineItemObj.setpOCreationInvoice(invInvoice);

        //Account Assignment==================================================================================   
        json = jsonarray.getJSONObject(10);
        JSONArray accAsgnTableData = json.getJSONArray("accAsgnTableData");

        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accountAssignmentList = new ArrayList<>();
        NGBPCmplxPOCreationLineItemPOAccountAssignment accountAssignment;

        System.out.println("accAsgnTableData.length() Bittu:" + accAsgnTableData.length());
        if (accAsgnTableData.length() != 0) {
            String linkId = accAsgnTableData.getJSONObject(0).optString("linkid");
            System.out.println("linkId in service bittu:" + linkId);
            List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accountAsgnList = getAccountAssignmentByLinkId(linkId);
            int size = accountAsgnList.size();
            System.out.println("accountAsgnList size :" + size);
            if (!accountAsgnList.isEmpty()) {
                for (NGBPCmplxPOCreationLineItemPOAccountAssignment assignment : accountAsgnList) {
                    assignment.setLinkID("");
                    updateNGBPCmplxPOCreationLineItemPOAccountAssignment(assignment);
                }
            }
            for (int i = 0; i < accAsgnTableData.length(); i++) {
                accountAssignment = new NGBPCmplxPOCreationLineItemPOAccountAssignment();
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnQuantity"))) {
                    accountAssignment.setQuantity(new BigDecimal(accAsgnTableData.getJSONObject(i).optString("accAsgnQuantity")));
                } else {
                    accountAssignment.setQuantity(new BigDecimal(0.0));
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnPercentage"))) {
                    accountAssignment.setPercentage(new BigDecimal(accAsgnTableData.getJSONObject(i).optString("accAsgnPercentage")));
                } else {
                    accountAssignment.setPercentage(new BigDecimal(0.0));
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnGLAccount"))) {
                    accountAssignment.setGlAccount(accAsgnTableData.getJSONObject(i).optString("accAsgnGLAccount"));
                } else {
                    accountAssignment.setGlAccount("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnCOArea"))) {
                    accountAssignment.setCoArea(accAsgnTableData.getJSONObject(i).optString("accAsgnCOArea"));
                } else {
                    accountAssignment.setCoArea("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnCostCetner"))) {
                    accountAssignment.setCostCenter(accAsgnTableData.getJSONObject(i).optString("accAsgnCostCetner"));
                } else {
                    accountAssignment.setCostCenter("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnFund"))) {
                    accountAssignment.setFund(accAsgnTableData.getJSONObject(i).optString("accAsgnFund"));
                } else {
                    accountAssignment.setFund("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnFunctionalArea"))) {
                    accountAssignment.setFunctionalArea(accAsgnTableData.getJSONObject(i).optString("accAsgnFunctionalArea"));
                } else {
                    accountAssignment.setFunctionalArea("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnFundCenter"))) {
                    accountAssignment.setFundsCentre(accAsgnTableData.getJSONObject(i).optString("accAsgnFundCenter"));
                } else {
                    accountAssignment.setFundsCentre("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnCommitmentItem"))) {
                    accountAssignment.setCommitmentItem(accAsgnTableData.getJSONObject(i).optString("accAsgnCommitmentItem"));
                } else {
                    accountAssignment.setCommitmentItem("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnUnloadingPoint"))) {
                    accountAssignment.setUnloadingPoint(accAsgnTableData.getJSONObject(i).optString("accAsgnUnloadingPoint"));
                } else {
                    accountAssignment.setUnloadingPoint("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnRecipients"))) {
                    accountAssignment.setRecipient(accAsgnTableData.getJSONObject(i).optString("accAsgnRecipients"));
                } else {
                    accountAssignment.setRecipient("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnOrder"))) {
                    accountAssignment.setAccOrder(accAsgnTableData.getJSONObject(i).optString("accAsgnOrder"));
                } else {
                    accountAssignment.setAccOrder("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnAssets"))) {
                    accountAssignment.setAsset(accAsgnTableData.getJSONObject(i).optString("accAsgnAssets"));
                } else {
                    accountAssignment.setAsset("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnWBSElement"))) {
                    accountAssignment.setWbsElement(accAsgnTableData.getJSONObject(i).optString("accAsgnWBSElement"));
                } else {
                    accountAssignment.setWbsElement("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnSalesOrder"))) {
                    accountAssignment.setSalesOrder(accAsgnTableData.getJSONObject(i).optString("accAsgnSalesOrder"));
                } else {
                    accountAssignment.setSalesOrder("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnNetActNumber"))) {
                    accountAssignment.setNetwork(accAsgnTableData.getJSONObject(i).optString("accAsgnNetActNumber"));
                } else {
                    accountAssignment.setNetwork("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnItemNumber"))) {
                    accountAssignment.setItemNumber(accAsgnTableData.getJSONObject(i).optString("accAsgnItemNumber"));
                } else {
                    accountAssignment.setItemNumber("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnDeliverySchedule"))) {
                    accountAssignment.setDeliverySchedule(accAsgnTableData.getJSONObject(i).optString("accAsgnDeliverySchedule"));
                } else {
                    accountAssignment.setDeliverySchedule("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("distribution"))) {
                    accountAssignment.setDistribution(accAsgnTableData.getJSONObject(i).optString("distribution"));
                } else {
                    accountAssignment.setDistribution("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accountAssignment"))) {
                    accountAssignment.setAccountAssignmentCategory(accAsgnTableData.getJSONObject(i).optString("accountAssignment"));
                } else {
                    accountAssignment.setAccountAssignmentCategory("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("coCode"))) {
                    accountAssignment.setCoCode(accAsgnTableData.getJSONObject(i).optString("coCode"));
                } else {
                    accountAssignment.setCoCode("");
                }
                if (!"".equals(accAsgnTableData.getJSONObject(i).optString("accAsgnSerialNo"))) {
                    accountAssignment.setSerialNumber(accAsgnTableData.getJSONObject(i).optString("accAsgnSerialNo"));
                } else {
                    accountAssignment.setSerialNumber("");
                }
                accountAssignment.setLinkID(accAsgnTableData.getJSONObject(i).optString("linkid"));
                accountAssignment.setPrItemNumber(prItemNumber);
                accountAssignmentList.add(accountAssignment);
            }
            lineItemObj.setLineItemAccountAssignment(accountAssignmentList);
        } else {
            lineItemObj.setLineItemAccountAssignment(accountAssignmentList);
        }

        //Service========================================================================================
        if ("Service".equals(prType)) {

            json = jsonarray.getJSONObject(11);
            JSONArray serviceTableData = json.getJSONArray("serviceTableData");
            List<NGBPCmplxPOCreationLineItemService> invServicesList = new ArrayList<>();
            NGBPCmplxPOCreationLineItemService invServices;
            String linkid = serviceTableData.getJSONObject(0).optString("linkid");
            List<NGBPCmplxPOCreationLineItemService> serviceList = getServicesByLinkId(linkid);

            System.out.println("serviceList size :" + serviceList.size());
            if (!serviceList.isEmpty()) {
                for (int i = 0; i < serviceList.size(); i++) {
                    NGBPCmplxPOCreationLineItemService serviceObj = serviceList.get(i);
                    serviceObj.setLinkId("");
                    updateNGBPCmplxPOCreationLineItemService(serviceObj);
                }
            }
            for (int i = 0; i < serviceTableData.length(); i++) {
                invServices = new NGBPCmplxPOCreationLineItemService();
                if (!"".equals(serviceTableData.getJSONObject(i).optString("lineItemNumberServices"))) {
                    invServices.setLineItemNumber(serviceTableData.getJSONObject(i).optString("lineItemNumberServices"));
                } else {
                    invServices.setLineItemNumber("");
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("serviceNumber"))) {
                    invServices.setServiceNumber(serviceTableData.getJSONObject(i).optString("serviceNumber"));
                } else {
                    invServices.setServiceNumber("");
                }
//                if (!"".equals(serviceTableData.getJSONObject(i).optString("shortText"))) {
//                    invServices.setShortText(serviceTableData.getJSONObject(i).optString("shortText"));
//                } else {
//                    invServices.setShortText("");
//                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("quantity"))) {
                    invServices.setQuantity(new BigDecimal(serviceTableData.getJSONObject(i).optString("quantity")));
                } else {
                    invServices.setQuantity(new BigDecimal(0.0));
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("unit"))) {
                    invServices.setUnit(serviceTableData.getJSONObject(i).optString("unit"));
                } else {
                    invServices.setUnit("");
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("grossPrice"))) {
                    invServices.setGrossPrice(new BigDecimal(serviceTableData.getJSONObject(i).optString("grossPrice")));
                } else {
                    invServices.setGrossPrice(new BigDecimal(0.0));
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("currency"))) {
                    invServices.setCurrency(serviceTableData.getJSONObject(i).optString("currency"));
                } else {
                    invServices.setCurrency("");
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("netPrice"))) {
                    invServices.setNetPrice(new BigDecimal(serviceTableData.getJSONObject(i).optString("netPrice")));
                } else {
                    invServices.setNetPrice(new BigDecimal(0.0));
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("edition"))) {
                    invServices.setEdition(serviceTableData.getJSONObject(i).optString("edition"));
                } else {
                    invServices.setEdition("");
                }
//                if (!"".equals(serviceTableData.getJSONObject(i).optString("lineItemLongText"))) {
//                    invServices.setLineItemLongText(serviceTableData.getJSONObject(i).optString("lineItemLongText"));
//                } else {
//                    invServices.setLineItemLongText("");
//                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("overfTollerance"))) {
                    invServices.setOverfTolerance(serviceTableData.getJSONObject(i).optString("overfTollerance"));
                } else {
                    invServices.setOverfTolerance("");
                }

                invServices.setLinkId(serviceTableData.getJSONObject(i).optString("linkid"));
                invServices.setPrItemNumber(prItemNumber);

                if (!"".equals(serviceTableData.getJSONObject(i).optString("ServiceAccAssDist"))) {
                    invServices.setDistribution(serviceTableData.getJSONObject(i).optString("ServiceAccAssDist"));
                } else {
                    invServices.setDistribution("");
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("isAccountAssignmentSaved"))) {
                    invServices.setIsAccountAssignmentSaved(serviceTableData.getJSONObject(i).optString("isAccountAssignmentSaved"));
                } else {
                    invServices.setIsAccountAssignmentSaved("");
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("isProfitabilitySegmentSaved"))) {
                    invServices.setIsProfitabilitySegmentSaved(serviceTableData.getJSONObject(i).optString("isProfitabilitySegmentSaved"));
                } else {
                    invServices.setIsProfitabilitySegmentSaved("");
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("serviceNetValue"))) {
                    invServices.setNetValue(new BigDecimal(serviceTableData.getJSONObject(i).optString("serviceNetValue")));
                } else {
                    invServices.setNetValue(new BigDecimal(0.0));
                }
                if (!"".equals(serviceTableData.getJSONObject(i).optString("serviceActualQty"))) {
                    invServices.setActualQuantity(new BigDecimal(serviceTableData.getJSONObject(i).optString("serviceActualQty")));
                } else {
                    invServices.setActualQuantity(new BigDecimal(0.0));
                }
//                if (!"".equals(serviceTableData.getJSONObject(i).optString("serviceText"))) {
//                    invServices.setServiceText(serviceTableData.getJSONObject(i).optString("serviceText"));
//                } else {
//                    invServices.setServiceText("");
//                }
                
                String serviceId = serviceTableData.getJSONObject(i).optString("serviceId");
                System.out.println("serviceId: " + serviceId);
                if(serviceId != null && !serviceId.equals("")) {
                    ServicesLongTexts serviceObj = purchaseOrderWSUtil.getServicesLongTextsById(Integer.parseInt(serviceId));                    
                    invServices.setServicesLongTextId(serviceId);
                    invServices.setShortText(serviceObj.getShortText());
                    invServices.setLineItemLongText(serviceObj.getLineItemLongText());
                    invServices.setServiceText(serviceObj.getServiceText());
                } else {
                    invServices.setServicesLongTextId("");
                    invServices.setShortText("");
                    invServices.setLineItemLongText("");
                    invServices.setServiceText("");
                }
                invServicesList.add(invServices);
            }
            lineItemObj.setLineItemServices(invServicesList);

            // Limits===========================
            json = jsonarray.getJSONObject(12);

            NGBPCmplxPOCreationLimits limits = new NGBPCmplxPOCreationLimits();

            if (!"".equals(json.optString("OverallLimit"))) {
                limits.setOverallLimit(json.optString("OverallLimit"));
            } else {
                limits.setOverallLimit("");
            }
            if (!"".equals(json.optString("ExpectedValue"))) {
                limits.setExpectedValue(json.optString("ExpectedValue"));
            } else {
                limits.setExpectedValue("");
            }
            if (!"".equals(json.optString("NoLimit"))) {
                limits.setNoLimit(json.optString("NoLimit"));
            } else {
                limits.setNoLimit("");
            }
            if (!"".equals(json.optString("ActualValue"))) {
                limits.setActualVal(json.optString("ActualValue"));
            } else {
                limits.setActualVal("");
            }

            limits.setPrItemNumber(prItemNumber);
            limits.setLinkID(json.optString("linkid"));

            lineItemObj.setpOCreationLimits(limits);
        }
        //Material Tab ======================================
        json = jsonarray.getJSONObject(13);

        NGBPCmplxPOCreationLineItemMaterialTab material = new NGBPCmplxPOCreationLineItemMaterialTab();
        List<NGBPCmplxPOCreationLineItemMaterialTab> materialList = standalonePoWS.getNGBPCmplxPOCreationLineItemMaterialTabByLinkId(json.optString("linkid"));
        if (!materialList.isEmpty()) {
            NGBPCmplxPOCreationLineItemMaterialTab materialObj = materialList.get(0);
            materialObj.setLinkId("");
            standalonePoWS.updateNGBPCmplxPOCreationLineItemMaterialTab(materialObj);
        }
        if (!"".equals(json.optString("revisionLevel"))) {
            material.setRevisionLevel(json.optString("revisionLevel"));
        } else {
            material.setRevisionLevel("");
        }
        if (!"".equals(json.optString("vendMatNo"))) {
            material.setVendMatNo(json.optString("vendMatNo"));
        } else {
            material.setVendMatNo("");
        }
        if (!"".equals(json.optString("eanUpc"))) {
            material.setEanUpc(json.optString("eanUpc"));
        } else {
            material.setEanUpc("");
        }
        if (!"".equals(json.optString("vendorSubRange"))) {
            material.setVendorSubrange(json.optString("vendorSubRange"));
        } else {
            material.setVendorSubrange("");
        }
        if (!"".equals(json.optString("vendBatch"))) {
            material.setVendorBatch(json.optString("vendBatch"));
        } else {
            material.setVendorBatch("");
        }
        if (!"".equals(json.optString("batch"))) {
            material.setBatch(json.optString("batch"));
        } else {
            material.setBatch("");
        }
        if (!"".equals(json.optString("infoUpdate"))) {
            material.setInfoUpdate(json.optString("infoUpdate"));
        } else {
            material.setInfoUpdate("");
        }
        if (!"".equals(json.optString("stockTypeMaterial"))) {
            material.setStockType(json.optString("stockTypeMaterial"));
        } else {
            material.setStockType("");
        }
        if (!"".equals(json.optString("linkid"))) {
            material.setLinkId(json.optString("linkid"));
        } else {
            material.setLinkId("");
        }
        if (!"".equals(json.optString("mfrPartNo"))) {
            material.setMfrPartNumber(json.optString("mfrPartNo"));
        } else {
            material.setMfrPartNumber("");
        }
        if (!"".equals(json.optString("manufacturer"))) {
            material.setManufacturer(json.optString("manufacturer"));
        } else {
            material.setManufacturer("");
        }

        lineItemObj.setpOCreationMaterial(material);
//        standalonePoWS.saveNGBPCmplxPOCreationLineItemMaterialTab(material);
        //Conditions==================================================================
        if ("false".equals(isFOCEnabled)) {
            json = jsonarray.getJSONObject(14);
            JSONArray conditionTableData = json.getJSONArray("conditionTableData");
            String LinkiD = conditionTableData.getJSONObject(0).optString("linkid");
            List<NGBPCmplxPOCreationLineItemConditions> condList = getConditionByLinkId(LinkiD);

            System.out.println("condList size :" + condList.size());
            if (!condList.isEmpty()) {
                for (int i = 0; i < condList.size(); i++) {
                    NGBPCmplxPOCreationLineItemConditions condObj = condList.get(i);
                    condObj.setLinkID("");
                    purchaseOrderWSUtil.updateNGBPCmplxPOCreationLineItemConditions(condObj);
                }
            }

            System.out.println("Null Check 1: " + json.has("conditionTableData"));
            System.out.println("Null Check 2: " + json.isNull("conditionTableData"));
            if (json.has("conditionTableData")) {
//            JSONArray conditionTableData = json.getJSONArray("conditionTableData");

                List<NGBPCmplxPOCreationLineItemConditions> conditionList = new ArrayList<>();
                NGBPCmplxPOCreationLineItemConditions condition;
                for (int i = 0; i < conditionTableData.length(); i++) {
                    condition = new NGBPCmplxPOCreationLineItemConditions();

                    condition.setCondType(conditionTableData.getJSONObject(i).optString("conditionType"));
                    condition.setCondName(conditionTableData.getJSONObject(i).optString("Name"));
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("Amount"))) {
                        condition.setAmount(new BigDecimal(conditionTableData.getJSONObject(i).optString("Amount")));
                    } else {
                        condition.setAmount(new BigDecimal(0.0));
                    }
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("PerQuant"))) {
                        condition.setPerQuantity(new BigDecimal(conditionTableData.getJSONObject(i).optString("PerQuant")));
                    } else {
                        condition.setPerQuantity(new BigDecimal(0.0));
                    }
                    condition.setCondPricUnit(conditionTableData.getJSONObject(i).optString("ConditionPricingUnit"));
                    condition.setCurrency(conditionTableData.getJSONObject(i).optString("Currency"));
                    condition.setUoM(conditionTableData.getJSONObject(i).optString("uom"));
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("ConditionValue"))) {
                        condition.setCondVal(new BigDecimal(conditionTableData.getJSONObject(i).optString("ConditionValue")));
                    } else {
                        condition.setCondVal(new BigDecimal(0.0));
                    }
                    condition.setCurrency1(conditionTableData.getJSONObject(i).optString("Currency1"));
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("ConditionValue1"))) {
                        condition.setCondVal1(new BigDecimal(conditionTableData.getJSONObject(i).optString("ConditionValue1")));
                    } else {
                        condition.setCondVal1(new BigDecimal(0.0));
                    }
                    condition.setCondCrncy(conditionTableData.getJSONObject(i).optString("ConditionCurrency"));
                    condition.setCondDet(conditionTableData.getJSONObject(i).optString("ConditionDetails"));
                    condition.setVendorCode(conditionTableData.getJSONObject(i).optString("VondorCode"));
                    condition.setApplication(conditionTableData.getJSONObject(i).optString("Application"));
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("ConBaseValue"))) {
                        condition.setCondBaseVal(new BigDecimal(conditionTableData.getJSONObject(i).optString("ConBaseValue")));
                    } else {
                        condition.setCondBaseVal(new BigDecimal(0.0));
                    }
                    condition.setCondBaseRate(conditionTableData.getJSONObject(i).optString("ConBaseRate"));
                    condition.setAccruals(conditionTableData.getJSONObject(i).optString("Accurals"));
                    condition.setItemNumber(conditionTableData.getJSONObject(i).optString("ItemNumber"));
                    condition.setAccountKey(conditionTableData.getJSONObject(i).optString("AccountKey"));
                    condition.setStNumber(conditionTableData.getJSONObject(i).optString("stNumber"));
                    condition.setConditionCount(conditionTableData.getJSONObject(i).optString("condCount"));
                    condition.setKappl(conditionTableData.getJSONObject(i).optString("KAPPL"));
                    condition.setKvsl1(conditionTableData.getJSONObject(i).optString("KVSL1"));
                    condition.setKvsl2(conditionTableData.getJSONObject(i).optString("KVSL2"));
                    condition.setChangeId(conditionTableData.getJSONObject(i).optString("condChangeId"));
                    condition.setLinkID(conditionTableData.getJSONObject(i).optString("linkid"));
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("condStatus")) && !"NA".equals(conditionTableData.getJSONObject(i).optString("condStatus"))) {
                        condition.setNgStatus(conditionTableData.getJSONObject(i).optString("condStatus"));
                    } else {
                        condition.setNgStatus("");
                    }

                    System.out.println("numerator :" + conditionTableData.getJSONObject(i).optString("numerator"));
                    System.out.println("denoForConv :" + conditionTableData.getJSONObject(i).optString("denoForConv"));
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("numerator")) && !"NA".equals(conditionTableData.getJSONObject(i).optString("numerator"))) {
                        condition.setNumerator(Integer.parseInt(conditionTableData.getJSONObject(i).optString("numerator")));
                    } else {
                        condition.setNumerator(0);
                    }
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("baseUoM")) && !"NA".equals(conditionTableData.getJSONObject(i).optString("baseUoM"))) {
                        condition.setBaseUOM(conditionTableData.getJSONObject(i).optString("baseUoM"));
                    } else {
                        condition.setBaseUOM("");
                    }

                    if (!"".equals(conditionTableData.getJSONObject(i).optString("denoForConv")) && !"NA".equals(conditionTableData.getJSONObject(i).optString("denoForConv"))) {
                        condition.setDenominatorforconv(Integer.parseInt(conditionTableData.getJSONObject(i).optString("denoForConv")));
                    } else {
                        condition.setDenominatorforconv(0);
                    }
                    if (!"".equals(conditionTableData.getJSONObject(i).optString("uOMExtra")) && !"NA".equals(conditionTableData.getJSONObject(i).optString("uOMExtra"))) {
                        condition.setUomextra(conditionTableData.getJSONObject(i).optString("uOMExtra"));
                    } else {
                        condition.setUomextra("");
                    }
                    condition.setAddedFrom(conditionTableData.getJSONObject(i).optString("lineAddedFrom"));

                    condition.setPrItemNumber(prItemNumber);

                    // By nikhil on 14052020
                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    Date today = new Date();
                    String condPriceDate = df.format(today);
                    condition.setCondPriceDate(condPriceDate);

                    // Set Vendor Name
                    List<MasterVendor> vendorMasterList = purchaseOrderWSUtil.findMasterVendorByVendorCode(conditionTableData.getJSONObject(i).optString("VondorCode"));
                    if (!vendorMasterList.isEmpty()) {
                        MasterVendor vendorObj = vendorMasterList.get(0);
                        condition.setVendorName(vendorObj.getVendorName());
                    }
                // Ends

                    // Calculate CondCurncyExchangeRate Starts
                    String conditionCurrency = conditionTableData.getJSONObject(i).optString("Currency");
                    System.out.println("conditionCurrency::: " + conditionCurrency);
                    System.out.println("conditionCurrency len::: " + conditionCurrency.length());
                    if (conditionCurrency.length() > 1) {
                        if (conditionCurrency.equals(poCurrency)) {
                            condition.setCondCurncyExchangeRate("1.0000");
                        } else {
                            List<MasterExchangeRate> condCurncyExchangeRateList = findExchangeRateByFromCurrencyAndToCurrency(poCurrency, conditionCurrency);
                            if (!condCurncyExchangeRateList.isEmpty()) {
                                MasterExchangeRate exchangeRateObj = condCurncyExchangeRateList.get(0);
                                condition.setCondCurncyExchangeRate(exchangeRateObj.getExchangeRate().toString());
                            } else {
                                condition.setCondCurncyExchangeRate("");
                            }
                        }
                    } else {
                        condition.setCondCurncyExchangeRate(null);
                    }
                // Calculate CondCurncyExchangeRate Ends

                    // Calculate POCurrencyExchangeRate Starts
                    if (poCurrency.equals(localCurrency)) {
                        condition.setPoCurrencyExchangeRate("1.0000");
                    } else {
                        List<MasterExchangeRate> poCurrencyExchangeRateList = findExchangeRateByFromCurrencyAndToCurrency(localCurrency, poCurrency);
                        if (!poCurrencyExchangeRateList.isEmpty()) {
                            MasterExchangeRate exchangeRateObj = poCurrencyExchangeRateList.get(0);
                            condition.setPoCurrencyExchangeRate(exchangeRateObj.getExchangeRate().toString());
                        } else {
                            condition.setPoCurrencyExchangeRate("");
                        }
                    }
                    // Calculate POCurrencyExchangeRate Ends

                    conditionList.add(condition);

                }
                lineItemObj.setLineItemConditions(conditionList);
            } else {
                System.out.println("No Line Level Conditions Present===================");
            }
        }
        // Delivery Schedule======================================================================
        json = jsonarray.getJSONObject(15);

        JSONArray deliverySchTableData = json.getJSONArray("deliverySchTableData");

        List<NGBPCmplxPOCreationDelverySchedule> deliveryScheduleList = new ArrayList<>();
        NGBPCmplxPOCreationDelverySchedule deliverySchedule;
//        String LinkId = deliverySchTableData.getJSONObject(0).optString("linkid");
//        List<NGBPCmplxPOCreationDelverySchedule> list = getDeliveryScheduleByLinkId(LinkId);
//        for(int i = 0; i<list.size(); i++){
//            NGBPCmplxPOCreationDelverySchedule deliveryObj = list.get(i);
//            deliveryObj.setLinkID("");
//        }

        for (int i = 0; i < deliverySchTableData.length(); i++) {
            deliverySchedule = new NGBPCmplxPOCreationDelverySchedule();
            SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");

            if (deliverySchTableData.getJSONObject(i).optString("deliveryDateCategory").equals("D")) {
                try {
                    Date dateCat = formatter.parse(deliverySchTableData.getJSONObject(i).optString("deliveryDate"));
                    if (!"".equals(dateCat)) {
                        deliverySchedule.setDelDate(dateCat);
                    } else {
                        deliverySchedule.setDelDate(null);
                    }
                    deliverySchedule.setDeliveryDateByCategory(null);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } else {
                deliverySchedule.setDelDate(null);
                deliverySchedule.setDeliveryDateByCategory(deliverySchTableData.getJSONObject(i).optString("deliveryDate"));
            }
            try {
                Date stDelDate = formatter.parse(deliverySchTableData.getJSONObject(i).optString("statistialDeliveryDate"));
                if (!"".equals(stDelDate)) {
                    deliverySchedule.setStatisticalDeliveryDate(stDelDate);
                } else {
                    deliverySchedule.setStatisticalDeliveryDate(null);
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }

            deliverySchedule.setDelDateCatg(deliverySchTableData.getJSONObject(i).optString("deliveryDateCategory"));
            if (!"".equals(deliverySchTableData.getJSONObject(i).optString("scheduledQuantity"))) {
                deliverySchedule.setScheduledQuantity(new BigDecimal(deliverySchTableData.getJSONObject(i).optString("scheduledQuantity")));
            } else {
                deliverySchedule.setScheduledQuantity(new BigDecimal(0.0));
            }

            deliverySchedule.setDelTime(deliverySchTableData.getJSONObject(i).optString("time"));
            deliverySchedule.setPRNumber(deliverySchTableData.getJSONObject(i).optString("purReqNumber"));
            deliverySchedule.setReqItemNo(deliverySchTableData.getJSONObject(i).optString("reqItemNumber"));
            deliverySchedule.setLinkID(deliverySchTableData.getJSONObject(i).optString("linkid"));
            deliverySchedule.setPrItemNumber(prItemNumber);
            if (!"".equals(deliverySchTableData.getJSONObject(i).optString("gRQuantity"))) {
                deliverySchedule.setGrQty(new BigDecimal(deliverySchTableData.getJSONObject(i).optString("gRQuantity")));
            } else {
                deliverySchedule.setGrQty(new BigDecimal(0.0));
            }
            if (!"".equals(deliverySchTableData.getJSONObject(i).optString("openQuantity"))) {
                deliverySchedule.setOpenQuantity(new BigDecimal(deliverySchTableData.getJSONObject(i).optString("openQuantity")));
            } else {
                deliverySchedule.setOpenQuantity(new BigDecimal(0.0));
            }
            deliverySchedule.setSchLine(deliverySchTableData.getJSONObject(i).optString("schLine"));

            deliveryScheduleList.add(deliverySchedule);
        }
        lineItemObj.setLineItemDeliverySchedule(deliveryScheduleList);
        // Component==============================================================================
        json = jsonarray.getJSONObject(16);

        JSONArray componentTableData = json.getJSONArray("componentTableData");

        List<NGBPCmplxPOCreationLineItemComponent> componentList = new ArrayList<>();
        NGBPCmplxPOCreationLineItemComponent component;

        for (int i = 0; i < componentTableData.length(); i++) {
            component = new NGBPCmplxPOCreationLineItemComponent();
            List<NGBPCmplxPOCreationLineItemComponent> list = standalonePoWS.getNGBPCmplxPOCreationLineItemComponentByLinkId(componentTableData.getJSONObject(i).optString("linkid"));
            if (!list.isEmpty()) {
                for (int j = 0; j < list.size(); j++) {
                    NGBPCmplxPOCreationLineItemComponent conponentObj = list.get(j);
                    conponentObj.setLinkId("");
                    standalonePoWS.updateNGBPCmplxPOCreationLineItemComponent(conponentObj);
                }
            }
            if (!"".equals(componentTableData.getJSONObject(i).optString("requirementDate")) && !"NA".equals(componentTableData.getJSONObject(i).optString("requirementDate"))) {
                SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                try {
                    Date tempDate = formatter.parse(componentTableData.getJSONObject(i).optString("requirementDate"));
                    System.out.println("tempDate :" + tempDate);
                    System.out.println(formatter.format(tempDate));
                    component.setRequirementDate(tempDate);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } else {
                component.setRequirementDate(null);
            }
            if (!"".equals(componentTableData.getJSONObject(i).optString("latReqDate")) && !"NA".equals(componentTableData.getJSONObject(i).optString("latReqDate"))) {
                SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                try {
                    Date tempDate = formatter.parse(componentTableData.getJSONObject(i).optString("latReqDate"));
                    System.out.println("tempDate :" + tempDate);
                    System.out.println(formatter.format(tempDate));
                    component.setLatestRequirementDate(tempDate);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } else {
                component.setLatestRequirementDate(null);
            }

            component.setMaterialCode(componentTableData.getJSONObject(i).optString("material"));

            if (!"".equals(componentTableData.getJSONObject(i).optString("quantity"))) {
                component.setQuantity(new BigDecimal(componentTableData.getJSONObject(i).optString("quantity")));
            } else {
                component.setQuantity(new BigDecimal(0.0));
            }

            component.setDescription(componentTableData.getJSONObject(i).optString("description"));
            component.setPlant(componentTableData.getJSONObject(i).optString("plant"));
            component.setUnit(componentTableData.getJSONObject(i).optString("unit"));
            component.setProductStorageLocation(componentTableData.getJSONObject(i).optString("prodStorageLoc"));
            component.setSupplyArea(componentTableData.getJSONObject(i).optString("supplyArea"));
            component.setLinkId(componentTableData.getJSONObject(i).optString("linkid"));
            component.setPrItemNumber(prItemNumber);
            component.setQtyIsFixed(componentTableData.getJSONObject(i).optString("qtyIsFixed"));
            component.setDistributionKey(componentTableData.getJSONObject(i).optString("distKey"));
            component.setBatch(componentTableData.getJSONObject(i).optString("comBatch"));
            componentList.add(component);
        }
        lineItemObj.setLineItemComponent(componentList);
        return lineItemObj;
    }

    List<NGBPCmplxPOCreationLineItemPO> getPRLineData(String poid, String itemNumber) {
        System.out.println("getPRLineData");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getPRLineData.do?searchData=" + poid + "~" + itemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPO>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPO>>() {
        });
        List<NGBPCmplxPOCreationLineItemPO> list = response.getBody();
        return list;
    }

    List<Object> findFinalizedVendorByRfqId(int rfqId) {
        System.out.println("findFinalizedVendorByRfqId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findFinalizedVendorByRfqId.do?rfqId=" + rfqId;
        System.out.println("url: " + url);
        ResponseEntity<List<Object>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Object>>() {
        });
        List<Object> list = response.getBody();
        return list;
    }

    List<FinalizedRfq> findFinalizedRfqByIds(String ids) {
        System.out.println("findFinalizedRfqByIds");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findFinalizedRfqByIds.do?ids=" + ids;
        System.out.println("url: " + url);
        ResponseEntity<List<FinalizedRfq>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<FinalizedRfq>>() {
        });
        List<FinalizedRfq> finalizedRfqList = response.getBody();
        return finalizedRfqList;
    }

    List<Integer> getLastExtId() {
        System.out.println("getLastExtId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getLastExtId.do";
        System.out.println("url: " + url);
        ResponseEntity<List<Integer>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Integer>>() {
        });
        List<Integer> list = response.getBody();
        return list;
    }

    List<NGBPCmplxPOCreationLineItemPOAccountAssignment> getAccountAssignmentByLinkId(String linkid) {
        System.out.println("getAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getaccountassignmentbylinkid.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    List<NGBPCmplxPOCreationLineItemService> getServicesByLinkId(String linkid) {
        System.out.println("getServicesByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServicesByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemService>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemService>>() {
        });
        List<NGBPCmplxPOCreationLineItemService> accAsgn = response.getBody();
        return accAsgn;
    }

    List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getServiceAccountAssignmentByLinkIdAndLineItemNumber(String linkid, String lineItemNumber) {
        System.out.println("getServiceAccountAssignmentByLinkIdAndLineItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceAccountAssignmentByLinkId.do?linkid=" + linkid + "&lineItemNumber=" + lineItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgn = response.getBody();
        return accAsgn;
    }

    List<NGBPCmplxPOCreationLineItemConditions> getConditionByLinkId(String linkid) {
        System.out.println("getMasterConditionLineLevelByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemConditions>>() {
        });
        List<NGBPCmplxPOCreationLineItemConditions> condition = response.getBody();
        return condition;
    }

    String deleteAllNGBPCmplxPOCreationLineItemConditions(List<NGBPCmplxPOCreationLineItemConditions> conditionList) {
        System.out.println("deleteAllNGBPCmplxPOCreationLineItemConditions");
        System.out.println("conditionList Size :" + conditionList.size());
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteallngbpcmplxpocreationlineitemconditions.do";
        System.out.println("url:" + url);
        JSONObject obj = new JSONObject(conditionList);
        System.out.println("JSONS ::: " + obj.toString());
        String result = restTemplate.postForObject(url, conditionList, String.class);
        return result;
    }

    List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(String serviceLineItemNumber, String lineItemNumber, String PoId) {
        System.out.println("getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber + "&PoId=" + PoId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgn = response.getBody();
        return accAsgn;
    }

    String deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgnList) {
        System.out.println("accAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues.do?accAsgnList=" + accAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accAsgnList, String.class);
        return result;
    }

    String deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignment(List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accAsgnList) {
        System.out.println("accAsgnList in deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignment ");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignment.do?accAsgnList=" + accAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, accAsgnList, String.class);
        return result;
    }

    String saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues.do"), serviceAccountAssignment, String.class);
        System.out.println("NGBPCmplxPOCreationLineItemPOAccountAssignmentValues msg : " + msg);
        return msg;
    }

    String saveStandAloneProfitabilitySegment(NGBPCmplxPOCreationLineItemProfitabilitySegment profitabilitySegment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveStandAloneProfitabilitySegment.do"), profitabilitySegment, String.class);
        System.out.println("saveprofitabilitysegment : " + msg);
        return msg;
    }

    List<NGBPCmplxPOCreationLimitsAccountAssignment> getNGBPCmplxPOCreationLimitsAccountAssignmentByLinkId(String linkid) {
        System.out.println("getNGBPCmplxPOCreationLimitsAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLimitsAccountAssignmentByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLimitsAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLimitsAccountAssignment>>() {
        });
        List<NGBPCmplxPOCreationLimitsAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    String updateRfqHeaderVendorMapping(RfqHeaderVendorMapping mapping) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheadervendormapping.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), mapping, String.class);
        System.out.println("msg in update: " + msg);
        return msg;
    }

    NGBPExtPOCreation getNGBPExtPOCreationById(String id) {
        System.out.println("getWorkOrderRfqLineItemByPrId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPExtPOCreationById.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<NGBPExtPOCreation> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NGBPExtPOCreation>() {
        });
        NGBPExtPOCreation prList = response.getBody();
        return prList;
    }

    List<NGBPCmplxPOCreationLineItemPO> getPRLineDataByLinkId(String linkid) {
        System.out.println("getPRLineData");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getPRLineDataByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPO>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPO>>() {
        });
        List<NGBPCmplxPOCreationLineItemPO> list = response.getBody();
        return list;
    }

    List<NGBPCmplxPOCreationLineItemPOAccountAssignment> getNGBPCmplxPOCreationLineItemPOAccountAssignmentByLinkId(String linkid) {
        System.out.println("getNGBPCmplxPOCreationLimitsAccountAssignmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemPOAccountAssignmentByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

    String updateNGBPCmplxPOCreationLineItemPOAccountAssignment(NGBPCmplxPOCreationLineItemPOAccountAssignment accountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemPOAccountAssignment.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), accountAssignment, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemPOAccountAssignment: " + msg);
        return msg;
    }

    String updateNGBPCmplxPOCreationLineItemService(NGBPCmplxPOCreationLineItemService serviceObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationLineItemService.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), serviceObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationLineItemService: " + msg);
        return msg;
    }

    String updateNGBPCmplxPOCreationInvoice(NGBPCmplxPOCreationInvoice invoiceObj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateNGBPCmplxPOCreationInvoice.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), invoiceObj, String.class);
        System.out.println("msg in updateNGBPCmplxPOCreationInvoice: " + msg);
        return msg;
    }

    List<SchemaGroupPurOrgMapping> findKalsmBySchemaGroupAndPurchaseOrg(String schemaGroup, String purOrg) {
        System.out.println("findKalsmBySchemaGroupAndPurchaseOrg");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findKalsmBySchemaGroupAndPurchaseOrg.do?schemaGroup=" + schemaGroup + "&purOrg=" + purOrg;
        System.out.println("url: " + url);
        ResponseEntity<List<SchemaGroupPurOrgMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SchemaGroupPurOrgMapping>>() {
        });
        List<SchemaGroupPurOrgMapping> list = response.getBody();
        return list;
    }

    public List<MasterServiceMaster> getServiceMasterByMaterialGroup(String materialGroup) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceMasterByMaterialGroup.do?materialGroup=" + materialGroup;
        ResponseEntity<List<MasterServiceMaster>> service = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterServiceMaster>>() {
        });
        System.out.println("service: " + service);
        List<MasterServiceMaster> serviceObj = service.getBody();
        return serviceObj;
    }

    List<NGBPCmplxPOCreationDelverySchedule> getDeliveryScheduleByLinkId(String linkid) {
        System.out.println("getDeliveryScheduleByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getDeliveryScheduleByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationDelverySchedule>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationDelverySchedule>>() {
        });
        List<NGBPCmplxPOCreationDelverySchedule> service = response.getBody();
        return service;
    }

    String saveSAPRLineSubTab(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("In savePRLineSubTab++++++++++++++++++++++++++++++++");
        System.out.println("Paramenter [savePRLineSub]  :::: " + request.getParameter("formdata"));

        JSONObject POLineLevelDataAsJsonObj = new JSONObject(request.getParameter("formdata"));
        String poNumber = POLineLevelDataAsJsonObj.getString("PoId");
        System.out.println("poNumber: " + poNumber);

        JSONArray PRLineItemArray = POLineLevelDataAsJsonObj.getJSONArray("PRLineItemArray");
        System.out.println("PRLineItemArray size: " + PRLineItemArray.length());
        System.out.println("PRLineItemArray: " + PRLineItemArray.toString());

        JSONArray POInvoiceDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POInvoiceData");
        System.out.println("POInvoiceDataAsJsonArray size: " + POInvoiceDataAsJsonArray.length());
        System.out.println("POInvoiceDataAsJsonArray: " + POInvoiceDataAsJsonArray);

//        JSONArray POServiceDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POServiceData");
//        System.out.println("POServiceDataAsJsonArray size: " + POServiceDataAsJsonArray.length());
//        System.out.println("POServiceDataAsJsonArray: " + POServiceDataAsJsonArray);
//
//        JSONArray POServiceAccAssDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POServiceAccAssData");
//        System.out.println("POServiceAccAssDataAsJsonArray size: " + POServiceAccAssDataAsJsonArray.length());
//        System.out.println("POServiceAccAssDataAsJsonArray: " + POServiceAccAssDataAsJsonArray);
//
//        JSONArray POLineItemConditionDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POLineItemConditionData");
//        System.out.println("POLineItemConditionDataAsJsonArray size: " + POLineItemConditionDataAsJsonArray.length());
//        System.out.println("POLineItemConditionDataAsJsonArray: " + POLineItemConditionDataAsJsonArray);
//
//        JSONArray POAccAssDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POAccAssData");
//        System.out.println("POAccAssDataAsJsonArray size: " + POAccAssDataAsJsonArray.length());
//        System.out.println("POAccAssDataAsJsonArray: " + POAccAssDataAsJsonArray);
//
//        JSONArray POQuantityWeightsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POQuantityWeightsData");
//        System.out.println("POQuantityWeightsDataAsJsonArray size: " + POQuantityWeightsDataAsJsonArray.length());
//        System.out.println("POQuantityWeightsDataAsJsonArray: " + POQuantityWeightsDataAsJsonArray);
//
//        JSONArray PODeliveryScheduleDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryScheduleData");
//        System.out.println("PODeliveryScheduleDataAsJsonArray size: " + PODeliveryScheduleDataAsJsonArray.length());
//        System.out.println("PODeliveryScheduleDataAsJsonArray: " + PODeliveryScheduleDataAsJsonArray);
//
//        JSONArray POConfirmationDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POConfirmationData");
//        System.out.println("POConfirmationDataAsJsonArray size: " + POConfirmationDataAsJsonArray.length());
//        System.out.println("POConfirmationDataAsJsonArray: " + POConfirmationDataAsJsonArray);
//
//        JSONArray POCondCtrlDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POCondCtrlData");
//        System.out.println("POCondCtrlDataAsJsonArray size: " + POCondCtrlDataAsJsonArray.length());
//        System.out.println("POCondCtrlDataAsJsonArray: " + POCondCtrlDataAsJsonArray);
//
//        JSONArray PODeliveryDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryData");
//        System.out.println("PODeliveryDataAsJsonArray size: " + PODeliveryDataAsJsonArray.length());
//        System.out.println("PODeliveryDataAsJsonArray: " + PODeliveryDataAsJsonArray);
//
//        JSONArray PODeliveryAddressDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryAddressData");
//        System.out.println("PODeliveryAddressDataAsJsonArray size: " + PODeliveryAddressDataAsJsonArray.length());
//        System.out.println("PODeliveryAddressDataAsJsonArray: " + PODeliveryAddressDataAsJsonArray);
//
//        JSONArray POLimitsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POLimitsData");
//        System.out.println("POLimitsDataAsJsonArray size: " + POLimitsDataAsJsonArray.length());
//        System.out.println("POLimitsDataAsJsonArray: " + POLimitsDataAsJsonArray);
//
//        JSONArray POTextsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POTextsData");
//        System.out.println("POTextsDataAsJsonArray size: " + POTextsDataAsJsonArray.length());
//        System.out.println("POTextsDataAsJsonArray: " + POTextsDataAsJsonArray);
//
//        JSONArray POLineItemCustomerDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POLineItemCustomerData");
//        System.out.println("POLineItemCustomerDataAsJsonArray size: " + POLineItemCustomerDataAsJsonArray.length());
//        System.out.println("POLineItemCustomerDataAsJsonArray: " + POLineItemCustomerDataAsJsonArray);
        for (int i = 0; i < PRLineItemArray.length(); i++) {
            JSONObject prLineJsonObj = PRLineItemArray.getJSONObject(i);
            System.out.println("prLineJsonObj: " + prLineJsonObj.toString());
        }

        savePoLineLevelTab.saveInvoiceTabData(POInvoiceDataAsJsonArray);
//        savePoLineLevelTab.saveServiceTabData(POServiceDataAsJsonArray);
//        savePoLineLevelTab.saveServiceAccountAssignmentData(POServiceAccAssDataAsJsonArray);
//        savePoLineLevelTab.saveConditionLineLevelTabData(POLineItemConditionDataAsJsonArray);
//        savePoLineLevelTab.saveAccountAssignmentTabData(POAccAssDataAsJsonArray);
//        savePoLineLevelTab.saveQuantityWeightsTabData(POQuantityWeightsDataAsJsonArray);
//        savePoLineLevelTab.saveDeliveryScheduleTabData(PODeliveryScheduleDataAsJsonArray);
//        savePoLineLevelTab.saveConfirmationsTabData(POConfirmationDataAsJsonArray);
//        savePoLineLevelTab.saveConditionControlTabData(POCondCtrlDataAsJsonArray);
//        savePoLineLevelTab.saveDeliveryTabData(PODeliveryDataAsJsonArray);
//        savePoLineLevelTab.saveDeliveryAddressTabData(PODeliveryAddressDataAsJsonArray);
//        savePoLineLevelTab.saveLimitsTabData(POLimitsDataAsJsonArray);
//        savePoLineLevelTab.saveTextsTabData(POTextsDataAsJsonArray);
//        savePoLineLevelTab.saveCustomerTabData(POLineItemCustomerDataAsJsonArray);

        return "success";
    }

    List<ConditionsLineLevel> getConditionsLineLevelByLinkIds(String linkIdArray) {
        System.out.println("getConditionsLineLevelByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionsLineLevelByLinkIds.do?linkIdArray=" + linkIdArray;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> condition = response.getBody();
        return condition;
    }

    List<CMHeaderServicesInfo> getContServiceByLinkID(String linkId) {
        System.out.println("getContServiceByLinkID");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getContServiceByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<CMHeaderServicesInfo>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderServicesInfo>>() {
        });
        List<CMHeaderServicesInfo> service = response.getBody();
        return service;
    }

    List<CMHeaderAccountAssignInfo> getContAccByLinkID(String linkId) {
        System.out.println("getContAccByLinkID");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getContAccByLinkID.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<CMHeaderAccountAssignInfo>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderAccountAssignInfo>>() {
        });
        List<CMHeaderAccountAssignInfo> accAss = response.getBody();
        return accAss;
    }

    int getContSerLinkID() {
        System.out.println("getContServiceByLinkID");
        RestTemplate restTemplate = new RestTemplate();
        Random Range = new Random();
        int uniqueID = Range.nextInt(99999999) + 1;
        System.out.println("uniqueID-->" + uniqueID);
        String url = webservice_ip + "/BuyerPortalWebServices/findServiceBySerLinkId.do?SerLinkId=" + uniqueID;
        System.out.println("url: " + url);
        ResponseEntity<List<CMHeaderServicesInfo>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderServicesInfo>>() {
        });
        System.out.println("response-->" + response);
        List<CMHeaderServicesInfo> service = response.getBody();
        System.out.println("getContSerLinkID Size-->" + service.size());
        if (service.size() > 0) {
            getContSerLinkID();
        }
        return uniqueID;

    }

    int getContLinkID() {
        System.out.println("getContLinkID");
        RestTemplate restTemplate = new RestTemplate();
        Random Range = new Random();
        int uniqueID = Range.nextInt(99999999) + 1;

        String url = webservice_ip + "/BuyerPortalWebServices/findContractByLinkId.do?LinkId=" + uniqueID;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenContractLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenContractLineItem>>() {
        });
        System.out.println("Get Contract LinkID Response-->" + response);
        List<NewgenContractLineItem> service = response.getBody();
        System.out.println("getContLinkID Size-->" + service.size());
        if (service.size() > 0) {
            getContLinkID();
        }
        return uniqueID;

    }

    public void info(String strText) {
        // //System.out.println("Inside Log Generation");

        int logcount = 0;
        String strLogFilePath = "";
        GregorianCalendar cal = new GregorianCalendar();
        SimpleDateFormat sdfs = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        File objDirs = null;
//        if (WriteLOG.equalsIgnoreCase("y")) {
        try {
            strLogFilePath = System.getProperty("user.dir") + File.separator + "Process_Logs" + File.separator + "BuyerPortal" + File.separator + cal.get(Calendar.DAY_OF_MONTH) + "-"
                    + (cal.get(Calendar.MONTH) + 1) + "-" + cal.get(Calendar.YEAR);
            // //System.out.println("strLogFilePath_logGen :"+strLogFilePath);
            strCurDate1 = sdfs.format(cal.getTime());
            objDirs = new File(strLogFilePath);
            objDirs.mkdirs();
            strLogFilePath = strLogFilePath + File.separator + "general.log";

            File objDirs1 = new File(strLogFilePath);

            while (true) {
                if (new File(objDirs1.getAbsolutePath() + "_" + logcount).length() > 0) {
                    logcount++;
                    continue;
                }
                if (objDirs1.length() > (1024 * 1024 * 10)) {
                    objDirs1.renameTo(new File(objDirs1.getAbsolutePath() + "_" + logcount));
                    break;
                }
                break;
            }
            FileOutputStream os = new FileOutputStream(strLogFilePath, true);
            String strNewLine = "\n";
            String strspace = "\t";
            byte[] dat = strCurDate1.getBytes();
            byte[] bspaceLine = strspace.getBytes();
            byte[] bNewLine = strNewLine.getBytes();
            byte[] bText = strText.getBytes();
            os.write(bNewLine);
            os.write(dat);
            os.write(bspaceLine);
            os.write(bText);
            //os.write(bNewLine);
            os.close();
        } catch (Exception e) {
            //System.out.println("exception in writing to log " + e.getMessage());
            e.printStackTrace();
        } finally {
            if (strLogFilePath != null) {
                strLogFilePath = null;
            }
            if (cal != null) {
                cal = null;
            }
            if (objDirs != null) {
                objDirs = null;
            }
        }

    }

    List<RatedParameters> findByVendorRFQTag(int vendorId, int rfqid, String tag) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByVendorRFQTag.do?vendorId=" + vendorId + "&rfq=" + rfqid + "&tag=" + tag;
        System.out.println("url: " + url);
        ResponseEntity<List<RatedParameters>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RatedParameters>>() {
        });
        List<RatedParameters> list = response.getBody();
        return list;
    }

    String findMaxTagID(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaxTagID.do?rfq=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<String>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
        });
        List<String> list = response.getBody();
        String param = list.get(0);
        return param;
    }

    String updateRatedParam(RatedParameters ratedParameters) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateRatedParam.do"), ratedParameters, String.class);
        System.out.println("msg: " + msg);
        return msg;
    }

    String saveRatedParam(RatedParameters ratedParameters) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveRatedParam.do"), ratedParameters, String.class);
        System.out.println("msg: " + msg);
        return msg;
    }        
}
