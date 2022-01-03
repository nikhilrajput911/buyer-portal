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
@Table(name = "NG_Cmplx_POCreation_DeliveryAddress")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findAll", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByTitle", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.title = :title"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByName1", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.name1 = :name1"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByName2", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.name2 = :name2"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByStreet", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.street = :street"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByHouseNo", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.houseNo = :houseNo"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByPostalCode", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.postalCode = :postalCode"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByCity", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.city = :city"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByCountry", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.country = :country"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByRegion", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.region = :region"),
    @NamedQuery(name = "NGCmplxPOCreationDeliveryAddress.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationDeliveryAddress n WHERE n.linkID = :linkID")})
public class NGCmplxPOCreationDeliveryAddress implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 30)
    @Column(name = "Title")
    private String title;
    @Size(max = 40)
    @Column(name = "Name1")
    private String name1;
    @Size(max = 40)
    @Column(name = "Name2")
    private String name2;
    @Size(max = 100)
    @Column(name = "Street")
    private String street;
    @Size(max = 10)
    @Column(name = "HouseNo")
    private String houseNo;
    @Size(max = 10)
    @Column(name = "PostalCode")
    private String postalCode;
    @Size(max = 40)
    @Column(name = "City")
    private String city;
    @Size(max = 3)
    @Column(name = "Country")
    private String country;
    @Size(max = 3)
    @Column(name = "Region")
    private String region;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;

    public NGCmplxPOCreationDeliveryAddress() {
    }

    public NGCmplxPOCreationDeliveryAddress(Long insertionOrderID) {
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
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
        if (!(object instanceof NGCmplxPOCreationDeliveryAddress)) {
            return false;
        }
        NGCmplxPOCreationDeliveryAddress other = (NGCmplxPOCreationDeliveryAddress) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationDeliveryAddress[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
