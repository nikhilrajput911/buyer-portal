/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
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
@Table(name = "PDBFolder")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PDBFolder.findAll", query = "SELECT p FROM PDBFolder p"),
    @NamedQuery(name = "PDBFolder.findByFolderIndex", query = "SELECT p FROM PDBFolder p WHERE p.folderIndex = :folderIndex"),
    @NamedQuery(name = "PDBFolder.findByParentFolderIndex", query = "SELECT p FROM PDBFolder p WHERE p.parentFolderIndex = :parentFolderIndex"),
    @NamedQuery(name = "PDBFolder.findByName", query = "SELECT p FROM PDBFolder p WHERE p.name = :name"),
    @NamedQuery(name = "PDBFolder.findByOwner", query = "SELECT p FROM PDBFolder p WHERE p.owner = :owner"),
    @NamedQuery(name = "PDBFolder.findByCreatedDatetime", query = "SELECT p FROM PDBFolder p WHERE p.createdDatetime = :createdDatetime"),
    @NamedQuery(name = "PDBFolder.findByRevisedDateTime", query = "SELECT p FROM PDBFolder p WHERE p.revisedDateTime = :revisedDateTime"),
    @NamedQuery(name = "PDBFolder.findByAccessedDateTime", query = "SELECT p FROM PDBFolder p WHERE p.accessedDateTime = :accessedDateTime"),
    @NamedQuery(name = "PDBFolder.findByDataDefinitionIndex", query = "SELECT p FROM PDBFolder p WHERE p.dataDefinitionIndex = :dataDefinitionIndex"),
    @NamedQuery(name = "PDBFolder.findByAccessType", query = "SELECT p FROM PDBFolder p WHERE p.accessType = :accessType"),
    @NamedQuery(name = "PDBFolder.findByImageVolumeIndex", query = "SELECT p FROM PDBFolder p WHERE p.imageVolumeIndex = :imageVolumeIndex"),
    @NamedQuery(name = "PDBFolder.findByFolderType", query = "SELECT p FROM PDBFolder p WHERE p.folderType = :folderType"),
    @NamedQuery(name = "PDBFolder.findByFolderLock", query = "SELECT p FROM PDBFolder p WHERE p.folderLock = :folderLock"),
    @NamedQuery(name = "PDBFolder.findByLockByUser", query = "SELECT p FROM PDBFolder p WHERE p.lockByUser = :lockByUser"),
    @NamedQuery(name = "PDBFolder.findByLocation", query = "SELECT p FROM PDBFolder p WHERE p.location = :location"),
    @NamedQuery(name = "PDBFolder.findByDeletedDateTime", query = "SELECT p FROM PDBFolder p WHERE p.deletedDateTime = :deletedDateTime"),
    @NamedQuery(name = "PDBFolder.findByEnableVersion", query = "SELECT p FROM PDBFolder p WHERE p.enableVersion = :enableVersion"),
    @NamedQuery(name = "PDBFolder.findByExpiryDateTime", query = "SELECT p FROM PDBFolder p WHERE p.expiryDateTime = :expiryDateTime"),
    @NamedQuery(name = "PDBFolder.findByComment", query = "SELECT p FROM PDBFolder p WHERE p.comment = :comment"),
    @NamedQuery(name = "PDBFolder.findByUseFulData", query = "SELECT p FROM PDBFolder p WHERE p.useFulData = :useFulData"),
    @NamedQuery(name = "PDBFolder.findByAcl", query = "SELECT p FROM PDBFolder p WHERE p.acl = :acl"),
    @NamedQuery(name = "PDBFolder.findByFinalizedFlag", query = "SELECT p FROM PDBFolder p WHERE p.finalizedFlag = :finalizedFlag"),
    @NamedQuery(name = "PDBFolder.findByFinalizedDateTime", query = "SELECT p FROM PDBFolder p WHERE p.finalizedDateTime = :finalizedDateTime"),
    @NamedQuery(name = "PDBFolder.findByFinalizedBy", query = "SELECT p FROM PDBFolder p WHERE p.finalizedBy = :finalizedBy"),
    @NamedQuery(name = "PDBFolder.findByACLMoreFlag", query = "SELECT p FROM PDBFolder p WHERE p.aCLMoreFlag = :aCLMoreFlag"),
    @NamedQuery(name = "PDBFolder.findByMainGroupId", query = "SELECT p FROM PDBFolder p WHERE p.mainGroupId = :mainGroupId"),
    @NamedQuery(name = "PDBFolder.findByEnableFTS", query = "SELECT p FROM PDBFolder p WHERE p.enableFTS = :enableFTS"),
    @NamedQuery(name = "PDBFolder.findByLockMessage", query = "SELECT p FROM PDBFolder p WHERE p.lockMessage = :lockMessage"),
    @NamedQuery(name = "PDBFolder.findByFolderLevel", query = "SELECT p FROM PDBFolder p WHERE p.folderLevel = :folderLevel"),
    @NamedQuery(name = "PDBFolder.findByHierarchy", query = "SELECT p FROM PDBFolder p WHERE p.hierarchy = :hierarchy"),
    @NamedQuery(name = "PDBFolder.findByOwnerInheritance", query = "SELECT p FROM PDBFolder p WHERE p.ownerInheritance = :ownerInheritance"),
    @NamedQuery(name = "PDBFolder.findByEnableSecure", query = "SELECT p FROM PDBFolder p WHERE p.enableSecure = :enableSecure"),
    @NamedQuery(name = "PDBFolder.findByRevisedBy", query = "SELECT p FROM PDBFolder p WHERE p.revisedBy = :revisedBy"),
    @NamedQuery(name = "PDBFolder.findByOwnerType", query = "SELECT p FROM PDBFolder p WHERE p.ownerType = :ownerType"),
    @NamedQuery(name = "PDBFolder.findByESTimeStamp", query = "SELECT p FROM PDBFolder p WHERE p.eSTimeStamp = :eSTimeStamp"),
    @NamedQuery(name = "PDBFolder.findByESIndexTime", query = "SELECT p FROM PDBFolder p WHERE p.eSIndexTime = :eSIndexTime"),
    @NamedQuery(name = "PDBFolder.findByESFlag", query = "SELECT p FROM PDBFolder p WHERE p.eSFlag = :eSFlag")})
