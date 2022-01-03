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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_Cmplx_PRToPO_LineItem_PR")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NewgenPRLineItem.findAll", query = "SELECT n FROM NewgenPRLineItem n"),
    @NamedQuery(name = "NewgenPRLineItem.findByProcInstId", query = "SELECT n FROM NewgenPRLineItem n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NewgenPRLineItem.findByInsertionOrderId", query = "SELECT n FROM NewgenPRLineItem n WHERE n.insertionOrderId = :insertionOrderId"),
    @NamedQuery(name = "NewgenPRLineItem.findByItemNumber", query = "SELECT n FROM NewgenPRLineItem n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NewgenPRLineItem.findByAccountAssignment", query = "SELECT n FROM NewgenPRLineItem n WHERE n.accountAssignment = :accountAssignment"),
    @NamedQuery(name = "NewgenPRLineItem.findByItemCategory", query = "SELECT n FROM NewgenPRLineItem n WHERE n.itemCategory = :itemCategory"),
    @NamedQuery(name = "NewgenPRLineItem.findByCriticality", query = "SELECT n FROM NewgenPRLineItem n WHERE n.criticality = :criticality"),
    @NamedQuery(name = "NewgenPRLineItem.findByShortText", query = "SELECT n FROM NewgenPRLineItem n WHERE n.shortText = :shortText"),
    @NamedQuery(name = "NewgenPRLineItem.findByQuantity", query = "SELECT n FROM NewgenPRLineItem n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NewgenPRLineItem.findByPriceUnit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.priceUnit = :priceUnit"),
    @NamedQuery(name = "NewgenPRLineItem.findByValPrice", query = "SELECT n FROM NewgenPRLineItem n WHERE n.valPrice = :valPrice"),
    @NamedQuery(name = "NewgenPRLineItem.findByCurrency", query = "SELECT n FROM NewgenPRLineItem n WHERE n.currency = :currency"),
    @NamedQuery(name = "NewgenPRLineItem.findByDeliveryDateCategory", query = "SELECT n FROM NewgenPRLineItem n WHERE n.deliveryDateCategory = :deliveryDateCategory"),
    @NamedQuery(name = "NewgenPRLineItem.findByTotal", query = "SELECT n FROM NewgenPRLineItem n WHERE n.total = :total"),
    @NamedQuery(name = "NewgenPRLineItem.findByRequisitionDate", query = "SELECT n FROM NewgenPRLineItem n WHERE n.requisitionDate = :requisitionDate"),
    @NamedQuery(name = "NewgenPRLineItem.findByDeliveryDate", query = "SELECT n FROM NewgenPRLineItem n WHERE n.deliveryDate = :deliveryDate"),
    @NamedQuery(name = "NewgenPRLineItem.findByMaterialGroup", query = "SELECT n FROM NewgenPRLineItem n WHERE n.materialGroup = :materialGroup"),
    @NamedQuery(name = "NewgenPRLineItem.findByPurchasingGroup", query = "SELECT n FROM NewgenPRLineItem n WHERE n.purchasingGroup = :purchasingGroup"),
    @NamedQuery(name = "NewgenPRLineItem.findByStorageLocation", query = "SELECT n FROM NewgenPRLineItem n WHERE n.storageLocation = :storageLocation"),
    @NamedQuery(name = "NewgenPRLineItem.findByRequisitionerID", query = "SELECT n FROM NewgenPRLineItem n WHERE n.requisitionerID = :requisitionerID"),
    @NamedQuery(name = "NewgenPRLineItem.findByTrackingNumber", query = "SELECT n FROM NewgenPRLineItem n WHERE n.trackingNumber = :trackingNumber"),
    @NamedQuery(name = "NewgenPRLineItem.findByQuantityUnit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.quantityUnit = :quantityUnit"),
    @NamedQuery(name = "NewgenPRLineItem.findByQuantityOrderedUnit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.quantityOrderedUnit = :quantityOrderedUnit"),
    @NamedQuery(name = "NewgenPRLineItem.findByOpenQuantity", query = "SELECT n FROM NewgenPRLineItem n WHERE n.openQuantity = :openQuantity"),
    @NamedQuery(name = "NewgenPRLineItem.findByRequestDate", query = "SELECT n FROM NewgenPRLineItem n WHERE n.requestDate = :requestDate"),
    @NamedQuery(name = "NewgenPRLineItem.findByReleaseDate", query = "SELECT n FROM NewgenPRLineItem n WHERE n.releaseDate = :releaseDate"),
    @NamedQuery(name = "NewgenPRLineItem.findByPlDelivTime", query = "SELECT n FROM NewgenPRLineItem n WHERE n.plDelivTime = :plDelivTime"),
    @NamedQuery(name = "NewgenPRLineItem.findByGRProcTime", query = "SELECT n FROM NewgenPRLineItem n WHERE n.gRProcTime = :gRProcTime"),
    @NamedQuery(name = "NewgenPRLineItem.findByClosed", query = "SELECT n FROM NewgenPRLineItem n WHERE n.closed = :closed"),
    @NamedQuery(name = "NewgenPRLineItem.findByFixedID", query = "SELECT n FROM NewgenPRLineItem n WHERE n.fixedID = :fixedID"),
    @NamedQuery(name = "NewgenPRLineItem.findByMaterialCode", query = "SELECT n FROM NewgenPRLineItem n WHERE n.materialCode = :materialCode"),
    @NamedQuery(name = "NewgenPRLineItem.findByDescription", query = "SELECT n FROM NewgenPRLineItem n WHERE n.description = :description"),
    @NamedQuery(name = "NewgenPRLineItem.findByPlant", query = "SELECT n FROM NewgenPRLineItem n WHERE n.plant = :plant"),
    @NamedQuery(name = "NewgenPRLineItem.findByUnit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.unit = :unit"),
    @NamedQuery(name = "NewgenPRLineItem.findByProdStorageLocation", query = "SELECT n FROM NewgenPRLineItem n WHERE n.prodStorageLocation = :prodStorageLocation"),
    @NamedQuery(name = "NewgenPRLineItem.findBySupplyArea", query = "SELECT n FROM NewgenPRLineItem n WHERE n.supplyArea = :supplyArea"),
    @NamedQuery(name = "NewgenPRLineItem.findByRequirementDate", query = "SELECT n FROM NewgenPRLineItem n WHERE n.requirementDate = :requirementDate"),
    @NamedQuery(name = "NewgenPRLineItem.findByValuationPrice", query = "SELECT n FROM NewgenPRLineItem n WHERE n.valuationPrice = :valuationPrice"),
    @NamedQuery(name = "NewgenPRLineItem.findByValuationCurrency", query = "SELECT n FROM NewgenPRLineItem n WHERE n.valuationCurrency = :valuationCurrency"),
    @NamedQuery(name = "NewgenPRLineItem.findByValuationUnit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.valuationUnit = :valuationUnit"),
    @NamedQuery(name = "NewgenPRLineItem.findByPromotion", query = "SELECT n FROM NewgenPRLineItem n WHERE n.promotion = :promotion"),
    @NamedQuery(name = "NewgenPRLineItem.findByGoodsReceipt", query = "SELECT n FROM NewgenPRLineItem n WHERE n.goodsReceipt = :goodsReceipt"),
    @NamedQuery(name = "NewgenPRLineItem.findByInvReceipt", query = "SELECT n FROM NewgenPRLineItem n WHERE n.invReceipt = :invReceipt"),
    @NamedQuery(name = "NewgenPRLineItem.findByGRNonVal", query = "SELECT n FROM NewgenPRLineItem n WHERE n.gRNonVal = :gRNonVal"),
    @NamedQuery(name = "NewgenPRLineItem.findByAgreementLineItem", query = "SELECT n FROM NewgenPRLineItem n WHERE n.agreementLineItem = :agreementLineItem"),
    @NamedQuery(name = "NewgenPRLineItem.findByFixedVendor", query = "SELECT n FROM NewgenPRLineItem n WHERE n.fixedVendor = :fixedVendor"),
    @NamedQuery(name = "NewgenPRLineItem.findByInfoRecord", query = "SELECT n FROM NewgenPRLineItem n WHERE n.infoRecord = :infoRecord"),
    @NamedQuery(name = "NewgenPRLineItem.findByDesiredVendor", query = "SELECT n FROM NewgenPRLineItem n WHERE n.desiredVendor = :desiredVendor"),
    @NamedQuery(name = "NewgenPRLineItem.findByPurchasingOrganization", query = "SELECT n FROM NewgenPRLineItem n WHERE n.purchasingOrganization = :purchasingOrganization"),
    @NamedQuery(name = "NewgenPRLineItem.findByPOUnit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.pOUnit = :pOUnit"),
    @NamedQuery(name = "NewgenPRLineItem.findBySupplyingPlant", query = "SELECT n FROM NewgenPRLineItem n WHERE n.supplyingPlant = :supplyingPlant"),
    @NamedQuery(name = "NewgenPRLineItem.findByIssuingStorageLocation", query = "SELECT n FROM NewgenPRLineItem n WHERE n.issuingStorageLocation = :issuingStorageLocation"),
    @NamedQuery(name = "NewgenPRLineItem.findByOverallLimit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.overallLimit = :overallLimit"),
    @NamedQuery(name = "NewgenPRLineItem.findByExpectedValue", query = "SELECT n FROM NewgenPRLineItem n WHERE n.expectedValue = :expectedValue"),
    @NamedQuery(name = "NewgenPRLineItem.findByNoLimit", query = "SELECT n FROM NewgenPRLineItem n WHERE n.noLimit = :noLimit"),
    @NamedQuery(name = "NewgenPRLineItem.findByItemTextLineItem", query = "SELECT n FROM NewgenPRLineItem n WHERE n.itemTextLineItem = :itemTextLineItem"),
    @NamedQuery(name = "NewgenPRLineItem.findByItemNote", query = "SELECT n FROM NewgenPRLineItem n WHERE n.itemNote = :itemNote"),
    @NamedQuery(name = "NewgenPRLineItem.findByDeliveryText", query = "SELECT n FROM NewgenPRLineItem n WHERE n.deliveryText = :deliveryText"),
    @NamedQuery(name = "NewgenPRLineItem.findByMaterialPOText", query = "SELECT n FROM NewgenPRLineItem n WHERE n.materialPOText = :materialPOText"),
    @NamedQuery(name = "NewgenPRLineItem.findByPRNotetoApprover", query = "SELECT n FROM NewgenPRLineItem n WHERE n.pRNotetoApprover = :pRNotetoApprover"),
    @NamedQuery(name = "NewgenPRLineItem.findByMaterialLongText", query = "SELECT n FROM NewgenPRLineItem n WHERE n.materialLongText = :materialLongText"),
    @NamedQuery(name = "NewgenPRLineItem.findByRequsitionEmail", query = "SELECT n FROM NewgenPRLineItem n WHERE n.requsitionEmail = :requsitionEmail"),
    @NamedQuery(name = "NewgenPRLineItem.findByQuotationNumber", query = "SELECT n FROM NewgenPRLineItem n WHERE n.quotationNumber = :quotationNumber"),
    @NamedQuery(name = "NewgenPRLineItem.findByLinkId", query = "SELECT n FROM NewgenPRLineItem n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NewgenPRLineItem.findByDistribution", query = "SELECT n FROM NewgenPRLineItem n WHERE n.distribution = :distribution"),
    @NamedQuery(name = "NewgenPRLineItem.findByPartialInvoiceIndicator", query = "SELECT n FROM NewgenPRLineItem n WHERE n.partialInvoiceIndicator = :partialInvoiceIndicator"),
    @NamedQuery(name = "NewgenPRLineItem.findByMultipleId", query = "SELECT n FROM NewgenPRLineItem n WHERE n.insertionOrderId IN :ids"),
    @NamedQuery(name = "NewgenPRLineItem.findByBuyer", query = "SELECT n FROM NewgenPRLineItem n WHERE n.bpBuyerdetailsId.id = :id and n.bpQuantityRemaining != '0' and n.bpStatus != 'Rejected'"),
    @NamedQuery(name = "NewgenPRLineItem.findById", query = "SELECT n FROM NewgenPRLineItem n WHERE n.insertionOrderId = :id"),
    @NamedQuery(name = "NewgenPRLineItem.findByStatus", query = "SELECT n FROM NewgenPRLineItem n WHERE n.bpStatus = :status or n.bpStatus IS NULL order by n.bpAssigndate desc"),
    @NamedQuery(name = "NewgenPRLineItem.findByStatusAndBuyer", query = "SELECT n FROM NewgenPRLineItem n WHERE n.bpStatus = :status and n.bpBuyerdetailsId.id = :id and n.bpQuantityRemaining != '0' and n.rejectStatus is null and n.queryStatus is null"),
    @NamedQuery(name = "NewgenPRLineItem.findByRfqStatusAndBuyer", query = "SELECT n FROM NewgenPRLineItem n WHERE n.bpRfqStatus = :rfqstatus and n.bpBuyerdetailsId.id = :id"),
    @NamedQuery(name = "NewgenPRLineItem.findInitiatedPRByStatusAndBuyer", query = "SELECT n FROM NewgenPRLineItem n WHERE n.bpStatus = :status and n.bpBuyerdetailsId.id = :id and n.bpRfqStatus = 'Initiated'"),
    @NamedQuery(name = "NewgenPRLineItem.findByRejectStatus", query = "SELECT n FROM NewgenPRLineItem n WHERE n.rejectStatus = :rejectStatus"),
    @NamedQuery(name = "NewgenPRLineItem.findByQueryStatus", query = "SELECT n FROM NewgenPRLineItem n WHERE n.queryStatus = :queryStatus"),
    @NamedQuery(name = "NewgenPRLineItem.overDueRfqCreation", query = "SELECT n FROM NewgenPRLineItem n WHERE DATEDIFF(day,n.bpAssigndate,(:currentDate))=5")

})

