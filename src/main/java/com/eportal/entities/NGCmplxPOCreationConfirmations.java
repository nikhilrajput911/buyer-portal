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
@Table(name = "NG_Cmplx_POCreation_Confirmations")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findAll", query = "SELECT n FROM NGCmplxPOCreationConfirmations n"),
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationConfirmations n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationConfirmations n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findByConfControl", query = "SELECT n FROM NGCmplxPOCreationConfirmations n WHERE n.confControl = :confControl"),
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findByOrderAck", query = "SELECT n FROM NGCmplxPOCreationConfirmations n WHERE n.orderAck = :orderAck"),
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findByConfirmnReq", query = "SELECT n FROM NGCmplxPOCreationConfirmations n WHERE n.confirmnReq = :confirmnReq"),
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findByRejectInd", query = "SELECT n FROM NGCmplxPOCreationConfirmations n WHERE n.rejectInd = :rejectInd"),
    @NamedQuery(name = "NGCmplxPOCreationConfirmations.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationConfirmations n WHERE n.linkID = :linkID")})
public class NGCmplxPOCreationConfirmations implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 4)
    @Column(name = "ConfControl")
    private String confControl;
    @Size(max = 20)
    @Column(name = "OrderAck")
    private String orderAck;
    @Size(max = 5)
    @Column(name = "ConfirmnReq")
    private String confirmnReq;
    @Size(max = 5)
    @Column(name = "RejectInd")
    private String rejectInd;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;

    public NGCmplxPOCreationConfirmations() {
    }

    public NGCmplxPOCreationConfirmations(Long insertionOrderID) {
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

    public String getConfControl() {
        return confControl;
    }

    public void setConfControl(String confControl) {
        this.confControl = confControl;
    }

    public String getOrderAck() {
        return orderAck;
    }

    public void setOrderAck(String orderAck) {
        this.orderAck = orderAck;
    }

    public String getConfirmnReq() {
        return confirmnReq;
    }

    public void setConfirmnReq(String confirmnReq) {
        this.confirmnReq = confirmnReq;
    }

    public String getRejectInd() {
        return rejectInd;
    }

    public void setRejectInd(String rejectInd) {
        this.rejectInd = rejectInd;
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
        if (!(object instanceof NGCmplxPOCreationConfirmations)) {
            return false;
        }
        NGCmplxPOCreationConfirmations other = (NGCmplxPOCreationConfirmations) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationConfirmations[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
