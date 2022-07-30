import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_PUBLIC_GOOGLE_API_TOKEN}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/auth" exact component={Auth}/>
          </Switch>
        </Container>   
      </BrowserRouter>
    </GoogleOAuthProvider>


  );
}

export default App;
