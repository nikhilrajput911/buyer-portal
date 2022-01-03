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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_ApproverDetails_Draft")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPOCreationApproverDetailsDraft.findAll", query = "SELECT n FROM CmplxPOCreationApproverDetailsDraft n")
})
public class CmplxPOCreationApproverDetailsDraft implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 30)
    @Column(name = "ApproverName")
    private String approverName;
    @Size(max = 30)
    @Column(name = "ApproverLevel")
    private String approverLevel;
    @ManyToOne(targetEntity = ExtPoCreationDraft.class)
    @JoinColumn(name = "ExtPoCreationPkId", referencedColumnName = "Id")
    private ExtPoCreationDraft extPoCreationDraft;

    public CmplxPOCreationApproverDetailsDraft() {
    }

    public CmplxPOCreationApproverDetailsDraft(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getApproverName() {
        return approverName;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public String getApproverLevel() {
        return approverLevel;
    }

    public void setApproverLevel(String approverLevel) {
        this.approverLevel = approverLevel;
    }

    public ExtPoCreationDraft getExtPoCreationDraft() {
        return extPoCreationDraft;
    }

    public void setExtPoCreationDraft(ExtPoCreationDraft extPoCreationDraft) {
        this.extPoCreationDraft = extPoCreationDraft;
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
        if (!(object instanceof CmplxPOCreationApproverDetailsDraft)) {
            return false;
        }
        CmplxPOCreationApproverDetailsDraft other = (CmplxPOCreationApproverDetailsDraft) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPOCreationApproverDetailsDraft[ id=" + id + " ]";
    }
    
}
