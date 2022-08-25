<?php

declare(strict_types=1);

/**
 * Task utility functions
 *
 * @since 1.0.0
 * @version 1.0.0
 */

 // Statuses
define("STATUS_OPEN", 0);
define("STATUS_CLOSED", 1);

define("TASK_STATUSES", array(STATUS_OPEN, STATUS_CLOSED));

// Priorities
define('PRIORITY_CRITICAL', 3);
define('PRIORITY_HIGH', 2);
define('PRIORITY_MEDIUM', 1);
define('PRIORITY_LOW', 0);

define("TASK_PRIORITIES", array(PRIORITY_LOW, PRIORITY_MEDIUM, PRIORITY_HIGH, PRIORITY_CRITICAL));

/**
 * Constant Names
 *
 * @since 1.0.0
 * @version 1.0.0
 */

 /**
  * Get the name of a task status
  *
  * @param int $status
  *
  * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
  * @since 1.0.0
  * @version 1.0.0
  *
  * @return string
  */
function task_status_name(int $status):string
{
    switch ($status) {
        case STATUS_OPEN:
            return "Open";
        case STATUS_CLOSED:
            return "Closed";
        default:
            return "";
    }
}

  /**
  * Get the name of a task priority
  *
  * @param int $priority
  *
  * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
  * @since 1.0.0
  * @version 1.0.0
  *
  * @return string
  */
function task_priority_name(int $priority):string
{
    switch ($priority) {
        case PRIORITY_LOW:
            return "Low";
        case PRIORITY_MEDIUM:
            return "Medium";
        case PRIORITY_HIGH:
            return "High";
        case PRIORITY_CRITICAL:
            return "Critical";
        default:
            return "";
    }
}

 /**
  * Fetch filtered tasks
  *
  * @param array $filter
  *
  * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
  * @since 1.0.0
  * @version 1.0.0
  *
  * @return array
  */
function task_fetch(array $filter):array
{

    $filter = array_filter($filter);

    $query = "SELECT * FROM `{{prefix}}tasks`";

    $delimiter = " WHERE ";
    foreach ($filter as $field => $value) {
        $query .= $delimiter;

        switch ($field) {
            case "id":
            case "status":
            case "priority":
                $query .= " `". $field ."` = " . $value;
                break;
            case "search":
                $query .= " `". $field ."` LIKE '%" . $value . "%'";
                break;
        }

        $delimiter = "";
    }

    if (array_key_exists("limit", $filter)) {
        $query .= " LIMIT " . $filter["limit"];
    }

    if (array_key_exists("offset", $filter)) {
        $query .= " OFFSET " . $filter["offset"];
    }

    return database_fetchAll($query);
}

 /**
  * Save task to database
  *
  * @param array $data
  *
  * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
  * @since 1.0.0
  * @version 1.0.0
  *
  * @return void
  */
function task_save(array $data):void
{

    if ($data["id"] != null) {
        // phpcs:ignore Generic.Files.LineLength.TooLong
        $query = "UPDATE `{{prefix}}tasks` SET `user` = ".$data["user"].", `title` = '".$data["title"]."', `description` = '".$data["description"]."', `status` = ".$data["status"].", `priority` = ".$data["priority"]." WHERE `id` = ".$data["id"] . ";";
    } else {
        // phpcs:ignore Generic.Files.LineLength.TooLong
        $query = "INSERT INTO `{{prefix}}tasks` (`user`, `title`, `description`, `status`, `priority`) VALUES (".$data["user"].", '".$data["title"]."', '".$data["description"]."', ".$data["status"].", ".$data["priority"].");";
    }

    database_exec($query);
}

 /**
  * Delete task from database
  *
  * @param int $id
  *
  * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
  * @since 1.0.0
  * @version 1.0.0
  *
  * @return void
  */
function task_delete(int $id):void
{
    $query = "DELETE FROM `{{prefix}}tasks` WHERE `id` = " . $id;

    database_exec($query);
}
