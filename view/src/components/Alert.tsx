import React from 'react';
import { Mdi } from '@/components/Mdi';
import { Colors } from '@/Colors';
type AlertType = keyof Partial<typeof Colors>;
interface Props {
    type: AlertType;
}
const Icons: {
    [ K in AlertType ]: string
} = {
    success: 'checkbox-marked-circle-outline',
    warning: 'alert-circle-outline',
    danger: 'cancel',
    info: 'information-outline',
};
export class Alert extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { type } = this.props;
        return (
            <div className={ `relative flex justify-between items-center bg-white rounded overflow-hidden p-2 space-x-1` }>
                <div className={ `absolute inset-0 border-l-4 border-${ Colors[ type ] }-400` }></div>
                <div className={ `flex items-baseline` }>
                    <Mdi icon={ Icons[ type ] } className={ `text-${ Colors[ type ] }-400 mdi-18px` } />
                </div>
                <div className={ `flex flex-grow items-center` }>
                    <p className={ `leading-tight text-xs md:text-sm` }>
                        Your account has been
                        <strong className={ `text-${ Colors[ type ] }-400` }>blocked</strong>, thank you for choose Tailwind CSS Design.
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