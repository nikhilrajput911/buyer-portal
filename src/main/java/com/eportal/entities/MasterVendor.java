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
 * @author admin
 */
@Entity
@Table(name = "NG_Master_VendorMaster")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterVendor.findAll", query = "SELECT v FROM MasterVendor v"),
    @NamedQuery(name = "MasterVendor.findBySno", query = "SELECT v FROM MasterVendor v WHERE v.sno = :sno"),
    @NamedQuery(name = "MasterVendor.findByVendorCode", query = "SELECT v FROM MasterVendor v WHERE v.vendorCode = :vendorCode"),
    @NamedQuery(name = "MasterVendor.findByVendorName", query = "SELECT v FROM MasterVendor v WHERE v.vendorName = :vendorName"),
    @NamedQuery(name = "MasterVendor.findByVendorAddress", query = "SELECT v FROM MasterVendor v WHERE v.vendorAddress = :vendorAddress"),
    @NamedQuery(name = "MasterVendor.findByCompanyCode", query = "SELECT v FROM MasterVendor v WHERE v.companyCode = :companyCode"),
    @NamedQuery(name = "MasterVendor.findByPaymentTerm", query = "SELECT v FROM MasterVendor v WHERE v.paymentTerm = :paymentTerm"),
    @NamedQuery(name = "MasterVendor.findByPaymentMethod", query = "SELECT v FROM MasterVendor v WHERE v.paymentMethod = :paymentMethod"),
    @NamedQuery(name = "MasterVendor.findByAccountGroup", query = "SELECT v FROM MasterVendor v WHERE v.accountGroup = :accountGroup"),
    @NamedQuery(name = "MasterVendor.findByComCodeBlk", query = "SELECT v FROM MasterVendor v WHERE v.comCodeBlk = :comCodeBlk"),
    @NamedQuery(name = "MasterVendor.findByPurOrgBlk", query = "SELECT v FROM MasterVendor v WHERE v.purOrgBlk = :purOrgBlk"),
    @NamedQuery(name = "MasterVendor.findByCompCodeSpecBlk", query = "SELECT v FROM MasterVendor v WHERE v.compCodeSpecBlk = :compCodeSpecBlk"),
    @NamedQuery(name = "MasterVendor.findByPurOrgSpecBlk", query = "SELECT v FROM MasterVendor v WHERE v.purOrgSpecBlk = :purOrgSpecBlk"),
    @NamedQuery(name = "MasterVendor.findByBlockFunction", query = "SELECT v FROM MasterVendor v WHERE v.blockFunction = :blockFunction"),
    @NamedQuery(name = "MasterVendor.findByBlockFlag", query = "SELECT v FROM MasterVendor v WHERE v.blockFlag = :blockFlag"),
    @NamedQuery(name = "MasterVendor.findByPurOrg", query = "SELECT v FROM MasterVendor v WHERE v.purOrg = :purOrg"),
    @NamedQuery(name = "MasterVendor.findByText40", query = "SELECT v FROM MasterVendor v WHERE v.text40 = :text40"),
    @NamedQuery(name = "MasterVendor.findByCcind", query = "SELECT v FROM MasterVendor v WHERE v.ccind = :ccind"),
    @NamedQuery(name = "MasterVendor.findByStceg", query = "SELECT v FROM MasterVendor v WHERE v.stceg = :stceg"),
    @NamedQuery(name = "MasterVendor.findByTaxNumber", query = "SELECT v FROM MasterVendor v WHERE v.taxNumber = :taxNumber"),
    @NamedQuery(name = "MasterVendor.findByCompany", query = "SELECT v FROM MasterVendor v WHERE v.company = :company")})
