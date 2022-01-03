/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "NG_Cmplx_POCreation_LineItem_Service")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findAll", query = "SELECT n FROM NGCmplxPOCreationLineItemService n"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByLineItemNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByServiceNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.serviceNumber = :serviceNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByShortText", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.shortText = :shortText"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByQuantity", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByUnit", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.unit = :unit"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByGrossPrice", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.grossPrice = :grossPrice"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByCurrency", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.currency = :currency"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByNetPrice", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.netPrice = :netPrice"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByEdition", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.edition = :edition"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByLineItemLongText", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.lineItemLongText = :lineItemLongText"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByOverfTolerance", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.overfTolerance = :overfTolerance"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByCostCentre", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.costCentre = :costCentre"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByGLCode", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.gLCode = :gLCode"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByCommitmentItem", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByFund", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.fund = :fund"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByFundCenter", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.fundCenter = :fundCenter"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByFunctionalArea", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.functionalArea = :functionalArea"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByServiceLongText", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.serviceLongText = :serviceLongText"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByLinkId", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemService.findByServiceLinkID", query = "SELECT n FROM NGCmplxPOCreationLineItemService n WHERE n.serviceLinkID = :serviceLinkID")})
public class NGCmplxPOCreationLineItemService implements Serializable {
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
    @Size(max = 40)
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
    @Size(max = 4000)
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

    public NGCmplxPOCreationLineItemService() {
    }

    public NGCmplxPOCreationLineItemService(Long insertionOrderID) {
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGCmplxPOCreationLineItemService)) {
            return false;
        }
        NGCmplxPOCreationLineItemService other = (NGCmplxPOCreationLineItemService) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationLineItemService[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
