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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Confirmations")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Confirmations.findAll", query = "SELECT c FROM Confirmations c"),
    @NamedQuery(name = "Confirmations.findById", query = "SELECT c FROM Confirmations c WHERE c.id = :id"),
    @NamedQuery(name = "Confirmations.findByConfControl", query = "SELECT c FROM Confirmations c WHERE c.confControl = :confControl"),
    @NamedQuery(name = "Confirmations.findByOrderAck", query = "SELECT c FROM Confirmations c WHERE c.orderAck = :orderAck"),
    @NamedQuery(name = "Confirmations.findByConfirmationRequired", query = "SELECT c FROM Confirmations c WHERE c.confirmationRequired = :confirmationRequired"),
    @NamedQuery(name = "Confirmations.findByRejectionInd", query = "SELECT c FROM Confirmations c WHERE c.rejectionInd = :rejectionInd"),
    @NamedQuery(name = "Confirmations.findByLineItemNumber", query = "SELECT c FROM Confirmations c WHERE c.lineItemNumber = :lineItemNumber")})
public class Confirmations implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "ConfControl")
    private String confControl;
    @Size(max = 25)
    @Column(name = "OrderAck")
    private String orderAck;
    @Size(max = 5)
    @Column(name = "ConfirmationRequired")
    private String confirmationRequired;
    @Size(max = 5)
    @Column(name = "RejectionInd")
    private String rejectionInd;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    public Confirmations() {
    }

    public Confirmations(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getConfirmationRequired() {
        return confirmationRequired;
    }

    public void setConfirmationRequired(String confirmationRequired) {
        this.confirmationRequired = confirmationRequired;
    }

    public String getRejectionInd() {
        return rejectionInd;
    }

    public void setRejectionInd(String rejectionInd) {
        this.rejectionInd = rejectionInd;
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

   
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Confirmations)) {
            return false;
        }
        Confirmations other = (Confirmations) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.Confirmations[ id=" + id + " ]";
    }
    
}
