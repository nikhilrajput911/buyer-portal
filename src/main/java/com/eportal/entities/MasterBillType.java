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
@Table(name = "NG_Master_BillType")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterBillType.findAll", query = "SELECT m FROM MasterBillType m"),
    @NamedQuery(name = "MasterBillType.findBySno", query = "SELECT m FROM MasterBillType m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterBillType.findByProcessType", query = "SELECT m FROM MasterBillType m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterBillType.findByBillType", query = "SELECT m FROM MasterBillType m WHERE m.billType = :billType"),
    @NamedQuery(name = "MasterBillType.findByCoCode", query = "SELECT m FROM MasterBillType m WHERE m.coCode = :coCode"),
    @NamedQuery(name = "MasterBillType.findByDescription", query = "SELECT m FROM MasterBillType m WHERE m.description = :description")})
public class MasterBillType implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 20)
    @Column(name = "BillType")
    private String billType;
    @Size(max = 20)
    @Column(name = "CoCode")
    private String coCode;
    @Size(max = 100)
    @Column(name = "Description")
    private String description;

    public MasterBillType() {
    }

    public MasterBillType(Integer sno) {
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

    public String getBillType() {
        return billType;
    }

    public void setBillType(String billType) {
        this.billType = billType;
    }

    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
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
        if (!(object instanceof MasterBillType)) {
            return false;
        }
        MasterBillType other = (MasterBillType) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterBillType[ sno=" + sno + " ]";
    }
    
}
