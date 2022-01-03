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
@Table(name = "NG_Master_ProductHierarchy3")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterProductHierarchy3.findAll", query = "SELECT m FROM MasterProductHierarchy3 m"),
    @NamedQuery(name = "MasterProductHierarchy3.findBySno", query = "SELECT m FROM MasterProductHierarchy3 m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterProductHierarchy3.findByPhl3", query = "SELECT m FROM MasterProductHierarchy3 m WHERE m.phl3 = :phl3"),
    @NamedQuery(name = "MasterProductHierarchy3.findByName", query = "SELECT m FROM MasterProductHierarchy3 m WHERE m.name = :name")})
public class MasterProductHierarchy3 implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "PHL3")
    private String phl3;
    @Size(max = 100)
    @Column(name = "Name")
    private String name;

    public MasterProductHierarchy3() {
    }

    public MasterProductHierarchy3(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getPhl3() {
        return phl3;
    }

    public void setPhl3(String phl3) {
        this.phl3 = phl3;
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
        if (!(object instanceof MasterProductHierarchy3)) {
            return false;
        }
        MasterProductHierarchy3 other = (MasterProductHierarchy3) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterProductHierarchy3[ sno=" + sno + " ]";
    }
    
}
