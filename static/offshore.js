// What remains to be done?
// 1. Arrows up and down to symbolise the calendar movements.
// 2. Add the latest events - done.
// 3. Update the calendar to something meaningful - done.



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


function get_colour(current_day) {
	var colour;
	if (current_day.Onshore == 0) {
		var colour = "#3498db";
	} else if (current_day.Onshore == 0.5) {
		var colour = "#ecf0f1";
	} else {
		var colour = "#2ecc71";
	}
	return colour;	
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
	}
	return null;
}


function generate_event_list(dates) {
	/*
	** Work through the date data and generate a list of events.
	*/ 
	var events = [];
	var swing_counter = 1;
	var start_date, end_date;
	var recording_event_flag = false;

	for (i = 0; i < dates.length; i++) {
		if (parseInt(dates[i].Onshore) != 1 && recording_event_flag == false) {
			recording_event_flag = true;
			start_date = dates[i].Datetime;
		} 
		else if (parseInt(dates[i].Onshore) == 1 && recording_event_flag == true) {
			recording_event_flag = false;
			end_date = dates[i-2].Datetime;
			var event = {
				"id": 			swing_counter,
				"name": 		"Swing " + swing_counter,
				"startdate":	dateFormat(start_date, "yyyy-m-dd"),
				"enddate": 		dateFormat(end_date, "yyyy-m-dd"),
				"starttime":	"00:00",
				"endtime":		"24:00",
				"color":		"#27ae60",
				"url":			""
			}
			events.push(event);
			swing_counter += 1;
		} 
	};

	return {"monthly": events};
}

$( function() {
	/*
	** Entry point for script
	*/
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
	console.log("The current day is:");
	console.log(dateFormat(next_change, "dddd, mmmm dS"));

	// Present the messages
	var message = get_message(current_day);
	var colour_choice = get_colour(current_day);
	
	// Set the location
	if (current_day.Location != "") {
		var location_message = "He's currently " + current_day.Location;
	} else {
		var location_message = "He's, y'know, around.";
	};

	// Set the next changes
	var next_change = get_next_change(current_day, dates);
	console.log(next_change);
	console.log("The next date change is:");
	console.log(dateFormat(next_change.Datetime, "dddd, mmmm dS"));
	if (next_change.Onshore == 0) {
		var next_change_message = "But he's heading off again on " + 
			dateFormat(next_change.Datetime, "dddd, mmmm dS") + ".";
	} else {
		var next_change_message = "He's coming back onshore on " + 
			dateFormat(next_change.Datetime, "dddd, mmmm dS") + ".";
	}
	
	// Parse our events for the calendar
	console.log("Events list:");
	var event_list = generate_event_list(dates);
	console.log(event_list);


	$(document).ready(function() {
		window.setTimeout(function() {
			fade_in("is_offshore", message);
			var background = document.querySelector("body");
			sweep(background, "backgroundColor", "#FFFFFF",
				colour_choice, {duration: 1500});
			window.setTimeout(function() {
				fade_in("message_1", location_message);
				fade_in("message_2", next_change_message);
			}, 2500);
		}, 2500);
	})
});

// Next jobs:
// Say when I'll be back.
// Cool visualisations. 