public class PDBFolder implements Serializable {
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pDBFolder")
    private Collection<PDBDocumentContent> pDBDocumentContentCollection;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "FolderIndex")
    private Integer folderIndex;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ParentFolderIndex")
    private int parentFolderIndex;
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
    @Column(name = "CreatedDatetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDatetime;
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
    @Column(name = "AccessType")
    private Character accessType;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ImageVolumeIndex")
    private int imageVolumeIndex;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FolderType")
    private Character folderType;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FolderLock")
    private Character folderLock;
    @Size(max = 1020)
    @Column(name = "LockByUser")
    private String lockByUser;
    @Basic(optional = false)
    @NotNull
    @Column(name = "Location")
    private Character location;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DeletedDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deletedDateTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "EnableVersion")
    private Character enableVersion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ExpiryDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDateTime;
    @Size(max = 1020)
    @Column(name = "Comment")
    private String comment;
    @Size(max = 255)
    @Column(name = "UseFulData")
    private String useFulData;
    @Size(max = 255)
    @Column(name = "ACL")
    private String acl;
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
    @Column(name = "ACLMoreFlag")
    private Character aCLMoreFlag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "MainGroupId")
    private short mainGroupId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "EnableFTS")
    private Character enableFTS;
    @Size(max = 255)
    @Column(name = "LockMessage")
    private String lockMessage;
    @Column(name = "FolderLevel")
    private Integer folderLevel;
    @Size(max = 2500)
    @Column(name = "Hierarchy")
    private String hierarchy;
    @Basic(optional = false)
    @NotNull
    @Column(name = "OwnerInheritance")
    private Character ownerInheritance;
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

    public PDBFolder() {
    }

    public PDBFolder(Integer folderIndex) {
        this.folderIndex = folderIndex;
    }

    public PDBFolder(Integer folderIndex, int parentFolderIndex, String name, int owner, Date createdDatetime, Date revisedDateTime, Date accessedDateTime, int dataDefinitionIndex, Character accessType, int imageVolumeIndex, Character folderType, Character folderLock, Character location, Date deletedDateTime, Character enableVersion, Date expiryDateTime, Character finalizedFlag, Date finalizedDateTime, int finalizedBy, short mainGroupId, Character enableFTS, Character ownerInheritance, Character enableSecure, int revisedBy, Character ownerType) {
        this.folderIndex = folderIndex;
        this.parentFolderIndex = parentFolderIndex;
        this.name = name;
        this.owner = owner;
        this.createdDatetime = createdDatetime;
        this.revisedDateTime = revisedDateTime;
        this.accessedDateTime = accessedDateTime;
        this.dataDefinitionIndex = dataDefinitionIndex;
        this.accessType = accessType;
        this.imageVolumeIndex = imageVolumeIndex;
        this.folderType = folderType;
        this.folderLock = folderLock;
        this.location = location;
        this.deletedDateTime = deletedDateTime;
        this.enableVersion = enableVersion;
        this.expiryDateTime = expiryDateTime;
        this.finalizedFlag = finalizedFlag;
        this.finalizedDateTime = finalizedDateTime;
        this.finalizedBy = finalizedBy;
        this.mainGroupId = mainGroupId;
        this.enableFTS = enableFTS;
        this.ownerInheritance = ownerInheritance;
        this.enableSecure = enableSecure;
        this.revisedBy = revisedBy;
        this.ownerType = ownerType;
    }

    public Integer getFolderIndex() {
        return folderIndex;
    }

    public void setFolderIndex(Integer folderIndex) {
        this.folderIndex = folderIndex;
    }

    public int getParentFolderIndex() {
        return parentFolderIndex;
    }

    public void setParentFolderIndex(int parentFolderIndex) {
        this.parentFolderIndex = parentFolderIndex;
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

    public Date getCreatedDatetime() {
        return createdDatetime;
    }

    public void setCreatedDatetime(Date createdDatetime) {
        this.createdDatetime = createdDatetime;
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

    public Character getAccessType() {
        return accessType;
    }

    public void setAccessType(Character accessType) {
        this.accessType = accessType;
    }

    public int getImageVolumeIndex() {
        return imageVolumeIndex;
    }

    public void setImageVolumeIndex(int imageVolumeIndex) {
        this.imageVolumeIndex = imageVolumeIndex;
    }

    public Character getFolderType() {
        return folderType;
    }

    public void setFolderType(Character folderType) {
        this.folderType = folderType;
    }

    public Character getFolderLock() {
        return folderLock;
    }

    public void setFolderLock(Character folderLock) {
        this.folderLock = folderLock;
    }

    public String getLockByUser() {
        return lockByUser;
    }

    public void setLockByUser(String lockByUser) {
        this.lockByUser = lockByUser;
    }

    public Character getLocation() {
        return location;
    }

    public void setLocation(Character location) {
        this.location = location;
    }

    public Date getDeletedDateTime() {
        return deletedDateTime;
    }

    public void setDeletedDateTime(Date deletedDateTime) {
        this.deletedDateTime = deletedDateTime;
    }

    public Character getEnableVersion() {
        return enableVersion;
    }

    public void setEnableVersion(Character enableVersion) {
        this.enableVersion = enableVersion;
    }

    public Date getExpiryDateTime() {
        return expiryDateTime;
    }

    public void setExpiryDateTime(Date expiryDateTime) {
        this.expiryDateTime = expiryDateTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public Character getACLMoreFlag() {
        return aCLMoreFlag;
    }

    public void setACLMoreFlag(Character aCLMoreFlag) {
        this.aCLMoreFlag = aCLMoreFlag;
    }

    public short getMainGroupId() {
        return mainGroupId;
    }

    public void setMainGroupId(short mainGroupId) {
        this.mainGroupId = mainGroupId;
    }

    public Character getEnableFTS() {
        return enableFTS;
    }

    public void setEnableFTS(Character enableFTS) {
        this.enableFTS = enableFTS;
    }

    public String getLockMessage() {
        return lockMessage;
    }

    public void setLockMessage(String lockMessage) {
        this.lockMessage = lockMessage;
    }

    public Integer getFolderLevel() {
        return folderLevel;
    }

    public void setFolderLevel(Integer folderLevel) {
        this.folderLevel = folderLevel;
    }

    public String getHierarchy() {
        return hierarchy;
    }

    public void setHierarchy(String hierarchy) {
        this.hierarchy = hierarchy;
    }

    public Character getOwnerInheritance() {
        return ownerInheritance;
    }

    public void setOwnerInheritance(Character ownerInheritance) {
        this.ownerInheritance = ownerInheritance;
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
        hash += (folderIndex != null ? folderIndex.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PDBFolder)) {
            return false;
        }
        PDBFolder other = (PDBFolder) object;
        if ((this.folderIndex == null && other.folderIndex != null) || (this.folderIndex != null && !this.folderIndex.equals(other.folderIndex))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PDBFolder[ folderIndex=" + folderIndex + " ]";
    }

    @XmlTransient
    public Collection<PDBDocumentContent> getPDBDocumentContentCollection() {
        return pDBDocumentContentCollection;
    }

    public void setPDBDocumentContentCollection(Collection<PDBDocumentContent> pDBDocumentContentCollection) {
        this.pDBDocumentContentCollection = pDBDocumentContentCollection;
    }
    
}
