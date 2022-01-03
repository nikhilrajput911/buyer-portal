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
 * @author ramkrishnan.elango
 */
@Entity
@Table(name = "NG_CM_SpendAnalysis_ProcessTable")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "UploadSpendHistory.findAll", query = "SELECT a FROM UploadSpendHistory a"),
    @NamedQuery(name = "UploadSpendHistory.findFileProcessed", query = "SELECT a FROM UploadSpendHistory a WHERE a.processedFlag IS NOT NULL AND a.tenderProcessedFlag IS NULL AND a.revokeStatus IS NULL"),
    @NamedQuery(name = "UploadSpendHistory.findByBuyerIDMat", query = "SELECT a FROM UploadSpendHistory a WHERE  a.buyerid = :buyerid AND a.docType='Material' "),
    @NamedQuery(name = "UploadSpendHistory.findByBuyerIDSvc", query = "SELECT a FROM UploadSpendHistory a WHERE  a.buyerid = :buyerid AND a.docType='Service' ")
})
public class UploadSpendHistory implements Serializable{
    
     private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "sno")
    private Integer sno;
    
    @Size(max = 50)
    @Column(name = "buyerid")
    private String buyerid;

    @Size(max = 150)
    @Column(name = "processedFlag")
    private String processedFlag;

    @Size(max = 300)
    @Column(name = "folderIndex")
    private String folderIndex;
    
     @Size(max = 50)
    @Column(name = "documentIndex") 
    private String documentIndex;

    @Size(max = 50)
    @Column(name = "fileName")
    private String fileName;
    
    @Size(max = 50)
    @Column(name = "addedTime")
    private String addedTime;
    
    @Size(max = 50)
    @Column(name = "buyerName")
    private String buyerName;
    
    @Size(max = 50)
    @Column(name = "uniqueID")
    private String uniqueID;
    
    @Size(max = 50)
    @Column(name = "tenderProcessedFlag")
    private String tenderProcessedFlag;
    
    @Size(max = 50)
    @Column(name = "revokeStatus")
    private String revokeStatus;
    
    @Size(max = 50)
    @Column(name = "docType")
    private String docType;

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getBuyerid() {
        return buyerid;
    }

    public void setBuyerid(String buyerid) {
        this.buyerid = buyerid;
    }


    public String getProcessedFlag() {
        return processedFlag;
    }

    public void setProcessedFlag(String processedFlag) {
        this.processedFlag = processedFlag;
    }

    public String getFolderIndex() {
        return folderIndex;
    }

    public void setFolderIndex(String folderIndex) {
        this.folderIndex = folderIndex;
    }

    public String getDocumentIndex() {
        return documentIndex;
    }

    public void setDocumentIndex(String documentIndex) {
        this.documentIndex = documentIndex;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getAddedTime() {
        return addedTime;
    }

    public void setAddedTime(String addedTime) {
        this.addedTime = addedTime;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getUniqueID() {
        return uniqueID;
    }

    public void setUniqueID(String uniqueID) {
        this.uniqueID = uniqueID;
    }

    public String getTenderProcessedFlag() {
        return tenderProcessedFlag;
    }

    public void setTenderProcessedFlag(String tenderProcessedFlag) {
        this.tenderProcessedFlag = tenderProcessedFlag;
    }

    public String getRevokeStatus() {
        return revokeStatus;
    }

    public void setRevokeStatus(String revokeStatus) {
        this.revokeStatus = revokeStatus;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }
    
    
}
