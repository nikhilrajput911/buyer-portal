/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import javax.xml.bind.annotation.XmlElement;

/**
 *
 * @author ramkrishnan.elango
 */
public class SpendDataBean1 {
 
    private String materialSVSNumber;
    private String materialServiceDescription;
    private String poLong;
    private String grQty;
    private String currency;
    private String type;
    private String uom;
    private String orderPriceUnit;
    private String unitPrice;
    private String matGroup;
    private String matStorageLoc;
    private String matGroupDesc;
    private String requestType;
    private String companyCode;
    private String contractType;
    private String costCentre;
    private String activationDate;
    private String purchaseGroup;
    private String perPriceUnit;
    private String lcAmount;
    private String tenderTitle;
    private String oldMaterialNo;
    private String countryOrigin;
    private String uomStore;

    public String getMaterialSVSNumber() {
        return materialSVSNumber;
    }
    @XmlElement(name = "materialSVSNumber")
    public void setMaterialSVSNumber(String materialSVSNumber) {
        this.materialSVSNumber = materialSVSNumber;
    }
    
    public String getMaterialServiceDescription() {
        return materialServiceDescription;
    }
    @XmlElement(name = "materialServiceDescription")
    public void setMaterialServiceDescription(String materialServiceDescription) {
        this.materialServiceDescription = materialServiceDescription;
    }

    public String getPoLong() {
        return poLong;
    }
    @XmlElement(name = "poLong")
    public void setPoLong(String poLong) {
        this.poLong = poLong;
    }

    public String getGrQty() {
        return grQty;
    }
    @XmlElement(name = "grQty")
    public void setGrQty(String grQty) {
        this.grQty = grQty;
    }

    public String getCurrency() {
        return currency;
    }
    @XmlElement(name = "currency")
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getType() {
        return type;
    }
    @XmlElement(name = "type")
    public void setType(String type) {
        this.type = type;
    }

    public String getUom() {
        return uom;
    }
    @XmlElement(name = "uom")
    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getOrderPriceUnit() {
        return orderPriceUnit;
    }
    @XmlElement(name = "orderPriceUnit")
    public void setOrderPriceUnit(String orderPriceUnit) {
        this.orderPriceUnit = orderPriceUnit;
    }

    public String getUnitPrice() {
        return unitPrice;
    }
    @XmlElement(name = "unitPrice")
    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getMatGroup() {
        return matGroup;
    }
    @XmlElement(name = "MatGroup")
    public void setMatGroup(String matGroup) {
        this.matGroup = matGroup;
    }

    public String getMatStorageLoc() {
        return matStorageLoc;
    }
    @XmlElement(name = "MatStorageLoc")
    public void setMatStorageLoc(String matStorageLoc) {
        this.matStorageLoc = matStorageLoc;
    }

    public String getMatGroupDesc() {
        return matGroupDesc;
    }
    @XmlElement(name = "MatGroupDesc")
    public void setMatGroupDesc(String matGroupDesc) {
        this.matGroupDesc = matGroupDesc;
    }

    public String getRequestType() {
        return requestType;
    }
    @XmlElement(name = "RequestType")
    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getCompanyCode() {
        return companyCode;
    }
    @XmlElement(name = "CompanyCode")
    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getContractType() {
        return contractType;
    }
    @XmlElement(name = "ContractType")
    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getCostCentre() {
        return costCentre;
    }
    @XmlElement(name = "CostCentre")
    public void setCostCentre(String costCentre) {
        this.costCentre = costCentre;
    }

    public String getActivationDate() {
        return activationDate;
    }
    @XmlElement(name = "ActivationDate")
    public void setActivationDate(String activationDate) {
        this.activationDate = activationDate;
    }

    public String getPurchaseGroup() {
        return purchaseGroup;
    }
    @XmlElement(name = "PurchaseGroup")
    public void setPurchaseGroup(String purchaseGroup) {
        this.purchaseGroup = purchaseGroup;
    }

    public String getPerPriceUnit() {
        return perPriceUnit;
    }
    @XmlElement(name = "PRICEUNIT")
    public void setPerPriceUnit(String perPriceUnit) {
        this.perPriceUnit = perPriceUnit;
    }

    public String getLcAmount() {
        return lcAmount;
    }
    @XmlElement(name = "LCAmount")
    public void setLcAmount(String lcAmount) {
        this.lcAmount = lcAmount;
    }

    public String getTenderTitle() {
        return tenderTitle;
    }
     @XmlElement(name = "TenderTitle")
    public void setTenderTitle(String tenderTitle) {
        this.tenderTitle = tenderTitle;
    }

    public String getOldMaterialNo() {
        return oldMaterialNo;
    }
    @XmlElement(name = "OldMaterialNo")
    public void setOldMaterialNo(String oldMaterialNo) {
        this.oldMaterialNo = oldMaterialNo;
    }

    public String getCountryOrigin() {
        return countryOrigin;
    }
    @XmlElement(name = "CountryOrigin")
    public void setCountryOrigin(String countryOrigin) {
        this.countryOrigin = countryOrigin;
    }

    public String getUomStore() {
        return uomStore;
    }
    @XmlElement(name = "UOMStore")
    public void setUomStore(String uomStore) {
        this.uomStore = uomStore;
    }
    
    
    
    
    
}
