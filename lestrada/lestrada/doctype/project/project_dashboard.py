from frappe import _


def get_data():
	return {
		"fieldname": "project",
		"transactions": [
			{
				# "label": _("Reference"),
				"items": ["Material Request", "Purchase Order"],
			},
		
		],
	}
