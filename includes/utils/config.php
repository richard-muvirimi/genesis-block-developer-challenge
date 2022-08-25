<?php

declare(strict_types=1);

/**
 * Environment utility functions
 *
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * Parse environment file
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return array
 */
function environment_parse():array
{
    static $environment;

    if (!isset($environment)) {
        $path = PATH_ROOT . ".env";
        if (file_exists($path)) {
            $environment = parse_ini_file($path);
        } else {
            throw new Exception("Environment file not found.");
        }
    }
    return $environment;
}

/**
 * Get environment variable
 *
 * @param string $name
 * @param mixed $default
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return mixed
 */
function environment_get(string $name, $default = "")
{

    $environment = environment_parse();

    if (array_key_exists($name, $environment)) {
        return $environment[$name];
    }
    return $default;
}
