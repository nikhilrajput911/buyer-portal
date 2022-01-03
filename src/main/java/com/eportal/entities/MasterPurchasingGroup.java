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
@Table(name = "NG_Master_PurchasingGroup")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterPurchasingGroup.findAll", query = "SELECT m FROM MasterPurchasingGroup m"),
    @NamedQuery(name = "MasterPurchasingGroup.findBySno", query = "SELECT m FROM MasterPurchasingGroup m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterPurchasingGroup.findByProcessType", query = "SELECT m FROM MasterPurchasingGroup m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterPurchasingGroup.findByPurchasingGroupCode", query = "SELECT m FROM MasterPurchasingGroup m WHERE m.purchasingGroupCode = :purchasingGroupCode"),
    @NamedQuery(name = "MasterPurchasingGroup.findByPurchasingGroupDesc", query = "SELECT m FROM MasterPurchasingGroup m WHERE m.purchasingGroupDesc = :purchasingGroupDesc"),
    @NamedQuery(name = "MasterPurchasingGroup.findByTelephoneNo", query = "SELECT m FROM MasterPurchasingGroup m WHERE m.telephoneNo = :telephoneNo"),
    @NamedQuery(name = "MasterPurchasingGroup.findByFaxNo", query = "SELECT m FROM MasterPurchasingGroup m WHERE m.faxNo = :faxNo")})
public class MasterPurchasingGroup implements Serializable {
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
    @Column(name = "PurchasingGroupCode")
    private String purchasingGroupCode;
    @Size(max = 100)
    @Column(name = "PurchasingGroupDesc")
    private String purchasingGroupDesc;
    @Size(max = 25)
    @Column(name = "TelephoneNo")
    private String telephoneNo;
    @Size(max = 25)
    @Column(name = "FaxNo")
    private String faxNo;

    public MasterPurchasingGroup() {
    }

    public MasterPurchasingGroup(Integer sno) {
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

    public String getPurchasingGroupCode() {
        return purchasingGroupCode;
    }

    public void setPurchasingGroupCode(String purchasingGroupCode) {
        this.purchasingGroupCode = purchasingGroupCode;
    }

    public String getPurchasingGroupDesc() {
        return purchasingGroupDesc;
    }

    public void setPurchasingGroupDesc(String purchasingGroupDesc) {
        this.purchasingGroupDesc = purchasingGroupDesc;
    }

    public String getTelephoneNo() {
        return telephoneNo;
    }

    public void setTelephoneNo(String telephoneNo) {
        this.telephoneNo = telephoneNo;
    }

    public String getFaxNo() {
        return faxNo;
    }

    public void setFaxNo(String faxNo) {
        this.faxNo = faxNo;
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
        if (!(object instanceof MasterPurchasingGroup)) {
            return false;
        }
        MasterPurchasingGroup other = (MasterPurchasingGroup) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.controller.MasterPurchasingGroup[ sno=" + sno + " ]";
    }
    
}
