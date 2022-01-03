/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_PO")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByAccountAssignment", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.accountAssignment = :accountAssignment"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByItemCategory", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.itemCategory = :itemCategory"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByCriticality", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.criticality = :criticality"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByShortText", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.shortText = :shortText"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByQuantity", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPriceUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.priceUnit = :priceUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByValPrice", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.valPrice = :valPrice"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByCurrency", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.currency = :currency"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByDeliveryDateCategory", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.deliveryDateCategory = :deliveryDateCategory"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByTotal", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.total = :total"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByRequisitionDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.requisitionDate = :requisitionDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByDeliveryDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.deliveryDate = :deliveryDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByMaterialGroup", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.materialGroup = :materialGroup"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPurchasingGroup", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.purchasingGroup = :purchasingGroup"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByStorageLocation", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.storageLocation = :storageLocation"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByRequisitionerID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.requisitionerID = :requisitionerID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByTrackingNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.trackingNumber = :trackingNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByQuantityUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.quantityUnit = :quantityUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByQuantityOrderedUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.quantityOrderedUnit = :quantityOrderedUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByOpenQuantity", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.openQuantity = :openQuantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByRequestDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.requestDate = :requestDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByReleaseDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.releaseDate = :releaseDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPlDelivTime", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.plDelivTime = :plDelivTime"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByGRProcTime", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.gRProcTime = :gRProcTime"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByClosed", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.closed = :closed"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByFixedID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.fixedID = :fixedID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByMaterialCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.materialCode = :materialCode"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByDescription", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.description = :description"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPlant", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.plant = :plant"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.unit = :unit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByProdStorageLocation", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.prodStorageLocation = :prodStorageLocation"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findBySupplyArea", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.supplyArea = :supplyArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByRequirementDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.requirementDate = :requirementDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByValuationPrice", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.valuationPrice = :valuationPrice"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByValuationCurrency", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.valuationCurrency = :valuationCurrency"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByValuationUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.valuationUnit = :valuationUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPromotion", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.promotion = :promotion"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByGoodsReceipt", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.goodsReceipt = :goodsReceipt"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByInvReceipt", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.invReceipt = :invReceipt"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByGRNonVal", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.gRNonVal = :gRNonVal"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByAgreementLineItem", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.agreementLineItem = :agreementLineItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByFixedVendor", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.fixedVendor = :fixedVendor"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByInfoRecord", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.infoRecord = :infoRecord"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByDesiredVendor", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.desiredVendor = :desiredVendor"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPurchasingOrganization", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.purchasingOrganization = :purchasingOrganization"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPOUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.pOUnit = :pOUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findBySupplyingPlant", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.supplyingPlant = :supplyingPlant"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByIssuingStorageLocation", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.issuingStorageLocation = :issuingStorageLocation"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByOverallLimit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.overallLimit = :overallLimit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByExpectedValue", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.expectedValue = :expectedValue"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByNoLimit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.noLimit = :noLimit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByItemTextLineItem", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.itemTextLineItem = :itemTextLineItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByItemNote", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.itemNote = :itemNote"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByDeliveryText", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.deliveryText = :deliveryText"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByMaterialPOText", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.materialPOText = :materialPOText"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPRNotetoApprover", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.pRNotetoApprover = :pRNotetoApprover"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByMaterialLongText", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.materialLongText = :materialLongText"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByRequsitionEmail", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.requsitionEmail = :requsitionEmail"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByQuotationNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.quotationNumber = :quotationNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByLinkId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByDistribution", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.distribution = :distribution"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPartialInvoiceIndicator", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.partialInvoiceIndicator = :partialInvoiceIndicator"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByBPassigndate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.bPassigndate = :bPassigndate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByBPquantityremaining", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.bPquantityremaining = :bPquantityremaining"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByBPrfqstatus", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.bPrfqstatus = :bPrfqstatus"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByBPstatus", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.bPstatus = :bPstatus"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByBPbuyerdetailsid", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.bPbuyerdetailsid = :bPbuyerdetailsid"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByRejectStatus", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.rejectStatus = :rejectStatus"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByQueryStatus", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.queryStatus = :queryStatus"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByReferenceDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.referenceDate = :referenceDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findBySourceList", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.sourceList = :sourceList"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByCountryofOrigin", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.countryofOrigin = :countryofOrigin"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByHeaderNote", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.headerNote = :headerNote"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByOldMaterialCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.oldMaterialCode = :oldMaterialCode"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByNoteToBuyer", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.noteToBuyer = :noteToBuyer"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByUOMStore", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.uOMStore = :uOMStore"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPORequestor", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.pORequestor = :pORequestor"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPORequestorEmail", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.pORequestorEmail = :pORequestorEmail"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByPRTrackingNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.pRTrackingNumber = :pRTrackingNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByHigherLevelItem", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.higherLevelItem = :higherLevelItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findBySubitemCategory", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.subitemCategory = :subitemCategory"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByBatch", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.batch = :batch"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByDeleteFlag", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.deleteFlag = :deleteFlag"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByBlockFlag", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.blockFlag = :blockFlag"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByNetPrice", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.netPrice = :netPrice"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByTaxCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.netPrice = :netPrice"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.findByItemId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.extPOCreation.id = :extPOCreation_Id and n.itemNumber = :ItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPO.getPOCreationLineItemById", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPO n WHERE n.extPOCreation.id = :id")})
public class NGBPCmplxPOCreationLineItemPO implements Serializable {

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
    @Size(max = 50)
    @Column(name = "Criticality")
    private String criticality;
    @Size(max = 60)
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
    @Size(max = 50)
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
    @Column(name = "GLCode")
    private String gLCode;
    @Size(max = 50)
    @Column(name = "ZGLCode")
    private String zGLCode;
    @Size(max = 100)
    @Column(name = "immaterial")
    private String immaterial;
    @Size(max = 100)
    @Column(name = "returns_item")
    private String returnsItem;
    @Size(max = 150)
    @Column(name = "free_of_charge")
    private String freeOfCharge;
    @Size(max = 30)
    @Column(name = "RFQ_No")
    private String rFQNo;
    @Size(max = 10)
    @Column(name = "RFQ_ItemNo")
    private String rFQItemNo;
    
