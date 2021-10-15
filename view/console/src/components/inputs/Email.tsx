import React from 'react';
import { Required } from './Required';
interface Props {
    title: string;
    description?: string;
    required?: boolean;
    placeholder?: string;
    autocomplete?: boolean;
}
interface States {  }
export class Text extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { title, description = '', required = false, placeholder = '', autocomplete = false, } = this.props;
        return (
            <label className={ `inline-block my-5 w-full cursor-pointer` }>
                <p className={ `text-sm font-bold` }>
                    { title }&nbsp;
                    { required ? <Required /> : null }
                </p>
                <small className={ `text-gray-500 text-sm` }>{ description }</small>
                <input type='email' placeholder={ placeholder !== '' ? placeholder : `${ title }` } className={ `text-base text-gray-500 font-bold w-full cursor-pointer mt-1 outline-none focus:outline-none focus:ring-0 border-t-0 border-r-0 border-l-0 border-transparent focus:border-blue-500 bg-transparent` } { ...{ required } } { ...{ autoComplete: autocomplete ? 'on' : 'off' } } />
            </label>
        );
    }
}
