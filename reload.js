function checkRefresh()
{
	if (document.refreshForm.visited.value == "")
	{
		console.log("Loaded Webpage...");
	}
	else
	{
		window.location.href = "https://harry-hopkinson.github.io/BookFlix/";
	}
}