    @Size(max = 5)
    @Column(name = "IsLineLevelDataSaved")
    private String isLineLevelDataSaved;
    @Size(max = 10)
    @Column(name = "PrOrderPriceUnit")
    private String prOrderPriceUnit;
    @Column(name = "PrNetPrice")
    private BigDecimal prNetPrice;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private NGBPExtPOCreation extPOCreation;

    @OneToOne(targetEntity = NGBPCmplxPOCreationQuantitiesWeights.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationQuantitiesWeights quanWeight;

    @OneToOne(targetEntity = NGBPCmplxPOCreationDelivery.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationDelivery invDel;

    @OneToOne(targetEntity = NGBPCmplxPOCreationTexts.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationTexts pOCreationText;

    @OneToOne(targetEntity = NGBPCmplxPOCreationLimits.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationLimits pOCreationLimits;

    @OneToOne(targetEntity = NGBPCmplxPOCreationDeliveryAddress.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationDeliveryAddress pOCreationDel;

    @OneToOne(targetEntity = NGBPCmplxPOCreationConfirmations.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationConfirmations pOCreationcon;

    @OneToOne(targetEntity = NGBPCmplxPOCreationConditionControl.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationConditionControl pOCreationcond;

//    @OneToOne(targetEntity = NGBPCmplxPOCreationHeaderText.class, cascade = CascadeType.ALL)
//    NGBPCmplxPOCreationHeaderText pOCreationHeaderText;

    @OneToOne(targetEntity = NGBPCmplxPOCreationLineItemCustomerData.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationLineItemCustomerData pOCreationCustomerData;

    @OneToOne(targetEntity = NGBPCmplxPOCreationInvoice.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationInvoice pOCreationInvoice;
    
    @OneToOne(targetEntity = NGBPCmplxPOCreationLineItemMaterialTab.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationLineItemMaterialTab pOCreationMaterial;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pOCreationLineItemPO_InsertionOrderID")
    private List<NGBPCmplxPOCreationLineItemService> poCreationLineItemServices;

    @Transient
    private List<NGBPCmplxPOCreationLineItemService> lineItemServices;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pOCreationLineItemPO_InsertionOrderID")
    private List<NGBPCmplxPOCreationLineItemPOAccountAssignment> pocreationLineItemAccountAssignment;

    @Transient
    private List<NGBPCmplxPOCreationLineItemPOAccountAssignment> lineItemAccountAssignment;

//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "pOCreationLineItemPO_InsertionOrderID")
//    private List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> pocreationServiceAccountAssignment;
//
//    @Transient
//    private List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> serviceAccountAssignment;

//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "pOCreationLineItemPO_InsertionOrderID")
//    private List<NGBPCmplxPOCreationLimitsAccountAssignment> pocreationLimitsAccountAssignment;
//
//    @Transient
//    private List<NGBPCmplxPOCreationLimitsAccountAssignment> limitsAccountAssignment;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pOCreationLineItemPO_InsertionOrderID")
    private List<NGBPCmplxPOCreationLineItemConditions> pocreationLineItemConditions;

    @Transient
    private List<NGBPCmplxPOCreationLineItemConditions> lineItemConditions;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pOCreationLineItemPO_InsertionOrderID")
    private List<NGBPCmplxPOCreationDelverySchedule> pocreationLineItemDeliverySchedule;

    @Transient
    private List<NGBPCmplxPOCreationDelverySchedule> lineItemDeliverySchedule;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pOCreationLineItemPO_InsertionOrderID")
    private List<NGBPCmplxPOCreationLineItemComponent> pocreationLineItemComponent;

    @Transient
    private List<NGBPCmplxPOCreationLineItemComponent> lineItemComponent;
    
    @Size(max = 10)
    @Column(name = "DeliveryDateByCategory")
    private String deliveryDateByCategory;
    
    public List<NGBPCmplxPOCreationLineItemComponent> getPocreationLineItemComponent() {
        return pocreationLineItemComponent;
    }

    public void setPocreationLineItemComponent(List<NGBPCmplxPOCreationLineItemComponent> pocreationLineItemComponent) {
        this.pocreationLineItemComponent = pocreationLineItemComponent;
    }

    public List<NGBPCmplxPOCreationLineItemComponent> getLineItemComponent() {
        return lineItemComponent;
    }

    public void setLineItemComponent(List<NGBPCmplxPOCreationLineItemComponent> lineItemComponent) {
        this.lineItemComponent = lineItemComponent;
    }
    
    public List<NGBPCmplxPOCreationDelverySchedule> getPocreationLineItemDeliverySchedule() {
        return pocreationLineItemDeliverySchedule;
    }

    public void setPocreationLineItemDeliverySchedule(List<NGBPCmplxPOCreationDelverySchedule> pocreationLineItemDeliverySchedule) {
        this.pocreationLineItemDeliverySchedule = pocreationLineItemDeliverySchedule;
    }

    public List<NGBPCmplxPOCreationDelverySchedule> getLineItemDeliverySchedule() {
        return lineItemDeliverySchedule;
    }

    public void setLineItemDeliverySchedule(List<NGBPCmplxPOCreationDelverySchedule> lineItemDeliverySchedule) {
        this.lineItemDeliverySchedule = lineItemDeliverySchedule;
    }

    public List<NGBPCmplxPOCreationLineItemConditions> getPocreationLineItemConditions() {
        return pocreationLineItemConditions;
    }

    public void setPocreationLineItemConditions(List<NGBPCmplxPOCreationLineItemConditions> pocreationLineItemConditions) {
        this.pocreationLineItemConditions = pocreationLineItemConditions;
    }

    public List<NGBPCmplxPOCreationLineItemConditions> getLineItemConditions() {
        return lineItemConditions;
    }

    public void setLineItemConditions(List<NGBPCmplxPOCreationLineItemConditions> lineItemConditions) {
        this.lineItemConditions = lineItemConditions;
    }
    

//    public List<NGBPCmplxPOCreationLimitsAccountAssignment> getPocreationLimitsAccountAssignment() {
//        return pocreationLimitsAccountAssignment;
//    }
//
//    public void setPocreationLimitsAccountAssignment(List<NGBPCmplxPOCreationLimitsAccountAssignment> pocreationLimitsAccountAssignment) {
//        this.pocreationLimitsAccountAssignment = pocreationLimitsAccountAssignment;
//    }
//
//    public List<NGBPCmplxPOCreationLimitsAccountAssignment> getLimitsAccountAssignment() {
//        return limitsAccountAssignment;
//    }
//
//    public void setLimitsAccountAssignment(List<NGBPCmplxPOCreationLimitsAccountAssignment> limitsAccountAssignment) {
//        this.limitsAccountAssignment = limitsAccountAssignment;
//    }

//    public List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getPocreationServiceAccountAssignment() {
//        return pocreationServiceAccountAssignment;
//    }
//
//    public void setPocreationServiceAccountAssignment(List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> pocreationServiceAccountAssignment) {
//        this.pocreationServiceAccountAssignment = pocreationServiceAccountAssignment;
//    }

//    public List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> getServiceAccountAssignment() {
//        return serviceAccountAssignment;
//    }
//
//    public void setServiceAccountAssignment(List<NGBPCmplxPOCreationLineItemPOAccountAssignmentValues> serviceAccountAssignment) {
//        this.serviceAccountAssignment = serviceAccountAssignment;
//    }

    public List<NGBPCmplxPOCreationLineItemPOAccountAssignment> getPocreationLineItemAccountAssignment() {
        return pocreationLineItemAccountAssignment;
    }

    public void setPocreationLineItemAccountAssignment(List<NGBPCmplxPOCreationLineItemPOAccountAssignment> pocreationLineItemAccountAssignment) {
        this.pocreationLineItemAccountAssignment = pocreationLineItemAccountAssignment;
    }

    public List<NGBPCmplxPOCreationLineItemPOAccountAssignment> getLineItemAccountAssignment() {
        return lineItemAccountAssignment;
    }

    public void setLineItemAccountAssignment(List<NGBPCmplxPOCreationLineItemPOAccountAssignment> lineItemAccountAssignment) {
        this.lineItemAccountAssignment = lineItemAccountAssignment;
    }

    public List<NGBPCmplxPOCreationLineItemService> getLineItemServices() {
        return lineItemServices;
    }

    public void setLineItemServices(List<NGBPCmplxPOCreationLineItemService> lineItemServices) {
        this.lineItemServices = lineItemServices;
    }

    public List<NGBPCmplxPOCreationLineItemService> getPoCreationLineItemServices() {
        return poCreationLineItemServices;
    }

    public void setPoCreationLineItemServices(List<NGBPCmplxPOCreationLineItemService> poCreationLineItemServices) {
        this.poCreationLineItemServices = poCreationLineItemServices;
    }

    public NGBPCmplxPOCreationDeliveryAddress getpOCreationDel() {
        return pOCreationDel;
    }

    public void setpOCreationDel(NGBPCmplxPOCreationDeliveryAddress pOCreationDel) {
        this.pOCreationDel = pOCreationDel;
    }

    public NGBPCmplxPOCreationConfirmations getpOCreationcon() {
        return pOCreationcon;
    }

    public void setpOCreationcon(NGBPCmplxPOCreationConfirmations pOCreationcon) {
        this.pOCreationcon = pOCreationcon;
    }

    public NGBPCmplxPOCreationConditionControl getpOCreationcond() {
        return pOCreationcond;
    }

    public void setpOCreationcond(NGBPCmplxPOCreationConditionControl pOCreationcond) {
        this.pOCreationcond = pOCreationcond;
    }

//    public NGBPCmplxPOCreationHeaderText getpOCreationHeaderText() {
//        return pOCreationHeaderText;
//    }
//
//    public void setpOCreationHeaderText(NGBPCmplxPOCreationHeaderText pOCreationHeaderText) {
//        this.pOCreationHeaderText = pOCreationHeaderText;
//    }

    public NGBPCmplxPOCreationLineItemCustomerData getpOCreationCustomerData() {
        return pOCreationCustomerData;
    }

    public void setpOCreationCustomerData(NGBPCmplxPOCreationLineItemCustomerData pOCreationCustomerData) {
        this.pOCreationCustomerData = pOCreationCustomerData;
    }

    public NGBPCmplxPOCreationTexts getpOCreationText() {
        return pOCreationText;
    }

    public void setpOCreationText(NGBPCmplxPOCreationTexts pOCreationText) {
        this.pOCreationText = pOCreationText;
    }

    public NGBPCmplxPOCreationLimits getpOCreationLimits() {
        return pOCreationLimits;
    }

    public void setpOCreationLimits(NGBPCmplxPOCreationLimits pOCreationLimits) {
        this.pOCreationLimits = pOCreationLimits;
    }

    public NGBPCmplxPOCreationDelivery getInvDel() {
        return invDel;
    }

    public void setInvDel(NGBPCmplxPOCreationDelivery invDel) {
        this.invDel = invDel;
    }

    public NGBPCmplxPOCreationQuantitiesWeights getQuanWeight() {
        return quanWeight;
    }

    public void setQuanWeight(NGBPCmplxPOCreationQuantitiesWeights quanWeight) {
        this.quanWeight = quanWeight;
    }

    public void setExtPOCreation(NGBPExtPOCreation extPOCreation) {
        this.extPOCreation = extPOCreation;
    }

    public NGBPCmplxPOCreationLineItemPO() {
    }

    public NGBPCmplxPOCreationLineItemPO(Long insertionOrderID) {
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

    public NGBPCmplxPOCreationInvoice getpOCreationInvoice() {
        return pOCreationInvoice;
    }

    public void setpOCreationInvoice(NGBPCmplxPOCreationInvoice pOCreationInvoice) {
        this.pOCreationInvoice = pOCreationInvoice;
    }

    public String getgLCode() {
        return gLCode;
    }

    public void setgLCode(String gLCode) {
        this.gLCode = gLCode;
    }

    public String getzGLCode() {
        return zGLCode;
    }

    public void setzGLCode(String zGLCode) {
        this.zGLCode = zGLCode;
    }
    
    public String getDeliveryDateByCategory() {
        return deliveryDateByCategory;
    }

    public void setDeliveryDateByCategory(String deliveryDateByCategory) {
        this.deliveryDateByCategory = deliveryDateByCategory;
    }

    public NGBPCmplxPOCreationLineItemMaterialTab getpOCreationMaterial() {
        return pOCreationMaterial;
    }

    public void setpOCreationMaterial(NGBPCmplxPOCreationLineItemMaterialTab pOCreationMaterial) {
        this.pOCreationMaterial = pOCreationMaterial;
    }

    public String getImmaterial() {
        return immaterial;
    }

    public void setImmaterial(String immaterial) {
        this.immaterial = immaterial;
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

    public String getrFQNo() {
        return rFQNo;
    }

    public void setrFQNo(String rFQNo) {
        this.rFQNo = rFQNo;
    }

    public String getrFQItemNo() {
        return rFQItemNo;
    }

    public void setrFQItemNo(String rFQItemNo) {
        this.rFQItemNo = rFQItemNo;
    }

    public String getIsLineLevelDataSaved() {
        return isLineLevelDataSaved;
    }

    public void setIsLineLevelDataSaved(String isLineLevelDataSaved) {
        this.isLineLevelDataSaved = isLineLevelDataSaved;
    }

    public String getPrOrderPriceUnit() {
        return prOrderPriceUnit;
    }

    public void setPrOrderPriceUnit(String prOrderPriceUnit) {
        this.prOrderPriceUnit = prOrderPriceUnit;
    }

    public BigDecimal getPrNetPrice() {
        return prNetPrice;
    }

    public void setPrNetPrice(BigDecimal prNetPrice) {
        this.prNetPrice = prNetPrice;
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
        if (!(object instanceof NGBPCmplxPOCreationLineItemPO)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemPO other = (NGBPCmplxPOCreationLineItemPO) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

//    @Override
//    public String toString() {
////        return "NGBPCmplxPOCreationLineItemPO{" + "procInstId=" + procInstId + ", insertionOrderID=" + insertionOrderID + ", itemNumber=" + itemNumber + ", accountAssignment=" + accountAssignment + ", itemCategory=" + itemCategory + ", criticality=" + criticality + ", shortText=" + shortText + ", quantity=" + quantity + ", priceUnit=" + priceUnit + ", valPrice=" + valPrice + ", currency=" + currency + ", deliveryDateCategory=" + deliveryDateCategory + ", total=" + total + ", requisitionDate=" + requisitionDate + ", deliveryDate=" + deliveryDate + ", materialGroup=" + materialGroup + ", purchasingGroup=" + purchasingGroup + ", storageLocation=" + storageLocation + ", requisitionerID=" + requisitionerID + ", trackingNumber=" + trackingNumber + ", quantityUnit=" + quantityUnit + ", quantityOrderedUnit=" + quantityOrderedUnit + ", openQuantity=" + openQuantity + ", requestDate=" + requestDate + ", releaseDate=" + releaseDate + ", plDelivTime=" + plDelivTime + ", gRProcTime=" + gRProcTime + ", closed=" + closed + ", fixedID=" + fixedID + ", materialCode=" + materialCode + ", description=" + description + ", plant=" + plant + ", unit=" + unit + ", prodStorageLocation=" + prodStorageLocation + ", supplyArea=" + supplyArea + ", requirementDate=" + requirementDate + ", valuationPrice=" + valuationPrice + ", valuationCurrency=" + valuationCurrency + ", valuationUnit=" + valuationUnit + ", promotion=" + promotion + ", goodsReceipt=" + goodsReceipt + ", invReceipt=" + invReceipt + ", gRNonVal=" + gRNonVal + ", agreementLineItem=" + agreementLineItem + ", fixedVendor=" + fixedVendor + ", infoRecord=" + infoRecord + ", desiredVendor=" + desiredVendor + ", purchasingOrganization=" + purchasingOrganization + ", pOUnit=" + pOUnit + ", supplyingPlant=" + supplyingPlant + ", issuingStorageLocation=" + issuingStorageLocation + ", overallLimit=" + overallLimit + ", expectedValue=" + expectedValue + ", noLimit=" + noLimit + ", itemTextLineItem=" + itemTextLineItem + ", itemNote=" + itemNote + ", deliveryText=" + deliveryText + ", materialPOText=" + materialPOText + ", pRNotetoApprover=" + pRNotetoApprover + ", materialLongText=" + materialLongText + ", requsitionEmail=" + requsitionEmail + ", quotationNumber=" + quotationNumber + ", linkId=" + linkId + ", distribution=" + distribution + ", partialInvoiceIndicator=" + partialInvoiceIndicator + ", bPassigndate=" + bPassigndate + ", bPquantityremaining=" + bPquantityremaining + ", bPrfqstatus=" + bPrfqstatus + ", bPstatus=" + bPstatus + ", bPbuyerdetailsid=" + bPbuyerdetailsid + ", rejectStatus=" + rejectStatus + ", queryStatus=" + queryStatus + ", referenceDate=" + referenceDate + ", sourceList=" + sourceList + ", countryofOrigin=" + countryofOrigin + ", headerNote=" + headerNote + ", oldMaterialCode=" + oldMaterialCode + ", noteToBuyer=" + noteToBuyer + ", uOMStore=" + uOMStore + ", pORequestor=" + pORequestor + ", pORequestorEmail=" + pORequestorEmail + ", pRTrackingNumber=" + pRTrackingNumber + ", higherLevelItem=" + higherLevelItem + ", subitemCategory=" + subitemCategory + ", batch=" + batch + ", deleteFlag=" + deleteFlag + ", blockFlag=" + blockFlag + ", netPrice=" + netPrice + ", taxCode=" + taxCode + ", extPOCreation=" + extPOCreation + ", quanWeight=" + quanWeight + ", invDel=" + invDel + ", pOCreationText=" + pOCreationText + ", pOCreationDel=" + pOCreationDel + ", pOCreationcon=" + pOCreationcon + ", pOCreationcond=" + pOCreationcond + ", pOCreationHeaderText=" + pOCreationHeaderText + ", pOCreationCustomerData=" + pOCreationCustomerData + ", pOCreationInvoice=" + pOCreationInvoice + ", pocreationLineItemServices=" + pocreationLineItemServices + ", lineItemServices=" + lineItemServices + ", pocreationLineItemAccountAssignment=" + pocreationLineItemAccountAssignment + ", lineItemAccountAssignment=" + lineItemAccountAssignment + ", pocreationServiceAccountAssignment=" + pocreationServiceAccountAssignment + ", serviceAccountAssignment=" + serviceAccountAssignment + '}';
//    }
}
