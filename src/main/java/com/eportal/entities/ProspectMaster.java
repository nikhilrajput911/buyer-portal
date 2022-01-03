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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
 * @author admin
 */
@Entity
@Table(name = "NG_BP_prospect_master")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ProspectMaster.findAll", query = "SELECT p FROM ProspectMaster p"),
    @NamedQuery(name = "ProspectMaster.findById", query = "SELECT p FROM ProspectMaster p WHERE p.id = :id"),
    @NamedQuery(name = "ProspectMaster.findByProspectidnumber", query = "SELECT p FROM ProspectMaster p WHERE p.prospectidnumber = :prospectidnumber"),
    @NamedQuery(name = "ProspectMaster.findByProspectvendorname", query = "SELECT p FROM ProspectMaster p WHERE p.prospectvendorname = :prospectvendorname"),
    @NamedQuery(name = "ProspectMaster.findByCountry", query = "SELECT p FROM ProspectMaster p WHERE p.country = :country"),
    @NamedQuery(name = "ProspectMaster.findByAddress", query = "SELECT p FROM ProspectMaster p WHERE p.address = :address"),
    @NamedQuery(name = "ProspectMaster.findByContactfirstname", query = "SELECT p FROM ProspectMaster p WHERE p.contactfirstname = :contactfirstname"),
    @NamedQuery(name = "ProspectMaster.findByCountrycode", query = "SELECT p FROM ProspectMaster p WHERE p.countrycode = :countrycode"),
    @NamedQuery(name = "ProspectMaster.findByContactnumberOff", query = "SELECT p FROM ProspectMaster p WHERE p.contactnumberOff = :contactnumberOff"),
    @NamedQuery(name = "ProspectMaster.findByContactnumberHp", query = "SELECT p FROM ProspectMaster p WHERE p.contactnumberHp = :contactnumberHp"),
    @NamedQuery(name = "ProspectMaster.findByEmailaddress", query = "SELECT p FROM ProspectMaster p WHERE p.emailaddress = :emailaddress"),
    @NamedQuery(name = "ProspectMaster.findByFaxnumber", query = "SELECT p FROM ProspectMaster p WHERE p.faxnumber = :faxnumber")})
public class ProspectMaster implements Serializable {
    @Column(name = "tempid")
    private Integer tempid;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 20)
    @Column(name = "prospectidnumber")
    private String prospectidnumber;
    @Size(max = 150)
    @Column(name = "prospectvendorname")
    private String prospectvendorname;
    @Size(max = 20)
    @Column(name = "country")
    private String country;
    @Size(max = 500)
    @Column(name = "address")
    private String address;
    @Size(max = 150)
    @Column(name = "contactfirstname")
    private String contactfirstname;
    @Size(max = 10)
    @Column(name = "countrycode")
    private String countrycode;
    @Size(max = 30)
    @Column(name = "contactnumber_off")
    private String contactnumberOff;
    @Size(max = 30)
    @Column(name = "contactnumber_hp")
    private String contactnumberHp;
    @Size(max = 150)
    @Column(name = "emailaddress")
    private String emailaddress;
    @Size(max = 30)
    @Column(name = "faxnumber")
    private String faxnumber;

    public ProspectMaster() {
    }

    public ProspectMaster(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProspectidnumber() {
        return prospectidnumber;
    }

    public void setProspectidnumber(String prospectidnumber) {
        this.prospectidnumber = prospectidnumber;
    }

    public String getProspectvendorname() {
        return prospectvendorname;
    }

    public void setProspectvendorname(String prospectvendorname) {
        this.prospectvendorname = prospectvendorname;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactfirstname() {
        return contactfirstname;
    }

    public void setContactfirstname(String contactfirstname) {
        this.contactfirstname = contactfirstname;
    }

    public String getCountrycode() {
        return countrycode;
    }

    public void setCountrycode(String countrycode) {
        this.countrycode = countrycode;
    }

    public String getContactnumberOff() {
        return contactnumberOff;
    }

    public void setContactnumberOff(String contactnumberOff) {
        this.contactnumberOff = contactnumberOff;
    }

    public String getContactnumberHp() {
        return contactnumberHp;
    }

    public void setContactnumberHp(String contactnumberHp) {
        this.contactnumberHp = contactnumberHp;
    }

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public String getFaxnumber() {
        return faxnumber;
    }

    public void setFaxnumber(String faxnumber) {
        this.faxnumber = faxnumber;
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
        if (!(object instanceof ProspectMaster)) {
            return false;
        }
        ProspectMaster other = (ProspectMaster) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ProspectMaster[ id=" + id + " ]";
    }

    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public Integer getTempid() {
        return tempid;
    }

    public void setTempid(Integer tempid) {
        this.tempid = tempid;
    }
    
}
