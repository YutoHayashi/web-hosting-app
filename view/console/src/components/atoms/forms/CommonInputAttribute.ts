import React from 'react';
export type CommonInputAttribute = {
    name: string;
    max: number;
    min: number;
    maxLength: number;
    minLength: number;
    placeholder: string;
    autoComplete: string;
    required: boolean;
    autofocus: boolean;
    readonly: boolean;
    checked: boolean;
    disabled: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}
