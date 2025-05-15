<template>
    <div class="product-management">
        <!-- 产品筛选部分 -->
        <div class="bg-white p-6 rounded-lg shadow mb-6">
            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-1">
                    <div class="relative">
                        <input
                            type="text"
                            v-model="searchQuery"
                            placeholder="Search for the product name or brand..."
                            class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            @keyup.enter="handleSearch"
                        />
                        <Icon
                            name="heroicons:magnifying-glass"
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        />
                        <button
                            v-if="searchQuery"
                            @click="searchQuery = ''"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <Icon name="heroicons:x-mark" class="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button
                        @click="handleSearch"
                        class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Icon
                            name="heroicons:magnifying-glass"
                            class="w-5 h-5"
                        />
                        Search
                    </button>
                    <button
                        @click="openAddProductModal"
                        class="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <Icon name="heroicons:plus" class="w-5 h-5" />
                        Add product
                    </button>
                </div>
            </div>

            <div class="mt-6">
                <div class="flex items-center gap-4">
                    <span class="text-sm font-medium text-gray-700"
                        >Product Type:</span
                    >
                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="type in productTypes"
                            :key="type"
                            @click="toggleType(type)"
                            :class="[
                                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                                selectedTypes.includes(type)
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                            ]"
                        >
                            {{ type }}
                        </button>
                    </div>
                </div>
            </div>

            <div
                v-if="activeSearchQuery || selectedTypes.length > 0"
                class="mt-4 text-sm text-gray-500"
            >
                Find {{ filteredProducts.length }} matches
            </div>
        </div>

        <!-- 产品列表部分 -->
        <div class="product-grid">
            <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="product-card"
            >
                <div class="product-image">
                    <img :src="product.imgPath" :alt="product.name" />
                </div>
                <div class="product-info">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-brand">{{ product.brand }}</p>
                    <p class="product-type">{{ product.type }}</p>
                    <p class="product-intro">{{ product.introduction }}</p>
                    <div class="product-footer">
                        <span class="product-price"
                            >¥{{ product.price.toFixed(2) }}</span
                        >
                        <span class="product-stock"
                            >Inventory: {{ product.amount }}</span
                        >
                    </div>
                    <div class="product-actions">
                        <button
                            class="action-button edit"
                            @click="openEditProductModal(product)"
                            >Edit</button
                        >
                        <button
                            class="action-button delete"
                            @click="openDeleteProductModal(product)"
                            >Delete</button
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- 产品编辑/添加弹窗 -->
        <div
            v-if="showProductModal"
            class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 class="text-lg font-semibold mb-4">{{
                    isEditing ? "Edit product" : "Add product"
                }}</h3>
                <form @submit.prevent="handleProductSubmit" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1"
                            >Product name</label
                        >
                        <input
                            v-model="currentProduct.name"
                            type="text"
                            class="w-full border rounded px-3 py-2"
                        />
                        <p
                            v-if="validationErrors.name"
                            class="text-red-500 text-xs mt-1"
                            >{{ validationErrors.name }}</p
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1"
                            >Product brand</label
                        >
                        <input
                            v-model="currentProduct.brand"
                            type="text"
                            class="w-full border rounded px-3 py-2"
                        />
                        <p
                            v-if="validationErrors.brand"
                            class="text-red-500 text-xs mt-1"
                            >{{ validationErrors.brand }}</p
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1"
                            >Product type</label
                        >
                        <input
                            v-model="currentProduct.type"
                            type="text"
                            class="w-full border rounded px-3 py-2"
                        />
                        <p
                            v-if="validationErrors.type"
                            class="text-red-500 text-xs mt-1"
                            >{{ validationErrors.type }}</p
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1"
                            >Introduction</label
                        >
                        <textarea
                            v-model="currentProduct.introduction"
                            class="w-full border rounded px-3 py-2"
                        ></textarea>
                        <p
                            v-if="validationErrors.introduction"
                            class="text-red-500 text-xs mt-1"
                            >{{ validationErrors.introduction }}</p
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1"
                            >Price</label
                        >
                        <input
                            v-model.number="currentProduct.price"
                            type="number"
                            class="w-full border rounded px-3 py-2"
                        />
                        <p
                            v-if="validationErrors.price"
                            class="text-red-500 text-xs mt-1"
                            >{{ validationErrors.price }}</p
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1"
                            >ImgPath</label
                        >
                        <input
                            v-model="currentProduct.imgPath"
                            type="text"
                            class="w-full border rounded px-3 py-2"
                        />
                        <p
                            v-if="validationErrors.imgPath"
                            class="text-red-500 text-xs mt-1"
                            >{{ validationErrors.imgPath }}</p
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1"
                            >Inventory</label
                        >
                        <input
                            v-model.number="currentProduct.amount"
                            type="number"
                            class="w-full border rounded px-3 py-2"
                        />
                        <p
                            v-if="validationErrors.amount"
                            class="text-red-500 text-xs mt-1"
                            >{{ validationErrors.amount }}</p
                        >
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            @click="showProductModal = false"
                            class="px-4 py-2 border rounded"
                            >Cancel</button
                        >
                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded"
                            >{{ isEditing ? "Save" : "Add" }}</button
                        >
                    </div>
                </form>
            </div>
        </div>

        <!-- 删除确认弹窗 -->
        <div
            v-if="showDeleteModal"
            class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-full max-w-xs mx-4">
                <h3 class="text-lg font-semibold mb-4">Confirm Delete</h3>
                <p class="mb-6">Sure you want to remove the product?</p>
                <div class="flex justify-end gap-3">
                    <button
                        @click="showDeleteModal = false"
                        class="px-4 py-2 border rounded"
                        >Cancel</button
                    >
                    <button
                        @click="confirmDeleteProduct"
                        class="px-4 py-2 bg-red-600 text-white rounded"
                        >Delete</button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const searchQuery = ref("");
