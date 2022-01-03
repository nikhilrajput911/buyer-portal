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
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_buyerdetails")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BuyerDetails.findAll", query = "SELECT b FROM BuyerDetails b"),
    @NamedQuery(name = "BuyerDetails.findById", query = "SELECT b FROM BuyerDetails b WHERE b.id = :id"),
    @NamedQuery(name = "BuyerDetails.findByUsername", query = "SELECT b FROM BuyerDetails b WHERE b.username = :username"),
    @NamedQuery(name = "BuyerDetails.findByPassword", query = "SELECT b FROM BuyerDetails b WHERE b.password = :password"),
    @NamedQuery(name = "BuyerDetails.findByFirstname", query = "SELECT b FROM BuyerDetails b WHERE b.firstname = :firstname"),
    @NamedQuery(name = "BuyerDetails.findByLastname", query = "SELECT b FROM BuyerDetails b WHERE b.lastname = :lastname"),
    @NamedQuery(name = "BuyerDetails.findByEmailid", query = "SELECT b FROM BuyerDetails b WHERE b.emailid = :emailid"),
    @NamedQuery(name = "BuyerDetails.findByTeamlead", query = "SELECT b FROM BuyerDetails b WHERE b.teamlead = :teamlead"),
    @NamedQuery(name = "BuyerDetails.findByBuyerteamlead", query = "SELECT b FROM BuyerDetails b WHERE b.buyerteamlead = :buyerteamlead"),
    @NamedQuery(name = "BuyerDetails.findByBuyeradmin", query = "SELECT b FROM BuyerDetails b WHERE b.buyeradmin = :buyeradmin"),
    @NamedQuery(name = "BuyerDetails.findByNotifybuyer", query = "SELECT b FROM BuyerDetails b WHERE b.notifybuyer = :notifybuyer")})
public class BuyerDetails implements Serializable {
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    @Lob
    @Column(name = "profilepicture")
    private byte[] profilepicture;
    @Size(max = 20)
    @Column(name = "isPasswordUpdated")
    private String isPasswordUpdated;
    @Size(max=20)
    @Column(name = "isPersonalInfoUpdated")
    private String isPersonalInfoUpdated;
    
    @Size(max = 50)
    @Column(name = "role")
    private String role;
    
    @Column(name = "createdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdate;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "username")
    private String username;
    @Size(max = 100)
    @Column(name = "password")
    private String password;
    @Size(max = 100)
    @Column(name = "firstname")
    private String firstname;
    @Size(max = 100)
    @Column(name = "lastname")
    private String lastname;
    @Size(max = 100)
    @Column(name = "emailid")
    private String emailid;
    @Size(max = 10)
    @Column(name = "teamlead")
    private String teamlead;
    @Size(max = 100)
    @Column(name = "buyerteamlead")
    private String buyerteamlead;
    @Size(max = 10)
    @Column(name = "buyeradmin")
    private String buyeradmin;
    @Size(max = 10)
    @Column(name = "notifybuyer")
    private String notifybuyer;
    @Size(max = 50)
    @Column(name = "purchasegroup")
    private String purchaseGroup;
    @Size(max = 50)
    @Column(name = "company_code")
    private String companyCode;
    @JoinColumn(name = "teamlead_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails teamleadId;

    public BuyerDetails() {
    }

    public BuyerDetails(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public String getTeamlead() {
        return teamlead;
    }

    public void setTeamlead(String teamlead) {
        this.teamlead = teamlead;
    }

    public String getBuyerteamlead() {
        return buyerteamlead;
    }

    public void setBuyerteamlead(String buyerteamlead) {
        this.buyerteamlead = buyerteamlead;
    }

    public String getBuyeradmin() {
        return buyeradmin;
    }

    public void setBuyeradmin(String buyeradmin) {
        this.buyeradmin = buyeradmin;
    }

    public String getNotifybuyer() {
        return notifybuyer;
    }

    public void setNotifybuyer(String notifybuyer) {
        this.notifybuyer = notifybuyer;
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
        if (!(object instanceof BuyerDetails)) {
            return false;
        }
        BuyerDetails other = (BuyerDetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.BuyerDetails[ id=" + id + " ]";
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public String getIsPasswordUpdated() {
        return isPasswordUpdated;
    }
    public void setIsPasswordUpdated(String isPasswordUpdated) {
        this.isPasswordUpdated = isPasswordUpdated;
    }
    
    public String getisPersonalInfoUpdated() {
        return isPersonalInfoUpdated;
    }
    public void setisPersonalInfoUpdated(String isPersonalInfoUpdated) {
        this.isPersonalInfoUpdated = isPersonalInfoUpdated;
    }

    public byte[] getProfilepicture() {
        return profilepicture;
    }

    public void setProfilepicture(byte[] profilepicture) {
        this.profilepicture = profilepicture;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getPurchaseGroup() {
        return purchaseGroup;
    }

    public void setPurchaseGroup(String purchaseGroup) {
        this.purchaseGroup = purchaseGroup;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }
    public BuyerDetails getTeamleadId() {
        return teamleadId;
    }

    public void setTeamleadId(BuyerDetails teamleadId) {
        this.teamleadId = teamleadId;
    }
}
