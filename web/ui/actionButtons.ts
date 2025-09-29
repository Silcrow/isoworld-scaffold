import Phaser from 'phaser'

type Options = { x: number; y: number; spacing: number }

export default class ActionButtons {
  private scene: Phaser.Scene
  private btn1: Phaser.GameObjects.Image
  private btn2: Phaser.GameObjects.Image
  private onA1: (() => void) | null = null
  private onA2: (() => void) | null = null

  constructor(scene: Phaser.Scene, opts: Options) {
    this.scene = scene

    // Create simple circular button texture if missing
    if (!scene.textures.exists('btn')) {
      const c = scene.textures.createCanvas('btn', 64, 64)
      const ctx = c.getContext()
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.beginPath()
      ctx.arc(32, 32, 30, 0, Math.PI * 2)
      ctx.fill()
      c.refresh()
    }

    this.btn1 = scene.add.image(opts.x, opts.y, 'btn').setInteractive({ useHandCursor: false })
    this.btn1.setScrollFactor(0)
    this.btn2 = scene.add.image(opts.x - opts.spacing, opts.y - opts.spacing, 'btn').setInteractive({ useHandCursor: false })
    this.btn2.setScrollFactor(0)

    this.btn1.on('pointerdown', () => {
      this.pulse(this.btn1)
      this.onA1?.()
    })
    this.btn2.on('pointerdown', () => {
      this.pulse(this.btn2)
      this.onA2?.()
    })
  }

  setPosition(x: number, y: number) {
    this.btn1.setPosition(x, y)
    // offset diagonally
    const offset = 80
    this.btn2.setPosition(x - offset, y - offset)
  }

  onAction1(cb: () => void) { this.onA1 = cb }
  onAction2(cb: () => void) { this.onA2 = cb }

  private pulse(obj: Phaser.GameObjects.Image) {
    this.scene.tweens.add({ targets: obj, scale: { from: 1, to: 0.9 }, yoyo: true, duration: 80 })
  }
}
