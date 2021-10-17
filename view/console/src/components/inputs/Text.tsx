import React from 'react';
import { Mdi } from '../utils/Mdi';
import { Required } from './Required';
import { InputAttribute } from './InputAttributes';
import { required } from './validator/required';
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
    className?: string;
}
interface States {
    value: string | undefined;
    errorMessage: string;
}
export class Text extends React.Component<Props, States> {
    private text = React.createRef<HTMLInputElement>(  );
    public constructor( props: Props ) {
        super( props );
        this.state = {
            value: this.props.default,
            errorMessage: '',
        };
        console.log( this );
    }
    public isValid( value?: string ): boolean {
        const _value = value || this.state.value;
        const errorMessage: string = [
            this.props.required ? required( _value ) : true,
        ].map( _ => typeof _ === 'string' ? _ : '' ).reduce( ( p, c ) => `${ p !== '' ? `${ p } ` : '' }${ c }`, '' );
        this.setState( { ...this.state, ...{ errorMessage, } } );
        return errorMessage === '';
    }
    public reset(  ) {
        this.setState( { ...this.state, ...{ errorMessage: '', value: '', }, } );
        if ( this.text.current ) this.text.current.value = '';
    }
    public get value(  ) {
        return this.state.value;
    }
    private onChange(  ): React.ChangeEventHandler<HTMLInputElement> {
        const { onError = value => null } = this.props;
        let tID: ReturnType<typeof setTimeout>;
        return e => {
            if ( tID ) clearTimeout( tID );
            const value = e.target.value;
            tID = setTimeout( (  ) => {
                this.setState( { ...this.state, ...{ value, } } );
                if ( !this.isValid( value ) ) {
                    onError( value );
                }
            }, 300 );
        };
    }
    public render(  ) {
        const { title, name, description = '', color = 'blue-500', required = true, placeholder, autoComplete = 'off', autofocus = false, readonly = false, maxLength, minLength, className } = this.props;
        const { errorMessage } = this.state;
        return (
            <label className={ `inline-block w-full cursor-pointer ${ className }` }>
                <p className={ `text-sm font-bold` }>
                    { title }&nbsp;
                    { required ? <Required /> : null }
                </p>
                <small className={ `text-gray-500 text-sm` }>{ description }</small>
                <small className={ `text-yellow-500` }>{ errorMessage !== '' ? <><Mdi icon='alert-circle' />{ errorMessage }</> : null }</small>
                <input ref={ this.text } type='text' { ...{ name, required, } } placeholder={ placeholder ? placeholder : `${ title }` } className={ `text-base text-gray-500 font-bold w-full cursor-pointer outline-none focus:outline-none focus:ring-0 border-t-0 border-r-0 border-l-0 border-gray-500 focus:border-${ color } bg-transparent py-1` } { ...{ autoComplete: autoComplete ? 'on' : 'off', autoFocus: autofocus, maxLength, minLength, readOnly: readonly, onChange: this.onChange(  ) } } />
            </label>
        );
    }
}
