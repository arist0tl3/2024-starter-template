import { FormEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateBookMutation } from '../../../generated';

function NewBook(): ReactElement {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const [createBook] = useCreateBookMutation({
    onCompleted: (data) => {
      if (data.createBook.book?._id) {
        navigate('/books', {
          replace: true,
        });
      }
    },
    variables: {
      input: {
        author,
        title,
      },
    },
  });

  const readyToSubmit = !!title && !!author;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      createBook();
    }
  };

  return (
    <div>
      <h1>{'New Book'}</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor={'title'}>{'Title'}</label>
          <input id={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </div>

        <div>
          <label htmlFor={'author'}>{'Author'}</label>
          <input id={'author'} value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
        </div>

        <button disabled={!readyToSubmit} type={'submit'}>
          {'Submit'}
        </button>
      </form>
    </div>
  );
}

export default NewBook;
