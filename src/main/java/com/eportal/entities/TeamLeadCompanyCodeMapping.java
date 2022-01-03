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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_TeamLead_CompanyCode_Mapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TeamLeadCompanyCodeMapping.findAll", query = "SELECT t FROM TeamLeadCompanyCodeMapping t"),
    @NamedQuery(name = "TeamLeadCompanyCodeMapping.findById", query = "SELECT t FROM TeamLeadCompanyCodeMapping t WHERE t.id = :id"),
    @NamedQuery(name = "TeamLeadCompanyCodeMapping.findByCompanyCode", query = "SELECT t FROM TeamLeadCompanyCodeMapping t WHERE t.companyCode = :companyCode")})
public class TeamLeadCompanyCodeMapping implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    
    @Size(max = 100)
    @Column(name = "CompanyCode")
    private String companyCode;
    @JoinColumn(name = "teamlead_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails teamleadId;

    public TeamLeadCompanyCodeMapping() {
    }

    public TeamLeadCompanyCodeMapping(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public BuyerDetails getTeamleadId() {
        return teamleadId;
    }

    public void setTeamleadId(BuyerDetails teamleadId) {
        this.teamleadId = teamleadId;
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
        if (!(object instanceof TeamLeadCompanyCodeMapping)) {
            return false;
        }
        TeamLeadCompanyCodeMapping other = (TeamLeadCompanyCodeMapping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.TeamLeadCompanyCodeMapping[ id=" + id + " ]";
    }
    
}
