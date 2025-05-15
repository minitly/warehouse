<template>
    <!-- 统计卡片 -->
        <div class="flex justify-between items-center mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="flex items-center">
                        <div class="p-3 bg-blue-100 rounded-lg">
                            <ShoppingCart class="w-6 h-6 text-blue-600" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">Orders</p>
                            <p class="text-2xl font-semibold">1,234</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="flex items-center">
                        <div class="p-3 bg-green-100 rounded-lg">
                            <CurrencyDollar class="w-6 h-6 text-green-600" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">Revenue</p>
                            <p class="text-2xl font-semibold">¥45,678</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="flex items-center">
                        <div class="p-3 bg-purple-100 rounded-lg">
                            <Users class="w-6 h-6 text-purple-600" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">Users</p>
                            <p class="text-2xl font-semibold">892</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="flex items-center">
                        <div class="p-3 bg-orange-100 rounded-lg">
                            <Cube class="w-6 h-6 text-orange-600" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">Products</p>
                            <p class="text-2xl font-semibold">156</p>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="getAIAnalysis"
                class="ml-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                v-if="!loading"
                >
                <Sparkles class="w-5 h-5" />
                AI intelligent analysis
            </button>
            <button @click="getAIAnalysis"
                class="ml-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                v-else
                >
                <span class="loader animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                Analyzing......
            </button>
        </div>

        <!-- AI 分析弹窗 -->
        <div v-if="showAIAnalysis" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-3xl mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">AI intelligence analysis reports</h3>
                    <button @click="showAIAnalysis = false" class="text-gray-500 hover:text-gray-700">
                        <XMark class="w-6 h-6" />
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-medium text-blue-800 mb-2">Summary</h4>
                        <p class="text-blue-600" v-html="aiResponse?.summary"></p>
                    </div>
                    <div class="p-4 bg-green-50 rounded-lg">
                        <h4 class="font-medium text-green-800 mb-2">Predictions</h4>
                        <p class="text-green-600" v-html="aiResponse?.predictions"></p>
                    </div>
                    <div class="p-4 bg-purple-50 rounded-lg">
                        <h4 class="font-medium text-purple-800 mb-2">Recommendations</h4>
                        <p class="text-purple-600" v-html="aiResponse?.recommendations"></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 图表区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h2 class="text-lg font-semibold mb-4">Sales trends</h2>
                <div class="h-96">
                    <LineChart />
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h2 class="text-lg font-semibold mb-4">Sales distribution</h2>
                <div class="h-96">
                    <PieChart />
                </div>
            </div>
        </div>

        <!-- 商品信息表格 -->
        <div class="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-lg font-semibold mb-4">Hot Products</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product type</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Inventory</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sales</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">iPhone 15 Pro</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥8999</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">128</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">256</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">MacBook Air M2</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥9999</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">189</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">AirPods Pro</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥1999</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">256</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">512</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">iPad Air</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥4799</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">145</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">Apple Watch Series 9</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥3299</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">168</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">234</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script setup lang="ts">

import LineChart from "~/components/charts/LineChart.vue";
import PieChart from "~/components/charts/PieChart.vue";
import { ref } from "vue";
import axios from 'axios'

import ShoppingCart from "~/components/Icons/ShoppingCart.vue";
import CurrencyDollar from "~/components/Icons/CurrencyDollar.vue";
import Sparkles from "~/components/Icons/Sparkles.vue";
import Users from "~/components/Icons/Users.vue";
import Cube from "~/components/Icons/Cube.vue";
import XMark from "~/components/Icons/XMark.vue";

const showAIAnalysis = ref(false);

// async function getAIAnalysis() {
//     showAIAnalysis.value = !get(showAIAnalysis);
// }



interface AIResponse {
    summary: string
    predictions: string
    recommendations: string
}

const DEEPSEEK_CONFIG = {
    BASE_URL: 'https://api.deepseek.com/v1',
    ENDPOINTS: {
        CHAT: '/chat/completions'
    },
    MODEL: 'deepseek-chat',
    TIMEOUT: 60000
}

const aiResponse = ref<AIResponse | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const getAIAnalysis = async () => {
    try {
        loading.value = true
        error.value = null

        const analysisPrompt = buildAnalysisPrompt()
        const payload = {
            model: DEEPSEEK_CONFIG.MODEL,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a professional business analyst. Provide concise analysis in English using basic HTML formatting.'
                },
                {
                    role: 'user',
                    content: analysisPrompt
                }
            ],
            temperature: 0.3,
            max_tokens: 1000
        }

        const response = await axios.post(
            `${DEEPSEEK_CONFIG.BASE_URL}${DEEPSEEK_CONFIG.ENDPOINTS.CHAT}`,
            payload,
            {
                timeout: DEEPSEEK_CONFIG.TIMEOUT,
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const content = response.data.choices[0].message.content
        parseAIContent(content)
    } catch (err: any) {
        handleAIError(err)
    } finally {
        loading.value = false
        console.log("aiResponse", aiResponse.value)
        showAIAnalysis.value = !showAIAnalysis.value
    }
}

const buildAnalysisPrompt = (): string => {
    return `Generate an analysis report based on the following operational data:

  ## Orders
  1234

  ## Revenue
  ￥45678

  ## Users
  892

  ## Products
  156

  ## Hot Products
  [
    {
        "name": "iPhone 15 Pro",
        "type": "Electronics",
        "price": "¥8999",
        "inventory": 128,
        "sales": 256
    },
    {
        "name": "MacBook Air M2",
        "type": "Electronics",
        "price": "¥9999",
        "inventory": 85,
        "sales": 189
    },
    {
        "name": "AirPods Pro",
        "type": "Electronics",
        "price": "¥1999",
        "inventory": 256,
        "sales": 512
    },
    {
        "name": "iPad Air",
        "type": "Electronics",
        "price": "¥4799",
        "inventory": 92,
        "sales": 145
    },
    {
        "name": "Apple Watch Series 9",
        "type": "Electronics",
        "price": "¥3299",
        "inventory": 168,
        "sales": 234
    }
  ]

  Please structure your response in English with:
  1. Daily Summary (key metrics)
  2. Trend Predictions (data-driven)
  3. Optimization Recommendations (actionable items)`
}

const parseAIContent = (content: string) => {
    try {
        const summaryMatch = content.match(/1\.\s*Daily Summary([\s\S]*?)2\./i)
        const predictionMatch = content.match(/2\.\s*Trend Predictions([\s\S]*?)3\./i)
        const recommendationMatch = content.match(/3\.\s*Optimization Recommendations([\s\S]*)/i)

        aiResponse.value = {
            summary: summaryMatch ? summaryMatch[1].trim() : 'No summary available',
            predictions: predictionMatch ? predictionMatch[1].trim() : 'No predictions available',
            recommendations: recommendationMatch ? recommendationMatch[1].trim() : 'No recommendations available'
        }
    } catch (e) {
        throw new Error('Failed to parse AI response')
    }
}

const handleAIError = (err: any) => {
    console.error('AI analysis failed:', err)

    if (err.response) {
        switch (err.response.status) {
            case 401:
                error.value = 'Authentication failed. Please check API key.'
                break
            case 429:
                error.value = 'Request limit exceeded. Please try later.'
                break
            default:
                error.value = `API Error: ${err.response.data?.error?.message || 'Unknown error'}`
        }
    } else if (err.request) {
        error.value = 'Network error. Please check your connection.'
    } else {
        error.value = `Analysis failed: ${err.message}`
    }
}




</script>
