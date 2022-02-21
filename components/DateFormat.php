<?php

namespace app\components;

class DateFormat
{
    public static function getWeekToString($date = null)
    {
        if (!$date) {
            $date = time();
        }
        $days = [
            'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
            'Четверг', 'Пятница', 'Суббота'
        ];
        return $days[(date('w', $date))];
    }

    public static function countDaysBetweenDates($d1, $d2)
    {

        $seconds = abs($d1 - $d2);

        return floor($seconds / 86400);
    }

    public static function getDatePass($datePass, $countDayToPass)
    {
        return date('d.m.Y H:i ', $datePass) . DateFormat::getWeekToString($datePass) .', через '. self::getPlural($countDayToPass, 'день', 'дня','дней');
    }

    public static function getPlural($number, $one, $two, $five)
    {
        if (($number - $number % 10) % 100 != 10) {
            if ($number % 10 == 1) {
                $result = $one;
            } elseif ($number % 10 >= 2 && $number % 10 <= 4) {
                $result = $two;
            } else {
                $result = $five;
            }
        } else {
            $result = $five;
        }
        return $number.' '.$result;
    }
}