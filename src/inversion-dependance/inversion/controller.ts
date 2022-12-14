import { InterfaceServiceA } from "./interfaceServiceA";
import { InterfaceDependance } from "./interfaceDependance";

export class Controller {
    private serviceA: InterfaceServiceA;

    constructor(serviceA: InterfaceServiceA) {
        this.serviceA = serviceA;
    }

    public actionA = () => {
        return this.serviceA.actionForController();
    }
}
