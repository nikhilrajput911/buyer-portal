/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;

/**
 *
 * @author admin
 */
@Entity
public class PORfqLineItemBean implements Serializable {

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
    private String usedQuantity;
    private String localPurchase;
    private String miqaMaterial;
    private String ageingOfPr;
//    private String notesToSupplier;         //
    private String noteToBuyer;
    private String prRequestor;
    private String oldMaterialCode;
    private String pricePerUnit;
    private String uomStore;
    private String prCreator;                   //
    private String plantName;
    private String plantDescription;
    private String rfqLineId;
    private String requester;
    private String currentWorkstep;
    private String accountAssignment;
    private String itemCategory;
    private String criticality;
    private String deliveryDateCategory;
    private String materialGroup;
    private String purchaseOrganization;
    private String purchasingGroup;
    private String infoRecord;
    private String prType;
    private String total;
    private String company;
    private String requisitionerId;
    private String valuationPrice;
    private String noLimit;
    private String overAllLimit;
    private String expectedValue;
//    @Temporal(javax.persistence.TemporalType.DATE)
//    private Date delDate;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date reqDate;
    private String invoiceReceipt;
    private String goodsReceipt;
    

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

    public String getUsedQuantity() {
        return usedQuantity;
    }

    public void setUsedQuantity(String usedQuantity) {
        this.usedQuantity = usedQuantity;
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

//    public String getNotesToSupplier() {
//        return notesToSupplier;
//    }
//
//    public void setNotesToSupplier(String notesToSupplier) {
//        this.notesToSupplier = notesToSupplier;
//    }
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

    public String getPrCreator() {
        return prCreator;
    }

    public void setPrCreator(String prCreator) {
        this.prCreator = prCreator;
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

    public String getRfqLineId() {
        return rfqLineId;
    }

    public void setRfqLineId(String rfqLineId) {
        this.rfqLineId = rfqLineId;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public String getCurrentWorkstep() {
        return currentWorkstep;
    }

    public void setCurrentWorkstep(String currentWorkstep) {
        this.currentWorkstep = currentWorkstep;
    }

    public String getAccountAssignment() {
        return accountAssignment;
    }

    public void setAccountAssignment(String accountAssignment) {
        this.accountAssignment = accountAssignment;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getCriticality() {
        return criticality;
    }

    public void setCriticality(String criticality) {
        this.criticality = criticality;
    }

    public String getDeliveryDateCategory() {
        return deliveryDateCategory;
    }

    public void setDeliveryDateCategory(String deliveryDateCategory) {
        this.deliveryDateCategory = deliveryDateCategory;
    }

    public String getMaterialGroup() {
        return materialGroup;
    }

    public void setMaterialGroup(String materialGroup) {
        this.materialGroup = materialGroup;
    }

    public String getPurchaseOrganization() {
        return purchaseOrganization;
    }

    public void setPurchaseOrganization(String purchaseOrganization) {
        this.purchaseOrganization = purchaseOrganization;
    }

    public String getPurchasingGroup() {
        return purchasingGroup;
    }

    public void setPurchasingGroup(String purchasingGroup) {
        this.purchasingGroup = purchasingGroup;
    }

//    public String getpRCreator() {
//        return pRCreator;
//    }
//
//    public void setpRCreator(String pRCreator) {
//        this.pRCreator = pRCreator;
//    }
    public String getInfoRecord() {
        return infoRecord;
    }

    public void setInfoRecord(String infoRecord) {
        this.infoRecord = infoRecord;
    }

    public String getPrType() {
        return prType;
    }

    public void setPrType(String prType) {
        this.prType = prType;
    }
    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRequisitionerId() {
        return requisitionerId;
    }

    public void setRequisitionerId(String requisitionerId) {
        this.requisitionerId = requisitionerId;
    }

    public String getValuationPrice() {
        return valuationPrice;
    }

    public void setValuationPrice(String valuationPrice) {
        this.valuationPrice = valuationPrice;
    }

    public String getNoLimit() {
        return noLimit;
    }

    public void setNoLimit(String noLimit) {
        this.noLimit = noLimit;
    }

    public String getOverAllLimit() {
        return overAllLimit;
    }

    public void setOverAllLimit(String overAllLimit) {
        this.overAllLimit = overAllLimit;
    }

    public String getExpectedValue() {
        return expectedValue;
    }

    public void setExpectedValue(String expectedValue) {
        this.expectedValue = expectedValue;
    }

//    public Date getDelDate() {
//        return delDate;
//    }
//
//    public void setDelDate(Date delDate) {
//        this.delDate = delDate;
//    }

    public Date getReqDate() {
        return reqDate;
    }

    public void setReqDate(Date reqDate) {
        this.reqDate = reqDate;
    }
    
    public String getInvoiceReceipt() {
        return invoiceReceipt;
    }

    public void setInvoiceReceipt(String invoiceReceipt) {
        this.invoiceReceipt = invoiceReceipt;
    }

    public String getGoodsReceipt() {
        return goodsReceipt;
    }

    public void setGoodsReceipt(String goodsReceipt) {
        this.goodsReceipt = goodsReceipt;
    }
}
