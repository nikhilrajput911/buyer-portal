/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "PDBDocument")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PDBDocument.findAll", query = "SELECT p FROM PDBDocument p"),
    @NamedQuery(name = "PDBDocument.findByDocumentIndex", query = "SELECT p FROM PDBDocument p WHERE p.documentIndex = :documentIndex"),
    @NamedQuery(name = "PDBDocument.findByVersionNumber", query = "SELECT p FROM PDBDocument p WHERE p.versionNumber = :versionNumber"),
    @NamedQuery(name = "PDBDocument.findByVersionComment", query = "SELECT p FROM PDBDocument p WHERE p.versionComment = :versionComment"),
    @NamedQuery(name = "PDBDocument.findByName", query = "SELECT p FROM PDBDocument p WHERE p.name = :name"),
    @NamedQuery(name = "PDBDocument.findByOwner", query = "SELECT p FROM PDBDocument p WHERE p.owner = :owner"),
    @NamedQuery(name = "PDBDocument.findByCreatedDateTime", query = "SELECT p FROM PDBDocument p WHERE p.createdDateTime = :createdDateTime"),
    @NamedQuery(name = "PDBDocument.findByRevisedDateTime", query = "SELECT p FROM PDBDocument p WHERE p.revisedDateTime = :revisedDateTime"),
    @NamedQuery(name = "PDBDocument.findByAccessedDateTime", query = "SELECT p FROM PDBDocument p WHERE p.accessedDateTime = :accessedDateTime"),
    @NamedQuery(name = "PDBDocument.findByDataDefinitionIndex", query = "SELECT p FROM PDBDocument p WHERE p.dataDefinitionIndex = :dataDefinitionIndex"),
    @NamedQuery(name = "PDBDocument.findByVersioning", query = "SELECT p FROM PDBDocument p WHERE p.versioning = :versioning"),
    @NamedQuery(name = "PDBDocument.findByAccessType", query = "SELECT p FROM PDBDocument p WHERE p.accessType = :accessType"),
    @NamedQuery(name = "PDBDocument.findByDocumentType", query = "SELECT p FROM PDBDocument p WHERE p.documentType = :documentType"),
    @NamedQuery(name = "PDBDocument.findByCreatedbyApplication", query = "SELECT p FROM PDBDocument p WHERE p.createdbyApplication = :createdbyApplication"),
    @NamedQuery(name = "PDBDocument.findByCreatedbyUser", query = "SELECT p FROM PDBDocument p WHERE p.createdbyUser = :createdbyUser"),
    @NamedQuery(name = "PDBDocument.findByImageIndex", query = "SELECT p FROM PDBDocument p WHERE p.imageIndex = :imageIndex"),
    @NamedQuery(name = "PDBDocument.findByVolumeId", query = "SELECT p FROM PDBDocument p WHERE p.volumeId = :volumeId"),
    @NamedQuery(name = "PDBDocument.findByNoOfPages", query = "SELECT p FROM PDBDocument p WHERE p.noOfPages = :noOfPages"),
    @NamedQuery(name = "PDBDocument.findByDocumentSize", query = "SELECT p FROM PDBDocument p WHERE p.documentSize = :documentSize"),
    @NamedQuery(name = "PDBDocument.findByFTSDocumentIndex", query = "SELECT p FROM PDBDocument p WHERE p.fTSDocumentIndex = :fTSDocumentIndex"),
    @NamedQuery(name = "PDBDocument.findByODMADocumentIndex", query = "SELECT p FROM PDBDocument p WHERE p.oDMADocumentIndex = :oDMADocumentIndex"),
    @NamedQuery(name = "PDBDocument.findByHistoryEnableFlag", query = "SELECT p FROM PDBDocument p WHERE p.historyEnableFlag = :historyEnableFlag"),
    @NamedQuery(name = "PDBDocument.findByDocumentLock", query = "SELECT p FROM PDBDocument p WHERE p.documentLock = :documentLock"),
    @NamedQuery(name = "PDBDocument.findByLockByUser", query = "SELECT p FROM PDBDocument p WHERE p.lockByUser = :lockByUser"),
    @NamedQuery(name = "PDBDocument.findByComment", query = "SELECT p FROM PDBDocument p WHERE p.comment = :comment"),
    @NamedQuery(name = "PDBDocument.findByAuthor", query = "SELECT p FROM PDBDocument p WHERE p.author = :author"),
    @NamedQuery(name = "PDBDocument.findByTextImageIndex", query = "SELECT p FROM PDBDocument p WHERE p.textImageIndex = :textImageIndex"),
    @NamedQuery(name = "PDBDocument.findByTextVolumeId", query = "SELECT p FROM PDBDocument p WHERE p.textVolumeId = :textVolumeId"),
    @NamedQuery(name = "PDBDocument.findByFTSFlag", query = "SELECT p FROM PDBDocument p WHERE p.fTSFlag = :fTSFlag"),
    @NamedQuery(name = "PDBDocument.findByDocStatus", query = "SELECT p FROM PDBDocument p WHERE p.docStatus = :docStatus"),
    @NamedQuery(name = "PDBDocument.findByExpiryDateTime", query = "SELECT p FROM PDBDocument p WHERE p.expiryDateTime = :expiryDateTime"),
    @NamedQuery(name = "PDBDocument.findByFinalizedFlag", query = "SELECT p FROM PDBDocument p WHERE p.finalizedFlag = :finalizedFlag"),
    @NamedQuery(name = "PDBDocument.findByFinalizedDateTime", query = "SELECT p FROM PDBDocument p WHERE p.finalizedDateTime = :finalizedDateTime"),
    @NamedQuery(name = "PDBDocument.findByFinalizedBy", query = "SELECT p FROM PDBDocument p WHERE p.finalizedBy = :finalizedBy"),
    @NamedQuery(name = "PDBDocument.findByCheckOutstatus", query = "SELECT p FROM PDBDocument p WHERE p.checkOutstatus = :checkOutstatus"),
    @NamedQuery(name = "PDBDocument.findByCheckOutbyUser", query = "SELECT p FROM PDBDocument p WHERE p.checkOutbyUser = :checkOutbyUser"),
    @NamedQuery(name = "PDBDocument.findByUseFulData", query = "SELECT p FROM PDBDocument p WHERE p.useFulData = :useFulData"),
    @NamedQuery(name = "PDBDocument.findByAcl", query = "SELECT p FROM PDBDocument p WHERE p.acl = :acl"),
    @NamedQuery(name = "PDBDocument.findByPhysicalLocation", query = "SELECT p FROM PDBDocument p WHERE p.physicalLocation = :physicalLocation"),
    @NamedQuery(name = "PDBDocument.findByACLMoreFlag", query = "SELECT p FROM PDBDocument p WHERE p.aCLMoreFlag = :aCLMoreFlag"),
    @NamedQuery(name = "PDBDocument.findByAppName", query = "SELECT p FROM PDBDocument p WHERE p.appName = :appName"),
    @NamedQuery(name = "PDBDocument.findByMainGroupId", query = "SELECT p FROM PDBDocument p WHERE p.mainGroupId = :mainGroupId"),
    @NamedQuery(name = "PDBDocument.findByPullPrintFlag", query = "SELECT p FROM PDBDocument p WHERE p.pullPrintFlag = :pullPrintFlag"),
    @NamedQuery(name = "PDBDocument.findByThumbNailFlag", query = "SELECT p FROM PDBDocument p WHERE p.thumbNailFlag = :thumbNailFlag"),
    @NamedQuery(name = "PDBDocument.findByLockMessage", query = "SELECT p FROM PDBDocument p WHERE p.lockMessage = :lockMessage"),
    @NamedQuery(name = "PDBDocument.findByEnableSecure", query = "SELECT p FROM PDBDocument p WHERE p.enableSecure = :enableSecure"),
    @NamedQuery(name = "PDBDocument.findByRevisedBy", query = "SELECT p FROM PDBDocument p WHERE p.revisedBy = :revisedBy"),
    @NamedQuery(name = "PDBDocument.findBySignFlag", query = "SELECT p FROM PDBDocument p WHERE p.signFlag = :signFlag"),
    @NamedQuery(name = "PDBDocument.findByOwnerType", query = "SELECT p FROM PDBDocument p WHERE p.ownerType = :ownerType"),
    @NamedQuery(name = "PDBDocument.findByESTimeStamp", query = "SELECT p FROM PDBDocument p WHERE p.eSTimeStamp = :eSTimeStamp"),
    @NamedQuery(name = "PDBDocument.findByESIndexTime", query = "SELECT p FROM PDBDocument p WHERE p.eSIndexTime = :eSIndexTime"),
    @NamedQuery(name = "PDBDocument.findByESFlag", query = "SELECT p FROM PDBDocument p WHERE p.eSFlag = :eSFlag")})
