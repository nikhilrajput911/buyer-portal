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
public class BuyerDashboardPrStatusChartBean implements Serializable {
    
    @Id
    private Integer rowNumber;
    private String prPendingPo;
    private String rfqPrPendingPo;
    private String pendingPoForApproval;

    public Integer getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(Integer rowNumber) {
        this.rowNumber = rowNumber;
    }

    public String getPrPendingPo() {
        return prPendingPo;
    }

    public void setPrPendingPo(String prPendingPo) {
        this.prPendingPo = prPendingPo;
    }

    public String getRfqPrPendingPo() {
        return rfqPrPendingPo;
    }

    public void setRfqPrPendingPo(String rfqPrPendingPo) {
        this.rfqPrPendingPo = rfqPrPendingPo;
    }

    public String getPendingPoForApproval() {
        return pendingPoForApproval;
    }

    public void setPendingPoForApproval(String pendingPoForApproval) {
        this.pendingPoForApproval = pendingPoForApproval;
    }
    
}
