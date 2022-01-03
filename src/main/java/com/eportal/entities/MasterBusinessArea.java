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
@Table(name = "NG_Master_BusinessArea")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterBusinessArea.findAll", query = "SELECT m FROM MasterBusinessArea m"),
    @NamedQuery(name = "MasterBusinessArea.findBySNo", query = "SELECT m FROM MasterBusinessArea m WHERE m.sNo = :sNo"),
    @NamedQuery(name = "MasterBusinessArea.findByBusinessarea", query = "SELECT m FROM MasterBusinessArea m WHERE m.businessarea = :businessarea"),
    @NamedQuery(name = "MasterBusinessArea.findByRegion", query = "SELECT m FROM MasterBusinessArea m WHERE m.region = :region"),
    @NamedQuery(name = "MasterBusinessArea.findByLocation", query = "SELECT m FROM MasterBusinessArea m WHERE m.location = :location"),
    @NamedQuery(name = "MasterBusinessArea.findByLocationType", query = "SELECT m FROM MasterBusinessArea m WHERE m.locationType = :locationType"),
    @NamedQuery(name = "MasterBusinessArea.findByState", query = "SELECT m FROM MasterBusinessArea m WHERE m.state = :state"),
    @NamedQuery(name = "MasterBusinessArea.findByCoCode", query = "SELECT m FROM MasterBusinessArea m WHERE m.coCode = :coCode"),
    @NamedQuery(name = "MasterBusinessArea.findByBusinessAreaDec", query = "SELECT m FROM MasterBusinessArea m WHERE m.businessAreaDec = :businessAreaDec")})
public class MasterBusinessArea implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "SNo")
    private Integer sNo;
    @Size(max = 10)
    @Column(name = "Businessarea")
    private String businessarea;
    @Size(max = 50)
    @Column(name = "Region")
    private String region;
    @Size(max = 100)
    @Column(name = "Location")
    private String location;
    @Size(max = 100)
    @Column(name = "LocationType")
    private String locationType;
    @Size(max = 100)
    @Column(name = "State")
    private String state;
    @Size(max = 50)
    @Column(name = "CoCode")
    private String coCode;
    @Size(max = 50)
    @Column(name = "BusinessAreaDec")
    private String businessAreaDec;

    public MasterBusinessArea() {
    }

    public MasterBusinessArea(Integer sNo) {
        this.sNo = sNo;
    }

    public Integer getSNo() {
        return sNo;
    }

    public void setSNo(Integer sNo) {
        this.sNo = sNo;
    }

    public String getBusinessarea() {
        return businessarea;
    }

    public void setBusinessarea(String businessarea) {
        this.businessarea = businessarea;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocationType() {
        return locationType;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
    }

    public String getBusinessAreaDec() {
        return businessAreaDec;
    }

    public void setBusinessAreaDec(String businessAreaDec) {
        this.businessAreaDec = businessAreaDec;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sNo != null ? sNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterBusinessArea)) {
            return false;
        }
        MasterBusinessArea other = (MasterBusinessArea) object;
        if ((this.sNo == null && other.sNo != null) || (this.sNo != null && !this.sNo.equals(other.sNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterBusinessArea[ sNo=" + sNo + " ]";
    }
    
}
