<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    export let results = [];

    let canvas;

    onMount(() => {
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: results.map(r => `Round ${r.round}`),
                datasets: [
                    {
                        label: 'Deep Breaths',
                        data: results.map(r => r.breathCount),
                        borderColor: 'rgba(54, 100, 235, 0.6)',
                        fill: false,
                    },
                    {
                        label: 'Exhale Hold',
                        data: results.map(r => r.exhaleHold),
                        borderColor: 'rgba(255, 99, 132, 0.6)',
                        fill: false,
                    },
                    {
                        label: 'Inhale Hold',
                        data: results.map(r => r.inhaleHold),
                        borderColor: 'rgba(100, 255, 255, 255)',
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    });
</script>

<div class="mt-6 w-full max-w-md">
    <!-- <h2 class="text-xl font-bold mb-2">Session Results</h2> -->
    <canvas bind:this={canvas}></canvas>
</div>