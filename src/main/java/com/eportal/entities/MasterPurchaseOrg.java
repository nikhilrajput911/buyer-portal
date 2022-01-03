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
@Table(name = "NG_Master_PurchaseOrg")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterPurchaseOrg.findAll", query = "SELECT m FROM MasterPurchaseOrg m"),
    @NamedQuery(name = "MasterPurchaseOrg.findBySno", query = "SELECT m FROM MasterPurchaseOrg m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterPurchaseOrg.findByProcessType", query = "SELECT m FROM MasterPurchaseOrg m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterPurchaseOrg.findByPurchaseOrgCode", query = "SELECT m FROM MasterPurchaseOrg m WHERE m.purchaseOrgCode = :purchaseOrgCode"),
    @NamedQuery(name = "MasterPurchaseOrg.findByPurchaseOrgDesc", query = "SELECT m FROM MasterPurchaseOrg m WHERE m.purchaseOrgDesc = :purchaseOrgDesc")})
public class MasterPurchaseOrg implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 5)
    @Column(name = "PurchaseOrgCode")
    private String purchaseOrgCode;
    @Size(max = 25)
    @Column(name = "PurchaseOrgDesc")
    private String purchaseOrgDesc;

    public MasterPurchaseOrg() {
    }

    public MasterPurchaseOrg(Integer sno) {
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

    public String getPurchaseOrgCode() {
        return purchaseOrgCode;
    }

    public void setPurchaseOrgCode(String purchaseOrgCode) {
        this.purchaseOrgCode = purchaseOrgCode;
    }

    public String getPurchaseOrgDesc() {
        return purchaseOrgDesc;
    }

    public void setPurchaseOrgDesc(String purchaseOrgDesc) {
        this.purchaseOrgDesc = purchaseOrgDesc;
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
        if (!(object instanceof MasterPurchaseOrg)) {
            return false;
        }
        MasterPurchaseOrg other = (MasterPurchaseOrg) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterPurchaseOrg[ sno=" + sno + " ]";
    }
    
}
