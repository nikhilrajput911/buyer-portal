/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "NG_BP_workorderrfqheader")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WorkOrderRfqHeader.findAll", query = "SELECT w FROM WorkOrderRfqHeader w"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByRfqid", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.rfqid = :rfqid"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByPurchaserequisitionnumber", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.purchaserequisitionnumber = :purchaserequisitionnumber"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByRFQTitle", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.rFQTitle = :rFQTitle"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByRfqstatus", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.rfqstatus = :rfqstatus order by w.updatedate desc"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByOpendate", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.opendate = :opendate"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByClosedate", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.closedate = :closedate"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByTimeleft", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.timeleft = :timeleft"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByShiptoaddress", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.shiptoaddress = :shiptoaddress"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByCreatedby", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.createdby = :createdby"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByUpdatedate", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.updatedate = :updatedate"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByUpdatedby", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.updatedby = :updatedby"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByCreationdate", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.creationdate = :creationdate"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByNegotationstyle", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.negotationstyle = :negotationstyle"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByAf1", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.af1 = :af1"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByAf2", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.af2 = :af2"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByAf3", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.af3 = :af3"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByAf4", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.af4 = :af4"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByAf5", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.af5 = :af5"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByAf6", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.af6 = :af6"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByAf7", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.af7 = :af7"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByManyStatus", query = "SELECT w FROM WorkOrderRfqHeader w WHERE (w.rfqstatus = 'Awaiting Acknowledge' or w.rfqstatus = 'Bid Submitted' or w.rfqstatus = 'Awaiting Bid') Order By w.updatedate desc"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByCostcode", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.costcode = :costcode"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByPaymentterms", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.paymentterms = :paymentterms"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByProjectnamecode", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.projectnamecode = :projectnamecode"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByBuyerId", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.ngBpBuyerdetailsId.id = :buyerid ORDER BY w.updatedate desc"),
//    @NamedQuery(name = "WorkOrderRfqHeader.findByUserDetailUserIdOrderByCreationdateDesc", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.userDetailuserid.userid = :userDetailuserid Order By w.rfqid desc"),
//    @NamedQuery(name = "WorkOrderRfqHeader.findByUserDetailUserIdAndStatusOrderByCreationdateDesc", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.userDetailuserid.userid = :userDetailuserid  and (w.rfqstatus = 'Awaiting Release') Order By w.creationdate desc"),
    @NamedQuery(name = "WorkOrderRfqHeader.findByBuyerWFstatus", query = "SELECT w FROM WorkOrderRfqHeader w WHERE w.buyerWFstatus = :buyerWFstatus"),
    @NamedQuery(name = "WorkOrderRfqHeader.findRfqStatusCountByRfqStatus", query = "SELECT count(w.rfqstatus), w.rfqstatus FROM WorkOrderRfqHeader w where w.ngBpBuyerdetailsId.id = :buyerid GROUP BY w.rfqstatus"),
    @NamedQuery(name = "WorkOrderRfqHeader.findLastRfqid", query = "SELECT MAX(rfqid) FROM WorkOrderRfqHeader")})
public class WorkOrderRfqHeader implements Serializable {

    @Size(max = 20)
    @Column(name = "PRType")
    private String pRType;
    @Size(max = 20)
    @Column(name = "MOQ_MOV_Details_RatedParameter")
    private String mOQMOVDetailsRatedParameter;
    @Size(max = 20)
    @Column(name = "Delivery_LeadTIme_RatedParameter")
    private String deliveryLeadTImeRatedParameter;
    @Size(max = 20)
    @Column(name = "Payment_Terms_RatedParameter")
    private String paymentTermsRatedParameter;
    @Size(max = 20)
    @Column(name = "Brand_Model_RatedParameter")
    private String brandModelRatedParameter;
    @Size(max = 20)
    @Column(name = "Incoterms_RatedParameter")
    private String incotermsRatedParameter;
    @Size(max = 20)
    @Column(name = "ValidityOffer_RatedParameter")
    private String validityOfferRatedParameter;
    @Size(max = 20)
    @Column(name = "MOQ_MOV_Details_RatedParameter_Weight")
    private String mOQMOVDetailsRatedParameterWeight;
    @Size(max = 20)
    @Column(name = "Delivery_LeadTIme_RatedParameter_Weight")
    private String deliveryLeadTImeRatedParameterWeight;
    @Size(max = 20)
    @Column(name = "Payment_Terms_RatedParameter_Weight")
    private String paymentTermsRatedParameterWeight;
    @Size(max = 20)
    @Column(name = "Brand_Model_RatedParameter_Weight")
    private String brandModelRatedParameterWeight;
    @Size(max = 20)
    @Column(name = "Incoterms_RatedParameter_Weight")
    private String incotermsRatedParameterWeight;
    @Size(max = 20)
    @Column(name = "ValidityOffer_RatedParameter_Weight")
    private String validityOfferRatedParameterWeight;
    
