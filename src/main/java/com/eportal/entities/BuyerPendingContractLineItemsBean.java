/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;

/**
 *
 * @author admin
 */
@Entity
public class BuyerPendingContractLineItemsBean implements Serializable {
 //   @Id
  //  private Integer rOWNO;
   // private String refno;
   // private String activationDate;
    @Id
    private String transactionID;
    private String companyCode;
    private String tenderNumber;
    private String tenderTitle;
    private BigDecimal oLAAmount;
     private String tenderCreatedBy;
    @Temporal(javax.persistence.TemporalType.DATE)
     private Date tenderCreatedOn;
    private String overDue;

    public String getOverDue() {
        return overDue;
    }

    public void setOverDue(String overDue) {
        this.overDue = overDue;
    }
    
//    private String materialCode;
//    private String materialGroup;
//    private String uOM;
//    private String quantity;

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    
//    public String getMaterialCode() {
//        return materialCode;
//    }
//
//    public void setMaterialCode(String MaterialCode) {
//        this.materialCode = MaterialCode;
//    }
//
//    public String getMaterialGroup() {
//        return materialGroup;
//    }
//
//    public void setMaterialGroup(String MaterialGroup) {
//        this.materialGroup = MaterialGroup;
//    }
//
//    public String getUOM() {
//        return uOM;
//    }
//
//    public void setUOM(String UOM) {
//        this.uOM = UOM;
//    }
//
//    public String getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(String Quantity) {
//        this.quantity = Quantity;
//    }
////    private String plant;
////
////   
////    private String itemCode;
////    private String pRRequester;
////    private String uoM;
////    private String noOfDaysOverdue;
////    private String itemText;
////    private String pRCreator;
//    private String insertionOrderID;
//    private String pID;
////    private String linkId;
////    private String remainingQuantity;
////    private String prText;
//
//    public String getActivationDate() {
//        return activationDate;
//    }
//
//    public void setActivationDate(String activationDate) {
//        this.activationDate = activationDate;
//    }
//
//    public Integer getrOWNO() {
//        return rOWNO;
//    }
//
//    public void setrOWNO(Integer rOWNO) {
//        this.rOWNO = rOWNO;
//    }
// public String getRefno() {
//        return refno;
//    }
//
//    public void setRefno(String refno) {
//        this.refno = refno;
//    }
//    public String getCompanyCode() {
//        return companyCode;
//    }
//
//    public void setCompanyCode(String companyCode) {
//        this.companyCode = companyCode;
//    }
//
//    public String getPlant() {
//        return plant;
//    }
//
//    public void setPlant(String plant) {
//        this.plant = plant;
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

 

   

//    public String getUoM() {
//        return uoM;
//    }
//
//    public void setUoM(String uoM) {
//        this.uoM = uoM;
//    }
//
//    public String getNoOfDaysOverdue() {
//        return noOfDaysOverdue;
//    }
//
//    public void setNoOfDaysOverdue(String noOfDaysOverdue) {
//        this.noOfDaysOverdue = noOfDaysOverdue;
//    }
//
//    public String getItemText() {
//        return itemText;
//    }
//
//    public void setItemText(String itemText) {
//        this.itemText = itemText;
//    }
//
//    public String getpRCreator() {
//        return pRCreator;
//    }

//    public void setpRCreator(String pRCreator) {
//        this.pRCreator = pRCreator;
//    }
//
//    public String getInsertionOrderID() {
//        return insertionOrderID;
//    }
//
//    public void setInsertionOrderID(String insertionOrderID) {
//        this.insertionOrderID = insertionOrderID;
//    }
//
//    public String getpID() {
//        return pID;
//    }
//
//    public void setpID(String pID) {
//        this.pID = pID;
//    }
//
//    public String getLinkId() {
//        return linkId;
//    }
//
//    public void setLinkId(String linkId) {
//        this.linkId = linkId;
//    }
//
//    public String getRemainingQuantity() {
//        return remainingQuantity;
//    }
//
//    public void setRemainingQuantity(String remainingQuantity) {
//        this.remainingQuantity = remainingQuantity;
//    }

//    public String getPrText() {
//        return prText;
//    }
//
//    public void setPrText(String prText) {
//        this.prText = prText;
//    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getTenderNumber() {
        return tenderNumber;
    }

    public void setTenderNumber(String tenderNumber) {
        this.tenderNumber = tenderNumber;
    }

    public String getTenderTitle() {
        return tenderTitle;
    }

    public void setTenderTitle(String tendorTitle) {
        this.tenderTitle = tendorTitle;
    }

    public BigDecimal getoLAAmount() {
        return oLAAmount;
    }

    public void setoLAAmount(BigDecimal oLAAmount) {
        this.oLAAmount = oLAAmount;
    }

    public String getTenderCreatedBy() {
        return tenderCreatedBy;
    }

    public void setTenderCreatedBy(String tenderCreatedBy) {
        this.tenderCreatedBy = tenderCreatedBy;
    }

    public Date getTenderCreatedOn() {
        return tenderCreatedOn;
    }

    public void setTenderCreatedOn(Date tenderCreatedOn) {
        this.tenderCreatedOn = tenderCreatedOn;
    }
   
}
