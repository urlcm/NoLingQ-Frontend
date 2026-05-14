import { DictionarySource } from "./DictionarySource";
import { Difficulty } from "./Difficulty";

export class Word{
    idWord:number;
    word: string;
    difficulty:Difficulty;
    definition:string;
    image:string;
    dictionarySource:DictionarySource;
}