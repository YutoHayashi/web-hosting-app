import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { Text } from '@/components/inputs/Text';
import { Email } from '@/components/inputs/Email';
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
                                <Text title={ `Name` } name={ `name` } required={ true } autofocus={ true } />
                                <Email title={ `Email` } name={ 'email' } required={ true } autocomplete={ false } />
                            </section>
                        );
                    },
                } }
            />
        );
    }
}
