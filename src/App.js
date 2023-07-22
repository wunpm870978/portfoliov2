import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useReducer, createContext, useEffect } from 'react';
import MainLayout from "./routes/mainLayout/MainLayout";
import HomeLayout from "./routes/Home";
import useWindowSize from "./hook/useWindowSize";
import 'animate.css';
import SinglePage from "./components/pdf/0/PDF";
import resume from "./assets/resume.pdf";
import { pdfjs } from 'react-pdf';
import Description from "./routes/Description/Description";


export const rootContext = createContext();
export const rootContextMethods = createContext();

function App() {
  const { width, height } = useWindowSize();
  const InitialState = {
    isLightTheme: false,
    isBounceInDown: false,
    isNavOpen: false,
    isTourBegin: false,
    isFired: false,
    isDesktop: true,
    height: height,
    location: '/'
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case "SET_STATE":
        return {
          ...prevState,
          ...action.data,
        };
      default:
        return prevState;
    }
  };

  const [state, dispatch] = useReducer(reducer, InitialState);

  const methods = {
    setReducerState: (payload) => {
      dispatch({
        type: "SET_STATE",
        data: payload,
      });
    }
  }

  useEffect(() => {
    dispatch({
      type: "SET_STATE",
      data: { isDesktop: width > 768 },
    });
  }, [width])
  useEffect(() => {
    dispatch({
      type: "SET_STATE",
      data: { height },
    });
  }, [height])

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url,
    ).toString();
  }, [])

  return (
    <rootContext.Provider value={state}>
      <rootContextMethods.Provider value={methods}>
        <BrowserRouter>
          <Routes>
            <Route path="/resume" element={
              <MainLayout>
                <SinglePage pdf={resume} />
              </MainLayout>
            } />
            <Route path="/me" element={
              <MainLayout>
                <Description />
              </MainLayout>
            } />
            <Route index path="/*" element={
              <MainLayout>
                <HomeLayout />
              </MainLayout>
            } />
          </Routes>
        </BrowserRouter>
      </rootContextMethods.Provider>
    </rootContext.Provider>
  );
}

export default App;
