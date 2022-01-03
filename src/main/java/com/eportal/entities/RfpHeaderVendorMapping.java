/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "ng_bp_rfpheader_vendormapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "RfpHeaderVendorMapping.findAll", query = "SELECT r FROM RfpHeaderVendorMapping r"),
    @NamedQuery(name = "RfpHeaderVendorMapping.findByRfpId", query = "SELECT r FROM RfpHeaderVendorMapping r where r.ngBpWorkorderrfpheaderId.id = :id"),
    @NamedQuery(name = "RfpHeaderVendorMapping.findById", query = "SELECT r FROM RfpHeaderVendorMapping r WHERE r.id = :id")})
public class RfpHeaderVendorMapping implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;
    @JoinColumn(name = "ng_bp_workorderrfpheader_id", referencedColumnName = "Id")
    @ManyToOne
    private WorkOrderRfpHeader ngBpWorkorderrfpheaderId;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    @JoinColumn(name = "ng_bp_supplierHeader_id", referencedColumnName = "id")
    @ManyToOne
    private SupplierHeader workOrderSupplierHeaderTableid;

    public RfpHeaderVendorMapping() {
    }

    public RfpHeaderVendorMapping(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
    }

    public WorkOrderRfpHeader getNgBpWorkorderrfpheaderId() {
        return ngBpWorkorderrfpheaderId;
    }

    public void setNgBpWorkorderrfpheaderId(WorkOrderRfpHeader ngBpWorkorderrfpheaderId) {
        this.ngBpWorkorderrfpheaderId = ngBpWorkorderrfpheaderId;
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
        if (!(object instanceof RfpHeaderVendorMapping)) {
            return false;
        }
        RfpHeaderVendorMapping other = (RfpHeaderVendorMapping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.RfpHeaderVendorMapping[ id=" + id + " ]";
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public SupplierHeader getWorkOrderSupplierHeaderTableid() {
        return workOrderSupplierHeaderTableid;
    }

    public void setWorkOrderSupplierHeaderTableid(SupplierHeader workOrderSupplierHeaderTableid) {
        this.workOrderSupplierHeaderTableid = workOrderSupplierHeaderTableid;
    }
}
