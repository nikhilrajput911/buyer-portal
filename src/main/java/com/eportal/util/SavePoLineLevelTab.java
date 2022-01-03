/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.util;

import com.eportal.entities.AccountAssignment;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.CmplxPOCreationApproverDetailsDraft;
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
import com.eportal.entities.Limits;
import com.eportal.entities.MaterialTab;
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
import com.eportal.entities.ProfitabilitySegment;
import com.eportal.entities.QuantityDates;
import com.eportal.entities.ServiceAccountAssignment;
import com.eportal.entities.Services;
import com.eportal.entities.ServicesLongTexts;
import com.eportal.entities.Text;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.StandalonePoWS;
import java.math.BigDecimal;
import java.net.URI;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@Component
public class SavePoLineLevelTab {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Autowired
    Invoice invoice;
    @Autowired
    Services services;
    @Autowired
    ServiceAccountAssignment serviceAccountAssignment;
    @Autowired
    ConditionsLineLevel conditionsLineLevel;
    @Autowired
    AccountAssignment accountAssignment;
    @Autowired
    QuantityDates quantityDates;
    @Autowired
    DeliverySchedule deliverySchedule;
    @Autowired
    Confirmations confirmations;
    @Autowired
    ConditionControl conditionControl;
    @Autowired
    Delivery delivery;
    @Autowired
    DeliveryAddress deliveryAddress;
    @Autowired
    Limits limits;
    @Autowired
    Text text;
    @Autowired
    CustomerData customerData;
    @Autowired
    PurchaseOrderWS purchaseOrderWS;
    @Autowired
    NGBPCmplxPOCreationInvoice invInvoice;
    @Autowired
    StandalonePoWS standalonePoWS;
    @Autowired
    NGBPCmplxPOCreationDeliveryAddress invDel;
    @Autowired
    NGBPCmplxPOCreationDelivery pOCreationDel;
    @Autowired
    NGBPCmplxPOCreationLimits nGBPCmplxPOCreationLimits;
    @Autowired
    NGBPCmplxPOCreationQuantitiesWeights pOCreationQuanWeight;
    @Autowired
    NGBPCmplxPOCreationTexts pOCreationText;
    @Autowired
    NGBPCmplxPOCreationConfirmations invCon;
    @Autowired
    NGBPCmplxPOCreationConditionControl invCond;
    @Autowired
    NGBPCmplxPOCreationLineItemCustomerData invCusData;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignment sTAccountAssignment;
    @Autowired
    NGBPCmplxPOCreationLineItemConditions condition;
    @Autowired
    NGBPCmplxPOCreationDelverySchedule nGBPCmplxPOCreationDelverySchedule;
    @Autowired
    NGBPCmplxPOCreationLineItemService nGBPCmplxPOCreationLineItemService;
    @Autowired
    NGBPCmplxPOCreationLineItemPOAccountAssignmentValues nGBPCmplxPOCreationLineItemPOAccountAssignmentValues;
    @Autowired
    ExtPoCreationDraft extPoCreationDraftEntity;
    @Autowired
    CmplxPoCreationDeliveryInvoiceDraft cmplxPoCreationDeliveryInvoiceDraftEntity;
    @Autowired
    CmplxPoCreationConditionsDraft cmplxPoCreationConditionsDraftEntity;
    @Autowired
    CmplxPoCreationVendorAddressDraft cmplxPoCreationVendorAddressDraftEntity;
    @Autowired
    CmplxPoCreationCommunicationDraft cmplxPoCreationCommunicationDraftEntity;
    @Autowired
    CmplxPoCreationHeaderTextDraft cmplxPoCreationHeaderTextDraftEntity;
    @Autowired
    CmplxPoCreationLineItemPoDraft cmplxPoCreationLineItemPoDraftEntity;
    @Autowired
    PurchaseOrderWS purchaseOrderWSUtil;
    @Autowired
    CmplxPoCreationCustomerDataDraft cmplxPoCreationCustomerDataDraftEntity;
    @Autowired
    MaterialTab materialTabEntity;
    @Autowired
    com.eportal.entities.Component componentEntity;
    @Autowired
    ProfitabilitySegment profitabilitySegmentEntity;
    @Autowired
    ServicesLongTexts servicesLongTextsEntity;
    @Autowired
    NGBPCmplxPOCreationLineItemMaterialTab materialTab;
    @Autowired
    NGBPCmplxPOCreationLineItemComponent component;
    @Autowired
    NGBPCmplxPOCreationLineItemProfitabilitySegment profitabilitySegment;
    @Autowired
    CmplxPOCreationApproverDetailsDraft cmplxPOCreationApproverDetailsDraftEntity;

    public void saveInvoiceTabData(JSONArray POInvoiceDataAsJsonArray) {
        System.out.println("In saveInvoiceTabData===========");

        for (int i = 0; i < POInvoiceDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POInvoiceDataAsJsonArray.getJSONObject(i);
            System.out.println("Invoive object: " + jsonobj.toString());

            invoice.setInvoiceReceipt(jsonobj.getString("InvoiceReceipt"));
            invoice.setFinalInvoice(jsonobj.getString("FinalInvoice"));
            invoice.setGrBasedIV(jsonobj.getString("GRBasedIV"));
            invoice.setDpCategory("");
            invoice.setTaxCode(jsonobj.getString("TaxCode"));
            invoice.setDescription("");
            invoice.setLineItemNumber(jsonobj.getString("LineItemNumber"));
            invoice.setPrItemNumber(jsonobj.getString("ItemNumber"));
            invoice.setLinkId(jsonobj.getString("LinkId"));
            invoice.setServiceBasedIV(jsonobj.getString("SRVBasedIV"));

            String msg = purchaseOrderWS.saveInvoice(invoice);
            System.out.println("msg :" + msg);
        }
    }

