# Copyright (c) 2024, Asil Gharbia and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	conditions = get_conditions(filters)
	columns, data =  get_columns(), get_data(conditions)
	return columns, data

def get_columns():
    
    columns = [
        {
            # "label": _("<b>Name</b>"),
            "label": _("Name"),
            "fieldname": "name",
            "fieldtype": "Link",
            "options": "Material Request",
            "width": 150,
            "align":"center",

        },
        {
            "label": _("Required On"),
            "fieldname": "required_on",
            "fieldtype": "Date",
            "width": 120,
            "align":"center",
        },
        {
            "label": _("Purpose"),
            "fieldname": "purpose",
            "fieldtype": "Data",
            "width": 100,
            "align":"center",
        },
        {
            "label": _("Project"),
            "fieldname": "project",
            "fieldtype": "Link",
            "options": "Project",
            "width": 120,
            "align":"center",
        },
        {
            "label": _("Request Date"),
            "fieldname": "request_date",
            "fieldtype": "Date",
            "width": 120,
            "align":"center",
        },
        {
            "label": _("Request By"),
            "fieldname": "request_by",
            "fieldtype": "Link",
            "options": "User",
            "width": 150,
            "align":"center",
			
        },
        {
            "label": _("Status"),
            "fieldname": "status",
            "fieldtype": "Data",
            "width": 150,
            "align":"center",
        },
        {
            "label": _("Total Quantity"),
            "fieldname": "total_quantity",
            "fieldtype": "Float",
            "width": 120,
            "align":"center",
        },
	]
    return columns

def get_data(conditions):
    
    data = frappe.db.sql(
        f""" SELECT name, required_on, purpose, project, request_date, request_by, status, total_quantity
          FROM `tabMaterial Request` {conditions}""", as_dict=True)
    
    return data

def get_conditions(filters):
    condition_query = []
    
    request_date_from = filters.get("request_date_from")
    request_date_to = filters.get("request_date_to")
    purpose = filters.get("purpose")
    project = filters.get("project")
    request_by = filters.get("request_by")
    status = filters.get("status")
    required_on = filters.get("required_on")
    
    # {0}' ".format(employee)
    if request_date_from and request_date_to:
        condition_query.append("request_date BETWEEN '{0}' AND '{1}'".format(request_date_from,request_date_to))
    
    if purpose:
        condition_query.append(" purpose = '{0}' ".format(purpose))
    
    if project:
        condition_query.append(" project ='{0}' ".format(project))

    if request_by:
        condition_query.append(" request_by = '{0}' ".format(request_by))
    
    if status:
        condition_query.append(" status = '{0}' ".format(status))

    if required_on:
        condition_query.append(" required_on = '{0}' ".format(required_on))
    

    conditions = " AND ".join(condition_query)
    
    if conditions:
        conditions = f"WHERE {conditions}"
        
    print(conditions)
    return conditions
    
    
        
    
