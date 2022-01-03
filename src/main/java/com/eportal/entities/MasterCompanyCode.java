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
@Table(name = "NG_Master_CompanyCode")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterCompanyCode.findAll", query = "SELECT m FROM MasterCompanyCode m"),
    @NamedQuery(name = "MasterCompanyCode.findBySno", query = "SELECT m FROM MasterCompanyCode m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterCompanyCode.findByCompanyCode", query = "SELECT m FROM MasterCompanyCode m WHERE m.companyCode = :companyCode"),
    @NamedQuery(name = "MasterCompanyCode.findByCompanyDescription", query = "SELECT m FROM MasterCompanyCode m WHERE m.companyDescription = :companyDescription")})
public class MasterCompanyCode implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 100)
    @Column(name = "CompanyDescription")
    private String companyDescription;

    public MasterCompanyCode() {
    }

    public MasterCompanyCode(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
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
        if (!(object instanceof MasterCompanyCode)) {
            return false;
        }
        MasterCompanyCode other = (MasterCompanyCode) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.controller.MasterCompanyCode[ sno=" + sno + " ]";
    }
    
}
