import React from 'react';
import { Mdi } from '../utils/Mdi';
import { Required } from './Required';
import { InputAttribute } from './InputAttributes';
interface Props extends InputAttribute {
    title: string;
    name: string;
    description?: string;
    default?: string;
    color?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    onError?: ( value: string | undefined ) => void;
}
interface States {
    value: string | undefined;
    errorMessage: string;
}
export class Text extends React.Component<Props, States> {
    private requiredMessage: string = 'This is a required field.';
    public constructor( props: Props ) {
        super( props );
        this.state = {
            value: this.props.default,
            errorMessage: '',
        };
    }
    private required( value: string | undefined ): true | string {
        const result: boolean = this.props.required ? !!value : true;
        return result || this.requiredMessage;
    }
    public isValid( value?: string ): boolean {
        const errorMessage: string = [
            this.required( value ),
        ].map( _ => typeof _ === 'string' ? _ : '' ).reduce( ( p, c ) => `${ p !== '' ? `${ p } ` : '' }${ c }`, '' );
        this.setState( { ...this.state, ...{ errorMessage, } } );
        return errorMessage === '';
    }
    private onChange(  ): React.ChangeEventHandler<HTMLInputElement> {
        const { onError = value => null } = this.props;
        let tID: ReturnType<typeof setTimeout>;
        return e => {
            if ( tID ) clearTimeout( tID );
            const value = e.target.value;
            tID = setTimeout( (  ) => {
                if ( this.isValid( value ) ) onError( value );
            }, 500 );
        };
    }
    public render(  ) {
        const { title, name, description = '', color = 'blue-500', required = true, placeholder, autocomplete = false, autofocus = false, readonly = false, maxLength, minLength, } = this.props;
        const { value, errorMessage } = this.state;
        return (
            <label className={ `inline-block my-5 w-full cursor-pointer` }>
                <p className={ `text-sm font-bold` }>
                    { title }&nbsp;
                    { required ? <Required /> : null }
                </p>
                <small className={ `text-gray-500 text-sm` }>{ description }</small>
                <small className={ `text-red-500` }>{ errorMessage !== '' ? <><Mdi icon='alert-circle' />{ errorMessage }</> : null }</small>
                <input type='text' { ...{ name, required, } } placeholder={ placeholder !== '' ? placeholder : `${ title }` } className={ `text-base text-gray-500 font-bold w-full cursor-pointer mt-1 outline-none focus:outline-none focus:ring-0 border-t-0 border-r-0 border-l-0 border-transparent focus:border-${ color } bg-transparent` } { ...{ autoComplete: autocomplete ? 'on' : 'off', autoFocus: autofocus, maxLength, minLength, readOnly: readonly, value, onChange: this.onChange(  ) } } />
            </label>
        );
    }
}
