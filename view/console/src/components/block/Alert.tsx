import React, { ReactNode } from 'react';
interface Props {  }
interface States {
    type: 'info' | 'error' | 'warning' | 'success';
    message: string;
    active: boolean;
}
export class Alert extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
        this.state = {
            active: false,
            type: 'info',
            message: '',
        };
    }
    public render(  ) {
        const { type, message, active } = this.state;
        const color = ( (  ): string => {
            switch( type ) {
                case 'info':
                    return 'blue';
                case 'error':
                    return 'red';
                case 'warning':
                    return 'yellow';
                case 'success':
                    return 'green';
                default:
                    return 'gray';
            }
        } )(  );
        return (
            <div className={ `py-1 px-3 md:px-3 border-l-2 border-${ color }-600 bg-${ color }-300 w-full text-white font-bold ${ active ? 'block' : 'hidden' }` }>

            </div>
        );
    }
}
