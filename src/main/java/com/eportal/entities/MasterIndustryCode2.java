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
@Table(name = "NG_Master_IndustryCode2")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterIndustryCode2.findAll", query = "SELECT m FROM MasterIndustryCode2 m"),
    @NamedQuery(name = "MasterIndustryCode2.findBySno", query = "SELECT m FROM MasterIndustryCode2 m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterIndustryCode2.findByIndustryCode", query = "SELECT m FROM MasterIndustryCode2 m WHERE m.industryCode = :industryCode"),
    @NamedQuery(name = "MasterIndustryCode2.findByDescription", query = "SELECT m FROM MasterIndustryCode2 m WHERE m.description = :description")})
public class MasterIndustryCode2 implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "IndustryCode")
    private String industryCode;
    @Size(max = 100)
    @Column(name = "Description")
    private String description;

    public MasterIndustryCode2() {
    }

    public MasterIndustryCode2(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getIndustryCode() {
        return industryCode;
    }

    public void setIndustryCode(String industryCode) {
        this.industryCode = industryCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        if (!(object instanceof MasterIndustryCode2)) {
            return false;
        }
        MasterIndustryCode2 other = (MasterIndustryCode2) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterIndustryCode2[ sno=" + sno + " ]";
    }
    
}
