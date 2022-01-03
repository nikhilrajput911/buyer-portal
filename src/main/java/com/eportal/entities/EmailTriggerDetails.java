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
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author devinarmatha
 */
@Entity
@Table(name = "WFMAILQUEUETABLE")
@XmlRootElement
public class EmailTriggerDetails implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "TaskId")
    private Integer TaskId;
     
    @Size(max = 255)
    @Column(name = "mailFrom")
    private String mailFrom;
    
    @Size(max = 2000)
    @Column(name = "mailTo")
    private String mailTo;
        
    @Size(max = 512)
    @Column(name = "mailCC")
    private String mailCC;
                  
    @Size(max = 255)
    @Column(name = "mailSubject")
    private String mailSubject;
                    
    @Size(max = 2147483647)
    @Column(name = "mailMessage")
    private String mailMessage;
                        
    @Size(max = 64)
    @Column(name = "mailContentType")
    private String mailContentType;
    
     @Size(max = 1000)
    @Column(name = "attachmentISINDEX")
    private String attachmentISINDEX;
    
    @Size(max = 1000)
    @Column(name = "attachmentNames")
    private String attachmentNames;
            
    @Size(max = 1)
    @Column(name = "mailStatus")
    private String mailStatus;

    public String getMailStatus() {
        return mailStatus;
    }

    public void setMailStatus(String mailStatus) {
        this.mailStatus = mailStatus;
    }

    public String getAttachmentISINDEX() {
        return attachmentISINDEX;
    }

    public void setAttachmentISINDEX(String attachmentISINDEX) {
        this.attachmentISINDEX = attachmentISINDEX;
    }

    public String getAttachmentNames() {
        return attachmentNames;
    }

    public void setAttachmentNames(String attachmentNames) {
        this.attachmentNames = attachmentNames;
    }
    
    
    public EmailTriggerDetails() {
    }

    public EmailTriggerDetails(Integer TaskId) {
        this.TaskId = TaskId;
    }

    public Integer getTaskId() {
        return TaskId;
    }

    public void setTaskId(Integer TaskId) {
        this.TaskId = TaskId;
    }

    public String getMailFrom() {
        return mailFrom;
    }

    public void setMailFrom(String mailFrom) {
        this.mailFrom = mailFrom;
    }

    public String getMailTo() {
        return mailTo;
    }

    public void setMailTo(String mailTo) {
        this.mailTo = mailTo;
    }

    public String getMailCC() {
        return mailCC;
    }

    public void setMailCC(String mailCC) {
        this.mailCC = mailCC;
    }

    public String getMailSubject() {
        return mailSubject;
    }

    public void setMailSubject(String mailSubject) {
        this.mailSubject = mailSubject;
    }

    public String getMailMessage() {
        return mailMessage;
    }
    
     public void setMailMessage(String mailMessage) {
        this.mailMessage = mailMessage;
    }
    

    public String getMailContentType() {
        return mailContentType;
    }
    
     public void setMailContentType(String mailContentType) {
        this.mailContentType = mailContentType;
    }
  
     
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (TaskId != null ? TaskId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EmailTriggerDetails)) {
            return false;
        }
        EmailTriggerDetails other = (EmailTriggerDetails) object;
        if ((this.TaskId == null && other.TaskId != null) || (this.TaskId != null && !this.TaskId.equals(other.TaskId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.EmailTriggerDetails[ id=" + TaskId + " ]";
    }
   
    
          


}
