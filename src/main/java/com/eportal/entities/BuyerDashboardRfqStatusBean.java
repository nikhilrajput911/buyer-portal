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
public class BuyerDashboardRfqStatusBean implements Serializable{
    
    @Id
    private Integer rowNumber;
    private String rfqId;
    private String rfqNumber;
    private String rfqTitle;
    private String rfqStatus;
    private String rfqCloseDate;
    private String vendorCount;
    private String vendorResponse;

    public Integer getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(Integer rowNumber) {
        this.rowNumber = rowNumber;
    }

    public String getRfqId() {
        return rfqId;
    }

    public void setRfqId(String rfqId) {
        this.rfqId = rfqId;
    }

    public String getRfqNumber() {
        return rfqNumber;
    }

    public void setRfqNumber(String rfqNumber) {
        this.rfqNumber = rfqNumber;
    }

    public String getRfqTitle() {
        return rfqTitle;
    }

    public void setRfqTitle(String rfqTitle) {
        this.rfqTitle = rfqTitle;
    }

    public String getRfqStatus() {
        return rfqStatus;
    }

    public void setRfqStatus(String rfqStatus) {
        this.rfqStatus = rfqStatus;
    }

    public String getRfqCloseDate() {
        return rfqCloseDate;
    }

    public void setRfqCloseDate(String rfqCloseDate) {
        this.rfqCloseDate = rfqCloseDate;
    }

    public String getVendorCount() {
        return vendorCount;
    }

    public void setVendorCount(String vendorCount) {
        this.vendorCount = vendorCount;
    }

    public String getVendorResponse() {
        return vendorResponse;
    }

    public void setVendorResponse(String vendorResponse) {
        this.vendorResponse = vendorResponse;
    }
    
}