const selectedTypes = ref<string[]>([]);
const activeSearchQuery = ref("");
const showProductModal = ref(false);
const isEditing = ref(false);
const currentProduct = ref({
    id: 0,
    name: "",
    brand: "",
    type: "",
    introduction: "",
    price: 0,
    imgPath: "",
    amount: 0,
});
const validationErrors = ref<Record<string, string>>({});
const showDeleteModal = ref(false);
const productToDelete = ref<any>(null);

// 示例数据
const products = ref([
    {
        id: 1,
        name: "Apple Watch",
        brand: "Apple",
        type: "Electronics",
        introduction:
            "A smartwatch with health monitoring, message alerts, and sports tracking features.",
        price: 2999.0,
        imgPath: "/productImg/appleWatch.png",
        amount: 5,
    },
    {
        id: 2,
        name: "iPhone",
        brand: "Apple",
        type: "Electronics",
        introduction:
            "A well-designed smartphone.",
        price: 7999.0,
        imgPath: "/productImg/iphone.png",
        amount: 150,
    },
    {
        id: 3,
        name: "Macbook",
        brand: "Apple",
        type: "Electronics",
        introduction:
            "A well-designed laptop.",
        price: 12299.0,
        imgPath: "/productImg/macbook.png",
        amount: 6650,
    },
    {
        id: 4,
        name: "Samsung S25",
        brand: "Samsung",
        type: "Electronics",
        introduction:
            "A well-designed smartphone.",
        price: 5499.0,
        imgPath: "/productImg/samsung.png",
        amount: 3250,
    },
    {
        id: 5,
        name: "HUAWEI Mate XT",
        brand: "HUAWEI",
        type: "Electronics",
        introduction:
            "A well-designed smartphone.",
        price: 5499.0,
        imgPath: "/productImg/huawei.png",
        amount: 450,
    },
    {
      id: 6,
      name: "Airpods pro2",
      brand: "Apple",
      type: "Electronics",
      introduction:
          "A well-designed headphone with good quality.",
      price: 1999.0,
      imgPath: "/productImg/airpods.png",
      amount: 3250,
    },
    {
      id: 7,
      name: "Ipad 11",
      brand: "Apple",
      type: "Electronics",
      introduction:
          "A well-designed tablet.",
      price: 5499.0,
      imgPath: "/productImg/ipad.png",
      amount: 550,
    },
    {
      id: 8,
      name: "Homepod mini",
      brand: "Apple",
      type: "Smart Home",
      introduction:
          "A well-designed Audio system which can also be used to control the furniture in home.",
      price: 749.0,
      imgPath: "/productImg/homepod.png",
      amount: 8850,
    },
    {
      id: 9,
      name: "Xbox Series X",
      brand: "Microsoft",
      type: "Electronics",
      introduction:
          "A well-designed game controller.",
      price: 249.0,
      imgPath: "/productImg/xbox.png",
      amount: 450,
    },
    {
      id: 10,
      name: "Display screen",
      brand: "AOC",
      type: "Electronics",
      introduction:
          "A well-designed Display screen.",
      price: 749.0,
      imgPath: "/productImg/aoc.png",
      amount: 1350,
    },
    {
      id: 11,
      name: "Keyboard",
      brand: "Razer",
      type: "Electronics",
      introduction:
          "A well-designed keyboard designed for gaming.",
      price: 249.0,
      imgPath: "/productImg/keyboard.png",
      amount: 450,
    },
    {
      id: 12,
      name: "Mouse",
      brand: "GPW",
      type: "Electronics",
      introduction:
          "A well-designed mouse designed for gaming.",
      price: 249.0,
      imgPath: "/productImg/gpw.png",
      amount: 1199,
    }
]);

