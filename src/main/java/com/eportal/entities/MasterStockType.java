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
@Table(name = "ng_master_StockType")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterStockType.findAll", query = "SELECT m FROM MasterStockType m"),
    @NamedQuery(name = "MasterStockType.findBySno", query = "SELECT m FROM MasterStockType m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterStockType.findByProcessname", query = "SELECT m FROM MasterStockType m WHERE m.processname = :processname"),
    @NamedQuery(name = "MasterStockType.findByStockType", query = "SELECT m FROM MasterStockType m WHERE m.stockType = :stockType")})
public class MasterStockType implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "sno")
    private Integer sno;
    @Size(max = 15)
    @Column(name = "processname")
    private String processname;
    @Size(max = 50)
    @Column(name = "StockType")
    private String stockType;

    public MasterStockType() {
    }

    public MasterStockType(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getProcessname() {
        return processname;
    }

    public void setProcessname(String processname) {
        this.processname = processname;
    }

    public String getStockType() {
        return stockType;
    }

    public void setStockType(String stockType) {
        this.stockType = stockType;
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
        if (!(object instanceof MasterStockType)) {
            return false;
        }
        MasterStockType other = (MasterStockType) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterStockType_1[ sno=" + sno + " ]";
    }
    
}
