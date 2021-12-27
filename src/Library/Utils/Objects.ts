import { compact, map, values, flatten, uniqBy } from 'lodash';

/**
 * Object utilities.
 */
let Objects = {

    /**
     * Pluck a list of unique items from a collection.
     *
     * This only works for collection of items returned by the API.
     */
    pluckUnique(subject: any[], key: string): any
    {
        let uniques = compact(map(subject, key));

        if (Array.isArray(values(uniques)[0])) {
            uniques = flatten(uniques);
        }

        return uniqBy(uniques, (item): any => {
            if (typeof item !== 'object') {
                return item;
            }
            return item.id;
        });
    },

    /**
     * Search the subject in an array of objects.
     */
    search(subject: string, objects: any[]): any[]
    {
        return objects.filter((currentObject): boolean =>
        {
            let foundAMatch = false;

            for(let property in currentObject)
            {
                // If the property and the subject types do not match skip to
                // the next property.
                if(typeof property !== typeof subject) continue;

                switch (typeof currentObject[property])
                {
                    case 'string':
                        let string = currentObject[property].toLowerCase();

                        if(string.indexOf(subject.toLowerCase()) !== -1) {
                            foundAMatch = true;
                        }
                        break;
                }
            }

            return foundAMatch;
        });
    }
}

export { Objects };
