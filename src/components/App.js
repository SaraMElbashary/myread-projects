import "../css/App.css";
import { Route , Routes } from 'react-router-dom';
import { useState , useEffect} from 'react';
import BookShelf from "./BookShelf";
import Main from "./Main";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "../utils/BooksAPI";


const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);


    return (
      <Routes>
          <Route exact path="/" element={
             <Main books={books} setBooks={setBooks}/>
          }/>
          <Route path="/search" element= {
            <SearchBooks books={books} setBooks={setBooks}/>}></Route>
        </Routes>
    )
};

export default App;
