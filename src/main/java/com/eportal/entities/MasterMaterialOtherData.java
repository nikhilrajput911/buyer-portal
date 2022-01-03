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
//@Table(name = "NG_Master_Material_OtherData")
@Table(name = "NG_Master_Material_MAIN_OtherData")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterMaterialOtherData.findAll", query = "SELECT m FROM MasterMaterialOtherData m"),
    @NamedQuery(name = "MasterMaterialOtherData.findBySno", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterMaterialOtherData.findByMaterialCode", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.materialCode = :materialCode"),
    @NamedQuery(name = "MasterMaterialOtherData.findByCompanyCode", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.companyCode = :companyCode"),
    @NamedQuery(name = "MasterMaterialOtherData.findByPlantCode", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.plantCode = :plantCode"),
    @NamedQuery(name = "MasterMaterialOtherData.findByGRProcessingTime", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.gRProcessingTime = :gRProcessingTime"),
    @NamedQuery(name = "MasterMaterialOtherData.findByQuotaArrangementUsage", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.quotaArrangementUsage = :quotaArrangementUsage"),
    @NamedQuery(name = "MasterMaterialOtherData.findByMFRPartNumber", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.mFRPartNumber = :mFRPartNumber"),
    @NamedQuery(name = "MasterMaterialOtherData.findByMFRPartProfile", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.mFRPartProfile = :mFRPartProfile"),
    @NamedQuery(name = "MasterMaterialOtherData.findByJITDeliverySchedules", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.jITDeliverySchedules = :jITDeliverySchedules"),
    @NamedQuery(name = "MasterMaterialOtherData.findByManufacturer", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.manufacturer = :manufacturer"),
    @NamedQuery(name = "MasterMaterialOtherData.findByPostToInspecStock", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.postToInspecStock = :postToInspecStock"),
    @NamedQuery(name = "MasterMaterialOtherData.findByCriticalPart", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.criticalPart = :criticalPart"),
    @NamedQuery(name = "MasterMaterialOtherData.findBySourceList", query = "SELECT m FROM MasterMaterialOtherData m WHERE m.sourceList = :sourceList")})
public class MasterMaterialOtherData implements Serializable {
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
    @Column(name = "GRProcessingTime")
    private String gRProcessingTime;
    @Size(max = 100)
    @Column(name = "QuotaArrangementUsage")
    private String quotaArrangementUsage;
    @Size(max = 100)
    @Column(name = "MFRPartNumber")
    private String mFRPartNumber;
    @Size(max = 100)
    @Column(name = "MFRPartProfile")
    private String mFRPartProfile;
    @Size(max = 100)
    @Column(name = "JITDeliverySchedules")
    private String jITDeliverySchedules;
    @Size(max = 100)
    @Column(name = "Manufacturer")
    private String manufacturer;
    @Size(max = 100)
    @Column(name = "PostToInspecStock")
    private String postToInspecStock;
    @Size(max = 100)
    @Column(name = "CriticalPart")
    private String criticalPart;
    @Size(max = 100)
    @Column(name = "SourceList")
    private String sourceList;

    public MasterMaterialOtherData() {
    }

    public MasterMaterialOtherData(Integer sno) {
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

    public String getGRProcessingTime() {
        return gRProcessingTime;
    }

    public void setGRProcessingTime(String gRProcessingTime) {
        this.gRProcessingTime = gRProcessingTime;
    }

    public String getQuotaArrangementUsage() {
        return quotaArrangementUsage;
    }

    public void setQuotaArrangementUsage(String quotaArrangementUsage) {
        this.quotaArrangementUsage = quotaArrangementUsage;
    }

    public String getMFRPartNumber() {
        return mFRPartNumber;
    }

    public void setMFRPartNumber(String mFRPartNumber) {
        this.mFRPartNumber = mFRPartNumber;
    }

    public String getMFRPartProfile() {
        return mFRPartProfile;
    }

    public void setMFRPartProfile(String mFRPartProfile) {
        this.mFRPartProfile = mFRPartProfile;
    }

    public String getJITDeliverySchedules() {
        return jITDeliverySchedules;
    }

    public void setJITDeliverySchedules(String jITDeliverySchedules) {
        this.jITDeliverySchedules = jITDeliverySchedules;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getPostToInspecStock() {
        return postToInspecStock;
    }

    public void setPostToInspecStock(String postToInspecStock) {
        this.postToInspecStock = postToInspecStock;
    }

    public String getCriticalPart() {
        return criticalPart;
    }

    public void setCriticalPart(String criticalPart) {
        this.criticalPart = criticalPart;
    }

    public String getSourceList() {
        return sourceList;
    }

    public void setSourceList(String sourceList) {
        this.sourceList = sourceList;
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
        if (!(object instanceof MasterMaterialOtherData)) {
            return false;
        }
        MasterMaterialOtherData other = (MasterMaterialOtherData) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterMaterialOtherData[ sno=" + sno + " ]";
    }
    
}
