
function validate_notes_field(frm) {
    if(frm.doc.note){
        const alphanumeric = /^[a-zA-Z0-9\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\s.,']+$/;
        if (!alphanumeric.test(frm.doc.note)) {
            frappe.throw(__("Note must only contain letters, numbers, spaces, and the characters . , ' "));
        }
    }
}