<?php

namespace app\modules\api\forms;

use app\models\User;
use Yii;
use yii\base\Model;

class RegisterForm extends Model
{
    /**
     * @var string $username
     */
    public $username;

    /**
     * @var string $password
     */
    public $password;

    /**
     * @var string $password_repeat
     */
    public $password_repeat;

    /**
     * @var User $user
     */
    public $user;

    public function rules()
    {
        return [
            [['username', 'password', 'password_repeat'], 'required'],
            [['username'], 'unique', 'targetClass' => 'app\models\User'],
            [['username', 'password', 'password_repeat'], 'filter', 'filter' => 'yii\helpers\Html::encode'],
            [['password'], 'compare', 'compareAttribute' => 'password_repeat'],
            [['username', 'password'], 'string', 'min' => 6],
            [['username'], 'match', 'pattern' => '/^[a-z][a-z0-9_]{5,32}$/i'],
            [['password'], 'match', 'pattern' => '/^[^:&\.~\s]{6,64}$/']
        ];
    }

    /**
     * @return bool
     * @throws \yii\base\Exception
     */
    public function register()
    {
        $status = false;

        if ($this->validate()) {
            $user = new User();
            $user->username = $this->username;
            $user->password_hash = Yii::$app->security->generatePasswordHash($this->password);
            $user->access_token = Yii::$app->security->generateRandomString(256);

            $status = $user->save();
            $this->user = $user;
        }

        return $status;
    }
}