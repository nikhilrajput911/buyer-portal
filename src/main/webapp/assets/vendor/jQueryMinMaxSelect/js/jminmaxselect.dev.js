;(function ($, win, doc) { 'use strict';
$.fn.jMinMaxSelect = function (options) { 
    var defaults = {
        maxSelect: null,
        copyOptions: false,
        createOptions: undefined,
        infWord: 'inf',
        infValue: 'Infinity',
        useInf: false
    }, 
    
    settings = $.extend({}, defaults, options), 
    
    $minSelect = $(this),
    $maxSelect = $(settings.maxSelect),
    
    lastMaxValue = 0,
    
    // cache
    valuesOfMax = {
        values: [],
        texts: []
    },
    
    valuesOfMin = {
        values: [],
        texts: []
    },
    
    setSelectToFirst = function ($select) {
        $select.val($select.find('option:first').val());
    },
    
    convertString = function (numStr) {
        if (settings.useInf && numStr === settings.infValue) {
            return numStr;
        }
        
        if (!isNaN(numStr) && numStr.toString().indexOf('.') !== -1) {
            return +numStr;
        } else if (!isNaN(numStr)) {
            return ~~(1 * numStr);
        } 
        
        return numStr;
    },
    
    getAllValuesOfSelect = function ($select, max) {
	    var values = [],
            texts = [],
            val = 0,
            txt = '',
            $this = null;
            
	    $select.each(function () {
		    $this = $(this);
            val = convertString($this.val());
            txt = $this.text();
		
            if (val > max) {
			    values.push(val);	
                texts.push(txt);
		    }
	    });
        
        // happens if the user choose the max value
        if (values.length === 0) {
		    values.push(val);	
            texts.push(txt);   
        }
	
	    return {
           values: values, 
           texts: texts
        };
    },
    
    resetMaxValue = function (curMinValue) {
        if (curMinValue < lastMaxValue && curMinValue !== -Infinity) {
            return true;
        }
        
        if (settings.useInf && lastMaxValue === settings.infValue) {
            return false;
        }
        
        return false;
    },
    
    setMaxValues = function (optionArray, $maxSelect, curMinValue) {
        var val = 0,
            txt = '';
       
        $maxSelect.empty();
    	
        for (var i in optionArray.texts) {
            val = optionArray.values[i];
            txt = optionArray.texts[i];

    	    $maxSelect.append(
                $("<option></option>")
                    .attr("value", val).text(txt)
            );
        }

        if (resetMaxValue(curMinValue)) {
            $maxSelect.val(lastMaxValue);
        }
    },
    
    // extracts all elements greater then min and returns a new object with values and texts array
    extractElementsGT = function (min) {
        var elements = {
            values: [],
            texts: []
        }, 
        curVal = 0;
        
        for (var i in valuesOfMax.values) {
            curVal =  valuesOfMax.values[i];
            
            if (curVal > min) {
                elements.values.push(curVal);
                elements.texts.push(valuesOfMax.texts[i]);
            }
        }
        
        return elements;
    },
    
    startMinMaxSelect = function () {
        $minSelect.change(function () {
            var curMinValue = $minSelect.val(),
                allOptions = extractElementsGT(curMinValue);
            
            setMaxValues(allOptions, $maxSelect, curMinValue); 
            lastMaxValue = convertString($maxSelect.val());
        });
        
        $maxSelect.change(function () {
            lastMaxValue = convertString($maxSelect.val()); 
        });
    },
    
    removeFirstElements = function (obj) {
        var from = 1, 
            to = valuesOfMax.values.length;
        
        obj.values = obj.values.splice(from, to);
        obj.texts = obj.texts.splice(from, to);
        
        if (settings.useInf) {
            obj.values.push(settings.infValue);
            obj.texts.push(settings.infWord);
        }
    },
    
    removeLastElements = function (obj) {
        // because if there is an infinity element there is no need to delete 
        // the highest value
        if (!settings.useInf) {
            obj.values.pop();
            obj.texts.pop();
        }
    },
    
    createOptionsFromParameterObject = function (settings) {        
        for (var key in settings) {
            var val = settings[key];
            valuesOfMin.values.push(val);
            valuesOfMin.texts.push(key);
            valuesOfMax.values.push(val);
            valuesOfMax.texts.push(key);
        }  
        
        removeFirstElements(valuesOfMax);
        removeLastElements(valuesOfMin);
        
        setMaxValues(valuesOfMin, $minSelect, -Infinity);
        setMaxValues(valuesOfMax, $maxSelect, -Infinity);
        setSelectToFirst($maxSelect);
    },
    
    copyOptionsFromMinToMax = function () {
        valuesOfMin = getAllValuesOfSelect($minSelect.find('option'), -Infinity);
        
        for (var key in valuesOfMin.texts) {
            valuesOfMax.values.push(valuesOfMin.values[key]);
            valuesOfMax.texts.push(valuesOfMin.texts[key]);
        }  

        removeFirstElements(valuesOfMax);
        removeLastElements(valuesOfMin);
        
        setMaxValues(valuesOfMax , $maxSelect, -Infinity);
        setMaxValues(valuesOfMin , $minSelect, -Infinity);
        setSelectToFirst($maxSelect);
    };
    
    if (typeof settings.createOptions !== 'undefined') { 
        createOptionsFromParameterObject(settings.createOptions);
    } else if (settings.copyOptions) {
        copyOptionsFromMinToMax();
    } else {
        valuesOfMin = getAllValuesOfSelect($minSelect.find('option'), -Infinity);
        valuesOfMax = getAllValuesOfSelect($maxSelect.find('option'), -Infinity);
    }
    
    startMinMaxSelect();
return this; };}(jQuery, window, document));