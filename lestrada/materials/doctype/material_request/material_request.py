# Copyright (c) 2024, Asil Gharbia and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _, throw
from frappe.utils import today
from datetime import datetime

class MaterialRequest(Document):
	
	def validate(self):
		self.validate_required_date()
	

	def validate_required_date(self):
		today_object = datetime.strptime(str(today()), '%Y-%m-%d').date()
		required_on_object = datetime.strptime(str(self.required_on), '%Y-%m-%d').date() 
		if required_on_object < today_object :
			throw(_("The 'Required on' field can not be before today's date."))
