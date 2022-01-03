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
@Table(name = "NG_Master_DistributionChannel")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterDistributionChannel.findAll", query = "SELECT m FROM MasterDistributionChannel m"),
    @NamedQuery(name = "MasterDistributionChannel.findBySno", query = "SELECT m FROM MasterDistributionChannel m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterDistributionChannel.findByCoCode", query = "SELECT m FROM MasterDistributionChannel m WHERE m.coCode = :coCode"),
    @NamedQuery(name = "MasterDistributionChannel.findByName", query = "SELECT m FROM MasterDistributionChannel m WHERE m.name = :name"),
    @NamedQuery(name = "MasterDistributionChannel.findByDistChannel", query = "SELECT m FROM MasterDistributionChannel m WHERE m.distChannel = :distChannel")})
public class MasterDistributionChannel implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "CoCode")
    private String coCode;
    @Size(max = 50)
    @Column(name = "Name")
    private String name;
    @Size(max = 50)
    @Column(name = "DistChannel")
    private String distChannel;

    public MasterDistributionChannel() {
    }

    public MasterDistributionChannel(Integer sno) {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDistChannel() {
        return distChannel;
    }

    public void setDistChannel(String distChannel) {
        this.distChannel = distChannel;
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
        if (!(object instanceof MasterDistributionChannel)) {
            return false;
        }
        MasterDistributionChannel other = (MasterDistributionChannel) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterDistributionChannel[ sno=" + sno + " ]";
    }
    
}
