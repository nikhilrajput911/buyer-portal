/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_Texts")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findAll", query = "SELECT n FROM NGBPCmplxPOCreationTexts n"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByItemText", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.itemText = :itemText"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByInfoRecordPOText", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.infoRecordPOText = :infoRecordPOText"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByMaterialPOText", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.materialPOText = :materialPOText"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByPONoteToApprover", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.pONoteToApprover = :pONoteToApprover"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByDeliveryText", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.deliveryText = :deliveryText"),
    @NamedQuery(name = "NGBPCmplxPOCreationTexts.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationTexts n WHERE n.linkID = :linkID")})
public class NGBPCmplxPOCreationTexts implements Serializable {

    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Column(name = "ItemText", columnDefinition = "ntext")
    private String itemText;
    @Column(name = "InfoRecordPOText", columnDefinition = "ntext")
    private String infoRecordPOText;
    @Column(name = "MaterialPOText", columnDefinition = "ntext")
    private String materialPOText;
    @Column(name = "PONoteToApprover", columnDefinition = "ntext")
    private String pONoteToApprover;
    @Column(name = "DeliveryText", columnDefinition = "ntext")
    private String deliveryText;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Column(name = "PRNoteToApproval", columnDefinition = "ntext")
    private String pRNoteToApproval;
	

    @OneToOne(targetEntity = NGBPCmplxPOCreationLineItemPO.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "LineItem_PO_Id", referencedColumnName = "InsertionOrderID")
    private NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getnGBPCmplxPOCreationLineItemPO() {
        return nGBPCmplxPOCreationLineItemPO;
    }

    public void setnGBPCmplxPOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO) {
        this.nGBPCmplxPOCreationLineItemPO = nGBPCmplxPOCreationLineItemPO;
    }

    public NGBPCmplxPOCreationTexts() {
    }

    public NGBPCmplxPOCreationTexts(Long insertionOrderID) {
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

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getpRNoteToApproval() {
        return pRNoteToApproval;
    }

    public void setpRNoteToApproval(String pRNoteToApproval) {
        this.pRNoteToApproval = pRNoteToApproval;
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
        if (!(object instanceof NGBPCmplxPOCreationTexts)) {
            return false;
        }
        NGBPCmplxPOCreationTexts other = (NGBPCmplxPOCreationTexts) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationTexts[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
