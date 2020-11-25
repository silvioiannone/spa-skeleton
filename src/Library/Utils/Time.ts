import DayJS from 'dayjs';

export class Time
{
    /**
     * Convert the given UTC time into local time.
     */
    public static fromUtcToLocal(dateTime: string): string
    {
        return DayJS(dateTime).utc()
            .local()
            .format('YYYY-MM-DD HH:mm:ss');
    }
}
