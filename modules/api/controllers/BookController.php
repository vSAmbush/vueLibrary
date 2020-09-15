<?php

namespace app\modules\api\controllers;

use app\modules\api\models\Book;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;
use yii\web\ForbiddenHttpException;

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
            'class' => Cors::class
        ];

        $behaviors['authenticator'] = $auth;
        $behaviors['authenticator']['authMethods'] = [
            HttpBearerAuth::class
        ];
        $behaviors['authenticator']['except'] = ['options', 'default'];

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
            'query' => $this->modelClass::find()
                ->andWhere(['created_by' => Yii::$app->user->getId()])
                ->orderBy('title')
        ]);
    }

    /**
     * @inheritDoc
     */
    public function checkAccess($action, $model = null, $params = [])
    {
        if (in_array($action, ['view', 'update', 'delete']) && $model->created_by !== Yii::$app->user->getId()) {
            throw new ForbiddenHttpException("You do not have permission!");
        }
    }

    /**
     * Returns default books (for index page)
     *
     * @return Book[]
     */
    public function actionDefault()
    {
        return $this->modelClass::find()
            ->andWhere(['created_by' => null])
            ->orderBy('title')
            ->all();
    }
}