// 获取所有产品类型
const productTypes = computed(() => {
    const types = new Set(products.value.map((product) => product.type));
    return Array.from(types);
});

// 过滤产品
const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(activeSearchQuery.value.toLowerCase()) ||
            product.brand
                .toLowerCase()
                .includes(activeSearchQuery.value.toLowerCase());
        const matchesType =
            selectedTypes.value.length === 0 ||
            selectedTypes.value.includes(product.type);
        return matchesSearch && matchesType;
    });
});

// 处理搜索
const handleSearch = () => {
    activeSearchQuery.value = searchQuery.value;
    console.log("Searching for:", activeSearchQuery.value);
    console.log("Selected types:", selectedTypes.value);
};

// 编辑产品
const editProduct = (product) => {
    console.log("Edit product:", product);
};

// 删除产品
const deleteProduct = (product) => {
    console.log("Delete product:", product);
};

// 添加类型切换函数
const toggleType = (type: string) => {
    const index = selectedTypes.value.indexOf(type);
    if (index === -1) {
        selectedTypes.value.push(type);
    } else {
        selectedTypes.value.splice(index, 1);
    }
};

const openAddProductModal = () => {
    isEditing.value = false;
    currentProduct.value = {
        id: 0,
        name: "",
        brand: "",
        type: "",
        introduction: "",
        price: 0,
        imgPath: "",
        amount: 0,
    };
    validationErrors.value = {};
    showProductModal.value = true;
};

const openEditProductModal = (product: any) => {
    isEditing.value = true;
    currentProduct.value = { ...product };
    validationErrors.value = {};
    showProductModal.value = true;
};

const validateProductForm = () => {
    const errors: Record<string, string> = {};
    if (!currentProduct.value.name) errors.name = "The product name cannot be empty";
    if (!currentProduct.value.brand) errors.brand = "The brand cannot be empty";
    if (!currentProduct.value.type) errors.type = "The type cannot be empty";
    if (!currentProduct.value.introduction)
        errors.introduction = "The introduction cannot be empty";
    if (
        currentProduct.value.price === null ||
        isNaN(currentProduct.value.price) ||
        currentProduct.value.price <= 0
    )
        errors.price = "The price must be positive";
    if (!currentProduct.value.imgPath) errors.imgPath = "The image path cannot be empty";
    if (
        currentProduct.value.amount === null ||
        isNaN(currentProduct.value.amount) ||
        currentProduct.value.amount < 0
    )
        errors.amount = "Inventory must be 0 or a positive integer";
    validationErrors.value = errors;
    return Object.keys(errors).length === 0;
};

const handleProductSubmit = () => {
    if (!validateProductForm()) return;
    if (isEditing.value) {
        const idx = products.value.findIndex(
            (p: any) => p.id === currentProduct.value.id
        );
        if (idx !== -1) products.value[idx] = { ...currentProduct.value };
    } else {
        currentProduct.value.id = Date.now();
        products.value.push({ ...currentProduct.value });
    }
    showProductModal.value = false;
};

const openDeleteProductModal = (product: any) => {
    productToDelete.value = product;
    showDeleteModal.value = true;
};

const confirmDeleteProduct = () => {
    products.value = products.value.filter(
        (p: any) => p.id !== productToDelete.value.id
    );
    showDeleteModal.value = false;
};
</script>

<style scoped>
.product-management {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

/* 产品网格样式 */
.product-grid {
    display: grid;
    gap: 24px;
    width: 100%;
}

/* 响应式布局调整 */
@media (min-width: 1200px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 992px) and (max-width: 1199px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 768px) and (max-width: 991px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 767px) {
    .product-grid {
        grid-template-columns: 1fr;
    }

    .product-card {
        max-width: 100%;
    }
}

/* 产品卡片样式 */
.product-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.05);
}

.product-info {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.product-name {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #303133;
}

.product-brand {
    font-size: 14px;
    color: #606266;
    margin: 0 0 4px 0;
}

.product-type {
    font-size: 12px;
    color: #909399;
    margin: 0 0 8px 0;
    padding: 2px 8px;
    background-color: #f5f7fa;
    border-radius: 4px;
    display: inline-block;
}

.product-intro {
    font-size: 14px;
    color: #606266;
    margin: 0 0 16px 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
}

.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.product-price {
    font-size: 20px;
    font-weight: 600;
    color: #f56c6c;
}

.product-stock {
    font-size: 14px;
    color: #909399;
    padding: 4px 8px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.product-actions {
    display: flex;
    gap: 12px;
}

.action-button {
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-button.edit {
    background-color: #409eff;
    color: white;
}

.action-button.edit:hover {
    background-color: #66b1ff;
}

.action-button.delete {
    background-color: #f56c6c;
    color: white;
}

.action-button.delete:hover {
    background-color: #f78989;
}
</style>
