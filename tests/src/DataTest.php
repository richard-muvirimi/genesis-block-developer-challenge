<?php 
declare(strict_types=1);

/**
 * File for php unit test cases
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @package App
 * @subpackage App\Tests
 * @since 1.0.0
 * @version 1.0.0
 */

namespace App\Tests;

use PHPUnit\Framework\TestCase;

/**
 * Data Test Cases class
 *
 * @author Richard Muvirimi <rich4rdmuvirimi@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
class DataTest extends TestCase {

  /**
     * Test load environment
     *
     * @return void
     */
    public function testEnvironment(): void
    {

        $environment = environment_parse();

        $this->assertIsArray($environment);

    }

    /**
     * Test for data availability
     *
     * @return void
     */
    public function testData(): void
    {

        $tasks = task_fetch(array());
        
        $this->assertIsArray($tasks);
    }

}