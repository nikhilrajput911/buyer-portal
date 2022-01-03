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
@Table(name = "ng_master_QAControl")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterQAControl.findAll", query = "SELECT m FROM MasterQAControl m"),
    @NamedQuery(name = "MasterQAControl.findBySno", query = "SELECT m FROM MasterQAControl m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterQAControl.findByQAControl", query = "SELECT m FROM MasterQAControl m WHERE m.qAControl = :qAControl")})
public class MasterQAControl implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "sno")
    private Integer sno;
    @Size(max = 150)
    @Column(name = "QA_Control")
    private String qAControl;

    public MasterQAControl() {
    }

    public MasterQAControl(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getQAControl() {
        return qAControl;
    }

    public void setQAControl(String qAControl) {
        this.qAControl = qAControl;
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
        if (!(object instanceof MasterQAControl)) {
            return false;
        }
        MasterQAControl other = (MasterQAControl) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterQAControl[ sno=" + sno + " ]";
    }
    
}
