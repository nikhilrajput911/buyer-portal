/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_Service")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByLineItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByServiceNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.serviceNumber = :serviceNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByShortText", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.shortText = :shortText"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByQuantity", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.unit = :unit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByGrossPrice", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.grossPrice = :grossPrice"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByCurrency", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.currency = :currency"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByNetPrice", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.netPrice = :netPrice"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByEdition", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.edition = :edition"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByLineItemLongText", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.lineItemLongText = :lineItemLongText"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByOverfTolerance", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.overfTolerance = :overfTolerance"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByCostCentre", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.costCentre = :costCentre"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByGLCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.gLCode = :gLCode"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByCommitmentItem", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByFund", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.fund = :fund"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByFundCenter", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.fundCenter = :fundCenter"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByFunctionalArea", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.functionalArea = :functionalArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByServiceLongText", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.serviceLongText = :serviceLongText"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByLinkId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemService.findByServiceLinkID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemService n WHERE n.serviceLinkID = :serviceLinkID")})
public class NGBPCmplxPOCreationLineItemService implements Serializable {

    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 10)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 18)
    @Column(name = "ServiceNumber")
    private String serviceNumber;
    @Column(name = "ShortText")
    private String shortText;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Size(max = 3)
    @Column(name = "Unit")
    private String unit;
    @Column(name = "GrossPrice")
    private BigDecimal grossPrice;
    @Size(max = 4)
    @Column(name = "Currency")
    private String currency;
    @Column(name = "NetPrice")
    private BigDecimal netPrice;
    @Size(max = 4)
    @Column(name = "Edition")
    private String edition;
    @Column(name = "LineItemLongText")
    private String lineItemLongText;
    @Size(max = 10)
    @Column(name = "OverfTolerance")
    private String overfTolerance;
    @Size(max = 10)
    @Column(name = "CostCentre")
    private String costCentre;
    @Size(max = 10)
    @Column(name = "GLCode")
    private String gLCode;
    @Size(max = 4)
    @Column(name = "CommitmentItem")
    private String commitmentItem;
    @Size(max = 10)
    @Column(name = "Fund")
    private String fund;
    @Size(max = 16)
    @Column(name = "FundCenter")
    private String fundCenter;
    @Size(max = 16)
    @Column(name = "FunctionalArea")
    private String functionalArea;
    @Size(max = 4000)
    @Column(name = "ServiceLongText")
    private String serviceLongText;
    @Size(max = 50)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 60)
    @Column(name = "ServiceLinkID")
    private String serviceLinkID;
    @Size(max = 5)
    @Column(name = "Distribution")
    private String distribution;

    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    
    @Size(max = 10)
    @Column(name = "IsAccountAssignmentSaved")
    private String isAccountAssignmentSaved;
    @Size(max = 10)
    @Column(name = "IsProfitabilitySegmentSaved")
    private String isProfitabilitySegmentSaved;
    
    @Column(name = "NetValue")
    private BigDecimal netValue;
    @Column(name = "ActualQuantity")
    private BigDecimal actualQuantity;
    @Column(name = "ServiceText")
    private String serviceText;
    @Size(max = 5000)
    @Column(name = "LineText")
    private String lineText;
    @Size(max = 20)
    @Column(name = "ServicesLongTextId")
    private String servicesLongTextId;
	
//    @JsonIgnore
//    @ManyToOne(cascade = {CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    
//    @ManyToOne(fetch = FetchType.EAGER)
//    private NGBPCmplxPOCreationLineItemPO pOCreationLineItemPO;
//
//    public NGBPCmplxPOCreationLineItemPO getpOCreationLineItemPO() {
//        return pOCreationLineItemPO;
//    }
//
//    public void setpOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO pOCreationLineItemPO) {
//        this.pOCreationLineItemPO = pOCreationLineItemPO;
//    }
    
    @ManyToOne(fetch = FetchType.EAGER)
    private NGBPCmplxPOCreationLineItemPO poCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getPoCreationLineItemPO() {
        return poCreationLineItemPO;
    }

    public void setPoCreationLineItemPO(NGBPCmplxPOCreationLineItemPO poCreationLineItemPO) {
        this.poCreationLineItemPO = poCreationLineItemPO;
    }

    

    public NGBPCmplxPOCreationLineItemService() {
    }

    public NGBPCmplxPOCreationLineItemService(Long insertionOrderID) {
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

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getServiceNumber() {
        return serviceNumber;
    }

    public void setServiceNumber(String serviceNumber) {
        this.serviceNumber = serviceNumber;
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

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getGrossPrice() {
        return grossPrice;
    }

    public void setGrossPrice(BigDecimal grossPrice) {
        this.grossPrice = grossPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(BigDecimal netPrice) {
        this.netPrice = netPrice;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getLineItemLongText() {
        return lineItemLongText;
    }

    public void setLineItemLongText(String lineItemLongText) {
        this.lineItemLongText = lineItemLongText;
    }

    public String getOverfTolerance() {
        return overfTolerance;
    }

    public void setOverfTolerance(String overfTolerance) {
        this.overfTolerance = overfTolerance;
    }

    public String getCostCentre() {
        return costCentre;
    }

    public void setCostCentre(String costCentre) {
        this.costCentre = costCentre;
    }

    public String getGLCode() {
        return gLCode;
    }

    public void setGLCode(String gLCode) {
        this.gLCode = gLCode;
    }

    public String getCommitmentItem() {
        return commitmentItem;
    }

    public void setCommitmentItem(String commitmentItem) {
        this.commitmentItem = commitmentItem;
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

    public String getFunctionalArea() {
        return functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
    }

    public String getServiceLongText() {
        return serviceLongText;
    }

    public void setServiceLongText(String serviceLongText) {
        this.serviceLongText = serviceLongText;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getServiceLinkID() {
        return serviceLinkID;
    }

    public void setServiceLinkID(String serviceLinkID) {
        this.serviceLinkID = serviceLinkID;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getIsAccountAssignmentSaved() {
        return isAccountAssignmentSaved;
    }

    public void setIsAccountAssignmentSaved(String isAccountAssignmentSaved) {
        this.isAccountAssignmentSaved = isAccountAssignmentSaved;
    }

    public String getIsProfitabilitySegmentSaved() {
        return isProfitabilitySegmentSaved;
    }

    public void setIsProfitabilitySegmentSaved(String isProfitabilitySegmentSaved) {
        this.isProfitabilitySegmentSaved = isProfitabilitySegmentSaved;
    }

    public BigDecimal getNetValue() {
        return netValue;
    }

    public void setNetValue(BigDecimal netValue) {
        this.netValue = netValue;
    }

    public BigDecimal getActualQuantity() {
        return actualQuantity;
    }

    public void setActualQuantity(BigDecimal actualQuantity) {
        this.actualQuantity = actualQuantity;
    }

    public String getServiceText() {
        return serviceText;
    }

    public void setServiceText(String serviceText) {
        this.serviceText = serviceText;
    }

    public String getLineText() {
        return lineText;
    }

    public void setLineText(String lineText) {
        this.lineText = lineText;
    }
    
    public String getServicesLongTextId() {
        return servicesLongTextId;
    }

    public void setServicesLongTextId(String servicesLongTextId) {
        this.servicesLongTextId = servicesLongTextId;
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
        if (!(object instanceof NGBPCmplxPOCreationLineItemService)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemService other = (NGBPCmplxPOCreationLineItemService) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }
    
    
    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLineItemService[ currency=" + currency + " ]";
    }

}
