/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
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
@Table(name = "NG_Ext_PRToPO")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGExtPRToPO.findAll", query = "SELECT n FROM NGExtPRToPO n"),
    @NamedQuery(name = "NGExtPRToPO.findByItemIndex", query = "SELECT n FROM NGExtPRToPO n WHERE n.nGExtPRToPOPK.itemIndex = :itemIndex"),
    @NamedQuery(name = "NGExtPRToPO.findByItemType", query = "SELECT n FROM NGExtPRToPO n WHERE n.nGExtPRToPOPK.itemType = :itemType"),
    @NamedQuery(name = "NGExtPRToPO.findByPid", query = "SELECT n FROM NGExtPRToPO n WHERE n.pid = :pid"),
    @NamedQuery(name = "NGExtPRToPO.findByCurrentWorkstep", query = "SELECT n FROM NGExtPRToPO n WHERE n.currentWorkstep = :currentWorkstep"),
    @NamedQuery(name = "NGExtPRToPO.findByPreviousWorkstep", query = "SELECT n FROM NGExtPRToPO n WHERE n.previousWorkstep = :previousWorkstep"),
    @NamedQuery(name = "NGExtPRToPO.findByIntiatiatedDate", query = "SELECT n FROM NGExtPRToPO n WHERE n.intiatiatedDate = :intiatiatedDate"),
    @NamedQuery(name = "NGExtPRToPO.findByInitiatorID", query = "SELECT n FROM NGExtPRToPO n WHERE n.initiatorID = :initiatorID"),
    @NamedQuery(name = "NGExtPRToPO.findByInitiatorEmailID", query = "SELECT n FROM NGExtPRToPO n WHERE n.initiatorEmailID = :initiatorEmailID"),
    @NamedQuery(name = "NGExtPRToPO.findByCompanyCode", query = "SELECT n FROM NGExtPRToPO n WHERE n.companyCode = :companyCode"),
    @NamedQuery(name = "NGExtPRToPO.findByRequestType", query = "SELECT n FROM NGExtPRToPO n WHERE n.requestType = :requestType"),
    @NamedQuery(name = "NGExtPRToPO.findByPurchaseRequestType", query = "SELECT n FROM NGExtPRToPO n WHERE n.purchaseRequestType = :purchaseRequestType"),
    @NamedQuery(name = "NGExtPRToPO.findByPurchaseSubCategory", query = "SELECT n FROM NGExtPRToPO n WHERE n.purchaseSubCategory = :purchaseSubCategory"),
    @NamedQuery(name = "NGExtPRToPO.findByPurchaseRequestNumber", query = "SELECT n FROM NGExtPRToPO n WHERE n.purchaseRequestNumber = :purchaseRequestNumber"),
    @NamedQuery(name = "NGExtPRToPO.findByPurchaseOrderNumber", query = "SELECT n FROM NGExtPRToPO n WHERE n.purchaseOrderNumber = :purchaseOrderNumber"),
    @NamedQuery(name = "NGExtPRToPO.findByPurchaseOrderType", query = "SELECT n FROM NGExtPRToPO n WHERE n.purchaseOrderType = :purchaseOrderType"),
    @NamedQuery(name = "NGExtPRToPO.findByReferenceDocumentType", query = "SELECT n FROM NGExtPRToPO n WHERE n.referenceDocumentType = :referenceDocumentType"),
    @NamedQuery(name = "NGExtPRToPO.findByReferenceDocumentNumber", query = "SELECT n FROM NGExtPRToPO n WHERE n.referenceDocumentNumber = :referenceDocumentNumber"),
    @NamedQuery(name = "NGExtPRToPO.findByReferenceDocumentLine", query = "SELECT n FROM NGExtPRToPO n WHERE n.referenceDocumentLine = :referenceDocumentLine"),
    @NamedQuery(name = "NGExtPRToPO.findByReasonforPRAmendment", query = "SELECT n FROM NGExtPRToPO n WHERE n.reasonforPRAmendment = :reasonforPRAmendment"),
    @NamedQuery(name = "NGExtPRToPO.findByPRNotetoApprover", query = "SELECT n FROM NGExtPRToPO n WHERE n.pRNotetoApprover = :pRNotetoApprover"),
    @NamedQuery(name = "NGExtPRToPO.findByActionTaken", query = "SELECT n FROM NGExtPRToPO n WHERE n.actionTaken = :actionTaken")})
