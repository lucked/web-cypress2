const fs = require('fs');
const { IncomingWebhook } = require('@slack/webhook');

const slackWebhookUrl = 'https://hooks.slack.com/services/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';
const webhook = new IncomingWebhook(slackWebhookUrl);

// Get the current date and time in the desired format and timezone
const now = new Date().toLocaleString('en-US', {
  timeZone: 'America/Sao_Paulo',
  dateStyle: 'short',
  timeStyle: 'short',
});

// Read the mochawesome.json file to get the test results
const mochawesomeReport = JSON.parse(fs.readFileSync('mochawesome-report/mochawesome.json', 'utf8'));

// Get the pass and fail counts
const passCount = mochawesomeReport.stats.passes;
const failCount = mochawesomeReport.stats.failures;

// Create message attachments with the pass and fail counts
const attachments = [
  {
    color: passCount > 0 ? 'good' : 'warning',
    title: 'Passes',
    text: passCount.toString(),
  },
  {
    color: failCount > 0 ? 'danger' : 'good',
    title: 'Failures',
    text: failCount.toString(),
  },
];

// If there are any failed tests, add the failed steps and screenshots to the message attachments
if (failCount > 0) {
  const failedTests = [];

  mochawesomeReport.results.forEach((result) => {
    result.suites.forEach((suite) => {
      suite.suites.forEach((testSuite) => {
        testSuite.tests.forEach((test) => {
          if (test.state === 'failed') {
            const testName = `${suite.title} ${testSuite.title} ${test.title}`;
            const testError = test.err.message;
            const testScreenshotPath = `./Screenshots/${test.title}.png`;
            let screenshotAttachment = {};
            if (fs.existsSync(testScreenshotPath)) {
              const screenshot = fs.readFileSync(testScreenshotPath);
              const screenshotBase64 = screenshot.toString('base64');
              console.log(screenshotBase64)
              screenshotAttachment = {
                color: 'danger',
                title: 'Screenshot',
                image_url: 'cid:screenshot',
                image_bytes: screenshotBase64,
              };
            }

            failedTests.push({
              color: 'danger',
              title: testName,
              text: testError,
              fields: [screenshotAttachment],
            });
          }
        });
      });
    });
  });

  attachments.push(...failedTests);
}

// Send the message to Slack
webhook.send({
  text: `*Cypress*`,
  attachments,
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Cypress runs on *${now}* \n *See the full HTML report!* \n https://adopets.github.com/web-cypress`,
      },
    },
  ],
}).then(() => {
  console.log('Message sent to Slack');
}).catch((error) => {
  console.error('Error sending message to Slack:', error);
});
