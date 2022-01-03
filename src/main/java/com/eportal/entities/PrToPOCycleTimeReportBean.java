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
public class PrToPOCycleTimeReportBean implements Serializable{
    
    @Id
    private Integer rowNumber;
    private String purchaseOrderType;
    private String purchaseOrderNumber;
    private String targetInDays;
    private String totalPrLines;
    private String avgTimeTaken;
    private String withinTarget;
    private String beyondTarget;
    private String lessThanEqual30DaysPrCount;
    private String equal30To60DaysPrCount;
    private String equal60To90DaysPrCount;
    private String greaterThan90DaysPrCount;

    public Integer getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(Integer rowNumber) {
        this.rowNumber = rowNumber;
    }

    public String getPurchaseOrderType() {
        return purchaseOrderType;
    }

    public void setPurchaseOrderType(String purchaseOrderType) {
        this.purchaseOrderType = purchaseOrderType;
    }

    public String getPurchaseOrderNumber() {
        return purchaseOrderNumber;
    }

    public void setPurchaseOrderNumber(String purchaseOrderNumber) {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }
    
    public String getTargetInDays() {
        return targetInDays;
    }

    public void setTargetInDays(String targetInDays) {
        this.targetInDays = targetInDays;
    }

    public String getTotalPrLines() {
        return totalPrLines;
    }

    public void setTotalPrLines(String totalPrLines) {
        this.totalPrLines = totalPrLines;
    }

    public String getAvgTimeTaken() {
        return avgTimeTaken;
    }

    public void setAvgTimeTaken(String avgTimeTaken) {
        this.avgTimeTaken = avgTimeTaken;
    }

    public String getWithinTarget() {
        return withinTarget;
    }

    public void setWithinTarget(String withinTarget) {
        this.withinTarget = withinTarget;
    }

    public String getBeyondTarget() {
        return beyondTarget;
    }

    public void setBeyondTarget(String beyondTarget) {
        this.beyondTarget = beyondTarget;
    }

    public String getLessThanEqual30DaysPrCount() {
        return lessThanEqual30DaysPrCount;
    }

    public void setLessThanEqual30DaysPrCount(String lessThanEqual30DaysPrCount) {
        this.lessThanEqual30DaysPrCount = lessThanEqual30DaysPrCount;
    }

    public String getEqual30To60DaysPrCount() {
        return equal30To60DaysPrCount;
    }

    public void setEqual30To60DaysPrCount(String equal30To60DaysPrCount) {
        this.equal30To60DaysPrCount = equal30To60DaysPrCount;
    }

    public String getEqual60To90DaysPrCount() {
        return equal60To90DaysPrCount;
    }

    public void setEqual60To90DaysPrCount(String equal60To90DaysPrCount) {
        this.equal60To90DaysPrCount = equal60To90DaysPrCount;
    }

    public String getGreaterThan90DaysPrCount() {
        return greaterThan90DaysPrCount;
    }

    public void setGreaterThan90DaysPrCount(String greaterThan90DaysPrCount) {
        this.greaterThan90DaysPrCount = greaterThan90DaysPrCount;
    }
    
}
