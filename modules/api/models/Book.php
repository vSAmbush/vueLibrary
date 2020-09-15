<?php

namespace app\modules\api\models;

use Yii;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "books".
 *
 * @property int $id
 * @property string $title
 * @property string|null $overview
 * @property string|null $wrap_color
 * @property int|null $created_at
 * @property int|null $updated_at
 * @property int|null $created_by
 */
class Book extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'books';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'wrap_color'], 'required'],
            [['title', 'overview'], 'filter', 'filter' => '\yii\helpers\HtmlPurifier::process'],
            [['overview'], 'string'],
            [['created_at', 'updated_at', 'created_by'], 'integer'],
            [['title'], 'string', 'max' => 32],
            [['wrap_color'], 'string', 'max' => 7],
        ];
    }

    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return [
        TimestampBehavior::class,
        [
            'class' => BlameableBehavior::class,
            'updatedByAttribute' => false
        ]
    ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'overview' => 'Overview',
            'wrap_color' => 'Wrap Color',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'created_by' => 'Created By',
        ];
    }
}
