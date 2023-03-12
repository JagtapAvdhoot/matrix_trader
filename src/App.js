import Home from "./pages/Home/Home";
import { Routes, Route } from 'react-router-dom'
import { Box } from "@chakra-ui/react";
import Policy from "./pages/Policy/Policy";
import Header from "./components/Header/Header";
import Contact from "./pages/Contact/Contact";
import Terms from "./pages/Terms/Terms";
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Box width='full' background='black'>
      <div className="site">

        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/privacy-policy' element={<Policy />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/terms-and-conditions' element={<Terms />} />
          <Route path='/success' element={<>success</>} />
          <Route path='/cancel' element={<>cancel</>} />
        </Routes>

        <Footer />
      </div>
    </Box>
  );
}

export default App;
