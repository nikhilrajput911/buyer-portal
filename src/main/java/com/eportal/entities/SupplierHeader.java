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
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_wosupplierheader")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SupplierHeader.findAll", query = "SELECT s FROM SupplierHeader s"),
    @NamedQuery(name = "SupplierHeader.findById", query = "SELECT s FROM SupplierHeader s WHERE s.id = :id"),
    @NamedQuery(name = "SupplierHeader.findByCreationdate", query = "SELECT s FROM SupplierHeader s WHERE s.creationdate = :creationdate"),
    @NamedQuery(name = "SupplierHeader.findByCreatedby", query = "SELECT s FROM SupplierHeader s WHERE s.createdby = :createdby"),
    @NamedQuery(name = "SupplierHeader.findByUpdatedby", query = "SELECT s FROM SupplierHeader s WHERE s.updatedby = :updatedby"),
    @NamedQuery(name = "SupplierHeader.findByUpdatedate", query = "SELECT s FROM SupplierHeader s WHERE s.updatedate = :updatedate"),
    @NamedQuery(name = "SupplierHeader.findByAf1", query = "SELECT s FROM SupplierHeader s WHERE s.af1 = :af1"),
    @NamedQuery(name = "SupplierHeader.findByAf2", query = "SELECT s FROM SupplierHeader s WHERE s.af2 = :af2"),
    @NamedQuery(name = "SupplierHeader.findByAf3", query = "SELECT s FROM SupplierHeader s WHERE s.af3 = :af3"),
    @NamedQuery(name = "SupplierHeader.findByAf4", query = "SELECT s FROM SupplierHeader s WHERE s.af4 = :af4"),
    @NamedQuery(name = "SupplierHeader.findByAf5", query = "SELECT s FROM SupplierHeader s WHERE s.af5 = :af5"),
    @NamedQuery(name = "SupplierHeader.findByAf6", query = "SELECT s FROM SupplierHeader s WHERE s.af6 = :af6"),
//    @NamedQuery(name = "SupplierHeader.findBySupplierAndRfqId", query = "SELECT s FROM SupplierHeader s WHERE s.bpaasWorkorderrfqheaderRfqid.rfqid = :rfqid and s.bPaasSupplierSelectionTableid.bPaasSupplierUserTableid.id = :supplierId"),
//    @NamedQuery(name = "SupplierHeader.findByWorkOrderRfqHeaderId", query = "SELECT s FROM SupplierHeader s WHERE s.bpaasWorkorderrfqheaderRfqid.rfqid = :rfqid"),
    @NamedQuery(name = "SupplierHeader.findByAf8", query = "SELECT s FROM SupplierHeader s WHERE s.af8 = :af8")})
public class SupplierHeader implements Serializable {

    @Column(name = "validity_of_offer")
    @Temporal(TemporalType.TIMESTAMP)
    private Date validityOfOffer;
    @Size(max = 20)
    @Column(name = "MOQ_MOV_Details_RatedParameter")
    private String mOQMOVDetailsRatedParameter;
    @Size(max = 20)
    @Column(name = "Delivery_LeadTIme_RatedParameter")
    private String deliveryLeadTImeRatedParameter;
    @Size(max = 20)
    @Column(name = "Payment_Terms_RatedParameter")
    private String paymentTermsRatedParameter;
    @Size(max = 20)
    @Column(name = "Brand_Model_RatedParameter")
    private String brandModelRatedParameter;
    @Size(max = 20)
    @Column(name = "Incoterms_RatedParameter")
    private String incotermsRatedParameter;
    @Size(max = 20)
    @Column(name = "ValidityOffer_RatedParameter")
    private String validityOfferRatedParameter;

