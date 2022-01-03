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
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_PO_AccountAssignmentValues")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByInsertionOrderId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.insertionOrderId = :insertionOrderId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByDistribution", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.distribution = :distribution"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByQuantity", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByPercentage", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.percentage = :percentage"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByActivityNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.activityNumber = :activityNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByLinkNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.linkNumber = :linkNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.linkID = :linkID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByNetvalue", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.netvalue = :netvalue"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByCostCenter", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.costCenter = :costCenter"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByPRLinkID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.pRLinkID = :pRLinkID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByAccOrder", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.accOrder = :accOrder"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByAccAsset", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.accAsset = :accAsset"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByAccWBSElement", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.accWBSElement = :accWBSElement"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findBySalesOrder", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.salesOrder = :salesOrder"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByNetwork", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.network = :network"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByActivity", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.activity = :activity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByCoArea", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.coArea = :coArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByGLAccount", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.glAccount = :gLAccount"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByUnloadingPoint", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.unloadingPoint = :unloadingPoint"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByRecipient", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.recipient = :recipient"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByCommitmentItem", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByFund", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.fund = :fund"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByFundsCentre", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.fundsCentre = :fundsCentre"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByFunctionalArea", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.functionalArea = :functionalArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByDeliverySchedule", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.deliverySchedule = :deliverySchedule"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByLinkIdAndLineItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.linkID = :linkID and n.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByServiceLineItemNumberAndLineItemNumberAndPoId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.serviceLineItemNumber = :serviceLineItemNumber and n.lineItemNumber = :lineItemNumber and n.poId = :PoId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemPOAccountAssignmentValues.findByLinkIdAndServiceLineItemNumberAndPoId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemPOAccountAssignmentValues n WHERE n.linkID = :linkid and n.serviceLineItemNumber = :serviceLineItemNumber and n.poId = :PoId")})
public class NGBPCmplxPOCreationLineItemPOAccountAssignmentValues implements Serializable {
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
    @Column(name = "Distribution")
    private String distribution;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Column(name = "Percentage")
    private BigDecimal percentage;
    @Column(name = "NetPrice")
    private BigDecimal netPrice;
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
    @Column(name = "GlAccount")
    private String glAccount;
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
    
    @Size(max = 10)
    @Column(name = "ServiceLineItemNumber")
    private String serviceLineItemNumber;
    
    @Size(max = 10)
    @Column(name = "PoId")
    private String poId;
    
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    
    @Size(max = 5)
    @Column(name = "AccountAssignment")
    private String accountAssignment;
    
    @Column(name = "isDelete")
    boolean isDelete = false;
    
    @Size(max = 10)
    @Column(name = "SerialNumber")
    private String serialNumber;
    
//    @ManyToOne(fetch = FetchType.EAGER)
//    private NGBPCmplxPOCreationLineItemPO poCreationLineItemPO;
//
//    public NGBPCmplxPOCreationLineItemPO getPoCreationLineItemPO() {
//        return poCreationLineItemPO;
//    }
//
//    public void setPoCreationLineItemPO(NGBPCmplxPOCreationLineItemPO poCreationLineItemPO) {
//        this.poCreationLineItemPO = poCreationLineItemPO;
//    }

    public NGBPCmplxPOCreationLineItemPOAccountAssignmentValues() {
    }

    public NGBPCmplxPOCreationLineItemPOAccountAssignmentValues(Long insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public boolean isIsDelete() {
        return isDelete;
    }

    public void setIsDelete(boolean isDelete) {
        this.isDelete = isDelete;
    }
    

    public String getAccountAssignment() {
        return accountAssignment;
    }

    public void setAccountAssignment(String accountAssignment) {
        this.accountAssignment = accountAssignment;
    }

    public BigDecimal getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(BigDecimal netPrice) {
        this.netPrice = netPrice;
    }
    
    public String getServiceLineItemNumber() {
        return serviceLineItemNumber;
    }

    public void setServiceLineItemNumber(String serviceLineItemNumber) {
        this.serviceLineItemNumber = serviceLineItemNumber;
    }

    public String getPoId() {
        return poId;
    }

    public void setPoId(String poId) {
        this.poId = poId;
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

//    public String getGLAccount() {
//        return gLAccount;
//    }
//
//    public void setGLAccount(String gLAccount) {
//        this.gLAccount = gLAccount;
//    }
    public String getGlAccount() {
        return glAccount;
    }

    public void setGlAccount(String glAccount) {
        this.glAccount = glAccount;
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

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
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
        if (!(object instanceof NGBPCmplxPOCreationLineItemPOAccountAssignmentValues)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemPOAccountAssignmentValues other = (NGBPCmplxPOCreationLineItemPOAccountAssignmentValues) object;
        if ((this.insertionOrderId == null && other.insertionOrderId != null) || (this.insertionOrderId != null && !this.insertionOrderId.equals(other.insertionOrderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLineItemPOAccountAssignmentValues[ insertionOrderId=" + insertionOrderId + " ]";
    }
    
}
