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
@Table(name = "NG_Cmplx_CM_Account_Assignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderAccountAssignInfo.findAll", query = "SELECT v FROM CMHeaderAccountAssignInfo v"),
    @NamedQuery(name = "CMHeaderAccountAssignInfo.findByTransactionID", query = "SELECT v FROM CMHeaderAccountAssignInfo v WHERE v.TransactionID = :TransactionID"),
    @NamedQuery(name = "CMHeaderAccountAssignInfo.findByLinkID", query = "SELECT v FROM CMHeaderAccountAssignInfo v WHERE v.LinkID = :LinkID"),
    @NamedQuery(name = "CMHeaderAccountAssignInfo.getAccByLinkIDPID", query = "SELECT v FROM CMHeaderAccountAssignInfo v WHERE v.TransactionID = :TransactionID  AND v.LinkID = :LinkID AND v.ItemNo = :ItemNo")
    })
public class CMHeaderAccountAssignInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "InsertionOrderID")
    private Integer sno;
    
     @Size(max = 50)
    @Column(name = "Distribution")
    private String Distribution;

     @Size(max = 100)
    @Column(name = "Receipient")
    private String Receipient;
    
            
            @Size(max = 100)
    @Column(name = "UnLoadPoint")
    private String UnLoadPoint;

    public String getReceipient() {
        return Receipient;
    }

    public void setReceipient(String Receipient) {
        this.Receipient = Receipient;
    }

    public String getUnLoadPoint() {
        return UnLoadPoint;
    }

    public void setUnLoadPoint(String UnLoadPoint) {
        this.UnLoadPoint = UnLoadPoint;
    }
            
            

   
    @Size(max = 100)
    @Column(name = "GL_Account")
    private String GLAccount;
   

    @Size(max = 100)
    @Column(name = "CO_Area")
    private String COArea;
    
    @Size(max = 100)
    @Column(name = "Cost_Center")
    private String CostCenter;
    
    @Size(max = 100)
    @Column(name = "Ordr")
    private String Ordr;
     
    @Size(max = 100)
    @Column(name = "Asset")
    private String Asset;

    @Size(max = 100)
    @Column(name = "WBS_Element")
    private String WBSElement;
    
    @Size(max = 100)
    @Column(name = "Sales_Order")
    private String SalesOrder;
    
    @Size(max = 100)
    @Column(name = "Item_No")
    private String ItemNo;
    
    @Size(max = 100)
    @Column(name = "Delivery_Schedule")
    private String DeliverySchedule;
        
   // @Size(max = 100)
    @Column(name = "Quantity")
    private BigDecimal Quantity;
  
        
   // @Size(max = 100)
    @Column(name = "Percentage")
    private BigDecimal Percentage;
  
        
    @Size(max = 100)
    @Column(name = "Fund")
    private String Fund;
          
    @Size(max = 100)
    @Column(name = "Functional_Area")
    private String FunctionalArea;
  
            
    @Size(max = 100)
    @Column(name = "Funds_Centre")
    private String FundsCentre;
  
            
    @Size(max = 100)
    @Column(name = "Commitment_Item")
    private String CommitmentItem;
  
    @Size(max = 100)
    @Column(name = "Network")
    private String Network;
                
    @Size(max = 100)
    @Column(name = "Activity_No")
    private String ActivityNo;

    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
     @Size(max = 20)
    @Column(name = "LinkID")
    private String LinkID;
     
     public String getDistribution() {
        return Distribution;
    }

    public void setDistribution(String Distribution) {
        this.Distribution = Distribution;
    }

    public String getLinkID() {
        return LinkID;
    }

    public void setLinkID(String LinkID) {
        this.LinkID = LinkID;
    }
    
    public CMHeaderAccountAssignInfo() {
    }

    public CMHeaderAccountAssignInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getGLAccount() {
        return GLAccount;
    }

    public void setGLAccount(String GLAccount) {
        this.GLAccount = GLAccount;
    }

    public String getCOArea() {
        return COArea;
    }

    public void setCOArea(String COArea) {
        this.COArea = COArea;
    }

    public String getCostCenter() {
        return CostCenter;
    }

    public void setCostCenter(String CostCenter) {
        this.CostCenter = CostCenter;
    }

    public String getOrdr() {
        return Ordr;
    }

    public void setOrdr(String Ordr) {
        this.Ordr = Ordr;
    }

    public String getAsset() {
        return Asset;
    }

    public void setAsset(String Asset) {
        this.Asset = Asset;
    }

    public String getWBSElement() {
        return WBSElement;
    }

    public void setWBSElement(String WBSElement) {
        this.WBSElement = WBSElement;
    }

    public String getSalesOrder() {
        return SalesOrder;
    }

    public void setSalesOrder(String SalesOrder) {
        this.SalesOrder = SalesOrder;
    }

    public String getItemNo() {
        return ItemNo;
    }

    public void setItemNo(String ItemNo) {
        this.ItemNo = ItemNo;
    }

    public String getDeliverySchedule() {
        return DeliverySchedule;
    }

    public void setDeliverySchedule(String DeliverySchedule) {
        this.DeliverySchedule = DeliverySchedule;
    }

    public BigDecimal getQuantity() {
        return Quantity;
    }

    public void setQuantity(BigDecimal Quantity) {
        this.Quantity = Quantity;
    }

    public BigDecimal getPercentage() {
        return Percentage;
    }

    public void setPercentage(BigDecimal Percentage) {
        this.Percentage = Percentage;
    }

    public String getFund() {
        return Fund;
    }

    public void setFund(String Fund) {
        this.Fund = Fund;
    }

    public String getFunctionalArea() {
        return FunctionalArea;
    }

    public void setFunctionalArea(String FunctionalArea) {
        this.FunctionalArea = FunctionalArea;
    }

    public String getFundsCentre() {
        return FundsCentre;
    }

    public void setFundsCentre(String FundsCentre) {
        this.FundsCentre = FundsCentre;
    }

    public String getCommitmentItem() {
        return CommitmentItem;
    }

    public void setCommitmentItem(String CommitmentItem) {
        this.CommitmentItem = CommitmentItem;
    }

    public String getNetwork() {
        return Network;
    }

    public void setNetwork(String Network) {
        this.Network = Network;
    }

    public String getActivityNo() {
        return ActivityNo;
    }

    public void setActivityNo(String ActivityNo) {
        this.ActivityNo = ActivityNo;
    }

    
   
    
    
  
    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
