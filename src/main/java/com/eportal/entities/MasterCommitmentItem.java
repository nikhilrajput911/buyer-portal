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
@Table(name = "NG_Master_CommitmentItem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterCommitmentItem.findAll", query = "SELECT m FROM MasterCommitmentItem m"),
    @NamedQuery(name = "MasterCommitmentItem.findBySno", query = "SELECT m FROM MasterCommitmentItem m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterCommitmentItem.findByName", query = "SELECT m FROM MasterCommitmentItem m WHERE m.name = :name"),
    @NamedQuery(name = "MasterCommitmentItem.findByCommitItem", query = "SELECT m FROM MasterCommitmentItem m WHERE m.commitItem = :commitItem"),
    @NamedQuery(name = "MasterCommitmentItem.findByFmArea", query = "SELECT m FROM MasterCommitmentItem m WHERE m.fmArea = :fmArea"),
    @NamedQuery(name = "MasterCommitmentItem.findByCoCode", query = "SELECT m FROM MasterCommitmentItem m WHERE m.coCode = :coCode"),
    @NamedQuery(name = "MasterCommitmentItem.findByBlockIndicator", query = "SELECT m FROM MasterCommitmentItem m WHERE m.blockIndicator = :blockIndicator")})
public class MasterCommitmentItem implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 20)
    @Column(name = "Name")
    private String name;
    @Size(max = 20)
    @Column(name = "CommitItem")
    private String commitItem;
    @Size(max = 20)
    @Column(name = "FmArea")
    private String fmArea;
    @Size(max = 20)
    @Column(name = "CoCode")
    private String coCode;
    @Size(max = 10)
    @Column(name = "BlockIndicator")
    private String blockIndicator;

    public MasterCommitmentItem() {
    }

    public MasterCommitmentItem(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCommitItem() {
        return commitItem;
    }

    public void setCommitItem(String commitItem) {
        this.commitItem = commitItem;
    }

    public String getFmArea() {
        return fmArea;
    }

    public void setFmArea(String fmArea) {
        this.fmArea = fmArea;
    }

    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
    }

    public String getBlockIndicator() {
        return blockIndicator;
    }

    public void setBlockIndicator(String blockIndicator) {
        this.blockIndicator = blockIndicator;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sno != null ? sno.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterCommitmentItem)) {
            return false;
        }
        MasterCommitmentItem other = (MasterCommitmentItem) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterCommitmentItem[ sno=" + sno + " ]";
    }
    
}
