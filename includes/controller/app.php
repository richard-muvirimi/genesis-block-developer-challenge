<?php
declare(strict_types=1);

/**
 * App Controller
 *
 * @since 1.0.0
 * @version 1.0.0
 */

 $url = rtrim(environment_get("app.url"), "\//");

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />

<!--   <link rel="manifest" href="ui/build/manifest.json" /> -->

  <title>Genesis Block Africa Developer Challenge</title>
  <meta name="author" content="Richard Muvirimi" />
  <meta name="description" content="Basic support ticket system for Genesis Block Africa Developer Challenge" />

</head>

<body>
  <noscript>You need to enable JavaScript to run this site</noscript>
  <div id="root" ></div>

  <script src="<?php echo $url ?>/ui/build/main.js" type="text/javascript" ></script>

</body>

</html>
