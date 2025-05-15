<template>
    <div
        class="min-h-screen relative overflow-hidden flex items-center justify-center"
    >
        <CommonHeader />
        <!-- 动态渐变背景 -->
        <div
            class="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#000000] gradient-bg"
        ></div>

        <!-- 登录表单 -->
        <div
            v-if="!isTransitioning"
            class="relative z-10 backdrop-blur-md bg-white/10 rounded-xl shadow-2xl p-8 w-96 border border-white/20"
        >
            <h2 class="text-3xl font-bold text-white mb-8 text-center"
                >User login</h2
            >

            <form @submit.prevent="handleSubmit">
                <!-- 邮箱输入 -->
                <div class="mb-6">
                    <label class="block text-white mb-2 text-xl font-semibold"
                        >Email</label
                    >
                    <input
                        v-model="form.email"
                        type="email"
                        required
                        class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-white/50"
                        :class="{ 'border-red-500': errors.email }"
                        placeholder="Please enter email"
                    />
                    <p v-if="errors.email" class="text-red-300 text-sm mt-1">{{
                        errors.email
                    }}</p>
                </div>

                <!-- 密码输入 -->
                <div class="mb-8">
                    <label class="block text-white mb-2 text-xl font-semibold"
                        >Password</label
                    >
                    <input
                        v-model="form.password"
                        type="password"
                        required
                        class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-white/50"
                        :class="{ 'border-red-500': errors.password }"
                        placeholder="Please enter password"
                    />
                    <p
                        v-if="errors.password"
                        class="text-red-300 text-sm mt-1"
                        >{{ errors.password }}</p
                    >
                </div>

                <button
                    type="submit"
                    class="w-full bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/20"
                >
                    Login
                </button>

                <div class="mt-4 text-center">
                    <router-link
                        to="/signup"
                        class="text-white/70 hover:text-white transition-colors"
                        >Don't have an account yet? Sign up now</router-link
                    >
                </div>
            </form>
        </div>

        <!-- 过渡动画 -->
        <transition name="fade">
            <div
                v-if="isTransitioning"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            >
                <div class="docker-animation">
                    <img
                        src="../../public/docker-whale.svg"
                        alt="Docker Whale"
                        class="whale"
                    />
                    <!-- <div class="water-splashes">
                        <div class="splash splash-1"></div>
                        <div class="splash splash-2"></div>
                        <div class="splash splash-3"></div>
                    </div> -->
                </div>
            </div>
        </transition>

        <!-- 成功提示 -->
        <transition name="fade">
            <div
                v-if="showSuccess"
                class="fixed top-4 right-4 bg-green-500/80 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-20 border border-white/20"
            >
                <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                Login successful!
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CommonHeader from "~/components/Common/Header.vue";

const router = useRouter();

// 表单数据
const form = ref({
    email: "",
    password: "",
});

// 验证错误
const errors = ref({
    email: "",
    password: "",
});

const showSuccess = ref(false);
const isTransitioning = ref(false);

// 表单提交
const handleSubmit = () => {
    // 重置错误信息
    errors.value = { email: "", password: "" };

    // 邮箱验证
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.value.email)) {
        errors.value.email = "The mailbox is incorrectly formatted";
    }

    // 密码验证
    if (form.value.password.length < 6) {
        errors.value.password = "The password must be at least 6 characters long";
    }

    // 提交逻辑
    if (!Object.values(errors.value).some((e) => e)) {
        showSuccess.value = true;
        isTransitioning.value = true;
        setTimeout(() => {
            router.push("/internal/dashboard");
        }, 3000);
    }
};
</script>

<style>
/* 动态渐变动画 */
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

/* Docker鲸鱼动画样式 */
.docker-animation {
    position: relative;
    width: 300px;
    height: 300px;
}

.whale {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
    animation: whaleFloat 2s ease-in-out infinite;
}

.water-splashes {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
}

.splash {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 4px;
    height: 0;
    background: linear-gradient(to top, #00b4d8, transparent);
    border-radius: 50%;
    transform-origin: bottom center;
}

.splash-1 {
    animation: splash 2s ease-in-out infinite;
    transform: translateX(-20px);
}

.splash-2 {
    animation: splash 2s ease-in-out infinite 0.3s;
    transform: translateX(0);
}

.splash-3 {
    animation: splash 2s ease-in-out infinite 0.6s;
    transform: translateX(20px);
}

@keyframes whaleFloat {
    0%,
    100% {
        transform: translateX(-50%) translateY(0);
    }
    50% {
        transform: translateX(-50%) translateY(-20px);
    }
}

@keyframes splash {
    0% {
        height: 0;
        opacity: 0;
    }
    50% {
        height: 120px;
        opacity: 1;
    }
    100% {
        height: 0;
        opacity: 0;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* 输入框自动填充样式 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.1) inset;
    transition: background-color 5000s ease-in-out 0s;
}

svg path {
    transform-box: fill-box;
}
</style>
