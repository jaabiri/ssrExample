import React from 'react';
import * as routes from './constants/routes';


import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: routes.HOME,
    exact: true,
    component: asyncComponent({
      loader: () => import('./Organization'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: routes.PROFILE,
    exact: true,
    component: asyncComponent({
      loader: () => import('./Profile'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];
