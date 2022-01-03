/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_po_header_details")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "POHeaderDetails.findAll", query = "SELECT p FROM POHeaderDetails p"),
    @NamedQuery(name = "POHeaderDetails.findById", query = "SELECT p FROM POHeaderDetails p WHERE p.id = :id"),
    @NamedQuery(name = "POHeaderDetails.findByTransactionInitiatedOn", query = "SELECT p FROM POHeaderDetails p WHERE p.transactionInitiatedOn = :transactionInitiatedOn"),
    @NamedQuery(name = "POHeaderDetails.findByCreatorID", query = "SELECT p FROM POHeaderDetails p WHERE p.creatorID = :creatorID"),
    @NamedQuery(name = "POHeaderDetails.findByCreatorEmail", query = "SELECT p FROM POHeaderDetails p WHERE p.creatorEmail = :creatorEmail"),
    @NamedQuery(name = "POHeaderDetails.findByCompanyCode", query = "SELECT p FROM POHeaderDetails p WHERE p.companyCode = :companyCode"),
    @NamedQuery(name = "POHeaderDetails.findByRequestType", query = "SELECT p FROM POHeaderDetails p WHERE p.requestType = :requestType"),
    @NamedQuery(name = "POHeaderDetails.findByPurchaseOrderNumber", query = "SELECT p FROM POHeaderDetails p WHERE p.purchaseOrderNumber = :purchaseOrderNumber"),
    @NamedQuery(name = "POHeaderDetails.findByPurchaseOrderType", query = "SELECT p FROM POHeaderDetails p WHERE p.purchaseOrderType = :purchaseOrderType"),
    @NamedQuery(name = "POHeaderDetails.findByReferenceDocumentType", query = "SELECT p FROM POHeaderDetails p WHERE p.referenceDocumentType = :referenceDocumentType"),
    @NamedQuery(name = "POHeaderDetails.findByReferenceDocumentNumber", query = "SELECT p FROM POHeaderDetails p WHERE p.referenceDocumentNumber = :referenceDocumentNumber"),
    @NamedQuery(name = "POHeaderDetails.findByReferenceDocumentLine", query = "SELECT p FROM POHeaderDetails p WHERE p.referenceDocumentLine = :referenceDocumentLine")})
