
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const AuctionContext = createContext();
// Connect to server using current host so viewers on the LAN can reach the socket
const socket = (() => {
  if (typeof window === 'undefined') return io('http://localhost:4000')
  const proto = window.location.protocol || 'http:'
  const host = window.location.hostname || 'localhost'
  return io(`${proto}//${host}:4000`)
})()

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
