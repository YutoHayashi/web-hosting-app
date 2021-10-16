import React, { ReactNode } from 'react';
type ValueType = string | number | boolean | undefined;
export interface ValidationProps {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
    validation?: Array<{
        validator: ( newval: ValueType ) => boolean;
        message: string;
    }>;
    onError?: ( value: ValueType ) => void;
    children: ( params: { validation: ( value: ValueType ) => string } ) => ReactNode;
}
interface States {
    errorMessage: string;
}
export class WithValidator extends React.Component<ValidationProps, States> {
    private requiredMessage: string = 'This is a required field.';
    private emailMessage: string = '';
    private maxLengthMessage: string= 'a';
    private minLengthMessage: string = '';
    private maxMessage: string = '';
    private minMessage: string = '';
    public constructor( props: ValidationProps ) {
        super( props );
    }
    private required( value: ValueType ): true | string {
        const result: boolean = this.props.required ? !!value : true;
        return result || this.requiredMessage;
    }
    private maxLength( value: ValueType ): true | string {
        const result: boolean = value ? ( value.toString(  ).length < ( this.props.maxLength || 255 ) ) : true;
        return result || this.maxLengthMessage;
    }
    private validation( value: ValueType ): string {
        return [
            this.required( value ),
        ].map( _ => typeof _ === 'string' ? _ : '' ).reduce( ( p, c ) => `${ p }${ c ? ` ${ c }` : '' }`, '' );
    }
    public render(  ) {
        const { children } = this.props;
        const { validation } = this;
        return children( { validation } );
    }
    // protected validator: ( newval: ValueType ) => boolean = newval => false;
    // protected requiredMessage: string = 'This is a required field.';
    // protected emailMessage: string = '';
    // protected maxLengthMessage: string= 'a';
    // protected minLengthMessage: string = '';
    // protected maxMessage: string = '';
    // protected minMessage: string = '';
    // public constructor( props: Props ) {
    //     const _props: Props & ValidationProps = { ...{ required: false, maxLength: 255, minLength: 0, min: 0, max: 255, validation: [  ], onError: value => null, }, ...props, };
    //     super( _props );
    //     console.log( this.props );
    //     this.validator = newval => {
    //         console.log( this,this.props );
    //         const { required, validation, maxLength } = this.props;
    //         return [ ...validation, ...[ this.required( { required, } ), this.maxLength( { maxLength } ) ], ].map( ( { validator, message } ) => {
    //             const result = validator( newval );
    //             if ( !result ) this.setState( { ...this.state, ...{ errorMessage: this.state.errorMessage + `${ message } `, }, } );
    //             return result;
    //         } ).reduce( ( p, c ) => p && c );
    //     };
    // }
    // protected required( args: { required?: boolean } ) {
    //     return {
    //         validator: ( value: ValueType ) => args.required ? !!value : true,
    //         message: this.requiredMessage,
    //     };
    // }
    // protected maxLength( args: { maxLength: number } ) {
    //     return {
    //         validator: ( value: ValueType ) => value ? args.maxLength > value.toString(  ).length : true,
    //         message: this.maxLengthMessage,
    //     };
    // }
    // protected isValid( value: ValueType ) {
    //     return this.validator( value );
    // }
    // protected error( value: ValueType ) {
    //     if ( this.props.onError ) this.props.onError( value );
    // }
    // protected validation(  ) {
    //     let tID: ReturnType<typeof setTimeout>;
    //     return ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
    //         if ( tID ) clearTimeout( tID );
    //         tID = setTimeout( (  ) => {
    //             const value = e.target.value;
    //             this.setState( { ...this.state, ...{ errorMessage: '', }, } );
    //             if ( !this.isValid( value ) ) this.error( value );
    //         }, 500 );
    //     };
    // }
}
