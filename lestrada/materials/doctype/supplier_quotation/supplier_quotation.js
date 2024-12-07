// Copyright (c) 2024, Asil Gharbia and contributors
// For license information, please see license.txt
{% include 'lestrada/public/js/validation.js' %}
{% include 'lestrada/public/js/methods.js' %}

frappe.ui.form.on('Supplier Quotation', {
	before_load: function (frm) {
		if (frm.is_new()) {
			const today = new Date();
			frm.doc.date = today;
			frm.refresh_field("date");
			}
	},
	
	refresh: function (frm) {
	
		if (frm.doc.docstatus == 1) {//Ensure doc is submitted.
		  frm.add_custom_button(
			__("Purchase Order"),
			function () {
				frappe.model.open_mapped_doc({
					method: "lestrada.mappers.map_purchase_order",
					frm: frm,
				});
			},
		).css({'background-color': '#2490EF', 'color': 'white'});  // styling for the button
		}
	},

	taxes_and_charges:function (frm) {
		calculate_grand_total(frm);
	},

	validate:function (frm) {
		validate_notes_field(frm);
	},

	before_save:function (frm) {
		validate_notes_field(frm);
	},
	

});

frappe.ui.form.on('Supplier Quotation Item', {
    items_remove:function(frm, cdt, cdn) {
		sum_quantity(frm);
		sum_amount(frm);
	},

	rate: function(frm, cdt, cdn) {
        calculate_amount(frm, cdt, cdn);
    },
    quantity: function(frm, cdt, cdn) {
        calculate_amount(frm, cdt, cdn);
		sum_quantity(frm);
    }
});