public class NewgenPRLineItem implements Serializable {

    @Size(max = 100)
    @Column(name = "HeaderNote")
    private String HeaderNote;
    @Size(max = 100)
    @Column(name = "SourceList")
    private String SourceList;
    @Size(max = 100)
    @Column(name = "CountryOfOrigin")
    private String CountryOfOrigin;

    private static final long serialVersionUID = 1L;
    @JoinColumn(name = "BP_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails bpBuyerdetailsId;
    @Size(max = 20)
    @Column(name = "BP_status")
    private String bpStatus;
    @Size(max = 20)
    @Column(name = "BP_rfq_status")
    private String bpRfqStatus;
    @Size(max = 20)
    @Column(name = "BP_quantity_remaining")
    private String bpQuantityRemaining;
    @Column(name = "BP_assign_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bpAssigndate;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderId;
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
    private String quantity; // Changed to String from BigDecimal
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
    @Size(max = 50)
    @Column(name = "RequisitionerID")
    private String requisitionerID;
    @Size(max = 10)
    @Column(name = "TrackingNumber")
    private String trackingNumber;
    @Column(name = "QuantityUnit")
    private BigDecimal quantityUnit;
    @Column(name = "QuantityOrderedUnit")
    private String quantityOrderedUnit; // Changed to String from BigDecimal
    @Column(name = "OpenQuantity")
    private String openQuantity; // Changed to String from BigDecimal
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
    //Girivasu
    @Size(max = 20)
    @Column(name = "RejectStatus")
    private String rejectStatus;
    @Size(max = 20)
    @Column(name = "QueryStatus")
    private String queryStatus;
    @Size(max = 50)
    @Column(name = "OldMaterialCode")
    private String OldMaterialCode;
    @Size(max = 50)
    @Column(name = "UOMStore")
    private String UOMStore;
    @Column(name = "NoteToBuyer")
    private String NoteToBuyer;
    @Size(max = 50)
    @Column(name = "PR_Requestor")
    private String prRequestor;    
    @Size(max = 255)
    @Column(name = "TermsToSupplier")
    private String TermsToSupplier;
    @Column(name = "ReferenceDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date referenceDate;
    @Size(max = 100)
    @Column(name = "PR_RequestorEmail")
    private String prRequestorEmail;
    @Size(max = 10)
    @Column(name = "DeleteFlag")
    private String deleteFlag;
    @Size(max = 10)
    @Column(name = "BlockFlag")
    private String blockFlag;
    @Size(max = 20)
    @Column(name = "BP_TeamLeadId")
    private String bpTeamLeadId;
    
    public NewgenPRLineItem() {
    }

    public NewgenPRLineItem(Integer insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public Integer getInsertionOrderId() {
        return insertionOrderId;
    }

    public void setInsertionOrderId(Integer insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
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

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
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

    public String getQuantityOrderedUnit() {
        return quantityOrderedUnit;
    }

    public void setQuantityOrderedUnit(String quantityOrderedUnit) {
        this.quantityOrderedUnit = quantityOrderedUnit;
    }

    public String getOpenQuantity() {
        return openQuantity;
    }

    public void setOpenQuantity(String openQuantity) {
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

    public BuyerDetails getBpBuyerdetailsId() {
        return bpBuyerdetailsId;
    }

    public void setBpBuyerdetailsId(BuyerDetails bpBuyerdetailsId) {
        this.bpBuyerdetailsId = bpBuyerdetailsId;
    }

    public String getBpQuantityRemaining() {
        return bpQuantityRemaining;
    }

    public void setBpQuantityRemaining(String bpQuantityRemaining) {
        this.bpQuantityRemaining = bpQuantityRemaining;
    }

    public String getBpStatus() {
        return bpStatus;
    }

    public void setBpStatus(String bpStatus) {
        this.bpStatus = bpStatus;
    }

    public Date getBpAssigndate() {
        return bpAssigndate;
    }

    public void setBpAssigndate(Date bpAssigndate) {
        this.bpAssigndate = bpAssigndate;
    }

    public String getBpRfqStatus() {
        return bpRfqStatus;
    }

    public void setBpRfqStatus(String bpRfqStatus) {
        this.bpRfqStatus = bpRfqStatus;
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

    public String getSourceList() {
        return SourceList;
    }

    public void setSourceList(String SourceList) {
        this.SourceList = SourceList;
    }

    public String getCountryOfOrigin() {
        return CountryOfOrigin;
    }

    public void setCountryOfOrigin(String CountryOfOrigin) {
        this.CountryOfOrigin = CountryOfOrigin;
    }

    public String getHeaderNote() {
        return HeaderNote;
    }

    public void setHeaderNote(String HeaderNote) {
        this.HeaderNote = HeaderNote;
    }

    public String getOldMaterialCode() {
        return OldMaterialCode;
    }

    public void setOldMaterialCode(String OldMaterialCode) {
        this.OldMaterialCode = OldMaterialCode;
    }

    public String getUOMStore() {
        return UOMStore;
    }

    public void setUOMStore(String UOMStore) {
        this.UOMStore = UOMStore;
    }

    public String getNoteToBuyer() {
        return NoteToBuyer;
    }

    public void setNoteToBuyer(String NoteToBuyer) {
        this.NoteToBuyer = NoteToBuyer;
    }

    public String getPrRequestor() {
        return prRequestor;
    }

    public void setPrRequestor(String prRequestor) {
        this.prRequestor = prRequestor;
    }

    public String getTermsToSupplier() {
        return TermsToSupplier;
    }

    public void setTermsToSupplier(String TermsToSupplier) {
        this.TermsToSupplier = TermsToSupplier;
    }

    public Date getReferenceDate() {
        return referenceDate;
    }

    public void setReferenceDate(Date referenceDate) {
        this.referenceDate = referenceDate;
    }

    public String getPrRequestorEmail() {
        return prRequestorEmail;
    }

    public void setPrRequestorEmail(String prRequestorEmail) {
        this.prRequestorEmail = prRequestorEmail;
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

    public String getBpTeamLeadId() {
        return bpTeamLeadId;
    }

    public void setBpTeamLeadId(String bpTeamLeadId) {
        this.bpTeamLeadId = bpTeamLeadId;
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
        hash += (insertionOrderId != null ? insertionOrderId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NewgenPRLineItem)) {
            return false;
        }
        NewgenPRLineItem other = (NewgenPRLineItem) object;
        if ((this.insertionOrderId == null && other.insertionOrderId != null) || (this.insertionOrderId != null && !this.insertionOrderId.equals(other.insertionOrderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NewgenPRLineItem[ insertionOrderId=" + insertionOrderId + " ]";
    }
}
