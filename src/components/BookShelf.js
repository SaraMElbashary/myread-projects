import Book from './Book';
import { useState} from 'react';
import * as BooksAPI from "../utils/BooksAPI";

const BookShelf = ({books , setBooks}) => {
 
  const shelfs = books.map((item) => item.shelf);
  const ShelfsWithoutDuplicates = [...new Set(shelfs)];

  const [selectedShelf, setSelected] = useState();

  const handleSelect = ((event , book) => {
      event.preventDefault();
      setSelected(event.target.value);

      const newStateBooks = books.map(b => {
        if (b.id === book.id) {
          return {...b, shelf: event.target.value};
        }
        return b;
      });
      setBooks(newStateBooks);
      
      BooksAPI.update( book , event.target.value);
  });

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
         {ShelfsWithoutDuplicates.map(shelfName => {
        return (
            <div key={shelfName}>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
            </div>
            <div className="bookshelf-books">
            <ol className="books-grid">
              {
                books?.filter((b)=>b.shelf === shelfName).map((book)=>(
                    <Book book={book} key={book.id} onShelfChange={(event)=>(handleSelect(event , book))}/>
                ))
              }
        </ol>
            </div>
        </div>
         );
           })}
        </div>
        
    )
}
export default BookShelf;