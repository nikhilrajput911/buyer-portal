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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author girivasu-g
 */

@Entity
@Table(name = "NG_BP_Default_RatedParameters")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NG_BP_Default_RatedParameters.findAll", query = "SELECT n FROM NG_BP_Default_RatedParameters n")})
public class NG_BP_Default_RatedParameters implements Serializable {
    
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    
    @Size(max = 300)
    @Column(name = "Parameter")
    private String Parameter;

    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getParameter() {
        return Parameter;
    }

    public void setParameter(String Parameter) {
        this.Parameter = Parameter;
    }
    
    
}