public class MasterVendor implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 50)
    @Column(name = "VendorCode")
    private String vendorCode;
    @Size(max = 2147483647)
    @Column(name = "VendorName")
    private String vendorName;
    @Size(max = 2147483647)
    @Column(name = "VendorAddress")
    private String vendorAddress;
    @Size(max = 50)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 50)
    @Column(name = "PaymentTerm")
    private String paymentTerm;
    @Size(max = 50)
    @Column(name = "PaymentMethod")
    private String paymentMethod;
    @Size(max = 50)
    @Column(name = "AccountGroup")
    private String accountGroup;
    @Size(max = 50)
    @Column(name = "ComCodeBlk")
    private String comCodeBlk;
    @Size(max = 50)
    @Column(name = "PurOrgBlk")
    private String purOrgBlk;
    @Size(max = 50)
    @Column(name = "CompCodeSpecBlk")
    private String compCodeSpecBlk;
    @Size(max = 50)
    @Column(name = "PurOrgSpecBlk")
    private String purOrgSpecBlk;
    @Size(max = 50)
    @Column(name = "BlockFunction")
    private String blockFunction;
    @Size(max = 50)
    @Column(name = "BlockFlag")
    private String blockFlag;
    @Size(max = 50)
    @Column(name = "PurOrg")
    private String purOrg;
    @Size(max = 50)
    @Column(name = "TEXT40")
    private String text40;
    @Size(max = 50)
    @Column(name = "CCIND")
    private String ccind;
    @Size(max = 50)
    @Column(name = "STCEG")
    private String stceg;
    @Size(max = 25)
    @Column(name = "TaxNumber")
    private String taxNumber;
    @Size(max = 500)
    @Column(name = "company")
    private String company;
    @Size(max = 50)
    @Column(name = "Contact_No")
    private String ContactNo;
    @Size(max = 100)
    @Column(name = "City")
    private String City;
    @Size(max = 100)
    @Column(name = "Country")
    private String Country;
    @Size(max = 100)
    @Column(name = "PostalCode")
    private String PostalCode;
    @Size(max = 50)
    @Column(name = "SchemaGroup")
    private String schemaGroup;
    @Size(max = 10)
    @Column(name = "BP_is_mapped")
    private String bpIsMapped;

    @Size(max = 250)
    @Column(name = "Address1")
    private String address1;
    @Size(max = 250)
    @Column(name = "Address2")
    private String address2;
    @Size(max = 250)
    @Column(name = "Address3")
    private String  address3;
    @Size(max = 250)
    @Column(name = "Street")
    private String  street;
    @Size(max = 250)
    @Column(name = "MailId")
    private String  mailId;
    @Size(max = 10)
    @Column(name = "CountryCode")
    private String  CountryCode;
    @Size(max = 15)
    @Column(name = "IncoTerm1")
    private String  incoTerm1;
    @Size(max = 15)
    @Column(name = "IncoTerm2")
    private String  IncoTerm2;
    @Size(max = 10)
    @Column(name = "FaxExt")
    private String  faxExt;
    @Size(max = 15)
    @Column(name = "FaxNo")
    private String  faxNo;
    @Size(max = 15)
    @Column(name = "RegistrationNo")
    private String  registrationNo;
    
    public MasterVendor() {
    }

    public MasterVendor(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getVendorAddress() {
        return vendorAddress;
    }

    public void setVendorAddress(String vendorAddress) {
        this.vendorAddress = vendorAddress;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPaymentTerm() {
        return paymentTerm;
    }

    public void setPaymentTerm(String paymentTerm) {
        this.paymentTerm = paymentTerm;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getAccountGroup() {
        return accountGroup;
    }

    public void setAccountGroup(String accountGroup) {
        this.accountGroup = accountGroup;
    }

    public String getComCodeBlk() {
        return comCodeBlk;
    }

    public void setComCodeBlk(String comCodeBlk) {
        this.comCodeBlk = comCodeBlk;
    }

    public String getPurOrgBlk() {
        return purOrgBlk;
    }

    public void setPurOrgBlk(String purOrgBlk) {
        this.purOrgBlk = purOrgBlk;
    }

    public String getCompCodeSpecBlk() {
        return compCodeSpecBlk;
    }

    public void setCompCodeSpecBlk(String compCodeSpecBlk) {
        this.compCodeSpecBlk = compCodeSpecBlk;
    }

    public String getPurOrgSpecBlk() {
        return purOrgSpecBlk;
    }

    public void setPurOrgSpecBlk(String purOrgSpecBlk) {
        this.purOrgSpecBlk = purOrgSpecBlk;
    }

    public String getBlockFunction() {
        return blockFunction;
    }

    public void setBlockFunction(String blockFunction) {
        this.blockFunction = blockFunction;
    }

    public String getBlockFlag() {
        return blockFlag;
    }

    public void setBlockFlag(String blockFlag) {
        this.blockFlag = blockFlag;
    }

    public String getPurOrg() {
        return purOrg;
    }

    public void setPurOrg(String purOrg) {
        this.purOrg = purOrg;
    }

    public String getText40() {
        return text40;
    }

    public void setText40(String text40) {
        this.text40 = text40;
    }

    public String getCcind() {
        return ccind;
    }

    public void setCcind(String ccind) {
        this.ccind = ccind;
    }

    public String getStceg() {
        return stceg;
    }

    public void setStceg(String stceg) {
        this.stceg = stceg;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
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
        if (!(object instanceof MasterVendor)) {
            return false;
        }
        MasterVendor other = (MasterVendor) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.VendorMaster[ sno=" + sno + " ]";
    }
    public String getContactNo() {
        return ContactNo;
    }

    public void setContactNo(String ContactNo) {
        this.ContactNo = ContactNo;
    }

    public String getCity() {
        return City;
    }

    public void setCity(String City) {
        this.City = City;
    }

    public String getCountry() {
        return Country;
    }

    public void setCountry(String Country) {
        this.Country = Country;
    }

    public String getPostalCode() {
        return PostalCode;
    }

    public void setPostalCode(String PostalCode) {
        this.PostalCode = PostalCode;
    }

    public String getSchemaGroup() {
        return schemaGroup;
    }

    public void setSchemaGroup(String schemaGroup) {
        this.schemaGroup = schemaGroup;
    }
    public String getBpIsMapped() {
        return bpIsMapped;
    }

    public void setBpIsMapped(String bpIsMapped) {
        this.bpIsMapped = bpIsMapped;
    }
    
    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getMailId() {
        return mailId;
    }

    public void setMailId(String mailId) {
        this.mailId = mailId;
    }

    public String getCountryCode() {
        return CountryCode;
    }

    public void setCountryCode(String CountryCode) {
        this.CountryCode = CountryCode;
    }

    public String getIncoTerm1() {
        return incoTerm1;
    }

    public void setIncoTerm1(String incoTerm1) {
        this.incoTerm1 = incoTerm1;
    }

    public String getIncoTerm2() {
        return IncoTerm2;
    }

    public void setIncoTerm2(String IncoTerm2) {
        this.IncoTerm2 = IncoTerm2;
    }

    public String getFaxExt() {
        return faxExt;
    }

    public void setFaxExt(String faxExt) {
        this.faxExt = faxExt;
    }

    public String getFaxNo() {
        return faxNo;
    }

    public void setFaxNo(String faxNo) {
        this.faxNo = faxNo;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }
    
    
}
