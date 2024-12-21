# Copyright (c) 2024, Asil Gharbia and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _, throw
from frappe.utils import today

class PurchaseOrder(Document):
	def validate(self):
		self.validate_required_date()

	def validate_required_date(self):
		if self.required_on < today() :
			throw(_("The 'Required on' field can not be before today's date."))
