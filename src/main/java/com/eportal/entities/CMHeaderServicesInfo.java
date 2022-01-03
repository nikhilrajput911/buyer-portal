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
@Table(name = "NG_Cmplx_CM_Services")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderServicesInfo.findAll", query = "SELECT v FROM CMHeaderServicesInfo v"),
    @NamedQuery(name = "CMHeaderServicesInfo.findByTransactionAndItem", query = "SELECT v FROM CMHeaderServicesInfo v WHERE v.TransactionID = :TransactionID and v.Line_Item_No = :Line_Item_No"),
    @NamedQuery(name = "CMHeaderServicesInfo.findByTransactionID", query = "SELECT v FROM CMHeaderServicesInfo v WHERE v.TransactionID = :TransactionID"),
    @NamedQuery(name = "CMHeaderServicesInfo.findByLinkID", query = "SELECT v FROM CMHeaderServicesInfo v WHERE v.LinkId = :LinkId"),
    @NamedQuery(name = "CMHeaderServicesInfo.findByServLinkId", query = "SELECT v FROM CMHeaderServicesInfo v WHERE v.ServLinkId = :ServLinkId")
    })
public class CMHeaderServicesInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;

   
    @Size(max = 100)
    @Column(name = "Line_Item_No")
    private String Line_Item_No;
   

    @Size(max = 100)
    @Column(name = "Service_No")
    private String ServiceNo;
    
    @Size(max = 100)
    @Column(name = "Short_Text")
    private String ShortText;
    
    @Size(max = 100)
    @Column(name = "Quantity")
    private String Quantity;
     
    @Size(max = 100)
    @Column(name = "Unit")
    private String Unit;

    @Size(max = 100)
    @Column(name = "Gross_Price")
    private String GrossPrice;
    
    @Size(max = 100)
    @Column(name = "Currency")
    private String Currency;
    
    @Size(max = 100)
    @Column(name = "Edition")
    private String Edition;
    

    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
    @Size(max = 100)
    @Column(name = "LinkId")
    private String LinkId;
    
    @Size(max = 100)
    @Column(name = "ServLinkId")
    private String ServLinkId;

    public String getLinkId() {
        return LinkId;
    }

    public void setLinkId(String LinkId) {
        this.LinkId = LinkId;
    }

    public String getServLinkId() {
        return ServLinkId;
    }

    public void setServLinkId(String ServLinkId) {
        this.ServLinkId = ServLinkId;
    }
    
    public CMHeaderServicesInfo() {
    }

    public CMHeaderServicesInfo(Integer sno) {
        this.insertionOrderID = sno;
    }

    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer sno) {
        this.insertionOrderID = sno;
    }

    public String getLineItemNo() {
        return Line_Item_No;
    }

    public void setLineItemNo(String LineItemNo) {
        this.Line_Item_No = LineItemNo;
    }

    public String getServiceNo() {
        return ServiceNo;
    }

    public void setServiceNo(String ServiceNo) {
        this.ServiceNo = ServiceNo;
    }

    public String getShortText() {
        return ShortText;
    }

    public void setShortText(String ShortText) {
        this.ShortText = ShortText;
    }

    public String getQuantity() {
        return Quantity;
    }

    public void setQuantity(String Quantity) {
        this.Quantity = Quantity;
    }

    public String getUnit() {
        return Unit;
    }

    public void setUnit(String Unit) {
        this.Unit = Unit;
    }

    public String getGrossPrice() {
        return GrossPrice;
    }

    public void setGrossPrice(String GrossPrice) {
        this.GrossPrice = GrossPrice;
    }

    public String getCurrency() {
        return Currency;
    }

    public void setCurrency(String Currency) {
        this.Currency = Currency;
    }

    public String getEdition() {
        return Edition;
    }

    public void setEdition(String Edition) {
        this.Edition = Edition;
    }

  
    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
