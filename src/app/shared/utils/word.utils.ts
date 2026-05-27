import { DictionarySource } from "../models/DictionarySource";
import { Difficulty } from "../models/Difficulty";
import { Word } from "../models/Word";

export function splitWord(text: string) : string[]{
    return text.trim().split(/\s+/);
}

export function createWord(text: string) : Word{
        return  {
        word: text,
        idWord: -1,
        difficulty: new Difficulty(),
        definition: "",
        image: "",
        dictionarySource: new DictionarySource()
    }

}

export function WordToArray(words:string[]):Word[]{
    let WordArray:Word[] =[];
    let word : Word;

        for (let index = 0; index < words.length; index++) {
            word = createWord(words[index]);
            WordArray.push(word);
        }
    
    return WordArray;
}