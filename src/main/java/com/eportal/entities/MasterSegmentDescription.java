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
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Master_SegmentDescription")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterSegmentDescription.findAll", query = "SELECT m FROM MasterSegmentDescription m"),
    @NamedQuery(name = "MasterSegmentDescription.findById", query = "SELECT m FROM MasterSegmentDescription m WHERE m.id = :id"),
    @NamedQuery(name = "MasterSegmentDescription.findBySegment", query = "SELECT m FROM MasterSegmentDescription m WHERE m.segment = :segment"),
    @NamedQuery(name = "MasterSegmentDescription.findByDescription", query = "SELECT m FROM MasterSegmentDescription m WHERE m.description = :description")})
public class MasterSegmentDescription implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 10)
    @Column(name = "Segment")
    private String segment;
    @Size(max = 200)
    @Column(name = "Description")
    private String description;

    public MasterSegmentDescription() {
    }

    public MasterSegmentDescription(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
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
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterSegmentDescription)) {
            return false;
        }
        MasterSegmentDescription other = (MasterSegmentDescription) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterSegmentDescription[ id=" + id + " ]";
    }
    
}
