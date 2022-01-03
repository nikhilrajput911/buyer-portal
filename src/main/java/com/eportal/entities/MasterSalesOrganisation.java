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
@Table(name = "NG_Master_SalesOrganisation")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterSalesOrganisation.findAll", query = "SELECT m FROM MasterSalesOrganisation m"),
    @NamedQuery(name = "MasterSalesOrganisation.findBySno", query = "SELECT m FROM MasterSalesOrganisation m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterSalesOrganisation.findByProcessType", query = "SELECT m FROM MasterSalesOrganisation m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterSalesOrganisation.findBySalesOrgName", query = "SELECT m FROM MasterSalesOrganisation m WHERE m.salesOrgName = :salesOrgName"),
    @NamedQuery(name = "MasterSalesOrganisation.findBySalesOrgCode", query = "SELECT m FROM MasterSalesOrganisation m WHERE m.salesOrgCode = :salesOrgCode"),
    @NamedQuery(name = "MasterSalesOrganisation.findByCoCode", query = "SELECT m FROM MasterSalesOrganisation m WHERE m.coCode = :coCode")})
public class MasterSalesOrganisation implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 30)
    @Column(name = "SalesOrgName")
    private String salesOrgName;
    @Size(max = 10)
    @Column(name = "SalesOrgCode")
    private String salesOrgCode;
    @Size(max = 30)
    @Column(name = "CoCode")
    private String coCode;

    public MasterSalesOrganisation() {
    }

    public MasterSalesOrganisation(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public String getSalesOrgName() {
        return salesOrgName;
    }

    public void setSalesOrgName(String salesOrgName) {
        this.salesOrgName = salesOrgName;
    }

    public String getSalesOrgCode() {
        return salesOrgCode;
    }

    public void setSalesOrgCode(String salesOrgCode) {
        this.salesOrgCode = salesOrgCode;
    }

    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
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
        if (!(object instanceof MasterSalesOrganisation)) {
            return false;
        }
        MasterSalesOrganisation other = (MasterSalesOrganisation) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterSalesOrganisation[ sno=" + sno + " ]";
    }
    
}
