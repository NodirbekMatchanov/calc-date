<?php

namespace app\modules\api\v1\controllers;

use app\modules\api\v1\models\Propusk;
use app\components\Controller;
use yii;
/**
 * Class PatientController
 */
class CalculateController extends Controller
{
    /* метод  возвращает  */
    public function actionIndex()
    {
        $requestData = Yii::$app->request->get();
        $calculate = new Propusk;
        if ($calculate->load($requestData,'') && $calculate->validate()) {
            $result = $calculate->getPropusk($requestData);
            return $this->apiCollection($result,count($result));
        } else {
            return  $this->apiValidate($calculate->errors, 'не валидные данные');
        }
    }

    /* метод  добавляет */
    public function actionAdd()
    {
        $requestData = Yii::$app->request->post();
        $patient = new Propusk;
        if($result = $patient->getPropusk($requestData)) {
            return $this->apiCreated($result);
        }
        return  $this->apiValidate($patient->errors, 'не валидные данные');
    }

}
