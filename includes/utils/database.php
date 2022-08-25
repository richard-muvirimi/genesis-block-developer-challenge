<?php

declare(strict_types=1);

/**
 * Database utility functions
 *
 * @since 1.0.0
 * @version 1.0.0
 */

 /**
  * Get Database connection
  *
  * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
  * @since 1.0.0
  * @version 1.0.0
  *
  * @return PDO
  */
function database_connection():PDO
{
    static $connection;

    if (!isset($connection)) {
        $databaseHost = environment_get("database.host");
        $databaseName = environment_get("database.name");
        $databaseUser = environment_get("database.user");
        $databasePassword = environment_get("database.password");

        $connection = new PDO("mysql:host=$databaseHost;dbname=$databaseName", $databaseUser, $databasePassword);
    
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    return $connection;
}

/**
 * Execute database query
 *
 * @param string $query
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return PDOStatement
 */
function database_execute(string $query):PDOStatement
{
    $connection = database_connection();

    $query = database_normalize_query($query);

    $statement = $connection->prepare($query);
    $statement->execute();

    return $statement;
}

/**
 * Fetch data from the database
 *
 * @param string $query
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return array
 */
function database_fetchAll(string $query):array
{
    $statement = database_execute($query);

    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetchAll();
}

/**
 * Execute no result query
 *
 * @param string $query
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return void
 */
function database_exec(string $query):void
{
    $connection = database_connection();

    $query = database_normalize_query($query);

    $connection->exec($query);
}

/**
 * Normalize database queries
 *
 * @param string $query
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 *
 * @return string
 */
function database_normalize_query(string $query):string
{
    $tokens = array(
        "{{prefix}}" => environment_get("database.prefix")
    );

    $query =  strtr($query, $tokens);

    return $query;
}
