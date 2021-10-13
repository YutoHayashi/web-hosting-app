import { AlertManager, AlertType } from '@/middleware/Alert';
import React, { ReactNode } from 'react';
import { Mdi } from '../utils/Mdi';
interface Props {  }
interface States {  }
export class Alert extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public color( type: AlertType ) {
        switch( type ) {
            case 'info':
                return 'blue';
            case 'error':
                return 'red';
            case 'warn':
                return 'yellow';
            case 'success':
                return 'green';
            default:
                return 'gray';
        }
    }
    public render(  ) {
        return (
            <AlertManager>
                { ( { message, type, active, close } ) => {
                    const color = this.color( type );
                    return (
                        <div
                            className={ `p-1 ${ active ? 'block' : 'hidden' }` }
                        >
                            <div
                                className={ `flex items-center justify-between py-1 px-3 md:px-3 border-l-4 border-${ color }-500 bg-${ color }-100 w-full text-gray-600 font-bold text-sm rounded` }
                            >
                                { message }
                                <button
                                    className={ `text-${ color }-500 font-bold cursor-pointer` }
                                    onClick={ close }
                                >
                                    <Mdi icon='close'/>
                                </button>
                            </div>
                        </div>
                    );
                } }
            </AlertManager>
        );
    }
}
