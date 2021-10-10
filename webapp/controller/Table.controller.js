sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/routing/History",
    "sap/ui/table/RowSettings",
    "sap/ui/thirdparty/jquery",
    "sap/m/MessageToast"
], function (controller, JSONModel, formatter, History, RowSettings, jQuery, MessageToast) {
    "use strict";

    return controller.extend("walkthrough.controller.Table", {

        
        	_data : {
				"KRW" : [1000,"KRW"],
				"USD" : [0.00084,"USD"],
				"JPY" : [0.094,"JPY"],
				"EUR" : [0.00072,"EUR"]
            },
            
            formatter: formatter,
            
			onInit : function () {
				var oModel = new JSONModel(this._data, {currency: "KRW"});
				this.getView().setModel(oModel);	

				this.getView().setModel(new JSONModel([
					{
						currencyName    : "달러",
						currencyType    : "USD",
						rate            : null,
						value           : null
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
			},

			onPress: function(){


				console.log(this.getView().byId("input1").getValue())
				var inputField1 = this.getView().byId("input1");
					if(!inputField1.getValue()){
						inputField1.setValueState("Error");
						inputField1.setValueStateText("금액을 입력해주세요");
						inputField1.focus(inputField1);
					}else{
						inputField1.setValueState("Success");
						inputField1.setValueStateText("계산이 완료되었습니다");
						MessageToast.show("계산이 완료되었습니다", {
							my: "center bottom",
							at: "center center"
						});
						inputField1.focus(inputField1);
					}
				var inputField2 = this.getView().byId("input2")
					if(!inputField2.getValue()){
						inputField2.setValueState("Error");
						inputField2.setValueStateText("값이 없어요");
						
					}else{
						inputField2.setValueState("None");
						inputField2.setValueStateText("");
					}
				var inputField3 = this.getView().byId("input3")
					if(!inputField3.getValue()){
						inputField3.setValueState("Error");
						inputField3.setValueStateText("값이 없어요");
						
					}else{
						inputField3.setValueState("None");
						inputField3.setValueStateText("");
					}
				var inputField4 = this.getView().byId("input4")
					if(!inputField4.getValue()){
						inputField4.setValueState("Error");
						inputField4.setValueStateText("값이 없어요");
						
					}else{
						inputField4.setValueState("None");
						inputField4.setValueStateText("");
					}
			


				let oTableData = this.getView().getModel("tableData").getProperty("/");

				oTableData[0].rate = inputField2.getValue();
				oTableData[1].rate = inputField3.getValue();
				oTableData[2].rate = inputField4.getValue();

				for (var i=0; i<oTableData.length; i++) {
				
				// parseFloat(oTableDataModel[i].rate);
				console.log(isNaN(oTableData[i].rate));
			
				oTableData[i].value = oTableData[i].rate * inputField1.getValue(); 
				console.log(oTableData);
			}
					
				this.getView().getModel("tableData").refresh(true) ;
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