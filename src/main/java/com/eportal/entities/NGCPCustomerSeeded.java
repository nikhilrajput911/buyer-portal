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
import javax.persistence.Lob;
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
@Table(name = "NG_CP_customerseeded")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCPCustomerSeeded.findAll", query = "SELECT n FROM NGCPCustomerSeeded n"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByCid", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.cid = :cid"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByAccountGroupType", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.accountGroupType = :accountGroupType"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByAddressline1", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.addressline1 = :addressline1"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByAddressline2", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.addressline2 = :addressline2"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByAddressline3", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.addressline3 = :addressline3"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByCustomerBlockstatus", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.customerBlockstatus = :customerBlockstatus"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByCustomercode", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.customercode = :customercode"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByCustomername", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.customername = :customername"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByCustomertype", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.customertype = :customertype"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByEmailid", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.emailid = :emailid"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByFirstname", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.firstname = :firstname"),
    @NamedQuery(name = "NGCPCustomerSeeded.findByLastname", query = "SELECT n FROM NGCPCustomerSeeded n WHERE n.lastname = :lastname")})
public class NGCPCustomerSeeded implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "cid")
    private Integer cid;
    @Size(max = 50)
    @Column(name = "AccountGroupType")
    private String accountGroupType;
    @Size(max = 250)
    @Column(name = "addressline1")
    private String addressline1;
    @Size(max = 250)
    @Column(name = "addressline2")
    private String addressline2;
    @Size(max = 250)
    @Column(name = "addressline3")
    private String addressline3;
    @Size(max = 30)
    @Column(name = "customer_blockstatus")
    private String customerBlockstatus;
    @Size(max = 100)
    @Column(name = "customercode")
    private String customercode;
    @Size(max = 250)
    @Column(name = "customername")
    private String customername;
    @Size(max = 20)
    @Column(name = "customertype")
    private String customertype;
    @Size(max = 50)
    @Column(name = "emailid")
    private String emailid;
    @Size(max = 250)
    @Column(name = "firstname")
    private String firstname;
    @Size(max = 250)
    @Column(name = "lastname")
    private String lastname;
    @Lob
    @Column(name = "profilepic")
    private byte[] profilepic;

    public NGCPCustomerSeeded() {
    }

    public NGCPCustomerSeeded(Integer cid) {
        this.cid = cid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getAccountGroupType() {
        return accountGroupType;
    }

    public void setAccountGroupType(String accountGroupType) {
        this.accountGroupType = accountGroupType;
    }

    public String getAddressline1() {
        return addressline1;
    }

    public void setAddressline1(String addressline1) {
        this.addressline1 = addressline1;
    }

    public String getAddressline2() {
        return addressline2;
    }

    public void setAddressline2(String addressline2) {
        this.addressline2 = addressline2;
    }

    public String getAddressline3() {
        return addressline3;
    }

    public void setAddressline3(String addressline3) {
        this.addressline3 = addressline3;
    }

    public String getCustomerBlockstatus() {
        return customerBlockstatus;
    }

    public void setCustomerBlockstatus(String customerBlockstatus) {
        this.customerBlockstatus = customerBlockstatus;
    }

    public String getCustomercode() {
        return customercode;
    }

    public void setCustomercode(String customercode) {
        this.customercode = customercode;
    }

    public String getCustomername() {
        return customername;
    }

    public void setCustomername(String customername) {
        this.customername = customername;
    }

    public String getCustomertype() {
        return customertype;
    }

    public void setCustomertype(String customertype) {
        this.customertype = customertype;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
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

    public byte[] getProfilepic() {
        return profilepic;
    }

    public void setProfilepic(byte[] profilepic) {
        this.profilepic = profilepic;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGCPCustomerSeeded)) {
            return false;
        }
        NGCPCustomerSeeded other = (NGCPCustomerSeeded) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCPCustomerSeeded[ cid=" + cid + " ]";
    }
    
}
