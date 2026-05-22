import { Lecture } from "../models/Lecture";

export function findById(Lectures: Lecture[], id: number) :Lecture {
    return Lectures.find(lecture => lecture.idLecture === id);
}