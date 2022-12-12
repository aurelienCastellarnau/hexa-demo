import { City } from "../../Model/City";

// evolution permettant d'extraire du code mais ne règle aucun problème
export class CityParserService {
    public parse = (data: any) => {
        return data as City;
    }
}
