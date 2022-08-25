<?php

declare(strict_types=1);

/**
 * Path utility functions
 *
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * Remove surrounding slashes and lowercase given string
 *
 * @param string|null $route
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return string
 */
function normalize_route(?string $route):string
{
    return strtolower(trim($route ?? "", "\\/"));
}
