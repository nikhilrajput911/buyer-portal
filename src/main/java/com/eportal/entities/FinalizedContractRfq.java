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
@Table(name = "NG_BP_FinalizedContractRfq")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "FinalizedContractRfq.findAll", query = "SELECT f FROM FinalizedContractRfq f"),
    @NamedQuery(name = "FinalizedContractRfq.findById", query = "SELECT f FROM FinalizedContractRfq f WHERE f.id = :id"),
    @NamedQuery(name = "FinalizedContractRfq.findByComments", query = "SELECT f FROM FinalizedContractRfq f WHERE f.comments = :comments"),
    @NamedQuery(name = "FinalizedContractRfq.findByWhyThisVendor", query = "SELECT f FROM FinalizedContractRfq f WHERE f.whyThisVendor = :whyThisVendor"),
    @NamedQuery(name = "FinalizedContractRfq.findByRfqId", query = "SELECT f FROM FinalizedContractRfq f WHERE f.ngBpcontractrfqheaderRfqid.rfqid = :rfqId"),
    @NamedQuery(name = "FinalizedContractRfq.findByFinalizedDate", query = "SELECT f FROM FinalizedContractRfq f WHERE f.finalizedDate = :finalizedDate")})
public class FinalizedContractRfq implements Serializable {
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
    @JoinColumn(name = "ng_bp_contractrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private ContractRfqHeader ngBpcontractrfqheaderRfqid;
    @JoinColumn(name = "NG_BP_Newgen_PR_LineItem_InsertionOrderID", referencedColumnName = "InsertionOrderID")
    @ManyToOne
    private NewgenContractLineItem ngBpNewgencmLineItemId;

    public FinalizedContractRfq() {
    }

    public FinalizedContractRfq(Integer id) {
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

    public ContractRfqHeader getNgBpcontractrfqheaderRfqid() {
        return ngBpcontractrfqheaderRfqid;
    }

    public void setNgBpcontractrfqheaderRfqid(ContractRfqHeader ngBpcontractrfqheaderRfqid) {
        this.ngBpcontractrfqheaderRfqid = ngBpcontractrfqheaderRfqid;
    }

    public NewgenContractLineItem getNgBpNewgenCMLineItemId() {
        return ngBpNewgencmLineItemId;
    }

    public void setNgBpNewgenCMLineItemId(NewgenContractLineItem ngBpNewgencmLineItemId) {
        this.ngBpNewgencmLineItemId = ngBpNewgencmLineItemId;
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
        if (!(object instanceof FinalizedContractRfq)) {
            return false;
        }
        FinalizedContractRfq other = (FinalizedContractRfq) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.FinalizedContractRfq[ id=" + id + " ]";
    }
    
}
