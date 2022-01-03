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
public class AdminDashboardCountBean implements Serializable {
    @Id
    private Integer rowNumber;
    private String buyerCount;
    private String vendorCount;
    private String prospectCount;
    private String reqForAuth;

    public Integer getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(Integer rowNumber) {
        this.rowNumber = rowNumber;
    }

    public String getBuyerCount() {
        return buyerCount;
    }

    public void setBuyerCount(String buyerCount) {
        this.buyerCount = buyerCount;
    }

    public String getVendorCount() {
        return vendorCount;
    }

    public void setVendorCount(String vendorCount) {
        this.vendorCount = vendorCount;
    }

    public String getProspectCount() {
        return prospectCount;
    }

    public void setProspectCount(String prospectCount) {
        this.prospectCount = prospectCount;
    }

    public String getReqForAuth() {
        return reqForAuth;
    }

    public void setReqForAuth(String reqForAuth) {
        this.reqForAuth = reqForAuth;
    }
    
    
}
