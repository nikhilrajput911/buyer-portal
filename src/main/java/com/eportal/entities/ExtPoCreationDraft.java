/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Ext_POCreation_Draft")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ExtPoCreationDraft.findAll", query = "SELECT n FROM ExtPoCreationDraft n")
})
public class ExtPoCreationDraft implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    
    @Size(max = 50)
    @Column(name = "PID")
    private String pid;
    @Size(max = 25)
    @Column(name = "CurrentWorkstep")
    private String currentWorkstep;
    @Size(max = 25)
    @Column(name = "PreviousWorkstep")
    private String previousWorkstep;
    @Column(name = "InitiatedDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date initiatedDate;
    @Size(max = 70)
    @Column(name = "InitiatorID")
    private String initiatorID;
    @Size(max = 70)
    @Column(name = "InitiatorEmailID")
    private String initiatorEmailID;
    @Size(max = 50)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 25)
    @Column(name = "RequestType")
    private String requestType;
    @Size(max = 25)
    @Column(name = "PurchaseRequestType")
    private String purchaseRequestType;
    @Size(max = 25)
    @Column(name = "PurchaseSubCategory")
    private String purchaseSubCategory;
    @Size(max = 25)
    @Column(name = "PurchaseRequestNumber")
    private String purchaseRequestNumber;
    @Size(max = 10)
    @Column(name = "PurchaseOrderNumber")
    private String purchaseOrderNumber;
    @Size(max = 50)
    @Column(name = "PurchaseOrderType")
    private String purchaseOrderType;
    @Size(max = 50)
    @Column(name = "ReferenceDocumentType")
    private String referenceDocumentType;
    @Size(max = 10)
    @Column(name = "ReferenceDocumentNumber")
    private String referenceDocumentNumber;
    @Size(max = 5)
    @Column(name = "ReferenceDocumentLine")
    private String referenceDocumentLine;
    @Size(max = 2147483647)
    @Column(name = "ReasonforPRAmendment")
    private String reasonforPRAmendment;
    @Size(max = 2147483647)
    @Column(name = "PRNotetoApprover")
    private String pRNotetoApprover;
    @Size(max = 20)
    @Column(name = "ActionTaken")
    private String actionTaken;
    @Size(max = 50)
    @Column(name = "QueryType")
    private String queryType;
    @Size(max = 50)
    @Column(name = "QueryUser")
    private String queryUser;
    @Size(max = 100)
    @Column(name = "QueryMail")
    private String queryMail;
    @Size(max = 50)
    @Column(name = "RejectionType")
    private String rejectionType;
    @Size(max = 50)
    @Column(name = "AckPO")
    private String ackPO;
    @Size(max = 500)
    @Column(name = "VendorName")
    private String vendorName;
    @Size(max = 10)
    @Column(name = "VendorCode")
    private String vendorCode;
    @Column(name = "DocumentDate")
    @Temporal(TemporalType.DATE)
    private Date documentDate;
    @Size(max = 5)
    @Column(name = "DownpaymentReqd")
    private String downpaymentReqd;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "valu")
    private BigDecimal valu;
    @Size(max = 4)
    @Column(name = "PurchasingOrg")
    private String purchasingOrg;
    @Size(max = 3)
    @Column(name = "PurchasingGrp")
    private String purchasingGrp;
    @Size(max = 10)
    @Column(name = "CollectiveNumber")
    private String collectiveNumber;
    @Size(max = 50)
    @Column(name = "Query_Responded_Flag")
    private String queryRespondedFlag;
    @Column(name = "AppCount_AfterReserve")
    private Integer appCountAfterReserve;
    @Size(max = 10)
    @Column(name = "ITApp_Count")
    private String iTAppCount;
    @Size(max = 200)
    @Column(name = "Reserved_User")
    private String reservedUser;    
    @Size(max = 100)
    @Column(name = "DownPaymentReqFor")
    private String downPaymentReqFor;
    @Size(max = 10)
    @Column(name = "AcknowledgeStatus")
    private String acknowledgeStatus;    
    @Column(name = "PurchaseOrderCreatedDate")
    @Temporal(TemporalType.DATE)
    private Date purchaseOrderCreatedDate;
    @Size(max = 20)
    @Column(name = "InternalOrder")
    private String internalOrder;
    @Size(max = 10)
    @Column(name = "bulkApprovalFlag")
    private String bulkApprovalFlag;
    @Size(max = 250)
    @Column(name = "TotalPOAmount")
    private String totalPOAmount;
    @Size(max = 250)
    @Column(name = "TotalPOAmtPOVendor")
    private String totalPOAmtPOVendor;
    @Size(max = 50)
    @Column(name = "LastProcessedUser")
    private String lastProcessedUser;
    @Size(max = 100)
    @Column(name = "RFQNo")
    private String RFQNo;
    @Column(name = "AckPOEntryDatetime")
    @Temporal(TemporalType.DATE)
    private Date ackPOEntryDatetime;
    @Size(max = 100)
    @Column(name = "AckBy")
    private String ackBy;
    @Size(max = 100)
    @Column(name = "AckByDetails")
    private String ackByDetails;
    @Column(name = "VendorSno")
    private Integer vendorSno;
    @Size(max = 50)
    @Column(name = "TempPoNumber")
    private String tempPoNumber;
    @Size(max = 20)
    @Column(name = "PrType")
    private String prType;
    @Size(max = 20)
    @Column(name = "PoFrom")
    private String poFrom;
    @Size(max = 10)
    @Column(name = "SelectedVendorId")
    private String selectedVendorId;
    @Size(max = 1000)
    @Column(name = "VendorFinalizationTableDataArrayAsJsonString")
    private String vendorFinalizationTableDataArrayAsJsonString;
    @Size(max = 20)
    @Column(name = "PoDocDate")
    private String poDocDate;
    @Size(max = 100)
    @Column(name = "NewPrLineInsertionOrderId")
    private String newPrLineInsertionOrderId;
    @Size(max = 200)
    @Column(name = "NewRfqLineRfqIdRfqLineIdInsertionOrderId")
    private String newRfqLineRfqIdRfqLineIdInsertionOrderId;
    @Size(max = 10)
    @Column(name = "ErrorTransactionStatus")
    private String errorTransactionStatus;
    @Size(max = 10)
    @Column(name = "Ordered")
    private String ordered;
    @Size(max = 10)
    @Column(name = "OrderedUnit")
    private String orderedUnit;
    @Size(max = 10)
    @Column(name = "OrderedTotalPrice")
    private String orderedTotalPrice;
    @Size(max = 10)
    @Column(name = "OrderedCurrency")
    private String orderedCurrency;
    @Size(max = 10)
    @Column(name = "Delivered")
    private String delivered;
    @Size(max = 10)
    @Column(name = "DeliveredUnit")
    private String deliveredUnit;
    @Size(max = 10)
    @Column(name = "DeliveredTotalPrice")
    private String deliveredTotalPrice;
    @Size(max = 10)
    @Column(name = "DeliveredCurrency")
    private String deliveredCurrency;
    @Size(max = 10)
    @Column(name = "StillToDeliv")
    private String stillToDeliv;
    @Size(max = 10)
    @Column(name = "StillToDelivUnit")
    private String stillToDelivUnit;
    @Size(max = 10)
    @Column(name = "StillToDelivTotalPrice")
    private String stillToDelivTotalPrice;
    @Size(max = 10)
    @Column(name = "StillToDelivCurrency")
    private String stillToDelivCurrency;
    @Size(max = 10)
    @Column(name = "Invoiced")
    private String invoiced;
    @Size(max = 10)
    @Column(name = "InvoicedUnit")
    private String invoicedUnit;
    @Size(max = 10)
    @Column(name = "InvoicedTotalPrice")
    private String invoicedTotalPrice;
    @Size(max = 10)
    @Column(name = "InvoicedCurrency")
    private String invoicedCurrency;
    @Size(max = 10)
    @Column(name = "Downpayments")
    private String downpayments;
    @Size(max = 10)
    @Column(name = "DownpaymentsUnit")
    private String downpaymentsUnit;
    @Size(max = 10)
    @Column(name = "DownpaymentsTotalPrice")
    private String downpaymentsTotalPrice;
    @Size(max = 10)
    @Column(name = "DownpaymentsCurrency")
    private String downpaymentsCurrency;
    @Size(max = 30)
    @Column(name = "PoSequenceNumber")
    private String poSequenceNumber;
    @Column(name = "HeaderConditionsNew", columnDefinition = "ntext")
    private String headerConditionsNew;
    @Size(max = 20)
    @Column(name = "Kalsm")
    private String kalsm;

    public ExtPoCreationDraft() {
    }

    public ExtPoCreationDraft(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getCurrentWorkstep() {
        return currentWorkstep;
    }

    public void setCurrentWorkstep(String currentWorkstep) {
        this.currentWorkstep = currentWorkstep;
    }

    public String getPreviousWorkstep() {
        return previousWorkstep;
    }

    public void setPreviousWorkstep(String previousWorkstep) {
        this.previousWorkstep = previousWorkstep;
    }

    public String getInitiatorID() {
        return initiatorID;
    }

    public void setInitiatorID(String initiatorID) {
        this.initiatorID = initiatorID;
    }

    public String getInitiatorEmailID() {
        return initiatorEmailID;
    }

    public void setInitiatorEmailID(String initiatorEmailID) {
        this.initiatorEmailID = initiatorEmailID;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getPurchaseRequestType() {
        return purchaseRequestType;
    }

    public void setPurchaseRequestType(String purchaseRequestType) {
        this.purchaseRequestType = purchaseRequestType;
    }

    public String getPurchaseSubCategory() {
        return purchaseSubCategory;
    }

    public void setPurchaseSubCategory(String purchaseSubCategory) {
        this.purchaseSubCategory = purchaseSubCategory;
    }

    public String getPurchaseRequestNumber() {
        return purchaseRequestNumber;
    }

    public void setPurchaseRequestNumber(String purchaseRequestNumber) {
        this.purchaseRequestNumber = purchaseRequestNumber;
    }

    public String getPurchaseOrderNumber() {
        return purchaseOrderNumber;
    }

    public void setPurchaseOrderNumber(String purchaseOrderNumber) {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }

    public String getPurchaseOrderType() {
        return purchaseOrderType;
    }

    public void setPurchaseOrderType(String purchaseOrderType) {
        this.purchaseOrderType = purchaseOrderType;
    }

    public String getReferenceDocumentType() {
        return referenceDocumentType;
    }

    public void setReferenceDocumentType(String referenceDocumentType) {
        this.referenceDocumentType = referenceDocumentType;
    }

    public String getReferenceDocumentNumber() {
        return referenceDocumentNumber;
    }

    public void setReferenceDocumentNumber(String referenceDocumentNumber) {
        this.referenceDocumentNumber = referenceDocumentNumber;
    }

    public String getReferenceDocumentLine() {
        return referenceDocumentLine;
    }

    public void setReferenceDocumentLine(String referenceDocumentLine) {
        this.referenceDocumentLine = referenceDocumentLine;
    }

    public String getReasonforPRAmendment() {
        return reasonforPRAmendment;
    }

    public void setReasonforPRAmendment(String reasonforPRAmendment) {
        this.reasonforPRAmendment = reasonforPRAmendment;
    }

    public String getPRNotetoApprover() {
        return pRNotetoApprover;
    }

    public void setPRNotetoApprover(String pRNotetoApprover) {
        this.pRNotetoApprover = pRNotetoApprover;
    }

    public String getActionTaken() {
        return actionTaken;
    }

    public void setActionTaken(String actionTaken) {
        this.actionTaken = actionTaken;
    }

    public String getQueryType() {
        return queryType;
    }

    public void setQueryType(String queryType) {
        this.queryType = queryType;
    }

    public String getQueryUser() {
        return queryUser;
    }

    public void setQueryUser(String queryUser) {
        this.queryUser = queryUser;
    }

    public String getQueryMail() {
        return queryMail;
    }

    public void setQueryMail(String queryMail) {
        this.queryMail = queryMail;
    }

    public String getRejectionType() {
        return rejectionType;
    }

    public void setRejectionType(String rejectionType) {
        this.rejectionType = rejectionType;
    }

    public String getAckPO() {
        return ackPO;
    }

    public void setAckPO(String ackPO) {
        this.ackPO = ackPO;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public Date getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(Date documentDate) {
        this.documentDate = documentDate;
    }

    public String getDownpaymentReqd() {
        return downpaymentReqd;
    }

    public void setDownpaymentReqd(String downpaymentReqd) {
        this.downpaymentReqd = downpaymentReqd;
    }

    public BigDecimal getValu() {
        return valu;
    }

    public void setValu(BigDecimal valu) {
        this.valu = valu;
    }

    public String getPurchasingOrg() {
        return purchasingOrg;
    }

    public void setPurchasingOrg(String purchasingOrg) {
        this.purchasingOrg = purchasingOrg;
    }

    public String getPurchasingGrp() {
        return purchasingGrp;
    }

    public void setPurchasingGrp(String purchasingGrp) {
        this.purchasingGrp = purchasingGrp;
    }

    public String getCollectiveNumber() {
        return collectiveNumber;
    }

    public void setCollectiveNumber(String collectiveNumber) {
        this.collectiveNumber = collectiveNumber;
    }

    public String getQueryRespondedFlag() {
        return queryRespondedFlag;
    }

    public void setQueryRespondedFlag(String queryRespondedFlag) {
        this.queryRespondedFlag = queryRespondedFlag;
    }

    public Integer getAppCountAfterReserve() {
        return appCountAfterReserve;
    }

    public void setAppCountAfterReserve(Integer appCountAfterReserve) {
        this.appCountAfterReserve = appCountAfterReserve;
    }

    public String getITAppCount() {
        return iTAppCount;
    }

    public void setITAppCount(String iTAppCount) {
        this.iTAppCount = iTAppCount;
    }

    public String getReservedUser() {
        return reservedUser;
    }

    public void setReservedUser(String reservedUser) {
        this.reservedUser = reservedUser;
    }

    public String getDownPaymentReqFor() {
        return downPaymentReqFor;
    }

    public void setDownPaymentReqFor(String downPaymentReqFor) {
        this.downPaymentReqFor = downPaymentReqFor;
    }

    public String getAcknowledgeStatus() {
        return acknowledgeStatus;
    }

    public void setAcknowledgeStatus(String acknowledgeStatus) {
        this.acknowledgeStatus = acknowledgeStatus;
    }

    public Date getPurchaseOrderCreatedDate() {
        return purchaseOrderCreatedDate;
    }

    public void setPurchaseOrderCreatedDate(Date purchaseOrderCreatedDate) {
        this.purchaseOrderCreatedDate = purchaseOrderCreatedDate;
    }

    public String getInternalOrder() {
        return internalOrder;
    }

    public void setInternalOrder(String internalOrder) {
        this.internalOrder = internalOrder;
    }

    public String getBulkApprovalFlag() {
        return bulkApprovalFlag;
    }

    public void setBulkApprovalFlag(String bulkApprovalFlag) {
        this.bulkApprovalFlag = bulkApprovalFlag;
    }

    public String getTotalPOAmount() {
        return totalPOAmount;
    }

    public void setTotalPOAmount(String totalPOAmount) {
        this.totalPOAmount = totalPOAmount;
    }

    public String getTotalPOAmtPOVendor() {
        return totalPOAmtPOVendor;
    }

    public void setTotalPOAmtPOVendor(String totalPOAmtPOVendor) {
        this.totalPOAmtPOVendor = totalPOAmtPOVendor;
    }

    public String getLastProcessedUser() {
        return lastProcessedUser;
    }

    public void setLastProcessedUser(String lastProcessedUser) {
        this.lastProcessedUser = lastProcessedUser;
    }

    public String getRFQNo() {
        return RFQNo;
    }

    public void setRFQNo(String RFQNo) {
        this.RFQNo = RFQNo;
    }

    public Date getAckPOEntryDatetime() {
        return ackPOEntryDatetime;
    }

    public void setAckPOEntryDatetime(Date ackPOEntryDatetime) {
        this.ackPOEntryDatetime = ackPOEntryDatetime;
    }

    public String getAckBy() {
        return ackBy;
    }

    public void setAckBy(String ackBy) {
        this.ackBy = ackBy;
    }

    public String getAckByDetails() {
        return ackByDetails;
    }

    public void setAckByDetails(String ackByDetails) {
        this.ackByDetails = ackByDetails;
    }

    public Integer getVendorSno() {
        return vendorSno;
    }

    public void setVendorSno(Integer vendorSno) {
        this.vendorSno = vendorSno;
    }
    
    public String getTempPoNumber() {
        return tempPoNumber;
    }

    public void setTempPoNumber(String tempPoNumber) {
        this.tempPoNumber = tempPoNumber;
    }

    public String getPrType() {
        return prType;
    }

    public void setPrType(String prType) {
        this.prType = prType;
    }

    public String getPoFrom() {
        return poFrom;
    }

    public void setPoFrom(String poFrom) {
        this.poFrom = poFrom;
    }

    public String getSelectedVendorId() {
        return selectedVendorId;
    }

    public void setSelectedVendorId(String selectedVendorId) {
        this.selectedVendorId = selectedVendorId;
    }
    
    public String getVendorFinalizationTableDataArrayAsJsonString() {
        return vendorFinalizationTableDataArrayAsJsonString;
    }

    public void setVendorFinalizationTableDataArrayAsJsonString(String vendorFinalizationTableDataArrayAsJsonString) {
        this.vendorFinalizationTableDataArrayAsJsonString = vendorFinalizationTableDataArrayAsJsonString;
    }

    public String getPoDocDate() {
        return poDocDate;
    }

    public void setPoDocDate(String poDocDate) {
        this.poDocDate = poDocDate;
    }

    public String getNewPrLineInsertionOrderId() {
        return newPrLineInsertionOrderId;
    }

    public void setNewPrLineInsertionOrderId(String newPrLineInsertionOrderId) {
        this.newPrLineInsertionOrderId = newPrLineInsertionOrderId;
    }

    public String getNewRfqLineRfqIdRfqLineIdInsertionOrderId() {
        return newRfqLineRfqIdRfqLineIdInsertionOrderId;
    }

    public void setNewRfqLineRfqIdRfqLineIdInsertionOrderId(String newRfqLineRfqIdRfqLineIdInsertionOrderId) {
        this.newRfqLineRfqIdRfqLineIdInsertionOrderId = newRfqLineRfqIdRfqLineIdInsertionOrderId;
    }

    public String getErrorTransactionStatus() {
        return errorTransactionStatus;
    }

    public void setErrorTransactionStatus(String errorTransactionStatus) {
        this.errorTransactionStatus = errorTransactionStatus;
    }

    public Date getInitiatedDate() {
        return initiatedDate;
    }

    public void setInitiatedDate(Date initiatedDate) {
        this.initiatedDate = initiatedDate;
    }

    public String getOrdered() {
        return ordered;
    }

    public void setOrdered(String ordered) {
        this.ordered = ordered;
    }

    public String getOrderedUnit() {
        return orderedUnit;
    }

    public void setOrderedUnit(String orderedUnit) {
        this.orderedUnit = orderedUnit;
    }

    public String getOrderedTotalPrice() {
        return orderedTotalPrice;
    }

    public void setOrderedTotalPrice(String orderedTotalPrice) {
        this.orderedTotalPrice = orderedTotalPrice;
    }

    public String getOrderedCurrency() {
        return orderedCurrency;
    }

    public void setOrderedCurrency(String orderedCurrency) {
        this.orderedCurrency = orderedCurrency;
    }

    public String getDelivered() {
        return delivered;
    }

    public void setDelivered(String delivered) {
        this.delivered = delivered;
    }

    public String getDeliveredUnit() {
        return deliveredUnit;
    }

    public void setDeliveredUnit(String deliveredUnit) {
        this.deliveredUnit = deliveredUnit;
    }

    public String getDeliveredTotalPrice() {
        return deliveredTotalPrice;
    }

    public void setDeliveredTotalPrice(String deliveredTotalPrice) {
        this.deliveredTotalPrice = deliveredTotalPrice;
    }

    public String getDeliveredCurrency() {
        return deliveredCurrency;
    }

    public void setDeliveredCurrency(String deliveredCurrency) {
        this.deliveredCurrency = deliveredCurrency;
    }

    public String getStillToDeliv() {
        return stillToDeliv;
    }

    public void setStillToDeliv(String stillToDeliv) {
        this.stillToDeliv = stillToDeliv;
    }

    public String getStillToDelivUnit() {
        return stillToDelivUnit;
    }

    public void setStillToDelivUnit(String stillToDelivUnit) {
        this.stillToDelivUnit = stillToDelivUnit;
    }

    public String getStillToDelivTotalPrice() {
        return stillToDelivTotalPrice;
    }

    public void setStillToDelivTotalPrice(String stillToDelivTotalPrice) {
        this.stillToDelivTotalPrice = stillToDelivTotalPrice;
    }

    public String getStillToDelivCurrency() {
        return stillToDelivCurrency;
    }

    public void setStillToDelivCurrency(String stillToDelivCurrency) {
        this.stillToDelivCurrency = stillToDelivCurrency;
    }

    public String getInvoiced() {
        return invoiced;
    }

    public void setInvoiced(String invoiced) {
        this.invoiced = invoiced;
    }

    public String getInvoicedUnit() {
        return invoicedUnit;
    }

    public void setInvoicedUnit(String invoicedUnit) {
        this.invoicedUnit = invoicedUnit;
    }

    public String getInvoicedTotalPrice() {
        return invoicedTotalPrice;
    }

    public void setInvoicedTotalPrice(String invoicedTotalPrice) {
        this.invoicedTotalPrice = invoicedTotalPrice;
    }

    public String getInvoicedCurrency() {
        return invoicedCurrency;
    }

    public void setInvoicedCurrency(String invoicedCurrency) {
        this.invoicedCurrency = invoicedCurrency;
    }

    public String getDownpayments() {
        return downpayments;
    }

    public void setDownpayments(String downpayments) {
        this.downpayments = downpayments;
    }

    public String getDownpaymentsUnit() {
        return downpaymentsUnit;
    }

    public void setDownpaymentsUnit(String downpaymentsUnit) {
        this.downpaymentsUnit = downpaymentsUnit;
    }

    public String getDownpaymentsTotalPrice() {
        return downpaymentsTotalPrice;
    }

    public void setDownpaymentsTotalPrice(String downpaymentsTotalPrice) {
        this.downpaymentsTotalPrice = downpaymentsTotalPrice;
    }

    public String getDownpaymentsCurrency() {
        return downpaymentsCurrency;
    }

    public void setDownpaymentsCurrency(String downpaymentsCurrency) {
        this.downpaymentsCurrency = downpaymentsCurrency;
    }

    public String getPoSequenceNumber() {
        return poSequenceNumber;
    }

    public void setPoSequenceNumber(String poSequenceNumber) {
        this.poSequenceNumber = poSequenceNumber;
    }

    public String getHeaderConditionsNew() {
        return headerConditionsNew;
    }

    public void setHeaderConditionsNew(String headerConditionsNew) {
        this.headerConditionsNew = headerConditionsNew;
    }

    public String getKalsm() {
        return kalsm;
    }

    public void setKalsm(String kalsm) {
        this.kalsm = kalsm;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGExtPOCreation)) {
            return false;
        }
        ExtPoCreationDraft other = (ExtPoCreationDraft) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ExtPoCreationDraft[ id=" + id + " ]";
    }
    
}
