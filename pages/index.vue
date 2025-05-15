<template>
    <div class="min-h-screen bg-dark">
        <HeroBackground />

        <!-- 添加通用导航栏 -->
        <CommonHeader />

        <main class="relative z-10">
            <!-- 核心内容区块 -->
            <section class="h-screen flex items-center">
                <div class="container mx-auto px-6 text-center">
                    <h1
                        class="text-5xl md:text-7xl font-bold text-white mb-6"
                        ref="title"
                    >
                        Warehouse&nbsp;Management&nbsp;System
                    </h1>
                    <p class="text-xl text-gray-300 mb-8" ref="subtitle">
                        Produced by the 4-idots group
                    </p>
                </div>
            </section>

            <!-- 添加通用页脚 -->
            <footer class="bg-zinc-700 py-12">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <!-- 公司信息 -->
                        <div class="mb-8 md:mb-0">
                            <h3 class="text-white text-xl font-bold mb-4"
                                >4-idots</h3
                            >
                            <p class="text-gray-400 text-sm">
                                A whole new kind of web page
                            </p>
                        </div>

                        <!-- 快速链接 -->
                        <div>
                            <h4 class="text-white font-semibold mb-4"
                                >Quick Links</h4
                            >
                            <ul class="space-y-2">
                                <li>
                                    <NuxtLink
                                        class="text-gray-400 hover:text-white text-sm transition-colors"
                                        >About Us</NuxtLink
                                    >
                                </li>
                                <li>
                                    <NuxtLink
                                        class="text-gray-400 hover:text-white text-sm transition-colors"
                                        >Research</NuxtLink
                                    >
                                </li>
                                <li>
                                    <NuxtLink
                                        class="text-gray-400 hover:text-white text-sm transition-colors"
                                        >Careers</NuxtLink
                                    >
                                </li>
                            </ul>
                        </div>

                        <!-- 联系方式 -->
                        <div>
                            <h4 class="text-white font-semibold mb-4"
                                >Contact</h4
                            >
                            <ul class="space-y-2">
                                <li class="text-gray-400 text-sm"
                                    >404@notfound.com</li
                                >
                                <li class="text-gray-400 text-sm"
                                    >(400) 8823-823</li
                                >
                                <li class="text-gray-400 text-sm"
                                    >CRAZY THURSDAY VME50</li
                                >
                            </ul>
                        </div>

                        <!-- 社交媒体 -->
                        <div>
                            <h4 class="text-white font-semibold mb-4"
                                >Follow Us</h4
                            >
                            <div class="flex space-x-4">
                                <a
                                    href="#"
                                    class="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Icon name="uil:linkedin" class="w-6 h-6" />
                                </a>
                                <a
                                    href="#"
                                    class="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Icon name="uil:twitter" class="w-6 h-6" />
                                </a>
                                <a
                                    href="#"
                                    class="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Icon name="uil:youtube" class="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- 版权信息 -->
                    <div class="border-t border-dark-600 mt-12 pt-8">
                        <p class="text-gray-500 text-center text-sm">
                            &copy; 2025 4-idots. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    </div>
</template>

<script setup lang="ts">
// 导航数据
import HeroBackground from "~/components/Home/HeroBackground.vue";
import CommonHeader from "~/components/Common/Header.vue";

const navLinks = [
    { title: "About", path: "/about" },
    { title: "Login", path: "/login" },
    { title: "Signup", path: "/signup" },
];

// 功能卡片数据
const features = [
    {
        title: "AI-Driven Strategies",
        description:
            "Machine learning models trained on alternative data sources",
    },
    {
        title: "Global Reach",
        description: "Operating in 15+ countries with localized strategies",
    },
    {
        title: "Risk Management",
        description: "Real-time portfolio optimization and monitoring",
    },
];

import { ref, onMounted } from "vue";

// 步骤 3 的动画代码应放在这里 ▼
const title = ref(null); // 对应模板中的 <h1 ref="title">
const subtitle = ref(null); // 对应模板中的 <p ref="subtitle">

onMounted(() => {
    // 打字效果循环动画
    const text = title.value.innerText; // 获取原始文本
    title.value.innerText = ""; // 清空文本

    const typewriterEffect = (text, index = 0) => {
        if (index < text.length) {
            // 如果是空格字符，直接显示空格
            if (text.charAt(index) === " ") {
                title.value.innerText += " "; // 保留空格
            } else {
                title.value.innerText += text.charAt(index); // 打字
            }
            index++;
            setTimeout(() => typewriterEffect(text, index), 100); // 每100ms添加一个字符
        } else {
            // 循环播放
            setTimeout(() => {
                title.value.innerText = ""; // 清空文本
                typewriterEffect(text); // 重新开始打字效果
            }, 2000); // 2秒后重新开始
        }
    };

    // 启动打字效果
    typewriterEffect(text);
});
</script>
