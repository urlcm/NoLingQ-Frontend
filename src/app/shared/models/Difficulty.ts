enum DifficultyLevel{
        IGNORE,
        NEW,
        SEEN,
        RECONIZED,
        RECONIZED_2,
        RECOGNIZED_3,
        LEARNED
    }

export class Difficulty{
    idDifficulty:number;
    difficultyDescription:DifficultyLevel;
}