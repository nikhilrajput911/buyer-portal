/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.AccountAssignment;
import com.eportal.entities.AccountAssignmentCategoryMaster;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPendingPRLineItemsBean;
import com.eportal.entities.BuyerSecurityQueAns;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.BuyerVendorNotification;
import com.eportal.entities.CmplxPRToPOLineItemPRAccountAssignment;
import com.eportal.entities.CmplxPRToPOLineItemPRAccountAssignmentValues;
import com.eportal.entities.CmplxPRToPOLineItemService;
import com.eportal.entities.Component;
import com.eportal.entities.ConditionControl;
import com.eportal.entities.ConditionsLineLevel;
import com.eportal.entities.Confirmations;
import com.eportal.entities.CountryMaster;
import com.eportal.entities.CustomerData;
import com.eportal.entities.Delivery;
import com.eportal.entities.DeliveryAddress;
import com.eportal.entities.DeliverySchedule;
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
import com.eportal.entities.MasterDepartment;
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
import com.eportal.entities.MasterLocation;
import com.eportal.entities.MasterMaterialGeneral;
import com.eportal.entities.MasterMaterialGroup;
import com.eportal.entities.MasterMaterialSrcIndicator;
import com.eportal.entities.MasterMaterialType;
import com.eportal.entities.MasterNetwork;
import com.eportal.entities.MasterPartnerFunction;
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
import com.eportal.entities.MasterStockType;
import com.eportal.entities.MasterTaxCode;
import com.eportal.entities.MasterValuationType;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.MasterWBSElement;
import com.eportal.entities.NGBPCmplxPOCreationConditionControl;
import com.eportal.entities.NGBPCmplxPOCreationConditions;
import com.eportal.entities.NGBPCmplxPOCreationConfirmations;
import com.eportal.entities.NGBPCmplxPOCreationDelivery;
import com.eportal.entities.NGBPCmplxPOCreationDeliveryAddress;
import com.eportal.entities.NGBPCmplxPOCreationDelverySchedule;
import com.eportal.entities.NGBPCmplxPOCreationInvoice;
import com.eportal.entities.NGBPCmplxPOCreationLimitsAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemComponent;
import com.eportal.entities.NGBPCmplxPOCreationLineItemConditions;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPO;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
import com.eportal.entities.NGBPCmplxPOCreationLineItemProfitabilitySegment;
import com.eportal.entities.NGBPCmplxPOCreationLineItemService;
import com.eportal.entities.NGBPExtPOCreation;
import com.eportal.entities.NGCPCustomerSeeded;
import com.eportal.entities.NGCmplxPOCreationApproverDetails;
import com.eportal.entities.NGCmplxPOCreationDelverySchedule;
import com.eportal.entities.NGExtPOCreation;
import com.eportal.entities.NewgenContractLineItem;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.OpenRfqReportBean;
import com.eportal.entities.PaymentTermsMaster;
import com.eportal.entities.ProfitabilitySegment;
import com.eportal.entities.PurchaseRequestStatusReportBean;
import com.eportal.entities.QuantityDates;
import com.eportal.entities.QueryUser;
import com.eportal.entities.QueryWIInput;
import com.eportal.entities.RejectWIInput;
import com.eportal.entities.RejectWIOutPut;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.RfqHeaderVendorMapping;
import com.eportal.entities.ServiceAccountAssignment;
import com.eportal.entities.Services;
import com.eportal.entities.ServicesLongTexts;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.Text;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.VendorGroup;
import com.eportal.entities.VendorGroupMapping;
import com.eportal.entities.WorkOrderAttachmentTemp;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.StandalonePoWS;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.URI;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
public class POAjaxController {

    @Value("${no_of_days}")
    private int no_of_days;
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
    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues nGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignment nGBPCmplxPOCreationLineItemPOAccountAssignment;

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    @Value("${rfq_pending}")
    private String rfq_pending;

    @Autowired
    RejectWIInput rejectWiInput;
    @Autowired
    QueryWIInput queryWiInput;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;
    @Autowired
    FinalizedRfq finalizedRfq;
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
    NGBPCmplxPOCreationInvoice ngBPCmplxPOCreationInvoice;
    @Autowired
    NGBPCmplxPOCreationLineItemService ngBPCmplxPOCreationLineItemService;
    @Autowired
    NGBPCmplxPOCreationLineItemConditions ngBPCmplxPOCreationLineItemConditions;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignment ngBPCmplxPOCreationLineItemPOAccountAssignment;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues ngBPCmplxPOCreationLineItemPOAccountAssignmentValues;
    @Autowired
    NGBPCmplxPOCreationDelivery ngBPCmplxPOCreationDelivery;
    @Autowired
    NGBPCmplxPOCreationDeliveryAddress ngBPCmplxPOCreationDeliveryAddress;
    @Autowired
    NGBPCmplxPOCreationConfirmations ngBPCmplxPOCreationConfirmations;
    @Autowired
    NGBPCmplxPOCreationConditionControl ngBPCmplxPOCreationConditionControl;
    @Autowired
    NGBPCmplxPOCreationLimitsAccountAssignment nGBPCmplxPOCreationLimitsAccountAssignment;
    @Autowired
    PurchaseOrderWS purchaseOrderWS;
    @Autowired
    StandalonePoWS standalonePoWS;
    @Autowired
    ServicesLongTexts servicesLongTextsEntity;

