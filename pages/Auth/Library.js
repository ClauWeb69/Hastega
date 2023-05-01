import { useRouter } from "next/router";
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import Book from "/app/components/Book";
import Navbar from "/app/components/Navbar";

export default function Library() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { data: session, status, update } = useSession()
  const router = useRouter();
  const [books, setBooks] = useState([])

  async function fetchData() {
    const res = await fetch('/api/auth/Book/bookListPrivate')
    const data = await res.json()
    setBooks(data)
  }

  const addUserBook = async (index) => {
    const response = await fetch('/api/auth/Book/remUserBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id_book: index
      })
    })
    setTimeout(() => {
      fetchData()
    }, 800);
    
  }
  const handleBookClick = (index) => {
    setSelectedBook(index);
    addUserBook(index);
    
    setTimeout(() => {
      setSelectedBook(null);
    }, 1000);
  };
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/Auth/Login")
    }
  }, [update]);

  useEffect(() => {fetchData()}, []);


  const handlePageChange = async (bookId, pagesRead) => {
    await fetch('/api/auth/Book/updateUserBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id_book: bookId,
        numread: pagesRead
      })
    })
    fetchData()
  };
  if (status !== "authenticated") {
    return (<></>);
  }

  return (<>
    <Navbar />
    <div className="flex flex-wrap justify-center p-4">
      {books.map((book, index) => (
        <div
          key={book.id}
          className={`${selectedBook === book.book.id
              ? "opacity-0 transition-opacity duration-1000"
              : "opacity-100"
            }  flex flex-col items-center justify-between p-4 bg-white border rounded-lg shadow-md md:w-1/2 lg:w-1/3 xl:w-1/4"`}>
          {selectedBook === book.book.id ? (
            <div className="bg-red-500 bg-opacity-50 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-white">
              <path d="M8 21h8a2 2 0 0 0 2-2V9H6v10a2 2 0 0 0 2 2zm-1-6h10V9H7v6zm9-3a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>
          
          ) : (
            <>
              <div
                onClick={() => handleBookClick(book.book.id)}
              >
                <Book book={book.book} />

              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={book.numReads}
                onChange={e =>
                  handlePageChange(book.book.id, parseInt(e.target.value))
                }
              />
            </>
            
          )}

        </div>
      ))}
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}