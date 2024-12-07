// Copyright (c) 2024, Asil Gharbia and contributors
// For license information, please see license.txt
{% include 'lestrada/public/js/validation.js' %}
{% include 'lestrada/public/js/methods.js' %}

frappe.ui.form.on('Material Request', {

	before_load: function (frm) {
		if (frm.is_new()) {
			const today = new Date();
			frm.doc.request_date = today;
			frm.refresh_field("request_date");
			frm.doc.request_by = frappe.session.user;
			frm.refresh_field("request_by");
			}
	},

	validate:function (frm) {
		validate_notes_field(frm);
	},

	before_save:function (frm) {
		validate_notes_field(frm);
	},

	refresh: function (frm) {
        if (frm.doc.docstatus == 1) {  //Ensure doc is submitted.
            frm.add_custom_button(
                __("Supplier Quotation"),
                function () {
                    frappe.model.open_mapped_doc({
                        frm: frm,
                        method: "lestrada.mappers.map_supplier_quotation",
                    });
                },
            ).css({'background-color': '#2490EF', 'color': 'white'});  // styling for the button
        }
    },

});

frappe.ui.form.on('Material Request Item', {
    items_remove:function(frm, cdt, cdn) {
		sum_quantity(frm);
	},

    quantity: function(frm, cdt, cdn) {
		sum_quantity(frm);
    }
});
