import React, { useState } from "react";
import { fetchSynonyms } from "./api/fetchSynonyms";
import "./App.css";
import { useSynonym } from "./hooks/useSynonym";

function App() {
  const [word, setWord] = useState<string>("");
  const { synonyms, isLoading, getSynonyms } = useSynonym();

  function handleFetchSynonyms(e: React.FormEvent) {
    e.preventDefault();
    getSynonyms(word);
  }

  function handleSynonymClicked(newWord: string) {
    setWord(newWord);
    getSynonyms(newWord);
  }

  return (
    <div className="App">
      <form onSubmit={handleFetchSynonyms}>
        <label htmlFor="word-input">Your Word</label>
        <input
          value={word}
          id="word-input"
          onChange={(e) => setWord(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>

      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ul>
          {synonyms.map((synonym) => (
            <li
              onClick={() => handleSynonymClicked(synonym.word)}
              key={synonym.word}
            >
              {synonym.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
