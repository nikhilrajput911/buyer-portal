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
@Table(name = "NG_BP_FinalizedRfq")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "FinalizedRfq.findAll", query = "SELECT f FROM FinalizedRfq f"),
    @NamedQuery(name = "FinalizedRfq.findById", query = "SELECT f FROM FinalizedRfq f WHERE f.id = :id"),
    @NamedQuery(name = "FinalizedRfq.findByComments", query = "SELECT f FROM FinalizedRfq f WHERE f.comments = :comments"),
    @NamedQuery(name = "FinalizedRfq.findByWhyThisVendor", query = "SELECT f FROM FinalizedRfq f WHERE f.whyThisVendor = :whyThisVendor"),
    @NamedQuery(name = "FinalizedRfq.findByFinalizedDate", query = "SELECT f FROM FinalizedRfq f WHERE f.finalizedDate = :finalizedDate")})
public class FinalizedRfq implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Size(max = 2147483647)
    @Column(name = "comments")
    private String comments;
    @Size(max = 2147483647)
    @Column(name = "why_this_vendor")
    private String whyThisVendor;
    @Column(name = "finalized_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date finalizedDate;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;
    @JoinColumn(name = "ng_bp_workorderrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid;
    @JoinColumn(name = "NG_BP_Newgen_PR_LineItem_InsertionOrderID", referencedColumnName = "InsertionOrderID")
    @ManyToOne
    private NewgenPRLineItem ngBpNewgenPRLineItemId;
    @Size(max = 10)
    @Column(name = "IsPoCreated")
    private String isPoCreated;
    @Size(max = 10)
    @Column(name = "quantity")
    private String quantity;
    @Size(max = 10)
    @Column(name = "PoNumber")
    private String poNumber;
    @Size(max = 20)
    @Column(name = "PrNumber")
    private String prNumber;
    @Size(max = 10)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 20)
    @Column(name = "Status")
    private String status;

    public FinalizedRfq() {
    }

    public FinalizedRfq(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getWhyThisVendor() {
        return whyThisVendor;
    }

    public void setWhyThisVendor(String whyThisVendor) {
        this.whyThisVendor = whyThisVendor;
    }

    public Date getFinalizedDate() {
        return finalizedDate;
    }

    public void setFinalizedDate(Date finalizedDate) {
        this.finalizedDate = finalizedDate;
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
    }

    public WorkOrderRfqHeader getNgBpWorkorderrfqheaderRfqid() {
        return ngBpWorkorderrfqheaderRfqid;
    }

    public void setNgBpWorkorderrfqheaderRfqid(WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid) {
        this.ngBpWorkorderrfqheaderRfqid = ngBpWorkorderrfqheaderRfqid;
    }

    public NewgenPRLineItem getNgBpNewgenPRLineItemId() {
        return ngBpNewgenPRLineItemId;
    }

    public void setNgBpNewgenPRLineItemId(NewgenPRLineItem ngBpNewgenPRLineItemId) {
        this.ngBpNewgenPRLineItemId = ngBpNewgenPRLineItemId;
    }
    public String getIsPoCreated() {
        return isPoCreated;
    }

    public void setIsPoCreated(String isPoCreated) {
        this.isPoCreated = isPoCreated;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getPoNumber() {
        return poNumber;
    }
    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }
    public String getPrNumber() {
        return prNumber;
    }

    public void setPrNumber(String prNumber) {
        this.prNumber = prNumber;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
        if (!(object instanceof FinalizedRfq)) {
            return false;
        }
        FinalizedRfq other = (FinalizedRfq) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.FinalizedRfq[ id=" + id + " ]";
    }
    
}
