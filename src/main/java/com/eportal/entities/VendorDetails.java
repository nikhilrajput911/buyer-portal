/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author uday
 */
@Entity
@Table(name = "NG_BP_vendordetails")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "VendorDetails.findAll", query = "SELECT v FROM VendorDetails v"),
    @NamedQuery(name = "VendorDetails.findById", query = "SELECT v FROM VendorDetails v WHERE v.id = :id"),
    @NamedQuery(name = "VendorDetails.findByCode", query = "SELECT v FROM VendorDetails v WHERE v.code = :code"),
    @NamedQuery(name = "VendorDetails.findByFirstname", query = "SELECT v FROM VendorDetails v WHERE v.firstname = :firstname"),
    @NamedQuery(name = "VendorDetails.findByLastname", query = "SELECT v FROM VendorDetails v WHERE v.lastname = :lastname"),
    @NamedQuery(name = "VendorDetails.findByCountry", query = "SELECT v FROM VendorDetails v WHERE v.country = :country"),
    @NamedQuery(name = "VendorDetails.findByAddress", query = "SELECT v FROM VendorDetails v WHERE v.address = :address"),
    @NamedQuery(name = "VendorDetails.findByEmailid", query = "SELECT v FROM VendorDetails v WHERE v.emailid = :emailid"),
    @NamedQuery(name = "VendorDetails.findByContactfirstname", query = "SELECT v FROM VendorDetails v WHERE v.contactfirstname = :contactfirstname"),
    @NamedQuery(name = "VendorDetails.findByContactlastname", query = "SELECT v FROM VendorDetails v WHERE v.contactlastname = :contactlastname"),
    @NamedQuery(name = "VendorDetails.findByCountrycode", query = "SELECT v FROM VendorDetails v WHERE v.countrycode = :countrycode"),
    @NamedQuery(name = "VendorDetails.findByContactnumber", query = "SELECT v FROM VendorDetails v WHERE v.contactnumber = :contactnumber"),
    @NamedQuery(name = "VendorDetails.findByContactemailid", query = "SELECT v FROM VendorDetails v WHERE v.contactemailid = :contactemailid"),
    @NamedQuery(name = "VendorDetails.findByNotifyvendor", query = "SELECT v FROM VendorDetails v WHERE v.notifyvendor = :notifyvendor"),
    @NamedQuery(name = "VendorDetails.findByUsername", query = "SELECT v FROM VendorDetails v WHERE v.username = :username"),
    @NamedQuery(name = "VendorDetails.findByPassword", query = "SELECT v FROM VendorDetails v WHERE v.password = :password"),
    @NamedQuery(name = "VendorDetails.findByCreatedate", query = "SELECT v FROM VendorDetails v WHERE v.createdate = :createdate"),
    @NamedQuery(name = "VendorDetails.findByUpdatedate", query = "SELECT v FROM VendorDetails v WHERE v.updatedate = :updatedate")})
public class VendorDetails implements Serializable {
//    @OneToMany(mappedBy = "ngBpVendordetailsId")
//    private Collection<RfpHeaderVendorMapping> rfpHeaderVendorMappingCollection;
    @Size(max=20)
    @Column(name = "isPersonalInfoUpdated")
    private String isPersonalInfoUpdated;
    @Column(name = "prospect_id_number_seq")
    private Integer prospectIdNumberSeq;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    
    @Size(max = 20)
    @Column(name = "isrequestsent")
    private String isrequestsent;
    
    @Size(max = 20)
    @Column(name = "isVendorRegistered")
    private String isVendorRegistered;
    
    @Size(max = 20)
    @Column(name = "isPasswordUpdated")
    private String isPasswordUpdated;
    @Size(max = 20)
    @Column(name = "type")
    private String type;

    @Size(max = 20)
    @Column(name = "prospectidnumber")
    private String prospectidnumber;
    @Size(max = 150)
    @Column(name = "prospectvendorname")
    private String prospectvendorname;
    @Size(max = 30)
    @Column(name = "contactnumber_hp")
    private String contactnumberHp;

//    @OneToMany(mappedBy = "ngBpVendordetailsId")
//    private Collection<BuyerVendorNotification> buyerVendorNotificationCollection;
    @Size(max = 100)
    @Column(name = "organization")
    private String organization;
    @Size(max = 60)
    @Column(name = "city")
    private String city;
    @Size(max = 15)
    @Column(name = "postalcode")
    private String postalcode;
    @Size(max = 60)
    @Column(name = "spocname")
    private String spocname;
    @Size(max = 120)
    @Column(name = "spocemail")
    private String spocemail;
    @Size(max = 120)
    @Column(name = "vendoremail_auto")
    private String vendoremailAuto;
    @Size(max = 30)
    @Column(name = "contactnumberoff")
    private String contactnumberoff;
    @Size(max = 30)
    @Column(name = "contactnumbermob")
    private String contactnumbermob;
    @Size(max = 30)
    @Column(name = "contactnumberfax")
    private String contactnumberfax;
    @Size(max = 45)
    @Column(name = "payment_terms")
    private String paymentTerms;
    @Size(max = 10)
    @Column(name = "ordercurrency")
    private String ordercurrency;
    @Size(max = 550)
    @Column(name = "nature_of_purchase")
    private String natureOfPurchase;
    @Size(max = 30)
    @Column(name = "company_reg_number")
    private String companyRegNumber;
    @Size(max = 30)
    @Column(name = "gst_reg_number")
    private String gstRegNumber;
    
