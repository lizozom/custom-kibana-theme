import { CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  CustomKibanaLogoPluginContract,
} from './types';


export class CustomKibanaLogoPlugin
  implements Plugin<CustomKibanaLogoPluginContract, CustomKibanaLogoPluginContract>
{
  public setup(core: CoreSetup): CustomKibanaLogoPluginContract {
    return {};
  }                                                             

  public start(core: CoreStart): CustomKibanaLogoPluginContract {
    // You can place programmatic hooks here
    return {};
  }

  public stop() {}
}
