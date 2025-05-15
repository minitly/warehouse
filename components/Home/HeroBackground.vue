<template>
    <canvas ref="canvas" class="absolute inset-0 z-0" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMouse, useWindowSize } from "@vueuse/core";

const canvas = ref(null);
const { x: mouseX, y: mouseY } = useMouse();
const { width, height } = useWindowSize();

onMounted(() => {
    const ctx = canvas.value.getContext("2d");
    canvas.value.width = width.value;
    canvas.value.height = height.value;

    // 简易粒子动画
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width.value;
            this.y = Math.random() * height.value;
            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.5 + 0.1;
        }

        update() {
            // 根据鼠标位置产生流动效果
            const dx = mouseX.value - this.x;
            const dy = mouseY.value - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                this.x += dx * 0.01;
                this.y += dy * 0.01;
            }

            this.y += this.speed;
            if (this.y > height.value) this.reset();
        }
    }

    const particles = Array(100)
        .fill()
        .map(() => new Particle());

    const animate = () => {
        ctx.fillStyle = "rgba(8, 12, 33, 0.05)";
        ctx.fillRect(0, 0, width.value, height.value);

        particles.forEach((p) => {
            p.update();
            ctx.fillStyle = "#4a90e2";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    };

    animate();
});
</script>
