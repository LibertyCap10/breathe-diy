<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    export let results = [];

    let canvas;

    onMount(() => {
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: results.map(r => `Round ${r.round}`),
                datasets: [
                    {
                        label: 'Deep Breaths',
                        data: results.map(r => r.breathCount),
                        backgroundColor: 'rgba(54, 100, 235, 0.6)',
                    },
                    {
                        label: 'Exhale Hold',
                        data: results.map(r => r.exhaleHold),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    },
                    {
                        label: 'Inhale Hold',
                        data: results.map(r => 15 - Number(r.inhaleHold)),
                        backgroundColor: 'rgba(100, 255, 255, 255)',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
</script>

<div class="mt-6 w-full max-w-md">
    <h2 class="text-xl font-bold mb-2">Session Results</h2>
    <canvas bind:this={canvas}></canvas>
</div>