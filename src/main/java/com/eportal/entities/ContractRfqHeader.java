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
//import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_contractrfqheader")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractRfqHeader.findAll", query = "SELECT c FROM ContractRfqHeader c"),
    @NamedQuery(name = "ContractRfqHeader.findByRfqid", query = "SELECT c FROM ContractRfqHeader c WHERE c.rfqid = :rfqid"),
    @NamedQuery(name = "ContractRfqHeader.findByClosedate", query = "SELECT c FROM ContractRfqHeader c WHERE c.closedate = :closedate"),
    @NamedQuery(name = "ContractRfqHeader.findByCreatedby", query = "SELECT c FROM ContractRfqHeader c WHERE c.createdby = :createdby"),
    @NamedQuery(name = "ContractRfqHeader.findByCreationdate", query = "SELECT c FROM ContractRfqHeader c WHERE c.creationdate = :creationdate"),
    @NamedQuery(name = "ContractRfqHeader.findByOpendate", query = "SELECT c FROM ContractRfqHeader c WHERE c.opendate = :opendate"),
    @NamedQuery(name = "ContractRfqHeader.findByPaymentterms", query = "SELECT c FROM ContractRfqHeader c WHERE c.paymentterms = :paymentterms"),
    @NamedQuery(name = "ContractRfqHeader.findByRFQTitle", query = "SELECT c FROM ContractRfqHeader c WHERE c.rFQTitle = :rFQTitle"),
    @NamedQuery(name = "ContractRfqHeader.findByRfqstatus", query = "SELECT c FROM ContractRfqHeader c WHERE c.rfqstatus = :rfqstatus"),
    @NamedQuery(name = "ContractRfqHeader.findByUpdatedate", query = "SELECT c FROM ContractRfqHeader c WHERE c.updatedate = :updatedate"),
    @NamedQuery(name = "ContractRfqHeader.findByUpdatedby", query = "SELECT c FROM ContractRfqHeader c WHERE c.updatedby = :updatedby"),
    @NamedQuery(name = "ContractRfqHeader.findByContactpersoneemail", query = "SELECT c FROM ContractRfqHeader c WHERE c.contactpersoneemail = :contactpersoneemail"),
    @NamedQuery(name = "ContractRfqHeader.findByContactpersonename", query = "SELECT c FROM ContractRfqHeader c WHERE c.contactpersonename = :contactpersonename"),
    @NamedQuery(name = "ContractRfqHeader.findByContactpersonetelno", query = "SELECT c FROM ContractRfqHeader c WHERE c.contactpersonetelno = :contactpersonetelno"),
    @NamedQuery(name = "ContractRfqHeader.findByDeliveryterms", query = "SELECT c FROM ContractRfqHeader c WHERE c.deliveryterms = :deliveryterms"),
    @NamedQuery(name = "ContractRfqHeader.findByRfqNumber", query = "SELECT c FROM ContractRfqHeader c WHERE c.rfqNumber = :rfqNumber"),
    @NamedQuery(name = "ContractRfqHeader.findByRfqRequestDate", query = "SELECT c FROM ContractRfqHeader c WHERE c.rfqRequestDate = :rfqRequestDate"),
    @NamedQuery(name = "ContractRfqHeader.findByRfqcloseson", query = "SELECT c FROM ContractRfqHeader c WHERE c.rfqcloseson = :rfqcloseson"),
    @NamedQuery(name = "ContractRfqHeader.findByValidityofoffer", query = "SELECT c FROM ContractRfqHeader c WHERE c.validityofoffer = :validityofoffer"),
    @NamedQuery(name = "ContractRfqHeader.findByRfqvaliduntil", query = "SELECT c FROM ContractRfqHeader c WHERE c.rfqvaliduntil = :rfqvaliduntil"),
    @NamedQuery(name = "ContractRfqHeader.findByExpecteddeliverydate", query = "SELECT c FROM ContractRfqHeader c WHERE c.expecteddeliverydate = :expecteddeliverydate"),
    @NamedQuery(name = "ContractRfqHeader.findByDeliverytermsvendor", query = "SELECT c FROM ContractRfqHeader c WHERE c.deliverytermsvendor = :deliverytermsvendor"),
    @NamedQuery(name = "ContractRfqHeader.findByPaymenttermsvendor", query = "SELECT c FROM ContractRfqHeader c WHERE c.paymenttermsvendor = :paymenttermsvendor"),
    @NamedQuery(name = "ContractRfqHeader.findByRunningsequence", query = "SELECT c FROM ContractRfqHeader c WHERE c.runningsequence = :runningsequence"),
    @NamedQuery(name = "ContractRfqHeader.findByAutosendpo", query = "SELECT c FROM ContractRfqHeader c WHERE c.autosendpo = :autosendpo"),
    @NamedQuery(name = "ContractRfqHeader.findByNotifyvendor", query = "SELECT c FROM ContractRfqHeader c WHERE c.notifyvendor = :notifyvendor"),
    @NamedQuery(name = "ContractRfqHeader.findByVendorrecipients", query = "SELECT c FROM ContractRfqHeader c WHERE c.vendorrecipients = :vendorrecipients"),
    @NamedQuery(name = "ContractRfqHeader.findByPorecipients1", query = "SELECT c FROM ContractRfqHeader c WHERE c.porecipients1 = :porecipients1"),
    @NamedQuery(name = "ContractRfqHeader.findByPorecipients2", query = "SELECT c FROM ContractRfqHeader c WHERE c.porecipients2 = :porecipients2"),
    @NamedQuery(name = "ContractRfqHeader.findByInternalrecipients", query = "SELECT c FROM ContractRfqHeader c WHERE c.internalrecipients = :internalrecipients"),
    @NamedQuery(name = "ContractRfqHeader.findLastRfqid", query = "SELECT MAX(rfqid) FROM ContractRfqHeader"),
    @NamedQuery(name = "ContractRfqHeader.findByBuyerId", query = "SELECT c FROM ContractRfqHeader c WHERE c.ngBpBuyerdetailsId.id = :buyerid ORDER BY c.creationdate desc"),
    @NamedQuery(name = "ContractRfqHeader.findByComment", query = "SELECT c FROM ContractRfqHeader c WHERE c.comment = :comment")})
