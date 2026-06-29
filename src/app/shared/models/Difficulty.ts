export enum DifficultyLevel{
        IGNORE = "IGNORE",
        NEW = "NEW",
        SEEN = "SEEN",
        RECOGNIZED = "RECOGNIZED",
        VERY_RECOGNIZED = "VERY_RECOGNIZED",
        LEARNED = "LEARNED"
    }

export class Difficulty{
    idDifficulty:number;
    description:DifficultyLevel;
}