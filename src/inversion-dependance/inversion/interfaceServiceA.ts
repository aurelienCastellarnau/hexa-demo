import { InterfaceDependance } from "./interfaceDependance";

export interface InterfaceServiceA {
    dependance: InterfaceDependance;
    actionForController: () => String
    injectDependance: (dependance: InterfaceDependance) => void
}
