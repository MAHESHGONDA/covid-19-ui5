sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/sapyard/covid19/model/models","sap/ui/model/json/JSONModel"],function(e,i,t,o){"use strict";return e.extend("com.sapyard.covid19.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});