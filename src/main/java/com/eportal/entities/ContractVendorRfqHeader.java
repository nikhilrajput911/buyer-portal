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
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "NG_BP_ContractVendorRfqHeader")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractVendorRfqHeader.findAll", query = "SELECT w FROM ContractVendorRfqHeader w")
    ,
    @NamedQuery(name = "ContractVendorRfqHeader.findByCreatedby", query = "SELECT w FROM ContractVendorRfqHeader w WHERE w.createdby = :createdby")
    ,
    @NamedQuery(name = "ContractVendorRfqHeader.findByCreationdate", query = "SELECT w FROM ContractVendorRfqHeader w WHERE w.creationdate = :creationdate")
    ,
    @NamedQuery(name = "ContractVendorRfqHeader.findByUpdatedate", query = "SELECT w FROM ContractVendorRfqHeader w WHERE w.updatedate = :updatedate")
    ,
    @NamedQuery(name = "ContractVendorRfqHeader.findByRfqIdAndVendorId", query = "SELECT w FROM ContractVendorRfqHeader w WHERE w.ngBpContractRfqHeaderRfqid.rfqid = :rfqid and w.ngBpVendordetailsId.id = :vendorid")
    ,
     @NamedQuery(name = "ContractVendorRfqHeader.findByContractRfqHeaderIdAndStatus", query = "SELECT w FROM ContractVendorRfqHeader w WHERE w.ngBpContractRfqHeaderRfqid.rfqid = :rfqid AND w.status IN ('Pending', 'Bid Submitted')")
    ,
    @NamedQuery(name = "ContractVendorRfqHeader.findByUpdatedby", query = "SELECT w FROM ContractVendorRfqHeader w WHERE w.updatedby = :updatedby")})

