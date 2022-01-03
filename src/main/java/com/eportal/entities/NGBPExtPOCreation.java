/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
@Table(name = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPExtPOCreation.findAll", query = "SELECT n FROM NGBPExtPOCreation n"),
    @NamedQuery(name = "NGBPExtPOCreation.findById", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.id = :id"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPid", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.pid = :pid"),
    @NamedQuery(name = "NGBPExtPOCreation.findByCurrentWorkstep", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.currentWorkstep = :currentWorkstep"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPreviousWorkstep", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.previousWorkstep = :previousWorkstep"),
    @NamedQuery(name = "NGBPExtPOCreation.findByIntiatiatedDate", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.intiatiatedDate = :intiatiatedDate"),
    @NamedQuery(name = "NGBPExtPOCreation.findByInitiatorID", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.initiatorID = :initiatorID"),
    @NamedQuery(name = "NGBPExtPOCreation.findByInitiatorEmailID", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.initiatorEmailID = :initiatorEmailID"),
    @NamedQuery(name = "NGBPExtPOCreation.findByCompanyCode", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.companyCode = :companyCode"),
    @NamedQuery(name = "NGBPExtPOCreation.findByRequestType", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.requestType = :requestType"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPurchaseRequestType", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.purchaseRequestType = :purchaseRequestType"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPurchaseSubCategory", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.purchaseSubCategory = :purchaseSubCategory"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPurchaseRequestNumber", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.purchaseRequestNumber = :purchaseRequestNumber"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPurchaseOrderNumber", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.purchaseOrderNumber = :purchaseOrderNumber"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPurchaseOrderType", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.purchaseOrderType = :purchaseOrderType"),
    @NamedQuery(name = "NGBPExtPOCreation.findByReferenceDocumentType", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.referenceDocumentType = :referenceDocumentType"),
    @NamedQuery(name = "NGBPExtPOCreation.findByReferenceDocumentNumber", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.referenceDocumentNumber = :referenceDocumentNumber"),
    @NamedQuery(name = "NGBPExtPOCreation.findByReferenceDocumentLine", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.referenceDocumentLine = :referenceDocumentLine"),
    @NamedQuery(name = "NGBPExtPOCreation.findByReasonforPRAmendment", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.reasonforPRAmendment = :reasonforPRAmendment"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPRNotetoApprover", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.pRNotetoApprover = :pRNotetoApprover"),
    @NamedQuery(name = "NGBPExtPOCreation.findByActionTaken", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.actionTaken = :actionTaken"),
    @NamedQuery(name = "NGBPExtPOCreation.findByQueryType", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.queryType = :queryType"),
    @NamedQuery(name = "NGBPExtPOCreation.findByQueryUser", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.queryUser = :queryUser"),
    @NamedQuery(name = "NGBPExtPOCreation.findByQueryMail", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.queryMail = :queryMail"),
    @NamedQuery(name = "NGBPExtPOCreation.findByRejectionType", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.rejectionType = :rejectionType"),
    @NamedQuery(name = "NGBPExtPOCreation.findByAckPO", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.ackPO = :ackPO"),
    @NamedQuery(name = "NGBPExtPOCreation.findByVendorName", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.vendorName = :vendorName"),
    @NamedQuery(name = "NGBPExtPOCreation.findByVendorCode", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.vendorCode = :vendorCode"),
    @NamedQuery(name = "NGBPExtPOCreation.findByDocumentDate", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.documentDate = :documentDate"),
    @NamedQuery(name = "NGBPExtPOCreation.findByDownpaymentReqd", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.downpaymentReqd = :downpaymentReqd"),
    @NamedQuery(name = "NGBPExtPOCreation.findByValu", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.valu = :valu"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPurchasingOrg", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.purchasingOrg = :purchasingOrg"),
    @NamedQuery(name = "NGBPExtPOCreation.findByPurchasingGrp", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.purchasingGrp = :purchasingGrp"),
    @NamedQuery(name = "NGBPExtPOCreation.findByCollectiveNumber", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.collectiveNumber = :collectiveNumber"),
    @NamedQuery(name = "NGBPExtPOCreation.findByQueryRespondedFlag", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.queryRespondedFlag = :queryRespondedFlag"),
    @NamedQuery(name = "NGBPExtPOCreation.findByAppCountAfterReserve", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.appCountAfterReserve = :appCountAfterReserve"),
    @NamedQuery(name = "NGBPExtPOCreation.findByITAppCount", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.iTAppCount = :iTAppCount"),
    @NamedQuery(name = "NGBPExtPOCreation.findMaxId", query = "SELECT max(n.Id) FROM NGBPExtPOCreation"),
    @NamedQuery(name = "NGBPExtPOCreation.findByReservedUser", query = "SELECT n FROM NGBPExtPOCreation n WHERE n.reservedUser = :reservedUser")})

public class NGBPExtPOCreation implements Serializable {
    @Lob
    @Column(name = "attachment1")
    private byte[] attachment1;
    @Lob
    @Column(name = "attachment2")
    private byte[] attachment2;
    @Lob
    @Column(name = "attachment3")
    private byte[] attachment3;
    @Lob
    @Column(name = "attachment4")
    private byte[] attachment4;
    @Lob
    @Column(name = "attachment5")
    private byte[] attachment5;
    
    private static final long serialVersionUID = 1L;

//    @OneToOne
//    @JoinColumn(name = "Id", referencedColumnName = "ProcInstId")
//    private NGBPCmplxPOCreationDeliveryInvoice nGBPCmplxPOCreationDeliveryInvoice;
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
    @Size(max = 50)
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
    @Size(max = 50)
    @Column(name = "attachment1name")
    private String attachment1name;
    @Size(max = 50)
    @Column(name = "attachment2name")
    private String attachment2name;
    @Size(max = 50)
    @Column(name = "attachment3name")
    private String attachment3name;
    @Size(max = 50)
    @Column(name = "attachment4name")
    private String attachment4name;
    @Size(max = 50)
    @Column(name = "attachment5name")
    private String attachment5name;
    @Size(max = 5)
    @Column(name = "IsAckReq")
    private String isAckReq;
    @Size(max = 20)
    @Column(name = "PoNumber")
    private String poNumber;
    @Size(max = 10)
    @Column(name = "ErrorTransactionStatus")
    private String errorTransactionStatus;
    @Size(max = 30)
    @Column(name = "PoSequenceNumber")
    private String poSequenceNumber;
    @Size(max = 50)
    @Column(name = "TempPoNumber")
    private String tempPoNumber;

    @OneToOne(targetEntity = NGBPCmplxPOCreationDeliveryInvoice.class, cascade = CascadeType.ALL)
    private NGBPCmplxPOCreationDeliveryInvoice deliveryInvoice;

    @OneToOne(targetEntity = NGBPCmplxPOCreationCommunication.class, cascade = CascadeType.ALL)
    private NGBPCmplxPOCreationCommunication deliveryComm;

//    @OneToOne(mappedBy = "nGBPExtPOCreation", cascade = CascadeType.PERSIST)
    @OneToOne(targetEntity = NGBPCmplxPOCreationVendorAddress.class, cascade = CascadeType.ALL)
    private NGBPCmplxPOCreationVendorAddress vendorAddress;

    @OneToOne(targetEntity = NGBPCmplxPOCreationCustormerData.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationCustormerData custData;
    
    @OneToOne(targetEntity = NGBPCmplxPOCreationHeaderText.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationHeaderText headerText;
    
    @OneToOne(targetEntity = NGBPCmplxPOCreationStatus.class, cascade = CascadeType.ALL)
    NGBPCmplxPOCreationStatus status;
    

//    @OneToMany(targetEntity = NGBPCmplxPOCreationLineItemPO.class, cascade = CascadeType.ALL)
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "extPOCreation_Id")
    private List<NGBPCmplxPOCreationLineItemPO> POCreationLineItem;

    @Column(name = "HeaderConditionsNew", columnDefinition = "ntext")
    private String headerConditionsNew;
    @Size(max = 10)
    @Column(name = "IsPoCreated")
    private String isPoCreated;
    
    public NGBPExtPOCreation() {
    }

    public NGBPCmplxPOCreationCommunication getDeliveryComm() {
        return deliveryComm;
    }

    public NGBPCmplxPOCreationCustormerData getCustData() {
        return custData;
    }

    public void setCustData(NGBPCmplxPOCreationCustormerData custData) {
        this.custData = custData;
    }

    public void setDeliveryComm(NGBPCmplxPOCreationCommunication deliveryComm) {
        this.deliveryComm = deliveryComm;
    }

    public List<NGBPCmplxPOCreationLineItemPO> getPOCreationLineItem() {
        return POCreationLineItem;
    }

    public void setPOCreationLineItem(List<NGBPCmplxPOCreationLineItemPO> POCreationLineItem) {
        this.POCreationLineItem = POCreationLineItem;
    }

    public NGBPExtPOCreation(Integer id) {
        this.id = id;
    }

    public NGBPCmplxPOCreationDeliveryInvoice getDeliveryInvoice() {
        return deliveryInvoice;
    }

    public void setDeliveryInvoice(NGBPCmplxPOCreationDeliveryInvoice DeliveryInvoice) {
        this.deliveryInvoice = DeliveryInvoice;
    }

    public NGBPCmplxPOCreationVendorAddress getVendorAddress() {
        return vendorAddress;
    }

    public void setVendorAddress(NGBPCmplxPOCreationVendorAddress vendorAddress) {
        this.vendorAddress = vendorAddress;
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


    public String getAttachment1name() {
        return attachment1name;
    }

    public void setAttachment1name(String attachment1name) {
        this.attachment1name = attachment1name;
    }

    public String getAttachment2name() {
        return attachment2name;
    }

    public void setAttachment2name(String attachment2name) {
        this.attachment2name = attachment2name;
    }

    public String getAttachment3name() {
        return attachment3name;
    }

    public void setAttachment3name(String attachment3name) {
        this.attachment3name = attachment3name;
    }

    public String getAttachment4name() {
        return attachment4name;
    }

    public void setAttachment4name(String attachment4name) {
        this.attachment4name = attachment4name;
    }

    public String getAttachment5name() {
        return attachment5name;
    }

    public void setAttachment5name(String attachment5name) {
        this.attachment5name = attachment5name;
    }

    public NGBPCmplxPOCreationHeaderText getHeaderText() {
        return headerText;
    }

    public void setHeaderText(NGBPCmplxPOCreationHeaderText headerText) {
        this.headerText = headerText;
    }

    public String getIsAckReq() {
        return isAckReq;
    }

    public void setIsAckReq(String isAckReq) {
        this.isAckReq = isAckReq;
    }

    public String getPoNumber() {
        return poNumber;
    }

    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }

    public NGBPCmplxPOCreationStatus getStatus() {
        return status;
    }

    public void setStatus(NGBPCmplxPOCreationStatus status) {
        this.status = status;
    }
    
    public byte[] getAttachment1() {
        return attachment1;
    }

    public void setAttachment1(byte[] attachment1) {
        this.attachment1 = attachment1;
    }

    public byte[] getAttachment2() {
        return attachment2;
    }

    public void setAttachment2(byte[] attachment2) {
        this.attachment2 = attachment2;
    }

    public byte[] getAttachment3() {
        return attachment3;
    }

    public void setAttachment3(byte[] attachment3) {
        this.attachment3 = attachment3;
    }

    public byte[] getAttachment4() {
        return attachment4;
    }

    public void setAttachment4(byte[] attachment4) {
        this.attachment4 = attachment4;
    }

    public byte[] getAttachment5() {
        return attachment5;
    }

    public void setAttachment5(byte[] attachment5) {
        this.attachment5 = attachment5;
    }

    public String getErrorTransactionStatus() {
        return errorTransactionStatus;
    }

    public void setErrorTransactionStatus(String errorTransactionStatus) {
        this.errorTransactionStatus = errorTransactionStatus;
    }

    public String getPoSequenceNumber() {
        return poSequenceNumber;
    }

    public void setPoSequenceNumber(String poSequenceNumber) {
        this.poSequenceNumber = poSequenceNumber;
    }

    public String getTempPoNumber() {
        return tempPoNumber;
    }

    public void setTempPoNumber(String tempPoNumber) {
        this.tempPoNumber = tempPoNumber;
    }
    
    public String getHeaderConditionsNew() {
        return headerConditionsNew;
    }

    public void setHeaderConditionsNew(String headerConditionsNew) {
        this.headerConditionsNew = headerConditionsNew;
    }
    
    public String getIsPoCreated() {
        return isPoCreated;
    }

    public void setIsPoCreated(String isPoCreated) {
        this.isPoCreated = isPoCreated;
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
        if (!(object instanceof NGBPExtPOCreation)) {
            return false;
        }
        NGBPExtPOCreation other = (NGBPExtPOCreation) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPExtPOCreation[ id=" + id + " ]";
    }
}
