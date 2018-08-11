import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-fetch';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
     // add your key here please
    authorization: `Bearer past Your key here`,
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
  errorLink,
  httpLink,
]);

const cache = new InMemoryCache({
  logger: console.log,
  loggerEnabled: true,
});
function createApolloClient({ ssrMode }) {
  return new ApolloClient({
    ssrMode,
    link,
    cache: ssrMode
      ? cache
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  });
}

export default createApolloClient;
