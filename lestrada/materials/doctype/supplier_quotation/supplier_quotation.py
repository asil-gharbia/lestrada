# Copyright (c) 2024, Asil Gharbia and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _, throw
from frappe.utils import today

class SupplierQuotation(Document):
	
	def validate(self):
		self.validate_valid_till()

	def validate_valid_till(self):
		if self.valid_till:
			if self.valid_till < today():
				throw(_("The 'Valid Till' field can not be before today's date."))
