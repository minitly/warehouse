<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 侧边栏 -->
        <aside
            :class="[
                'fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30 flex flex-col',
                isCollapsed ? 'w-20' : 'w-64',
            ]"
        >
            <!-- Logo -->
            <div
                class="h-20 flex items-center justify-center bg-gradient-to-b from-white to-gray-50"
            >
                <img src="/logo.png" alt="Logo" class="w-16 h-16" />
            </div>

            <!-- 分割线 -->
            <div class="px-4">
                <div class="h-1 bg-zinc-700"></div>
            </div>

            <!-- 菜单项 -->
            <nav class="flex-1 py-6 overflow-y-auto">
                <div class="px-4 space-y-3">
                    <NuxtLink
                        v-for="item in menuItems"
                        :key="item.path"
                        :to="item.path"
                        class="group flex items-center px-4 py-4 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg"
                        :class="{
                            'bg-blue-50 text-blue-600': isActive(item.path),
                        }"
                    >
                        <Icon :name="item.icon" class="w-6 h-6" />
                        <span
                            v-if="!isCollapsed"
                            class="ml-4 text-base font-medium"
                            >{{ item.name }}</span
                        >
                    </NuxtLink>
                </div>
            </nav>

            <!-- 分割线 -->
            <div class="px-4">
                <div class="h-1 bg-zinc-700"></div>
            </div>

            <!-- 底部控制区 -->
            <div class="bg-gradient-to-t from-white to-gray-50 p-4 space-y-4">
                <!-- 主题切换器 -->
                <!-- <button
                    class="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-white/50 rounded-lg transition-colors"
                    @click="toggleTheme"
                >
                    <Icon
                        :name="isDark ? 'heroicons:moon' : 'heroicons:sun'"
                        class="w-6 h-6"
                    />
                    <span
                        v-if="!isCollapsed"
                        class="ml-4 text-base font-medium"
                    >
                        {{ isDark ? "深色模式" : "浅色模式" }}
                    </span>
                </button> -->

                <!-- 用户头像 -->
                <div class="flex items-center px-4 py-3 relative">
                    <div
                        @click="toggleUserMenu"
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <Icon
                            name="heroicons:user"
                            class="w-6 h-6 text-blue-600"
                        />
                    </div>
                    <div v-if="!isCollapsed" class="ml-4">
                        <p class="text-base font-medium text-gray-700"
                            >administrator</p
                        >
                        <p class="text-sm text-gray-500">admin@example.com</p>
                    </div>

                    <!-- 用户菜单弹出框 -->
                    <div
                        v-if="showUserMenu"
                        class="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                    >
                        <div class="px-4 py-3 border-b border-gray-100">
                            <p class="text-sm font-medium text-gray-900"
                                >administrator</p
                            >
                            <p class="text-xs text-gray-500"
                                >admin@example.com</p
                            >
                        </div>
                        <div class="py-1">
                            <a
                                href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <div class="flex items-center">
                                    <Icon
                                        name="heroicons:user-circle"
                                        class="w-5 h-5 mr-2 text-gray-400"
                                    />
                                    Personal Information
                                </div>
                            </a>
                            <a
                                href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <div class="flex items-center">
                                    <Icon
                                        name="heroicons:cog-6-tooth"
                                        class="w-5 h-5 mr-2 text-gray-400"
                                    />
                                    Account settings
                                </div>
                            </a>
                            <a
                                href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <div class="flex items-center">
                                    <Icon
                                        name="heroicons:bell"
                                        class="w-5 h-5 mr-2 text-gray-400"
                                    />
                                    Message notifications
                                </div>
                            </a>
                        </div>
                        <div class="py-1 border-t border-gray-100">
                            <button
                                @click="handleLogout"
                                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                            >
                                <Icon
                                    name="heroicons:arrow-right-on-rectangle"
                                    class="w-5 h-5 mr-2"
                                />
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- 主内容区 -->
        <div
            :class="[
                'transition-all duration-300',
                isCollapsed ? 'ml-20' : 'ml-64',
            ]"
            @click="closeUserMenu"
        >
            <!-- 顶部导航栏 -->
            <header
                class="fixed top-0 right-0 left-0 h-16 bg-white shadow-sm flex items-center px-6 z-20"
                :class="[isCollapsed ? 'ml-20' : 'ml-64']"
            >
                <button
                    @click="toggleSidebar"
                    class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <Icon
                        name="heroicons:bars-3"
                        class="w-6 h-6 text-gray-600"
                    />
                </button>
                <div class="ml-4 flex items-center">
                    <span class="ml-2 text-2xl font-black text-gray-700">
                        {{ currentPage?.name || "未知页面" }}
                    </span>
                </div>
            </header>

            <!-- 页面内容 -->
            <main class="p-6 mt-16">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isCollapsed = ref(false);
const isDark = ref(false);
const showUserMenu = ref(false);

const menuItems = [
    {
        name: "Dashboard",
        path: "/internal/dashboard",
        icon: "heroicons:squares-2x2",
    },
    {
        name: "Announcement",
        path: "/internal/announcement",
        icon: "heroicons:megaphone",
    },
    {
        name: "OrderManagement",
        path: "/internal/orders",
        icon: "heroicons:clipboard-document-list",
    },
    {
        name: "ProductManagement",
        path: "/internal/products",
        icon: "heroicons:cube",
    },
    {
        name: "UserManagement",
        path: "/internal/users",
        icon: "heroicons:users",
    },
    {
        name: "Settings",
        path: "/internal/settings",
        icon: "heroicons:cog-6-tooth",
    },

];

const currentPage = computed(() => {
    return menuItems.find((item) => route.path.startsWith(item.path));
});

const isActive = (path: string) => {
    return route.path.startsWith(path);
};

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
};

const toggleTheme = () => {
    isDark.value = !isDark.value;
    // 这里可以添加主题切换的逻辑
};

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
};

const closeUserMenu = () => {
    showUserMenu.value = false;
};

const handleLogout = () => {
    // 这里添加登出逻辑
    console.log("用户登出");
    router.push("/");
    closeUserMenu();
};
</script>
