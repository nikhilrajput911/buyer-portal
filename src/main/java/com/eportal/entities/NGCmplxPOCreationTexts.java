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
@Table(name = "NG_Cmplx_POCreation_Texts")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationTexts.findAll", query = "SELECT n FROM NGCmplxPOCreationTexts n"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByItemText", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.itemText = :itemText"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByInfoRecordPOText", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.infoRecordPOText = :infoRecordPOText"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByMaterialPOText", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.materialPOText = :materialPOText"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByPONoteToApprover", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.pONoteToApprover = :pONoteToApprover"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByDeliveryText", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.deliveryText = :deliveryText"),
    @NamedQuery(name = "NGCmplxPOCreationTexts.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationTexts n WHERE n.linkID = :linkID")})
public class NGCmplxPOCreationTexts implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 4000)
    @Column(name = "ItemText")
    private String itemText;
    @Size(max = 4000)
    @Column(name = "InfoRecordPOText")
    private String infoRecordPOText;
    @Size(max = 4000)
    @Column(name = "MaterialPOText")
    private String materialPOText;
    @Size(max = 4000)
    @Column(name = "PONoteToApprover")
    private String pONoteToApprover;
    @Size(max = 4000)
    @Column(name = "DeliveryText")
    private String deliveryText;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;

    public NGCmplxPOCreationTexts() {
    }

    public NGCmplxPOCreationTexts(Long insertionOrderID) {
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

    public String getItemText() {
        return itemText;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    public String getInfoRecordPOText() {
        return infoRecordPOText;
    }

    public void setInfoRecordPOText(String infoRecordPOText) {
        this.infoRecordPOText = infoRecordPOText;
    }

    public String getMaterialPOText() {
        return materialPOText;
    }

    public void setMaterialPOText(String materialPOText) {
        this.materialPOText = materialPOText;
    }

    public String getPONoteToApprover() {
        return pONoteToApprover;
    }

    public void setPONoteToApprover(String pONoteToApprover) {
        this.pONoteToApprover = pONoteToApprover;
    }

    public String getDeliveryText() {
        return deliveryText;
    }

    public void setDeliveryText(String deliveryText) {
        this.deliveryText = deliveryText;
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
        if (!(object instanceof NGCmplxPOCreationTexts)) {
            return false;
        }
        NGCmplxPOCreationTexts other = (NGCmplxPOCreationTexts) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationTexts[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
