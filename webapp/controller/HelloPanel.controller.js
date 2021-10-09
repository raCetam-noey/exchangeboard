sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/core/syncStyleClass"
], function (Controller, MessageToast, Fragment, syncStyleClass) {
    "use strict";
    return Controller.extend("walkthrough.controller.HelloPanel", {

        onShowHello: function () {

            // 메시지 i18n에서 읽어오기
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // 메세지 띄우기
            MessageToast.show(sMsg);
        },
        onOpenDialog: function () {

            // 다이얼로그 느리게 (lazily) 만들기
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "walkthrough.view.HelloDialog"
                }).then(function (oDialog) {
                    // 다이얼로그에 스타일 적용
                    syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
                    return oDialog;
                }.bind(this));
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function () {

            this.byId("helloDialog").close();
        }
    });
});