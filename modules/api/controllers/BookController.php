<?php

namespace app\modules\api\controllers;

use app\modules\api\models\Book;
use yii\data\ActiveDataProvider;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class BookController extends ActiveController
{
    public $modelClass = Book::class;

    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);

        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class
        ];

        $behaviors['authenticator'] = $auth;
        /*$behaviors['authenticator']['authMethods'] = [
            HttpBearerAuth::class
        ];
        $behaviors['authenticator']['except'] = ['options', 'index'];*/

        return $behaviors;
    }

    /**
     * @inheritDoc
     */
    public function actions()
    {
        $actions =  parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    /**
     * @return ActiveDataProvider
     */
    public function prepareDataProvider()
    {
        return new ActiveDataProvider([
            'query' => $this->modelClass::find()->orderBy('title')
        ]);
    }
}