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

    { path: '/iam', component: Pages.IAM.Dashboard, exact: true, children: [
        { path: '/roles', component: Pages.IAM.Roles, exact: true, },
        { path: '/groups', component: Pages.IAM.Groups, exact: true, },
        { path: '/members', component: Pages.IAM.Members, exact: true, },
    ], },

    { path: '/settings', component: Pages.Settings.Dashboard, exact: true, children: [
        //
    ], },

    { path: '/volumes', component: Pages.Volumes.Dashboard, exact: true, children: [
        //
    ], },

    { path: '/cms', component: Pages.CMS.Dashboard, exact: true, children: [
        //
    ], },

    { path: '/billings', component: Pages.Billings.Dashboard, exact: true, children: [
        //
    ], },

    // 404
    { path: '*', component: Pages.NotFound, },

];
