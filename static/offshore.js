

function do_days_match(reference_date, date) {
	/*
	** is the date the same _day_ as the reference date?
	*/
	
	if (reference_date.getDate() != date.getDate()) {
		return false;
	} else if (reference_date.getMonth() != date.getMonth()) {
		return false;
	} else if (reference_date.getYear() != date.getYear()) {
		return false;
	} else {
		return true;
	}
}

function match_day_to_data(day, data) {
	/*
	** Given a set of data and a given day, match the two
	*/
	for (i = 0; i < data.length; i++ ) {
		if (do_days_match(day, data[i].Datetime)) {
			console.log(i);
			return data[i];
		}
	};
	return {
		// Update me as the data structure changes.
		"Datetime": day,
		"Onshore": 1,
	};
}

function fade_in(id, message) { 
	id_obj = document.getElementById(id);
	id_obj.textContent = message;
	id_obj.style.transitionDuration = "2s";
	id_obj.style.opacity = 100;
}

function get_message(current_day) {
	var message;
	console.log(current_day);
	if (current_day.Onshore == 0) {
		var message = "Yes, he is.";
	} else if (current_day.Onshore == 0.5) {
		var message = "He'll be back later today.";
	} else {
		var message = "No, he's not.";
	}
	return message;
}

function get_next_change(reference_day, dates) {
	/*
	** For a given day, when will the next significant change take place?
	** What will that be?
	*/
	if (reference_day.Onshore == 0.5) {
		reference_day.Onshore = 1;
	};
	
	for (i = reference_day.Index + 1; i < dates.length; i++) {
		if (dates[i].Onshore != reference_day.Onshore) {
			return dates[i];
		};
	return null;
	}
	
}

$( function() {
	console.log("hello, world!");
	dates = $.csv.toObjects(data); // 'data' is defined by a previous JS import
	for (i = 0; i < dates.length; i++ ) {
		dates[i].Datetime = new Date(Date.parse(dates[i].Datetime));
		dates[i].Index = parseInt(dates[i].Index);
	};
	
	// Check if I'm offshore
	var is_offshore = false;
	var current_date = new Date();
	var current_day = match_day_to_data(current_date, dates)
	
	var next_change = get_next_change(current_day, dates);
	console.log(next_change);
	
	// Present the message
	var message = get_message(current_day);
	
	$(document).ready(function() {
		window.setTimeout(function() {
			fade_in("is_offshore", message);
		}, 2500);
	})
});

// Next jobs:
// Say when I'll be back.
// Cool visualisations. 