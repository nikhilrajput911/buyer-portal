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
@Table(name = "ng_bp_Country_master")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CountryMaster.findAll", query = "SELECT c FROM CountryMaster c"),
    @NamedQuery(name = "CountryMaster.findById", query = "SELECT c FROM CountryMaster c WHERE c.id = :id"),
    @NamedQuery(name = "CountryMaster.findByCountry", query = "SELECT c FROM CountryMaster c WHERE c.country = :country"),
    @NamedQuery(name = "CountryMaster.findByCountrycode", query = "SELECT c FROM CountryMaster c WHERE c.countrycode = :countrycode")})
public class CountryMaster implements Serializable {
    @Size(max = 50)
    @Column(name = "currency")
    private String currency;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "country")
    private String country;
    @Size(max = 20)
    @Column(name = "countrycode")
    private String countrycode;

    public CountryMaster() {
    }

    public CountryMaster(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountrycode() {
        return countrycode;
    }

    public void setCountrycode(String countrycode) {
        this.countrycode = countrycode;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CountryMaster)) {
            return false;
        }
        CountryMaster other = (CountryMaster) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    

    @Override
    public String toString() {
        return "com.eportal.entities.CountryMaster[ id=" + id + " ]";
    }
    
}