public class POHeaderDetails implements Serializable {
    @Size(max = 20)
    @Column(name = "PONumber")
    private String pONumber;
    @Size(max = 8)
    @Column(name = "IncoTermsPart1_Delivery")
    private String incoTermsPart1Delivery;
    @Size(max = 30)
    @Column(name = "IncoTermsPart2_Delivery")
    private String incoTermsPart2Delivery;
    @Size(max = 20)
    @Column(name = "POQuantity")
    private String pOQuantity;
    @Size(max = 8)
    @Column(name = "POQuantityUnit")
    private String pOQuantityUnit;
    @Size(max = 8)
    @Column(name = "POQuantityInSKUUnit")
    private String pOQuantityInSKUUnit;
    @Size(max = 20)
    @Column(name = "POQuantityInSKU")
    private String pOQuantityInSKU;
    @Size(max = 65)
    @Column(name = "Street_VendorAddress")
    private String streetVendorAddress;
    @Size(max = 15)
    @Column(name = "HouseNumber_VendorAddress")
    private String houseNumberVendorAddress;
    @Size(max = 15)
    @Column(name = "Ext_Tel")
    private String extTel;
    @Size(max = 35)
    @Column(name = "Telephone_VendorAddress")
    private String telephoneVendorAddress;
    @Size(max = 15)
    @Column(name = "Ext_Fax")
    private String extFax;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Invalid phone/fax format, should be as xxx-xxx-xxxx")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Size(max = 35)
    @Column(name = "Fax")
    private String fax;
    @Size(max = 15)
    @Column(name = "PostalCode_VendorAddress")
    private String postalCodeVendorAddress;
    @Size(max = 15)
    @Column(name = "City_VendorAddress")
    private String cityVendorAddress;
    @Size(max = 15)
    @Column(name = "Amount_Conditions")
    private String amountConditions;
    @Size(max = 15)
    @Column(name = "Currency1_Conditions")
    private String currency1Conditions;
    @Size(max = 15)
    @Column(name = "PricingUnit_Conditions")
    private String pricingUnitConditions;
    @Size(max = 15)
    @Column(name = "UoM_ConditionValues_Conditions")
    private String uoMConditionValuesConditions;
    @Size(max = 20)
    @Column(name = "ConditionValue_Conditions")
    private String conditionValueConditions;
    @Size(max = 20)
    @Column(name = "Currency2_Conditions")
    private String currency2Conditions;
    @Size(max = 20)
    @Column(name = "ConditionBaseValue_Conditions")
    private String conditionBaseValueConditions;
    @Size(max = 20)
    @Column(name = "ConditionBaseRate_Conditions")
    private String conditionBaseRateConditions;
    @Size(max = 15)
    @Column(name = "VendorName_Conditions")
    private String vendorNameConditions;
    @Size(max = 55)
    @Column(name = "VendorCode_Conditions")
    private String vendorCodeConditions;
    @Size(max = 35)
    @Column(name = "IncoTermsPart1_Downpayment")
    private String incoTermsPart1Downpayment;
    @Size(max = 35)
    @Column(name = "IncoTermsPart2_Downpayment")
    private String incoTermsPart2Downpayment;
    @Size(max = 30)
    @Column(name = "Approver1")
    private String approver1;
    @Size(max = 30)
    @Column(name = "Approver2")
    private String approver2;
    @Size(max = 30)
    @Column(name = "Approver3")
    private String approver3;
    @Size(max = 30)
    @Column(name = "Approver4")
    private String approver4;
    @Size(max = 30)
    @Column(name = "Approver5")
    private String approver5;
    @Size(max = 30)
    @Column(name = "Approver6")
    private String approver6;
    @Size(max = 30)
    @Column(name = "Approver7")
    private String approver7;
    @Size(max = 3)
    @Column(name = "PrintPrice")
    private String printPrice;
    @Size(max = 3)
    @Column(name = "EstimatedPrice")
    private String estimatedPrice;
    @Size(max = 8)
    @Column(name = "ConfControl_Limits")
    private String confControlLimits;
    @Size(max = 25)
    @Column(name = "OrderAck")
    private String orderAck;
    @Size(max = 3)
    @Column(name = "ConfirmationRequired")
    private String confirmationRequired;
    @Size(max = 3)
    @Column(name = "RejectionInd")
    private String rejectionInd;
    @Size(max = 5000)
    @Column(name = "PONotetoApprover_HeaderTexts_Limits")
    private String pONotetoApproverHeaderTextsLimits;
    @Size(max = 5000)
    @Column(name = "HeaderNote")
    private String headerNote;
    @Size(max = 5000)
    @Column(name = "PricingTypes")
    private String pricingTypes;
    @Size(max = 5000)
    @Column(name = "Deadlines")
    private String deadlines;
    @Size(max = 5000)
    @Column(name = "TermsofDelivery")
    private String termsofDelivery;
    @Size(max = 5000)
    @Column(name = "TermsofPayment")
    private String termsofPayment;
    @Size(max = 5000)
    @Column(name = "ShippingInstructions")
    private String shippingInstructions;
    @Size(max = 5000)
    @Column(name = "VendorMemoGeneral")
    private String vendorMemoGeneral;
    @Size(max = 5000)
    @Column(name = "VendorMemoSpecial")
    private String vendorMemoSpecial;
    @Size(max = 35)
    @Column(name = "Title")
    private String title;
    @Size(max = 45)
    @Column(name = "Name1")
    private String name1;
    @Size(max = 45)
    @Column(name = "Name2")
    private String name2;
    @Size(max = 65)
    @Column(name = "Street")
    private String street;
    @Size(max = 15)
    @Column(name = "HouseNumber")
    private String houseNumber;
    @Size(max = 15)
    @Column(name = "PostalCode")
    private String postalCode;
    @Size(max = 45)
    @Column(name = "City")
    private String city;
    @Size(max = 10)
    @Column(name = "Country_Limits")
    private String countryLimits;
    @Size(max = 20)
    @Column(name = "Description")
    private String description;
    @Size(max = 5000)
    @Column(name = "ItemText")
    private String itemText;
    @Size(max = 5000)
    @Column(name = "InfoRecordPOText")
    private String infoRecordPOText;
    @Size(max = 5000)
    @Column(name = "MaterialPOText")
    private String materialPOText;
    @Size(max = 5000)
    @Column(name = "PONoteToApprover")
    private String pONoteToApprover;
    @Size(max = 5000)
    @Column(name = "DeliveryText")
    private String deliveryText;
    @Size(max = 5)
    @Column(name = "AccountKey_Limits")
    private String accountKeyLimits;
    @Size(max = 5)
    @Column(name = "Accruals_AccountDetermination_Limits")
    private String accrualsAccountDeterminationLimits;
    @Size(max = 60)
    @Column(name = "ConditionClass_Limits")
    private String conditionClassLimits;
    @Size(max = 30)
    @Column(name = "CalculateType_Limits")
    private String calculateTypeLimits;
    @Size(max = 30)
    @Column(name = "ConditionCategory_Limits")
    private String conditionCategoryLimits;
    @Size(max = 30)
    @Column(name = "ConditionControl_Limits")
    private String conditionControlLimits;
    @Size(max = 30)
    @Column(name = "ConditionOrigin_Limits")
    private String conditionOriginLimits;
    @Size(max = 3)
    @Column(name = "Statistical_Limits")
    private String statisticalLimits;
    @Size(max = 3)
    @Column(name = "Accruals_Limits")
    private String accrualsLimits;
    @Size(max = 3)
    @Column(name = "ChangedManually_Limits")
    private String changedManuallyLimits;
    @Column(name = "ConditionPricingDate_Limit")
    @Temporal(TemporalType.TIMESTAMP)
    private Date conditionPricingDateLimit;
    @Size(max = 15)
    @Column(name = "Amount_Limits")
    private String amountLimits;
    @Size(max = 15)
    @Column(name = "Currency1_Limits")
    private String currency1Limits;
    @Size(max = 15)
    @Column(name = "PricingUnit_Limits")
    private String pricingUnitLimits;
    @Size(max = 15)
    @Column(name = "UoM_Limits")
    private String uoMLimits;
    @Size(max = 20)
    @Column(name = "ConditionBaseValue_Limits")
    private String conditionBaseValueLimits;
    @Size(max = 8)
    @Column(name = "Rate_Limits")
    private String rateLimits;
    @Size(max = 20)
    @Column(name = "ConditionValue_Limits")
    private String conditionValueLimits;
    @Size(max = 20)
    @Column(name = "Currency2_Limits")
    private String currency2Limits;
    @Size(max = 30)
    @Column(name = "ConditionTypeName_ConditionsDetails_Limits")
    private String conditionTypeNameConditionsDetailsLimits;
    @Size(max = 8)
    @Column(name = "Application_ConditionsDetails_Limits")
    private String applicationConditionsDetailsLimits;
    @Size(max = 15)
    @Column(name = "VendorName_ConditionsDetails_Limits")
    private String vendorNameConditionsDetailsLimits;
    @Size(max = 55)
    @Column(name = "VendorCode_ConditionsDetails_Limits")
    private String vendorCodeConditionsDetailsLimits;
    @Size(max = 8)
    @Column(name = "ConditionType_Conditions_Limits")
    private String conditionTypeConditionsLimits;
    @Size(max = 25)
    @Column(name = "Name_Conditions_Conditions_Limits")
    private String nameConditionsConditionsLimits;
    @Size(max = 15)
    @Column(name = "Amount_Conditions_Limits")
    private String amountConditionsLimits;
    @Size(max = 8)
    @Column(name = "ConditionPricingUnit_Conditions_Limits")
    private String conditionPricingUnitConditionsLimits;
    @Size(max = 8)
    @Column(name = "Currency1_Conditions_Limits")
    private String currency1ConditionsLimits;
    @Size(max = 8)
    @Column(name = "UoM_Conditions_Conditions_Limits")
    private String uoMConditionsConditionsLimits;
    @Size(max = 20)
    @Column(name = "ConditionValue1_Conditions_Limits")
    private String conditionValue1ConditionsLimits;
    @Size(max = 8)
    @Column(name = "Currency2_Conditions_Limits")
    private String currency2ConditionsLimits;
    @Size(max = 20)
    @Column(name = "ConditionValue2_Conditions_Limits")
    private String conditionValue2ConditionsLimits;
    @Size(max = 8)
    @Column(name = "ConditionCurrency_Conditions_Limits")
    private String conditionCurrencyConditionsLimits;
    @Size(max = 20)
    @Column(name = "OverallLimit")
    private String overallLimit;
    @Size(max = 20)
    @Column(name = "ExpectedValue")
    private String expectedValue;
    @Size(max = 3)
    @Column(name = "NoLimit")
    private String noLimit;
    @Size(max = 60)
    @Column(name = "Characteristic")
    private String characteristic;
    @Size(max = 15)
    @Column(name = "CustomerCode")
    private String customerCode;
    @Size(max = 25)
    @Column(name = "Product")
    private String product;
    @Size(max = 8)
    @Column(name = "BillingType")
    private String billingType;
    @Size(max = 20)
    @Column(name = "SalesOrder_ProfitabilitySegment")
    private String salesOrderProfitabilitySegment;
    @Size(max = 10)
    @Column(name = "ItemNumber_ProfitabilitySegment")
    private String itemNumberProfitabilitySegment;
    @Size(max = 8)
    @Column(name = "CompanyCode_ProfitabilitySegment")
    private String companyCodeProfitabilitySegment;
    @Size(max = 8)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 8)
    @Column(name = "BusinessArea")
    private String businessArea;
    @Size(max = 8)
    @Column(name = "SalesOrganization")
    private String salesOrganization;
    @Size(max = 5)
    @Column(name = "DistrChannel")
    private String distrChannel;
    @Size(max = 5)
    @Column(name = "Division")
    private String division;
    @Size(max = 5)
    @Column(name = "WBSElement")
    private String wBSElement;
    @Size(max = 15)
    @Column(name = "CostObject")
    private String costObject;
    @Size(max = 10)
    @Column(name = "ProfitCentre")
    private String profitCentre;
    @Size(max = 10)
    @Column(name = "PartnerPC")
    private String partnerPC;
    @Size(max = 8)
    @Column(name = "Country_ProfitabilitySegment")
    private String countryProfitabilitySegment;
    @Size(max = 8)
    @Column(name = "SalesOffice")
    private String salesOffice;
    @Size(max = 8)
    @Column(name = "SalesEmployee")
    private String salesEmployee;
    @Size(max = 25)
    @Column(name = "MatlGroup")
    private String matlGroup;
    @Size(max = 25)
    @Column(name = "Prodhierarchy")
    private String prodhierarchy;
    @Size(max = 8)
    @Column(name = "ItemCategory")
    private String itemCategory;
    @Size(max = 10)
    @Column(name = "HigherLevItem")
    private String higherLevItem;
    @Size(max = 8)
    @Column(name = "Industry")
    private String industry;
    @Size(max = 8)
    @Column(name = "CustomerGroup")
    private String customerGroup;
    @Size(max = 25)
    @Column(name = "ProductHierLevel1")
    private String productHierLevel1;
    @Size(max = 25)
    @Column(name = "ProductHierLevel2")
    private String productHierLevel2;
    @Size(max = 25)
    @Column(name = "ProductHierLevel3")
    private String productHierLevel3;
    @Size(max = 25)
    @Column(name = "MaterialType")
    private String materialType;
    @Size(max = 15)
    @Column(name = "ReferenceDoc")
    private String referenceDoc;
    @Size(max = 15)
    @Column(name = "PROJECTNUMBER1")
    private String projectnumber1;
    @Size(max = 8)
    @Column(name = "ProjectIndicator")
    private String projectIndicator;
    @Size(max = 15)
    @Column(name = "ValuationType_ProfitabilitySegment")
    private String valuationTypeProfitabilitySegment;
    @Size(max = 8)
    @Column(name = "CustomerClass")
    private String customerClass;
    @Size(max = 8)
    @Column(name = "MaterialSourceInd")
    private String materialSourceInd;
    @Size(max = 15)
    @Column(name = "ContractType")
    private String contractType;
    @Size(max = 15)
    @Column(name = "ShipToParty")
    private String shipToParty;
    @Size(max = 15)
    @Column(name = "IndustryCode1")
    private String industryCode1;
    @Size(max = 15)
    @Column(name = "IndustryField001")
    private String industryField001;
    @Size(max = 15)
    @Column(name = "IndustryCode2")
    private String industryCode2;
    @Size(max = 15)
    @Column(name = "IndustryCode3")
    private String industryCode3;
    @Size(max = 8)
    @Column(name = "SalesDocType")
    private String salesDocType;
    @Size(max = 8)
    @Column(name = "ReferenceItem")
    private String referenceItem;
    @Size(max = 15)
    @Column(name = "Order_ProfitabilitySegment")
    private String orderProfitabilitySegment;
    @Size(max = 15)
    @Column(name = "GLCode")
    private String gLCode;
    @Size(max = 15)
    @Column(name = "CostCentre")
    private String costCentre;
    @Size(max = 8)
    @Column(name = "CommitmentItem")
    private String commitmentItem;
    @Size(max = 8)
    @Column(name = "COArea")
    private String cOArea;
    @Size(max = 15)
    @Column(name = "Fund")
    private String fund;
    @Size(max = 25)
    @Column(name = "FundCenter")
    private String fundCenter;
    @Size(max = 20)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 10)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 10)
    @Column(name = "DeliverySchedule")
    private String deliverySchedule;
    @Size(max = 20)
    @Column(name = "FunctionalArea")
    private String functionalArea;
    @Size(max = 3)
    @Column(name = "InvoiceReceipt")
    private String invoiceReceipt;
    @Size(max = 3)
    @Column(name = "FinalInvoice")
    private String finalInvoice;
    @Size(max = 3)
    @Column(name = "GRBasedIV")
    private String gRBasedIV;
    @Size(max = 8)
    @Column(name = "DPCategory")
    private String dPCategory;
    @Size(max = 60)
    @Column(name = "TaxCodeDescription")
    private String taxCodeDescription;
    @Size(max = 8)
    @Column(name = "OverdeliveryTolerance")
    private String overdeliveryTolerance;
    @Size(max = 8)
    @Column(name = "UnderdeliveryTolerance")
    private String underdeliveryTolerance;
    @Size(max = 8)
    @Column(name = "ShippingInstruction")
    private String shippingInstruction;
    @Size(max = 8)
    @Column(name = "StockType")
    private String stockType;
    @Size(max = 8)
    @Column(name = "FirstReminderExpediter")
    private String firstReminderExpediter;
    @Size(max = 8)
    @Column(name = "SecondReminderExpediter")
    private String secondReminderExpediter;
    @Size(max = 8)
    @Column(name = "ThirdReminderExpediter")
    private String thirdReminderExpediter;
    @Size(max = 20)
    @Column(name = "ValuationType")
    private String valuationType;
    @Size(max = 8)
    @Column(name = "RemShelfLife")
    private String remShelfLife;
    @Size(max = 12)
    @Column(name = "QAControlLife")
    private String qAControlLife;
    @Size(max = 12)
    @Column(name = "NoExpend")
    private String noExpend;
    @Size(max = 8)
    @Column(name = "PlDeliveryTime")
    private String plDeliveryTime;
    @Size(max = 8)
    @Column(name = "GRProcTime")
    private String gRProcTime;
    @Column(name = "LatestGRDate_Value")
    @Temporal(TemporalType.TIMESTAMP)
    private Date latestGRDateValue;
