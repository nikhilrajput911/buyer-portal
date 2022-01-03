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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_PersonalSettings")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PersonalSettings.findAll", query = "SELECT p FROM PersonalSettings p"),
    @NamedQuery(name = "PersonalSettings.findBySno", query = "SELECT p FROM PersonalSettings p WHERE p.sno = :sno"),
    @NamedQuery(name = "PersonalSettings.findByCompanyCode", query = "SELECT p FROM PersonalSettings p WHERE p.companyCode = :companyCode"),
    @NamedQuery(name = "PersonalSettings.findByPurDocType", query = "SELECT p FROM PersonalSettings p WHERE p.purDocType = :purDocType"),
    @NamedQuery(name = "PersonalSettings.findByPurOrg", query = "SELECT p FROM PersonalSettings p WHERE p.purOrg = :purOrg"),
    @NamedQuery(name = "PersonalSettings.findByPaymentTerms", query = "SELECT p FROM PersonalSettings p WHERE p.paymentTerms = :paymentTerms"),
    @NamedQuery(name = "PersonalSettings.findByCurrency", query = "SELECT p FROM PersonalSettings p WHERE p.currency = :currency"),
    @NamedQuery(name = "PersonalSettings.findByOurRef", query = "SELECT p FROM PersonalSettings p WHERE p.ourRef = :ourRef"),
    @NamedQuery(name = "PersonalSettings.findByIncoTerms1", query = "SELECT p FROM PersonalSettings p WHERE p.incoTerms1 = :incoTerms1"),
    @NamedQuery(name = "PersonalSettings.findByIncoTerms2", query = "SELECT p FROM PersonalSettings p WHERE p.incoTerms2 = :incoTerms2"),
    @NamedQuery(name = "PersonalSettings.findByGrMessage", query = "SELECT p FROM PersonalSettings p WHERE p.grMessage = :grMessage"),
    @NamedQuery(name = "PersonalSettings.findByPlant", query = "SELECT p FROM PersonalSettings p WHERE p.plant = :plant"),
    @NamedQuery(name = "PersonalSettings.findByItemCategory", query = "SELECT p FROM PersonalSettings p WHERE p.itemCategory = :itemCategory"),
    @NamedQuery(name = "PersonalSettings.findByAccAssgnCat", query = "SELECT p FROM PersonalSettings p WHERE p.accAssgnCat = :accAssgnCat"),
    @NamedQuery(name = "PersonalSettings.findByRequisitioner", query = "SELECT p FROM PersonalSettings p WHERE p.requisitioner = :requisitioner"),
    @NamedQuery(name = "PersonalSettings.findByTrackingNumber", query = "SELECT p FROM PersonalSettings p WHERE p.trackingNumber = :trackingNumber"),
    @NamedQuery(name = "PersonalSettings.findByMatlGroup", query = "SELECT p FROM PersonalSettings p WHERE p.matlGroup = :matlGroup"),
    @NamedQuery(name = "PersonalSettings.findByDelDateCat", query = "SELECT p FROM PersonalSettings p WHERE p.delDateCat = :delDateCat"),
    @NamedQuery(name = "PersonalSettings.findByAckReqd", query = "SELECT p FROM PersonalSettings p WHERE p.ackReqd = :ackReqd"),
    @NamedQuery(name = "PersonalSettings.findByPromotion", query = "SELECT p FROM PersonalSettings p WHERE p.promotion = :promotion"),
    @NamedQuery(name = "PersonalSettings.findByIncoTerms1Line", query = "SELECT p FROM PersonalSettings p WHERE p.incoTerms1Line = :incoTerms1Line"),
    @NamedQuery(name = "PersonalSettings.findByIncoTerms2Line", query = "SELECT p FROM PersonalSettings p WHERE p.incoTerms2Line = :incoTerms2Line")})