public class NGExtPRToPO implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected NGExtPRToPOPK nGExtPRToPOPK;
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
    @Column(name = "Company")
    private String Company;
    
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
    @Size(max = 10)
    @Column(name = "Query_Responded_Flag")
    private String queryRespondedFlag;
    @Size(max = 50)
    @Column(name = "Reserved_User")
    private String reservedUser;
    @Column(name = "AppCount_AfterReserve")
    private Integer appCountAfterReserve;
    @Size(max = 50)
    @Column(name = "OldPR")
    private String oldPR;
    @Size(max = 50)
    @Column(name = "ReferencePR")
    private String referencePR;
    @Size(max = 5)
    @Column(name = "OLDPRReferenceFlag")
    private String oldPRReferenceFlag;
    @Size(max = 10)
    @Column(name = "ExcelUploadFlag")
    private String excelUploadFlag;
    @Size(max = 50)
    @Column(name = "PR_SequenceNumber")
    private String PR_SequenceNumber;
    @Size(max = 100)
    @Column(name = "InitiatorUser")
    private String initiatorUser;
    @Size(max = 10)
    @Column(name = "ITApp_Count")
    private String itApp_Count;
    @Size(max = 5)
    @Column(name = "HeaderNote")
    private String headerNote;

    public NGExtPRToPO() {
    }

    public NGExtPRToPO(NGExtPRToPOPK nGExtPRToPOPK) {
        this.nGExtPRToPOPK = nGExtPRToPOPK;
    }

    public NGExtPRToPO(String itemIndex, String itemType) {
        this.nGExtPRToPOPK = new NGExtPRToPOPK(itemIndex, itemType);
    }

    public NGExtPRToPOPK getNGExtPRToPOPK() {
        return nGExtPRToPOPK;
    }

    public void setNGExtPRToPOPK(NGExtPRToPOPK nGExtPRToPOPK) {
        this.nGExtPRToPOPK = nGExtPRToPOPK;
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

    public String getQueryRespondedFlag() {
        return queryRespondedFlag;
    }

    public void setQueryRespondedFlag(String queryRespondedFlag) {
        this.queryRespondedFlag = queryRespondedFlag;
    }

    public String getReservedUser() {
        return reservedUser;
    }

    public void setReservedUser(String reservedUser) {
        this.reservedUser = reservedUser;
    }

    public Integer getAppCountAfterReserve() {
        return appCountAfterReserve;
    }

    public void setAppCountAfterReserve(Integer appCountAfterReserve) {
        this.appCountAfterReserve = appCountAfterReserve;
    }

    public String getOldPR() {
        return oldPR;
    }

    public void setOldPR(String oldPR) {
        this.oldPR = oldPR;
    }

    public String getReferencePR() {
        return referencePR;
    }

    public void setReferencePR(String referencePR) {
        this.referencePR = referencePR;
    }

    public String getOldPRReferenceFlag() {
        return oldPRReferenceFlag;
    }

    public void setOldPRReferenceFlag(String oldPRReferenceFlag) {
        this.oldPRReferenceFlag = oldPRReferenceFlag;
    }

    public String getExcelUploadFlag() {
        return excelUploadFlag;
    }

    public void setExcelUploadFlag(String excelUploadFlag) {
        this.excelUploadFlag = excelUploadFlag;
    }

    public String getPR_SequenceNumber() {
        return PR_SequenceNumber;
    }

    public void setPR_SequenceNumber(String PR_SequenceNumber) {
        this.PR_SequenceNumber = PR_SequenceNumber;
    }

    public String getInitiatorUser() {
        return initiatorUser;
    }

    public void setInitiatorUser(String initiatorUser) {
        this.initiatorUser = initiatorUser;
    }

    public String getItApp_Count() {
        return itApp_Count;
    }

    public void setItApp_Count(String itApp_Count) {
        this.itApp_Count = itApp_Count;
    }

    public String getHeaderNote() {
        return headerNote;
    }

    public void setHeaderNote(String headerNote) {
        this.headerNote = headerNote;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (nGExtPRToPOPK != null ? nGExtPRToPOPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGExtPRToPO)) {
            return false;
        }
        NGExtPRToPO other = (NGExtPRToPO) object;
        if ((this.nGExtPRToPOPK == null && other.nGExtPRToPOPK != null) || (this.nGExtPRToPOPK != null && !this.nGExtPRToPOPK.equals(other.nGExtPRToPOPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGExtPRToPO[ nGExtPRToPOPK=" + nGExtPRToPOPK + " ]";
    }

    public String getCompany() {
        return Company;
    }

    public void setCompany(String Company) {
        this.Company = Company;
    }

}
