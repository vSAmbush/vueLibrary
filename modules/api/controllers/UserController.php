<?php

namespace app\modules\api\controllers;

use app\models\LoginForm;
use app\modules\api\forms\RegisterForm;
use Yii;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\Controller;

class UserController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return ArrayHelper::merge([
            [
                'class' => Cors::class,
            ],
        ], parent::behaviors());
    }

    /**
     * @inheritDoc
     */
    protected function verbs()
    {
        return [
            'register' => ['POST'],
            'login' => ['POST']
        ];
    }

    public function actionRegister()
    {
        $form = new RegisterForm();

        if ($form->load(Yii::$app->request->post(), '') && $form->register()) {
            Yii::$app->response->statusCode = 201;
            return [
                'status' => true
            ];
        }

        if ($form->user) {
            return $form->user;
        }

        Yii::$app->response->statusCode = 422;
        return $form;
    }

    public function actionLogin()
    {
        $form = new LoginForm();

        if ($form->load(Yii::$app->request->post(), '') && $form->login()) {
            return $form->getUser();
        }

        return $form;
    }
}