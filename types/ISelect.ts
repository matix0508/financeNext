import { IChoice } from "./IChoice";

export interface ISelect {
    label: string,
    name?: string,
    choices: IChoice[]
}