//    @Size(max = 40)
//    @Column(name = "IncoTermsPart1Part2_Delivery")
//    private String incoTermsPart1Part2Delivery;
    @Size(max = 3)
    @Column(name = "GoodsReceipt")
    private String goodsReceipt;
    @Size(max = 3)
    @Column(name = "GRNonValuated")
    private String gRNonValuated;
    @Size(max = 3)
    @Column(name = "DelivCompleted")
    private String delivCompleted;
    @Size(max = 8)
    @Column(name = "DeliveryDateCategory")
    private String deliveryDateCategory;
    @Column(name = "DeliveryDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveryDate;
    @Size(max = 20)
    @Column(name = "ScheduledQuantity")
    private String scheduledQuantity;
    @Size(max = 8)
    @Column(name = "Time")
    private String time;
    @Size(max = 15)
    @Column(name = "PurchaseRequestNumber")
    private String purchaseRequestNumber;
    @Size(max = 10)
    @Column(name = "RequestItemNumber")
    private String requestItemNumber;
//    @Size(max = 30)
//    @Column(name = "POQuantityUnit")
//    private String pOQuantityUnit;
//    @Size(max = 30)
//    @Column(name = "POQuantityInSKUUnit")
//    private String pOQuantityInSKUUnit;
    @Size(max = 20)
    @Column(name = "OrderUnitOrderPriceUnit")
    private String orderUnitOrderPriceUnit;
    @Size(max = 20)
    @Column(name = "OrderUnitSKU")
    private String orderUnitSKU;
    @Size(max = 100)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 3)
    @Column(name = "PaymentImmediate")
    private String paymentImmediate;
    @Size(max = 3)
    @Column(name = "ExternalWeight")
    private String externalWeight;
    @Size(max = 40)
    @Column(name = "InstructionToWeigher")
    private String instructionToWeigher;
    @Size(max = 8)
    @Column(name = "ZoneCollectionScrap")
    private String zoneCollectionScrap;
    @Size(max = 3)
    @Column(name = "PriceDisplay")
    private String priceDisplay;
    @Size(max = 20)
    @Column(name = "ProductOrigin")
    private String productOrigin;
    @Size(max = 40)
    @Column(name = "SegmentDescription")
    private String segmentDescription;
    @Size(max = 8)
    @Column(name = "ConfControl")
    private String confControl;
    @Size(max = 15)
    @Column(name = "CollectiveNumber")
    private String collectiveNumber;
    @Size(max = 25)
    @Column(name = "Name_Pertners")
    private String namePertners;
    @Size(max = 5)
    @Column(name = "PartnerFunction")
    private String partnerFunction;
//    @Size(max = 25)
//    @Column(name = "Number_Pertners")
//    private String numberPertners;
    @Size(max = 15)
    @Column(name = "Number")
    private String number;
    @Size(max = 40)
    @Column(name = "VendorName_Partners")
    private String vendorNamePartners;
    @Size(max = 35)
    @Column(name = "Salesperson")
    private String salesperson;
    @Size(max = 15)
    @Column(name = "YourReference")
    private String yourReference;
    @Size(max = 20)
    @Column(name = "Telephone")
    private String telephone;
    @Size(max = 15)
    @Column(name = "OurReference")
    private String ourReference;
    @Size(max = 10)
    @Column(name = "Language")
    private String language;
//    @Size(max = 90)
//    @Column(name = "StreetHouseNumber")
//    private String streetHouseNumber;
//    @Size(max = 60)
//    @Column(name = "PostalCodeCity")
//    private String postalCodeCity;
    @Size(max = 25)
    @Column(name = "Country")
    private String country;
