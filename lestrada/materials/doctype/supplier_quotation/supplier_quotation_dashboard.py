from frappe import _


def get_data():
	return {
		"docstatus": 1,
		"fieldname": "supplier_quotation",
		"transactions": [
			{
				# "label": _("Reference"),
				"items": ["Purchase Order"],
			},
		
		],
	}