     @Size(max = 150)
    @Column(name = "company")
    private String company;
//    @OneToMany(mappedBy = "ngBpVendordetailsId")
//    private Collection<BuyerVendorNotification> buyerVendorNotificationCollection;
//    @OneToMany(mappedBy = "ngBpVendordetailsId")
//    private Collection<SupplierHeader> supplierHeaderCollection;
//    @OneToMany(mappedBy = "ngBpVendordetailsId")
//    private Collection<VendorGroupMapping> vendorGroupMappingCollection;
//    @OneToMany(mappedBy = "ngBpVendordetailsId")
//    private Collection<RfqHeaderVendorMapping> rfqHeaderVendorMappingCollection;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "code")
    private String code;
    @Size(max = 100)
    @Column(name = "firstname")
    private String firstname;
    @Size(max = 100)
    @Column(name = "lastname")
    private String lastname;
    @Size(max = 100)
    @Column(name = "country")
    private String country;
    @Size(max = 200)
    @Column(name = "address")
    private String address;
    @Size(max = 50)
    @Column(name = "emailid")
    private String emailid;
    @Size(max = 100)
    @Column(name = "contactfirstname")
    private String contactfirstname;
    @Size(max = 100)
    @Column(name = "contactlastname")
    private String contactlastname;
    @Size(max = 50)
    @Column(name = "countrycode")
    private String countrycode;
    @Size(max = 50)
    @Column(name = "contactnumber")
    private String contactnumber;
    @Size(max = 50)
    @Column(name = "contactemailid")
    private String contactemailid;
    @Size(max = 10)
    @Column(name = "notifyvendor")
    private String notifyvendor;
    @Size(max = 100)
    @Column(name = "username")
    private String username;
    @Size(max = 100)
    @Column(name = "password")
    private String password;
    @Column(name = "createdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdate;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;

    public VendorDetails() {
    }

    public VendorDetails(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public String getContactfirstname() {
        return contactfirstname;
    }

    public void setContactfirstname(String contactfirstname) {
        this.contactfirstname = contactfirstname;
    }

    public String getContactlastname() {
        return contactlastname;
    }

    public void setContactlastname(String contactlastname) {
        this.contactlastname = contactlastname;
    }

    public String getCountrycode() {
        return countrycode;
    }

    public void setCountrycode(String countrycode) {
        this.countrycode = countrycode;
    }

    public String getContactnumber() {
        return contactnumber;
    }

    public void setContactnumber(String contactnumber) {
        this.contactnumber = contactnumber;
    }

    public String getContactemailid() {
        return contactemailid;
    }

    public void setContactemailid(String contactemailid) {
        this.contactemailid = contactemailid;
    }

    public String getNotifyvendor() {
        return notifyvendor;
    }

    public void setNotifyvendor(String notifyvendor) {
        this.notifyvendor = notifyvendor;
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

    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof VendorDetails)) {
            return false;
        }
        VendorDetails other = (VendorDetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.VendorDetails[ id=" + id + " ]";
    }
//
//    @XmlTransient
//    public Collection<RfqHeaderVendorMapping> getRfqHeaderVendorMappingCollection() {
//        return rfqHeaderVendorMappingCollection;
//    }
//
//    public void setRfqHeaderVendorMappingCollection(Collection<RfqHeaderVendorMapping> rfqHeaderVendorMappingCollection) {
//        this.rfqHeaderVendorMappingCollection = rfqHeaderVendorMappingCollection;
//    }

//    @XmlTransient
//    public Collection<VendorGroupMapping> getVendorGroupMappingCollection() {
//        return vendorGroupMappingCollection;
//    }
//
//    public void setVendorGroupMappingCollection(Collection<VendorGroupMapping> vendorGroupMappingCollection) {
//        this.vendorGroupMappingCollection = vendorGroupMappingCollection;
//    }
//
//    @XmlTransient
//    public Collection<SupplierHeader> getSupplierHeaderCollection() {
//        return supplierHeaderCollection;
//    }
//
//    public void setSupplierHeaderCollection(Collection<SupplierHeader> supplierHeaderCollection) {
//        this.supplierHeaderCollection = supplierHeaderCollection;
//    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getSpocname() {
        return spocname;
    }

