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
@Table(name = "SpendAnalysis_Report")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractSpendReport.findAll", query = "SELECT a FROM ContractSpendReport a WHERE a.isdeleted IS NULL"),
     @NamedQuery(name = "ContractSpendReport.findAllByBuyerID", query = "SELECT a FROM ContractSpendReport a WHERE a.isdeleted IS NULL AND a.BuyerID = :BuyerID"),
    @NamedQuery(name = "ContractSpendReport.findLibraryAdded", query = "SELECT a FROM ContractSpendReport a WHERE a.spendLibrary IS NOT NULL AND a.isdeleted IS NULL AND a.islibrary IS NULL"),
    @NamedQuery(name = "ContractSpendReport.findAllLibraryAdded", query = "SELECT a FROM ContractSpendReport a WHERE a.spendLibrary IS NOT NULL AND a.isdeleted IS NULL AND a.islibrary IS NULL AND a.BuyerID = :BuyerID ")
})
public class ContractSpendReport implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    
    @Size(max = 50)
    @Column(name = "MaterialSVSNumber")
    private String materialSVSNumber;

    @Size(max = 150)
    @Column(name = "MaterialServiceDescription")
    private String materialServiceDescription;

    @Size(max = 300)
    @Column(name = "POLong")
    private String poLong;
    
     @Size(max = 50)
    @Column(name = "GRQty")
    private String grQty;

    @Size(max = 50)
    @Column(name = "Currency")
    private String currency;
    
    @Size(max = 50)
    @Column(name = "Type")
    private String type;
    
    @Size(max = 100)
    @Column(name = "UOM")
    private String uom;
    
    @Size(max = 50)
    @Column(name = "OrderPriceUnit")
    private String orderPriceUnit;
    
    @Size(max = 50)
    @Column(name = "UnitPrice")
    private String unitPrice;
    
    @Size(max = 50)
    @Column(name = "Isdeleted")
    private String isdeleted;
    
    @Size(max = 50)
    @Column(name = "IsLibrary")
    private String islibrary;
    
     @Size(max = 50)
    @Column(name = "spendLibrary")
    private String spendLibrary;
     
    @Size(max = 100)
    @Column(name = "MatGroup")
    private String matGroup;
    
     @Size(max = 100)
    @Column(name = "MatStorageLoc")
    private String matStorageLoc;
     
     @Size(max = 100)
    @Column(name = "MatGroupDesc")
    private String matGroupDesc;
     
    @Size(max = 50)
    @Column(name = "PRICEUNIT")
    private String perPriceUnit;
    
    @Size(max = 50)
    @Column(name = "LCAmount")
    private String lcAmount;
    
    @Size(max = 50)
    @Column(name = "PurchaseGroup")
    private String purchaseGroup;
    
    @Size(max=150)
     @Column(name = "UniqueID")
    private String uniqueID;
    
    @Size(max=150)
     @Column(name = "bucketNameLib")
    private String bucketNameLib;
    
    @Size(max=50)
     @Column(name = "BuyerID")
    private String BuyerID;
    
    @Size(max=50)
     @Column(name = "OldMaterialNo")
    private String oldMaterialNo;
    
    @Size(max=50)
     @Column(name = "CountryOrigin")
    private String countryOrigin;
    
    @Size(max=50)
     @Column(name = "UOMStore")
    private String uomStore;

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getMaterialSVSNumber() {
        return materialSVSNumber;
    }

    public void setMaterialSVSNumber(String materialSVSNumber) {
        this.materialSVSNumber = materialSVSNumber;
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

    public String getIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(String isdeleted) {
        this.isdeleted = isdeleted;
    }

    public String getIslibrary() {
        return islibrary;
    }

    public void setIslibrary(String islibrary) {
        this.islibrary = islibrary;
    }

    public String getSpendLibrary() {
        return spendLibrary;
    }

    public void setSpendLibrary(String spendLibrary) {
        this.spendLibrary = spendLibrary;
    }

    public String getMatGroup() {
        return matGroup;
    }

    public void setMatGroup(String matGroup) {
        this.matGroup = matGroup;
    }

    public String getMatStorageLoc() {
        return matStorageLoc;
    }

    public void setMatStorageLoc(String matStorageLoc) {
        this.matStorageLoc = matStorageLoc;
    }

    public String getMatGroupDesc() {
        return matGroupDesc;
    }

    public void setMatGroupDesc(String matGroupDesc) {
        this.matGroupDesc = matGroupDesc;
    }

    public String getPerPriceUnit() {
        return perPriceUnit;
    }

    public void setPerPriceUnit(String perPriceUnit) {
        this.perPriceUnit = perPriceUnit;
    }

    public String getLcAmount() {
        return lcAmount;
    }

    public void setLcAmount(String lcAmount) {
        this.lcAmount = lcAmount;
    }

    public String getPurchaseGroup() {
        return purchaseGroup;
    }

    public void setPurchaseGroup(String purchaseGroup) {
        this.purchaseGroup = purchaseGroup;
    }

    public String getUniqueID() {
        return uniqueID;
    }

    public void setUniqueID(String uniqueID) {
        this.uniqueID = uniqueID;
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

    public String getOldMaterialNo() {
        return oldMaterialNo;
    }

    public void setOldMaterialNo(String oldMaterialNo) {
        this.oldMaterialNo = oldMaterialNo;
    }

    public String getCountryOrigin() {
        return countryOrigin;
    }

    public void setCountryOrigin(String countryOrigin) {
        this.countryOrigin = countryOrigin;
    }

    public String getUomStore() {
        return uomStore;
    }

    public void setUomStore(String uomStore) {
        this.uomStore = uomStore;
    }
    
    
    
}
