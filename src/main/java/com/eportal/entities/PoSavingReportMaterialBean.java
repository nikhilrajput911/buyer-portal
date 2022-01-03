/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author admin
 */
@Entity
public class PoSavingReportMaterialBean implements Serializable{
    @Id
    private Integer rowNo;
    private String companyCode;
    private String plant;
    private String purchasingGroup;
    private String vendorCode;
    private String vendorName;
    private String docType;
    private String quotationNo;
    private String accountAssignmentCategory;
    private String purchaseOrderNumber;
    private String poDate;
    private String itemNumber;
    private String materialCode;
    private String materialType;
    private String externalMaterialGroup;
    private String itemShortText;
    private String poQuantity;
    private String uom;
    private String lowestRfqUnitPrice;
    private String lowestRfqCurrency;
    private String lowestRfqVendor;
    private String poCurrency;
    private String priceUnit;
    private String exchangeRate;

    public Integer getRowNo() {
        return rowNo;
    }

    public void setRowNo(Integer rowNo) {
        this.rowNo = rowNo;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getPurchasingGroup() {
        return purchasingGroup;
    }

    public void setPurchasingGroup(String purchasingGroup) {
        this.purchasingGroup = purchasingGroup;
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

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public String getQuotationNo() {
        return quotationNo;
    }

    public void setQuotationNo(String quotationNo) {
        this.quotationNo = quotationNo;
    }

    public String getAccountAssignmentCategory() {
        return accountAssignmentCategory;
    }

    public void setAccountAssignmentCategory(String accountAssignmentCategory) {
        this.accountAssignmentCategory = accountAssignmentCategory;
    }

    public String getPurchaseOrderNumber() {
        return purchaseOrderNumber;
    }

    public void setPurchaseOrderNumber(String purchaseOrderNumber) {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }

    public String getPoDate() {
        return poDate;
    }

    public void setPoDate(String poDate) {
        this.poDate = poDate;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getExternalMaterialGroup() {
        return externalMaterialGroup;
    }

    public void setExternalMaterialGroup(String externalMaterialGroup) {
        this.externalMaterialGroup = externalMaterialGroup;
    }

    public String getItemShortText() {
        return itemShortText;
    }

    public void setItemShortText(String itemShortText) {
        this.itemShortText = itemShortText;
    }

    public String getPoQuantity() {
        return poQuantity;
    }

    public void setPoQuantity(String poQuantity) {
        this.poQuantity = poQuantity;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getLowestRfqUnitPrice() {
        return lowestRfqUnitPrice;
    }

    public void setLowestRfqUnitPrice(String lowestRfqUnitPrice) {
        this.lowestRfqUnitPrice = lowestRfqUnitPrice;
    }

    public String getLowestRfqCurrency() {
        return lowestRfqCurrency;
    }

    public void setLowestRfqCurrency(String lowestRfqCurrency) {
        this.lowestRfqCurrency = lowestRfqCurrency;
    }

    public String getLowestRfqVendor() {
        return lowestRfqVendor;
    }

    public void setLowestRfqVendor(String lowestRfqVendor) {
        this.lowestRfqVendor = lowestRfqVendor;
    }

    public String getPoCurrency() {
        return poCurrency;
    }

    public void setPoCurrency(String poCurrency) {
        this.poCurrency = poCurrency;
    }

    public String getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
    }

    public String getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(String exchangeRate) {
        this.exchangeRate = exchangeRate;
    }
    
}