    @Column(name = "VendorCount")
    private Integer vendorCount;
    
    @Column(name = "VendorResponse")
    private Integer vendorResponse;
    @Size(max = 8)
    @Column(name = "autosendpo")
    private String autosendPO;
    @Size(max = 8)
    @Column(name = "notifyvendor")
    private String notifyVendor;
    @Size(max = 8)
    @Column(name = "porecipients1")
    private String pORecipients1;
    @Size(max = 8)
    @Column(name = "porecipients2")
    private String pORecipients2;
    @Size(max = 100)
    @Column(name = "vendorrecipients")
    private String vendorRecipients;
    @Size(max = 35)
    @Column(name = "internalrecipients")
    private String internalRecipients;
    @Size(max = 5000)
    @Column(name = "comment")
    private String comment;

    @Column(name = "runningsequence")
    private Integer runningsequence;
    @Column(name = "rfqvaliduntil")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfqvaliduntil;
    @Column(name = "expected_delivery_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDeliveryDate;

    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;
    @Size(max = 50)
    @Column(name = "rfq_number")
    private String rfqNumber;

    @Column(name = "rfq_request_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfqRequestDate;
    @Size(max = 100)
    @Column(name = "contactpersonename")
    private String contactpersonename;
    @Size(max = 50)
    @Column(name = "contactpersonetelno")
    private String contactpersonetelno;
    @Size(max = 50)
    @Column(name = "contactpersoneemail")
    private String contactpersoneemail;
    @Size(max = 100)
    @Column(name = "deliveryterms")
    private String deliveryterms;
    @Column(name = "validityofoffer")
    @Temporal(TemporalType.TIMESTAMP)
    private Date validityofoffer;
    @Column(name = "rfqcloseson")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfqcloseson;

    @Size(max = 50)
    @Column(name = "assigned_to")
    private String assignedTo;
    @Size(max = 100)
    @Column(name = "timeleft")
    private String timeleft;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "RFQID")
    private Integer rfqid;
    @Size(max = 50)
    @Column(name = "purchaserequisitionnumber")
    private String purchaserequisitionnumber;
    @Size(max = 100)
    @Column(name = "RFQTitle")
    private String rFQTitle;
    @Size(max = 20)
    @Column(name = "rfqstatus")
    private String rfqstatus;
    @Lob
    @Size(max = 65535)
    @Column(name = "description")
    private String description;
    @Column(name = "opendate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date opendate;
    @Column(name = "closedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date closedate;
    @Lob
    @Size(max = 65535)
    @Column(name = "billtoaddress")
    private String billtoaddress;
    @Size(max = 100)
    @Column(name = "shiptoaddress")
    private String shiptoaddress;
    @Size(max = 30)
    @Column(name = "createdby")
    private String createdby;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Size(max = 30)
    @Column(name = "Negotationstyle")
    private String negotationstyle;
    @Column(name = "AF1")
    private Integer af1;
    @Column(name = "AF2")
    private Integer af2;
    @Column(name = "AF3")
    private Integer af3;
    @Column(name = "AF4")
    private Integer af4;
    @Column(name = "AF5")
    private Integer af5;
    @Column(name = "AF6")
    private Integer af6;
    @Column(name = "AF7")
    private Integer af7;
    @Column(name = "AF8")
    private Integer af8;
    @Size(max = 50)
    @Column(name = "costcode")
    private String costcode;
    @Size(max = 50)
    @Column(name = "paymentterms")
    private String paymentterms;
    @Size(max = 100)
    @Column(name = "Projectnamecode")
    private String projectnamecode;
    @Size(max = 30)
    @Column(name = "buyerWFstatus")
    private String buyerWFstatus;
    @Size(max = 10)
    @Column(name = "IsPoCreated")
    private String isPoCreated;
//    @JoinColumn(name = "UserDetail_userid", referencedColumnName = "userid")
//    @ManyToOne(optional = false)
//    private Userdetail userDetailuserid;

    public WorkOrderRfqHeader() {
    }

    public WorkOrderRfqHeader(Integer rfqid) {
        this.rfqid = rfqid;
    }

    public Integer getRfqid() {
        return rfqid;
    }

    public void setRfqid(Integer rfqid) {
        this.rfqid = rfqid;
    }

    public String getPurchaserequisitionnumber() {
        return purchaserequisitionnumber;
    }

    public void setPurchaserequisitionnumber(String purchaserequisitionnumber) {
        this.purchaserequisitionnumber = purchaserequisitionnumber;
    }

    public String getRFQTitle() {
        return rFQTitle;
    }

    public void setRFQTitle(String rFQTitle) {
        this.rFQTitle = rFQTitle;
    }

    public String getRfqstatus() {
        return rfqstatus;
    }

    public void setRfqstatus(String rfqstatus) {
        this.rfqstatus = rfqstatus;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getOpendate() {
        return opendate;
    }

    public void setOpendate(Date opendate) {
        this.opendate = opendate;
    }

    public Date getClosedate() {
        return closedate;
    }

    public void setClosedate(Date closedate) {
        this.closedate = closedate;
    }

    public String getBilltoaddress() {
        return billtoaddress;
    }

    public void setBilltoaddress(String billtoaddress) {
        this.billtoaddress = billtoaddress;
    }

    public String getShiptoaddress() {
        return shiptoaddress;
    }

    public void setShiptoaddress(String shiptoaddress) {
        this.shiptoaddress = shiptoaddress;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public String getUpdatedby() {
        return updatedby;
    }

    public void setUpdatedby(String updatedby) {
        this.updatedby = updatedby;
    }

    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

    public String getNegotationstyle() {
        return negotationstyle;
    }

    public void setNegotationstyle(String negotationstyle) {
        this.negotationstyle = negotationstyle;
    }

    public Integer getAf1() {
        return af1;
    }

    public void setAf1(Integer af1) {
        this.af1 = af1;
    }

    public Integer getAf2() {
        return af2;
    }

    public void setAf2(Integer af2) {
        this.af2 = af2;
    }

    public Integer getAf3() {
        return af3;
    }

    public void setAf3(Integer af3) {
        this.af3 = af3;
    }

    public Integer getAf4() {
        return af4;
    }

    public void setAf4(Integer af4) {
        this.af4 = af4;
    }

    public Integer getAf5() {
        return af5;
    }

    public void setAf5(Integer af5) {
        this.af5 = af5;
    }

    public Integer getAf6() {
        return af6;
    }

    public void setAf6(Integer af6) {
        this.af6 = af6;
    }

    public Integer getAf7() {
        return af7;
    }

    public void setAf7(Integer af7) {
        this.af7 = af7;
    }

    public Integer getAf8() {
        return af8;
    }

    public void setAf8(Integer af8) {
        this.af8 = af8;
    }

    public String getCostcode() {
        return costcode;
    }

    public void setCostcode(String costcode) {
        this.costcode = costcode;
    }

    public String getPaymentterms() {
        return paymentterms;
    }

    public void setPaymentterms(String paymentterms) {
        this.paymentterms = paymentterms;
    }

    public String getProjectnamecode() {
        return projectnamecode;
    }

    public void setProjectnamecode(String projectnamecode) {
        this.projectnamecode = projectnamecode;
    }

    public String getBuyerWFstatus() {
        return buyerWFstatus;
    }

    public void setBuyerWFstatus(String buyerWFstatus) {
        this.buyerWFstatus = buyerWFstatus;
    }

//    public Userdetail getUserDetailuserid() {
//        return userDetailuserid;
//    }
//
//    public void setUserDetailuserid(Userdetail userDetailuserid) {
//        this.userDetailuserid = userDetailuserid;
//    }
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (rfqid != null ? rfqid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof WorkOrderRfqHeader)) {
            return false;
        }
        WorkOrderRfqHeader other = (WorkOrderRfqHeader) object;
        if ((this.rfqid == null && other.rfqid != null) || (this.rfqid != null && !this.rfqid.equals(other.rfqid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.WorkOrderRfqHeader[ rfqid=" + rfqid + " ]";
    }

    public String getTimeleft() {
        return timeleft;
    }

    public void setTimeleft(String timeleft) {
        this.timeleft = timeleft;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getRfqNumber() {
        return rfqNumber;
    }

    public void setRfqNumber(String rfqNumber) {
        this.rfqNumber = rfqNumber;
    }

    public Date getRfqRequestDate() {
        return rfqRequestDate;
    }

    public void setRfqRequestDate(Date rfqRequestDate) {
        this.rfqRequestDate = rfqRequestDate;
    }

    public String getContactpersonename() {
        return contactpersonename;
    }

    public void setContactpersonename(String contactpersonename) {
        this.contactpersonename = contactpersonename;
    }

    public String getContactpersonetelno() {
        return contactpersonetelno;
    }

    public void setContactpersonetelno(String contactpersonetelno) {
        this.contactpersonetelno = contactpersonetelno;
    }

    public String getContactpersoneemail() {
        return contactpersoneemail;
    }

    public void setContactpersoneemail(String contactpersoneemail) {
        this.contactpersoneemail = contactpersoneemail;
    }

    public String getDeliveryterms() {
        return deliveryterms;
    }

    public void setDeliveryterms(String deliveryterms) {
        this.deliveryterms = deliveryterms;
    }

    public Date getValidityofoffer() {
        return validityofoffer;
    }

    public void setValidityofoffer(Date validityofoffer) {
        this.validityofoffer = validityofoffer;
    }

    public Date getRfqcloseson() {
        return rfqcloseson;
    }

    public void setRfqcloseson(Date rfqcloseson) {
        this.rfqcloseson = rfqcloseson;
    }

    public BuyerDetails getNgBpBuyerdetailsId() {
        return ngBpBuyerdetailsId;
    }

    public void setNgBpBuyerdetailsId(BuyerDetails ngBpBuyerdetailsId) {
        this.ngBpBuyerdetailsId = ngBpBuyerdetailsId;
    }

    public Date getRfqvaliduntil() {
        return rfqvaliduntil;
    }

    public void setRfqvaliduntil(Date rfqvaliduntil) {
        this.rfqvaliduntil = rfqvaliduntil;
    }

//    public Date getExpecteddeliverydate() {
//        return expecteddeliverydate;
//    }
//
//    public void setExpecteddeliverydate(Date expecteddeliverydate) {
//        this.expecteddeliverydate = expecteddeliverydate;
//    }
    public Date getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(Date expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public Integer getRunningsequence() {
        return runningsequence;
    }

    public void setRunningsequence(Integer runningsequence) {
        this.runningsequence = runningsequence;
    }

//    public String getAutoSendPO() {
//        return autosendpo;
//    }
//
//    public void setAutoSendPO(String autosendpo) {
//        this.autosendpo = autosendpo;
//    }
//
//    public String getPORecipients1() {
//        return porecipients1;
//    }
//
//    public void setPORecipients1(String porecipients1) {
//        this.porecipients1 = porecipients1;
//    }
//
//    public String getPORecipients2() {
//        return porecipients2;
//    }
//
//    public void setPORecipients2(String porecipients2) {
//        this.porecipients2 = porecipients2;
//    }
//    public String getVendorRecipients() {
//        return vendorrecipients;
//    }
//
//    public void setVendorRecipients(String vendorrecipients) {
//        this.vendorrecipients = vendorrecipients;
//    }
//
//    public String getInternalRecipients() {
//        return internalrecipients;
//    }
//
//    public void setInternalRecipients(String internalrecipients) {
//        this.internalrecipients = internalrecipients;
//    }
    public String getVendorRecipients() {
        return vendorRecipients;
    }

    public void setVendorRecipients(String vendorRecipients) {
        this.vendorRecipients = vendorRecipients;
    }

    public String getInternalRecipients() {
        return internalRecipients;
    }

    public void setInternalRecipients(String internalRecipients) {
        this.internalRecipients = internalRecipients;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

//
//    public String getNotifyVendor() {
//        return notifyvendor;
//    }
//
//    public void setNotifyVendor(String notifyvendor) {
//        this.notifyvendor = notifyvendor;
//    }
    public String getAutosendPO() {
        return autosendPO;
    }

    public void setAutosendPO(String autosendPO) {
        this.autosendPO = autosendPO;
    }

    public String getNotifyVendor() {
        return notifyVendor;
    }

    public void setNotifyVendor(String notifyVendor) {
        this.notifyVendor = notifyVendor;
    }

    public String getpORecipients1() {
        return pORecipients1;
    }

    public void setpORecipients1(String pORecipients1) {
        this.pORecipients1 = pORecipients1;
    }

    public String getpORecipients2() {
        return pORecipients2;
    }

    public void setpORecipients2(String pORecipients2) {
        this.pORecipients2 = pORecipients2;
    }

    public Integer getVendorCount() {
        return vendorCount;
    }

    public void setVendorCount(Integer vendorCount) {
        this.vendorCount = vendorCount;
    }

    public Integer getVendorResponse() {
        return vendorResponse;
    }

    public void setVendorResponse(Integer vendorResponse) {
        this.vendorResponse = vendorResponse;
    }

    public String getmOQMOVDetailsRatedParameter() {
        return mOQMOVDetailsRatedParameter;
    }

    public void setmOQMOVDetailsRatedParameter(String mOQMOVDetailsRatedParameter) {
        this.mOQMOVDetailsRatedParameter = mOQMOVDetailsRatedParameter;
    }

    public String getDeliveryLeadTImeRatedParameter() {
        return deliveryLeadTImeRatedParameter;
    }

    public void setDeliveryLeadTImeRatedParameter(String deliveryLeadTImeRatedParameter) {
        this.deliveryLeadTImeRatedParameter = deliveryLeadTImeRatedParameter;
    }

    public String getPaymentTermsRatedParameter() {
        return paymentTermsRatedParameter;
    }

    public void setPaymentTermsRatedParameter(String paymentTermsRatedParameter) {
        this.paymentTermsRatedParameter = paymentTermsRatedParameter;
    }

    public String getBrandModelRatedParameter() {
        return brandModelRatedParameter;
    }

    public void setBrandModelRatedParameter(String brandModelRatedParameter) {
        this.brandModelRatedParameter = brandModelRatedParameter;
    }

    public String getIncotermsRatedParameter() {
        return incotermsRatedParameter;
    }

    public void setIncotermsRatedParameter(String incotermsRatedParameter) {
        this.incotermsRatedParameter = incotermsRatedParameter;
    }

    public String getValidityOfferRatedParameter() {
        return validityOfferRatedParameter;
    }

    public void setValidityOfferRatedParameter(String validityOfferRatedParameter) {
        this.validityOfferRatedParameter = validityOfferRatedParameter;
    }

    public String getpRType() {
        return pRType;
    }

    public void setpRType(String pRType) {
        this.pRType = pRType;
    }
    
    public String getmOQMOVDetailsRatedParameterWeight() {
        return mOQMOVDetailsRatedParameterWeight;
    }

    public void setmOQMOVDetailsRatedParameterWeight(String mOQMOVDetailsRatedParameterWeight) {
        this.mOQMOVDetailsRatedParameterWeight = mOQMOVDetailsRatedParameterWeight;
    }

    public String getDeliveryLeadTImeRatedParameterWeight() {
        return deliveryLeadTImeRatedParameterWeight;
    }

    public void setDeliveryLeadTImeRatedParameterWeight(String deliveryLeadTImeRatedParameterWeight) {
        this.deliveryLeadTImeRatedParameterWeight = deliveryLeadTImeRatedParameterWeight;
    }

    public String getPaymentTermsRatedParameterWeight() {
        return paymentTermsRatedParameterWeight;
    }

    public void setPaymentTermsRatedParameterWeight(String paymentTermsRatedParameterWeight) {
        this.paymentTermsRatedParameterWeight = paymentTermsRatedParameterWeight;
    }

    public String getBrandModelRatedParameterWeight() {
        return brandModelRatedParameterWeight;
    }

    public void setBrandModelRatedParameterWeight(String brandModelRatedParameterWeight) {
        this.brandModelRatedParameterWeight = brandModelRatedParameterWeight;
    }

    public String getIncotermsRatedParameterWeight() {
        return incotermsRatedParameterWeight;
    }

    public void setIncotermsRatedParameterWeight(String incotermsRatedParameterWeight) {
        this.incotermsRatedParameterWeight = incotermsRatedParameterWeight;
    }

    public String getValidityOfferRatedParameterWeight() {
        return validityOfferRatedParameterWeight;
    }

    public void setValidityOfferRatedParameterWeight(String validityOfferRatedParameterWeight) {
        this.validityOfferRatedParameterWeight = validityOfferRatedParameterWeight;
    }

    public String getIsPoCreated() {
        return isPoCreated;
    }

    public void setIsPoCreated(String isPoCreated) {
        this.isPoCreated = isPoCreated;
    }
    
}
