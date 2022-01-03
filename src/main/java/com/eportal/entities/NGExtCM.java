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
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "NG_Ext_CM")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGExtCM.findAll", query = "SELECT n FROM NGExtCM n"),
    @NamedQuery(name = "NGExtCM.findByPid", query = "SELECT n FROM NGExtCM n WHERE n.pid = :pid"),
     //@NamedQuery(name = "NGExtCM.findById", query = "SELECT n FROM NGExtCM n WHERE n.insertionOrderID = :id"),
    @NamedQuery(name = "NGExtCM.findByCurrentWorkstepAndInitiatorId", query = "SELECT n FROM NGExtCM n WHERE n.currentworkstep = :currentWorkstep and n.InitiatorID = :initiatorID"),
    @NamedQuery(name = "NGExtCM.findByForRevoke", query = "SELECT n FROM NGExtCM n WHERE n.currentworkstep IN ('HOD_Verification','Rework') and n.InitiatorID = :initiatorID"),
     @NamedQuery(name = "NGExtCM.findByCurrentWorkstepAndInitiatorIdAndType", query = "SELECT n FROM NGExtCM n WHERE n.currentworkstep = :currentWorkstep and n.InitiatorID = :initiatorID AND n.Transaction_Type = :type"),
    //@NamedQuery(name = "NGExtCM.findByUnique", query = "SELECT TOP 1 substring(n.SOW_RefNO,10,12) FROM NGExtCM n"),
    //@NamedQuery(name = "NGExtCM.findByUnique", query = "SELECT TOP 1 substring(n.SOW_RefNO,10,12) FROM NGExtCM n"),
    @NamedQuery(name = "NGExtCM.findByStatusAndBuyer", query = "SELECT n FROM NGExtCM n WHERE n.bpStatus = :bpStatus and n.bpBuyerdetailsId.id = :id"),
    @NamedQuery(name = "NGExtCM.findByBuyer", query = "SELECT n FROM NGExtCM n WHERE n.bpBuyerdetailsId.id = :id"),
    @NamedQuery(name = "NGExtCM.findByInitiator", query = "SELECT n FROM NGExtCM n WHERE n.InitiatorID = :initiatorID"),
    @NamedQuery(name = "NGExtCM.findLastMax", query = "SELECT MAX(n.SOW_RefNo) FROM NGExtCM n")})
