import { CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { CUSTOM_NAME } from './consts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomKibanaThemePluginContract {}
interface FaviconConfig {
  emoji?: string;
  href?: string;
}

export class CustomKibanaThemePlugin
  implements Plugin<CustomKibanaThemePluginContract, CustomKibanaThemePluginContract>
{
  private curAppClass?: string;

  constructor() {
    console.log('Loaded CustomKibanaThemePlugin');

    // Update the favicon programatically
    this.changeFavicon({
      emoji: '🐋',
    });
    this.setupTabNameListener();
  }

  public setup(core: CoreSetup): CustomKibanaThemePluginContract {
    // Registration is done here so not to miss the first event
    core.getStartServices().then(start => {

      // Set a custom class to the body to scope css changes
      start[0].application.currentAppId$.subscribe(currApp => {
        this.setBodyClass(currApp)
      })

    })
    return {};
  }

  public start(core: CoreStart): CustomKibanaThemePluginContract {
    // You can place programmatic hooks here
    return {};
  }

  public stop() {}

  // Changes the favicon
  private changeFavicon({emoji, href}: FaviconConfig) {
    let faviconHref: string | undefined = undefined;

    if (href) {
      faviconHref = href;
    } else if (emoji) {
      const canvas = document.createElement('canvas');
      canvas.height = 64;
      canvas.width = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.font = '64px serif';
      ctx.fillText('🐋', 0, 64);

      faviconHref = canvas.toDataURL();
    }

    if (faviconHref) {
      const link = document.createElement('link');
      const oldLinks = document.querySelectorAll('link[rel~="icon"]');
      oldLinks.forEach(e => e.parentNode?.removeChild(e));
      link.id = 'dynamic-favicon';
      link.rel = 'shortcut icon';
      link.href = faviconHref;
      document.head.appendChild(link);
    }
  }

  // Replaces the word `Elastic` in the tab name
  private setupTabNameListener() {
    new MutationObserver(function () {
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

  // Sets a unique class to the body for each application
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
