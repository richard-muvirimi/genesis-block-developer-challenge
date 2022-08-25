CREATE TABLE IF NOT EXISTS `{{prefix}}users` (
    `id` INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `{{prefix}}tasks` (
    `id` INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user` INT(5) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `status` INT(2) NOT NULL,
    `priority` INT(2) NOT NULL,
    `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO `{{prefix}}users` (`id`, `email`, `password`) VALUES (1, '{{email}}', '{{password}}');

INSERT IGNORE INTO `{{prefix}}tasks` (`id`, `user`, `title`, `description`, `status`, `priority`) VALUES (1, 1, 'Sample Task', 'Sample Description', 0, 1);
INSERT IGNORE INTO `{{prefix}}tasks` (`id`, `user`, `title`, `description`, `status`, `priority`) VALUES (2, 1, 'Sample Task', 'Sample Description', 0, 2);
INSERT IGNORE INTO `{{prefix}}tasks` (`id`, `user`, `title`, `description`, `status`, `priority`) VALUES (3, 1, 'Sample Task', 'Sample Description', 0, 3);