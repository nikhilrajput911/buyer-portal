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
@Table(name = "NG_Cmplx_POCreation_ConditionControl")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationConditionControl.findAll", query = "SELECT n FROM NGCmplxPOCreationConditionControl n"),
    @NamedQuery(name = "NGCmplxPOCreationConditionControl.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationConditionControl n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationConditionControl.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationConditionControl n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationConditionControl.findByPrintPrice", query = "SELECT n FROM NGCmplxPOCreationConditionControl n WHERE n.printPrice = :printPrice"),
    @NamedQuery(name = "NGCmplxPOCreationConditionControl.findByEstimatedPrice", query = "SELECT n FROM NGCmplxPOCreationConditionControl n WHERE n.estimatedPrice = :estimatedPrice"),
    @NamedQuery(name = "NGCmplxPOCreationConditionControl.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationConditionControl n WHERE n.linkID = :linkID")})
public class NGCmplxPOCreationConditionControl implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 5)
    @Column(name = "PrintPrice")
    private String printPrice;
    @Size(max = 5)
    @Column(name = "EstimatedPrice")
    private String estimatedPrice;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;

    public NGCmplxPOCreationConditionControl() {
    }

    public NGCmplxPOCreationConditionControl(Long insertionOrderID) {
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

    public String getPrintPrice() {
        return printPrice;
    }

    public void setPrintPrice(String printPrice) {
        this.printPrice = printPrice;
    }

    public String getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(String estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
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
        if (!(object instanceof NGCmplxPOCreationConditionControl)) {
            return false;
        }
        NGCmplxPOCreationConditionControl other = (NGCmplxPOCreationConditionControl) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationConditionControl[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
