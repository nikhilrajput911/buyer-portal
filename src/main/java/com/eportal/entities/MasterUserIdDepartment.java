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
@Table(name = "NG_Master_UserID_Department")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterUserIdDepartment.findAll", query = "SELECT m FROM MasterUserIdDepartment m"),
    @NamedQuery(name = "MasterUserIdDepartment.findBySno", query = "SELECT m FROM MasterUserIdDepartment m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterUserIdDepartment.findByUserID", query = "SELECT m FROM MasterUserIdDepartment m WHERE m.userID = :userID"),
    @NamedQuery(name = "MasterUserIdDepartment.findByDepartment", query = "SELECT m FROM MasterUserIdDepartment m WHERE m.department = :department")})
public class MasterUserIdDepartment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "UserID")
    private String userID;
    @Size(max = 50)
    @Column(name = "Department")
    private String department;

    public MasterUserIdDepartment() {
    }

    public MasterUserIdDepartment(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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
        if (!(object instanceof MasterUserIdDepartment)) {
            return false;
        }
        MasterUserIdDepartment other = (MasterUserIdDepartment) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterUserIdDepartment[ sno=" + sno + " ]";
    }
    
}
