/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author admin
 */
@Embeddable
public class NGExtPRToPOPK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "ItemIndex")
    private String itemIndex;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 5)
    @Column(name = "ItemType")
    private String itemType;

    public NGExtPRToPOPK() {
    }

    public NGExtPRToPOPK(String itemIndex, String itemType) {
        this.itemIndex = itemIndex;
        this.itemType = itemType;
    }

    public String getItemIndex() {
        return itemIndex;
    }

    public void setItemIndex(String itemIndex) {
        this.itemIndex = itemIndex;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (itemIndex != null ? itemIndex.hashCode() : 0);
        hash += (itemType != null ? itemType.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGExtPRToPOPK)) {
            return false;
        }
        NGExtPRToPOPK other = (NGExtPRToPOPK) object;
        if ((this.itemIndex == null && other.itemIndex != null) || (this.itemIndex != null && !this.itemIndex.equals(other.itemIndex))) {
            return false;
        }
        if ((this.itemType == null && other.itemType != null) || (this.itemType != null && !this.itemType.equals(other.itemType))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGExtPRToPOPK[ itemIndex=" + itemIndex + ", itemType=" + itemType + " ]";
    }
    
}
