import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [getKey, setGetKey] = useState("");

  const { data, refetch } = useQuery(
    ["getKey", getKey],
    async () => {
      const response = await fetch(`http://34.120.169.218/get/${getKey}`);
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    { enabled: false, retry: false }
  );

  const postValue = () => {
    fetch(`http://34.120.169.218/set/${inputKey}/${inputValue}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          placeholder="key"
          value={inputKey}
          onChange={(ev) => setInputKey(ev.target.value)}
        />
        <input
          placeholder="value"
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
        />
        <button onClick={postValue}>Set in redis db</button>
        <input
          placeholder="key to get"
          value={getKey}
          onChange={(ev) => setGetKey(ev.target.value)}
        />
        <button onClick={() => refetch()}>Get db object</button>
        <h2>{data?.data}</h2>
      </header>
    </div>
  );
}

export default App;
