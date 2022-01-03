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
@Table(name = "ng_master_incoterms")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterIncoterms.findAll", query = "SELECT m FROM MasterIncoterms m"),
    @NamedQuery(name = "MasterIncoterms.findBySno", query = "SELECT m FROM MasterIncoterms m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterIncoterms.findByIncoterms", query = "SELECT m FROM MasterIncoterms m WHERE m.incoterms = :incoterms"),
    @NamedQuery(name = "MasterIncoterms.findByIncotermsDesc", query = "SELECT m FROM MasterIncoterms m WHERE m.incotermsDesc = :incotermsDesc")})
public class MasterIncoterms implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 5)
    @Column(name = "Incoterms")
    private String incoterms;
    @Size(max = 100)
    @Column(name = "IncotermsDesc")
    private String incotermsDesc;

    public MasterIncoterms() {
    }

    public MasterIncoterms(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getIncoterms() {
        return incoterms;
    }

    public void setIncoterms(String incoterms) {
        this.incoterms = incoterms;
    }

    public String getIncotermsDesc() {
        return incotermsDesc;
    }

    public void setIncotermsDesc(String incotermsDesc) {
        this.incotermsDesc = incotermsDesc;
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
        if (!(object instanceof MasterIncoterms)) {
            return false;
        }
        MasterIncoterms other = (MasterIncoterms) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterIncoterms[ sno=" + sno + " ]";
    }
    
}
