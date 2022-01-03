/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_Master_Asset")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterAsset.findAll", query = "SELECT m FROM MasterAsset m"),
    @NamedQuery(name = "MasterAsset.findBySno", query = "SELECT m FROM MasterAsset m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterAsset.findByCoCode", query = "SELECT m FROM MasterAsset m WHERE m.coCode = :coCode"),
    @NamedQuery(name = "MasterAsset.findByClass1", query = "SELECT m FROM MasterAsset m WHERE m.class1 = :class1"),
    @NamedQuery(name = "MasterAsset.findByAssetDesc", query = "SELECT m FROM MasterAsset m WHERE m.assetDesc = :assetDesc"),
    @NamedQuery(name = "MasterAsset.findByAcctDetails", query = "SELECT m FROM MasterAsset m WHERE m.acctDetails = :acctDetails"),
    @NamedQuery(name = "MasterAsset.findByCapDate", query = "SELECT m FROM MasterAsset m WHERE m.capDate = :capDate"),
    @NamedQuery(name = "MasterAsset.findByAsset", query = "SELECT m FROM MasterAsset m WHERE m.asset = :asset")})
public class MasterAsset implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "CoCode")
    private String coCode;
    @Size(max = 25)
    @Column(name = "Class")
    private String class1;
    @Size(max = 25)
    @Column(name = "AssetDesc")
    private String assetDesc;
    @Size(max = 25)
    @Column(name = "AcctDetails")
    private String acctDetails;
    @Column(name = "CapDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date capDate;
    @Size(max = 25)
    @Column(name = "Asset")
    private String asset;
    
    @Size(max = 50)
    @Column(name = "GlCode")
    private String glCode;
    
    
    public MasterAsset() {
    }

    public MasterAsset(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
    }

    public String getClass1() {
        return class1;
    }

    public void setClass1(String class1) {
        this.class1 = class1;
    }

    public String getAssetDesc() {
        return assetDesc;
    }

    public void setAssetDesc(String assetDesc) {
        this.assetDesc = assetDesc;
    }

    public String getAcctDetails() {
        return acctDetails;
    }

    public void setAcctDetails(String acctDetails) {
        this.acctDetails = acctDetails;
    }

    public Date getCapDate() {
        return capDate;
    }

    public void setCapDate(Date capDate) {
        this.capDate = capDate;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getGlCode() {
        return glCode;
    }

    public void setGlCode(String glCode) {
        this.glCode = glCode;
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
        if (!(object instanceof MasterAsset)) {
            return false;
        }
        MasterAsset other = (MasterAsset) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterAsset[ sno=" + sno + " ]";
    }
    
}