//    @Size(max = 50)
//    @Column(name = "TelephoneExtension")
//    private String telephoneExtension;
//    @Size(max = 50)
//    @Column(name = "FaxExtension")
//    private String faxExtension;
    @Size(max = 5)
    @Column(name = "AccountKey")
    private String accountKey;
    @Size(max = 5)
    @Column(name = "Accruals_AccountDetermination")
    private String accrualsAccountDetermination;
    @Size(max = 70)
    @Column(name = "ConditionClass")
    private String conditionClass;
    @Size(max = 40)
    @Column(name = "CalculateType")
    private String calculateType;
    @Size(max = 40)
    @Column(name = "ConditionCategory")
    private String conditionCategory;
    @Size(max = 40)
    @Column(name = "ConditionControl")
    private String conditionControl;
    @Size(max = 40)
    @Column(name = "ConditionOrigin")
    private String conditionOrigin;
    @Size(max = 3)
    @Column(name = "Statistical")
    private String statistical;
    @Size(max = 3)
    @Column(name = "Accruals")
    private String accruals;
    @Size(max = 3)
    @Column(name = "ChangedManually")
    private String changedManually;
    @Column(name = "ConditionPricingDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date conditionPricingDate;
    @Size(max = 15)
    @Column(name = "AmountCurrencyPricingUnitUoM")
    private String amountCurrencyPricingUnitUoM;
    @Size(max = 20)
    @Column(name = "ConditionBaseValueRate")
    private String conditionBaseValueRate;
    @Size(max = 20)
    @Column(name = "ConditionValueCurrency")
    private String conditionValueCurrency;
    @Size(max = 30)
    @Column(name = "ConditionTypeName")
    private String conditionTypeName;
//    @Size(max = 70)
//    @Column(name = "VendorNameCode")
//    private String vendorNameCode;
    @Size(max = 5)
    @Column(name = "Application")
    private String application;
    @Size(max = 8)
    @Column(name = "UoM_Conditions")
    private String uoMConditions;
    @Size(max = 20)
    @Column(name = "ConditionValue1")
    private String conditionValue1;
    @Size(max = 8)
    @Column(name = "ConditionType")
    private String conditionType;
    @Size(max = 25)
    @Column(name = "Name_Conditions")
    private String nameConditions;
    @Size(max = 15)
    @Column(name = "Amount")
    private String amount;
    @Size(max = 8)
    @Column(name = "ConditionPricingUnit")
    private String conditionPricingUnit;
//    @Size(max = 5)
//    @Column(name = "UoM_Conditions")
//    private String uoMConditions;
//    @Size(max = 20)
//    @Column(name = "ConditionValue1")
//    private String conditionValue1;
    @Size(max = 8)
    @Column(name = "Currency1")
    private String currency1;
    @Size(max = 8)
    @Column(name = "Currency2")
    private String currency2;
    @Size(max = 20)
    @Column(name = "ConditionValue2")
    private String conditionValue2;
    @Size(max = 8)
    @Column(name = "ConditionCurrency")
    private String conditionCurrency;
    @Size(max = 8)
    @Column(name = "PaymentTerms")
    private String paymentTerms;
    @Size(max = 10)
    @Column(name = "PaymentInDays1")
    private String paymentInDays1;
    @Size(max = 10)
    @Column(name = "PaymentInDays2")
    private String paymentInDays2;
    @Size(max = 5)
    @Column(name = "PaymentInDays3")
    private String paymentInDays3;
    @Size(max = 20)
    @Column(name = "ExchangeRate")
    private String exchangeRate;
    @Size(max = 5)
    @Column(name = "ExchangeRateFixed")
    private String exchangeRateFixed;
//    @Size(max = 35)
//    @Column(name = "IncoTermsPart1Part2")
//    private String incoTermsPart1Part2;
    @Size(max = 5)
    @Column(name = "GRMessage")
    private String gRMessage;
    @Size(max = 8)
    @Column(name = "PurchasingOrganization")
    private String purchasingOrganization;
    @Size(max = 8)
    @Column(name = "PurchasingGroup")
    private String purchasingGroup;
    @Size(max = 8)
    @Column(name = "DownPaymentReqd")
    private String downPaymentReqd;
    @Size(max = 15)
    @Column(name = "Value_DownPayment")
    private String valueDownPayment;
    @Size(max = 60)
    @Column(name = "DownPaymentForVendor")
    private String downPaymentForVendor;
    @Size(max = 50)
    @Column(name = "VendorName")
    private String vendorName;
    @Size(max = 10)
    @Column(name = "VendorCode")
    private String vendorCode;
    @Column(name = "DocumentDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date documentDate;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Column(name = "TransactionInitiatedOn")
    @Temporal(TemporalType.TIMESTAMP)
    private Date transactionInitiatedOn;
    @Size(max = 80)
    @Column(name = "CreatorID")
    private String creatorID;
    @Size(max = 80)
    @Column(name = "CreatorEmail")
    private String creatorEmail;
    @Size(max = 10)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 30)
    @Column(name = "RequestType")
    private String requestType;
    @Size(max = 20)
    @Column(name = "PurchaseOrderNumber")
    private String purchaseOrderNumber;
    @Size(max = 10)
    @Column(name = "PurchaseOrderType")
    private String purchaseOrderType;
    @Size(max = 30)
    @Column(name = "ReferenceDocumentType")
    private String referenceDocumentType;
    @Size(max = 20)
    @Column(name = "ReferenceDocumentNumber")
    private String referenceDocumentNumber;
    @Size(max = 10)
    @Column(name = "ReferenceDocumentLine")
    private String referenceDocumentLine;

    public POHeaderDetails() {
    }

    public POHeaderDetails(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getTransactionInitiatedOn() {
        return transactionInitiatedOn;
    }

    public void setTransactionInitiatedOn(Date transactionInitiatedOn) {
        this.transactionInitiatedOn = transactionInitiatedOn;
    }

    public String getCreatorID() {
        return creatorID;
    }

    public void setCreatorID(String creatorID) {
        this.creatorID = creatorID;
    }

    public String getCreatorEmail() {
        return creatorEmail;
    }

    public void setCreatorEmail(String creatorEmail) {
        this.creatorEmail = creatorEmail;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getPurchaseOrderNumber() {
        return purchaseOrderNumber;
    }

    public void setPurchaseOrderNumber(String purchaseOrderNumber) {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }

    public String getPurchaseOrderType() {
        return purchaseOrderType;
    }

    public void setPurchaseOrderType(String purchaseOrderType) {
        this.purchaseOrderType = purchaseOrderType;
    }

    public String getReferenceDocumentType() {
        return referenceDocumentType;
    }

    public void setReferenceDocumentType(String referenceDocumentType) {
        this.referenceDocumentType = referenceDocumentType;
    }

    public String getReferenceDocumentNumber() {
        return referenceDocumentNumber;
    }

    public void setReferenceDocumentNumber(String referenceDocumentNumber) {
        this.referenceDocumentNumber = referenceDocumentNumber;
    }

    public String getReferenceDocumentLine() {
        return referenceDocumentLine;
    }

    public void setReferenceDocumentLine(String referenceDocumentLine) {
        this.referenceDocumentLine = referenceDocumentLine;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof POHeaderDetails)) {
            return false;
        }
        POHeaderDetails other = (POHeaderDetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.POHeaderDetails[ id=" + id + " ]";
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public Date getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(Date documentDate) {
        this.documentDate = documentDate;
    }

    public String getDownPaymentReqd() {
        return downPaymentReqd;
    }

    public void setDownPaymentReqd(String downPaymentReqd) {
        this.downPaymentReqd = downPaymentReqd;
    }

    public String getValueDownPayment() {
        return valueDownPayment;
    }

    public void setValueDownPayment(String valueDownPayment) {
        this.valueDownPayment = valueDownPayment;
    }

    public String getDownPaymentForVendor() {
        return downPaymentForVendor;
    }

    public void setDownPaymentForVendor(String downPaymentForVendor) {
        this.downPaymentForVendor = downPaymentForVendor;
    }

    public String getPurchasingOrganization() {
        return purchasingOrganization;
    }

    public void setPurchasingOrganization(String purchasingOrganization) {
        this.purchasingOrganization = purchasingOrganization;
    }

    public String getPurchasingGroup() {
        return purchasingGroup;
    }

    public void setPurchasingGroup(String purchasingGroup) {
        this.purchasingGroup = purchasingGroup;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public String getPaymentInDays1() {
        return paymentInDays1;
    }

    public void setPaymentInDays1(String paymentInDays1) {
        this.paymentInDays1 = paymentInDays1;
    }

    public String getPaymentInDays2() {
        return paymentInDays2;
    }

    public void setPaymentInDays2(String paymentInDays2) {
        this.paymentInDays2 = paymentInDays2;
    }

    public String getPaymentInDays3() {
        return paymentInDays3;
    }

    public void setPaymentInDays3(String paymentInDays3) {
        this.paymentInDays3 = paymentInDays3;
    }

    public String getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(String exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public String getExchangeRateFixed() {
        return exchangeRateFixed;
    }

    public void setExchangeRateFixed(String exchangeRateFixed) {
        this.exchangeRateFixed = exchangeRateFixed;
    }

//    public String getIncoTermsPart1Part2() {
//        return incoTermsPart1Part2;
//    }
//
//    public void setIncoTermsPart1Part2(String incoTermsPart1Part2) {
//        this.incoTermsPart1Part2 = incoTermsPart1Part2;
//    }

    public String getGRMessage() {
        return gRMessage;
    }

    public void setGRMessage(String gRMessage) {
        this.gRMessage = gRMessage;
    }

    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public String getNameConditions() {
        return nameConditions;
    }

    public void setNameConditions(String nameConditions) {
        this.nameConditions = nameConditions;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getConditionPricingUnit() {
        return conditionPricingUnit;
    }

    public void setConditionPricingUnit(String conditionPricingUnit) {
        this.conditionPricingUnit = conditionPricingUnit;
    }

//    public String getUoMConditions() {
//        return uoMConditions;
//    }
//
//    public void setUoMConditions(String uoMConditions) {
//        this.uoMConditions = uoMConditions;
//    }

    public String getCurrency1() {
        return currency1;
    }

    public void setCurrency1(String currency1) {
        this.currency1 = currency1;
    }

    public String getCurrency2() {
        return currency2;
    }

    public void setCurrency2(String currency2) {
        this.currency2 = currency2;
    }

    public String getConditionValue2() {
        return conditionValue2;
    }

    public void setConditionValue2(String conditionValue2) {
        this.conditionValue2 = conditionValue2;
    }

    public String getConditionCurrency() {
        return conditionCurrency;
    }

    public void setConditionCurrency(String conditionCurrency) {
        this.conditionCurrency = conditionCurrency;
    }

    public String getConditionValue1() {
        return conditionValue1;
    }

    public void setConditionValue1(String conditionValue1) {
        this.conditionValue1 = conditionValue1;
    }

    public String getUoMConditions() {
        return uoMConditions;
    }

    public void setUoMConditions(String uoMConditions) {
        this.uoMConditions = uoMConditions;
    }

    public String getConditionTypeName() {
        return conditionTypeName;
    }

    public void setConditionTypeName(String conditionTypeName) {
        this.conditionTypeName = conditionTypeName;
    }

//    public String getVendorNameCode() {
//        return vendorNameCode;
//    }
//
//    public void setVendorNameCode(String vendorNameCode) {
//        this.vendorNameCode = vendorNameCode;
//    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public Date getConditionPricingDate() {
        return conditionPricingDate;
    }

    public void setConditionPricingDate(Date conditionPricingDate) {
        this.conditionPricingDate = conditionPricingDate;
    }

    public String getAmountCurrencyPricingUnitUoM() {
        return amountCurrencyPricingUnitUoM;
    }

    public void setAmountCurrencyPricingUnitUoM(String amountCurrencyPricingUnitUoM) {
        this.amountCurrencyPricingUnitUoM = amountCurrencyPricingUnitUoM;
    }

    public String getConditionBaseValueRate() {
        return conditionBaseValueRate;
    }

    public void setConditionBaseValueRate(String conditionBaseValueRate) {
        this.conditionBaseValueRate = conditionBaseValueRate;
    }

    public String getConditionValueCurrency() {
        return conditionValueCurrency;
    }

    public void setConditionValueCurrency(String conditionValueCurrency) {
        this.conditionValueCurrency = conditionValueCurrency;
    }

    public String getConditionClass() {
        return conditionClass;
    }

    public void setConditionClass(String conditionClass) {
        this.conditionClass = conditionClass;
    }

    public String getCalculateType() {
        return calculateType;
    }

    public void setCalculateType(String calculateType) {
        this.calculateType = calculateType;
    }

    public String getConditionCategory() {
        return conditionCategory;
    }

    public void setConditionCategory(String conditionCategory) {
        this.conditionCategory = conditionCategory;
    }

    public String getConditionControl() {
        return conditionControl;
    }

    public void setConditionControl(String conditionControl) {
        this.conditionControl = conditionControl;
    }

    public String getConditionOrigin() {
        return conditionOrigin;
    }

    public void setConditionOrigin(String conditionOrigin) {
        this.conditionOrigin = conditionOrigin;
    }

    public String getStatistical() {
        return statistical;
    }

    public void setStatistical(String statistical) {
        this.statistical = statistical;
    }

    public String getAccruals() {
        return accruals;
    }

    public void setAccruals(String accruals) {
        this.accruals = accruals;
    }

    public String getChangedManually() {
        return changedManually;
    }

    public void setChangedManually(String changedManually) {
        this.changedManually = changedManually;
    }

    public String getAccountKey() {
        return accountKey;
    }

    public void setAccountKey(String accountKey) {
        this.accountKey = accountKey;
    }

    public String getAccrualsAccountDetermination() {
        return accrualsAccountDetermination;
    }

    public void setAccrualsAccountDetermination(String accrualsAccountDetermination) {
        this.accrualsAccountDetermination = accrualsAccountDetermination;
    }

//    public String getStreetHouseNumber() {
//        return streetHouseNumber;
//    }
//
//    public void setStreetHouseNumber(String streetHouseNumber) {
//        this.streetHouseNumber = streetHouseNumber;
//    }
//
//    public String getPostalCodeCity() {
//        return postalCodeCity;
//    }
//
//    public void setPostalCodeCity(String postalCodeCity) {
//        this.postalCodeCity = postalCodeCity;
//    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

//    public String getTelephoneExtension() {
//        return telephoneExtension;
//    }
//
//    public void setTelephoneExtension(String telephoneExtension) {
//        this.telephoneExtension = telephoneExtension;
//    }
//
//    public String getFaxExtension() {
//        return faxExtension;
//    }
//
//    public void setFaxExtension(String faxExtension) {
//        this.faxExtension = faxExtension;
//    }

    public String getSalesperson() {
        return salesperson;
    }

    public void setSalesperson(String salesperson) {
        this.salesperson = salesperson;
    }

    public String getYourReference() {
        return yourReference;
    }

    public void setYourReference(String yourReference) {
        this.yourReference = yourReference;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getOurReference() {
        return ourReference;
    }

    public void setOurReference(String ourReference) {
        this.ourReference = ourReference;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getPartnerFunction() {
        return partnerFunction;
    }

    public void setPartnerFunction(String partnerFunction) {
        this.partnerFunction = partnerFunction;
    }

//    public String getNumberPertners() {
//        return numberPertners;
//    }
//
//    public void setNumberPertners(String numberPertners) {
//        this.numberPertners = numberPertners;
//    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getVendorNamePartners() {
        return vendorNamePartners;
    }

    public void setVendorNamePartners(String vendorNamePartners) {
        this.vendorNamePartners = vendorNamePartners;
    }

    public String getNamePertners() {
        return namePertners;
    }

    public void setNamePertners(String namePertners) {
        this.namePertners = namePertners;
    }

    public String getCollectiveNumber() {
        return collectiveNumber;
    }

    public void setCollectiveNumber(String collectiveNumber) {
        this.collectiveNumber = collectiveNumber;
    }

    public String getPaymentImmediate() {
        return paymentImmediate;
    }

    public void setPaymentImmediate(String paymentImmediate) {
        this.paymentImmediate = paymentImmediate;
    }

    public String getExternalWeight() {
        return externalWeight;
    }

    public void setExternalWeight(String externalWeight) {
        this.externalWeight = externalWeight;
    }

    public String getInstructionToWeigher() {
        return instructionToWeigher;
    }

    public void setInstructionToWeigher(String instructionToWeigher) {
        this.instructionToWeigher = instructionToWeigher;
    }

    public String getZoneCollectionScrap() {
        return zoneCollectionScrap;
    }

    public void setZoneCollectionScrap(String zoneCollectionScrap) {
        this.zoneCollectionScrap = zoneCollectionScrap;
    }

    public String getPriceDisplay() {
        return priceDisplay;
    }

    public void setPriceDisplay(String priceDisplay) {
        this.priceDisplay = priceDisplay;
    }

    public String getProductOrigin() {
        return productOrigin;
    }

    public void setProductOrigin(String productOrigin) {
        this.productOrigin = productOrigin;
    }

    public String getSegmentDescription() {
        return segmentDescription;
    }

    public void setSegmentDescription(String segmentDescription) {
        this.segmentDescription = segmentDescription;
    }

    public String getConfControl() {
        return confControl;
    }

    public void setConfControl(String confControl) {
        this.confControl = confControl;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

//    public String getPOQuantityUnit() {
//        return pOQuantityUnit;
//    }
//
//    public void setPOQuantityUnit(String pOQuantityUnit) {
//        this.pOQuantityUnit = pOQuantityUnit;
//    }
//
//    public String getPOQuantityInSKUUnit() {
//        return pOQuantityInSKUUnit;
//    }
//
//    public void setPOQuantityInSKUUnit(String pOQuantityInSKUUnit) {
//        this.pOQuantityInSKUUnit = pOQuantityInSKUUnit;
//    }

    public String getOrderUnitOrderPriceUnit() {
        return orderUnitOrderPriceUnit;
    }

    public void setOrderUnitOrderPriceUnit(String orderUnitOrderPriceUnit) {
        this.orderUnitOrderPriceUnit = orderUnitOrderPriceUnit;
    }

    public String getOrderUnitSKU() {
        return orderUnitSKU;
    }

    public void setOrderUnitSKU(String orderUnitSKU) {
        this.orderUnitSKU = orderUnitSKU;
    }

    public String getDeliveryDateCategory() {
        return deliveryDateCategory;
    }

    public void setDeliveryDateCategory(String deliveryDateCategory) {
        this.deliveryDateCategory = deliveryDateCategory;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getScheduledQuantity() {
        return scheduledQuantity;
    }

    public void setScheduledQuantity(String scheduledQuantity) {
        this.scheduledQuantity = scheduledQuantity;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPurchaseRequestNumber() {
        return purchaseRequestNumber;
    }

    public void setPurchaseRequestNumber(String purchaseRequestNumber) {
        this.purchaseRequestNumber = purchaseRequestNumber;
    }

    public String getRequestItemNumber() {
        return requestItemNumber;
    }

    public void setRequestItemNumber(String requestItemNumber) {
        this.requestItemNumber = requestItemNumber;
    }

    public String getOverdeliveryTolerance() {
        return overdeliveryTolerance;
    }

    public void setOverdeliveryTolerance(String overdeliveryTolerance) {
        this.overdeliveryTolerance = overdeliveryTolerance;
    }

    public String getUnderdeliveryTolerance() {
        return underdeliveryTolerance;
    }

    public void setUnderdeliveryTolerance(String underdeliveryTolerance) {
        this.underdeliveryTolerance = underdeliveryTolerance;
    }

    public String getShippingInstruction() {
        return shippingInstruction;
    }

    public void setShippingInstruction(String shippingInstruction) {
        this.shippingInstruction = shippingInstruction;
    }

    public String getStockType() {
        return stockType;
    }

    public void setStockType(String stockType) {
        this.stockType = stockType;
    }

    public String getFirstReminderExpediter() {
        return firstReminderExpediter;
    }

    public void setFirstReminderExpediter(String firstReminderExpediter) {
        this.firstReminderExpediter = firstReminderExpediter;
    }

    public String getSecondReminderExpediter() {
        return secondReminderExpediter;
    }

    public void setSecondReminderExpediter(String secondReminderExpediter) {
        this.secondReminderExpediter = secondReminderExpediter;
    }

    public String getThirdReminderExpediter() {
        return thirdReminderExpediter;
    }

    public void setThirdReminderExpediter(String thirdReminderExpediter) {
        this.thirdReminderExpediter = thirdReminderExpediter;
    }

    public String getValuationType() {
        return valuationType;
    }

    public void setValuationType(String valuationType) {
        this.valuationType = valuationType;
    }

    public String getRemShelfLife() {
        return remShelfLife;
    }

    public void setRemShelfLife(String remShelfLife) {
        this.remShelfLife = remShelfLife;
    }

    public String getQAControlLife() {
        return qAControlLife;
    }

    public void setQAControlLife(String qAControlLife) {
        this.qAControlLife = qAControlLife;
    }

    public String getNoExpend() {
        return noExpend;
    }

    public void setNoExpend(String noExpend) {
        this.noExpend = noExpend;
    }

    public String getPlDeliveryTime() {
        return plDeliveryTime;
    }

    public void setPlDeliveryTime(String plDeliveryTime) {
        this.plDeliveryTime = plDeliveryTime;
    }

    public String getGRProcTime() {
        return gRProcTime;
    }

    public void setGRProcTime(String gRProcTime) {
        this.gRProcTime = gRProcTime;
    }

    public Date getLatestGRDateValue() {
        return latestGRDateValue;
    }

    public void setLatestGRDateValue(Date latestGRDateValue) {
        this.latestGRDateValue = latestGRDateValue;
    }

//    public String getIncoTermsPart1Part2Delivery() {
//        return incoTermsPart1Part2Delivery;
//    }
//
//    public void setIncoTermsPart1Part2Delivery(String incoTermsPart1Part2Delivery) {
//        this.incoTermsPart1Part2Delivery = incoTermsPart1Part2Delivery;
//    }

    public String getGoodsReceipt() {
        return goodsReceipt;
    }

    public void setGoodsReceipt(String goodsReceipt) {
        this.goodsReceipt = goodsReceipt;
    }

    public String getGRNonValuated() {
        return gRNonValuated;
    }

    public void setGRNonValuated(String gRNonValuated) {
        this.gRNonValuated = gRNonValuated;
    }

    public String getDelivCompleted() {
        return delivCompleted;
    }

    public void setDelivCompleted(String delivCompleted) {
        this.delivCompleted = delivCompleted;
    }

    public String getInvoiceReceipt() {
        return invoiceReceipt;
    }

    public void setInvoiceReceipt(String invoiceReceipt) {
        this.invoiceReceipt = invoiceReceipt;
    }

    public String getFinalInvoice() {
        return finalInvoice;
    }

    public void setFinalInvoice(String finalInvoice) {
        this.finalInvoice = finalInvoice;
    }

    public String getGRBasedIV() {
        return gRBasedIV;
    }

    public void setGRBasedIV(String gRBasedIV) {
        this.gRBasedIV = gRBasedIV;
    }

    public String getDPCategory() {
        return dPCategory;
    }

    public void setDPCategory(String dPCategory) {
        this.dPCategory = dPCategory;
    }

    public String getTaxCodeDescription() {
        return taxCodeDescription;
    }

    public void setTaxCodeDescription(String taxCodeDescription) {
        this.taxCodeDescription = taxCodeDescription;
    }

    public String getGLCode() {
        return gLCode;
    }

    public void setGLCode(String gLCode) {
        this.gLCode = gLCode;
    }

    public String getCostCentre() {
        return costCentre;
    }

    public void setCostCentre(String costCentre) {
        this.costCentre = costCentre;
    }

    public String getCommitmentItem() {
        return commitmentItem;
    }

    public void setCommitmentItem(String commitmentItem) {
        this.commitmentItem = commitmentItem;
    }

    public String getCOArea() {
        return cOArea;
    }

    public void setCOArea(String cOArea) {
        this.cOArea = cOArea;
    }

    public String getFund() {
        return fund;
    }

    public void setFund(String fund) {
        this.fund = fund;
    }

    public String getFundCenter() {
        return fundCenter;
    }

    public void setFundCenter(String fundCenter) {
        this.fundCenter = fundCenter;
    }

    public String getSalesOrder() {
        return salesOrder;
    }

    public void setSalesOrder(String salesOrder) {
        this.salesOrder = salesOrder;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getDeliverySchedule() {
        return deliverySchedule;
    }

    public void setDeliverySchedule(String deliverySchedule) {
        this.deliverySchedule = deliverySchedule;
    }

    public String getFunctionalArea() {
        return functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
    }

    public String getCharacteristic() {
        return characteristic;
    }

    public void setCharacteristic(String characteristic) {
        this.characteristic = characteristic;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getBillingType() {
        return billingType;
    }

    public void setBillingType(String billingType) {
        this.billingType = billingType;
    }

    public String getSalesOrderProfitabilitySegment() {
        return salesOrderProfitabilitySegment;
    }

    public void setSalesOrderProfitabilitySegment(String salesOrderProfitabilitySegment) {
        this.salesOrderProfitabilitySegment = salesOrderProfitabilitySegment;
    }

    public String getItemNumberProfitabilitySegment() {
        return itemNumberProfitabilitySegment;
    }

    public void setItemNumberProfitabilitySegment(String itemNumberProfitabilitySegment) {
        this.itemNumberProfitabilitySegment = itemNumberProfitabilitySegment;
    }

    public String getCompanyCodeProfitabilitySegment() {
        return companyCodeProfitabilitySegment;
    }

    public void setCompanyCodeProfitabilitySegment(String companyCodeProfitabilitySegment) {
        this.companyCodeProfitabilitySegment = companyCodeProfitabilitySegment;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getBusinessArea() {
        return businessArea;
    }

    public void setBusinessArea(String businessArea) {
        this.businessArea = businessArea;
    }

    public String getSalesOrganization() {
        return salesOrganization;
    }

    public void setSalesOrganization(String salesOrganization) {
        this.salesOrganization = salesOrganization;
    }

    public String getDistrChannel() {
        return distrChannel;
    }

    public void setDistrChannel(String distrChannel) {
        this.distrChannel = distrChannel;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getWBSElement() {
        return wBSElement;
    }

    public void setWBSElement(String wBSElement) {
        this.wBSElement = wBSElement;
    }

    public String getCostObject() {
        return costObject;
    }

    public void setCostObject(String costObject) {
        this.costObject = costObject;
    }

    public String getProfitCentre() {
        return profitCentre;
    }

    public void setProfitCentre(String profitCentre) {
        this.profitCentre = profitCentre;
    }

    public String getPartnerPC() {
        return partnerPC;
    }

    public void setPartnerPC(String partnerPC) {
        this.partnerPC = partnerPC;
    }

    public String getCountryProfitabilitySegment() {
        return countryProfitabilitySegment;
    }

    public void setCountryProfitabilitySegment(String countryProfitabilitySegment) {
        this.countryProfitabilitySegment = countryProfitabilitySegment;
    }

    public String getSalesOffice() {
        return salesOffice;
    }

    public void setSalesOffice(String salesOffice) {
        this.salesOffice = salesOffice;
    }

    public String getSalesEmployee() {
        return salesEmployee;
    }

    public void setSalesEmployee(String salesEmployee) {
        this.salesEmployee = salesEmployee;
    }

    public String getMatlGroup() {
        return matlGroup;
    }

    public void setMatlGroup(String matlGroup) {
        this.matlGroup = matlGroup;
    }

    public String getProdhierarchy() {
        return prodhierarchy;
    }

    public void setProdhierarchy(String prodhierarchy) {
        this.prodhierarchy = prodhierarchy;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getHigherLevItem() {
        return higherLevItem;
    }

    public void setHigherLevItem(String higherLevItem) {
        this.higherLevItem = higherLevItem;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(String customerGroup) {
        this.customerGroup = customerGroup;
    }

    public String getProductHierLevel1() {
        return productHierLevel1;
    }

    public void setProductHierLevel1(String productHierLevel1) {
        this.productHierLevel1 = productHierLevel1;
    }

    public String getProductHierLevel2() {
        return productHierLevel2;
    }

    public void setProductHierLevel2(String productHierLevel2) {
        this.productHierLevel2 = productHierLevel2;
    }

    public String getProductHierLevel3() {
        return productHierLevel3;
    }

    public void setProductHierLevel3(String productHierLevel3) {
        this.productHierLevel3 = productHierLevel3;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getReferenceDoc() {
        return referenceDoc;
    }

    public void setReferenceDoc(String referenceDoc) {
        this.referenceDoc = referenceDoc;
    }

    public String getProjectnumber1() {
        return projectnumber1;
    }

    public void setProjectnumber1(String projectnumber1) {
        this.projectnumber1 = projectnumber1;
    }

    public String getProjectIndicator() {
        return projectIndicator;
    }

    public void setProjectIndicator(String projectIndicator) {
        this.projectIndicator = projectIndicator;
    }

    public String getValuationTypeProfitabilitySegment() {
        return valuationTypeProfitabilitySegment;
    }

    public void setValuationTypeProfitabilitySegment(String valuationTypeProfitabilitySegment) {
        this.valuationTypeProfitabilitySegment = valuationTypeProfitabilitySegment;
    }

    public String getCustomerClass() {
        return customerClass;
    }

    public void setCustomerClass(String customerClass) {
        this.customerClass = customerClass;
    }

    public String getMaterialSourceInd() {
        return materialSourceInd;
    }

    public void setMaterialSourceInd(String materialSourceInd) {
        this.materialSourceInd = materialSourceInd;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getShipToParty() {
        return shipToParty;
    }

    public void setShipToParty(String shipToParty) {
        this.shipToParty = shipToParty;
    }

    public String getIndustryCode1() {
        return industryCode1;
    }

    public void setIndustryCode1(String industryCode1) {
        this.industryCode1 = industryCode1;
    }

    public String getIndustryField001() {
        return industryField001;
    }

    public void setIndustryField001(String industryField001) {
        this.industryField001 = industryField001;
    }

    public String getIndustryCode2() {
        return industryCode2;
    }

    public void setIndustryCode2(String industryCode2) {
        this.industryCode2 = industryCode2;
    }

    public String getIndustryCode3() {
        return industryCode3;
    }

    public void setIndustryCode3(String industryCode3) {
        this.industryCode3 = industryCode3;
    }

    public String getSalesDocType() {
        return salesDocType;
    }

    public void setSalesDocType(String salesDocType) {
        this.salesDocType = salesDocType;
    }

    public String getReferenceItem() {
        return referenceItem;
    }

    public void setReferenceItem(String referenceItem) {
        this.referenceItem = referenceItem;
    }

    public String getOrderProfitabilitySegment() {
        return orderProfitabilitySegment;
    }

    public void setOrderProfitabilitySegment(String orderProfitabilitySegment) {
        this.orderProfitabilitySegment = orderProfitabilitySegment;
    }

    public String getOverallLimit() {
        return overallLimit;
    }

    public void setOverallLimit(String overallLimit) {
        this.overallLimit = overallLimit;
    }

    public String getExpectedValue() {
        return expectedValue;
    }

    public void setExpectedValue(String expectedValue) {
        this.expectedValue = expectedValue;
    }

    public String getNoLimit() {
        return noLimit;
    }

    public void setNoLimit(String noLimit) {
        this.noLimit = noLimit;
    }

    public String getConditionTypeConditionsLimits() {
        return conditionTypeConditionsLimits;
    }

    public void setConditionTypeConditionsLimits(String conditionTypeConditionsLimits) {
        this.conditionTypeConditionsLimits = conditionTypeConditionsLimits;
    }

    public String getNameConditionsConditionsLimits() {
        return nameConditionsConditionsLimits;
    }

    public void setNameConditionsConditionsLimits(String nameConditionsConditionsLimits) {
        this.nameConditionsConditionsLimits = nameConditionsConditionsLimits;
    }

    public String getAmountConditionsLimits() {
        return amountConditionsLimits;
    }

    public void setAmountConditionsLimits(String amountConditionsLimits) {
        this.amountConditionsLimits = amountConditionsLimits;
    }

    public String getConditionPricingUnitConditionsLimits() {
        return conditionPricingUnitConditionsLimits;
    }

    public void setConditionPricingUnitConditionsLimits(String conditionPricingUnitConditionsLimits) {
        this.conditionPricingUnitConditionsLimits = conditionPricingUnitConditionsLimits;
    }

    public String getCurrency1ConditionsLimits() {
        return currency1ConditionsLimits;
    }

    public void setCurrency1ConditionsLimits(String currency1ConditionsLimits) {
        this.currency1ConditionsLimits = currency1ConditionsLimits;
    }

    public String getUoMConditionsConditionsLimits() {
        return uoMConditionsConditionsLimits;
    }

    public void setUoMConditionsConditionsLimits(String uoMConditionsConditionsLimits) {
        this.uoMConditionsConditionsLimits = uoMConditionsConditionsLimits;
    }

    public String getConditionValue1ConditionsLimits() {
        return conditionValue1ConditionsLimits;
    }

    public void setConditionValue1ConditionsLimits(String conditionValue1ConditionsLimits) {
        this.conditionValue1ConditionsLimits = conditionValue1ConditionsLimits;
    }

    public String getCurrency2ConditionsLimits() {
        return currency2ConditionsLimits;
    }

    public void setCurrency2ConditionsLimits(String currency2ConditionsLimits) {
        this.currency2ConditionsLimits = currency2ConditionsLimits;
    }

    public String getConditionValue2ConditionsLimits() {
        return conditionValue2ConditionsLimits;
    }

    public void setConditionValue2ConditionsLimits(String conditionValue2ConditionsLimits) {
        this.conditionValue2ConditionsLimits = conditionValue2ConditionsLimits;
    }

    public String getConditionCurrencyConditionsLimits() {
        return conditionCurrencyConditionsLimits;
    }

    public void setConditionCurrencyConditionsLimits(String conditionCurrencyConditionsLimits) {
        this.conditionCurrencyConditionsLimits = conditionCurrencyConditionsLimits;
    }

    public String getConditionTypeNameConditionsDetailsLimits() {
        return conditionTypeNameConditionsDetailsLimits;
    }

    public void setConditionTypeNameConditionsDetailsLimits(String conditionTypeNameConditionsDetailsLimits) {
        this.conditionTypeNameConditionsDetailsLimits = conditionTypeNameConditionsDetailsLimits;
    }

    public String getApplicationConditionsDetailsLimits() {
        return applicationConditionsDetailsLimits;
    }

    public void setApplicationConditionsDetailsLimits(String applicationConditionsDetailsLimits) {
        this.applicationConditionsDetailsLimits = applicationConditionsDetailsLimits;
    }

    public String getVendorNameConditionsDetailsLimits() {
        return vendorNameConditionsDetailsLimits;
    }

    public void setVendorNameConditionsDetailsLimits(String vendorNameConditionsDetailsLimits) {
        this.vendorNameConditionsDetailsLimits = vendorNameConditionsDetailsLimits;
    }

    public String getVendorCodeConditionsDetailsLimits() {
        return vendorCodeConditionsDetailsLimits;
    }

    public void setVendorCodeConditionsDetailsLimits(String vendorCodeConditionsDetailsLimits) {
        this.vendorCodeConditionsDetailsLimits = vendorCodeConditionsDetailsLimits;
    }

    public Date getConditionPricingDateLimit() {
        return conditionPricingDateLimit;
    }

    public void setConditionPricingDateLimit(Date conditionPricingDateLimit) {
        this.conditionPricingDateLimit = conditionPricingDateLimit;
    }

    public String getAmountLimits() {
        return amountLimits;
    }

    public void setAmountLimits(String amountLimits) {
        this.amountLimits = amountLimits;
    }

    public String getCurrency1Limits() {
        return currency1Limits;
    }

    public void setCurrency1Limits(String currency1Limits) {
        this.currency1Limits = currency1Limits;
    }

    public String getPricingUnitLimits() {
        return pricingUnitLimits;
    }

    public void setPricingUnitLimits(String pricingUnitLimits) {
        this.pricingUnitLimits = pricingUnitLimits;
    }

    public String getUoMLimits() {
        return uoMLimits;
    }

    public void setUoMLimits(String uoMLimits) {
        this.uoMLimits = uoMLimits;
    }

    public String getConditionBaseValueLimits() {
        return conditionBaseValueLimits;
    }

    public void setConditionBaseValueLimits(String conditionBaseValueLimits) {
        this.conditionBaseValueLimits = conditionBaseValueLimits;
    }

    public String getRateLimits() {
        return rateLimits;
    }

    public void setRateLimits(String rateLimits) {
        this.rateLimits = rateLimits;
    }

    public String getConditionValueLimits() {
        return conditionValueLimits;
    }

    public void setConditionValueLimits(String conditionValueLimits) {
        this.conditionValueLimits = conditionValueLimits;
    }

    public String getCurrency2Limits() {
        return currency2Limits;
    }

    public void setCurrency2Limits(String currency2Limits) {
        this.currency2Limits = currency2Limits;
    }

    public String getConditionClassLimits() {
        return conditionClassLimits;
    }

    public void setConditionClassLimits(String conditionClassLimits) {
        this.conditionClassLimits = conditionClassLimits;
    }

    public String getCalculateTypeLimits() {
        return calculateTypeLimits;
    }

    public void setCalculateTypeLimits(String calculateTypeLimits) {
        this.calculateTypeLimits = calculateTypeLimits;
    }

    public String getConditionCategoryLimits() {
        return conditionCategoryLimits;
    }

    public void setConditionCategoryLimits(String conditionCategoryLimits) {
        this.conditionCategoryLimits = conditionCategoryLimits;
    }

    public String getConditionControlLimits() {
        return conditionControlLimits;
    }

    public void setConditionControlLimits(String conditionControlLimits) {
        this.conditionControlLimits = conditionControlLimits;
    }

    public String getConditionOriginLimits() {
        return conditionOriginLimits;
    }

    public void setConditionOriginLimits(String conditionOriginLimits) {
        this.conditionOriginLimits = conditionOriginLimits;
    }

    public String getStatisticalLimits() {
        return statisticalLimits;
    }

    public void setStatisticalLimits(String statisticalLimits) {
        this.statisticalLimits = statisticalLimits;
    }

    public String getAccrualsLimits() {
        return accrualsLimits;
    }

    public void setAccrualsLimits(String accrualsLimits) {
        this.accrualsLimits = accrualsLimits;
    }

    public String getChangedManuallyLimits() {
        return changedManuallyLimits;
    }

    public void setChangedManuallyLimits(String changedManuallyLimits) {
        this.changedManuallyLimits = changedManuallyLimits;
    }

    public String getAccountKeyLimits() {
        return accountKeyLimits;
    }

    public void setAccountKeyLimits(String accountKeyLimits) {
        this.accountKeyLimits = accountKeyLimits;
    }

    public String getAccrualsAccountDeterminationLimits() {
        return accrualsAccountDeterminationLimits;
    }

    public void setAccrualsAccountDeterminationLimits(String accrualsAccountDeterminationLimits) {
        this.accrualsAccountDeterminationLimits = accrualsAccountDeterminationLimits;
    }

    public String getItemText() {
        return itemText;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    public String getInfoRecordPOText() {
        return infoRecordPOText;
    }

    public void setInfoRecordPOText(String infoRecordPOText) {
        this.infoRecordPOText = infoRecordPOText;
    }

    public String getMaterialPOText() {
        return materialPOText;
    }

    public void setMaterialPOText(String materialPOText) {
        this.materialPOText = materialPOText;
    }

    public String getPONoteToApprover() {
        return pONoteToApprover;
    }

    public void setPONoteToApprover(String pONoteToApprover) {
        this.pONoteToApprover = pONoteToApprover;
    }

    public String getDeliveryText() {
        return deliveryText;
    }

    public void setDeliveryText(String deliveryText) {
        this.deliveryText = deliveryText;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountryLimits() {
        return countryLimits;
    }

    public void setCountryLimits(String countryLimits) {
        this.countryLimits = countryLimits;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPONotetoApproverHeaderTextsLimits() {
        return pONotetoApproverHeaderTextsLimits;
    }

    public void setPONotetoApproverHeaderTextsLimits(String pONotetoApproverHeaderTextsLimits) {
        this.pONotetoApproverHeaderTextsLimits = pONotetoApproverHeaderTextsLimits;
    }

    public String getHeaderNote() {
        return headerNote;
    }

    public void setHeaderNote(String headerNote) {
        this.headerNote = headerNote;
    }

    public String getPricingTypes() {
        return pricingTypes;
    }

    public void setPricingTypes(String pricingTypes) {
        this.pricingTypes = pricingTypes;
    }

    public String getDeadlines() {
        return deadlines;
    }

    public void setDeadlines(String deadlines) {
        this.deadlines = deadlines;
    }

    public String getTermsofDelivery() {
        return termsofDelivery;
    }

    public void setTermsofDelivery(String termsofDelivery) {
        this.termsofDelivery = termsofDelivery;
    }

    public String getTermsofPayment() {
        return termsofPayment;
    }

    public void setTermsofPayment(String termsofPayment) {
        this.termsofPayment = termsofPayment;
    }

    public String getShippingInstructions() {
        return shippingInstructions;
    }

    public void setShippingInstructions(String shippingInstructions) {
        this.shippingInstructions = shippingInstructions;
    }

    public String getVendorMemoGeneral() {
        return vendorMemoGeneral;
    }

    public void setVendorMemoGeneral(String vendorMemoGeneral) {
        this.vendorMemoGeneral = vendorMemoGeneral;
    }

    public String getVendorMemoSpecial() {
        return vendorMemoSpecial;
    }

    public void setVendorMemoSpecial(String vendorMemoSpecial) {
        this.vendorMemoSpecial = vendorMemoSpecial;
    }

    public String getConfControlLimits() {
        return confControlLimits;
    }

    public void setConfControlLimits(String confControlLimits) {
        this.confControlLimits = confControlLimits;
    }

    public String getOrderAck() {
        return orderAck;
    }

    public void setOrderAck(String orderAck) {
        this.orderAck = orderAck;
    }

    public String getConfirmationRequired() {
        return confirmationRequired;
    }

    public void setConfirmationRequired(String confirmationRequired) {
        this.confirmationRequired = confirmationRequired;
    }

    public String getRejectionInd() {
        return rejectionInd;
    }

    public void setRejectionInd(String rejectionInd) {
        this.rejectionInd = rejectionInd;
    }

    public String getPrintPrice() {
        return printPrice;
    }

    public void setPrintPrice(String printPrice) {
        this.printPrice = printPrice;
    }

    public String getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(String estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public String getApprover1() {
        return approver1;
    }

    public void setApprover1(String approver1) {
        this.approver1 = approver1;
    }

    public String getApprover2() {
        return approver2;
    }

    public void setApprover2(String approver2) {
        this.approver2 = approver2;
    }

    public String getApprover3() {
        return approver3;
    }

    public void setApprover3(String approver3) {
        this.approver3 = approver3;
    }

    public String getApprover4() {
        return approver4;
    }

    public void setApprover4(String approver4) {
        this.approver4 = approver4;
    }

    public String getApprover5() {
        return approver5;
    }

    public void setApprover5(String approver5) {
        this.approver5 = approver5;
    }

    public String getApprover6() {
        return approver6;
    }

    public void setApprover6(String approver6) {
        this.approver6 = approver6;
    }

    public String getApprover7() {
        return approver7;
    }

    public void setApprover7(String approver7) {
        this.approver7 = approver7;
    }

    public String getIncoTermsPart1Downpayment() {
        return incoTermsPart1Downpayment;
    }

    public void setIncoTermsPart1Downpayment(String incoTermsPart1Downpayment) {
        this.incoTermsPart1Downpayment = incoTermsPart1Downpayment;
    }

    public String getIncoTermsPart2Downpayment() {
        return incoTermsPart2Downpayment;
    }

    public void setIncoTermsPart2Downpayment(String incoTermsPart2Downpayment) {
        this.incoTermsPart2Downpayment = incoTermsPart2Downpayment;
    }

    public String getVendorNameConditions() {
        return vendorNameConditions;
    }

    public void setVendorNameConditions(String vendorNameConditions) {
        this.vendorNameConditions = vendorNameConditions;
    }

    public String getVendorCodeConditions() {
        return vendorCodeConditions;
    }

    public void setVendorCodeConditions(String vendorCodeConditions) {
        this.vendorCodeConditions = vendorCodeConditions;
    }

    public String getAmountConditions() {
        return amountConditions;
    }

    public void setAmountConditions(String amountConditions) {
        this.amountConditions = amountConditions;
    }

    public String getCurrency1Conditions() {
        return currency1Conditions;
    }

    public void setCurrency1Conditions(String currency1Conditions) {
        this.currency1Conditions = currency1Conditions;
    }

    public String getPricingUnitConditions() {
        return pricingUnitConditions;
    }

    public void setPricingUnitConditions(String pricingUnitConditions) {
        this.pricingUnitConditions = pricingUnitConditions;
    }

    public String getUoMConditionValuesConditions() {
        return uoMConditionValuesConditions;
    }

    public void setUoMConditionValuesConditions(String uoMConditionValuesConditions) {
        this.uoMConditionValuesConditions = uoMConditionValuesConditions;
    }

    public String getConditionValueConditions() {
        return conditionValueConditions;
    }

    public void setConditionValueConditions(String conditionValueConditions) {
        this.conditionValueConditions = conditionValueConditions;
    }

    public String getCurrency2Conditions() {
        return currency2Conditions;
    }

    public void setCurrency2Conditions(String currency2Conditions) {
        this.currency2Conditions = currency2Conditions;
    }

    public String getConditionBaseValueConditions() {
        return conditionBaseValueConditions;
    }

    public void setConditionBaseValueConditions(String conditionBaseValueConditions) {
        this.conditionBaseValueConditions = conditionBaseValueConditions;
    }

    public String getConditionBaseRateConditions() {
        return conditionBaseRateConditions;
    }

    public void setConditionBaseRateConditions(String conditionBaseRateConditions) {
        this.conditionBaseRateConditions = conditionBaseRateConditions;
    }

    public String getStreetVendorAddress() {
        return streetVendorAddress;
    }

    public void setStreetVendorAddress(String streetVendorAddress) {
        this.streetVendorAddress = streetVendorAddress;
    }

    public String getHouseNumberVendorAddress() {
        return houseNumberVendorAddress;
    }

    public void setHouseNumberVendorAddress(String houseNumberVendorAddress) {
        this.houseNumberVendorAddress = houseNumberVendorAddress;
    }

    public String getExtTel() {
        return extTel;
    }

    public void setExtTel(String extTel) {
        this.extTel = extTel;
    }

    public String getTelephoneVendorAddress() {
        return telephoneVendorAddress;
    }

    public void setTelephoneVendorAddress(String telephoneVendorAddress) {
        this.telephoneVendorAddress = telephoneVendorAddress;
    }

    public String getExtFax() {
        return extFax;
    }

    public void setExtFax(String extFax) {
        this.extFax = extFax;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getPostalCodeVendorAddress() {
        return postalCodeVendorAddress;
    }

    public void setPostalCodeVendorAddress(String postalCodeVendorAddress) {
        this.postalCodeVendorAddress = postalCodeVendorAddress;
    }

    public String getCityVendorAddress() {
        return cityVendorAddress;
    }

    public void setCityVendorAddress(String cityVendorAddress) {
        this.cityVendorAddress = cityVendorAddress;
    }

    public String getPOQuantity() {
        return pOQuantity;
    }

    public void setPOQuantity(String pOQuantity) {
        this.pOQuantity = pOQuantity;
    }

    public String getPOQuantityUnit() {
        return pOQuantityUnit;
    }

    public void setPOQuantityUnit(String pOQuantityUnit) {
        this.pOQuantityUnit = pOQuantityUnit;
    }

    public String getPOQuantityInSKUUnit() {
        return pOQuantityInSKUUnit;
    }

    public void setPOQuantityInSKUUnit(String pOQuantityInSKUUnit) {
        this.pOQuantityInSKUUnit = pOQuantityInSKUUnit;
    }

    public String getPOQuantityInSKU() {
        return pOQuantityInSKU;
    }

    public void setPOQuantityInSKU(String pOQuantityInSKU) {
        this.pOQuantityInSKU = pOQuantityInSKU;
    }

    public String getIncoTermsPart1Delivery() {
        return incoTermsPart1Delivery;
    }

    public void setIncoTermsPart1Delivery(String incoTermsPart1Delivery) {
        this.incoTermsPart1Delivery = incoTermsPart1Delivery;
    }

    public String getIncoTermsPart2Delivery() {
        return incoTermsPart2Delivery;
    }

    public void setIncoTermsPart2Delivery(String incoTermsPart2Delivery) {
        this.incoTermsPart2Delivery = incoTermsPart2Delivery;
    }

    public String getPONumber() {
        return pONumber;
    }

    public void setPONumber(String pONumber) {
        this.pONumber = pONumber;
    }
    
}
