<template>
    <div class="order-management">
        <!-- 状态筛选部分 -->
        <div class="bg-white p-4 rounded-lg shadow mb-6">
            <div class="flex flex-col md:flex-row gap-4 items-center">
                <div class="flex-1">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search for cabin or guest name..."
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
                        @click="openAddBookingModal"
                        class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus class="w-5 h-5" />
                        Create order
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
                            v-for="status in statusOptions"
                            :key="status.value"
                            @click="selectedStatus = status.value"
                            :class="[
                                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                                selectedStatus === status.value
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                            ]"
                        >
                            {{ status.label }}
                        </button>
                    </div>
                </div>
                <div
                    v-if="searchQuery || selectedStatus !== 'all'"
                    class="text-sm text-gray-500"
                >
                    Find {{ filteredBookings.length }} matches
                </div>
            </div>
        </div>

        <!-- 订单表格部分 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-200">
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >Cabin</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >Guest</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >Dates</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >Status</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >Amount</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >Actions</th
                            >
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr
                            v-for="booking in filteredBookings"
                            :key="booking.cabin"
                            class="hover:bg-gray-50"
                        >
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >{{ booking.cabin }}</td
                            >
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >{{ booking.guest }}</td
                            >
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >{{ booking.dates }}</td
                            >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-2 py-1 text-xs font-medium rounded-full',
                                        statusClass(booking.status),
                                    ]"
                                >
                                    {{ booking.status }}
                                </span>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left"
                                >{{ booking.amount }}</td
                            >
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-left pr-6"
                            >
                                <div class="inline-flex items-center gap-2">
                                    <button
                                        @click="openEditBookingModal(booking)"
                                        class="text-blue-600 hover:text-blue-800"
                                        >Edit</button
                                    >
                                    <button
                                        @click="deleteBooking(booking)"
                                        class="text-red-600 hover:text-red-800"
                                        >Delete</button
                                    >
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 订单弹窗 -->
        <div
            v-if="showBookingModal"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">
                        {{ isEditing ? "Edit Order" : "Create Order" }}
                    </h3>
                    <button
                        @click="closeBookingModal"
                        class="text-gray-500 hover:text-gray-700"
                    >
                        <XMark class="w-6 h-6" />
                    </button>
                </div>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Cabin</label
                        >
                        <input
                            v-model="currentBooking.cabin"
                            type="text"
                            required
                            :class="[
                                'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                                validationErrors.cabin
                                    ? 'border-red-500'
                                    : 'border-gray-300',
                            ]"
                        />
                        <p
                            v-if="validationErrors.cabin"
                            class="mt-1 text-sm text-red-600"
                            >{{ validationErrors.cabin }}</p
                        >
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Guest</label
                        >
                        <input
                            v-model="currentBooking.guest"
                            type="text"
                            required
                            :class="[
                                'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                                validationErrors.guest
                                    ? 'border-red-500'
                                    : 'border-gray-300',
                            ]"
                        />
                        <p
                            v-if="validationErrors.guest"
                            class="mt-1 text-sm text-red-600"
                            >{{ validationErrors.guest }}</p
                        >
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Dates</label
                        >
                        <div class="relative">
                            <input
                                v-model="currentBooking.dates"
                                type="text"
                                required
                                readonly
                                @click="showDatePicker = true"
                                placeholder="Choose dates..."
                                :class="[
                                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                                    validationErrors.dates
                                        ? 'border-red-500'
                                        : 'border-gray-300',
                                ]"
                            />
                            <CalendarIcon
                                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            />
                        </div>
                        <p
                            v-if="validationErrors.dates"
                            class="mt-1 text-sm text-red-600"
                            >{{ validationErrors.dates }}</p
                        >

                        <!-- 日期选择器弹窗 -->
                        <div v-if="showDatePicker" class="absolute z-50 mt-1">
                            <div class="bg-white rounded-lg shadow-lg p-4">
                                <DatePicker
                                    v-model="dateRange"
                                    is-range
                                    @update:model-value="updateDateRange"
                                    :attributes="[
                                        {
                                            highlight: {
                                                color: 'blue',
                                                fillMode: 'light',
                                            },
                                        },
                                    ]"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Status</label
                        >
                        <select
                            v-model="currentBooking.status"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="CHECKED IN">CHECKED IN</option>
                            <option value="UNCONFIRMED">UNCONFIRMED</option>
                        </select>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Amount</label
                        >
                        <input
                            v-model="currentBooking.amount"
                            type="text"
                            required
                            placeholder="e.g. $6,050.00"
                            :class="[
                                'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                                validationErrors.amount
                                    ? 'border-red-500'
                                    : 'border-gray-300',
                            ]"
                        />
                        <p
                            v-if="validationErrors.amount"
                            class="mt-1 text-sm text-red-600"
                            >{{ validationErrors.amount }}</p
                        >
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            @click="closeBookingModal"
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