    @Column(name = "other_comments")
    private String otherComments;
    @Size(max = 20)
    @Column(name = "rfqvalue")
    private String rfqvalue;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "workOrderSupplierHeaderTableid")
    private Collection<SupplierLineitem> supplierLineitemCollection;
    @Size(max = 150)
    @Column(name = "deliverytermsvendor")
    private String deliverytermsvendor;
    @Size(max = 55)
    @Column(name = "paymenttermsvendor")
    private String paymenttermsvendor;
    @Size(max = 10)
    @Column(name = "accept_payment_terms")
    private String acceptPaymentTerms;
    @Size(max = 10)
    @Column(name = "accept_delevery_terms")
    private String acceptDeleveryTerms;
    @Size(max = 500)
    @Column(name = "minimum_oder_qunatity")
    private String minimumOderQunatity;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;
    @JoinColumn(name = "ng_bp_workorderrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid;
//    @JoinColumn(name = "NG_BP_workorderrfqheader_rfqid", referencedColumnName = "RFQID")
//    @ManyToOne(optional = false)
//    private WorkOrderRfqHeader bpaasWorkorderrfqheaderRfqid;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Lob
    @Size(max = 65535)
    @Column(name = "notetobuyer")
    private String notetobuyer;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Size(max = 30)
    @Column(name = "createdby")
    private String createdby;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Column(name = "AF1")
    private Integer af1;
    @Column(name = "AF2")
    private Integer af2;
    @Column(name = "AF3")
    private Integer af3;
    @Column(name = "AF4")
    private Integer af4;
    @Column(name = "AF5")
    private Integer af5;
    @Column(name = "AF6")
    private Integer af6;
    @Column(name = "AF7")
    private Integer af7;
    @Column(name = "AF8")
    private Integer af8;
    @Size(max = 20)
    @Column(name = "vendor_price_offered_total")
    private String vendorPriceOfferedTotal;
    @Size(max = 20)
    @Column(name = "buyer_price_offered_total")
    private String buyerPriceOfferedTotal;
    @Size(max = 20)
    @Column(name = "buyer_final_financial_price_total")
    private String buyerFinalFinancialPriceTotal;
    @Size(max = 100)
    @Column(name = "buyer_moqmov_details_rated_parameter")
    private String buyerMoqmovDetailsRatedParameter;
    @Size(max = 100)
    @Column(name = "buyer_delivery_leadtime_rated_parameter")
    private String buyerDeliveryLeadtimeRatedParameter;
    @Size(max = 100)
    @Column(name = "buyer_payment_terms_rated_parameter")
    private String buyerPaymentTermsRatedParameter;
    @Size(max = 100)
    @Column(name = "buyer_brand_model_rated_parameter")
    private String buyerBrandModelRatedParameter;
    @Size(max = 100)
    @Column(name = "buyer_incoterms_rated_parameter")
    private String buyerIncotermsRatedParameter;
    @Size(max = 100)
    @Column(name = "buyer_validityoffer_rated_parameter")
    private String buyerValidityofferRatedParameter;
    @Size(max = 10)
    @Column(name = "buyer_moqmov_details_rated_parameter_weight")
    private String buyerMoqmovDetailsRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "buyer_delivery_leadtime_rated_parameter_weight")
    private String buyerDeliveryLeadtimeRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "buyer_payment_terms_rated_parameter_weight")
    private String buyerPaymentTermsRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "buyer_brand_model_rated_parameter_weight")
    private String buyerBrandModelRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "buyer_incoterms_rated_parameter_weight")
    private String buyerIncotermsRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "buyer_validityoffer_rated_parameter_weight")
    private String buyerValidityofferRatedParameterWeight;
    @Size(max = 10)
    @Column(name = "buyer_moqmov_details_rated_parameter_score")
    private String buyerMoqmovDetailsRatedParameterScore;
    @Size(max = 10)
    @Column(name = "buyer_delivery_leadtime_rated_parameter_score")
    private String buyerDeliveryLeadtimeRatedParameterScore;
    @Size(max = 10)
    @Column(name = "buyer_payment_terms_rated_parameter_score")
    private String buyerPaymentTermsRatedParameterScore;
    @Size(max = 10)
    @Column(name = "buyer_brand_model_rated_parameter_score")
    private String buyerBrandModelRatedParameterScore;
    @Size(max = 10)
    @Column(name = "buyer_incoterms_rated_parameter_score")
    private String buyerIncotermsRatedParameterScore;
    @Size(max = 10)
    @Column(name = "buyer_validityoffer_rated_parameter_score")
    private String buyerValidityofferRatedParameterScore;

    public SupplierHeader() {
    }

    public SupplierHeader(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNotetobuyer() {
        return notetobuyer;
    }

    public void setNotetobuyer(String notetobuyer) {
        this.notetobuyer = notetobuyer;
    }

    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public String getUpdatedby() {
        return updatedby;
    }

    public void setUpdatedby(String updatedby) {
        this.updatedby = updatedby;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public Integer getAf1() {
        return af1;
    }

    public void setAf1(Integer af1) {
        this.af1 = af1;
    }

    public Integer getAf2() {
        return af2;
    }

    public void setAf2(Integer af2) {
        this.af2 = af2;
    }

    public Integer getAf3() {
        return af3;
    }

    public void setAf3(Integer af3) {
        this.af3 = af3;
    }

    public Integer getAf4() {
        return af4;
    }

    public void setAf4(Integer af4) {
        this.af4 = af4;
    }

    public Integer getAf5() {
        return af5;
    }

    public void setAf5(Integer af5) {
        this.af5 = af5;
    }

    public Integer getAf6() {
        return af6;
    }

    public void setAf6(Integer af6) {
        this.af6 = af6;
    }

    public Integer getAf7() {
        return af7;
    }

    public void setAf7(Integer af7) {
        this.af7 = af7;
    }

    public Integer getAf8() {
        return af8;
    }

    public void setAf8(Integer af8) {
        this.af8 = af8;
    }
//
//    public SupplierSelection getBPaasSupplierSelectionTableid() {
//        return bPaasSupplierSelectionTableid;
//    }
//
//    public void setBPaasSupplierSelectionTableid(SupplierSelection bPaasSupplierSelectionTableid) {
//        this.bPaasSupplierSelectionTableid = bPaasSupplierSelectionTableid;
//    }

//    @XmlTransient
//    public Collection<SupplierLineitem> getSupplierLineitemCollection() {
//        return supplierLineitemCollection;
//    }
//
//    public void setSupplierLineitemCollection(Collection<SupplierLineitem> supplierLineitemCollection) {
//        this.supplierLineitemCollection = supplierLineitemCollection;
//    }
//
//    @XmlTransient
//    public Collection<SupplierAddattachment> getSupplierAddattachmentCollection() {
//        return supplierAddattachmentCollection;
//    }
//
//    public void setSupplierAddattachmentCollection(Collection<SupplierAddattachment> supplierAddattachmentCollection) {
//        this.supplierAddattachmentCollection = supplierAddattachmentCollection;
//    }
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SupplierHeader)) {
            return false;
        }
        SupplierHeader other = (SupplierHeader) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SupplierHeader[ id=" + id + " ]";
    }