    public void saveServiceTabData(JSONArray POServiceDataAsJsonArray) {
        System.out.println("In saveServiceTabData===========");

        for (int i = 0; i < POServiceDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POServiceDataAsJsonArray.getJSONObject(i);
            System.out.println("Service object: " + jsonobj.toString());

            services.setServiceLineItemNumber(jsonobj.getString("LineItemNumber"));
            services.setServiceNumber(jsonobj.getString("ServiceNumber"));
            services.setShortText(jsonobj.getString("ShortText"));
            services.setUnit(jsonobj.getString("Unit"));
            services.setCurrency(jsonobj.getString("Currency"));
            services.setEdition(jsonobj.getString("Edition"));
            services.setLineItemLongText(jsonobj.getString("LineItemLongText"));
            services.setOverfTolerance(jsonobj.getString("OverfTolerance"));
            services.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            services.setLinkId(jsonobj.getString("PrLineItemDataLinkId"));
            services.setServiceLinkId(jsonobj.getString("ServiceLinkID"));
            services.setPrItemNumber(jsonobj.getString("PrItemNumber"));
            services.setLineNoServ(jsonobj.getString("LineNo"));
            services.setIsServOldOrNew(null);

            if (jsonobj.getString("Distribution") != null && !jsonobj.getString("Distribution").trim().equalsIgnoreCase("")) {
                switch (jsonobj.getString("Distribution")) {
                    case "Distrib. On Quantity Basis":
                        services.setDistribution("1");
                        break;
                    case "Distrib. By Percentage":
                        services.setDistribution("2");
                        break;
                    case "Single Account Assignment":
                        services.setDistribution("");
                        break;
                }
            }

            if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                services.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
            } else {
                services.setQuantity(new BigDecimal(0.0));
            }
            if (jsonobj.getString("GrossPrice") != null && !jsonobj.getString("GrossPrice").trim().equalsIgnoreCase("")) {
                services.setGrossPrice(new BigDecimal(jsonobj.getString("GrossPrice")));
            } else {
                services.setGrossPrice(new BigDecimal(0.0));
            }
            if (jsonobj.getString("NetPrice") != null && !jsonobj.getString("NetPrice").trim().equalsIgnoreCase("")) {
                services.setNetPrice(new BigDecimal(jsonobj.getString("NetPrice")));
            } else {
                services.setNetPrice(new BigDecimal(0.0));
            }
            if (jsonobj.getString("NetPrice") != null && !jsonobj.getString("NetPrice").trim().equalsIgnoreCase("")) {
                services.setNetValue(new BigDecimal(jsonobj.getString("NetPrice")));
            } else {
                services.setNetValue(new BigDecimal(0.0));
            }
            if (jsonobj.getString("ActualQuantity") != null && !jsonobj.getString("ActualQuantity").trim().equalsIgnoreCase("")) {
                services.setActualQuantity(new BigDecimal(jsonobj.getString("ActualQuantity")));
            } else {
                services.setActualQuantity(new BigDecimal(0.0));
            }
            services.setServiceText(jsonobj.getString("ServiceLongText"));

            // Make entry in NG_BP_ServicesLongTexts for each service
            servicesLongTextsEntity.setShortText(jsonobj.getString("ShortText"));
            servicesLongTextsEntity.setLineItemLongText(jsonobj.getString("LineItemLongText"));
            servicesLongTextsEntity.setServiceText(jsonobj.getString("ServiceLongText"));
            String ServiceId = purchaseOrderWS.saveServicesLongTexts(servicesLongTextsEntity);

            services.setServicesLongTextId(ServiceId);
            String msg = purchaseOrderWS.saveServiceTableData(services);
            System.out.println("services msg :" + msg);
        }
    }

    public void saveServiceAccountAssignmentData(JSONArray POServiceAccAssDataAsJsonArray) {
        System.out.println("In saveServiceAccountAssignmentTabData===========");

        for (int i = 0; i < POServiceAccAssDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POServiceAccAssDataAsJsonArray.getJSONObject(i);
            System.out.println("Service object: " + jsonobj.toString());

            if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                serviceAccountAssignment.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
            } else {
                serviceAccountAssignment.setQuantity(new BigDecimal(0.0));
            }
            if (jsonobj.getString("Percentage") != null && !jsonobj.getString("Percentage").trim().equalsIgnoreCase("")) {
                serviceAccountAssignment.setPercentage(new BigDecimal(jsonobj.getString("Percentage")));
            } else {
                serviceAccountAssignment.setPercentage(new BigDecimal(0.0));
            }

            if (jsonobj.getString("NETVALUE") != null && !jsonobj.getString("NETVALUE").trim().equalsIgnoreCase("")) {
                serviceAccountAssignment.setNetValaue(new BigDecimal(jsonobj.getString("NETVALUE")));
            } else {
                serviceAccountAssignment.setNetValaue(new BigDecimal(0.0));
            }

            System.out.println("Distribution in Service Account Assignment :" + jsonobj.getString("Distribution"));
            if (jsonobj.getString("Distribution") != null && !jsonobj.getString("Distribution").trim().equalsIgnoreCase("")) {
                switch (jsonobj.getString("Distribution")) {
                    case "Distrib. On Quantity Basis":
                        serviceAccountAssignment.setDistribution("1");
                        break;
                    case "Distrib. By Percentage":
                        serviceAccountAssignment.setDistribution("2");
                        break;
                    case "Single Account Assignment":
                        serviceAccountAssignment.setDistribution("");
                        break;
                }
            }

            serviceAccountAssignment.setGLAccount(jsonobj.getString("GLAccount"));
            serviceAccountAssignment.setCommitmentItem(jsonobj.getString("CommitmentItem"));
            serviceAccountAssignment.setCOArea(jsonobj.getString("CoArea"));
            serviceAccountAssignment.setCostCenter(jsonobj.getString("CostCenter"));
            serviceAccountAssignment.setFund(jsonobj.getString("Fund"));
            serviceAccountAssignment.setFunctionalArea(jsonobj.getString("FunctionalArea"));
            serviceAccountAssignment.setFundCenter(jsonobj.getString("FundsCentre"));
            serviceAccountAssignment.setAccAsngOrder(jsonobj.getString("Acc_Order"));
            serviceAccountAssignment.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            serviceAccountAssignment.setServiceLineItemNumber(jsonobj.getString("LineItemNumber"));
            serviceAccountAssignment.setAsset(jsonobj.getString("Acc_Asset"));
            serviceAccountAssignment.setWBSElement(jsonobj.getString("Acc_WBSElement"));
            serviceAccountAssignment.setSalesOrder(jsonobj.getString("SalesOrder"));
            serviceAccountAssignment.setNetActNumber(jsonobj.getString("ActivityNumber"));
            serviceAccountAssignment.setItemNumber(jsonobj.getString("ItemNumber"));
            serviceAccountAssignment.setDeliverySchedule(jsonobj.getString("DeliverySchedule"));
            serviceAccountAssignment.setAccountAssignment(jsonobj.getString("AccountAssignment"));
            serviceAccountAssignment.setLinkNumber(jsonobj.getString("LinkNumber"));
            serviceAccountAssignment.setLinkId(jsonobj.getString("PrLineItemDataLinkId"));
            serviceAccountAssignment.setPrItemNumber(jsonobj.getString("PrItemNumber"));
            serviceAccountAssignment.setRecipient("");
            serviceAccountAssignment.setUnloadingPoint("");
            serviceAccountAssignment.setSerialNumber(jsonobj.getString("SerialNo"));
            serviceAccountAssignment.setLineNoSerAcc(jsonobj.getString("LineNo"));
            serviceAccountAssignment.setIsDeleteFlag("false");

            String msg = purchaseOrderWS.saveServiceAccountAssignment(serviceAccountAssignment);
            System.out.println("msg :" + msg);
        }
    }

    public void saveConditionLineLevelTabData(JSONArray POLineItemConditionDataAsJsonArray) {
        System.out.println("In saveConditionLineLevelTabData===========");

        for (int i = 0; i < POLineItemConditionDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POLineItemConditionDataAsJsonArray.getJSONObject(i);
            System.out.println("Condition Line Level object: " + jsonobj.toString());

            if (jsonobj.getString("Amount") != null && !jsonobj.getString("Amount").trim().equalsIgnoreCase("")) {
                conditionsLineLevel.setAmount(new BigDecimal(jsonobj.getString("Amount")));
            } else {
                conditionsLineLevel.setAmount(new BigDecimal(0.0));
            }

            conditionsLineLevel.setConditionType(jsonobj.getString("CondType"));
            conditionsLineLevel.setName(jsonobj.getString("CondName"));
            conditionsLineLevel.setPer(new BigDecimal(0.0));
            conditionsLineLevel.setConditionPricingUnit(jsonobj.getString("CondPricUnit"));
            conditionsLineLevel.setCurrency1(jsonobj.getString("Currency"));
            conditionsLineLevel.setUom(jsonobj.getString("CondUnit"));
            conditionsLineLevel.setConditionValue1(new Float(jsonobj.getString("CondVal")));
            conditionsLineLevel.setCurrency2(jsonobj.getString("CondCrncy"));
            conditionsLineLevel.setConditionValue2(new Float(0.0));
            conditionsLineLevel.setConditionCurrency("");
            conditionsLineLevel.setConditionDetails("");
            conditionsLineLevel.setLineitemId(jsonobj.getString("PrInsertionOrderId"));
            conditionsLineLevel.setPrItemNumber(jsonobj.getString("ItemNumber"));
            conditionsLineLevel.setLinkId(jsonobj.getString("LinkId"));
            conditionsLineLevel.setStNumber(jsonobj.getString("CondSTNo"));
            conditionsLineLevel.setConditionCount(jsonobj.getString("CondCount"));
            conditionsLineLevel.setKappl(jsonobj.getString("Application"));
            conditionsLineLevel.setKvsl1(jsonobj.getString("AccountKey"));
            conditionsLineLevel.setKvsl2(jsonobj.getString("Accruals"));
            conditionsLineLevel.setChangeId(jsonobj.getString("CondChangeId"));
            conditionsLineLevel.setNgStatus(jsonobj.getString("Status"));
            if (jsonobj.getString("Numerator") != null && !jsonobj.getString("Numerator").trim().equalsIgnoreCase("")) {
                conditionsLineLevel.setNumerator(Integer.parseInt(jsonobj.getString("Numerator")));
            } else {
                conditionsLineLevel.setNumerator(null);
            }
            conditionsLineLevel.setBaseUOM(jsonobj.getString("BaseUOM"));
            if (jsonobj.getString("Denominator") != null && !jsonobj.getString("Denominator").trim().equalsIgnoreCase("")) {
                conditionsLineLevel.setDenominatorforconv(Integer.parseInt(jsonobj.getString("Denominator")));
            } else {
                conditionsLineLevel.setDenominatorforconv(null);
            }
            conditionsLineLevel.setUomextra(jsonobj.getString("UomExtra"));

            String msg = purchaseOrderWS.saveConditionsTabData(conditionsLineLevel);
            System.out.println("msg :" + msg);
        }
    }

    public void saveAccountAssignmentTabData(JSONArray POAccAssDataAsJsonArray) {
        System.out.println("In saveAccountAssignmentTabData===========");

        for (int i = 0; i < POAccAssDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POAccAssDataAsJsonArray.getJSONObject(i);
            System.out.println("AccountAssignment object: " + jsonobj.toString());

            if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                accountAssignment.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
            } else {
                accountAssignment.setQuantity(new BigDecimal(0.0));
            }

            if (jsonobj.getString("Percentage") != null && !jsonobj.getString("Percentage").trim().equalsIgnoreCase("")) {
                accountAssignment.setPercentage(new BigDecimal(jsonobj.getString("Percentage")));
            } else {
                accountAssignment.setPercentage(new BigDecimal(0.0));
            }

            if (jsonobj.getString("Distribution") != null && !jsonobj.getString("Distribution").trim().equalsIgnoreCase("")) {
                switch (jsonobj.getString("Distribution")) {
                    case "Distrib. On Quantity Basis":
                        accountAssignment.setDistribution("1");
                        break;
                    case "Distrib. By Percentage":
                        accountAssignment.setDistribution("2");
                        break;
                    case "Single Account Assignment":
                        accountAssignment.setDistribution("");
                        break;
                }
            }

            accountAssignment.setGLAccount(jsonobj.getString("GLAccount"));
            accountAssignment.setCommitmentItem(jsonobj.getString("CommitmentItem"));
            accountAssignment.setCOArea(jsonobj.getString("COArea"));
            accountAssignment.setCostCenter(jsonobj.getString("CostCenter"));
            accountAssignment.setFund(jsonobj.getString("Fund"));
            accountAssignment.setFunctionalArea(jsonobj.getString("FunctionalArea"));
            accountAssignment.setFundCenter(jsonobj.getString("FundsCentre"));
            accountAssignment.setUnloadingPoint(jsonobj.getString("UnloadingPoint"));
            accountAssignment.setRecipient(jsonobj.getString("Recipient"));
            accountAssignment.setAccAsgnTblOrder(jsonobj.getString("AccOrder"));
            accountAssignment.setAsset(jsonobj.getString("Asset"));
            accountAssignment.setWBSElement(jsonobj.getString("WBSElement"));
            accountAssignment.setSalesOrder(jsonobj.getString("SalesOrder"));
            accountAssignment.setNetActNumber(jsonobj.getString("ActivityNumber"));
            accountAssignment.setDeliverySchedule(jsonobj.getString("DeliverySchedule"));
            accountAssignment.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            accountAssignment.setAccountAssignmentCategory(jsonobj.getString("AccountAssignmentCategory"));
            accountAssignment.setCoCode(jsonobj.getString("CoCode"));
            accountAssignment.setLinkNumber("");
            accountAssignment.setPrItemNumber(jsonobj.getString("ItmNo"));
            accountAssignment.setLinkId(jsonobj.getString("LinkID"));
            accountAssignment.setPartialInvoiceIndicator(jsonobj.getString("PartialInvoiceIndicator"));
            accountAssignment.setServiceLineItemNumber("");
            accountAssignment.setSerialNumber(jsonobj.getString("SerialNo"));
            accountAssignment.setIsDeleteFlag("false");

            String msg = purchaseOrderWS.saveAccountAssignment(accountAssignment);
            System.out.println("msg :" + msg);
        }
    }

    public void saveQuantityWeightsTabData(JSONArray POQuantityWeightsDataAsJsonArray) {
        System.out.println("In saveQuantityWeightsTabData===========");

        for (int i = 0; i < POQuantityWeightsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POQuantityWeightsDataAsJsonArray.getJSONObject(i);
            System.out.println("Q/W object: " + jsonobj.toString());

            quantityDates.setPoQuantity(jsonobj.getString("POQuantity"));
            quantityDates.setUnitPOQuantity(jsonobj.getString("POQuantityUnit"));
            quantityDates.setPoQuantityInSKU(jsonobj.getString("POQuantitySKU"));
            quantityDates.setUnitPOQuantityInSKU(jsonobj.getString("POQuantitySKUUnit"));
            quantityDates.setOrderUnit(jsonobj.getString("Order1"));
            quantityDates.setUnitOrderUnit(jsonobj.getString("OrderUnit1"));
            quantityDates.setOrderPriceUnit(jsonobj.getString("OrderPrice"));
            quantityDates.setUnitOrderPriceUnit(jsonobj.getString("OrderPriceUnit"));
            quantityDates.setOrderUnitSKU(jsonobj.getString("Order2"));
            quantityDates.setUnitOrderUnitSKU(jsonobj.getString("OrderUnit2"));
            quantityDates.setSku(jsonobj.getString("SKU"));
            quantityDates.setUnitSKU(jsonobj.getString("SKUUnit"));
            quantityDates.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            quantityDates.setPrItemNumber(jsonobj.getString("ItemNumber"));
            quantityDates.setLinkId(jsonobj.getString("LinkID"));

            quantityDates.setNetWeight(jsonobj.getString("NetWeight"));
            quantityDates.setGrossWeight(jsonobj.getString("GrossWeight"));
            quantityDates.setVolume(jsonobj.getString("Volume"));
            quantityDates.setPoints(jsonobj.getString("Points"));
            quantityDates.setNetWeightUnit(jsonobj.getString("NetWeightUnit"));
            quantityDates.setGrossWeightUnit(jsonobj.getString("GrossWgtUnit"));
            quantityDates.setNetWeightPerPrice(jsonobj.getString("NetWgtPerPrice"));
            quantityDates.setGrossWeightPerPrice(jsonobj.getString("GrossWgtPerPrice"));
            quantityDates.setVolumePerPrice(jsonobj.getString("VolumePerPrice"));
            quantityDates.setPointsPerPrice(jsonobj.getString("PointsPerPrice"));
            quantityDates.setNetWeightOrderUnit(jsonobj.getString("GrossWgtOrderUnit"));
            quantityDates.setGrossWeightOrderUnit(jsonobj.getString("VolumeOrderUnit"));
            quantityDates.setVolumeOrderUnit(jsonobj.getString("VolumeOrderUnit"));
            quantityDates.setPointsOrderUnit(jsonobj.getString("PointsOrderUnit"));
            quantityDates.setNetWeight2(jsonobj.getString("NetWeight2"));
            quantityDates.setGrossWeight2(jsonobj.getString("GrossWeight2"));
            quantityDates.setVolume2(jsonobj.getString("Volume2"));
            quantityDates.setPoints2(jsonobj.getString("Points2"));
            quantityDates.setNetWeightUnit2(jsonobj.getString("NetWeight2Unit"));
            quantityDates.setGrossWeightUnit2(jsonobj.getString("GrossWgt2Unit"));

            String msg = purchaseOrderWS.saveQuantityDates(quantityDates);
            System.out.println("msg :" + msg);
        }
    }

    public void saveDeliveryScheduleTabData(JSONArray PODeliveryScheduleDataAsJsonArray) {
        System.out.println("In saveDeliveryScheduleTabData===========");

        for (int i = 0; i < PODeliveryScheduleDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = PODeliveryScheduleDataAsJsonArray.getJSONObject(i);
            System.out.println("Invoive object: " + jsonobj.toString());

            if (jsonobj.getString("DelDate") != null && !jsonobj.getString("DelDate").equalsIgnoreCase("")) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date dateCat = formatter.parse(jsonobj.getString("DelDate"));
                    System.out.println("dateCat :" + dateCat);
                    deliverySchedule.setDeliveryDate(dateCat);
                } catch (ParseException e) {
                    System.out.println("e: " + e);
                }
            }

            if (jsonobj.getString("ScheduledQuantity") != null && !jsonobj.getString("ScheduledQuantity").trim().equalsIgnoreCase("")) {
                deliverySchedule.setScheduledQuantity(new BigDecimal(jsonobj.getString("ScheduledQuantity")));
            } else {
                deliverySchedule.setScheduledQuantity(new BigDecimal(0.0));
            }

            deliverySchedule.setDeliveryDateCategory(jsonobj.getString("DelDateCatg"));
            deliverySchedule.setTime(jsonobj.getString("DelTime"));
            deliverySchedule.setPurchaseRequestNumber(jsonobj.getString("PRNumber"));
            deliverySchedule.setRequestItemNumber(jsonobj.getString("ReqItemNo"));
            deliverySchedule.setPrItemNumber(jsonobj.getString("ItemNo"));
            deliverySchedule.setLinkId(jsonobj.getString("LinkId"));
            deliverySchedule.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));

            if (jsonobj.getString("StatisticalDeliveryDate") != null && !jsonobj.getString("StatisticalDeliveryDate").equalsIgnoreCase("")) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date dateCat = formatter.parse(jsonobj.getString("StatisticalDeliveryDate"));
                    System.out.println("dateCat :" + dateCat);
                    deliverySchedule.setStatisticalDeliveryDate(dateCat);
                } catch (ParseException e) {
                    System.out.println("e: " + e);
                }
            }

            if (jsonobj.getString("GRQty") != null && !jsonobj.getString("GRQty").trim().equalsIgnoreCase("")) {
                deliverySchedule.setGrQty(new BigDecimal(jsonobj.getString("GRQty")));
            } else {
                deliverySchedule.setGrQty(new BigDecimal(0.0));
            }
            if (jsonobj.getString("OpenQuantity") != null && !jsonobj.getString("OpenQuantity").trim().equalsIgnoreCase("")) {
                deliverySchedule.setOpenQuantity(new BigDecimal(jsonobj.getString("OpenQuantity")));
            } else {
                deliverySchedule.setOpenQuantity(new BigDecimal(0.0));
            }

            String msg = purchaseOrderWS.saveDeliverySchedule(deliverySchedule);
            System.out.println("msg :" + msg);
        }
    }

    public void saveConfirmationsTabData(JSONArray POConfirmationDataAsJsonArray) {
        System.out.println("In saveInvoiceTabData===========");

        for (int i = 0; i < POConfirmationDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POConfirmationDataAsJsonArray.getJSONObject(i);
            System.out.println("Confirmations object: " + jsonobj.toString());

            confirmations.setConfControl(jsonobj.getString("ConfControl"));
            confirmations.setOrderAck(jsonobj.getString("OrderAck"));
            confirmations.setConfirmationRequired(jsonobj.getString("ConfirmnReq"));
            confirmations.setRejectionInd(jsonobj.getString("RejectInd"));
            confirmations.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            confirmations.setPrItemNumber(jsonobj.getString("ItemNumber"));
            confirmations.setLinkId(jsonobj.getString("LinkId"));

            String msg = purchaseOrderWS.saveConfirmation(confirmations);
            System.out.println("msg :" + msg);
        }
    }

    public void saveConditionControlTabData(JSONArray POCondCtrlDataAsJsonArray) {
        System.out.println("In saveInvoiceTabData===========");

        for (int i = 0; i < POCondCtrlDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POCondCtrlDataAsJsonArray.getJSONObject(i);
            System.out.println("Condition Control object: " + jsonobj.toString());

            conditionControl.setPrintPrice(jsonobj.getString("PrintPrice"));
            conditionControl.setEstimatePrice(jsonobj.getString("EstimatedPrice"));
            conditionControl.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            conditionControl.setPrItemNumber(jsonobj.getString("ItemNumber"));
            conditionControl.setLinkId(jsonobj.getString("LinkId"));

            String msg = purchaseOrderWS.saveConditionControl(conditionControl);
            System.out.println("msg :" + msg);
        }
    }

    public void saveDeliveryTabData(JSONArray PODeliveryDataAsJsonArray) {
        System.out.println("In saveDeliveryTabData===========");

        for (int i = 0; i < PODeliveryDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = PODeliveryDataAsJsonArray.getJSONObject(i);
            System.out.println("Delivery object: " + jsonobj.toString());

            if (jsonobj.getString("OverDelTol") != null && !jsonobj.getString("OverDelTol").trim().equalsIgnoreCase("")) {
                delivery.setOverdeliveryTolerance(new BigDecimal(jsonobj.getString("OverDelTol")));
            } else {
                delivery.setOverdeliveryTolerance(new BigDecimal(0.0));
            }
            if (jsonobj.getString("UnderDelTol") != null && !jsonobj.getString("UnderDelTol").trim().equalsIgnoreCase("")) {
                delivery.setUnderdeliveryTolerance(new BigDecimal(jsonobj.getString("UnderDelTol")));
            } else {
                delivery.setUnderdeliveryTolerance(new BigDecimal(0.0));
            }

            delivery.setShippingInstruction(jsonobj.getString("ShippingInstructions"));
            delivery.setStockType(jsonobj.getString("StockType"));
            delivery.setValuationType(jsonobj.getString("ValuationType"));
            delivery.setRemShelfLife(jsonobj.getString("RemShelfLife"));
            delivery.setQaControlLife(jsonobj.getString("QAControlLife"));
            delivery.setGrPROCTime(jsonobj.getString("GrProcTime"));
            delivery.setFirstRemender(jsonobj.getString("FstRem_Exped"));
            delivery.setSecondRemender(jsonobj.getString("SecRem_Exped"));
            delivery.setThirdRemender(jsonobj.getString("ThrdRem_Exped"));
            delivery.setGoodsReceipt(jsonobj.getString("GoodsReceipt"));
            delivery.setGrNonValuated(jsonobj.getString("GRNonVal"));
            delivery.setDelivCompleted(jsonobj.getString("DelvCompleted"));
//            delivery.setNoExpend(jsonobj.getString("NoExpend"));
            delivery.setPlDeliveryTime(jsonobj.getString("PlDelTime"));
            delivery.setIncoTerms(jsonobj.getString("IncoTerms1"));
            delivery.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            delivery.setPrItemNumber(jsonobj.getString("ItemNumber"));
            delivery.setLinkId(jsonobj.getString("LinkId"));
            delivery.setUnlimited(jsonobj.getString("Unlimited"));

            String msg = purchaseOrderWS.saveDelivery(delivery);
            System.out.println("msg :" + msg);
        }
    }

    public void saveDeliveryAddressTabData(JSONArray PODeliveryAddressDataAsJsonArray) {
        System.out.println("In saveDeliveryAddressTabData===========");

        for (int i = 0; i < PODeliveryAddressDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = PODeliveryAddressDataAsJsonArray.getJSONObject(i);
            System.out.println("Delivery object: " + jsonobj.toString());

            deliveryAddress.setTitle(jsonobj.getString("Title"));
            deliveryAddress.setName1(jsonobj.getString("Name1"));
            deliveryAddress.setName2(jsonobj.getString("Name2"));
            deliveryAddress.setStreet(jsonobj.getString("Street"));
            deliveryAddress.setHouseNumber(jsonobj.getString("HouseNo"));
            deliveryAddress.setPostalCode(jsonobj.getString("PostalCode"));
            deliveryAddress.setCity(jsonobj.getString("City"));
            deliveryAddress.setCountry(jsonobj.getString("Country"));
            deliveryAddress.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            deliveryAddress.setDescription("");
            deliveryAddress.setPrItemNumber(jsonobj.getString("ItemNo"));
            deliveryAddress.setLinkId(jsonobj.getString("LinkId"));

            String msg = purchaseOrderWS.saveDeliveryAddress(deliveryAddress);
            System.out.println("msg :" + msg);
        }
    }

    public void saveLimitsTabData(JSONArray POLimitsDataAsJsonArray) {
        System.out.println("In saveLimitsTabData===========");

        for (int i = 0; i < POLimitsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POLimitsDataAsJsonArray.getJSONObject(i);
            System.out.println("Limits object: " + jsonobj.toString());

            if (jsonobj.getString("OverallLimit") != null && !jsonobj.getString("OverallLimit").trim().equalsIgnoreCase("")) {
                limits.setOverAllLimits(new BigDecimal(jsonobj.getString("OverallLimit")));
            } else {
                limits.setOverAllLimits(new BigDecimal(0.0));
            }
            if (jsonobj.getString("ExpectedValue") != null && !jsonobj.getString("ExpectedValue").trim().equalsIgnoreCase("")) {
                limits.setExpectedValue(new BigDecimal(jsonobj.getString("ExpectedValue")));
            } else {
                limits.setExpectedValue(new BigDecimal(0.0));
            }

            limits.setNoLimis(jsonobj.getString("NoLimit"));
            limits.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            limits.setPrItemNumber(jsonobj.getString("ItemNumber"));
            limits.setLinkId(jsonobj.getString("LinkId"));
            limits.setActualValue(jsonobj.getString("ActualValue"));

            String msg = purchaseOrderWS.saveLimits(limits);
            System.out.println("msg :" + msg);
        }
    }

    public void saveTextsTabData(JSONArray POTextsDataAsJsonArray) {
        System.out.println("In saveTextsTabData===========");

        for (int i = 0; i < POTextsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POTextsDataAsJsonArray.getJSONObject(i);
            System.out.println("Texts object: " + jsonobj.toString());

            text.setItemTax(jsonobj.getString("ItemText"));
            text.setInfoRecordPOText(jsonobj.getString("InfoRecordPOText"));
            text.setMaterialPOText(jsonobj.getString("MaterialPOText"));
            text.setPoNoteToApprover(jsonobj.getString("PONoteToApprover"));
            text.setDeliveryText(jsonobj.getString("DeliveryText"));
            text.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            text.setPrItemNumber(jsonobj.getString("ItemNumber"));
            text.setLinkId(jsonobj.getString("LinkId"));
            text.setPrNoteToApprover(jsonobj.getString("PrNoteToApproval"));

            String msg = purchaseOrderWS.saveText(text);
            System.out.println("msg :" + msg);
        }
    }

    public void saveCustomerTabData(JSONArray POLineItemCustomerDataAsJsonArray) {
        System.out.println("In saveCustomerTabData===========");

        for (int i = 0; i < POLineItemCustomerDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POLineItemCustomerDataAsJsonArray.getJSONObject(i);
            System.out.println("Customer object: " + jsonobj.toString());

            customerData.setProductOrigin(jsonobj.getString("ProductOrigin"));
            customerData.setSegment(jsonobj.getString("Segment"));
            customerData.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            customerData.setPrItemNumber(jsonobj.getString("ItemNumber"));
            customerData.setLinkId(jsonobj.getString("LinkId"));

            String msg = purchaseOrderWS.saveCustomerData(customerData);
            System.out.println("msg :" + msg);
        }
    }

    public void saveComponentTabData(JSONArray POComponentsDataAsJsonArray) {
        System.out.println("In saveComponentTabData===========");

        for (int i = 0; i < POComponentsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POComponentsDataAsJsonArray.getJSONObject(i);
            System.out.println("Component object: " + jsonobj.toString());

            componentEntity.setLineItemnumber(jsonobj.getString("PrInsertionOrderId"));
            componentEntity.setPrItemNumber(jsonobj.getString("ItemNo"));
            componentEntity.setLinkId(jsonobj.getString("LinkId"));
            componentEntity.setMaterialCode(jsonobj.getString("MaterialCode"));
            componentEntity.setDescription(jsonobj.getString("Description"));
            if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                componentEntity.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
            } else {
                componentEntity.setQuantity(new BigDecimal(0.0));
            }
            componentEntity.setPlant(jsonobj.getString("Plant"));
            componentEntity.setUnit(jsonobj.getString("Unit"));
            componentEntity.setProductStorageLocation(jsonobj.getString("ProdStorageLocation"));

            if (jsonobj.getString("RequirementDate") != null && !jsonobj.getString("RequirementDate").equalsIgnoreCase("")) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date dateCat = formatter.parse(jsonobj.getString("RequirementDate"));
                    System.out.println("dateCat :" + dateCat);
                    componentEntity.setRequirementDate(dateCat);
                    componentEntity.setReqDateAsString(jsonobj.getString("RequirementDate"));
                } catch (ParseException e) {
                    System.out.println("e: " + e);
                }
            } else {
                componentEntity.setRequirementDate(null);
                componentEntity.setReqDateAsString(null);
            }

            componentEntity.setQtyIsFixed(jsonobj.getString("QtyFixed"));

            if (jsonobj.getString("LatestReqDate") != null && !jsonobj.getString("LatestReqDate").equalsIgnoreCase("")) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date dateCat = formatter.parse(jsonobj.getString("LatestReqDate"));
                    System.out.println("dateCat :" + dateCat);
                    componentEntity.setLatestRequirementDate(dateCat);
                    componentEntity.setLatestReqDateAsString(jsonobj.getString("LatestReqDate"));
                } catch (ParseException e) {
                    System.out.println("e: " + e);
                }
            } else {
                componentEntity.setLatestRequirementDate(null);
                componentEntity.setLatestReqDateAsString(null);
            }

            componentEntity.setDistributionKey(jsonobj.getString("DistribKey"));
            componentEntity.setBatch(jsonobj.getString("Batch"));
            componentEntity.setChangeId(jsonobj.getString("U"));

            String msg = purchaseOrderWS.saveComponent(componentEntity);
            System.out.println("msg :" + msg);
        }
    }

    public void saveMaterialTabData(JSONArray POMaterialDataAsJsonArray) {
        System.out.println("In saveMaterialTabData===========");

        for (int i = 0; i < POMaterialDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POMaterialDataAsJsonArray.getJSONObject(i);
            System.out.println("Material object: " + jsonobj.toString());

            materialTabEntity.setInsertionOrderId(jsonobj.getString("PrInsertionOrderId"));
            materialTabEntity.setPrItemNumber(jsonobj.getString("ItemNo"));
            materialTabEntity.setLinkId(jsonobj.getString("LinkId"));
            materialTabEntity.setMfrPartNumber(jsonobj.getString("MfrPartNumber"));
            materialTabEntity.setManufacturer(jsonobj.getString("Manufacturer"));
            materialTabEntity.setRevisionLevel(jsonobj.getString("RevisionLevel"));
            materialTabEntity.setVendMatNo(jsonobj.getString("VendMatNo"));
            materialTabEntity.setEanUpc(jsonobj.getString("EANUPC"));
            materialTabEntity.setVendorSubrange(jsonobj.getString("VendorSubrange"));
            materialTabEntity.setBatch(jsonobj.getString("Batch"));
            materialTabEntity.setVendorBatch(jsonobj.getString("VendorBatch"));
            materialTabEntity.setInfoUpdate(jsonobj.getString("InfoUpdate"));

            String msg = purchaseOrderWS.saveMaterialTab(materialTabEntity);
            System.out.println("msg :" + msg);
        }
    }

    public void saveProfitabilitySegmentDetails(JSONArray POProfitabilitySegmentDetailsDataJsonArray) {
        System.out.println("In saveProfitabilitySegmentDetails===========");
        for (int i = 0; i < POProfitabilitySegmentDetailsDataJsonArray.length(); i++) {
            JSONObject jsonobj = POProfitabilitySegmentDetailsDataJsonArray.getJSONObject(i);
            System.out.println("ProfitabilitySegmentDetails object: " + jsonobj.toString());

            profitabilitySegmentEntity.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            profitabilitySegmentEntity.setLinkId(jsonobj.getString("LinkId"));
            profitabilitySegmentEntity.setPrItemNumber(jsonobj.getString("ItemNo"));
            profitabilitySegmentEntity.setServiceLineItemNumber("");
            profitabilitySegmentEntity.setCharacterstic("");
            profitabilitySegmentEntity.setCustomerCode(jsonobj.getString("CustomerCode"));
            profitabilitySegmentEntity.setProduct(jsonobj.getString("Product"));
            profitabilitySegmentEntity.setBillingType(jsonobj.getString("BillingType"));
            profitabilitySegmentEntity.setSalesOrder(jsonobj.getString("SalesOrder"));
            profitabilitySegmentEntity.setItemNumber(jsonobj.getString("ItemNumber"));
            profitabilitySegmentEntity.setSgOrder(jsonobj.getString("OrderVal"));
            profitabilitySegmentEntity.setCompanyCode(jsonobj.getString("CompanyCode"));
            profitabilitySegmentEntity.setPlant(jsonobj.getString("Plant"));
            profitabilitySegmentEntity.setBusinessArea(jsonobj.getString("BusinessArea"));
            profitabilitySegmentEntity.setSalesOrg(jsonobj.getString("SalesOrganization"));
            profitabilitySegmentEntity.setDistrChannel(jsonobj.getString("DistrChannel"));
            profitabilitySegmentEntity.setDivision(jsonobj.getString("Division"));
            profitabilitySegmentEntity.setWBSElement(jsonobj.getString("WBSElement"));
            profitabilitySegmentEntity.setCostObject(jsonobj.getString("CostObject"));
            profitabilitySegmentEntity.setProfitCenter(jsonobj.getString("ProfitCentre"));
            profitabilitySegmentEntity.setPartnerPC(jsonobj.getString("PartnerPC"));
            profitabilitySegmentEntity.setCountry(jsonobj.getString("Country"));
            profitabilitySegmentEntity.setSalesOffice(jsonobj.getString("SalesOffice"));
            profitabilitySegmentEntity.setSalesEmployee(jsonobj.getString("SalesEmployee"));
            profitabilitySegmentEntity.setMatlGroup(jsonobj.getString("MatlGroup"));
            profitabilitySegmentEntity.setProdHierarchy(jsonobj.getString("ProdHierarchy"));
            profitabilitySegmentEntity.setItemCategory(jsonobj.getString("ItemCategory"));
            profitabilitySegmentEntity.setHigherLevItem(jsonobj.getString("HigherLevelItem"));
            profitabilitySegmentEntity.setIndustry(jsonobj.getString("Industry"));
            profitabilitySegmentEntity.setCustomerGroup(jsonobj.getString("CustomerGroup"));
            profitabilitySegmentEntity.setProdHierLev1(jsonobj.getString("ProductHierLevel1"));
            profitabilitySegmentEntity.setProdHierLev2(jsonobj.getString("ProductHierLevel2"));
            profitabilitySegmentEntity.setProdHierLev3(jsonobj.getString("ProductHierLevel3"));
            profitabilitySegmentEntity.setMaterialType(jsonobj.getString("MaterialType"));
            profitabilitySegmentEntity.setReferenceDoc(jsonobj.getString("ReferenceDoc"));
            profitabilitySegmentEntity.setProjectNumber1(jsonobj.getString("PROJECTNUMBER1"));
            profitabilitySegmentEntity.setProjectIndecator(jsonobj.getString("ProjectIndicator"));
            profitabilitySegmentEntity.setValuationType(jsonobj.getString("ValuationType"));
            profitabilitySegmentEntity.setCustomerClass(jsonobj.getString("CustomerClass"));
            profitabilitySegmentEntity.setMaterialSourceInd(jsonobj.getString("MaterialSourceInd"));
            profitabilitySegmentEntity.setContractType(jsonobj.getString("ContractType"));
            profitabilitySegmentEntity.setShipToParty(jsonobj.getString("ShipToParty"));
            profitabilitySegmentEntity.setIndustryCode1(jsonobj.getString("IndustryCode1"));
            profitabilitySegmentEntity.setIndustryField001(jsonobj.getString("IndustryField1"));
            profitabilitySegmentEntity.setIndustryCode2(jsonobj.getString("IndustryCode2"));
            profitabilitySegmentEntity.setIndustryCode3(jsonobj.getString("IndustryCode3"));
            profitabilitySegmentEntity.setSalesDocType(jsonobj.getString("SalesDocType"));
            profitabilitySegmentEntity.setReferenceItem(jsonobj.getString("ReferenceItem"));

            String msg = purchaseOrderWS.saveProfitabilitySegment(profitabilitySegmentEntity);
            System.out.println("msg :" + msg);
        }
    }

    public void saveMaterialTabDataSA(JSONArray POMaterialDataAsJsonArray) {
        System.out.println("In saveMaterialTabData===========");

        for (int i = 0; i < POMaterialDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POMaterialDataAsJsonArray.getJSONObject(i);
            System.out.println("Material object: " + jsonobj.toString());

//            materialTab.setInsertionOrderId(jsonobj.getString("PrInsertionOrderId"));
            materialTab.setPrItemNumber(jsonobj.getString("ItemNo"));
            materialTab.setLinkId(jsonobj.getString("LinkId"));
            materialTab.setMfrPartNumber(jsonobj.getString("MfrPartNumber"));
            materialTab.setManufacturer(jsonobj.getString("Manufacturer"));
            materialTab.setRevisionLevel(jsonobj.getString("RevisionLevel"));
            materialTab.setVendMatNo(jsonobj.getString("VendMatNo"));
            materialTab.setEanUpc(jsonobj.getString("EANUPC"));
            materialTab.setVendorSubrange(jsonobj.getString("VendorSubrange"));
            materialTab.setBatch(jsonobj.getString("Batch"));
            materialTab.setVendorBatch(jsonobj.getString("VendorBatch"));
            materialTab.setInfoUpdate(jsonobj.getString("InfoUpdate"));

            String msg = standalonePoWS.saveNGBPCmplxPOCreationLineItemMaterialTab(materialTab);
            System.out.println("msg :" + msg);
        }
    }

    public void saveComponentTabDataSA(JSONArray POComponentsDataAsJsonArray) {
        System.out.println("In saveComponentTabData===========");

        for (int i = 0; i < POComponentsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POComponentsDataAsJsonArray.getJSONObject(i);
            System.out.println("Component object: " + jsonobj.toString());

//            componentEntity.setLineItemnumber(jsonobj.getString("PrInsertionOrderId"));
            component.setPrItemNumber(jsonobj.getString("ItemNo"));
            component.setLinkId(jsonobj.getString("LinkId"));
            component.setMaterialCode(jsonobj.getString("MaterialCode"));
            component.setDescription(jsonobj.getString("Description"));
            if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                component.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
            } else {
                component.setQuantity(new BigDecimal(0.0));
            }
            component.setPlant(jsonobj.getString("Plant"));
            component.setUnit(jsonobj.getString("Unit"));
            component.setProductStorageLocation(jsonobj.getString("ProdStorageLocation"));

            if (jsonobj.getString("RequirementDate") != null && !jsonobj.getString("RequirementDate").equalsIgnoreCase("")) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date dateCat = formatter.parse(jsonobj.getString("RequirementDate"));
                    System.out.println("dateCat :" + dateCat);
                    component.setRequirementDate(dateCat);
                    component.setReqDateAsString(jsonobj.getString("RequirementDate"));
                } catch (ParseException e) {
                    System.out.println("e: " + e);
                }
            } else {
                component.setRequirementDate(null);
                component.setReqDateAsString(null);
            }

            component.setQtyIsFixed(jsonobj.getString("QtyFixed"));

            if (jsonobj.getString("LatestReqDate") != null && !jsonobj.getString("LatestReqDate").equalsIgnoreCase("")) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date dateCat = formatter.parse(jsonobj.getString("LatestReqDate"));
                    System.out.println("dateCat :" + dateCat);
                    component.setLatestRequirementDate(dateCat);
                    component.setLatestReqDateAsString(jsonobj.getString("LatestReqDate"));
                } catch (ParseException e) {
                    System.out.println("e: " + e);
                }
            } else {
                component.setLatestRequirementDate(null);
                component.setLatestReqDateAsString(null);
            }

            component.setDistributionKey(jsonobj.getString("DistribKey"));
            component.setBatch(jsonobj.getString("Batch"));

            String msg = standalonePoWS.saveNGBPCmplxPOCreationLineItemComponent(component);
            System.out.println("msg :" + msg);
        }
    }

    public void saveProfitabilitySegmentDetailsSA(JSONArray POProfitabilitySegmentDetailsDataJsonArray) {
        System.out.println("In saveProfitabilitySegmentDetails===========");
        for (int i = 0; i < POProfitabilitySegmentDetailsDataJsonArray.length(); i++) {
            JSONObject jsonobj = POProfitabilitySegmentDetailsDataJsonArray.getJSONObject(i);
            System.out.println("ProfitabilitySegmentDetails object: " + jsonobj.toString());

//            profitabilitySegmentEntity.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            profitabilitySegment.setLinkId(jsonobj.getString("LinkId"));
            profitabilitySegment.setPrItemNumber(jsonobj.getString("ItemNo"));
            profitabilitySegment.setServiceLineItemNumber("");
            profitabilitySegment.setCharacterstic("");
            profitabilitySegment.setCustomerCode(jsonobj.getString("CustomerCode"));
            profitabilitySegment.setProduct(jsonobj.getString("Product"));
            profitabilitySegment.setBillingType(jsonobj.getString("BillingType"));
            profitabilitySegment.setSalesOrder(jsonobj.getString("SalesOrder"));
            profitabilitySegment.setItemNumber(jsonobj.getString("ItemNumber"));
            profitabilitySegment.setSgOrder(jsonobj.getString("OrderVal"));
            profitabilitySegment.setCompanyCode(jsonobj.getString("CompanyCode"));
            profitabilitySegment.setPlant(jsonobj.getString("Plant"));
            profitabilitySegment.setBusinessArea(jsonobj.getString("BusinessArea"));
            profitabilitySegment.setSalesOrg(jsonobj.getString("SalesOrganization"));
            profitabilitySegment.setDistrChannel(jsonobj.getString("DistrChannel"));
            profitabilitySegment.setDivision(jsonobj.getString("Division"));
            profitabilitySegment.setWBSElement(jsonobj.getString("WBSElement"));
            profitabilitySegment.setCostObject(jsonobj.getString("CostObject"));
            profitabilitySegment.setProfitCenter(jsonobj.getString("ProfitCentre"));
            profitabilitySegment.setPartnerPC(jsonobj.getString("PartnerPC"));
            profitabilitySegment.setCountry(jsonobj.getString("Country"));
            profitabilitySegment.setSalesOffice(jsonobj.getString("SalesOffice"));
            profitabilitySegment.setSalesEmployee(jsonobj.getString("SalesEmployee"));
            profitabilitySegment.setMatlGroup(jsonobj.getString("MatlGroup"));
            profitabilitySegment.setProdHierarchy(jsonobj.getString("ProdHierarchy"));
            profitabilitySegment.setItemCategory(jsonobj.getString("ItemCategory"));
            profitabilitySegment.setHigherLevItem(jsonobj.getString("HigherLevelItem"));
            profitabilitySegment.setIndustry(jsonobj.getString("Industry"));
            profitabilitySegment.setCustomerGroup(jsonobj.getString("CustomerGroup"));
            profitabilitySegment.setProdHierLev1(jsonobj.getString("ProductHierLevel1"));
            profitabilitySegment.setProdHierLev2(jsonobj.getString("ProductHierLevel2"));
            profitabilitySegment.setProdHierLev3(jsonobj.getString("ProductHierLevel3"));
            profitabilitySegment.setMaterialType(jsonobj.getString("MaterialType"));
            profitabilitySegment.setReferenceDoc(jsonobj.getString("ReferenceDoc"));
            profitabilitySegment.setProjectNumber1(jsonobj.getString("PROJECTNUMBER1"));
            profitabilitySegment.setProjectIndecator(jsonobj.getString("ProjectIndicator"));
            profitabilitySegment.setValuationType(jsonobj.getString("ValuationType"));
            profitabilitySegment.setCustomerClass(jsonobj.getString("CustomerClass"));
            profitabilitySegment.setMaterialSourceInd(jsonobj.getString("MaterialSourceInd"));
            profitabilitySegment.setContractType(jsonobj.getString("ContractType"));
            profitabilitySegment.setShipToParty(jsonobj.getString("ShipToParty"));
            profitabilitySegment.setIndustryCode1(jsonobj.getString("IndustryCode1"));
            profitabilitySegment.setIndustryField001(jsonobj.getString("IndustryField1"));
            profitabilitySegment.setIndustryCode2(jsonobj.getString("IndustryCode2"));
            profitabilitySegment.setIndustryCode3(jsonobj.getString("IndustryCode3"));
            profitabilitySegment.setSalesDocType(jsonobj.getString("SalesDocType"));
            profitabilitySegment.setReferenceItem(jsonobj.getString("ReferenceItem"));

            String msg = standalonePoWS.saveStandAloneProfitabilitySegment(profitabilitySegment);
            System.out.println("msg :" + msg);
        }
    }

    public NGBPCmplxPOCreationLineItemPO saveSAInvoiceTabData(JSONObject POLineLevelDataAsJsonObj, NGBPCmplxPOCreationLineItemPO lineItemObj, String PoId, String prType) {

        System.out.println("prType in saveSAInvoiceTabData :" + prType);
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
        saveMaterialTabDataSA(POMaterialDataAsJsonArray);

        JSONArray POComponentsDataAsJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POComponentsData");
        System.out.println("POComponentsDataAsJsonArray size: " + POComponentsDataAsJsonArray.length());
        System.out.println("POComponentsDataAsJsonArray: " + POComponentsDataAsJsonArray);
        saveComponentTabDataSA(POComponentsDataAsJsonArray);

        JSONArray POProfitabilitySegmentDetailsDataJsonArray = POLineLevelDataAsJsonObj.getJSONArray("POProfitabilitySegmentDetailsData");
        System.out.println("POProfitabilitySegmentDetailsDataJsonArray size: " + POProfitabilitySegmentDetailsDataJsonArray.length());
        System.out.println("POProfitabilitySegmentDetailsDataJsonArray: " + POProfitabilitySegmentDetailsDataJsonArray);

        saveProfitabilitySegmentDetailsSA(POProfitabilitySegmentDetailsDataJsonArray);

        System.out.println("In saveSAInvoiceTabData===========" + POInvoiceDataAsJsonArray.length());

        System.out.println("POInvoiceDataAsJsonArray.length() :" + POInvoiceDataAsJsonArray.length());

        RestTemplate restTemplate = new RestTemplate();
        for (int i = 0; i < POInvoiceDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POInvoiceDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid :" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid :" + lineItemObj.getLinkId());
            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {

                List<NGBPCmplxPOCreationInvoice> invoiceList = standalonePoWS.getInvoiceByLinkId(jsonobj.optString("LinkId"));
                System.out.println("invoiceList size:::::" + invoiceList);
                if (!invoiceList.isEmpty()) {
                    NGBPCmplxPOCreationInvoice invoiceObj = invoiceList.get(0);
                    invoiceObj.setLinkID("");
                    standalonePoWS.updateNGBPCmplxPOCreationInvoice(invoiceObj);
                }

                invInvoice.setInvoiceReceipt(jsonobj.getString("InvoiceReceipt"));
                invInvoice.setFinalInvoice(jsonobj.getString("FinalInvoice"));
                invInvoice.setGrBasedIV(jsonobj.getString("GRBasedIV"));
                invInvoice.setDPCategory("");
                invInvoice.setTaxCode(jsonobj.getString("TaxCode"));
                invInvoice.setDescription("");
//            invInvoice.setLineItemNumber(jsonobj.getString("LineItemNumber"));
                invInvoice.setPrItemNumber(jsonobj.getString("ItemNumber"));
                invInvoice.setLinkID(jsonobj.getString("LinkId"));
//            String msg = purchaseOrderWS.saveInvoice(invoice);
//            System.out.println("msg :" + msg);

                lineItemObj.setpOCreationInvoice(invInvoice);
            }
        }

        System.out.println("PODeliveryAddressDataAsJsonArray.length() :" + PODeliveryAddressDataAsJsonArray.length());
        for (int i = 0; i < PODeliveryAddressDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = PODeliveryAddressDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid PODeliveryAddressDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid PODeliveryAddressDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {

                if (!"".equals(jsonobj.getString("Title"))) {
                    invDel.setTitle(jsonobj.getString("Title"));
                } else {
                    invDel.setTitle("");
                }
                if (!"".equals(jsonobj.getString("Name1"))) {
                    invDel.setName1(jsonobj.getString("Name1"));
                } else {
                    invDel.setName1("");
                }
                if (!"".equals(jsonobj.getString("Name2"))) {
                    invDel.setName2(jsonobj.getString("Name2"));
                } else {
                    invDel.setName2("");
                }
                if (!"".equals(jsonobj.getString("Street"))) {
                    invDel.setStreet(jsonobj.getString("Street"));
                } else {
                    invDel.setStreet("");
                }
                if (!"".equals(jsonobj.getString("HouseNo"))) {
                    invDel.setHouseNo(jsonobj.getString("HouseNo"));
                } else {
                    invDel.setHouseNo("");
                }
                if (!"".equals(jsonobj.getString("PostalCode"))) {
                    invDel.setPostalCode(jsonobj.getString("PostalCode"));
                } else {
                    invDel.setPostalCode("");
                }
                if (!"".equals(jsonobj.getString("City"))) {
                    invDel.setCity(jsonobj.getString("City"));
                } else {
                    invDel.setCity("");
                }
                if (!"".equals(jsonobj.getString("Country"))) {
                    invDel.setCountry(jsonobj.getString("Country"));
                } else {
                    invDel.setCountry("");
                }

                invDel.setLinkID(jsonobj.getString("LinkId"));
                invDel.setPrItemNumber(jsonobj.getString("ItemNo"));

                lineItemObj.setpOCreationDel(invDel);
            }
        }

        System.out.println("PODeliveryDataAsJsonArray.length() :" + PODeliveryDataAsJsonArray.length());
        for (int i = 0; i < PODeliveryDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = PODeliveryDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid PODeliveryDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid PODeliveryDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {

                if (!"".equals(jsonobj.optString("OverDelTol"))) {
                    pOCreationDel.setOverDelTol(new BigDecimal(jsonobj.optString("OverDelTol")));
                } else {
                    pOCreationDel.setOverDelTol(new BigDecimal(0.0));
                }
                if (!"".equals(jsonobj.optString("UnderDelTol"))) {
                    pOCreationDel.setUnderDelTol(new BigDecimal(jsonobj.optString("UnderDelTol")));
                } else {
                    pOCreationDel.setOverDelTol(new BigDecimal(0.0));
                }
                if (!"".equals(jsonobj.optString("ShippingInstructions"))) {
                    pOCreationDel.setShippingInstructions(jsonobj.optString("ShippingInstructions"));
                } else {
                    pOCreationDel.setShippingInstructions("");
                }
                if (!"".equals(jsonobj.optString("StockType"))) {
                    pOCreationDel.setStockType(jsonobj.optString("StockType"));
                } else {
                    pOCreationDel.setStockType("");
                }
                if (!"".equals(jsonobj.optString("ValuationType"))) {
                    pOCreationDel.setValuationType(jsonobj.optString("ValuationType"));
                } else {
                    pOCreationDel.setValuationType("");
                }

                if (!"".equals(jsonobj.optString("RemShelfLife"))) {
                    pOCreationDel.setRemShelfLife(jsonobj.optString("RemShelfLife"));
                } else {
                    pOCreationDel.setRemShelfLife("");
                }
                if (!"".equals(jsonobj.optString("QAControlLife"))) {
                    pOCreationDel.setQaControlLife(jsonobj.optString("QAControlLife"));
                } else {
                    pOCreationDel.setQaControlLife("");
                }
                if (!"".equals(jsonobj.optString("GrProcTime"))) {
                    pOCreationDel.setGrProcTime(jsonobj.optString("GrProcTime"));
                } else {
                    pOCreationDel.setGrProcTime("");
                }
                if (!"".equals(jsonobj.optString("FstRem_Exped"))) {
                    pOCreationDel.setFstRemExped(jsonobj.optString("FstRem_Exped"));
                } else {
                    pOCreationDel.setFstRemExped("");
                }
                if (!"".equals(jsonobj.optString("SecRem_Exped"))) {
                    pOCreationDel.setSecRemExped(jsonobj.optString("SecRem_Exped"));
                } else {
                    pOCreationDel.setSecRemExped("");
                }
                if (!"".equals(jsonobj.optString("ThrdRem_Exped"))) {
                    pOCreationDel.setThrdRemExped(jsonobj.optString("ThrdRem_Exped"));
                } else {
                    pOCreationDel.setThrdRemExped("");
                }
                if (!"".equals(jsonobj.optString("NoExpend"))) {
                    pOCreationDel.setNoExpend(jsonobj.optString("NoExpend"));
                } else {
                    pOCreationDel.setNoExpend("");
                }
                if (!"".equals(jsonobj.optString("PlDelTime"))) {
                    pOCreationDel.setPlDelTime(jsonobj.optString("PlDelTime"));
                } else {
                    pOCreationDel.setPlDelTime("");
                }
                if (!"".equals(jsonobj.optString("IncoTerms1"))) {
                    pOCreationDel.setIncoTerms1(jsonobj.optString("IncoTerms1"));
                } else {
                    pOCreationDel.setIncoTerms1("");
                }

                pOCreationDel.setLinkID(jsonobj.optString("LinkId"));
                pOCreationDel.setPrItemNumber(jsonobj.optString("ItemNumber"));
                lineItemObj.setInvDel(pOCreationDel);
            }
        }

        System.out.println("POLimitsDataAsJsonArray.length() :" + POLimitsDataAsJsonArray.length());
        for (int i = 0; i < POLimitsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POLimitsDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid POLimitsDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid POLimitsDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {

                if (!"".equals(jsonobj.optString("OverallLimit"))) {
                    nGBPCmplxPOCreationLimits.setOverallLimit(jsonobj.optString("OverallLimit"));
                } else {
                    nGBPCmplxPOCreationLimits.setOverallLimit("");
                }
                if (!"".equals(jsonobj.optString("ExpectedValue"))) {
                    nGBPCmplxPOCreationLimits.setExpectedValue(jsonobj.optString("ExpectedValue"));
                } else {
                    nGBPCmplxPOCreationLimits.setExpectedValue("");
                }
                if (!"".equals(jsonobj.optString("NoLimit"))) {
                    nGBPCmplxPOCreationLimits.setNoLimit(jsonobj.optString("NoLimit"));
                } else {
                    nGBPCmplxPOCreationLimits.setNoLimit("");
                }

                nGBPCmplxPOCreationLimits.setLinkID(jsonobj.optString("LinkId"));
                nGBPCmplxPOCreationLimits.setPrItemNumber(jsonobj.optString("ItemNumber"));

                lineItemObj.setpOCreationLimits(nGBPCmplxPOCreationLimits);
            }
        }

        System.out.println("POQuantityWeightsDataAsJsonArray.length() :" + POQuantityWeightsDataAsJsonArray.length());
        for (int i = 0; i < POQuantityWeightsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POQuantityWeightsDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid POQuantityWeightsDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid POQuantityWeightsDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {

                if (!"".equals(jsonobj.optString("POQuantity"))) {
                    pOCreationQuanWeight.setPoQuantity(new BigDecimal(jsonobj.optString("POQuantity")));
                } else {
                    pOCreationQuanWeight.setPoQuantity(new BigDecimal(0.00));
                }
                if (!"".equals(jsonobj.optString("POQuantityUnit"))) {
                    pOCreationQuanWeight.setPoQuantityUnit(jsonobj.optString("POQuantityUnit"));
                } else {
                    pOCreationQuanWeight.setPoQuantityUnit("");
                }
                if (!"".equals(jsonobj.optString("POQuantitySKU"))) {
                    pOCreationQuanWeight.setPoQuantitySKU(new BigDecimal(jsonobj.optString("POQuantitySKU")));
                } else {
                    pOCreationQuanWeight.setPoQuantitySKU(new BigDecimal(0.0));
                }
                if (!"".equals(jsonobj.optString("POQuantitySKUUnit"))) {
                    pOCreationQuanWeight.setPoQuantitySKUUnit(jsonobj.optString("POQuantitySKUUnit"));
                } else {
                    pOCreationQuanWeight.setPoQuantitySKUUnit("");
                }
                if (!"".equals(jsonobj.optString("Order1"))) {
                    pOCreationQuanWeight.setOrder1(jsonobj.optString("Order1"));
                } else {
                    pOCreationQuanWeight.setOrder1("");
                }
                if (!"".equals(jsonobj.optString("OrderUnit1"))) {
                    pOCreationQuanWeight.setOrderUnit1(jsonobj.optString("OrderUnit1"));
                } else {
                    pOCreationQuanWeight.setOrderUnit1("");
                }
                if (!"".equals(jsonobj.optString("OrderPrice"))) {
                    pOCreationQuanWeight.setOrderPrice(jsonobj.optString("OrderPrice"));
                } else {
                    pOCreationQuanWeight.setOrderPrice("");
                }
                if (!"".equals(jsonobj.optString("OrderPriceUnit"))) {
                    pOCreationQuanWeight.setOrderPriceUnit(jsonobj.optString("OrderPriceUnit"));
                } else {
                    pOCreationQuanWeight.setOrderPriceUnit("");
                }
                if (!"".equals(jsonobj.optString("Order2"))) {
                    pOCreationQuanWeight.setOrder2(jsonobj.optString("Order2"));
                } else {
                    pOCreationQuanWeight.setOrder2("");
                }
                if (!"".equals(jsonobj.optString("OrderUnit2"))) {
                    pOCreationQuanWeight.setOrderUnit2(jsonobj.optString("OrderUnit2"));
                } else {
                    pOCreationQuanWeight.setOrderUnit2("");
                }
                if (!"".equals(jsonobj.optString("SKU"))) {
                    pOCreationQuanWeight.setSku(jsonobj.optString("SKU"));
                } else {
                    pOCreationQuanWeight.setSku("");
                }
                if (!"".equals(jsonobj.optString("SKUUnit"))) {
                    pOCreationQuanWeight.setSkuUnit(jsonobj.optString("SKUUnit"));
                } else {
                    pOCreationQuanWeight.setSkuUnit("");
                }

                pOCreationQuanWeight.setLinkID(jsonobj.optString("LinkId"));
                pOCreationQuanWeight.setPrItemNumber(jsonobj.optString("ItemNumber"));

                lineItemObj.setQuanWeight(pOCreationQuanWeight);
            }
        }

        System.out.println("POTextsDataAsJsonArray.length() :" + POTextsDataAsJsonArray.length());
        for (int i = 0; i < POTextsDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POTextsDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid POTextsDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid POTextsDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                if (!"".equals(jsonobj.optString("ItemText"))) {
                    pOCreationText.setItemText(jsonobj.optString("ItemText"));
                } else {
                    pOCreationText.setItemText("");
                }
                if (!"".equals(jsonobj.optString("InfoRecordPOText"))) {
                    pOCreationText.setInfoRecordPOText(jsonobj.optString("InfoRecordPOText"));
                } else {
                    pOCreationText.setInfoRecordPOText("");
                }
                if (!"".equals(jsonobj.optString("MaterialPOText"))) {
                    pOCreationText.setMaterialPOText(jsonobj.optString("MaterialPOText"));
                } else {
                    pOCreationText.setMaterialPOText("");
                }
                if (!"".equals(jsonobj.optString("PONoteToApprover"))) {
                    pOCreationText.setPONoteToApprover(jsonobj.optString("PONoteToApprover"));
                } else {
                    pOCreationText.setPONoteToApprover("");
                }
                if (!"".equals(jsonobj.optString("DeliveryText"))) {
                    pOCreationText.setDeliveryText(jsonobj.optString("DeliveryText"));
                } else {
                    pOCreationText.setDeliveryText("");
                }

                pOCreationText.setLinkID(jsonobj.optString("LinkId"));
                pOCreationText.setPrItemNumber(jsonobj.optString("ItemNumber"));
                lineItemObj.setpOCreationText(pOCreationText);
            }
        }

        System.out.println("POConfirmationDataAsJsonArray.length() :" + POConfirmationDataAsJsonArray.length());
        for (int i = 0; i < POConfirmationDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POConfirmationDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid POConfirmationDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid POConfirmationDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                if (!"".equals(jsonobj.optString("ConfControl"))) {
                    invCon.setConfControl(jsonobj.optString("ConfControl"));
                } else {
                    invCon.setConfControl("");
                }
                if (!"".equals(jsonobj.optString("OrderAck"))) {
                    invCon.setOrderAck(jsonobj.optString("OrderAck"));
                } else {
                    invCon.setOrderAck("");
                }
                if (!"".equals(jsonobj.optString("ConfirmnReq"))) {
                    invCon.setConfirmnReq(jsonobj.optString("ConfirmnReq"));
                } else {
                    invCon.setConfirmnReq("");
                }
                if (!"".equals(jsonobj.optString("RejectInd"))) {
                    invCon.setRejectInd(jsonobj.optString("RejectInd"));
                } else {
                    invCon.setRejectInd("");
                }
                invCon.setLinkID(jsonobj.optString("LinkId"));
                invCon.setPrItemNumber(jsonobj.optString("ItemNumber"));
                lineItemObj.setpOCreationcon(invCon);
            }
        }

        System.out.println("POCondCtrlDataAsJsonArray.length() :" + POCondCtrlDataAsJsonArray.length());
        for (int i = 0; i < POCondCtrlDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POCondCtrlDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid POCondCtrlDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid POCondCtrlDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                if (!"".equals(jsonobj.optString("PrintPrice"))) {
                    invCond.setPrintPrice(jsonobj.optString("PrintPrice"));
                } else {
                    invCond.setPrintPrice("");
                }
                if (!"".equals(jsonobj.optString("EstimatedPrice"))) {
                    invCond.setEstimatedPrice(jsonobj.optString("EstimatedPrice"));
                } else {
                    invCond.setEstimatedPrice("");
                }

                invCond.setLinkID(jsonobj.optString("LinkId"));
                if (!"".equals(jsonobj.optString("ItemNumber"))) {
                    invCond.setPrItemNumber(jsonobj.optString("ItemNumber"));
                } else {
                    invCond.setPrItemNumber("");
                }

                lineItemObj.setpOCreationcond(invCond);
            }
        }

        System.out.println("POLineItemCustomerDataAsJsonArray.length() :" + POLineItemCustomerDataAsJsonArray.length());
        for (int i = 0; i < POLineItemCustomerDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POLineItemCustomerDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid POLineItemCustomerDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid POLineItemCustomerDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                if (!"".equals(jsonobj.optString("ProductOrigin"))) {
                    invCusData.setProductOrigin(jsonobj.optString("ProductOrigin"));
                } else {
                    invCusData.setProductOrigin("");
                }

                if (!"".equals(jsonobj.optString("ProductOrigin"))) {
                    invCusData.setSegment(jsonobj.optString("Segment"));
                } else {
                    invCusData.setSegment("");
                }

                invCusData.setLinkID(jsonobj.optString("LinkId"));
                if (!"".equals(jsonobj.optString("ItemNumber"))) {
                    invCusData.setPrItemNumber(jsonobj.optString("ItemNumber"));
                } else {
                    invCusData.setPrItemNumber("");
                }

                lineItemObj.setpOCreationCustomerData(invCusData);
            }
        }

        System.out.println("POAccAssDataAsJsonArray.length() :" + POAccAssDataAsJsonArray.length());
        List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accountAssignmentList = new ArrayList<>();
        for (int i = 0; i < POAccAssDataAsJsonArray.length(); i++) {
//             List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accountAssignmentList = new ArrayList<>();
            sTAccountAssignment = new NGBPCmplxPOCreationLineItemPOAccountAssignment();
            JSONObject jsonobj = POAccAssDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid POAccAssDataAsJsonArray:" + jsonobj.getString("LinkID"));
            System.out.println("lineItemObj linkid POAccAssDataAsJsonArray:" + lineItemObj.getLinkId());
            String linkId = jsonobj.getString("LinkID");
            if (jsonobj.getString("LinkID").equals(lineItemObj.getLinkId())) {
                List<NGBPCmplxPOCreationLineItemPOAccountAssignment> accountAsgnList = standalonePoWS.getAccountAssignmentByLinkId(linkId);
                int size = accountAsgnList.size();
                System.out.println("accountAsgnList size :" + size);
                if (!accountAsgnList.isEmpty()) {
                    for (NGBPCmplxPOCreationLineItemPOAccountAssignment assignment : accountAsgnList) {
                        assignment.setLinkID("");
                        standalonePoWS.updateNGBPCmplxPOCreationLineItemPOAccountAssignment(assignment);
                    }
                }
                if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                    sTAccountAssignment.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
                } else {
                    sTAccountAssignment.setQuantity(new BigDecimal(0.0));
                }

                if (jsonobj.getString("Percentage") != null && !jsonobj.getString("Percentage").trim().equalsIgnoreCase("")) {
                    sTAccountAssignment.setPercentage(new BigDecimal(jsonobj.getString("Percentage")));
                } else {
                    sTAccountAssignment.setPercentage(new BigDecimal(0.0));
                }

                if (jsonobj.getString("Distribution") != null && !jsonobj.getString("Distribution").trim().equalsIgnoreCase("")) {
                    switch (jsonobj.getString("Distribution")) {
                        case "Distrib. On Quantity Basis":
                            sTAccountAssignment.setDistribution("1");
                            break;
                        case "Distrib. By Percentage":
                            sTAccountAssignment.setDistribution("2");
                            break;
                        case "Single Account Assignment":
                            sTAccountAssignment.setDistribution("");
                            break;
                    }
                }

                sTAccountAssignment.setGlAccount(jsonobj.getString("GLAccount"));
                sTAccountAssignment.setCommitmentItem(jsonobj.getString("CommitmentItem"));
                sTAccountAssignment.setCoArea(jsonobj.getString("COArea"));
                sTAccountAssignment.setCostCenter(jsonobj.getString("CostCenter"));
                sTAccountAssignment.setFund(jsonobj.getString("Fund"));
                sTAccountAssignment.setFunctionalArea(jsonobj.getString("FunctionalArea"));
                sTAccountAssignment.setFundsCentre(jsonobj.getString("FundsCentre"));
                sTAccountAssignment.setUnloadingPoint(jsonobj.getString("UnloadingPoint"));
                sTAccountAssignment.setRecipient(jsonobj.getString("Recipient"));
                sTAccountAssignment.setAccOrder(jsonobj.getString("AccOrder"));
                sTAccountAssignment.setAsset(jsonobj.getString("Asset"));
                sTAccountAssignment.setWbsElement(jsonobj.getString("WBSElement"));
                sTAccountAssignment.setSalesOrder(jsonobj.getString("SalesOrder"));
                sTAccountAssignment.setNetwork(jsonobj.getString("ActivityNumber"));
                sTAccountAssignment.setDeliverySchedule(jsonobj.getString("DeliverySchedule"));
//                sTAccountAssignment.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
                sTAccountAssignment.setAccountAssignmentCategory(jsonobj.getString("AccountAssignmentCategory"));
                sTAccountAssignment.setCoCode(jsonobj.getString("CoCode"));
//                sTAccountAssignment.setLinkID("");
//                sTAccountAssignment.setPrItemNumber(jsonobj.getString("ItmNo"));
                sTAccountAssignment.setLinkID(jsonobj.getString("LinkID"));
                sTAccountAssignment.setPartialInvoiceIndicator(jsonobj.getString("PartialInvoiceIndicator"));
//                sTAccountAssignment.setServiceLineItemNumber("");
                sTAccountAssignment.setSerialNumber(jsonobj.getString("SerialNo"));
                sTAccountAssignment.setPrItemNumber(jsonobj.getString("ItmNo"));

//                String msg = purchaseOrderWS.saveAccountAssignment(sTAccountAssignment);
//                System.out.println("msg :" + msg);
                accountAssignmentList.add(sTAccountAssignment);
//                }
            }
