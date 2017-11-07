/**
 * Object utilities.
 */
export default {

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