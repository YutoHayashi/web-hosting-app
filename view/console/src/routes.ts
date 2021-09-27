import React from 'react';
import * as Pages from '@/pages';
export type Routes = Array<{
    path: string;
    component: typeof React.Component;
    exact?: boolean;
    children?: Routes;
}>
export const routes: Routes = [
    { path: '/', component: Pages.Top, exact: true, }, // ← ここだけ children が定義できないよ！
    { path: '/signout', component: Pages.Signout, exact: true, },
    { path: '*', component: Pages.NotFound, },
];
