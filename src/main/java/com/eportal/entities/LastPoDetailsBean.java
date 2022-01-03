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
public class LastPoDetailsBean implements Serializable{
    @Id
    private Integer rowNumber;
    private String lastPoNumber;
    private String lastPoDate;
    private String lastPoBuyer;
    private String lastPoSupplier;

    public Integer getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(Integer rowNumber) {
        this.rowNumber = rowNumber;
    }

    public String getLastPoNumber() {
        return lastPoNumber;
    }

    public void setLastPoNumber(String lastPoNumber) {
        this.lastPoNumber = lastPoNumber;
    }

    public String getLastPoDate() {
        return lastPoDate;
    }

    public void setLastPoDate(String lastPoDate) {
        this.lastPoDate = lastPoDate;
    }

    public String getLastPoBuyer() {
        return lastPoBuyer;
    }

    public void setLastPoBuyer(String lastPoBuyer) {
        this.lastPoBuyer = lastPoBuyer;
    }

    public String getLastPoSupplier() {
        return lastPoSupplier;
    }

    public void setLastPoSupplier(String lastPoSupplier) {
        this.lastPoSupplier = lastPoSupplier;
    }
    
}