//            System.out.println("accountAssignmentList size :" + accountAssignmentList.size());
//            lineItemObj.setLineItemAccountAssignment(accountAssignmentList);
        }
        System.out.println("accountAssignmentList size :" + accountAssignmentList.size());
        lineItemObj.setLineItemAccountAssignment(accountAssignmentList);

        System.out.println("POLineItemConditionDataAsJsonArray.length():" + POLineItemConditionDataAsJsonArray.length());
//        System.out.println("POAccAssDataAsJsonArray string :" + POLineItemConditionDataAsJsonArray);
        for (int i = 0; i < POLineItemConditionDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POLineItemConditionDataAsJsonArray.getJSONObject(i);
            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                String linkId = jsonobj.getString("LinkId");
                List<NGBPCmplxPOCreationLineItemConditions> listCondition = standalonePoWS.getNGBPCmplxPOCreationConditionsByLinkId(linkId);
                if (!listCondition.isEmpty()) {
                    for (NGBPCmplxPOCreationLineItemConditions conditionObj : listCondition) {
                        conditionObj.setLinkID("");
                        standalonePoWS.updateNGBPCmplxPOCreationLineItemConditions(conditionObj);
                    }
                }
            }
        }
        NGBPCmplxPOCreationLineItemConditions condition;
        List<NGBPCmplxPOCreationLineItemConditions> conditionList = new ArrayList<>();
        for (int i = 0; i < POLineItemConditionDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POLineItemConditionDataAsJsonArray.getJSONObject(i);
            condition = new NGBPCmplxPOCreationLineItemConditions();
//            String linkId = jsonobj.getString("LinkId");

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                System.out.println("jsonobj linkid POLineItemConditionDataAsJsonArray:" + jsonobj.getString("LinkId"));

                if (jsonobj.getString("Amount") != null && !jsonobj.getString("Amount").trim().equalsIgnoreCase("")) {
//                    System.out.println("Inside Inner IF::");
                    condition.setAmount(new BigDecimal(jsonobj.getString("Amount")));
                } else {
                    condition.setAmount(new BigDecimal(0.0));
                }
                condition.setCondType(jsonobj.getString("CondType"));
                condition.setCondName(jsonobj.getString("CondName"));
                condition.setPerQuantity(new BigDecimal(0.0));
                condition.setCondPricUnit(jsonobj.getString("CondPricUnit"));
                condition.setCurrency1("");
                condition.setUoM(jsonobj.getString("CondUnit"));
                condition.setCondVal(new BigDecimal(jsonobj.getString("CondVal")));
                condition.setCurrency1(jsonobj.getString("Currency"));
                condition.setCondVal1(new BigDecimal(0.0));
                condition.setCondCrncy("");
                condition.setCondDet("");
//            condition.setLineitemId(jsonobj.getString("PrInsertionOrderId"));
//            condition.setPrItemNumber(jsonobj.getString("ItemNumber"));
                condition.setLinkID(jsonobj.getString("LinkId"));
                condition.setStNumber(jsonobj.getString("CondSTNo"));
                condition.setConditionCount(jsonobj.getString("CondCount"));
                condition.setKappl(jsonobj.getString("Application"));
                condition.setKvsl1(jsonobj.getString("AccountKey"));
                condition.setKvsl2(jsonobj.getString("Accruals"));
                condition.setChangeId(jsonobj.getString("CondChangeId"));
                condition.setNgStatus(jsonobj.getString("Status"));
                if (jsonobj.getString("Numerator") != null && !jsonobj.getString("Numerator").trim().equalsIgnoreCase("")) {
                    condition.setNumerator(Integer.parseInt(jsonobj.getString("Numerator")));
                } else {
                    condition.setNumerator(null);
                }
                condition.setBaseUOM(jsonobj.getString("BaseUOM"));
//                condition.setDenominatorforconv(Integer.parseInt(jsonobj.getString("Denominator")));
                if (jsonobj.getString("Denominator") != null && !jsonobj.getString("Denominator").trim().equalsIgnoreCase("")) {
                    condition.setDenominatorforconv(Integer.parseInt(jsonobj.getString("Denominator")));
                } else {
                    condition.setDenominatorforconv(null);
                }
                condition.setUomextra(jsonobj.getString("Uom_Extra"));

                condition.setPrItemNumber(jsonobj.getString("PrItemNumber"));

                conditionList.add(condition);
//                System.out.println("conditionList string :" + conditionList.get(i).getCondType());
            }
        }
        lineItemObj.setLineItemConditions(conditionList);
