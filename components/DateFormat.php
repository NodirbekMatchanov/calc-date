<?php

namespace app\components;

class DateFormat
{
    public static function getWeekToString($date = null){
        if(!$date){
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
        $d1_ts = strtotime($d1);
        $d2_ts = strtotime($d2);

        $seconds = abs($d1_ts - $d2_ts);

        return floor($seconds / 86400);
    }
}