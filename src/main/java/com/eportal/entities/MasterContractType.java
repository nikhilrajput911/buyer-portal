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
@Table(name = "NG_Master_ContractType")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterContractType.findAll", query = "SELECT m FROM MasterContractType m"),
    @NamedQuery(name = "MasterContractType.findBySno", query = "SELECT m FROM MasterContractType m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterContractType.findByProcessType", query = "SELECT m FROM MasterContractType m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterContractType.findByContractType", query = "SELECT m FROM MasterContractType m WHERE m.contractType = :contractType")})
public class MasterContractType implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 50)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 50)
    @Column(name = "ContractType")
    private String contractType;
    @Size(max = 50)
    @Column(name = "ContractTypeCode")
    private String contractTypeCode;

    public MasterContractType() {
    }

    public MasterContractType(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getContractTypeCode() {
        return contractTypeCode;
    }

    public void setContractTypeCode(String contractTypeCode) {
        this.contractTypeCode = contractTypeCode;
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
        if (!(object instanceof MasterContractType)) {
            return false;
        }
        MasterContractType other = (MasterContractType) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterContractType[ sno=" + sno + " ]";
    }

    
    
    
}
