export class SlashEncoder {
    private constructor() {}

    public static encode(path: string): string{
        return path.replace("\\","%5C");
    }
}