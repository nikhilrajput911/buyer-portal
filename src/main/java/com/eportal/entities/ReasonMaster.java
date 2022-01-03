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
@Table(name = "NG_Master_RejectionType")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ReasonMaster.findAll", query = "SELECT r FROM ReasonMaster r"),
    @NamedQuery(name = "ReasonMaster.findById", query = "SELECT r FROM ReasonMaster r WHERE r.id = :id"),
    @NamedQuery(name = "ReasonMaster.findByProcessType", query = "SELECT r FROM ReasonMaster r WHERE r.type = :type"),
    @NamedQuery(name = "ReasonMaster.findByRejectionType", query = "SELECT r FROM ReasonMaster r WHERE r.reason = :reason")
})

public class ReasonMaster implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer id;
    @Size(max = 100)
    @Column(name = "RejectionType")
    private String reason;
    @Size(max = 50)
    @Column(name = "ProcessType")
    private String type;

    public ReasonMaster() {
    }

    public ReasonMaster(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
        if (!(object instanceof ReasonMaster)) {
            return false;
        }
        ReasonMaster other = (ReasonMaster) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ReasonMaster[ id=" + id + " ]";
    }
    
}
