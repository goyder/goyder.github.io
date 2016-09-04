function fade_in(id) {
	id_obj = document.getElementById(id);
	id_obj.style.opacity = 0;
	id_obj.textContent = "There is literally nothing.";
	id_obj.style.transitionDuration = "2s";
	id_obj.style.opacity = 100;
	$.when(window.setTimeout(function(){
		fade_out(id);
	}, 5000)
			).then(function(){
		console.log("fade-out complete!");
	});
}

function fade_out(id) {
	id_obj = $("#".concat(id));
	id_obj.css("opacity",0)
	id_obj.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
		console.log("Transition is complete.");
		html = document.getElementsByTagName("html");
		document.removeChild(html[0]);
	});
}


// This is what happens when you kick off the page.
$(document).ready(function(){
	window.setTimeout(function(){
		fade_in("text");
	}, 2000)
}
)

