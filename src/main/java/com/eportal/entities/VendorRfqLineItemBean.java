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
public class VendorRfqLineItemBean implements Serializable {
    @Id
    private Integer ROWNO;
    private String insertionOrderId;
    private String purchaseRequestNumber;
    private String itemNumber;
    private String plant;
    private String materialCode;
    private String shortText;
    private String materialLongText;
    private String unit;
//    private String quantity;
    private String alternateMaterial;
    private String brand;
    private String quantityAvailable;
    private String vendorCurrency;
    private String vendorUnitQuantity;
    private String vendorUnit;
    private String vendorPriceOfferedPerUnit;
    private String vendorPriceOfferedTotal;
    private String expectedDeliveryDate;
    private String procInstId;
    private String linkId;
    private String plantName;
    private String buyerBaselinePrice;
    private String usedQuantity;
    private String leadTime;
    private String quantityTolerance;
    private String moqMov;
    private String manufacturingOrigin;
    private String itemTextLineItem;

    public Integer getROWNO() {
        return ROWNO;
    }

    public void setROWNO(Integer ROWNO) {
        this.ROWNO = ROWNO;
    }

    public String getInsertionOrderId() {
        return insertionOrderId;
    }

    public void setInsertionOrderId(String insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public String getPurchaseRequestNumber() {
        return purchaseRequestNumber;
    }

    public void setPurchaseRequestNumber(String purchaseRequestNumber) {
        this.purchaseRequestNumber = purchaseRequestNumber;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getMaterialLongText() {
        return materialLongText;
    }

    public void setMaterialLongText(String materialLongText) {
        this.materialLongText = materialLongText;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

//    public String getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(String quantity) {
//        this.quantity = quantity;
//    }

    public String getAlternateMaterial() {
        return alternateMaterial;
    }

    public void setAlternateMaterial(String alternateMaterial) {
        this.alternateMaterial = alternateMaterial;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(String quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public String getVendorCurrency() {
        return vendorCurrency;
    }

    public void setVendorCurrency(String vendorCurrency) {
        this.vendorCurrency = vendorCurrency;
    }

    public String getVendorUnitQuantity() {
        return vendorUnitQuantity;
    }

    public void setVendorUnitQuantity(String vendorUnitQuantity) {
        this.vendorUnitQuantity = vendorUnitQuantity;
    }

    public String getVendorUnit() {
        return vendorUnit;
    }

    public void setVendorUnit(String vendorUnit) {
        this.vendorUnit = vendorUnit;
    }

    public String getVendorPriceOfferedPerUnit() {
        return vendorPriceOfferedPerUnit;
    }

    public void setVendorPriceOfferedPerUnit(String vendorPriceOfferedPerUnit) {
        this.vendorPriceOfferedPerUnit = vendorPriceOfferedPerUnit;
    }

    public String getVendorPriceOfferedTotal() {
        return vendorPriceOfferedTotal;
    }

    public void setVendorPriceOfferedTotal(String vendorPriceOfferedTotal) {
        this.vendorPriceOfferedTotal = vendorPriceOfferedTotal;
    }

    public String getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(String expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public String getBuyerBaselinePrice() {
        return buyerBaselinePrice;
    }

    public void setBuyerBaselinePrice(String buyerBaselinePrice) {
        this.buyerBaselinePrice = buyerBaselinePrice;
    }
    public String getUsedQuantity() {
        return usedQuantity;
    }

    public void setUsedQuantity(String usedQuantity) {
        this.usedQuantity = usedQuantity;
    }
    
    public String getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(String leadTime) {
        this.leadTime = leadTime;
    }

    public String getQuantityTolerance() {
        return quantityTolerance;
    }

    public void setQuantityTolerance(String quantityTolerance) {
        this.quantityTolerance = quantityTolerance;
    }

    public String getMoqMov() {
        return moqMov;
    }

    public void setMoqMov(String moqMov) {
        this.moqMov = moqMov;
    }

    public String getManufacturingOrigin() {
        return manufacturingOrigin;
    }

    public void setManufacturingOrigin(String manufacturingOrigin) {
        this.manufacturingOrigin = manufacturingOrigin;
    }

    public String getItemTextLineItem() {
        return itemTextLineItem;
    }

    public void setItemTextLineItem(String itemTextLineItem) {
        this.itemTextLineItem = itemTextLineItem;
    }
    
}
