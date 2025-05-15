<template>
    <InternalLayout>
        <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold mb-8">System settings</h1>

            <!-- 基本设置 -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-xl font-semibold mb-6">Basic settings</h2>
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >System name</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Set your system display name</p
                            >
                        </div>
                        <input
                            type="text"
                            value="My management system"
                            class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >System language</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Select the system interface display language</p
                            >
                        </div>
                        <select
                            class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="en">English</option>
                            <option value="zh">简体中文</option>
                            <option value="ja">日本語</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >Time zone setting</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Set the default time zone of the system</p
                            >
                        </div>
                        <select
                            class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Asia/Shanghai"
                                >China Standard Time (UTC+8)</option
                            >
                            <option value="America/New_York"
                                >Eastern Time (UTC-5)</option
                            >
                            <option value="Europe/London"
                                >Greenwich Mean Time (UTC+0)</option
                            >
                        </select>
                    </div>
                </div>
            </div>

            <!-- 安全设置 -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-xl font-semibold mb-6">Security settings</h2>
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >Two-step verification</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Enable two-step verification to improve account security</p
                            >
                        </div>
                        <label
                            class="relative inline-flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                class="sr-only peer"
                                checked
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >Sign-in notifications</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Notifications are sent when a new device sign-in is detected</p
                            >
                        </div>
                        <label
                            class="relative inline-flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                class="sr-only peer"
                                checked
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >Password expiration date</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Set the password expiration time</p
                            >
                        </div>
                        <select
                            class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="30">30 days</option>
                            <option value="60">60 days</option>
                            <option value="90">90 days</option>
                            <option value="never">never</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 通知设置 -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-semibold mb-6">Notification settings</h2>
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >Email notifications</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Receive important system updates and notifications</p
                            >
                        </div>
                        <label
                            class="relative inline-flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                class="sr-only peer"
                                checked
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >System announcements</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Receive system maintenance and update announcements</p
                            >
                        </div>
                        <label
                            class="relative inline-flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                class="sr-only peer"
                                checked
                            />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-medium text-gray-900"
                                >Notification frequency</h3
                            >
                            <p class="text-sm text-gray-500"
                                >Set the frequency at which system notifications are sent</p
                            >
                        </div>
                        <select
                            class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="realtime">Real-time</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 保存按钮 -->
            <div class="mt-8 flex justify-end">
                <button
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                Save the settings
                </button>
            </div>
        </div>
    </InternalLayout>
</template>

<script setup lang="ts">
import InternalLayout from "~/layouts/internal.vue";
</script>
