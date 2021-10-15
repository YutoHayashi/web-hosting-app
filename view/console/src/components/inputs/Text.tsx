import React from 'react';
import { Mdi } from '../utils/Mdi';
import { Required } from './Required';
import { WithValidator } from './WithValidator';
interface Props {
    title: string;
    name: string;
    description?: string;
    required?: boolean;
    placeholder?: string;
    autocomplete?: boolean;
    autofocus?: boolean;
    max?: number;
    min?: number;
    readonly?: boolean;
    default?: string;
    color?: string;
    validation?: Array<{
        validator: ( newval: string | undefined ) => boolean;
        message: string;
    }>;
    onError?: ( value: string | undefined ) => void;
}
interface States {
    value: string | undefined;
    errorMessage: string;
}
export class Text extends WithValidator<Props, States> {
    private text: React.RefObject<HTMLInputElement> = React.createRef(  );
    private validator: ( newval: string | undefined ) => boolean;
    public constructor( props: Props ) {
        super( props );
        this.state = {
            value: this.props.default,
            errorMessage: '',
        };
        this.validator = newval => {
            const { required, validation = [  ] } = this.props;
            return [ ...validation, ...[ this.required( { required, } ), ], ].map( ( { validator, message } ) => {
                const result = validator( newval );
                if ( !result ) this.setState( { ...this.state, ...{ errorMessage: this.state.errorMessage + `${ message } `, }, } );
                return result;
            } ).reduce( ( p, c ) => p && c );
        };
    }
    public isValid(  ): boolean {
        return this.validator( this.text.current?.value );
    }
    public error( args: { value: string | undefined } ) {
        if ( this.props.onError ) this.props.onError( args.value );
    }
    public changeHandlerRegister(  ) {
        let tID: ReturnType<typeof setTimeout>;
        return ( e: React.ChangeEvent<HTMLInputElement> ) => {
            if ( tID ) clearTimeout( tID );
            tID = setTimeout( (  ) => {
                const value = this.text.current?.value;
                this.setState( { ...this.state, ...{ errorMessage: '', }, } );
                if ( !this.isValid(  ) ) {
                    this.error( { value, } );
                }
            }, 100 );
        };
    }
    public render(  ) {
        const { title, name, description = '', required = false, placeholder = '', autocomplete = false, autofocus = false, max = 255, min = 0, readonly = false, color = 'blue-500' } = this.props;
        const { value, errorMessage } = this.state;
        return (
            <label className={ `inline-block my-5 w-full cursor-pointer` }>
                <p className={ `text-sm font-bold` }>
                    { title }&nbsp;
                    { required ? <Required /> : null }
                </p>
                <small className={ `text-gray-500 text-sm` }>{ description }</small>
                <small className={ `text-red-500` }>{ errorMessage !== '' ? <><Mdi icon='alert-circle' />{ errorMessage }</> : null }</small>
                <input ref={ this.text } type='text' { ...{ name, required, } } placeholder={ placeholder !== '' ? placeholder : `${ title }` } className={ `text-base text-gray-500 font-bold w-full cursor-pointer mt-1 outline-none focus:outline-none focus:ring-0 border-t-0 border-r-0 border-l-0 border-transparent focus:border-${ color } bg-transparent` } { ...{ autoComplete: autocomplete ? 'on' : 'off', autoFocus: autofocus, maxLength: max, minLength: min, readOnly: readonly, value, onChange: this.changeHandlerRegister(  ) } } />
            </label>
        );
    }
}
