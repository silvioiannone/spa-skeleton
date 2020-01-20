/**
 * This interface describes how an object representing a dynamic input component should be formed.
 */
export interface InputDescription
{
    kind: 'input' | 'textarea' | 'file';
    name: string;
    label: string;
    placeholder: string;
    type: string;
}
