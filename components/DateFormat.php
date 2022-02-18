<?php

namespace app\components;

class DateFormat
{
    public static function getWeekToString(){
        $days = [
            'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
            'Четверг', 'Пятница', 'Суббота'
        ];
        return $days[(date('w', time()))];
    }
}