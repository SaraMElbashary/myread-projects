import * as BooksAPI from "../utils/BooksAPI";

const ListBooks = ({books , filteredBooks, setBooks}) => {

  const handleSelect = ((event , book) => {
    event.preventDefault(); 
    const newStateBooks = books.map(b => {
      if (b.id === book.id) {
        return {...b, shelf: event.target.value};
      }
      return b;
    });
     setBooks(newStateBooks);
    
    BooksAPI.update( book , event.target.value);
  });
  filteredBooks?.map((book)=> {
      books.forEach(obook => {
            if (obook.id === book.id) {
              book.shelf = obook.shelf;
            }
          })
          return (book);
  })
 console.log(filteredBooks);
  
    return (
      <ol className="books-grid">
        {
          filteredBooks?.map((book)=> {
            books.forEach(obook => {
              if (obook.id === book.id) {
                book.shelf = obook.shelf;
              }
            })
                
                return (
                                  
           <li key={book.id}>
           <div className="book">
             <div className="book-top">
               <div
                 className="book-cover"
                 style={{
                   width: 128,
                   height: 193,
                   backgroundImage:
                   `url(${book.imageLinks?.thumbnail})`
                    }}
               ></div>
               <div className="book-shelf-changer">
                 <select value={book?.shelf || "none"} onChange={(event)=>(handleSelect(event , book))}>
                   <option value="" disabled>
                     Move to...
                   </option>
                   <option value="currentlyReading">
                     Currently Reading
                   </option>
                   <option value="wantToRead">Want to Read</option>
                   <option value="read">Read</option>
                   <option value="none">None</option>
                 </select>
               </div>
             </div>
             <div className="book-title">{book.title}</div>
             <div className="book-authors">
               { book.authors?.map((author) => author)}
             </div>
           </div>
         </li>
                ) 
                    })
          }
        </ol>

    )
}

export default ListBooks;
