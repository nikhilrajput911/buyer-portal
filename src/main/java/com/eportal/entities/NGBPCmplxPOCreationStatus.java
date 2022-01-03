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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_Status")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationStatus.findAll", query = "SELECT n FROM NGBPCmplxPOCreationStatus n"),
    @NamedQuery(name = "NGBPCmplxPOCreationStatus.findById", query = "SELECT n FROM NGBPCmplxPOCreationStatus n WHERE n.id = :id"),
    @NamedQuery(name = "NGBPCmplxPOCreationStatus.findByOrdered", query = "SELECT n FROM NGBPCmplxPOCreationStatus n WHERE n.ordered = :ordered"),
    @NamedQuery(name = "NGBPCmplxPOCreationStatus.findByDelivered", query = "SELECT n FROM NGBPCmplxPOCreationStatus n WHERE n.delivered = :delivered"),
    @NamedQuery(name = "NGBPCmplxPOCreationStatus.findByStilltodeliv", query = "SELECT n FROM NGBPCmplxPOCreationStatus n WHERE n.stilltodeliv = :stilltodeliv"),
    @NamedQuery(name = "NGBPCmplxPOCreationStatus.findByInvoiced", query = "SELECT n FROM NGBPCmplxPOCreationStatus n WHERE n.invoiced = :invoiced"),
    @NamedQuery(name = "NGBPCmplxPOCreationStatus.findByDownpaymts", query = "SELECT n FROM NGBPCmplxPOCreationStatus n WHERE n.downpaymts = :downpaymts")})
public class NGBPCmplxPOCreationStatus implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "Ordered")
    private String ordered;
    @Size(max = 100)
    @Column(name = "Delivered")
    private String delivered;
    @Size(max = 100)
    @Column(name = "Still_to_deliv")
    private String stilltodeliv;
    @Size(max = 100)
    @Column(name = "Invoiced")
    private String invoiced;
    @Size(max = 100)
    @Column(name = "Down_paymts")
    private String downpaymts;
    
    @OneToOne(targetEntity = NGBPExtPOCreation.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "POCreation_Id", referencedColumnName = "Id")
    private NGBPExtPOCreation nGBPExtPOCreation;

   public NGBPExtPOCreation getnGBPExtPOCreation() {
        return nGBPExtPOCreation;
    }

    public void setnGBPExtPOCreation(NGBPExtPOCreation nGBPExtPOCreation) {
        this.nGBPExtPOCreation = nGBPExtPOCreation;
    }

    public NGBPCmplxPOCreationStatus() {
    }

    public NGBPCmplxPOCreationStatus(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrdered() {
        return ordered;
    }

    public void setOrdered(String ordered) {
        this.ordered = ordered;
    }

    public String getDelivered() {
        return delivered;
    }

    public void setDelivered(String delivered) {
        this.delivered = delivered;
    }

    public String getStilltodeliv() {
        return stilltodeliv;
    }

    public void setStilltodeliv(String stilltodeliv) {
        this.stilltodeliv = stilltodeliv;
    }

    public String getInvoiced() {
        return invoiced;
    }

    public void setInvoiced(String invoiced) {
        this.invoiced = invoiced;
    }

    public String getDownpaymts() {
        return downpaymts;
    }

    public void setDownpaymts(String downpaymts) {
        this.downpaymts = downpaymts;
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
        if (!(object instanceof NGBPCmplxPOCreationStatus)) {
            return false;
        }
        NGBPCmplxPOCreationStatus other = (NGBPCmplxPOCreationStatus) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationStatus[ id=" + id + " ]";
    }
    
}
