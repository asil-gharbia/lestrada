// Copyright (c) 2024, Asil Gharbia and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Material Request Report"] = {
	"filters": [
		{
			label: __("Purpose"),
			fieldname: "purpose",
			fieldtype: "Select",
			options: ["Purchase","Material Transfer"],
		},
		{
			label: __("Project"),
			fieldname: "project",
			fieldtype: "Link",
			options: "Project",
		},
		{
			label: __("Request By"),
			fieldname: "request_by",
			fieldtype: "Link",
			options: "User",
		},
		{
			label: __("Status"),
			fieldname: "status",
			fieldtype: "Select",
			options: [
				"Draft",
				"First Approval",
				"Second Approval",
				"Final Approval",
				"Rejected",
				"Cancelled",
			],
		},
		{
            "label": __("Request Date From"),
            "fieldname": "request_date_from",
            "fieldtype": "Date",
			"default": frappe.datetime.month_start(frappe.datetime.get_today()),
		},
        {
            "label": __("Request Date To"),
            "fieldname": "request_date_to",
            "fieldtype": "Date",
            "default": frappe.datetime.month_end(frappe.datetime.get_today()),
        },
        {
            "label": __("Required On"),
            "fieldname": "required_on",
            "fieldtype": "Date",
        },
	],
	"onload": function(report) {
        report.page.add_inner_button(__("Clear Filters"), function() {
            report.set_filter_value("purpose", null);
            report.set_filter_value("project", null);
            report.set_filter_value("request_by", null);
            report.set_filter_value("status", null);
			report.set_filter_value("request_date_from", null);
			report.set_filter_value("request_date_to", null);
			report.set_filter_value("required_on", null);
        }).css({'background-color': '#2490EF', 'color': 'white'});  // styling for the button;
    },
	"formatter": function (value, row, column, data, default_formatter) {
        if (column.fieldname === "name") {
            value = `<a style="color: #2081d7 ; font-weight: 500; " href="/app/material-request/${data['name']}" target="_blank">${value}</a>`;
        }
        return value;
    },
};
