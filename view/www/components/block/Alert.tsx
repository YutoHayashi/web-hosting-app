import React from 'react';
import { Mdi } from '@/components/utils/Mdi';
import { Alerts } from '@/types';
interface Props {
    type: Alerts;
    children: ( { color }: { color: string } ) => JSX.Element;
}
const Icons: {
    [ K in Alerts ]: string
} = {
    success: 'checkbox-marked-circle-outline',
    warning: 'alert-circle-outline',
    danger: 'cancel',
    info: 'information-outline',
};
const Colors: {
    [ K in Alerts ]: string;
} = {
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    info: 'blue',
}
export class Alert extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { type, children } = this.props;
        const icon = Icons[ type ];
        const color = Colors[ type ];
        return (
            <div className={ `relative flex justify-between items-center bg-white rounded overflow-hidden p-2 space-x-1` }>
                <div className={ `absolute inset-0 border-l-4 border-${ color }-400` }></div>
                <div className={ `flex items-baseline` }>
                    <Mdi icon={ icon } className={ `text-${ color }-400 mdi-18px` } />
                </div>
                <div className={ `flex flex-grow items-center` }>
                    <p className={ `leading-tight text-xs md:text-sm` }>
                        { children( { color } ) }
                    </p>
                </div>
                <div className={ `z-10` }>
                    <button type="button" className={ `bg-indigo-300 bg-opacity-25 text-gray-700 rounded overflow-hidden p-1 lg:p-2 focus:outline-none` }>
                        <svg className={ `h-4 w-auto` } fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}