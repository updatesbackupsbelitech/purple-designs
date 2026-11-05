<?php
// HOW TO USE:
// 1. Copy this file and name the copy mail-config.php
// 2. Fill in the real details
// 3. Upload it on Hostinger into the folder that CONTAINS public_html (not inside it)
// 4. NEVER commit mail-config.php to GitHub
return [
    'host'       => 'smtp.hostinger.com',
    'port'       => 465,
    'secure'     => 'ssl',   // 'ssl' with port 465, or 'tls' with port 587
    'username'   => 'info@purpledesigngh.com',      // the full mailbox address, for example info@purpledesignsltd.com
    'password'   => 'PurpleDesign178#?',      // that mailbox's password
    'from_email' => 'info@purpledesigngh.com',      // must be the same mailbox as the username
    'from_name'  => 'Purple Designs Ltd. Website',
    'to_email'   => 'yayra2012@gmail.com',      // the admin address that receives the enquiries
    'to_name'    => 'Purple Designs Ltd.',
    'debug'      => false,   // true shows the real error while testing. Set it back to false.
];