function popup() {
	window.alert("No, wait. No I haven't!");
}

list_of_quotes = [
	"Oh baby, it's a wild world.",
	"It's hard to get by, just upon a smile.",
	"This sure is a quote from a list, buddy!",
	"Thai, Vietnamese, Japanese, Sushi Train, buddy!",
	"Freemasons run the country."
	]

function myFunction() {
	document.getElementById("demo").innerHTML = list_of_quotes[Math.floor(Math.random() * list_of_quotes.length)];
}

$(document).ready(function(){
  document.getElementById("demo").innerHTML = "<h1>Prepped, and ready!</h1>"
})

