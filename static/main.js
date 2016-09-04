function fade_in(id) {
	id_obj = document.getElementById(id);
	id_obj.style.opacity = 0;
	id_obj.textContent = "There is literally nothing.";
	id_obj.style.transitionDuration = "2s";
	id_obj.style.opacity = 100;
	window.setTimeout(function(){
		fade_out(id);
	}, 5000);
}

function fade_out(id) {
	id_obj = document.getElementById(id);
	id_obj.style.opacity = 0;
}

// This is what happens when you kick off the page.
$(document).ready(function(){
	window.setTimeout(function(){
		fade_in("text");
	}, 1000)
}
)

