import { Word } from "../models/Word";

export function removeDuplicatedWord(words:Word[]): Map<string,Word>{
    const wordsMapNoDuplicated : Map<string,Word> = new Map<string,Word>();


    words.forEach(word => {
      word.word = word.word.toLowerCase()
      wordsMapNoDuplicated.set(word.word,word);
    });

    console.info("Cantidad de palabras sin duplicar: " + wordsMapNoDuplicated.size);

    return wordsMapNoDuplicated;
}