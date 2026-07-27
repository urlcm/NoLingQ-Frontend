export enum DifficultyLevel{
        IGNORE = "IGNORE",
        NEW = "NEW",
        SEEN = "SEEN",
        RECOGNIZED = "RECOGNIZED",
        VERY_RECOGNIZED_2 = "VERY_RECOGNIZED_2",
        VERY_RECOGNIZED = "VERY_RECOGNIZED",
        LEARNED = "LEARNED",
        CHECK = "CHECK"
    }

export class Difficulty{
    idDifficulty:number;
    description:DifficultyLevel;
}