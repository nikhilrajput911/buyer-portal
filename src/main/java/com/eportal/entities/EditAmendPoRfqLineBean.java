package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author admin
 */
@Entity
public class EditAmendPoRfqLineBean implements Serializable{
    
    @Id
    private Integer rowNo;
    private String rfqId;
    private String rfqLineId;
    private String insertionOrderId;
    private String rfqNo;
    private String totalQuantity;
    private String remainingQuantity;
    private String purchaseRequestNumber;
    private String materialCode;
    private String materialGroup;
    private String shortText;
    private String rfqStatus;
    private String rfqLineItemNumber;

    public Integer getRowNo() {
        return rowNo;
    }

    public void setRowNo(Integer rowNo) {
        this.rowNo = rowNo;
    }

    public String getRfqId() {
        return rfqId;
    }

    public void setRfqId(String rfqId) {
        this.rfqId = rfqId;
    }

    public String getRfqLineId() {
        return rfqLineId;
    }

    public void setRfqLineId(String rfqLineId) {
        this.rfqLineId = rfqLineId;
    }

    public String getInsertionOrderId() {
        return insertionOrderId;
    }

    public void setInsertionOrderId(String insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public String getRfqNo() {
        return rfqNo;
    }

    public void setRfqNo(String rfqNo) {
        this.rfqNo = rfqNo;
    }

    public String getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(String totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public String getRemainingQuantity() {
        return remainingQuantity;
    }

    public void setRemainingQuantity(String remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }

    public String getPurchaseRequestNumber() {
        return purchaseRequestNumber;
    }

    public void setPurchaseRequestNumber(String purchaseRequestNumber) {
        this.purchaseRequestNumber = purchaseRequestNumber;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getMaterialGroup() {
        return materialGroup;
    }

    public void setMaterialGroup(String materialGroup) {
        this.materialGroup = materialGroup;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getRfqStatus() {
        return rfqStatus;
    }

    public void setRfqStatus(String rfqStatus) {
        this.rfqStatus = rfqStatus;
    }

    public String getRfqLineItemNumber() {
        return rfqLineItemNumber;
    }

    public void setRfqLineItemNumber(String rfqLineItemNumber) {
        this.rfqLineItemNumber = rfqLineItemNumber;
    }
    
}
