import { Dependance } from "./dependance";

export class ServiceA {
    private dependance: Dependance;

    constructor (dependance: Dependance) {
        this.dependance = dependance;
    }

    public actionForController = () => {
        const gift = this.dependance.requiredActionByServiceA();

        return gift + ' action by Service A';
    }
}
