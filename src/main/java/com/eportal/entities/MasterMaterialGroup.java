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
@Table(name = "NG_Master_MaterialGroup")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterMaterialGroup.findAll", query = "SELECT m FROM MasterMaterialGroup m"),
    @NamedQuery(name = "MasterMaterialGroup.findBySno", query = "SELECT m FROM MasterMaterialGroup m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterMaterialGroup.findByProcessType", query = "SELECT m FROM MasterMaterialGroup m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterMaterialGroup.findByMaterialGroupCode", query = "SELECT m FROM MasterMaterialGroup m WHERE m.materialGroupCode = :materialGroupCode"),
    @NamedQuery(name = "MasterMaterialGroup.findByMaterialGroupDesc", query = "SELECT m FROM MasterMaterialGroup m WHERE m.materialGroupDesc = :materialGroupDesc"),
    @NamedQuery(name = "MasterMaterialGroup.findByMaterialGroupDesc2", query = "SELECT m FROM MasterMaterialGroup m WHERE m.materialGroupDesc2 = :materialGroupDesc2"),
    @NamedQuery(name = "MasterMaterialGroup.findByGLCode", query = "SELECT m FROM MasterMaterialGroup m WHERE m.gLCode = :gLCode")})
public class MasterMaterialGroup implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 10)
    @Column(name = "MaterialGroupCode")
    private String materialGroupCode;
    @Size(max = 100)
    @Column(name = "MaterialGroupDesc")
    private String materialGroupDesc;
    @Size(max = 100)
    @Column(name = "MaterialGroupDesc2")
    private String materialGroupDesc2;
    @Size(max = 10)
    @Column(name = "GLCode")
    private String gLCode;

    public MasterMaterialGroup() {
    }

    public MasterMaterialGroup(Integer sno) {
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

    public String getMaterialGroupCode() {
        return materialGroupCode;
    }

    public void setMaterialGroupCode(String materialGroupCode) {
        this.materialGroupCode = materialGroupCode;
    }

    public String getMaterialGroupDesc() {
        return materialGroupDesc;
    }

    public void setMaterialGroupDesc(String materialGroupDesc) {
        this.materialGroupDesc = materialGroupDesc;
    }

    public String getMaterialGroupDesc2() {
        return materialGroupDesc2;
    }

    public void setMaterialGroupDesc2(String materialGroupDesc2) {
        this.materialGroupDesc2 = materialGroupDesc2;
    }

    public String getGLCode() {
        return gLCode;
    }

    public void setGLCode(String gLCode) {
        this.gLCode = gLCode;
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
        if (!(object instanceof MasterMaterialGroup)) {
            return false;
        }
        MasterMaterialGroup other = (MasterMaterialGroup) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterMaterialGroup[ sno=" + sno + " ]";
    }
    
}
