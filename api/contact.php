<?php
declare(strict_types=1);


require_once "phpmailerPHPMailer/PHPMailer.php";
require_once "phpmailerPHPMailer/SMTP.php";
require_once "phpmailerPHPMailer/Exception.php";


use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

date_default_timezone_set('Africa/Accra');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

// Removes invisible control characters (keeps tabs and line breaks) and limits the length
function clean($value, int $max): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

// Turns line breaks into spaces: stops "header injection" in names and subjects
function one_line(string $value): string
{
    return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

// Makes text safe to show inside HTML
function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// 1. Only accept POST requests
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// 2. Load the secret mail settings (kept OUTSIDE Git, next to the public_html folder)
$config = null;
foreach ([dirname(__DIR__, 2) . '/mail-config.php', dirname(__DIR__) . '/mail-config.php'] as $file) {
    if (is_file($file)) {
        $config = require $file;
        break;
    }
}
if (!is_array($config) || empty($config['username']) || empty($config['password'])) {
    error_log('contact.php: mail-config.php is missing or incomplete.');
    respond(500, ['ok' => false, 'error' => 'The message could not be sent right now. Please try again later or contact us by email or WhatsApp.']);
}

// 3. Read the form data
$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

// 4. Spam trap: robots fill the hidden field. Pretend it worked and send nothing.
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

// 5. Clean and check every field again (never trust the browser)
$name    = one_line(clean($data['name'] ?? '', 100));
$subject = one_line(clean($data['subject'] ?? '', 150));
$email   = one_line(clean($data['email'] ?? '', 150));
$phone   = one_line(clean($data['phone'] ?? '', 30));
$message = clean($data['message'] ?? '', 2000);
$digits  = preg_replace('/\D/', '', $phone) ?? '';

if (
    mb_strlen($name) < 2
    || mb_strlen($subject) < 3
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || !preg_match('/^[+()\d\s-]+$/', $phone)
    || strlen($digits) < 7
    || strlen($digits) > 15
    || mb_strlen($message) < 10
) {
    respond(422, ['ok' => false, 'error' => 'Please check the form and try again.']);
}

// 6. Slow down repeat sending: one message per visitor every 30 seconds
$stamp = sys_get_temp_dir() . '/pd_contact_' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (is_file($stamp) && time() - (int) filemtime($stamp) < 30) {
    respond(429, ['ok' => false, 'error' => 'Please wait a few seconds before sending another message.']);
}

// 7. Build and send the email with PHPMailer
require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

$sentAt = date('D, d M Y, H:i');

$rows = [
    'Name'    => h($name),
    'Email'   => '<a href="mailto:' . h($email) . '" style="color:#4b1d6b;">' . h($email) . '</a>',
    'Phone'   => h($phone),
    'Subject' => h($subject),
];

$html  = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2dbe8;color:#1a1420;">';
$html .= '<div style="background:#4b1d6b;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:bold;">New website enquiry</div>';
$html .= '<table style="width:100%;border-collapse:collapse;margin:8px 0;">';
foreach ($rows as $label => $value) {
    $html .= '<tr>'
        . '<td style="padding:10px 24px;width:90px;color:#5c5266;font-size:13px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">' . $label . '</td>'
        . '<td style="padding:10px 24px 10px 0;font-size:15px;">' . $value . '</td>'
        . '</tr>';
}
$html .= '</table>';
$html .= '<div style="padding:8px 24px 24px;">';
$html .= '<p style="margin:0 0 8px;color:#5c5266;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message</p>';
$html .= '<p style="margin:0;font-size:15px;line-height:1.6;">' . nl2br(h($message)) . '</p>';
$html .= '</div>';
$html .= '<div style="background:#f5f0e8;padding:12px 24px;font-size:12px;color:#5c5266;">Sent from the Purple Designs Ltd. website on ' . h($sentAt) . '. Press Reply to answer the visitor.</div>';
$html .= '</div>';

$text = "New website enquiry\n\n"
    . "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\n"
    . "Message:\n$message\n\n"
    . "Sent from the Purple Designs Ltd. website on $sentAt.";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->CharSet    = 'UTF-8';
    $mail->Host       = (string) ($config['host'] ?? 'smtp.hostinger.com');
    $mail->Port       = (int) ($config['port'] ?? 465);
    $mail->SMTPAuth   = true;
    $mail->Username   = (string) $config['username'];
    $mail->Password   = (string) $config['password'];
    $mail->SMTPSecure = (($config['secure'] ?? 'ssl') === 'tls')
        ? PHPMailer::ENCRYPTION_STARTTLS
        : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Timeout    = 15;

    // From must be your own mailbox. The visitor goes in Reply-To, so "Reply" answers them.
    $mail->setFrom((string) ($config['from_email'] ?? $config['username']), (string) ($config['from_name'] ?? 'Website'));
    $mail->addAddress((string) ($config['to_email'] ?? $config['username']), (string) ($config['to_name'] ?? ''));
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'Website enquiry: ' . $subject;
    $mail->Body    = $html;
    $mail->AltBody = $text;

    $mail->send();

    @touch($stamp);
    respond(200, ['ok' => true]);
} catch (\Throwable $e) {
    // The real reason goes to the server log, not to the visitor
    error_log('contact.php mail error: ' . ($mail->ErrorInfo ?: $e->getMessage()));

    $body = ['ok' => false, 'error' => 'Your message could not be sent right now. Please try again, or contact us by email or WhatsApp.'];
    if (!empty($config['debug'])) {
        $body['detail'] = $mail->ErrorInfo ?: $e->getMessage(); // only while testing
    }
    respond(500, $body);
}