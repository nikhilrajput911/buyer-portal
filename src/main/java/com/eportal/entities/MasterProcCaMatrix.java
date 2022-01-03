/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "NG_Master_PROC_CA_MATRIX")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterProcCaMatrix.findAll", query = "SELECT m FROM MasterProcCaMatrix m"),
    @NamedQuery(name = "MasterProcCaMatrix.findBySno", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterProcCaMatrix.findByProcessType", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterProcCaMatrix.findByReleaseStrategy", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.releaseStrategy = :releaseStrategy"),
    @NamedQuery(name = "MasterProcCaMatrix.findByMaterialGroup", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.materialGroup = :materialGroup"),
    @NamedQuery(name = "MasterProcCaMatrix.findByCounterValues", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.counterValues = :counterValues"),
    @NamedQuery(name = "MasterProcCaMatrix.findByReleaseStrategyValues", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.releaseStrategyValues = :releaseStrategyValues"),
    @NamedQuery(name = "MasterProcCaMatrix.findByPlant", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.plant = :plant"),
    @NamedQuery(name = "MasterProcCaMatrix.findByDocumentTypeField", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.documentTypeField = :documentTypeField"),
    @NamedQuery(name = "MasterProcCaMatrix.findByLimitFrom", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.limitFrom = :limitFrom"),
    @NamedQuery(name = "MasterProcCaMatrix.findByLimitTo", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.limitTo = :limitTo"),
    @NamedQuery(name = "MasterProcCaMatrix.findByReleaseStrategyDesc", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.releaseStrategyDesc = :releaseStrategyDesc"),
    @NamedQuery(name = "MasterProcCaMatrix.findByCreationIndicator", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.creationIndicator = :creationIndicator"),
    @NamedQuery(name = "MasterProcCaMatrix.findByCompanyCode", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.companyCode = :companyCode"),
    @NamedQuery(name = "MasterProcCaMatrix.findByDocCategory", query = "SELECT m FROM MasterProcCaMatrix m WHERE m.docCategory = :docCategory")})
public class MasterProcCaMatrix implements Serializable {
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
    @Column(name = "ReleaseStrategy")
    private String releaseStrategy;
    @Size(max = 2147483647)
    @Column(name = "MaterialGroup")
    private String materialGroup;
    @Size(max = 100)
    @Column(name = "CounterValues")
    private String counterValues;
    @Size(max = 2147483647)
    @Column(name = "ReleaseStrategyValues")
    private String releaseStrategyValues;
    @Size(max = 200)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 200)
    @Column(name = "DocumentTypeField")
    private String documentTypeField;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "LimitFrom")
    private BigDecimal limitFrom;
    @Column(name = "LimitTo")
    private BigDecimal limitTo;
    @Size(max = 200)
    @Column(name = "ReleaseStrategyDesc")
    private String releaseStrategyDesc;
    @Size(max = 50)
    @Column(name = "CreationIndicator")
    private String creationIndicator;
    @Size(max = 50)
    @Column(name = "company_code")
    private String companyCode;
    @Size(max = 10)
    @Column(name = "doc_category")
    private String docCategory;

    public MasterProcCaMatrix() {
    }

    public MasterProcCaMatrix(Integer sno) {
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

    public String getReleaseStrategy() {
        return releaseStrategy;
    }

    public void setReleaseStrategy(String releaseStrategy) {
        this.releaseStrategy = releaseStrategy;
    }

    public String getMaterialGroup() {
        return materialGroup;
    }

    public void setMaterialGroup(String materialGroup) {
        this.materialGroup = materialGroup;
    }

    public String getCounterValues() {
        return counterValues;
    }

    public void setCounterValues(String counterValues) {
        this.counterValues = counterValues;
    }

    public String getReleaseStrategyValues() {
        return releaseStrategyValues;
    }

    public void setReleaseStrategyValues(String releaseStrategyValues) {
        this.releaseStrategyValues = releaseStrategyValues;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getDocumentTypeField() {
        return documentTypeField;
    }

    public void setDocumentTypeField(String documentTypeField) {
        this.documentTypeField = documentTypeField;
    }

    public BigDecimal getLimitFrom() {
        return limitFrom;
    }

    public void setLimitFrom(BigDecimal limitFrom) {
        this.limitFrom = limitFrom;
    }

    public BigDecimal getLimitTo() {
        return limitTo;
    }

    public void setLimitTo(BigDecimal limitTo) {
        this.limitTo = limitTo;
    }

    public String getReleaseStrategyDesc() {
        return releaseStrategyDesc;
    }

    public void setReleaseStrategyDesc(String releaseStrategyDesc) {
        this.releaseStrategyDesc = releaseStrategyDesc;
    }

    public String getCreationIndicator() {
        return creationIndicator;
    }

    public void setCreationIndicator(String creationIndicator) {
        this.creationIndicator = creationIndicator;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getDocCategory() {
        return docCategory;
    }

    public void setDocCategory(String docCategory) {
        this.docCategory = docCategory;
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
        if (!(object instanceof MasterProcCaMatrix)) {
            return false;
        }
        MasterProcCaMatrix other = (MasterProcCaMatrix) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterProcCaMatrix[ sno=" + sno + " ]";
    }
    
}
