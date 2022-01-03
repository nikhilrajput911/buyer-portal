/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author admin
 */
@Entity
public class PoRunningSequenceBean implements Serializable{
    
    @Id
    private Integer poRunningSeqNo;

    public Integer getPoRunningSeqNo() {
        return poRunningSeqNo;
    }

    public void setPoRunningSeqNo(Integer poRunningSeqNo) {
        this.poRunningSeqNo = poRunningSeqNo;
    }
    
}
