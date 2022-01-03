/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
@Table(name = "NG_Ext_POCreation")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGExtPOCreation.findAll", query = "SELECT n FROM NGExtPOCreation n"),
    @NamedQuery(name = "NGExtPOCreation.findByItemIndex", query = "SELECT n FROM NGExtPOCreation n WHERE n.nGExtPOCreationPK.itemIndex = :itemIndex"),
    @NamedQuery(name = "NGExtPOCreation.findByItemType", query = "SELECT n FROM NGExtPOCreation n WHERE n.nGExtPOCreationPK.itemType = :itemType"),
    @NamedQuery(name = "NGExtPOCreation.findByPid", query = "SELECT n FROM NGExtPOCreation n WHERE n.pid = :pid"),
    @NamedQuery(name = "NGExtPOCreation.findByCurrentWorkstep", query = "SELECT n FROM NGExtPOCreation n WHERE n.currentWorkstep = :currentWorkstep"),
    @NamedQuery(name = "NGExtPOCreation.findByPreviousWorkstep", query = "SELECT n FROM NGExtPOCreation n WHERE n.previousWorkstep = :previousWorkstep"),
    @NamedQuery(name = "NGExtPOCreation.findByIntiatiatedDate", query = "SELECT n FROM NGExtPOCreation n WHERE n.intiatiatedDate = :intiatiatedDate"),
    @NamedQuery(name = "NGExtPOCreation.findByInitiatorID", query = "SELECT n FROM NGExtPOCreation n WHERE n.initiatorID = :initiatorID"),
    @NamedQuery(name = "NGExtPOCreation.findByInitiatorEmailID", query = "SELECT n FROM NGExtPOCreation n WHERE n.initiatorEmailID = :initiatorEmailID"),
    @NamedQuery(name = "NGExtPOCreation.findByCompanyCode", query = "SELECT n FROM NGExtPOCreation n WHERE n.companyCode = :companyCode"),
    @NamedQuery(name = "NGExtPOCreation.findByRequestType", query = "SELECT n FROM NGExtPOCreation n WHERE n.requestType = :requestType"),
    @NamedQuery(name = "NGExtPOCreation.findByPurchaseRequestType", query = "SELECT n FROM NGExtPOCreation n WHERE n.purchaseRequestType = :purchaseRequestType"),
    @NamedQuery(name = "NGExtPOCreation.findByPurchaseSubCategory", query = "SELECT n FROM NGExtPOCreation n WHERE n.purchaseSubCategory = :purchaseSubCategory"),
    @NamedQuery(name = "NGExtPOCreation.findByPurchaseRequestNumber", query = "SELECT n FROM NGExtPOCreation n WHERE n.purchaseRequestNumber = :purchaseRequestNumber"),
    @NamedQuery(name = "NGExtPOCreation.findByPurchaseOrderNumber", query = "SELECT n FROM NGExtPOCreation n WHERE n.purchaseOrderNumber = :purchaseOrderNumber"),
    @NamedQuery(name = "NGExtPOCreation.findByPurchaseOrderType", query = "SELECT n FROM NGExtPOCreation n WHERE n.purchaseOrderType = :purchaseOrderType"),
    @NamedQuery(name = "NGExtPOCreation.findByReferenceDocumentType", query = "SELECT n FROM NGExtPOCreation n WHERE n.referenceDocumentType = :referenceDocumentType"),
    @NamedQuery(name = "NGExtPOCreation.findByReferenceDocumentNumber", query = "SELECT n FROM NGExtPOCreation n WHERE n.referenceDocumentNumber = :referenceDocumentNumber"),
    @NamedQuery(name = "NGExtPOCreation.findByReferenceDocumentLine", query = "SELECT n FROM NGExtPOCreation n WHERE n.referenceDocumentLine = :referenceDocumentLine"),
    @NamedQuery(name = "NGExtPOCreation.findByReasonforPRAmendment", query = "SELECT n FROM NGExtPOCreation n WHERE n.reasonforPRAmendment = :reasonforPRAmendment"),
    @NamedQuery(name = "NGExtPOCreation.findByPRNotetoApprover", query = "SELECT n FROM NGExtPOCreation n WHERE n.pRNotetoApprover = :pRNotetoApprover"),
    @NamedQuery(name = "NGExtPOCreation.findByActionTaken", query = "SELECT n FROM NGExtPOCreation n WHERE n.actionTaken = :actionTaken"),
    @NamedQuery(name = "NGExtPOCreation.findByQueryType", query = "SELECT n FROM NGExtPOCreation n WHERE n.queryType = :queryType"),
    @NamedQuery(name = "NGExtPOCreation.findByQueryUser", query = "SELECT n FROM NGExtPOCreation n WHERE n.queryUser = :queryUser"),
    @NamedQuery(name = "NGExtPOCreation.findByQueryMail", query = "SELECT n FROM NGExtPOCreation n WHERE n.queryMail = :queryMail"),
    @NamedQuery(name = "NGExtPOCreation.findByRejectionType", query = "SELECT n FROM NGExtPOCreation n WHERE n.rejectionType = :rejectionType"),
    @NamedQuery(name = "NGExtPOCreation.findById", query = "SELECT n FROM NGExtPOCreation n WHERE n.id = :id"),
    @NamedQuery(name = "NGExtPOCreation.findByAckPO", query = "SELECT n FROM NGExtPOCreation n WHERE n.ackPO = :ackPO"),
    @NamedQuery(name = "NGExtPOCreation.findByVendorName", query = "SELECT n FROM NGExtPOCreation n WHERE n.vendorName = :vendorName"),
    @NamedQuery(name = "NGExtPOCreation.findByVendorCode", query = "SELECT n FROM NGExtPOCreation n WHERE n.vendorCode = :vendorCode"),
    @NamedQuery(name = "NGExtPOCreation.findByDocumentDate", query = "SELECT n FROM NGExtPOCreation n WHERE n.documentDate = :documentDate"),
    @NamedQuery(name = "NGExtPOCreation.findByDownpaymentReqd", query = "SELECT n FROM NGExtPOCreation n WHERE n.downpaymentReqd = :downpaymentReqd"),
    @NamedQuery(name = "NGExtPOCreation.findByValu", query = "SELECT n FROM NGExtPOCreation n WHERE n.valu = :valu"),
    @NamedQuery(name = "NGExtPOCreation.findByPurchasingOrg", query = "SELECT n FROM NGExtPOCreation n WHERE n.purchasingOrg = :purchasingOrg"),
    @NamedQuery(name = "NGExtPOCreation.findByPurchasingGrp", query = "SELECT n FROM NGExtPOCreation n WHERE n.purchasingGrp = :purchasingGrp"),
    @NamedQuery(name = "NGExtPOCreation.findByCollectiveNumber", query = "SELECT n FROM NGExtPOCreation n WHERE n.collectiveNumber = :collectiveNumber"),
    @NamedQuery(name = "NGExtPOCreation.findByQueryRespondedFlag", query = "SELECT n FROM NGExtPOCreation n WHERE n.queryRespondedFlag = :queryRespondedFlag"),
    @NamedQuery(name = "NGExtPOCreation.findByAppCountAfterReserve", query = "SELECT n FROM NGExtPOCreation n WHERE n.appCountAfterReserve = :appCountAfterReserve"),
    @NamedQuery(name = "NGExtPOCreation.findByITAppCount", query = "SELECT n FROM NGExtPOCreation n WHERE n.iTAppCount = :iTAppCount"),
    @NamedQuery(name = "NGExtPOCreation.findByReservedUser", query = "SELECT n FROM NGExtPOCreation n WHERE n.reservedUser = :reservedUser")})
