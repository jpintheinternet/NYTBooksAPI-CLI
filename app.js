// NYT Bestsellers Lists app.js
// Jean Paul Espinosa, Bruck Negash, Milca Ucelo
// CS4220-01
// Due: March 24, 2023

const prompts = require('prompts');
const api = require('./api.js');    // console.log(api);
const { saveSearchHistory } = require('./history.js');

// prompt user to select a book from the searched list
const _selectBook = async (books) => {
    const displayBooks = books.map(book => {
        return { title: `rank #${book.rank}: ${book.title} by ${book.author}`, value: book.primary_isbn13};
    });

    return await prompts([
        {
            type: 'select',
            name: 'books',
            message: 'Select a book to display more details',
            choices: displayBooks
        }
    ]);
};

// application logic
// get a list of Fiction books from specified date YYYY-MM-DD or "current"
const searchFiction = async (args) => {
    // get date from args passed in
    const date = args;
    // console.log(date);

    // get a list of books from list publish date
    const bookList = await api.searchDate(date);
    // console.log(bestBooks);
    // console.log(`results #: ${bookList.num_results}`);   // will always =15, since NYT has 15 books on each list

    // prompt user to select a book from list
    const selectedBook = await _selectBook(bookList.results.books);
    // console.log(selectedBook);
    // console.log(`value: ${selectedBook.books}`);

    // get book description of selected book
    const bookDescription = await api.searchSelection(selectedBook.books);
    // console.log(bookDescription.results[0].author);

    // display book description
    console.log(
        `\nAuthor: ${bookDescription.results[0].author} ` +
        `\nTitle: ${bookDescription.results[0].title}` +
        `\nDescription: ${bookDescription.results[0].description}\n`);
    
    // Saves the searc keyword and the number of results to the search history
    saveSearchHistory(args, bookList.num_results);
};

module.exports = {
    searchFiction
};
