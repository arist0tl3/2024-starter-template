import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css';

const { VITE_GRAPHQL_ENDPOINT } = import.meta.env;

const link = new HttpLink({ uri: VITE_GRAPHQL_ENDPOINT });

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
  },
}));

export const client = new ApolloClient({
  link: setAuthorizationLink.concat(link),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function renderApp(): void {
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  );
}

function init(): void {
  renderApp();
}

init();
