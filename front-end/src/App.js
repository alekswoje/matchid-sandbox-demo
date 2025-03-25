import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
import Home from './pages/Home';
import { MatchProvider } from "@matchain/matchid-sdk-react";
import "@matchain/matchid-sdk-react/index.css";
import { useDispatch } from "react-redux";
import { signInAccount } from "./redux/authReducer/action";

const getState = () => {
  if (window.localStorage.getItem("match-local")) {
    const state = JSON.parse(window.localStorage.getItem("match-local"));
    return state.state;
  }
  return null;
};

export default function App() {
  const dispatch = useDispatch();
  const state = getState();
  const [appid, setAppid] = useState(state?.appid || process.env.REACT_APP_MATCH_ID_APP_ID);
  const [locale, setLocale] = useState(
    window.localStorage.getItem("locale") || "en"
  );
  // const [endpoints, setEndpoints] = useState(
  //   state?.endpoints || {
  //     auth: "https://auth.matchid.io",
  //     back: "https://backend.matchid.io",
  //   }
  // );

  useEffect(() => {
    window.localStorage.setItem("locale", locale);
  }, [locale]);

  useEffect(() => {
    console.log(process.env.REACT_APP_MATCH_ID_APP_ID);
  }, []);

  return (
    <MatchProvider appid={state?.appid || process.env.REACT_APP_MATCH_ID_APP_ID}
      wallet={{ type: "UserPasscode" }}
      // endpoints={endpoints}
      locale={locale} events={{
        onLogin: (data) => {
          // console.log("MatchProvider: User Logged In", data);
          localStorage.setItem("chat-app-user-data", JSON.stringify(data));
          dispatch(signInAccount(data));
        },
        onLogout: () => {
          console.log("MatchProvider: User Logged Out");
        },
      }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </MatchProvider>
  );
}
