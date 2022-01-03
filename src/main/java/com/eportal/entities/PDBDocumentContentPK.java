/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author admin
 */
@Embeddable
public class PDBDocumentContentPK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Column(name = "ParentFolderIndex")
    private int parentFolderIndex;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DocumentIndex")
    private int documentIndex;

    public PDBDocumentContentPK() {
    }

    public PDBDocumentContentPK(int parentFolderIndex, int documentIndex) {
        this.parentFolderIndex = parentFolderIndex;
        this.documentIndex = documentIndex;
    }

    public int getParentFolderIndex() {
        return parentFolderIndex;
    }

    public void setParentFolderIndex(int parentFolderIndex) {
        this.parentFolderIndex = parentFolderIndex;
    }

    public int getDocumentIndex() {
        return documentIndex;
    }

    public void setDocumentIndex(int documentIndex) {
        this.documentIndex = documentIndex;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) parentFolderIndex;
        hash += (int) documentIndex;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PDBDocumentContentPK)) {
            return false;
        }
        PDBDocumentContentPK other = (PDBDocumentContentPK) object;
        if (this.parentFolderIndex != other.parentFolderIndex) {
            return false;
        }
        if (this.documentIndex != other.documentIndex) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PDBDocumentContentPK[ parentFolderIndex=" + parentFolderIndex + ", documentIndex=" + documentIndex + " ]";
    }
    
}
