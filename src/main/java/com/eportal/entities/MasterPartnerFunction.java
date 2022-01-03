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
@Table(name = "NG_Master_PartnerFunction")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterPartnerFunction.findAll", query = "SELECT m FROM MasterPartnerFunction m"),
    @NamedQuery(name = "MasterPartnerFunction.findById", query = "SELECT m FROM MasterPartnerFunction m WHERE m.id = :id"),
    @NamedQuery(name = "MasterPartnerFunction.findByPartnerFunction", query = "SELECT m FROM MasterPartnerFunction m WHERE m.partnerFunction = :partnerFunction"),
    @NamedQuery(name = "MasterPartnerFunction.findByFunctionName", query = "SELECT m FROM MasterPartnerFunction m WHERE m.functionName = :functionName")})
public class MasterPartnerFunction implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 2)
    @Column(name = "PartnerFunction")
    private String partnerFunction;
    @Size(max = 20)
    @Column(name = "FunctionName")
    private String functionName;

    public MasterPartnerFunction() {
    }

    public MasterPartnerFunction(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPartnerFunction() {
        return partnerFunction;
    }

    public void setPartnerFunction(String partnerFunction) {
        this.partnerFunction = partnerFunction;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
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
        if (!(object instanceof MasterPartnerFunction)) {
            return false;
        }
        MasterPartnerFunction other = (MasterPartnerFunction) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterPartnerFunction[ id=" + id + " ]";
    }
    
}
