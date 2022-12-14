import { Controller as ControllerInversion } from "./inversion/controller";
import { Dependance } from "./inversion/dependance";
import { OtherDependance } from "./inversion/otherDependance";
import { ServiceA } from "./inversion/serviceA";
import { Controller as ControllerWithoutInversion } from "./no-inversion/controller";
import { Dependance as noInversionDependance } from "./no-inversion/dependance";
import { ServiceA as noInversionServiceA } from "./no-inversion/serviceA";

const dependanceWithoutInversion = new noInversionDependance();
const serviceAWithoutInversion = new noInversionServiceA(dependanceWithoutInversion);

const dependanceWithInversion = new Dependance();
const serviceAWithInversion = new ServiceA();
serviceAWithInversion.injectDependance(dependanceWithInversion);

const otherDependanceWithInversion = new OtherDependance();

serviceAWithInversion.injectDependance(otherDependanceWithInversion);

const controllerNoInversion = new ControllerWithoutInversion();

const controllerInversion = new ControllerInversion(serviceAWithoutInversion);