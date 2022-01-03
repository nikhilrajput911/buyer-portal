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
@Table(name = "NG_BP_Master_ShippingInstruction")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterShippingInstruction.findAll", query = "SELECT m FROM MasterShippingInstruction m"),
    @NamedQuery(name = "MasterShippingInstruction.findById", query = "SELECT m FROM MasterShippingInstruction m WHERE m.id = :id"),
    @NamedQuery(name = "MasterShippingInstruction.findByShippingInstruction", query = "SELECT m FROM MasterShippingInstruction m WHERE m.shippingInstruction = :shippingInstruction")})
public class MasterShippingInstruction implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "ShippingInstruction")
    private String shippingInstruction;

    public MasterShippingInstruction() {
    }

    public MasterShippingInstruction(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getShippingInstruction() {
        return shippingInstruction;
    }

    public void setShippingInstruction(String shippingInstruction) {
        this.shippingInstruction = shippingInstruction;
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
        if (!(object instanceof MasterShippingInstruction)) {
            return false;
        }
        MasterShippingInstruction other = (MasterShippingInstruction) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterShippingInstruction[ id=" + id + " ]";
    }
    
}
