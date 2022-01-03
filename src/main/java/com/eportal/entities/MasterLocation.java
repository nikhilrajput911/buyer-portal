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
@Table(name = "NG_Master_Location")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterLocation.findAll", query = "SELECT m FROM MasterLocation m"),
    @NamedQuery(name = "MasterLocation.findBySno", query = "SELECT m FROM MasterLocation m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterLocation.findByProcessType", query = "SELECT m FROM MasterLocation m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterLocation.findByLocationCode", query = "SELECT m FROM MasterLocation m WHERE m.locationCode = :locationCode"),
    @NamedQuery(name = "MasterLocation.findByLocationDesc", query = "SELECT m FROM MasterLocation m WHERE m.locationDesc = :locationDesc")})
public class MasterLocation implements Serializable {
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
    @Column(name = "LocationCode")
    private String locationCode;
    @Size(max = 100)
    @Column(name = "LocationDesc")
    private String locationDesc;

    public MasterLocation() {
    }

    public MasterLocation(Integer sno) {
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

    public String getLocationCode() {
        return locationCode;
    }

    public void setLocationCode(String locationCode) {
        this.locationCode = locationCode;
    }

    public String getLocationDesc() {
        return locationDesc;
    }

    public void setLocationDesc(String locationDesc) {
        this.locationDesc = locationDesc;
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
        if (!(object instanceof MasterLocation)) {
            return false;
        }
        MasterLocation other = (MasterLocation) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterLocation[ sno=" + sno + " ]";
    }
    
}
