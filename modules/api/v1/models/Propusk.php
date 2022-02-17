<?php

namespace app\modules\api\v1\models;

use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\ServerException;
use http\Message;
use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\User;
use GuzzleHttp\Client;
use yii\helpers\Json;

class Propusk extends Model
{
    const BB = 'ББ';
    const BA = 'БА';
    const PASSDAY = 'Дневной';
    const PASSNIGHT = 'Ночной';

    public $avtoNumber;

    public function rules()
    {
        return [
            [['avtoNumber'], 'required'],
            ['avtoNumber', 'match', 'pattern' => '/^[а-яА-Я]{1}\s?[0-9]{3}\s?[а-яА-Я]{2}\s?[0-9]{2,3}$/ui', 'message' => 'Введите гос номер автомобиля на русском без пробелов'],
        ];
    }

    public function getPropusk()
    {
        try {
            $client = new Client();
            $res = $client->request('GET', 'https://app.proverit-propusk.ru/api14', [
                'query' => [
                    'number' => $this->avtoNumber,
                    'api_key' => 'qweqwe',
                ],
                'timeout' => 90
            ]);
        } catch (ConnectException $e) {
            $this->errorResponse();
        }

        $response = Json::decode($res->getBody(), true);
        if ($res->getStatusCode() == 200 && !empty($response) && $response[0]['isnotfound'] !== 1) {
            return [
                'current_pass' => $this->getCurrentPass($response),
                'pre_last_pass' => $this->getPreLastPassBB($response),
            ];
        }
        $this->errorResponse();
    }

    public function errorResponse()
    {
        throw new \yii\web\HttpException(500, 'API не доступен');
    }

    /**
     * @param array $passList
     * @return array
     */
    public function getCurrentPass(array $passList)
    {
        $currentPass = [];

        $currentPass [] = [
            'pass_type' => 'BB_DAY',
            'data' => self::getLastPass(self::PASSDAY, self::BB, $passList)
        ];
        $currentPass [] = [
            'pass_type' => 'BB_NIGHT',
            'data' => self::getLastPass(self::PASSNIGHT, self::BB, $passList)
        ];
        $currentPass [] = [
            'pass_type' => 'BA_DAY',
            'data' => self::getLastPass(self::PASSDAY, self::BA, $passList)
        ];
        $currentPass [] = [
            'pass_type' => 'BA_NIGHT',
            'data' => self::getLastPass(self::PASSNIGHT, self::BA, $passList)
        ];

        return $currentPass;
    }

    /**
     * @param array $passList
     * @return array
     */
    public function getPreLastPassBB(array $passList)
    {
        $preLastPass = [];

        $preLastPass [] = [
            'data' => self::getPreLastPass(self::BB, $passList)
        ];

        return $preLastPass;
    }

    /**
     * @param $type
     * @param $list
     * @param $seriya
     * @return array
     */
    public static function getLastPass($type, $seriya, $list)
    {
        $pass = [];
        foreach ($list as $item) {
            if (strpos($item['seriya'], $seriya) !== false && $item['passtime'] == $type) {
                $pass [] = $item;
            }
        }
        return self::getPassMaxDate($pass);
    }

    /**
     * @param $list
     * @param $seriya
     * @return array
     */
    public static function getPreLastPass($seriya, $list)
    {
        $pass = [];

        foreach ($list as $pos => $item) {
            if (strpos($item['seriya'], $seriya) !== false) {
                $pass [] = [
                    'data' => $item,
                    'pos' => $pos
                ];
            }
        }
        if (count($pass) <= 1) {
            return [];
        }
        $prePass ['date'] = $pass[1]['data']['dateend'];
        $prePass ['isDouble'] = (($pass[0]['pos'] + 1) === $pass[1]['pos']) ? 'Да' : '-' ;
        return $prePass;
    }

    /**
     * @param $list
     * @return array|mixed
     */
    public static function getPassMaxDate($list)
    {
        $maxPass = [];
        foreach ($list as $k => $item) {
            if (empty($maxPass)) {
                $maxPass = $item;
            }
            $maxPass = strtotime($item['datestart']) > $maxPass ? $item : $maxPass;
        }
        return $maxPass;
    }


}
