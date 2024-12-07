
function calculate_amount(frm, cdt, cdn) {
  
    let row = locals[cdt][cdn];
    let rate = row.rate || 0;
    let quantity = row.quantity || 0;

    row.amount = rate * quantity;
    frm.refresh_field('items');
	sum_amount(frm);
}

function sum_quantity(frm) {
  
    let sum_q = 0;
	frm.doc.items.forEach((row) => {
		if(row.quantity){
			sum_q +=row.quantity;
		}
	});
    frm.doc.total_quantity = sum_q;
    frm.refresh_field('total_quantity');
}

function sum_amount(frm) {
  
    let sum_a = 0;
	frm.doc.items.forEach((row) => {
		if(row.amount){
			sum_a +=row.amount;
		}
	});
    frm.doc.total_amount = sum_a;
    frm.refresh_field('total_amount');
	calculate_grand_total(frm);
}

function calculate_grand_total(frm) {
	let t_amount = frm.doc.total_amount || 0;
    let tax = frm.doc.taxes_and_charges || 0;
	frm.doc.grand_total = t_amount + tax;
	frm.refresh_field('grand_total');
}
