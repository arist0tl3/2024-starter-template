import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  _Any: any;
  _FieldSet: any;
};

export type Book = {
  __typename?: 'Book';
  _id: Scalars['String'];
  author: Scalars['String'];
  title: Scalars['String'];
};

export type CreateBookInput = {
  author: Scalars['String'];
  title: Scalars['String'];
};

export type CreateBookResponse = {
  __typename?: 'CreateBookResponse';
  book?: Maybe<Book>;
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  _id: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type DeleteBookInput = {
  bookId: Scalars['String'];
};

export type DeleteBookResponse = {
  __typename?: 'DeleteBookResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type GenerateAndSendPassCodeInput = {
  phoneNumber: Scalars['String'];
};

export type GenerateAndSendPassCodeResponse = {
  __typename?: 'GenerateAndSendPassCodeResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook: CreateBookResponse;
  deleteBook: DeleteBookResponse;
  generateAndSendPassCode: GenerateAndSendPassCodeResponse;
  logout: LogoutResponse;
  resolvePassCode: ResolvePassCodeResponse;
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationDeleteBookArgs = {
  input: DeleteBookInput;
};


export type MutationGenerateAndSendPassCodeArgs = {
  input: GenerateAndSendPassCodeInput;
};


export type MutationResolvePassCodeArgs = {
  input: ResolvePassCodeInput;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  booksByCurrentUser?: Maybe<Array<Book>>;
  currentUser?: Maybe<CurrentUser>;
};

export type ResolvePassCodeInput = {
  genericInvitationId?: InputMaybe<Scalars['String']>;
  passCode: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type ResolvePassCodeResponse = {
  __typename?: 'ResolvePassCodeResponse';
  error?: Maybe<Scalars['String']>;
  isNewUser?: Maybe<Scalars['Boolean']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type CreateBookMutationVariables = Exact<{
  input: CreateBookInput;
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createBook: { __typename?: 'CreateBookResponse', error?: string | null, success: boolean, book?: { __typename?: 'Book', _id: string, author: string, title: string } | null } };

export type DeleteBookMutationVariables = Exact<{
  input: DeleteBookInput;
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook: { __typename?: 'DeleteBookResponse', error?: string | null, success: boolean } };

export type GenerateAndSendPassCodeMutationVariables = Exact<{
  input: GenerateAndSendPassCodeInput;
}>;


export type GenerateAndSendPassCodeMutation = { __typename?: 'Mutation', generateAndSendPassCode: { __typename?: 'GenerateAndSendPassCodeResponse', error?: string | null, success: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean, error?: string | null } };

export type ResolvePassCodeMutationVariables = Exact<{
  input: ResolvePassCodeInput;
}>;


export type ResolvePassCodeMutation = { __typename?: 'Mutation', resolvePassCode: { __typename?: 'ResolvePassCodeResponse', isNewUser?: boolean | null, success: boolean, token?: string | null, error?: string | null } };

export type BooksByCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksByCurrentUserQuery = { __typename?: 'Query', booksByCurrentUser?: Array<{ __typename?: 'Book', _id: string, author: string, title: string }> | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'CurrentUser', _id: string, phoneNumber?: string | null } | null };


export const CreateBookDocument = gql`
    mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    error
    book {
      _id
      author
      title
    }
    success
  }
}
    `;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;
export const DeleteBookDocument = gql`
    mutation DeleteBook($input: DeleteBookInput!) {
  deleteBook(input: $input) {
    error
    success
  }
}
    `;
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options);
      }
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>;
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>;
export const GenerateAndSendPassCodeDocument = gql`
    mutation GenerateAndSendPassCode($input: GenerateAndSendPassCodeInput!) {
  generateAndSendPassCode(input: $input) {
    error
    success
  }
}
    `;
export type GenerateAndSendPassCodeMutationFn = Apollo.MutationFunction<GenerateAndSendPassCodeMutation, GenerateAndSendPassCodeMutationVariables>;

/**
 * __useGenerateAndSendPassCodeMutation__
 *
 * To run a mutation, you first call `useGenerateAndSendPassCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAndSendPassCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAndSendPassCodeMutation, { data, loading, error }] = useGenerateAndSendPassCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateAndSendPassCodeMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAndSendPassCodeMutation, GenerateAndSendPassCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateAndSendPassCodeMutation, GenerateAndSendPassCodeMutationVariables>(GenerateAndSendPassCodeDocument, options);
      }
export type GenerateAndSendPassCodeMutationHookResult = ReturnType<typeof useGenerateAndSendPassCodeMutation>;
export type GenerateAndSendPassCodeMutationResult = Apollo.MutationResult<GenerateAndSendPassCodeMutation>;
export type GenerateAndSendPassCodeMutationOptions = Apollo.BaseMutationOptions<GenerateAndSendPassCodeMutation, GenerateAndSendPassCodeMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
    error
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ResolvePassCodeDocument = gql`
    mutation ResolvePassCode($input: ResolvePassCodeInput!) {
  resolvePassCode(input: $input) {
    isNewUser
    success
    token
    error
  }
}
    `;
export type ResolvePassCodeMutationFn = Apollo.MutationFunction<ResolvePassCodeMutation, ResolvePassCodeMutationVariables>;

/**
 * __useResolvePassCodeMutation__
 *
 * To run a mutation, you first call `useResolvePassCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolvePassCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolvePassCodeMutation, { data, loading, error }] = useResolvePassCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResolvePassCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResolvePassCodeMutation, ResolvePassCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResolvePassCodeMutation, ResolvePassCodeMutationVariables>(ResolvePassCodeDocument, options);
      }
export type ResolvePassCodeMutationHookResult = ReturnType<typeof useResolvePassCodeMutation>;
export type ResolvePassCodeMutationResult = Apollo.MutationResult<ResolvePassCodeMutation>;
export type ResolvePassCodeMutationOptions = Apollo.BaseMutationOptions<ResolvePassCodeMutation, ResolvePassCodeMutationVariables>;
export const BooksByCurrentUserDocument = gql`
    query BooksByCurrentUser {
  booksByCurrentUser {
    _id
    author
    title
  }
}
    `;

/**
 * __useBooksByCurrentUserQuery__
 *
 * To run a query within a React component, call `useBooksByCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksByCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksByCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useBooksByCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<BooksByCurrentUserQuery, BooksByCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksByCurrentUserQuery, BooksByCurrentUserQueryVariables>(BooksByCurrentUserDocument, options);
      }
export function useBooksByCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksByCurrentUserQuery, BooksByCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksByCurrentUserQuery, BooksByCurrentUserQueryVariables>(BooksByCurrentUserDocument, options);
        }
export type BooksByCurrentUserQueryHookResult = ReturnType<typeof useBooksByCurrentUserQuery>;
export type BooksByCurrentUserLazyQueryHookResult = ReturnType<typeof useBooksByCurrentUserLazyQuery>;
export type BooksByCurrentUserQueryResult = Apollo.QueryResult<BooksByCurrentUserQuery, BooksByCurrentUserQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    _id
    phoneNumber
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;