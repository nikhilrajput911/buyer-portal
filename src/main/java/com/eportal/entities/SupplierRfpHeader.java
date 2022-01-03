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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_SupplierRfpHeader")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SupplierRfpHeader.findAll", query = "SELECT w FROM WOSupplierHeader w")
})
public class SupplierRfpHeader implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Column(name = "validity_of_offer")
    @Temporal(TemporalType.TIMESTAMP)
    private Date validityOfOffer;
    @Column(name = "other_comment")
    private String otherComment;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    @Size(max = 150)
    @Column(name = "deliverytermsvendor")
    private String deliverytermsvendor;
    @Size(max = 55)
    @Column(name = "paymenttermsvendor")
    private String paymenttermsvendor;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;
    @JoinColumn(name = "WorkOrderRfpHeaderId", referencedColumnName = "Id")
    @ManyToOne
    private WorkOrderRfpHeader workOrderRfpHeader;
    
    public SupplierRfpHeader() {
    }

    public SupplierRfpHeader(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOtherComment() {
        return otherComment;
    }

    public void setOtherComment(String otherComment) {
        this.otherComment = otherComment;
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
        if (!(object instanceof SupplierRfpHeader)) {
            return false;
        }
        SupplierRfpHeader other = (SupplierRfpHeader) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SupplierRfpHeader[ id=" + id + " ]";
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
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
    public Date getValidityOfOffer() {
        return validityOfOffer;
    }

    public void setValidityOfOffer(Date validityOfOffer) {
        this.validityOfOffer = validityOfOffer;
    }

    public WorkOrderRfpHeader getWorkOrderRfpHeader() {
        return workOrderRfpHeader;
    }

    public void setWorkOrderRfpHeader(WorkOrderRfpHeader workOrderRfpHeader) {
        this.workOrderRfpHeader = workOrderRfpHeader;
    }
    
}

