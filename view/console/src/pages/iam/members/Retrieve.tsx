import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from '@/pages/iam/links';
import { MultiContext } from '@/store';
import { SET as MEMBERSET } from '@/store/member';
import { Link } from 'react-router-dom';
import { member } from '@/request/member';
import { IAM } from '@/types';
import { Btn } from '@/components/parts/Btn';
interface Props {  }
interface States {  }
export class Retrieve extends React.Component<Props, States> {
    public static contextType = MultiContext;
    private _token: string = '';
    public constructor( props: Props ) {
        super( props );
    }
    private _init( args: { token: string, dispatch: any } ) {
        const { token, dispatch } = args;
        if ( this._token !== args.token ) {
            if ( dispatch ) {
                member.index( { jwt: token } ).then( data => dispatch( { type: MEMBERSET, payload: data.results, } ) );
                this._token = token;
            }
        }
    }
    public render(  ) {
        return (
            <Member
                { ...{
                    links,
                    children: ( { token } ) => {
                        const { state, dispatch } = this.context;
                        this._init( { token, dispatch } );
                        return (
                            <>
                                <div className={ `w-full flex` }>
                                    <Btn
                                        color='blue'
                                        to="/iam/members/add"
                                    >
                                        Add Member
                                    </Btn>
                                </div>
                                <div className={ `w-full` }>
                                    <table className={ `table-fixed w-full` }>
                                        <thead>
                                            <tr className={ `text-sm font-light text-gray-700 text-left` }>
                                                <th>Email</th>
                                                <th>Name</th>
                                                <th>Organization</th>
                                                <th>Administrator</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { state.member.index.map( ( m: IAM ) => (
                                                <tr key={ m.id } className={ `text-sm font-normal text-gray-700 text-left` }>
                                                    <td>
                                                        <Link to={ `/iam/members/show/${ m.id }` } className={ `text-blue-500 hover:text-blue-400` }>{ m.email }</Link>
                                                    </td>
                                                    <td>{ m.name }</td>
                                                    <td><Link to='/iam/organization' className={ `text-blue-500 hover:text-blue-400` }>{ m.organization }</Link></td>
                                                    <td>{ m.is_root ? 'Yes' : 'No' }</td>
                                                </tr>
                                            ) ) }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        );
                    },
                } }
            />
        );
    }
}
