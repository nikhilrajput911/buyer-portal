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
@Table(name = "NG_Master_UserProfile")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterUserProfile.findAll", query = "SELECT m FROM MasterUserProfile m"),
    @NamedQuery(name = "MasterUserProfile.findBySno", query = "SELECT m FROM MasterUserProfile m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterUserProfile.findByDepartment", query = "SELECT m FROM MasterUserProfile m WHERE m.department = :department"),
    @NamedQuery(name = "MasterUserProfile.findByApproverLevel", query = "SELECT m FROM MasterUserProfile m WHERE m.approverLevel = :approverLevel"),
    @NamedQuery(name = "MasterUserProfile.findByRelationCode", query = "SELECT m FROM MasterUserProfile m WHERE m.relationCode = :relationCode"),
    @NamedQuery(name = "MasterUserProfile.findByUsername", query = "SELECT m FROM MasterUserProfile m WHERE m.username = :username")})
public class MasterUserProfile implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 50)
    @Column(name = "Department")
    private String department;
    @Size(max = 50)
    @Column(name = "ApproverLevel")
    private String approverLevel;
    @Size(max = 10)
    @Column(name = "RelationCode")
    private String relationCode;
    @Size(max = 50)
    @Column(name = "Username")
    private String username;

    public MasterUserProfile() {
    }

    public MasterUserProfile(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getApproverLevel() {
        return approverLevel;
    }

    public void setApproverLevel(String approverLevel) {
        this.approverLevel = approverLevel;
    }

    public String getRelationCode() {
        return relationCode;
    }

    public void setRelationCode(String relationCode) {
        this.relationCode = relationCode;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
        if (!(object instanceof MasterUserProfile)) {
            return false;
        }
        MasterUserProfile other = (MasterUserProfile) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterUserProfile[ sno=" + sno + " ]";
    }
    
}
