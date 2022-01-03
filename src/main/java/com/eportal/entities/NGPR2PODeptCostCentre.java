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
@Table(name = "NG_PR2PO_Dept_CostCentre")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGPR2PODeptCostCentre.findAll", query = "SELECT n FROM NGPR2PODeptCostCentre n"),
    @NamedQuery(name = "NGPR2PODeptCostCentre.findBySno", query = "SELECT n FROM NGPR2PODeptCostCentre n WHERE n.sno = :sno"),
    @NamedQuery(name = "NGPR2PODeptCostCentre.findByTrackingNo", query = "SELECT n FROM NGPR2PODeptCostCentre n WHERE n.trackingNo = :trackingNo"),
    @NamedQuery(name = "NGPR2PODeptCostCentre.findByCostCenter", query = "SELECT n FROM NGPR2PODeptCostCentre n WHERE n.costCenter = :costCenter")})
public class NGPR2PODeptCostCentre implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "TrackingNo")
    private String trackingNo;
    @Size(max = 25)
    @Column(name = "CostCenter")
    private String costCenter;

    public NGPR2PODeptCostCentre() {
    }

    public NGPR2PODeptCostCentre(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getTrackingNo() {
        return trackingNo;
    }

    public void setTrackingNo(String trackingNo) {
        this.trackingNo = trackingNo;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
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
        if (!(object instanceof NGPR2PODeptCostCentre)) {
            return false;
        }
        NGPR2PODeptCostCentre other = (NGPR2PODeptCostCentre) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGPR2PODeptCostCentre[ sno=" + sno + " ]";
    }
    
}
