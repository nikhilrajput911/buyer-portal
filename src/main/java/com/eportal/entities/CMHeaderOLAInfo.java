/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
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
@Table(name = "NG_Cmplx_CM_OLA_Administrative")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderOLAInfo.findAll", query = "SELECT v FROM CMHeaderOLAInfo v"),
    @NamedQuery(name = "CMHeaderOLAInfo.findByTransactionID", query = "SELECT v FROM CMHeaderOLAInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMHeaderOLAInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "InsertionOrderID")
    private Integer sno;

   
    @Size(max = 100)
    @Column(name = "Purchase_Organization")
    private String PurchaseOrganization;
   

    @Size(max = 100)
    @Column(name = "Purchase_Group")
    private String PurchaseGroup;
    
    @Size(max = 100)
    @Column(name = "Item_Interval_No")
    private String ItemIntervalNo;
    
    @Size(max = 100)
    @Column(name = "Sub_Item_Interval")
    private String SubItemInterval;

    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
    @Size(max = 3)
    @Column(name = "GR_Message")
    private String GR_Message;
    
    @Size(max = 300)
    @Column(name = "termofcontract")
    private String termofcontract;
    
    @Size(max = 300)
    @Column(name = "extofcontract")
    private String extofcontract;

    public String getTermofcontract() {
        return termofcontract;
    }

    public void setTermofcontract(String termofcontract) {
        this.termofcontract = termofcontract;
    }

    public String getExtofcontract() {
        return extofcontract;
    }

    public void setExtofcontract(String extofcontract) {
        this.extofcontract = extofcontract;
    }
    
    

    public String getGR_Message() {
        return GR_Message;
    }

    public void setGR_Message(String GR_Message) {
        this.GR_Message = GR_Message;
    }
    
    
    
    public CMHeaderOLAInfo() {
    }

    public CMHeaderOLAInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getPurchaseOrganization() {
        return PurchaseOrganization;
    }

    public void setPurchaseOrganization(String PurchaseOrganization) {
        this.PurchaseOrganization = PurchaseOrganization;
    }

    public String getPurchaseGroup() {
        return PurchaseGroup;
    }

    public void setPurchaseGroup(String PurchaseGroup) {
        this.PurchaseGroup = PurchaseGroup;
    }

    public String getItemIntervalNo() {
        return ItemIntervalNo;
    }

    public void setItemIntervalNo(String ItemIntervalNo) {
        this.ItemIntervalNo = ItemIntervalNo;
    }

    public String getSubItemInterval() {
        return SubItemInterval;
    }

    public void setSubItemInterval(String SubItemInterval) {
        this.SubItemInterval = SubItemInterval;
    }

    
  
    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
