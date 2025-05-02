import { spawn } from 'child_process';
import os from 'os';
import chalk, { type ColorSupportLevel } from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';

// Module-scoped variables
let frontendPort = "Unknown";
let backendPort = "Unknown";

// Cross-platform clear screen
function clearScreen() {
  const isWindows = os.platform() === 'win32';
  process.stdout.write(isWindows ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
}

// Display success message when both servers are ready
function showSuccessMessage() {
  console.log(
    boxen(
      chalk.bold.green('✨ Auroni ERP Development Servers are Ready! ✨') + 
      chalk.green(`
      
  Frontend: ${chalk.underline.cyan(`http://localhost:${frontendPort}`)}
  Backend:  ${chalk.underline.cyan(`http://localhost:${backendPort}`)}
  
  `),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }
    )
  );
}

// Helper function to format and colorize output
function logOutput(service: string, message: string) {
  const serviceColor = service === 'Frontend' ? chalk.hex('#4fc3f7') : chalk.hex('#ba68c8');
  const prefix = serviceColor.bold(`[${service}]`);
  
  message.split('\n').forEach(line => {
    if (line.trim().length > 0) {
      const formattedLine = line
        .replace(/error/gi, chalk.red.bold('ERROR'))
        .replace(/warning/gi, chalk.yellow.bold('WARNING'))
        .replace(/success/gi, chalk.green.bold('SUCCESS'))
        .replace(/(http:\/\/[^\s]+)/g, chalk.underline.cyan('$1'));
      
      console.log(`${prefix} ${formattedLine}`);
    }
  });
}

async function runDevServers() {
  // Clear console in cross-platform way
  clearScreen();
  
  // Show beautiful header
  console.log(
    boxen(
      gradient.morning(
        figlet.textSync('Auroni ERP', { horizontalLayout: 'full' })
      ),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    )
  );

  console.log(chalk.bold.blue('\n🚀 Starting Auroni ERP Development Servers...\n'));

  const startTime = new Date().toLocaleTimeString();
  console.log(chalk.dim(`⏱️  Start Time: ${startTime}\n`));

  // Initialize processes with cross-platform spawn
  const frontendProcess = spawn('bun', ['run', 'dev --host'], { 
    cwd: 'frontend', 
    stdio: 'pipe',
    shell: os.platform() === 'win32' // Use shell on Windows
  });
  
  const backendProcess = spawn('bun', ['run', 'dev'], { 
    cwd: 'backend', 
    stdio: 'pipe',
    shell: os.platform() === 'win32' // Use shell on Windows
  });

  // Error handling
  frontendProcess.on('error', (err) => {
    console.error(chalk.red.bold('🚨 Frontend Error:'), chalk.red(err.message));
  });

  backendProcess.on('error', (err) => {
    console.error(chalk.red.bold('🚨 Backend Error:'), chalk.red(err.message));
  });

  let frontendStarted = false;
  let backendStarted = false;

  // Process output handlers
  frontendProcess.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Server listening on port')) {
      frontendStarted = true;
      const portRegex = /port:? (\d+)/;
      const portMatch = output.match(portRegex);
      if (portMatch && portMatch[1]) {
        frontendPort = portMatch[1];
      }
    }
    logOutput('Frontend', output);
  });

  backendProcess.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Elysia is running at')) {
      backendStarted = true;
      const portRegex = /localhost:(\d+)/;
      const portMatch = output.match(portRegex);
      if (portMatch && portMatch[1]) {
        backendPort = portMatch[1];
      }
    }
    logOutput('Backend', output);
  });

  // Check if both servers are ready
  const checkStarted = () => {
    if (frontendStarted && backendStarted) {
      showSuccessMessage();
      return;
    }
    setTimeout(checkStarted, 100);
  };

  checkStarted();

  // Cross-platform process termination
  process.on('SIGINT', () => {
    console.log(chalk.yellow.bold('\n🛑 Stopping Auroni ERP Development Servers...\n'));
    const isWindows = os.platform() === 'win32';
    
    if (isWindows) {
      frontendProcess.kill('SIGTERM');
      backendProcess.kill('SIGTERM');
    } else {
      frontendProcess.kill('SIGINT');
      backendProcess.kill('SIGINT');
    }
    
    process.exit();
  });
}

// Set color support level properly
chalk.level = 1 as ColorSupportLevel; // Basic color support

runDevServers();