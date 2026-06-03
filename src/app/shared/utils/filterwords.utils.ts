import { Word } from "../models/Word";

export function removeDuplicateWord(words:Word[]):Word[]{
    const filterWords : Word[] = [];
    for (let index = 0; index < words.length; index++) {
        if(filterWords.filter(() => filterWords[index].word == words[index].word)) {
            filterWords.push(words[index])
        }
    }
    return filterWords;
}