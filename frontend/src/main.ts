import 'zone.js';
import './main.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'

platformBrowserDynamic().bootstrapModule(AppModule);