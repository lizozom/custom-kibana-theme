import { CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { CUSTOM_NAME } from './consts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomKibanaLogoPluginContract {}

export class CustomKibanaLogoPlugin
  implements Plugin<CustomKibanaLogoPluginContract, CustomKibanaLogoPluginContract>
{
  constructor() {
    console.log('Loaded CustomKibanaLogoPlugin');

    // Update the favicon programatically
    this.changeFavicon();
    this.setupTabNameListener();
  }


  public setup(core: CoreSetup): CustomKibanaLogoPluginContract {
    return {};
  }                                                             

  public start(core: CoreStart): CustomKibanaLogoPluginContract {
    // You can place programmatic hooks here
    return {};
  }

  public stop() {}

  // Changes the favicon
  private changeFavicon() {
    const canvas = document.createElement('canvas');
    canvas.height = 64;
    canvas.width = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.font = '64px serif';
    ctx.fillText('🐋', 0, 64);

    const link = document.createElement('link');
    const oldLinks = document.querySelectorAll('link[rel~="icon"]');
    oldLinks.forEach(e => e.parentNode?.removeChild(e));
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL();
    document.head.appendChild(link);
  }

  // Replaces the word `Elastic` in the tab name
  private setupTabNameListener() {
    new MutationObserver(function (mutations) {
      const title = document.title;
      if (title) {
        let newTitle = document.title;
        // Replace in suffix
        if (newTitle.indexOf(' - Elastic') > -1) {
          newTitle = newTitle.replace(' - Elastic', '');
          newTitle = `${newTitle} | ${CUSTOM_NAME}`;
        } 
        // Replace in prefix
        if (newTitle === 'Elastic') {
          newTitle = CUSTOM_NAME;
        }

        if( newTitle !== title) {
          document.title = newTitle;
        }

      }
    }).observe(
      //@ts-ignore
      document.querySelector('title'),
      { subtree: true, characterData: true, childList: true }
    );
  }
}
