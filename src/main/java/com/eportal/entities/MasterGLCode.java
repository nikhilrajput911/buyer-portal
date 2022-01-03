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
@Table(name = "NG_Master_GLCode")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterGLCode.findAll", query = "SELECT m FROM MasterGLCode m"),
    @NamedQuery(name = "MasterGLCode.findBySno", query = "SELECT m FROM MasterGLCode m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterGLCode.findByGlCode", query = "SELECT m FROM MasterGLCode m WHERE m.glCode = :glCode"),
    @NamedQuery(name = "MasterGLCode.findByGLDescription", query = "SELECT m FROM MasterGLCode m WHERE m.gLDescription = :gLDescription"),
    @NamedQuery(name = "MasterGLCode.findByChartofaccts", query = "SELECT m FROM MasterGLCode m WHERE m.chartofaccts = :chartofaccts"),
    @NamedQuery(name = "MasterGLCode.findByBlockedforposting", query = "SELECT m FROM MasterGLCode m WHERE m.blockedforposting = :blockedforposting"),
    @NamedQuery(name = "MasterGLCode.findByBLOCKEDFORCreation", query = "SELECT m FROM MasterGLCode m WHERE m.bLOCKEDFORCreation = :bLOCKEDFORCreation"),
    @NamedQuery(name = "MasterGLCode.findByBlockedforplanning", query = "SELECT m FROM MasterGLCode m WHERE m.blockedforplanning = :blockedforplanning"),
    @NamedQuery(name = "MasterGLCode.findByMarkedForDeletion", query = "SELECT m FROM MasterGLCode m WHERE m.markedForDeletion = :markedForDeletion"),
    @NamedQuery(name = "MasterGLCode.findByCompanycode", query = "SELECT m FROM MasterGLCode m WHERE m.companycode = :companycode")})
public class MasterGLCode implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "GlCode")
    private String glCode;
    @Size(max = 100)
    @Column(name = "GLDescription")
    private String gLDescription;
    @Size(max = 50)
    @Column(name = "CHARTOFACCTS")
    private String chartofaccts;
    @Size(max = 50)
    @Column(name = "BLOCKEDFORPOSTING")
    private String blockedforposting;
    @Size(max = 50)
    @Column(name = "BLOCKEDFORCreation")
    private String bLOCKEDFORCreation;
    @Size(max = 50)
    @Column(name = "BLOCKEDFORPLANNING")
    private String blockedforplanning;
    @Size(max = 50)
    @Column(name = "MARKED_FOR_DELETION")
    private String markedForDeletion;
    @Size(max = 50)
    @Column(name = "companycode")
    private String companycode;

    public MasterGLCode() {
    }

    public MasterGLCode(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getGlCode() {
        return glCode;
    }

    public void setGlCode(String glCode) {
        this.glCode = glCode;
    }

    public String getGLDescription() {
        return gLDescription;
    }

    public void setGLDescription(String gLDescription) {
        this.gLDescription = gLDescription;
    }

    public String getChartofaccts() {
        return chartofaccts;
    }

    public void setChartofaccts(String chartofaccts) {
        this.chartofaccts = chartofaccts;
    }

    public String getBlockedforposting() {
        return blockedforposting;
    }

    public void setBlockedforposting(String blockedforposting) {
        this.blockedforposting = blockedforposting;
    }

    public String getBLOCKEDFORCreation() {
        return bLOCKEDFORCreation;
    }

    public void setBLOCKEDFORCreation(String bLOCKEDFORCreation) {
        this.bLOCKEDFORCreation = bLOCKEDFORCreation;
    }

    public String getBlockedforplanning() {
        return blockedforplanning;
    }

    public void setBlockedforplanning(String blockedforplanning) {
        this.blockedforplanning = blockedforplanning;
    }

    public String getMarkedForDeletion() {
        return markedForDeletion;
    }

    public void setMarkedForDeletion(String markedForDeletion) {
        this.markedForDeletion = markedForDeletion;
    }

    public String getCompanycode() {
        return companycode;
    }

    public void setCompanycode(String companycode) {
        this.companycode = companycode;
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
        if (!(object instanceof MasterGLCode)) {
            return false;
        }
        MasterGLCode other = (MasterGLCode) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterGLCode[ sno=" + sno + " ]";
    }
    
}
