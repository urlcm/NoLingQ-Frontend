import { Observable } from "rxjs";
import { Word } from "../models/Word";
import { createWord } from "./word.utils";

export function searchWord(word: string, wordsMapNoDuplicatedChild:Map<string,Word>): Word {
    const newWord = wordsMapNoDuplicatedChild.get(word.toLowerCase());
    console.log("EL WORD ES NULL? ", newWord);
    if (!newWord) {
        const wordParam = createWord(word);
        console.info("Se crea nuevo objeto")
        return wordParam;
    }
    console.info("Se envio el objeto new word", newWord);
    return newWord;
}
