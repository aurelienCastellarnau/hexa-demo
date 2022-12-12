import { Request, Response, NextFunction } from "express";
import { CityValidatorService } from "../service/city/CityValidatorService";
import { CityRepository } from "../repository/CityRepository";
import { CityService } from "../service/city/CityService";

// intestable en l'état
// on sent venir la complexité 
export class CityController {
    public validatorService: CityValidatorService;
    public repository: CityRepository;
    public cityService: CityService;

    constructor () {
        this.validatorService = new CityValidatorService();
        this.repository = new CityRepository({host: 'myhost.json'});
    }

    public getByZipcode = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            let zipCode = req.query.zipCode.toString();
            let city = await this.cityService.getByZipCode(zipCode);

            if (!this.validatorService.validate(city)) {
                res.status(400);
                res.render('Bad format', city);
            };
            this.repository.add(city);
            res.status(202);
            res.send('City added');
        }
    }
}
