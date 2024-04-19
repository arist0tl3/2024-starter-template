import React, { useState } from "react";
import { useBooksQuery } from "./generated";

function App() {
  const { data, loading, error } = useBooksQuery();

  if (loading) return <div>{"Loading..."}</div>;

  if (error) return <div>{"Error"}</div>;

  const books = data?.books || [];

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.title}>
            <div>{`${book.title} - ${book.author}`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
