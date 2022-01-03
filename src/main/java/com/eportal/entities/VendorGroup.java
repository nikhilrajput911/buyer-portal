/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_vendor_group")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "VendorGroup.findAll", query = "SELECT v FROM VendorGroup v"),
    @NamedQuery(name = "VendorGroup.findById", query = "SELECT v FROM VendorGroup v WHERE v.id = :id"),
    @NamedQuery(name = "VendorGroup.findByGroupname", query = "SELECT v FROM VendorGroup v WHERE v.groupname = :groupname"),
    @NamedQuery(name = "VendorGroup.findByGroupalias", query = "SELECT v FROM VendorGroup v WHERE v.groupalias = :groupalias")})
public class VendorGroup implements Serializable {
    @OneToMany(mappedBy = "ngBpVendorGroupId")
    private Collection<VendorGroupMapping> vendorGroupMappingCollection;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "groupname")
    private String groupname;
    @Size(max = 100)
    @Column(name = "groupalias")
    private String groupalias;

    public VendorGroup() {
    }

    public VendorGroup(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGroupname() {
        return groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getGroupalias() {
        return groupalias;
    }

    public void setGroupalias(String groupalias) {
        this.groupalias = groupalias;
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
        if (!(object instanceof VendorGroup)) {
            return false;
        }
        VendorGroup other = (VendorGroup) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.VendorGroup[ id=" + id + " ]";
    }

    @XmlTransient
    public Collection<VendorGroupMapping> getVendorGroupMappingCollection() {
        return vendorGroupMappingCollection;
    }

    public void setVendorGroupMappingCollection(Collection<VendorGroupMapping> vendorGroupMappingCollection) {
        this.vendorGroupMappingCollection = vendorGroupMappingCollection;
    }
    
}
