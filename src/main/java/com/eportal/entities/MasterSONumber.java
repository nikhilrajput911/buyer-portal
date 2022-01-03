/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_Master_SONumber")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterSONumber.findAll", query = "SELECT m FROM MasterSONumber m"),
    @NamedQuery(name = "MasterSONumber.findBySno", query = "SELECT m FROM MasterSONumber m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterSONumber.findBySalesOrganisation", query = "SELECT m FROM MasterSONumber m WHERE m.salesOrganisation = :salesOrganisation"),
    @NamedQuery(name = "MasterSONumber.findByPONumber", query = "SELECT m FROM MasterSONumber m WHERE m.pONumber = :pONumber"),
    @NamedQuery(name = "MasterSONumber.findBySoldToPt", query = "SELECT m FROM MasterSONumber m WHERE m.soldToPt = :soldToPt"),
    @NamedQuery(name = "MasterSONumber.findByDistChannel", query = "SELECT m FROM MasterSONumber m WHERE m.distChannel = :distChannel"),
    @NamedQuery(name = "MasterSONumber.findByDivison", query = "SELECT m FROM MasterSONumber m WHERE m.divison = :divison"),
    @NamedQuery(name = "MasterSONumber.findBySalesOffice", query = "SELECT m FROM MasterSONumber m WHERE m.salesOffice = :salesOffice"),
    @NamedQuery(name = "MasterSONumber.findBySalesGroup", query = "SELECT m FROM MasterSONumber m WHERE m.salesGroup = :salesGroup"),
    @NamedQuery(name = "MasterSONumber.findByCreatedBy", query = "SELECT m FROM MasterSONumber m WHERE m.createdBy = :createdBy"),
    @NamedQuery(name = "MasterSONumber.findBySalesDocType", query = "SELECT m FROM MasterSONumber m WHERE m.salesDocType = :salesDocType"),
    @NamedQuery(name = "MasterSONumber.findByPODate", query = "SELECT m FROM MasterSONumber m WHERE m.pODate = :pODate"),
    @NamedQuery(name = "MasterSONumber.findByTransGroup", query = "SELECT m FROM MasterSONumber m WHERE m.transGroup = :transGroup"),
    @NamedQuery(name = "MasterSONumber.findBySalesOrderNo", query = "SELECT m FROM MasterSONumber m WHERE m.salesOrderNo = :salesOrderNo"),
    @NamedQuery(name = "MasterSONumber.findByItem", query = "SELECT m FROM MasterSONumber m WHERE m.item = :item")})
public class MasterSONumber implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "SalesOrganisation")
    private String salesOrganisation;
    @Size(max = 25)
    @Column(name = "PONumber")
    private String pONumber;
    @Size(max = 25)
    @Column(name = "SoldToPt")
    private String soldToPt;
    @Size(max = 25)
    @Column(name = "DistChannel")
    private String distChannel;
    @Size(max = 25)
    @Column(name = "Divison")
    private String divison;
    @Size(max = 25)
    @Column(name = "SalesOffice")
    private String salesOffice;
    @Size(max = 25)
    @Column(name = "SalesGroup")
    private String salesGroup;
    @Size(max = 25)
    @Column(name = "CreatedBy")
    private String createdBy;
    @Size(max = 25)
    @Column(name = "SalesDocType")
    private String salesDocType;
    @Column(name = "PODate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date pODate;
    @Size(max = 25)
    @Column(name = "TransGroup")
    private String transGroup;
    @Size(max = 25)
    @Column(name = "SalesOrderNo")
    private String salesOrderNo;
    @Size(max = 10)
    @Column(name = "Item")
    private String item;

    public MasterSONumber() {
    }

    public MasterSONumber(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getSalesOrganisation() {
        return salesOrganisation;
    }

    public void setSalesOrganisation(String salesOrganisation) {
        this.salesOrganisation = salesOrganisation;
    }

    public String getPONumber() {
        return pONumber;
    }

    public void setPONumber(String pONumber) {
        this.pONumber = pONumber;
    }

    public String getSoldToPt() {
        return soldToPt;
    }

    public void setSoldToPt(String soldToPt) {
        this.soldToPt = soldToPt;
    }

    public String getDistChannel() {
        return distChannel;
    }

    public void setDistChannel(String distChannel) {
        this.distChannel = distChannel;
    }

    public String getDivison() {
        return divison;
    }

    public void setDivison(String divison) {
        this.divison = divison;
    }

    public String getSalesOffice() {
        return salesOffice;
    }

    public void setSalesOffice(String salesOffice) {
        this.salesOffice = salesOffice;
    }

    public String getSalesGroup() {
        return salesGroup;
    }

    public void setSalesGroup(String salesGroup) {
        this.salesGroup = salesGroup;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getSalesDocType() {
        return salesDocType;
    }

    public void setSalesDocType(String salesDocType) {
        this.salesDocType = salesDocType;
    }

    public Date getPODate() {
        return pODate;
    }

    public void setPODate(Date pODate) {
        this.pODate = pODate;
    }

    public String getTransGroup() {
        return transGroup;
    }

    public void setTransGroup(String transGroup) {
        this.transGroup = transGroup;
    }

    public String getSalesOrderNo() {
        return salesOrderNo;
    }

    public void setSalesOrderNo(String salesOrderNo) {
        this.salesOrderNo = salesOrderNo;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
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
        if (!(object instanceof MasterSONumber)) {
            return false;
        }
        MasterSONumber other = (MasterSONumber) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterSONumber[ sno=" + sno + " ]";
    }
    
}
