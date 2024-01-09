import './App.scss'
import 'typeface-nunito';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { GetBlock } from './components/GetBlock/GetBlock';
import { Registration } from './components/Registration/Registration';

function App() {
  const linkToUsers = () => {
    window.location.href = "#users";
  }

  const linkToSignUp = () => {
    window.location.href = "#sign_up";
  }

  return (
    <>
      <Header linkToUsers={linkToUsers} linkToSignUp={linkToSignUp} />
      
      <main>
        <Hero linkToSignUp={linkToSignUp} />
        <GetBlock />
        <Registration />
      </main>
    </>
  )
}

export default App
