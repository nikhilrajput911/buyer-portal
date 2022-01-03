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
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_workorderrfpheader")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WorkOrderRfpHeader.findAll", query = "SELECT w FROM WorkOrderRfpHeader w"),
    @NamedQuery(name = "WorkOrderRfpHeader.findById", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.id = :id"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByRfpNumber", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.rfpNumber = :rfpNumber"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByRfpRequestdate", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.rfpRequestdate = :rfpRequestdate"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByContactPersonName", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.contactPersonName = :contactPersonName"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByContactPersonTel", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.contactPersonTel = :contactPersonTel"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByContactPersonEmail", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.contactPersonEmail = :contactPersonEmail"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByNotifyVendor", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.notifyVendor = :notifyVendor"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByDeliveryTerms", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.deliveryTerms = :deliveryTerms"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByPaymentTerms", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.paymentTerms = :paymentTerms"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByRfqValidUntil", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.rfqValidUntil = :rfqValidUntil"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByBuyerId", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.ngBpBuyerdetailsId.id = :buyerid ORDER BY w.updationdate desc"),
    @NamedQuery(name = "WorkOrderRfpHeader.findByExpectedDeliveryDate", query = "SELECT w FROM WorkOrderRfpHeader w WHERE w.expectedDeliveryDate = :expectedDeliveryDate"),
    @NamedQuery(name = "WorkOrderRfpHeader.findLastId", query = "SELECT MAX(id) FROM WorkOrderRfpHeader")})
public class WorkOrderRfpHeader implements Serializable {

    @Size(max = 20)
    @Column(name = "PRType")
    private String pRType;
    @Column(name = "runningsequence")
    private Integer runningsequence;

    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Column(name = "updationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updationdate;
    @Size(max = 10)
    @Column(name = "response_received_count")
    private String responseReceivedCount;
    @Size(max = 10)
    @Column(name = "vendor_count")
    private String vendorCount;
    @Size(max = 50)
    @Column(name = "rfp_status")
    private String rfpStatus;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 30)
    @Column(name = "rfp_number")
    private String rfpNumber;
    @Column(name = "rfp_requestdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfpRequestdate;
    @Size(max = 60)
    @Column(name = "contact_person_name")
    private String contactPersonName;
    @Size(max = 20)
    @Column(name = "contact_person_tel")
    private String contactPersonTel;
    @Size(max = 30)
    @Column(name = "contact_person_email")
    private String contactPersonEmail;
    @Size(max = 10)
    @Column(name = "notify_vendor")
    private String notifyVendor;
    @Size(max = 200)
    @Column(name = "delivery_terms")
    private String deliveryTerms;
    @Size(max = 60)
    @Column(name = "payment_terms")
    private String paymentTerms;
    @Column(name = "rfq_valid_until")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rfqValidUntil;
    @Column(name = "expected_delivery_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDeliveryDate;
    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;

    public WorkOrderRfpHeader() {
    }

    public WorkOrderRfpHeader(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRfpNumber() {
        return rfpNumber;
    }

    public void setRfpNumber(String rfpNumber) {
        this.rfpNumber = rfpNumber;
    }

    public Date getRfpRequestdate() {
        return rfpRequestdate;
    }

    public void setRfpRequestdate(Date rfpRequestdate) {
        this.rfpRequestdate = rfpRequestdate;
    }

    public String getContactPersonName() {
        return contactPersonName;
    }

    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }

    public String getContactPersonTel() {
        return contactPersonTel;
    }

    public void setContactPersonTel(String contactPersonTel) {
        this.contactPersonTel = contactPersonTel;
    }

    public String getContactPersonEmail() {
        return contactPersonEmail;
    }

    public void setContactPersonEmail(String contactPersonEmail) {
        this.contactPersonEmail = contactPersonEmail;
    }

    public String getNotifyVendor() {
        return notifyVendor;
    }

    public void setNotifyVendor(String notifyvendor) {
        this.notifyVendor = notifyvendor;
    }

    public String getDeliveryTerms() {
        return deliveryTerms;
    }

    public void setDeliveryTerms(String deliveryTerms) {
        this.deliveryTerms = deliveryTerms;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public Date getRfqValidUntil() {
        return rfqValidUntil;
    }

    public void setRfqValidUntil(Date rfqValidUntil) {
        this.rfqValidUntil = rfqValidUntil;
    }

    public Date getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(Date expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
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
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof WorkOrderRfpHeader)) {
            return false;
        }
        WorkOrderRfpHeader other = (WorkOrderRfpHeader) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.WorkOrderRfpHeader[ id=" + id + " ]";
    }

    public String getRfpStatus() {
        return rfpStatus;
    }

    public void setRfpStatus(String rfpStatus) {
        this.rfpStatus = rfpStatus;
    }

    public String getResponseReceivedCount() {
        return responseReceivedCount;
    }

    public void setResponseReceivedCount(String responseReceivedCount) {
        this.responseReceivedCount = responseReceivedCount;
    }

    public String getVendorCount() {
        return vendorCount;
    }

    public void setVendorCount(String vendorCount) {
        this.vendorCount = vendorCount;
    }

    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

    public Date getUpdationdate() {
        return updationdate;
    }

    public void setUpdationdate(Date updationdate) {
        this.updationdate = updationdate;
    }

    public Integer getRunningsequence() {
        return runningsequence;
    }

    public void setRunningsequence(Integer runningsequence) {
        this.runningsequence = runningsequence;
    }

    public String getpRType() {
        return pRType;
    }

    public void setpRType(String pRType) {
        this.pRType = pRType;
    }
}
