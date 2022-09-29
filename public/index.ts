import './scss/global.scss';
import './scss/loader.scss';
import './scss/login.scss';
import './scss/dashboard.scss';
import './scss/home.scss';

import { CustomKibanaLogoPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new CustomKibanaLogoPlugin();
}
