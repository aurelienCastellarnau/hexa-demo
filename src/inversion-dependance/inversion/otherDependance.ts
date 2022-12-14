import { InterfaceDependance } from "./interfaceDependance";

export class OtherDependance implements InterfaceDependance {
    public requiredActionByServiceA = () => {
        return "gift for serviceA from another InterfaceDependance";
    }
}