//
//    public WorkOrderRfqHeader getBpaasWorkorderrfqheaderRfqid() {
//        return bpaasWorkorderrfqheaderRfqid;
//    }
//
//    public void setBpaasWorkorderrfqheaderRfqid(WorkOrderRfqHeader bpaasWorkorderrfqheaderRfqid) {
//        this.bpaasWorkorderrfqheaderRfqid = bpaasWorkorderrfqheaderRfqid;
//    }

    public WorkOrderRfqHeader getNgBpWorkorderrfqheaderRfqid() {
        return ngBpWorkorderrfqheaderRfqid;
    }

    public void setNgBpWorkorderrfqheaderRfqid(WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid) {
        this.ngBpWorkorderrfqheaderRfqid = ngBpWorkorderrfqheaderRfqid;
    }

    public String getAcceptPaymentTerms() {
        return acceptPaymentTerms;
    }

    public void setAcceptPaymentTerms(String acceptPaymentTerms) {
        this.acceptPaymentTerms = acceptPaymentTerms;
    }

    public String getAcceptDeleveryTerms() {
        return acceptDeleveryTerms;
    }

    public void setAcceptDeleveryTerms(String acceptDeleveryTerms) {
        this.acceptDeleveryTerms = acceptDeleveryTerms;
    }

    public String getMinimumOderQunatity() {
        return minimumOderQunatity;
    }

    public void setMinimumOderQunatity(String minimumOderQunatity) {
        this.minimumOderQunatity = minimumOderQunatity;
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
    }

    public String getDeliverytermsvendor() {
        return deliverytermsvendor;
    }

    public void setDeliverytermsvendor(String deliverytermsvendor) {
        this.deliverytermsvendor = deliverytermsvendor;
    }

    public String getPaymenttermsvendor() {
        return paymenttermsvendor;
    }

    public void setPaymenttermsvendor(String paymenttermsvendor) {
        this.paymenttermsvendor = paymenttermsvendor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @XmlTransient
    public Collection<SupplierLineitem> getSupplierLineitemCollection() {
        return supplierLineitemCollection;
    }

    public void setSupplierLineitemCollection(Collection<SupplierLineitem> supplierLineitemCollection) {
        this.supplierLineitemCollection = supplierLineitemCollection;
    }

    public String getRfqvalue() {
        return rfqvalue;
    }

    public void setRfqvalue(String rfqvalue) {
        this.rfqvalue = rfqvalue;
    }

    public String getOtherComments() {
        return otherComments;
    }

    public void setOtherComments(String otherComments) {
        this.otherComments = otherComments;
    }

    public String getmOQMOVDetailsRatedParameter() {
        return mOQMOVDetailsRatedParameter;
    }

    public void setmOQMOVDetailsRatedParameter(String mOQMOVDetailsRatedParameter) {
        this.mOQMOVDetailsRatedParameter = mOQMOVDetailsRatedParameter;
    }

    public String getDeliveryLeadTImeRatedParameter() {
        return deliveryLeadTImeRatedParameter;
    }

    public void setDeliveryLeadTImeRatedParameter(String deliveryLeadTImeRatedParameter) {
        this.deliveryLeadTImeRatedParameter = deliveryLeadTImeRatedParameter;
    }

    public String getPaymentTermsRatedParameter() {
        return paymentTermsRatedParameter;
    }

    public void setPaymentTermsRatedParameter(String paymentTermsRatedParameter) {
        this.paymentTermsRatedParameter = paymentTermsRatedParameter;
    }

    public String getBrandModelRatedParameter() {
        return brandModelRatedParameter;
    }

    public void setBrandModelRatedParameter(String brandModelRatedParameter) {
        this.brandModelRatedParameter = brandModelRatedParameter;
    }

    public String getIncotermsRatedParameter() {
        return incotermsRatedParameter;
    }

    public void setIncotermsRatedParameter(String incotermsRatedParameter) {
        this.incotermsRatedParameter = incotermsRatedParameter;
    }

    public String getValidityOfferRatedParameter() {
        return validityOfferRatedParameter;
    }

    public void setValidityOfferRatedParameter(String validityOfferRatedParameter) {
        this.validityOfferRatedParameter = validityOfferRatedParameter;
    }
    public Date getValidityOfOffer() {
        return validityOfOffer;
    }

    public void setValidityOfOffer(Date validityOfOffer) {
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
    
    public String getBuyerMoqmovDetailsRatedParameter() {
        return buyerMoqmovDetailsRatedParameter;
    }

    public void setBuyerMoqmovDetailsRatedParameter(String buyerMoqmovDetailsRatedParameter) {
        this.buyerMoqmovDetailsRatedParameter = buyerMoqmovDetailsRatedParameter;
    }

    public String getBuyerDeliveryLeadtimeRatedParameter() {
        return buyerDeliveryLeadtimeRatedParameter;
    }

    public void setBuyerDeliveryLeadtimeRatedParameter(String buyerDeliveryLeadtimeRatedParameter) {
        this.buyerDeliveryLeadtimeRatedParameter = buyerDeliveryLeadtimeRatedParameter;
    }

    public String getBuyerPaymentTermsRatedParameter() {
        return buyerPaymentTermsRatedParameter;
    }

    public void setBuyerPaymentTermsRatedParameter(String buyerPaymentTermsRatedParameter) {
        this.buyerPaymentTermsRatedParameter = buyerPaymentTermsRatedParameter;
    }

    public String getBuyerBrandModelRatedParameter() {
        return buyerBrandModelRatedParameter;
    }

    public void setBuyerBrandModelRatedParameter(String buyerBrandModelRatedParameter) {
        this.buyerBrandModelRatedParameter = buyerBrandModelRatedParameter;
    }

    public String getBuyerIncotermsRatedParameter() {
        return buyerIncotermsRatedParameter;
    }

    public void setBuyerIncotermsRatedParameter(String buyerIncotermsRatedParameter) {
        this.buyerIncotermsRatedParameter = buyerIncotermsRatedParameter;
    }

    public String getBuyerValidityofferRatedParameter() {
        return buyerValidityofferRatedParameter;
    }

    public void setBuyerValidityofferRatedParameter(String buyerValidityofferRatedParameter) {
        this.buyerValidityofferRatedParameter = buyerValidityofferRatedParameter;
    }
    
    public String getBuyerMoqmovDetailsRatedParameterWeight() {
        return buyerMoqmovDetailsRatedParameterWeight;
    }

    public void setBuyerMoqmovDetailsRatedParameterWeight(String buyerMoqmovDetailsRatedParameterWeight) {
        this.buyerMoqmovDetailsRatedParameterWeight = buyerMoqmovDetailsRatedParameterWeight;
    }

    public String getBuyerDeliveryLeadtimeRatedParameterWeight() {
        return buyerDeliveryLeadtimeRatedParameterWeight;
    }

    public void setBuyerDeliveryLeadtimeRatedParameterWeight(String buyerDeliveryLeadtimeRatedParameterWeight) {
        this.buyerDeliveryLeadtimeRatedParameterWeight = buyerDeliveryLeadtimeRatedParameterWeight;
    }

    public String getBuyerPaymentTermsRatedParameterWeight() {
        return buyerPaymentTermsRatedParameterWeight;
    }

    public void setBuyerPaymentTermsRatedParameterWeight(String buyerPaymentTermsRatedParameterWeight) {
        this.buyerPaymentTermsRatedParameterWeight = buyerPaymentTermsRatedParameterWeight;
    }

    public String getBuyerBrandModelRatedParameterWeight() {
        return buyerBrandModelRatedParameterWeight;
    }

    public void setBuyerBrandModelRatedParameterWeight(String buyerBrandModelRatedParameterWeight) {
        this.buyerBrandModelRatedParameterWeight = buyerBrandModelRatedParameterWeight;
    }

    public String getBuyerIncotermsRatedParameterWeight() {
        return buyerIncotermsRatedParameterWeight;
    }

    public void setBuyerIncotermsRatedParameterWeight(String buyerIncotermsRatedParameterWeight) {
        this.buyerIncotermsRatedParameterWeight = buyerIncotermsRatedParameterWeight;
    }

    public String getBuyerValidityofferRatedParameterWeight() {
        return buyerValidityofferRatedParameterWeight;
    }

    public void setBuyerValidityofferRatedParameterWeight(String buyerValidityofferRatedParameterWeight) {
        this.buyerValidityofferRatedParameterWeight = buyerValidityofferRatedParameterWeight;
    }
    public String getBuyerMoqmovDetailsRatedParameterScore() {
        return buyerMoqmovDetailsRatedParameterScore;
    }

    public void setBuyerMoqmovDetailsRatedParameterScore(String buyerMoqmovDetailsRatedParameterScore) {
        this.buyerMoqmovDetailsRatedParameterScore = buyerMoqmovDetailsRatedParameterScore;
    }

    public String getBuyerDeliveryLeadtimeRatedParameterScore() {
        return buyerDeliveryLeadtimeRatedParameterScore;
    }

    public void setBuyerDeliveryLeadtimeRatedParameterScore(String buyerDeliveryLeadtimeRatedParameterScore) {
        this.buyerDeliveryLeadtimeRatedParameterScore = buyerDeliveryLeadtimeRatedParameterScore;
    }

    public String getBuyerPaymentTermsRatedParameterScore() {
        return buyerPaymentTermsRatedParameterScore;
    }

    public void setBuyerPaymentTermsRatedParameterScore(String buyerPaymentTermsRatedParameterScore) {
        this.buyerPaymentTermsRatedParameterScore = buyerPaymentTermsRatedParameterScore;
    }

    public String getBuyerBrandModelRatedParameterScore() {
        return buyerBrandModelRatedParameterScore;
    }

    public void setBuyerBrandModelRatedParameterScore(String buyerBrandModelRatedParameterScore) {
        this.buyerBrandModelRatedParameterScore = buyerBrandModelRatedParameterScore;
    }

    public String getBuyerIncotermsRatedParameterScore() {
        return buyerIncotermsRatedParameterScore;
    }

    public void setBuyerIncotermsRatedParameterScore(String buyerIncotermsRatedParameterScore) {
        this.buyerIncotermsRatedParameterScore = buyerIncotermsRatedParameterScore;
    }

    public String getBuyerValidityofferRatedParameterScore() {
        return buyerValidityofferRatedParameterScore;
    }

    public void setBuyerValidityofferRatedParameterScore(String buyerValidityofferRatedParameterScore) {
        this.buyerValidityofferRatedParameterScore = buyerValidityofferRatedParameterScore;
    }

    public String getBuyerFinalFinancialPriceTotal() {
        return buyerFinalFinancialPriceTotal;
    }

    public void setBuyerFinalFinancialPriceTotal(String buyerFinalFinancialPriceTotal) {
        this.buyerFinalFinancialPriceTotal = buyerFinalFinancialPriceTotal;
    }
    
}
