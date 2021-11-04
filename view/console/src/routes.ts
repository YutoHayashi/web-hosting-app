import * as Pages from '@/pages';
import { Routes } from '@/types';
export const routes: Routes = [

    { path: '/', component: Pages.Top, exact: true, }, // ← ここだけ children が定義できないよ！

    { path: '/signout', component: Pages.Signout, exact: true, },

    { path: '/iam', component: Pages.IAM.Dashboard, exact: true, children: [
        { path: '/roles', component: Pages.IAM.Roles, exact: true, },
        { path: '/groups', component: Pages.IAM.Groups, exact: true, },
        { path: '/members', component: Pages.IAM.Members.Retrieve, exact: true, children: [
            { path: '/add', component: Pages.IAM.Members.Add, exact: true, },
            { path: '/edit/:id', component: Pages.IAM.Members.Edit, exact: true, },
            { path: '/show', component: Pages.IAM.Members.Show, exact: true, children: [
                { path: '/:id', component: Pages.IAM.Members.Show, exact: true, },
            ] },
        ] },
        { path: '/organization', component: Pages.IAM.Organization.Retrieve, exact: true, children: [
            { path: '/settings', component: Pages.IAM.Organization.Settings.Retrieve, exact: true, children: [
                { path: '/edit/:id', component: Pages.IAM.Organization.Settings.Edit, exact: true, },
            ] },
        ] },
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
