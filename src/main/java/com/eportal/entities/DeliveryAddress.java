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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_DeliveryAddress")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "DeliveryAddress.findAll", query = "SELECT d FROM DeliveryAddress d"),
    @NamedQuery(name = "DeliveryAddress.findById", query = "SELECT d FROM DeliveryAddress d WHERE d.id = :id"),
    @NamedQuery(name = "DeliveryAddress.findByTitle", query = "SELECT d FROM DeliveryAddress d WHERE d.title = :title"),
    @NamedQuery(name = "DeliveryAddress.findByName1", query = "SELECT d FROM DeliveryAddress d WHERE d.name1 = :name1"),
    @NamedQuery(name = "DeliveryAddress.findByName2", query = "SELECT d FROM DeliveryAddress d WHERE d.name2 = :name2"),
    @NamedQuery(name = "DeliveryAddress.findByStreet", query = "SELECT d FROM DeliveryAddress d WHERE d.street = :street"),
    @NamedQuery(name = "DeliveryAddress.findByHouseNumber", query = "SELECT d FROM DeliveryAddress d WHERE d.houseNumber = :houseNumber"),
    @NamedQuery(name = "DeliveryAddress.findByPostalCode", query = "SELECT d FROM DeliveryAddress d WHERE d.postalCode = :postalCode"),
    @NamedQuery(name = "DeliveryAddress.findByCity", query = "SELECT d FROM DeliveryAddress d WHERE d.city = :city"),
    @NamedQuery(name = "DeliveryAddress.findByCountry", query = "SELECT d FROM DeliveryAddress d WHERE d.country = :country"),
    @NamedQuery(name = "DeliveryAddress.findByDescription", query = "SELECT d FROM DeliveryAddress d WHERE d.description = :description"),
    @NamedQuery(name = "DeliveryAddress.findByLineItemNumber", query = "SELECT d FROM DeliveryAddress d WHERE d.lineItemNumber = :lineItemNumber")})
public class DeliveryAddress implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 40)
    @Column(name = "Title")
    private String title;
    @Size(max = 50)
    @Column(name = "Name1")
    private String name1;
    @Size(max = 50)
    @Column(name = "Name2")
    private String name2;
    @Size(max = 70)
    @Column(name = "Street")
    private String street;
    @Size(max = 20)
    @Column(name = "HouseNumber")
    private String houseNumber;
    @Size(max = 20)
    @Column(name = "PostalCode")
    private String postalCode;
    @Size(max = 50)
    @Column(name = "City")
    private String city;
    @Size(max = 8)
    @Column(name = "Country")
    private String country;
    @Size(max = 20)
    @Column(name = "Description")
    private String description;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;

    public DeliveryAddress() {
    }

    public DeliveryAddress(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
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
        if (!(object instanceof DeliveryAddress)) {
            return false;
        }
        DeliveryAddress other = (DeliveryAddress) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.controller.DeliveryAddress[ id=" + id + " ]";
    }
    
}
