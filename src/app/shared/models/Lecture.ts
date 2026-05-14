import { DictionarySource } from "./DictionarySource";
import { SourceLecture } from "./SourceLecture";
import { SourceMedia } from "./SourceMedia";

export class Lecture{
    idLecture:number;
    name : String;
    sourceLecture:SourceLecture;
    sourceMedia :SourceMedia;
    dictionarySource:DictionarySource;
}