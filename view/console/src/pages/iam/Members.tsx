import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { Consumer, MultiContext } from '@/store';
import { SET } from '@/store/member';
import { Link } from 'react-router-dom';
import { member } from '@/request/member';
interface Props {  }
interface States {  }
export class Members extends React.Component<Props, States> {
    public static contextType = MultiContext;
    public constructor( props: Props ) {
        super( props );
    }
    public componentDidMount(  ) {
        const { state, dispatch } = this.context;
        member.index( { jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InlfaGF5YXNoaUBhbHRhLmNvLmpwIiwiZXhwIjoxNjMzNDc0Nzk1LCJlbWFpbCI6InlfaGF5YXNoaUBhbHRhLmNvLmpwIn0.sV-xBUjYeDPvRpgkOV0XoJ2Oa9cDyzUa_K14qjYlHRo', organization: state.me.organization } ).then( data => {
            dispatch( {
                type: SET,
                payload: data.results,
            } );
        } );
    }
    public componentDidUpdate(  ) {
    }
    public render(  ) {
        return (
            <Member {
                ...{
                    head: {
                        title: 'IAM Members',
                    },
                    links,
                    children: (
                        <div className={ `w-full` }>
                            <table className={ `table-auto w-full` }>
                                <thead>
                                    <tr className={ `text-sm font-light text-gray-700 text-left` }>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Organization</th>
                                        <th>Administrator</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Consumer>
                                        { ( { state } ) => state?.member.index.map( m => (
                                            <tr key={ m.id } className={ `text-sm font-normal text-gray-700 text-left` }>
                                                <td>{ m.id }</td>
                                                <td>{ m.name }</td>
                                                <td>{ m.email }</td>
                                                <td><Link to={ `` } className={ `text-blue-500 hover:text-blue-400` }>{ m.organization }</Link></td>
                                                <td>{ m.is_root ? 'Yes' : 'No' }</td>
                                            </tr>
                                        ) ) }
                                    </Consumer>
                                </tbody>
                            </table>
                        </div>
                    ),
                }
            } />
        );
    }
}
