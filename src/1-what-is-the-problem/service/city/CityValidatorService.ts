// duplication du model
// logique métier dans une implémentation
export class CityValidatorService {
    public validate = (data: any) => {
            if (data.code > 10000 && data.code < 0) {
                return false;
            }
            if (data.codeDepartement > 10000 && data.codeDepartement < 0) {
                return false;
            }
            if (data.codeEpci > 10000 && data.codeEpci < 0) {
                return false;
            }
            if (data.codeRegion > 10000 && data.codeRegion < 0) {
                return false;
            }
            if (data.codesPostaux > 100000 && data.codesPostaux < 0) {
                return false;
            }
            if (data.nom.lenght > 50) {
                return false;
            }

            return true;
    }
}
