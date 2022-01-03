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
public class BuyerPRAfterRfqCreationBean implements Serializable {
    @Id
    private Integer rOWNO;
    private String companyCode;
    private String plant;
    private String pRQuantity;
    private String pRNumber;
    private String pRLineNumber;
    private String itemCode;
    private String pRRequester;
    private String currency;
    private String department;
    private String uoM;
    private String noOfDaysOverdue;
    private String itemText;
    private String pRCreator;
    private String insertionOrderID;
    private String pID;
    private String linkId;
    private String remainingQuantity;
    private String poText;

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

    public String getpRLineNumber() {
        return pRLineNumber;
    }

    public void setpRLineNumber(String pRLineNumber) {
        this.pRLineNumber = pRLineNumber;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getpRRequester() {
        return pRRequester;
    }

    public void setpRRequester(String pRRequester) {
        this.pRRequester = pRRequester;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getUoM() {
        return uoM;
    }

    public void setUoM(String uoM) {
        this.uoM = uoM;
    }

    public String getNoOfDaysOverdue() {
        return noOfDaysOverdue;
    }

    public void setNoOfDaysOverdue(String noOfDaysOverdue) {
        this.noOfDaysOverdue = noOfDaysOverdue;
    }

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

    public String getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(String insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

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
   
}
