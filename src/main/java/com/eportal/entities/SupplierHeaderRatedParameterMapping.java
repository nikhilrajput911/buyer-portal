/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
@Table(name = "NG_BP_SupplierHeader_RatedParameter_Mapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SupplierHeaderRatedParameterMapping.findAll", query = "SELECT s FROM SupplierHeaderRatedParameterMapping s")})
public class SupplierHeaderRatedParameterMapping implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "SerialNumber")
    private Integer serialNumber;
    
    @JoinColumn(name = "WorkOrderSupplierHeaderTable_id", referencedColumnName = "id")
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    private SupplierHeader workOrderSupplierHeaderTableid;
    
    @JoinColumn(name = "ng_bp_workorderrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid;
    
    @Size(max = 20)
    @Column(name = "RatedParameter")
    private String ratedParameter;
    
    @Size(max = 10)
    @Column(name = "RatedParameterScroe")
    private String ratedParameterScore;
    
    @Size(max = 100)
    @Column(name = "Description")
    private String description;
    
    @Size(max = 20)
    @Column(name = "Status")
    private String status;

    public SupplierHeaderRatedParameterMapping() {
    }

    public SupplierHeaderRatedParameterMapping(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SupplierHeader getWorkOrderSupplierHeaderTableid() {
        return workOrderSupplierHeaderTableid;
    }

    public void setWorkOrderSupplierHeaderTableid(SupplierHeader workOrderSupplierHeaderTableid) {
        this.workOrderSupplierHeaderTableid = workOrderSupplierHeaderTableid;
    }

    public String getRatedParameter() {
        return ratedParameter;
    }

    public void setRatedParameter(String ratedParameter) {
        this.ratedParameter = ratedParameter;
    }

    public String getRatedParameterScore() {
        return ratedParameterScore;
    }

    public void setRatedParameterScore(String ratedParameterScore) {
        this.ratedParameterScore = ratedParameterScore;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public WorkOrderRfqHeader getNgBpWorkorderrfqheaderRfqid() {
        return ngBpWorkorderrfqheaderRfqid;
    }

    public void setNgBpWorkorderrfqheaderRfqid(WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid) {
        this.ngBpWorkorderrfqheaderRfqid = ngBpWorkorderrfqheaderRfqid;
    }

    public Integer getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
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
        if (!(object instanceof SupplierLineitem)) {
            return false;
        }
        SupplierHeaderRatedParameterMapping other = (SupplierHeaderRatedParameterMapping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SupplierHeaderRatedParameterMapping[ id=" + id + " ]";
    }
}
