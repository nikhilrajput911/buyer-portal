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
 * @author admin
 */
@Entity
@Table(name = "NG_Cmplx_POCreation_LineItem_PO")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findAll", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByItemNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByAccountAssignment", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.accountAssignment = :accountAssignment"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByItemCategory", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.itemCategory = :itemCategory"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByCriticality", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.criticality = :criticality"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByShortText", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.shortText = :shortText"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByQuantity", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPriceUnit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.priceUnit = :priceUnit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByValPrice", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.valPrice = :valPrice"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByCurrency", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.currency = :currency"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByDeliveryDateCategory", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.deliveryDateCategory = :deliveryDateCategory"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByTotal", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.total = :total"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByRequisitionDate", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.requisitionDate = :requisitionDate"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByDeliveryDate", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.deliveryDate = :deliveryDate"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByMaterialGroup", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.materialGroup = :materialGroup"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPurchasingGroup", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.purchasingGroup = :purchasingGroup"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByStorageLocation", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.storageLocation = :storageLocation"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByRequisitionerID", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.requisitionerID = :requisitionerID"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByTrackingNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.trackingNumber = :trackingNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByQuantityUnit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.quantityUnit = :quantityUnit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByQuantityOrderedUnit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.quantityOrderedUnit = :quantityOrderedUnit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByOpenQuantity", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.openQuantity = :openQuantity"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByRequestDate", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.requestDate = :requestDate"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByReleaseDate", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.releaseDate = :releaseDate"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPlDelivTime", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.plDelivTime = :plDelivTime"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByGRProcTime", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.gRProcTime = :gRProcTime"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByClosed", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.closed = :closed"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByFixedID", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.fixedID = :fixedID"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByMaterialCode", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.materialCode = :materialCode"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByDescription", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.description = :description"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPlant", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.plant = :plant"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByUnit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.unit = :unit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByProdStorageLocation", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.prodStorageLocation = :prodStorageLocation"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findBySupplyArea", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.supplyArea = :supplyArea"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByRequirementDate", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.requirementDate = :requirementDate"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByValuationPrice", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.valuationPrice = :valuationPrice"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByValuationCurrency", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.valuationCurrency = :valuationCurrency"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByValuationUnit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.valuationUnit = :valuationUnit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPromotion", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.promotion = :promotion"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByGoodsReceipt", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.goodsReceipt = :goodsReceipt"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByInvReceipt", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.invReceipt = :invReceipt"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByGRNonVal", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.gRNonVal = :gRNonVal"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByAgreementLineItem", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.agreementLineItem = :agreementLineItem"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByFixedVendor", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.fixedVendor = :fixedVendor"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByInfoRecord", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.infoRecord = :infoRecord"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByDesiredVendor", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.desiredVendor = :desiredVendor"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPurchasingOrganization", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.purchasingOrganization = :purchasingOrganization"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPOUnit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.pOUnit = :pOUnit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findBySupplyingPlant", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.supplyingPlant = :supplyingPlant"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByIssuingStorageLocation", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.issuingStorageLocation = :issuingStorageLocation"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByOverallLimit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.overallLimit = :overallLimit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByExpectedValue", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.expectedValue = :expectedValue"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByNoLimit", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.noLimit = :noLimit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByItemTextLineItem", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.itemTextLineItem = :itemTextLineItem"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByItemNote", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.itemNote = :itemNote"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByDeliveryText", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.deliveryText = :deliveryText"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByMaterialPOText", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.materialPOText = :materialPOText"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPRNotetoApprover", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.pRNotetoApprover = :pRNotetoApprover"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByMaterialLongText", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.materialLongText = :materialLongText"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByRequsitionEmail", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.requsitionEmail = :requsitionEmail"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByQuotationNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.quotationNumber = :quotationNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByLinkId", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByDistribution", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.distribution = :distribution"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPartialInvoiceIndicator", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.partialInvoiceIndicator = :partialInvoiceIndicator"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByBPassigndate", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.bPassigndate = :bPassigndate"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByBPquantityremaining", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.bPquantityremaining = :bPquantityremaining"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByBPrfqstatus", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.bPrfqstatus = :bPrfqstatus"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByBPstatus", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.bPstatus = :bPstatus"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByBPbuyerdetailsid", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.bPbuyerdetailsid = :bPbuyerdetailsid"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByRejectStatus", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.rejectStatus = :rejectStatus"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByQueryStatus", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.queryStatus = :queryStatus"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByReferenceDate", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.referenceDate = :referenceDate"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findBySourceList", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.sourceList = :sourceList"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByCountryofOrigin", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.countryofOrigin = :countryofOrigin"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByHeaderNote", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.headerNote = :headerNote"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByOldMaterialCode", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.oldMaterialCode = :oldMaterialCode"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByNoteToBuyer", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.noteToBuyer = :noteToBuyer"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByUOMStore", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.uOMStore = :uOMStore"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPORequestor", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.pORequestor = :pORequestor"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPORequestorEmail", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.pORequestorEmail = :pORequestorEmail"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByPRTrackingNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.pRTrackingNumber = :pRTrackingNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByHigherLevelItem", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.higherLevelItem = :higherLevelItem"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findBySubitemCategory", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.subitemCategory = :subitemCategory"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByBatch", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.batch = :batch"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByDeleteFlag", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.deleteFlag = :deleteFlag"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByBlockFlag", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.blockFlag = :blockFlag"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByNetPrice", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.netPrice = :netPrice"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPO.findByTaxCode", query = "SELECT n FROM NGCmplxPOCreationLineItemPO n WHERE n.taxCode = :taxCode")})
public class NGCmplxPOCreationLineItemPO implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
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
    @Column(name = "DeliveryDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveryDate;
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
    @Size(max = 5)
    @Column(name = "PRItemNumber")
    private String PRItemNumber;
    @Size(max = 10)
    @Column(name = "PRNumber")
    private String PRNumber;
    @Size(max = 30)
    @Column(name = "RFQ_No")
    private String rfqNo;
    @Size(max = 10)
    @Column(name = "RFQ_ItemNo")
    private String rfqItemNo;

    public NGCmplxPOCreationLineItemPO() {
    }

    public NGCmplxPOCreationLineItemPO(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public Long getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Long insertionOrderID) {
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

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
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

    public String getPRItemNumber() {
        return PRItemNumber;
    }

    public void setPRItemNumber(String PRItemNumber) {
        this.PRItemNumber = PRItemNumber;
    }

    public String getPRNumber() {
        return PRNumber;
    }

    public void setPRNumber(String PRNumber) {
        this.PRNumber = PRNumber;
    }
    
    public String getRfqNo() {
        return rfqNo;
    }

    public void setRfqNo(String rfqNo) {
        this.rfqNo = rfqNo;
    }

    public String getRfqItemNo() {
        return rfqItemNo;
    }

    public void setRfqItemNo(String rfqItemNo) {
        this.rfqItemNo = rfqItemNo;
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
        if (!(object instanceof NGCmplxPOCreationLineItemPO)) {
            return false;
        }
        NGCmplxPOCreationLineItemPO other = (NGCmplxPOCreationLineItemPO) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationLineItemPO[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