public class NGExtPOCreation implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected NGExtPOCreationPK nGExtPOCreationPK;
    @Size(max = 50)
    @Column(name = "PID")
    private String pid;
    @Size(max = 25)
    @Column(name = "CurrentWorkstep")
    private String currentWorkstep;
    @Size(max = 25)
    @Column(name = "PreviousWorkstep")
    private String previousWorkstep;
    @Column(name = "IntiatiatedDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date intiatiatedDate;
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
    @Column(name = "id")
    private Integer id;
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
    @Size(max = 10)
    @Column(name = "isVendorAckReq")
    private String isVendorAckReq;
    @Size(max = 25)
    @Column(name = "VendorAckAction")
    private String vendorAckAction;
    @Size(max = 15)
    @Column(name = "BuyerAckAction")
    private String buyerAckAction;
    @Column(name = "AckPOExitDT")
    @Temporal(TemporalType.DATE)
    private Date ackPOExitDT;
    @Column(name = "ReworkExitDT")
    @Temporal(TemporalType.DATE)
    private Date reworkExitDT;
    @Size(max = 10)
    @Column(name = "IsPOModified")
    private String isPOModified;
    @Column(name = "VendorMailId")
    private String vendorMailId;
    
    public NGExtPOCreation() {
    }

    public NGExtPOCreation(NGExtPOCreationPK nGExtPOCreationPK) {
        this.nGExtPOCreationPK = nGExtPOCreationPK;
    }

    public NGExtPOCreation(String itemIndex, String itemType) {
        this.nGExtPOCreationPK = new NGExtPOCreationPK(itemIndex, itemType);
    }

    public NGExtPOCreationPK getNGExtPOCreationPK() {
        return nGExtPOCreationPK;
    }

    public void setNGExtPOCreationPK(NGExtPOCreationPK nGExtPOCreationPK) {
        this.nGExtPOCreationPK = nGExtPOCreationPK;
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

    public Date getIntiatiatedDate() {
        return intiatiatedDate;
    }

    public void setIntiatiatedDate(Date intiatiatedDate) {
        this.intiatiatedDate = intiatiatedDate;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
    
    public String getIsVendorAckReq() {
        return isVendorAckReq;
    }

    public void setIsVendorAckReq(String isVendorAckReq) {
        this.isVendorAckReq = isVendorAckReq;
    }
    
    public String getVendorAckAction() {
        return vendorAckAction;
    }

    public void setVendorAckAction(String vendorAckAction) {
        this.vendorAckAction = vendorAckAction;
    }

    public String getBuyerAckAction() {
        return buyerAckAction;
    }

    public void setBuyerAckAction(String buyerAckAction) {
        this.buyerAckAction = buyerAckAction;
    }
    
    public Date getAckPOExitDT() {
        return ackPOExitDT;
    }

    public void setAckPOExitDT(Date ackPOExitDT) {
        this.ackPOExitDT = ackPOExitDT;
    }

    public Date getReworkExitDT() {
        return reworkExitDT;
    }

    public void setReworkExitDT(Date reworkExitDT) {
        this.reworkExitDT = reworkExitDT;
    }

    public String getIsPOModified() {
        return isPOModified;
    }

    public void setIsPOModified(String isPOModified) {
        this.isPOModified = isPOModified;
    }
    
    public String getVendorMailId() {
        return vendorMailId;
    }

    public void setVendorMailId(String vendorMailId) {
        this.vendorMailId = vendorMailId;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (nGExtPOCreationPK != null ? nGExtPOCreationPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGExtPOCreation)) {
            return false;
        }
        NGExtPOCreation other = (NGExtPOCreation) object;
        if ((this.nGExtPOCreationPK == null && other.nGExtPOCreationPK != null) || (this.nGExtPOCreationPK != null && !this.nGExtPOCreationPK.equals(other.nGExtPOCreationPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGExtPOCreation[ nGExtPOCreationPK=" + nGExtPOCreationPK + " ]";
    }

}
