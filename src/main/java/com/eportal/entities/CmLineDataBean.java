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
 * @author ramkrishnan.elango
 */

@Entity
@Table(name = "NG_Cmplx_CM_Line_Data")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmLineDataBean.findAll", query = "SELECT a FROM CmLineDataBean a WHERE a.isdeleted IS NULL"),
    @NamedQuery(name = "CmLineDataBean.findLibraryAdded", query = "SELECT a FROM CmLineDataBean a WHERE a.spendLibrary IS NOT NULL")
})
public class CmLineDataBean implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer sno;
    
    @Size(max = 50)
    @Column(name = "Item_Number")
    private String itemNumber;

    @Size(max = 150)
    @Column(name = "Short_Text")
    private String materialServiceDescription;

    @Size(max = 300)
    @Column(name = "Malt_Long_Text")
    private String poLong;
    
     @Size(max = 50)
    @Column(name = "Targeted_Quantity")
    private String grQty;

    @Size(max = 50)
    @Column(name = "Currency")
    private String currency;
    
    @Size(max = 50)
    @Column(name = "Type")
    private String type;
    
    @Size(max = 100)
    @Column(name = "UoM")
    private String uom;
    
    @Size(max = 50)
    @Column(name = "Order_Price_Unit")
    private String orderPriceUnit;
    
    @Size(max = 50)
    @Column(name = "Per_Price_Unit")
    private String unitPrice;
    
    @Size(max = 50)
    @Column(name = "Net_Price")
    private String netPrice;
    
    @Size(max = 100)
    @Column(name = "Matl_Group")
    private String matlGroup;
    
     @Size(max = 100)
    @Column(name = "Storage_Location")
    private String storage_location;
     
    @Size(max = 100)
    @Column(name = "Tender_Contract_Number")
    private String tenderNumber;
    
    @Size(max = 100)
    @Column(name = "TransactionID")
    private String transactionID;

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getMaterialServiceDescription() {
        return materialServiceDescription;
    }

    public void setMaterialServiceDescription(String materialServiceDescription) {
        this.materialServiceDescription = materialServiceDescription;
    }

    public String getPoLong() {
        return poLong;
    }

    public void setPoLong(String poLong) {
        this.poLong = poLong;
    }

    public String getGrQty() {
        return grQty;
    }

    public void setGrQty(String grQty) {
        this.grQty = grQty;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getOrderPriceUnit() {
        return orderPriceUnit;
    }

    public void setOrderPriceUnit(String orderPriceUnit) {
        this.orderPriceUnit = orderPriceUnit;
    }

    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(String netPrice) {
        this.netPrice = netPrice;
    }

    public String getMatlGroup() {
        return matlGroup;
    }

    public void setMatlGroup(String matlGroup) {
        this.matlGroup = matlGroup;
    }

    public String getStorage_location() {
        return storage_location;
    }

    public void setStorage_location(String storage_location) {
        this.storage_location = storage_location;
    }

    public String getTenderNumber() {
        return tenderNumber;
    }

    public void setTenderNumber(String tenderNumber) {
        this.tenderNumber = tenderNumber;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }
    
    
    
    
    
     
   
    
    
}
