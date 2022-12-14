import { InterfaceDependance } from "./interfaceDependance";

export class Dependance implements InterfaceDependance {
    public requiredActionByServiceA = () => {
        return "gift for serviceA";
    }
}
