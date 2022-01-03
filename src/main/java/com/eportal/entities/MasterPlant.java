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
@Table(name = "NG_Master_Plant")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterPlant.findAll", query = "SELECT m FROM MasterPlant m"),
    @NamedQuery(name = "MasterPlant.findBySno", query = "SELECT m FROM MasterPlant m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterPlant.findByProcessType", query = "SELECT m FROM MasterPlant m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterPlant.findByPlantCode", query = "SELECT m FROM MasterPlant m WHERE m.plantCode = :plantCode"),
    @NamedQuery(name = "MasterPlant.findByPlantDesc", query = "SELECT m FROM MasterPlant m WHERE m.plantDesc = :plantDesc"),
    @NamedQuery(name = "MasterPlant.findBySearchTerm1", query = "SELECT m FROM MasterPlant m WHERE m.searchTerm1 = :searchTerm1"),
    @NamedQuery(name = "MasterPlant.findBySearchTerm2", query = "SELECT m FROM MasterPlant m WHERE m.searchTerm2 = :searchTerm2"),
    @NamedQuery(name = "MasterPlant.findByPostalCode", query = "SELECT m FROM MasterPlant m WHERE m.postalCode = :postalCode"),
    @NamedQuery(name = "MasterPlant.findByCity", query = "SELECT m FROM MasterPlant m WHERE m.city = :city"),
    @NamedQuery(name = "MasterPlant.findByName", query = "SELECT m FROM MasterPlant m WHERE m.name = :name"),
    @NamedQuery(name = "MasterPlant.findByName2", query = "SELECT m FROM MasterPlant m WHERE m.name2 = :name2"),
    @NamedQuery(name = "MasterPlant.findByVersion", query = "SELECT m FROM MasterPlant m WHERE m.version = :version")})
public class MasterPlant implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 5)
    @Column(name = "PlantCode")
    private String plantCode;
    @Size(max = 25)
    @Column(name = "PlantDesc")
    private String plantDesc;
    @Size(max = 50)
    @Column(name = "SearchTerm1")
    private String searchTerm1;
    @Size(max = 50)
    @Column(name = "SearchTerm2")
    private String searchTerm2;
    @Size(max = 10)
    @Column(name = "PostalCode")
    private String postalCode;
    @Size(max = 50)
    @Column(name = "City")
    private String city;
    @Size(max = 50)
    @Column(name = "Name")
    private String name;
    @Size(max = 50)
    @Column(name = "Name2")
    private String name2;
    @Size(max = 50)
    @Column(name = "Version")
    private String version;

    public MasterPlant() {
    }

    public MasterPlant(Integer sno) {
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

    public String getPlantCode() {
        return plantCode;
    }

    public void setPlantCode(String plantCode) {
        this.plantCode = plantCode;
    }

    public String getPlantDesc() {
        return plantDesc;
    }

    public void setPlantDesc(String plantDesc) {
        this.plantDesc = plantDesc;
    }

    public String getSearchTerm1() {
        return searchTerm1;
    }

    public void setSearchTerm1(String searchTerm1) {
        this.searchTerm1 = searchTerm1;
    }

    public String getSearchTerm2() {
        return searchTerm2;
    }

    public void setSearchTerm2(String searchTerm2) {
        this.searchTerm2 = searchTerm2;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
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
        if (!(object instanceof MasterPlant)) {
            return false;
        }
        MasterPlant other = (MasterPlant) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterPlant[ sno=" + sno + " ]";
    }
    
}
