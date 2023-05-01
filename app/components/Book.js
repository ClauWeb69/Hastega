import React from "react";


const Book = ({book}) => {
  return (
    <div>
        <img src={book.cover} alt={book.title} />
        <div className="text-center">
            <h2 className="text-xl font-medium">{book.title}</h2>
            <p className="text-gray-600"><u>{book.author}</u></p>
            <div className="flex items-center justify-center mt-4">
                <span className="text-yellow-500"><b>ISBN:</b> {book.isbn}</span>
            </div>
        </div>
    </div>
  );
};

export default Book;