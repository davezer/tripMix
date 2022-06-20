import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page/';
import './App.css';
import Navigation from './components/Nav/';
import Header from './components/Header/';

import './assets/libraries/bootstrap.css';

import Footer from './components/Footer/index';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  const [pages] =useState([
    { name: "Home" },
  //   { name: "Collection" },
  //   { name: "Browse" },
  //   { name: "About" }
  ]);;
  
  const [currentPage, setCurrentPage] = useState(pages[0]);
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <div>
      <Header>
        <Navigation
          pages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Navigation>
      </Header>
      <main>
        <Page currentPage={currentPage}></Page>
      </main>
      <Footer />
    </div>
          
        </>
      </Router>
    </ApolloProvider>
  );
}


export default App;
