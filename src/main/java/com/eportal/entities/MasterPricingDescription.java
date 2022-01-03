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
@Table(name = "ng_master_pricingdescription")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterPricingDescription.findAll", query = "SELECT m FROM MasterPricingDescription m"),
    @NamedQuery(name = "MasterPricingDescription.findById", query = "SELECT m FROM MasterPricingDescription m WHERE m.id = :id"),
    @NamedQuery(name = "MasterPricingDescription.findByCTYpe", query = "SELECT m FROM MasterPricingDescription m WHERE m.cTYpe = :cTYpe"),
    @NamedQuery(name = "MasterPricingDescription.findByName", query = "SELECT m FROM MasterPricingDescription m WHERE m.name = :name"),
    @NamedQuery(name = "MasterPricingDescription.findByCrCy", query = "SELECT m FROM MasterPricingDescription m WHERE m.crCy = :crCy")})
public class MasterPricingDescription implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Size(max = 10)
    @Column(name = "CTYpe")
    private String cTYpe;
    @Size(max = 50)
    @Column(name = "name")
    private String name;
    @Size(max = 5)
    @Column(name = "CrCy")
    private String crCy;

    public MasterPricingDescription() {
    }

    public MasterPricingDescription(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCTYpe() {
        return cTYpe;
    }

    public void setCTYpe(String cTYpe) {
        this.cTYpe = cTYpe;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCrCy() {
        return crCy;
    }

    public void setCrCy(String crCy) {
        this.crCy = crCy;
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
        if (!(object instanceof MasterPricingDescription)) {
            return false;
        }
        MasterPricingDescription other = (MasterPricingDescription) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterPricingDescription[ id=" + id + " ]";
    }
    
}