    public void setSpocname(String spocname) {
        this.spocname = spocname;
    }

    public String getSpocemail() {
        return spocemail;
    }

    public void setSpocemail(String spocemail) {
        this.spocemail = spocemail;
    }

    public String getVendoremailAuto() {
        return vendoremailAuto;
    }

    public void setVendoremailAuto(String vendoremailAuto) {
        this.vendoremailAuto = vendoremailAuto;
    }

    public String getContactnumberoff() {
        return contactnumberoff;
    }

    public void setContactnumberoff(String contactnumberoff) {
        this.contactnumberoff = contactnumberoff;
    }

    public String getContactnumbermob() {
        return contactnumbermob;
    }

    public void setContactnumbermob(String contactnumbermob) {
        this.contactnumbermob = contactnumbermob;
    }

    public String getContactnumberfax() {
        return contactnumberfax;
    }

    public void setContactnumberfax(String contactnumberfax) {
        this.contactnumberfax = contactnumberfax;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public String getOrdercurrency() {
        return ordercurrency;
    }

    public void setOrdercurrency(String ordercurrency) {
        this.ordercurrency = ordercurrency;
    }

    public String getNatureOfPurchase() {
        return natureOfPurchase;
    }

    public void setNatureOfPurchase(String natureOfPurchase) {
        this.natureOfPurchase = natureOfPurchase;
    }

    public String getCompanyRegNumber() {
        return companyRegNumber;
    }

    public void setCompanyRegNumber(String companyRegNumber) {
        this.companyRegNumber = companyRegNumber;
    }

    public String getGstRegNumber() {
        return gstRegNumber;
    }

    public void setGstRegNumber(String gstRegNumber) {
        this.gstRegNumber = gstRegNumber;
    }
//
//    @XmlTransient
//    public Collection<BuyerVendorNotification> getBuyerVendorNotificationCollection() {
//        return buyerVendorNotificationCollection;
//    }
//
//    public void setBuyerVendorNotificationCollection(Collection<BuyerVendorNotification> buyerVendorNotificationCollection) {
//        this.buyerVendorNotificationCollection = buyerVendorNotificationCollection;
//    }
//
//    

//    @XmlTransient
//    public Collection<BuyerVendorNotification> getBuyerVendorNotificationCollection() {
//        return buyerVendorNotificationCollection;
//    }
//
//    public void setBuyerVendorNotificationCollection(Collection<BuyerVendorNotification> buyerVendorNotificationCollection) {
//        this.buyerVendorNotificationCollection = buyerVendorNotificationCollection;
//    }
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
    public String getContactnumberHp() {
        return contactnumberHp;
    }

    public void setContactnumberHp(String contactnumberHp) {
        this.contactnumberHp = contactnumberHp;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
//
//    @XmlTransient
//    public Collection<RfpHeaderVendorMapping> getRfpHeaderVendorMappingCollection() {
//        return rfpHeaderVendorMappingCollection;
//    }
//
//    public void setRfpHeaderVendorMappingCollection(Collection<RfpHeaderVendorMapping> rfpHeaderVendorMappingCollection) {
//        this.rfpHeaderVendorMappingCollection = rfpHeaderVendorMappingCollection;
//    }
    
    public String getIsVendorRegistered(){
        return isVendorRegistered;
    }
    public void setIsVendorRegistered(String isVendorRegistered){
        this.isVendorRegistered = isVendorRegistered;
    }
    
    public String getIsRequestSent(){
        return isrequestsent;
    }
    public void setIsRequestSent(String isrequestsent){
        this.isrequestsent = isrequestsent;
    }
    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status = status;
    }

    public String getIsPasswordUpdated() {
        return isPasswordUpdated;
    }

    public void setIsPasswordUpdated(String isPasswordUpdated) {
        this.isPasswordUpdated = isPasswordUpdated;
    }
    public Integer getProspectIdNumberSeq() {
        return prospectIdNumberSeq;
    }

    public void setProspectIdNumberSeq(Integer prospectIdNumberSeq) {
        this.prospectIdNumberSeq = prospectIdNumberSeq;
    }

    public String getIsPersonalInfoUpdated() {
        return isPersonalInfoUpdated;
    }

    public void setIsPersonalInfoUpdated(String isPersonalInfoUpdated) {
        this.isPersonalInfoUpdated = isPersonalInfoUpdated;
    }

    public String getIsrequestsent() {
        return isrequestsent;
    }

    public void setIsrequestsent(String isrequestsent) {
        this.isrequestsent = isrequestsent;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }
    
}
