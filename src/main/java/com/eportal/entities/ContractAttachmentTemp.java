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
import javax.persistence.Lob;
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
@Table(name = "NG_BP_Contractattachment_temp")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractAttachmentTemp.findAll", query = "SELECT w FROM ContractAttachmentTemp w"),
    @NamedQuery(name = "ContractAttachmentTemp.findById", query = "SELECT w FROM ContractAttachmentTemp w WHERE w.id = :id")})
public class ContractAttachmentTemp implements Serializable {
    
    @Id
@Column(name="Id")
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Integer id;
    
    @Lob
    @Column(name = "attachment1")
    private byte[] attachment1;
    @Lob
    @Column(name = "attachment2")
    private byte[] attachment2;
    @Lob
    @Column(name = "attachment3")
    private byte[] attachment3;
    @Lob
    @Column(name = "attachment4")
    private byte[] attachment4;
    @Lob
    @Column(name = "attachment5")
    private byte[] attachment5;
    @Size(max = 50)
    @Column(name = "attachment1name")
    private String attachment1name;
    @Size(max = 50)
    @Column(name = "attachment2name")
    private String attachment2name;
    @Size(max = 50)
    @Column(name = "attachment3name")
    private String attachment3name;
    @Size(max = 50)
    @Column(name = "attachment4name")
    private String attachment4name;
    @Size(max = 50)
    @Column(name = "attachment5name")
    private String attachment5name;
    
    
    @Size(max = 30)
    @Column(name = "linkID")
    private String linkID;
    @Size(max = 30)
    @Column(name = "pID")
    private String pID;
    @Size(max = 30)
    @Column(name = "workstep")
    private String workstep;
    @Size(max = 30)
    @Column(name = "requestorID")
    private String requestorID;
    @Size(max = 30)
    @Column(name = "materialCode")
    private String materialCode;
    @Size(max = 30)
    @Column(name = "shortText")
    private String shortText;
    @Size(max = 30)
    @Column(name = "quantity")
    private String quantity;
    
    @Size(max = 50)
    @Column(name = "RFQNo")
    private String RFQNo;

    public String getRFQNo() {
        return RFQNo;
    }

    public void setRFQNo(String RFQNo) {
        this.RFQNo = RFQNo;
    }

    public ContractAttachmentTemp() {
    }

    public ContractAttachmentTemp(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
        if (!(object instanceof ContractAttachmentTemp)) {
            return false;
        }
        ContractAttachmentTemp other = (ContractAttachmentTemp) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }
    @Override
    public String toString() {
        return "com.eportal.entities.WorkOrderAttachmentTemp[ id=" + id + " ]";
    }

    public byte[] getAttachment1() {
        return attachment1;
    }

    public void setAttachment1(byte[] attachment1) {
        this.attachment1 = attachment1;
    }

    public byte[] getAttachment2() {
        return attachment2;
    }

    public void setAttachment2(byte[] attachment2) {
        this.attachment2 = attachment2;
    }

    public byte[] getAttachment3() {
        return attachment3;
    }

    public void setAttachment3(byte[] attachment3) {
        this.attachment3 = attachment3;
    }

    public byte[] getAttachment4() {
        return attachment4;
    }

    public void setAttachment4(byte[] attachment4) {
        this.attachment4 = attachment4;
    }

    public byte[] getAttachment5() {
        return attachment5;
    }

    public void setAttachment5(byte[] attachment5) {
        this.attachment5 = attachment5;
    }

    public String getAttachment1name() {
        return attachment1name;
    }

    public void setAttachment1name(String attachment1name) {
        this.attachment1name = attachment1name;
    }

    public String getAttachment2name() {
        return attachment2name;
    }

    public void setAttachment2name(String attachment2name) {
        this.attachment2name = attachment2name;
    }

    public String getAttachment3name() {
        return attachment3name;
    }

    public void setAttachment3name(String attachment3name) {
        this.attachment3name = attachment3name;
    }

    public String getAttachment4name() {
        return attachment4name;
    }

    public void setAttachment4name(String attachment4name) {
        this.attachment4name = attachment4name;
    }

    public String getAttachment5name() {
        return attachment5name;
    }

    public void setAttachment5name(String attachment5name) {
        this.attachment5name = attachment5name;
    }
    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public String getpID() {
        return pID;
    }

    public void setpID(String pID) {
        this.pID = pID;
    }

    public String getWorkstep() {
        return workstep;
    }

    public void setWorkstep(String workstep) {
        this.workstep = workstep;
    }

    public String getRequestorID() {
        return requestorID;
    }

    public void setRequestorID(String requestorID) {
        this.requestorID = requestorID;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
