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
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_CustomerData")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemCustomerData.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemCustomerData n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemCustomerData.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemCustomerData n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemCustomerData.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemCustomerData n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemCustomerData.findByProductOrigin", query = "SELECT n FROM NGBPCmplxPOCreationLineItemCustomerData n WHERE n.productOrigin = :productOrigin"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemCustomerData.findBySegment", query = "SELECT n FROM NGBPCmplxPOCreationLineItemCustomerData n WHERE n.segment = :segment"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemCustomerData.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemCustomerData n WHERE n.linkID = :linkID")})
public class NGBPCmplxPOCreationLineItemCustomerData implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 15)
    @Column(name = "ProductOrigin")
    private String productOrigin;
    @Size(max = 30)
    @Column(name = "Segment")
    private String segment;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
	

    public NGBPCmplxPOCreationLineItemCustomerData() {
    }

    public NGBPCmplxPOCreationLineItemCustomerData(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public Long getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProductOrigin() {
        return productOrigin;
    }

    public void setProductOrigin(String productOrigin) {
        this.productOrigin = productOrigin;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGBPCmplxPOCreationLineItemCustomerData)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemCustomerData other = (NGBPCmplxPOCreationLineItemCustomerData) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLineItemCustomerData[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
