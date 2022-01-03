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
//@Table(name = "NG_Master_Material_MRP")
@Table(name = "NG_Master_Material_MAIN_MRP")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterMaterialMRP.findAll", query = "SELECT m FROM MasterMaterialMRP m"),
    @NamedQuery(name = "MasterMaterialMRP.findBySno", query = "SELECT m FROM MasterMaterialMRP m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterMaterialMRP.findByMaterialCode", query = "SELECT m FROM MasterMaterialMRP m WHERE m.materialCode = :materialCode"),
    @NamedQuery(name = "MasterMaterialMRP.findByCompanyCode", query = "SELECT m FROM MasterMaterialMRP m WHERE m.companyCode = :companyCode"),
    @NamedQuery(name = "MasterMaterialMRP.findByPlantCode", query = "SELECT m FROM MasterMaterialMRP m WHERE m.plantCode = :plantCode"),
    @NamedQuery(name = "MasterMaterialMRP.findByReorderPoint", query = "SELECT m FROM MasterMaterialMRP m WHERE m.reorderPoint = :reorderPoint"),
    @NamedQuery(name = "MasterMaterialMRP.findByMinimumLotSize", query = "SELECT m FROM MasterMaterialMRP m WHERE m.minimumLotSize = :minimumLotSize"),
    @NamedQuery(name = "MasterMaterialMRP.findByPlannedDelvTime", query = "SELECT m FROM MasterMaterialMRP m WHERE m.plannedDelvTime = :plannedDelvTime")})
public class MasterMaterialMRP implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "MaterialCode")
    private String materialCode;
    @Size(max = 10)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 100)
    @Column(name = "PlantCode")
    private String plantCode;
    @Size(max = 100)
    @Column(name = "ReorderPoint")
    private String reorderPoint;
    @Size(max = 100)
    @Column(name = "MinimumLotSize")
    private String minimumLotSize;
    @Size(max = 100)
    @Column(name = "PlannedDelvTime")
    private String plannedDelvTime;

    public MasterMaterialMRP() {
    }

    public MasterMaterialMRP(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPlantCode() {
        return plantCode;
    }

    public void setPlantCode(String plantCode) {
        this.plantCode = plantCode;
    }

    public String getReorderPoint() {
        return reorderPoint;
    }

    public void setReorderPoint(String reorderPoint) {
        this.reorderPoint = reorderPoint;
    }

    public String getMinimumLotSize() {
        return minimumLotSize;
    }

    public void setMinimumLotSize(String minimumLotSize) {
        this.minimumLotSize = minimumLotSize;
    }

    public String getPlannedDelvTime() {
        return plannedDelvTime;
    }

    public void setPlannedDelvTime(String plannedDelvTime) {
        this.plannedDelvTime = plannedDelvTime;
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
        if (!(object instanceof MasterMaterialMRP)) {
            return false;
        }
        MasterMaterialMRP other = (MasterMaterialMRP) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterMaterialMRP[ sno=" + sno + " ]";
    }
    
}