public class ContractVendorRfqHeader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 30)
    @Column(name = "createdby")
    private String createdby;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;

    @Column(name = "other_comments")
    private String otherComments;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    @Size(max = 150)
    @Column(name = "deliveryterms")
    private String deliveryterms;
    @Size(max = 55)
    @Column(name = "paymentterms")
    private String paymentterms;
    @Size(max = 500)
    @Column(name = "validityofoffer")
    private String validityOfOffer;
    @Size(max = 20)
    @Column(name = "Safety_RatedParameter")
    private String safetyRatedParameter;
    @Size(max = 20)
    @Column(name = "Capability_RatedParameter")
    private String capabilityRatedParameter;
    @Size(max = 20)
    @Column(name = "Reliability_RatedParameter")
    private String reliabilityRatedParameter;
    @Size(max = 20)
    @Column(name = "Price_RatedParameter")
    private String priceRatedParameter;
    @Size(max = 20)
    @Column(name = "Service_Quality_RatedParameter")
    private String serviceQualityRatedParameter;
    @Size(max = 10)
    @Column(name = "Safety_RatedParameter_Score")
    private String safetyRatedParameterScore;
    @Size(max = 10)
    @Column(name = "Capability_RatedParameter_Score")
    private String capabilityRatedParameterScore;
    @Size(max = 10)
    @Column(name = "Reliability_RatedParameter_Score")
    private String reliabilityRatedParameterScore;
    @Size(max = 10)
    @Column(name = "Price_RatedParameter_Score")
    private String priceRatedParameterScore;
    @Size(max = 10)
    @Column(name = "Service_Quality_RatedParameter_Score")
    private String serviceQualityRatedParameterScore;
    @Size(max = 10)
    @Column(name = "Safety_RatedParameter_Weight")
    private String safetyRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "Capability_RatedParameter_Weight")
    private String capabilityRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "Reliability_RatedParameter_Weight")
    private String reliabilityRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "Price_RatedParameter_Weight")
    private String priceRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "Service_Quality_RatedParameter_Weight")
    private String serviceQualityRatedParameterWeight;
    @Size(max = 20)
    @Column(name = "vendor_price_offered_total")
    private String vendorPriceOfferedTotal;
    @Size(max = 20)
    @Column(name = "buyer_price_offered_total")
    private String buyerPriceOfferedTotal;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;
    @JoinColumn(name = "ng_bp_contractrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private ContractRfqHeader ngBpContractRfqHeaderRfqid;

    public ContractVendorRfqHeader() {
    }

    public ContractVendorRfqHeader(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
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

    public String getUpdatedby() {
        return updatedby;
    }

    public void setUpdatedby(String updatedby) {
        this.updatedby = updatedby;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOtherComments() {
        return otherComments;
    }

    public void setOtherComments(String otherComments) {
        this.otherComments = otherComments;
    }
    
    public String getsafetyRatedParameter() {
        return safetyRatedParameter;
    }

    public void setsafetyRatedParameter(String safetyRatedParameter) {
        this.safetyRatedParameter = safetyRatedParameter;
    }
    
    public String getcapabilityRatedParameter() {
        return capabilityRatedParameter;
    }

    public void setcapabilityRatedParameter(String capabilityRatedParameter) {
        this.capabilityRatedParameter = capabilityRatedParameter;
    }
    
    public String getreliabilityRatedParameter() {
        return reliabilityRatedParameter;
    }

    public void setreliabilityRatedParameter(String reliabilityRatedParameter) {
        this.reliabilityRatedParameter = reliabilityRatedParameter;
    }
    
    public String getpriceRatedParameter() {
        return priceRatedParameter;
    }

    public void setpriceRatedParameter(String priceRatedParameter) {
        this.priceRatedParameter = priceRatedParameter;
    }
    
    public String getserviceQualityRatedParameter() {
        return serviceQualityRatedParameter;
    }

    public void setserviceQualityRatedParameter(String serviceQualityRatedParameter) {
        this.serviceQualityRatedParameter = serviceQualityRatedParameter;
    }
    
    public String getsafetyRatedParameterScore() {
        return safetyRatedParameterScore;
    }

    public void setsafetyRatedParameterScore(String safetyRatedParameterScore) {
        this.safetyRatedParameterScore = safetyRatedParameterScore;
    }
    
    
    public String getcapabilityRatedParameterScore() {
        return capabilityRatedParameterScore;
    }
    

    public void setcapabilityRatedParameterScore(String capabilityRatedParameterScore) {
        this.capabilityRatedParameterScore = capabilityRatedParameterScore;
    }
    
    public String getreliabilityRatedParameterScore() {
        return reliabilityRatedParameterScore;
    }

    public void setreliabilityRatedParameterScore(String reliabilityRatedParameterScore) {
        this.reliabilityRatedParameterScore = reliabilityRatedParameterScore;
    }
    
    public String getpriceRatedParameterScore() {
        return priceRatedParameterScore;
    }

    public void setpriceRatedParameterScore(String priceRatedParameterScore) {
        this.priceRatedParameterScore = priceRatedParameterScore;
    }
    
    public String getserviceQualityRatedParameterScore() {
        return serviceQualityRatedParameterScore;
    }

    public void setserviceQualityRatedParameterScore(String serviceQualityRatedParameterScore) {
        this.serviceQualityRatedParameterScore = serviceQualityRatedParameterScore;
    }
    
     public String getsafetyRatedParameterWeight() {
        return safetyRatedParameterWeight;
    }

    public void setsafetyRatedParameterWeight(String safetyRatedParameterWeight) {
        this.safetyRatedParameterWeight = safetyRatedParameterWeight;
    }
    
    public String getcapabilityRatedParameterWeight() {
        return capabilityRatedParameterWeight;
    }

    public void setcapabilityRatedParameterWeight(String capabilityRatedParameterWeight) {
        this.capabilityRatedParameterWeight = capabilityRatedParameterWeight;
    }
    
    public String getreliabilityRatedParameterWeight() {
        return reliabilityRatedParameterWeight;
    }

    public void setreliabilityRatedParameterWeight(String reliabilityRatedParameterWeight) {
        this.reliabilityRatedParameterWeight = reliabilityRatedParameterWeight;
    }
    
    public String getpriceRatedParameterWeight() {
        return priceRatedParameterWeight;
    }

    public void setpriceRatedParameterWeight(String priceRatedParameterWeight) {
        this.priceRatedParameterWeight = priceRatedParameterWeight;
    }
    
    public String getserviceQualityRatedParameterWeight() {
        return serviceQualityRatedParameterWeight;
    }

    public void setserviceQualityRatedParameterWeight(String serviceQualityRatedParameterWeight) {
        this.serviceQualityRatedParameterWeight = serviceQualityRatedParameterWeight;
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
        if (!(object instanceof ContractVendorRfqHeader)) {
            return false;
        }
        ContractVendorRfqHeader other = (ContractVendorRfqHeader) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ContractVendorRfqHeader[ id=" + id + " ]";
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
    }

    public String getDeliveryterms() {
        return deliveryterms;
    }

    public void setDeliveryterms(String deliveryterms) {
        this.deliveryterms = deliveryterms;
    }

    public String getPaymentterms() {
        return paymentterms;
    }

    public void setPaymentterms(String paymentterms) {
        this.paymentterms = paymentterms;
    }

    public String getValidityOfOffer() {
        return validityOfOffer;
    }

    public void setValidityOfOffer(String validityOfOffer) {
        this.validityOfOffer = validityOfOffer;
    }
    
    public String getVendorPriceOfferedTotal() {
        return vendorPriceOfferedTotal;
    }

    public void setVendorPriceOfferedTotal(String vendorPriceOfferedTotal) {
        this.vendorPriceOfferedTotal = vendorPriceOfferedTotal;
    }
    public String getBuyerPriceOfferedTotal() {
        return buyerPriceOfferedTotal;
    }

    public void setBuyerPriceOfferedTotal(String buyerPriceOfferedTotal) {
        this.buyerPriceOfferedTotal = buyerPriceOfferedTotal;
    }

    public ContractRfqHeader getNgBpContractRfqHeaderRfqid() {
        return ngBpContractRfqHeaderRfqid;
    }

    public void setNgBpContractRfqHeaderRfqid(ContractRfqHeader ngBpContractRfqHeaderRfqid) {
        this.ngBpContractRfqHeaderRfqid = ngBpContractRfqHeaderRfqid;
    }

}
