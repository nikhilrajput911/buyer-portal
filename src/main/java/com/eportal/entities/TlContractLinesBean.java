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
import javax.persistence.TemporalType;

/**
 *
 * @author admin
 */
@Entity
public class TlContractLinesBean implements Serializable {

    @Id
    //private Integer rowNO;
    private String transactionID;
    private String companyCode;
    // private String plantCode;
    private String tenderNumber;
    //private String purchaseGroup;
    //private String materialClass;
    private String tenderRaisedBy;
    private String tenderTitle;
    // private String userCostCenter;
    // @Temporal(TemporalType.TIMESTAMP)
    //@Temporal(javax.persistence.TemporalType.DATE)
    //private Date activationDate;
    //   private String requestType;
    private String type;
    private String buyerName;
    private Integer buyerID;
    //  private String materialGroup;
    private BigDecimal quantity;
    private BigDecimal total;
    private String overDue;

    public Integer getBuyerID() {
        return buyerID;
    }

    public void setBuyerID(Integer buyerID) {
        this.buyerID = buyerID;
    }

    public String getOverDue() {
        return overDue;
    }

    public void setOverDue(String overDue) {
        this.overDue = overDue;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.transactionID = TransactionID;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal Quantity) {
        this.quantity = Quantity;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal Total) {
        this.total = Total;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getTenderNumber() {
        return tenderNumber;
    }

    public void setTenderNumber(String tenderNumber) {
        this.tenderNumber = tenderNumber;
    }

    public String getTenderRaisedBy() {
        return tenderRaisedBy;
    }

    public void setTenderRaisedBy(String tenderRaisedBy) {
        this.tenderRaisedBy = tenderRaisedBy;
    }

    public String getTenderTitle() {
        return tenderTitle;
    }

    public void setTenderTitle(String tenderTitle) {
        this.tenderTitle = tenderTitle;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
