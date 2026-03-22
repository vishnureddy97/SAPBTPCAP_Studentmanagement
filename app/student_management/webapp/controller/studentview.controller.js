sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("com.studentmanagement.studentmanagement.controller.studentview", {
        onInit() {
        },
        // onCreate: function (evt) {
		// 	MessageToast.show(evt.getSource().getId() + " Pressed");
		// },
        async onCreate() {
            // create dialog lazily
            this.oDialog ??= await this.loadFragment({
                name: "com.studentmanagement.studentmanagement.view.createDialog"
            });
        
            this.oDialog.open();
        },
        async onUpdate() {
            const oTable = this.byId("student_table");
            const iIndex = oTable.getSelectedIndex();
            if (iIndex === -1) {
            sap.m.MessageToast.show("Please select a row");
            return;
            }
            // Get selected row context (OData V4)
            const oCtx = oTable.getContextByIndex(iIndex);
            this._oEditContext = oCtx; // store for update later
            // Create JSON model for editing (decoupled from OData)
            const oData = oCtx.getObject();
            const oEditModel = new sap.ui.model.json.JSONModel(oData);
             this.getView().setModel(oEditModel, "editModel");
            // create dialog lazily
            this.pDialog ??= await this.loadFragment({
                name: "com.studentmanagement.studentmanagement.view.updateDialog"
            });
            this.getView().addDependent(this.pDialog);
            this.pDialog.open();
        },
        onSaveDialog() {
            var id = this.getView().byId("student_id").getValue();
            var firstname = this.getView().byId("firstname").getValue();
            var lastname = this.getView().byId("lastname").getValue();
            var email = this.getView().byId("email").getValue();
            var age = this.getView().byId("age").getValue();
            var createdat = this.getView().byId("createdat").getValue();
            var payload = { ID: id, 
                            age: age, 
                            createdAt: createdat, 
                            email: email, 
                            firstName: firstname, 
                            lastName: lastname };
            const oTable = this.byId("student_table");
            const oBinding = oTable.getBinding("rows");
            oBinding.create(
                payload
            );
           this.onCloseDialog();         
		},
         onCloseDialog() {
			// note: We don't need to chain to the pDialog promise, since this event handler
			// is only called from within the loaded dialog itself.
           this.getView().byId("student_id").setValue("");
           this.getView().byId("firstname").setValue("");
           this.getView().byId("lastname").setValue("");
           this.getView().byId("email").setValue("");
           this.getView().byId("age").setValue("");
           this.getView().byId("createdat").setValue("");
		    this.byId("createDialog").close();
		},
        onSaveEdit: function () {
        const oEditData = this.getView().getModel("editModel").getData();
         // Update via binding context (OData V4)
        // this._oEditContext.setProperty("student_id", oEditData.student_id);
        this._oEditContext.setProperty("firstName", oEditData.firstname);
        this._oEditContext.setProperty("lastName", oEditData.lastname);
        this._oEditContext.setProperty("email", oEditData.email);
        this._oEditContext.setProperty("age", oEditData.age);
        // this._oEditContext.setProperty("createdAt", Number(oEditData.createdat));
        this.onCloseDialog_update();
         sap.m.MessageToast.show("Student updated successfully");
        },
        onCloseDialog_update() {
			// note: We don't need to chain to the pDialog promise, since this event handler
			// is only called from within the loaded dialog itself.
           this.getView().byId("student_id_up").setValue("");
           this.getView().byId("firstname_up").setValue("");
           this.getView().byId("lastname_up").setValue("");
           this.getView().byId("email_up").setValue("");
           this.getView().byId("age_up").setValue("");
           this.getView().byId("createdat_up").setValue("");
		    this.byId("updateDialog").close();
		},
        onDeleteStudent: function () {
            const oTable = this.byId("student_table");
            const aSelectedIndices = oTable.getSelectedIndices();
            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select rows to delete");
                return;
            }
            MessageBox.confirm("Delete selected students?", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.YES) {
                        for (let i = aSelectedIndices.length - 1; i >= 0; i--) {
                            const oCtx = oTable.getContextByIndex(aSelectedIndices[i]);
                            if (oCtx) {
                                oCtx.delete();
                            }
                        }
                        oTable.clearSelection();
                    }
                }
            });
        }
    });
});