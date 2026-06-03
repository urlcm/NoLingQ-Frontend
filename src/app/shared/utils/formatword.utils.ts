export function formatWord(word:string) :string{
    return word.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, ""); 
}