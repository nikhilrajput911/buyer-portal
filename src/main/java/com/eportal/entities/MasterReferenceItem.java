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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_Master_ReferenceItem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterReferenceItem.findAll", query = "SELECT m FROM MasterReferenceItem m"),
    @NamedQuery(name = "MasterReferenceItem.findBySno", query = "SELECT m FROM MasterReferenceItem m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterReferenceItem.findByDocument", query = "SELECT m FROM MasterReferenceItem m WHERE m.document = :document"),
    @NamedQuery(name = "MasterReferenceItem.findByItem", query = "SELECT m FROM MasterReferenceItem m WHERE m.item = :item")})
public class MasterReferenceItem implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "Document")
    private String document;
    @Size(max = 25)
    @Column(name = "Item")
    private String item;

    public MasterReferenceItem() {
    }

    public MasterReferenceItem(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sno != null ? sno.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterReferenceItem)) {
            return false;
        }
        MasterReferenceItem other = (MasterReferenceItem) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterReferenceItem[ sno=" + sno + " ]";
    }
    
}
