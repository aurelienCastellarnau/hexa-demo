import { InterfaceDependance } from "./interfaceDependance";
import { InterfaceServiceA } from "./interfaceServiceA";

export class ServiceA implements InterfaceServiceA {
    public dependance: InterfaceDependance;

    constructor () {}

    public actionForController = () => {
        const gift = this.dependance.requiredActionByServiceA();

        return gift + ' action by Service A';
    }

    public injectDependance = (dependance: InterfaceDependance) => {
        this.dependance = dependance;
    }
}
