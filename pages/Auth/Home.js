import { useRouter } from "next/router";
import { getSession, useSession } from 'next-auth/react';

import { useEffect, useState } from "react";
import Book from "/app/components/Book";
import Navbar from "/app/components/Navbar";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { data: session, status, update } = useSession()
  const router = useRouter();
  const [books, setBooks] = useState([])

  const addUserBook = async (index) => {
    const response = await fetch('/api/auth/Book/addUserBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id_book: index
      })
    })
    fetchData()
  }
  const handleBookClick = (index) => {
    setSelectedBook(index);
    addUserBook(index);
    
    setTimeout(() => {
      setSelectedBook(null);
    }, 1000);
  };
  async function fetchData() {
    const res = await fetch('/api/auth/Book/bookList')
    const data = await res.json()
    setBooks(data)
  }
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/Auth/Login")
    }
  }, [update]);
  useEffect(() => {
    fetchData()
  }, []);

  if (status !== "authenticated") {
    return (<></>);
  }

  return (<>
    <Navbar />
    <div className="flex flex-wrap justify-center p-4">
      {books.map((book, index) => (
        <div
          key={book.title}
          className={`${selectedBook === book.id
              ? "opacity-0 transition-opacity duration-1000"
              : "opacity-100"
            }  flex flex-col items-center justify-between p-4 bg-white border rounded-lg shadow-md md:w-1/2 lg:w-1/3 xl:w-1/4"`}

          onClick={() => handleBookClick(book.id)}
        >
          {selectedBook === book.id ? (
            <div className="bg-green-500 bg-opacity-50 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 11.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L6 9.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <>
            <Book book={book} />
            <div>{book.summary}</div>
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