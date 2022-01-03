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
@Table(name = "NG_Master_WBSElement")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterWBSElement.findAll", query = "SELECT m FROM MasterWBSElement m"),
    @NamedQuery(name = "MasterWBSElement.findBySno", query = "SELECT m FROM MasterWBSElement m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterWBSElement.findByWBSCode", query = "SELECT m FROM MasterWBSElement m WHERE m.wBSCode = :wBSCode"),
    @NamedQuery(name = "MasterWBSElement.findByWBSDesc", query = "SELECT m FROM MasterWBSElement m WHERE m.wBSDesc = :wBSDesc")})
public class MasterWBSElement implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "WBSCode")
    private String wBSCode;
    @Size(max = 100)
    @Column(name = "WBSDesc")
    private String wBSDesc;

    public MasterWBSElement() {
    }

    public MasterWBSElement(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getWBSCode() {
        return wBSCode;
    }

    public void setWBSCode(String wBSCode) {
        this.wBSCode = wBSCode;
    }

    public String getWBSDesc() {
        return wBSDesc;
    }

    public void setWBSDesc(String wBSDesc) {
        this.wBSDesc = wBSDesc;
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
        if (!(object instanceof MasterWBSElement)) {
            return false;
        }
        MasterWBSElement other = (MasterWBSElement) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterWBSElement[ sno=" + sno + " ]";
    }
    
}
