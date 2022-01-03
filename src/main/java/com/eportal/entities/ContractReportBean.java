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
 * @author ramkrishnan.elango
 */
@Entity
public class ContractReportBean implements Serializable {
    
    @Id
    private Integer ROWNO;
    private String insertionOrderId;
    private String coCode;
    private String contractNumber;
    private String contractTitle;
    private String currentStatus;
    private String serviceNumber;
    private String serviceGroup;
    private String olaNumber;
    private String contractApprovedDate;
    private String ageing;
    private String vendorName;
    private String validityStartDate;
    private String validityEndDate;
    private String differential;
    private String itemCode;
    private String activationdate;
    private String costCentre;
    private String contractCode;
    private String workmenCompensation;
    private String publicLiablity;
    private String bankerGuarantee;
    private String safeCertificate;
    private String riskAssessment;
    private String activityPerformed;
    private String dateTime;
    private String userName;
    private String buyerName;
    private String contractAckVendor;
    private String contractAckBuyer;
    private String contractNotAck;
    private String matieralServiceNo;
    private String contractInitiatedDate;
    private String cycleTime;
    private String supplierContractor;
    private String version;
    private String modifiedBy;
    private String modifiedOn;

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

    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getContractTitle() {
        return contractTitle;
    }

    public void setContractTitle(String contractTitle) {
        this.contractTitle = contractTitle;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public String getServiceNumber() {
        return serviceNumber;
    }

    public void setServiceNumber(String serviceNumber) {
        this.serviceNumber = serviceNumber;
    }

    public String getServiceGroup() {
        return serviceGroup;
    }

    public void setServiceGroup(String serviceGroup) {
        this.serviceGroup = serviceGroup;
    }

    public String getOlaNumber() {
        return olaNumber;
    }

    public void setOlaNumber(String olaNumber) {
        this.olaNumber = olaNumber;
    }

    public String getContractApprovedDate() {
        return contractApprovedDate;
    }

    public void setContractApprovedDate(String contractApprovedDate) {
        this.contractApprovedDate = contractApprovedDate;
    }

    public String getAgeing() {
        return ageing;
    }

    public void setAgeing(String ageing) {
        this.ageing = ageing;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getValidityStartDate() {
        return validityStartDate;
    }

    public void setValidityStartDate(String validityStartDate) {
        this.validityStartDate = validityStartDate;
    }

    public String getValidityEndDate() {
        return validityEndDate;
    }

    public void setValidityEndDate(String validityEndDate) {
        this.validityEndDate = validityEndDate;
    }

    public String getDifferential() {
        return differential;
    }

    public void setDifferential(String differential) {
        this.differential = differential;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getActivationdate() {
        return activationdate;
    }

    public void setActivationdate(String activationdate) {
        this.activationdate = activationdate;
    }

    public String getCostCentre() {
        return costCentre;
    }

    public void setCostCentre(String costCentre) {
        this.costCentre = costCentre;
    }

    public String getContractCode() {
        return contractCode;
    }

    public void setContractCode(String contractCode) {
        this.contractCode = contractCode;
    }

    public String getWorkmenCompensation() {
        return workmenCompensation;
    }

    public void setWorkmenCompensation(String workmenCompensation) {
        this.workmenCompensation = workmenCompensation;
    }

    public String getPublicLiablity() {
        return publicLiablity;
    }

    public void setPublicLiablity(String publicLiablity) {
        this.publicLiablity = publicLiablity;
    }

    public String getBankerGuarantee() {
        return bankerGuarantee;
    }

    public void setBankerGuarantee(String bankerGuarantee) {
        this.bankerGuarantee = bankerGuarantee;
    }

    public String getSafeCertificate() {
        return safeCertificate;
    }

    public void setSafeCertificate(String safeCertificate) {
        this.safeCertificate = safeCertificate;
    }

    public String getRiskAssessment() {
        return riskAssessment;
    }

    public void setRiskAssessment(String riskAssessment) {
        this.riskAssessment = riskAssessment;
    }

    public String getActivityPerformed() {
        return activityPerformed;
    }

    public void setActivityPerformed(String activityPerformed) {
        this.activityPerformed = activityPerformed;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getContractAckVendor() {
        return contractAckVendor;
    }

    public void setContractAckVendor(String contractAckVendor) {
        this.contractAckVendor = contractAckVendor;
    }

    public String getContractAckBuyer() {
        return contractAckBuyer;
    }

    public void setContractAckBuyer(String contractAckBuyer) {
        this.contractAckBuyer = contractAckBuyer;
    }

    public String getContractNotAck() {
        return contractNotAck;
    }

    public void setContractNotAck(String contractNotAck) {
        this.contractNotAck = contractNotAck;
    }

    public String getMatieralServiceNo() {
        return matieralServiceNo;
    }

    public void setMatieralServiceNo(String matieralServiceNo) {
        this.matieralServiceNo = matieralServiceNo;
    }

    public String getContractInitiatedDate() {
        return contractInitiatedDate;
    }

    public void setContractInitiatedDate(String contractInitiatedDate) {
        this.contractInitiatedDate = contractInitiatedDate;
    }

    public String getCycleTime() {
        return cycleTime;
    }

    public void setCycleTime(String cycleTime) {
        this.cycleTime = cycleTime;
    }

    public String getSupplierContractor() {
        return supplierContractor;
    }

    public void setSupplierContractor(String supplierContractor) {
        this.supplierContractor = supplierContractor;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public String getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(String modifiedOn) {
        this.modifiedOn = modifiedOn;
    }
    
    
    
    
}
