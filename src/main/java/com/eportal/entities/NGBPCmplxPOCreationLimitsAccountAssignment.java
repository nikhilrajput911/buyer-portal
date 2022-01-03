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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_Limits_AccountAssignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findById", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.id = :id"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByAccountAssignment", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.accountAssignment = :accountAssignment"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByAsset", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.asset = :asset"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByCOArea", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.coArea = :cOArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByCommitmentItem", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByCostCenter", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.costCenter = :costCenter"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByDeliverySchedule", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.deliverySchedule = :deliverySchedule"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByDistribution", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.distribution = :distribution"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByExpectedvalue", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.expectedvalue = :expectedvalue"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByFunctionalArea", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.functionalArea = :functionalArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByFund", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.fund = :fund"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByFundCenter", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.fundCenter = :fundCenter"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByGLAccount", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.glAccount = :gLAccount"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByIsDelete", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.isDelete = :isDelete"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByLimitAccAsgnTblOrder", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.limitAccAsgnTblOrder = :limitAccAsgnTblOrder"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByLineItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByLinkId", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByNetActNumber", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.netActNumber = :netActNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByPercentage", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.percentage = :percentage"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByPrItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.prItemNumber = :prItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByQuantity", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findBySalesOrder", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.salesOrder = :salesOrder"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByServiceLineItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.serviceLineItemNumber = :serviceLineItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimitsAccountAssignment.findByWBSElement", query = "SELECT n FROM NGBPCmplxPOCreationLimitsAccountAssignment n WHERE n.wbsElement = :wBSElement")})
public class NGBPCmplxPOCreationLimitsAccountAssignment implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 5)
    @Column(name = "AccountAssignment")
    private String accountAssignment;
    @Size(max = 20)
    @Column(name = "Asset")
    private String asset;
    @Size(max = 8)
    @Column(name = "CoArea")
    private String coArea;
    @Size(max = 30)
    @Column(name = "CommitmentItem")
    private String commitmentItem;
    @Size(max = 15)
    @Column(name = "CostCenter")
    private String costCenter;
    @Size(max = 8)
    @Column(name = "DeliverySchedule")
    private String deliverySchedule;
    @Size(max = 5)
    @Column(name = "Distribution")
    private String distribution;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "EXPECTEDVALUE")
    private BigDecimal expectedvalue;
    @Size(max = 25)
    @Column(name = "FunctionalArea")
    private String functionalArea;
    @Size(max = 15)
    @Column(name = "Fund")
    private String fund;
    @Size(max = 25)
    @Column(name = "FundCenter")
    private String fundCenter;
    @Size(max = 15)
    @Column(name = "GlAccount")
    private String glAccount;
    @Column(name = "isDelete")
    boolean isDelete = false;
    @Size(max = 10)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 15)
    @Column(name = "Limit_AccAsgnTbl_Order")
    private String limitAccAsgnTblOrder;
    @Size(max = 10)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 20)
    @Column(name = "Net_Act_Number")
    private String netActNumber;
    @Column(name = "Percentage")
    private BigDecimal percentage;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Size(max = 20)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 10)
    @Column(name = "ServiceLineItemNumber")
    private String serviceLineItemNumber;
    @Size(max = 30)
    @Column(name = "WbsElement")
    private String wbsElement;
    
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

    public NGBPCmplxPOCreationLimitsAccountAssignment() {
    }

    public NGBPCmplxPOCreationLimitsAccountAssignment(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccountAssignment() {
        return accountAssignment;
    }

    public void setAccountAssignment(String accountAssignment) {
        this.accountAssignment = accountAssignment;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }


    public String getCommitmentItem() {
        return commitmentItem;
    }

    public void setCommitmentItem(String commitmentItem) {
        this.commitmentItem = commitmentItem;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public String getDeliverySchedule() {
        return deliverySchedule;
    }

    public void setDeliverySchedule(String deliverySchedule) {
        this.deliverySchedule = deliverySchedule;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public BigDecimal getExpectedvalue() {
        return expectedvalue;
    }

    public void setExpectedvalue(BigDecimal expectedvalue) {
        this.expectedvalue = expectedvalue;
    }

    public String getFunctionalArea() {
        return functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
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

  
//    public Boolean getIsDelete() {
//        return isDelete;
//    }
//
//    public void setIsDelete(Boolean isDelete) {
//        this.isDelete = isDelete;

    public boolean isIsDelete() {
        return isDelete;
    }

    public void setIsDelete(boolean isDelete) {
        this.isDelete = isDelete;
    }

//    }
    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getLimitAccAsgnTblOrder() {
        return limitAccAsgnTblOrder;
    }

    public void setLimitAccAsgnTblOrder(String limitAccAsgnTblOrder) {
        this.limitAccAsgnTblOrder = limitAccAsgnTblOrder;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getNetActNumber() {
        return netActNumber;
    }

    public void setNetActNumber(String netActNumber) {
        this.netActNumber = netActNumber;
    }

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getSalesOrder() {
        return salesOrder;
    }

    public void setSalesOrder(String salesOrder) {
        this.salesOrder = salesOrder;
    }

    public String getServiceLineItemNumber() {
        return serviceLineItemNumber;
    }

    public void setServiceLineItemNumber(String serviceLineItemNumber) {
        this.serviceLineItemNumber = serviceLineItemNumber;
    }

//    public String getWBSElement() {
//        return wBSElement;
//    }
//
//    public void setWBSElement(String wBSElement) {
//        this.wBSElement = wBSElement;
//    }

    public String getCoArea() {
        return coArea;
    }

    public void setCoArea(String coArea) {
        this.coArea = coArea;
    }

    public String getGlAccount() {
        return glAccount;
    }

    public void setGlAccount(String glAccount) {
        this.glAccount = glAccount;
    }

    public String getWbsElement() {
        return wbsElement;
    }

    public void setWbsElement(String wbsElement) {
        this.wbsElement = wbsElement;
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
        if (!(object instanceof NGBPCmplxPOCreationLimitsAccountAssignment)) {
            return false;
        }
        NGBPCmplxPOCreationLimitsAccountAssignment other = (NGBPCmplxPOCreationLimitsAccountAssignment) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLimitsAccountAssignment[ id=" + id + " ]";
    }

}
