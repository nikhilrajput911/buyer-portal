/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.newgenControl;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ramkrishnan.elango
 */
@XmlRootElement(name = "InputCriteria")
public class InputBeanOla {
            
    private String pid;

    public String getPid() {
        return pid;
    }
    @XmlElement(name = "pid")
    public void setPid(String pid) {
        this.pid = pid;
    }
    
    
    
}
