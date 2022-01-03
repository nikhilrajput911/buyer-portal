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
@Table(name = "NG_Cmplx_PRToPO_LineItem_Service")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPRToPOLineItemService.findAll", query = "SELECT c FROM CmplxPRToPOLineItemService c"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByProcInstId", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.procInstId = :procInstId"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByInsertionOrderID", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByLineItemNumber", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByServiceNumber", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.serviceNumber = :serviceNumber"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByShortText", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.shortText = :shortText"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByQuantity", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.quantity = :quantity"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByUnit", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.unit = :unit"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByGrossPrice", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.grossPrice = :grossPrice"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByCurrency", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.currency = :currency"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByNetPrice", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.netPrice = :netPrice"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByEdition", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.edition = :edition"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByLineItemLongText", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.lineItemLongText = :lineItemLongText"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByOverfTolerance", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.overfTolerance = :overfTolerance"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByCostCentre", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.costCentre = :costCentre"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByGLCode", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.gLCode = :gLCode"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByCommitmentItem", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByFund", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.fund = :fund"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByFundCenter", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.fundCenter = :fundCenter"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByFunctionalArea", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.functionalArea = :functionalArea"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByServiceLongText", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.serviceLongText = :serviceLongText"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByLinkId", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.linkId = :linkId"),
    @NamedQuery(name = "CmplxPRToPOLineItemService.findByServiceLinkID", query = "SELECT c FROM CmplxPRToPOLineItemService c WHERE c.serviceLinkID = :serviceLinkID")})
public class CmplxPRToPOLineItemService implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
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
    @Size(max = 16)
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

    public CmplxPRToPOLineItemService() {
    }

    public CmplxPRToPOLineItemService(Integer insertionOrderID) {
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
        if (!(object instanceof CmplxPRToPOLineItemService)) {
            return false;
        }
        CmplxPRToPOLineItemService other = (CmplxPRToPOLineItemService) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPRToPOLineItemService[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
