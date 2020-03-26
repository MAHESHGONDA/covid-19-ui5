sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.sapyard.covid19.controller.App", {
		onInit: function () {
			this.statsInterval = null;
			this.selectedItem = null;
			this.covidModel = new JSONModel({
				data: [],
				topTenData: [],
				selectedData: {},
				selectedCountry: "",
				bottomPanelVisible: false
			});
			this.covidModel.setSizeLimit(1500);
			this.getView().setModel(this.covidModel);
			this.getCovidAllCountryData();

			this.getLiveData();

		},
		getLiveData: function () {
			debugger;
			this.statsInterval = setInterval(this.getCovidAllCountryData.bind(this), 60000);
			// setin(this.getCovidAllCountryData.bind(this), 60000);
		},

		getCovidAllCountryData: function () {

			this.covidModel.setProperty("/data", []);
			// var oModel = new JSONModel(Device);
			// oModel.loadData(https: //pomber.github.io/covid19/timeseries.json);
			$.ajax({
				// url: "https://pomber.github.io/covid19/timeseries.json",
				url: "https://coronavirus-19-api.herokuapp.com/countries",
				success: this.onCovidDataSuccess.bind(this),
				error: this.onCovidDataFail.bind(this)
			});
			//  
		},
		onCovidDataSuccess: function (aCountry) {
			debugger;
			this.covidModel.setProperty("/data", aCountry);
			this.covidModel.setProperty("/topTenData", aCountry.slice(0, 5));
			this.getCovidOverview();

		},
		onCovidDataFail: function (data) {

		},
		getCovidOverview: function () {

			$.ajax({
				url: "https://coronavirus-19-api.herokuapp.com/all",
				success: this.ongetCovidOverviewSuccess.bind(this),
				error: this.ongetCovidOverviewFail.bind(this)
			});

		},
		ongetCovidOverviewSuccess: function (data) {
			this.global = data;
			this.global.country = "Global";
			this.global.text = this.global.country;

			this.covidModel.getProperty("/data").push(this.global);
			this.covidModel.refresh(true);
			this.setDefault();
		},
		ongetCovidOverviewFail: function (error) {

		},
		setDefault: function () {
			debugger;
			var oCombobox = this.getView().byId("overviewId");
			// var selectedKey = oCombobox.getSelectedKey();
			if (this.selectedItem) {
				oCombobox.setSelectedKey(this.selectedItem.getKey());
				this.handleBottomPanelVisiblility();
			} else {
				this.handleBottomPanelVisiblility();
				oCombobox.setSelectedKey("Global");
			}

			// var oEvent = new sap.ui.base.Event(oCombobox.getId(), oCombobox, this.global);
			oCombobox.fireSelectionChange();

		},

		onCountrySelect: function (oEvent) {

			var selectedItem = oEvent.getSource().getSelectedItem();
			this.handleBottomPanelVisiblility();
			// var selectedItem = oEvent.getParameter('selectedItem');
			if (selectedItem) {
				this.selectedItem = selectedItem;
				this.covidModel.setProperty("/selectedData", selectedItem.getBindingContext().getObject())
			}

		},
		handleBottomPanelVisiblility: function () {
			var oCombobox = this.getView().byId("overviewId");
			this.covidModel.setProperty("/selectedCountry", oCombobox.getSelectedKey());
			if (oCombobox.getSelectedKey() === "Global") {
				this.covidModel.setProperty("/bottomPanelVisible", false);
			} else {
				this.covidModel.setProperty("/bottomPanelVisible", true);
			}

		},
		onExit: function () {
			if (this.statsInterval) {
				clearInterval(this.statsInterval);
			}

		}
	});
});