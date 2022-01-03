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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Text")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Text.findAll", query = "SELECT t FROM Text t"),
    @NamedQuery(name = "Text.findById", query = "SELECT t FROM Text t WHERE t.id = :id"),
    @NamedQuery(name = "Text.findByItemTax", query = "SELECT t FROM Text t WHERE t.itemTax = :itemTax"),
    @NamedQuery(name = "Text.findByInfoRecordPOText", query = "SELECT t FROM Text t WHERE t.infoRecordPOText = :infoRecordPOText"),
    @NamedQuery(name = "Text.findByMaterialPOText", query = "SELECT t FROM Text t WHERE t.materialPOText = :materialPOText"),
    @NamedQuery(name = "Text.findByPoNoteToApprover", query = "SELECT t FROM Text t WHERE t.poNoteToApprover = :poNoteToApprover"),
    @NamedQuery(name = "Text.findByDeliveryText", query = "SELECT t FROM Text t WHERE t.deliveryText = :deliveryText"),
    @NamedQuery(name = "Text.findByLineItemNumber", query = "SELECT t FROM Text t WHERE t.lineItemNumber = :lineItemNumber")})
public class Text implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Column(name = "ItemTax", columnDefinition = "ntext")
    private String itemTax;
    @Column(name = "InfoRecordPOText", columnDefinition = "ntext")
    private String infoRecordPOText;
    @Column(name = "MaterialPOText", columnDefinition = "ntext")
    private String materialPOText;
    @Column(name = "PoNoteToApprover", columnDefinition = "ntext")
    private String poNoteToApprover;
    @Column(name = "DeliveryText", columnDefinition = "ntext")
    private String deliveryText;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;    
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Column(name = "PrNoteToApprover", columnDefinition = "ntext")
    private String prNoteToApprover;
    
    public Text() {
    }

    public Text(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getItemTax() {
        return itemTax;
    }

    public void setItemTax(String itemTax) {
        this.itemTax = itemTax;
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

    public String getPoNoteToApprover() {
        return poNoteToApprover;
    }

    public void setPoNoteToApprover(String poNoteToApprover) {
        this.poNoteToApprover = poNoteToApprover;
    }

    public String getDeliveryText() {
        return deliveryText;
    }

    public void setDeliveryText(String deliveryText) {
        this.deliveryText = deliveryText;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getPrNoteToApprover() {
        return prNoteToApprover;
    }

    public void setPrNoteToApprover(String prNoteToApprover) {
        this.prNoteToApprover = prNoteToApprover;
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
        if (!(object instanceof Text)) {
            return false;
        }
        Text other = (Text) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.Text[ id=" + id + " ]";
    }
    
}
