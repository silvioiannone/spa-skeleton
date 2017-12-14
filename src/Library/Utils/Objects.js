import _ from 'lodash';

/**
 * Object utilities.
 */
export default {

    /**
     * Pluck a list of unique items from a collection.
     *
     * This only works for collection of items returned by the API.
     *
     * @param {array} subject
     * @param {String} key
     */
    pluckUnique(subject, key)
    {
        let uniques = _(_.map(subject, key)).compact();

        if (Array.isArray(uniques.value()[0])) {
            uniques = uniques.flatten();
        }

        return uniques.uniqBy(item => {
            if (typeof item !== 'object') {
                return item;
            }
            return item.id;
        })
            .value();
    },

    /**
     * Search the subject in an array of objects.
     *
     * @param {String} subject
     * @param {[]} objects
     */
    search(subject, objects)
    {
        return objects.filter((currentObject) =>
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

                        if(string.indexOf(subject.toLowerCase()) !== -1)
                        {
                            foundAMatch = true;
                        }
                        break;
                }
            }

            return foundAMatch;
        });
    }
}
