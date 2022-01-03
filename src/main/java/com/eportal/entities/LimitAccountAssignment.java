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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Limit_AccountAssignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "LimitAccountAssignment.findAll", query = "SELECT l FROM LimitAccountAssignment l"),
    @NamedQuery(name = "LimitAccountAssignment.findById", query = "SELECT l FROM LimitAccountAssignment l WHERE l.id = :id"),
    @NamedQuery(name = "LimitAccountAssignment.findByQuantity", query = "SELECT l FROM LimitAccountAssignment l WHERE l.quantity = :quantity"),
    @NamedQuery(name = "LimitAccountAssignment.findByGLAccount", query = "SELECT l FROM LimitAccountAssignment l WHERE l.gLAccount = :gLAccount"),
    @NamedQuery(name = "LimitAccountAssignment.findByCOArea", query = "SELECT l FROM LimitAccountAssignment l WHERE l.cOArea = :cOArea"),
    @NamedQuery(name = "LimitAccountAssignment.findByCostCenter", query = "SELECT l FROM LimitAccountAssignment l WHERE l.costCenter = :costCenter"),
    @NamedQuery(name = "LimitAccountAssignment.findByFund", query = "SELECT l FROM LimitAccountAssignment l WHERE l.fund = :fund"),
    @NamedQuery(name = "LimitAccountAssignment.findByFunctionalArea", query = "SELECT l FROM LimitAccountAssignment l WHERE l.functionalArea = :functionalArea"),
    @NamedQuery(name = "LimitAccountAssignment.findByFundCenter", query = "SELECT l FROM LimitAccountAssignment l WHERE l.fundCenter = :fundCenter"),
    @NamedQuery(name = "LimitAccountAssignment.findByCommitmentItem", query = "SELECT l FROM LimitAccountAssignment l WHERE l.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "LimitAccountAssignment.findByLimitAccAsgnTblOrder", query = "SELECT l FROM LimitAccountAssignment l WHERE l.limitAccAsgnTblOrder = :limitAccAsgnTblOrder"),
    @NamedQuery(name = "LimitAccountAssignment.findByAsset", query = "SELECT l FROM LimitAccountAssignment l WHERE l.asset = :asset"),
    @NamedQuery(name = "LimitAccountAssignment.findByWBSElement", query = "SELECT l FROM LimitAccountAssignment l WHERE l.wBSElement = :wBSElement"),
    @NamedQuery(name = "LimitAccountAssignment.findByNetActNumber", query = "SELECT l FROM LimitAccountAssignment l WHERE l.netActNumber = :netActNumber"),
    @NamedQuery(name = "LimitAccountAssignment.findBySalesOrder", query = "SELECT l FROM LimitAccountAssignment l WHERE l.salesOrder = :salesOrder"),
    @NamedQuery(name = "LimitAccountAssignment.findByItemNumber", query = "SELECT l FROM LimitAccountAssignment l WHERE l.itemNumber = :itemNumber"),
    @NamedQuery(name = "LimitAccountAssignment.findByDeliverySchedule", query = "SELECT l FROM LimitAccountAssignment l WHERE l.deliverySchedule = :deliverySchedule"),
    @NamedQuery(name = "LimitAccountAssignment.findByLineItemNumber", query = "SELECT l FROM LimitAccountAssignment l WHERE l.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "LimitAccountAssignment.findByServiceLineItemNumber", query = "SELECT l FROM LimitAccountAssignment l WHERE l.serviceLineItemNumber = :serviceLineItemNumber")})
public class LimitAccountAssignment implements Serializable {
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
    @Size(max = 15)
    @Column(name = "Limit_AccAsgnTbl_Order")
    private String limitAccAsgnTblOrder;
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
    @Size(max = 10)
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
    
    @Column(name = "isDelete")
    boolean isDelete = false;
    
    @Column(name = "EXPECTEDVALUE")
    private BigDecimal expectedvalue;
    
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 10)
    @Column(name = "SerialNumber")
    private String serialNumber;
    
    public LimitAccountAssignment() {
    }

    public LimitAccountAssignment(Integer id) {
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

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
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

    public String getLimitAccAsgnTblOrder() {
        return limitAccAsgnTblOrder;
    }

    public void setLimitAccAsgnTblOrder(String limitAccAsgnTblOrder) {
        this.limitAccAsgnTblOrder = limitAccAsgnTblOrder;
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

    public boolean isIsDelete() {
        return isDelete;
    }

    public void setIsDelete(boolean isDelete) {
        this.isDelete = isDelete;
    }

    public BigDecimal getExpectedvalue() {
        return expectedvalue;
    }

    public void setExpectedvalue(BigDecimal expectedvalue) {
        this.expectedvalue = expectedvalue;
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
    
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof LimitAccountAssignment)) {
            return false;
        }
        LimitAccountAssignment other = (LimitAccountAssignment) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.LimitAccountAssignment[ id=" + id + " ]";
    }
    
}
