
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const AuctionContext = createContext();
// Connect to the deployed server
// const socket = io('https://player-auction-server.onrender.com')
const socket =io('http://localhost:4000');

export const useAuction = () => useContext(AuctionContext);

const initialState = {
  started: false,
  teams: [],
  firstPool: [],
  unsoldPool: [],
  currentPlayer: null,
  history: [],
  playerHistory: {}
};

export const AuctionProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    socket.on("state", s => setState(s || initialState));
    return () => socket.off("state");
  }, []);

  return (
    <AuctionContext.Provider value={{ ...state, socket, isAdmin, setIsAdmin }}>
      {children}
    </AuctionContext.Provider>
  );
};