public class PDBDocument implements Serializable {
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pDBDocument")
    private Collection<PDBDocumentContent> pDBDocumentContentCollection;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "DocumentIndex")
    private Integer documentIndex;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "VersionNumber")
    private BigDecimal versionNumber;
    @Size(max = 255)
    @Column(name = "VersionComment")
    private String versionComment;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "Name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "Owner")
    private int owner;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CreatedDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDateTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "RevisedDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date revisedDateTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "AccessedDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date accessedDateTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DataDefinitionIndex")
    private int dataDefinitionIndex;
    @Basic(optional = false)
    @NotNull
    @Column(name = "Versioning")
    private Character versioning;
    @Basic(optional = false)
    @NotNull
    @Column(name = "AccessType")
    private Character accessType;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 5)
    @Column(name = "DocumentType")
    private String documentType;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CreatedbyApplication")
    private int createdbyApplication;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CreatedbyUser")
    private int createdbyUser;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ImageIndex")
    private int imageIndex;
    @Basic(optional = false)
    @NotNull
    @Column(name = "VolumeId")
    private int volumeId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "NoOfPages")
    private int noOfPages;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DocumentSize")
    private int documentSize;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FTSDocumentIndex")
    private int fTSDocumentIndex;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 128)
    @Column(name = "ODMADocumentIndex")
    private String oDMADocumentIndex;
    @Basic(optional = false)
    @NotNull
    @Column(name = "HistoryEnableFlag")
    private Character historyEnableFlag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DocumentLock")
    private Character documentLock;
    @Size(max = 1020)
    @Column(name = "LockByUser")
    private String lockByUser;
    @Size(max = 1020)
    @Column(name = "Comment")
    private String comment;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "Author")
    private String author;
    @Basic(optional = false)
    @NotNull
    @Column(name = "TextImageIndex")
    private int textImageIndex;
    @Basic(optional = false)
    @NotNull
    @Column(name = "TextVolumeId")
    private int textVolumeId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "FTSFlag")
    private String fTSFlag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DocStatus")
    private Character docStatus;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ExpiryDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDateTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FinalizedFlag")
    private Character finalizedFlag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FinalizedDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date finalizedDateTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FinalizedBy")
    private int finalizedBy;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CheckOutstatus")
    private Character checkOutstatus;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CheckOutbyUser")
    private int checkOutbyUser;
    @Size(max = 255)
    @Column(name = "UseFulData")
    private String useFulData;
    @Size(max = 255)
    @Column(name = "ACL")
    private String acl;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 512)
    @Column(name = "PhysicalLocation")
    private String physicalLocation;
    @Column(name = "ACLMoreFlag")
    private Character aCLMoreFlag;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "AppName")
    private String appName;
    @Basic(optional = false)
    @NotNull
    @Column(name = "MainGroupId")
    private int mainGroupId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "PullPrintFlag")
    private Character pullPrintFlag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ThumbNailFlag")
    private Character thumbNailFlag;
    @Size(max = 255)
    @Column(name = "LockMessage")
    private String lockMessage;
    @Basic(optional = false)
    @NotNull
    @Column(name = "EnableSecure")
    private Character enableSecure;
    @Basic(optional = false)
    @NotNull
    @Column(name = "RevisedBy")
    private int revisedBy;
    @Basic(optional = false)
    @NotNull
    @Column(name = "SignFlag")
    private Character signFlag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "OwnerType")
    private Character ownerType;
    @Size(max = 50)
    @Column(name = "ESTimeStamp")
    private String eSTimeStamp;
    @Size(max = 250)
    @Column(name = "ESIndexTime")
    private String eSIndexTime;
    @Column(name = "ESFlag")
    private Character eSFlag;

    public PDBDocument() {
    }

    public PDBDocument(Integer documentIndex) {
        this.documentIndex = documentIndex;
    }

    public PDBDocument(Integer documentIndex, BigDecimal versionNumber, String name, int owner, Date createdDateTime, Date revisedDateTime, Date accessedDateTime, int dataDefinitionIndex, Character versioning, Character accessType, String documentType, int createdbyApplication, int createdbyUser, int imageIndex, int volumeId, int noOfPages, int documentSize, int fTSDocumentIndex, String oDMADocumentIndex, Character historyEnableFlag, Character documentLock, String author, int textImageIndex, int textVolumeId, String fTSFlag, Character docStatus, Date expiryDateTime, Character finalizedFlag, Date finalizedDateTime, int finalizedBy, Character checkOutstatus, int checkOutbyUser, String physicalLocation, String appName, int mainGroupId, Character pullPrintFlag, Character thumbNailFlag, Character enableSecure, int revisedBy, Character signFlag, Character ownerType) {
        this.documentIndex = documentIndex;
        this.versionNumber = versionNumber;
        this.name = name;
        this.owner = owner;
        this.createdDateTime = createdDateTime;
        this.revisedDateTime = revisedDateTime;
        this.accessedDateTime = accessedDateTime;
        this.dataDefinitionIndex = dataDefinitionIndex;
        this.versioning = versioning;
        this.accessType = accessType;
        this.documentType = documentType;
        this.createdbyApplication = createdbyApplication;
        this.createdbyUser = createdbyUser;
        this.imageIndex = imageIndex;
        this.volumeId = volumeId;
        this.noOfPages = noOfPages;
        this.documentSize = documentSize;
        this.fTSDocumentIndex = fTSDocumentIndex;
        this.oDMADocumentIndex = oDMADocumentIndex;
        this.historyEnableFlag = historyEnableFlag;
        this.documentLock = documentLock;
        this.author = author;
        this.textImageIndex = textImageIndex;
        this.textVolumeId = textVolumeId;
        this.fTSFlag = fTSFlag;
        this.docStatus = docStatus;
        this.expiryDateTime = expiryDateTime;
        this.finalizedFlag = finalizedFlag;
        this.finalizedDateTime = finalizedDateTime;
        this.finalizedBy = finalizedBy;
        this.checkOutstatus = checkOutstatus;
        this.checkOutbyUser = checkOutbyUser;
        this.physicalLocation = physicalLocation;
        this.appName = appName;
        this.mainGroupId = mainGroupId;
        this.pullPrintFlag = pullPrintFlag;
        this.thumbNailFlag = thumbNailFlag;
        this.enableSecure = enableSecure;
        this.revisedBy = revisedBy;
        this.signFlag = signFlag;
        this.ownerType = ownerType;
    }

    public Integer getDocumentIndex() {
        return documentIndex;
    }

    public void setDocumentIndex(Integer documentIndex) {
        this.documentIndex = documentIndex;
    }

    public BigDecimal getVersionNumber() {
        return versionNumber;
    }

    public void setVersionNumber(BigDecimal versionNumber) {
        this.versionNumber = versionNumber;
    }

    public String getVersionComment() {
        return versionComment;
    }

    public void setVersionComment(String versionComment) {
        this.versionComment = versionComment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getOwner() {
        return owner;
    }

    public void setOwner(int owner) {
        this.owner = owner;
    }

    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public Date getRevisedDateTime() {
        return revisedDateTime;
    }

    public void setRevisedDateTime(Date revisedDateTime) {
        this.revisedDateTime = revisedDateTime;
    }

    public Date getAccessedDateTime() {
        return accessedDateTime;
    }

    public void setAccessedDateTime(Date accessedDateTime) {
        this.accessedDateTime = accessedDateTime;
    }

    public int getDataDefinitionIndex() {
        return dataDefinitionIndex;
    }

    public void setDataDefinitionIndex(int dataDefinitionIndex) {
        this.dataDefinitionIndex = dataDefinitionIndex;
    }

    public Character getVersioning() {
        return versioning;
    }

    public void setVersioning(Character versioning) {
        this.versioning = versioning;
    }

    public Character getAccessType() {
        return accessType;
    }

    public void setAccessType(Character accessType) {
        this.accessType = accessType;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public int getCreatedbyApplication() {
        return createdbyApplication;
    }

    public void setCreatedbyApplication(int createdbyApplication) {
        this.createdbyApplication = createdbyApplication;
    }

    public int getCreatedbyUser() {
        return createdbyUser;
    }

    public void setCreatedbyUser(int createdbyUser) {
        this.createdbyUser = createdbyUser;
    }

    public int getImageIndex() {
        return imageIndex;
    }

    public void setImageIndex(int imageIndex) {
        this.imageIndex = imageIndex;
    }

    public int getVolumeId() {
        return volumeId;
    }

    public void setVolumeId(int volumeId) {
        this.volumeId = volumeId;
    }

    public int getNoOfPages() {
        return noOfPages;
    }

    public void setNoOfPages(int noOfPages) {
        this.noOfPages = noOfPages;
    }

    public int getDocumentSize() {
        return documentSize;
    }

    public void setDocumentSize(int documentSize) {
        this.documentSize = documentSize;
    }

    public int getFTSDocumentIndex() {
        return fTSDocumentIndex;
    }

    public void setFTSDocumentIndex(int fTSDocumentIndex) {
        this.fTSDocumentIndex = fTSDocumentIndex;
    }

    public String getODMADocumentIndex() {
        return oDMADocumentIndex;
    }

    public void setODMADocumentIndex(String oDMADocumentIndex) {
        this.oDMADocumentIndex = oDMADocumentIndex;
    }

    public Character getHistoryEnableFlag() {
        return historyEnableFlag;
    }

    public void setHistoryEnableFlag(Character historyEnableFlag) {
        this.historyEnableFlag = historyEnableFlag;
    }

    public Character getDocumentLock() {
        return documentLock;
    }

    public void setDocumentLock(Character documentLock) {
        this.documentLock = documentLock;
    }

    public String getLockByUser() {
        return lockByUser;
    }

    public void setLockByUser(String lockByUser) {
        this.lockByUser = lockByUser;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getTextImageIndex() {
        return textImageIndex;
    }

    public void setTextImageIndex(int textImageIndex) {
        this.textImageIndex = textImageIndex;
    }

    public int getTextVolumeId() {
        return textVolumeId;
    }

    public void setTextVolumeId(int textVolumeId) {
        this.textVolumeId = textVolumeId;
    }

    public String getFTSFlag() {
        return fTSFlag;
    }

    public void setFTSFlag(String fTSFlag) {
        this.fTSFlag = fTSFlag;
    }

    public Character getDocStatus() {
        return docStatus;
    }

    public void setDocStatus(Character docStatus) {
        this.docStatus = docStatus;
    }

    public Date getExpiryDateTime() {
        return expiryDateTime;
    }

    public void setExpiryDateTime(Date expiryDateTime) {
        this.expiryDateTime = expiryDateTime;
    }

    public Character getFinalizedFlag() {
        return finalizedFlag;
    }

    public void setFinalizedFlag(Character finalizedFlag) {
        this.finalizedFlag = finalizedFlag;
    }

    public Date getFinalizedDateTime() {
        return finalizedDateTime;
    }

    public void setFinalizedDateTime(Date finalizedDateTime) {
        this.finalizedDateTime = finalizedDateTime;
    }

    public int getFinalizedBy() {
        return finalizedBy;
    }

    public void setFinalizedBy(int finalizedBy) {
        this.finalizedBy = finalizedBy;
    }

    public Character getCheckOutstatus() {
        return checkOutstatus;
    }

    public void setCheckOutstatus(Character checkOutstatus) {
        this.checkOutstatus = checkOutstatus;
    }

    public int getCheckOutbyUser() {
        return checkOutbyUser;
    }

    public void setCheckOutbyUser(int checkOutbyUser) {
        this.checkOutbyUser = checkOutbyUser;
    }

    public String getUseFulData() {
        return useFulData;
    }

    public void setUseFulData(String useFulData) {
        this.useFulData = useFulData;
    }

    public String getAcl() {
        return acl;
    }

    public void setAcl(String acl) {
        this.acl = acl;
    }

    public String getPhysicalLocation() {
        return physicalLocation;
    }

    public void setPhysicalLocation(String physicalLocation) {
        this.physicalLocation = physicalLocation;
    }

    public Character getACLMoreFlag() {
        return aCLMoreFlag;
    }

    public void setACLMoreFlag(Character aCLMoreFlag) {
        this.aCLMoreFlag = aCLMoreFlag;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public int getMainGroupId() {
        return mainGroupId;
    }

    public void setMainGroupId(int mainGroupId) {
        this.mainGroupId = mainGroupId;
    }

    public Character getPullPrintFlag() {
        return pullPrintFlag;
    }

    public void setPullPrintFlag(Character pullPrintFlag) {
        this.pullPrintFlag = pullPrintFlag;
    }

    public Character getThumbNailFlag() {
        return thumbNailFlag;
    }

    public void setThumbNailFlag(Character thumbNailFlag) {
        this.thumbNailFlag = thumbNailFlag;
    }

    public String getLockMessage() {
        return lockMessage;
    }

    public void setLockMessage(String lockMessage) {
        this.lockMessage = lockMessage;
    }

    public Character getEnableSecure() {
        return enableSecure;
    }

    public void setEnableSecure(Character enableSecure) {
        this.enableSecure = enableSecure;
    }

    public int getRevisedBy() {
        return revisedBy;
    }

    public void setRevisedBy(int revisedBy) {
        this.revisedBy = revisedBy;
    }

    public Character getSignFlag() {
        return signFlag;
    }

    public void setSignFlag(Character signFlag) {
        this.signFlag = signFlag;
    }

    public Character getOwnerType() {
        return ownerType;
    }

    public void setOwnerType(Character ownerType) {
        this.ownerType = ownerType;
    }

    public String getESTimeStamp() {
        return eSTimeStamp;
    }

    public void setESTimeStamp(String eSTimeStamp) {
        this.eSTimeStamp = eSTimeStamp;
    }

    public String getESIndexTime() {
        return eSIndexTime;
    }

    public void setESIndexTime(String eSIndexTime) {
        this.eSIndexTime = eSIndexTime;
    }

    public Character getESFlag() {
        return eSFlag;
    }

    public void setESFlag(Character eSFlag) {
        this.eSFlag = eSFlag;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (documentIndex != null ? documentIndex.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PDBDocument)) {
            return false;
        }
        PDBDocument other = (PDBDocument) object;
        if ((this.documentIndex == null && other.documentIndex != null) || (this.documentIndex != null && !this.documentIndex.equals(other.documentIndex))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PDBDocument[ documentIndex=" + documentIndex + " ]";
    }

    @XmlTransient
    public Collection<PDBDocumentContent> getPDBDocumentContentCollection() {
        return pDBDocumentContentCollection;
    }

    public void setPDBDocumentContentCollection(Collection<PDBDocumentContent> pDBDocumentContentCollection) {
        this.pDBDocumentContentCollection = pDBDocumentContentCollection;
    }
    
}
