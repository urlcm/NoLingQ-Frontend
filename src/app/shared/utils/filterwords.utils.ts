import { Word } from "../models/Word";
import { formatWord } from "./formatword.utils";

export function removeDuplicatedWord(words:Word[]): Map<string,Word>{
    const wordsMapNoDuplicated : Map<string,Word> = new Map<string,Word>();


    words.forEach(word => {
      const cleanWord = formatWord(word.word.toLowerCase())
      if(!wordsMapNoDuplicated.has(cleanWord))
        wordsMapNoDuplicated.set(cleanWord,word);
    });

    console.info("Cantidad de palabras sin duplicar: " + wordsMapNoDuplicated.size);

    return wordsMapNoDuplicated;
}