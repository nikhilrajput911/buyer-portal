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
@Table(name = "NG_Master_Department")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterDepartment.findAll", query = "SELECT m FROM MasterDepartment m"),
    @NamedQuery(name = "MasterDepartment.findBySno", query = "SELECT m FROM MasterDepartment m WHERE m.insertionOrderID = :sno"),
    @NamedQuery(name = "MasterDepartment.findByProcessType", query = "SELECT m FROM MasterDepartment m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterDepartment.findByUserName", query = "SELECT m FROM MasterDepartment m WHERE m.userName = :userName"),
    @NamedQuery(name = "MasterDepartment.findByLastName", query = "SELECT m FROM MasterDepartment m WHERE m.lastName = :lastName"),
    @NamedQuery(name = "MasterDepartment.findByDepartmentCode", query = "SELECT m FROM MasterDepartment m WHERE m.departmentCode = :departmentCode"),
    @NamedQuery(name = "MasterDepartment.findByDepartmentDesc", query = "SELECT m FROM MasterDepartment m WHERE m.departmentDesc = :departmentDesc")})
public class MasterDepartment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 25)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 100)
    @Column(name = "UserName")
    private String userName;
    @Size(max = 100)
    @Column(name = "LastName")
    private String lastName;
    @Size(max = 5)
    @Column(name = "DepartmentCode")
    private String departmentCode;
    @Size(max = 100)
    @Column(name = "DepartmentDesc")
    private String departmentDesc;

    public MasterDepartment() {
    }

    public MasterDepartment(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }
    
    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getDepartmentDesc() {
        return departmentDesc;
    }

    public void setDepartmentDesc(String departmentDesc) {
        this.departmentDesc = departmentDesc;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterDepartment)) {
            return false;
        }
        MasterDepartment other = (MasterDepartment) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterDepartment[ sno=" + insertionOrderID + " ]";
    }

}
