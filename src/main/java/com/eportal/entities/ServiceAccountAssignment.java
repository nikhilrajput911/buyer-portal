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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Service_AccountAssignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ServiceAccountAssignment.findAll", query = "SELECT s FROM ServiceAccountAssignment s"),
    @NamedQuery(name = "ServiceAccountAssignment.findById", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.id = :id"),
    @NamedQuery(name = "ServiceAccountAssignment.findByQuantity", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.quantity = :quantity"),
    @NamedQuery(name = "ServiceAccountAssignment.findByGLAccount", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.gLAccount = :gLAccount"),
    @NamedQuery(name = "ServiceAccountAssignment.findByCOArea", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.cOArea = :cOArea"),
    @NamedQuery(name = "ServiceAccountAssignment.findByCostCenter", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.costCenter = :costCenter"),
    @NamedQuery(name = "ServiceAccountAssignment.findByFund", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.fund = :fund"),
    @NamedQuery(name = "ServiceAccountAssignment.findByFunctionalArea", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.functionalArea = :functionalArea"),
    @NamedQuery(name = "ServiceAccountAssignment.findByFundCenter", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.fundCenter = :fundCenter"),
    @NamedQuery(name = "ServiceAccountAssignment.findByCommitmentItem", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "ServiceAccountAssignment.findByUnloadingPoint", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.unloadingPoint = :unloadingPoint"),
    @NamedQuery(name = "ServiceAccountAssignment.findByRecipient", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.recipient = :recipient"),
    @NamedQuery(name = "ServiceAccountAssignment.findByAccAsngOrder", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.accAsngOrder = :accAsngOrder"),
    @NamedQuery(name = "ServiceAccountAssignment.findByAsset", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.asset = :asset"),
    @NamedQuery(name = "ServiceAccountAssignment.findByWBSElement", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.wBSElement = :wBSElement"),
    @NamedQuery(name = "ServiceAccountAssignment.findByNetActNumber", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.netActNumber = :netActNumber"),
    @NamedQuery(name = "ServiceAccountAssignment.findBySalesOrder", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.salesOrder = :salesOrder"),
    @NamedQuery(name = "ServiceAccountAssignment.findByItemNumber", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.itemNumber = :itemNumber"),
    @NamedQuery(name = "ServiceAccountAssignment.findByDeliverySchedule", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.deliverySchedule = :deliverySchedule"),
    @NamedQuery(name = "ServiceAccountAssignment.findByLineItemNumber", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "ServiceAccountAssignment.findByServiceLineItemNumber", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.serviceLineItemNumber = :serviceLineItemNumber"),
    @NamedQuery(name = "ServiceAccountAssignment.findByServiceLineItemNumberAndLineItemNumber", query = "SELECT s FROM ServiceAccountAssignment s WHERE s.lineItemNumber = :lineItemNumber and s.serviceLineItemNumber = :serviceLineItemNumber")})
public class ServiceAccountAssignment implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Column(name = "Percentage")
    private BigDecimal percentage;
    @Size(max = 15)
    @Column(name = "GLAccount")
    private String gLAccount;
    @Size(max = 8)
    @Column(name = "COArea")
    private String cOArea;
    @Size(max = 15)
    @Column(name = "CostCenter")
    private String costCenter;
    @Size(max = 15)
    @Column(name = "Fund")
    private String fund;
    @Size(max = 25)
    @Column(name = "FunctionalArea")
    private String functionalArea;
    @Size(max = 25)
    @Column(name = "FundCenter")
    private String fundCenter;
    @Size(max = 30)
    @Column(name = "CommitmentItem")
    private String commitmentItem;
    @Size(max = 35)
    @Column(name = "UnloadingPoint")
    private String unloadingPoint;
    @Size(max = 20)
    @Column(name = "Recipient")
    private String recipient;
    @Size(max = 20)
    @Column(name = "AccAsngOrder")
    private String accAsngOrder;
    @Size(max = 20)
    @Column(name = "Asset")
    private String asset;
    @Size(max = 30)
    @Column(name = "WBSElement")
    private String wBSElement;
    @Size(max = 20)
    @Column(name = "Net_Act_Number")
    private String netActNumber;
    @Size(max = 20)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 10)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 8)
    @Column(name = "DeliverySchedule")
    private String deliverySchedule;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 10)
    @Column(name = "ServiceLineItemNumber")
    private String serviceLineItemNumber;
    @Size(max = 5)
    @Column(name = "Distribution")
    private String distribution;
    @Size(max = 5)
    @Column(name = "AccountAssignment")
    private String accountAssignment;
    @Column(name = "NetValue")
    private BigDecimal netValaue;
    @Size(max = 50)
    @Column(name = "LinkNumber")
    private String linkNumber;

    @Column(name = "isDelete")
    boolean isDelete = false;

    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 10)
    @Column(name = "SerialNumber")
    private String serialNumber;
    @Size(max = 20)
    @Column(name = "LineNoSerAcc")
    private String lineNoSerAcc;
    
    @Size(max = 10)
    @Column(name = "IsDeleteFlag")
    private String isDeleteFlag;

    public ServiceAccountAssignment() {
    }

    public ServiceAccountAssignment(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
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

    public String getFundCenter() {
        return fundCenter;
    }

    public void setFundCenter(String fundCenter) {
        this.fundCenter = fundCenter;
    }

    public String getCommitmentItem() {
        return commitmentItem;
    }

    public void setCommitmentItem(String commitmentItem) {
        this.commitmentItem = commitmentItem;
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

    public String getAccAsngOrder() {
        return accAsngOrder;
    }

    public void setAccAsngOrder(String accAsngOrder) {
        this.accAsngOrder = accAsngOrder;
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

    public String getNetActNumber() {
        return netActNumber;
    }

    public void setNetActNumber(String netActNumber) {
        this.netActNumber = netActNumber;
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

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getServiceLineItemNumber() {
        return serviceLineItemNumber;
    }

    public void setServiceLineItemNumber(String serviceLineItemNumber) {
        this.serviceLineItemNumber = serviceLineItemNumber;
    }

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public String getAccountAssignment() {
        return accountAssignment;
    }

    public void setAccountAssignment(String accountAssignment) {
        this.accountAssignment = accountAssignment;
    }

    public BigDecimal getNetValaue() {
        return netValaue;
    }

    public void setNetValaue(BigDecimal netValaue) {
        this.netValaue = netValaue;
    }

    public String getLinkNumber() {
        return linkNumber;
    }

    public void setLinkNumber(String linkNumber) {
        this.linkNumber = linkNumber;
    }

    public boolean isIsDelete() {
        return isDelete;
    }

    public void setIsDelete(boolean isDelete) {
        this.isDelete = isDelete;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getLineNoSerAcc() {
        return lineNoSerAcc;
    }

    public void setLineNoSerAcc(String lineNoSerAcc) {
        this.lineNoSerAcc = lineNoSerAcc;
    }
    
    public String getIsDeleteFlag() {
        return isDeleteFlag;
    }

    public void setIsDeleteFlag(String isDeleteFlag) {
        this.isDeleteFlag = isDeleteFlag;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ServiceAccountAssignment)) {
            return false;
        }
        ServiceAccountAssignment other = (ServiceAccountAssignment) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ServiceAccountAssignment[ id=" + id + " ]";
    }

}
