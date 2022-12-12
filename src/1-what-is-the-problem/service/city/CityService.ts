import { City } from "../../Model/City";
import { Axios } from "axios";
import { CityValidatorService } from "./CityValidatorService";

export class CityService {
    private BASE_URL = 'https://geo.api.gouv.fr/';
    private validationService: CityValidatorService;

    constructor () {
        this.validationService = new CityValidatorService();
    }

    // plusieurs responsabilités
    // intrication du validation service sans inversion
    // gestion d'erreur douteuse
    // idiomes Typescript douteux
    // ...
    public getByZipCode = async (zipCode: string): Promise<City> => {
        const axios = new Axios();
        let req =  await axios.get(this.BASE_URL + zipCode);

        const data = req.data;
        let city = new City();

        if (!this.validationService.validate(data)) {
            const error = `the format of returned city iznogood ${data}`;
            console.log(error);

            throw error;
        }

        if (req.status === 200) {
            // zone de parsing, pourrait être gérée par un parser
            city.code = data.code;
            city.codeDepartement = data.codeDepartement;
            city.codeEpci = data.codeEpci;
            city.codeRegion = data.codeRegion;
            city.codesPostaux = data.codesPostaux;
            city.nom = data.nom;
            city.population = data.population;
            city.siren = data.siren;

            return city;
        } else {
            const error = `error fetching city with zipCode ${zipCode}`;
            console.log(error);

            throw error;
        }
    }
}
