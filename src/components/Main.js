import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const Main = ({books , setBooks}) => {

   
    return (
      <div className="list-books">
           
        <BookShelf books={books} setBooks={setBooks}/>

        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
        </div>
    )
}

export default Main;