import MagnifyingGlass from "./Icons/MagnifyingGlass.vue";
import XMark from "./Icons/XMark.vue";
import CalendarIcon from "./Icons/Calendar.vue";
import ArrowPath from "./Icons/ArrowPath.vue";
import Plus from "./Icons/Plus.vue";

interface Booking {
    cabin: string;
    guest: string;
    dates: string;
    status: string;
    amount: string;
}

interface ValidationErrors {
    cabin?: string;
    guest?: string;
    dates?: string;
    amount?: string;
}

const searchQuery = ref("");
const selectedStatus = ref("all");
const showBookingModal = ref(false);
const isEditing = ref(false);
const validationErrors = ref<ValidationErrors>({});
const showDatePicker = ref(false);
const dateRange = ref({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)),
});

const currentBooking = ref<Booking>({
    cabin: "",
    guest: "",
    dates: "",
    status: "UNCONFIRMED",
    amount: "",
});
const statusOptions = [
    { value: "all", label: "ALL" },
    { value: "CHECKED IN", label: "CHECKED IN" },
    { value: "UNCONFIRMED", label: "UNCONFIRMED" },
];

const bookings = ref<Booking[]>([
    {
        cabin: "001",
        guest: "Nino Williams",
        dates: "Jun 24 2023 - Jul 04 2023",
        status: "UNCONFIRMED",
        amount: "$6,050.00",
    },
    {
        cabin: "002",
        guest: "Emma Watson",
        dates: "Jun 17 2023 - Jul 02 2023",
        status: "CHECKED IN",
        amount: "$5,325.00",
    },
    {
        cabin: "003",
        guest: "Taro Tanaka",
        dates: "Jun 16 2023 - Jun 21 2023",
        status: "UNCONFIRMED",
        amount: "$2,950.00",
    },
    {
        cabin: "004",
        guest: "Maria Gomez",
        dates: "Jun 02 2023 - Jun 03 2023",
        status: "CHECKED IN",
        amount: "$475.00",
    },
    {
        cabin: "005",
        guest: "Jonathan Williams",
        dates: "May 30 2023 - Jun 02 2023",
        status: "UNCONFIRMED",
        amount: "$1,065.00",
    },
    {
        cabin: "006",
        guest: "Handsome Boy",
        dates: "May 30 2023 - Jun 02 2023",
        status: "CHECKED IN",
        amount: "$33,065.00",
    }
]);

const filteredBookings = computed(() => {
    // 先进行筛选
    const filtered = bookings.value.filter((booking: Booking) => {
        const searchTerm = searchQuery.value.toLowerCase().trim();
        const matchesSearch =
            !searchTerm ||
            booking.cabin.toLowerCase().includes(searchTerm) ||
            booking.guest.toLowerCase().includes(searchTerm);

        const matchesStatus =
            selectedStatus.value === "all" ||
            booking.status === selectedStatus.value;

        return matchesSearch && matchesStatus;
    });

    // 使用 Set 去重，基于 cabin 和 guest 的组合
    const uniqueBookings = Array.from(
        new Set(
            filtered.map(
                (booking: Booking) => `${booking.cabin}-${booking.guest}`
            )
        )
    )
        .map((id: string) => {
            const [cabin, guest] = id.split("-");
            return filtered.find(
                (booking: Booking) =>
                    booking.cabin === cabin && booking.guest === guest
            );
        })
        .filter((booking): booking is Booking => booking !== undefined);

    return uniqueBookings;
});

