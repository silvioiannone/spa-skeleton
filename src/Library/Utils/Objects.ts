import _ from 'lodash';

/**
 * Object utilities.
 */
export default {

    /**
     * Pluck a list of unique items from a collection.
     *
     * This only works for collection of items returned by the API.
     */
    pluckUnique(subject: any[], key: string): any
    {
        let uniques = _(_.map(subject, key)).compact();

        if (Array.isArray(uniques.value()[0])) {
            uniques = uniques.flatten();
        }

        return uniques.uniqBy((item): any => {
            if (typeof item !== 'object') {
                return item;
            }
            return item.id;
        })
            .value();
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
