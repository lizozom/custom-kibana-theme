import { CoreSetup, CoreStart, Plugin } from '../../../src/core/public';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomKibanaLogoPluginContract {}

export class CustomKibanaLogoPlugin
  implements Plugin<CustomKibanaLogoPluginContract, CustomKibanaLogoPluginContract>
{
  private curAppClass?: string;

  constructor() {
    console.log('Loaded CustomKibanaLogoPlugin');
  }

  public setup(core: CoreSetup): CustomKibanaLogoPluginContract {
    // Registration is done here so not to miss the first event
    core.getStartServices().then(start => {

      // Set a custom class to the body to scope css changes
      start[0].application.currentAppId$.subscribe(currApp => {
        this.setBodyClass(currApp)
      })

    })
    return {};
  }

  public start(core: CoreStart): CustomKibanaLogoPluginContract {
    // You can place programmatic hooks here
    return {};
  }

  public stop() {}

  private setBodyClass(curApp?: string) {
    // Remove old class name
    if (this.curAppClass) {
      document.body.classList.remove(this.curAppClass);
      this.curAppClass = undefined;
    }

    // Add new class name
    if (curApp) {
      this.curAppClass = `ckl-app-${curApp}`
      document.body.classList.add(this.curAppClass);
    }
  }
}
