import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import "@brainhubeu/react-carousel/lib/style.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import routes from "./routes";
import { CartProvider } from "react-use-cart";
import Category from "./components/Category";
import Footer from "./components/footer/Footer";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

const Routes = () => {
  const element = useRoutes(routes);
  return (
    <>
      <Navbar />
      {element}
      <Category />
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div>
            <Routes />
          </div>
        </ApolloProvider>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
