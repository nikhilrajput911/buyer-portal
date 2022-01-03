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
public class BuyerPendingPRLineItemsBean implements Serializable {

    @Id

    private Integer rOWNO;
    private String companyCode;
    private String plant;
    private String pRQuantity;
    private String pRNumber;
    //   private String pRLineNumber;
    // private String itemCode;
    //   private String pRRequester;
    private String currency;
//    private String department;
    private String uoM;
    //   private String noOfDaysOverdue;
    //  private String itemText;
    private String pRCreator;
    //  private String insertionOrderID;
    private String pID;
    private String linkId;
    private String remainingQuantity;
    private String poText;
    private String prCreatorEmailId;

    //private Integer ROWNO;
    private String insertionOrderId;
    private String purchaseRequestNumber;
    private String itemNumber;
    // private String plant;
    private String materialCode;
    private String shortText;
    private String materialLongText;
    // private String unit;
    // private String quantity;
    // private String currency;
    private String priceUnit;
    private String deliveryDate;
    //private String companyCode;
    private String itemText;
    private String departmentDescription;
    private String materialPOText;
    private String requisitionDate;
    private String storageLocation;
    private String initiatorId;
    private String itemNote;
    private String approverName;
    private String approvedDate;
    private String overDue;
    private String buyerName;
    private String localPurchase;
    private String miqaMaterial;
    private String leadTime;
    private String headerNote;
    private String buyerId;
    private String oldMaterialCode;
    private String uomStore;
    //private String processInstId;
    private String plantCode;

    public Integer getrOWNO() {
        return rOWNO;
    }

    public void setrOWNO(Integer rOWNO) {
        this.rOWNO = rOWNO;
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

    public String getpRQuantity() {
        return pRQuantity;
    }

    public void setpRQuantity(String pRQuantity) {
        this.pRQuantity = pRQuantity;
    }

    public String getpRNumber() {
        return pRNumber;
    }

    public void setpRNumber(String pRNumber) {
        this.pRNumber = pRNumber;
    }

//    public String getpRLineNumber() {
//        return pRLineNumber;
//    }
//
//    public void setpRLineNumber(String pRLineNumber) {
//        this.pRLineNumber = pRLineNumber;
//    }
//    public String getItemCode() {
//        return itemCode;
//    }
//
//    public void setItemCode(String itemCode) {
//        this.itemCode = itemCode;
//    }
//
//    public String getpRRequester() {
//        return pRRequester;
//    }
//
//    public void setpRRequester(String pRRequester) {
//        this.pRRequester = pRRequester;
//    }
    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDepartmentDescription() {
        return departmentDescription;
    }

    public void setDepartmentDescription(String departmentDescription) {
        this.departmentDescription = departmentDescription;
    }

    public String getUoM() {
        return uoM;
    }

    public void setUoM(String uoM) {
        this.uoM = uoM;
    }

//    public String getNoOfDaysOverdue() {
//        return noOfDaysOverdue;
//    }
//
//    public void setNoOfDaysOverdue(String noOfDaysOverdue) {
//        this.noOfDaysOverdue = noOfDaysOverdue;
//    }
    public String getItemText() {
        return itemText;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    public String getpRCreator() {
        return pRCreator;
    }

    public void setpRCreator(String pRCreator) {
        this.pRCreator = pRCreator;
    }

//    public String getInsertionOrderID() {
//        return insertionOrderID;
//    }
//
//    public void setInsertionOrderID(String insertionOrderID) {
//        this.insertionOrderID = insertionOrderID;
//    }
    public String getpID() {
        return pID;
    }

    public void setpID(String pID) {
        this.pID = pID;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getRemainingQuantity() {
        return remainingQuantity;
    }

    public void setRemainingQuantity(String remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }

    public String getPoText() {
        return poText;
    }

    public void setPoText(String poText) {
        this.poText = poText;
    }

    public String getPrCreatorEmailId() {
        return prCreatorEmailId;
    }

    public void setPrCreatorEmailId(String prCreatorEmailId) {
        this.prCreatorEmailId = prCreatorEmailId;
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

    public String getInitiatorId() {
        return initiatorId;
    }

    public void setInitiatorId(String initiatorId) {
        this.initiatorId = initiatorId;
    }

    public String getItemNote() {
        return itemNote;
    }

    public void setItemNote(String itemNote) {
        this.itemNote = itemNote;
    }

    public String getApproverName() {
        return approverName;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public String getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(String approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getOverDue() {
        return overDue;
    }

    public void setOverDue(String overDue) {
        this.overDue = overDue;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
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

    public String getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(String leadTime) {
        this.leadTime = leadTime;
    }

    public String getHeaderNote() {
        return headerNote;
    }

    public void setHeaderNote(String headerNote) {
        this.headerNote = headerNote;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getOldMaterialCode() {
        return oldMaterialCode;
    }

    public void setOldMaterialCode(String oldMaterialCode) {
        this.oldMaterialCode = oldMaterialCode;
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

}
