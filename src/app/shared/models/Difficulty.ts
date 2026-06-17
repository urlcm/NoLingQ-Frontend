export enum DifficultyLevel{
        IGNORE = "ignore",
        NEW = "new",
        SEEN = "seen",
        RECOGNIZED = "recognized",
        VERY_RECOGNIZED = "very-recognize",
        LEARNED = "learned"
    }

export class Difficulty{
    idDifficulty:number;
    description:DifficultyLevel;
}