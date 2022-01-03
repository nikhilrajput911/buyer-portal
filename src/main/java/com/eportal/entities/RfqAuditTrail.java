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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Sunil
 */

@Entity
@Table(name = "NG_BP_rfq_audit_trail")

@NamedQueries({

@NamedQuery(name = "RfqAuditTrail.findLastId", query = "SELECT MAX(id) FROM RfqAuditTrail")
})
public class RfqAuditTrail implements Serializable {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @Column(name = "activityDate") 
    @Temporal(TemporalType.TIMESTAMP)
    private Date  activityDate;
    @Column(name = "activity")
    private String activity;
    @Column(name = "description")
    private String description;
    
    private static final long serialVersionUID = 1L;
    @JoinColumn(name = "BP_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails bpBuyerdetailsId;
    
    @JoinColumn(name = "ng_bp_workorderrfqheader_rfqid", referencedColumnName = "RFQID")
    @ManyToOne
    private WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(Date activityDate) {
        this.activityDate = activityDate;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BuyerDetails getBpBuyerdetailsId() {
        return bpBuyerdetailsId;
    }

    public void setBpBuyerdetailsId(BuyerDetails bpBuyerdetailsId) {
        this.bpBuyerdetailsId = bpBuyerdetailsId;
    }

    public WorkOrderRfqHeader getNgBpWorkorderrfqheaderRfqid() {
        return ngBpWorkorderrfqheaderRfqid;
    }

    public void setNgBpWorkorderrfqheaderRfqid(WorkOrderRfqHeader ngBpWorkorderrfqheaderRfqid) {
        this.ngBpWorkorderrfqheaderRfqid = ngBpWorkorderrfqheaderRfqid;
    }
    
    
}
