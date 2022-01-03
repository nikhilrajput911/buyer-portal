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
public class RfqPrLineItemBean implements Serializable {
    @Id
    private Integer ROWNO;
    private String insertionOrderId;
    private String purchaseRequestNumber;
    private String itemNumber;
    private String plantCode;
    private String materialCode;
    private String shortText;
    private String materialLongText;
    private String unit;
    private String quantity;
    private String currency;
    private String priceUnit;
    private String deliveryDate;
    private String companyCode;
    private String itemText;
    private String departmentDescription;
    private String materialPOText;
    private String requisitionDate;
    private String storageLocation;
    private String remainingQuantity;
    private String description;
    private String linkId;
    private String procInstId;
    private String currentWorkstep;
    private String requester;
    private String localPurchase;
    private String miqaMaterial;
    private String ageingOfPr;
    private String noteToBuyer;
    private String prRequestor;
    private String oldMaterialCode;
    private String pricePerUnit;
    private String uomStore;
    private String plantName;
    private String plantDescription;
    private String deliveryDateCategory;

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

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getItemText() {
        return itemText;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    public String getDepartmentDescription() {
        return departmentDescription;
    }

    public void setDepartmentDescription(String departmentDescription) {
        this.departmentDescription = departmentDescription;
    }

    public String getMaterialPOText() {
        return materialPOText;
    }

    public void setMaterialPOText(String materialPOText) {
        this.materialPOText = materialPOText;
    }

    public String getRequisitionDate() {
        return requisitionDate;
    }

    public void setRequisitionDate(String requisitionDate) {
        this.requisitionDate = requisitionDate;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }

    public String getRemainingQuantity() {
        return remainingQuantity;
    }

    public void setRemainingQuantity(String remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public String getCurrentWorkstep() {
        return currentWorkstep;
    }

    public void setCurrentWorkstep(String currentWorkstep) {
        this.currentWorkstep = currentWorkstep;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public String getLocalPurchase() {
        return localPurchase;
    }

    public void setLocalPurchase(String localPurchase) {
        this.localPurchase = localPurchase;
    }

    public String getMiqaMaterial() {
        return miqaMaterial;
    }

    public void setMiqaMaterial(String miqaMaterial) {
        this.miqaMaterial = miqaMaterial;
    }

    public String getAgeingOfPr() {
        return ageingOfPr;
    }

    public void setAgeingOfPr(String ageingOfPr) {
        this.ageingOfPr = ageingOfPr;
    }  

    public String getNoteToBuyer() {
        return noteToBuyer;
    }

    public void setNoteToBuyer(String noteToBuyer) {
        this.noteToBuyer = noteToBuyer;
    }
    public String getPrRequestor() {
        return prRequestor;
    }

    public void setPrRequestor(String prRequestor) {
        this.prRequestor = prRequestor;
    }

    public String getOldMaterialCode() {
        return oldMaterialCode;
    }

    public void setOldMaterialCode(String oldMaterialCode) {
        this.oldMaterialCode = oldMaterialCode;
    }

    public String getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(String pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }
    public String getUomStore() {
        return uomStore;
    }

    public void setUomStore(String uomStore) {
        this.uomStore = uomStore;
    }

    public String getPlantCode() {
        return plantCode;
    }

    public void setPlantCode(String plantCode) {
        this.plantCode = plantCode;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public String getPlantDescription() {
        return plantDescription;
    }

    public void setPlantDescription(String plantDescription) {
        this.plantDescription = plantDescription;
    }

    public String getDeliveryDateCategory() {
        return deliveryDateCategory;
    }

    public void setDeliveryDateCategory(String deliveryDateCategory) {
        this.deliveryDateCategory = deliveryDateCategory;
    }
    
}
