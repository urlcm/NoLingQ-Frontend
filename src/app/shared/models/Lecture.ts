import { DictionarySource } from "./DictionarySource";
import { SourceLecture } from "./SourceLecture";
import { SourceMedia } from "./SourceMedia";

export class Lecture {
    idLecture: number;
    name: string;
    sourceLecture: SourceLecture;
    sourceMedia: SourceMedia;
    dictionarySource: DictionarySource;


    constructor(
        name?: string, 
        sourceLecture?: SourceLecture,
        sourceMedia?: SourceMedia,
        dictionarySource?: DictionarySource) {
        this.name = name;
        this.sourceLecture = sourceLecture;
        this.sourceMedia = sourceMedia;
        this.dictionarySource = dictionarySource;
    }
}