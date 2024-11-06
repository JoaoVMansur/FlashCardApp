import React, { useEffect, useState } from "react";
import featchWords from "../api/fetchWords";

interface Word {
  id: number;
  KoreanWord: string;
  PortugueseWord: string;
}

const WordsContainer: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await featchWords();
        setWords(data);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="wordsContainer">
      {words.map((word) => (
        <div key={word.id} className="word">
          {word.KoreanWord} - {word.PortugueseWord}
        </div>
      ))}
    </div>
  );
};

export default WordsContainer;
