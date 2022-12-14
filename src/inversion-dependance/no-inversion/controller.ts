import { ServiceA } from "./serviceA";
import { Dependance } from "./dependance";

class Controller {
    private serviceA: ServiceA;
    private dependance: Dependance;

    constructor() {
        this.dependance = new Dependance();
        this.serviceA = new ServiceA(this.dependance);
    }

    public actionA = () => {
        return this.serviceA.actionForController();
    }
}
