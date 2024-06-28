import {lazy, Suspense} from "react";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Header from "./components/header/header.jsx";

const Main = lazy(() => import("./main/main.jsx"));
const Comics = lazy(() => import("./comics/comics.jsx"));
const Content = lazy(() => import("./content/content.jsx"));
const NotFound = lazy(() => import("./components/notfound/notfound.jsx"));
const Persone = lazy(() => import("./persone/persone.jsx"));

const App = () => {
    return (
        <Router>
            <Header/>
            <Suspense fallback={null}>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/comics"} element={<Comics/>}/>
                    <Route path={"/comics/:id"} element={<Content/>}/>
                    <Route path={"/persone/:id"} element={<Persone/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;