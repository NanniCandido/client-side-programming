(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('https://openlibrary.org/search.json?author=austen&sort=new')
    .then((response) => response.json())
    .then((json) => {

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        const justJanes = json.docs.filter((book) => {
            return book.author_name.some((author) => {
                return author.substring(0,4) === 'Jane';
            });
        } )

        console.log(justJanes);

        let newTitle = "";
        justJanes.forEach(book => 
            {newTitle += book.title.slice(0, book.title.indexOf(" ")) + " ";
        });

        console.log(newTitle.split(" ").slice(0,5).join(" "));
            
        });


})();