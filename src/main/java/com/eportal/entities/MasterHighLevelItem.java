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
@Table(name = "NG_Master_HighLevelItem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterHighLevelItem.findAll", query = "SELECT m FROM MasterHighLevelItem m"),
    @NamedQuery(name = "MasterHighLevelItem.findBySno", query = "SELECT m FROM MasterHighLevelItem m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterHighLevelItem.findByHighLevelItem", query = "SELECT m FROM MasterHighLevelItem m WHERE m.highLevelItem = :highLevelItem"),
    @NamedQuery(name = "MasterHighLevelItem.findByDescription", query = "SELECT m FROM MasterHighLevelItem m WHERE m.description = :description")})
public class MasterHighLevelItem implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "HighLevelItem")
    private String highLevelItem;
    @Size(max = 100)
    @Column(name = "Description")
    private String description;

    public MasterHighLevelItem() {
    }

    public MasterHighLevelItem(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getHighLevelItem() {
        return highLevelItem;
    }

    public void setHighLevelItem(String highLevelItem) {
        this.highLevelItem = highLevelItem;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        if (!(object instanceof MasterHighLevelItem)) {
            return false;
        }
        MasterHighLevelItem other = (MasterHighLevelItem) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.dao.MasterHighLevelItem[ sno=" + sno + " ]";
    }
    
}
