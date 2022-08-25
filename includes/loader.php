<?php
declare(strict_types=1);

/**
 * Support system init
 *
 * @since 1.0.0
 * @version 1.0.0
 */

include "constants.php";

// Load files
include PATH_UTILS . "task.php";
include PATH_UTILS . "user.php";
include PATH_UTILS . "config.php";
include PATH_UTILS . "route.php";
include PATH_UTILS . "database.php";

// And finally
include PATH_INCLUDES . "dispatcher.php";
