import { Word } from "../models/Word";
import { formatWord } from "./formatword.utils";

export function removeDuplicatedWord(words:Word[]): Map<string,Word>{
    const wordsMapNoDuplicated : Map<string,Word> = new Map<string,Word>();


    words.forEach(word => {
      word.word = formatWord(word.word.toLowerCase())
      if(!wordsMapNoDuplicated.has(word.word))
        wordsMapNoDuplicated.set(word.word,word);
    });

    console.info("Cantidad de palabras sin duplicar: " + wordsMapNoDuplicated.size);

    return wordsMapNoDuplicated;
}