public class ContractRfqHeader implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RFQID")
    private Integer rfqid;
    @Column(name = "closedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date closedate;
    @Size(max = 30)
    @Column(name = "createdby")
    private String createdby;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Lob
    @Size(max = 2147483647)
    @Column(name = "description")
    private String description;
    @Column(name = "opendate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date opendate;
    @Size(max = 50)
    @Column(name = "paymentterms")
    private String paymentterms;
    @Size(max = 100)
    @Column(name = "RFQTitle")
    private String rFQTitle;
    @Size(max = 20)
    @Column(name = "rfqstatus")
    private String rfqstatus;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;
    @Size(max = 50)
    @Column(name = "contactpersoneemail")
    private String contactpersoneemail;
    @Size(max = 100)
    @Column(name = "contactpersonename")
    private String contactpersonename;
    @Size(max = 50)
    @Column(name = "contactpersonetelno")
    private String contactpersonetelno;
    @Size(max = 100)
    @Column(name = "deliveryterms")
    private String deliveryterms;
    @Size(max = 50)
    @Column(name = "rfq_number")
    private String rfqNumber;
    @Column(name = "rfq_request_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfqRequestDate;
    @Column(name = "rfqcloseson")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfqcloseson;
    @Column(name = "validityofoffer")
    @Temporal(TemporalType.TIMESTAMP)
    private Date validityofoffer;
    @Column(name = "rfqvaliduntil")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfqvaliduntil;
    @Column(name = "expecteddeliverydate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expecteddeliverydate;
    @Size(max = 150)
    @Column(name = "deliverytermsvendor")
    private String deliverytermsvendor;
    @Size(max = 55)
    @Column(name = "paymenttermsvendor")
    private String paymenttermsvendor;
    @Column(name = "runningsequence")
    private Integer runningsequence;
    @Size(max = 8)
    @Column(name = "autosendpo")
    private String autosendpo;
    @Size(max = 8)
    @Column(name = "notifyvendor")
    private String notifyvendor;
    @Size(max = 35)
    @Column(name = "vendorrecipients")
    private String vendorrecipients;
    @Size(max = 8)
    @Column(name = "porecipients1")
    private String porecipients1;
    @Size(max = 8)
    @Column(name = "porecipients2")
    private String porecipients2;
    @Size(max = 35)
    @Column(name = "internalrecipients")
    private String internalrecipients;
    @Size(max = 5000)
    @Column(name = "comment")
    private String comment;
    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;
    
      @JoinColumn(name = "pid_Details", referencedColumnName = "PID")
    @ManyToOne
    private NGExtCM pid_Details;

    public NGExtCM getPid_Details() {
        return pid_Details;
    }

    public void setPid_Details(NGExtCM pid_Details) {
        this.pid_Details = pid_Details;
    }
    
    @Column(name = "VendorCount")
    private Integer vendorCount;
    
    @Column(name = "VendorResponse")
    private Integer vendorResponse;
    
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
@Size(max = 50)
    @Column(name = "PID")
    private String pid;

    public String getrFQTitle() {
        return rFQTitle;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public void setrFQTitle(String rFQTitle) {
        this.rFQTitle = rFQTitle;
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

    public ContractRfqHeader() {
    }

    public ContractRfqHeader(Integer rfqid) {
        this.rfqid = rfqid;
    }

    public Integer getRfqid() {
        return rfqid;
    }

    public void setRfqid(Integer rfqid) {
        this.rfqid = rfqid;
    }

    public Date getClosedate() {
        return closedate;
    }

    public void setClosedate(Date closedate) {
        this.closedate = closedate;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
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

    public String getPaymentterms() {
        return paymentterms;
    }

    public void setPaymentterms(String paymentterms) {
        this.paymentterms = paymentterms;
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

    public String getContactpersoneemail() {
        return contactpersoneemail;
    }

    public void setContactpersoneemail(String contactpersoneemail) {
        this.contactpersoneemail = contactpersoneemail;
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

    public String getDeliveryterms() {
        return deliveryterms;
    }

    public void setDeliveryterms(String deliveryterms) {
        this.deliveryterms = deliveryterms;
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

    public Date getRfqcloseson() {
        return rfqcloseson;
    }

    public void setRfqcloseson(Date rfqcloseson) {
        this.rfqcloseson = rfqcloseson;
    }

    public Date getValidityofoffer() {
        return validityofoffer;
    }

    public void setValidityofoffer(Date validityofoffer) {
        this.validityofoffer = validityofoffer;
    }

    public Date getRfqvaliduntil() {
        return rfqvaliduntil;
    }

    public void setRfqvaliduntil(Date rfqvaliduntil) {
        this.rfqvaliduntil = rfqvaliduntil;
    }

    public Date getExpecteddeliverydate() {
        return expecteddeliverydate;
    }

    public void setExpecteddeliverydate(Date expecteddeliverydate) {
        this.expecteddeliverydate = expecteddeliverydate;
    }

    public String getDeliverytermsvendor() {
        return deliverytermsvendor;
    }

    public void setDeliverytermsvendor(String deliverytermsvendor) {
        this.deliverytermsvendor = deliverytermsvendor;
    }

    public String getPaymenttermsvendor() {
        return paymenttermsvendor;
    }

    public void setPaymenttermsvendor(String paymenttermsvendor) {
        this.paymenttermsvendor = paymenttermsvendor;
    }

    public Integer getRunningsequence() {
        return runningsequence;
    }

    public void setRunningsequence(Integer runningsequence) {
        this.runningsequence = runningsequence;
    }

    public String getAutosendpo() {
        return autosendpo;
    }

    public void setAutosendpo(String autosendpo) {
        this.autosendpo = autosendpo;
    }

    public String getNotifyvendor() {
        return notifyvendor;
    }

    public void setNotifyvendor(String notifyvendor) {
        this.notifyvendor = notifyvendor;
    }

    public String getVendorrecipients() {
        return vendorrecipients;
    }

    public void setVendorrecipients(String vendorrecipients) {
        this.vendorrecipients = vendorrecipients;
    }

    public String getPorecipients1() {
        return porecipients1;
    }

    public void setPorecipients1(String porecipients1) {
        this.porecipients1 = porecipients1;
    }

    public String getPorecipients2() {
        return porecipients2;
    }

    public void setPorecipients2(String porecipients2) {
        this.porecipients2 = porecipients2;
    }

    public String getInternalrecipients() {
        return internalrecipients;
    }

    public void setInternalrecipients(String internalrecipients) {
        this.internalrecipients = internalrecipients;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public BuyerDetails getNgBpBuyerdetailsId() {
        return ngBpBuyerdetailsId;
    }

    public void setNgBpBuyerdetailsId(BuyerDetails ngBpBuyerdetailsId) {
        this.ngBpBuyerdetailsId = ngBpBuyerdetailsId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (rfqid != null ? rfqid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ContractRfqHeader)) {
            return false;
        }
        ContractRfqHeader other = (ContractRfqHeader) object;
        if ((this.rfqid == null && other.rfqid != null) || (this.rfqid != null && !this.rfqid.equals(other.rfqid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ContractRfqHeader[ rfqid=" + rfqid + " ]";
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
}
