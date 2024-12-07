from frappe import _


def get_data():
	return {
		"docstatus": 1,
		"fieldname": "material_request",
		"transactions": [
			{
				# "label": _("Reference"),
				"items": ["Supplier Quotation", "Purchase Order"],
			},
		
		],
	}
