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
 * @author admin
 */
@Entity
@Table(name = "NG_BP_SchemaGroup_PurOrg_Mapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SchemaGroupPurOrgMapping.findAll", query = "SELECT s FROM SchemaGroupPurOrgMapping s"),
    @NamedQuery(name = "SchemaGroupPurOrgMapping.findById", query = "SELECT s FROM SchemaGroupPurOrgMapping s WHERE s.id = :id"),
    @NamedQuery(name = "SchemaGroupPurOrgMapping.findByKalsm", query = "SELECT s FROM SchemaGroupPurOrgMapping s WHERE s.kalsm = :kalsm"),
    @NamedQuery(name = "SchemaGroupPurOrgMapping.findByPurchaseOrganization", query = "SELECT s FROM SchemaGroupPurOrgMapping s WHERE s.purchaseOrganization = :purchaseOrganization"),
    @NamedQuery(name = "SchemaGroupPurOrgMapping.findBySchemaGroup", query = "SELECT s FROM SchemaGroupPurOrgMapping s WHERE s.schemaGroup = :schemaGroup")})
public class SchemaGroupPurOrgMapping implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "Kalsm")
    private String kalsm;
    @Size(max = 50)
    @Column(name = "PurchaseOrganization")
    private String purchaseOrganization;
    @Size(max = 10)
    @Column(name = "SchemaGroup")
    private String schemaGroup;

    public SchemaGroupPurOrgMapping() {
    }

    public SchemaGroupPurOrgMapping(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKalsm() {
        return kalsm;
    }

    public void setKalsm(String kalsm) {
        this.kalsm = kalsm;
    }

    public String getPurchaseOrganization() {
        return purchaseOrganization;
    }

    public void setPurchaseOrganization(String purchaseOrganization) {
        this.purchaseOrganization = purchaseOrganization;
    }

    public String getSchemaGroup() {
        return schemaGroup;
    }

    public void setSchemaGroup(String schemaGroup) {
        this.schemaGroup = schemaGroup;
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
        if (!(object instanceof SchemaGroupPurOrgMapping)) {
            return false;
        }
        SchemaGroupPurOrgMapping other = (SchemaGroupPurOrgMapping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SchemaGroupPurOrgMapping[ id=" + id + " ]";
    }
    
}
