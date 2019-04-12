/**
 * This interface describes how an object representing a dynamic input component should be formed.
 */
export interface InputDescription
{
    type: 'input' | 'textarea';
    name: string;
    label: string;
}
