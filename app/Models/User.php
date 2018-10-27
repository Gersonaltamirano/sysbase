<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class User
 * @package App\Models
 * @version October 26, 2018, 6:59 pm CST
 *
 * @property \Illuminate\Database\Eloquent\Collection optionUser
 * @property \Illuminate\Database\Eloquent\Collection rolUser
 * @property \Illuminate\Database\Eloquent\Collection Uimage
 * @property string username
 * @property string name
 * @property string email
 * @property string password
 * @property string remember_token
 */
class User extends Model
{
    use SoftDeletes;

    public $table = 'users';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'username',
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'username' => 'string',
        'name' => 'string',
        'email' => 'string',
        'password' => 'string',
        'remember_token' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name'     => 'required|max:255',
        'username' => 'sometimes|required|max:255|unique:users',
        'email'    => 'required|email|max:255',
        'password' => 'required|min:6|confirmed',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function options()
    {
        return $this->belongsToMany(\App\Models\Option::class, 'option_user');
    }

    public function opciones()
    {
        return $this->belongsToMany(\App\Option::class, 'option_user');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function rols()
    {
        return $this->belongsToMany(\App\Models\Rol::class, 'rol_user');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function uimages()
    {
        return $this->hasMany(\App\Models\Uimage::class);
    }

    public function imagen()
    {
        $imagen = $this->uimages()->first();

        $imagen = is_null($imagen) ? asset('img/avatar_none.png') : srcImgBynary($imagen);

        return $imagen;
    }
}
