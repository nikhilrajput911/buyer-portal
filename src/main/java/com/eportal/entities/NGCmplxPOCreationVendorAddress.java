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
@Table(name = "NG_Cmplx_POCreation_VendorAddress")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findAll", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByStreet", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.street = :street"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByHouseNumber", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.houseNumber = :houseNumber"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByPostalCode", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.postalCode = :postalCode"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByCity", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.city = :city"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByCountry", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.country = :country"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByTelNo", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.telNo = :telNo"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByTelExt", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.telExt = :telExt"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByFaxNo", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.faxNo = :faxNo"),
    @NamedQuery(name = "NGCmplxPOCreationVendorAddress.findByFaxExt", query = "SELECT n FROM NGCmplxPOCreationVendorAddress n WHERE n.faxExt = :faxExt")})
public class NGCmplxPOCreationVendorAddress implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 60)
    @Column(name = "Street")
    private String street;
    @Size(max = 10)
    @Column(name = "HouseNumber")
    private String houseNumber;
    @Size(max = 10)
    @Column(name = "PostalCode")
    private String postalCode;
    @Size(max = 40)
    @Column(name = "City")
    private String city;
    @Size(max = 3)
    @Column(name = "Country")
    private String country;
    @Size(max = 30)
    @Column(name = "TelNo")
    private String telNo;
    @Size(max = 10)
    @Column(name = "TelExt")
    private String telExt;
    @Size(max = 30)
    @Column(name = "FaxNo")
    private String faxNo;
    @Size(max = 10)
    @Column(name = "FaxExt")
    private String faxExt;

    public NGCmplxPOCreationVendorAddress() {
    }

    public NGCmplxPOCreationVendorAddress(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public Long getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getTelNo() {
        return telNo;
    }

    public void setTelNo(String telNo) {
        this.telNo = telNo;
    }

    public String getTelExt() {
        return telExt;
    }

    public void setTelExt(String telExt) {
        this.telExt = telExt;
    }

    public String getFaxNo() {
        return faxNo;
    }

    public void setFaxNo(String faxNo) {
        this.faxNo = faxNo;
    }

    public String getFaxExt() {
        return faxExt;
    }

    public void setFaxExt(String faxExt) {
        this.faxExt = faxExt;
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
        if (!(object instanceof NGCmplxPOCreationVendorAddress)) {
            return false;
        }
        NGCmplxPOCreationVendorAddress other = (NGCmplxPOCreationVendorAddress) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationVendorAddress[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
