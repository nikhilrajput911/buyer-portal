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
@Table(name = "NG_Master_TNCCMapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterTNCCMapping.findAll", query = "SELECT m FROM MasterTNCCMapping m"),
    @NamedQuery(name = "MasterTNCCMapping.findByInsertionOrderID", query = "SELECT m FROM MasterTNCCMapping m WHERE m.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "MasterTNCCMapping.findByTrackingNo", query = "SELECT m FROM MasterTNCCMapping m WHERE m.trackingNo = :trackingNo"),
    @NamedQuery(name = "MasterTNCCMapping.findByCostCenter", query = "SELECT m FROM MasterTNCCMapping m WHERE m.costCenter = :costCenter"),
    @NamedQuery(name = "MasterTNCCMapping.findByCostCenterDesc", query = "SELECT m FROM MasterTNCCMapping m WHERE m.costCenterDesc = :costCenterDesc"),
    @NamedQuery(name = "MasterTNCCMapping.findByCompanyCode", query = "SELECT m FROM MasterTNCCMapping m WHERE m.companyCode = :companyCode")})
public class MasterTNCCMapping implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "TrackingNo")
    private String trackingNo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "CostCenter")
    private String costCenter;
    @Size(max = 100)
    @Column(name = "CostCenterDesc")
    private String costCenterDesc;
    @Size(max = 5)
    @Column(name = "CompanyCode")
    private String companyCode;

    public MasterTNCCMapping() {
    }

    public MasterTNCCMapping(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public MasterTNCCMapping(Integer insertionOrderID, String trackingNo, String costCenter) {
        this.insertionOrderID = insertionOrderID;
        this.trackingNo = trackingNo;
        this.costCenter = costCenter;
    }

    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getTrackingNo() {
        return trackingNo;
    }

    public void setTrackingNo(String trackingNo) {
        this.trackingNo = trackingNo;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public String getCostCenterDesc() {
        return costCenterDesc;
    }

    public void setCostCenterDesc(String costCenterDesc) {
        this.costCenterDesc = costCenterDesc;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
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
        if (!(object instanceof MasterTNCCMapping)) {
            return false;
        }
        MasterTNCCMapping other = (MasterTNCCMapping) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterTNCCMapping[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
