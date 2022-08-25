<?php
declare(strict_types=1);

/**
 * Support system init
 *
 * @since 1.0.0
 * @version 1.0.0
 */

define("PATH_ROOT", dirname(__DIR__, 1) . DIRECTORY_SEPARATOR);

 // Load constants
define("PATH_INCLUDES", PATH_ROOT . "includes" . DIRECTORY_SEPARATOR);
define("PATH_CONTROLLERS", PATH_INCLUDES . "controller" . DIRECTORY_SEPARATOR);
define("PATH_UTILS", PATH_INCLUDES ."utils" . DIRECTORY_SEPARATOR);
