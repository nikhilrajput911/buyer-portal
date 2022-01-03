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
@Table(name = "NG_Cmplx_POCreation_LineItem_PO_AccountAssignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findAll", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByInsertionOrderId", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.insertionOrderId = :insertionOrderId"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByAccountAssignmentCategory", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.accountAssignmentCategory = :accountAssignmentCategory"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByDistribution", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.distribution = :distribution"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByPartialInvoiceIndicator", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.partialInvoiceIndicator = :partialInvoiceIndicator"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByCoCode", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.coCode = :coCode"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByUnloadingPoint", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.unloadingPoint = :unloadingPoint"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByRecipient", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.recipient = :recipient"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByGLAccount", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.gLAccount = :gLAccount"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByCOArea", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.cOArea = :cOArea"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByCostCenter", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.costCenter = :costCenter"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByAccOrder", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.accOrder = :accOrder"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByAsset", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.asset = :asset"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByWBSElement", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.wBSElement = :wBSElement"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findBySalesOrder", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.salesOrder = :salesOrder"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByItemNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByDeliverySchedule", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.deliverySchedule = :deliverySchedule"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByQuantity", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByPercentage", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.percentage = :percentage"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByFund", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.fund = :fund"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByFunctionalArea", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.functionalArea = :functionalArea"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByFundsCentre", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.fundsCentre = :fundsCentre"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByCommitmentItem", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByNetwork", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.network = :network"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByActivityNumber", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.activityNumber = :activityNumber"),
    @NamedQuery(name = "NGCmplxPOCreationLineItemPOAccountAssignment.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationLineItemPOAccountAssignment n WHERE n.linkID = :linkID")})
public class NGCmplxPOCreationLineItemPOAccountAssignment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public NGCmplxPOCreationLineItemPOAccountAssignment() {
    }

    public NGCmplxPOCreationLineItemPOAccountAssignment(Long insertionOrderId) {
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderId != null ? insertionOrderId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGCmplxPOCreationLineItemPOAccountAssignment)) {
            return false;
        }
        NGCmplxPOCreationLineItemPOAccountAssignment other = (NGCmplxPOCreationLineItemPOAccountAssignment) object;
        if ((this.insertionOrderId == null && other.insertionOrderId != null) || (this.insertionOrderId != null && !this.insertionOrderId.equals(other.insertionOrderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationLineItemPOAccountAssignment[ insertionOrderId=" + insertionOrderId + " ]";
    }
    
}
