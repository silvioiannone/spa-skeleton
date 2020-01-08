/**
 * This interface describes how an object representing a dynamic input component should be formed.
 */
export interface InputDescription
{
    kind: 'input' | 'textarea';
    name: string;
    label: string;
    type: string;
}
