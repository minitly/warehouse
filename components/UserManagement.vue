<template>
    <div class="space-y-6">
            <!-- 搜索栏 -->
            <div class="bg-white p-4 rounded-lg shadow">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search for the employee's name..."
                                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            <MagnifyingGlass
                                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            />
                            <button
                                v-if="searchQuery"
                                @click="searchQuery = ''"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <XMark class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <button
                            @click="openAddUserModal"
                            class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Plus class="w-5 h-5" />
                            Add employees
                        </button>
                        <button
                            class="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <ArrowPath class="w-5 h-5" />
                            Refresh
                        </button>
                    </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-4 items-center">
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-600">Status Filtering:</span>
                        <div class="flex gap-2">
                            <button
                                @click="statusFilter = 'all'"
                                :class="[
                                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                                    statusFilter === 'all'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                                ]"
                            >
                                All
                            </button>
                            <button
                                @click="statusFilter = 'online'"
                                :class="[
                                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                                    statusFilter === 'online'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                                ]"
                            >
                                online
                            </button>
                            <button
                                @click="statusFilter = 'offline'"
                                :class="[
                                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                                    statusFilter === 'offline'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                                ]"
                            >
                                offline
                            </button>
                        </div>
                    </div>
                    <div
                        v-if="searchQuery || statusFilter !== 'all'"
                        class="text-sm text-gray-500"
                    >
                        Find {{ filteredUsers.length }} matched
                    </div>
                </div>
            </div>

            <!-- 用户列表 -->
            <div class="bg-white rounded-lg shadow">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200">
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                Employee's name
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Password
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr
                                v-for="user in filteredUsers"
                                :key="user.id"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <div
                                                class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                                            >
                                                <UserIcon
                                                    class="w-6 h-6 text-blue-600"
                                                />
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                {{ user.name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        :class="[
                                            'px-2 py-1 text-xs font-medium rounded-full',
                                            user.isOnline
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-rose-800',
                                        ]"
                                    >
                                        {{ user.isOnline ? "online" : "offline" }}
                                    </span>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ user.email }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center space-x-2">
                                        <input
                                            :type="
                                                user.showPassword
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            :value="user.password"
                                            readonly
                                            class="border-none bg-transparent text-sm text-gray-500"
                                        />
                                        <button
                                            @click="
                                                togglePasswordVisibility(user)
                                            "
                                            class="text-gray-400 hover:text-gray-600"
                                        >
                                            <EyeSlash
                                                v-if="user.showPassword"
                                                class="w-5 h-5"
                                            />
                                            <Eye
                                                v-else
                                                class="w-5 h-5"
                                            />
                                        </button>
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    <div class="flex items-center space-x-3">
                                        <button
                                            @click="openEditUserModal(user)"
                                            class="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            @click="deleteUser(user.id)"
                                            class="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- 员工弹窗 -->
        <div
            v-if="showUserModal"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">
                        {{ isEditing ? "Edit Employee" : "Add Employee" }}
                    </h3>
                    <button
                        @click="closeUserModal"
                        class="text-gray-500 hover:text-gray-700"
                    >
                        <XMark class="w-6 h-6" />
                    </button>
                </div>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Name</label
                        >
                        <input
                            v-model="currentUser.name"
                            type="text"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Email</label
                        >
                        <input
                            v-model="currentUser.email"
                            type="email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Password</label
                        >
                        <input
                            v-model="currentUser.password"
                            type="password"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            @click="closeUserModal"
                            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {{ isEditing ? "Save" : "Add" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InternalLayout from "~/layouts/internal.vue";
import Eye from "~/components/Icons/Eye.vue";
import EyeSlash from "~/components/Icons/EyeSlash.vue";
import UserIcon from "~/components/Icons/User.vue";
import MagnifyingGlass from "~/components/Icons/MagnifyingGlass.vue";
import XMark from "~/components/Icons/XMark.vue";
import Plus from "~/components/Icons/Plus.vue";
import ArrowPath from "~/components/Icons/ArrowPath.vue";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isOnline: boolean;
    showPassword: boolean;
}

const searchQuery = ref("");
const statusFilter = ref<"all" | "online" | "offline">("all");
const showUserModal = ref(false);
const isEditing = ref(false);
const currentUser = ref<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    isOnline: true,
    showPassword: false,
});
const users = ref<User[]>([
    {
        id: 1,
        name: "zhangsan",
        email: "zhangsan@example.com",
        password: "password123",
        isOnline: true,
        showPassword: false,
    },
    {
        id: 2,
        name: "lisi",
        email: "lisi@example.com",
        password: "password456",
        isOnline: false,
        showPassword: false,
    },
    {
        id: 3,
        name: "wangwu",
        email: "wangwu@example.com",
        password: "password789",
        isOnline: true,
        showPassword: false,
    },
    {
        id: 4,
        name: "zhaoliu",
        email: "zhaoliu@example.com",
        password: "password101",
        isOnline: true,
        showPassword: false,
    },
    {
        id: 5,
        name: "qianqi",
        email: "qianqi@example.com",
        password: "password102",
        isOnline: false,
        showPassword: false,
    },
    {
        id: 6,
        name: "sunba",
        email: "sunba@example.com",
        password: "password103",
        isOnline: true,
        showPassword: false,
    },
    {
        id: 7,
        name: "zhoujiu",
        email: "zhoujiu@example.com",
        password: "password104",
        isOnline: false,
        showPassword: false,
    },
    {
        id: 8,
        name: "wushi",
        email: "wushi@example.com",
        password: "password105",
        isOnline: true,
        showPassword: false,
    },
    {
        id: 9,
        name: "zhengshiyi",
        email: "zhengshiyi@example.com",
        password: "password106",
        isOnline: true,
        showPassword: false,
    },
    {
        id: 10,
        name: "wangshier",
        email: "wangshier@example.com",
        password: "password107",
        isOnline: false,
        showPassword: false,
    },
]);

const filteredUsers = computed(() => {
    return users.value.filter((user) => {
        const matchesSearch = user.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        const matchesStatus =
            statusFilter.value === "all" ||
            (statusFilter.value === "online" && user.isOnline) ||
            (statusFilter.value === "offline" && !user.isOnline);
        return matchesSearch && matchesStatus;
    });
});

const togglePasswordVisibility = (user: User) => {
    user.showPassword = !user.showPassword;
};

const openAddUserModal = () => {
    isEditing.value = false;
    currentUser.value = {
        id: users.value.length + 1,
        name: "",
        email: "",
        password: "",
        isOnline: true,
        showPassword: false,
    };
    showUserModal.value = true;
};

const openEditUserModal = (user: User) => {
    isEditing.value = true;
    currentUser.value = { ...user };
    showUserModal.value = true;
};

const closeUserModal = () => {
    showUserModal.value = false;
    currentUser.value = {
        id: 0,
        name: "",
        email: "",
        password: "",
        isOnline: true,
        showPassword: false,
    };
};

const handleSubmit = () => {
    if (isEditing.value) {
        const index = users.value.findIndex(
            (u) => u.id === currentUser.value.id
        );
        if (index !== -1) {
            users.value[index] = { ...currentUser.value };
        }
    } else {
        users.value.push({ ...currentUser.value });
    }
    closeUserModal();
};

const deleteUser = (id: number) => {
    const index = users.value.findIndex((u) => u.id === id);
    if (index !== -1) {
        users.value.splice(index, 1);
    }
};
</script>
