<?php
declare(strict_types=1);

/**
 * Graphql Controller
 *
 * @since 1.0.0
 * @version 1.0.0
 */

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\GraphQL as GraphQLResolver;
use GraphQL\Type\Definition\EnumType;

$userType = new ObjectType([
    'name'   => 'User',
    'fields' => function () :array {
        return[
            'id'      => [
                'type'    => Type::id(),
                'resolve' => function (array $row): int {
                    return intval($row["id"] ?? 0);
                },
            ],
            'email'  => [
                'type'    => Type::string(),
                'resolve' => function (array $row): string {
                    return $row["email"] ?? "";
                },
            ],
            'created' => [
                'type'    => Type::string(),
                'resolve' => function (array $row): string {
                    return $row["created"] ?? "";
                },
            ],
            'updated' => [
                'type'    => Type::string(),
                'resolve' => function (array $row): string {
                    return $row["updated"] ?? "";
                },
            ],
        ];
    },
]);

$statusType = new EnumType([
    'name'        => 'Status',
    'description' => 'Task Status',
    'values'      => array_combine(
        array_map(function (int $status):string {
            return 'STATUS_' . strtoupper(task_status_name($status));
        }, TASK_STATUSES),
        array_map(function (int $status):array {
            return ['value' => $status, 'description' => task_status_name($status)];
        }, TASK_STATUSES)
    ),
]);

$priorityType = new EnumType([
    'name'        => 'Priority',
    'description' => 'Task Priority',
    'values'      => array_combine(
        array_map(function (int $priority):string {
            return 'PRIORITY_' . strtoupper(task_priority_name($priority));
        }, TASK_PRIORITIES),
        array_map(function (int $priority):array {
            return ['value' => $priority, 'description' => task_priority_name($priority)];
        }, TASK_PRIORITIES)
    ),
]);

$taskType = new ObjectType([
    'name'   => 'Task',
    'fields' => function () use ($userType, $statusType, &$priorityType):array {
        return[
            'id'      => [
                'type'    => Type::id(),
                'resolve' => function (array $row): int {
                    return intval($row["id"] ?? 0);
                },
            ],
            'user' => [
                'type'    => $userType,
                'resolve' => function (array $row): array {
                    return user_fetch_id(intval($row['user'] ?? 0));
                },
            ],
            'title'     => [
                'type'    => Type::string(),
                'resolve' => function (array $row): string {
                    return $row["title"] ?? '';
                },
            ],
            'description'   => [
                'type'    => Type::string(),
                'resolve' => function (array $row):string {
                    return$row["description"] ?? '';
                },
            ],
            'status' => [
                'type'    => $statusType,
                'resolve' => function (array $row): int {
                    return intval($row["status"] ?? STATUS_OPEN);
                },
            ],
            'priority' => [
                'type'    => $priorityType,
                'resolve' => function (array $row): int {
                    return intval($row["priority"] ?? PRIORITY_MEDIUM);
                },
            ],
            'created' => [
                'type'    => Type::string(),
                'resolve' => function (array $row): string {
                    return $row["created"] ?? "";
                },
            ],
            'updated' => [
                'type'    => Type::string(),
                'resolve' => function (array $row): string {
                    return $row["updated"] ?? "";
                },
            ],
        ];
    },
]);


$queryType = new ObjectType([
    'name'   => 'Query',
    'fields' => [
        'tasks'   => [
            'type'    => Type::listOf($taskType),
            'args'    => [
                'id'       => [
                    'type'         => Type::id(),
                    'defaultValue' => 0,
                ],
                'token' => [
                    'type'         => Type::string(),
                    'defaultValue' => "",
                ],
                'search' => [
                    'type'         => Type::string(),
                    'defaultValue' => '',
                ],
                'status'    => [
                    'type'         => $statusType,
                    'defaultValue' => '',
                ],
                'priority'    => [
                    'type'         => $priorityType,
                    'defaultValue' => '',
                ],
                'offset'   => [
                    'type'         => Type::int(),
                    'defaultValue' => 0,
                ],
                'limit'    => [
                    'type'         => Type::int(),
                    'defaultValue' => 0,
                ],
            ],
            'resolve' => function ($queryType, array $args):array {
                if (user_fetch_token($args["token"]) != null) {
                    unset($args["token"]);

                    return task_fetch($args);
                }
                return array();
            },
        ],
    ],
]);

$mutationType = new ObjectType([
    'name'   => 'Mutation',
    'fields' => [
        'login'             => [
            'type'    => $userType,
            'args'    => [
                'token' => [
                    'type'         => Type::string(),
                    'defaultValue' => '',
                ],
            ],
            'resolve' => function ($queryType, array $args) :?array {
                return user_fetch_token($args['token']);
            },
        ],
        "task" => [
            'type'    => Type::boolean(),
            'args'    => [
                'id' => [
                    'type'         => Type::id(),
                    'defaultValue' => null,
                ],
                'token' => [
                    'type'         => Type::string(),
                    'defaultValue' => "",
                ],
                'title' => [
                    'type'         => Type::string(),
                ],
                'description' => [
                    'type'         => Type::string(),
                ],
                'status' => [
                    'type'         => $statusType,
                ],
                'priority' => [
                    'type'         => $priorityType,
                ],
            ],
            'resolve' => function ($queryType, array $args) :bool {
           
                $user = user_fetch_token($args["token"]);

                if ($user != null) {
                    unset($args["token"]);

                    $args["user"] = $user["id"];
                    task_save($args);
                    return true;
                }
                return false;
            },
        ],
        "delete" => [
            'type'    => Type::boolean(),
            'args'    => [
                'id' => [
                    'type'         => Type::id(),
                    'defaultValue' => null,
                ],
                'token' => [
                    'type'         => Type::string(),
                    'defaultValue' => "",
                ]
            ],
            'resolve' => function ($queryType, array $args) :bool {
           
                $user = user_fetch_token($args["token"]);

                if ($user != null) {
                    task_delete(intval($args["id"]));
                    return true;
                }
                return false;
            },
        ],
    ]
]);

$input     = file_get_contents('php://input');
$input     = json_decode($input, true);
$query     = $input['query'];
$variables = isset($input['variables']) ? $input['variables'] : null;

$schema = new Schema([
    'query'    => $queryType,
    'mutation' => $mutationType,
]);

try {
    $result   = GraphQLResolver::executeQuery($schema, $query, null, null, $variables);
    $response = $result->toArray();
} catch (Exception $e) {
    $response = [
        'errors' => [
            [
                'message' => $e->getMessage(),
            ],
        ],
    ];
}

header("content-type: application/json");

echo json_encode($response);
