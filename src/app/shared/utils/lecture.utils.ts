import { DictionarySource } from "../models/DictionarySource";
import { Lecture } from "../models/Lecture";
import { SourceLecture } from "../models/SourceLecture";
import { SourceMedia } from "../models/SourceMedia";

export function findById(Lectures: Lecture[], id: number) :Lecture {
    return Lectures.find(lecture => lecture.idLecture === id);
}

/*export function createLecture(
    nameParam : string,
    sourceLectureParam:SourceLecture,
    sourceMediaParam :SourceMedia,
    dictionarySourceParam:DictionarySource):Lecture{
     return  {
        idLecture : -1,
        name:nameParam,
        sourceLecture:new SourceLecture{
            idSourceLecture: sourceLectureParam
        },
        sourceMedia:sourceMediaParam,
        dictionarySource:dictionarySourceParam
    }
}*/