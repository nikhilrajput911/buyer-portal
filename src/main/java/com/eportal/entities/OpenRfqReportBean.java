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
public class OpenRfqReportBean implements Serializable {
    @Id
    private Integer RFQID;
    private String RFQNumber;
    private Integer VendorCount;
    private Integer VendorRespCount;
    private String VendorSelected;
    private String BuyerName;
    private Integer BuyerId;
    private Integer TotalPRLine;
    private String PRNumber;
    private String AgeingInDays;

    public Integer getRFQID() {
        return RFQID;
    }

    public void setRFQID(Integer RFQID) {
        this.RFQID = RFQID;
    }

    public String getRFQNumber() {
        return RFQNumber;
    }

    public void setRFQNumber(String RFQNumber) {
        this.RFQNumber = RFQNumber;
    }

    public Integer getVendorCount() {
        return VendorCount;
    }

    public void setVendorCount(Integer VendorCount) {
        this.VendorCount = VendorCount;
    }

    public Integer getVendorRespCount() {
        return VendorRespCount;
    }

    public void setVendorRespCount(Integer VendorRespCount) {
        this.VendorRespCount = VendorRespCount;
    }

    public String getVendorSelected() {
        return VendorSelected;
    }

    public void setVendorSelected(String VendorSelected) {
        this.VendorSelected = VendorSelected;
    }

    public String getBuyerName() {
        return BuyerName;
    }

    public void setBuyerName(String BuyerName) {
        this.BuyerName = BuyerName;
    }

    public Integer getBuyerId() {
        return BuyerId;
    }

    public void setBuyerId(Integer BuyerId) {
        this.BuyerId = BuyerId;
    }

    public Integer getTotalPRLine() {
        return TotalPRLine;
    }

    public void setTotalPRLine(Integer TotalPRLine) {
        this.TotalPRLine = TotalPRLine;
    }

    public String getPRNumber() {
        return PRNumber;
    }

    public void setPRNumber(String PRNumber) {
        this.PRNumber = PRNumber;
    }

    public String getAgeingInDays() {
        return AgeingInDays;
    }

    public void setAgeingInDays(String AgeingInDays) {
        this.AgeingInDays = AgeingInDays;
    }
    
    
}
