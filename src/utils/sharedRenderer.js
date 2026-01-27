import * as THREE from "three";

class SharedRenderer {
  constructor() {
    this.renderer = null;
    this.scenes = new Map();
    this.cameras = new Map();
    this.isRendering = false;
    this.renderQueue = [];
  }

  init() {
    if (this.renderer) return this.renderer;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(256, 256); // Base size
    this.renderer.shadowMap.enabled = false; // Disable shadows for performance
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    return this.renderer;
  }

  registerScene(id, scene, camera, canvas) {
    this.scenes.set(id, { scene, camera, canvas });
    this.scheduleRender(id);
  }

  unregisterScene(id) {
    const sceneData = this.scenes.get(id);
    if (sceneData) {
      // Cleanup
      sceneData.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    }
    this.scenes.delete(id);
  }

  scheduleRender(id) {
    if (!this.renderQueue.includes(id)) {
      this.renderQueue.push(id);
    }
    this.processRenderQueue();
  }

  async processRenderQueue() {
    if (this.isRendering || this.renderQueue.length === 0) return;

    this.isRendering = true;

    while (this.renderQueue.length > 0) {
      const id = this.renderQueue.shift();
      const sceneData = this.scenes.get(id);

      if (sceneData) {
        await this.renderToCanvas(sceneData);
      }

      // Yield control to prevent blocking
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }

    this.isRendering = false;
  }

  async renderToCanvas({ scene, camera, canvas }) {
    if (!this.renderer || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    this.renderer.setSize(rect.width, rect.height);

    // Render to offscreen canvas
    this.renderer.render(scene, camera);

    // Copy to target canvas
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.renderer.domElement, 0, 0, canvas.width, canvas.height);
  }

  dispose() {
    this.scenes.forEach((_, id) => this.unregisterScene(id));
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}

export const sharedRenderer = new SharedRenderer();
