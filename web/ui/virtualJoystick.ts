import Phaser from 'phaser'

type Options = { x: number; y: number; radius: number }

export default class VirtualJoystick {
  private scene: Phaser.Scene
  private base: Phaser.GameObjects.Arc
  private knob: Phaser.GameObjects.Arc
  private pointerId: number | null = null
  private origin = new Phaser.Math.Vector2()
  public vector = new Phaser.Math.Vector2()
  private radius: number

  constructor(scene: Phaser.Scene, opts: Options) {
    this.scene = scene
    this.radius = opts.radius

    this.base = scene.add.circle(opts.x, opts.y, this.radius, 0xffffff, 0.08)
    this.base.setScrollFactor(0)
    this.knob = scene.add.circle(opts.x, opts.y, this.radius * 0.45, 0xffffff, 0.25)
    this.knob.setScrollFactor(0)

    this.origin.set(opts.x, opts.y)

    scene.input.on('pointerdown', this.onDown, this)
    scene.input.on('pointermove', this.onMove, this)
    scene.input.on('pointerup', this.onUp, this)
  }

  setPosition(x: number, y: number) {
    this.base.setPosition(x, y)
    this.knob.setPosition(x, y)
    this.origin.set(x, y)
  }

  private onDown(pointer: Phaser.Input.Pointer) {
    if (this.pointerId !== null) return
    // Left half activation
    if (pointer.x > this.scene.cameras.main.width * 0.5) return

    this.pointerId = pointer.id
    this.origin.set(pointer.x, pointer.y)
    this.base.setPosition(pointer.x, pointer.y)
    this.knob.setPosition(pointer.x, pointer.y)
  }

  private onMove(pointer: Phaser.Input.Pointer) {
    if (this.pointerId !== pointer.id) return

    const dx = pointer.x - this.origin.x
    const dy = pointer.y - this.origin.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    const max = this.radius
    const clamped = Math.min(dist, max)
    const angle = Math.atan2(dy, dx)

    const nx = Math.cos(angle) * clamped
    const ny = Math.sin(angle) * clamped

    this.knob.setPosition(this.origin.x + nx, this.origin.y + ny)

    // Normalized vector (-1..1)
    this.vector.set(nx / max, ny / max)
  }

  private onUp(pointer: Phaser.Input.Pointer) {
    if (this.pointerId !== pointer.id) return
    this.pointerId = null
    this.knob.setPosition(this.origin.x, this.origin.y)
    this.vector.set(0, 0)
  }
}
