fetch('https://openlibrary.org/search.json?author=austen&sort=new')
.then((response) => response.json())
.then((json) => {

    //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

    const justJanes = json.docs.filter((book) => {
        return book.author_name.some((author) => {
            return author.substring(0,4) = 'Jane';
        })
    } )
    Console.log(justJanes);
})();