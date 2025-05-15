<template>
    <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const initChart = () => {
    if (!chartRef.value) return;

    chart = echarts.init(chartRef.value);

    const option = {
        title: {
            text: "Sales distribution",
            left: "center",
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
            orient: "vertical",
            left: "left",
            data: ["Electronics", "Clothing", "Food", "Home", "Books", "Others"],
        },
        series: [
            {
                name: "Percentage of sales",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "18",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 1048, name: "Electronics" },
                    { value: 735, name: "Clothing" },
                    { value: 580, name: "Food" },
                    { value: 484, name: "Home" },
                    { value: 300, name: "Books" },
                    { value: 200, name: "Others" },
                ],
            },
        ],
    };

    chart.setOption(option);
};

onMounted(() => {
    //TODO: axios 获取数据
    initChart();
    window.addEventListener("resize", () => chart?.resize());
});

onUnmounted(() => {
    chart?.dispose();
    window.removeEventListener("resize", () => chart?.resize());
});
</script>
