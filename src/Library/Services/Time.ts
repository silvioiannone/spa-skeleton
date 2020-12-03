import DayJS from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import RelativeTime from 'dayjs/plugin/relativeTime';
import UTC from 'dayjs/plugin/utc';
import { Config } from 'spa-skeleton/src/Config';
import { Service } from './Service';

// Locales
import 'dayjs/locale/en';
import 'dayjs/locale/sv';

/**
 * Time service.
 */
export class Time extends Service
{
    /**
     * Boot the service.
     */
    public static boot(): void
    {
        // Configure DayJS.
        DayJS.extend(Duration);
        DayJS.extend(IsSameOrAfter);
        DayJS.extend(RelativeTime);
        DayJS.extend(UTC);

        Time.changeLocale();
    }

    /**
     * Change the locale.
     */
    public static changeLocale(locale: string | null = null)
    {
        DayJS.locale(locale || Config.locale);
    }
}
