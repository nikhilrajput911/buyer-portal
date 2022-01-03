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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "ng_bp_contractrfqheader_vendormapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractRfqHeaderVendorMapping.findAll", query = "SELECT c FROM ContractRfqHeaderVendorMapping c"),
    @NamedQuery(name = "ContractRfqHeaderVendorMapping.findByRfqId", query = "SELECT c FROM ContractRfqHeaderVendorMapping c where c.contractRfqHeaderRFQID.rfqid = :rfqid"),
    @NamedQuery(name = "ContractRfqHeaderVendorMapping.findById", query = "SELECT c FROM ContractRfqHeaderVendorMapping c WHERE c.id = :id")})
public class ContractRfqHeaderVendorMapping implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;
    
//    @JoinColumn(name = "ng_bp_workorderrfqheader_rfqid", referencedColumnName = "RFQID")
//    @ManyToOne
//    private WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid;
    @JoinColumn(name = "NG_BP_ContractRfqHeader_RFQID", referencedColumnName = "RFQID")
    @ManyToOne
    private ContractRfqHeader contractRfqHeaderRFQID;

    @Size(max = 20)
    @Column(name = "status")
    private String status;
    
    @Size(max = 100)
    @Column(name = "RFQDocIndex")
    private String RFQDocIndex;

    public String getRFQDocIndex() {
        return RFQDocIndex;
    }

    public void setRFQDocIndex(String RFQDocIndex) {
        this.RFQDocIndex = RFQDocIndex;
    }
    
    public ContractRfqHeaderVendorMapping() {
    }

    public ContractRfqHeaderVendorMapping(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
    }

//    public WorkOrderRfqHeader getNgBpWorkorderrfqheaderRfqid() {
//        return ngBpWorkorderrfqheaderRfqid;
//    }
//
//    public void setNgBpWorkorderrfqheaderRfqid(WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid) {
//        this.ngBpWorkorderrfqheaderRfqid = ngBpWorkorderrfqheaderRfqid;
//    }
    public ContractRfqHeader getContractRfqHeaderRFQID() {
        return contractRfqHeaderRFQID;
    }

    public void setContractRfqHeaderRFQID(ContractRfqHeader contractRfqHeaderRFQID) {
        this.contractRfqHeaderRFQID = contractRfqHeaderRFQID;
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
        if (!(object instanceof RfqHeaderVendorMapping)) {
            return false;
        }
        RfqHeaderVendorMapping other = (RfqHeaderVendorMapping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.RfqHeaderVendorMapping[ id=" + id + " ]";
    }

}
