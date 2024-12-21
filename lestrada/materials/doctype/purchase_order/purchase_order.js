// Copyright (c) 2024, Asil Gharbia and contributors
// For license information, please see license.txt
{% include 'lestrada/public/js/validation.js' %}
{% include 'lestrada/public/js/methods.js' %}

frappe.ui.form.on('Purchase Order', {
	
	before_load: function (frm) {
		if (frm.is_new()) {
			const today = new Date();
			frm.doc.date = today;
			frm.refresh_field("date");
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

frappe.ui.form.on('Purchase Order Item', {
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
