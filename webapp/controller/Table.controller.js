sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/routing/History",
    "sap/ui/table/RowSettings",
	"sap/ui/thirdparty/jquery"
], function (controller, JSONModel, formatter, History, RowSettings, jQuery) {
    "use strict";

    return controller.extend("walkthrough.controller.Table", {
        formatter: formatter,
        
        onInit: function () {
            var oViewModel = new JSONModel({
                currency: "KRW"
            });
            this.getView().setModel(oViewModel, "view")

            this.getView().setModel(new JSONModel([
                {
                    currencyName    : "달러",
                    currencyType    : "USD",
                    rate            : null,
                    value           : 12.23523
                },
                {
                    currencyName    : "유로",
                    currencyType    : "EUR",
                    rate            : null,
                    value           : null
                },
                {
                    currencyName    : "엔화",
                    currencyType    : "JPY",
                    rate            : null,
                    value           : null
                }
            ]),"tableData");

            this.getView().setModel(new JSONModel({euroInput : null}), "inputSample")
        },
        
        onPressBTN: function(oEvent){
            console.log(this.getView().byId("input1").getValue())
            var amountInputField = this.getView().byId("input1");
            if(!amountInputField.getValue()){
                amountInputField.setValueState("Error");
                amountInputField.setValueStateText("값이 없어요");
                amountInputField.focus();
            }else{
                amountInputField.setValueState("None");
                amountInputField.setValueStateText("");
            }



            var oTableDataModel = this.getView().getModel("tableData").getProperty("/");
            for(var i=0; i<oTableDataModel.length; i++){
                oTableDataModel[i].value = oTableDataModel[i].rate * amountInputField.getValue();
            }
        },

        onChange: function(oEvent){
            var inputItem = oEvent.getSource();

            // 정규식 사용
            var regex = /[^0-9]/g;
            var result = inputItem.getValue().replace(regex, "");
            inputItem.setValue(result);
        },

        onLiveChange: function(oEvent){
            var inputItem = oEvent.getSource();
        },

	});
});