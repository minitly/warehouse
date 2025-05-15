<template>
    <div
        class="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
    >
        <!-- 动态渐变背景 -->
        <div
            class="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#000000] gradient-bg"
        ></div>

        <CommonHeader />

        <!-- 主内容区域：左右分栏 -->
        <div
            class="relative w-full max-w-4xl flex flex-row items-stretch overflow-visible"
            ref="containerEl"
        >
            <!-- 问题列表 -->
            <div
                :class="[
                    'backdrop-blur-md bg-white/10 rounded-lg shadow-xl p-8 transition-all duration-500 border border-white/20 flex-1 min-w-0 max-w-[50%] relative z-10',
                    isExpanded ? 'translate-x-[-30px]' : 'mx-auto',
                ]"
                ref="listEl"
            >
                <h2 class="text-2xl font-bold text-white mb-6">Frequently questions</h2>
                <div class="space-y-4 relative">
                    <div
                        v-for="(item, index) in questions"
                        :key="index"
                        @click="handleQuestionClick(index)"
                        :class="[
                            'p-4 backdrop-blur-md bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors relative border border-white/20',
                            isAnimating ? 'pointer-events-none opacity-60' : '',
                            selectedQuestion === index ? 'bg-white/20' : '',
                        ]"
                        ref="el => questionItems.value[index] = el"
                    >
                        <h3 class="text-white font-medium">{{ item.title }}</h3>
                    </div>
                </div>
            </div>

            <!-- 问题详情 -->
            <transition name="slide-fade">
                <div
                    v-if="selectedQuestion !== null"
                    class="flex-1 min-w-0 max-w-[50%] ml-8 relative z-20"
                    ref="detailEl"
                >
                    <div
                        class="detail-glow-box backdrop-blur-md bg-white/10 rounded-lg shadow-xl h-full p-6 border border-white/20 relative animate-glow-gold"
                    >
                        <button
                            @click="handleBackClick"
                            class="mb-4 text-white/70 hover:text-white transition-colors"
                            :disabled="isAnimating"
                        >
                            ← Back
                        </button>
                        <h3 class="text-xl text-white font-bold mb-4">{{
                            questions[selectedQuestion].title
                        }}</h3>
                        <p class="text-white/70">{{
                            questions[selectedQuestion].description
                        }}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";

// 问题数据
const questions = ref([
    {
        title: "Why can't I log in",
        description:
            "If you have not used it before, please register as a user first, otherwise please contact your administrator",
    },
    {
        title: "The system is slow to respond",
        description:
            "Close redundant programs, clean up the system cache, and check the network.",
    },
    {
        title: "Permissions are inaccessible",
        description:
            "Check the user permission settings and contact the administrator to adjust the permissions.",
    },
    {
        title: "An error message is displayed",
        description:
            "Log the error message, restart the system, and contact technical support.",
    },
]);

const selectedQuestion = ref<number | null>(null);
const isExpanded = ref(false);
const questionItems = ref<HTMLElement[]>([]);
const detailEl = ref<HTMLElement | null>(null);
const listEl = ref<HTMLElement | null>(null);
const isAnimating = ref(false);

// 点击问题按钮（动画未结束时禁止点击）
const handleQuestionClick = (index: number) => {
    if (isAnimating.value) return;
    selectQuestion(index);
};

// 选择问题
const selectQuestion = async (index: number) => {
    if (isAnimating.value) return;
    isAnimating.value = true;
    selectedQuestion.value = index;
    isExpanded.value = true;
    await nextTick();
    // 列表动画
    await gsap.to(listEl.value, {
        duration: 0.6,
        ease: "power3.out",
        x: "-30",
        transformOrigin: "left center",
    });
    isAnimating.value = false;
};

// 返回按钮点击（动画结束后再切换视图）
const handleBackClick = async () => {
    if (isAnimating.value) return;
    isAnimating.value = true;
    await gsap.to(listEl.value, {
        x: 0,
        duration: 0.5,
        ease: "power2.inOut",
    });
    // 等动画结束后再切换视图
    selectedQuestion.value = null;
    isExpanded.value = false;
    isAnimating.value = false;
};

onMounted(() => {
    // 初始化代码
});
</script>

<style scoped>
.gradient-bg {
    background-size: 200% 200%;
    animation: gradient-move 8s ease-in-out infinite;
}

@keyframes gradient-move {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.slide-fade-enter-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(40px);
}
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(40px);
}

.detail-glow-box {
    position: relative;
    box-shadow:
        0 0 0 2px #222,
        0 0 18px 2px rgba(220, 220, 220, 0.7),
        0 0 32px 6px rgba(220, 220, 220, 0.25),
        0 0 24px 4px rgba(0, 0, 0, 0.3);
    z-index: 1;
}
.detail-glow-box::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: -5px;
    border-radius: 20px;
    z-index: 2;
    box-shadow:
        0 0 12px 2px #222,
        0 0 32px 8px rgba(240, 240, 240, 0.45),
        0 0 24px 8px rgba(220, 220, 220, 0.25);
    animation: white-glow-move 2.2s linear infinite alternate;
}
@keyframes white-glow-move {
    0% {
        box-shadow:
            0 0 12px 2px #222,
            0 0 32px 8px rgba(240, 240, 240, 0.45),
            0 0 24px 8px rgba(220, 220, 220, 0.25);
        filter: brightness(1.1);
    }
    50% {
        box-shadow:
            0 0 24px 6px #222,
            0 0 48px 16px rgba(255, 255, 255, 0.7),
            0 0 32px 12px rgba(220, 220, 220, 0.35);
        filter: brightness(1.25);
    }
    100% {
        box-shadow:
            0 0 12px 2px #222,
            0 0 32px 8px rgba(240, 240, 240, 0.45),
            0 0 24px 8px rgba(220, 220, 220, 0.25);
        filter: brightness(1.1);
    }
}
</style>
