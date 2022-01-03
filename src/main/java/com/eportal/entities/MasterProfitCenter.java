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
@Table(name = "NG_Master_ProfitCenter")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterProfitCenter.findAll", query = "SELECT m FROM MasterProfitCenter m"),
    @NamedQuery(name = "MasterProfitCenter.findBySno", query = "SELECT m FROM MasterProfitCenter m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterProfitCenter.findByProfitCenter", query = "SELECT m FROM MasterProfitCenter m WHERE m.profitCenter = :profitCenter"),
    @NamedQuery(name = "MasterProfitCenter.findByProfitCenterdesc", query = "SELECT m FROM MasterProfitCenter m WHERE m.profitCenterdesc = :profitCenterdesc")})
public class MasterProfitCenter implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "SNO")
    private Integer sno;
    @Size(max = 50)
    @Column(name = "ProfitCenter")
    private String profitCenter;
    @Size(max = 100)
    @Column(name = "ProfitCenterdesc")
    private String profitCenterdesc;

    public MasterProfitCenter() {
    }

    public MasterProfitCenter(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getProfitCenter() {
        return profitCenter;
    }

    public void setProfitCenter(String profitCenter) {
        this.profitCenter = profitCenter;
    }

    public String getProfitCenterdesc() {
        return profitCenterdesc;
    }

    public void setProfitCenterdesc(String profitCenterdesc) {
        this.profitCenterdesc = profitCenterdesc;
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
        if (!(object instanceof MasterProfitCenter)) {
            return false;
        }
        MasterProfitCenter other = (MasterProfitCenter) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterProfitCenter[ sno=" + sno + " ]";
    }

}