public class PersonalSettings implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 10)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 50)
    @Column(name = "PurDocType")
    private String purDocType;
    @Size(max = 10)
    @Column(name = "PurOrg")
    private String purOrg;
    @Size(max = 10)
    @Column(name = "PaymentTerms")
    private String paymentTerms;
    @Size(max = 10)
    @Column(name = "Currency")
    private String currency;
    @Size(max = 20)
    @Column(name = "OurRef")
    private String ourRef;
    @Size(max = 5)
    @Column(name = "IncoTerms1")
    private String incoTerms1;
    @Size(max = 30)
    @Column(name = "IncoTerms2")
    private String incoTerms2;
    @Size(max = 5)
    @Column(name = "GrMessage")
    private String grMessage;
    @Size(max = 40)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 3)
    @Column(name = "ItemCategory")
    private String itemCategory;
    @Size(max = 3)
    @Column(name = "AccAssgnCat")
    private String accAssgnCat;
    @Size(max = 20)
    @Column(name = "Requisitioner")
    private String requisitioner;
    @Size(max = 10)
    @Column(name = "TrackingNumber")
    private String trackingNumber;
    @Size(max = 25)
    @Column(name = "MatlGroup")
    private String matlGroup;
    @Size(max = 3)
    @Column(name = "DelDateCat")
    private String delDateCat;
    @Size(max = 20)
    @Column(name = "AckReqd")
    private String ackReqd;
    @Size(max = 4000)
    @Column(name = "Promotion")
    private String promotion;
    @Size(max = 5)
    @Column(name = "IncoTerms1_Line")
    private String incoTerms1Line;
    @Size(max = 30)
    @Column(name = "IncoTerms2_Line")
    private String incoTerms2Line;
    @Size(max = 5)
    @Column(name = "IsAckReq")
    private String isAckReq;
    
    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;

    public PersonalSettings() {
    }

    public PersonalSettings(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPurDocType() {
        return purDocType;
    }

    public void setPurDocType(String purDocType) {
        this.purDocType = purDocType;
    }

    public String getPurOrg() {
        return purOrg;
    }

    public void setPurOrg(String purOrg) {
        this.purOrg = purOrg;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getOurRef() {
        return ourRef;
    }

    public void setOurRef(String ourRef) {
        this.ourRef = ourRef;
    }

    public String getIncoTerms1() {
        return incoTerms1;
    }

    public void setIncoTerms1(String incoTerms1) {
        this.incoTerms1 = incoTerms1;
    }

    public String getIncoTerms2() {
        return incoTerms2;
    }

    public void setIncoTerms2(String incoTerms2) {
        this.incoTerms2 = incoTerms2;
    }

    public String getGrMessage() {
        return grMessage;
    }

    public void setGrMessage(String grMessage) {
        this.grMessage = grMessage;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getAccAssgnCat() {
        return accAssgnCat;
    }

    public void setAccAssgnCat(String accAssgnCat) {
        this.accAssgnCat = accAssgnCat;
    }

    public String getRequisitioner() {
        return requisitioner;
    }

    public void setRequisitioner(String requisitioner) {
        this.requisitioner = requisitioner;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getMatlGroup() {
        return matlGroup;
    }

    public void setMatlGroup(String matlGroup) {
        this.matlGroup = matlGroup;
    }

    public String getDelDateCat() {
        return delDateCat;
    }

    public void setDelDateCat(String delDateCat) {
        this.delDateCat = delDateCat;
    }

    public String getAckReqd() {
        return ackReqd;
    }

    public void setAckReqd(String ackReqd) {
        this.ackReqd = ackReqd;
    }

    public String getPromotion() {
        return promotion;
    }

    public void setPromotion(String promotion) {
        this.promotion = promotion;
    }

    public String getIncoTerms1Line() {
        return incoTerms1Line;
    }

    public void setIncoTerms1Line(String incoTerms1Line) {
        this.incoTerms1Line = incoTerms1Line;
    }

    public String getIncoTerms2Line() {
        return incoTerms2Line;
    }

    public void setIncoTerms2Line(String incoTerms2Line) {
        this.incoTerms2Line = incoTerms2Line;
    }

    public BuyerDetails getNgBpBuyerdetailsId() {
        return ngBpBuyerdetailsId;
    }

    public void setNgBpBuyerdetailsId(BuyerDetails ngBpBuyerdetailsId) {
        this.ngBpBuyerdetailsId = ngBpBuyerdetailsId;
    }

    public String getIsAckReq() {
        return isAckReq;
    }

    public void setIsAckReq(String isAckReq) {
        this.isAckReq = isAckReq;
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
        if (!(object instanceof PersonalSettings)) {
            return false;
        }
        PersonalSettings other = (PersonalSettings) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PersonalSettings[ sno=" + sno + " ]";
    }
    
}
