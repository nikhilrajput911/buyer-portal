/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "PDBDocumentContent")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PDBDocumentContent.findAll", query = "SELECT p FROM PDBDocumentContent p"),
    @NamedQuery(name = "PDBDocumentContent.findByParentFolderIndex", query = "SELECT p FROM PDBDocumentContent p WHERE p.pDBDocumentContentPK.parentFolderIndex = :parentFolderIndex"),
    @NamedQuery(name = "PDBDocumentContent.findByDocumentIndex", query = "SELECT p FROM PDBDocumentContent p WHERE p.pDBDocumentContentPK.documentIndex = :documentIndex"),
    @NamedQuery(name = "PDBDocumentContent.findByFiledBy", query = "SELECT p FROM PDBDocumentContent p WHERE p.filedBy = :filedBy"),
    @NamedQuery(name = "PDBDocumentContent.findByFiledDatetime", query = "SELECT p FROM PDBDocumentContent p WHERE p.filedDatetime = :filedDatetime"),
    @NamedQuery(name = "PDBDocumentContent.findByDocumentOrderNo", query = "SELECT p FROM PDBDocumentContent p WHERE p.documentOrderNo = :documentOrderNo"),
    @NamedQuery(name = "PDBDocumentContent.findByRefereceFlag", query = "SELECT p FROM PDBDocumentContent p WHERE p.refereceFlag = :refereceFlag"),
    @NamedQuery(name = "PDBDocumentContent.findByDocStatus", query = "SELECT p FROM PDBDocumentContent p WHERE p.docStatus = :docStatus")})
public class PDBDocumentContent implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected PDBDocumentContentPK pDBDocumentContentPK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FiledBy")
    private int filedBy;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FiledDatetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date filedDatetime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DocumentOrderNo")
    private int documentOrderNo;
    @Basic(optional = false)
    @NotNull
    @Column(name = "RefereceFlag")
    private Character refereceFlag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DocStatus")
    private Character docStatus;
    @JoinColumn(name = "DocumentIndex", referencedColumnName = "DocumentIndex", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private PDBDocument pDBDocument;
    @JoinColumn(name = "ParentFolderIndex", referencedColumnName = "FolderIndex", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private PDBFolder pDBFolder;

    public PDBDocumentContent() {
    }

    public PDBDocumentContent(PDBDocumentContentPK pDBDocumentContentPK) {
        this.pDBDocumentContentPK = pDBDocumentContentPK;
    }

    public PDBDocumentContent(PDBDocumentContentPK pDBDocumentContentPK, int filedBy, Date filedDatetime, int documentOrderNo, Character refereceFlag, Character docStatus) {
        this.pDBDocumentContentPK = pDBDocumentContentPK;
        this.filedBy = filedBy;
        this.filedDatetime = filedDatetime;
        this.documentOrderNo = documentOrderNo;
        this.refereceFlag = refereceFlag;
        this.docStatus = docStatus;
    }

    public PDBDocumentContent(int parentFolderIndex, int documentIndex) {
        this.pDBDocumentContentPK = new PDBDocumentContentPK(parentFolderIndex, documentIndex);
    }

    public PDBDocumentContentPK getPDBDocumentContentPK() {
        return pDBDocumentContentPK;
    }

    public void setPDBDocumentContentPK(PDBDocumentContentPK pDBDocumentContentPK) {
        this.pDBDocumentContentPK = pDBDocumentContentPK;
    }

    public int getFiledBy() {
        return filedBy;
    }

    public void setFiledBy(int filedBy) {
        this.filedBy = filedBy;
    }

    public Date getFiledDatetime() {
        return filedDatetime;
    }

    public void setFiledDatetime(Date filedDatetime) {
        this.filedDatetime = filedDatetime;
    }

    public int getDocumentOrderNo() {
        return documentOrderNo;
    }

    public void setDocumentOrderNo(int documentOrderNo) {
        this.documentOrderNo = documentOrderNo;
    }

    public Character getRefereceFlag() {
        return refereceFlag;
    }

    public void setRefereceFlag(Character refereceFlag) {
        this.refereceFlag = refereceFlag;
    }

    public Character getDocStatus() {
        return docStatus;
    }

    public void setDocStatus(Character docStatus) {
        this.docStatus = docStatus;
    }

    public PDBDocument getPDBDocument() {
        return pDBDocument;
    }

    public void setPDBDocument(PDBDocument pDBDocument) {
        this.pDBDocument = pDBDocument;
    }

    public PDBFolder getPDBFolder() {
        return pDBFolder;
    }

    public void setPDBFolder(PDBFolder pDBFolder) {
        this.pDBFolder = pDBFolder;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pDBDocumentContentPK != null ? pDBDocumentContentPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PDBDocumentContent)) {
            return false;
        }
        PDBDocumentContent other = (PDBDocumentContent) object;
        if ((this.pDBDocumentContentPK == null && other.pDBDocumentContentPK != null) || (this.pDBDocumentContentPK != null && !this.pDBDocumentContentPK.equals(other.pDBDocumentContentPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PDBDocumentContent[ pDBDocumentContentPK=" + pDBDocumentContentPK + " ]";
    }
    
}
