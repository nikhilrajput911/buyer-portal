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
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_buyer_vendor_notification")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BuyerVendorNotification.findAll", query = "SELECT b FROM BuyerVendorNotification b"),
    @NamedQuery(name = "BuyerVendorNotification.findById", query = "SELECT b FROM BuyerVendorNotification b WHERE b.id = :id"),
    @NamedQuery(name = "BuyerVendorNotification.findByAttachmentname", query = "SELECT b FROM BuyerVendorNotification b WHERE b.attachmentname = :attachmentname"),
    @NamedQuery(name = "BuyerVendorNotification.findByCommentby", query = "SELECT b FROM BuyerVendorNotification b WHERE b.commentby = :commentby"),
    @NamedQuery(name = "BuyerVendorNotification.findByNotification", query = "SELECT b FROM BuyerVendorNotification b WHERE b.notification = :notification"),
    @NamedQuery(name = "BuyerVendorNotification.findByReadstatus", query = "SELECT b FROM BuyerVendorNotification b WHERE b.readstatus = :readstatus"),
    @NamedQuery(name = "BuyerVendorNotification.findByCommentdate", query = "SELECT b FROM BuyerVendorNotification b WHERE b.commentdate = :commentdate")})
public class BuyerVendorNotification implements Serializable {
    @JoinColumn(name = "NG_BP_ContractRfqHeader_RFQID", referencedColumnName = "RFQID")
    @ManyToOne
    private ContractRfqHeader contractRfqHeaderRFQID;
    
    @Size(max = 100)
    @Column(name = "url")
    private String url;
    @Lob
    @Column(name = "attachment")
    private byte[] attachment;
    @Size(max = 50)
    @Column(name = "notificationtype")
    private String notificationtype;
    @Size(max = 30)
    @Column(name = "attachmentsize")
    private String attachmentsize;
    @JoinColumn(name = "ng_bp_workorderrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "attachmentname")
    private String attachmentname;
    @Size(max = 50)
    @Column(name = "commentby")
    private String commentby;
    @Size(max = 2147483647)
    @Column(name = "notification")
    private String notification;
    @Size(max = 20)
    @Column(name = "readstatus")
    private String readstatus;
    @Column(name = "commentdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentdate;
    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;
    @JoinColumn(name = "ng_bp_vendordetails_id", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails ngBpVendordetailsId;

    public BuyerVendorNotification() {
    }

    public BuyerVendorNotification(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getAttachmentname() {
        return attachmentname;
    }

    public void setAttachmentname(String attachmentname) {
        this.attachmentname = attachmentname;
    }

    public String getCommentby() {
        return commentby;
    }

    public void setCommentby(String commentby) {
        this.commentby = commentby;
    }

    public String getNotification() {
        return notification;
    }

    public void setNotification(String notification) {
        this.notification = notification;
    }

    public String getReadstatus() {
        return readstatus;
    }

    public void setReadstatus(String readstatus) {
        this.readstatus = readstatus;
    }

    public Date getCommentdate() {
        return commentdate;
    }

    public void setCommentdate(Date commentdate) {
        this.commentdate = commentdate;
    }

    public BuyerDetails getNgBpBuyerdetailsId() {
        return ngBpBuyerdetailsId;
    }

    public void setNgBpBuyerdetailsId(BuyerDetails ngBpBuyerdetailsId) {
        this.ngBpBuyerdetailsId = ngBpBuyerdetailsId;
    }

    public VendorDetails getNgBpVendordetailsId() {
        return ngBpVendordetailsId;
    }

    public void setNgBpVendordetailsId(VendorDetails ngBpVendordetailsId) {
        this.ngBpVendordetailsId = ngBpVendordetailsId;
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
        if (!(object instanceof BuyerVendorNotification)) {
            return false;
        }
        BuyerVendorNotification other = (BuyerVendorNotification) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.BuyerVendorNotification[ id=" + id + " ]";
    }


    public WorkOrderRfqHeader getNgBpWorkorderrfqheaderRfqid() {
        return ngBpWorkorderrfqheaderRfqid;
    }

    public void setNgBpWorkorderrfqheaderRfqid(WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid) {
        this.ngBpWorkorderrfqheaderRfqid = ngBpWorkorderrfqheaderRfqid;
    }


    public String getAttachmentsize() {
        return attachmentsize;
    }

    public void setAttachmentsize(String attachmentsize) {
        this.attachmentsize = attachmentsize;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getNotificationtype() {
        return notificationtype;
    }

    public void setNotificationtype(String notificationtype) {
        this.notificationtype = notificationtype;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    public ContractRfqHeader getContractRfqHeaderRFQID() {
        return contractRfqHeaderRFQID;
    }

    public void setContractRfqHeaderRFQID(ContractRfqHeader contractRfqHeaderRFQID) {
        this.contractRfqHeaderRFQID = contractRfqHeaderRFQID;
    }
}
