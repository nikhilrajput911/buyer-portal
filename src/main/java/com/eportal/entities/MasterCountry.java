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
@Table(name = "NG_Master_Country")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterCountry.findAll", query = "SELECT m FROM MasterCountry m"),
    @NamedQuery(name = "MasterCountry.findBySno", query = "SELECT m FROM MasterCountry m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterCountry.findByCountry", query = "SELECT m FROM MasterCountry m WHERE m.country = :country"),
    @NamedQuery(name = "MasterCountry.findByName", query = "SELECT m FROM MasterCountry m WHERE m.name = :name")})
public class MasterCountry implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "Country")
    private String country;
    @Size(max = 50)
    @Column(name = "Name")
    private String name;

    public MasterCountry() {
    }

    public MasterCountry(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        if (!(object instanceof MasterCountry)) {
            return false;
        }
        MasterCountry other = (MasterCountry) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterCountry[ sno=" + sno + " ]";
    }
    
}