    @RequestMapping(value = "/saveQuantityWeightForMultiplePr", method = RequestMethod.POST)
    public void saveQuantityWeightForMultiplePr(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========PO Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in saveQuantityWeightForMultiplePr : " + reqFrom);
        try {
            if (reqFrom.equalsIgnoreCase("saveQuantityWeightForMultiplePr")) {
                out = response.getWriter();
                String result;
                result = saveQuantityWeightForMultiplePr(request, response);
                System.out.println("result::: " + result);
                out.println(result);
            } else if (reqFrom.equalsIgnoreCase("UpdateFinalizedVendorPoDetails")) {
                System.out.println("UpdateFinalizedVendorPoDetails");
                out = response.getWriter();

                String RfqId = request.getParameter("RfqId");
                String VendorId = request.getParameter("VendorId");
                String PrIds = request.getParameter("PrIds");
                String PoNumber = request.getParameter("PoNumber");
                String VendorFinalizationTableDataArrayAsJsonString = request.getParameter("VendorFinalizationTableDataArrayAsJsonString");
                String VendorFinalizationTablePrDataArrayAsJsonString = request.getParameter("VendorFinalizationTablePrDataArrayAsJsonString");

                System.out.println("RfqId: " + RfqId);
                System.out.println("VendorId: " + VendorId);
                System.out.println("PrIds: " + PrIds);
                System.out.println("PoNumber: " + PoNumber);
                System.out.println("VendorFinalizationTableDataArrayAsJsonString: " + VendorFinalizationTableDataArrayAsJsonString);
                System.out.println("VendorFinalizationTablePrDataArrayAsJsonString: " + VendorFinalizationTablePrDataArrayAsJsonString);

                JSONArray VendorFinalizationTableDataArrayAsJsonArray = new JSONArray(VendorFinalizationTableDataArrayAsJsonString);
                System.out.println("VendorFinalizationTableDataArrayAsJsonArray: " + VendorFinalizationTableDataArrayAsJsonArray.length());

                JSONArray VendorFinalizationTablePrDataArrayAsJsonArray = new JSONArray(VendorFinalizationTablePrDataArrayAsJsonString);
                System.out.println("VendorFinalizationTablePrDataArrayAsJsonArray: " + VendorFinalizationTablePrDataArrayAsJsonArray.length());

                WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(RfqId));
                List<SupplierHeader> supplierHeaderList = findSupplierHeaderByRfqid(Integer.parseInt(RfqId));
                System.out.println("supplierHeaderList size: " + supplierHeaderList.size());

                String supplierHeaderIds = "";
                for (int i = 0; i < supplierHeaderList.size(); i++) {
                    if (i == supplierHeaderList.size() - 1) {
                        supplierHeaderIds = supplierHeaderIds + supplierHeaderList.get(i).getId();
                    } else {
                        supplierHeaderIds = supplierHeaderIds + supplierHeaderList.get(i).getId() + ",";
                    }
                }
                System.out.println("supplierHeaderIds: " + supplierHeaderIds);
                List<SupplierLineitem> supplierRfqLineItemList = findSupplierRfqLineItemByMultipleSupplierHeaderId(supplierHeaderIds);
                System.out.println("supplierRfqLineItemList size: " + supplierRfqLineItemList.size());

                Date today = new Date();

                for (int i = 0; i < VendorFinalizationTableDataArrayAsJsonArray.length(); i++) {
                    JSONObject VendorFinalizationTableRowAsJsonObject = VendorFinalizationTableDataArrayAsJsonArray.getJSONObject(i);
                    JSONObject VendorFinalizationTablePrRowAsJsonObject = VendorFinalizationTablePrDataArrayAsJsonArray.getJSONObject(i);

                    int vendorId = VendorFinalizationTableRowAsJsonObject.getInt("vendorId");
                    int insertionOrderId = VendorFinalizationTableRowAsJsonObject.getInt("insertionOrderId");
                    String quantity = VendorFinalizationTableRowAsJsonObject.getString("quantity");
                    String comments = VendorFinalizationTableRowAsJsonObject.getString("comments");
                    String whyThisVendor = VendorFinalizationTableRowAsJsonObject.getString("whyThisVendor");

                    String prNumber = VendorFinalizationTablePrRowAsJsonObject.getString("prNumber");
                    String prItemNumber = VendorFinalizationTablePrRowAsJsonObject.getString("prItemNumber");

                    System.out.println("vendorId: " + vendorId);
                    System.out.println("insertionOrderId: " + insertionOrderId);
                    System.out.println("quantity: " + quantity);
                    System.out.println("comments: " + comments);
                    System.out.println("whyThisVendor: " + whyThisVendor);
                    System.out.println("prNumber: " + prNumber);
                    System.out.println("prItemNumber: " + prItemNumber);

                    VendorDetails vendorObj = findVendorById(vendorId);
                    NewgenPRLineItem prObj = getPrDetailsById(insertionOrderId);

                    finalizedRfq.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    finalizedRfq.setNgBpVendordetailsId(vendorObj);
                    finalizedRfq.setNgBpNewgenPRLineItemId(prObj);
                    finalizedRfq.setFinalizedDate(today);
                    finalizedRfq.setComments(comments);
                    finalizedRfq.setWhyThisVendor(whyThisVendor);
                    finalizedRfq.setQuantity(quantity);
                    finalizedRfq.setIsPoCreated("Yes");
                    finalizedRfq.setPoNumber(PoNumber);
                    finalizedRfq.setPrNumber(prNumber);
                    finalizedRfq.setPrItemNumber(prItemNumber);

                    saveFinalizedRfq(finalizedRfq);

                    // Update Quantity in SupplierLineItem Table For PO
                    for (SupplierLineitem supplierLineItemObj : supplierRfqLineItemList) {
                        if (supplierLineItemObj.getNgBpNewgenPRLineItemId().getInsertionOrderId() == insertionOrderId) {
                            String remainingQuantityForPo = supplierLineItemObj.getRemainingQuantityForPo();
                            System.out.println("remainingQuantityForPo: " + remainingQuantityForPo);

                            int remainingQty;
                            if (remainingQuantityForPo == null) {
                                remainingQty = Integer.parseInt(supplierLineItemObj.getQuantity()) - Integer.parseInt(quantity);
                            } else {
                                remainingQty = Integer.parseInt(supplierLineItemObj.getRemainingQuantityForPo()) - Integer.parseInt(quantity);
                            }
                            System.out.println("remainingQty");
                            supplierLineItemObj.setRemainingQuantityForPo(remainingQty + "");
                            updateSupplierLineitem(supplierLineItemObj);
                            System.out.println("Updated SupplierLineitem");
                        }
                    }
                }
                jObj.put("Result", "Success");
                out.println(jObj);
            }
        } catch (IOException ex) {
            Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    String saveQuantityWeightForMultiplePr(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("In saveQuantityWeightForMultiplePr====");
        String QuantityWeightDataAsJsonArrayString = request.getParameter("QuantityWeightDataAsJsonArrayString");
        System.out.println("QuantityWeightDataAsJsonArrayString: " + QuantityWeightDataAsJsonArrayString);
        if (QuantityWeightDataAsJsonArrayString != null && !QuantityWeightDataAsJsonArrayString.trim().equalsIgnoreCase("")) {
            JSONArray QualityWeightDataAsJsonArr = new JSONArray(request.getParameter("QuantityWeightDataAsJsonArrayString"));
            System.out.println("QualityWeightDataAsJsonArr: " + QualityWeightDataAsJsonArr);
            System.out.println("QualityWeightDataAsJsonArr Len: " + QualityWeightDataAsJsonArr.length());

            for (int i = 0; i < QualityWeightDataAsJsonArr.length(); i++) {
                JSONObject QualityWeightDataAsJsonObj = QualityWeightDataAsJsonArr.getJSONObject(i);
                System.out.println("QualityWeightDataAsJsonObj: " + QualityWeightDataAsJsonObj.getString("InsertionOrderId"));

                List<QuantityDates> quantityWeightList = getQuantityDatesByInsertionId(QualityWeightDataAsJsonObj.getString("InsertionOrderId"));
                String isDeleted = deleteAllQuantityWeightByInsertionOrderId(quantityWeightList);
                System.out.println("isDeleted: " + isDeleted);

                if (!"".equals(QualityWeightDataAsJsonObj.getString("POQuantity"))) {
                    quantityDates.setPoQuantity(QualityWeightDataAsJsonObj.getString("POQuantity"));
                } else {
                    quantityDates.setPoQuantity("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("POQuantityUnit"))) {
                    quantityDates.setUnitPOQuantity(QualityWeightDataAsJsonObj.getString("POQuantityUnit"));
                } else {
                    quantityDates.setUnitPOQuantity("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("POQuantityInSKU"))) {
                    quantityDates.setPoQuantityInSKU(QualityWeightDataAsJsonObj.getString("POQuantityInSKU"));
                } else {
                    quantityDates.setPoQuantityInSKU("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("POQuantityInSKUUnit"))) {
                    quantityDates.setUnitPOQuantityInSKU(QualityWeightDataAsJsonObj.getString("POQuantityInSKUUnit"));
                } else {
                    quantityDates.setUnitPOQuantityInSKU("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("OrderUnit1"))) {
                    quantityDates.setOrderUnit(QualityWeightDataAsJsonObj.getString("OrderUnit1"));
                } else {
                    quantityDates.setOrderUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("OrderUnit1_Unit"))) {
                    quantityDates.setUnitOrderUnit(QualityWeightDataAsJsonObj.getString("OrderUnit1_Unit"));
                } else {
                    quantityDates.setUnitOrderUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("OrderPriceUnit"))) {
                    quantityDates.setOrderPriceUnit(QualityWeightDataAsJsonObj.getString("OrderPriceUnit"));
                } else {
                    quantityDates.setOrderPriceUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("OrderPriceUnit_Unit"))) {
                    quantityDates.setUnitOrderPriceUnit(QualityWeightDataAsJsonObj.getString("OrderPriceUnit_Unit"));
                } else {
                    quantityDates.setUnitOrderPriceUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("OrderUnit2"))) {
                    quantityDates.setOrderUnitSKU(QualityWeightDataAsJsonObj.getString("OrderUnit2"));
                } else {
                    quantityDates.setOrderUnitSKU("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("OrderUnit2_Unit"))) {
                    quantityDates.setUnitOrderUnitSKU(QualityWeightDataAsJsonObj.getString("OrderUnit2_Unit"));
                } else {
                    quantityDates.setUnitOrderUnitSKU("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("SKU"))) {
                    quantityDates.setSku(QualityWeightDataAsJsonObj.getString("SKU"));
                } else {
                    quantityDates.setSku("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("SKU_Unit"))) {
                    quantityDates.setUnitSKU(QualityWeightDataAsJsonObj.getString("SKU_Unit"));
                } else {
                    quantityDates.setUnitSKU("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("InsertionOrderId"))) {
                    quantityDates.setLineItemNumber(QualityWeightDataAsJsonObj.getString("InsertionOrderId"));
                } else {
                    quantityDates.setLineItemNumber("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("PrItemNumber"))) {
                    quantityDates.setPrItemNumber(QualityWeightDataAsJsonObj.getString("PrItemNumber"));
                } else {
                    quantityDates.setPrItemNumber("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("LinkId"))) {
                    quantityDates.setLinkId(QualityWeightDataAsJsonObj.getString("LinkId"));
                } else {
                    quantityDates.setLinkId("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("NetWeight"))) {
                    quantityDates.setNetWeight(QualityWeightDataAsJsonObj.getString("NetWeight"));
                } else {
                    quantityDates.setNetWeight("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("GrossWeight"))) {
                    quantityDates.setGrossWeight(QualityWeightDataAsJsonObj.getString("GrossWeight"));
                } else {
                    quantityDates.setGrossWeight("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("Volume"))) {
                    quantityDates.setVolume(QualityWeightDataAsJsonObj.getString("Volume"));
                } else {
                    quantityDates.setVolume("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("Points"))) {
                    quantityDates.setPoints(QualityWeightDataAsJsonObj.getString("Points"));
                } else {
                    quantityDates.setPoints("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("NetWeightUnit"))) {
                    quantityDates.setNetWeightUnit(QualityWeightDataAsJsonObj.getString("NetWeightUnit"));
                } else {
                    quantityDates.setNetWeightUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("GrossWeightUnit"))) {
                    quantityDates.setGrossWeightUnit(QualityWeightDataAsJsonObj.getString("GrossWeightUnit"));
                } else {
                    quantityDates.setGrossWeightUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("VolumeUnit"))) {
                    quantityDates.setVolumeUnit(QualityWeightDataAsJsonObj.getString("VolumeUnit"));
                } else {
                    quantityDates.setVolumeUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("PointsUnit"))) {
                    quantityDates.setPointsUnit(QualityWeightDataAsJsonObj.getString("PointsUnit"));
                } else {
                    quantityDates.setPointsUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("NetWeightPerPrice"))) {
                    quantityDates.setNetWeightPerPrice(QualityWeightDataAsJsonObj.getString("NetWeightPerPrice"));
                } else {
                    quantityDates.setNetWeightPerPrice("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("GrossWeightPerPrice"))) {
                    quantityDates.setGrossWeightPerPrice(QualityWeightDataAsJsonObj.getString("GrossWeightPerPrice"));
                } else {
                    quantityDates.setGrossWeightPerPrice("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("VolumePerPrice"))) {
                    quantityDates.setVolumePerPrice(QualityWeightDataAsJsonObj.getString("VolumePerPrice"));
                } else {
                    quantityDates.setVolumePerPrice("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("PointsPerPrice"))) {
                    quantityDates.setPointsPerPrice(QualityWeightDataAsJsonObj.getString("PointsPerPrice"));
                } else {
                    quantityDates.setPointsPerPrice("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("NetWeightOrderUnit"))) {
                    quantityDates.setNetWeightOrderUnit(QualityWeightDataAsJsonObj.getString("NetWeightOrderUnit"));
                } else {
                    quantityDates.setNetWeightOrderUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("GrossWeightOrderUnit"))) {
                    quantityDates.setGrossWeightOrderUnit(QualityWeightDataAsJsonObj.getString("GrossWeightOrderUnit"));
                } else {
                    quantityDates.setGrossWeightOrderUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("VolumeOrderUnit"))) {
                    quantityDates.setVolumeOrderUnit(QualityWeightDataAsJsonObj.getString("VolumeOrderUnit"));
                } else {
                    quantityDates.setVolumeOrderUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("PointsOrderUnit"))) {
                    quantityDates.setPointsOrderUnit(QualityWeightDataAsJsonObj.getString("PointsOrderUnit"));
                } else {
                    quantityDates.setPointsOrderUnit("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("NetWeight2"))) {
                    quantityDates.setNetWeight2(QualityWeightDataAsJsonObj.getString("NetWeight2"));
                } else {
                    quantityDates.setNetWeight2("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("GrossWeight2"))) {
                    quantityDates.setGrossWeight2(QualityWeightDataAsJsonObj.getString("GrossWeight2"));
                } else {
                    quantityDates.setGrossWeight2("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("Volume2"))) {
                    quantityDates.setVolume2(QualityWeightDataAsJsonObj.getString("Volume2"));
                } else {
                    quantityDates.setVolume2("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("Points2"))) {
                    quantityDates.setPoints2(QualityWeightDataAsJsonObj.getString("Points2"));
                } else {
                    quantityDates.setPoints2("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("NetWeightUnit2"))) {
                    quantityDates.setNetWeightUnit2(QualityWeightDataAsJsonObj.getString("NetWeightUnit2"));
                } else {
                    quantityDates.setNetWeightUnit2("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("GrossWeightUnit2"))) {
                    quantityDates.setGrossWeightUnit2(QualityWeightDataAsJsonObj.getString("GrossWeightUnit2"));
                } else {
                    quantityDates.setGrossWeightUnit2("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("VolumeUnit2"))) {
                    quantityDates.setVolumeUnit2(QualityWeightDataAsJsonObj.getString("VolumeUnit2"));
                } else {
                    quantityDates.setVolumeUnit2("");
                }
                if (!"".equals(QualityWeightDataAsJsonObj.getString("PointsUnit2"))) {
                    quantityDates.setPointsUnit2(QualityWeightDataAsJsonObj.getString("PointsUnit2"));
                } else {
                    quantityDates.setPointsUnit2("");
                }
                String msg = saveQuantityDates(quantityDates);
                System.out.println("msg :" + msg);
            }
            return "Yes";
        } else {
            return "No";
        }
    }

    @RequestMapping(value = "/saveEditPoLineLevelData", method = RequestMethod.POST)
    public void saveStandAloneLineItem(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        System.out.println("========Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in saveStandAloneLineItem : " + reqFrom);
        try {
            if (reqFrom.equalsIgnoreCase("saveEditPoLineLevelData")) {
                out = response.getWriter();
                String idext = "";
                System.out.println("ID IN Service ::: " + idext);
                idext = savePRLineSub(request, response);
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

    String savePRLineSub(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("In savePRLineSub++++++++++++++++++++++++++++++++");
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Coming Here in savePRLineSub");
        System.out.println("Paramenter [savePRLineSub]  :::: " + request.getParameter("formdata"));

        JSONObject POLineLevelDataAsJsonObj = new JSONObject(request.getParameter("formdata"));
        String poId = POLineLevelDataAsJsonObj.getString("PoId");
        System.out.println("PoId: " + poId);

        JSONArray PRLineItemArray = POLineLevelDataAsJsonObj.getJSONArray("PRLineItemArray");
        System.out.println("PRLineItemArray size: " + PRLineItemArray.length());
        System.out.println("PRLineItemArray: " + PRLineItemArray.toString());

        JSONArray prItemNumberJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PrItemNumberArray");
        System.out.println("prItemNumberJsonArray size: " + prItemNumberJsonArray.length());

        JSONArray prLinkIdJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PrLinkIdArray");
        System.out.println("prLinkIdJsonArray size: " + prLinkIdJsonArray.length());

        for (int i = 0; i < PRLineItemArray.length(); i++) {
            JSONObject prLineJsonObj = PRLineItemArray.getJSONObject(i);
            System.out.println("prLineJsonObj: " + prLineJsonObj.toString());
            System.out.println("prItemNumberJsonArray[i]: " + prItemNumberJsonArray.get(i));
            String url = webservice_ip + "/BuyerPortalWebServices/getPRLineData.do?searchData=" + poId + "~" + prItemNumberJsonArray.get(i);
            System.out.println("URL STRING :::: " + url);
            ResponseEntity<List<NGBPCmplxPOCreationLineItemPO>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPO>>() {
            });
            List<NGBPCmplxPOCreationLineItemPO> LineItemPOlist = list.getBody();
            System.out.println("LineItemPOlist size :" + LineItemPOlist.size());

            NGBPCmplxPOCreationLineItemPO lineItemPO = parseDataPRLineSub(POLineLevelDataAsJsonObj, LineItemPOlist.get(0), prLineJsonObj);
            System.out.println("Inside Ajax ::: " + lineItemPO.toString());

            String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savePrSub.do?poid=" + poId), lineItemPO, String.class);
        }
        return "";
    }

    NGBPCmplxPOCreationLineItemPO parseDataPRLineSub(JSONObject POLineLevelDataAsJsonObj, NGBPCmplxPOCreationLineItemPO lineItemObj, JSONObject prLineJsonObj) {
        System.out.println("In parseDataPRLineSub++++++++++++++++++++++++++++++++");

        String prItemNumber = prLineJsonObj.optString("ItemNumber");
        String prLinkId = prLineJsonObj.optString("LinkId");
        String packageNumber = prLineJsonObj.optString("PackageNo");

        System.out.println("prItemNumber: " + prItemNumber);
        System.out.println("prLinkId: " + prLinkId);
        System.out.println("packageNumber: " + packageNumber);

        //Invoice========================================================================
        JSONArray POInvoiceDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POInvoiceData");
        System.out.println("POInvoiceDataAsJsonArray: " + POInvoiceDataAsJsonArray.length());

        for (int i = 0; i < POInvoiceDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POInvoiceDataAsJsonArray.getJSONObject(i);
            System.out.println("Invoive object: " + jsonobj.toString());
            if (prItemNumber.equalsIgnoreCase(jsonobj.getString("ItemNumber"))) {
                ngBPCmplxPOCreationInvoice.setInvoiceReceipt(jsonobj.getString("InvoiceReceipt"));
                ngBPCmplxPOCreationInvoice.setFinalInvoice(jsonobj.getString("FinalInvoice"));
                ngBPCmplxPOCreationInvoice.setGrBasedIV(jsonobj.getString("GRBasedIV"));
                ngBPCmplxPOCreationInvoice.setDPCategory(jsonobj.getString("DPCategory"));
                ngBPCmplxPOCreationInvoice.setTaxCode(jsonobj.getString("TaxCode"));
                ngBPCmplxPOCreationInvoice.setDescription("");
                ngBPCmplxPOCreationInvoice.setLinkID(jsonobj.getString("LinkId"));

                lineItemObj.setpOCreationInvoice(ngBPCmplxPOCreationInvoice);
                break;
            }
        }

        //Delivery========================================================================
        JSONArray PODeliveryDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryData");
        System.out.println("PODeliveryDataAsJsonArray: " + PODeliveryDataAsJsonArray.length());

        for (int i = 0; i < PODeliveryDataAsJsonArray.length(); i++) {
            JSONObject json = PODeliveryDataAsJsonArray.getJSONObject(i);
            System.out.println("Delivery object: " + json.toString());

            if (prItemNumber.equalsIgnoreCase(json.getString("ItemNumber"))) {

                if (!"".equals(json.optString("OverDelTol"))) {
                    ngBPCmplxPOCreationDelivery.setOverDelTol(new BigDecimal(json.optString("OverDelTol")));
                } else {
                    ngBPCmplxPOCreationDelivery.setOverDelTol(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("UnderDelTol"))) {
                    ngBPCmplxPOCreationDelivery.setUnderDelTol(new BigDecimal(json.optString("UnderDelTol")));
                } else {
                    ngBPCmplxPOCreationDelivery.setOverDelTol(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("ShippingInstructions"))) {
                    ngBPCmplxPOCreationDelivery.setShippingInstructions(json.optString("ShippingInstructions"));
                } else {
                    ngBPCmplxPOCreationDelivery.setShippingInstructions("");
                }
                if (!"".equals(json.optString("StockType"))) {
                    ngBPCmplxPOCreationDelivery.setStockType(json.optString("StockType"));
                } else {
                    ngBPCmplxPOCreationDelivery.setStockType("");
                }
                if (!"".equals(json.optString("ValuationType"))) {
                    ngBPCmplxPOCreationDelivery.setValuationType(json.optString("ValuationType"));
                } else {
                    ngBPCmplxPOCreationDelivery.setValuationType("");
                }
                if (!"".equals(json.optString("RemShelfLife"))) {
                    ngBPCmplxPOCreationDelivery.setRemShelfLife(json.optString("RemShelfLife"));
                } else {
                    ngBPCmplxPOCreationDelivery.setRemShelfLife("");
                }
                if (!"".equals(json.optString("QAControlLife"))) {
                    ngBPCmplxPOCreationDelivery.setQaControlLife(json.optString("QAControlLife"));
                } else {
                    ngBPCmplxPOCreationDelivery.setQaControlLife("");
                }
                if (!"".equals(json.optString("GrProcTime"))) {
                    ngBPCmplxPOCreationDelivery.setGrProcTime(json.optString("GrProcTime"));
                } else {
                    ngBPCmplxPOCreationDelivery.setGrProcTime("");
                }
                if (!"".equals(json.optString("FstRem_Exped"))) {
                    ngBPCmplxPOCreationDelivery.setFstRemExped(json.optString("FstRem_Exped"));
                } else {
                    ngBPCmplxPOCreationDelivery.setFstRemExped("");
                }
                if (!"".equals(json.optString("SecRem_Exped"))) {
                    ngBPCmplxPOCreationDelivery.setSecRemExped(json.optString("SecRem_Exped"));
                } else {
                    ngBPCmplxPOCreationDelivery.setSecRemExped("");
                }
                if (!"".equals(json.optString("ThrdRem_Exped"))) {
                    ngBPCmplxPOCreationDelivery.setThrdRemExped(json.optString("ThrdRem_Exped"));
                } else {
                    ngBPCmplxPOCreationDelivery.setThrdRemExped("");
                }
                if (!"".equals(json.optString("NoExpend"))) {
                    ngBPCmplxPOCreationDelivery.setNoExpend(json.optString("NoExpend"));
                } else {
                    ngBPCmplxPOCreationDelivery.setNoExpend("");
                }
                if (!"".equals(json.optString("PlDelTime"))) {
                    ngBPCmplxPOCreationDelivery.setPlDelTime(json.optString("PlDelTime"));
                } else {
                    ngBPCmplxPOCreationDelivery.setPlDelTime("");
                }
//            if (!"".equals(json.optString("incoTermsPart2Delivery"))) {
//                ngBPCmplxPOCreationDelivery.setIncoTerms1(json.optString("incoTermsPart2Delivery"));
//            } else {
//                ngBPCmplxPOCreationDelivery.setIncoTerms1("");
//            }
                ngBPCmplxPOCreationDelivery.setLinkID(json.optString("LinkId"));
                lineItemObj.setInvDel(ngBPCmplxPOCreationDelivery);
                break;
            }
        }

        //Delivery Address========================================================================
        JSONArray PODeliveryAddressDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("PODeliveryAddressData");
        System.out.println("PODeliveryAddressDataAsJsonArray: " + PODeliveryAddressDataAsJsonArray.length());

        for (int i = 0; i < PODeliveryAddressDataAsJsonArray.length(); i++) {
            JSONObject json = PODeliveryAddressDataAsJsonArray.getJSONObject(i);
            System.out.println("Delivery Address object: " + json.toString());

            if (prItemNumber.equalsIgnoreCase(json.getString("ItemNo"))) {
//            if (!"".equals(json.optString("Title"))) {
//                ngBPCmplxPOCreationDeliveryAddress.setTitle(json.optString("Title"));
//            } else {
//                ngBPCmplxPOCreationDeliveryAddress.setTitle("");
//            }
                if (!"".equals(json.optString("Name1"))) {
                    ngBPCmplxPOCreationDeliveryAddress.setName1(json.optString("Name1"));
                } else {
                    ngBPCmplxPOCreationDeliveryAddress.setName1("");
                }
                if (!"".equals(json.optString("Name2"))) {
                    ngBPCmplxPOCreationDeliveryAddress.setName2(json.optString("Name2"));
                } else {
                    ngBPCmplxPOCreationDeliveryAddress.setName2("");
                }
                if (!"".equals(json.optString("Street"))) {
                    ngBPCmplxPOCreationDeliveryAddress.setStreet(json.optString("Street"));
                } else {
                    ngBPCmplxPOCreationDeliveryAddress.setStreet("");
                }
                if (!"".equals(json.optString("HouseNo"))) {
                    ngBPCmplxPOCreationDeliveryAddress.setHouseNo(json.optString("HouseNo"));
                } else {
                    ngBPCmplxPOCreationDeliveryAddress.setHouseNo("");
                }
                if (!"".equals(json.optString("PostalCode"))) {
                    ngBPCmplxPOCreationDeliveryAddress.setPostalCode(json.optString("PostalCode"));
                } else {
                    ngBPCmplxPOCreationDeliveryAddress.setPostalCode("");
                }
                if (!"".equals(json.optString("City"))) {
                    ngBPCmplxPOCreationDeliveryAddress.setCity(json.optString("City"));
                } else {
                    ngBPCmplxPOCreationDeliveryAddress.setCity("");
                }
                if (!"".equals(json.optString("Country"))) {
                    ngBPCmplxPOCreationDeliveryAddress.setCountry(json.optString("Country"));
                } else {
                    ngBPCmplxPOCreationDeliveryAddress.setCountry("");
                }

                ngBPCmplxPOCreationDeliveryAddress.setLinkID(json.optString("LinkId"));
                lineItemObj.setpOCreationDel(ngBPCmplxPOCreationDeliveryAddress);
                break;
            }
        }

        //ConditionControl=============================================================
        JSONArray POCondCtrlDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POCondCtrlData");
        System.out.println("POCondCtrlDataAsJsonArray: " + POCondCtrlDataAsJsonArray.length());

        for (int i = 0; i < POCondCtrlDataAsJsonArray.length(); i++) {
            JSONObject json = POCondCtrlDataAsJsonArray.getJSONObject(i);
            System.out.println("Delivery object: " + json.toString());

            if (prItemNumber.equalsIgnoreCase(json.getString("ItemNo"))) {

                if (!"".equals(json.optString("PrintPrice"))) {
                    ngBPCmplxPOCreationConditionControl.setPrintPrice(json.optString("PrintPrice"));
                } else {
                    ngBPCmplxPOCreationConditionControl.setPrintPrice("");
                }
                if (!"".equals(json.optString("EstimatedPrice"))) {
                    ngBPCmplxPOCreationConditionControl.setEstimatedPrice(json.optString("EstimatedPrice"));
                } else {
                    ngBPCmplxPOCreationConditionControl.setEstimatedPrice("");
                }
                ngBPCmplxPOCreationConditionControl.setLinkID(json.optString("LinkId"));
                lineItemObj.setpOCreationcond(ngBPCmplxPOCreationConditionControl);
                break;
            }
        }

        //Confirmation==================================================================
        JSONArray POConfirmationDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POConfirmationData");
        System.out.println("POConfirmationDataAsJsonArray: " + POConfirmationDataAsJsonArray.length());

        for (int i = 0; i < POConfirmationDataAsJsonArray.length(); i++) {
            JSONObject json = POConfirmationDataAsJsonArray.getJSONObject(i);
            System.out.println("Confirmation object: " + json.toString());

            if (prItemNumber.equalsIgnoreCase(json.getString("ItemNo"))) {
                if (!"".equals(json.optString("ConfControl"))) {
                    ngBPCmplxPOCreationConfirmations.setConfControl(json.optString("ConfControl"));
                } else {
                    ngBPCmplxPOCreationConfirmations.setConfControl("");
                }
                if (!"".equals(json.optString("OrderAck"))) {
                    ngBPCmplxPOCreationConfirmations.setOrderAck(json.optString("OrderAck"));
                } else {
                    ngBPCmplxPOCreationConfirmations.setOrderAck("");
                }
                if (!"".equals(json.optString("ConfirmnReq"))) {
                    ngBPCmplxPOCreationConfirmations.setConfirmnReq(json.optString("ConfirmnReq"));
                } else {
                    ngBPCmplxPOCreationConfirmations.setConfirmnReq("");
                }
                if (!"".equals(json.optString("RejectInd"))) {
                    ngBPCmplxPOCreationConfirmations.setRejectInd(json.optString("RejectInd"));
                } else {
                    ngBPCmplxPOCreationConfirmations.setRejectInd("");
                }

                lineItemObj.setpOCreationcon(ngBPCmplxPOCreationConfirmations);
                break;
            }
        }

        //Service========================================================================================
        JSONArray POServiceDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POServiceData");
        System.out.println("POServiceDataAsJsonArray: " + POServiceDataAsJsonArray.length());
        List<NGBPCmplxPOCreationLineItemService> servicesList = new ArrayList();

        for (int i = 0; i < POServiceDataAsJsonArray.length(); i++) {
            JSONObject json = POInvoiceDataAsJsonArray.getJSONObject(i);
            System.out.println("Service object: " + json.toString());
            if (packageNumber.equalsIgnoreCase(json.optString("PrLinePackageNo"))) {
                if (!"".equals(json.optString("LineItemNumber"))) {
                    ngBPCmplxPOCreationLineItemService.setLineItemNumber(json.optString("LineItemNumber"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setLineItemNumber("");
                }
                if (!"".equals(json.optString("ServiceNumber"))) {
                    ngBPCmplxPOCreationLineItemService.setServiceNumber(json.optString("ServiceNumber"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setServiceNumber("");
                }
                if (!"".equals(json.optString("ShortText"))) {
                    ngBPCmplxPOCreationLineItemService.setShortText(json.optString("ShortText"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setShortText("");
                }
                if (!"".equals(json.optString("Quantity"))) {
                    ngBPCmplxPOCreationLineItemService.setQuantity(new BigDecimal(json.optString("Quantity")));
                } else {
                    ngBPCmplxPOCreationLineItemService.setQuantity(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("Unit"))) {
                    ngBPCmplxPOCreationLineItemService.setUnit(json.optString("Unit"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setUnit("");
                }
                if (!"".equals(json.optString("GrossPrice"))) {
                    ngBPCmplxPOCreationLineItemService.setGrossPrice(new BigDecimal(json.optString("GrossPrice")));
                } else {
                    ngBPCmplxPOCreationLineItemService.setGrossPrice(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("Currency"))) {
                    ngBPCmplxPOCreationLineItemService.setCurrency(json.optString("Currency"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setCurrency("");
                }
                if (!"".equals(json.optString("NetPrice"))) {
                    ngBPCmplxPOCreationLineItemService.setNetPrice(new BigDecimal(json.optString("NetPrice")));
                } else {
                    ngBPCmplxPOCreationLineItemService.setNetPrice(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("Edition"))) {
                    ngBPCmplxPOCreationLineItemService.setEdition(json.optString("Edition"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setEdition("");
                }
                if (!"".equals(json.optString("LineItemLongText"))) {
                    ngBPCmplxPOCreationLineItemService.setLineItemLongText(json.optString("LineItemLongText"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setLineItemLongText("");
                }
                if (!"".equals(json.optString("OverfTolerance"))) {
                    ngBPCmplxPOCreationLineItemService.setOverfTolerance(json.optString("OverfTolerance"));
                } else {
                    ngBPCmplxPOCreationLineItemService.setOverfTolerance("");
                }
                ngBPCmplxPOCreationLineItemService.setLinkId(prLinkId);

                servicesList.add(ngBPCmplxPOCreationLineItemService);
            }
        }
        lineItemObj.setLineItemServices(servicesList);

        //Conditions==================================================================
        JSONArray POLineItemConditionDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POLineItemConditionData");
        System.out.println("POLineItemConditionDataAsJsonArray len: " + POLineItemConditionDataAsJsonArray.length());
        List<NGBPCmplxPOCreationLineItemConditions> conditionList = new ArrayList();

        for (int i = 0; i < POLineItemConditionDataAsJsonArray.length(); i++) {
            JSONObject json = POLineItemConditionDataAsJsonArray.getJSONObject(i);
            System.out.println("Line Level Condition object: " + json.toString());

            if (prLinkId.equalsIgnoreCase(json.optString("LinkId"))) {
                ngBPCmplxPOCreationLineItemConditions.setCondType(json.optString("CondType"));
                ngBPCmplxPOCreationLineItemConditions.setCondName(json.optString("CondName"));
                if (!"".equals(json.optString("Amount"))) {
                    ngBPCmplxPOCreationLineItemConditions.setAmount(new BigDecimal(json.optString("Amount")));
                } else {
                    ngBPCmplxPOCreationLineItemConditions.setAmount(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("PerQuant"))) {
                    ngBPCmplxPOCreationLineItemConditions.setPerQuantity(new BigDecimal(json.optString("PerQuant")));
                } else {
                    ngBPCmplxPOCreationLineItemConditions.setPerQuantity(new BigDecimal(0.0));
                }
                ngBPCmplxPOCreationLineItemConditions.setCondPricUnit(json.optString("CondPricUnit"));
                ngBPCmplxPOCreationLineItemConditions.setCurrency(json.optString("Currency"));
                ngBPCmplxPOCreationLineItemConditions.setUoM(json.optString("CondUnit"));
                if (!"".equals(json.optString("CondVal"))) {
                    ngBPCmplxPOCreationLineItemConditions.setCondVal(new BigDecimal(json.optString("CondVal")));
                } else {
                    ngBPCmplxPOCreationLineItemConditions.setCondVal(new BigDecimal(0.0));
                }
                ngBPCmplxPOCreationLineItemConditions.setCurrency1(json.optString("Currency1"));
                if (!"".equals(json.optString("ConditionValue1"))) {
                    ngBPCmplxPOCreationLineItemConditions.setCondVal1(new BigDecimal(json.optString("ConditionValue1")));
                } else {
                    ngBPCmplxPOCreationLineItemConditions.setCondVal1(new BigDecimal(0.0));
                }
                ngBPCmplxPOCreationLineItemConditions.setCondCrncy(json.optString("CondCrncy"));
                ngBPCmplxPOCreationLineItemConditions.setCondDet(json.optString("ConditionDetails"));
                ngBPCmplxPOCreationLineItemConditions.setVendorCode(json.optString("VondorCode"));
                ngBPCmplxPOCreationLineItemConditions.setApplication(json.optString("Application"));
                if (!"".equals(json.optString("ConBaseValue"))) {
                    ngBPCmplxPOCreationLineItemConditions.setCondBaseVal(new BigDecimal(json.optString("ConBaseValue")));
                } else {
                    ngBPCmplxPOCreationLineItemConditions.setCondBaseVal(new BigDecimal(0.0));
                }
                ngBPCmplxPOCreationLineItemConditions.setCondBaseRate(json.optString("ConBaseRate"));
                ngBPCmplxPOCreationLineItemConditions.setAccruals(json.optString("Accurals"));
                ngBPCmplxPOCreationLineItemConditions.setItemNumber(json.optString("ItemNumber"));
                ngBPCmplxPOCreationLineItemConditions.setAccountKey(json.optString("AccountKey"));
                ngBPCmplxPOCreationLineItemConditions.setStNumber(json.optString("CondSTNo"));
                ngBPCmplxPOCreationLineItemConditions.setConditionCount(json.optString("CondCount"));
                ngBPCmplxPOCreationLineItemConditions.setKappl(json.optString("KAPPL"));
                ngBPCmplxPOCreationLineItemConditions.setKvsl1(json.optString("KVSL1"));
                ngBPCmplxPOCreationLineItemConditions.setKvsl2(json.optString("KVSL2"));
                ngBPCmplxPOCreationLineItemConditions.setChangeId(json.optString("CondChangeId"));
                ngBPCmplxPOCreationLineItemConditions.setLinkID(json.optString("LinkId"));

                conditionList.add(ngBPCmplxPOCreationLineItemConditions);
            }
        }
        lineItemObj.setLineItemConditions(conditionList);

        //Account Assignment==================================================================================   
        JSONArray POAccAssDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POAccAssData");
        System.out.println("POAccAssDataAsJsonArray len: " + POAccAssDataAsJsonArray.length());
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accountAssignmentList = new ArrayList();

        for (int i = 0; i < POAccAssDataAsJsonArray.length(); i++) {
            JSONObject json = POAccAssDataAsJsonArray.getJSONObject(i);
            System.out.println("Acc Ass object: " + json.toString());

            if (prItemNumber.equalsIgnoreCase(json.optString("ItmNo"))) {
                if (!"".equals(json.optString("Quantity"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setQuantity(new BigDecimal(json.optString("Quantity")));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setQuantity(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("Percentage"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setPercentage(new BigDecimal(json.optString("Percentage")));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setPercentage(new BigDecimal(0.0));
                }
                if (!"".equals(json.optString("GLAccount"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setGlAccount(json.optString("GLAccount"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setGlAccount("");
                }
                if (!"".equals(json.optString("COArea"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setCoArea(json.optString("COArea"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setCoArea("");
                }
                if (!"".equals(json.optString("CostCenter"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setCostCenter(json.optString("CostCenter"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setCostCenter("");
                }
                if (!"".equals(json.optString("Fund"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setFund(json.optString("Fund"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setFund("");
                }
                if (!"".equals(json.optString("FunctionalArea"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setFunctionalArea(json.optString("FunctionalArea"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setFunctionalArea("");
                }
                if (!"".equals(json.optString("accAsgnFundCenter"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setFundsCentre(json.optString("accAsgnFundCenter"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setFundsCentre("");
                }
                if (!"".equals(json.optString("FundsCentre"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem(json.optString("FundsCentre"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setCommitmentItem("");
                }
                if (!"".equals(json.optString("UnloadingPoint"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setUnloadingPoint(json.optString("UnloadingPoint"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setUnloadingPoint("");
                }
                if (!"".equals(json.optString("Recipient"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setRecipient(json.optString("Recipient"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setRecipient("");
                }
                if (!"".equals(json.optString("AccOrder"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setAccOrder(json.optString("AccOrder"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setAccOrder("");
                }
                if (!"".equals(json.optString("Asset"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setAsset(json.optString("Asset"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setAsset("");
                }
                if (!"".equals(json.optString("WBSElement"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setWbsElement(json.optString("WBSElement"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setWbsElement("");
                }
                if (!"".equals(json.optString("SalesOrder"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setSalesOrder(json.optString("SalesOrder"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setSalesOrder("");
                }
                if (!"".equals(json.optString("ItemNumber"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setItemNumber(json.optString("ItemNumber"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setItemNumber("");
                }
                if (!"".equals(json.optString("DeliverySchedule"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setDeliverySchedule(json.optString("DeliverySchedule"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setDeliverySchedule("");
                }
                if (!"".equals(json.optString("Distribution"))) {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution(json.optString("Distribution"));
                } else {
                    ngBPCmplxPOCreationLineItemPOAccountAssignment.setDistribution("");
                }
                ngBPCmplxPOCreationLineItemPOAccountAssignment.setLinkID(json.optString("LinkID"));

                accountAssignmentList.add(ngBPCmplxPOCreationLineItemPOAccountAssignment);
            }
        }
        lineItemObj.setLineItemAccountAssignment(accountAssignmentList);

        //Service Account Assignment==================================================================================   
        JSONArray POServiceAccAssDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POServiceAccAssData");
        System.out.println("POServiceAccAssDataAsJsonArray len: " + POServiceAccAssDataAsJsonArray.length());
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> serviceAccountAssignmentList = new ArrayList();

        for (int i = 0; i < POServiceAccAssDataAsJsonArray.length(); i++) {
            JSONObject json = POServiceAccAssDataAsJsonArray.getJSONObject(i);
            System.out.println("Service Acc Ass object: " + json.toString());

            if (!"".equals(json.optString("Percentage"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(json.optString("Percentage")));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(0.0));
            }
            if (!"".equals(json.optString("Percentage"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(json.optString("Percentage")));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(0.0));
            }
            if (!"".equals(json.optString("Distribution"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution(json.optString("Distribution"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution("");
            }
            if (!"".equals(json.optString("GLAccount"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setGlAccount(json.optString("GLAccount"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setGlAccount("");
            }
            if (!"".equals(json.optString("CoArea"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCoArea(json.optString("CoArea"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCoArea("");
            }
            if (!"".equals(json.optString("CostCenter"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCostCenter(json.optString("CostCenter"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCostCenter("");
            }
            if (!"".equals(json.optString("Fund"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund(json.optString("Fund"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund("");
            }
            if (!"".equals(json.optString("FunctionalArea"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFunctionalArea(json.optString("FunctionalArea"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFunctionalArea("");
            }
            if (!"".equals(json.optString("FundsCentre"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFundsCentre(json.optString("FundsCentre"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFundsCentre("");
            }
            if (!"".equals(json.optString("CommitmentItem"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCommitmentItem(json.optString("CommitmentItem"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCommitmentItem("");
            }
            if (!"".equals(json.optString("Acc_Order"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccOrder(json.optString("Acc_Order"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccOrder("");
            }
            if (!"".equals(json.optString("Acc_Asset"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccAsset(json.optString("Acc_Asset"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccAsset("");
            }
            if (!"".equals(json.optString("Acc_WBSElement"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccWBSElement(json.optString("Acc_WBSElement"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccWBSElement("");
            }
            if (!"".equals(json.optString("SalesOrder"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSalesOrder(json.optString("SalesOrder"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSalesOrder("");
            }
            if (!"".equals(json.optString("DeliverySchedule"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDeliverySchedule(json.optString("DeliverySchedule"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDeliverySchedule("");
            }
            if (!"".equals(json.optString("Distribution"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution(json.optString("Distribution"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution("");
            }
            if (!"".equals(json.optString("ActivityNumber"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setActivityNumber(json.optString("ActivityNumber"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund("");
            }
            if (!"".equals(json.optString("ItemNumber"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber(json.optString("ItemNumber"));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber("");
            }
            if (!"".equals(json.optString("NETVALUE"))) {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetvalue(new BigDecimal(json.optString("NETVALUE")));
            } else {
                ngBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetvalue(new BigDecimal(0.0));
            }

            serviceAccountAssignmentList.add(ngBPCmplxPOCreationLineItemPOAccountAssignmentValues);
        }
//        lineItemObj.setLineItemAccountAssignment(serviceAccountAssignmentList);

        return lineItemObj;
    }

    @RequestMapping(value = "/poajaxrequest", method = RequestMethod.GET)
    public void doService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        System.out.println("========PO Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);

        if (reqFrom.equalsIgnoreCase("FindPOInvoiceDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPOInvoiceDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Invoice> invoiceList = getInvoiceByInsertionId(InsertionOrderId);
                JSONArray jsonInvoiceArr = new JSONArray(invoiceList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindInvoiceByLinkid")) {
            try {
                System.out.println("FindInvoiceByLinkid");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid: " + linkid);
                List<NGBPCmplxPOCreationInvoice> invoiceList = getInvoiceByLinkId(linkid);
                System.out.println("invoiceList size: " + invoiceList.size());
                JSONArray jsonInvoiceArr = new JSONArray(invoiceList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindPODeliveryDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPODeliveryDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Delivery> deliveryList = getDeliveryByInsertionId(InsertionOrderId);
                JSONArray jsonInvoiceArr = new JSONArray(deliveryList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindPODeliveryAddressDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPODeliveryAddressDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<DeliveryAddress> addressList = getDeliveryAddressByInsertionId(InsertionOrderId);
                JSONArray jsonInvoiceArr = new JSONArray(addressList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindPOTextsDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPOTextsDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Text> textsList = getTextsByInsertionId(InsertionOrderId);
                JSONArray jsonInvoiceArr = new JSONArray(textsList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindPOConfirmationsDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPOConfirmationsDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Confirmations> confirmationList = getConfirmationsByInsertionId(InsertionOrderId);
                JSONArray jsonInvoiceArr = new JSONArray(confirmationList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindPOCondCtrlDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPOCondCtrlDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<ConditionControl> conditionList = getConditionCondrolByInsertionId(InsertionOrderId);
                JSONArray jsonInvoiceArr = new JSONArray(conditionList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindPOQuantityWeightsDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPOQuantityWeightsDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<QuantityDates> quantityList = getQuantityDatesByInsertionId(InsertionOrderId);
                JSONArray jsonInvoiceArr = new JSONArray(quantityList);
                out.println(jsonInvoiceArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindPOHeaderTextDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPOHeaderTextDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<HeaderText> headerTextList = getHeaderTextByInsertionId(InsertionOrderId);
                JSONArray jsonHeaderTextArr = new JSONArray(headerTextList);
                out.println(jsonHeaderTextArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindAllMasterPartnerFunctions")) {
            try {
                System.out.println("FindAllMasterPartnerFunctions");
                out = response.getWriter();
                List<MasterPartnerFunction> partnerFunctionlist = getAllMasterPartnerFunctions();
                JSONArray jsonPartnerFunctionArr = new JSONArray(partnerFunctionlist);
                out.println(jsonPartnerFunctionArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindVendorByCompanyCode")) {
            try {
                System.out.println("FindVendorByCompanyCode");
                out = response.getWriter();
                String companyCode = request.getParameter("companyCode");
                System.out.println("companyCode: " + companyCode);
                List<MasterVendor> vendorList = findVendorByCompanyCode(companyCode);
                JSONArray jsonVendorArr = new JSONArray(vendorList);
                out.println(jsonVendorArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindAllVendorFromVendorMaster")) {
            try {
                System.out.println("FindAllVendorFromVendorMaster");
                out = response.getWriter();
                List<MasterVendor> vendorList = getAllVendorMaster();
                System.out.println("vendorList Size :" + vendorList.size());
                JSONArray jsonVendorArr = new JSONArray(vendorList);
                out.println(jsonVendorArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindLineItemCustomerData")) {
            try {
                System.out.println("FindLineItemCustomerData");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<CustomerData> customerDataList = getCustomerDataByInsertionId(InsertionOrderId);
                JSONArray jsonCustomerDataArr = new JSONArray(customerDataList);
                out.println(jsonCustomerDataArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindPOLimitDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPOLimitDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Limits> limitsList = findLimitsByLineItemNumber(InsertionOrderId);
                JSONArray jsonLimitsArr = new JSONArray(limitsList);
                out.println(jsonLimitsArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getNGBPCmplxPOCreationLineItemPOAccountAssignment")) {
            try {
                System.out.println("getNGBPCmplxPOCreationLineItemPOAccountAssignment in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid in poajax: " + linkid);
                List<NGBPCmplxPOCreationLineItemPOAccountAssignment> AcccountAsgnList = purchaseOrderWS.getAccountAssignmentByLinkId(linkid);
                System.out.println("AcccountAsgnList Length :" + AcccountAsgnList.size());
                JSONArray jsonArr = new JSONArray(AcccountAsgnList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumber")) {
            try {
                System.out.println("getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumber in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                String serviceLineItemNumber = request.getParameter("serviceLineItemNumber");
                String poid = request.getParameter("PoId");
                System.out.println("linkid in poajax: " + linkid);
                System.out.println("serviceLineItemNumber in poajax: " + serviceLineItemNumber);
                System.out.println("Poid in poajax: " + poid);
                List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgnList = getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumberAndPoId(linkid, serviceLineItemNumber, poid);
                System.out.println("AcccountAsgnList Length :" + accAsgnList.size());
                JSONArray jsonArr = new JSONArray(accAsgnList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getServiceByLinkid")) {
            try {
                System.out.println("getServiceByLinkid in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                String poid = request.getParameter("PoId");
                System.out.println("linkid in getServiceByLinkidAndPoId: " + linkid);
                List<NGBPCmplxPOCreationLineItemService> accAsgnList = getServiceByLinkid(linkid);
                System.out.println("AcccountAsgnList Length :" + accAsgnList.size());
                JSONArray jsonArr = new JSONArray(accAsgnList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findPOCreationApproverDetailsByProcInstId")) {
            try {
                out = response.getWriter();
                System.out.println("findPOCreationApproverDetailsByProcInstId");
                String procInstId = request.getParameter("ProcInstId");
                System.out.println("procInstId :" + procInstId);

                List<NGCmplxPOCreationApproverDetails> approverList = findPOCreationApproverDetailsByProcInstId(procInstId);
                System.out.println("approverList size: " + approverList.size());

                String isPendingForApproval = "Yes";
                for (NGCmplxPOCreationApproverDetails approver : approverList) {
                    if (approver.getApproverStatus() != null && !approver.getApproverStatus().equals("To be Approved")) {
                        isPendingForApproval = "No";
                    }
                }
                System.out.println("isPendingForApproval: " + isPendingForApproval);
                jObj.put("isPendingForApproval", isPendingForApproval);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindPODeliveryScheduleDataByInsertionOrderIdOfPR")) {
            try {
                System.out.println("FindPODeliveryScheduleDataByInsertionOrderIdOfPR");
                out = response.getWriter();
                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<DeliverySchedule> delSchList = getDeliveryScheduleByInsertionId(InsertionOrderId);
                JSONArray jsonDelSchArr = new JSONArray();
                for (DeliverySchedule obj : delSchList) {
                    JSONObject jsonObj = new JSONObject();

                    jsonObj.put("deliveryDateCategory", obj.getDeliveryDateCategory());
                    jsonObj.put("scheduledQuantity", obj.getScheduledQuantity());
                    jsonObj.put("time", obj.getTime());
                    jsonObj.put("purchaseRequestNumber", obj.getPurchaseRequestNumber());
                    jsonObj.put("requestItemNumber", obj.getRequestItemNumber());
                    jsonObj.put("prItemNumber", obj.getPrItemNumber());
                    jsonObj.put("linkId", obj.getLinkId());
                    jsonObj.put("delvDateByCat", obj.getDeliveryDateByCategory());
                    jsonObj.put("grQuantity", obj.getGrQty());
                    jsonObj.put("openQuantity", obj.getOpenQuantity());

                    if (obj.getDeliveryDateCategory() != null && obj.getDeliveryDateCategory().equals("D")) {
                        if (obj.getDeliveryDate() != null) {
                            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                            String deliveryDate = df.format(obj.getDeliveryDate());
                            System.out.println("deliveryDate: " + deliveryDate);
                            jsonObj.put("deliveryDate", deliveryDate);
                        }
                    } else {
                        jsonObj.put("deliveryDate", obj.getDeliveryDateByCategory());
                    }

                    if (obj.getStatisticalDeliveryDate() != null) {
                        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                        String deliveryDate = df.format(obj.getStatisticalDeliveryDate());
                        System.out.println("deliveryDate: " + deliveryDate);
                        jsonObj.put("statisticalDeliveryDate", deliveryDate);
                    } else {
                        jsonObj.put("statisticalDeliveryDate", "");
                    }

                    jsonDelSchArr.put(jsonObj);
                }
                out.println(jsonDelSchArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateFinalizedVendorPoDetails")) {
            try {
                System.out.println("UpdateFinalizedVendorPoDetails");
                out = response.getWriter();

                String RfqId = request.getParameter("RfqId");
                String VendorId = request.getParameter("VendorId");
                String PrIds = request.getParameter("PrIds");
                String PoNumber = request.getParameter("PoNumber");
                String VendorFinalizationTableDataArrayAsJsonString = request.getParameter("VendorFinalizationTableDataArrayAsJsonString");
                String VendorFinalizationTablePrDataArrayAsJsonString = request.getParameter("VendorFinalizationTablePrDataArrayAsJsonString");

                System.out.println("RfqId: " + RfqId);
                System.out.println("VendorId: " + VendorId);
                System.out.println("PrIds: " + PrIds);
                System.out.println("PoNumber: " + PoNumber);
                System.out.println("VendorFinalizationTableDataArrayAsJsonString: " + VendorFinalizationTableDataArrayAsJsonString);
                System.out.println("VendorFinalizationTablePrDataArrayAsJsonString: " + VendorFinalizationTablePrDataArrayAsJsonString);

                JSONArray VendorFinalizationTableDataArrayAsJsonArray = new JSONArray(VendorFinalizationTableDataArrayAsJsonString);
                System.out.println("VendorFinalizationTableDataArrayAsJsonArray: " + VendorFinalizationTableDataArrayAsJsonArray.length());

                JSONArray VendorFinalizationTablePrDataArrayAsJsonArray = new JSONArray(VendorFinalizationTablePrDataArrayAsJsonString);
                System.out.println("VendorFinalizationTablePrDataArrayAsJsonArray: " + VendorFinalizationTablePrDataArrayAsJsonArray.length());

                WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(RfqId));
                List<SupplierHeader> supplierHeaderList = findSupplierHeaderByRfqid(Integer.parseInt(RfqId));
                System.out.println("supplierHeaderList size: " + supplierHeaderList.size());

                String supplierHeaderIds = "";
                for (int i = 0; i < supplierHeaderList.size(); i++) {
                    if (i == supplierHeaderList.size() - 1) {
                        supplierHeaderIds = supplierHeaderIds + supplierHeaderList.get(i).getId();
                    } else {
                        supplierHeaderIds = supplierHeaderIds + supplierHeaderList.get(i).getId() + ",";
                    }
                }
                System.out.println("supplierHeaderIds: " + supplierHeaderIds);
                List<SupplierLineitem> supplierRfqLineItemList = findSupplierRfqLineItemByMultipleSupplierHeaderId(supplierHeaderIds);
                System.out.println("supplierRfqLineItemList size: " + supplierRfqLineItemList.size());

                Date today = new Date();

                for (int i = 0; i < VendorFinalizationTableDataArrayAsJsonArray.length(); i++) {
                    JSONObject VendorFinalizationTableRowAsJsonObject = VendorFinalizationTableDataArrayAsJsonArray.getJSONObject(i);
                    JSONObject VendorFinalizationTablePrRowAsJsonObject = VendorFinalizationTablePrDataArrayAsJsonArray.getJSONObject(i);

                    int vendorId = VendorFinalizationTableRowAsJsonObject.getInt("vendorId");
                    int insertionOrderId = VendorFinalizationTableRowAsJsonObject.getInt("insertionOrderId");
                    String quantity = VendorFinalizationTableRowAsJsonObject.getString("quantity");
                    String comments = VendorFinalizationTableRowAsJsonObject.getString("comments");
                    String whyThisVendor = VendorFinalizationTableRowAsJsonObject.getString("whyThisVendor");

                    String prNumber = VendorFinalizationTablePrRowAsJsonObject.getString("prNumber");
                    String prItemNumber = VendorFinalizationTablePrRowAsJsonObject.getString("prItemNumber");

                    System.out.println("vendorId: " + vendorId);
                    System.out.println("insertionOrderId: " + insertionOrderId);
                    System.out.println("quantity: " + quantity);
                    System.out.println("comments: " + comments);
                    System.out.println("whyThisVendor: " + whyThisVendor);
                    System.out.println("prNumber: " + prNumber);
                    System.out.println("prItemNumber: " + prItemNumber);

                    VendorDetails vendorObj = findVendorById(vendorId);
                    NewgenPRLineItem prObj = getPrDetailsById(insertionOrderId);

                    finalizedRfq.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    finalizedRfq.setNgBpVendordetailsId(vendorObj);
                    finalizedRfq.setNgBpNewgenPRLineItemId(prObj);
                    finalizedRfq.setFinalizedDate(today);
                    finalizedRfq.setComments(comments);
                    finalizedRfq.setWhyThisVendor(whyThisVendor);
                    finalizedRfq.setQuantity(quantity);
                    finalizedRfq.setIsPoCreated("Yes");
                    finalizedRfq.setPoNumber(PoNumber);
                    finalizedRfq.setPrNumber(prNumber);
                    finalizedRfq.setPrItemNumber(prItemNumber);

                    saveFinalizedRfq(finalizedRfq);

                    // Update Quantity in SupplierLineItem Table For PO
                    for (SupplierLineitem supplierLineItemObj : supplierRfqLineItemList) {
                        if (supplierLineItemObj.getNgBpNewgenPRLineItemId().getInsertionOrderId() == insertionOrderId) {
                            String remainingQuantityForPo = supplierLineItemObj.getRemainingQuantityForPo();
                            System.out.println("remainingQuantityForPo: " + remainingQuantityForPo);

                            int remainingQty = 0;
                            if (remainingQuantityForPo == null) {
                                remainingQty = Integer.parseInt(supplierLineItemObj.getQuantity()) - Integer.parseInt(quantity);
                            } else {
                                remainingQty = Integer.parseInt(supplierLineItemObj.getRemainingQuantityForPo()) - Integer.parseInt(quantity);
                            }
                            System.out.println("remainingQty");
                            supplierLineItemObj.setRemainingQuantityForPo(remainingQty + "");
                            updateSupplierLineitem(supplierLineItemObj);
                            System.out.println("Updated SupplierLineitem");
                        }
                    }
                }

                jObj.put("Result", "Success");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdatePrLineAfterPoCreation")) {
            try {
                System.out.println("UpdatePrLineAfterPoCreation");
                out = response.getWriter();
                String insertionOrderIds = request.getParameter("insertionOrderIds");
                System.out.println("insertionOrderIds: " + insertionOrderIds);

                String status = request.getParameter("status");
                System.out.println("status: " + status);

                List<NewgenPRLineItem> prList = findByMultipleNewgenPRLineItemId(insertionOrderIds);
                System.out.println("prList size: " + prList.size());

                for (NewgenPRLineItem prLineObj : prList) {
                    prLineObj.setBpStatus(status);
                    updatePrLineItemNG(prLineObj);
                }
                jObj.put("Result", "Success");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);

            }
        } else if (reqFrom.equalsIgnoreCase("FindLineItemComponentData")) {
            try {
                System.out.println("FindLineItemComponentData");
                out = response.getWriter();
                String lineItemNumber = request.getParameter("lineItemNumber");
                System.out.println("lineItemNumber: " + lineItemNumber);
                List<Component> componentList = getComponentByLineItemNumber(lineItemNumber);
                JSONArray jsonCustomerDataArr = new JSONArray(componentList);
                out.println(jsonCustomerDataArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindProfitabilitySegmentByPRItemNumber")) {
            try {
                System.out.println("FindProfitabilitySegmentByPRItemNumber");
                out = response.getWriter();
                String lineItemNumber = request.getParameter("lineItemNumber");
                System.out.println("lineItemNumber: " + lineItemNumber);
                List<ProfitabilitySegment> profitabilitySegmentList = purchaseOrderWS.getProfitabilitySegmentByLineItemNumber(lineItemNumber);
                JSONArray jsonProfitabilitySegmentDataArr = new JSONArray(profitabilitySegmentList);
                out.println(jsonProfitabilitySegmentDataArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getNGBPCmplxPOCreationLineItemComponentByLinkId")) {
            try {
                JSONObject ObjComponent = new JSONObject();
                JSONArray jArraComponent = new JSONArray();
                System.out.println("getNGBPCmplxPOCreationLineItemComponentByLinkId in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid in getNGBPCmplxPOCreationLineItemComponentByLinkId: " + linkid);
                List<NGBPCmplxPOCreationLineItemComponent> componentList = standalonePoWS.getNGBPCmplxPOCreationLineItemComponentByLinkId(linkid);
                System.out.println("list Length :" + componentList.size());
                if (!componentList.isEmpty()) {
                    for (NGBPCmplxPOCreationLineItemComponent componentObj : componentList) {
                        if (componentObj.getRequirementDate() != null) {
                            SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                            String strDate = formatter.format(componentObj.getRequirementDate());
                            ObjComponent.put("requirementDate", strDate);
                        } else {
                            ObjComponent.put("requirementDate", "");
                        }
                        ObjComponent.put("materialCode", componentObj.getMaterialCode());
                        ObjComponent.put("description", componentObj.getDescription());
                        ObjComponent.put("plant", componentObj.getPlant());
                        ObjComponent.put("unit", componentObj.getUnit());
                        ObjComponent.put("quantity", componentObj.getQuantity());
                        ObjComponent.put("productStorageLocation", componentObj.getProductStorageLocation());
                        ObjComponent.put("supplyArea", componentObj.getSupplyArea());
                        ObjComponent.put("prItemNumber", componentObj.getPrItemNumber());
                        ObjComponent.put("qtyIsFixed", componentObj.getQtyIsFixed());
                        ObjComponent.put("distributionKey", componentObj.getDistributionKey());
                        ObjComponent.put("batch", componentObj.getBatch());
                        ObjComponent.put("storageLocation", componentObj.getStorageLocation());
                        ObjComponent.put("linkId", componentObj.getLinkId());
                        if (componentObj.getLatestRequirementDate() != null) {
                            SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                            String strDate = formatter.format(componentObj.getLatestRequirementDate());
                            ObjComponent.put("latestRequirementDate", strDate);
                        } else {
                            ObjComponent.put("latestRequirementDate", "");
                        }
                        jArraComponent.put(ObjComponent);
                    }
                }
//                JSONArray jsonArr = new JSONArray(list);
                out.println(jArraComponent);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getDeliveryScheduleByLinkId")) {
            try {

                JSONObject Obj = new JSONObject();
                System.out.println("getDeliveryScheduleByLinkId in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid in getDeliveryScheduleByLinkId: " + linkid);
                List<NGBPCmplxPOCreationDelverySchedule> list = getDeliveryScheduleByLinkId(linkid);
                System.out.println("list Length on NGBPCmplxPOCreationDelverySchedule :" + list.size());
                JSONArray jArraDeliverySchedule = new JSONArray();
                for (NGBPCmplxPOCreationDelverySchedule deliveryObj : list) {
                    JSONObject ObjDeliverySchedule = new JSONObject();

                    Date reqDate = deliveryObj.getDelDate();
                    if (deliveryObj.getDelDateCatg() != null && deliveryObj.getDelDateCatg().equals("D")) {
                        if (reqDate != null) {
                            System.out.println("Delivery Date:" + reqDate);
                            SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                            String strDate = formatter.format(reqDate);
                            System.out.println("Delivery Date after Formate Change :" + strDate);
                            ObjDeliverySchedule.put("DELIVERY_DATE", strDate);
                        } else {
                            ObjDeliverySchedule.put("DELIVERY_DATE", "");
                        }
                    } else {
                        ObjDeliverySchedule.put("DELIVERY_DATE", deliveryObj.getDeliveryDateByCategory());
                    }
                    Date stDelDate = deliveryObj.getStatisticalDeliveryDate();
                    if (stDelDate != null) {
                        System.out.println("Statistical Del Date:" + stDelDate);
                        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                        String strstDelDate = formatter.format(stDelDate);
                        System.out.println("Delivery Date after Formate Change :" + strstDelDate);
                        ObjDeliverySchedule.put("stDelDate", strstDelDate);
                    } else {
                        ObjDeliverySchedule.put("stDelDate", "");
                    }

                    ObjDeliverySchedule.put("DELIVERY_DATE_CAT", deliveryObj.getDelDateCatg());
                    ObjDeliverySchedule.put("PURCHASE_REQUEST_NUMBER", deliveryObj.getPRNumber());
                    ObjDeliverySchedule.put("REQUEST_ITEM_NUMBER", deliveryObj.getPRNumber());
                    ObjDeliverySchedule.put("SCHEDULED_QUANTITY", deliveryObj.getScheduledQuantity());
                    ObjDeliverySchedule.put("TIME", deliveryObj.getDelTime());
                    ObjDeliverySchedule.put("LINKID", deliveryObj.getLinkID());
                    ObjDeliverySchedule.put("GR_QUANTITY", deliveryObj.getGrQty());
                    ObjDeliverySchedule.put("OPEN_QUANTITY", deliveryObj.getOpenQuantity());
                    ObjDeliverySchedule.put("SCH_LINE", deliveryObj.getSchLine());
                    jArraDeliverySchedule.put(ObjDeliverySchedule);

                }
                Obj.put("jArraDeliverySchedule", jArraDeliverySchedule);
//                JSONArray jsonArr = new JSONArray(list);
                out.println(Obj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getConditionsByLinkId")) {
            try {
                System.out.println("getConditionsByLinkId in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid in getConditionsByLinkId: " + linkid);
                List<NGBPCmplxPOCreationLineItemConditions> list = getNGBPCmplxPOCreationConditionsByLinkId(linkid);
                System.out.println("list Length :" + list.size());
                JSONArray jsonArr = new JSONArray(list);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getLimitAccountAssignemntByLinkId")) {
            try {
                System.out.println("getLimitAccountAssignemntByLinkId in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid in getLimitAccountAssignemntByLinkId: " + linkid);
                List<NGBPCmplxPOCreationLimitsAccountAssignment> list = purchaseOrderWS.getLimitAccountAssignemntByLinkId(linkid);
                System.out.println("list Length :" + list.size());
                JSONArray jsonArr = new JSONArray(list);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange")) {
            try {
                System.out.println("getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange in poajax");
                out = response.getWriter();
                String linkid = request.getParameter("linkid");
                System.out.println("linkid in getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange : " + linkid);
                List<NGBPCmplxPOCreationLineItemPOAccountAssignment> AcccountAsgnList = getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange(linkid);
                System.out.println("AcccountAsgnList Length :" + AcccountAsgnList.size());
                JSONArray jsonArr = new JSONArray(AcccountAsgnList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindAllMasterQAControl")) {
            try {
                System.out.println("FindAllMasterQAControl");
                out = response.getWriter();
                List<MasterQAControl> qaCtrlList = getAllMasterQAControl();
                JSONArray jsonPartnerFunctionArr = new JSONArray(qaCtrlList);
                out.println(jsonPartnerFunctionArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("FindAllMasterCustomerSegment")) {
            try {
                System.out.println("FindAllMasterCustomerSegment");
                out = response.getWriter();
                List<MasterCustomerSegment> custSeglist = getAllMasterCustomerSegment();
                JSONArray jsonPartnerFunctionArr = new JSONArray(custSeglist);
                out.println(jsonPartnerFunctionArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindExchangeRateByFromCurrencyAndToCurrency")) {
            try {
                System.out.println("FindExchangeRateByFromCurrencyAndToCurrency");
                out = response.getWriter();
                String fromCurrency = request.getParameter("fromCurrency");
                String toCurrency = request.getParameter("toCurrency");
//                List<MasterExchangeRate> list = findExchangeRateByFromCurrencyAndToCurrency(fromCurrency, toCurrency);
                String ExchangeRate = purchaseOrderWS.findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType(fromCurrency, toCurrency);
                System.out.println("MasterExchangeRate List Size: " + ExchangeRate);
                if (ExchangeRate.isEmpty()) {
                    jObj.put("Result", "NotFound");
                } else {
//                    MasterExchangeRate obj = list.get(0);
                    jObj.put("Result", "Found");
                    jObj.put("ExchangeRate", ExchangeRate);
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getAllPurchaseOrg")) {
            try {
                System.out.println("getAllPurchaseOrg");
                out = response.getWriter();
                List<MasterPurchaseOrg> custSeglist = getMasterPurchaseOrg();
                JSONArray jsonPurchOrgArr = new JSONArray(custSeglist);
                out.println(jsonPurchOrgArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindProfitabilitySegmentByLinkId")) {
            try {
                System.out.println("FindProfitabilitySegmentByLinkId");
                out = response.getWriter();
                String linkId = request.getParameter("linkId");
                System.out.println("linkId in FindProfitabilitySegmentByLinkId: " + linkId);
                List<NGBPCmplxPOCreationLineItemProfitabilitySegment> profitabilitySegmentList = FindProfitabilitySegmentByLinkId(linkId);
                JSONArray jsonProfitabilitySegmentDataArr = new JSONArray(profitabilitySegmentList);
                out.println(jsonProfitabilitySegmentDataArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getPONumber")) {
            try {
                System.out.println("getPONumber");
                out = response.getWriter();
                String id = request.getParameter("id");
                System.out.println("ID IN getPONumber ::: " + id);
                NGBPExtPOCreation obj = getNGBPExtPOCreationById(id);
                System.out.println("POnumber IN getPONumber ::: " + obj.getPurchaseOrderNumber());
                jObj.put("PONUMBER", obj.getPurchaseOrderNumber());
                jObj.put("headerConditionsNew", obj.getHeaderConditionsNew());
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getNGBPCmplxPOCreationLineItemConditionsByLinkId")) {
            try {
                System.out.println("getNGBPCmplxPOCreationLineItemConditionsByLinkId");
                out = response.getWriter();
                String linkId = request.getParameter("linkId");
                System.out.println("linkId in getNGBPCmplxPOCreationLineItemConditionsByLinkId: " + linkId);
                List<NGBPCmplxPOCreationLineItemConditions> conditionList = getNGBPCmplxPOCreationConditionsByLinkId(linkId);
                System.out.println("conditionList :" + conditionList.size());
                if (!conditionList.isEmpty()) {
                    for (NGBPCmplxPOCreationLineItemConditions conditionObj : conditionList) {
                        JSONObject Obj = new JSONObject();
//                        System.out.println("Condition Type :" + conditionObj.getCondType());
                        Obj.put("CONDITION_TYPE", conditionObj.getCondType() == null ? "" : conditionObj.getCondType());
                        Obj.put("NAME", conditionObj.getCondName() == null ? "" : conditionObj.getCondName());
                        Obj.put("AMOUNT", conditionObj.getAmount() == null ? "" : conditionObj.getAmount());
                        Obj.put("PER", conditionObj.getPerQuantity() == null ? "" : conditionObj.getPerQuantity());
                        Obj.put("CONDITION_PRICING_UNIT", conditionObj.getCondPricUnit() == null ? "" : conditionObj.getCondPricUnit());
                        Obj.put("CURRENCY1", conditionObj.getCurrency() == null ? "" : conditionObj.getCurrency());
                        Obj.put("CURRENCY2", conditionObj.getCurrency1() == null ? "" : conditionObj.getCurrency1());
                        Obj.put("UOM", conditionObj.getUoM() == null ? "" : conditionObj.getUoM());
                        Obj.put("CONDITION_VALUE1", conditionObj.getCondVal() == null ? "" : conditionObj.getCondVal());
                        Obj.put("CONDITION_VALUE2", conditionObj.getCondVal1() == null ? "" : conditionObj.getCondVal1());
                        Obj.put("CONDITION_CURRENCY", conditionObj.getCondCrncy() == null ? "" : conditionObj.getCondCrncy());
                        Obj.put("CONDITION_DETAILS", conditionObj.getCondDet() == null ? "" : conditionObj.getCondDet());
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
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getAllAccountAssignmentCategory")) {
            try {
                System.out.println("getAllAccountAssignmentCategory");
                out = response.getWriter();
                List<AccountAssignmentCategoryMaster> accountList = getAllAccountAssignmentCategory();
                JSONArray jsonAccAsgnArr = new JSONArray(accountList);
                out.println(jsonAccAsgnArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getAllItemCategory")) {
            try {
                System.out.println("getAllItemCategory in POAjax");
                out = response.getWriter();
                List<MasterItemCategory> itemCategList = getAllItemCategory();
                JSONArray jsonArr = new JSONArray(itemCategList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getPlantMaster")) {
            try {
                System.out.println("getPlantMaster in POAjax");
                out = response.getWriter();
                List<MasterPlant> masterPlantList = getAllMasterPlant();
                JSONArray jsonArr = new JSONArray(masterPlantList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getStorageLocationMaster")) {
            try {
                System.out.println("getStorageLocationMaster in POAjax");
                out = response.getWriter();
                List<MasterLocation> masterLocationList = getMasterLocation();
                JSONArray jsonArr = new JSONArray(masterLocationList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getDepartmentMaster")) {
            try {
                System.out.println("getDepartmentMaster in POAjax");
                out = response.getWriter();
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
                String username = buyer.getUsername();
                System.out.println("username in getDepartmentMaster :" + username);
//                List<MasterDepartment> masterDeptList = getMasterDepartment();
                List<MasterDepartment> masterDeptList = standalonePoWS.getMasterDepartmentByUsername(username);
                JSONArray jsonArr = new JSONArray(masterDeptList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findAllMasterCompanyCode")) {
            try {
                System.out.println("findAllMasterCompanyCode in POAjax");
                out = response.getWriter();
                List<MasterCompanyCode> masterCompanyCodeList = findAllMasterCompanyCode();
                JSONArray jsonArr = new JSONArray(masterCompanyCodeList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveServiceTabAccAsgnTblData")) {
            try {
                out = response.getWriter();
                String lineItemNumber = null;
                String serviceLineItemNumber = null;
                String linkid = null;
                String linkNumber = null;
                String PoFrom = null;
//                String LineItemNumber = null;
                System.out.println("saveServiceTabAccAsgnTblData");

                String serviceAccAsgnTblRowString = request.getParameter("serviceAccAsgnTblRowString");

                System.out.println("serviceAccAsgnTblRowString :" + serviceAccAsgnTblRowString);

                String[] serviceAccAsgnTblRowArr = serviceAccAsgnTblRowString.split("#");

                System.out.println("serviceAccAsgnTblRowArr length :" + serviceAccAsgnTblRowArr.length);
                for (int i = 0; i < serviceAccAsgnTblRowArr.length; i++) {
                    System.out.println("serviceAccAsgnTblRow values :" + serviceAccAsgnTblRowArr[i]);
                }
                String[] serviceAccAsgnVal = null;
                for (String serviceAccAsgnTblRow : serviceAccAsgnTblRowArr) {
                    System.out.println("Bittu :");
                    System.out.println("serviceAccAsgnTblRow values :" + serviceAccAsgnTblRow);
                    serviceAccAsgnVal = serviceAccAsgnTblRow.split(",");
                }
                List<ServiceAccountAssignment> accAsgnList = getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceAccAsgnVal[11], serviceAccAsgnVal[10]);

                if (!accAsgnList.isEmpty()) {
                    deleteAllFromServiceAccountAssignment(accAsgnList);
                }
                for (String serviceAccAsgnTblRow : serviceAccAsgnTblRowArr) {
                    System.out.println("serviceAccAsgnTblRow values 12:" + serviceAccAsgnTblRow);
                    String[] serviceAccAsgnTblVal = serviceAccAsgnTblRow.split(",");
                    lineItemNumber = serviceAccAsgnTblVal[10];
                    serviceLineItemNumber = serviceAccAsgnTblVal[11];
                    linkid = serviceAccAsgnTblVal[24];
//                        linkNumber = serviceAccAsgnTblVal[23];
                    System.out.println("Net Value :" + new BigDecimal(serviceAccAsgnVal[22]));
                    System.out.println("Link number :" + serviceAccAsgnVal[23]);
                    PoFrom = serviceAccAsgnTblVal[27];
                    System.out.println("PoFrom :" + PoFrom);
                    if (!"".equals(serviceAccAsgnTblVal[0])) {
                        serviceAccountAssignment.setQuantity(new BigDecimal(serviceAccAsgnTblVal[0]));
                    } else {
                        serviceAccountAssignment.setQuantity(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceAccAsgnTblVal[1])) {
                        serviceAccountAssignment.setPercentage(new BigDecimal(serviceAccAsgnTblVal[1]));
                    } else {
                        serviceAccountAssignment.setPercentage(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceAccAsgnTblVal[2])) {
                        serviceAccountAssignment.setGLAccount(serviceAccAsgnTblVal[2]);
                        serviceAccountAssignment.setCommitmentItem(serviceAccAsgnTblVal[2]);
                    } else {
                        serviceAccountAssignment.setGLAccount("");
                        serviceAccountAssignment.setCommitmentItem("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[3])) {
                        serviceAccountAssignment.setCOArea(serviceAccAsgnTblVal[3]);
                    } else {
                        serviceAccountAssignment.setCOArea("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[4])) {
                        serviceAccountAssignment.setCostCenter(serviceAccAsgnTblVal[4]);
                    } else {
                        serviceAccountAssignment.setCostCenter("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[5])) {
                        serviceAccountAssignment.setFund(serviceAccAsgnTblVal[5]);
                    } else {
                        serviceAccountAssignment.setFund("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[6])) {
                        serviceAccountAssignment.setFunctionalArea(serviceAccAsgnTblVal[6]);
                    } else {
                        serviceAccountAssignment.setFunctionalArea("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[7])) {
                        serviceAccountAssignment.setFundCenter(serviceAccAsgnTblVal[4]);
                    } else {
                        serviceAccountAssignment.setFundCenter("");
                    }
//                    if (!"".equals(serviceAccAsgnTblVal[8])) {
////                        int comItem = Integer.parseInt(serviceAccAsgnTblVal[8]);
////                        System.out.println("comItem :" + comItem);
////                        serviceAccountAssignment.setCommitmentItem(Integer.toString(comItem));
//                        serviceAccountAssignment.setCommitmentItem(serviceAccAsgnTblVal[8]);
//                    } else {
//                        serviceAccountAssignment.setCommitmentItem("");
//                    }
                    if (!"".equals(serviceAccAsgnTblVal[9])) {
                        serviceAccountAssignment.setAccAsngOrder(serviceAccAsgnTblVal[9]);
                    } else {
                        serviceAccountAssignment.setAccAsngOrder("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[10])) {
                        serviceAccountAssignment.setLineItemNumber(serviceAccAsgnTblVal[10]);
                    } else {
                        serviceAccountAssignment.setLineItemNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[11])) {
                        serviceAccountAssignment.setServiceLineItemNumber(serviceAccAsgnTblVal[11]);
                    } else {
                        serviceAccountAssignment.setServiceLineItemNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[12])) {
                        serviceAccountAssignment.setAsset(serviceAccAsgnTblVal[12]);
                    } else {
                        serviceAccountAssignment.setAsset("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[13])) {
                        serviceAccountAssignment.setWBSElement(serviceAccAsgnTblVal[13]);
                    } else {
                        serviceAccountAssignment.setWBSElement("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[14])) {
                        serviceAccountAssignment.setSalesOrder(serviceAccAsgnTblVal[14]);
                    } else {
                        serviceAccountAssignment.setSalesOrder("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[15])) {
                        serviceAccountAssignment.setNetActNumber(serviceAccAsgnTblVal[15]);
                    } else {
                        serviceAccountAssignment.setNetActNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[16])) {
                        serviceAccountAssignment.setItemNumber(serviceAccAsgnTblVal[16]);
                    } else {
                        serviceAccountAssignment.setItemNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[17])) {
                        serviceAccountAssignment.setDeliverySchedule(serviceAccAsgnTblVal[17]);
                    } else {
                        serviceAccountAssignment.setDeliverySchedule("");
                    }
//                    if (!"".equals(serviceAccAsgnTblVal[18])) {
//                        serviceAccountAssignment.setActivity(serviceAccAsgnTblVal[18]);
//                    }
//                    if (!"".equals(serviceAccAsgnTblVal[19])) {
//                        serviceAccountAssignment.setShortText(serviceAccAsgnTblVal[19]);
//                    }
                    if (!"".equals(serviceAccAsgnTblVal[20])) {
                        serviceAccountAssignment.setDistribution(serviceAccAsgnTblVal[20]);
                    } else {
                        serviceAccountAssignment.setDistribution("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[21])) {
                        serviceAccountAssignment.setAccountAssignment(serviceAccAsgnTblVal[21]);
                    } else {
                        serviceAccountAssignment.setAccountAssignment("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[22])) {
                        serviceAccountAssignment.setNetValaue(new BigDecimal(serviceAccAsgnTblVal[22]));
                    } else {
                        serviceAccountAssignment.setNetValaue(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceAccAsgnTblVal[23])) {
                        serviceAccountAssignment.setLinkNumber(serviceAccAsgnTblVal[23]);
                    } else {
                        serviceAccountAssignment.setLinkNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[24])) {
                        serviceAccountAssignment.setLinkId(serviceAccAsgnTblVal[24]);
                    } else {
                        serviceAccountAssignment.setLinkId("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[25])) {
                        serviceAccountAssignment.setPrItemNumber(serviceAccAsgnTblVal[25]);
                    } else {
                        serviceAccountAssignment.setPrItemNumber("");
                    }
                    serviceAccountAssignment.setRecipient("");
                    serviceAccountAssignment.setUnloadingPoint("");
                    serviceAccountAssignment.setIsDeleteFlag(serviceAccAsgnTblVal[26]);
//                    conditionsLineLevel.setConditionDetails(conValues[11]);
                    if (!"NON".equals(serviceAccAsgnTblVal[28])) {
                        serviceAccountAssignment.setLineNoSerAcc(serviceAccAsgnTblVal[28]);
                    } else {
                        serviceAccountAssignment.setLineNoSerAcc(null);
                    }
                    String msg = saveServiceAccountAssignment(serviceAccountAssignment);
                    System.out.println("msg :" + msg);
                }
                System.out.println("LineItemnumber :" + lineItemNumber);
                System.out.println("ServiceLineItemnumber :" + serviceLineItemNumber);
//                List<ServiceAccountAssignment> accAssignmentList = getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumber, lineItemNumber);
//                List<ServiceAccountAssignment> accAssignmentList = getAllServiceAccountAssignment();
                if ("editpo".equals(PoFrom) || "editApprovedPo".equals(PoFrom)) {
                    purchaseOrderWS.ServiceAccountAssignmentFunctionForEditPO(lineItemNumber, linkid, serviceLineItemNumber, PoFrom);
                } else {
                    purchaseOrderWS.ServiceAccountAssignmentFunction(lineItemNumber, linkid, serviceLineItemNumber, PoFrom);
                }
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveServiceAccAsgnData")) {
            try {
                String lineItemNumber;
                String serviceLineItemNumber;
                String linkid;
                out = response.getWriter();

                System.out.println("saveServiceAccAsgnData");

                String accAsgnString = request.getParameter("accAsgnString");

                System.out.println("accAsgnString :" + accAsgnString);

                String[] serviceAccAsgnArr = accAsgnString.split(",");

                System.out.println("Service Line Item number in saveServiceAccAsgnData :" + serviceAccAsgnArr[16]);
                System.out.println("Line Item number in saveServiceAccAsgnData :" + serviceAccAsgnArr[15]);
                System.out.println("serviceAccAsgnArr length :" + serviceAccAsgnArr.length);
                for (String serviceAccAsgnArr1 : serviceAccAsgnArr) {
                    System.out.println("serviceAccAsgnArr values :" + serviceAccAsgnArr1);
                }
                List<ServiceAccountAssignment> accAsgnList = getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceAccAsgnArr[16], serviceAccAsgnArr[15]);
                if (!accAsgnList.isEmpty()) {
                    deleteAllFromServiceAccountAssignment(accAsgnList);
                }
                lineItemNumber = serviceAccAsgnArr[15];
                serviceLineItemNumber = serviceAccAsgnArr[16];
                linkid = serviceAccAsgnArr[22];

                System.out.println("lineItemNumber: " + lineItemNumber);
                System.out.println("serviceLineItemNumber: " + serviceLineItemNumber);
                System.out.println("linkid: " + linkid);

                if (!"".equals(serviceAccAsgnArr[0])) {
                    serviceAccountAssignment.setGLAccount(serviceAccAsgnArr[0]);
                } else {
                    serviceAccountAssignment.setGLAccount("");
                }
                if (!"".equals(serviceAccAsgnArr[1])) {
                    serviceAccountAssignment.setCOArea(serviceAccAsgnArr[1]);
                } else {
                    serviceAccountAssignment.setCOArea("");
                }
                if (!"".equals(serviceAccAsgnArr[3])) {
                    serviceAccountAssignment.setCostCenter(serviceAccAsgnArr[3]);
                } else {
                    serviceAccountAssignment.setCostCenter("");
                }
                if (!"".equals(serviceAccAsgnArr[4])) {
                    serviceAccountAssignment.setAccAsngOrder(serviceAccAsgnArr[4]);
                } else {
                    serviceAccountAssignment.setAccAsngOrder("");
                }
                if (!"".equals(serviceAccAsgnArr[5])) {
                    serviceAccountAssignment.setAsset(serviceAccAsgnArr[5]);
                } else {
                    serviceAccountAssignment.setAsset("");
                }
                if (!"".equals(serviceAccAsgnArr[6])) {
                    serviceAccountAssignment.setWBSElement(serviceAccAsgnArr[6]);
                } else {
                    serviceAccountAssignment.setWBSElement("");
                }
                if (!"".equals(serviceAccAsgnArr[7])) {
                    serviceAccountAssignment.setSalesOrder(serviceAccAsgnArr[7]);
                } else {
                    serviceAccountAssignment.setSalesOrder("");
                }
                if (!"".equals(serviceAccAsgnArr[8])) {
                    serviceAccountAssignment.setItemNumber(serviceAccAsgnArr[8]);
                } else {
                    serviceAccountAssignment.setItemNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[9])) {
                    serviceAccountAssignment.setDeliverySchedule(serviceAccAsgnArr[9]);
                } else {
                    serviceAccountAssignment.setDeliverySchedule("");
                }
                if (!"".equals(serviceAccAsgnArr[10])) {
                    serviceAccountAssignment.setFund(serviceAccAsgnArr[10]);
                } else {
                    serviceAccountAssignment.setFund("");
                }
                if (!"".equals(serviceAccAsgnArr[11])) {
                    serviceAccountAssignment.setFunctionalArea(serviceAccAsgnArr[11]);
                } else {
                    serviceAccountAssignment.setFunctionalArea("");
                }
                if (!"".equals(serviceAccAsgnArr[12])) {
                    serviceAccountAssignment.setFundCenter(serviceAccAsgnArr[3]);
                } else {
                    serviceAccountAssignment.setFundCenter("");
                }
                if (!"".equals(serviceAccAsgnArr[13])) {
//                    int comItem = Integer.parseInt(serviceAccAsgnArr[13]);
//                    System.out.println("comItem :" + comItem);
//                    serviceAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                    serviceAccountAssignment.setCommitmentItem(serviceAccAsgnArr[13]);
                } else {
                    serviceAccountAssignment.setCommitmentItem("");
                }
                if (!"".equals(serviceAccAsgnArr[14])) {
                    serviceAccountAssignment.setNetActNumber(serviceAccAsgnArr[14]);
                } else {
                    serviceAccountAssignment.setNetActNumber("");
                }
//                    if (!"".equals(serviceAccAsgnArr[15])) {
//                        serviceAccountAssignment.setnAActivityNumber(serviceAccAsgnArr[15]);
//                    }
                if (!"".equals(serviceAccAsgnArr[15])) {
                    serviceAccountAssignment.setLineItemNumber(serviceAccAsgnArr[15]);
                } else {
                    serviceAccountAssignment.setLineItemNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[16])) {
                    serviceAccountAssignment.setServiceLineItemNumber(serviceAccAsgnArr[16]);
                } else {
                    serviceAccountAssignment.setServiceLineItemNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[17])) {
                    serviceAccountAssignment.setQuantity(new BigDecimal(serviceAccAsgnArr[17]));
                } else {
                    serviceAccountAssignment.setQuantity(new BigDecimal(0.0));
                }
                if (!"".equals(serviceAccAsgnArr[18])) {
                    serviceAccountAssignment.setLinkNumber(serviceAccAsgnArr[18]);
                } else {
                    serviceAccountAssignment.setLinkNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[19])) {
                    System.out.println("NetValue Non Empty: " + serviceAccAsgnArr[19]);
                    serviceAccountAssignment.setNetValaue(new BigDecimal(serviceAccAsgnArr[19]));
                } else {
                    System.out.println("NetValue Empty: " + serviceAccAsgnArr[19]);
                    serviceAccountAssignment.setNetValaue(new BigDecimal(0.0));
                }
                if (!"".equals(serviceAccAsgnArr[20])) {
                    serviceAccountAssignment.setPrItemNumber(serviceAccAsgnArr[20]);
                } else {
                    serviceAccountAssignment.setPrItemNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[21])) {
                    serviceAccountAssignment.setAccountAssignment(serviceAccAsgnArr[21]);
                } else {
                    serviceAccountAssignment.setAccountAssignment("");
                }
                if (!"".equals(serviceAccAsgnArr[22])) {
                    serviceAccountAssignment.setLinkId(serviceAccAsgnArr[22]);
                } else {
                    serviceAccountAssignment.setLinkId("");
                }

                serviceAccountAssignment.setDistribution("");
                serviceAccountAssignment.setPercentage(new BigDecimal(100));
                serviceAccountAssignment.setRecipient("");
                serviceAccountAssignment.setUnloadingPoint("");
                serviceAccountAssignment.setIsDeleteFlag("false");
                System.out.println("LineNoSerAcc on Acc Asgn Save :" + serviceAccAsgnArr[23]);
                if (!"NON".equals(serviceAccAsgnArr[23])) {
                    serviceAccountAssignment.setLineNoSerAcc(serviceAccAsgnArr[23]);
                } else {
                    serviceAccountAssignment.setLineNoSerAcc(null);
                }
//                    conditionsLineLevel.setConditionDetails(conValues[11]);
                String msg = saveServiceAccountAssignment(serviceAccountAssignment);
                System.out.println("msg :" + msg);

                purchaseOrderWS.ServiceAccountAssignmentFunction(lineItemNumber, linkid, serviceLineItemNumber, "");

                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveLimitTabAccAsgnTblData")) {
            try {
                out = response.getWriter();
                System.out.println("saveLimitTabAccAsgnTblData");
                String limitAccAsgnTblRowString = request.getParameter("limitAccAsgnTblRowString");
                System.out.println("limitAccAsgnTblRowString :" + limitAccAsgnTblRowString);

                String[] limitAccAsgnTblRowArr = limitAccAsgnTblRowString.split("#");
                System.out.println("limitAccAsgnTblRowArr length :" + limitAccAsgnTblRowArr.length);
                for (int i = 0; i < limitAccAsgnTblRowArr.length; i++) {
                    System.out.println("serviceAccAsgnTblRow values :" + limitAccAsgnTblRowArr[i]);
                }
                String[] limitAccAsgnVal = null;
                for (String limitAccAsgnTblRow : limitAccAsgnTblRowArr) {
                    limitAccAsgnVal = limitAccAsgnTblRow.split(",");
                }
//                List<LimitAccountAssignment> limitAssAsgnList = getLimitAccountAssignmentByLineItemNumberAndServiceLineItemNumber(limitAccAsgnVal[15], limitAccAsgnVal[16]);
                List<LimitAccountAssignment> limitAssAsgnList = getLimitAccountAssignmentByLineItemNumber(limitAccAsgnVal[15]);
                String message = deleteAllLimitAccountAssignment(limitAssAsgnList);
                System.out.println("message :" + message);
                String lineItemNumber = "";
                for (String limitAccAsgnTblRow : limitAccAsgnTblRowArr) {
                    System.out.println("limitAccAsgnTblRow values :" + limitAccAsgnTblRow);
                    String[] limitAccAsgnTblVal = limitAccAsgnTblRow.split(",");

                    if (!"".equals(limitAccAsgnTblVal[0])) {
                        limitAccountAssignment.setPercentage(new BigDecimal(limitAccAsgnTblVal[0]));
                    } else {
                        limitAccountAssignment.setPercentage(new BigDecimal(0.0));
                    }
                    if (!"".equals(limitAccAsgnTblVal[1])) {
                        limitAccountAssignment.setGLAccount(limitAccAsgnTblVal[1]);
                    } else {
                        limitAccountAssignment.setGLAccount("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[2])) {
                        limitAccountAssignment.setCOArea(limitAccAsgnTblVal[2]);
                    } else {
                        limitAccountAssignment.setCOArea("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[3])) {
                        limitAccountAssignment.setCostCenter(limitAccAsgnTblVal[3]);
                    } else {
                        limitAccountAssignment.setCostCenter("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[4])) {
                        limitAccountAssignment.setFund(limitAccAsgnTblVal[4]);
                    } else {
                        limitAccountAssignment.setFund("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[5])) {
                        limitAccountAssignment.setFunctionalArea(limitAccAsgnTblVal[5]);
                    } else {
                        limitAccountAssignment.setFunctionalArea("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[6])) {
                        limitAccountAssignment.setFundCenter(limitAccAsgnTblVal[6]);
                    } else {
                        limitAccountAssignment.setFundCenter("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[7])) {
//                        int comItem = Integer.parseInt(limitAccAsgnTblVal[13]);
//                        System.out.println("comItem in Limit Table :" + comItem);
//                        limitAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                        limitAccountAssignment.setCommitmentItem(limitAccAsgnTblVal[7]);
                    } else {
                        limitAccountAssignment.setCommitmentItem("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[8])) {
                        limitAccountAssignment.setLimitAccAsgnTblOrder(limitAccAsgnTblVal[8]);
                    } else {
                        limitAccountAssignment.setLimitAccAsgnTblOrder("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[9])) {
                        limitAccountAssignment.setAsset(limitAccAsgnTblVal[9]);
                    } else {
                        limitAccountAssignment.setAsset("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[10])) {
                        limitAccountAssignment.setWBSElement(limitAccAsgnTblVal[10]);
                    } else {
                        limitAccountAssignment.setWBSElement("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[11])) {
                        limitAccountAssignment.setSalesOrder(limitAccAsgnTblVal[11]);
                    } else {
                        limitAccountAssignment.setSalesOrder("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[12])) {
                        limitAccountAssignment.setNetActNumber(limitAccAsgnTblVal[12]);
                    } else {
                        limitAccountAssignment.setNetActNumber("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[13])) {
                        limitAccountAssignment.setItemNumber(limitAccAsgnTblVal[13]);
                    } else {
                        limitAccountAssignment.setItemNumber("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[14])) {
                        limitAccountAssignment.setDeliverySchedule(limitAccAsgnTblVal[14]);
                    } else {
                        limitAccountAssignment.setDeliverySchedule("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[15])) {
                        lineItemNumber = limitAccAsgnTblVal[15];
                        limitAccountAssignment.setLineItemNumber(limitAccAsgnTblVal[15]);
                    } else {
                        limitAccountAssignment.setLineItemNumber("");
                    }
//                    if (!"".equals(limitAccAsgnTblVal[16])) {
//                        limitAccountAssignment.setServiceLineItemNumber(limitAccAsgnTblVal[16]);
//                    } else {
//                        limitAccountAssignment.setServiceLineItemNumber("");
//                    }
                    if (!"".equals(limitAccAsgnTblVal[17])) {
                        limitAccountAssignment.setDistribution(limitAccAsgnTblVal[17]);
                    } else {
                        limitAccountAssignment.setDistribution("");
                    }

                    if (!"".equals(limitAccAsgnTblVal[18])) {
                        limitAccountAssignment.setAccountAssignment(limitAccAsgnTblVal[18]);
                    } else {
                        limitAccountAssignment.setAccountAssignment("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[19])) {
                        limitAccountAssignment.setExpectedvalue(new BigDecimal(limitAccAsgnTblVal[19]));
                    } else {
                        limitAccountAssignment.setExpectedvalue(new BigDecimal(0.0));
                    }
                    if (!"".equals(limitAccAsgnTblVal[20])) {
                        limitAccountAssignment.setPrItemNumber(limitAccAsgnTblVal[20]);
                    } else {
                        limitAccountAssignment.setPrItemNumber("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[21])) {
                        limitAccountAssignment.setLinkId(limitAccAsgnTblVal[21]);
                    } else {
                        limitAccountAssignment.setLinkId("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[22])) {
                        limitAccountAssignment.setQuantity(new BigDecimal(limitAccAsgnTblVal[22]));
                    } else {
                        limitAccountAssignment.setQuantity(new BigDecimal(0.0));
                    }
                    String msg = saveLimitAccountAssignment(limitAccountAssignment);
                    System.out.println("msg :" + msg);
                }

                System.out.println("lineItemNumber: " + lineItemNumber);
//                List<LimitAccountAssignment> accAssignmentList = getAllLimitAccountAssignment();
                String msg = purchaseOrderWS.LimitAccountAssignmentFunction(lineItemNumber);
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveLimitAccAsgnData")) {
            try {
                String lineItemNumber = "";
                out = response.getWriter();
                System.out.println("saveLimitAccAsgnData");
                String accAsgnString = request.getParameter("accAsgnString");
                System.out.println("accAsgnString :" + accAsgnString);

                String[] limitAccAsgnArr = accAsgnString.split(",");
                System.out.println("limitAccAsgnArr length :" + limitAccAsgnArr.length);

                List<LimitAccountAssignment> limitAccAsgnList = getLimitAccountAssignmentByLineItemNumber(limitAccAsgnArr[15]);
                lineItemNumber = limitAccAsgnArr[15];
                if (!limitAccAsgnList.isEmpty()) {
//                    lineItemNumber = limitAccAsgnArr[15];
                    System.out.println("limitAccAsgnArr getCostCenter :" + limitAccAsgnList.get(0).getCostCenter());
                    LimitAccountAssignment limitAccAsgnObj = limitAccAsgnList.get(0);
                    if (!"".equals(limitAccAsgnArr[0])) {
                        limitAccAsgnObj.setGLAccount(limitAccAsgnArr[0]);
                    } else {
                        limitAccAsgnObj.setGLAccount("");
                    }
                    if (!"".equals(limitAccAsgnArr[1])) {
                        limitAccAsgnObj.setCOArea(limitAccAsgnArr[1]);
                    } else {
                        limitAccAsgnObj.setCOArea("");
                    }
//                   if (!"".equals(limitAccAsgnArr[2])) {
//                        limitAccountAssignment.setComp(limitAccAsgnArr[0]);
//                    }
                    if (!"".equals(limitAccAsgnArr[3])) {
                        limitAccAsgnObj.setCostCenter(limitAccAsgnArr[3]);
                    } else {
                        limitAccAsgnObj.setCostCenter("");
                    }
                    if (!"".equals(limitAccAsgnArr[4])) {
                        limitAccAsgnObj.setLimitAccAsgnTblOrder(limitAccAsgnArr[4]);
                    } else {
                        limitAccAsgnObj.setLimitAccAsgnTblOrder("");
                    }
                    if (!"".equals(limitAccAsgnArr[5])) {
                        limitAccAsgnObj.setAsset(limitAccAsgnArr[5]);
                    } else {
                        limitAccAsgnObj.setAsset("");
                    }
                    if (!"".equals(limitAccAsgnArr[6])) {
                        limitAccAsgnObj.setWBSElement(limitAccAsgnArr[6]);
                    } else {
                        limitAccAsgnObj.setWBSElement("");
                    }
                    if (!"".equals(limitAccAsgnArr[7])) {
                        limitAccAsgnObj.setSalesOrder(limitAccAsgnArr[7]);
                    } else {
                        limitAccAsgnObj.setSalesOrder("");
                    }
                    if (!"".equals(limitAccAsgnArr[8])) {
                        limitAccAsgnObj.setItemNumber(limitAccAsgnArr[8]);
                    } else {
                        limitAccAsgnObj.setItemNumber("");
                    }
                    if (!"".equals(limitAccAsgnArr[9])) {
                        limitAccAsgnObj.setDeliverySchedule(limitAccAsgnArr[9]);
                    } else {
                        limitAccAsgnObj.setDeliverySchedule("");
                    }
                    if (!"".equals(limitAccAsgnArr[10])) {
                        limitAccAsgnObj.setFund(limitAccAsgnArr[10]);
                    } else {
                        limitAccAsgnObj.setFund("");
                    }
                    if (!"".equals(limitAccAsgnArr[11])) {
                        limitAccAsgnObj.setFunctionalArea(limitAccAsgnArr[11]);
                    } else {
                        limitAccAsgnObj.setFunctionalArea("");
                    }
                    if (!"".equals(limitAccAsgnArr[12])) {
                        limitAccAsgnObj.setFundCenter(limitAccAsgnArr[12]);
                    } else {
                        limitAccAsgnObj.setFundCenter("");
                    }
                    if (!"".equals(limitAccAsgnArr[13])) {
//                        int comItem = Integer.parseInt(limitAccAsgnArr[13]);
//                        System.out.println("comItem in Limit :" + comItem);
//                        limitAccAsgnObj.setCommitmentItem(Integer.toString(comItem));
                        limitAccAsgnObj.setCommitmentItem(limitAccAsgnArr[13]);
                    } else {
                        limitAccAsgnObj.setCommitmentItem("");
                    }
                    if (!"".equals(limitAccAsgnArr[14])) {
                        limitAccAsgnObj.setNetActNumber(limitAccAsgnArr[14]);
                    } else {
                        limitAccAsgnObj.setNetActNumber("");
                    }
                    if (!"".equals(limitAccAsgnArr[15])) {
                        limitAccAsgnObj.setLineItemNumber(limitAccAsgnArr[15]);
                    } else {
                        limitAccAsgnObj.setLineItemNumber("");
                    }
//                    if (!"".equals(limitAccAsgnArr[16])) {
//                        limitAccAsgnObj.setServiceLineItemNumber(limitAccAsgnArr[16]);
//                    }
//                    if (!"".equals(limitAccAsgnArr[16])) {
//                        limitAccAsgnObj.setQuantity(new BigDecimal(limitAccAsgnArr[16]));
//                    }
                    if (!"".equals(limitAccAsgnArr[16])) {
                        limitAccAsgnObj.setPrItemNumber(limitAccAsgnArr[16]);
                    } else {
                        limitAccAsgnObj.setPrItemNumber("");
                    }
                    if (!"".equals(limitAccAsgnArr[17])) {
                        limitAccAsgnObj.setAccountAssignment(limitAccAsgnArr[17]);
                    } else {
                        limitAccAsgnObj.setAccountAssignment("");
                    }
                    if (!"".equals(limitAccAsgnArr[18])) {
                        limitAccAsgnObj.setExpectedvalue(new BigDecimal(limitAccAsgnArr[18]));
                    } else {
                        limitAccAsgnObj.setExpectedvalue(new BigDecimal(0.0));
                    }
                    if (!"".equals(limitAccAsgnArr[19])) {
                        limitAccAsgnObj.setLinkId(limitAccAsgnArr[19]);
                    } else {
                        limitAccAsgnObj.setLinkId("");
                    }
                    limitAccAsgnObj.setDistribution("2");
                    limitAccAsgnObj.setPercentage(new BigDecimal(100));
                    String msg = purchaseOrderWS.updateLimitAccountAssignment(limitAccAsgnObj);
                    System.out.println("msg :" + msg);
                } else {
                    if (!"".equals(limitAccAsgnArr[0])) {
                        limitAccountAssignment.setGLAccount(limitAccAsgnArr[0]);
                    } else {
                        limitAccountAssignment.setGLAccount("");
                    }
                    if (!"".equals(limitAccAsgnArr[1])) {
                        limitAccountAssignment.setCOArea(limitAccAsgnArr[1]);
                    } else {
                        limitAccountAssignment.setCOArea("");
                    }
//                   if (!"".equals(limitAccAsgnArr[2])) {
//                        limitAccountAssignment.setComp(limitAccAsgnArr[0]);
//                    }
                    if (!"".equals(limitAccAsgnArr[3])) {
                        limitAccountAssignment.setCostCenter(limitAccAsgnArr[3]);
                    } else {
                        limitAccountAssignment.setCostCenter("");
                    }
                    if (!"".equals(limitAccAsgnArr[4])) {
                        limitAccountAssignment.setLimitAccAsgnTblOrder(limitAccAsgnArr[4]);
                    } else {
                        limitAccountAssignment.setLimitAccAsgnTblOrder("");
                    }
                    if (!"".equals(limitAccAsgnArr[5])) {
                        limitAccountAssignment.setAsset(limitAccAsgnArr[5]);
                    } else {
                        limitAccountAssignment.setAsset("");
                    }
                    if (!"".equals(limitAccAsgnArr[6])) {
                        limitAccountAssignment.setWBSElement(limitAccAsgnArr[6]);
                    } else {
                        limitAccountAssignment.setWBSElement("");
                    }
                    if (!"".equals(limitAccAsgnArr[7])) {
                        limitAccountAssignment.setSalesOrder(limitAccAsgnArr[7]);
                    } else {
                        limitAccountAssignment.setSalesOrder("");
                    }
                    if (!"".equals(limitAccAsgnArr[8])) {
                        limitAccountAssignment.setItemNumber(limitAccAsgnArr[8]);
                    } else {
                        limitAccountAssignment.setItemNumber("");
                    }
                    if (!"".equals(limitAccAsgnArr[9])) {
                        limitAccountAssignment.setDeliverySchedule(limitAccAsgnArr[9]);
                    } else {
                        limitAccountAssignment.setDeliverySchedule("");
                    }
                    if (!"".equals(limitAccAsgnArr[10])) {
                        limitAccountAssignment.setFund(limitAccAsgnArr[10]);
                    } else {
                        limitAccountAssignment.setFund("");
                    }
                    if (!"".equals(limitAccAsgnArr[11])) {
                        limitAccountAssignment.setFunctionalArea(limitAccAsgnArr[11]);
                    } else {
                        limitAccountAssignment.setFunctionalArea("");
                    }
                    if (!"".equals(limitAccAsgnArr[12])) {
                        limitAccountAssignment.setFundCenter(limitAccAsgnArr[12]);
                    } else {
                        limitAccountAssignment.setFundCenter("");
                    }
                    if (!"".equals(limitAccAsgnArr[13])) {
//                        int comItem = Integer.parseInt(limitAccAsgnArr[13]);
//                        System.out.println("comItem in Limit :" + comItem);
//                        limitAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                        limitAccountAssignment.setCommitmentItem(limitAccAsgnArr[13]);
                    } else {
                        limitAccountAssignment.setCommitmentItem("");
                    }
                    if (!"".equals(limitAccAsgnArr[14])) {
                        limitAccountAssignment.setNetActNumber(limitAccAsgnArr[14]);
                    } else {
                        limitAccountAssignment.setNetActNumber("");
                    }
                    if (!"".equals(limitAccAsgnArr[15])) {
                        limitAccountAssignment.setLineItemNumber(limitAccAsgnArr[15]);
                    } else {
                        limitAccountAssignment.setLineItemNumber("");
                    }
//                    if (!"".equals(limitAccAsgnArr[16])) {
//                        limitAccountAssignment.setServiceLineItemNumber(limitAccAsgnArr[16]);
//                    }
//                    if (!"".equals(limitAccAsgnArr[16])) {
//                        limitAccountAssignment.setQuantity(new BigDecimal(limitAccAsgnArr[16]));
//                    }
                    if (!"".equals(limitAccAsgnArr[16])) {
                        limitAccountAssignment.setPrItemNumber(limitAccAsgnArr[16]);
                    } else {
                        limitAccountAssignment.setPrItemNumber("");
                    }
                    if (!"".equals(limitAccAsgnArr[17])) {
                        limitAccountAssignment.setAccountAssignment(limitAccAsgnArr[17]);
                    } else {
                        limitAccountAssignment.setAccountAssignment("");
                    }
                    if (!"".equals(limitAccAsgnArr[18])) {
                        limitAccountAssignment.setExpectedvalue(new BigDecimal(limitAccAsgnArr[18]));
                    } else {
                        limitAccountAssignment.setExpectedvalue(new BigDecimal(0.0));
                    }
                    if (!"".equals(limitAccAsgnArr[19])) {
                        limitAccountAssignment.setLinkId(limitAccAsgnArr[19]);
                    } else {
                        limitAccountAssignment.setLinkId("");
                    }
                    limitAccountAssignment.setDistribution("2");
                    limitAccountAssignment.setPercentage(new BigDecimal(100));
                    String msg = saveLimitAccountAssignment(limitAccountAssignment);
                    System.out.println("msg :" + msg);
                }
                String msg = purchaseOrderWS.LimitAccountAssignmentFunction(lineItemNumber);
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveStandAloneServiceTabAccAsgnTblData")) {
            try {
                out = response.getWriter();
                String lineItemNumber = null;
                String serviceLineItemNumber = null;
                String linkid = null;
                String linkNumber = null;
                System.out.println("saveStandAloneServiceTabAccAsgnTblData");

                String serviceAccAsgnTblRowString = request.getParameter("serviceAccAsgnTblRowString");

                System.out.println("serviceAccAsgnTblRowString :" + serviceAccAsgnTblRowString);

                String[] serviceAccAsgnTblRowArr = serviceAccAsgnTblRowString.split("#");

                System.out.println("serviceAccAsgnTblRowArr length :" + serviceAccAsgnTblRowArr.length);
                for (int i = 0; i < serviceAccAsgnTblRowArr.length; i++) {
                    System.out.println("serviceAccAsgnTblRow values :" + serviceAccAsgnTblRowArr[i]);
                }
                String[] serviceAccAsgnVal = null;
                for (String serviceAccAsgnTblRow : serviceAccAsgnTblRowArr) {
                    System.out.println("Bittu :");
                    System.out.println("serviceAccAsgnTblRow values :" + serviceAccAsgnTblRow);
                    serviceAccAsgnVal = serviceAccAsgnTblRow.split(",");
                }
                List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgnList = getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(serviceAccAsgnVal[11], serviceAccAsgnVal[10], serviceAccAsgnVal[21]);

                if (!accAsgnList.isEmpty()) {
                    deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(accAsgnList);
                }
                for (String serviceAccAsgnTblRow : serviceAccAsgnTblRowArr) {
                    System.out.println("serviceAccAsgnTblRow values 12:" + serviceAccAsgnTblRow);
                    String[] serviceAccAsgnTblVal = serviceAccAsgnTblRow.split(",");
//                    lineItemNumber = serviceAccAsgnTblVal[10];
//                    serviceLineItemNumber = serviceAccAsgnTblVal[11];
                    linkid = serviceAccAsgnTblVal[20];
//                        linkNumber = serviceAccAsgnTblVal[23];
//                    System.out.println("Net Value :" + new BigDecimal(serviceAccAsgnVal[22]));
//                    System.out.println("Link number :" + serviceAccAsgnVal[23]);
                    if (!"".equals(serviceAccAsgnTblVal[0])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(serviceAccAsgnTblVal[0]));
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceAccAsgnTblVal[1])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPercentage(new BigDecimal(serviceAccAsgnTblVal[1]));
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPercentage(new BigDecimal(0.0));
                    }
                    if (!"".equals(serviceAccAsgnTblVal[2])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setGlAccount(serviceAccAsgnTblVal[2]);
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCommitmentItem(serviceAccAsgnTblVal[2]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setGlAccount("");
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCommitmentItem("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[3])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCoArea(serviceAccAsgnTblVal[3]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCoArea("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[4])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCostCenter(serviceAccAsgnTblVal[4]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCostCenter("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[5])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund(serviceAccAsgnTblVal[5]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[6])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFunctionalArea(serviceAccAsgnTblVal[6]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFunctionalArea("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[7])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFundsCentre(serviceAccAsgnTblVal[7]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFundsCentre("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[9])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccOrder(serviceAccAsgnTblVal[9]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccOrder("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[10])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLineItemNumber(serviceAccAsgnTblVal[10]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLineItemNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[11])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setServiceLineItemNumber(serviceAccAsgnTblVal[11]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setServiceLineItemNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[12])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccAsset(serviceAccAsgnTblVal[12]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccAsset("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[13])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccWBSElement(serviceAccAsgnTblVal[13]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccWBSElement("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[14])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSalesOrder(serviceAccAsgnTblVal[14]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSalesOrder("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[15])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetwork(serviceAccAsgnTblVal[15]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetwork("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[16])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber(serviceAccAsgnTblVal[16]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[17])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDeliverySchedule(serviceAccAsgnTblVal[17]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDeliverySchedule("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[18])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution(serviceAccAsgnTblVal[18]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[19])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccountAssignment(serviceAccAsgnTblVal[19]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccountAssignment("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[20])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkID(serviceAccAsgnTblVal[20]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkID("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[21])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPoId(serviceAccAsgnTblVal[21]);
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPoId("");
                    }
                    if (!"".equals(serviceAccAsgnTblVal[22])) {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetPrice(new BigDecimal(serviceAccAsgnTblVal[22]));
                    } else {
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetPrice(new BigDecimal(0.0));
                    }
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setRecipient("");
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setUnloadingPoint("");
                    String msg = saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(nGBPCmplxPOCreationLineItemPOAccountAssignmentValues);
                    System.out.println("msg :" + msg);

                }
//                System.out.println("LineItemnumber :" + lineItemNumber);
//                System.out.println("ServiceLineItemnumber :" + serviceLineItemNumber);

                purchaseOrderWS.ServiceStandAloneAccountAssignmentFunction(linkid);
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveStandAloneLimitTabAccAsgnTblData")) {
            try {
                out = response.getWriter();
                System.out.println("saveStandAloneLimitTabAccAsgnTblData");
                String limitAccAsgnTblRowString = request.getParameter("limitAccAsgnTblRowString");
                System.out.println("limitAccAsgnTblRowString :" + limitAccAsgnTblRowString);

                String[] limitAccAsgnTblRowArr = limitAccAsgnTblRowString.split("#");
                System.out.println("limitAccAsgnTblRowArr length :" + limitAccAsgnTblRowArr.length);
                for (int i = 0; i < limitAccAsgnTblRowArr.length; i++) {
                    System.out.println("serviceAccAsgnTblRow values :" + limitAccAsgnTblRowArr[i]);
                }
                String[] limitAccAsgnVal = null;
                for (String limitAccAsgnTblRow : limitAccAsgnTblRowArr) {
                    limitAccAsgnVal = limitAccAsgnTblRow.split(",");
                }
//                List<LimitAccountAssignment> limitAssAsgnList = getLimitAccountAssignmentByLineItemNumberAndServiceLineItemNumber(limitAccAsgnVal[15], limitAccAsgnVal[16]);
                String linkid = limitAccAsgnVal[19];
                System.out.println("Linkid in saveNGBPCmplxPOCreationLimitsAccountAssignment :" + linkid);
                List<NGBPCmplxPOCreationLimitsAccountAssignment> limitAccAsgnList = purchaseOrderWS.getLimitAccountAssignemntByLinkId(linkid);
                if (!limitAccAsgnList.isEmpty()) {
                    deleteNgBpCmlxPoCreationLimitAccountAssignment(limitAccAsgnList);
                }

                String lineItemNumber = "";
                for (String limitAccAsgnTblRow : limitAccAsgnTblRowArr) {
                    System.out.println("limitAccAsgnTblRow values :" + limitAccAsgnTblRow);
                    String[] limitAccAsgnTblVal = limitAccAsgnTblRow.split(",");

                    if (!"".equals(limitAccAsgnTblVal[0])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setPercentage(new BigDecimal(limitAccAsgnTblVal[0]));
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setPercentage(new BigDecimal(0.0));
                    }
                    if (!"".equals(limitAccAsgnTblVal[1])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setGlAccount(limitAccAsgnTblVal[1]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setGlAccount("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[2])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setCoArea(limitAccAsgnTblVal[2]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setCoArea("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[3])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setCostCenter(limitAccAsgnTblVal[3]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setCostCenter("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[4])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setFund(limitAccAsgnTblVal[4]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setFund("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[5])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setFunctionalArea(limitAccAsgnTblVal[5]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setFunctionalArea("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[6])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setFundCenter(limitAccAsgnTblVal[6]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setFundCenter("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[7])) {
//                        int comItem = Integer.parseInt(limitAccAsgnTblVal[13]);
//                        System.out.println("comItem in Limit Table :" + comItem);
//                        limitAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                        nGBPCmplxPOCreationLimitsAccountAssignment.setCommitmentItem(limitAccAsgnTblVal[7]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setCommitmentItem("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[8])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setLimitAccAsgnTblOrder(limitAccAsgnTblVal[8]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setLimitAccAsgnTblOrder("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[9])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setAsset(limitAccAsgnTblVal[9]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setAsset("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[10])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setWbsElement(limitAccAsgnTblVal[10]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setWbsElement("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[11])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setSalesOrder(limitAccAsgnTblVal[11]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setSalesOrder("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[12])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setNetActNumber(limitAccAsgnTblVal[12]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setNetActNumber("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[13])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setItemNumber(limitAccAsgnTblVal[13]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setItemNumber("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[14])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setDeliverySchedule(limitAccAsgnTblVal[14]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setDeliverySchedule("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[15])) {
                        lineItemNumber = limitAccAsgnTblVal[15];
                        nGBPCmplxPOCreationLimitsAccountAssignment.setLineItemNumber(limitAccAsgnTblVal[15]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setLineItemNumber("");
                    }
//                    if (!"".equals(limitAccAsgnTblVal[16])) {
//                        limitAccountAssignment.setServiceLineItemNumber(limitAccAsgnTblVal[16]);
//                    } else {
//                        limitAccountAssignment.setServiceLineItemNumber("");
//                    }
                    if (!"".equals(limitAccAsgnTblVal[16])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setDistribution(limitAccAsgnTblVal[16]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setDistribution("");
                    }

                    if (!"".equals(limitAccAsgnTblVal[17])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setAccountAssignment(limitAccAsgnTblVal[17]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setAccountAssignment("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[18])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setExpectedvalue(new BigDecimal(limitAccAsgnTblVal[18]));
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setExpectedvalue(new BigDecimal(0.0));
                    }
//                    if (!"".equals(limitAccAsgnTblVal[20])) {
//                        nGBPCmplxPOCreationLimitsAccountAssignment.setPrItemNumber(limitAccAsgnTblVal[20]);
//                    } else {
//                        nGBPCmplxPOCreationLimitsAccountAssignment.setPrItemNumber("");
//                    }
                    if (!"".equals(limitAccAsgnTblVal[19])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setLinkId(limitAccAsgnTblVal[19]);
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setLinkId("");
                    }
                    if (!"".equals(limitAccAsgnTblVal[20])) {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setQuantity(new BigDecimal(limitAccAsgnTblVal[20]));
                    } else {
                        nGBPCmplxPOCreationLimitsAccountAssignment.setQuantity(new BigDecimal(0.0));
                    }
                    String msg = saveNGBPCmplxPOCreationLimitsAccountAssignment(nGBPCmplxPOCreationLimitsAccountAssignment);
                    System.out.println("msg :" + msg);

                    purchaseOrderWS.StandAloneLimitAccountAssignmentFunction(linkid);
                }

                System.out.println("lineItemNumber: " + lineItemNumber);
//                List<LimitAccountAssignment> accAssignmentList = getAllLimitAccountAssignment();
//                String msg = LimitAccountAssignmentFunction(lineItemNumber);
                out.println(jArra);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("saveStandAloneLimitAccAsgnData")) {
            try {
                String lineItemNumber = "";
                out = response.getWriter();
                System.out.println("saveStandAloneLimitAccAsgnData");
                String accAsgnString = request.getParameter("accAsgnString");
                System.out.println("accAsgnString :" + accAsgnString);

                String[] limitAccAsgnArr = accAsgnString.split(",");
                System.out.println("limitAccAsgnArr length :" + limitAccAsgnArr.length);
                for (int i = 0; i < limitAccAsgnArr.length; i++) {
                    System.out.println("limitAccAsgnArr values :" + limitAccAsgnArr[i]);
                }
                String linkid = limitAccAsgnArr[19];
                System.out.println("Linkid in saveNGBPCmplxPOCreationLimitsAccountAssignment :" + linkid);
                List<NGBPCmplxPOCreationLimitsAccountAssignment> limitAccAsgnList = purchaseOrderWS.getLimitAccountAssignemntByLinkId(linkid);
                if (!limitAccAsgnList.isEmpty()) {
                    deleteNgBpCmlxPoCreationLimitAccountAssignment(limitAccAsgnList);
                }

                if (!"".equals(limitAccAsgnArr[0])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setGlAccount(limitAccAsgnArr[0]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setGlAccount("");
                }
                if (!"".equals(limitAccAsgnArr[1])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setCoArea(limitAccAsgnArr[1]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setCoArea("");
                }
//                   if (!"".equals(limitAccAsgnArr[2])) {
//                        limitAccountAssignment.setComp(limitAccAsgnArr[0]);
//                    }
                if (!"".equals(limitAccAsgnArr[3])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setCostCenter(limitAccAsgnArr[0]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setCostCenter("");
                }
                if (!"".equals(limitAccAsgnArr[4])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setLimitAccAsgnTblOrder(limitAccAsgnArr[4]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setLimitAccAsgnTblOrder("");
                }
                if (!"".equals(limitAccAsgnArr[5])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setAsset(limitAccAsgnArr[5]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setAsset("");
                }
                if (!"".equals(limitAccAsgnArr[6])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setWbsElement(limitAccAsgnArr[6]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setWbsElement("");
                }
                if (!"".equals(limitAccAsgnArr[7])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setSalesOrder(limitAccAsgnArr[7]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setSalesOrder("");
                }
                if (!"".equals(limitAccAsgnArr[8])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setItemNumber(limitAccAsgnArr[8]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setItemNumber("");
                }
                if (!"".equals(limitAccAsgnArr[9])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setDeliverySchedule(limitAccAsgnArr[9]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setDeliverySchedule("");
                }
                if (!"".equals(limitAccAsgnArr[10])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setFund(limitAccAsgnArr[10]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setFund("");
                }
                if (!"".equals(limitAccAsgnArr[11])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setFunctionalArea(limitAccAsgnArr[11]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setFunctionalArea("");
                }
                if (!"".equals(limitAccAsgnArr[12])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setFundCenter(limitAccAsgnArr[12]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setFundCenter("");
                }
                if (!"".equals(limitAccAsgnArr[13])) {
//                        int comItem = Integer.parseInt(limitAccAsgnArr[13]);
//                        System.out.println("comItem in Limit :" + comItem);
//                        limitAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                    nGBPCmplxPOCreationLimitsAccountAssignment.setCommitmentItem(limitAccAsgnArr[13]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setCommitmentItem("");
                }
                if (!"".equals(limitAccAsgnArr[14])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setNetActNumber(limitAccAsgnArr[14]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setNetActNumber("");
                }
                if (!"".equals(limitAccAsgnArr[15])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setLineItemNumber(limitAccAsgnArr[15]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setLineItemNumber("");
                }
//                    if (!"".equals(limitAccAsgnArr[16])) {
//                        limitAccountAssignment.setServiceLineItemNumber(limitAccAsgnArr[16]);
//                    }
//                    if (!"".equals(limitAccAsgnArr[16])) {
//                        limitAccountAssignment.setQuantity(new BigDecimal(limitAccAsgnArr[16]));
//                    }
                if (!"".equals(limitAccAsgnArr[16])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setPrItemNumber(limitAccAsgnArr[16]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setPrItemNumber("");
                }
                if (!"".equals(limitAccAsgnArr[17])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setAccountAssignment(limitAccAsgnArr[17]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setAccountAssignment("");
                }
                if (!"".equals(limitAccAsgnArr[18])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setExpectedvalue(new BigDecimal(limitAccAsgnArr[18]));
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setExpectedvalue(new BigDecimal(0.0));
                }
                if (!"".equals(limitAccAsgnArr[19])) {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setLinkId(limitAccAsgnArr[19]);
                } else {
                    nGBPCmplxPOCreationLimitsAccountAssignment.setLinkId("");
                }
                nGBPCmplxPOCreationLimitsAccountAssignment.setDistribution("2");
                nGBPCmplxPOCreationLimitsAccountAssignment.setPercentage(new BigDecimal(100));
                String msg = saveNGBPCmplxPOCreationLimitsAccountAssignment(nGBPCmplxPOCreationLimitsAccountAssignment);
                System.out.println("msg :" + msg);
//                }
//                String msg = LimitAccountAssignmentFunction(lineItemNumber);
                purchaseOrderWS.StandAloneLimitAccountAssignmentFunction(linkid);
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveStandAloneServiceAccAsgnData")) {
            try {
                String lineItemNumber;
                String serviceLineItemNumber;
                String linkid;
                out = response.getWriter();

                System.out.println("saveStandAloneServiceAccAsgnData");

                String accAsgnString = request.getParameter("accAsgnString");

                System.out.println("accAsgnString :" + accAsgnString);

                String[] serviceAccAsgnArr = accAsgnString.split(",");

                System.out.println("serviceAccAsgnArr length :" + serviceAccAsgnArr.length);
                for (String serviceAccAsgnArr1 : serviceAccAsgnArr) {
                    System.out.println("serviceAccAsgnArr values :" + serviceAccAsgnArr1);
                }
                List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgnList = getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(serviceAccAsgnArr[16], serviceAccAsgnArr[15], serviceAccAsgnArr[20]);
                if (!accAsgnList.isEmpty()) {
                    deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(accAsgnList);
                }
//                lineItemNumber = serviceAccAsgnArr[15];
//                serviceLineItemNumber = serviceAccAsgnArr[16];
                linkid = serviceAccAsgnArr[19];
                if (!"".equals(serviceAccAsgnArr[0])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setGlAccount(serviceAccAsgnArr[0]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setGlAccount("");
                }
                if (!"".equals(serviceAccAsgnArr[1])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCoArea(serviceAccAsgnArr[1]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCoArea("");
                }
                if (!"".equals(serviceAccAsgnArr[3])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCostCenter(serviceAccAsgnArr[3]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCostCenter("");
                }
                if (!"".equals(serviceAccAsgnArr[4])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccOrder(serviceAccAsgnArr[4]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccOrder("");
                }
                if (!"".equals(serviceAccAsgnArr[5])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccAsset(serviceAccAsgnArr[5]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccAsset("");
                }
                if (!"".equals(serviceAccAsgnArr[6])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccWBSElement(serviceAccAsgnArr[6]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccWBSElement("");
                }
                if (!"".equals(serviceAccAsgnArr[7])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSalesOrder(serviceAccAsgnArr[7]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSalesOrder("");
                }
                if (!"".equals(serviceAccAsgnArr[8])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber(serviceAccAsgnArr[8]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[9])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDeliverySchedule(serviceAccAsgnArr[9]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDeliverySchedule("");
                }
                if (!"".equals(serviceAccAsgnArr[10])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund(serviceAccAsgnArr[10]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund("");
                }
                if (!"".equals(serviceAccAsgnArr[11])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFunctionalArea(serviceAccAsgnArr[11]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFunctionalArea("");
                }
                if (!"".equals(serviceAccAsgnArr[12])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFundsCentre(serviceAccAsgnArr[12]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFundsCentre("");
                }
                if (!"".equals(serviceAccAsgnArr[13])) {
//                    int comItem = Integer.parseInt(serviceAccAsgnArr[13]);
//                    System.out.println("comItem :" + comItem);
//                    serviceAccountAssignment.setCommitmentItem(Integer.toString(comItem));
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCommitmentItem(serviceAccAsgnArr[13]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCommitmentItem("");
                }
                if (!"".equals(serviceAccAsgnArr[14])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetwork(serviceAccAsgnArr[14]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetwork("");
                }
//                    if (!"".equals(serviceAccAsgnArr[15])) {
//                        serviceAccountAssignment.setnAActivityNumber(serviceAccAsgnArr[15]);
//                    }
                if (!"".equals(serviceAccAsgnArr[15])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLineItemNumber(serviceAccAsgnArr[15]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLineItemNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[16])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setServiceLineItemNumber(serviceAccAsgnArr[16]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setServiceLineItemNumber("");
                }
                if (!"".equals(serviceAccAsgnArr[17])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(serviceAccAsgnArr[17]));
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(0.0));
                }
//                if (!"".equals(serviceAccAsgnArr[18])) {
//                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkNumber(serviceAccAsgnArr[18]);
//                } else {
//                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkNumber("");
//                }
//                if (!"".equals(serviceAccAsgnArr[19])) {
//                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetValaue(new BigDecimal(serviceAccAsgnArr[19]));
//                } else {
//                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetValaue(new BigDecimal(0.0));
//                }
//                if (!"".equals(serviceAccAsgnArr[20])) {
//                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPrItemNumber(serviceAccAsgnArr[20]);
//                } else {
//                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPrItemNumber("");
//                }
                if (!"".equals(serviceAccAsgnArr[18])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccountAssignment(serviceAccAsgnArr[18]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccountAssignment("");
                }
                if (!"".equals(serviceAccAsgnArr[19])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkID(serviceAccAsgnArr[19]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkID("");
                }
                if (!"".equals(serviceAccAsgnArr[20])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPoId(serviceAccAsgnArr[20]);
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPoId("");
                }
                if (!"".equals(serviceAccAsgnArr[21])) {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetPrice(new BigDecimal(serviceAccAsgnArr[21]));
                } else {
                    nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetPrice(new BigDecimal(0.0));
                }

                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution("");
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPercentage(new BigDecimal(100));
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setRecipient("");
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setUnloadingPoint("");

//                    conditionsLineLevel.setConditionDetails(conValues[11]);
                String msg = saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(nGBPCmplxPOCreationLineItemPOAccountAssignmentValues);
                System.out.println("msg :" + msg);
                purchaseOrderWS.ServiceStandAloneAccountAssignmentFunction(linkid);
                out.println(jArra);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getMasterMaterialGeneralByAccAsgnAndCoCode")) {
            try {
                System.out.println("getMasterMaterialGeneralByAccAsgnAndCoCode");
                out = response.getWriter();

                String accAsgn = request.getParameter("accAsgn");
                String companyCode = request.getParameter("companyCode");
                String recordCount = request.getParameter("recordCount");
                String materialCodeOrShortText = request.getParameter("materialCodeOrShortText");
                String lastMatSno = request.getParameter("lastMatSno");

                System.out.println("accAsgn: " + accAsgn);
                System.out.println("companyCode: " + companyCode);
                System.out.println("recordCount: " + recordCount);
                System.out.println("materialCodeOrShortText: " + materialCodeOrShortText);
                System.out.println("lastMatSno: " + lastMatSno);

                List<MasterMaterialGeneral> masterMaterialList = getMasterMaterialGeneralByAccAsgnAndCoCode(accAsgn, companyCode, recordCount, materialCodeOrShortText, lastMatSno);
                System.out.println("masterMaterialList size in BP: " + masterMaterialList.size());

                JSONArray jsonMaterialArr = new JSONArray(masterMaterialList);
                out.println(jsonMaterialArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("saveConditionsDataOnAddingInHeader")) {
            try {
                System.out.println("saveConditionsDataOnAddingInHeader in POAjax");
                out = response.getWriter();
                String condition = request.getParameter("conditionLineLevelArr");
                String linkidArrayAsString = request.getParameter("linkidArrayAsString");
                String PrCurrencyArrayAsString = request.getParameter("PrCurrencyArrayAsString");
                String itemCodeArrayAsString = request.getParameter("itemCodeArrayAsString");
                String indexnumber = request.getParameter("indexnumber");
                String conditiontype = request.getParameter("conditiontype");
                String[] linkIdArray = linkidArrayAsString.split(",");
                String[] PrCurrencyArray = PrCurrencyArrayAsString.split(",");
                String[] itemCodeArray = itemCodeArrayAsString.split(",");
                JSONArray conditionAsJsonArray = new JSONArray(condition);
                System.out.println("conditionAsJsonArray saveConditionsDataOnAddingInHeader :" + conditionAsJsonArray.toString());
                System.out.println("indexnumber :" + indexnumber);
                for (int k = 0; k < linkIdArray.length; k++) {
                    for (int i = 0; i < conditionAsJsonArray.length(); i++) {
                        JSONObject jsonobj = conditionAsJsonArray.getJSONObject(i);
                        String linkid = jsonobj.getString("linkid");
                        String itemCode = jsonobj.getString("itemCode");
                        System.out.println("linkIdArray in array :" + linkIdArray[k] + " ,linkid :" + linkid);
                        if (itemCodeArray[k].equals(itemCode)) {
                            System.out.println("LinkId in saveConditionsDataOnAddingInHeader :" + jsonobj.getString("linkid"));
                            String condtype = jsonobj.getString("Ctype");
                            String changeid = jsonobj.getString("CHANGEID");
                            System.out.println("changeid :" + changeid);
                            if (condtype.equals(conditiontype)) {
//                                int totalamount = 0;
                                BigDecimal totalamount = new BigDecimal(0.0);
                                BigDecimal totalper = new BigDecimal(0.0);
//                                int totalper = 0;
                                float totalCondVal = 0;
                                for (int j = 0; j < conditionAsJsonArray.length(); j++) {
                                    JSONObject obj = conditionAsJsonArray.getJSONObject(j);
                                    String lineitemCode = obj.getString("itemCode");
                                    String contype = obj.getString("Ctype");
                                    System.out.println("lineitemCode :" + lineitemCode + " ,itemCodeArray[k] :" + itemCodeArray[k]);
                                    System.out.println("contype :" + contype + " ,conditiontype :" + conditiontype);
                                    if (itemCodeArray[k].equals(lineitemCode) && contype.equals(conditiontype)) {
                                        System.out.println("SUNNY KUMAR PRAJAPATI+++");
                                        String amount = obj.getString("amount");
                                        String per = obj.getString("per");
                                        String condVal = obj.getString("conditionValue");
//                                        totalamount = totalamount + Integer.parseInt(amount);
//                                        totalper = totalper + Integer.parseInt(per);
                                        totalamount = totalamount.add(new BigDecimal(amount));
                                        totalper = totalper.add(new BigDecimal(per));
                                        totalCondVal = totalCondVal + Float.parseFloat(condVal);
                                    }
                                }
                                System.out.println("totalamount :" + totalamount);
//                    for (int k = 0; k < linkIdArray.length; k++) {
                                System.out.println("LinkId in Array :" + linkIdArray[k] + " ,condtype :" + condtype);
                                List<ConditionsLineLevel> conditionList = purchaseOrderWS.getConditionByLineitemIdAndConitionTypeAndChangeId(itemCodeArray[k], condtype, changeid);
//                            List<ConditionsLineLevel> conditionList = purchaseOrderWS.getConditionByLineitemIdAndConitionTypeAndChangeIdAndIndexNumber(itemCodeArray[k], condtype, changeid, indexnumber);
                                System.out.println("conditionList Size :" + conditionList.size());
                                if (!conditionList.isEmpty()) {
                                    for (int j = 0; j < conditionList.size(); j++) {
                                        ConditionsLineLevel conditionObj = conditionList.get(j);
//                                        conditionObj.setAmount(BigDecimal.valueOf(totalamount));
//                                        conditionObj.setPer(BigDecimal.valueOf(totalper));
                                        conditionObj.setAmount(totalamount);
                                        conditionObj.setPer(totalper);
                                        conditionObj.setConditionValue1(totalCondVal);
                                        conditionObj.setStatus("Merge");
                                        updateConditionsTabData(conditionObj);
                                    }
                                } else {
                                    conditionsLineLevel.setName(jsonobj.getString("Cname"));
                                    conditionsLineLevel.setConditionType(jsonobj.getString("Ctype"));
                                    if (!"".equals(jsonobj.getString("amount"))) {
                                        conditionsLineLevel.setAmount(new BigDecimal(jsonobj.getString("amount")));
                                    } else {
                                        conditionsLineLevel.setAmount(new BigDecimal(0.0));
                                    }
                                    conditionsLineLevel.setCurrency1(jsonobj.getString("prCurrency"));
                                    if (!"".equals(jsonobj.getString("per"))) {
                                        conditionsLineLevel.setPer(new BigDecimal(jsonobj.getString("per")));
                                    } else {
                                        conditionsLineLevel.setPer(new BigDecimal(0.0));
                                    }
                                    conditionsLineLevel.setConditionPricingUnit(jsonobj.getString("ConditionPricingUnit"));
                                    conditionsLineLevel.setUom(jsonobj.getString("UoM"));
                                    if (!"".equals(jsonobj.getString("conditionValue"))) {
                                        conditionsLineLevel.setConditionValue1(Float.parseFloat(jsonobj.getString("conditionValue")));
                                    } else {
                                        conditionsLineLevel.setConditionValue1(new Float(0.0));
                                    }

                                    conditionsLineLevel.setCurrency2(jsonobj.getString("Currency2"));
                                    if (!"".equals(jsonobj.getString("ConditionValue2"))) {
                                        conditionsLineLevel.setConditionValue2(Float.parseFloat(jsonobj.getString("ConditionValue2")));
                                    } else {
                                        conditionsLineLevel.setConditionValue2(new Float(0.0));
                                    }
                                    conditionsLineLevel.setLineitemId(itemCodeArray[k]);
                                    conditionsLineLevel.setLinkId(linkIdArray[k]);
                                    conditionsLineLevel.setPrItemNumber(itemCodeArray[k]);
                                    conditionsLineLevel.setStNumber(String.valueOf(jsonobj.getString("conditionSTUNR")));
                                    conditionsLineLevel.setConditionCount(jsonobj.getString("conditionZAEHK"));
                                    conditionsLineLevel.setKappl(jsonobj.getString("conditionKAPPL"));
                                    conditionsLineLevel.setKvsl1(jsonobj.getString("conditionKVSL1"));
                                    conditionsLineLevel.setKvsl2(jsonobj.getString("conditionKVSL2"));
                                    conditionsLineLevel.setChangeId(jsonobj.getString("CHANGEID"));
                                    conditionsLineLevel.setVendorName(jsonobj.getString("vendorname"));
                                    conditionsLineLevel.setVendorCode(jsonobj.getString("vendorcode"));
                                    conditionsLineLevel.setStatus("Insert");
                                    conditionsLineLevel.setAddedFrom(jsonobj.getString("addedFrom"));
                                    conditionsLineLevel.setConditionIndex(jsonobj.getString("indexnumber"));

                                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                                    Date today = new Date();
                                    String condPriceDate = df.format(today);
                                    conditionsLineLevel.setCondPriceDate(condPriceDate);

                                    String conditionCurrency = PrCurrencyArray[k];
                                    String poCurrency = jsonobj.getString("poCurrency");
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
                                    String message = saveConditionsTabData(conditionsLineLevel);
                                    System.out.println("message :" + message);
//                        }
                                }
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
        } else if (reqFrom.equalsIgnoreCase("deleteHeaderConditionHeader")) {
            try {
                System.out.println("deleteHeaderConditionHeader");
                out = response.getWriter();

                String linkidArrayAsString = request.getParameter("linkidArrayAsString");
                String insIdArrayAsString = request.getParameter("insIdArrayAsString");
                String conditionType = request.getParameter("conditionType");
                String amount = request.getParameter("amount");
                String per = request.getParameter("per");
                String condValueArrayAsString = request.getParameter("conditionValue");
                String count = request.getParameter("count");
                System.out.println("count: " + count);

                JSONArray conditionValAsJsonArray = new JSONArray(condValueArrayAsString);
                System.out.println("conditionType: " + conditionType);
                String[] linkIdArray = linkidArrayAsString.split(",");
                String[] InsIdArray = insIdArrayAsString.split(",");
                System.out.println("insIdArrayAsString String" + insIdArrayAsString);
                for (int i = 0; i < InsIdArray.length; i++) {
//                    List<ConditionsLineLevel> conditionList = getConditionByLinkIdAndConitionType(linkIdArray[i], conditionType);
                    List<ConditionsLineLevel> conditionList = purchaseOrderWS.getConditionByLineitemIdAndConitionTypeAndChangeId(InsIdArray[i], conditionType, "I");
                    System.out.println("conditionList Size :" + conditionList.size());
                    if (!conditionList.isEmpty()) {
                        for (int j = 0; j < conditionList.size(); j++) {
                            ConditionsLineLevel condObj = conditionList.get(j);
                            String status = condObj.getStatus();
                            if (null != status) {
                                switch (status) {
                                    case "Insert":
                                        deleteAllConditionObj(condObj);
                                        break;
                                    case "Merge":
                                        BigDecimal Amount = condObj.getAmount();
                                        BigDecimal Per = condObj.getPer();
                                        Float conditionValue = condObj.getConditionValue1();
                                        condObj.setAmount(Amount.subtract(new BigDecimal(amount)));
                                        if (!"".equals(per)) {
                                            condObj.setPer(Per.subtract(new BigDecimal(per)));
                                        }
                                        System.out.println("conditionValAsJsonArray size :" + conditionValAsJsonArray.length());
                                        for (int k = 0; k < conditionValAsJsonArray.length(); k++) {
                                            JSONObject jsonobj = conditionValAsJsonArray.getJSONObject(k);
                                            if (jsonobj.getString("itemCode").equals(InsIdArray[i])) {
                                                condObj.setConditionValue1((new BigDecimal(conditionValue).subtract(new BigDecimal(jsonobj.getString("condValue")))).floatValue());
                                            }
                                        }
                                        if(Integer.parseInt(count) > 2)
                                            condObj.setStatus("Merge");
                                        else 
                                            condObj.setStatus("Insert");
                                        updateConditionsTabData(condObj);
                                        break;
                                }
                            }
                        }
                    }
                }
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("getSumOfNetPriceOfServiceByLinkId")) {
            try {
                System.out.println("getSumOfNetPriceOfServiceByLinkId");
                out = response.getWriter();
                String LinkID = request.getParameter("LinkID");
                System.out.println("LinkID: " + LinkID);

//                List<Services> serviceList = purchaseOrderWS.getSumOfNetPriceOfServiceByLinkId(LinkID);
                BigDecimal netPriceSum = purchaseOrderWS.getSumOfNetPriceOfServiceByLinkId(LinkID);
                System.out.println("amtSum getSumOfNetPriceOfServiceByLinkId :" + netPriceSum);
//                JSONArray jsonInvoiceArr = new JSONArray(conditionList);
                out.println(netPriceSum + "");
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("saveServiceAndServiceAccAsgnOnLoad")) {
            try {
                System.out.println("saveServiceAndServiceAccAsgnOnLoad :::");
                out = response.getWriter();
                String linkidArrayAsString = request.getParameter("linkidArrayAsString");
                String[] linkIdArr = linkidArrayAsString.split(",");
                String lineItemNumberArrAsString = request.getParameter("lineItemNumberArrAsString");
                String[] lineItemNumberArr = lineItemNumberArrAsString.split(",");
                String PrItemNumberArrAsString = request.getParameter("PrItemNumberArrAsString");
                String[] PrItemNumberArr = PrItemNumberArrAsString.split(",");
                String accAsgnCatArrAsString = request.getParameter("accAsgnCatArrAsString");
                String[] accAsgnCatArr = accAsgnCatArrAsString.split(",");
                String PrType = request.getParameter("PrType");
                String PrLinkID = request.getParameter("PrLinkID");
                System.out.println("linkidArrayAsString in saveServiceAndServiceAccAsgnOnLoad: " + linkidArrayAsString);
                System.out.println("lineItemNumberArrAsString in saveServiceAndServiceAccAsgnOnLoad: " + lineItemNumberArrAsString);
                System.out.println("PrItemNumberArrAsString in saveServiceAndServiceAccAsgnOnLoad: " + PrItemNumberArrAsString);
                System.out.println("PrType::: " + PrType);
                ArrayList<String> serviceLineItemNumberList = new ArrayList<>();
                ArrayList<String> linkidList = new ArrayList<>();
                ArrayList<String> serviceLinkidList = new ArrayList<>();
                for (int i = 0; i < linkIdArr.length; i++) {
                    List<Services> servicesList = purchaseOrderWS.getServicesByLinkId(linkIdArr[i]);
                    System.out.println("servicesList :" + servicesList);
                    if (!servicesList.isEmpty()) {
                        deleteFromServices(servicesList);
                    }
                    List<CmplxPRToPOLineItemService> serviceList = getCmplxPRToPOLineItemServiceByLinkId(linkIdArr[i]);
                    System.out.println("serviceList Size ::::" + serviceList.size());
                    for (int j = 0; j < serviceList.size(); j++) {
                        CmplxPRToPOLineItemService serviceObj = serviceList.get(j);
                        serviceLineItemNumberList.add(serviceObj.getLineItemNumber());
                        linkidList.add(serviceObj.getLinkId());
                        serviceLinkidList.add(serviceObj.getServiceLinkID());
                        services.setServiceLineItemNumber(serviceObj.getLineItemNumber());
                        services.setServiceNumber(serviceObj.getServiceNumber());
                        services.setShortText(serviceObj.getShortText());
                        services.setQuantity(serviceObj.getQuantity());
                        services.setUnit(serviceObj.getUnit());
                        services.setGrossPrice(serviceObj.getGrossPrice());
                        services.setCurrency(serviceObj.getCurrency());
                        services.setNetPrice(serviceObj.getNetPrice());
                        services.setEdition(serviceObj.getEdition());
                        services.setLineItemLongText(serviceObj.getLineItemLongText());
                        services.setOverfTolerance(serviceObj.getOverfTolerance());
                        services.setLineItemNumber(lineItemNumberArr[i]);
                        services.setLinkId(serviceObj.getLinkId());
                        services.setServiceLinkId(serviceObj.getServiceLinkID());
                        services.setPrItemNumber(PrItemNumberArr[i]);
                        services.setLineNoServ(null);
                        services.setNetValue(serviceObj.getNetPrice());
                        String ServiceId = "";
                        if (serviceObj.getServiceNumber() != null) {
                            List<MasterServiceMaster> serviceMasterList = purchaseOrderWS.getServiceMasterByServiceNumber(serviceObj.getServiceNumber());
                            if (!serviceMasterList.isEmpty()) {
                                MasterServiceMaster serviceMasterObj = serviceMasterList.get(0);
                                services.setServiceText(serviceMasterObj.getSLTextInfo());
                                // Make entry in NG_BP_ServicesLongTexts for each service
                                servicesLongTextsEntity.setShortText(serviceObj.getShortText());
                                servicesLongTextsEntity.setLineItemLongText(serviceObj.getLineItemLongText());
                                servicesLongTextsEntity.setServiceText(serviceMasterObj.getSLTextInfo());
                                ServiceId = purchaseOrderWS.saveServicesLongTexts(servicesLongTextsEntity);
                            } else {
                                services.setServiceText("");
                                // Make entry in NG_BP_ServicesLongTexts for each service
                                servicesLongTextsEntity.setShortText(serviceObj.getShortText());
                                servicesLongTextsEntity.setLineItemLongText(serviceObj.getLineItemLongText());
                                servicesLongTextsEntity.setServiceText("");
                                ServiceId = purchaseOrderWS.saveServicesLongTexts(servicesLongTextsEntity);
                            }
                        }
                        services.setServicesLongTextId(ServiceId);
                        String msg = saveServiceTableData(services);
                        System.out.println("services msg :" + msg);
                    }
                }
                System.out.println("serviceLineItemNumberList Size :" + serviceLineItemNumberList.size());

                for (int i = 0; i < serviceLineItemNumberList.size(); i++) {
                    for (int j = 0; j < linkIdArr.length; j++) {
                        System.out.println("ServiceLink id [" + i + "]::" + linkidList.get(i) + " , Pr linkid [" + j + "]:" + linkIdArr[j]);
                        if (linkidList.get(i).equals(linkIdArr[j])) {
                            System.out.println("ServiceLink id in [" + i + "]::" + linkidList.get(i) + " , Pr linkid [" + j + "]:" + linkIdArr[j]);
                            System.out.println("serviceLineItemNumberList values[" + i + "] :" + serviceLineItemNumberList.get(i));
                            List<ServiceAccountAssignment> accAsgnList = getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumberList.get(i), lineItemNumberArr[j]);
                            System.out.println("accAsgnList :::" + accAsgnList.size());
                            if (!accAsgnList.isEmpty()) {
                                deleteAllFromServiceAccountAssignment(accAsgnList);
                            }
                            List<CmplxPRToPOLineItemPRAccountAssignmentValues> cmplxList = getCmplxPRToPOLineItemPRAccountAssignmentValuesByServiceLinkId(serviceLinkidList.get(i));
                            System.out.println("cmplxList Assignment :" + cmplxList.size());
                            for (int k = 0; k < cmplxList.size(); k++) {
                                CmplxPRToPOLineItemPRAccountAssignmentValues cmplxObj = cmplxList.get(k);
                                if (!"".equals(cmplxObj.getGLAccount())) {
                                    serviceAccountAssignment.setGLAccount(cmplxObj.getGLAccount());
                                } else {
                                    serviceAccountAssignment.setGLAccount("");
                                }
                                if (!"".equals(cmplxObj.getCoArea())) {
                                    serviceAccountAssignment.setCOArea(cmplxObj.getCoArea());
                                } else {
                                    serviceAccountAssignment.setCOArea("");
                                }
                                if (!"".equals(cmplxObj.getCostCenter())) {
                                    serviceAccountAssignment.setCostCenter(cmplxObj.getCostCenter());
                                } else {
                                    serviceAccountAssignment.setCostCenter("");
                                }
                                if (!"".equals(cmplxObj.getAccOrder())) {
                                    serviceAccountAssignment.setAccAsngOrder(cmplxObj.getAccOrder());
                                } else {
                                    serviceAccountAssignment.setAccAsngOrder("");
                                }
                                if (!"".equals(cmplxObj.getAccAsset())) {
                                    serviceAccountAssignment.setAsset(cmplxObj.getAccAsset());
                                } else {
                                    serviceAccountAssignment.setAsset("");
                                }
                                if (!"".equals(cmplxObj.getAccWBSElement())) {
                                    serviceAccountAssignment.setWBSElement(cmplxObj.getAccWBSElement());
                                } else {
                                    serviceAccountAssignment.setWBSElement("");
                                }
                                if (!"".equals(cmplxObj.getSalesOrder())) {
                                    serviceAccountAssignment.setSalesOrder(cmplxObj.getSalesOrder());
                                } else {
                                    serviceAccountAssignment.setSalesOrder("");
                                }
                                if (!"".equals(cmplxObj.getItemNumber())) {
                                    serviceAccountAssignment.setItemNumber(cmplxObj.getItemNumber());
                                } else {
                                    serviceAccountAssignment.setItemNumber("");
                                }
                                if (!"".equals(cmplxObj.getDeliverySchedule())) {
                                    serviceAccountAssignment.setDeliverySchedule(cmplxObj.getDeliverySchedule());
                                } else {
                                    serviceAccountAssignment.setDeliverySchedule("");
                                }
                                if (!"".equals(cmplxObj.getFund())) {
                                    serviceAccountAssignment.setFund(cmplxObj.getFund());
                                } else {
                                    serviceAccountAssignment.setFund("");
                                }
                                if (!"".equals(cmplxObj.getFunctionalArea())) {
                                    serviceAccountAssignment.setFunctionalArea(cmplxObj.getFunctionalArea());
                                } else {
                                    serviceAccountAssignment.setFunctionalArea("");
                                }
                                if (!"".equals(cmplxObj.getFundsCentre())) {
                                    serviceAccountAssignment.setFundCenter(cmplxObj.getFundsCentre());
                                } else {
                                    serviceAccountAssignment.setFundCenter("");
                                }
                                if (!"".equals(cmplxObj.getCommitmentItem())) {
                                    serviceAccountAssignment.setCommitmentItem(cmplxObj.getCommitmentItem());
                                } else {
                                    serviceAccountAssignment.setCommitmentItem("");
                                }
                                if (!"".equals(cmplxObj.getNetwork())) {
                                    serviceAccountAssignment.setNetActNumber(cmplxObj.getNetwork());
                                } else {
                                    serviceAccountAssignment.setNetActNumber("");
                                }
                                if (!"".equals(lineItemNumberArr[j])) {
                                    serviceAccountAssignment.setLineItemNumber(lineItemNumberArr[j]);
                                } else {
                                    serviceAccountAssignment.setLineItemNumber("");
                                }
                                if (!"".equals(serviceLineItemNumberList.get(i))) {
                                    serviceAccountAssignment.setServiceLineItemNumber(serviceLineItemNumberList.get(i));
                                } else {
                                    serviceAccountAssignment.setServiceLineItemNumber("");
                                }
                                System.out.println("Service Account Assignment Quantity :" + cmplxObj.getQuantity());
                                if (!"".equals(cmplxObj.getQuantity())) {
                                    serviceAccountAssignment.setQuantity(cmplxObj.getQuantity());
                                } else {
                                    serviceAccountAssignment.setQuantity(new BigDecimal(0.0));
                                }
                                if (!"".equals(cmplxObj.getLinkNumber())) {
                                    serviceAccountAssignment.setLinkNumber(cmplxObj.getLinkNumber());
                                } else {
                                    serviceAccountAssignment.setLinkNumber("");
                                }
                                if (!"".equals(cmplxObj.getNetvalue())) {
                                    System.out.println("NetValue Non Empty: " + cmplxObj.getNetvalue());
                                    serviceAccountAssignment.setNetValaue(cmplxObj.getNetvalue());
                                } else {
                                    System.out.println("NetValue Empty: " + cmplxObj.getNetvalue());
                                    serviceAccountAssignment.setNetValaue(new BigDecimal(0.0));
                                }
                                if (!"".equals(PrItemNumberArr[j])) {
                                    serviceAccountAssignment.setPrItemNumber(PrItemNumberArr[j]);
                                } else {
                                    serviceAccountAssignment.setPrItemNumber("");
                                }
                                if (!"".equals(accAsgnCatArr[j])) {
                                    serviceAccountAssignment.setAccountAssignment(accAsgnCatArr[j]);
                                } else {
                                    serviceAccountAssignment.setAccountAssignment("");
                                }
                                if (!"".equals(cmplxObj.getLinkID())) {
                                    serviceAccountAssignment.setLinkId(cmplxObj.getLinkID());
                                } else {
                                    serviceAccountAssignment.setLinkId("");
                                }
                                System.out.println("Distribution on load :" + cmplxObj.getDistribution());
                                switch (cmplxObj.getDistribution()) {
                                    case "Distrib. By Percentage":
                                        serviceAccountAssignment.setDistribution("2");
                                        break;
                                    case "Distrib. On Quantity Basis":
                                        serviceAccountAssignment.setDistribution("1");
                                        break;
                                    case "Single Account Assignment":
                                        serviceAccountAssignment.setDistribution("");
                                        break;
                                }
//                            serviceAccountAssignment.setDistribution(cmplxObj.getDistribution());
                                serviceAccountAssignment.setPercentage(cmplxObj.getPercentage());
                                serviceAccountAssignment.setRecipient(cmplxObj.getRecipient());
                                serviceAccountAssignment.setUnloadingPoint(cmplxObj.getUnloadingPoint());
                                serviceAccountAssignment.setLineNoSerAcc(null);
                                String msg = saveServiceAccountAssignment(serviceAccountAssignment);
                                System.out.println("serviceLineItemNumberList Bittu :" + serviceLineItemNumberList.get(i) + "LineItemNumber Bittu :" + lineItemNumberArr[j]);
                                List<Services> serList = purchaseOrderWS.findByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumberList.get(i), lineItemNumberArr[j]);
                                System.out.println("serviceList size on load save :" + serList.size() + " ,Distribution :" + cmplxObj.getDistribution());
                                if (!serList.isEmpty()) {
                                    Services serObj = serList.get(0);
                                    switch (cmplxObj.getDistribution()) {
                                        case "Distrib. By Percentage":
                                            serObj.setDistribution("2");
                                            break;
                                        case "Distrib. On Quantity Basis":
                                            serObj.setDistribution("1");
                                            break;
                                        case "Single Account Assignment":
                                            serObj.setDistribution("");
                                            break;
                                    }
                                    updateServiceTableData(serObj);
                                }
                                System.out.println("msg :" + msg);
                                System.out.println("LineItemNumber [" + i + "][" + j + "]:" + lineItemNumberArr[j] + " , LinkID :" + cmplxObj.getLinkID() + " , ServiceLineItemNumber :" + serviceLineItemNumberList.get(i));
                                purchaseOrderWS.ServiceAccountAssignmentFunction(lineItemNumberArr[j], linkIdArr[j], serviceLineItemNumberList.get(i), "");
                            }
                        }
                    }
                }
                List<AccountAssignment> accAsgnList = purchaseOrderWS.getPrAccountAssignmentByLinkId(PrLinkID);
                System.out.println("accAsgnList :::" + accAsgnList);
                JSONArray jsonArr = new JSONArray(accAsgnList);
                out.println(jsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("getCountForCards")) {
            try {
                System.out.println("getCountForCards");
                JSONObject jObjCount = new JSONObject();
                out = response.getWriter();
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
                String username = buyer.getUsername();
                System.out.println("username : " + username);
                List<BuyerPendingPRLineItemsBean> buyerOverduePendingPRList = purchaseOrderWS.callBuyerPendingPrLineItemsStoredProcedure(buyer.getId(), "Overdue", no_of_days, "");
                System.out.println("buyerOverduePendingPRList::: " + buyerOverduePendingPRList.size());
                List<BuyerPendingPRLineItemsBean> vendorFinalizedList = purchaseOrderWS.callBuyerPendingPrLineItemsStoredProcedure(buyer.getId(), "vendorfinalized", 0, "");
                System.out.println("vendorFinalizedList:::: " + vendorFinalizedList.size());
                List<BuyerPendingPRLineItemsBean> rfqClosureList = purchaseOrderWS.callBuyerPendingPrLineItemsStoredProcedure(buyer.getId(), "rfqclosure", 0, "");
                System.out.println("rfqClosureList:::: " + rfqClosureList.size());
                List<NGExtPOCreation> acknowlegdePOList = purchaseOrderWS.findByCurrentWorkstepAndInitiatorId("Vendor Ack", buyer.getUsername());
                System.out.println("acknowlegdePOList:::: " + acknowlegdePOList.size());

                jObjCount.put("buyerOverduePendingPRList", buyerOverduePendingPRList);
                jObjCount.put("vendorFinalizedList", vendorFinalizedList);
                jObjCount.put("rfqClosureList", rfqClosureList);
                jObjCount.put("acknowlegdePOList", acknowlegdePOList);

                out.println(jObjCount);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("getPurchaseOrderNumber")) {
            try {
                System.out.println("getPurchaseOrderNumber");
                out = response.getWriter();
//                String companyCode = request.getParameter("companyCode");
//                System.out.println("companyCode: " + companyCode);
                List<NGExtPOCreation> extList = purchaseOrderWS.getExtPOCreationByCompanyCode();
                JSONArray jsonExtArr = new JSONArray(extList);
                out.println(jsonExtArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("getMasterMaterialGeneralByCoCodeAndMaterialCode")) {
            try {
                System.out.println("getMasterMaterialGeneralByCoCodeAndMaterialCode");
                out = response.getWriter();

//                String accAsgn = request.getParameter("accAsgn");
                String companyCode = request.getParameter("companyCode");
                String matCode = request.getParameter("matCode");

//                System.out.println("accAsgn: " + accAsgn);
                System.out.println("companyCode: " + companyCode);
                System.out.println("matCode: " + matCode);

                List<MasterMaterialGeneral> masterMaterialList = getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                System.out.println("masterMaterialList size: " + masterMaterialList.size());
//
                JSONArray jsonMaterialArr = new JSONArray(masterMaterialList);
                out.println(jsonMaterialArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (reqFrom.equalsIgnoreCase("updateInConditionTable")) {
            try {
                System.out.println("updateInConditionTable in POAjax");
                out = response.getWriter();
                String condition = request.getParameter("conditionLineLevelArr");
                JSONArray conditionAsJsonArray = new JSONArray(condition);
                System.out.println("conditionAsJsonArray updateInConditionTable :" + conditionAsJsonArray.toString());
                for (int i = 0; i < conditionAsJsonArray.length(); i++) {
                    JSONObject jsonobj = conditionAsJsonArray.getJSONObject(i);
                    String linkid = jsonobj.getString("linkid");
                    System.out.println("LinkId in saveConditionsDataOnAddingInHeader :" + jsonobj.getString("linkid"));
                    String condtype = jsonobj.getString("Ctype");
                    String changeid = jsonobj.getString("CHANGEID");
                    System.out.println("changeid :" + changeid);
                    List<ConditionsLineLevel> conditionList = getConditionByLinkIdAndConitionTypeAndChangeId(linkid, condtype, changeid);
                    System.out.println("conditionList Size :" + conditionList.size());
                    if (!conditionList.isEmpty()) {
                        for (int j = 0; j < conditionList.size(); j++) {
                            ConditionsLineLevel conditionObj = conditionList.get(j);
                            String vendorcode = jsonobj.getString("vendorcode");
                            String vendorname = jsonobj.getString("vendorname");
                            conditionObj.setVendorCode(vendorcode);
                            conditionObj.setVendorName(vendorname);
                            updateConditionsTabData(conditionObj);
                        }
                    }
                }

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateDeiveryTabData")) {
            try {
                System.out.println("updateDeiveryTabData in POAjax");
                out = response.getWriter();
                String insertionOrderIdAsString = request.getParameter("insertionOrderIdArrayAsString");
                String IncoTermsPart1 = request.getParameter("IncoTermsPart1");
                String IncoTermsPart2 = request.getParameter("IncoTermsPart2");
                String[] insertionOrderIdArray = insertionOrderIdAsString.split(",");
                for (int i = 0; i < insertionOrderIdArray.length; i++) {
                    List<Delivery> deliveryList = getDeliveryByInsertionId(insertionOrderIdArray[i]);
                    if (!deliveryList.isEmpty()) {
                        for (int j = 0; j < deliveryList.size(); j++) {
                            Delivery deliveryObj = deliveryList.get(j);
                            deliveryObj.setIncoTerms1(IncoTermsPart1);
                            deliveryObj.setIncoTerms(IncoTermsPart2);
                            updateDelivery(deliveryObj);
                        }
                    }
                }

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    List<VendorDetails> getVendorByUsername(String username
    ) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallvendorbyusername.do?username=" + username;
        System.out.println("url: " + url);
        ResponseEntity<List<VendorDetails>> vendorResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });
        System.out.println("vendorResponse: " + vendorResponse);
        List<VendorDetails> vendorList = vendorResponse.getBody();
        return vendorList;
    }

    List<BuyerDetails> getByUsername(String username
    ) {

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
        List<SupplierHeader> supplierHeaderList = restGroupResponse.getBody();
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

//    List<PRDetails> getPrDetailsById(int prid) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        System.out.println("prid in getPrDetailsById :" + prid);
//
//        String url = webservice_ip + "/BuyerPortalWebServices/getprdetailsbyid.do?prid=" + prid;
//
//        System.out.println("url: " + url);
//
//        ResponseEntity<List<PRDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PRDetails>>() {
//        });
//
//        List<PRDetails> prList = response.getBody();
//
//        return prList;
//    }
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

    String updateRfqHeader(WorkOrderRfqHeader obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheader.do";
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

        return str.getMessage();
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

    String updateWorkOrderAttachmentTemp(WorkOrderAttachmentTemp obj) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateWorkOrderAttachmentTemp.do";
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

    public List<PurchaseRequestStatusReportBean> callPurchaseRequestStatusReportStoredProcedure(String PlantCode, String PrNo, String PurchaseGroup, String PRRaisedBy, String fromPRApprovedDate, String toPRApprovedDate, String fromRequiredDate, String toRequiredDate, String TrackingNumber, String ProcessingStatus, String ToPlantCode, String ToPrNo, String ToPurchaseGroup) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPurchaseRequestStatusReportStoredProcedure.do?PlantCode=" + PlantCode + "&PrNo=" + PrNo + "&PurchaseGroup=" + PurchaseGroup + "&PRRaisedBy=" + PRRaisedBy + "&fromPRApprovedDate=" + fromPRApprovedDate + "&toPRApprovedDate=" + toPRApprovedDate + "&fromRequiredDate=" + fromRequiredDate + "&toRequiredDate=" + toRequiredDate + "&TrackingNumber=" + TrackingNumber + "&ProcessingStatus=" + ProcessingStatus + "&ToPlantCode=" + ToPlantCode + "&ToPrNo=" + ToPrNo + "&ToPurchaseGroup=" + ToPurchaseGroup;
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

    String updateSupplierHeader(SupplierHeader supplier) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateSupplierHeader.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), supplier, String.class);
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

    String saveFinalizedRfq(FinalizedRfq rfq) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveFinalizedRfq.do";
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

    List<MasterPricingDescription> getPricingDescriptionByKSCHL(String KSCHL) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getpricingdescriptionbykschl.do?KSCHL=" + KSCHL;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPricingDescription>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPricingDescription>>() {
        });
        List<MasterPricingDescription> kSCHLList = response.getBody();
        System.out.println("kSCHLList size: " + kSCHLList.size());
        return kSCHLList;
    }

    List<MasterTaxCode> getAllTaxCode() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getalltaxcode.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterTaxCode>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterTaxCode>>() {
        });
        List<MasterTaxCode> taxList = response.getBody();
        System.out.println("taxList size: " + taxList.size());
        return taxList;
    }

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

    List<MasterPricingProcedures> getByPricingProcedure(String pricingprocedure) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getbypricingprocedure.do?pricingprocedure=" + pricingprocedure;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPricingProcedures>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPricingProcedures>>() {
        });
        List<MasterPricingProcedures> list = response.getBody();
        System.out.println("pricingprocedurelist size: " + list.size());
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

    String savePO(HttpServletRequest request, HttpServletResponse response) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Coming Here in saveHeaderSPO");
        System.out.println("Paramenter  :::: " + request.getParameter("formdata"));

        JSONObject json = new JSONObject(request.getParameter("formdata"));
        System.out.println("json.optString(\"poid\") " + json.optString("poid"));
        if (!"".equalsIgnoreCase(json.optString("poid"))) {
            bPExtPOCreation.setId(Integer.parseInt(json.optString("poid")));
        }

        bPExtPOCreation.setCompanyCode(json.optString("companycodeHeader"));
//                bPExtPOCreation.setDocumentDate("");
        System.out.println("ur: " + webservice_ip + "/BuyerPortalWebServices/saveSAPO.do");
        System.out.println("companycodeHeader " + bPExtPOCreation);

        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveSAPO.do"), bPExtPOCreation, String.class);
        System.out.println("Before IDs");
        System.out.println("ID ::: " + id);
        return id;

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

    List<MasterMaterialGeneral> getMasterMaterialGeneralByAccAsgnAndCoCode(String accAsgn, String companyCode, String recordCount, String materialCodeOrShortText, String lastMatSno) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterMaterialGeneralByAccAsgnAndCoCode.do?accAsgn=" + accAsgn + "&companyCode=" + companyCode + "&recordCount=" + recordCount + "&materialCodeOrShortText=" + materialCodeOrShortText + "&lastMatSno=" + lastMatSno;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGeneral>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGeneral>>() {
        });
        List<MasterMaterialGeneral> list = response.getBody();
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
        List<Component> componentList = response.getBody();
        return componentList;
    }

    List<Component> getComponentByLinkId(String linkId) {
        System.out.println("getComponentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getComponentByLinkId.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<Component>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Component>>() {
        });
        List<Component> componentList = response.getBody();
        return componentList;
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

    String deleteAllConditionObj(ConditionsLineLevel condObj) {
        System.out.println("conditionList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllConditionObj.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, condObj, String.class);
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
        System.out.println("country: " + country);
        List<MasterCurrency> currencyList = country.getBody();
        return currencyList;
    }

    public List<MasterCostCentre> getAllCostCenter() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcostcenter.do";
        ResponseEntity<List<MasterCostCentre>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCostCentre>>() {
        });
        System.out.println("costCenter: " + costCenter);
        List<MasterCostCentre> costCenterList = costCenter.getBody();
        return costCenterList;
    }

    public List<MasterItemCategory> getAllItemCategory() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallitemcategory.do";
        ResponseEntity<List<MasterItemCategory>> item = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterItemCategory>>() {
        });
        System.out.println("Item Category: " + item);
        List<MasterItemCategory> itemCategoryList = item.getBody();
        return itemCategoryList;
    }

//    public List<MasterInternalOrder> getAllInterOrder() {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/getallinterorder.do";
//        ResponseEntity<List<MasterInternalOrder>> order = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterInternalOrder>>() {
//        });
//        System.out.println("order: " + order);
//        List<MasterInternalOrder> orderObj = order.getBody();
//        return orderObj;
//    }
    public List<MasterGLCode> getAllGLCode() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallglcode.do";
        ResponseEntity<List<MasterGLCode>> code = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterGLCode>>() {
        });
        System.out.println("code: " + code);
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
        ResponseEntity<List<MasterNetwork>> network = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterNetwork>>() {
        });
        System.out.println("network: " + network);
        List<MasterNetwork> networkObj = network.getBody();
        return networkObj;
    }

    public List<MasterAsset> getAllMasterAsset() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasterasset.do";
        ResponseEntity<List<MasterAsset>> asset = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterAsset>>() {
        });
        System.out.println("asset: " + asset);
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

    List<MasterShippingInstruction> getAllShippingInstruction() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallshippinginstruction.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterShippingInstruction>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterShippingInstruction>>() {
        });
        List<MasterShippingInstruction> list = response.getBody();
        System.out.println("Instruction size: " + list.size());
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

    public List<MasterPartnerFunction> getAllMasterPartnerFunctions() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getAllMasterPartnerFunctions.do";
        ResponseEntity<List<MasterPartnerFunction>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPartnerFunction>>() {
        });
        System.out.println("response: " + response);
        List<MasterPartnerFunction> list = response.getBody();
        return list;
    }

    public List<MasterVendor> findVendorByCompanyCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findVendorByCompanyCode.do?CompanyCode=" + companyCode;
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

    List<NGCmplxPOCreationApproverDetails> findPOCreationApproverDetailsByProcInstId(String procInstId) {
        System.out.println("findPOCreationApproverDetailsByProcInstId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPOCreationApproverDetailsByProcInstId.do?procInstId=" + procInstId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGCmplxPOCreationApproverDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGCmplxPOCreationApproverDetails>>() {
        });
        List<NGCmplxPOCreationApproverDetails> list = response.getBody();
        return list;
    }

    List<FinalizedRfq> findByRfqIdAndVendorIdAndInsertionOrderId(int rfqId, int vendorId, int insertionOrderId) {
        System.out.println("findByRfqIdAndVendorIdAndInsertionOrderId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByRfqIdAndVendorIdAndInsertionOrderId.do?rfqId=" + rfqId + "&vendorId=" + vendorId + "&insertionOrderId=" + insertionOrderId;
        System.out.println("url: " + url);
        ResponseEntity<List<FinalizedRfq>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<FinalizedRfq>>() {
        });
        List<FinalizedRfq> list = response.getBody();
        return list;
    }

    String updateFinalizedRfq(FinalizedRfq rfq) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateFinalizedRfq.do"), rfq, String.class);
        System.out.println("updateFinalizedRfq : " + msg);
        return msg;
    }

    List<SupplierLineitem> findSupplierRfqLineItemByMultipleSupplierHeaderId(String supplierHeaderIds) {
        System.out.println("findSupplierRfqLineItemByMultipleSupplierHeaderId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierRfqLineItemByMultipleSupplierHeaderId.do?supplierHeaderIds=" + supplierHeaderIds;
        System.out.println("url: " + url);
        ResponseEntity<List<SupplierLineitem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {
        });
        List<SupplierLineitem> supplierRfqLineItemList = response.getBody();
        return supplierRfqLineItemList;
    }

    List<NGBPCmplxPOCreationInvoice> getInvoiceByLinkId(String linkid) {
        System.out.println("getInvoiceByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getInvoiceByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationInvoice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationInvoice>>() {
        });
        List<NGBPCmplxPOCreationInvoice> invoice = response.getBody();
        return invoice;
    }

    List<NGBPCmplxPOCreationLineItemPOAccountAssignment> getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange(String linkid) {
        System.out.println("getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignment>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accAsgn = response.getBody();
        return accAsgn;
    }

//    List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(String serviceLineItemNumber, String lineItemNumber, String PoId) {
//        System.out.println("getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId");
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId.do?serviceLineItemNumber=" + serviceLineItemNumber + "&lineItemNumber=" + lineItemNumber + "&PoId=" + PoId;
//        System.out.println("url: " + url);
//        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>>() {
//        });
//        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgn = response.getBody();
//        return accAsgn;
//    }
    List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumberAndPoId(String linkid, String serviceLineItemNumber, String PoId) {
        System.out.println("getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumberAndPoId.do?linkid=" + linkid + "&serviceLineItemNumber=" + serviceLineItemNumber + "&PoId=" + PoId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues>>() {
        });
        List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgn = response.getBody();
        return accAsgn;
    }

    List<NGBPCmplxPOCreationLineItemService> getServiceByLinkid(String linkid) {
        System.out.println("getServiceByLinkidAndPoId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getServiceByLinkid.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemService>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemService>>() {
        });
        List<NGBPCmplxPOCreationLineItemService> service = response.getBody();
        return service;
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

    List<ProfitabilitySegment> findProfitabilitySegmentByPRItemNumber(String prItemNumber) {
        System.out.println("findProfitabilitySegmentByPRItemNumber");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findProfitabilitySegmentByPRItemNumber.do?prItemNumber=" + prItemNumber;
        System.out.println("url: " + url);
        ResponseEntity<List<ProfitabilitySegment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ProfitabilitySegment>>() {
        });
        List<ProfitabilitySegment> list = response.getBody();
        return list;
    }

    List<MasterPurchaseOrg> getMasterPurchaseOrg() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallpurchaseorg.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPurchaseOrg>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchaseOrg>>() {
        });
        List<MasterPurchaseOrg> list = response.getBody();
        return list;
    }

    List<NGBPCmplxPOCreationLineItemProfitabilitySegment> FindProfitabilitySegmentByLinkId(String linkId) {
        System.out.println("FindProfitabilitySegmentByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/FindProfitabilitySegmentByLinkId.do?linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemProfitabilitySegment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemProfitabilitySegment>>() {
        });
        List<NGBPCmplxPOCreationLineItemProfitabilitySegment> list = response.getBody();
        return list;
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

//    List<NGBPCmplxPOCreationLineItemConditions> getConditionByLinkId(String linkId) {
//        System.out.println("FindProfitabilitySegmentByLinkId");
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/getConditionByLinkId.do?linkId=" + linkId;
//        System.out.println("url: " + url);
//        ResponseEntity<List<NGBPCmplxPOCreationLineItemConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemConditions>>() {
//        });
//        List<NGBPCmplxPOCreationLineItemConditions> list = response.getBody();
//        return list;
//    }
    List<NGBPCmplxPOCreationLineItemConditions> getNGBPCmplxPOCreationConditionsByLinkId(String linkid) {
        System.out.println("getNGBPCmplxPOCreationConditionsByLinkId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPCmplxPOCreationConditionsByLinkId.do?linkid=" + linkid;
        System.out.println("url: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemConditions>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemConditions>>() {
        });
        List<NGBPCmplxPOCreationLineItemConditions> condition = response.getBody();
        return condition;
    }

    public List<AccountAssignmentCategoryMaster> getAllAccountAssignmentCategory() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallaccountassignmentcategory.do";

        ResponseEntity<List<AccountAssignmentCategoryMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignmentCategoryMaster>>() {
        });
        System.out.println("response: " + response);
        List<AccountAssignmentCategoryMaster> accountList = response.getBody();

        return accountList;
    }

    List<MasterLocation> getMasterLocation() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterLocation.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterLocation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterLocation>>() {
        });
        List<MasterLocation> list = response.getBody();
        return list;
    }

    List<MasterDepartment> getMasterDepartment() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterDepartment.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterDepartment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDepartment>>() {
        });
        List<MasterDepartment> list = response.getBody();
        return list;
    }

    String deleteAllQuantityWeightByInsertionOrderId(List<QuantityDates> list) {
        System.out.println("deleteAllQuantityWeightByInsertionOrderId========");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteAllQuantityWeightByInsertionOrderId.do";
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, list, String.class);
        return result;
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

    String saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(NGBPCmplxPOCreationLineItemPOAccountAssignmentValues serviceAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues.do"), serviceAccountAssignment, String.class);
        System.out.println("NGBPCmplxPOCreationLineItemPOAccountAssignmentValues msg : " + msg);
        return msg;
    }

    String saveNGBPCmplxPOCreationLimitsAccountAssignment(NGBPCmplxPOCreationLimitsAccountAssignment limitAccountAssignment) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("limitAccountAssignment :" + limitAccountAssignment);
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGBPCmplxPOCreationLimitsAccountAssignment.do"), limitAccountAssignment, String.class);
        System.out.println("saveNGBPCmplxPOCreationLimitsAccountAssignment :" + msg);
        return msg;
    }

    String deleteNgBpCmlxPoCreationLimitAccountAssignment(List<NGBPCmplxPOCreationLimitsAccountAssignment> limitAccAsgnList) {
        System.out.println("accAsgnList");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/deleteNgBpCmlxPoCreationLimitAccountAssignment.do?limitAccAsgnList=" + limitAccAsgnList;
        System.out.println("url:" + url);
        String result = restTemplate.postForObject(url, limitAccAsgnList, String.class);
        return result;
    }

    List<ConditionsLineLevel> getConditionByLinkIdAndConitionType(String LinkId, String conditionType) {
        System.out.println("getConditionByLinkIdAndConitionType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionByLinkIdAndConitionType.do?LinkId=" + LinkId + "&conditionType=" + conditionType;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> conditionObj = response.getBody();
        return conditionObj;
    }

    List<MasterMaterialGeneral> getMasterMaterialGeneralByCoCodeAndMaterialCode(String companyCode, String matCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterMaterialGeneralByCoCodeAndMaterialCode.do?companyCode=" + companyCode + "&matCode=" + matCode;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGeneral>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGeneral>>() {
        });
        List<MasterMaterialGeneral> list = response.getBody();
        return list;
    }

    List<ConditionsLineLevel> getConditionByLinkIdAndConitionTypeAndChangeId(String LinkId, String conditionType, String changeid) {
        System.out.println("getConditionByLinkIdAndConitionType");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getConditionByLinkIdAndConitionTypeAndChangeId.do?LinkId=" + LinkId + "&conditionType=" + conditionType + "&changeid=" + changeid;
        System.out.println("url: " + url);
        ResponseEntity<List<ConditionsLineLevel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ConditionsLineLevel>>() {
        });
        List<ConditionsLineLevel> conditionObj = response.getBody();
        return conditionObj;
    }
}
