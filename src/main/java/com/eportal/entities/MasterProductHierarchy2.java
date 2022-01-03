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
@Table(name = "NG_Master_ProductHierarchy2")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterProductHierarchy2.findAll", query = "SELECT m FROM MasterProductHierarchy2 m"),
    @NamedQuery(name = "MasterProductHierarchy2.findBySno", query = "SELECT m FROM MasterProductHierarchy2 m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterProductHierarchy2.findByPhl2", query = "SELECT m FROM MasterProductHierarchy2 m WHERE m.phl2 = :phl2"),
    @NamedQuery(name = "MasterProductHierarchy2.findByName", query = "SELECT m FROM MasterProductHierarchy2 m WHERE m.name = :name")})
public class MasterProductHierarchy2 implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "PHL2")
    private String phl2;
    @Size(max = 100)
    @Column(name = "Name")
    private String name;

    public MasterProductHierarchy2() {
    }

    public MasterProductHierarchy2(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getPhl2() {
        return phl2;
    }

    public void setPhl2(String phl2) {
        this.phl2 = phl2;
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
        if (!(object instanceof MasterProductHierarchy2)) {
            return false;
        }
        MasterProductHierarchy2 other = (MasterProductHierarchy2) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterProductHierarchy2[ sno=" + sno + " ]";
    }
    
}
