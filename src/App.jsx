import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import TaskBoard from "./components/Task/TaskBoard.jsx";

function App() {

    return (
        <>
            <Header/>
            <div className="flex flex-col justify-center items-center">
                <HeroSection/>
                <TaskBoard/>
            </div>
            <Footer/>
        </>
    )
}

export default App
