import Ubuntu from "../components/ubuntu";
import ReactGA from 'react-ga';
import Meta from "../components/SEO/Meta";
import FloatingActionButton from "../components/FloatingActionButton";
import Clarity from '@microsoft/clarity';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
ReactGA.initialize(TRACKING_ID);

function App() {
  Clarity.init('s1xpn1cahu');
  return (
    <>
      <Meta />
      <Ubuntu />
      <FloatingActionButton />
    </>
  )
}

export default App;
