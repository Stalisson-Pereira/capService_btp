sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, JSONModel, Filter, FilterOperator) {
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
            const oModel = this.getView().getModel("localData");
            const oNewCustomer = oModel.getProperty("/newCustomer");

            // Adiciona o novo cliente à lista de clientes
            const aCustomers = oModel.getProperty("/Customers");
            aCustomers.push({
                description: oNewCustomer.name,
                contact: oNewCustomer.contact,
                email: oNewCustomer.email
            });
            oModel.setProperty("/Customers", aCustomers);

            // Confirmação e limpeza do formulário
            MessageToast.show("Cliente registrado com sucesso!");
            oModel.setProperty("/newCustomer", { name: "", contact: "", email: "" });
            this.byId("idDialogCustomer").close();
        },

        onCloseDialogCustomer: function () {
            this.byId("idDialogCustomer").close();
        },

        // Ações para o registro de produtos
        onRegisterProduct: function () {
            this.byId("idDialogProduct").open();
        },

        onSaveDialogProduct: function () {
            const oModel = this.getView().getModel("localData");
            const oNewProduct = {
                name: this.byId("idInputProductName").getValue(),
                description: this.byId("idInputProductDesc").getValue(),
                price: parseFloat(this.byId("idInputProductPrice").getValue()) || 0,
                quantity: parseInt(this.byId("idInputProductQuant").getValue(), 10) || 0
            };

            // Adiciona o novo produto à lista de produtos
            const aProducts = oModel.getProperty("/Products");
            aProducts.push(oNewProduct);
            oModel.setProperty("/Products", aProducts);

            // Confirmação e limpeza do formulário
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
            const sQuery = oEvent.getParameter("query");
            const oBinding = this.byId("idCustomersTable").getBinding("items");
            const aFilters = sQuery ? [new Filter("description", FilterOperator.Contains, sQuery)] : [];
            oBinding.filter(aFilters);
        },

        onSearchProduct: function (oEvent) {
            const sQuery = oEvent.getParameter("query");
            const oBinding = this.byId("idProductsTable").getBinding("items");
            const aFilters = sQuery ? [new Filter("name", FilterOperator.Contains, sQuery)] : [];
            oBinding.filter(aFilters);
        }
    });
});
