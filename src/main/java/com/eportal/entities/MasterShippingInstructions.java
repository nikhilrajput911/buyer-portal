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
@Table(name = "ng_master_shippingInstructions")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterShippingInstructions.findAll", query = "SELECT m FROM MasterShippingInstructions m"),
    @NamedQuery(name = "MasterShippingInstructions.findBySno", query = "SELECT m FROM MasterShippingInstructions m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterShippingInstructions.findByProcessname", query = "SELECT m FROM MasterShippingInstructions m WHERE m.processname = :processname"),
    @NamedQuery(name = "MasterShippingInstructions.findByShippingInst", query = "SELECT m FROM MasterShippingInstructions m WHERE m.shippingInst = :shippingInst")})
public class MasterShippingInstructions implements Serializable {
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
    @Column(name = "shipping_inst")
    private String shippingInst;

    public MasterShippingInstructions() {
    }

    public MasterShippingInstructions(Integer sno) {
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

    public String getShippingInst() {
        return shippingInst;
    }

    public void setShippingInst(String shippingInst) {
        this.shippingInst = shippingInst;
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
        if (!(object instanceof MasterShippingInstructions)) {
            return false;
        }
        MasterShippingInstructions other = (MasterShippingInstructions) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterShippingInstructions[ sno=" + sno + " ]";
    }
    
}
