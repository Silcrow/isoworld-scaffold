import Phaser from 'phaser'
import PlayScene from './scenes/PlayScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  backgroundColor: '#1b1b1f',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 450
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  input: { activePointers: 3 },
  scene: [PlayScene]
}

// eslint-disable-next-line no-new
new Phaser.Game(config)

// Register service worker (A2HS)
if ('serviceWorker' in navigator) {
  // During dev with Vite, SW works best on the preview/production build.
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .catch((err) => console.error('SW registration failed', err))
  })
}
