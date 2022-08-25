<?php

declare(strict_types=1);

/**
 * User utility functions
 *
 * @since 1.0.0
 * @version 1.0.0
 */

use function current as array_first;

/**
 * Get user with id
 *
 * @param int $user
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return array|null
 */
function user_fetch_id(int $user):?array
{
    $query = "SELECT * FROM `{{prefix}}users` WHERE `id` = " . $user . " LIMIT 1";

    $users = database_fetchAll($query);
    if (!empty($users)) {
        return array_first($users);
    }
    return null;
}

/**
 * Get user with id
 *
 * @param string $email
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return array|null
 */
function user_fetch_email(string $email):?array
{
    $query = "SELECT * FROM `{{prefix}}users` WHERE `email` = '" . $email . "' LIMIT 1";

    $users = database_fetchAll($query);
    if (!empty($users)) {
        return array_first($users);
    }
    return null;
}

/**
 * Fetch user by token
 *
 * @param string $token
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return array|null
 */
function user_fetch_token(string $token)
{

    if (! empty($token)) {
        $token = base64_decode($token);

        if ($token !== false && str_contains($token, ':')) {
            $email = strtok($token, ':');
            $password = strtok(':');

            $user = user_fetch_email($email);
            if ($user != null && password_verify($password, $user["password"])) {
                return $user;
            }
        }
    }
    return null;
}
