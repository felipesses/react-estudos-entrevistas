import { useState } from "react";
import { fetchSynonyms } from "../api/fetchSynonyms";

export type Synonym = {
  word: string;
  score: number;
};

export function useSynonym() {
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function getSynonyms(word: string) {
    setIsLoading(true);
    return fetchSynonyms(word)
      .then(setSynonyms)
      .finally(() => setIsLoading(false));
  }

  return { isLoading, synonyms, getSynonyms };
}
