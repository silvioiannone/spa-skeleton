import Moment from 'moment';

export class Time
{
    /**
     * Convert the given UTC time into local time.
     */
    public static fromUtcToLocal(dateTime: string): string
    {
        return Moment(Moment.utc(dateTime))
            .local()
            .format('YYYY-MM-DD HH:mm:ss');
    }
}
