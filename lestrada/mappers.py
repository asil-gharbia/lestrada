import frappe
from frappe import _, throw, msgprint
from frappe.model.mapper import get_mapped_doc

# map from Material Request to Supplier Quotation.
@frappe.whitelist()
def map_supplier_quotation(source, target=None):
		
	def set_missing_values(source, target):
		
		target.valid_till = source.required_on  
		target.run_method("set_missing_values")

	doc = get_mapped_doc(
		"Material Request",  # Source doctype
		source,
			{
				"Material Request": {
					"doctype": "Supplier Quotation",
					"field_map": {
				
						# "field_in_source": "field_in_target",
					},
				},
				
				"Material Request Item": {
					"doctype": "Supplier Quotation Item",
					"field_map": {
						# "item_code": "item_code",
					},
				},
			},
		target,  
		set_missing_values
		)
	return doc


# map from Supplier Quotation to Purchase Order. 
@frappe.whitelist()
def map_purchase_order(source, target=None):
   	
	def set_missing_values(source, target):
		for row in  source.items:
			if row.material_request:
				mr_doc = frappe.get_doc("Material Request", row.material_request)
				if mr_doc.project:
					target.project = mr_doc.project
				if mr_doc.required_on:
					target.required_on = mr_doc.required_on
				break
		target.run_method("set_missing_values")

	doc = get_mapped_doc(
		"Supplier Quotation",  # Source doctype
		source,
			{
				"Supplier Quotation": {
					"doctype": "Purchase Order",
					"field_map": {
						# "field_in_source": "field_in_target",
					},
				},
				
				"Supplier Quotation Item": {
					"doctype": "Purchase Order Item",
					"field_map": {},
				},
			},
		target,  
		set_missing_values
		)
	return doc
