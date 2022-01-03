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
@Table(name = "NG_Master_CostCentre")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterCostCentre.findAll", query = "SELECT m FROM MasterCostCentre m"),
    @NamedQuery(name = "MasterCostCentre.findBySno", query = "SELECT m FROM MasterCostCentre m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterCostCentre.findByCostCentre", query = "SELECT m FROM MasterCostCentre m WHERE m.costCentre = :costCentre"),
    @NamedQuery(name = "MasterCostCentre.findByControllingArea", query = "SELECT m FROM MasterCostCentre m WHERE m.controllingArea = :controllingArea"),
    @NamedQuery(name = "MasterCostCentre.findByCompanyCode", query = "SELECT m FROM MasterCostCentre m WHERE m.companyCode = :companyCode"),
    @NamedQuery(name = "MasterCostCentre.findByPersonResponsible", query = "SELECT m FROM MasterCostCentre m WHERE m.personResponsible = :personResponsible"),
    @NamedQuery(name = "MasterCostCentre.findByDescription", query = "SELECT m FROM MasterCostCentre m WHERE m.description = :description"),
    @NamedQuery(name = "MasterCostCentre.findByCCBlockFlag", query = "SELECT m FROM MasterCostCentre m WHERE m.cCBlockFlag = :cCBlockFlag"),
    @NamedQuery(name = "MasterCostCentre.findByGLCode", query = "SELECT m FROM MasterCostCentre m WHERE m.gLCode = :gLCode"),
    @NamedQuery(name = "MasterCostCentre.findByCommitmentItem", query = "SELECT m FROM MasterCostCentre m WHERE m.commitmentItem = :commitmentItem"),
    @NamedQuery(name = "MasterCostCentre.findByFund", query = "SELECT m FROM MasterCostCentre m WHERE m.fund = :fund"),
    @NamedQuery(name = "MasterCostCentre.findByFundCenter", query = "SELECT m FROM MasterCostCentre m WHERE m.fundCenter = :fundCenter"),
    @NamedQuery(name = "MasterCostCentre.findByFunctionalArea", query = "SELECT m FROM MasterCostCentre m WHERE m.functionalArea = :functionalArea")})
public class MasterCostCentre implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "CostCentre")
    private String costCentre;
    @Size(max = 100)
    @Column(name = "ControllingArea")
    private String controllingArea;
    @Size(max = 100)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 100)
    @Column(name = "PersonResponsible")
    private String personResponsible;
    @Size(max = 100)
    @Column(name = "Description")
    private String description;
    @Size(max = 50)
    @Column(name = "CCBlockFlag")
    private String cCBlockFlag;
    @Size(max = 60)
    @Column(name = "GLCode")
    private String gLCode;
    @Size(max = 60)
    @Column(name = "CommitmentItem")
    private String commitmentItem;
    @Size(max = 60)
    @Column(name = "Fund")
    private String fund;
    @Size(max = 60)
    @Column(name = "FundCenter")
    private String fundCenter;
    @Size(max = 60)
    @Column(name = "FunctionalArea")
    private String functionalArea;

    public MasterCostCentre() {
    }

    public MasterCostCentre(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getCostCentre() {
        return costCentre;
    }

    public void setCostCentre(String costCentre) {
        this.costCentre = costCentre;
    }

    public String getControllingArea() {
        return controllingArea;
    }

    public void setControllingArea(String controllingArea) {
        this.controllingArea = controllingArea;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPersonResponsible() {
        return personResponsible;
    }

    public void setPersonResponsible(String personResponsible) {
        this.personResponsible = personResponsible;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCCBlockFlag() {
        return cCBlockFlag;
    }

    public void setCCBlockFlag(String cCBlockFlag) {
        this.cCBlockFlag = cCBlockFlag;
    }

    public String getGLCode() {
        return gLCode;
    }

    public void setGLCode(String gLCode) {
        this.gLCode = gLCode;
    }

    public String getCommitmentItem() {
        return commitmentItem;
    }

    public void setCommitmentItem(String commitmentItem) {
        this.commitmentItem = commitmentItem;
    }

    public String getFund() {
        return fund;
    }

    public void setFund(String fund) {
        this.fund = fund;
    }

    public String getFundCenter() {
        return fundCenter;
    }

    public void setFundCenter(String fundCenter) {
        this.fundCenter = fundCenter;
    }

    public String getFunctionalArea() {
        return functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
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
        if (!(object instanceof MasterCostCentre)) {
            return false;
        }
        MasterCostCentre other = (MasterCostCentre) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterCostCentre[ sno=" + sno + " ]";
    }
    
}
