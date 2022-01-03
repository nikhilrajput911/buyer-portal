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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_Cmplx_PRToPO_LineItem_PR_AccountAssignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findAll", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByInsertionOrderId", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.insertionOrderId = :insertionOrderId"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByProcInstId", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.procInstId = :procInstId"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByAccountAssignmentCategory", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.accountAssignmentCategory = :accountAssignmentCategory"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByDistribution", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.distribution = :distribution"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByPartialInvoiceIndicator", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.partialInvoiceIndicator = :partialInvoiceIndicator"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByCoCode", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.coCode = :coCode"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByUnloadingPoint", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.unloadingPoint = :unloadingPoint"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByRecipient", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.recipient = :recipient"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByGLAccount", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.gLAccount = :gLAccount"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByCOArea", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.cOArea = :cOArea"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByCostCenter", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.costCenter = :costCenter"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByAccOrder", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.accOrder = :accOrder"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByAsset", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.asset = :asset"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByWBSElement", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.wBSElement = :wBSElement"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findBySalesOrder", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.salesOrder = :salesOrder"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByItemNumber", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.itemNumber = :itemNumber"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByDeliverySchedule", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.deliverySchedule = :deliverySchedule"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByQuantity", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.quantity = :quantity"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByPercentage", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.percentage = :percentage"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByFund", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.fund = :fund"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByFunctionalArea", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.functionalArea = :functionalArea"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByFundsCentre", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.fundsCentre = :fundsCentre"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByCommitmentItem", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByNetwork", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.network = :network"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByActivityNumber", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.activityNumber = :activityNumber"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByLinkID", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.linkID = :linkID"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByPRLinkID", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.pRLinkID = :pRLinkID"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignment.findByLinkNumber", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignment c WHERE c.linkNumber = :linkNumber")})
public class CmplxPRToPOLineItemPRAccountAssignment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderId")
    private Long insertionOrderId;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Size(max = 50)
    @Column(name = "AccountAssignmentCategory")
    private String accountAssignmentCategory;
    @Size(max = 50)
    @Column(name = "Distribution")
    private String distribution;
    @Size(max = 50)
    @Column(name = "PartialInvoiceIndicator")
    private String partialInvoiceIndicator;
    @Size(max = 50)
    @Column(name = "CoCode")
    private String coCode;
    @Size(max = 50)
    @Column(name = "UnloadingPoint")
    private String unloadingPoint;
    @Size(max = 50)
    @Column(name = "Recipient")
    private String recipient;
    @Size(max = 50)
    @Column(name = "GLAccount")
    private String gLAccount;
    @Size(max = 50)
    @Column(name = "COArea")
    private String cOArea;
    @Size(max = 50)
    @Column(name = "CostCenter")
    private String costCenter;
    @Size(max = 50)
    @Column(name = "AccOrder")
    private String accOrder;
    @Size(max = 50)
    @Column(name = "Asset")
    private String asset;
    @Size(max = 50)
    @Column(name = "WBSElement")
    private String wBSElement;
    @Size(max = 50)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 50)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 50)
    @Column(name = "DeliverySchedule")
    private String deliverySchedule;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Column(name = "Percentage")
    private BigDecimal percentage;
    @Size(max = 50)
    @Column(name = "Fund")
    private String fund;
    @Size(max = 50)
    @Column(name = "FunctionalArea")
    private String functionalArea;
    @Size(max = 50)
    @Column(name = "FundsCentre")
    private String fundsCentre;
    @Size(max = 50)
    @Column(name = "CommitmentItem")
    private String commitmentItem;
    @Size(max = 50)
    @Column(name = "Network")
    private String network;
    @Size(max = 50)
    @Column(name = "ActivityNumber")
    private String activityNumber;
    @Size(max = 50)
    @Column(name = "LinkID")
    private String linkID;
    @Size(max = 50)
    @Column(name = "PRLinkID")
    private String pRLinkID;
    @Size(max = 50)
    @Column(name = "LinkNumber")
    private String linkNumber;

    public CmplxPRToPOLineItemPRAccountAssignment() {
    }

    public CmplxPRToPOLineItemPRAccountAssignment(Long insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public Long getInsertionOrderId() {
        return insertionOrderId;
    }

    public void setInsertionOrderId(Long insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public String getAccountAssignmentCategory() {
        return accountAssignmentCategory;
    }

    public void setAccountAssignmentCategory(String accountAssignmentCategory) {
        this.accountAssignmentCategory = accountAssignmentCategory;
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

    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
    }

    public String getUnloadingPoint() {
        return unloadingPoint;
    }

    public void setUnloadingPoint(String unloadingPoint) {
        this.unloadingPoint = unloadingPoint;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getGLAccount() {
        return gLAccount;
    }

    public void setGLAccount(String gLAccount) {
        this.gLAccount = gLAccount;
    }

    public String getCOArea() {
        return cOArea;
    }

    public void setCOArea(String cOArea) {
        this.cOArea = cOArea;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public String getAccOrder() {
        return accOrder;
    }

    public void setAccOrder(String accOrder) {
        this.accOrder = accOrder;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getWBSElement() {
        return wBSElement;
    }

    public void setWBSElement(String wBSElement) {
        this.wBSElement = wBSElement;
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

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }

    public String getFund() {
        return fund;
    }

    public void setFund(String fund) {
        this.fund = fund;
    }

    public String getFunctionalArea() {
        return functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
    }

    public String getFundsCentre() {
        return fundsCentre;
    }

    public void setFundsCentre(String fundsCentre) {
        this.fundsCentre = fundsCentre;
    }

    public String getCommitmentItem() {
        return commitmentItem;
    }

    public void setCommitmentItem(String commitmentItem) {
        this.commitmentItem = commitmentItem;
    }

    public String getNetwork() {
        return network;
    }

    public void setNetwork(String network) {
        this.network = network;
    }

    public String getActivityNumber() {
        return activityNumber;
    }

    public void setActivityNumber(String activityNumber) {
        this.activityNumber = activityNumber;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public String getPRLinkID() {
        return pRLinkID;
    }

    public void setPRLinkID(String pRLinkID) {
        this.pRLinkID = pRLinkID;
    }

    public String getLinkNumber() {
        return linkNumber;
    }

    public void setLinkNumber(String linkNumber) {
        this.linkNumber = linkNumber;
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
        if (!(object instanceof CmplxPRToPOLineItemPRAccountAssignment)) {
            return false;
        }
        CmplxPRToPOLineItemPRAccountAssignment other = (CmplxPRToPOLineItemPRAccountAssignment) object;
        if ((this.insertionOrderId == null && other.insertionOrderId != null) || (this.insertionOrderId != null && !this.insertionOrderId.equals(other.insertionOrderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPRToPOLineItemPRAccountAssignment[ insertionOrderId=" + insertionOrderId + " ]";
    }
    
}
