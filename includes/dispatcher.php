<?php
declare(strict_types=1);

/**
 * Basic path router
 *
 * @since 1.0.0
 * @version 1.0.0
 */

try {
    $route = $_SERVER["REQUEST_URI"] ?? "";

    if (php_sapi_name() != "cli") {
        $route = normalize_route($route);

        switch ($route) {
            case "graphql":
                include PATH_CONTROLLERS . "graphql.php";
                break;
            case "install":
                include PATH_CONTROLLERS . "install.php";
                break;
            default:
                include PATH_CONTROLLERS . "app.php";
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
