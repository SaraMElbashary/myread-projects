import { useState , useEffect } from 'react';
  import { Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import * as BooksAPI from "../utils/BooksAPI";


const SearchBooks = ({books , setBooks}) => {
    const [query , setQuery] = useState("");
    const updateQuery = ( query )=> {
        setQuery(query);
    }
      /*const filteredBooks = query === "" ? [] : books?.filter(
        ({ publisher, title }) =>
          publisher?.toLowerCase().includes(query.toLowerCase()) ||
          title.toLowerCase().includes(query.toLowerCase())
      );*/
    const [filteredBooks, setfilteredBooks] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
      if (query !== "") {
        const getData = setTimeout(() => {
          BooksAPI.search(query).then((filteredBooks) => {
            if (filteredBooks.error) {
              setMessage("No Books Found");
            } else {
              setfilteredBooks(filteredBooks);
              console.log(filteredBooks);
              setMessage("");
            }
          })
        }, 2000)
        return () => clearTimeout(getData)
      } else {
        setfilteredBooks([]);
        setMessage("");
      }

    }, [query])

     
    
return (
    <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />
            </div>
            
          </div>
          { message==="" ? "" : <div className="notfound-message">{message}</div>}

          <ListBooks books={books} filteredBooks={filteredBooks} setBooks={setBooks}/>

    </div>
)
}

export default SearchBooks;
