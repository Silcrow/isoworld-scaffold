import Phaser from 'phaser'
import VirtualJoystick from '../ui/virtualJoystick'
import ActionButtons from '../ui/actionButtons'

export default class PlayScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private joystick!: VirtualJoystick
  private buttons!: ActionButtons
  private speed = 200

  constructor() {
    super('PlayScene')
  }

  preload() {
    // Generate simple textures for player and UI
    const playerCanvas = this.textures.createCanvas('player', 32, 32)
    const ctx = playerCanvas.getContext()
    ctx.fillStyle = '#4ad'
    ctx.fillRect(0, 0, 32, 32)
    playerCanvas.refresh()

    const btnCanvas = this.textures.createCanvas('btn', 64, 64)
    const bctx = btnCanvas.getContext()
    bctx.fillStyle = 'rgba(255,255,255,0.15)'
    bctx.beginPath()
    bctx.arc(32, 32, 30, 0, Math.PI * 2)
    bctx.fill()
    btnCanvas.refresh()
  }

  create() {
    // Placeholder grid background
    const g = this.add.graphics()
    g.lineStyle(1, 0x2a2a32, 1)
    for (let x = 0; x < 2000; x += 64) g.lineBetween(x, 0, x, 2000)
    for (let y = 0; y < 2000; y += 64) g.lineBetween(0, y, 2000, y)

    // World bounds
    this.physics.world.setBounds(0, 0, 2000, 2000)

    // Player
    this.player = this.physics.add.sprite(400, 300, 'player')
    this.player.setCollideWorldBounds(true)

    // Camera
    this.cameras.main.setZoom(1)
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)

    // Portal zone
    const portal = this.add.zone(600, 600, 64, 64)
    this.physics.world.enable(portal)
    ;(portal.body as Phaser.Physics.Arcade.Body).setAllowGravity(false)
    ;(portal.body as Phaser.Physics.Arcade.Body).setImmovable(true)

    this.physics.add.overlap(this.player, portal, () => {
      // Simulate map load
      // eslint-disable-next-line no-console
      console.log('Loading Map: demo-2')
      this.tweens.add({
        targets: this.player,
        scale: { from: 1, to: 1.2 },
        yoyo: true,
        duration: 120
      })
    })

    // UI
    const cam = this.cameras.main
    this.joystick = new VirtualJoystick(this, {
      x: 120,
      y: cam.height - 120,
      radius: 60
    })

    this.buttons = new ActionButtons(this, {
      x: cam.width - 120,
      y: cam.height - 120,
      spacing: 80
    })

    this.buttons.onAction1(() => {
      this.player.setTint(0xffaa00)
      this.time.delayedCall(120, () => this.player.clearTint())
      // eslint-disable-next-line no-console
      console.log('Action 1!')
    })

    this.buttons.onAction2(() => {
      this.player.setScale(1.15)
      this.time.delayedCall(120, () => this.player.setScale(1))
      // eslint-disable-next-line no-console
      console.log('Action 2!')
    })

    // Resize-safe UI
    this.scale.on('resize', () => this.layoutUI())
    this.layoutUI()
  }

  update() {
    const v = this.joystick.vector
    this.player.setVelocity(v.x * this.speed, v.y * this.speed)
    if (v.x !== 0 || v.y !== 0) {
      const angle = Math.atan2(v.y, v.x)
      this.player.setRotation(angle)
    }
  }

  private layoutUI() {
    const cam = this.cameras.main
    this.joystick.setPosition(120, cam.height - 120)
    this.buttons.setPosition(cam.width - 120, cam.height - 120)
  }
}
