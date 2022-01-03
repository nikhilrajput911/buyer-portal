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
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_vendor_group_mapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "VendorGroupMapping.findAll", query = "SELECT v FROM VendorGroupMapping v"),
    @NamedQuery(name = "VendorGroupMapping.findById", query = "SELECT v FROM VendorGroupMapping v WHERE v.id = :id")})
public class VendorGroupMapping implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @JoinColumn(name = "ng_bp_vendor_group_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorGroup ngBpVendorGroupId;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;

    public VendorGroupMapping() {
    }

    public VendorGroupMapping(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public VendorGroup getNgBpVendorGroupId() {
        return ngBpVendorGroupId;
    }

    public void setNgBpVendorGroupId(VendorGroup ngBpVendorGroupId) {
        this.ngBpVendorGroupId = ngBpVendorGroupId;
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
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
        if (!(object instanceof VendorGroupMapping)) {
            return false;
        }
        VendorGroupMapping other = (VendorGroupMapping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.VendorGroupMapping[ id=" + id + " ]";
    }
    
}
