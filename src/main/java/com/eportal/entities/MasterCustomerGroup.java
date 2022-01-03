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
@Table(name = "NG_Master_CustomerGroup")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterCustomerGroup.findAll", query = "SELECT m FROM MasterCustomerGroup m"),
    @NamedQuery(name = "MasterCustomerGroup.findBySno", query = "SELECT m FROM MasterCustomerGroup m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterCustomerGroup.findByCustomerGroup", query = "SELECT m FROM MasterCustomerGroup m WHERE m.customerGroup = :customerGroup"),
    @NamedQuery(name = "MasterCustomerGroup.findByName", query = "SELECT m FROM MasterCustomerGroup m WHERE m.name = :name")})
public class MasterCustomerGroup implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "CustomerGroup")
    private String customerGroup;
    @Size(max = 100)
    @Column(name = "Name")
    private String name;

    public MasterCustomerGroup() {
    }

    public MasterCustomerGroup(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(String customerGroup) {
        this.customerGroup = customerGroup;
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
        if (!(object instanceof MasterCustomerGroup)) {
            return false;
        }
        MasterCustomerGroup other = (MasterCustomerGroup) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterCustomerGroup[ sno=" + sno + " ]";
    }
    
}
