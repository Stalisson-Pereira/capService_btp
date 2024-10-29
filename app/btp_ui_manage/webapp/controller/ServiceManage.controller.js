sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog"
], function (Controller, MessageToast, JSONModel, Dialog) {
    "use strict";

    return Controller.extend("btpuimanage.controller.ServiceManage", {

        onInit: function () {
            // Inicializa o JSONModel com dados vazios para novos clientes e produtos
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
                },
                Customers: [],
                Products: []
            };
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "localData");
        },

        // Ações para o registro de clientes
        onRegisterCustomer: function () {
            this.byId("idDialogCustomer").open();
        },

        onSaveDialogCustomer: function () {
            const oLocalData = this.getView().getModel("localData");
            const oCustomerData = oLocalData.getProperty("/newCustomer");

            // Adiciona o novo cliente na lista de clientes
            let aCustomers = oLocalData.getProperty("/Customers");
            aCustomers.push({
                description: oCustomerData.name,
                contact: oCustomerData.contact,
                email: oCustomerData.email
            });
            oLocalData.setProperty("/Customers", aCustomers);

            // Mostra uma confirmação e limpa os campos do formulário
            MessageToast.show("Cliente registrado com sucesso!");
            oLocalData.setProperty("/newCustomer", { name: "", contact: "", email: "" });
            this.byId("idDialogCustomer").close();
            console.log("onSaveDialogCustomer")
        },

        onCloseDialogCustomer: function () {
            this.byId("idDialogCustomer").close();
        },

        // Ações para o registro de produtos
        onRegisterProduct: function () {
            this.byId("idDialogProduct").open();
        },

        onSaveDialogProduct: function () {
            const oLocalData = this.getView().getModel("localData");
            const oProductData = {
                name: this.byId("idInputProductName").getValue(),
                descr: this.byId("idInputProductDesc").getValue(),
                price: parseFloat(this.byId("idInputProductPrice").getValue()) || 0,
                stock: parseInt(this.byId("idInputProductQuant").getValue(), 10) || 0
            };

            // Adiciona o novo produto à lista de produtos
            let aProducts = oLocalData.getProperty("/Products");
            aProducts.push(oProductData);
            oLocalData.setProperty("/Products", aProducts);

            // Mostra uma confirmação e limpa os campos do formulário
            MessageToast.show("Produto registrado com sucesso!");
            this.byId("idInputProductName").setValue("");
            this.byId("idInputProductDesc").setValue("");
            this.byId("idInputProductPrice").setValue("");
            this.byId("idInputProductQuant").setValue("");
            this.byId("idDialogProduct").close();
        },

        onCloseDialogProduct: function () {
            this.byId("idDialogProduct").close();
        },

        // Funções de busca para Clientes e Produtos
        onSearchCustomer: function (oEvent) {
            const sQuery = oEvent.getParameter("query").toLowerCase();
            const oTable = this.byId("idCustomersTable");
            const oBinding = oTable.getBinding("items");

            // Filtra a tabela de clientes com base na consulta
            oBinding.filter(new sap.ui.model.Filter({
                path: "description",
                operator: sap.ui.model.FilterOperator.Contains,
                value1: sQuery
            }));
        },

        onSearchProduct: function (oEvent) {
            const sQuery = oEvent.getParameter("query").toLowerCase();
            const oTable = this.byId("idProductsTable");
            const oBinding = oTable.getBinding("items");

            // Filtra a tabela de produtos com base na consulta
            oBinding.filter(new sap.ui.model.Filter({
                path: "name",
                operator: sap.ui.model.FilterOperator.Contains,
                value1: sQuery
            }));
        }
    });
});
