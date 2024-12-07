from frappe import _


def get_data():
	return {
		"fieldname": "supplier",
		"transactions": [
			{
				# "label": _("Reference"),
				"items": ["Supplier Quotation", "Purchase Order"],
			},
		
		],
	}
