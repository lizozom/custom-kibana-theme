import './scss/header.scss';
import './scss/loader.scss';
import './scss/login.scss';
import './scss/dashboard.scss';
import './scss/home.scss';
import './scss/space_selector.scss';
import './scss/fonts.scss';

import { CustomKibanaThemePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new CustomKibanaThemePlugin();
}
