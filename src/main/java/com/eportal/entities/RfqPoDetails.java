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
 * @author admin
 */
@Entity
@Table(name = "NG_BP_RfqPoDetails")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "RfqPoDetails.findAll", query = "SELECT r FROM RfqPoDetails r")
})
public class RfqPoDetails implements Serializable {
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
    @Column(name = "WhyThisVendor")
    private String whyThisVendor;
    @Size(max = 2147483647)
    @Column(name = "NoteToApprover")
    private String noteToApprover;
    @Column(name = "CreationDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    @JoinColumn(name = "NG_BP_VendorDetails_Id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsIdRef;
    @JoinColumn(name = "NG_BP_WorkOrderRfqLineItem_LineId", referencedColumnName = "RFQLineID")
    @ManyToOne
    private WorkOrderRfqLineItem ngBpWorkOrderRfqLineItemRef;
    @Size(max = 10)
    @Column(name = "quantity")
    private String quantity;
    @Size(max = 10)
    @Column(name = "PoNumber")
    private String poNumber;
    @Size(max = 20)
    @Column(name = "PrNumber")
    private String prNumber;

    public RfqPoDetails() {
    }

    public RfqPoDetails(Integer id) {
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

    public String getNoteToApprover() {
        return noteToApprover;
    }

    public void setNoteToApprover(String noteToApprover) {
        this.noteToApprover = noteToApprover;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public VendorDetails getNgBpVendordetailsIdRef() {
        return ngBpVendordetailsIdRef;
    }

    public void setNgBpVendordetailsIdRef(VendorDetails ngBpVendordetailsIdRef) {
        this.ngBpVendordetailsIdRef = ngBpVendordetailsIdRef;
    }

    public WorkOrderRfqLineItem getNgBpWorkOrderRfqLineItemRef() {
        return ngBpWorkOrderRfqLineItemRef;
    }

    public void setNgBpWorkOrderRfqLineItemRef(WorkOrderRfqLineItem ngBpWorkOrderRfqLineItemRef) {
        this.ngBpWorkOrderRfqLineItemRef = ngBpWorkOrderRfqLineItemRef;
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
        if (!(object instanceof RfqPoDetails)) {
            return false;
        }
        RfqPoDetails other = (RfqPoDetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.RfqPoDetails[ id=" + id + " ]";
    }
    
}
