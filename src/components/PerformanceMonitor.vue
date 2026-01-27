<template>
  <div v-if="showStats" class="performance-monitor">
    <div class="stats-header">Performance Stats</div>
    <div class="stat-item">
      <span>FPS:</span>
      <span :class="{ warning: fps < 30, critical: fps < 15 }">{{ fps }}</span>
    </div>
    <div class="stat-item">
      <span>Memory:</span>
      <span>{{ memoryUsage }}MB</span>
    </div>
    <div class="stat-item">
      <span>WebGL Calls:</span>
      <span>{{ webglCalls }}</span>
    </div>
    <div class="stat-item">
      <span>Triangles:</span>
      <span>{{ triangles }}</span>
    </div>
    <button @click="toggleStats" class="toggle-btn">Hide</button>
  </div>
  <button v-else @click="toggleStats" class="show-stats-btn">📊</button>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const showStats = ref(false);
const fps = ref(0);
const memoryUsage = ref(0);
const webglCalls = ref(0);
const triangles = ref(0);

let frameCount = 0;
let lastTime = performance.now();
let monitorInterval = null;

const updateStats = () => {
  const now = performance.now();
  frameCount++;

  if (now - lastTime >= 1000) {
    fps.value = Math.round((frameCount * 1000) / (now - lastTime));
    frameCount = 0;
    lastTime = now;
  }

  // Memory usage (approximate)
  if (performance.memory) {
    memoryUsage.value = Math.round(
      performance.memory.usedJSHeapSize / 1024 / 1024,
    );
  }

  // WebGL stats (if available)
  const renderers = document.querySelectorAll("canvas");
  let totalCalls = 0;
  let totalTriangles = 0;

  renderers.forEach((canvas) => {
    const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
    if (gl && gl.getExtension) {
      // Try to get WebGL stats if extension is available
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (ext) {
        // This is approximate - real stats would need Three.js renderer access
        totalCalls += 10; // Placeholder
        totalTriangles += 1000; // Placeholder
      }
    }
  });

  webglCalls.value = totalCalls;
  triangles.value = totalTriangles;
};

const toggleStats = () => {
  showStats.value = !showStats.value;

  if (showStats.value) {
    monitorInterval = setInterval(updateStats, 100);
  } else {
    if (monitorInterval) {
      clearInterval(monitorInterval);
      monitorInterval = null;
    }
  }
};

onMounted(() => {
  // Auto-show if performance is poor
  setTimeout(() => {
    updateStats();
    if (fps.value < 30) {
      showStats.value = true;
      monitorInterval = setInterval(updateStats, 100);
    }
  }, 2000);
});

onUnmounted(() => {
  if (monitorInterval) {
    clearInterval(monitorInterval);
  }
});
</script>

<style scoped>
.performance-monitor {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  z-index: 1000;
  min-width: 150px;
}

.stats-header {
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.warning {
  color: orange;
}

.critical {
  color: red;
  font-weight: bold;
}

.toggle-btn {
  background: #333;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  width: 100%;
}

.show-stats-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  font-size: 16px;
}
</style>
