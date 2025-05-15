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
            text: "Sales trends",
            left: "center",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {
            data: ["Sales", "Orders", "Users"],
            top: "10%",
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
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
                "Dec"
            ],
        },
        yAxis: [
            {
                type: "value",
                name: "Sales",
                position: "left",
                axisLabel: {
                    formatter: "¥{value}",
                },
            },
            {
                type: "value",
                name: "Amount",
                position: "right",
            },
        ],
        series: [
            {
                name: "Sales",
                type: "line",
                smooth: true,
                data: [
                    15000, 25000, 18000, 28000, 22000, 30000, 35000, 32000,
                    28000, 40000, 45000, 50000,
                ],
                itemStyle: {
                    color: "#3b82f6",
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(59, 130, 246, 0.5)",
                        },
                        {
                            offset: 1,
                            color: "rgba(59, 130, 246, 0.1)",
                        },
                    ]),
                },
            },
            {
                name: "Orders",
                type: "line",
                smooth: true,
                yAxisIndex: 1,
                data: [
                    120, 200, 150, 230, 180, 250, 280, 260, 240, 300, 320, 350,
                ],
                itemStyle: {
                    color: "#10b981",
                },
            },
            {
                name: "Users",
                type: "line",
                smooth: true,
                yAxisIndex: 1,
                data: [
                    80, 150, 120, 180, 150, 200, 220, 210, 190, 250, 270, 300,
                ],
                itemStyle: {
                    color: "#8b5cf6",
                },
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
