import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
interface Props {  }
interface States {  }
export class Add extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Member
                { ...{
                    links,
                    children: ( { token } ) => {
                        return (
                            <section className={ `w-full` }>
                                <h2 className={ `font-bold underline` }>Add Member</h2>
                                <label className={ `inline-block my-5` }>
                                    <h3 className={ `text-sm font-bold` }>Name&nbsp;:&nbsp;</h3>
                                </label>
                            </section>
                        );
                    },
                } }
            />
        );
    }
}
