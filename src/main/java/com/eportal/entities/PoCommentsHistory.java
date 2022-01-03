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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "NG_Cmplx_POCreation_CommentsHistory")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PoCommentsHistory.findAll", query = "SELECT p FROM PoCommentsHistory p"),
    @NamedQuery(name = "PoCommentsHistory.findBySno", query = "SELECT p FROM PoCommentsHistory p WHERE p.sno = :sno"),
    @NamedQuery(name = "PoCommentsHistory.findByProcInstID", query = "SELECT p FROM PoCommentsHistory p WHERE p.procInstID = :procInstID"),
    @NamedQuery(name = "PoCommentsHistory.findByInsertedBy", query = "SELECT p FROM PoCommentsHistory p WHERE p.insertedBy = :insertedBy"),
    @NamedQuery(name = "PoCommentsHistory.findByInsertedOn", query = "SELECT p FROM PoCommentsHistory p WHERE p.insertedOn = :insertedOn"),
    @NamedQuery(name = "PoCommentsHistory.findByQueryRejectionReason", query = "SELECT p FROM PoCommentsHistory p WHERE p.queryRejectionReason = :queryRejectionReason"),
    @NamedQuery(name = "PoCommentsHistory.findByComments", query = "SELECT p FROM PoCommentsHistory p WHERE p.comments = :comments"),
    @NamedQuery(name = "PoCommentsHistory.findByActionItem", query = "SELECT p FROM PoCommentsHistory p WHERE p.actionItem = :actionItem"),
    @NamedQuery(name = "PoCommentsHistory.findByWorkStep", query = "SELECT p FROM PoCommentsHistory p WHERE p.workStep = :workStep")})
public class PoCommentsHistory implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 40)
    @Column(name = "ProcInstID")
    private String procInstID;
    @Size(max = 50)
    @Column(name = "InsertedBy")
    private String insertedBy;
    @Column(name = "InsertedOn")
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertedOn;
    @Size(max = 100)
    @Column(name = "QueryRejectionReason")
    private String queryRejectionReason;
    @Size(max = 500)
    @Column(name = "Comments")
    private String comments;
    @Size(max = 50)
    @Column(name = "ActionItem")
    private String actionItem;
    @Size(max = 30)
    @Column(name = "WorkStep")
    private String workStep;

    public PoCommentsHistory() {
    }

    public PoCommentsHistory(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getProcInstID() {
        return procInstID;
    }

    public void setProcInstID(String procInstID) {
        this.procInstID = procInstID;
    }

    public String getInsertedBy() {
        return insertedBy;
    }

    public void setInsertedBy(String insertedBy) {
        this.insertedBy = insertedBy;
    }

    public Date getInsertedOn() {
        return insertedOn;
    }

    public void setInsertedOn(Date insertedOn) {
        this.insertedOn = insertedOn;
    }

    public String getQueryRejectionReason() {
        return queryRejectionReason;
    }

    public void setQueryRejectionReason(String queryRejectionReason) {
        this.queryRejectionReason = queryRejectionReason;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getActionItem() {
        return actionItem;
    }

    public void setActionItem(String actionItem) {
        this.actionItem = actionItem;
    }

    public String getWorkStep() {
        return workStep;
    }

    public void setWorkStep(String workStep) {
        this.workStep = workStep;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sno != null ? sno.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PoCommentsHistory)) {
            return false;
        }
        PoCommentsHistory other = (PoCommentsHistory) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PoCommentsHistory[ sno=" + sno + " ]";
    }
    
}
