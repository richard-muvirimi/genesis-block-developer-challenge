<?php

declare(strict_types=1);

/**
 * Install Controller
 *
 * @since 1.0.0
 * @version 1.0.0
 */

$path = PATH_ROOT . "data" . DIRECTORY_SEPARATOR . "install.sql";

$query = file_get_contents($path);

// Set default credentials
$tokens = array(
    "{{email}}" => "tygalive@gmail.com",
    "{{password}}" => password_hash("password", PASSWORD_BCRYPT)
);

$query =  strtr($query, $tokens);

// Execute
database_exec($query);

echo "Application installed";

?>

<div>
    <a href="<?php echo environment_get("app.url") ?>">Home</a>
</div>