//        System.out.println("conditionList size :" + conditionList.size());
//        for (int i = 0; i < conditionList.size(); i++) {
//            System.out.println("conditionList string :" + conditionList.get(i).getCondType());
//        }

        System.out.println("PODeliveryScheduleDataAsJsonArray.length() :" + PODeliveryScheduleDataAsJsonArray.length());
        List<NGBPCmplxPOCreationDelverySchedule> deliveryScheduleList = new ArrayList<>();
        for (int i = 0; i < PODeliveryScheduleDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = PODeliveryScheduleDataAsJsonArray.getJSONObject(i);
            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                String linkId = jsonobj.getString("LinkId");
                System.out.println("linkId in PODeliveryScheduleDataAsJsonArray :" + linkId);
                List<NGBPCmplxPOCreationDelverySchedule> list = standalonePoWS.getDeliveryScheduleByLinkId(linkId);
                System.out.println("list size in PODeliveryScheduleDataAsJsonArray ::" + list.size());
                if (!list.isEmpty()) {
                    for (NGBPCmplxPOCreationDelverySchedule deliveryObj : list) {
                        deliveryObj.setLinkID("");
                        standalonePoWS.updateNGBPCmplxPOCreationDelverySchedule(deliveryObj);
                    }
                }
            }
        }

        for (int i = 0; i < PODeliveryScheduleDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = PODeliveryScheduleDataAsJsonArray.getJSONObject(i);
            System.out.println("jsonobj linkid PODeliveryScheduleDataAsJsonArray:" + jsonobj.getString("LinkId"));
            System.out.println("lineItemObj linkid PODeliveryScheduleDataAsJsonArray:" + lineItemObj.getLinkId());

            if (jsonobj.getString("LinkId").equals(lineItemObj.getLinkId())) {
                System.out.println("Delivery Sch Line Level object: " + jsonobj.toString());

                if (jsonobj.getString("DelDate") != null && !jsonobj.getString("DelDate").equalsIgnoreCase("")) {
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                    try {
                        Date dateCat = formatter.parse(jsonobj.getString("DelDate"));
                        System.out.println("dateCat :" + dateCat);
                        nGBPCmplxPOCreationDelverySchedule.setDelDate(dateCat);
                    } catch (ParseException e) {
                        System.out.println("e: " + e);
                    }
                }

                if (jsonobj.getString("ScheduledQuantity") != null && !jsonobj.getString("ScheduledQuantity").trim().equalsIgnoreCase("")) {
                    nGBPCmplxPOCreationDelverySchedule.setScheduledQuantity(new BigDecimal(jsonobj.getString("ScheduledQuantity")));
                } else {
                    nGBPCmplxPOCreationDelverySchedule.setScheduledQuantity(new BigDecimal(0.0));
                }

                nGBPCmplxPOCreationDelverySchedule.setDelDateCatg(jsonobj.getString("DelDateCatg"));
                nGBPCmplxPOCreationDelverySchedule.setDelTime(jsonobj.getString("DelTime"));
                nGBPCmplxPOCreationDelverySchedule.setPRNumber(jsonobj.getString("PRNumber"));
                nGBPCmplxPOCreationDelverySchedule.setReqItemNo(jsonobj.getString("ReqItemNo"));
                nGBPCmplxPOCreationDelverySchedule.setPrItemNumber(jsonobj.getString("ItemNo"));
                nGBPCmplxPOCreationDelverySchedule.setLinkID(jsonobj.getString("LinkId"));
//                nGBPCmplxPOCreationDelverySchedule.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
                deliveryScheduleList.add(nGBPCmplxPOCreationDelverySchedule);
            }
//            System.out.println("deliveryScheduleList size :" + deliveryScheduleList.size());
//            lineItemObj.setLineItemDeliverySchedule(deliveryScheduleList);
        }
        System.out.println("deliveryScheduleList size :" + deliveryScheduleList.size());
        lineItemObj.setLineItemDeliverySchedule(deliveryScheduleList);

        if ("Service".equals(prType)) {
            System.out.println("POServiceDataAsJsonArray.length() :" + POServiceDataAsJsonArray.length());
            List<NGBPCmplxPOCreationLineItemService> invServicesList = new ArrayList<>();
            for (int i = 0; i < POServiceDataAsJsonArray.length(); i++) {
                JSONObject jsonobj = POServiceDataAsJsonArray.getJSONObject(i);
                String linkid = jsonobj.getString("PrLineItemDataLinkId");
                if (jsonobj.getString("PrLineItemDataLinkId").equals(lineItemObj.getLinkId())) {
                    System.out.println("linkid in POServiceDataAsJsonArray :" + linkid);
                    List<NGBPCmplxPOCreationLineItemService> serviceList = standalonePoWS.getServicesByLinkId(linkid);
                    System.out.println("serviceList size :" + serviceList.size());
                    if (!serviceList.isEmpty()) {
                        for (NGBPCmplxPOCreationLineItemService serviceObj : serviceList) {
                            serviceObj.setLinkId("");
                            standalonePoWS.updateNGBPCmplxPOCreationLineItemService(serviceObj);
                        }
                    }
                }
            }
            for (int i = 0; i < POServiceDataAsJsonArray.length(); i++) {
                JSONObject jsonobj = POServiceDataAsJsonArray.getJSONObject(i);
                System.out.println("jsonobj linkid POServiceDataAsJsonArray:" + jsonobj.getString("PrLineItemDataLinkId"));
                System.out.println("lineItemObj linkid POServiceDataAsJsonArray:" + lineItemObj.getLinkId());

                if (jsonobj.getString("PrLineItemDataLinkId").equals(lineItemObj.getLinkId())) {

                    System.out.println("Service object: " + jsonobj.toString());

                    nGBPCmplxPOCreationLineItemService.setLineItemNumber(jsonobj.getString("LineItemNumber"));
                    nGBPCmplxPOCreationLineItemService.setServiceNumber(jsonobj.getString("ServiceNumber"));
                    nGBPCmplxPOCreationLineItemService.setShortText(jsonobj.getString("ShortText"));
                    nGBPCmplxPOCreationLineItemService.setUnit(jsonobj.getString("Unit"));
                    nGBPCmplxPOCreationLineItemService.setCurrency(jsonobj.getString("Currency"));
                    nGBPCmplxPOCreationLineItemService.setEdition(jsonobj.getString("Edition"));
                    nGBPCmplxPOCreationLineItemService.setLineItemLongText(jsonobj.getString("LineItemLongText"));
                    nGBPCmplxPOCreationLineItemService.setOverfTolerance(jsonobj.getString("OverfTolerance"));
//                nGBPCmplxPOCreationLineItemService.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
                    nGBPCmplxPOCreationLineItemService.setLinkId(jsonobj.getString("PrLineItemDataLinkId"));
                    nGBPCmplxPOCreationLineItemService.setServiceLinkID(jsonobj.getString("ServiceLinkID"));
//                nGBPCmplxPOCreationLineItemService.setPrItemNumber(jsonobj.getString("PrItemNumber"));

                    if (jsonobj.getString("Distribution") != null && !jsonobj.getString("Distribution").trim().equalsIgnoreCase("")) {
                        if (jsonobj.getString("Distribution").equals("Distrib. On Quantity Basis")) {
                            nGBPCmplxPOCreationLineItemService.setDistribution("1");
                        } else {
                            nGBPCmplxPOCreationLineItemService.setDistribution("2");
                        }
                    } else {
                        nGBPCmplxPOCreationLineItemService.setDistribution("0");
                    }

                    if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                        nGBPCmplxPOCreationLineItemService.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
                    } else {
                        nGBPCmplxPOCreationLineItemService.setQuantity(new BigDecimal(0.0));
                    }
                    if (jsonobj.getString("GrossPrice") != null && !jsonobj.getString("GrossPrice").trim().equalsIgnoreCase("")) {
                        nGBPCmplxPOCreationLineItemService.setGrossPrice(new BigDecimal(jsonobj.getString("GrossPrice")));
                    } else {
                        nGBPCmplxPOCreationLineItemService.setGrossPrice(new BigDecimal(0.0));
                    }
                    if (jsonobj.getString("NetPrice") != null && !jsonobj.getString("NetPrice").trim().equalsIgnoreCase("")) {
                        nGBPCmplxPOCreationLineItemService.setNetPrice(new BigDecimal(jsonobj.getString("NetPrice")));
                    } else {
                        nGBPCmplxPOCreationLineItemService.setNetPrice(new BigDecimal(0.0));
                    }
                    nGBPCmplxPOCreationLineItemService.setPrItemNumber(jsonobj.getString("PrItemNumber"));
                    invServicesList.add(nGBPCmplxPOCreationLineItemService);
                }
                System.out.println("invServicesList size :" + invServicesList.size());
                lineItemObj.setLineItemServices(invServicesList);
            }
        }
        System.out.println("Sunny Kumar Prajapati 52 ::::::");
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveSAPrSub.do?poid=" + PoId + "&prType=" + prType), lineItemObj, String.class);
        System.out.println("id after save :" + id);

        return lineItemObj;
    }

    public String saveSAServiceAccountAssignmentData(JSONArray POServiceAccAssDataAsJsonArray, String PoId) {
        System.out.println("In saveServiceAccountAssignmentTabData===========");
        for (int i = 0; i < POServiceAccAssDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POServiceAccAssDataAsJsonArray.getJSONObject(i);
            String linkid = jsonobj.getString("PrLineItemDataLinkId");
            String lineItemNumber = jsonobj.getString("LineItemNumber");
            String[] itemNumberArr = linkid.split("-");
            String itemNumber = itemNumberArr[2];
            System.out.println("PR Item Number : " + itemNumber);
            System.out.println("linkid in saveSAServiceAccountAssignmentData:" + linkid);
            System.out.println("lineItemNumber in saveSAServiceAccountAssignmentData:" + lineItemNumber);

            List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> accAsgnList = standalonePoWS.getServiceAccAsgnByServiceLineItemNumberAndLineItemNumberAndPoId(itemNumber, lineItemNumber, PoId);
            System.out.println("accAsgnList size in saveSAServiceAccountAssignmentDatas :" + accAsgnList);
            if (!accAsgnList.isEmpty()) {
                standalonePoWS.deleteAllFromNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(accAsgnList);
            }
        }

        for (int i = 0; i < POServiceAccAssDataAsJsonArray.length(); i++) {
            JSONObject jsonobj = POServiceAccAssDataAsJsonArray.getJSONObject(i);
            System.out.println("Service object: " + jsonobj.toString());

            if (jsonobj.getString("Quantity") != null && !jsonobj.getString("Quantity").trim().equalsIgnoreCase("")) {
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(jsonobj.getString("Quantity")));
            } else {
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setQuantity(new BigDecimal(0.0));
            }
            if (jsonobj.getString("Percentage") != null && !jsonobj.getString("Percentage").trim().equalsIgnoreCase("")) {
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPercentage(new BigDecimal(jsonobj.getString("Percentage")));
            } else {
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPercentage(new BigDecimal(0.0));
            }

            if (jsonobj.getString("NETVALUE") != null && !jsonobj.getString("NETVALUE").trim().equalsIgnoreCase("")) {
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetvalue(new BigDecimal(jsonobj.getString("NETVALUE")));
            } else {
                nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetvalue(new BigDecimal(0.0));
            }

            if (jsonobj.getString("Distribution") != null && !jsonobj.getString("Distribution").trim().equalsIgnoreCase("")) {
                switch (jsonobj.getString("Distribution")) {
                    case "Distrib. On Quantity Basis":
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution("1");
                        break;
                    case "Distrib. By Percentage":
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution("2");
                        break;
                    case "Single Account Assignment":
                        nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDistribution("");
                        break;
                }
            }

            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setGlAccount(jsonobj.getString("GLAccount"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCommitmentItem(jsonobj.getString("CommitmentItem"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCoArea(jsonobj.getString("CoArea"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setCostCenter(jsonobj.getString("CostCenter"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFund(jsonobj.getString("Fund"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFunctionalArea(jsonobj.getString("FunctionalArea"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setFundsCentre(jsonobj.getString("FundsCentre"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccOrder(jsonobj.getString("Acc_Order"));
//            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLineItemNumber(jsonobj.getString("PrInsertionOrderId"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setServiceLineItemNumber(jsonobj.getString("LineItemNumber"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccAsset(jsonobj.getString("Acc_Asset"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccWBSElement(jsonobj.getString("Acc_WBSElement"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSalesOrder(jsonobj.getString("SalesOrder"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setNetwork(jsonobj.getString("ActivityNumber"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber(jsonobj.getString("ItemNumber"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setDeliverySchedule(jsonobj.getString("DeliverySchedule"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setAccountAssignment(jsonobj.getString("AccountAssignment"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkNumber(jsonobj.getString("LinkNumber"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setLinkID(jsonobj.getString("PrLineItemDataLinkId"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setItemNumber(jsonobj.getString("PrItemNumber"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setRecipient("");
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setUnloadingPoint("");
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setSerialNumber(jsonobj.getString("SerialNo"));
            nGBPCmplxPOCreationLineItemPOAccountAssignmentValues.setPoId(PoId);

//            String msg = purchaseOrderWS.saveServiceAccountAssignment(nGBPCmplxPOCreationLineItemPOAccountAssignmentValues);
            String message = standalonePoWS.saveNGBPCmplxPOCreationLineItemPOAccountAssignmentValues(nGBPCmplxPOCreationLineItemPOAccountAssignmentValues);
            System.out.println("msg :" + message);
        }
        return "Saved";
    }

    public JSONObject draftPo(String draftPoExtId, String prType, String formdata, String errorTransactionStatus) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        String username = buyer.getUsername();
        String email = buyer.getEmailid();
        Date today = new Date();
        JSONObject jsonObj = new JSONObject();

        JSONObject POHeaderDataAsJsonObj = new JSONObject(formdata);
        System.out.println("draftPoExtId in draftPo: " + draftPoExtId);
        String extId;
        String tempPoNumber;
        ExtPoCreationDraft extPoCreationDraftRef;
        if (draftPoExtId != null && !draftPoExtId.equals("")) {
            extId = draftPoExtId;
            extPoCreationDraftRef = purchaseOrderWSUtil.getExtPoCreationDraftById(Integer.parseInt(draftPoExtId));

            extPoCreationDraftRef.setCompanyCode(POHeaderDataAsJsonObj.getString("companycode"));
            extPoCreationDraftRef.setVendorSno(Integer.parseInt(POHeaderDataAsJsonObj.getString("vendorSno")));
            extPoCreationDraftRef.setVendorName(POHeaderDataAsJsonObj.getString("vendorName"));
            extPoCreationDraftRef.setVendorCode(POHeaderDataAsJsonObj.getString("vendorCode"));
            extPoCreationDraftRef.setPurchaseOrderType(POHeaderDataAsJsonObj.getString("typeOfPOHeader"));
            extPoCreationDraftRef.setDownpaymentReqd(POHeaderDataAsJsonObj.getString("downPaymentReqd"));
            extPoCreationDraftRef.setPurchasingOrg(POHeaderDataAsJsonObj.getString("purchasingOrg"));
            extPoCreationDraftRef.setPurchasingGrp(POHeaderDataAsJsonObj.getString("purchasingGroup"));
            extPoCreationDraftRef.setCollectiveNumber(POHeaderDataAsJsonObj.getString("CollectiveNumber"));
            extPoCreationDraftRef.setDownPaymentReqFor(POHeaderDataAsJsonObj.getString("downPaymentFor"));
            extPoCreationDraftRef.setPrType(POHeaderDataAsJsonObj.getString("prType"));
            extPoCreationDraftRef.setPoFrom(POHeaderDataAsJsonObj.getString("poFrom"));

            if (!POHeaderDataAsJsonObj.getString("selectedVendorId").equals("") && !POHeaderDataAsJsonObj.getString("selectedVendorId").equals("NA")) {
                extPoCreationDraftRef.setSelectedVendorId(POHeaderDataAsJsonObj.getString("selectedVendorId"));
            } else {
                extPoCreationDraftRef.setSelectedVendorId(null);
            }
            if (!POHeaderDataAsJsonObj.getString("pid").equals("") && !POHeaderDataAsJsonObj.getString("pid").equals("NA")) {
                extPoCreationDraftRef.setPid(POHeaderDataAsJsonObj.getString("pid"));
            } else {
                extPoCreationDraftRef.setPid(null);
            }
            if (!POHeaderDataAsJsonObj.getString("poSequenceNumber").equals("") && !POHeaderDataAsJsonObj.getString("poSequenceNumber").equals("NA")) {
                extPoCreationDraftRef.setPoSequenceNumber(POHeaderDataAsJsonObj.getString("poSequenceNumber"));
            } else {
                extPoCreationDraftRef.setPoSequenceNumber(null);
            }
            if (!POHeaderDataAsJsonObj.getString("poNumber").equals("") && !POHeaderDataAsJsonObj.getString("poNumber").equals("NA")) {
                extPoCreationDraftRef.setPurchaseOrderNumber(POHeaderDataAsJsonObj.getString("poNumber"));
            } else {
                extPoCreationDraftRef.setPurchaseOrderNumber(null);
            }
            if (!POHeaderDataAsJsonObj.getString("docDateHeader").equals("") && !POHeaderDataAsJsonObj.getString("docDateHeader").equals("NA")) {
                extPoCreationDraftRef.setPoDocDate(POHeaderDataAsJsonObj.getString("docDateHeader"));
            } else {
                extPoCreationDraftRef.setPoDocDate(null);
            }
            if (!POHeaderDataAsJsonObj.getString("vendorFinalizationTableDataArrayAsJsonString").equals("") && !POHeaderDataAsJsonObj.getString("vendorFinalizationTableDataArrayAsJsonString").equals("NA")) {
                extPoCreationDraftRef.setVendorFinalizationTableDataArrayAsJsonString(POHeaderDataAsJsonObj.getString("vendorFinalizationTableDataArrayAsJsonString"));
            } else {
                extPoCreationDraftRef.setVendorFinalizationTableDataArrayAsJsonString(null);
            }
            if (!POHeaderDataAsJsonObj.getString("newPrLineInsertionOrderId").equals("") && !POHeaderDataAsJsonObj.getString("newPrLineInsertionOrderId").equals("NA")) {
                extPoCreationDraftRef.setNewPrLineInsertionOrderId(POHeaderDataAsJsonObj.getString("newPrLineInsertionOrderId"));
            } else {
                extPoCreationDraftRef.setNewPrLineInsertionOrderId(null);
            }
            if (!POHeaderDataAsJsonObj.getString("newRfqLineRfqIdRfqLineIdInsertionOrderId").equals("") && !POHeaderDataAsJsonObj.getString("newRfqLineRfqIdRfqLineIdInsertionOrderId").equals("NA")) {
                extPoCreationDraftRef.setNewRfqLineRfqIdRfqLineIdInsertionOrderId(POHeaderDataAsJsonObj.getString("newRfqLineRfqIdRfqLineIdInsertionOrderId"));
            } else {
                extPoCreationDraftRef.setNewRfqLineRfqIdRfqLineIdInsertionOrderId(null);
            }
            if (POHeaderDataAsJsonObj.getString("downPaymentReqdValue") != null && !POHeaderDataAsJsonObj.getString("downPaymentReqdValue").equals("")) {
                extPoCreationDraftRef.setValu(new BigDecimal(POHeaderDataAsJsonObj.getString("downPaymentReqdValue")));
            } else {
                extPoCreationDraftRef.setValu(new BigDecimal(0.0));
            }
            if (!POHeaderDataAsJsonObj.getString("requestType").equals("") && !POHeaderDataAsJsonObj.getString("requestType").equals("NA")) {
                extPoCreationDraftRef.setRequestType(POHeaderDataAsJsonObj.getString("requestType"));
            } else {
                extPoCreationDraftRef.setRequestType(null);
            }
            if (!POHeaderDataAsJsonObj.getString("referenceDocType").equals("") && !POHeaderDataAsJsonObj.getString("referenceDocType").equals("NA")) {
                extPoCreationDraftRef.setReferenceDocumentType(POHeaderDataAsJsonObj.getString("referenceDocType"));
            } else {
                extPoCreationDraftRef.setReferenceDocumentType(null);
            }
            if (errorTransactionStatus != null && !errorTransactionStatus.equals("")) {
                extPoCreationDraftRef.setErrorTransactionStatus(errorTransactionStatus);
            } else {
                extPoCreationDraftRef.setErrorTransactionStatus(null);
            }
            // Status Tab
            if (!POHeaderDataAsJsonObj.getString("ordered").equals("") && !POHeaderDataAsJsonObj.getString("ordered").equals("NA")) {
                extPoCreationDraftRef.setOrdered(POHeaderDataAsJsonObj.getString("ordered"));
            } else {
                extPoCreationDraftRef.setOrdered(null);
            }
            if (!POHeaderDataAsJsonObj.getString("orderedUnit").equals("") && !POHeaderDataAsJsonObj.getString("orderedUnit").equals("NA")) {
                extPoCreationDraftRef.setOrderedUnit(POHeaderDataAsJsonObj.getString("orderedUnit"));
            } else {
                extPoCreationDraftRef.setOrderedUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("orderedTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("orderedTotalPrice").equals("NA")) {
                extPoCreationDraftRef.setOrderedTotalPrice(POHeaderDataAsJsonObj.getString("orderedTotalPrice"));
            } else {
                extPoCreationDraftRef.setOrderedTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("orderedCurrency").equals("") && !POHeaderDataAsJsonObj.getString("orderedCurrency").equals("NA")) {
                extPoCreationDraftRef.setOrderedCurrency(POHeaderDataAsJsonObj.getString("orderedCurrency"));
            } else {
                extPoCreationDraftRef.setOrderedCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("delivered").equals("") && !POHeaderDataAsJsonObj.getString("delivered").equals("NA")) {
                extPoCreationDraftRef.setDelivered(POHeaderDataAsJsonObj.getString("delivered"));
            } else {
                extPoCreationDraftRef.setDelivered(null);
            }
            if (!POHeaderDataAsJsonObj.getString("deliveredUnit").equals("") && !POHeaderDataAsJsonObj.getString("deliveredUnit").equals("NA")) {
                extPoCreationDraftRef.setDeliveredUnit(POHeaderDataAsJsonObj.getString("deliveredUnit"));
            } else {
                extPoCreationDraftRef.setDeliveredUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("deliveredTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("deliveredTotalPrice").equals("NA")) {
                extPoCreationDraftRef.setDeliveredTotalPrice(POHeaderDataAsJsonObj.getString("deliveredTotalPrice"));
            } else {
                extPoCreationDraftRef.setDeliveredTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("deliveredCurrency").equals("") && !POHeaderDataAsJsonObj.getString("deliveredCurrency").equals("NA")) {
                extPoCreationDraftRef.setDeliveredCurrency(POHeaderDataAsJsonObj.getString("deliveredCurrency"));
            } else {
                extPoCreationDraftRef.setDeliveredCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDeliv").equals("") && !POHeaderDataAsJsonObj.getString("stillToDeliv").equals("NA")) {
                extPoCreationDraftRef.setStillToDeliv(POHeaderDataAsJsonObj.getString("stillToDeliv"));
            } else {
                extPoCreationDraftRef.setStillToDeliv(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDelivUnit").equals("") && !POHeaderDataAsJsonObj.getString("stillToDelivUnit").equals("NA")) {
                extPoCreationDraftRef.setStillToDelivUnit(POHeaderDataAsJsonObj.getString("stillToDelivUnit"));
            } else {
                extPoCreationDraftRef.setStillToDelivUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDelivTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("stillToDelivTotalPrice").equals("NA")) {
                extPoCreationDraftRef.setStillToDelivTotalPrice(POHeaderDataAsJsonObj.getString("stillToDelivTotalPrice"));
            } else {
                extPoCreationDraftRef.setStillToDelivTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDelivCurrency").equals("") && !POHeaderDataAsJsonObj.getString("stillToDelivCurrency").equals("NA")) {
                extPoCreationDraftRef.setStillToDelivCurrency(POHeaderDataAsJsonObj.getString("stillToDelivCurrency"));
            } else {
                extPoCreationDraftRef.setStillToDelivCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoiced").equals("") && !POHeaderDataAsJsonObj.getString("invoiced").equals("NA")) {
                extPoCreationDraftRef.setInvoiced(POHeaderDataAsJsonObj.getString("invoiced"));
            } else {
                extPoCreationDraftRef.setInvoiced(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoicedUnit").equals("") && !POHeaderDataAsJsonObj.getString("invoicedUnit").equals("NA")) {
                extPoCreationDraftRef.setInvoicedUnit(POHeaderDataAsJsonObj.getString("invoicedUnit"));
            } else {
                extPoCreationDraftRef.setInvoicedUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoicedTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("invoicedTotalPrice").equals("NA")) {
                extPoCreationDraftRef.setInvoicedTotalPrice(POHeaderDataAsJsonObj.getString("invoicedTotalPrice"));
            } else {
                extPoCreationDraftRef.setInvoicedTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoicedCurrency").equals("") && !POHeaderDataAsJsonObj.getString("invoicedCurrency").equals("NA")) {
                extPoCreationDraftRef.setInvoicedCurrency(POHeaderDataAsJsonObj.getString("invoicedCurrency"));
            } else {
                extPoCreationDraftRef.setInvoicedCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpayments").equals("") && !POHeaderDataAsJsonObj.getString("downpayments").equals("NA")) {
                extPoCreationDraftRef.setOrdered(POHeaderDataAsJsonObj.getString("downpayments"));
            } else {
                extPoCreationDraftRef.setOrdered(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpaymentsUnit").equals("") && !POHeaderDataAsJsonObj.getString("downpaymentsUnit").equals("NA")) {
                extPoCreationDraftRef.setOrderedUnit(POHeaderDataAsJsonObj.getString("downpaymentsUnit"));
            } else {
                extPoCreationDraftRef.setOrderedUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpaymentsTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("downpaymentsTotalPrice").equals("NA")) {
                extPoCreationDraftRef.setOrderedTotalPrice(POHeaderDataAsJsonObj.getString("downpaymentsTotalPrice"));
            } else {
                extPoCreationDraftRef.setOrderedTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpaymentsCurrency").equals("") && !POHeaderDataAsJsonObj.getString("downpaymentsCurrency").equals("NA")) {
                extPoCreationDraftRef.setOrderedCurrency(POHeaderDataAsJsonObj.getString("downpaymentsCurrency"));
            } else {
                extPoCreationDraftRef.setOrderedCurrency(null);
            }

            extPoCreationDraftRef.setHeaderConditionsNew(POHeaderDataAsJsonObj.getString("headerConditionsNew"));
            extPoCreationDraftRef.setKalsm(POHeaderDataAsJsonObj.getString("kalsm"));
            
            purchaseOrderWSUtil.updateExtPoCreationDraft(extPoCreationDraftRef);
            tempPoNumber = extPoCreationDraftRef.getTempPoNumber();
        } else {

            extPoCreationDraftEntity.setCompanyCode(POHeaderDataAsJsonObj.getString("companycode"));
            extPoCreationDraftEntity.setVendorSno(Integer.parseInt(POHeaderDataAsJsonObj.getString("vendorSno")));
            extPoCreationDraftEntity.setVendorName(POHeaderDataAsJsonObj.getString("vendorName"));
            extPoCreationDraftEntity.setVendorCode(POHeaderDataAsJsonObj.getString("vendorCode"));
            extPoCreationDraftEntity.setPurchaseOrderType(POHeaderDataAsJsonObj.getString("typeOfPOHeader"));
            extPoCreationDraftEntity.setDownpaymentReqd(POHeaderDataAsJsonObj.getString("downPaymentReqd"));
            extPoCreationDraftEntity.setPurchasingOrg(POHeaderDataAsJsonObj.getString("purchasingOrg"));
            extPoCreationDraftEntity.setPurchasingGrp(POHeaderDataAsJsonObj.getString("purchasingGroup"));
            extPoCreationDraftEntity.setCompanyCode(POHeaderDataAsJsonObj.getString("companycode"));
            extPoCreationDraftEntity.setCollectiveNumber(POHeaderDataAsJsonObj.getString("CollectiveNumber"));
            extPoCreationDraftEntity.setDownPaymentReqFor(POHeaderDataAsJsonObj.getString("downPaymentFor"));
            extPoCreationDraftEntity.setPrType(POHeaderDataAsJsonObj.getString("prType"));
            extPoCreationDraftEntity.setPoFrom(POHeaderDataAsJsonObj.getString("poFrom"));

            if (!POHeaderDataAsJsonObj.getString("selectedVendorId").equals("") && !POHeaderDataAsJsonObj.getString("selectedVendorId").equals("NA")) {
                extPoCreationDraftEntity.setSelectedVendorId(POHeaderDataAsJsonObj.getString("selectedVendorId"));
            } else {
                extPoCreationDraftEntity.setSelectedVendorId(null);
            }
            if (!POHeaderDataAsJsonObj.getString("pid").equals("") && !POHeaderDataAsJsonObj.getString("pid").equals("NA")) {
                extPoCreationDraftEntity.setPid(POHeaderDataAsJsonObj.getString("pid"));
            } else {
                extPoCreationDraftEntity.setPid(null);
            }
            if (!POHeaderDataAsJsonObj.getString("poSequenceNumber").equals("") && !POHeaderDataAsJsonObj.getString("poSequenceNumber").equals("NA")) {
                extPoCreationDraftEntity.setPoSequenceNumber(POHeaderDataAsJsonObj.getString("poSequenceNumber"));
            } else {
                extPoCreationDraftEntity.setPoSequenceNumber(null);
            }
            if (!POHeaderDataAsJsonObj.getString("poNumber").equals("") && !POHeaderDataAsJsonObj.getString("poNumber").equals("NA")) {
                extPoCreationDraftEntity.setPurchaseOrderNumber(POHeaderDataAsJsonObj.getString("poNumber"));
            } else {
                extPoCreationDraftEntity.setPurchaseOrderNumber(null);
            }
            if (!POHeaderDataAsJsonObj.getString("docDateHeader").equals("") && !POHeaderDataAsJsonObj.getString("docDateHeader").equals("NA")) {
                extPoCreationDraftEntity.setPoDocDate(POHeaderDataAsJsonObj.getString("docDateHeader"));
            } else {
                extPoCreationDraftEntity.setPoDocDate(null);
            }
            if (!POHeaderDataAsJsonObj.getString("vendorFinalizationTableDataArrayAsJsonString").equals("") && !POHeaderDataAsJsonObj.getString("vendorFinalizationTableDataArrayAsJsonString").equals("NA")) {
                extPoCreationDraftEntity.setVendorFinalizationTableDataArrayAsJsonString(POHeaderDataAsJsonObj.getString("vendorFinalizationTableDataArrayAsJsonString"));
            } else {
                extPoCreationDraftEntity.setVendorFinalizationTableDataArrayAsJsonString(null);
            }
            if (!POHeaderDataAsJsonObj.getString("newPrLineInsertionOrderId").equals("") && !POHeaderDataAsJsonObj.getString("newPrLineInsertionOrderId").equals("NA")) {
                extPoCreationDraftEntity.setNewPrLineInsertionOrderId(POHeaderDataAsJsonObj.getString("newPrLineInsertionOrderId"));
            } else {
                extPoCreationDraftEntity.setNewPrLineInsertionOrderId(null);
            }
            if (!POHeaderDataAsJsonObj.getString("newRfqLineRfqIdRfqLineIdInsertionOrderId").equals("") && !POHeaderDataAsJsonObj.getString("newRfqLineRfqIdRfqLineIdInsertionOrderId").equals("NA")) {
                extPoCreationDraftEntity.setNewRfqLineRfqIdRfqLineIdInsertionOrderId(POHeaderDataAsJsonObj.getString("newRfqLineRfqIdRfqLineIdInsertionOrderId"));
            } else {
                extPoCreationDraftEntity.setNewRfqLineRfqIdRfqLineIdInsertionOrderId(null);
            }
            if (POHeaderDataAsJsonObj.getString("downPaymentReqdValue") != null && !POHeaderDataAsJsonObj.getString("downPaymentReqdValue").equals("")) {
                extPoCreationDraftEntity.setValu(new BigDecimal(POHeaderDataAsJsonObj.getString("downPaymentReqdValue")));
            } else {
                extPoCreationDraftEntity.setValu(new BigDecimal(0.0));
            }
            extPoCreationDraftEntity.setInitiatorEmailID(email);
            extPoCreationDraftEntity.setInitiatorID(username);
            extPoCreationDraftEntity.setInitiatedDate(today);

            if (!POHeaderDataAsJsonObj.getString("requestType").equals("") && !POHeaderDataAsJsonObj.getString("requestType").equals("NA")) {
                extPoCreationDraftEntity.setRequestType(POHeaderDataAsJsonObj.getString("requestType"));
            } else {
                extPoCreationDraftEntity.setRequestType(null);
            }
            if (!POHeaderDataAsJsonObj.getString("referenceDocType").equals("") && !POHeaderDataAsJsonObj.getString("referenceDocType").equals("NA")) {
                extPoCreationDraftEntity.setReferenceDocumentType(POHeaderDataAsJsonObj.getString("referenceDocType"));
            } else {
                extPoCreationDraftEntity.setReferenceDocumentType(null);
            }
            if (errorTransactionStatus != null && !errorTransactionStatus.equals("")) {
                extPoCreationDraftEntity.setErrorTransactionStatus(errorTransactionStatus);
            } else {
                extPoCreationDraftEntity.setErrorTransactionStatus(null);
            }
            // Status Tab
            if (!POHeaderDataAsJsonObj.getString("ordered").equals("") && !POHeaderDataAsJsonObj.getString("ordered").equals("NA")) {
                extPoCreationDraftEntity.setOrdered(POHeaderDataAsJsonObj.getString("ordered"));
            } else {
                extPoCreationDraftEntity.setOrdered(null);
            }
            if (!POHeaderDataAsJsonObj.getString("orderedUnit").equals("") && !POHeaderDataAsJsonObj.getString("orderedUnit").equals("NA")) {
                extPoCreationDraftEntity.setOrderedUnit(POHeaderDataAsJsonObj.getString("orderedUnit"));
            } else {
                extPoCreationDraftEntity.setOrderedUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("orderedTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("orderedTotalPrice").equals("NA")) {
                extPoCreationDraftEntity.setOrderedTotalPrice(POHeaderDataAsJsonObj.getString("orderedTotalPrice"));
            } else {
                extPoCreationDraftEntity.setOrderedTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("orderedCurrency").equals("") && !POHeaderDataAsJsonObj.getString("orderedCurrency").equals("NA")) {
                extPoCreationDraftEntity.setOrderedCurrency(POHeaderDataAsJsonObj.getString("orderedCurrency"));
            } else {
                extPoCreationDraftEntity.setOrderedCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("delivered").equals("") && !POHeaderDataAsJsonObj.getString("delivered").equals("NA")) {
                extPoCreationDraftEntity.setDelivered(POHeaderDataAsJsonObj.getString("delivered"));
            } else {
                extPoCreationDraftEntity.setDelivered(null);
            }
            if (!POHeaderDataAsJsonObj.getString("deliveredUnit").equals("") && !POHeaderDataAsJsonObj.getString("deliveredUnit").equals("NA")) {
                extPoCreationDraftEntity.setDeliveredUnit(POHeaderDataAsJsonObj.getString("deliveredUnit"));
            } else {
                extPoCreationDraftEntity.setDeliveredUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("deliveredTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("deliveredTotalPrice").equals("NA")) {
                extPoCreationDraftEntity.setDeliveredTotalPrice(POHeaderDataAsJsonObj.getString("deliveredTotalPrice"));
            } else {
                extPoCreationDraftEntity.setDeliveredTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("deliveredCurrency").equals("") && !POHeaderDataAsJsonObj.getString("deliveredCurrency").equals("NA")) {
                extPoCreationDraftEntity.setDeliveredCurrency(POHeaderDataAsJsonObj.getString("deliveredCurrency"));
            } else {
                extPoCreationDraftEntity.setDeliveredCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDeliv").equals("") && !POHeaderDataAsJsonObj.getString("stillToDeliv").equals("NA")) {
                extPoCreationDraftEntity.setStillToDeliv(POHeaderDataAsJsonObj.getString("stillToDeliv"));
            } else {
                extPoCreationDraftEntity.setStillToDeliv(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDelivUnit").equals("") && !POHeaderDataAsJsonObj.getString("stillToDelivUnit").equals("NA")) {
                extPoCreationDraftEntity.setStillToDelivUnit(POHeaderDataAsJsonObj.getString("stillToDelivUnit"));
            } else {
                extPoCreationDraftEntity.setStillToDelivUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDelivTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("stillToDelivTotalPrice").equals("NA")) {
                extPoCreationDraftEntity.setStillToDelivTotalPrice(POHeaderDataAsJsonObj.getString("stillToDelivTotalPrice"));
            } else {
                extPoCreationDraftEntity.setStillToDelivTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("stillToDelivCurrency").equals("") && !POHeaderDataAsJsonObj.getString("stillToDelivCurrency").equals("NA")) {
                extPoCreationDraftEntity.setStillToDelivCurrency(POHeaderDataAsJsonObj.getString("stillToDelivCurrency"));
            } else {
                extPoCreationDraftEntity.setStillToDelivCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoiced").equals("") && !POHeaderDataAsJsonObj.getString("invoiced").equals("NA")) {
                extPoCreationDraftEntity.setInvoiced(POHeaderDataAsJsonObj.getString("invoiced"));
            } else {
                extPoCreationDraftEntity.setInvoiced(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoicedUnit").equals("") && !POHeaderDataAsJsonObj.getString("invoicedUnit").equals("NA")) {
                extPoCreationDraftEntity.setInvoicedUnit(POHeaderDataAsJsonObj.getString("invoicedUnit"));
            } else {
                extPoCreationDraftEntity.setInvoicedUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoicedTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("invoicedTotalPrice").equals("NA")) {
                extPoCreationDraftEntity.setInvoicedTotalPrice(POHeaderDataAsJsonObj.getString("invoicedTotalPrice"));
            } else {
                extPoCreationDraftEntity.setInvoicedTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("invoicedCurrency").equals("") && !POHeaderDataAsJsonObj.getString("invoicedCurrency").equals("NA")) {
                extPoCreationDraftEntity.setInvoicedCurrency(POHeaderDataAsJsonObj.getString("invoicedCurrency"));
            } else {
                extPoCreationDraftEntity.setInvoicedCurrency(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpayments").equals("") && !POHeaderDataAsJsonObj.getString("downpayments").equals("NA")) {
                extPoCreationDraftEntity.setOrdered(POHeaderDataAsJsonObj.getString("downpayments"));
            } else {
                extPoCreationDraftEntity.setOrdered(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpaymentsUnit").equals("") && !POHeaderDataAsJsonObj.getString("downpaymentsUnit").equals("NA")) {
                extPoCreationDraftEntity.setOrderedUnit(POHeaderDataAsJsonObj.getString("downpaymentsUnit"));
            } else {
                extPoCreationDraftEntity.setOrderedUnit(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpaymentsTotalPrice").equals("") && !POHeaderDataAsJsonObj.getString("downpaymentsTotalPrice").equals("NA")) {
                extPoCreationDraftEntity.setOrderedTotalPrice(POHeaderDataAsJsonObj.getString("downpaymentsTotalPrice"));
            } else {
                extPoCreationDraftEntity.setOrderedTotalPrice(null);
            }
            if (!POHeaderDataAsJsonObj.getString("downpaymentsCurrency").equals("") && !POHeaderDataAsJsonObj.getString("downpaymentsCurrency").equals("NA")) {
                extPoCreationDraftEntity.setOrderedCurrency(POHeaderDataAsJsonObj.getString("downpaymentsCurrency"));
            } else {
                extPoCreationDraftEntity.setOrderedCurrency(null);
            }

            extPoCreationDraftEntity.setHeaderConditionsNew(POHeaderDataAsJsonObj.getString("headerConditionsNew"));
            extPoCreationDraftEntity.setKalsm(POHeaderDataAsJsonObj.getString("kalsm"));
            
            extId = purchaseOrderWSUtil.saveExtPoCreationDraft(extPoCreationDraftEntity);
            extPoCreationDraftRef = purchaseOrderWSUtil.getExtPoCreationDraftById(Integer.parseInt(extId));
            Long rowCount = purchaseOrderWSUtil.findDraftPoRowCount();
            System.out.println("rowCount: " + rowCount);

            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yy");
            String currDate = formatter.format(today);
            System.out.println("current date :" + currDate);

            if (prType.equals("Material")) {
                tempPoNumber = "TEMP-GPO-" + currDate + "-" + String.format("%06d", rowCount);
            } else {
                tempPoNumber = "TEMP-SPO-" + currDate + "-" + String.format("%06d", rowCount);
            }
            System.out.println("tempPoNumber: " + tempPoNumber);

            extPoCreationDraftRef.setTempPoNumber(tempPoNumber);
            purchaseOrderWSUtil.updateExtPoCreationDraft(extPoCreationDraftRef);
        }
        jsonObj.put("extId", extId);
        jsonObj.put("tempPoNumber", tempPoNumber);

        // Save Delivery/Invoice Tab Data Starts
        List<CmplxPoCreationDeliveryInvoiceDraft> cmplxPoCreationDeliveryInvoiceDraftList = purchaseOrderWSUtil.findCmplxPoCreationDeliveryInvoiceDraftByExtId(Integer.parseInt(extId));
        if (!cmplxPoCreationDeliveryInvoiceDraftList.isEmpty()) {
            purchaseOrderWSUtil.deleteAllCmplxPoCreationDeliveryInvoiceDraft(cmplxPoCreationDeliveryInvoiceDraftList);
        }
        JSONObject POHeaderDeliveryInvoiceJsonData = POHeaderDataAsJsonObj.getJSONObject("POHeaderDeliveryInvoiceJsonData");

        cmplxPoCreationDeliveryInvoiceDraftEntity.setPaymentTerms(POHeaderDeliveryInvoiceJsonData.getString("paymentTermsDelivery"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setCurrency(POHeaderDeliveryInvoiceJsonData.getString("CurrencyDeliveryInvoice"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setPaymentinpercnt1(POHeaderDeliveryInvoiceJsonData.getString("paymentinpercnt1"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setPaymentinpercnt2(POHeaderDeliveryInvoiceJsonData.getString("paymentinpercnt2"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setPaymentindays1(POHeaderDeliveryInvoiceJsonData.getString("paymentindays1"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setPaymentindays2(POHeaderDeliveryInvoiceJsonData.getString("paymentindays2"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setExchangeRate(new BigDecimal(POHeaderDeliveryInvoiceJsonData.getString("ExchangeRate")));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setPaymentindaysnet(POHeaderDeliveryInvoiceJsonData.getString("paymentInDaysNet"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setIncoterms1(POHeaderDeliveryInvoiceJsonData.getString("incoterms1"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setIncoterms2(POHeaderDeliveryInvoiceJsonData.getString("incoterms2"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setGRMessage(POHeaderDeliveryInvoiceJsonData.getString("gRMessage"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setExchangeRateFixed(POHeaderDeliveryInvoiceJsonData.getString("exchangeRateFixed"));
        cmplxPoCreationDeliveryInvoiceDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);

        purchaseOrderWSUtil.saveCmplxPoCreationDeliveryInvoiceDraft(cmplxPoCreationDeliveryInvoiceDraftEntity);
        // Save Delivery/Invoice Tab Data Ends

        // Save Vendor Address Tab Strats
        List<CmplxPoCreationVendorAddressDraft> cmplxPoCreationVendorAddressDraftList = purchaseOrderWSUtil.findCmplxPoCreationVendorAddressDraftByExtId(Integer.parseInt(extId));
        if (!cmplxPoCreationVendorAddressDraftList.isEmpty()) {
            purchaseOrderWSUtil.deleteAllCmplxPoCreationVendorAddressDraft(cmplxPoCreationVendorAddressDraftList);
        }
        JSONObject POHeaderVendorAddressJsonData = POHeaderDataAsJsonObj.getJSONObject("POHeaderVendorAddressJsonData");

        cmplxPoCreationVendorAddressDraftEntity.setStreet(POHeaderVendorAddressJsonData.getString("streetVendorAddress"));
        cmplxPoCreationVendorAddressDraftEntity.setHouseNumber(POHeaderVendorAddressJsonData.getString("houseNumberVendorAddress"));
        cmplxPoCreationVendorAddressDraftEntity.setPostalCode(POHeaderVendorAddressJsonData.getString("postalCodeVendorAddress"));
        cmplxPoCreationVendorAddressDraftEntity.setCity(POHeaderVendorAddressJsonData.getString("cityVendorAddress"));
        cmplxPoCreationVendorAddressDraftEntity.setTelExt(POHeaderVendorAddressJsonData.getString("extTel"));
        cmplxPoCreationVendorAddressDraftEntity.setTelNo(POHeaderVendorAddressJsonData.getString("telephoneVendorAddress"));
        cmplxPoCreationVendorAddressDraftEntity.setFaxExt(POHeaderVendorAddressJsonData.getString("extFax"));
        cmplxPoCreationVendorAddressDraftEntity.setFaxNo(POHeaderVendorAddressJsonData.getString("faxVendorAddress"));
        cmplxPoCreationVendorAddressDraftEntity.setCountry(POHeaderVendorAddressJsonData.getString("countryVendorAddress"));
        cmplxPoCreationVendorAddressDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);

        purchaseOrderWSUtil.saveCmplxPoCreationVendorAddressDraft(cmplxPoCreationVendorAddressDraftEntity);
        // Save Vendor Address Tab End

        // Save Communication Tab Data Strats
        List<CmplxPoCreationCommunicationDraft> cmplxPoCreationCommunicationDraftList = purchaseOrderWSUtil.findCmplxPoCreationCommunicationDraftByExtId(Integer.parseInt(extId));
        if (!cmplxPoCreationCommunicationDraftList.isEmpty()) {
            purchaseOrderWSUtil.deleteAllCmplxPoCreationCommunicationDraft(cmplxPoCreationCommunicationDraftList);
        }
        JSONObject POHeaderCommunicationJsonData = POHeaderDataAsJsonObj.getJSONObject("POHeaderCommunicationJsonData");

        cmplxPoCreationCommunicationDraftEntity.setSalesPerson(POHeaderCommunicationJsonData.getString("Salesperson"));
        cmplxPoCreationCommunicationDraftEntity.setYourReference(POHeaderCommunicationJsonData.getString("YourReference"));
        cmplxPoCreationCommunicationDraftEntity.setTelephone(POHeaderCommunicationJsonData.getString("Telephone"));
        cmplxPoCreationCommunicationDraftEntity.setOurReference(POHeaderCommunicationJsonData.getString("OurReference"));
        cmplxPoCreationCommunicationDraftEntity.setLang(POHeaderCommunicationJsonData.getString("Language"));
        cmplxPoCreationCommunicationDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);

        purchaseOrderWSUtil.saveCmplxPoCreationCommunicationDraft(cmplxPoCreationCommunicationDraftEntity);
        // Save Communication Tab Data Ends

        // Save Header Text Tab Data Starts
        List<CmplxPoCreationHeaderTextDraft> cmplxPoCreationHeaderTextDraftList = purchaseOrderWSUtil.findCmplxPoCreationHeaderTextDraftByExtId(Integer.parseInt(extId));
        if (!cmplxPoCreationHeaderTextDraftList.isEmpty()) {
            purchaseOrderWSUtil.deleteAllCmplxPoCreationHeaderTextDraft(cmplxPoCreationHeaderTextDraftList);
        }
        JSONObject POHeaderHeaderTextJsonData = POHeaderDataAsJsonObj.getJSONObject("POHeaderHeaderTextJsonData");

        cmplxPoCreationHeaderTextDraftEntity.setPoNoteToApprover(POHeaderHeaderTextJsonData.getString("pONotetoApproverHeaderTextsLimits"));
        cmplxPoCreationHeaderTextDraftEntity.setHeaderNote(POHeaderHeaderTextJsonData.getString("HeaderNote"));
        cmplxPoCreationHeaderTextDraftEntity.setPricingTypes(POHeaderHeaderTextJsonData.getString("PricingTypes"));
        cmplxPoCreationHeaderTextDraftEntity.setDeadlines(POHeaderHeaderTextJsonData.getString("Deadlines"));
        cmplxPoCreationHeaderTextDraftEntity.setTermsOfDelivery(POHeaderHeaderTextJsonData.getString("TermsofDelivery"));
        cmplxPoCreationHeaderTextDraftEntity.setTermsOfPayment(POHeaderHeaderTextJsonData.getString("TermsofPayment"));
        cmplxPoCreationHeaderTextDraftEntity.setShippingInstructions(POHeaderHeaderTextJsonData.getString("ShippingInstructions"));
        cmplxPoCreationHeaderTextDraftEntity.setVendorMemoGeneral(POHeaderHeaderTextJsonData.getString("VendorMemoGeneral"));
        cmplxPoCreationHeaderTextDraftEntity.setVendorMemoSpecial(POHeaderHeaderTextJsonData.getString("VendorMemoSpecial"));
        cmplxPoCreationHeaderTextDraftEntity.setHeaderText(POHeaderHeaderTextJsonData.getString("HeaderText"));
        cmplxPoCreationHeaderTextDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);

        purchaseOrderWSUtil.saveCmplxPoCreationHeaderTextDraft(cmplxPoCreationHeaderTextDraftEntity);
        // Save Header Text Tab Data Ends

        // Save Condition Tab Data Starts
        List<CmplxPoCreationConditionsDraft> cmplxPoCreationConditionsDraftList = purchaseOrderWSUtil.findCmplxPoCreationConditionsDraftByExt(Integer.parseInt(extId));
        if (!cmplxPoCreationConditionsDraftList.isEmpty()) {
            purchaseOrderWSUtil.deleteAllCmplxPoCreationConditionsDraft(cmplxPoCreationConditionsDraftList);
        }
        JSONArray POHeaderConditionJsonDataAsJsonArray = POHeaderDataAsJsonObj.getJSONArray("POHeaderConditionJsonData");
        System.out.println("POHeaderConditionJsonDataAsJsonArray size: " + POHeaderConditionJsonDataAsJsonArray.length());

        for (int i = 0; i < POHeaderConditionJsonDataAsJsonArray.length(); i++) {
            cmplxPoCreationConditionsDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);
            cmplxPoCreationConditionsDraftEntity.setCondType(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("conType"));
            cmplxPoCreationConditionsDraftEntity.setCondName(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("name"));
            if (!"".equals(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("amount"))) {
                cmplxPoCreationConditionsDraftEntity.setAmount(new BigDecimal(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("amount")));
            } else {
                cmplxPoCreationConditionsDraftEntity.setAmount(new BigDecimal(0.0));
            }
            if (!"".equals(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("perQuant"))) {
                cmplxPoCreationConditionsDraftEntity.setPerQuantity(new BigDecimal(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("perQuant")));
            } else {
                cmplxPoCreationConditionsDraftEntity.setPerQuantity(new BigDecimal(0.0));
            }

            cmplxPoCreationConditionsDraftEntity.setCondPricUnit(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("conPrUnit"));
            cmplxPoCreationConditionsDraftEntity.setCurrency(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("curr1"));
            cmplxPoCreationConditionsDraftEntity.setUoM(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("uOM"));
            if (!"".equals(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("conVal1"))) {
                cmplxPoCreationConditionsDraftEntity.setCondVal(new BigDecimal(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("conVal1")));
            } else {
                cmplxPoCreationConditionsDraftEntity.setCondVal(new BigDecimal(0.0));
            }
            cmplxPoCreationConditionsDraftEntity.setCurrency1(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("curr2"));
            if (!"".equals(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("conVal2"))) {
                cmplxPoCreationConditionsDraftEntity.setCondVal1(new BigDecimal(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("conVal2")));
            } else {
                cmplxPoCreationConditionsDraftEntity.setCondVal1(new BigDecimal(0.0));
            }
            cmplxPoCreationConditionsDraftEntity.setCondCrncy(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("conCurr"));
            cmplxPoCreationConditionsDraftEntity.setStNumber(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("stNumber"));
            cmplxPoCreationConditionsDraftEntity.setConditionCount(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("condCount"));
            cmplxPoCreationConditionsDraftEntity.setKappl(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("KAPPL"));
            cmplxPoCreationConditionsDraftEntity.setKvsl1(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("KVSL1"));
            cmplxPoCreationConditionsDraftEntity.setKvsl2(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("KVSL2"));
            cmplxPoCreationConditionsDraftEntity.setChangeId(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("condChangeId"));
            cmplxPoCreationConditionsDraftEntity.setVendorName(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("vendorName"));
            cmplxPoCreationConditionsDraftEntity.setVendorCode(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("vendorCode"));
            cmplxPoCreationConditionsDraftEntity.setCondPriceDate(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("condPriceDate"));
            cmplxPoCreationConditionsDraftEntity.setCondCurncyExchangeRate(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("condCurrExchangeRate"));
            cmplxPoCreationConditionsDraftEntity.setPoCurrencyExchangeRate(POHeaderConditionJsonDataAsJsonArray.getJSONObject(i).getString("poCurrExchangeRate"));

            purchaseOrderWSUtil.saveCmplxPoCreationConditionsDraft(cmplxPoCreationConditionsDraftEntity);
        }
        // Save Condition Tab Data Ends

        // Save Approval Details Tab Data Starts
        List<CmplxPOCreationApproverDetailsDraft> cmplxPOCreationApproverDetailsDraftList = purchaseOrderWSUtil.findCmplxPOCreationApproverDetailsDraftByExtId(Integer.parseInt(extId));
        if (!cmplxPOCreationApproverDetailsDraftList.isEmpty()) {
            purchaseOrderWSUtil.deleteAllCmplxPOCreationApproverDetailsDraft(cmplxPOCreationApproverDetailsDraftList);
        }
        JSONArray POHeaderApprovalDetailsJsonDataArray = POHeaderDataAsJsonObj.getJSONArray("POHeaderApprovalDetailsJsonData");
        System.out.println("POHeaderApprovalDetailsJsonDataArray size: " + POHeaderApprovalDetailsJsonDataArray.length());

        for (int i = 0; i < POHeaderApprovalDetailsJsonDataArray.length(); i++) {
            cmplxPOCreationApproverDetailsDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);
            cmplxPOCreationApproverDetailsDraftEntity.setApproverLevel(POHeaderApprovalDetailsJsonDataArray.getJSONObject(i).getString("level"));
            cmplxPOCreationApproverDetailsDraftEntity.setApproverName(POHeaderApprovalDetailsJsonDataArray.getJSONObject(i).getString("name"));

            purchaseOrderWSUtil.saveCmplxPOCreationApproverDetailsDraft(cmplxPOCreationApproverDetailsDraftEntity);
        }
        // Save Approval Details Tab Data Ends

        // Customer Data Starts
        String poType = POHeaderDataAsJsonObj.getString("typeOfPOHeader");
        System.out.println("poType: " + poType);
        if (poType.equals("Non-Ferrous PO - Imp") || poType.equals("Ferrous Joint Pur") || poType.equals("Ferrous PO - Import")
                || poType.equals("Ferrous PO - Local") || poType.equals("Non-Ferrous PO - Loc")) {

            List<CmplxPoCreationCustomerDataDraft> cmplxPoCreationCustomerDataDraftList = purchaseOrderWSUtil.findCmplxPoCreationCustomerDataDraftByExtId(Integer.parseInt(extId));
            if (!cmplxPoCreationCustomerDataDraftList.isEmpty()) {
                purchaseOrderWSUtil.deleteAllCmplxPoCreationCustomerDataDraft(cmplxPoCreationCustomerDataDraftList);
            }
            JSONObject POHeaderCustomerDataJsonData = POHeaderDataAsJsonObj.getJSONObject("POHeaderCustomerDataJsonData");

            cmplxPoCreationCustomerDataDraftEntity.setPaymentImmediate(POHeaderCustomerDataJsonData.getString("PaymentImmediate"));
            cmplxPoCreationCustomerDataDraftEntity.setExternalWeight(POHeaderCustomerDataJsonData.getString("ExternalWeight"));
            cmplxPoCreationCustomerDataDraftEntity.setPriceDisplay(POHeaderCustomerDataJsonData.getString("PriceDisplay"));
            cmplxPoCreationCustomerDataDraftEntity.setInstructionsToWeighter(POHeaderCustomerDataJsonData.getString("InstructionToWeigher"));
            cmplxPoCreationCustomerDataDraftEntity.setZoneCollectionScrap(POHeaderCustomerDataJsonData.getString("ZoneCollectionScrap"));
            cmplxPoCreationCustomerDataDraftEntity.setProductOrigin(POHeaderCustomerDataJsonData.getString("ProductOrigin"));
            cmplxPoCreationCustomerDataDraftEntity.setSegment(POHeaderCustomerDataJsonData.getString("SegmentDescription"));
            cmplxPoCreationCustomerDataDraftEntity.setConfControl(POHeaderCustomerDataJsonData.getString("ConfControl"));
            cmplxPoCreationCustomerDataDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);

            purchaseOrderWSUtil.saveCmplxPoCreationCustomerDataDraft(cmplxPoCreationCustomerDataDraftEntity);
        }
        // Customer Data Ends

        // PR Line Item Starts
        List<CmplxPoCreationLineItemPoDraft> cmplxPoCreationLineItemPoDraftList = purchaseOrderWSUtil.findCmplxPoCreationLineItemPoDraftByExtId(Integer.parseInt(extId));
        if (!cmplxPoCreationLineItemPoDraftList.isEmpty()) {
            purchaseOrderWSUtil.deleteAllCmplxPoCreationLineItemPoDraft(cmplxPoCreationLineItemPoDraftList);
        }
        JSONArray POLineItemDataAsJsonArray = POHeaderDataAsJsonObj.getJSONArray("POLineItemJsonData");
        System.out.println("POLineItemDataAsJsonArray size: " + POLineItemDataAsJsonArray.length());
        for (int i = 0; i < POLineItemDataAsJsonArray.length(); i++) {
            JSONObject prLineJsonObj = POLineItemDataAsJsonArray.getJSONObject(i);

            cmplxPoCreationLineItemPoDraftEntity.setLinkId(prLineJsonObj.getString("linkId"));
            cmplxPoCreationLineItemPoDraftEntity.setPrInsertionOrderId(prLineJsonObj.getString("insertionOrderId"));
            cmplxPoCreationLineItemPoDraftEntity.setExtPoCreationDraft(extPoCreationDraftRef);
            if (prLineJsonObj.getString("untiPrice").trim().equals("")) {
                cmplxPoCreationLineItemPoDraftEntity.setUnitPrice(BigDecimal.ZERO);
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setUnitPrice(new BigDecimal(prLineJsonObj.getString("untiPrice").trim()));
            }
            if (!prLineJsonObj.getString("accountAssignment").equals("") && !prLineJsonObj.getString("accountAssignment").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setAccountAssignment(prLineJsonObj.getString("accountAssignment"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setAccountAssignment(null);
            }
            if (!prLineJsonObj.getString("itemCategory").equals("") && !prLineJsonObj.getString("itemCategory").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setItemCategory(prLineJsonObj.getString("itemCategory"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setItemCategory(null);
            }
            if (!prLineJsonObj.getString("materialCode").equals("") && !prLineJsonObj.getString("materialCode").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setMaterialCode(prLineJsonObj.getString("materialCode"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setMaterialCode(null);
            }
            if (!prLineJsonObj.getString("shortText").equals("") && !prLineJsonObj.getString("shortText").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setShortText(prLineJsonObj.getString("shortText"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setShortText(null);
            }
            if (!prLineJsonObj.getString("quantity").equals("") && !prLineJsonObj.getString("quantity").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setQuantity(new BigDecimal(prLineJsonObj.getString("quantity")));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setQuantity(null);
            }
            if (!prLineJsonObj.getString("uom").equals("") && !prLineJsonObj.getString("uom").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setUnit(prLineJsonObj.getString("uom"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setUnit(null);
            }
            if (!prLineJsonObj.getString("orderPriceUnit").equals("") && !prLineJsonObj.getString("orderPriceUnit").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setOrderPriceUnit(prLineJsonObj.getString("orderPriceUnit"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setOrderPriceUnit(null);
            }
            if (!prLineJsonObj.getString("criticality").equals("") && !prLineJsonObj.getString("criticality").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setCriticality(prLineJsonObj.getString("criticality"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setCriticality(null);
            }
            if (!prLineJsonObj.getString("deliveryDate").equals("") && !prLineJsonObj.getString("deliveryDate").equals("NA")) {
                System.out.println("prLineJsonObj.getString('deliveryDate'): " + prLineJsonObj.getString("deliveryDate"));
                cmplxPoCreationLineItemPoDraftEntity.setDeliveryDate(prLineJsonObj.getString("deliveryDate"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setDeliveryDate(null);
            }
            if (!prLineJsonObj.getString("currency").equals("") && !prLineJsonObj.getString("currency").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setCurrency(prLineJsonObj.getString("currency"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setCurrency(null);
            }
            if (!prLineJsonObj.getString("perUnit").equals("") && !prLineJsonObj.getString("perUnit").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPriceUnit(prLineJsonObj.getString("perUnit"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPriceUnit(null);
            }
            if (!prLineJsonObj.getString("materialGroup").equals("") && !prLineJsonObj.getString("materialGroup").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setMaterialGroup(prLineJsonObj.getString("materialGroup"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setMaterialGroup(null);
            }
            if (!prLineJsonObj.getString("plantCode").equals("") && !prLineJsonObj.getString("plantCode").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPlant(prLineJsonObj.getString("plantCode"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPlant(null);
            }
            if (!prLineJsonObj.getString("storageLocation").equals("") && !prLineJsonObj.getString("storageLocation").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setStorageLocation(prLineJsonObj.getString("storageLocation"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setStorageLocation(null);
            }
            if (!prLineJsonObj.getString("batch").equals("") && !prLineJsonObj.getString("batch").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setBatch(prLineJsonObj.getString("batch"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setBatch(null);
            }
            if (!prLineJsonObj.getString("trackingNumber").equals("") && !prLineJsonObj.getString("trackingNumber").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setTrackingNumber(prLineJsonObj.getString("trackingNumber"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setTrackingNumber(null);
            }
            if (!prLineJsonObj.getString("infoRecord").equals("") && !prLineJsonObj.getString("infoRecord").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setInfoRecord(prLineJsonObj.getString("infoRecord"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setInfoRecord(null);
            }
            if (!prLineJsonObj.getString("purchaseOrganization").equals("") && !prLineJsonObj.getString("purchaseOrganization").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPurchasingOrganization(prLineJsonObj.getString("purchaseOrganization"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPurchasingOrganization(null);
            }
            if (!prLineJsonObj.getString("purchasingGroup").equals("") && !prLineJsonObj.getString("purchasingGroup").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPurchasingGroup(prLineJsonObj.getString("purchasingGroup"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPurchasingGroup(null);
            }
            if (!prLineJsonObj.getString("requisitionerId").equals("") && !prLineJsonObj.getString("requisitionerId").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setRequisitionerID(prLineJsonObj.getString("requisitionerId"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setRequisitionerID(null);
            }
            if (!prLineJsonObj.getString("higherLevelItem").equals("") && !prLineJsonObj.getString("higherLevelItem").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setHigherLevelItem(prLineJsonObj.getString("higherLevelItem"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setHigherLevelItem(null);
            }
            if (!prLineJsonObj.getString("subItemCategory").equals("") && !prLineJsonObj.getString("subItemCategory").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setSubitemCategory(prLineJsonObj.getString("subItemCategory"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setSubitemCategory(null);
            }
            if (!prLineJsonObj.getString("pid").equals("") && !prLineJsonObj.getString("pid").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setProcInstId(prLineJsonObj.getString("pid"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setProcInstId(null);
            }
            if (!prLineJsonObj.getString("prType").equals("") && !prLineJsonObj.getString("prType").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPurchaseRequestType(prLineJsonObj.getString("prType"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPurchaseRequestType(null);
            }
            if (!prLineJsonObj.getString("poPartialInvoiceIndicator").equals("") && !prLineJsonObj.getString("poPartialInvoiceIndicator").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPartialInvoiceIndicator(prLineJsonObj.getString("poPartialInvoiceIndicator"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPartialInvoiceIndicator(null);
            }
            if (!prLineJsonObj.getString("valuationPrice").equals("") && !prLineJsonObj.getString("valuationPrice").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setValuationPrice(new BigDecimal(prLineJsonObj.getString("valuationPrice")));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setValuationPrice(null);
            }
            if (!prLineJsonObj.getString("noLimit").equals("") && !prLineJsonObj.getString("noLimit").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setNoLimit(prLineJsonObj.getString("noLimit"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setNoLimit(null);
            }
            if (!prLineJsonObj.getString("overAllLimit").equals("") && !prLineJsonObj.getString("overAllLimit").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setOverallLimit(new BigDecimal(prLineJsonObj.getString("overAllLimit")));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setOverallLimit(null);
            }
            if (!prLineJsonObj.getString("expectedValue").equals("") && !prLineJsonObj.getString("expectedValue").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setExpectedValue(new BigDecimal(prLineJsonObj.getString("expectedValue")));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setExpectedValue(null);
            }
            if (!prLineJsonObj.getString("invoiceReceipt").equals("") && !prLineJsonObj.getString("invoiceReceipt").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setInvReceipt(prLineJsonObj.getString("invoiceReceipt"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setInvReceipt(null);
            }
            if (!prLineJsonObj.getString("goodsReceipt").equals("") && !prLineJsonObj.getString("goodsReceipt").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setGoodsReceipt(prLineJsonObj.getString("goodsReceipt"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setGoodsReceipt(null);
            }
            if (!prLineJsonObj.getString("prDeliveryDateCategory").equals("") && !prLineJsonObj.getString("prDeliveryDateCategory").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setDeliveryDateCategory(prLineJsonObj.getString("prDeliveryDateCategory"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setDeliveryDateCategory(null);
            }
            if (!prLineJsonObj.getString("prRequisitionDate").equals("") && !prLineJsonObj.getString("prRequisitionDate").equals("NA")) {
                try {
                    DateFormat df = new SimpleDateFormat("dd.MM.yyyy");
                    Date delvDate = df.parse(prLineJsonObj.getString("prRequisitionDate"));
                    cmplxPoCreationLineItemPoDraftEntity.setRequisitionDate(delvDate);
                } catch (ParseException ex) {
                    Logger.getLogger(SavePoLineLevelTab.class.getName()).log(Level.SEVERE, null, ex);
                }
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setRequisitionDate(null);
            }
            if (!prLineJsonObj.getString("prMaterialLongTextHidden").equals("") && !prLineJsonObj.getString("prMaterialLongTextHidden").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setMaterialLongText(prLineJsonObj.getString("prMaterialLongTextHidden"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setMaterialLongText(null);
            }
            if (!prLineJsonObj.getString("orderPriceUnit").equals("") && !prLineJsonObj.getString("orderPriceUnit").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setOrderPriceUnit(prLineJsonObj.getString("orderPriceUnit"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setOrderPriceUnit(null);
            }
            if (!prLineJsonObj.getString("purchaseRequestNumber").equals("") && !prLineJsonObj.getString("purchaseRequestNumber").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPurchaseRequestNumber(prLineJsonObj.getString("purchaseRequestNumber"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPurchaseRequestNumber(null);
            }
            if (!prLineJsonObj.getString("prItemNumber").equals("") && !prLineJsonObj.getString("prItemNumber").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrItemNumber(prLineJsonObj.getString("prItemNumber"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrItemNumber(null);
            }
            if (!prLineJsonObj.getString("prCreator").equals("") && !prLineJsonObj.getString("prCreator").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrCreator(prLineJsonObj.getString("prCreator"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrCreator(null);
            }
            if (!prLineJsonObj.getString("prDeptName").equals("") && !prLineJsonObj.getString("prDeptName").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrDeptName(prLineJsonObj.getString("prDeptName"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrDeptName(null);
            }
            if (!prLineJsonObj.getString("prImMaterial").equals("") && !prLineJsonObj.getString("prImMaterial").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setImMaterial(prLineJsonObj.getString("prImMaterial"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setImMaterial(null);
            }
            if (!prLineJsonObj.getString("prReturnsItem").equals("") && !prLineJsonObj.getString("prReturnsItem").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setReturnsItem(prLineJsonObj.getString("prReturnsItem"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setReturnsItem(null);
            }
            if (!prLineJsonObj.getString("prFreeOfCharge").equals("") && !prLineJsonObj.getString("prFreeOfCharge").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setFreeOfCharge(prLineJsonObj.getString("prFreeOfCharge"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setFreeOfCharge(null);
            }
            if (!prLineJsonObj.getString("prMfrPartNumber").equals("") && !prLineJsonObj.getString("prMfrPartNumber").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setMfrPartNumber(prLineJsonObj.getString("prMfrPartNumber"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setMfrPartNumber(null);
            }
            if (!prLineJsonObj.getString("prManufacturer").equals("") && !prLineJsonObj.getString("prManufacturer").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setManufacturer(prLineJsonObj.getString("prManufacturer"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setManufacturer(null);
            }
            if (!prLineJsonObj.getString("itemNumber").equals("") && !prLineJsonObj.getString("itemNumber").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setItemNumber(prLineJsonObj.getString("itemNumber"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setItemNumber(null);
            }
            if (!prLineJsonObj.getString("coCode").equals("") && !prLineJsonObj.getString("coCode").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setCompanyCode(prLineJsonObj.getString("coCode"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setCompanyCode(null);
            }
            if (!prLineJsonObj.getString("poDistribution").equals("") && !prLineJsonObj.getString("poDistribution").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPoDistribution(prLineJsonObj.getString("poDistribution"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPoDistribution(null);
            }
            if (!prLineJsonObj.getString("prTaxAmount").equals("") && !prLineJsonObj.getString("prTaxAmount").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrTaxAmount(prLineJsonObj.getString("prTaxAmount"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrTaxAmount(null);
            }
            if (!prLineJsonObj.getString("prComments").equals("") && !prLineJsonObj.getString("prComments").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrComments(prLineJsonObj.getString("prComments"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrComments(null);
            }
            if (!prLineJsonObj.getString("confirmationControlForLineInPr").equals("") && !prLineJsonObj.getString("confirmationControlForLineInPr").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setConfirmationControlForLineInPr(prLineJsonObj.getString("confirmationControlForLineInPr"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setConfirmationControlForLineInPr(null);
            }
            if (!prLineJsonObj.getString("texCodeForLineInPr").equals("") && !prLineJsonObj.getString("texCodeForLineInPr").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setTexCodeForLineInPr(prLineJsonObj.getString("texCodeForLineInPr"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setTexCodeForLineInPr(null);
            }
            if (!prLineJsonObj.getString("segmentForLineInPr").equals("") && !prLineJsonObj.getString("segmentForLineInPr").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setSegmentForLineInPr(prLineJsonObj.getString("segmentForLineInPr"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setSegmentForLineInPr(null);
            }
            if (!prLineJsonObj.getString("prPackageNo").equals("") && !prLineJsonObj.getString("prPackageNo").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrPackageNo(prLineJsonObj.getString("prPackageNo"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrPackageNo(null);
            }
            if (!prLineJsonObj.getString("serviceRefLineNo").equals("") && !prLineJsonObj.getString("serviceRefLineNo").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setServiceRefLineNo(prLineJsonObj.getString("serviceRefLineNo"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setServiceRefLineNo(null);
            }
            if (!prLineJsonObj.getString("lineType").equals("") && !prLineJsonObj.getString("lineType").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setLineType(prLineJsonObj.getString("lineType"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setLineType(null);
            }
            if (!prLineJsonObj.getString("isPoLineOrPrLineOrRfqLineOrEmptyLine").equals("") && !prLineJsonObj.getString("isPoLineOrPrLineOrRfqLineOrEmptyLine").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setIsPoLineOrPrLineOrRfqLineOrEmptyLine(prLineJsonObj.getString("isPoLineOrPrLineOrRfqLineOrEmptyLine"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setIsPoLineOrPrLineOrRfqLineOrEmptyLine(null);
            }
            if (!prLineJsonObj.getString("prRfqNumber").equals("") && !prLineJsonObj.getString("prRfqNumber").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrRfqNumber(prLineJsonObj.getString("prRfqNumber"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrRfqNumber(null);
            }
            if (!prLineJsonObj.getString("prRfqLineItemNumber").equals("") && !prLineJsonObj.getString("prRfqLineItemNumber").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrRfqLineItemNumber(prLineJsonObj.getString("prRfqLineItemNumber"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrRfqLineItemNumber(null);
            }
            if (!prLineJsonObj.getString("quantityBeforeChange").equals("") && !prLineJsonObj.getString("quantityBeforeChange").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setQuantityBeforeChange(prLineJsonObj.getString("quantityBeforeChange"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setQuantityBeforeChange(null);
            }
            if (!prLineJsonObj.getString("isPrSaved").equals("") && !prLineJsonObj.getString("isPrSaved").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setIsPrSaved(prLineJsonObj.getString("isPrSaved"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setIsPrSaved(null);
            }
            if (!prLineJsonObj.getString("poLineItemPackageNo").equals("") && !prLineJsonObj.getString("poLineItemPackageNo").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPoLineItemPackageNo(prLineJsonObj.getString("poLineItemPackageNo"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPoLineItemPackageNo(null);
            }
            if (!prLineJsonObj.getString("poLineItemTaxCode").equals("") && !prLineJsonObj.getString("poLineItemTaxCode").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPoLineItemTaxCode(prLineJsonObj.getString("poLineItemTaxCode"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPoLineItemTaxCode(null);
            }
            if (!prLineJsonObj.getString("totalQuantityOfThisLine").equals("") && !prLineJsonObj.getString("totalQuantityOfThisLine").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setTotalQuantityOfThisLine(prLineJsonObj.getString("totalQuantityOfThisLine"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setTotalQuantityOfThisLine(null);
            }
            if (!prLineJsonObj.getString("parentPrLineInsertionOrderId").equals("") && !prLineJsonObj.getString("parentPrLineInsertionOrderId").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setParentPrLineInsertionOrderId(prLineJsonObj.getString("parentPrLineInsertionOrderId"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setParentPrLineInsertionOrderId(null);
            }
            if (!prLineJsonObj.getString("prGLCode").equals("") && !prLineJsonObj.getString("prGLCode").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrGLCode(prLineJsonObj.getString("prGLCode"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrGLCode(null);
            }
            if (!prLineJsonObj.getString("prZGLCode").equals("") && !prLineJsonObj.getString("prZGLCode").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrZGLCode(prLineJsonObj.getString("prZGLCode"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrZGLCode(null);
            }
            if (!prLineJsonObj.getString("rfqIdRfqLineIdInsertionOrderIdString").equals("") && !prLineJsonObj.getString("rfqIdRfqLineIdInsertionOrderIdString").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setRfqIdRfqLineIdInsertionOrderIdString(prLineJsonObj.getString("rfqIdRfqLineIdInsertionOrderIdString"));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setRfqIdRfqLineIdInsertionOrderIdString(null);
            }
            System.out.println("netPriceHidden bittu:" + prLineJsonObj.getString("netPriceHidden"));
            if (!prLineJsonObj.getString("netPriceHidden").equals("") && !prLineJsonObj.getString("netPriceHidden").equals("NA")) {
                cmplxPoCreationLineItemPoDraftEntity.setPrNetPrice(new BigDecimal(prLineJsonObj.getString("netPriceHidden")));
            } else {
                cmplxPoCreationLineItemPoDraftEntity.setPrNetPrice(new BigDecimal(0.0));
            }

            purchaseOrderWSUtil.saveCmplxPoCreationLineItemPoDraft(cmplxPoCreationLineItemPoDraftEntity);
        }
        // PR Line Item Ends

        return jsonObj;
    }

    public ProfitabilitySegment setProfitabilitySegmentFields(ProfitabilitySegment profitabilitySegment, String[] prSegmentArr) {
        profitabilitySegment.setCharacterstic(prSegmentArr[0]);
        profitabilitySegment.setCustomerCode(prSegmentArr[1]);
        profitabilitySegment.setProduct(prSegmentArr[2]);
        profitabilitySegment.setBillingType(prSegmentArr[3]);
        profitabilitySegment.setSalesOrder(prSegmentArr[4]);
        profitabilitySegment.setItemNumber(prSegmentArr[5]);
        profitabilitySegment.setSgOrder(prSegmentArr[6]);
        profitabilitySegment.setCompanyCode(prSegmentArr[7]);
        profitabilitySegment.setPlant(prSegmentArr[8]);
        profitabilitySegment.setBusinessArea(prSegmentArr[9]);
        profitabilitySegment.setSalesOrg(prSegmentArr[10]);
        profitabilitySegment.setDistrChannel(prSegmentArr[11]);
        profitabilitySegment.setDivision(prSegmentArr[12]);
        profitabilitySegment.setWBSElement(prSegmentArr[13]);
        profitabilitySegment.setCostObject(prSegmentArr[14]);
        profitabilitySegment.setProfitCenter(prSegmentArr[15]);
        profitabilitySegment.setPartnerPC(prSegmentArr[16]);
        profitabilitySegment.setCountry(prSegmentArr[17]);
        profitabilitySegment.setSalesOffice(prSegmentArr[18]);
        profitabilitySegment.setSalesEmployee(prSegmentArr[19]);
        profitabilitySegment.setMatlGroup(prSegmentArr[20]);
        profitabilitySegment.setProdHierarchy(prSegmentArr[21]);
        profitabilitySegment.setItemCategory(prSegmentArr[22]);
        profitabilitySegment.setHigherLevItem(prSegmentArr[23]);
        profitabilitySegment.setIndustry(prSegmentArr[24]);
        profitabilitySegment.setCustomerGroup(prSegmentArr[25]);
        profitabilitySegment.setProdHierLev1(prSegmentArr[26]);
        profitabilitySegment.setProdHierLev2(prSegmentArr[27]);
        profitabilitySegment.setProdHierLev3(prSegmentArr[28]);
        profitabilitySegment.setMaterialType(prSegmentArr[29]);
        profitabilitySegment.setReferenceDoc(prSegmentArr[30]);
        profitabilitySegment.setProjectNumber1(prSegmentArr[31]);
        profitabilitySegment.setProjectIndecator(prSegmentArr[32]);
        profitabilitySegment.setValuationType(prSegmentArr[33]);
        profitabilitySegment.setCustomerClass(prSegmentArr[34]);
        profitabilitySegment.setMaterialSourceInd(prSegmentArr[35]);
        profitabilitySegment.setContractType(prSegmentArr[36]);
        profitabilitySegment.setShipToParty(prSegmentArr[37]);
        profitabilitySegment.setIndustryCode1(prSegmentArr[38]);
        profitabilitySegment.setIndustryField001(prSegmentArr[39]);
        profitabilitySegment.setIndustryCode2(prSegmentArr[40]);
        profitabilitySegment.setIndustryCode3(prSegmentArr[41]);
        profitabilitySegment.setSalesDocType(prSegmentArr[42]);
        profitabilitySegment.setReferenceItem(prSegmentArr[43]);
        profitabilitySegment.setLineItemNumber(prSegmentArr[44]);
        profitabilitySegment.setServiceLineItemNumber(prSegmentArr[45]);
        profitabilitySegment.setPrItemNumber(prSegmentArr[46]);
        profitabilitySegment.setLinkId(prSegmentArr[47]);

        return profitabilitySegment;
    }

    public NGBPCmplxPOCreationLineItemProfitabilitySegment setProfitabilitySegmentFieldsSA(
            NGBPCmplxPOCreationLineItemProfitabilitySegment nGBPCmplxPOCreationLineItemProfitabilitySegment, 
            String[] prSegmentArr) 
    {
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setCharacterstic(prSegmentArr[0]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setCustomerCode(prSegmentArr[1]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProduct(prSegmentArr[2]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setBillingType(prSegmentArr[3]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setSalesOrder(prSegmentArr[4]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setItemNumber(prSegmentArr[5]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setSgOrder(prSegmentArr[6]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setCompanyCode(prSegmentArr[7]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setPlant(prSegmentArr[8]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setBusinessArea(prSegmentArr[9]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setSalesOrg(prSegmentArr[10]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setDistrChannel(prSegmentArr[11]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setDivision(prSegmentArr[12]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setWBSElement(prSegmentArr[13]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setCostObject(prSegmentArr[14]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProfitCenter(prSegmentArr[15]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setPartnerPC(prSegmentArr[16]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setCountry(prSegmentArr[17]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setSalesOffice(prSegmentArr[18]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setSalesEmployee(prSegmentArr[19]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setMatlGroup(prSegmentArr[20]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProdHierarchy(prSegmentArr[21]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setItemCategory(prSegmentArr[22]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setHigherLevItem(prSegmentArr[23]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setIndustry(prSegmentArr[24]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setCustomerGroup(prSegmentArr[25]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProdHierLev1(prSegmentArr[26]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProdHierLev2(prSegmentArr[27]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProdHierLev3(prSegmentArr[28]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setMaterialType(prSegmentArr[29]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setReferenceDoc(prSegmentArr[30]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProjectNumber1(prSegmentArr[31]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setProjectIndecator(prSegmentArr[32]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setValuationType(prSegmentArr[33]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setCustomerClass(prSegmentArr[34]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setMaterialSourceInd(prSegmentArr[35]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setContractType(prSegmentArr[36]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setShipToParty(prSegmentArr[37]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setIndustryCode1(prSegmentArr[38]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setIndustryField001(prSegmentArr[39]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setIndustryCode2(prSegmentArr[40]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setIndustryCode3(prSegmentArr[41]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setSalesDocType(prSegmentArr[42]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setReferenceItem(prSegmentArr[43]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setLineItemNumber(prSegmentArr[44]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setServiceLineItemNumber(prSegmentArr[45]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setPrItemNumber(prSegmentArr[46]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setLinkId(prSegmentArr[47]);
        nGBPCmplxPOCreationLineItemProfitabilitySegment.setPoId(prSegmentArr[48]);
        
        return nGBPCmplxPOCreationLineItemProfitabilitySegment;
    }
}
