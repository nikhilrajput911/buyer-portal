/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_PO_Draft")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPoCreationLineItemPoDraft.findAll", query = "SELECT n FROM CmplxPoCreationLineItemPoDraft n")
})
public class CmplxPoCreationLineItemPoDraft implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 5)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 25)
    @Column(name = "AccountAssignment")
    private String accountAssignment;
    @Size(max = 25)
    @Column(name = "ItemCategory")
    private String itemCategory;
    @Size(max = 20)
    @Column(name = "Criticality")
    private String criticality;
    @Size(max = 40)
    @Column(name = "ShortText")
    private String shortText;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Size(max = 5)
    @Column(name = "PriceUnit")
    private String priceUnit;
    @Column(name = "ValPrice")
    private BigDecimal valPrice;
    @Size(max = 4)
    @Column(name = "Currency")
    private String currency;
    @Size(max = 20)
    @Column(name = "DeliveryDateCategory")
    private String deliveryDateCategory;
    @Column(name = "Total")
    private BigDecimal total;
    @Column(name = "RequisitionDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requisitionDate;
    @Size(max = 25)
    @Column(name = "DeliveryDate")
    private String deliveryDate;
    @Size(max = 20)
    @Column(name = "MaterialGroup")
    private String materialGroup;
    @Size(max = 3)
    @Column(name = "PurchasingGroup")
    private String purchasingGroup;
    @Size(max = 16)
    @Column(name = "StorageLocation")
    private String storageLocation;
    @Size(max = 12)
    @Column(name = "RequisitionerID")
    private String requisitionerID;
    @Size(max = 10)
    @Column(name = "TrackingNumber")
    private String trackingNumber;
    @Column(name = "QuantityUnit")
    private BigDecimal quantityUnit;
    @Column(name = "QuantityOrderedUnit")
    private BigDecimal quantityOrderedUnit;
    @Column(name = "OpenQuantity")
    private BigDecimal openQuantity;
    @Column(name = "RequestDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requestDate;
    @Column(name = "ReleaseDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date releaseDate;
    @Size(max = 3)
    @Column(name = "PlDelivTime")
    private String plDelivTime;
    @Size(max = 3)
    @Column(name = "GRProcTime")
    private String gRProcTime;
    @Size(max = 5)
    @Column(name = "Closed")
    private String closed;
    @Size(max = 5)
    @Column(name = "FixedID")
    private String fixedID;
    @Size(max = 18)
    @Column(name = "MaterialCode")
    private String materialCode;
    @Size(max = 40)
    @Column(name = "Description")
    private String description;
    @Size(max = 30)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 3)
    @Column(name = "Unit")
    private String unit;
    @Size(max = 16)
    @Column(name = "ProdStorageLocation")
    private String prodStorageLocation;
    @Size(max = 10)
    @Column(name = "SupplyArea")
    private String supplyArea;
    @Column(name = "RequirementDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requirementDate;
    @Column(name = "ValuationPrice")
    private BigDecimal valuationPrice;
    @Size(max = 5)
    @Column(name = "ValuationCurrency")
    private String valuationCurrency;
    @Size(max = 5)
    @Column(name = "ValuationUnit")
    private String valuationUnit;
    @Size(max = 10)
    @Column(name = "Promotion")
    private String promotion;
    @Size(max = 5)
    @Column(name = "GoodsReceipt")
    private String goodsReceipt;
    @Size(max = 5)
    @Column(name = "InvReceipt")
    private String invReceipt;
    @Size(max = 5)
    @Column(name = "GRNonVal")
    private String gRNonVal;
    @Size(max = 10)
    @Column(name = "AgreementLineItem")
    private String agreementLineItem;
    @Size(max = 10)
    @Column(name = "FixedVendor")
    private String fixedVendor;
    @Size(max = 10)
    @Column(name = "InfoRecord")
    private String infoRecord;
    @Size(max = 10)
    @Column(name = "DesiredVendor")
    private String desiredVendor;
    @Size(max = 4)
    @Column(name = "PurchasingOrganization")
    private String purchasingOrganization;
    @Size(max = 10)
    @Column(name = "POUnit")
    private String pOUnit;
    @Size(max = 10)
    @Column(name = "SupplyingPlant")
    private String supplyingPlant;
    @Size(max = 16)
    @Column(name = "IssuingStorageLocation")
    private String issuingStorageLocation;
    @Column(name = "OverallLimit")
    private BigDecimal overallLimit;
    @Column(name = "ExpectedValue")
    private BigDecimal expectedValue;
    @Size(max = 5)
    @Column(name = "NoLimit")
    private String noLimit;
    @Size(max = 4000)
    @Column(name = "ItemTextLineItem")
    private String itemTextLineItem;
    @Size(max = 4000)
    @Column(name = "ItemNote")
    private String itemNote;
    @Size(max = 4000)
    @Column(name = "DeliveryText")
    private String deliveryText;
    @Size(max = 4000)
    @Column(name = "MaterialPOText")
    private String materialPOText;
    @Size(max = 4000)
    @Column(name = "PRNotetoApprover")
    private String pRNotetoApprover;
    @Size(max = 4000)
    @Column(name = "MaterialLongText")
    private String materialLongText;
    @Size(max = 70)
    @Column(name = "RequsitionEmail")
    private String requsitionEmail;
    @Size(max = 30)
    @Column(name = "QuotationNumber")
    private String quotationNumber;
    @Size(max = 50)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 50)
    @Column(name = "Distribution")
    private String distribution;
    @Size(max = 50)
    @Column(name = "PartialInvoiceIndicator")
    private String partialInvoiceIndicator;
    @Column(name = "BP_assign_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bPassigndate;
    @Size(max = 20)
    @Column(name = "BP_quantity_remaining")
    private String bPquantityremaining;
    @Size(max = 20)
    @Column(name = "BP_rfq_status")
    private String bPrfqstatus;
    @Size(max = 20)
    @Column(name = "BP_status")
    private String bPstatus;
    @Column(name = "BP_buyerdetails_id")
    private Integer bPbuyerdetailsid;
    @Size(max = 20)
    @Column(name = "RejectStatus")
    private String rejectStatus;
    @Size(max = 20)
    @Column(name = "QueryStatus")
    private String queryStatus;
    @Column(name = "ReferenceDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date referenceDate;
    @Size(max = 100)
    @Column(name = "SourceList")
    private String sourceList;
    @Size(max = 100)
    @Column(name = "CountryofOrigin")
    private String countryofOrigin;
    @Size(max = 100)
    @Column(name = "HeaderNote")
    private String headerNote;
    @Size(max = 50)
    @Column(name = "OldMaterialCode")
    private String oldMaterialCode;
    @Size(max = 1)
    @Column(name = "NoteToBuyer")
    private String noteToBuyer;
    @Size(max = 50)
    @Column(name = "UOMStore")
    private String uOMStore;
    @Size(max = 50)
    @Column(name = "PO_Requestor")
    private String pORequestor;
    @Size(max = 100)
    @Column(name = "PO_RequestorEmail")
    private String pORequestorEmail;
    @Size(max = 10)
    @Column(name = "PR_TrackingNumber")
    private String pRTrackingNumber;
    @Size(max = 5)
    @Column(name = "HigherLevelItem")
    private String higherLevelItem;
    @Size(max = 1)
    @Column(name = "SubitemCategory")
    private String subitemCategory;
    @Size(max = 10)
    @Column(name = "Batch")
    private String batch;
    @Size(max = 5)
    @Column(name = "DeleteFlag")
    private String deleteFlag;
    @Size(max = 5)
    @Column(name = "BlockFlag")
    private String blockFlag;
    @Column(name = "NetPrice")
    private BigDecimal netPrice;
    @Size(max = 100)
    @Column(name = "TaxCode")
    private String taxCode;
    @ManyToOne(targetEntity = ExtPoCreationDraft.class)
    @JoinColumn(name = "ExtPoCreationPkId", referencedColumnName = "Id")
    private ExtPoCreationDraft extPoCreationDraft;
    @Size(max = 20)
    @Column(name = "PrInsertionOrderId")
    private String prInsertionOrderId;
    @Column(name = "UnitPrice")
    private BigDecimal unitPrice;    
    @Size(max = 100)
    @Column(name = "ImMaterial")
    private String imMaterial;
    @Size(max = 100)
    @Column(name = "ReturnsItem")
    private String returnsItem;
    @Size(max = 150)
    @Column(name = "FreeOfCharge")
    private String freeOfCharge;
    @Size(max = 150)
    @Column(name = "MfrPartNumber")
    private String mfrPartNumber;
    @Size(max = 250)
    @Column(name = "Manufacturer")
    private String manufacturer;
    @Size(max = 20)
    @Column(name = "PurchaseRequestNumber")
    private String purchaseRequestNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 20)
    @Column(name = "PrCreator")
    private String prCreator;
    @Size(max = 20)
    @Column(name = "PrDeptName")
    private String prDeptName;
    @Size(max = 20)
    @Column(name = "OrderPriceUnit")
    private String orderPriceUnit;    
    @Size(max = 10)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 50)
    @Column(name = "PoDistribution")
    private String poDistribution;
    @Size(max = 20)
    @Column(name = "PrTaxAmount")
    private String prTaxAmount;
    @Size(max = 500)
    @Column(name = "PrComments")
    private String prComments;
    @Size(max = 100)
    @Column(name = "ConfirmationControlForLineInPr")
    private String confirmationControlForLineInPr;
    @Size(max = 10)
    @Column(name = "TexCodeForLineInPr")
    private String texCodeForLineInPr;
    @Size(max = 50)
    @Column(name = "SegmentForLineInPr")
    private String segmentForLineInPr;
    @Size(max = 10)
    @Column(name = "PrPackageNo")
    private String prPackageNo;
    @Size(max = 20)
    @Column(name = "ServiceRefLineNo")
    private String serviceRefLineNo;
    @Size(max = 20)
    @Column(name = "LineType")
    private String lineType;
    @Size(max = 30)
    @Column(name = "IsPoLineOrPrLineOrRfqLineOrEmptyLine")
    private String isPoLineOrPrLineOrRfqLineOrEmptyLine;
    @Size(max = 20)
    @Column(name = "PrRfqNumber")
    private String prRfqNumber;
    @Size(max = 20)
    @Column(name = "PrRfqLineItemNumber")
    private String prRfqLineItemNumber;
    @Size(max = 20)
    @Column(name = "quantityBeforeChange")
    private String quantityBeforeChange;
    @Size(max = 50)
    @Column(name = "PurchaseRequestType")
    private String purchaseRequestType;
    @Size(max = 5)
    @Column(name = "IsPrSaved")
    private String isPrSaved;    
    @Size(max = 30)
    @Column(name = "POLineItemPackageNo")
    private String poLineItemPackageNo;
    @Size(max = 10)
    @Column(name = "POLineItemTaxCode")
    private String poLineItemTaxCode;
    @Size(max = 10)
    @Column(name = "TotalQuantityOfThisLine")
    private String totalQuantityOfThisLine;
    @Size(max = 20)
    @Column(name = "ParentPrLineInsertionOrderId")
    private String parentPrLineInsertionOrderId;
    @Size(max = 20)
    @Column(name = "PrGLCode")
    private String prGLCode;
    @Size(max = 20)
    @Column(name = "PrZGLCode")
    private String prZGLCode;
    @Size(max = 20)
    @Column(name = "RfqIdRfqLineIdInsertionOrderIdString")
    private String rfqIdRfqLineIdInsertionOrderIdString;
    @Column(name = "PrNetPrice")
    private BigDecimal prNetPrice;
    
    public CmplxPoCreationLineItemPoDraft() {
    }

    public CmplxPoCreationLineItemPoDraft(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getAccountAssignment() {
        return accountAssignment;
    }

    public void setAccountAssignment(String accountAssignment) {
        this.accountAssignment = accountAssignment;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getCriticality() {
        return criticality;
    }

    public void setCriticality(String criticality) {
        this.criticality = criticality;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
    }

    public BigDecimal getValPrice() {
        return valPrice;
    }

    public void setValPrice(BigDecimal valPrice) {
        this.valPrice = valPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDeliveryDateCategory() {
        return deliveryDateCategory;
    }

    public void setDeliveryDateCategory(String deliveryDateCategory) {
        this.deliveryDateCategory = deliveryDateCategory;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Date getRequisitionDate() {
        return requisitionDate;
    }

    public void setRequisitionDate(Date requisitionDate) {
        this.requisitionDate = requisitionDate;
    }

    public String getMaterialGroup() {
        return materialGroup;
    }

    public void setMaterialGroup(String materialGroup) {
        this.materialGroup = materialGroup;
    }

    public String getPurchasingGroup() {
        return purchasingGroup;
    }

    public void setPurchasingGroup(String purchasingGroup) {
        this.purchasingGroup = purchasingGroup;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }

    public String getRequisitionerID() {
        return requisitionerID;
    }

    public void setRequisitionerID(String requisitionerID) {
        this.requisitionerID = requisitionerID;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public BigDecimal getQuantityUnit() {
        return quantityUnit;
    }

    public void setQuantityUnit(BigDecimal quantityUnit) {
        this.quantityUnit = quantityUnit;
    }

    public BigDecimal getQuantityOrderedUnit() {
        return quantityOrderedUnit;
    }

    public void setQuantityOrderedUnit(BigDecimal quantityOrderedUnit) {
        this.quantityOrderedUnit = quantityOrderedUnit;
    }

    public BigDecimal getOpenQuantity() {
        return openQuantity;
    }

    public void setOpenQuantity(BigDecimal openQuantity) {
        this.openQuantity = openQuantity;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getPlDelivTime() {
        return plDelivTime;
    }

    public void setPlDelivTime(String plDelivTime) {
        this.plDelivTime = plDelivTime;
    }

    public String getGRProcTime() {
        return gRProcTime;
    }

    public void setGRProcTime(String gRProcTime) {
        this.gRProcTime = gRProcTime;
    }

    public String getClosed() {
        return closed;
    }

    public void setClosed(String closed) {
        this.closed = closed;
    }

    public String getFixedID() {
        return fixedID;
    }

    public void setFixedID(String fixedID) {
        this.fixedID = fixedID;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getProdStorageLocation() {
        return prodStorageLocation;
    }

    public void setProdStorageLocation(String prodStorageLocation) {
        this.prodStorageLocation = prodStorageLocation;
    }

    public String getSupplyArea() {
        return supplyArea;
    }

    public void setSupplyArea(String supplyArea) {
        this.supplyArea = supplyArea;
    }

    public Date getRequirementDate() {
        return requirementDate;
    }

    public void setRequirementDate(Date requirementDate) {
        this.requirementDate = requirementDate;
    }

    public BigDecimal getValuationPrice() {
        return valuationPrice;
    }

    public void setValuationPrice(BigDecimal valuationPrice) {
        this.valuationPrice = valuationPrice;
    }

    public String getValuationCurrency() {
        return valuationCurrency;
    }

    public void setValuationCurrency(String valuationCurrency) {
        this.valuationCurrency = valuationCurrency;
    }

    public String getValuationUnit() {
        return valuationUnit;
    }

    public void setValuationUnit(String valuationUnit) {
        this.valuationUnit = valuationUnit;
    }

    public String getPromotion() {
        return promotion;
    }

    public void setPromotion(String promotion) {
        this.promotion = promotion;
    }

    public String getGoodsReceipt() {
        return goodsReceipt;
    }

    public void setGoodsReceipt(String goodsReceipt) {
        this.goodsReceipt = goodsReceipt;
    }

    public String getInvReceipt() {
        return invReceipt;
    }

    public void setInvReceipt(String invReceipt) {
        this.invReceipt = invReceipt;
    }

    public String getGRNonVal() {
        return gRNonVal;
    }

    public void setGRNonVal(String gRNonVal) {
        this.gRNonVal = gRNonVal;
    }

    public String getAgreementLineItem() {
        return agreementLineItem;
    }

    public void setAgreementLineItem(String agreementLineItem) {
        this.agreementLineItem = agreementLineItem;
    }

    public String getFixedVendor() {
        return fixedVendor;
    }

    public void setFixedVendor(String fixedVendor) {
        this.fixedVendor = fixedVendor;
    }

    public String getInfoRecord() {
        return infoRecord;
    }

    public void setInfoRecord(String infoRecord) {
        this.infoRecord = infoRecord;
    }

    public String getDesiredVendor() {
        return desiredVendor;
    }

    public void setDesiredVendor(String desiredVendor) {
        this.desiredVendor = desiredVendor;
    }

    public String getPurchasingOrganization() {
        return purchasingOrganization;
    }

    public void setPurchasingOrganization(String purchasingOrganization) {
        this.purchasingOrganization = purchasingOrganization;
    }

    public String getPOUnit() {
        return pOUnit;
    }

    public void setPOUnit(String pOUnit) {
        this.pOUnit = pOUnit;
    }

    public String getSupplyingPlant() {
        return supplyingPlant;
    }

    public void setSupplyingPlant(String supplyingPlant) {
        this.supplyingPlant = supplyingPlant;
    }

    public String getIssuingStorageLocation() {
        return issuingStorageLocation;
    }

    public void setIssuingStorageLocation(String issuingStorageLocation) {
        this.issuingStorageLocation = issuingStorageLocation;
    }

    public BigDecimal getOverallLimit() {
        return overallLimit;
    }

    public void setOverallLimit(BigDecimal overallLimit) {
        this.overallLimit = overallLimit;
    }

    public BigDecimal getExpectedValue() {
        return expectedValue;
    }

    public void setExpectedValue(BigDecimal expectedValue) {
        this.expectedValue = expectedValue;
    }

    public String getNoLimit() {
        return noLimit;
    }

    public void setNoLimit(String noLimit) {
        this.noLimit = noLimit;
    }

    public String getItemTextLineItem() {
        return itemTextLineItem;
    }

    public void setItemTextLineItem(String itemTextLineItem) {
        this.itemTextLineItem = itemTextLineItem;
    }

    public String getItemNote() {
        return itemNote;
    }

    public void setItemNote(String itemNote) {
        this.itemNote = itemNote;
    }

    public String getDeliveryText() {
        return deliveryText;
    }

    public void setDeliveryText(String deliveryText) {
        this.deliveryText = deliveryText;
    }

    public String getMaterialPOText() {
        return materialPOText;
    }

    public void setMaterialPOText(String materialPOText) {
        this.materialPOText = materialPOText;
    }

    public String getPRNotetoApprover() {
        return pRNotetoApprover;
    }

    public void setPRNotetoApprover(String pRNotetoApprover) {
        this.pRNotetoApprover = pRNotetoApprover;
    }

    public String getMaterialLongText() {
        return materialLongText;
    }

    public void setMaterialLongText(String materialLongText) {
        this.materialLongText = materialLongText;
    }

    public String getRequsitionEmail() {
        return requsitionEmail;
    }

    public void setRequsitionEmail(String requsitionEmail) {
        this.requsitionEmail = requsitionEmail;
    }

    public String getQuotationNumber() {
        return quotationNumber;
    }

    public void setQuotationNumber(String quotationNumber) {
        this.quotationNumber = quotationNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public String getPartialInvoiceIndicator() {
        return partialInvoiceIndicator;
    }

    public void setPartialInvoiceIndicator(String partialInvoiceIndicator) {
        this.partialInvoiceIndicator = partialInvoiceIndicator;
    }

    public Date getBPassigndate() {
        return bPassigndate;
    }

    public void setBPassigndate(Date bPassigndate) {
        this.bPassigndate = bPassigndate;
    }

    public String getBPquantityremaining() {
        return bPquantityremaining;
    }

    public void setBPquantityremaining(String bPquantityremaining) {
        this.bPquantityremaining = bPquantityremaining;
    }

    public String getBPrfqstatus() {
        return bPrfqstatus;
    }

    public void setBPrfqstatus(String bPrfqstatus) {
        this.bPrfqstatus = bPrfqstatus;
    }

    public String getBPstatus() {
        return bPstatus;
    }

    public void setBPstatus(String bPstatus) {
        this.bPstatus = bPstatus;
    }

    public Integer getBPbuyerdetailsid() {
        return bPbuyerdetailsid;
    }

    public void setBPbuyerdetailsid(Integer bPbuyerdetailsid) {
        this.bPbuyerdetailsid = bPbuyerdetailsid;
    }

    public String getRejectStatus() {
        return rejectStatus;
    }

    public void setRejectStatus(String rejectStatus) {
        this.rejectStatus = rejectStatus;
    }

    public String getQueryStatus() {
        return queryStatus;
    }

    public void setQueryStatus(String queryStatus) {
        this.queryStatus = queryStatus;
    }

    public Date getReferenceDate() {
        return referenceDate;
    }

    public void setReferenceDate(Date referenceDate) {
        this.referenceDate = referenceDate;
    }

    public String getSourceList() {
        return sourceList;
    }

    public void setSourceList(String sourceList) {
        this.sourceList = sourceList;
    }

    public String getCountryofOrigin() {
        return countryofOrigin;
    }

    public void setCountryofOrigin(String countryofOrigin) {
        this.countryofOrigin = countryofOrigin;
    }

    public String getHeaderNote() {
        return headerNote;
    }

    public void setHeaderNote(String headerNote) {
        this.headerNote = headerNote;
    }

    public String getOldMaterialCode() {
        return oldMaterialCode;
    }

    public void setOldMaterialCode(String oldMaterialCode) {
        this.oldMaterialCode = oldMaterialCode;
    }

    public String getNoteToBuyer() {
        return noteToBuyer;
    }

    public void setNoteToBuyer(String noteToBuyer) {
        this.noteToBuyer = noteToBuyer;
    }

    public String getUOMStore() {
        return uOMStore;
    }

    public void setUOMStore(String uOMStore) {
        this.uOMStore = uOMStore;
    }

    public String getPORequestor() {
        return pORequestor;
    }

    public void setPORequestor(String pORequestor) {
        this.pORequestor = pORequestor;
    }

    public String getPORequestorEmail() {
        return pORequestorEmail;
    }

    public void setPORequestorEmail(String pORequestorEmail) {
        this.pORequestorEmail = pORequestorEmail;
    }

    public String getPRTrackingNumber() {
        return pRTrackingNumber;
    }

    public void setPRTrackingNumber(String pRTrackingNumber) {
        this.pRTrackingNumber = pRTrackingNumber;
    }

    public String getHigherLevelItem() {
        return higherLevelItem;
    }

    public void setHigherLevelItem(String higherLevelItem) {
        this.higherLevelItem = higherLevelItem;
    }

    public String getSubitemCategory() {
        return subitemCategory;
    }

    public void setSubitemCategory(String subitemCategory) {
        this.subitemCategory = subitemCategory;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getBlockFlag() {
        return blockFlag;
    }

    public void setBlockFlag(String blockFlag) {
        this.blockFlag = blockFlag;
    }

    public BigDecimal getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(BigDecimal netPrice) {
        this.netPrice = netPrice;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public ExtPoCreationDraft getExtPoCreationDraft() {
        return extPoCreationDraft;
    }

    public void setExtPoCreationDraft(ExtPoCreationDraft extPoCreationDraft) {
        this.extPoCreationDraft = extPoCreationDraft;
    }

    public String getPrInsertionOrderId() {
        return prInsertionOrderId;
    }

    public void setPrInsertionOrderId(String prInsertionOrderId) {
        this.prInsertionOrderId = prInsertionOrderId;
    }
    
    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getImMaterial() {
        return imMaterial;
    }

    public void setImMaterial(String imMaterial) {
        this.imMaterial = imMaterial;
    }

    public String getReturnsItem() {
        return returnsItem;
    }

    public void setReturnsItem(String returnsItem) {
        this.returnsItem = returnsItem;
    }

    public String getFreeOfCharge() {
        return freeOfCharge;
    }

    public void setFreeOfCharge(String freeOfCharge) {
        this.freeOfCharge = freeOfCharge;
    }

    public String getMfrPartNumber() {
        return mfrPartNumber;
    }

    public void setMfrPartNumber(String mfrPartNumber) {
        this.mfrPartNumber = mfrPartNumber;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getPurchaseRequestNumber() {
        return purchaseRequestNumber;
    }

    public void setPurchaseRequestNumber(String purchaseRequestNumber) {
        this.purchaseRequestNumber = purchaseRequestNumber;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getPrCreator() {
        return prCreator;
    }

    public void setPrCreator(String prCreator) {
        this.prCreator = prCreator;
    }

    public String getPrDeptName() {
        return prDeptName;
    }

    public void setPrDeptName(String prDeptName) {
        this.prDeptName = prDeptName;
    }

    public String getOrderPriceUnit() {
        return orderPriceUnit;
    }

    public void setOrderPriceUnit(String orderPriceUnit) {
        this.orderPriceUnit = orderPriceUnit;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPoDistribution() {
        return poDistribution;
    }

    public void setPoDistribution(String poDistribution) {
        this.poDistribution = poDistribution;
    }

    public String getPrTaxAmount() {
        return prTaxAmount;
    }

    public void setPrTaxAmount(String prTaxAmount) {
        this.prTaxAmount = prTaxAmount;
    }

    public String getPrComments() {
        return prComments;
    }

    public void setPrComments(String prComments) {
        this.prComments = prComments;
    }

    public String getConfirmationControlForLineInPr() {
        return confirmationControlForLineInPr;
    }

    public void setConfirmationControlForLineInPr(String confirmationControlForLineInPr) {
        this.confirmationControlForLineInPr = confirmationControlForLineInPr;
    }

    public String getTexCodeForLineInPr() {
        return texCodeForLineInPr;
    }

    public void setTexCodeForLineInPr(String texCodeForLineInPr) {
        this.texCodeForLineInPr = texCodeForLineInPr;
    }

    public String getSegmentForLineInPr() {
        return segmentForLineInPr;
    }

    public void setSegmentForLineInPr(String segmentForLineInPr) {
        this.segmentForLineInPr = segmentForLineInPr;
    }

    public String getPrPackageNo() {
        return prPackageNo;
    }

    public void setPrPackageNo(String prPackageNo) {
        this.prPackageNo = prPackageNo;
    }

    public String getServiceRefLineNo() {
        return serviceRefLineNo;
    }

    public void setServiceRefLineNo(String serviceRefLineNo) {
        this.serviceRefLineNo = serviceRefLineNo;
    }

    public String getLineType() {
        return lineType;
    }

    public void setLineType(String lineType) {
        this.lineType = lineType;
    }

    public String getIsPoLineOrPrLineOrRfqLineOrEmptyLine() {
        return isPoLineOrPrLineOrRfqLineOrEmptyLine;
    }

    public void setIsPoLineOrPrLineOrRfqLineOrEmptyLine(String isPoLineOrPrLineOrRfqLineOrEmptyLine) {
        this.isPoLineOrPrLineOrRfqLineOrEmptyLine = isPoLineOrPrLineOrRfqLineOrEmptyLine;
    }

    public String getPrRfqNumber() {
        return prRfqNumber;
    }

    public void setPrRfqNumber(String prRfqNumber) {
        this.prRfqNumber = prRfqNumber;
    }

    public String getPrRfqLineItemNumber() {
        return prRfqLineItemNumber;
    }

    public void setPrRfqLineItemNumber(String prRfqLineItemNumber) {
        this.prRfqLineItemNumber = prRfqLineItemNumber;
    }

    public String getQuantityBeforeChange() {
        return quantityBeforeChange;
    }

    public void setQuantityBeforeChange(String quantityBeforeChange) {
        this.quantityBeforeChange = quantityBeforeChange;
    }

    public String getPurchaseRequestType() {
        return purchaseRequestType;
    }

    public void setPurchaseRequestType(String purchaseRequestType) {
        this.purchaseRequestType = purchaseRequestType;
    }

    public String getIsPrSaved() {
        return isPrSaved;
    }

    public void setIsPrSaved(String isPrSaved) {
        this.isPrSaved = isPrSaved;
    }

    public String getPoLineItemPackageNo() {
        return poLineItemPackageNo;
    }

    public void setPoLineItemPackageNo(String poLineItemPackageNo) {
        this.poLineItemPackageNo = poLineItemPackageNo;
    }

    public String getPoLineItemTaxCode() {
        return poLineItemTaxCode;
    }

    public void setPoLineItemTaxCode(String poLineItemTaxCode) {
        this.poLineItemTaxCode = poLineItemTaxCode;
    }

    public String getTotalQuantityOfThisLine() {
        return totalQuantityOfThisLine;
    }

    public void setTotalQuantityOfThisLine(String totalQuantityOfThisLine) {
        this.totalQuantityOfThisLine = totalQuantityOfThisLine;
    }

    public String getParentPrLineInsertionOrderId() {
        return parentPrLineInsertionOrderId;
    }

    public void setParentPrLineInsertionOrderId(String parentPrLineInsertionOrderId) {
        this.parentPrLineInsertionOrderId = parentPrLineInsertionOrderId;
    }

    public String getPrGLCode() {
        return prGLCode;
    }

    public void setPrGLCode(String prGLCode) {
        this.prGLCode = prGLCode;
    }

    public String getPrZGLCode() {
        return prZGLCode;
    }

    public void setPrZGLCode(String prZGLCode) {
        this.prZGLCode = prZGLCode;
    }

    public String getRfqIdRfqLineIdInsertionOrderIdString() {
        return rfqIdRfqLineIdInsertionOrderIdString;
    }

    public void setRfqIdRfqLineIdInsertionOrderIdString(String rfqIdRfqLineIdInsertionOrderIdString) {
        this.rfqIdRfqLineIdInsertionOrderIdString = rfqIdRfqLineIdInsertionOrderIdString;
    }

    public BigDecimal getPrNetPrice() {
        return prNetPrice;
    }

    public void setPrNetPrice(BigDecimal prNetPrice) {
        this.prNetPrice = prNetPrice;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CmplxPoCreationLineItemPoDraft)) {
            return false;
        }
        CmplxPoCreationLineItemPoDraft other = (CmplxPoCreationLineItemPoDraft) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPoCreationLineItemPoDraft[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
