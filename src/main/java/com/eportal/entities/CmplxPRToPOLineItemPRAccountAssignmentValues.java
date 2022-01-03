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
@Table(name = "NG_Cmplx_PRToPO_LineItem_PR_AccountAssignmentValues")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findAll", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByInsertionOrderId", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.insertionOrderId = :insertionOrderId"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByProcInstId", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.procInstId = :procInstId"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByDistribution", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.distribution = :distribution"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByQuantity", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.quantity = :quantity"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByPercentage", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.percentage = :percentage"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByActivityNumber", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.activityNumber = :activityNumber"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByLinkNumber", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.linkNumber = :linkNumber"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByLinkID", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.linkID = :linkID"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByNetvalue", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.netvalue = :netvalue"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByCostCenter", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.costCenter = :costCenter"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByPRLinkID", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.pRLinkID = :pRLinkID"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByAccOrder", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.accOrder = :accOrder"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByAccAsset", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.accAsset = :accAsset"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByAccWBSElement", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.accWBSElement = :accWBSElement"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findBySalesOrder", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.salesOrder = :salesOrder"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByNetwork", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.network = :network"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByActivity", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.activity = :activity"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByCoArea", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.coArea = :coArea"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByGLAccount", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.gLAccount = :gLAccount"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByUnloadingPoint", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.unloadingPoint = :unloadingPoint"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByRecipient", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.recipient = :recipient"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByCommitmentItem", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByFund", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.fund = :fund"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByFundsCentre", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.fundsCentre = :fundsCentre"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByFunctionalArea", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.functionalArea = :functionalArea"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByItemNumber", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.itemNumber = :itemNumber"),
    @NamedQuery(name = "CmplxPRToPOLineItemPRAccountAssignmentValues.findByDeliverySchedule", query = "SELECT c FROM CmplxPRToPOLineItemPRAccountAssignmentValues c WHERE c.deliverySchedule = :deliverySchedule")})
public class CmplxPRToPOLineItemPRAccountAssignmentValues implements Serializable {
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
    @Column(name = "Distribution")
    private String distribution;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Column(name = "Percentage")
    private BigDecimal percentage;
    @Size(max = 50)
    @Column(name = "ActivityNumber")
    private String activityNumber;
    @Size(max = 50)
    @Column(name = "LinkNumber")
    private String linkNumber;
    @Size(max = 50)
    @Column(name = "LinkID")
    private String linkID;
    @Column(name = "NETVALUE")
    private BigDecimal netvalue;
    @Size(max = 50)
    @Column(name = "CostCenter")
    private String costCenter;
    @Size(max = 50)
    @Column(name = "PRLinkID")
    private String pRLinkID;
    @Size(max = 50)
    @Column(name = "Acc_Order")
    private String accOrder;
    @Size(max = 50)
    @Column(name = "Acc_Asset")
    private String accAsset;
    @Size(max = 50)
    @Column(name = "Acc_WBSElement")
    private String accWBSElement;
    @Size(max = 50)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 50)
    @Column(name = "Network")
    private String network;
    @Size(max = 50)
    @Column(name = "Activity")
    private String activity;
    @Size(max = 50)
    @Column(name = "CoArea")
    private String coArea;
    @Size(max = 50)
    @Column(name = "GLAccount")
    private String gLAccount;
    @Size(max = 50)
    @Column(name = "UnloadingPoint")
    private String unloadingPoint;
    @Size(max = 50)
    @Column(name = "Recipient")
    private String recipient;
    @Size(max = 50)
    @Column(name = "CommitmentItem")
    private String commitmentItem;
    @Size(max = 50)
    @Column(name = "Fund")
    private String fund;
    @Size(max = 50)
    @Column(name = "FundsCentre")
    private String fundsCentre;
    @Size(max = 50)
    @Column(name = "FunctionalArea")
    private String functionalArea;
    @Size(max = 50)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 50)
    @Column(name = "DeliverySchedule")
    private String deliverySchedule;
    
    @Size(max = 30)
    @Column(name = "PoId")
    private String poId;
    
    @Size(max = 30)
    @Column(name = "PoItemNumber")
    private String poItemNumber;
    
    @Size(max = 30)
    @Column(name = "ServiceLineItemNumber")
    private String serviceLineItemNumber;

    @Size(max = 10)
    @Column(name = "SrNo")
    private String srNo;
    
    @Size(max = 10)
    @Column(name = "type")
    private String type;
    
    public String getPoId() {
        return poId;
    }

    public void setPoId(String poId) {
        this.poId = poId;
    }

    public String getPoItemNumber() {
        return poItemNumber;
    }

    public void setPoItemNumber(String poItemNumber) {
        this.poItemNumber = poItemNumber;
    }

    public String getServiceLineItemNumber() {
        return serviceLineItemNumber;
    }

    public void setServiceLineItemNumber(String serviceLineItemNumber) {
        this.serviceLineItemNumber = serviceLineItemNumber;
    }
    

    public CmplxPRToPOLineItemPRAccountAssignmentValues() {
    }

    public CmplxPRToPOLineItemPRAccountAssignmentValues(Long insertionOrderId) {
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

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
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

    public String getActivityNumber() {
        return activityNumber;
    }

    public void setActivityNumber(String activityNumber) {
        this.activityNumber = activityNumber;
    }

    public String getLinkNumber() {
        return linkNumber;
    }

    public void setLinkNumber(String linkNumber) {
        this.linkNumber = linkNumber;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public BigDecimal getNetvalue() {
        return netvalue;
    }

    public void setNetvalue(BigDecimal netvalue) {
        this.netvalue = netvalue;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public String getPRLinkID() {
        return pRLinkID;
    }

    public void setPRLinkID(String pRLinkID) {
        this.pRLinkID = pRLinkID;
    }

    public String getAccOrder() {
        return accOrder;
    }

    public void setAccOrder(String accOrder) {
        this.accOrder = accOrder;
    }

    public String getAccAsset() {
        return accAsset;
    }

    public void setAccAsset(String accAsset) {
        this.accAsset = accAsset;
    }

    public String getAccWBSElement() {
        return accWBSElement;
    }

    public void setAccWBSElement(String accWBSElement) {
        this.accWBSElement = accWBSElement;
    }

    public String getSalesOrder() {
        return salesOrder;
    }

    public void setSalesOrder(String salesOrder) {
        this.salesOrder = salesOrder;
    }

    public String getNetwork() {
        return network;
    }

    public void setNetwork(String network) {
        this.network = network;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getCoArea() {
        return coArea;
    }

    public void setCoArea(String coArea) {
        this.coArea = coArea;
    }

    public String getGLAccount() {
        return gLAccount;
    }

    public void setGLAccount(String gLAccount) {
        this.gLAccount = gLAccount;
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

    public String getFundsCentre() {
        return fundsCentre;
    }

    public void setFundsCentre(String fundsCentre) {
        this.fundsCentre = fundsCentre;
    }

    public String getFunctionalArea() {
        return functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
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

    public String getSrNo() {
        return srNo;
    }

    public void setSrNo(String srNo) {
        this.srNo = srNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
        if (!(object instanceof CmplxPRToPOLineItemPRAccountAssignmentValues)) {
            return false;
        }
        CmplxPRToPOLineItemPRAccountAssignmentValues other = (CmplxPRToPOLineItemPRAccountAssignmentValues) object;
        if ((this.insertionOrderId == null && other.insertionOrderId != null) || (this.insertionOrderId != null && !this.insertionOrderId.equals(other.insertionOrderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPRToPOLineItemPRAccountAssignmentValues[ insertionOrderId=" + insertionOrderId + " ]";
    }
    
}