public class NGExtCM implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @EmbeddedId
    protected NGExtCMPK nGExtCMPK;
    @Size(max = 50)
    @Column(name = "PID")
    private String pid;
    private String todayDate;
    @Size(max = 50)
    @Column(name = "CurrentWorkstep")
    private String currentworkstep;
    @Size(max = 50)
    @Column(name = "InitiatorID")
    private String InitiatorID;
    @Size(max = 50)
    @Column(name = "VendorCode")
    private String VendorCode;
    @Size(max = 50)
    @Column(name = "VendorName")
    private String VendorName;
    @JoinColumn(name = "BP_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails bpBuyerdetailsId;
    @Size(max = 20)
    @Column(name = "BP_status")
    private String bpStatus;
    @Size(max = 20)
    @Column(name = "BP_rfq_status")
    private String bpRfqStatus;
    @Size(max = 20)
    @Column(name = "BP_quantity_remaining")
    private String bpQuantityRemaining;
    @Column(name = "BP_assign_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bpAssigndate;
    @Column(name = "IntiatiatedDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date intiatiatedDate;
    @Size(max = 25)
    @Column(name = "PreviousWorkstep")
    private String previousWorkstep;
    @Size(max = 70)
    @Column(name = "InitiatorEmailID")
    private String initiatorEmailID;
    @Size(max = 50)
    @Column(name = "TransactionID")
    private String transactionID;
    @Size(max = 50)
    @Column(name = "Routing_Flag")
    private String routing_Flag;
    @Size(max = 25)
    @Column(name = "RequestFor")
    private String requestFor;
    @Size(max = 5)
    @Column(name = "INITIATION_FROM")
    private String iNITIATION_FROM;
    @Size(max = 5)
    @Column(name = "Reject_Flag")
    private String reject_Flag;
    @Size(max = 50)
    @Column(name = "Transaction_Type")
    private String transaction_Type;
    @Size(max = 10)
    @Column(name = "SAPContractNo")
    private String sAPContractNo;
    @Size(max = 100)
    @Column(name = "RejectStatus")
    private String rejectStatus;
    @Size(max = 100)
    @Column(name = "QueryStatus")
    private String queryStatus;
    @Size(max = 50)
    @Column(name = "spocname")
    private String spocname;
    @Size(max = 10)
    @Column(name = "provideSOW")
    private String provideSOW;
    @Column(name = "Targeted_Quantity")
    private BigDecimal targetedQuantity;
    @Size(max = 50)
    @Column(name = "RFQNo")
    private String rFQNo;
    @Size(max = 20)
    @Column(name = "AgreementNo")
    private String AgreementNo;
    @Size(max = 50)
    @Column(name = "RequestType")
    private String RequestType;
    @Size(max = 10)
    @Column(name = "PurchaseOrg")
    private String PurchaseOrg;
    @Size(max = 20)
    @Column(name = "purchaseGrp")
    private String purchaseGrp;
    @Size(max = 15)
    @Column(name = "ValidFrom")
    private String ValidFrom;
    @Size(max = 15)
    @Column(name = "ValidTo")
    private String ValidTo;
    @Size(max = 10)
    @Column(name = "GRMessage")
    private String GRMessage;
    @Size(max = 5)
    @Column(name = "Item_Interval_No")
    private String Item_Interval_No;
    @Size(max = 5)
    @Column(name = "Sub_Item_Interval")
    private String Sub_Item_Interval;
    @Size(max = 60)
    @Column(name = "CompanyCode")
    private String CompanyCode;
    @Size(max = 20)
    @Column(name = "SOW_RefNo")
    private String SOW_RefNo;
    @Size(max = 50)
    @Column(name = "Tender_Raised_By")
    private String Tender_Raised_By;
    @Size(max = 25)
    @Column(name = "ContractType")
    private String ContractType;
    @Column(name = "OLAValue")
    private BigDecimal OLAValue;
    @Size(max = 50)
    @Column(name = "Tender_Title")
    private String Tender_Title;
    @Size(max = 50)
    @Column(name = "SAPConractNoCreated")
    private String SAPConractNoCreated;
    @Size(max = 50)
    @Column(name = "SAPContractNo")
    private String SAPContractNo;

    public Date getIntiatiatedDate() {
        return intiatiatedDate;
    }

    public void setIntiatiatedDate(Date intiatiatedDate) {
        this.intiatiatedDate = intiatiatedDate;
    }

    public String getPreviousWorkstep() {
        return previousWorkstep;
    }

    public void setPreviousWorkstep(String previousWorkstep) {
        this.previousWorkstep = previousWorkstep;
    }

    public String getInitiatorEmailID() {
        return initiatorEmailID;
    }

    public void setInitiatorEmailID(String initiatorEmailID) {
        this.initiatorEmailID = initiatorEmailID;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getRouting_Flag() {
        return routing_Flag;
    }

    public void setRouting_Flag(String routing_Flag) {
        this.routing_Flag = routing_Flag;
    }

    public String getRequestFor() {
        return requestFor;
    }

    public void setRequestFor(String requestFor) {
        this.requestFor = requestFor;
    }

    public String getiNITIATION_FROM() {
        return iNITIATION_FROM;
    }

    public void setiNITIATION_FROM(String iNITIATION_FROM) {
        this.iNITIATION_FROM = iNITIATION_FROM;
    }

    public String getReject_Flag() {
        return reject_Flag;
    }

    public void setReject_Flag(String reject_Flag) {
        this.reject_Flag = reject_Flag;
    }

    public String getTransaction_Type() {
        return transaction_Type;
    }

    public void setTransaction_Type(String transaction_Type) {
        this.transaction_Type = transaction_Type;
    }

    public String getsAPContractNo() {
        return sAPContractNo;
    }

    public void setsAPContractNo(String sAPContractNo) {
        this.sAPContractNo = sAPContractNo;
    }

    public String getRejectStatus() {
        return rejectStatus;
    }

    public void setRejectStatus(String rejectStatus) {
        this.rejectStatus = rejectStatus;
    }

    public String getQueryStatus() {
        return queryStatus;
    }

    public void setQueryStatus(String queryStatus) {
        this.queryStatus = queryStatus;
    }

    public String getSpocname() {
        return spocname;
    }

    public void setSpocname(String spocname) {
        this.spocname = spocname;
    }

    public String getProvideSOW() {
        return provideSOW;
    }

    public void setProvideSOW(String provideSOW) {
        this.provideSOW = provideSOW;
    }
    
    
    
    public String getrFQNo() {
        return rFQNo;
    }

    public void setrFQNo(String rFQNo) {
        this.rFQNo = rFQNo;
    }
    public String getContractType() {
        return ContractType;
    }

    public void setContractType(String ContractType) {
        this.ContractType = ContractType;
    }

    public BigDecimal getOLAValue() {
        return OLAValue;
    }

    public void setOLAValue(BigDecimal OLAValue) {
        this.OLAValue = OLAValue;
    }
     
     

    public NGExtCMPK getnGExtCMPK() {
        return nGExtCMPK;
    }

    public void setnGExtCMPK(NGExtCMPK nGExtCMPK) {
        this.nGExtCMPK = nGExtCMPK;
    }

    public String getCompanyCode() {
        return CompanyCode;
    }

    public void setCompanyCode(String CompanyCode) {
        this.CompanyCode = CompanyCode;
    }

    public String getSOW_RefNo() {
        return SOW_RefNo;
    }

    public void setSOW_RefNo(String SOW_RefNo) {
        this.SOW_RefNo = SOW_RefNo;
    }

    public String getTender_Raised_By() {
        return Tender_Raised_By;
    }

    public void setTender_Raised_By(String Tender_Raised_By) {
        this.Tender_Raised_By = Tender_Raised_By;
    }

    public String getTender_Title() {
        return Tender_Title;
    }

    public void setTender_Title(String Tender_Title) {
        this.Tender_Title = Tender_Title;
    }
              
    public String getTodayDate() {
        return todayDate;
    }

    public void setTodayDate(String todayDate) {
        this.todayDate = todayDate;
    }

    public String getAgreementNo() {
        return AgreementNo;
    }

    public void setAgreementNo(String AgreementNo) {
        this.AgreementNo = AgreementNo;
    }

    public String getRequestType() {
        return RequestType;
    }

    public void setRequestType(String RequestType) {
        this.RequestType = RequestType;
    }

    public String getPurchaseOrg() {
        return PurchaseOrg;
    }

    public void setPurchaseOrg(String PurchaseOrg) {
        this.PurchaseOrg = PurchaseOrg;
    }

    public String getPurchaseGrp() {
        return purchaseGrp;
    }

    public void setPurchaseGrp(String purchaseGrp) {
        this.purchaseGrp = purchaseGrp;
    }

    public String getValidFrom() {
        return ValidFrom;
    }

    public void setValidFrom(String ValidFrom) {
        this.ValidFrom = ValidFrom;
    }

    public String getValidTo() {
        return ValidTo;
    }

    public void setValidTo(String ValidTo) {
        this.ValidTo = ValidTo;
    }

    public String getGRMessage() {
        return GRMessage;
    }

    public void setGRMessage(String GRMessage) {
        this.GRMessage = GRMessage;
    }

    public String getItem_Interval_No() {
        return Item_Interval_No;
    }

    public void setItem_Interval_No(String Item_Interval_No) {
        this.Item_Interval_No = Item_Interval_No;
    }

    public String getSub_Item_Interval() {
        return Sub_Item_Interval;
    }

    public void setSub_Item_Interval(String Sub_Item_Interval) {
        this.Sub_Item_Interval = Sub_Item_Interval;
    }

    public BigDecimal getTargetedQuantity() {
        return targetedQuantity;
    }

    public void setTargetedQuantity(BigDecimal targetedQuantity) {
        this.targetedQuantity = targetedQuantity;
    }
   
    public NGExtCM() {
    }

    public NGExtCM(NGExtCMPK nGExtCMPK) {
        this.nGExtCMPK = nGExtCMPK;
    }

    public NGExtCM(String itemIndex, String itemType) {
        this.nGExtCMPK = new NGExtCMPK(itemIndex, itemType);
    }

    public NGExtCMPK getNGExtPOCreationPK() {
        return nGExtCMPK;
    }

    public void setNGExtPOCreationPK(NGExtCMPK nGExtPOCreationPK) {
        this.nGExtCMPK = nGExtPOCreationPK;
    }
    public String getSAPContractNo() {
        return SAPContractNo;
    }

    public void setSAPContractNo(String SAPContractNo) {
        this.SAPContractNo = SAPContractNo;
    }
    

    public String getVendorCode() {
        return VendorCode;
    }

    public void setVendorCode(String VendorCode) {
        this.VendorCode = VendorCode;
    }

    public String getVendorName() {
        return VendorName;
    }

    public void setVendorName(String VendorName) {
        this.VendorName = VendorName;
    }

    public String getSAPConractNoCreated() {
        return SAPConractNoCreated;
    }

    public void setSAPConractNoCreated(String SAPConractNoCreated) {
        this.SAPConractNoCreated = SAPConractNoCreated;
    }
    
    

    public String getCurrentworkstep() {
        return currentworkstep;
    }

    public void setCurrentworkstep(String currentworkstep) {
        this.currentworkstep = currentworkstep;
    }

    public String getInitiatorID() {
        return InitiatorID;
    }

    public void setInitiatorID(String InitiatorID) {
        this.InitiatorID = InitiatorID;
    }

   

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public BuyerDetails getBpBuyerdetailsId() {
        return bpBuyerdetailsId;
    }

    public void setBpBuyerdetailsId(BuyerDetails bpBuyerdetailsId) {
        this.bpBuyerdetailsId = bpBuyerdetailsId;
    }

    public String getBpStatus() {
        return bpStatus;
    }

    public void setBpStatus(String bpStatus) {
        this.bpStatus = bpStatus;
    }

    public String getBpRfqStatus() {
        return bpRfqStatus;
    }

    public void setBpRfqStatus(String bpRfqStatus) {
        this.bpRfqStatus = bpRfqStatus;
    }

    public String getBpQuantityRemaining() {
        return bpQuantityRemaining;
    }

    public void setBpQuantityRemaining(String bpQuantityRemaining) {
        this.bpQuantityRemaining = bpQuantityRemaining;
    }

    public Date getBpAssigndate() {
        return bpAssigndate;
    }

    public void setBpAssigndate(Date bpAssigndate) {
        this.bpAssigndate = bpAssigndate;
    }
    

}
