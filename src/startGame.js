const { Client } = require('minecraft-launcher-core');
const path = require('path');
const fs = require('fs/promises')
const root = '/.minecraft'
const launcher = new Client();
const {shell} = require('electron') // deconstructing assignment


async function openRootFolder() {
  const relative = './.minecraft'
  const absolutePath = path.resolve(__dirname, relative)

  const error = await shell.openPath(absolutePath)

  if (error) {
    console.log('error occured opening root folder', error)
  } else {
    console.log('success', absolutePath)
  }
}

const launchGame = () => {
  
  const logField = document.getElementById('logField')
  const playerUsername = document.querySelector('#username').value;
  const version = document.getElementById('version')?.value || '1.8.9';
  console.log(`Information
    
    Version: ${version}
    Username: ${playerUsername}
    
    `)
  const options = {
    authorization: {
      access_token: '',
      client_token: '',
      uuid: '12345678-1234-1234-1234-123456789abc',
      name: playerUsername,
      user_properties: {},
      meta: {
        type: 'offline',
        demo: false
      }
    },
    root: root,
    version: {
      number: version,
      type: 'release'
    },
    memory: {
      max: '4G',
      min: '2G'
    }
  };

  launcher.launch(options);
}

launcher.on('debug', (e) => {
  console.log('[debug]', e);
  logField.textContent += `[debug] ${e}\n`;
  logField.scrollTop = logField.scrollHeight;

});

launcher.on('data', (e) => {
  console.log('[data]', e);
  logField.textContent += `[data] ${e}\n`;
  logField.scrollTop = logField.scrollHeight;

});

launcher.on('close', () => {
  console.log('игра закрыта');
  logField.textContent += 'игра закрыта\n';
  logField.scrollTop = logField.scrollHeight;

});