const statusClass = (status: string) => {
    switch (status) {
        case "CHECKED IN":
            return "bg-green-100 text-green-800";
        case "UNCONFIRMED":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const openAddBookingModal = () => {
    isEditing.value = false;
    currentBooking.value = {
        cabin: "",
        guest: "",
        dates: "",
        status: "UNCONFIRMED",
        amount: "",
    };
    showBookingModal.value = true;
};

const openEditBookingModal = (booking: Booking) => {
    isEditing.value = true;
    currentBooking.value = { ...booking };
    showBookingModal.value = true;
};

const closeBookingModal = () => {
    showBookingModal.value = false;
    validationErrors.value = {};
    showDatePicker.value = false;
    currentBooking.value = {
        cabin: "",
        guest: "",
        dates: "",
        status: "UNCONFIRMED",
        amount: "",
    };
};

// 格式化日期
const formatDate = (date: Date): string => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const day = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
};

// 更新日期范围
const updateDateRange = (range: { start: Date; end: Date }) => {
    dateRange.value = range;
    currentBooking.value.dates = `${formatDate(range.start)} - ${formatDate(range.end)}`;
    showDatePicker.value = false;
};

const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // 验证房间号
    if (!currentBooking.value.cabin) {
        errors.cabin = "The cabin cannot be empty";
    } else if (!/^[A-Za-z0-9]+$/.test(currentBooking.value.cabin)) {
        errors.cabin = "The cabin can only contain letters and numbers";
    }

    // 验证客人姓名
    if (!currentBooking.value.guest) {
        errors.guest = "Guest names cannot be left blank";
    } else if (currentBooking.value.guest.length < 2) {
        errors.guest = "Guest names need to be at least 2 characters long";
    }

    // 验证日期
    if (!currentBooking.value.dates) {
        errors.dates = "Check-in dates cannot be empty";
    }

    // 验证金额
    if (!currentBooking.value.amount) {
        errors.amount = "The amount cannot be empty";
    } else if (!/^\$[\d,]+\.\d{2}$/.test(currentBooking.value.amount)) {
        errors.amount = "The amount is not in the correct format, please use the format for example: $6,050.00";
    }

    validationErrors.value = errors;
    return Object.keys(errors).length === 0;
};

const handleSubmit = () => {
    if (!validateForm()) {
        return;
    }

    if (isEditing.value) {
        const index = bookings.value.findIndex(
            (b: Booking) =>
                b.cabin === currentBooking.value.cabin &&
                b.guest === currentBooking.value.guest
        );
        if (index !== -1) {
            bookings.value[index] = { ...currentBooking.value };
        }
    } else {
        bookings.value.push({ ...currentBooking.value });
    }
    closeBookingModal();
};

const deleteBooking = (booking: Booking) => {
    const index = bookings.value.findIndex(
        (b) => b.cabin === booking.cabin && b.guest === booking.guest
    );
    if (index !== -1) {
        bookings.value.splice(index, 1);
    }
};
</script>

<style scoped>
.order-management {
    padding: 20px;
}

/* 日期选择器样式覆盖 */
:deep(.vc-container) {
    --vc-accent-color: #3b82f6;
    --vc-text-color: #374151;
    --vc-border-color: #e5e7eb;
    --vc-hover-bg: #f3f4f6;
    --vc-focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border: none;
    font-family: inherit;
}

:deep(.vc-header) {
    padding: 10px 0;
}

:deep(.vc-weeks) {
    padding: 0;
}

:deep(.vc-day) {
    padding: 0.5rem;
}

:deep(.vc-day-content) {
    font-weight: 500;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
}

:deep(.vc-highlight) {
    background-color: #3b82f6;
    color: white;
}

:deep(.vc-highlight-bg-light) {
    background-color: #eff6ff;
}
</style>
