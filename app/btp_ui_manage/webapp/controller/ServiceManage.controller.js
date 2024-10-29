sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("btpuimanage.controller.ServiceManage", {

        onInit: function () {
            // Inicializa o modelo JSON com uma estrutura de dados para novos clientes e produtos
            const oData = {
                newCustomer: {
                    name: "",
                    contact: "",
                    email: ""
                },
                newProduct: {
                    name: "",
                    description: "",
                    price: null,
                    quantity: null
                }
            };
            // Cria o modelo JSON e define os dados iniciais
            const oModel = new JSONModel(oData);

            // Configura o modelo na view como "localData"
            this.getView().setModel(oModel, "localData");
        },

        // Abrir diálogo de registro de cliente
        onRegisterCustomer: function () {
            this.byId("idDialogCustomer").open();
        },

        // Abrir diálogo de registro de produto
        onRegisterProduct: function () {
            this.byId("idDialogProduct").open();
        },

        // Fechar diálogo de registro de cliente
        onCloseDialogCustomer: function () {
            this.byId("idDialogCustomer").close();
        },

        // Fechar diálogo de registro de produto
        onCloseDialogProduct: function () {
            this.byId("idDialogProduct").close();
        },

        // Salvar dados do cliente no serviço OData
        onSaveDialogCustomer: function () {
            let oModel = this.getView().getModel(); // Modelo OData definido no manifest.json
            let oLocalData = this.getView().getModel("localData").getProperty("/newCustomer");

            oModel.create("/Customers", oLocalData, {
                success: function () {
                    MessageToast.show("Cliente registrado com sucesso!");
                    // this._clearCustomerData();
                    this.onCloseDialogCustomer();
                }.bind(this),
                error: function (oError) {
                    MessageToast.show("Erro ao registrar cliente.");
                    console.error(oError);
                }
            });
            console.log("onSaveDialogCustomer")
        },

        // Salvar dados do produto no serviço OData
        onSaveDialogProduct: function () {
            let oModel = this.getView().getModel(); // Modelo OData definido no manifest.json
            let oLocalData = this.getView().getModel("localData").getProperty("/newProduct");

            oModel.create("/Products", oLocalData, {
                success: function () {
                    MessageToast.show("Produto registrado com sucesso!");
                    // this._clearProductData();
                    this.onCloseDialogProduct();
                }.bind(this),
                error: function (oError) {
                    MessageToast.show("Erro ao registrar produto.");
                    console.error(oError);
                }
            });
        },

        // Método de busca para clientes (ajuste conforme necessário)
        onSearchCustomer: function (oEvent) {
            let sQuery = oEvent.getParameter("query");
            if (sQuery) {
                let oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
                let oBinding = this.byId("idCustomersTable").getBinding("items");
                oBinding.filter([oFilter]);
            } else {
                this.byId("idCustomersTable").getBinding("items").filter([]);
            }
        },

        // Método de busca para produtos (ajuste conforme necessário)
        onSearchProduct: function (oEvent) {
            let sQuery = oEvent.getParameter("query");
            if (sQuery) {
                let oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
                let oBinding = this.byId("idProductsTable").getBinding("items");
                oBinding.filter([oFilter]);
            } else {
                this.byId("idProductsTable").getBinding("items").filter([]);
            }
        },

        // // Limpa os dados do cliente após o registro
        // _clearCustomerData: function () {
        //     this.getView().getModel("localData").setProperty("/newCustomer", {
        //         name: "",
        //         contact: "",
        //         email: ""
        //     });
        // },

        // // Limpa os dados do produto após o registro
        // _clearProductData: function () {
        //     this.getView().getModel("localData").setProperty("/newProduct", {
        //         name: "",
        //         description: "",
        //         price: null,
        //         quantity: null
        //     });
        // }

    });
});
