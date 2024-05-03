import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { useBooksByCurrentUserQuery, useDeleteBookMutation } from '../../../generated';

function Books(): ReactElement {
  const { data, error, loading } = useBooksByCurrentUserQuery({
    fetchPolicy: 'network-only',
  });

  const [deleteBook] = useDeleteBookMutation({
    refetchQueries: ['BooksByCurrentUser'],
  });

  if (error) return <div>{`Error: ${error}`}</div>;
  if (loading) return <div>{'Loading...'}</div>;

  const books = data?.booksByCurrentUser || [];

  const handleDeleteClick = (bookId: string): void => {
    deleteBook({
      variables: {
        input: {
          bookId,
        },
      },
    });
  };

  return (
    <div>
      <h1>{'My Books'}</h1>
      <div>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <div style={{ display: 'flex' }}>
                <div>{`${book.title} - ${book.author}`}</div>
                <button style={{ marginLeft: '4px', color: 'red' }} onClick={() => handleDeleteClick(book._id)}>
                  {'x'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to={'/books/new'}>{'Add a book'}</Link>
      </div>
      <div>
        <Link to={'/'}>{'Home'}</Link>
      </div>
    </div>
  );
}

export default Books;
