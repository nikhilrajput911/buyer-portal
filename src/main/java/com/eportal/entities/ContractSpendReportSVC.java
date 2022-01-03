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


@Entity
@Table(name = "NG_CM_SpendAnalysisReport_Service")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractSpendReportSVC.findAll", query = "SELECT a FROM ContractSpendReportSVC a WHERE a.isDeleted IS NULL"),
    @NamedQuery(name = "ContractSpendReportSVC.findAllByBuyerID", query = "SELECT a FROM ContractSpendReportSVC a WHERE a.isDeleted IS NULL AND a.BuyerID = :BuyerID"),
    @NamedQuery(name = "ContractSpendReportSVC.findLibraryAdded", query = "SELECT a FROM ContractSpendReportSVC a WHERE a.isDeleted IS NULL AND a.ISLibrary IS NOT NULL  AND a.deleteLib is NULL"),
    @NamedQuery(name = "ContractSpendReportSVC.findAllLibraryAdded", query = "SELECT a FROM ContractSpendReportSVC a WHERE a.isDeleted IS NULL AND a.ISLibrary IS NOT NULL  AND a.deleteLib is NULL AND a.BuyerID = :BuyerID")
})
public class ContractSpendReportSVC implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    
    @Size(max = 100)
    @Column(name = "PurchaseDoc")
    private String purchaseDoc;

    @Size(max = 10)
    @Column(name = "Item")
    private String item;

    @Size(max = 10)
    @Column(name = "OrderType")
    private String orderType;
    
     @Size(max = 20)
    @Column(name = "VendorCode")
    private String vendorCode;

    @Size(max = 100)
    @Column(name = "VendorName")
    private String vendorName;
    
    @Size(max = 20)
    @Column(name = "SVSNumber")
    private String svsNumber;
    
    @Size(max = 10)
    @Column(name = "PlantCode")
    private String plantCode;
    
    @Size(max = 100)
    @Column(name = "SVSDescription")
    private String svsDescription;
    
    @Size(max = 300)
    @Column(name = "LongText")
    private String longText;
    
    @Size(max = 300)
    @Column(name = "UnitPrice")
    private String unitPrice;
    
    @Size(max = 300)
    @Column(name = "UOM")
    private String uom;
    
    @Size(max = 300)
    @Column(name = "PostingDate")
    private String postingDate;
    
    @Size(max = 300)
    @Column(name = "GRQuantity")
    private String grQty;
    
    @Size(max = 300)
    @Column(name = "LCAmount")
    private String lcAmnt;
    
    @Size(max = 10)
    @Column(name = "isDeleted")
    private String isDeleted;
    
    @Size(max = 50)
    @Column(name = "ServiceGroupNo")
    private String serviceGroupNo;
    
    @Size(max = 150)
    @Column(name = "UniqueID")
    private String uniqueID;
    
    @Size(max = 10)
    @Column(name = "ISLibrary")
    private String ISLibrary;
    
     @Size(max = 100)
    @Column(name = "bucketNameLib")
    private String bucketNameLib;
     
    @Size(max = 50)
    @Column(name = "BuyerID")
    private String BuyerID; 
    
    @Size(max = 50)
    @Column(name = "deleteLib")
    private String deleteLib; 

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getPurchaseDoc() {
        return purchaseDoc;
    }

    public void setPurchaseDoc(String purchaseDoc) {
        this.purchaseDoc = purchaseDoc;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getSvsNumber() {
        return svsNumber;
    }

    public void setSvsNumber(String svsNumber) {
        this.svsNumber = svsNumber;
    }

    public String getPlantCode() {
        return plantCode;
    }

    public void setPlantCode(String plantCode) {
        this.plantCode = plantCode;
    }

    public String getSvsDescription() {
        return svsDescription;
    }

    public void setSvsDescription(String svsDescription) {
        this.svsDescription = svsDescription;
    }

    public String getLongText() {
        return longText;
    }

    public void setLongText(String longText) {
        this.longText = longText;
    }

    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getPostingDate() {
        return postingDate;
    }

    public void setPostingDate(String postingDate) {
        this.postingDate = postingDate;
    }

    public String getGrQty() {
        return grQty;
    }

    public void setGrQty(String grQty) {
        this.grQty = grQty;
    }

    public String getLcAmnt() {
        return lcAmnt;
    }

    public void setLcAmnt(String lcAmnt) {
        this.lcAmnt = lcAmnt;
    }

    public String getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(String isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getServiceGroupNo() {
        return serviceGroupNo;
    }

    public void setServiceGroupNo(String serviceGroupNo) {
        this.serviceGroupNo = serviceGroupNo;
    }

    public String getUniqueID() {
        return uniqueID;
    }

    public void setUniqueID(String uniqueID) {
        this.uniqueID = uniqueID;
    }

    public String getISLibrary() {
        return ISLibrary;
    }

    public void setISLibrary(String ISLibrary) {
        this.ISLibrary = ISLibrary;
    }

    public String getBucketNameLib() {
        return bucketNameLib;
    }

    public void setBucketNameLib(String bucketNameLib) {
        this.bucketNameLib = bucketNameLib;
    }

    public String getBuyerID() {
        return BuyerID;
    }

    public void setBuyerID(String BuyerID) {
        this.BuyerID = BuyerID;
    }

    public String getDeleteLib() {
        return deleteLib;
    }

    public void setDeleteLib(String deleteLib) {
        this.deleteLib = deleteLib;
    }
    
    
    
    
    
    
}


