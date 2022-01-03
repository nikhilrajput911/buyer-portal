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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_purchaseordertype_master")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PurchaseOrderTypeMaster.findAll", query = "SELECT p FROM PurchaseOrderTypeMaster p"),
    @NamedQuery(name = "PurchaseOrderTypeMaster.findById", query = "SELECT p FROM PurchaseOrderTypeMaster p WHERE p.id = :id"),
    @NamedQuery(name = "PurchaseOrderTypeMaster.findByType", query = "SELECT p FROM PurchaseOrderTypeMaster p WHERE p.type = :type")})
public class PurchaseOrderTypeMaster implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 200)
    @Column(name = "type")
    private String type;

    public PurchaseOrderTypeMaster() {
    }

    public PurchaseOrderTypeMaster(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
        if (!(object instanceof PurchaseOrderTypeMaster)) {
            return false;
        }
        PurchaseOrderTypeMaster other = (PurchaseOrderTypeMaster) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PurchaseOrderTypeMaster[ id=" + id + " ]";
    }
    
}
