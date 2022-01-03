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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author girivasu-g
 */@Entity
@Table(name = "NG_BP_RatedParameters")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "RatedParameters.findAll", query = "SELECT n FROM RatedParameters n")})
public class RatedParameters implements Serializable {
     
      @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
      
    @JoinColumn(name = "ng_bp_contractrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private ContractRfqHeader contractRfqHeader;
    
    @JoinColumn(name = "ng_bp_vendorDetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails vendorDetails;

    public VendorDetails getVendorDetails() {
        return vendorDetails;
    }

    public void setVendorDetails(VendorDetails vendorDetails) {
        this.vendorDetails = vendorDetails;
    }
    
     
    @Size(max = 300)
    @Column(name = "TagName")
    private String TagName;
    
    @Size(max = 300)
    @Column(name = "TagID")
    private String TagID;
    
    @Size(max = 300)
    @Column(name = "Weight")
    private String Weight;
    
    @Size(max = 300)
    @Column(name = "Value")
    private String Value;

    @Size(max = 300)
    @Column(name = "score")
    private String score;

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }
    
    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public ContractRfqHeader getContractRfqHeader() {
        return contractRfqHeader;
    }

    public void setContractRfqHeader(ContractRfqHeader contractRfqHeader) {
        this.contractRfqHeader = contractRfqHeader;
    }

    public String getTagName() {
        return TagName;
    }

    public void setTagName(String TagName) {
        this.TagName = TagName;
    }

    public String getTagID() {
        return TagID;
    }

    public void setTagID(String TagID) {
        this.TagID = TagID;
    }

    public String getWeight() {
        return Weight;
    }

    public void setWeight(String Weight) {
        this.Weight = Weight;
    }

    public String getValue() {
        return Value;
    }

    public void setValue(String Value) {
        this.Value = Value;
    }
    
}
