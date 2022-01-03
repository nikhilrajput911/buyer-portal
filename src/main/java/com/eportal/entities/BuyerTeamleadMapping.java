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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "ng_bp_buyer_teamlead_mapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BuyerTeamleadMapping.findAll", query = "SELECT b FROM BuyerTeamleadMapping b"),
    @NamedQuery(name = "BuyerTeamleadMapping.findById", query = "SELECT b FROM BuyerTeamleadMapping b WHERE b.id = :id")})
public class BuyerTeamleadMapping implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @JoinColumn(name = "ng_bp_buyerteamlead_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerteamleadId;
    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;

    public BuyerTeamleadMapping() {
    }

    public BuyerTeamleadMapping(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BuyerDetails getNgBpBuyerteamleadId() {
        return ngBpBuyerteamleadId;
    }

    public void setNgBpBuyerteamleadId(BuyerDetails ngBpBuyerteamleadId) {
        this.ngBpBuyerteamleadId = ngBpBuyerteamleadId;
    }

    public BuyerDetails getNgBpBuyerdetailsId() {
        return ngBpBuyerdetailsId;
    }

    public void setNgBpBuyerdetailsId(BuyerDetails ngBpBuyerdetailsId) {
        this.ngBpBuyerdetailsId = ngBpBuyerdetailsId;
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
        if (!(object instanceof BuyerTeamleadMapping)) {
            return false;
        }
        BuyerTeamleadMapping other = (BuyerTeamleadMapping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.BuyerTeamleadMapping[ id=" + id + " ]";
    }
    
}
